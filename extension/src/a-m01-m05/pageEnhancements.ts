import { ACTIVE_CLASS, THEME_ATTRIBUTE, type MenuTheme } from './menuTheme';

/** 원본 요소·링크·이벤트를 유지하고, 기능 전용 표식만 적용·복원한다. */
export function createPageEnhancements(theme: MenuTheme) {
  const root = document.documentElement;
  const previousTheme = root.getAttribute(THEME_ATTRIBUTE);
  const previouslyActive = root.classList.contains(ACTIVE_CLASS);

  const restore = () => {
    if (previousTheme === null) root.removeAttribute(THEME_ATTRIBUTE);
    else root.setAttribute(THEME_ATTRIBUTE, previousTheme);
    root.classList.toggle(ACTIVE_CLASS, previouslyActive);
  };

  return {
    setEnabled(enabled: boolean) {
      if (!enabled) { restore(); return; }
      root.setAttribute(THEME_ATTRIBUTE, theme);
      root.classList.add(ACTIVE_CLASS);
    },
    restore,
  };
}

export type PageEnhancements = ReturnType<typeof createPageEnhancements>;
