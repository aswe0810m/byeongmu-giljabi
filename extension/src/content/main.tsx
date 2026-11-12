// 시작과 적용 조건(명세 2절, 7절).
import { Component, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { cards, layouts } from '../catalog/cards';
import { validateCatalog } from '../catalog/validate';
import { readAllMenu } from '../menu/readAllMenu';
import { readNews } from '../news/readNews';
import { loadPrefs } from '../storage/prefs';
import { App } from '../ui/App';
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
}

class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { queueMicrotask(() => fail(error)); }
  render() { return this.state.failed ? null : this.props.children; }
}

async function start(): Promise<void> {
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
