// 하위 페이지 새 화면 시작(사용자 결정 2026-11-24). content/main.tsx가 메인이 아닌 병무청 페이지에서 부른다.
// 맡은 페이지가 아니거나 원본 틀이 다르면 false를 돌려주고, 그때는 기존처럼 내 정보 버튼만 붙는다.
import { Component, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { readAllMenu } from '../menu/readAllMenu';
import { loadPrefs } from '../storage/prefs';
import baseStyles from '../ui/styles.css?inline';
import contentStyles from './content.css?inline';
import { readBoardList } from './notice/readBoard';
import { detectSubpage } from './pages';
import { readSubpage } from './readSubpage';
import { SubpageApp, type SubpageMounts } from './SubpageApp';
import subpageStyles from './subpage.css?inline';
import { ensureDocStyle, ensureHosts, findSubpageDom, removeHosts, restoreSubpageOriginal } from './subpageDom';

const SHADOW_STYLES = `${baseStyles}\n${subpageStyles}`;

let root: Root | null = null;

/** 호스트에 Shadow DOM을 붙이고 React가 그릴 자리를 돌려준다. */
function shadowMount(host: HTMLElement): HTMLElement {
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
  shadow.replaceChildren();
  const style = document.createElement('style');
  style.textContent = SHADOW_STYLES;
  const container = document.createElement('div');
  shadow.append(style, container);
  return container;
}

/** 그리다가 오류가 나면 확장이 넣은 것을 모두 걷어내고 원본 화면으로 되돌린다. */
function fail(error: unknown): void {
  console.error('[bmgj] subpage render failed', error);
  try { root?.unmount(); } catch { /* 이미 정리됨 */ }
  root = null;
  restoreSubpageOriginal();
  removeHosts();
  document.getElementById('bmgj-root')?.remove();
}

class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { queueMicrotask(() => fail(error)); }
  render() { return this.state.failed ? null : this.props.children; }
}

export async function startSubpage(): Promise<boolean> {
  const page = detectSubpage();
  if (!page) return false;
  const dom = findSubpageDom();
  if (!dom) {
    console.error('[bmgj] subpage DOM not found');
    return false;
  }
  try {
    // 원본을 숨기기 전에 읽는다.
    const info = readSubpage();
    const allMenu = readAllMenu();
    const noticeRows = page.kind === 'notice-list' && page.board ? readBoardList(document, page.board.id) : null;
    const prefs = await loadPrefs();

    ensureDocStyle(contentStyles);
    const hosts = ensureHosts(dom, page.kind);
    const mounts: SubpageMounts = {
      side: shadowMount(hosts.side),
      notice: hosts.notice ? shadowMount(hosts.notice) : null,
      footer: shadowMount(hosts.footer),
    };
    root = createRoot(shadowMount(hosts.top));
    root.render(
      <ErrorBoundary>
        <SubpageApp
          page={page}
          dom={dom}
          info={info}
          hosts={hosts}
          mounts={mounts}
          initialPrefs={prefs}
          allMenu={allMenu}
          noticeRows={noticeRows}
        />
      </ErrorBoundary>,
    );
    return true;
  } catch (error) {
    fail(error);
    return false;
  }
}
