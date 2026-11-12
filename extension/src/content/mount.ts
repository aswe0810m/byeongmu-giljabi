// 원본 영역 숨김·복원과 확장 루트 관리(명세 2절 "숨김과 복원").

export interface OriginalDom {
  header: HTMLElement;              // #krds-header (숨기지 않음)
  headerInner: HTMLElement | null;  // #krds-header .header-in
  section: HTMLElement;             // #secrion
  footer: HTMLElement | null;       // #krds-footer
  allMenuButton: HTMLButtonElement; // #krds-header button.btn-navi.all
}

export const ROOT_ID = 'bmgj-root';

/** 필수 선택자(#secrion, button.btn-navi.all)가 없으면 null. */
export function findOriginalDom(): OriginalDom | null {
  const section = document.getElementById('secrion');
  const allMenuButton = document.querySelector<HTMLButtonElement>('#krds-header button.btn-navi.all');
  const header = document.getElementById('krds-header');
  if (!section || !allMenuButton || !header) return null;
  return {
    header,
    headerInner: header.querySelector<HTMLElement>('.header-in'),
    section,
    footer: document.getElementById('krds-footer'),
    allMenuButton,
  };
}

interface SavedState { style: string | null; hidden: boolean; }
const saved = new Map<HTMLElement, SavedState>();

function remember(el: HTMLElement): void {
  if (!saved.has(el)) saved.set(el, { style: el.getAttribute('style'), hidden: el.hidden });
}

export function hideOriginal(dom: OriginalDom): void {
  for (const el of [dom.headerInner, dom.section, dom.footer]) {
    if (!el) continue;
    remember(el);
    el.style.setProperty('display', 'none', 'important');
  }
  // 사용자 결정(2026-11-12): 남겨 둔 #krds-header의 아래 여백(12px) 틈으로 원본 body의 파란 배경이
  // 보이므로, 개선 화면일 때만 여백을 0으로. 원래 화면으로 돌아가면 style 속성째 되돌린다.
  remember(dom.header);
  dom.header.style.setProperty('margin-bottom', '0', 'important');
}

export function restoreOriginal(): void {
  for (const [el, state] of saved) {
    if (state.style === null) el.removeAttribute('style');
    else el.setAttribute('style', state.style);
    el.hidden = state.hidden;
  }
  saved.clear();
}

/** #krds-header 바로 뒤에 루트를 한 번만 넣는다. 이미 있으면 그것을 쓴다. */
export function ensureRoot(header: HTMLElement): HTMLElement {
  const existing = document.getElementById(ROOT_ID);
  if (existing) return existing;
  const root = document.createElement('div');
  root.id = ROOT_ID;
  header.insertAdjacentElement('afterend', root);
  return root;
}

export function removeRoot(): void {
  document.getElementById(ROOT_ID)?.remove();
}
