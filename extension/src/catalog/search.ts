// 전체 메뉴 검색(사용자 결정 2026-11-05: 명세 3.7의 "현재 그룹 카드 검색" 대신 전체 메뉴 창에서 모든 메뉴를 검색).
import type { MenuCategory, MenuEntry } from '../menu/readAllMenu';

export const SEARCH_MAX = 100;

/** 공백 정리 + NFKC 정규화 + 소문자(3.7 방식 유지). */
export function normalizeText(text: string): string {
  return text.slice(0, SEARCH_MAX).normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();
}

export interface MenuHit {
  entry: MenuEntry;
  path: string[]; // [대분류] 또는 [대분류, 중분류]
}

/**
 * 메뉴 이름이 일치하면 결과에 넣는다. 중분류 이름이 일치하면 그 아래 항목도 모두 넣는다.
 * 대분류 이름만 일치하는 경우는 넣지 않는다(결과가 지나치게 많아지므로).
 */
export function searchAllMenu(menu: MenuCategory[], query: string): MenuHit[] {
  const q = normalizeText(query);
  if (!q) return [];
  const hits: MenuHit[] = [];
  const seen = new Set<string>();
  const push = (entry: MenuEntry, path: string[]) => {
    const key = `${entry.href}|${entry.label}`;
    if (seen.has(key)) return;
    seen.add(key);
    hits.push({ entry, path });
  };
  for (const category of menu) {
    for (const section of category.sections) {
      const sectionMatch = normalizeText(section.label).includes(q);
      if (section.link && sectionMatch) push(section.link, [category.label]);
      for (const item of section.items) {
        if (sectionMatch || normalizeText(item.label).includes(q)) push(item, [category.label, section.label]);
      }
    }
  }
  return hits;
}
