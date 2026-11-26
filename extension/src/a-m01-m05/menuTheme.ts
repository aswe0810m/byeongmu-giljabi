export type MenuTheme = 'overview' | 'plan' | 'recruit';

/** 공통 틀이 새 화면일 때 <html>에 붙이는 표식. menuTheme.css가 페이지별 규칙을 고를 때 쓴다. */
export const THEME_ATTRIBUTE = 'data-bmgj-a-m01-m05-theme';

// 유입 경로나 공통 DOM이 아닌 담당 카드의 세 도착 주소만 허용한다.
export const PAGES: Readonly<Record<string, { cardId: string; theme: MenuTheme }>> = {
  mma0003746: { cardId: 'A-M01', theme: 'overview' }, // 안내 및 신청(지원)
  mma0000743: { cardId: 'A-M04', theme: 'plan' }, // 이달의 모집계획
  mma0000386: { cardId: 'A-M05', theme: 'recruit' }, // 안내 및 지원절차
};
