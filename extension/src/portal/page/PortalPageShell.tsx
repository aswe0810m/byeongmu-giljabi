// 병무민원 세부 화면 공통 틀. PortalApp 이 "첫 화면이 아닐 때" 이 컴포넌트를 그린다.
// 프레임에 등록된 카드의 화면(registry.ts)이 열려 있으면: 바깥 틀에 전자정부 띠·헤더·화면 머리를 그리고,
// 프레임 본문은 frame.ts 로 꾸민다. 등록되지 않은 화면이면 아무것도 그리지 않는다(원본 그대로).
// 그룹·화면 모드는 PortalApp 의 상태와 저장 함수를 그대로 받아 쓴다(첫 화면과 같은 값).
import type { ReactNode } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { GroupId } from '../../catalog/cards';
import { PORTAL_SITEMAP } from '../../catalog/portalCards';
import type { MenuCategory } from '../../menu/readAllMenu';
import type { ViewMode } from '../../storage/prefs';
import { AllMenuDialog } from '../../ui/AllMenuDialog';
import { Header } from '../../ui/Header';
import { MyInfoWidget } from '../../ui/MyInfoButton';
import { PortalSessionControls } from '../PortalSessionControls';
import { frameDocument } from '../portalDom';
import { ORIGINAL_EXTRA, activeMenuNos, applyPageFrame, fitFrame, hasPageFrame, removePageFrame } from './frame';
import { PageHead } from './PageHead';
import pageCss from './page.css?inline';
import type { PortalPage } from './registry';
import { findPortalPage } from './registry';

const EG_LOGO = 'https://mwpt.mma.go.kr/caisBMHS/images/inc/eg_logo.png';

interface PortalPageShellProps {
  frame: HTMLIFrameElement;
  menu: MenuCategory[];
  group: GroupId | null;
  viewMode: ViewMode;
  onGroupChange: (group: GroupId) => void;
  onShowOriginal: () => void;
  onTurnOn: () => void;
  /** PortalApp 의 저장 실패 안내 영역. */
  toast: ReactNode;
}

export function PortalPageShell({
  frame, menu, group, viewMode, onGroupChange, onShowOriginal, onTurnOn, toast,
}: PortalPageShellProps) {
  const [page, setPage] = useState<PortalPage | null>(() => findPortalPage(activeMenuNos(frame)));
  const [frameLoads, setFrameLoads] = useState(0);
  const [allMenuOpen, setAllMenuOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const originalButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const focusAfter = useRef<'toggle' | 'original' | null>(null);

  const improved = viewMode === 'improved' && page !== null;

  // 프레임이 새 화면을 열 때마다 등록된 카드 화면인지 다시 본다.
  useEffect(() => {
    const onLoad = () => {
      setPage(findPortalPage(activeMenuNos(frame)));
      setFrameLoads((n) => n + 1);
    };
    frame.addEventListener('load', onLoad);
    return () => frame.removeEventListener('load', onLoad);
  }, [frame]);

  // 프레임 본문 꾸미기와 높이 맞춤. 원래 화면으로 돌리거나 다른 화면으로 가면 빼고 원본 높이로.
  useLayoutEffect(() => {
    if (!improved || !page) return;
    if (!applyPageFrame(frame, page)) {
      fitFrame(frame, ORIGINAL_EXTRA);
      return;
    }
    fitFrame(frame, 0);
    window.scrollTo(0, 0);
    // 원본 스크립트가 내용을 펼치거나 접으면(사유 선택 등) 높이를 다시 맞춘다.
    const doc = frameDocument(frame);
    const box = doc?.getElementById('sub_layout');
    const Observer = doc?.defaultView?.ResizeObserver;
    let last = box?.offsetHeight ?? 0;
    const observer = box && Observer ? new Observer(() => {
      if (box.offsetHeight === last) return;
      last = box.offsetHeight;
      fitFrame(frame, 0);
    }) : null;
    if (box) observer?.observe(box);
    return () => {
      observer?.disconnect();
      if (hasPageFrame(frame)) {
        removePageFrame(frame);
        fitFrame(frame, ORIGINAL_EXTRA);
      }
    };
  }, [improved, page, frame, frameLoads]);

  useEffect(() => {
    wrapRef.current?.toggleAttribute('inert', allMenuOpen);
  }, [allMenuOpen]);

  // 화면 전환 뒤 누른 버튼이 사라지므로 짝 버튼으로 포커스를 옮긴다.
  useEffect(() => {
    if (focusAfter.current === 'toggle') toggleRef.current?.focus();
    if (focusAfter.current === 'original') originalButtonRef.current?.focus();
    focusAfter.current = null;
  }, [viewMode]);

  const showOriginal = useCallback(() => {
    focusAfter.current = 'toggle';
    setAllMenuOpen(false);
    onShowOriginal();
  }, [onShowOriginal]);

  const turnOn = () => {
    focusAfter.current = 'original';
    onTurnOn();
  };

  const openAllMenu = () => {
    if (menu.length === 0) {
      window.location.href = PORTAL_SITEMAP;
      return;
    }
    setAllMenuOpen(true);
  };

  const closeAllMenu = useCallback(() => {
    setAllMenuOpen(false);
    searchButtonRef.current?.focus();
  }, []);

  if (!page) return null;

  if (viewMode === 'original') {
    return (
      <>
        <button ref={toggleRef} type="button" className="bmgj-float" onClick={turnOn}>
          병무길잡이 켜기
        </button>
        {toast}
      </>
    );
  }

  return (
    <>
      <style>{pageCss}</style>
      {/* 원본 포털 위쪽의 전자정부 누리집 문구(첫 화면과 같은 자리) */}
      <div className="bmgj-pmast">
        <div className="bmgj-pmast-inner">
          <img src={EG_LOGO} alt="" width={40} height={15} /> 이 누리집은 대한민국 공식 전자정부 누리집입니다.
        </div>
      </div>
      <div ref={wrapRef} className="bmgj-page bmgj-page--portal bmgj-page-shell">
        <div className="bmgj-container">
          <Header
            site="portal"
            session={<PortalSessionControls frame={frame} />}
            group={group}
            onOpenSearch={openAllMenu}
            searchButtonRef={searchButtonRef}
            onGroupChange={onGroupChange}
            onShowOriginal={showOriginal}
            originalButtonRef={originalButtonRef}
          />
          <PageHead page={page} />
        </div>
      </div>
      {group && <MyInfoWidget isMainPage />}
      {allMenuOpen && <AllMenuDialog menu={menu} onClose={closeAllMenu} />}
      {toast}
    </>
  );
}
