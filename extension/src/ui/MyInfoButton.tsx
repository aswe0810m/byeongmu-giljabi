import { User } from 'lucide-react';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { MyInfoPanel } from './MyInfoDialog';

// 3.6 내 정보 — 팀 구현(bmgj-recruit-dday-update, v0.5.1)을 소스로 옮김(0.4.8).
// 오른쪽 가장자리에 마우스를 올리면 서랍처럼 열리고(떠나면 0.32초 뒤 닫힘), 버튼을 누르면 고정해서 연다.
// 고정 상태는 이 탭에서 병무청 페이지를 옮겨 다녀도 유지되도록 sessionStorage에 둔다(실패해도 기능에는 영향 없음).
const OPEN_KEY = 'bmgj.infoOpen';
const PANEL_ID = 'bmgj-info-panel';
const HOVER_CLOSE_MS = 320;

function readOpen(): boolean {
  try {
    return sessionStorage.getItem(OPEN_KEY) === '1';
  } catch {
    return false;
  }
}

function writeOpen(open: boolean): void {
  try {
    if (open) sessionStorage.setItem(OPEN_KEY, '1');
    else sessionStorage.removeItem(OPEN_KEY);
  } catch {
    /* 무시 */
  }
}

export function MyInfoWidget({ isMainPage }: { isMainPage: boolean }) {
  const [pinned, setPinned] = useState(readOpen);
  const [hovered, setHovered] = useState(false);
  const [focusOnOpen, setFocusOnOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  const timer = useRef<number | null>(null);

  const clear = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };
  const open = () => {
    clear();
    setHovered(true);
  };
  const later = () => {
    clear();
    timer.current = window.setTimeout(() => {
      setHovered(false);
      timer.current = null;
    }, HOVER_CLOSE_MS);
  };

  useEffect(() => {
    writeOpen(pinned);
    if (!pinned && returnFocus.current) {
      returnFocus.current = false;
      buttonRef.current?.focus();
    }
  }, [pinned]);

  useEffect(() => () => clear(), []);

  const close = () => {
    clear();
    setHovered(false);
    returnFocus.current = true;
    setPinned(false);
  };

  const toggle = () => {
    if (pinned) {
      close();
      return;
    }
    clear();
    setFocusOnOpen(true);
    setPinned(true);
  };

  // 입력칸을 누르거나 포커스하면 마우스가 벗어나도 닫히지 않게 고정한다.
  const pinDuringInput = (event: SyntheticEvent) => {
    const target = event.target as Element | null;
    if (target && typeof target.closest === 'function' && target.closest('input,textarea,select')) {
      clear();
      setHovered(true);
      setPinned(true);
    }
  };

  const shown = pinned || hovered;

  return (
    <>
      <button
        type="button"
        className="bmgj-edge-trigger"
        aria-label="마우스를 올려 내 정보 열기"
        aria-controls={PANEL_ID}
        aria-expanded={shown}
        onMouseEnter={open}
        onMouseLeave={later}
        onFocus={open}
        onClick={toggle}
      >
        <span className="bmgj-edge-mark" aria-hidden="true" />
      </button>
      {shown && (
        <div
          className="bmgj-drawer-wrap"
          onMouseEnter={open}
          onMouseLeave={later}
          onFocusCapture={pinDuringInput}
          onPointerDownCapture={pinDuringInput}
        >
          <MyInfoPanel id={PANEL_ID} focusOnOpen={focusOnOpen && pinned} isMainPage={isMainPage} onClose={close} />
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        className="bmgj-float"
        aria-expanded={shown}
        aria-controls={PANEL_ID}
        onClick={toggle}
      >
        <User size={18} strokeWidth={1.75} aria-hidden="true" />
        내 정보
      </button>
    </>
  );
}
