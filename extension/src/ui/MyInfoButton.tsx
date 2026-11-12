import { User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MyInfoPanel } from './MyInfoDialog';

// 열림 상태는 이 탭에서 병무청 페이지를 옮겨 다녀도 유지되도록 sessionStorage에 둔다(사용자 결정).
// 실패해도(개인정보 보호 모드 등) 기능에는 영향 없음.
const OPEN_KEY = 'bmgj.infoOpen';
const PANEL_ID = 'bmgj-info-panel';

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

// 3.6 내 정보 버튼(우측 하단 고정) + 떠 있는 내 정보 창.
export function MyInfoWidget({ isMainPage }: { isMainPage: boolean }) {
  const [open, setOpen] = useState(readOpen);
  const [focusOnOpen, setFocusOnOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);

  useEffect(() => {
    writeOpen(open);
    if (!open && returnFocus.current) {
      returnFocus.current = false;
      buttonRef.current?.focus();
    }
  }, [open]);

  const close = () => {
    returnFocus.current = true;
    setOpen(false);
  };

  const toggle = () => {
    if (open) {
      close();
      return;
    }
    setFocusOnOpen(true);
    setOpen(true);
  };

  return (
    <>
      {open && <MyInfoPanel id={PANEL_ID} focusOnOpen={focusOnOpen} isMainPage={isMainPage} onClose={close} />}
      <button
        ref={buttonRef}
        type="button"
        className="bmgj-float"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={toggle}
      >
        <User size={18} strokeWidth={1.75} aria-hidden="true" />
        내 정보
      </button>
    </>
  );
}
