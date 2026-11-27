// 내 정보 — 지원 희망 분야 고르기(사용자 결정 2026-11-26): 군 → 모집 구분 → 특기(또는 계열) 순서로 고른다.
// 이름은 병무청 누리집 공개 페이지에서 2026-11-26에 확인했다(출처는 각 목록 위 주석).
// - 육군은 병무청 표기가 "기술행정병"이라 전문기술병 자리에 기술행정병을 둔다. 기술행정병은 군사특기를 골라 지원한다.
// - 해군·해병대·공군 기술병은 계열을 골라 지원하고, 실제 특기는 입영 뒤에 나눈다 → 3단계 이름을 '계열'로 보여 준다.
// - 전문특기병 목록은 고를 수 있는 전체 특기다. 지금 모집하는지는 각 군의 가장 최근 회차 공고 하나로만 판단하고
//   (회차를 섞지 않음, src/profile/recruit.ts의 SPECIAL_BOARDS), 그 공고에 없는 특기는 '모집 일정 없음'으로 보여 준다(match.ts).

export type BranchId = 'army' | 'navy' | 'marine' | 'airforce';
export type KindId = 'general' | 'technical' | 'special';

export interface RoleKind {
  id: KindId;
  /** 화면에 보이는 모집 구분 이름 */
  label: string;
  /** 일정 검색에 쓰는 병무청 표기(예: 육군 전문기술병 → 기술행정병) */
  keyword: string;
  /** 3단계 이름: 특기를 골라 지원하면 '특기', 계열을 골라 지원하면 '계열' */
  unit: '특기' | '계열';
  /** 특기(계열) 목록. 비어 있으면 모집 구분 자체를 고른다. */
  specialties: string[];
}

export interface RoleBranch {
  id: BranchId;
  label: string;
  kinds: RoleKind[];
}

/** 이 개수보다 많으면 버튼을 늘어놓지 않고 검색해서 고른다. */
export const SEARCH_THRESHOLD = 20;

// 육군 기술행정병 147개 군사특기: 안내 및 지원절차 > 육군 > 기술행정병 > 군사특기임무 및 설명
// https://www.mma.go.kr/conscription/recruit_service/procedure/army/S_board_text.do?mc=mma0000388&gun_gbcd=1&mojip_gbcd=1
const ARMY_TECHNICAL = [
  'K계열전차승무', 'M계열전차승무', 'K계열전차부대정비', 'M계열전차부대정비', '전차통신정비', '장갑차조종', '장갑차부대정비',
  'K-21보병전투차량승무', 'K-21보병전투차량부대정비', '견인포병', '155mm자주포병', 'K-55자주포조종', '견인포정비', 'K-55자주포정비',
  'K-9자주포조종', 'K-9자주포화포/장갑정비', 'K239포병', 'M/A포병', '사격지휘', '포병레이더', '포병측지', '현무포병',
  '발칸운용/정비', '오리콘운용/정비', '비호운용/정비', '방공작전통제', '휴대용유도무기운용/정비', '천마운용/정비', '천호운용/정비',
  '방공레이더운용/정비', '군사정보', '신호정보/전자전운용', '땅굴탐지', '감시장비운용', '보안', '야전공병', '장애물운용(M)',
  '장애물운용(E)', '야전건설', '소방장비', '배관/기계설비', '전기설비', '장갑전투도저운전', '다목적굴착기운전', '교량전차조종',
  '도하장비조종', '정수장비운용', '공기압축기운용', '크레인운용', '도저운용', '그레이더운용', '도로포장장비운용', '롤러운용',
  '로더운전', '굴착기운용', '발전기운용/정비', '공병장비부대정비', '장애물개척전차조종', '전술통신장비운용/정비',
  '무선전송장비운용/정비', '이동통신장비운용/정비', '정보통신망관리장비운용/정비', '교환시설운용/정비', 'M/W운용/정비',
  '위성운용/정비', '암호운용', '레이다운용/정비', '네트워크운용/정비', '전술C4I운용/정비', '정보체계운용/정비', '항공운항/관제',
  '공격헬기정비', '기동헬기운용', '기동헬기정비', '화생방', '연막', '화생방제독', '화생방정찰', '대공포/유도무기정비', '로켓무기정비',
  '총기정비', '화포정비', '광학기재정비', '감시장비정비', '전차정비', '자주포야전정비', '장갑차야전정비', '유선장비정비',
  '무선장비정비', '다중무선장비정비', '특수통신장비정비', '보안장비정비', '차량정비', '공병장비정비', '발전기정비', '용접/기계공작',
  '병참장비정비', '화생방장비정비', '의무장비정비', '탄약관리', '탄약검사', '장비수리부속공구보급', '편성보급', '영현등록', '지원보급',
  '연료관리', '물자근무지원', '조리', '수송운용(차량운전)', '견인차량운전', '지게차운전', '차륜형장갑차운전', '차량부대정비',
  'K-53계열차량운전', '구난차량운전', '크레인차량운전', '전장이동통제', '항만운영', '선박운용', '일반행정', '군사경찰', '재정회계',
  '공보정훈', '영상제작', '사진운용/정비', '일반의무', '수의', '의무보급', '전문간호', '전문치과', '전문임상병리', '전문방사선촬영',
  '전문약제', '전문물리치료', '법무행정', '야전건설(중졸)', '배관 및 기계설비(중졸)', '전기설비(중졸)', '굴착기운용(중졸)',
  '용접/기계공작(중졸)', '조리(중졸)', '차량운전(중졸)', '견인차량운전(중졸)', '지게차운전(중졸)', '차량부대정비(중졸)',
  '구난차량운전(중졸)', '선박운용(중졸)',
];

export const ROLE_BRANCHES: RoleBranch[] = [
  {
    id: 'army',
    label: '육군',
    kinds: [
      { id: 'general', label: '일반병', keyword: '일반병', unit: '특기', specialties: [] },
      { id: 'technical', label: '기술행정병', keyword: '기술행정병', unit: '특기', specialties: ARMY_TECHNICAL },
      // 전문특기병 전체: 안내 및 지원절차 > 육군 > 전문특기병 메뉴의 세부 특기(https://www.mma.go.kr/contents.do?mc=mma0000487)
      // 어학병 7개: 육군 어학병 모집 공고에 나온 언어(https://www.mma.go.kr/board/boardView.do?gesipan_id=93&gsgeul_no=1523308&mc=usr0000150)
      {
        id: 'special', label: '전문특기병', keyword: '전문특기병', unit: '특기',
        specialties: [
          '탐지분석병', '군악병', '사이버작전병', '특임군사경찰', 'JSA경비병', '특전병', '기독교군종병', '천주교군종병', '불교군종병',
          '지식재산관리병', '훈련소조교병', '유해발굴감식병', '유해발굴기록병', '의장병', 'MC군사경찰', '33경호병', '회계원가비용분석병',
          '화생방시험병', '생물학시험병', '방사능분석연구보조병', '정보보호병', '신호정보/전자전운용', 'S/W개발병', '드론운용및정비병',
          '영상콘텐츠디자이너', '그래픽디자이너', '사진콘텐츠디자이너', '군사과학기술병', '국군체육특기병',
          '프랑스어어학병', '스페인어어학병', '독일어어학병', '일본어어학병', '중국어어학병', '러시아어어학병', '아랍어어학병',
        ],
      },
    ],
  },
  {
    id: 'navy',
    label: '해군',
    kinds: [
      { id: 'general', label: '일반병', keyword: '일반병', unit: '계열', specialties: [] },
      // 계열: 26-12회차 모집계획(https://www.mma.go.kr/board/boardView.do?gesipan_id=94&gsgeul_no=1523543&mc=usr0000151)
      {
        id: 'technical', label: '전문기술병', keyword: '전문기술병', unit: '계열',
        specialties: ['전기', '정보통신', '조리', '항공', '기관', '화생방', '건축토목', '수송', '의무'],
      },
      // 전문특기병 전체: 안내 및 지원절차 > 해군 > 전문특기병(https://www.mma.go.kr/contents.do?mc=mma0003452)
      // 공고 표기에 맞춰 'AI병'은 'AI개발병', '빅데이터분석'은 '빅데이터분석병'으로 적었다.
      {
        id: 'special', label: '전문특기병', keyword: '전문특기병', unit: '특기',
        specialties: [
          '군악병', '문화홍보병', '특전병', '심해잠수병', '통번역병', '어학병', '전문정보병', '군종병', '지식재산관리병', '정보보호병',
          'CBT병', 'AI개발병', 'SW개발병', '해군과학기술연구병', '빅데이터분석병', '전문의무병', '미디어병', '위생관리병', '드론운용정비병',
        ],
      },
    ],
  },
  {
    id: 'marine',
    label: '해병대',
    kinds: [
      { id: 'general', label: '일반병', keyword: '일반병', unit: '계열', specialties: [] },
      // 계열: 26-12회차 모집계획(https://www.mma.go.kr/board/boardView.do?gesipan_id=92&gsgeul_no=1523546&mc=usr0000385)
      { id: 'technical', label: '전문기술병', keyword: '전문기술병', unit: '계열', specialties: ['수색', '화학', '공병', '무기정비', '수송'] },
      // 전문특기병 전체: 안내 및 지원절차 > 해병대 > 전문특기병 > 모집계열별 지원자격(https://www.mma.go.kr/contents.do?mc=mma0003450)
      { id: 'special', label: '전문특기병', keyword: '전문특기병', unit: '특기', specialties: ['군악병', '어학병', '의장병', '드론운용병', '콘텐츠운용병'] },
    ],
  },
  {
    id: 'airforce',
    label: '공군',
    // 계열: 26-12회차 모집안내(https://www.mma.go.kr/board/boardView.do?gesipan_id=95&gsgeul_no=1523542&mc=usr0000152)
    // 전문특기병 전체: 안내 페이지(군사특기 임무 및 설명)가 목록을 글로 주지 않아 26-11·26-12회차 공고에 나온 특기를 모았다.
    // 26-11회차(https://www.mma.go.kr/board/boardView.do?gesipan_id=95&gsgeul_no=1523327&mc=usr0000152)
    kinds: [
      { id: 'general', label: '일반병', keyword: '일반병', unit: '계열', specialties: [] },
      {
        id: 'technical', label: '전문기술병', keyword: '전문기술병', unit: '계열',
        specialties: ['전자계산', '화생방', '의무', '기계', '차량운전', '차량정비', '통신전자전기'],
      },
      {
        id: 'special', label: '전문특기병', keyword: '전문특기병', unit: '특기',
        specialties: [
          '의장병', '군악병', '특수임무군사경찰', '정보보호병', 'AI데이터개발병', '정보체계개발병', '정훈병', '콘텐츠제작병', '군견관리병',
          '교육훈련매체개발병', '영어어학병', '무인항공기운용병', '전문자격의무병', '비파괴검사병', '조리병', '운항관리병', '식별보조병',
          '우주기상분석병',
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

/** 검색어 비교용: 띄어쓰기·기호를 빼고 소문자로 */
export const searchKey = (s: string) => s.normalize('NFKC').toLowerCase().replace(/[\s·/()\-]/g, '');

/** 화면에 보이는 이름. 예: '공군 · 전문특기병 · 정보보호병' */
export function roleTitle(branch: RoleBranch, kind: RoleKind, specialty?: string): string {
  return [branch.label, kind.label, specialty].filter(Boolean).join(' · ');
}
