// 모집 공지사항을 이루는 군별 게시판 5개(원본 게시판 위쪽 탭, 2026-11-24 확인).
import { SITE_ORIGIN } from '../../catalog/cards';

export interface NoticeBoardDef {
  id: string;    // gesipan_id
  mc: string;    // 메뉴 코드
  label: string; // 화면에 보이는 군 이름
}

export const NOTICE_BOARDS: NoticeBoardDef[] = [
  { id: '69', mc: 'usr0000127', label: '육군' },
  { id: '70', mc: 'usr0000128', label: '해군' },
  { id: '72', mc: 'usr0000130', label: '해병대' },
  { id: '71', mc: 'usr0000129', label: '공군' },
  { id: '267', mc: 'mma0001938', label: '취업맞춤특기병' },
];

/** 한 번에 읽는 글 수. 원본 목록의 `건씩 보기` 선택지(10~50) 안의 값. */
export const LIST_PAGE_UNIT = 20;

export function boardListUrl(board: NoticeBoardDef, pageUnit = LIST_PAGE_UNIT): string {
  return `${SITE_ORIGIN}/board/boardList.do?gesipan_id=${board.id}&mc=${board.mc}&pageUnit=${pageUnit}`;
}

/** 원본 목록 링크에서 검색·쪽 정보를 뺀 글 보기 주소. */
export function boardViewUrl(board: NoticeBoardDef, postNo: string): string {
  return `${SITE_ORIGIN}/board/boardView.do?gesipan_id=${board.id}&gsgeul_no=${encodeURIComponent(postNo)}&mc=${board.mc}`;
}
