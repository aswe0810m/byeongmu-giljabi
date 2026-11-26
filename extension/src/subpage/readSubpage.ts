// 원본 하위 페이지에서 경로·페이지 제목·왼쪽 메뉴를 읽는다. 네트워크 요청 없음.
// 원본 틀(2026-11-24 확인): #path #breadcrumb, #side(#side_title, #side_menu), #colgroup(#sub_head, #sub > #contents)

export interface Crumb { label: string; href: string; }

export interface SideItem {
  label: string;
  href: string | null;
  newTab: boolean;
  active: boolean;     // 지금 페이지이거나 지금 페이지를 품은 항목
  current: boolean;    // 지금 페이지
  sameUrl: boolean;    // 주소가 지금 페이지와 같음(li_on이 없을 때만 씀)
  children: SideItem[];
}

export interface SubpageInfo {
  title: string;
  crumbs: Crumb[];
  sideTitle: string;
  side: SideItem[];
}

const clean = (text: string | null | undefined) => (text || '').replace(/\s+/g, ' ').trim();

function toUrl(raw: string | null): URL | null {
  const value = (raw || '').trim();
  if (!value || value === '#' || value.toLowerCase().startsWith('javascript:')) return null;
  try {
    const url = new URL(value, location.href);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : null;
  } catch {
    return null;
  }
}

/** 같은 페이지인지: 경로와 mc(메뉴 코드)·gesipan_id가 같으면 같은 페이지로 본다. */
function samePage(url: URL): boolean {
  if (url.origin !== location.origin || url.pathname.replace(/View/, 'List') !== location.pathname.replace(/View/, 'List')) return false;
  const here = new URLSearchParams(location.search);
  const mc = url.searchParams.get('mc');
  return mc !== null && mc === here.get('mc');
}

function readCrumbs(): Crumb[] {
  const crumbs: Crumb[] = [];
  document.querySelectorAll<HTMLAnchorElement>('#breadcrumb li > a').forEach((anchor) => {
    const url = toUrl(anchor.getAttribute('href'));
    const label = clean(anchor.textContent);
    if (!url || !label) return;
    const prev = crumbs[crumbs.length - 1];
    if (prev && prev.label === label && prev.href === url.href) return;
    crumbs.push({ label, href: url.href });
  });
  return crumbs;
}

function readItem(li: Element): SideItem | null {
  const anchor = li.querySelector<HTMLAnchorElement>(':scope > a, :scope > span > a');
  const label = clean(anchor?.textContent);
  if (!anchor || !label) return null;
  const url = toUrl(anchor.getAttribute('href'));
  const children = [...li.querySelectorAll(':scope > ul > li')]
    .map(readItem)
    .filter((item): item is SideItem => item !== null);
  // 지금 페이지는 원본이 표시한 li_on을 따른다. 원본 HTML의 짝이 맞지 않는 태그 때문에 같은 주소의 항목이
  // 여러 곳에 생길 수 있어서(군지원 안내 메뉴의 `모집병 지원 안내`), 주소 비교는 li_on이 없을 때만 쓴다(readSide).
  const current = li.classList.contains('li_on') && children.length === 0;
  const active = li.classList.contains('on') || current || children.some((c) => c.active);
  return { label, href: url?.href ?? null, newTab: anchor.target === '_blank', active, current, children, sameUrl: url ? samePage(url) : false };
}

/** 원본 #side_menu의 첫 단계 항목들. 원본 HTML의 짝이 맞지 않는 태그는 브라우저가 고친 DOM을 그대로 따른다. */
function readSide(): SideItem[] {
  const menu = document.getElementById('side_menu');
  if (!menu) return [];
  const items = [...menu.querySelectorAll(':scope > ul > li')]
    .map(readItem)
    .filter((item): item is SideItem => item !== null);
  // 원본에 li_on이 없으면 주소가 같은 첫 항목을 지금 페이지로 본다.
  const hasCurrent = (list: SideItem[]): boolean => list.some((i) => i.current || hasCurrent(i.children));
  if (!hasCurrent(items)) {
    const markFirst = (list: SideItem[]): boolean => list.some((i) => {
      if (i.children.length === 0 && i.sameUrl) {
        i.current = true;
        i.active = true;
        return true;
      }
      if (markFirst(i.children)) {
        i.active = true;
        return true;
      }
      return false;
    });
    markFirst(items);
  }
  return items;
}

/** 원본 #side_title h2의 첫 줄(<br> 앞의 한글 이름). */
function readSideTitle(): string {
  const h2 = document.querySelector('#side_title h2');
  if (!h2) return '';
  for (const node of h2.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && clean(node.textContent)) return clean(node.textContent);
  }
  return clean(h2.textContent);
}

export function readSubpage(): SubpageInfo {
  const crumbs = readCrumbs();
  const title = clean(document.querySelector('#sub_head h2')?.textContent) || crumbs[crumbs.length - 1]?.label || document.title;
  return { title, crumbs, sideTitle: readSideTitle() || crumbs[1]?.label || '', side: readSide() };
}
