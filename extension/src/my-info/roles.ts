// 내 정보 — 지원 희망 분야 고르기(사용자 결정 2026-11-26): 군 → 모집 구분 → 특기 순서로 고른다.
// 이름은 2026-11-26 병무청 누리집 공개 페이지에서 확인한 것만 적었다(출처는 각 목록 위 주석).
// 육군은 병무청 표기가 "기술행정병"이라 전문기술병 자리에 기술행정병을 둔다.
// 해군·해병대·공군 목록은 공고 본문 일부에서 읽은 것이라 첨부파일(정본)과 다를 수 있다 → 확인 후 고칠 것.

export type BranchId = 'army' | 'navy' | 'marine' | 'airforce';
export type KindId = 'general' | 'technical' | 'special';

export interface RoleKind {
  id: KindId;
  /** 화면에 보이는 모집 구분 이름 */
  label: string;
  /** 일정 검색에 쓰는 병무청 표기(예: 육군 전문기술병 → 기술행정병) */
  keyword: string;
  /** 특기 목록. 비어 있으면 모집 구분 자체를 고른다. */
  specialties: string[];
}

export interface RoleBranch {
  id: BranchId;
  label: string;
  kinds: RoleKind[];
}

export const ROLE_BRANCHES: RoleBranch[] = [
  {
    id: 'army',
    label: '육군',
    kinds: [
      { id: 'general', label: '일반병', keyword: '일반병', specialties: [] },
      // 이달의 모집계획(mc=mma0000743) 표: 기술행정병은 하위 특기 없이 한 줄
      { id: 'technical', label: '기술행정병', keyword: '기술행정병', specialties: [] },
      // 같은 표의 전문특기병 아래 줄
      {
        id: 'special', label: '전문특기병', keyword: '전문특기병',
        specialties: ['탐지분석병', '군악병', '사이버작전병', '특임군사경찰', 'JSA경비병', '특전병', '기독교군종병', '천주교군종병', '불교군종병', '어학병'],
      },
    ],
  },
  {
    id: 'navy',
    label: '해군',
    kinds: [
      { id: 'general', label: '일반병', keyword: '일반병', specialties: [] },
      // 해군 자격면허 인정범위 변경 안내(gesipan_id=94, gsgeul_no=1523529)에 나온 이름
      { id: 'technical', label: '전문기술병', keyword: '전문기술병', specialties: ['정보통신', '화생방', '기관', '의무'] },
      { id: 'special', label: '전문특기병', keyword: '전문특기병', specialties: ['CBT병', '빅데이터분석병', '특전병'] },
    ],
  },
  {
    id: 'marine',
    label: '해병대',
    kinds: [
      // '27년 3월 입영 해병대 모집계획(gesipan_id=92, gsgeul_no=1523546): 일반/전문기술병 계열
      { id: 'general', label: '일반병', keyword: '일반병', specialties: [] },
      { id: 'technical', label: '전문기술병', keyword: '전문기술병', specialties: ['수색', '화학', '공병', '무기정비', '수송'] },
      { id: 'special', label: '전문특기병', keyword: '전문특기병', specialties: ['군악병', '드론운용병', '의장병'] },
    ],
  },
  {
    id: 'airforce',
    label: '공군',
    kinds: [
      { id: 'general', label: '일반병', keyword: '일반병', specialties: [] },
      // '27년 3월 입영 공군 모집안내(gesipan_id=95, gsgeul_no=1523542)
      {
        id: 'technical', label: '전문기술병', keyword: '전문기술병',
        specialties: ['전자계산', '화생방', '의무', '기계', '차량운전', '차량정비', '통신전자전기'],
      },
      {
        id: 'special', label: '전문특기병', keyword: '전문특기병',
        specialties: [
          '의장병', '군악병', '특수임무군사경찰', '정보보호병', '정보체계개발병', '정훈병', '콘텐츠제작병', '군견관리병',
          '무인항공기운용병', '전문자격의무병', '비파괴검사병', '조리병', '운항관리병', '식별보조병', '우주기상분석병', '어학병',
        ],
      },
    ],
  },
];

export const BRANCH_NAMES = ROLE_BRANCHES.map((b) => b.label);

export function findBranch(id: string | undefined): RoleBranch | null {
  return ROLE_BRANCHES.find((b) => b.id === id) ?? null;
}

export function findKind(branch: RoleBranch | null, id: string | undefined): RoleKind | null {
  return branch?.kinds.find((k) => k.id === id) ?? null;
}

/** 화면에 보이는 이름. 예: '공군 · 전문특기병 · 정보보호병' */
export function roleTitle(branch: RoleBranch, kind: RoleKind, specialty?: string): string {
  return [branch.label, kind.label, specialty].filter(Boolean).join(' · ');
}
