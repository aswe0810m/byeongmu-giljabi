// 시작과 적용 조건(명세 2절, 7절).
import { Component, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { cards, layouts } from '../catalog/cards';
import { PORTAL_EXPECTED_COUNTS, portalCards, portalLayouts } from '../catalog/portalCards';
import { validateCatalog } from '../catalog/validate';
import { readAllMenu } from '../menu/readAllMenu';
import { readNews } from '../news/readNews';
import { loadPrefs } from '../storage/prefs';
import { App } from '../ui/App';
import { PortalApp } from '../portal/PortalApp';
import { openProfileGuideAfterLogin, startProfileSync } from '../profile/profileSync';
import { findPortalFrame, readPortalMenu, restoreFrame } from '../portal/portalDom';
import { MyInfoWidget } from '../ui/MyInfoButton';
import styles from '../ui/styles.css?inline';
import { ROOT_ID, ensureRoot, findOriginalDom, removeRoot, restoreOriginal } from './mount';

function isMainPage(): boolean {
  return location.pathname === '/' || location.pathname === '/index.do';
}

/** 숨김·렌더링에 쓰는 Shadow DOM 루트를 준비하고 React 루트를 만든다. */
function createShadowRoot(host: HTMLElement): Root {
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
  shadow.replaceChildren();
  const style = document.createElement('style');
  style.textContent = styles;
  const container = document.createElement('div');
  shadow.append(style, container);
  return createRoot(container);
}

/**
 * 메인이 아닌 병무청 페이지(사용자 결정 2026-11-05): 화면은 바꾸지 않고
 * 오른쪽 아래의 `내 정보` 버튼과 떠 있는 내 정보 창만 덧붙인다.
 */
function startWidgetOnly(): void {
  let host = document.getElementById(ROOT_ID);
  if (!host) {
    host = document.createElement('div');
    host.id = ROOT_ID;
    document.body.append(host);
  }
  reactRoot = createShadowRoot(host);
  reactRoot.render(
    <ErrorBoundary>
      <MyInfoWidget isMainPage={false} />
    </ErrorBoundary>,
  );
}

let reactRoot: Root | null = null;

/** 렌더링 중 예외: 확장 루트 제거 + 원본 복원. */
function fail(error: unknown): void {
  console.error('[bmgj] render failed', error);
  try { reactRoot?.unmount(); } catch { /* 이미 정리됨 */ }
  reactRoot = null;
  removeRoot();
  restoreOriginal();
  restoreFrame();
}

class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { queueMicrotask(() => fail(error)); }
  render() { return this.state.failed ? null : this.props.children; }
}

/**
 * 병무민원 화면이 병무청 첫 화면과 같은 글꼴로 보이도록 확장에 넣은 Pretendard GOV를 등록한다.
 * (병무청 누리집의 글꼴 파일은 다른 출처라 포털에서 불러올 수 없음.) Shadow DOM 안에서도 쓰이도록 문서에 등록.
 */
function ensurePortalFont(): void {
  if (document.getElementById('bmgj-font')) return;
  const style = document.createElement('style');
  style.id = 'bmgj-font';
  const url = chrome.runtime.getURL('fonts/PretendardGOV-Medium.subset.woff2');
  style.textContent = `@font-face{font-family:"Pretendard GOV";src:url("${url}") format("woff2");font-display:swap;}`;
  (document.head ?? document.documentElement).append(style);
}

/**
 * 병무민원포털(사용자 결정 2026-11-12): 메인의 `병무민원`으로 가면 열리는 포털 첫 화면을
 * 메인과 같은 디자인으로 바꾼다. 포털은 바깥 틀 + iframe#main 구조라 바깥 틀에 그리고,
 * 프레임에 첫 화면이 열려 있을 때만 프레임을 숨긴다(PortalApp).
 */
async function startPortal(): Promise<void> {
  const frame = findPortalFrame();
  if (!frame) return; // 팝업 등 틀이 없는 포털 화면
  openProfileGuideAfterLogin(frame);

  const check = validateCatalog(portalCards, portalLayouts, PORTAL_EXPECTED_COUNTS);
  if (!check.ok) {
    console.error('[bmgj] portal catalog invalid', check.errors);
    return;
  }

  ensurePortalFont();
  const menu = readPortalMenu();
  const prefs = await loadPrefs();

  let host = document.getElementById(ROOT_ID);
  if (!host) {
    host = document.createElement('div');
    host.id = ROOT_ID;
    frame.insertAdjacentElement('beforebegin', host);
  }
  host.classList.add('bmgj-theme-portal'); // 병무민원 화면 색(styles.css)
  reactRoot = createShadowRoot(host);
  reactRoot.render(
    <ErrorBoundary>
      <PortalApp frame={frame} initialPrefs={prefs} menu={menu} />
    </ErrorBoundary>,
  );
}

async function start(): Promise<void> {
  if (location.hostname === 'mwpt.mma.go.kr') {
    // 내 정보(0.4.8): 통합지원서 화면은 포털 프레임 안에 열리므로 모든 프레임에서 인적사항 반영을 켠다.
    startProfileSync();
    if (window.top !== window) return;
    await startPortal();
    return;
  }
  // 원본 병무청 사이트의 프레임에는 추가 UI를 만들지 않는다.
  if (window.top !== window) return;
  if (!isMainPage()) {
    startWidgetOnly();
    return;
  }

  const check = validateCatalog(cards, layouts);
  if (!check.ok) {
    console.error('[bmgj] catalog invalid', check.errors);
    return;
  }

  const dom = findOriginalDom();
  if (!dom) {
    console.error('[bmgj] DOM not found');
    return;
  }

  const news = readNews(); // 원본을 숨기기 전, 시작할 때 한 번 읽는다
  const allMenu = readAllMenu(); // 원본 전체 메뉴(#mobile-nav)
  const prefs = await loadPrefs();

  reactRoot = createShadowRoot(ensureRoot(dom.header));
  reactRoot.render(
    <ErrorBoundary>
      <App dom={dom} initialPrefs={prefs} news={news} allMenu={allMenu} />
    </ErrorBoundary>,
  );
}

start().catch(fail);
