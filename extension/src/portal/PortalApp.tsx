// 병무민원(포털 첫 화면) 개선 화면. 병무청 첫 화면(App)과 같은 틀과 동작을 쓰되,
// 카드·배너는 민원 분류안, 전체 메뉴는 포털 메뉴, 소식 패널은 넣지 않는다(사용자 결정 2026-11-12).
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS } from '../catalog/cards';
import { PORTAL_SITEMAP, getPortalCard, portalLayouts } from '../catalog/portalCards';
import type { MenuCategory } from '../menu/readAllMenu';
import type { Prefs, ViewMode } from '../storage/prefs';
import { saveGroup, saveViewMode, subscribePrefs } from '../storage/prefs';
import { AllMenuDialog } from '../ui/AllMenuDialog';
import { Footer } from '../ui/Footer';
import { GroupDialog } from '../ui/GroupDialog';
import { Header } from '../ui/Header';
import type { HeroContent } from '../ui/Hero';
import { Hero } from '../ui/Hero';
import type { PanelCatalog } from '../ui/MenuPanel';
import { MenuPanel } from '../ui/MenuPanel';
import { MyInfoWidget } from '../ui/MyInfoButton';
import { PortalSessionControls } from './PortalSessionControls';
import { hideFrame, isPortalMain, restoreFrame } from './portalDom';

const EG_LOGO = 'https://mwpt.mma.go.kr/caisBMHS/images/inc/eg_logo.png';
const SAVE_FAILED = '설정을 저장하지 못했어요. 다음 방문에는 다시 선택해야 할 수 있어요.';
const TOAST_MS = 4000;

const PORTAL_HERO: Record<GroupId, HeroContent> = {
  A: {
    eyebrow: '병무민원, 필요한 것부터 먼저',
    title: '검사 일정부터 입영일자까지, / 신청은 여기서 바로.',
    description: '병역판정검사, 입영일자 본인선택, 모집병 지원처럼 자주 쓰는 민원을 앞에 모았어요. 신청과 조회는 로그인한 뒤 병무민원 화면에서 이어져요.',
    button: '내년 입영일자 신청하러 가기',
    cardId: 'P-A-M06',
  },
  B: {
    eyebrow: '병무민원, 필요한 것부터 먼저',
    title: '동원훈련 준비도, / 필요한 민원만 간편하게.',
    description: '훈련 일정 조회부터 연기 신청, 통지서 출력까지 예비군에게 필요한 민원을 모았어요.',
    button: '동원훈련 일자 조회하러 가기',
    cardId: 'P-B-M03',
  },
};

const PORTAL_CATALOG: PanelCatalog = {
  head: {
    A: { eyebrow: 'CIVIL SERVICE', title: '입영 준비 민원' },
    B: { eyebrow: 'CIVIL SERVICE', title: '예비군 민원' },
  },
  layouts: portalLayouts,
  getCard: getPortalCard,
  // 사용자 결정(2026-11-12): 4열. A는 메인 3행, 더보기를 열면 6행(마지막 줄 3개).
  columns: 4,
};

interface PortalAppProps { frame: HTMLIFrameElement; initialPrefs: Prefs; menu: MenuCategory[]; }

export function PortalApp({ frame, initialPrefs, menu }: PortalAppProps) {
  const [group, setGroup] = useState<GroupId | null>(initialPrefs.group);
  const [viewMode, setViewMode] = useState<ViewMode>(initialPrefs.viewMode);
  const [onMain, setOnMain] = useState(() => isPortalMain(frame));
  const [toast, setToast] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const [allMenuOpen, setAllMenuOpen] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const originalButtonRef = useRef<HTMLButtonElement>(null);
  const allMenuLinkRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const allMenuReturn = useRef<HTMLElement | null>(null);
  const selectFocusAfterChoice = useRef(false);
  const focusTarget = useRef<'toggle' | 'original' | null>(null);

  const improved = viewMode === 'improved' && onMain;
  const dialogOpen = improved && group === null;
  const anyModalOpen = dialogOpen || allMenuOpen;

  // 프레임이 다른 화면으로 넘어가면(민원 메뉴, 로그인, 시간 만료 등) 원본을 보여 준다.
  useEffect(() => {
    const update = () => setOnMain(isPortalMain(frame));
    frame.addEventListener('load', update);
    update();
    return () => frame.removeEventListener('load', update);
  }, [frame]);

  useLayoutEffect(() => {
    if (improved) {
      hideFrame(frame);
      window.scrollTo(0, 0);
    } else {
      restoreFrame();
    }
  }, [improved, frame]);

  useEffect(
    () =>
      subscribePrefs((prefs) => {
        setGroup(prefs.group);
        setViewMode(prefs.viewMode);
      }),
    [],
  );

  useEffect(() => {
    frameRef.current?.toggleAttribute('inert', anyModalOpen);
  }, [anyModalOpen]);

  useEffect(() => {
    if (!allMenuOpen && allMenuReturn.current) {
      allMenuReturn.current.focus();
      allMenuReturn.current = null;
    }
  }, [allMenuOpen]);

  useEffect(() => {
    if (focusTarget.current === 'toggle') toggleRef.current?.focus();
    if (focusTarget.current === 'original' && !dialogOpen) originalButtonRef.current?.focus();
    focusTarget.current = null;
  }, [viewMode, dialogOpen]);

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

  const turnOn = () => {
    focusTarget.current = 'original';
    setViewMode('improved');
    void persist(saveViewMode('improved'));
  };

  // 전체 메뉴(③ 기타 포함). 포털 메뉴를 읽지 못했으면 원본 사이트맵으로 간다.
  const openAllMenu = (returnTo: HTMLElement | null) => {
    if (menu.length === 0) {
      window.location.href = PORTAL_SITEMAP;
      return;
    }
    allMenuReturn.current = returnTo;
    setAllMenuOpen(true);
  };

  const closeAllMenu = useCallback(() => setAllMenuOpen(false), []);

  const toastRegion = (
    <div className="bmgj-toast-region" role="status">
      {toast && <div className="bmgj-toast">{toast}</div>}
    </div>
  );

  // 첫 화면이 아닌 포털 화면에서는 아무것도 그리지 않는다.
  if (!onMain) return null;

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
      {/* 원본 포털 위쪽의 전자정부 누리집 문구(메인에서 병무청 띠를 남겨 두는 것과 같은 자리) */}
      <div className="bmgj-pmast">
        <div className="bmgj-pmast-inner">
          <img src={EG_LOGO} alt="" width={40} height={15} /> 이 누리집은 대한민국 공식 전자정부 누리집입니다.
        </div>
      </div>
      <div ref={frameRef} className="bmgj-page bmgj-page--portal">
        <div className="bmgj-container">
          <Header
            site="portal"
            session={<PortalSessionControls frame={frame} />}
            group={group}
            onOpenSearch={() => openAllMenu(searchButtonRef.current)}
            searchButtonRef={searchButtonRef}
            onGroupChange={changeGroup}
            onShowOriginal={showOriginal}
            originalButtonRef={originalButtonRef}
          />
          {group ? (
            <>
              <Hero group={group} content={PORTAL_HERO} resolveCard={getPortalCard} />
              <MenuPanel
                key={group}
                group={group}
                catalog={PORTAL_CATALOG}
                onOpenAllMenu={() => openAllMenu(allMenuLinkRef.current)}
                allMenuLinkRef={allMenuLinkRef}
              />
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
      {allMenuOpen && <AllMenuDialog menu={menu} onClose={closeAllMenu} />}
      <div className="bmgj-sr-only" aria-live="polite">{announcement}</div>
      {toastRegion}
    </>
  );
}
