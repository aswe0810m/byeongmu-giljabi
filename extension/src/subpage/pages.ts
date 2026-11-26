// 병무청 하위 페이지 공통 틀 — 페이지 등록부.
// 메인 카드를 눌러 들어간 병무청 페이지 중 "등록된 페이지"만 공통 틀(확장 헤더 + 카드 배너 + 본문 다듬기)로 보여 준다.
// 각 담당 범위는 자기 폴더에서 registerSubpages()로 등록한다(예: ../a-m01-m05/register.ts).
// 디자인 통일(2026-11-26): A-M01~A-M10이 모두 이 틀을 쓴다. 병무민원 세부 화면 등록부(src/portal/page/registry.ts)와 같은 방식.

import { getCard, type HomeCard } from '../catalog/cards';
import { NOTICE_BOARDS, type NoticeBoardDef } from './notice/boards';

/** 등록 내용의 공통 부분 */
export interface SubpageEntryBase {
  /** 이 페이지로 오는 메인 카드 ID(catalog/cards.ts). 배너에 그 카드의 아이콘·이름·설명이 나온다. */
  cardId: string;
  /** 이 페이지에만 넣을 문서 CSS. 선택자는 html.bmgj-sub 아래로 쓴다(원래 화면에서는 적용되지 않도록). */
  docCss?: string;
  /** 새 화면일 때 <html>에 붙일 속성(이 페이지만의 CSS가 고를 표식). 원래 화면으로 돌아가면 뗀다. */
  rootAttrs?: Record<string, string>;
}

export interface SubpageEntry extends SubpageEntryBase {
  /** contents.do?mc= 값 */
  mc: string;
}

/**
 * 탭으로 이어진 페이지 묶음(버그 수정 2026-11-26). 카드가 여는 첫 페이지의 탭(군별·분야별 등)을 누르면 mc가 다른
 * 페이지로 넘어가므로, 주소 하나가 아니라 "이 묶음의 탭이 있는 페이지"를 같은 카드의 페이지로 본다.
 */
export interface SubpageFamily extends SubpageEntryBase {
  /** 기록·오류 안내용 이름 */
  id: string;
  /** 지금 문서가 이 묶음의 페이지면 true. 원본을 숨기기 전(시작할 때)에 부른다. */
  match: () => boolean;
}

const contentPages = new Map<string, SubpageEntry>();
const families: SubpageFamily[] = [];

/** 탭 묶음을 등록한다. mc로 등록한 페이지가 먼저이고, 묶음은 등록한 순서대로 본다. */
export function registerSubpageFamilies(list: SubpageFamily[]): void {
  for (const family of list) {
    if (families.some((f) => f.id === family.id)) {
      console.error('[bmgj] subpage family already registered', family.id);
      continue;
    }
    families.push(family);
  }
}

/** 페이지를 등록한다. 같은 mc가 이미 있으면 먼저 등록한 것을 두고 콘솔에 알린다. */
export function registerSubpages(entries: SubpageEntry[]): void {
  for (const entry of entries) {
    const existing = contentPages.get(entry.mc);
    if (existing) {
      console.error('[bmgj] subpage already registered', entry.mc, existing.cardId, entry.cardId);
      continue;
    }
    contentPages.set(entry.mc, entry);
  }
}

// A-M06~A-M10(오동규): 본문 페이지 4개. 모집 공지사항(A-M06)은 게시판이라 아래 NOTICE_CARD로 따로 처리한다.
registerSubpages([
  { mc: 'usr0000167', cardId: 'A-M07' }, // 병역판정검사(병역판정검사 대상자)
  { mc: 'mma0002909', cardId: 'A-M08' }, // 입영판정검사(입영판정검사란?)
  { mc: 'usr0000174', cardId: 'A-M09' }, // 재학생 입영연기
  { mc: 'usr0000295', cardId: 'A-M10' }, // 현역병 선발취소 및 입영일자 연기신청
]);

/** 모집 공지사항 게시판(군별 5개)과 글 보기의 카드 */
const NOTICE_CARD = 'A-M06';

export type SubpageKind =
  | 'content'      // 본문 페이지: 공통 틀 + 본문 다듬기
  | 'notice-list'  // 모집 공지사항 첫 화면: 군별 게시판 5개를 합친 새 목록(A-M06)
  | 'board-list'   // 같은 게시판의 검색 결과·2쪽 이후: 원본 목록을 그대로 두고 모양만 다듬기
  | 'notice-view'; // 모집 공지사항 글 보기: 공통 틀 + 본문 다듬기

export interface Subpage {
  kind: SubpageKind;
  /** 배너에 보여 줄 카드 */
  card: HomeCard;
  /** 본문 페이지면 등록 내용 */
  entry: SubpageEntryBase | null;
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

/** 지금 주소가 등록된 하위 페이지면 그 종류를, 아니면 null. 카드를 찾지 못하면(카드 데이터 변경 등) null. */
export function detectSubpage(): Subpage | null {
  if (location.hostname !== 'www.mma.go.kr') return null;
  const params = new URLSearchParams(location.search);
  const path = location.pathname;
  try {
    if (path === '/contents.do') {
      const codes = params.getAll('mc');
      const entry = codes.length === 1 ? contentPages.get(codes[0]) : undefined;
      if (entry) return { kind: 'content', card: getCard(entry.cardId), entry, board: null };
    }

    if (path === '/board/boardList.do' || path === '/board/boardView.do') {
      const board = boardFrom(params.get('gesipan_id') ?? (formValue('gesipan_id') || null));
      if (board) {
        const card = getCard(NOTICE_CARD);
        if (path === '/board/boardView.do') return { kind: 'notice-view', card, entry: null, board };
        return { kind: isFirstPlainPage(params) ? 'notice-list' : 'board-list', card, entry: null, board };
      }
    }

    // 탭 묶음: 첫 페이지에서 탭을 눌러 넘어간 페이지(주소는 contents.do가 아닐 수도 있다)
    for (const family of families) {
      let matched = false;
      try {
        matched = family.match();
      } catch (error) {
        console.error('[bmgj] subpage family match failed', family.id, error);
      }
      if (matched) return { kind: 'content', card: getCard(family.cardId), entry: family, board: null };
    }
  } catch (error) {
    console.error('[bmgj] subpage card not found', error);
  }
  return null;
}
