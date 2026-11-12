import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS } from '../catalog/cards';
import type { OriginalDom } from '../content/mount';
import type { MenuCategory } from '../menu/readAllMenu';
import type { NewsData } from '../news/readNews';
import { hideOriginal, restoreOriginal } from '../content/mount';
import type { Prefs, ViewMode } from '../storage/prefs';
import { saveGroup, saveViewMode, subscribePrefs } from '../storage/prefs';
import { AllMenuDialog } from './AllMenuDialog';
import { Footer } from './Footer';
import { GroupDialog } from './GroupDialog';
import { Header } from './Header';
import { Hero } from './Hero';
import { MenuPanel } from './MenuPanel';
import { MyInfoWidget } from './MyInfoButton';
import { NewsPanel } from './NewsPanel';

const SAVE_FAILED = '설정을 저장하지 못했어요. 다음 방문에는 다시 선택해야 할 수 있어요.';
const TOAST_MS = 4000;

interface AppProps { dom: OriginalDom; initialPrefs: Prefs; news: NewsData; allMenu: MenuCategory[]; }

export function App({ dom, initialPrefs, news, allMenu }: AppProps) {
  const [group, setGroup] = useState<GroupId | null>(initialPrefs.group);
  const [viewMode, setViewMode] = useState<ViewMode>(initialPrefs.viewMode);
  const [toast, setToast] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const [allMenuOpen, setAllMenuOpen] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const originalButtonRef = useRef<HTMLButtonElement>(null);
  const allMenuLinkRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const allMenuReturn = useRef<HTMLElement | null>(null);
  const closeNavListener = useRef<{ el: HTMLElement; fn: () => void } | null>(null);
  const selectFocusAfterChoice = useRef(false);
  const focusTarget = useRef<'toggle' | 'original' | null>(null);

  const dialogOpen = viewMode === 'improved' && group === null;
  const anyModalOpen = dialogOpen || allMenuOpen;

  // 화면 모드에 맞춰 원본을 숨기거나 복원한다.
  useLayoutEffect(() => {
    if (viewMode === 'improved') hideOriginal(dom);
    else restoreOriginal();
  }, [viewMode, dom]);

  // 다른 탭의 변경 반영(6절).
  useEffect(
    () =>
      subscribePrefs((prefs) => {
        setGroup(prefs.group);
        setViewMode(prefs.viewMode);
      }),
    [],
  );

  // 대화상자가 열린 동안 뒤의 화면은 조작할 수 없게 한다.
  useEffect(() => {
    frameRef.current?.toggleAttribute('inert', anyModalOpen);
  }, [anyModalOpen]);


  // 원본의 건너뛰기 링크(콘텐츠로/대메뉴로 바로가기)는 숨긴 #secrion, #nav를 가리키므로
  // 개선 화면에서는 각각 소개 배너와 메뉴 패널로 이동시킨다(사용자 결정, 7단계).
  useEffect(() => {
    if (viewMode !== 'improved' || !group) return;
    const targets: Record<string, string> = { '#secrion': '.bmgj-hero', '#nav': '.bmgj-panel' };
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a');
      const selector = anchor ? targets[anchor.getAttribute('href') ?? ''] : undefined;
      const target = selector ? frameRef.current?.querySelector<HTMLElement>(selector) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ block: 'start' });
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [viewMode, group]);

  // 전체 메뉴 창이 닫히면 연 버튼(안내 띠 또는 헤더 검색)으로 포커스를 돌려준다.
  useEffect(() => {
    if (!allMenuOpen && allMenuReturn.current) {
      allMenuReturn.current.focus();
      allMenuReturn.current = null;
    }
  }, [allMenuOpen]);

  // 사용자가 전환했을 때 새로 나타난 버튼으로 포커스를 옮긴다.
  useEffect(() => {
    if (focusTarget.current === 'toggle') toggleRef.current?.focus();
    if (focusTarget.current === 'original' && !dialogOpen) originalButtonRef.current?.focus();
    focusTarget.current = null;
  }, [viewMode, dialogOpen]);

  // 첫 선택 후 선택창이 닫히면 헤더의 그룹 select로 포커스를 둔다.
  useEffect(() => {
    if (!dialogOpen && selectFocusAfterChoice.current) {
      selectFocusAfterChoice.current = false;
      frameRef.current?.querySelector<HTMLSelectElement>('.bmgj-select')?.focus();
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const persist = useCallback(async (saving: Promise<boolean>) => {
    if (!(await saving)) setToast(SAVE_FAILED);
  }, []);

  const announce = (message: string) => {
    setAnnouncement('');
    window.setTimeout(() => setAnnouncement(message), 50);
  };

  const changeGroup = (next: GroupId) => {
    if (next === group) return;
    setGroup(next);
    announce(`${GROUP_LABELS[next]} 메뉴로 바뀌었어요`);
    void persist(saveGroup(next));
  };

  const chooseFirstGroup = (next: GroupId) => {
    selectFocusAfterChoice.current = true;
    setGroup(next);
    void persist(saveGroup(next));
  };

  const showOriginal = useCallback(() => {
    focusTarget.current = 'toggle';
    setAllMenuOpen(false);
    setViewMode('original');
    void persist(saveViewMode('original'));
  }, [persist]);

  // 전체 메뉴 보기(사용자 결정 2026-11-05): 원본 메뉴를 읽어 만든 새 전체 메뉴 창을 연다.
  // 원본 메뉴를 읽지 못했으면 명세 3.4대로 원본 전체 메뉴를 연다.
  const openAllMenu = (returnTo: HTMLElement | null) => {
    if (allMenu.length > 0) {
      allMenuReturn.current = returnTo;
      setAllMenuOpen(true);
      return;
    }
    openOriginalAllMenu();
  };

  const closeAllMenu = useCallback(() => setAllMenuOpen(false), []);

  // 3.4 원본 전체 메뉴 버튼을 대신 눌러 #mobile-nav를 연다(대체 경로).
  const openOriginalAllMenu = () => {
    const button = dom.allMenuButton.isConnected
      ? dom.allMenuButton
      : document.querySelector<HTMLButtonElement>('#krds-header button.btn-navi.all');
    if (!button) {
      // 버튼을 못 찾으면 원본 화면으로 잠시 전환(모드는 저장하지 않음).
      focusTarget.current = 'toggle';
      setViewMode('original');
      return;
    }
    const closeNav = document.getElementById('close-nav');
    if (closeNavListener.current) {
      closeNavListener.current.el.removeEventListener('click', closeNavListener.current.fn);
      closeNavListener.current = null;
    }
    if (closeNav) {
      const fn = () => {
        closeNavListener.current = null;
        window.setTimeout(() => allMenuLinkRef.current?.focus(), 0);
      };
      closeNav.addEventListener('click', fn, { once: true });
      closeNavListener.current = { el: closeNav, fn };
    }
    button.click();
  };


  const turnOn = () => {
    focusTarget.current = 'original';
    setViewMode('improved');
    void persist(saveViewMode('improved'));
  };

  const toastRegion = (
    <div className="bmgj-toast-region" role="status">
      {toast && <div className="bmgj-toast">{toast}</div>}
    </div>
  );

  if (viewMode === 'original') {
    return (
      <>
        <button ref={toggleRef} type="button" className="bmgj-float" onClick={turnOn}>
          병무길잡이 켜기
        </button>
        {toastRegion}
      </>
    );
  }

  return (
    <>
      <div ref={frameRef} className="bmgj-page">
        <div className="bmgj-container">
          <Header
            group={group}
            onOpenSearch={() => openAllMenu(searchButtonRef.current)}
            searchButtonRef={searchButtonRef}
            onGroupChange={changeGroup}
            onShowOriginal={showOriginal}
            originalButtonRef={originalButtonRef}
          />
          {group ? (
            <>
              <Hero group={group} />
              <MenuPanel
                key={group}
                group={group}
                onOpenAllMenu={() => openAllMenu(allMenuLinkRef.current)}
                allMenuLinkRef={allMenuLinkRef}
              />
              <NewsPanel news={news} />
              <Footer />
            </>
          ) : (
            <>
              <div className="bmgj-hero" aria-hidden="true" />
              <div className="bmgj-panel bmgj-panel--empty" aria-hidden="true" />
            </>
          )}
        </div>
      </div>
      {group && <MyInfoWidget isMainPage />}
      {dialogOpen && <GroupDialog onSelect={chooseFirstGroup} onShowOriginal={showOriginal} />}
      {allMenuOpen && <AllMenuDialog menu={allMenu} onClose={closeAllMenu} />}
      <div className="bmgj-sr-only" aria-live="polite">{announcement}</div>
      {toastRegion}
    </>
  );
}
