// 병무청 하위 페이지 공통 틀(사용자 결정 2026-11-24, 디자인 통일 2026-11-26).
// 메인과 같은 헤더·푸터·내 정보에 "‹ 병무청 첫 화면" + 카드 배너(CardBanner)를 그리고,
// 본문은 원본을 그대로 둔 채 문서 CSS로 모양만 다듬어 전체 너비로 보여 준다(왼쪽 메뉴는 숨김).
// 병무민원 세부 화면(src/portal/page)과 같은 모양이다. 색만 병무청 초록.
// 모집 공지사항 첫 화면은 본문 대신 군별 게시판을 합친 새 목록(NoticeBoard)을 보여 준다.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS, SITE_ORIGIN } from '../catalog/cards';
import type { MenuCategory } from '../menu/readAllMenu';
import type { Prefs, ViewMode } from '../storage/prefs';
import { saveGroup, saveViewMode, subscribePrefs } from '../storage/prefs';
import { AllMenuDialog } from '../ui/AllMenuDialog';
import { CardBanner } from '../ui/CardBanner';
import { Footer } from '../ui/Footer';
import { Header } from '../ui/Header';
import { MyInfoWidget } from '../ui/MyInfoButton';
import { NoticeBoard } from './notice/NoticeBoard';
import type { NoticeRow } from './notice/readBoard';
import type { Subpage } from './pages';
import type { SubpageDom, SubpageHosts } from './subpageDom';
import {
  hideSubpageOriginal, restoreSubpageOriginal, setHostsVisible, setOriginalNoticeList, setRootAttrs,
} from './subpageDom';

const SAVE_FAILED = '설정을 저장하지 못했어요. 다음 방문에는 다시 선택해야 할 수 있어요.';
const TOAST_MS = 4000;

/** 각 호스트의 Shadow DOM 안에 React가 그릴 자리. */
export interface SubpageMounts { notice: HTMLElement | null; footer: HTMLElement; }

interface SubpageAppProps {
  page: Subpage;
  dom: SubpageDom;
  hosts: SubpageHosts;
  mounts: SubpageMounts;
  initialPrefs: Prefs;
  allMenu: MenuCategory[];
  noticeRows: NoticeRow[] | null;
}

export function SubpageApp({ page, dom, hosts, mounts, initialPrefs, allMenu, noticeRows }: SubpageAppProps) {
  const [group, setGroup] = useState<GroupId | null>(initialPrefs.group);
  const [viewMode, setViewMode] = useState<ViewMode>(initialPrefs.viewMode);
  const [allMenuOpen, setAllMenuOpen] = useState(false);
  const [noticeOriginal, setNoticeOriginal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const frameRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const originalButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const noticeBackRef = useRef<HTMLButtonElement>(null);
  const focusTarget = useRef<'toggle' | 'original' | 'notice-back' | 'notice-new' | null>(null);

  const improved = viewMode === 'improved';
  const isNotice = page.kind === 'notice-list' && page.board !== null;

  // 화면 모드에 맞춰 원본을 숨기거나 복원한다.
  useLayoutEffect(() => {
    if (improved) {
      hideSubpageOriginal(dom, page.kind);
      if (isNotice) setOriginalNoticeList(dom, noticeOriginal);
    } else {
      restoreSubpageOriginal();
    }
    setRootAttrs(page.entry?.rootAttrs, improved);
    setHostsVisible(hosts, improved);
  }, [improved, noticeOriginal, dom, hosts, page.kind, page.entry, isNotice]);

  // 다른 탭의 변경 반영(메인과 같은 저장값).
  useEffect(
    () =>
      subscribePrefs((prefs) => {
        setGroup(prefs.group);
        setViewMode(prefs.viewMode);
      }),
    [],
  );

  // 전체 메뉴 창이 열린 동안 뒤의 화면(새 화면 + 원본 본문)은 조작할 수 없게 한다.
  useEffect(() => {
    for (const el of [frameRef.current, dom.section, hosts.footer]) el?.toggleAttribute('inert', allMenuOpen);
  }, [allMenuOpen, dom.section, hosts.footer]);

  // 원본 건너뛰기 링크 `대메뉴로 바로가기`(#nav)는 숨긴 원본 메뉴를 가리키므로 헤더의 메뉴 검색으로 보낸다.
  useEffect(() => {
    if (!improved) return;
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor || anchor.getAttribute('href') !== '#nav') return;
      const target = searchButtonRef.current;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ block: 'start' });
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [improved]);

  // 전환 뒤 새로 나타난 버튼으로 포커스를 옮긴다(누른 버튼이 사라지므로).
  useEffect(() => {
    const target = focusTarget.current;
    focusTarget.current = null;
    if (target === 'toggle') toggleRef.current?.focus();
    if (target === 'original') originalButtonRef.current?.focus();
    if (target === 'notice-back') noticeBackRef.current?.focus();
    if (target === 'notice-new') mounts.notice?.querySelector<HTMLElement>('.bmgj-notice')?.focus();
  }, [viewMode, noticeOriginal, mounts.notice]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const persist = useCallback(async (saving: Promise<boolean>) => {
    if (!(await saving)) setToast(SAVE_FAILED);
  }, []);

  const changeGroup = (next: GroupId) => {
    if (next === group) return;
    setGroup(next);
    setAnnouncement('');
    window.setTimeout(() => setAnnouncement(`${GROUP_LABELS[next]} 메뉴로 바뀌었어요`), 50);
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

  // 전체 메뉴: 원본 메뉴(#mobile-nav)를 읽었으면 새 창, 못 읽었으면 원래 화면으로(메인과 같은 대체 경로 대신 단순하게).
  const openAllMenu = () => {
    if (allMenu.length > 0) setAllMenuOpen(true);
    else showOriginal();
  };
  const closeAllMenu = useCallback(() => {
    setAllMenuOpen(false);
    window.setTimeout(() => searchButtonRef.current?.focus(), 0);
  }, []);

  const toastRegion = (
    <div className="bmgj-toast-region" role="status">
      {toast && <div className="bmgj-toast">{toast}</div>}
    </div>
  );

  if (!improved) {
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
      <div ref={frameRef} className="bmgj-page bmgj-page--sub">
        <div className="bmgj-container">
          <Header
            group={group}
            onOpenSearch={openAllMenu}
            searchButtonRef={searchButtonRef}
            onGroupChange={changeGroup}
            onShowOriginal={showOriginal}
            originalButtonRef={originalButtonRef}
          />
          <CardBanner card={page.card} eyebrow="병무청" back={{ href: `${SITE_ORIGIN}/index.do`, label: '병무청 첫 화면' }} />
        </div>
      </div>

      {isNotice && mounts.notice && page.board && createPortal(
        noticeOriginal ? (
          <div className="bmgj-strip bmgj-strip--top">
            <span>{page.board.label} 게시판의 원래 목록이에요. 검색과 이전 쪽 이동을 할 수 있어요.</span>
            <button
              ref={noticeBackRef}
              type="button"
              className="bmgj-strip-link"
              onClick={() => { focusTarget.current = 'notice-new'; setNoticeOriginal(false); }}
            >
              모집 공지사항 새 목록 보기 <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <NoticeBoard
            board={page.board}
            currentRows={noticeRows}
            onShowOriginalList={() => { focusTarget.current = 'notice-back'; setNoticeOriginal(true); }}
          />
        ),
        mounts.notice,
      )}

      {/* 푸터는 헤더·본문과 같은 폭(.bmgj-container)에 둔다(디자인 통일 2026-11-26) */}
      {createPortal(<div className="bmgj-container"><Footer /></div>, mounts.footer)}

      {/* 화면 전환·설정 초기화를 누르면 내 정보 창을 닫는 동작은 메인과 같게 둔다. */}
      <MyInfoWidget isMainPage />
      {allMenuOpen && <AllMenuDialog menu={allMenu} onClose={closeAllMenu} />}
      <div className="bmgj-sr-only" aria-live="polite">{announcement}</div>
      {toastRegion}
    </>
  );
}
