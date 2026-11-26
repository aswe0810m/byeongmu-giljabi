// 내 정보 — 고른 지원 분야에 맞는 공식 모집 일정 찾기.
// 특기 이름으로 먼저 찾고, 없으면 모집 구분(예: 공군 전문특기병)으로 찾는다. 다른 군 이름만 적힌 일정은 뺀다.
import type { Target } from '../profile/profile';
import type { RecruitCache, RecruitRecord } from '../profile/recruit';
import { recruitForRole } from '../profile/recruit';
import { BRANCH_NAMES, findBranch, findKind } from './roles';

function branchOf(item: RecruitRecord): string | null {
  const text = `${item.title} ${item.label}`;
  const found = BRANCH_NAMES.filter((name) => text.includes(name));
  if (found.length === 1) return found[0];
  if (found.length === 0 && item.source === '육군 모집계획 공고') return '육군';
  return null; // 군 이름이 없거나 여러 개면 판단하지 않음
}

export function schedulesForTarget(cache: RecruitCache | null, target: Target): RecruitRecord[] {
  const branch = findBranch(target.branch);
  const kind = findKind(branch, target.kind);
  if (!branch || !kind) return recruitForRole(cache, target.role); // 예전에 직접 입력한 분야

  const keywords: string[] = [];
  if (target.specialty) {
    keywords.push(target.specialty);
    // '군악병'과 '군악'처럼 끝의 '병'을 빼고 적는 공고도 있다.
    if (target.specialty.endsWith('병') && target.specialty.length >= 4) keywords.push(target.specialty.slice(0, -1));
  }
  keywords.push(kind.keyword);

  for (const keyword of keywords) {
    const list = recruitForRole(cache, keyword).filter((item) => {
      const b = branchOf(item);
      return b === null || b === branch.label;
    });
    if (list.length) return list;
  }
  return [];
}
