// 내 정보 — 인적사항·지원 희망 분야 저장 형식(팀 구현 v0.5.1을 소스로 옮김, 0.4.8).
// 모두 chrome.storage.local(이 브라우저)에만 저장한다.
// (사용자 결정 2026-11-26) 저장 항목을 전화번호·휴대전화·전자우편·응시지역 병무청·학력사항·자격증·신체조건사항으로 줄임.
// 성명·생년월일·병적지청·주소·나라사랑메일은 더 저장하지 않는다(v1 값은 읽을 때 필요한 칸만 옮기고, 저장할 때 지움).

export const PROFILE_KEY = 'bmgj.personalProfile.v2';
export const PROFILE_KEY_V1 = 'bmgj.personalProfile.v1';
export const PROFILE_SYNC_KEY = 'bmgj.personalProfileSync.v1';
export const PROFILE_SYNC_HASH = '#bmgj-profile-sync';
export const TARGET_KEY = 'bmgj.desiredRole.v1';

/** 한 줄 글자 칸 */
export type TextKey = 'contactPhone' | 'mobilePhone' | 'email' | 'applicationOffice';

export interface ProfileField {
  key: TextKey;
  label: string;
  type: 'tel' | 'email' | 'select';
  placeholder?: string;
  autoComplete?: string;
  maxLength: number;
}

export const PROFILE_FIELDS: ProfileField[] = [
  { key: 'contactPhone', label: '전화번호', type: 'tel', placeholder: '02-000-0000', autoComplete: 'tel-national', maxLength: 24 },
  { key: 'mobilePhone', label: '휴대전화', type: 'tel', placeholder: '010-0000-0000', autoComplete: 'tel', maxLength: 24 },
  { key: 'email', label: '전자우편', type: 'email', placeholder: 'example@email.com', autoComplete: 'email', maxLength: 120 },
  { key: 'applicationOffice', label: '응시지역 병무청', type: 'select', maxLength: 40 },
];

export interface Education {
  level: string;      // 학교 구분
  school: string;     // 학교명
  major: string;      // 학과(전공)
  grade: string;      // 학년
  status: string;     // 학적 상태
  admitted: string;   // 입학 연월 YYYY-MM
  graduated: string;  // 졸업(예정) 연월 YYYY-MM
}

export interface License {
  name: string;       // 자격·면허명
  grade: string;      // 등급
  acquired: string;   // 취득일 YYYY-MM-DD
  number: string;     // 자격 번호
  issuer: string;     // 발급 기관
}

export interface Body {
  height: string;       // 신장 cm
  weight: string;       // 체중 kg
  visionLeft: string;   // 시력(좌)
  visionRight: string;  // 시력(우)
  colorVision: string;  // 색각
}

export interface Profile extends Record<TextKey, string> {
  education: Education[];
  licenses: License[];
  body: Body;
}

export const MAX_EDUCATION = 4;
export const MAX_LICENSES = 10;

export const emptyEducation = (): Education => ({ level: '', school: '', major: '', grade: '', status: '', admitted: '', graduated: '' });
export const emptyLicense = (): License => ({ name: '', grade: '', acquired: '', number: '', issuer: '' });
export const emptyBody = (): Body => ({ height: '', weight: '', visionLeft: '', visionRight: '', colorVision: '' });

export const emptyProfile = (): Profile => ({
  contactPhone: '', mobilePhone: '', email: '', applicationOffice: '',
  education: [], licenses: [], body: emptyBody(),
});

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');

function cleanRecord<T extends object>(empty: T, data: unknown, max: number): T {
  const out = { ...empty };
  if (data && typeof data === 'object') {
    for (const key of Object.keys(empty) as (keyof T)[]) {
      (out[key] as unknown) = str((data as Record<string, unknown>)[key as string], max);
    }
  }
  return out;
}

const hasValue = (o: object) => Object.values(o).some((v) => typeof v === 'string' && v.trim());

export function cleanProfile(data: unknown): Profile {
  const value = emptyProfile();
  if (!data || typeof data !== 'object') return value;
  const d = data as Record<string, unknown>;
  for (const f of PROFILE_FIELDS) value[f.key] = str(d[f.key], f.maxLength);
  if (Array.isArray(d.education)) {
    value.education = d.education.slice(0, MAX_EDUCATION).map((e) => cleanRecord(emptyEducation(), e, 80));
  }
  if (Array.isArray(d.licenses)) {
    value.licenses = d.licenses.slice(0, MAX_LICENSES).map((l) => cleanRecord(emptyLicense(), l, 80));
  }
  value.body = cleanRecord(emptyBody(), d.body, 10);
  return value;
}

/** v1(팀 구현) 저장값에서 지금도 쓰는 칸만 옮긴다. */
export function migrateProfileV1(data: unknown): Profile {
  const value = emptyProfile();
  if (!data || typeof data !== 'object') return value;
  const d = data as Record<string, unknown>;
  value.contactPhone = str(d.contactPhone, 24);
  value.mobilePhone = str(d.mobilePhone, 24);
  value.email = str(d.personalEmail, 120);
  value.applicationOffice = str(d.applicationOffice, 40);
  return value;
}

/** 저장 직전 정리: 빈 줄은 버린다. */
export function tidyProfile(profile: Profile): Profile {
  const p = cleanProfile(profile);
  for (const f of PROFILE_FIELDS) p[f.key] = p[f.key].trim();
  p.education = p.education.filter(hasValue);
  p.licenses = p.licenses.filter(hasValue);
  return p;
}

export function profileHasValue(p: Profile): boolean {
  return PROFILE_FIELDS.some((f) => p[f.key].trim()) || p.education.some(hasValue) || p.licenses.some(hasValue) || hasValue(p.body);
}

/** 저장소에서 읽은 값(v2, 없으면 v1)을 인적사항으로 만든다. */
export function profileFromStorage(data: Record<string, unknown>): Profile {
  return data[PROFILE_KEY] ? cleanProfile(data[PROFILE_KEY]) : migrateProfileV1(data[PROFILE_KEY_V1]);
}

/**
 * 지원 희망 분야. role은 화면에 보이는 이름(예: '공군 · 전문특기병 · 정보보호병').
 * branch·kind·specialty는 2026-11-26부터 목록에서 고른 값(예전에 직접 입력한 값은 role만 있음).
 */
export interface Target {
  role: string;
  branch?: string;
  kind?: string;
  specialty?: string;
}

export function cleanTarget(data: unknown): Target | null {
  if (!data || typeof data !== 'object' || typeof (data as { role?: unknown }).role !== 'string') return null;
  const d = data as Record<string, unknown>;
  const role = (d.role as string).trim().slice(0, 60);
  if (!role) return null;
  const target: Target = { role };
  if (typeof d.branch === 'string') target.branch = d.branch.slice(0, 20);
  if (typeof d.kind === 'string') target.kind = d.kind.slice(0, 20);
  if (typeof d.specialty === 'string' && d.specialty.trim()) target.specialty = d.specialty.trim().slice(0, 40);
  return target;
}

/** 한국 날짜 기준 남은 일수(시간대에 따라 달라지는 밀리초 카운트다운 대신). deadline = 'YYYY-MM-DD' */
export function countdown(deadline: string): { days: number; label: string } {
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' });
  const parts = Object.fromEntries(
    fmt.formatToParts(new Date()).filter((p) => p.type !== 'literal').map((p) => [p.type, Number(p.value)]),
  );
  const present = Date.UTC(parts.year, parts.month - 1, parts.day);
  const [y, m, d] = deadline.split('-').map(Number);
  const days = Math.round((Date.UTC(y, m - 1, d) - present) / 86400000);
  return { days, label: days > 0 ? `D-${days}` : days === 0 ? 'D-DAY' : `D+${Math.abs(days)}` };
}
