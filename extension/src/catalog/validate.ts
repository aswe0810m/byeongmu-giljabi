import type { GroupId, GroupLayout, HomeCard } from './cards';

export interface CatalogCheck { ok: boolean; errors: string[]; }

const EXPECTED_COUNTS: Record<GroupId, { main: number; more: number }> = {
  A: { main: 10, more: 5 },
  B: { main: 5, more: 5 },
};

/** 명세서 4절 "시작할 때 검사" 항목. 실패하면 errors에 이유를 모은다. */
export function validateCatalog(
  cardList: HomeCard[],
  layoutMap: Record<GroupId, GroupLayout>,
): CatalogCheck {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const card of cardList) {
    if (ids.has(card.id)) errors.push(`카드 ID 중복: ${card.id}`);
    ids.add(card.id);
    if (card.links.length === 0) errors.push(`링크 없음: ${card.id}`);
    for (const link of card.links) {
      if (!link.href.startsWith('https:')) errors.push(`https 아님: ${card.id} ${link.href}`);
    }
  }

  for (const group of Object.keys(EXPECTED_COUNTS) as GroupId[]) {
    const layout = layoutMap[group];
    if (!layout) {
      errors.push(`레이아웃 없음: ${group}`);
      continue;
    }
    const expected = EXPECTED_COUNTS[group];
    if (layout.main.length !== expected.main) {
      errors.push(`${group} main 개수 ${layout.main.length} (기대 ${expected.main})`);
    }
    if (layout.more.length !== expected.more) {
      errors.push(`${group} more 개수 ${layout.more.length} (기대 ${expected.more})`);
    }
    for (const id of [...layout.main, ...layout.more]) {
      if (!ids.has(id)) errors.push(`${group} 레이아웃의 ID가 카드 목록에 없음: ${id}`);
    }
  }

  return { ok: errors.length === 0, errors };
}
