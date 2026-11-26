// 하위 페이지 새 화면을 적용할 주소(사용자 결정 2026-11-24).
// 입영 준비·복무 중(A) 그룹 메인 카드 둘째 줄 5개(A-M06~A-M10)가 이동하는 병무청 페이지만 바꾼다.
// 다른 카드의 페이지를 추가할 때는 이 파일의 목록에 주소를 넣으면 같은 공통 틀이 적용된다.

import { NOTICE_BOARDS, type NoticeBoardDef } from './notice/boards';

/** 공통 틀 + 본문 다듬기를 적용할 본문 페이지(contents.do?mc=...). 값은 카드 ID(기록용). */
export const CONTENT_PAGES: Record<string, string> = {
  usr0000167: 'A-M07', // 병역판정검사(병역판정검사 대상자)
  mma0002909: 'A-M08', // 입영판정검사(입영판정검사란?)
  usr0000174: 'A-M09', // 재학생 입영연기
  usr0000295: 'A-M10', // 현역병 선발취소 및 입영일자 연기신청
};

export type SubpageKind =
  | 'content'      // 본문 페이지: 공통 틀 + 본문 다듬기
  | 'notice-list'  // 모집 공지사항 첫 화면: 군별 게시판 5개를 합친 새 목록(A-M06)
  | 'board-list'   // 같은 게시판의 검색 결과·2쪽 이후: 원본 목록을 그대로 두고 모양만 다듬기
  | 'notice-view'; // 모집 공지사항 글 보기: 공통 틀 + 본문 다듬기

export interface Subpage {
  kind: SubpageKind;
  /** 게시판 페이지일 때 그 게시판 */
  board: NoticeBoardDef | null;
}

function boardFrom(id: string | null): NoticeBoardDef | null {
  return id ? NOTICE_BOARDS.find((b) => b.id === id) ?? null : null;
}

/** 원본 게시판 검색 양식의 값. 검색·쪽 이동은 POST라 주소에 값이 없으므로 화면의 입력칸에서 읽는다. */
function formValue(name: string): string {
  const input = document.querySelector<HTMLInputElement | HTMLSelectElement>(`#contents [name="${name}"]`);
  return (input?.value ?? '').trim();
}

/** 게시판 첫 화면(1쪽, 검색어·기간 없음)이면 true. */
function isFirstPlainPage(params: URLSearchParams): boolean {
  const page = params.get('pageIndex') ?? (document.getElementById('pageIndex') as HTMLInputElement | null)?.value ?? '1';
  if (page !== '' && page !== '1') return false;
  return !params.get('searchKeyword') && !formValue('searchKeyword') && !formValue('sdate') && !formValue('edate');
}

/** 지금 주소가 맡은 하위 페이지면 그 종류를, 아니면 null. */
export function detectSubpage(): Subpage | null {
  if (location.hostname !== 'www.mma.go.kr') return null;
  const params = new URLSearchParams(location.search);
  const path = location.pathname;

  if (path === '/contents.do') {
    const mc = params.get('mc');
    return mc && mc in CONTENT_PAGES ? { kind: 'content', board: null } : null;
  }

  if (path === '/board/boardList.do' || path === '/board/boardView.do') {
    const board = boardFrom(params.get('gesipan_id') ?? (formValue('gesipan_id') || null));
    if (!board) return null;
    if (path === '/board/boardView.do') return { kind: 'notice-view', board };
    return { kind: isFirstPlainPage(params) ? 'notice-list' : 'board-list', board };
  }

  return null;
}
