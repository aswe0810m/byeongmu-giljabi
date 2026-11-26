import { Component, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { loadPrefs } from '../storage/prefs';
import { MyInfoWidget } from '../ui/MyInfoButton';
import sharedStyles from '../ui/styles.css?inline';
import { MenuThemeWidget } from './MenuThemeWidget';
import { HOST_ID, resolveMenuTheme } from './menuTheme';
import { createPageEnhancements } from './pageEnhancements';

class ThemeBoundary extends Component<{ children: ReactNode; restore: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) {
    this.props.restore();
    console.error('[bmgj-a-m01-m05] render failed', error);
  }
  render() {
    return this.state.failed
      ? <><style>{sharedStyles}</style><MyInfoWidget isMainPage={false} /></>
      : this.props.children;
  }
}

/** 대상 외에는 false를 반환해 main의 기존 처리로 이어 간다. */
export async function startAM01M05(): Promise<boolean> {
  const theme = resolveMenuTheme();
  if (!theme) return false;
  if (document.getElementById(HOST_ID)) return true;

  const page = createPageEnhancements(theme);
  let root: Root | undefined;
  const host = document.createElement('div');
  host.id = HOST_ID;
  host.className = 'bmgj-a-m01-m05-root';
  try {
    const prefs = await loadPrefs();
    const shadow = host.attachShadow({ mode: 'open' });
    document.body.append(host);
    root = createRoot(shadow);
    root.render(<ThemeBoundary restore={page.restore}><MenuThemeWidget initialPrefs={prefs} page={page} /></ThemeBoundary>);
    return true;
  } catch (error) {
    try { root?.unmount(); } catch { /* 복원은 React 정리 실패와 관계없이 진행한다. */ }
    finally { page.restore(); host.remove(); }
    console.error('[bmgj-a-m01-m05] start failed', error);
    return false;
  }
}
