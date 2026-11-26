// a-m01-m05: 담당 카드 세 페이지를 병무청 하위 페이지 공통 틀(../subpage)에 등록한다.
// 디자인 통일(2026-11-26): 헤더·카드 배너·레이아웃·원래 화면 전환·오류 복원은 공통 틀이 하고,
// 여기서는 이 페이지들에만 필요한 본문 꾸밈(menuTheme.css)과 페이지 표식만 넘긴다.
import { registerSubpages } from '../subpage/pages';
import css from './menuTheme.css?inline';
import { PAGES, THEME_ATTRIBUTE } from './menuTheme';

export function registerAM01M05(): void {
  registerSubpages(Object.entries(PAGES).map(([mc, { cardId, theme }]) => ({
    mc,
    cardId,
    docCss: css,
    rootAttrs: { [THEME_ATTRIBUTE]: theme },
  })));
}
