// 병무민원포털 원본 구조 다루기(2026-11-12 실제 사이트 확인).
// 포털은 바깥 틀(index_mwps.jsp)이 iframe#main 안에 각 화면을 연다. 첫 화면은 프레임 주소가
// /mwgr/main/moveMWPoTeolMI_M.do 일 때다. 확장은 바깥 틀(최상위 문서)에만 그리고, 프레임은 숨기거나 되돌린다.

import { portalMenuUrl } from '../catalog/portalCards';
import type { MenuCategory, MenuEntry, MenuSection } from '../menu/readAllMenu';

const MAIN_PATH = '/mwgr/main/moveMWPoTeolMI_M.do';

export function findPortalFrame(): HTMLIFrameElement | null {
  const el = document.getElementById('main');
  return el instanceof HTMLIFrameElement ? el : null;
}

/** 같은 출처 프레임의 문서. 다른 출처로 넘어갔거나 아직 없으면 null. */
export function frameDocument(frame: HTMLIFrameElement): Document | null {
  try {
    return frame.contentDocument;
  } catch {
    return null;
  }
}

/** 프레임에 포털 첫 화면이 다 열려 있으면 true. */
export function isPortalMain(frame: HTMLIFrameElement): boolean {
  const doc = frameDocument(frame);
  if (!doc || doc.readyState === 'loading') return false;
  try {
    return doc.location.pathname.endsWith(MAIN_PATH);
  } catch {
    return false;
  }
}

let savedStyle: { frame: HTMLIFrameElement; style: string | null } | null = null;

export function hideFrame(frame: HTMLIFrameElement): void {
  if (!savedStyle) savedStyle = { frame, style: frame.getAttribute('style') };
  frame.style.setProperty('display', 'none', 'important');
}

export function restoreFrame(): void {
  if (!savedStyle) return;
  const { frame, style } = savedStyle;
  if (style === null) frame.removeAttribute('style');
  else frame.setAttribute('style', style);
  savedStyle = null;
}

// ── 전체 메뉴: 바깥 틀의 인라인 스크립트에 있는 `var menu = [...]`(포털이 메뉴 이동에 쓰는 목록)를 읽는다.
// 그 스크립트의 다른 값(개인 정보 포함)은 읽지 않는다. 네트워크 요청 없음.

interface PortalMenuRow {
  menu_no: string;
  swmenu_no: string;
  menu_sn: string;
  menu_nm: string;
  lvl: string;
  filert_nm: string | null;
  sayong_yn: string;
}

/** text[start]가 '['일 때, 짝이 맞는 ']'까지 잘라 낸다(문자열 안의 괄호는 무시). */
function sliceArray(text: string, start: number): string | null {
  let depth = 0;
  let inString = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (ch === '\\') i++;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '[') depth++;
    else if (ch === ']' && --depth === 0) return text.slice(start, i + 1);
  }
  return null;
}

function readRows(): PortalMenuRow[] {
  for (const script of document.querySelectorAll('script:not([src])')) {
    const text = script.textContent ?? '';
    const match = /var\s+menu\s*=\s*\[/.exec(text);
    if (!match) continue;
    const json = sliceArray(text, match.index + match[0].length - 1);
    if (!json) continue;
    try {
      const parsed: unknown = JSON.parse(json);
      if (!Array.isArray(parsed)) continue;
      return parsed
        .filter((r): r is Record<string, unknown> => typeof r === 'object' && r !== null)
        .map((r) => ({
          menu_no: String(r.menu_no ?? ''),
          swmenu_no: String(r.swmenu_no ?? ''),
          menu_sn: String(r.menu_sn ?? ''),
          menu_nm: String(r.menu_nm ?? ''),
          lvl: String(r.lvl ?? ''),
          filert_nm: typeof r.filert_nm === 'string' && r.filert_nm ? r.filert_nm : null,
          sayong_yn: String(r.sayong_yn ?? ''),
        }));
    } catch {
      continue;
    }
  }
  return [];
}

const cleanName = (name: string) => name.replace(/\s+/g, ' ').replace(/^-\s*/, '').trim();

function entry(row: PortalMenuRow): MenuEntry {
  return { label: cleanName(row.menu_nm), href: portalMenuUrl(row.menu_no), newTab: false };
}

/** 포털 전체 메뉴를 전체 메뉴 창 형식(대분류 › 중분류 › 항목)으로 만든다. 못 읽으면 빈 배열. */
export function readPortalMenu(): MenuCategory[] {
  const rows = readRows().filter((r) => r.sayong_yn === 'Y' && /^\d+$/.test(r.menu_no) && cleanName(r.menu_nm));
  const bySn = (a: PortalMenuRow, b: PortalMenuRow) => Number(a.menu_sn) - Number(b.menu_sn);
  const childrenOf = (no: string, lvl: string) => rows.filter((r) => r.swmenu_no === no && r.lvl === lvl).sort(bySn);

  const categories: MenuCategory[] = [];
  rows.filter((r) => r.lvl === '1').sort(bySn).forEach((root, index) => {
    const sections: MenuSection[] = [];
    for (const mid of childrenOf(root.menu_no, '2')) {
      if (mid.menu_nm.trim().startsWith('-')) continue; // '----현역(모집)병----' 같은 구분선
      const items = childrenOf(mid.menu_no, '3').filter((r) => r.filert_nm).map(entry);
      const link = mid.filert_nm ? entry(mid) : null;
      if (!link && items.length === 0) continue;
      sections.push({ label: cleanName(mid.menu_nm), link, items });
    }
    if (sections.length > 0) categories.push({ id: `bmgj-pcat-${index}`, label: cleanName(root.menu_nm), sections });
  });
  return categories;
}

// ── 로그인 상태(사용자 결정 2026-11-12: 헤더에 넣기). 원본 첫 화면 위쪽 #util_layout2 를 읽고,
// 누르면 원본 요소를 대신 누른다(원본의 onclick 이 그대로 실행됨).

export interface PortalSession {
  remaining: string | null; // 남은 시간 '28:12'
  canExtend: boolean;
  canLogout: boolean;
  canLogin: boolean;
}

export const EMPTY_SESSION: PortalSession = { remaining: null, canExtend: false, canLogout: false, canLogin: false };

function utilElements(frame: HTMLIFrameElement) {
  const util = frameDocument(frame)?.getElementById('util_layout2') ?? null;
  if (!util) return null;
  const anchors = [...util.querySelectorAll<HTMLAnchorElement>('a')];
  return {
    counter: util.querySelector<HTMLElement>('#counter'),
    extend: util.querySelector<HTMLInputElement>('#resetBtn'),
    logout: util.querySelector<HTMLAnchorElement>('a[onclick*="gf_moveLogout_ID"]'),
    login: anchors.find((a) => (a.textContent ?? '').replace(/\s+/g, '').includes('로그인')) ?? null,
  };
}

export function readSession(frame: HTMLIFrameElement): PortalSession {
  const els = utilElements(frame);
  if (!els) return EMPTY_SESSION;
  const time = (els.counter?.textContent ?? '').trim();
  return {
    remaining: /^\d{1,3}:\d{2}$/.test(time) ? time : null,
    canExtend: !!els.extend,
    canLogout: !!els.logout,
    canLogin: !els.logout && !!els.login,
  };
}

export function clickSession(frame: HTMLIFrameElement, action: 'extend' | 'logout' | 'login'): boolean {
  const els = utilElements(frame);
  const target = els?.[action];
  if (!target) return false;
  target.click();
  return true;
}
