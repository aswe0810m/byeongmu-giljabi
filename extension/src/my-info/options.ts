// 내 정보 — 고르기 목록(사용자 결정 2026-11-26).
// 2026-11-26 로그인한 통합지원서 '기본정보' 화면(menuNo 22041, #main 프레임의 moveTHJWSJSGBJeongBoIR_M.do)에서
// 표 구조와 select 항목을 확인해 맞췄다. 원본 화면이 바뀌면 이 파일과 profileSync.ts의 칸 이름을 같이 고친다.

/**
 * 응시지역 병무청. name은 내 정보에 보이는 이름, form은 통합지원서 select(esjbc_cd) 항목의 괄호 앞 부분.
 * 통합지원서 항목 순서: 서울, 부산.울산, 경남, 대구.경북, 경기북부, 경인, 인천, 광주.전남, 대전.충남, 강원.영동, 강원, 제주, 충북, 전북
 */
export const OFFICES: { name: string; form: string }[] = [
  { name: '서울지방병무청', form: '서울' },
  { name: '부산·울산지방병무청', form: '부산.울산' },
  { name: '대구·경북지방병무청', form: '대구.경북' },
  { name: '경인지방병무청', form: '경인' },
  { name: '광주·전남지방병무청', form: '광주.전남' },
  { name: '대전·충남지방병무청', form: '대전.충남' },
  { name: '강원지방병무청', form: '강원' },
  { name: '충북지방병무청', form: '충북' },
  { name: '전북지방병무청', form: '전북' },
  { name: '경남지방병무청', form: '경남' },
  { name: '제주지방병무청', form: '제주' },
  { name: '인천병무지청', form: '인천' },
  { name: '경기북부병무지청', form: '경기북부' },
  { name: '강원영동병무지청', form: '강원.영동' },
];

export const APPLICATION_OFFICES = OFFICES.map((o) => o.name);

const officeKey = (s: string) => s.normalize('NFKC').replace(/\(.*?\)/g, '').replace(/(지방병무청|병무지청|병무청)$/, '').replace(/[\s·ㆍ.,-]/g, '');

/** 통합지원서에서 읽은 이름('부산.울산(부산광역시)', '부산울산지방병무청' 등)을 목록 이름으로 맞춘다. 없으면 그대로. */
export function matchOffice(value: string): string {
  const key = officeKey(value);
  return OFFICES.find((o) => officeKey(o.name) === key || officeKey(o.form) === key)?.name ?? value;
}

/** 내 정보 이름 → 통합지원서 select 항목 이름(괄호 앞). 모르면 null. */
export function officeFormName(name: string): string | null {
  const key = officeKey(name);
  return OFFICES.find((o) => officeKey(o.name) === key || officeKey(o.form) === key)?.form ?? null;
}

// ── 학력사항: 통합지원서는 학교 구분별로 한 줄씩 정해져 있다(줄 추가 없음).
//    학교명·전공학과는 원본의 검색 팝업으로만 넣는 읽기 전용 칸이라 채우기에서 빠진다.
export const SCHOOL_LEVELS = ['초등학교', '중학교', '고등학교', '대학교', '대학원', '직업전문/인력개발원'] as const;
export type SchoolLevel = typeof SCHOOL_LEVELS[number];

const grades = (n: number) => Array.from({ length: n }, (_, i) => `${i + 1}학년`);
const STATUS_FULL = ['재학', '휴학', '졸업', '중퇴', '수료'];

export interface LevelSpec {
  /** 통합지원서 입력칸 id 앞부분(C/M/H/D/DW/G) */
  prefix: string;
  grades: string[];
  statuses: string[];
  /** 학제 select가 있는지(대학교·대학원) */
  system: boolean;
  /** 석사/박사 select가 있는지(대학원) */
  degree: boolean;
  /** 전공학과 칸이 있는지 */
  major: boolean;
  /** 수료기간 select가 있는지(직업전문) */
  period: boolean;
}

export const LEVEL_SPECS: Record<SchoolLevel, LevelSpec> = {
  초등학교: { prefix: 'C', grades: grades(6), statuses: ['졸업', '중퇴', '수료', '미취학'], system: false, degree: false, major: false, period: false },
  중학교: { prefix: 'M', grades: grades(3), statuses: ['졸업', '중퇴', '수료'], system: false, degree: false, major: false, period: false },
  고등학교: { prefix: 'H', grades: grades(3), statuses: STATUS_FULL, system: false, degree: false, major: true, period: false },
  대학교: { prefix: 'D', grades: grades(6), statuses: STATUS_FULL, system: true, degree: false, major: true, period: false },
  대학원: { prefix: 'DW', grades: grades(6), statuses: STATUS_FULL, system: true, degree: true, major: true, period: false },
  '직업전문/인력개발원': { prefix: 'G', grades: [], statuses: [], system: false, degree: false, major: true, period: true },
};

export const SCHOOL_SYSTEMS = ['2년제', '3년제', '4년제', '5년제', '6년제'];
export const SCHOOL_DEGREES = ['석사', '박사'];
export const TRAINING_PERIODS = ['6개월', '1년', '1년 6개월', '2년'];

export function levelSpec(level: string): LevelSpec | null {
  return (LEVEL_SPECS as Record<string, LevelSpec>)[level] ?? null;
}

/** 예전(v2 첫 형식) 학교 구분을 통합지원서 구분으로 옮긴다. */
export function migrateLevel(level: string): { level: string; system: string } {
  if (level === '대학교(4년제)') return { level: '대학교', system: '4년제' };
  if (level === '전문대학(2·3년제)') return { level: '대학교', system: '' };
  return { level, system: '' };
}

// ── 신체조건사항: 통합지원서 기본정보 화면에는 칸이 없다(모집분야를 고른 뒤 단계는 확인 못 함). 내 정보에만 적어 둔다.
export const COLOR_VISIONS = ['정상', '색약', '색맹'];
