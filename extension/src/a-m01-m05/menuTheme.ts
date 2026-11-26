export type MenuTheme = 'overview' | 'plan' | 'recruit';

export const THEME_ATTRIBUTE = 'data-bmgj-a-m01-m05-theme';
export const ACTIVE_CLASS = 'bmgj-a-m01-m05-active';
export const HOST_ID = 'bmgj-a-m01-m05-root';

// 유입 경로나 공통 DOM이 아닌 담당 카드의 세 도착 주소만 허용한다.
const THEMES: Readonly<Record<string, MenuTheme>> = {
  mma0003746: 'overview', // A-M01 안내 및 신청(지원)
  mma0000743: 'plan', // A-M04 이달의 모집계획
  mma0000386: 'recruit', // A-M05 안내 및 지원절차
};

export function resolveMenuTheme(): MenuTheme | null {
  if (window.top !== window || location.hostname !== 'www.mma.go.kr'
    || location.pathname !== '/contents.do' || !document.getElementById('contents')) return null;
  const codes = new URL(location.href).searchParams.getAll('mc');
  return codes.length === 1 && Object.prototype.hasOwnProperty.call(THEMES, codes[0]) ? THEMES[codes[0]] : null;
}
