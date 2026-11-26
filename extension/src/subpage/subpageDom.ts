// 하위 페이지의 원본 영역 숨김·복원과 확장 화면 자리(Shadow DOM 호스트) 관리.
// 디자인 통일(2026-11-26): 원본 왼쪽 메뉴(#side)는 숨기기만 하고 새 왼쪽 메뉴는 그리지 않는다(본문 전체 너비).
// 본문(#contents)은 원본 그대로 두고(링크·버튼·스크립트가 원래대로 동작), 문서에 넣은 CSS로 모양만 다듬는다.

import { ROOT_ID } from '../content/mount';
import type { SubpageKind } from './pages';

export const DOC_CLASS = 'bmgj-sub';
const DOC_STYLE_ID = 'bmgj-sub-doc';

export interface SubpageDom {
  header: HTMLElement;              // #krds-header (숨기지 않음, 위에 새 헤더)
  headerInner: HTMLElement | null;  // #krds-header .header-in
  section: HTMLElement;             // #secrion
  path: HTMLElement | null;         // #path (경로)
  side: HTMLElement | null;         // #side (왼쪽 메뉴, 숨김)
  colgroup: HTMLElement;            // #colgroup (제목 + 본문)
  subHead: HTMLElement | null;      // #sub_head (페이지 제목)
  tabs: HTMLElement | null;         // .tab_common (군별 게시판 탭)
  contents: HTMLElement;            // #contents (본문)
  quickLinks: HTMLElement | null;   // #container_box3 (주요누리집 바로가기)
  footer: HTMLElement | null;       // #krds-footer
}

/** 원본 틀이 다르면(필수 요소가 없으면) null — 그때는 화면을 바꾸지 않는다. */
export function findSubpageDom(): SubpageDom | null {
  const header = document.getElementById('krds-header');
  const section = document.getElementById('secrion');
  const side = document.getElementById('side');
  const colgroup = document.getElementById('colgroup');
  const contents = document.getElementById('contents');
  if (!header || !section || !colgroup || !contents) return null;
  return {
    header,
    headerInner: header.querySelector<HTMLElement>('.header-in'),
    section,
    path: document.getElementById('path'),
    side,
    colgroup,
    subHead: document.getElementById('sub_head'),
    tabs: colgroup.querySelector<HTMLElement>(':scope > .tab_common'),
    contents,
    quickLinks: document.getElementById('container_box3'),
    footer: document.getElementById('krds-footer'),
  };
}

interface SavedState { style: string | null; }
const saved = new Map<HTMLElement, SavedState>();

function hide(el: HTMLElement | null): void {
  if (!el) return;
  if (!saved.has(el)) saved.set(el, { style: el.getAttribute('style') });
  el.style.setProperty('display', 'none', 'important');
}

/** 개선 화면: 원본의 헤더 안쪽·경로·왼쪽 메뉴·제목·탭·푸터를 숨기고, 문서에 본문 다듬기 CSS를 켠다. */
export function hideSubpageOriginal(dom: SubpageDom, kind: SubpageKind): void {
  for (const el of [dom.headerInner, dom.path, dom.side, dom.subHead, dom.quickLinks, dom.footer]) hide(el);
  // 게시판 탭은 합친 목록의 군 필터가 대신하고, 글 보기에서는 경로·왼쪽 메뉴로 목록에 돌아간다.
  // 검색 결과(board-list)에서는 탭을 남겨 다른 군 게시판으로 갈 수 있게 한다.
  if (kind === 'notice-list' || kind === 'notice-view') hide(dom.tabs);
  if (kind === 'notice-list') hide(dom.contents);
  // 메인과 같은 이유(2026-11-12): #krds-header 아래 여백 틈으로 원본 배경이 보이지 않게.
  if (!saved.has(dom.header)) saved.set(dom.header, { style: dom.header.getAttribute('style') });
  dom.header.style.setProperty('margin-bottom', '0', 'important');
  document.documentElement.classList.add(DOC_CLASS);
}

function unhide(el: HTMLElement | null): void {
  const state = el ? saved.get(el) : undefined;
  if (!el || !state) return;
  if (state.style === null) el.removeAttribute('style');
  else el.setAttribute('style', state.style);
  saved.delete(el);
}

/** 모집 공지사항에서 `원래 목록 보기`: 합친 목록 대신 원본 목록(검색·쪽 이동)과 군별 탭을 보여 준다. */
export function setOriginalNoticeList(dom: SubpageDom, showOriginal: boolean): void {
  if (showOriginal) {
    unhide(dom.contents);
    unhide(dom.tabs);
  } else {
    hide(dom.contents);
    hide(dom.tabs);
  }
}

export function restoreSubpageOriginal(): void {
  for (const [el, state] of saved) {
    if (state.style === null) el.removeAttribute('style');
    else el.setAttribute('style', state.style);
  }
  saved.clear();
  document.documentElement.classList.remove(DOC_CLASS);
}

/** 본문 다듬기 CSS를 문서에 한 번만 넣는다. html.bmgj-sub 일 때만 적용되도록 모든 규칙이 그 아래에 있다. */
export function ensureDocStyle(css: string): void {
  if (document.getElementById(DOC_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = DOC_STYLE_ID;
  style.textContent = css;
  (document.head ?? document.documentElement).append(style);
}

export interface SubpageHosts {
  top: HTMLElement;          // 헤더·카드 배너 (#bmgj-root)
  notice: HTMLElement | null; // 합친 공지 목록 (원본 #contents 앞)
  footer: HTMLElement;       // 푸터 (#secrion 뒤)
}

function ensureHost(id: string, place: (el: HTMLElement) => void): HTMLElement {
  const existing = document.getElementById(id);
  if (existing) return existing;
  const el = document.createElement('div');
  el.id = id;
  place(el);
  return el;
}

export function ensureHosts(dom: SubpageDom, kind: SubpageKind): SubpageHosts {
  return {
    top: ensureHost(ROOT_ID, (el) => dom.header.insertAdjacentElement('afterend', el)),
    notice: kind === 'notice-list'
      ? ensureHost('bmgj-sub-notice', (el) => dom.contents.insertAdjacentElement('beforebegin', el))
      : null,
    footer: ensureHost('bmgj-sub-footer', (el) => dom.section.insertAdjacentElement('afterend', el)),
  };
}

/** 원래 화면일 때 확장이 넣은 자리(맨 위 호스트 제외)를 접는다. :host 규칙보다 앞서도록 인라인 스타일로. */
export function setHostsVisible(hosts: SubpageHosts, visible: boolean): void {
  for (const el of [hosts.notice, hosts.footer]) {
    if (!el) continue;
    if (visible) el.style.removeProperty('display');
    else el.style.setProperty('display', 'none', 'important');
  }
}

export function removeHosts(): void {
  for (const id of ['bmgj-sub-notice', 'bmgj-sub-footer']) document.getElementById(id)?.remove();
  document.getElementById(PAGE_STYLE_ID)?.remove();
}

const PAGE_STYLE_ID = 'bmgj-sub-page';

/** 등록된 페이지만의 문서 CSS를 한 번만 넣는다(html.bmgj-sub 아래 규칙이라 원래 화면에서는 적용되지 않음). */
export function ensurePageStyle(css: string | undefined): void {
  if (!css || document.getElementById(PAGE_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = PAGE_STYLE_ID;
  style.textContent = css;
  (document.head ?? document.documentElement).append(style);
}

/** 등록된 페이지의 <html> 표식을 붙이거나 뗀다. */
export function setRootAttrs(attrs: Record<string, string> | undefined, on: boolean): void {
  for (const [name, value] of Object.entries(attrs ?? {})) {
    if (on) document.documentElement.setAttribute(name, value);
    else document.documentElement.removeAttribute(name);
  }
}
