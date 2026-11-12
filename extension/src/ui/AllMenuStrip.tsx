import type { RefObject } from 'react';

interface AllMenuStripProps {
  onOpenAllMenu: () => void;
  linkRef: RefObject<HTMLButtonElement>;
}

// 3.4 전체 메뉴 안내 띠.
export function AllMenuStrip({ onOpenAllMenu, linkRef }: AllMenuStripProps) {
  return (
    <div className="bmgj-strip">
      <span>기타 메뉴는 전체 메뉴에서 확인할 수 있어요</span>
      <button ref={linkRef} type="button" className="bmgj-strip-link" onClick={onOpenAllMenu}>
        전체 메뉴 보기 <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
