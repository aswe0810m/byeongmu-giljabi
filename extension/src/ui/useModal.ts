import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * 모달 대화상자 공통 키보드 처리(8절): 열린 동안 Tab 포커스를 안에 가두고, Escape 처리.
 * Shadow DOM 안이므로 activeElement는 대화상자의 루트 노드에서 읽는다.
 */
export function useModal(
  dialogRef: RefObject<HTMLElement>,
  onEscape: () => void,
  initialFocusRef?: RefObject<HTMLElement>,
): void {
  // 처음 열릴 때 한 번만 포커스를 옮긴다.
  useEffect(() => {
    (initialFocusRef?.current ?? dialogRef.current)?.focus();
  }, [dialogRef, initialFocusRef]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onEscape();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (items.length === 0) return;
      const active = (dialog.getRootNode() as ShadowRoot | Document).activeElement;
      const index = active ? items.indexOf(active as HTMLElement) : -1;
      const first = items[0];
      const last = items[items.length - 1];
      if (index === -1) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && index === 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [dialogRef, onEscape]);
}
