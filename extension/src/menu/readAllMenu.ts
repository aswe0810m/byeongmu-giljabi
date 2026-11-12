// 원본 전체 메뉴(#mobile-nav)를 읽어 새 전체 메뉴 창의 데이터로 만든다. 네트워크 요청 없음.
// 사용자 결정(2026-11-05): 명세 1절의 "원본 전체 메뉴의 새 버전 제작"을 하기로 함. 주소는 원본 메뉴에 있는 것만 쓴다.

export interface MenuEntry {
  label: string;
  href: string; // 절대 주소
  newTab: boolean;
}

/** 중분류. 자체 링크가 없고(원본에서 여닫기 버튼) 하위 항목만 있을 수 있다. */
export interface MenuSection {
  label: string;
  link: MenuEntry | null;
  items: MenuEntry[];
}

export interface MenuCategory {
  id: string;
  label: string;
  sections: MenuSection[];
}

const clean = (text: string | null) => (text || '').replace(/\s+/g, ' ').trim();

function toEntry(anchor: HTMLAnchorElement): MenuEntry | null {
  const raw = (anchor.getAttribute('href') || '').trim();
  const label = clean(anchor.textContent);
  if (!label || !raw || raw === '#' || raw.toLowerCase().startsWith('javascript:')) return null;
  let url: URL;
  try {
    url = new URL(raw, location.href);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  return { label, href: url.href, newTab: anchor.target === '_blank' };
}

export function readAllMenu(): MenuCategory[] {
  const nav = document.getElementById('mobile-nav');
  if (!nav) return [];
  const categories: MenuCategory[] = [];
  nav.querySelectorAll<HTMLAnchorElement>('.menu-wrap a.gnb-main-trigger').forEach((trigger, index) => {
    const targetId = (trigger.getAttribute('href') || '').replace(/^#/, '');
    const box = targetId ? nav.querySelector(`#${CSS.escape(targetId)}`) : null;
    if (!box) return;
    const sections: MenuSection[] = [];
    for (const li of box.querySelectorAll(':scope > ul > li')) {
      const anchor = li.querySelector<HTMLAnchorElement>(':scope > a');
      if (!anchor) continue;
      const items = [...li.querySelectorAll<HTMLAnchorElement>(':scope ul a')]
        .map(toEntry)
        .filter((entry): entry is MenuEntry => entry !== null);
      const link = toEntry(anchor);
      if (!link && items.length === 0) continue;
      sections.push({ label: clean(anchor.textContent), link, items });
    }
    if (sections.length > 0) categories.push({ id: `bmgj-cat-${index}`, label: clean(trigger.textContent), sections });
  });
  return categories;
}
