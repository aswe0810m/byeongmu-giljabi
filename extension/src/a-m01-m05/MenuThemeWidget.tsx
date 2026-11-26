import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { type Prefs, saveViewMode, subscribePrefs } from '../storage/prefs';
import { MyInfoWidget } from '../ui/MyInfoButton';
import sharedStyles from '../ui/styles.css?inline';
import themeStyles from './menuTheme.css?inline';
import widgetStyles from './widget.css?inline';
import type { PageEnhancements } from './pageEnhancements';

export function MenuThemeWidget({ initialPrefs, page }: { initialPrefs: Prefs; page: PageEnhancements }) {
  const [mode, setMode] = useState(initialPrefs.viewMode);
  const [failed, setFailed] = useState(false);
  useEffect(() => subscribePrefs(prefs => setMode(prefs.viewMode)), []);
  useLayoutEffect(() => {
    page.setEnabled(mode === 'improved');
    return page.restore;
  }, [mode, page]);

  const toggle = async () => {
    setFailed(!(await saveViewMode(mode === 'improved' ? 'original' : 'improved')));
  };

  return <>
    <style>{sharedStyles}</style>
    <style>{widgetStyles}</style>
    {createPortal(<style data-bmgj-a-m01-m05-style="">{themeStyles}</style>, document.head)}
    <MyInfoWidget isMainPage={false} />
    <button type="button" className="bmgj-a-m01-m05-toggle" onClick={() => void toggle()}>
      {mode === 'improved' ? '원래 화면 보기' : '병무길잡이 테마 켜기'}
    </button>
    {failed && <div className="bmgj-a-m01-m05-status" role="status">화면 설정을 저장하지 못했어요. 다시 눌러 주세요.</div>}
  </>;
}
