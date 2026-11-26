// 내 정보 — 인적사항·지원 희망 분야 저장 형식(팀 구현 v0.5.1을 소스로 옮김, 0.4.8).
// 모두 chrome.storage.local(이 브라우저)에만 저장한다.
// (사용자 결정 2026-11-26) 저장 항목을 전화번호·휴대전화·전자우편·응시지역 병무청·학력사항·자격/면허로 줄임.
// 신체조건은 통합지원서 기본정보 화면에 없어서 뺐다(예전 저장값의 body는 읽을 때 버리고, 저장할 때 지워진다).
// 성명·생년월일·병적지청·주소·나라사랑메일은 더 저장하지 않는다(v1 값은 읽을 때 필요한 칸만 옮기고, 저장할 때 지움).

import { migrateLevel } from '../my-info/options';

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
  { key: 'contactPhone', label: '전화번호(비상연락처)', type: 'tel', placeholder: '02-000-0000', autoComplete: 'tel-national', maxLength: 24 },
  { key: 'mobilePhone', label: '휴대전화', type: 'tel', placeholder: '010-0000-0000', autoComplete: 'tel', maxLength: 24 },
  { key: 'email', label: '전자우편(상용)', type: 'email', placeholder: 'example@email.com', autoComplete: 'email', maxLength: 120 },
  { key: 'applicationOffice', label: '응시지역 병무청', type: 'select', maxLength: 40 },
];

// 학력사항·자격/면허는 통합지원서 '기본정보' 화면의 칸에 맞춘다(2026-11-26 확인, 자세한 목록은 src/my-info/options.ts).
export interface Education {
  level: string;      // 학교 구분: 초등학교·중학교·고등학교·대학교·대학원·직업전문/인력개발원
  school: string;     // 학교명(통합지원서에서는 검색 팝업으로만 넣는다)
  system: string;     // 학제(대학교·대학원): 2년제~6년제
  degree: string;     // 석사/박사(대학원)
  major: string;      // 전공학과(고등학교 이상, 통합지원서에서는 검색 팝업으로만 넣는다)
  grade: string;      // 학년: '1학년'~'6학년'
  status: string;     // 졸업구분: 재학·휴학·졸업·중퇴·수료(초등학교는 미취학도)
  period: string;     // 수료기간(직업전문/인력개발원)
}

export interface License {
  name: string;       // 자격·면허 명칭(통합지원서에서는 검색 팝업으로만 넣는다)
  acquired: string;   // 취득시기 YYYY-MM-DD
}

export interface Profile extends Record<TextKey, string> {
  education: Education[];
  licenses: License[];
}

export const MAX_EDUCATION = 6; // 학교 구분마다 한 줄
export const MAX_LICENSES = 10;

export const emptyEducation = (): Education => ({ level: '', school: '', system: '', degree: '', major: '', grade: '', status: '', period: '' });
export const emptyLicense = (): License => ({ name: '', acquired: '' });

export const emptyProfile = (): Profile => ({
  contactPhone: '', mobilePhone: '', email: '', applicationOffice: '',
  education: [], licenses: [],
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
    value.education = d.education.slice(0, MAX_EDUCATION).map((e) => {
      const row = cleanRecord(emptyEducation(), e, 80);
      // 첫 v2 형식(학교 구분 '대학교(4년제)', 학년 '1')을 통합지원서 표기로 옮긴다.
      const moved = migrateLevel(row.level);
      row.level = moved.level;
      if (!row.system) row.system = moved.system;
      if (/^[1-6]$/.test(row.grade)) row.grade = `${row.grade}학년`;
      return row;
    });
  }
  if (Array.isArray(d.licenses)) {
    value.licenses = d.licenses.slice(0, MAX_LICENSES).map((l) => cleanRecord(emptyLicense(), l, 80));
  }
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
  return PROFILE_FIELDS.some((f) => p[f.key].trim()) || p.education.some(hasValue) || p.licenses.some(hasValue);
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
