// 내 정보 — 고른 지원 분야에 맞는 공식 모집 일정 찾기.
// 특기 이름으로 먼저 찾고, 없으면 모집 구분(예: 공군 전문특기병)으로 찾는다. 다른 군 이름만 적힌 일정은 뺀다.
// (사용자 결정 2026-11-26) 전문특기병은 각 군의 가장 최근 회차 공고 하나만 기준으로 한다(회차를 섞지 않음).
// 그 공고에 고른 특기가 없으면 다른 일정으로 대신하지 않고 '모집 일정 없음'으로 알려 준다.
import type { Target } from '../profile/profile';
import type { PostedNotice, RecruitCache, RecruitRecord } from '../profile/recruit';
import { recruitForRole } from '../profile/recruit';
import type { RoleBranch } from './roles';
import { BRANCH_NAMES, findBranch, findKind } from './roles';

export interface TargetSchedules {
  /** 마감이 남은 일정(가까운 순) */
  list: RecruitRecord[];
  /** 고른 전문특기병 특기가 최신 회차 공고에 없을 때 그 공고 */
  missingIn: PostedNotice | null;
}

function branchOf(item: RecruitRecord): string | null {
  const text = `${item.title} ${item.label}`.replace(/\s+/g, '');
  const found = BRANCH_NAMES.filter((name) => text.includes(name));
  if (found.length === 1) return found[0];
  // '해병대'에는 '해병'만 있고 '해군'은 없으므로 위에서 걸러진다. 육군 공고 게시판 일정은 제목에 군 이름이 없다.
  if (found.length === 0 && item.source === '육군 모집계획 공고') return '육군';
  return null; // 군 이름이 없거나 여러 개면 판단하지 않음
}

const norm = (s: string) => s.normalize('NFKC').replace(/[\s\-_.·/()[\]「」]/g, '').toLowerCase();

/** 공고 글에 특기가 있는지. '군악병'처럼 끝의 '병'을 빼고 적는 공고(육군 '군악')도 있다. */
export function specialtyInNotice(specialty: string, notice: PostedNotice): boolean {
  const text = norm(notice.text);
  const name = norm(specialty);
  if (text.includes(name)) return true;
  return name.endsWith('병') && name.length >= 3 && text.includes(name.slice(0, -1));
}

function search(cache: RecruitCache | null, branch: RoleBranch, keywords: string[]): RecruitRecord[] {
  for (const keyword of keywords) {
    const list = recruitForRole(cache, keyword).filter((item) => {
      const b = branchOf(item);
      return b === null || b === branch.label;
    });
    if (list.length) return list;
  }
  return [];
}

export function targetSchedules(cache: RecruitCache | null, target: Target): TargetSchedules {
  const branch = findBranch(target.branch);
  const kind = findKind(branch, target.kind);
  if (!branch || !kind) return { list: recruitForRole(cache, target.role), missingIn: null }; // 예전에 직접 입력한 분야

  const keywords: string[] = [];
  if (target.specialty) {
    keywords.push(target.specialty);
    // '군악병'과 '군악'처럼 끝의 '병'을 빼고 적는 공고도 있다.
    if (target.specialty.endsWith('병') && target.specialty.length >= 4) keywords.push(target.specialty.slice(0, -1));
  }
  keywords.push(kind.keyword);

  if (kind.id === 'special' && target.specialty) {
    const notice = cache?.posted?.[branch.id];
    if (notice) {
      if (!specialtyInNotice(target.specialty, notice)) return { list: [], missingIn: notice };
      // 이달의 모집계획 표에서 해군·해병대·공군은 '해 군'처럼 군 이름 한 줄로만 나온다.
      // '전문특기병'으로 찾으면 군 이름 없는 육군 줄이 걸리므로 군 이름으로 찾는다.
      if (branch.id !== 'army') keywords.splice(keywords.indexOf(kind.keyword), 1, branch.label);
    }
  }
  return { list: search(cache, branch, keywords), missingIn: null };
}

/** 예전 호출용: 일정 목록만 */
export function schedulesForTarget(cache: RecruitCache | null, target: Target): RecruitRecord[] {
  return targetSchedules(cache, target).list;
}
