// a-m01-m05: 담당 카드 세 페이지를 병무청 하위 페이지 공통 틀(../subpage)에 등록한다.
// 디자인 통일(2026-11-26): 헤더·카드 배너·레이아웃·원래 화면 전환·오류 복원은 공통 틀이 하고,
// 여기서는 이 페이지들에만 필요한 본문 꾸밈(menuTheme.css)과 페이지 표식만 넘긴다.
// 버그 수정(2026-11-26): 첫 페이지의 탭(군별·분야별 등)으로 넘어간 페이지도 같은 카드의 화면으로 등록한다.
import { registerSubpageFamilies, registerSubpages } from '../subpage/pages';
import css from './menuTheme.css?inline';
import { PAGES, THEME_ATTRIBUTE } from './menuTheme';

/** 원본 탭 묶음(#colgroup 안)에 이 주소로 가는 탭이 있으면 그 묶음의 페이지다. */
function hasTabTo(tabClass: string, mc: string): boolean {
  return document.querySelector(`#colgroup .${tabClass} a[href*="mc=${mc}"]`) !== null;
}

export function registerAM01M05(): void {
  registerSubpages(Object.entries(PAGES).map(([mc, { cardId, theme }]) => ({
    mc,
    cardId,
    docCss: css,
    rootAttrs: { [THEME_ATTRIBUTE]: theme },
  })));

  registerSubpageFamilies([
    {
      // 안내 및 지원절차: 육군·해군·해병대·공군 탭(.tab_top) → 분야 탭(기술행정병 등) → 하위 탭(모집안내·평가요소·
      // 군사특기임무·지원절차). 모든 페이지 위쪽에 같은 군 탭이 있고, 그 탭의 육군 주소가 카드의 첫 페이지(mma0000386)다.
      id: 'a-m05-recruit',
      cardId: 'A-M05',
      match: () => hasTabTo('tab_top', 'mma0000386'),
      docCss: css,
      rootAttrs: { [THEME_ATTRIBUTE]: 'recruit' },
    },
    {
      // 이달의 모집계획: 전체·군별 모집계획·지난회차 합격점수·지난회차 모집계획 탭(.tab_common). 군별 탭은 게시판이다.
      id: 'a-m04-plan',
      cardId: 'A-M04',
      match: () => hasTabTo('tab_common', 'mma0000743'),
      docCss: css,
      rootAttrs: { [THEME_ATTRIBUTE]: 'plan' },
    },
  ]);
}
