// 병무민원 세부 화면 공통 틀 — 카드 등록부.
// 첫 화면 카드를 눌러 들어간 화면 중 "등록된 카드"의 화면만 공통 틀(머리 배너 + 프레임 본문 꾸밈)로 보여 준다.
// 카드는 각자 자기 폴더에서 registerPortalPages()로 등록한다(예: ../p-a-left/register.ts).
//
// 메뉴 번호(menuNo)는 카드 링크 주소(…/index_mwps.jsp?menuNo=22017)에서 읽는다. 링크가 여러 개인 카드
// (예: 신청·변경·취소)는 링크마다 같은 카드로 등록되고, 머리 배너에 그 링크들이 탭으로 나온다.

import type { HomeCard, MenuLink } from '../../catalog/cards';

export interface PortalPageEntry {
  /** 첫 화면 카드(portalCards.ts 의 카드를 그대로 넘긴다). */
  card: HomeCard;
  /** 이 카드 화면에만 넣을 프레임 CSS. 선택자는 html.bmgj-page-frame 아래로 쓴다. */
  frameCss?: string;
  /** 공통 글 배치가 끝난 뒤 이 카드 화면에만 할 일(프레임 문서를 받음). 원본 글을 지우거나 옮기지 말 것. */
  enhance?: (doc: Document) => void;
}

export interface PortalPage {
  menuNo: string;
  entry: PortalPageEntry;
  /** 링크가 2개 이상인 카드면 그 링크들(머리 배너의 탭). 아니면 빈 배열. */
  tabs: MenuLink[];
}

const pages = new Map<string, PortalPage>();

/** 카드 링크 주소의 menuNo. 없거나 숫자가 아니면 빈 문자열. */
export function menuNoOf(href: string): string {
  try {
    const no = new URL(href).searchParams.get('menuNo') ?? '';
    return /^\d+$/.test(no) ? no : '';
  } catch {
    return '';
  }
}

/** 카드를 등록한다. 같은 메뉴 번호가 이미 있으면 먼저 등록한 것을 두고 콘솔에 알린다. */
export function registerPortalPages(entries: PortalPageEntry[]): void {
  for (const entry of entries) {
    const tabs = entry.card.links.length > 1 ? entry.card.links : [];
    const numbers = entry.card.links.map((l) => menuNoOf(l.href));
    if (numbers.some((no) => !no)) {
      console.error('[bmgj] portal page: menuNo not found in card link', entry.card.id);
      continue;
    }
    for (const menuNo of numbers) {
      const existing = pages.get(menuNo);
      if (existing) {
        console.error('[bmgj] portal page: menuNo already registered', menuNo, existing.entry.card.id, entry.card.id);
        continue;
      }
      pages.set(menuNo, { menuNo, entry, tabs });
    }
  }
}

/** 프레임 왼쪽 메뉴에서 선택된 menuNo들(바깥 → 안쪽) 중 등록된 화면을 찾는다. 안쪽(더 구체적인) 것 우선. */
export function findPortalPage(menuNos: string[]): PortalPage | null {
  for (const no of [...menuNos].reverse()) {
    const page = pages.get(no);
    if (page) return page;
  }
  return null;
}
