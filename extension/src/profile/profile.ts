// 내 정보 — 인적사항·지원 희망 분야 저장 형식(팀 구현 v0.5.1을 소스로 옮김, 0.4.8).
// 모두 chrome.storage.local(이 브라우저)에만 저장한다.

export const PROFILE_KEY = 'bmgj.personalProfile.v1';
export const PROFILE_SYNC_KEY = 'bmgj.personalProfileSync.v1';
export const PROFILE_SYNC_HASH = '#bmgj-profile-sync';
export const TARGET_KEY = 'bmgj.desiredRole.v1';

export interface ProfileField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'tel' | 'email' | 'textarea';
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
}

export const PROFILE_FIELDS: ProfileField[] = [
  { key: 'fullName', label: '성명', type: 'text', placeholder: '성명을 입력하세요', autoComplete: 'name', maxLength: 60 },
  { key: 'birthDate', label: '생년월일', type: 'date', autoComplete: 'bday' },
  { key: 'contactPhone', label: '전화번호 (비상연락처)', type: 'tel', placeholder: '숫자만 또는 하이픈 포함', autoComplete: 'tel-national', maxLength: 24 },
  { key: 'mobilePhone', label: '휴대전화', type: 'tel', placeholder: '010-0000-0000', autoComplete: 'tel', maxLength: 24 },
  { key: 'militaryEmail', label: '전자우편 (나라사랑메일)', type: 'email', placeholder: 'example@narasarang.or.kr', autoComplete: 'off', maxLength: 120 },
  { key: 'registeredOffice', label: '병적지청', type: 'text', placeholder: '예: 서울지방병무청', maxLength: 80 },
  { key: 'personalEmail', label: '전자우편 (일반 이메일)', type: 'email', placeholder: 'example@email.com', autoComplete: 'email', maxLength: 120 },
  { key: 'applicationOffice', label: '응시지역 병무청', type: 'text', placeholder: '예: 서울지방병무청', maxLength: 80 },
  { key: 'address', label: '주소', type: 'textarea', placeholder: '주소를 입력하세요', autoComplete: 'street-address', maxLength: 260 },
];

export type Profile = Record<string, string>;

export const emptyProfile = (): Profile => Object.fromEntries(PROFILE_FIELDS.map((f) => [f.key, '']));

export function cleanProfile(data: unknown): Profile {
  const value = emptyProfile();
  if (data && typeof data === 'object') {
    for (const f of PROFILE_FIELDS) {
      const x = (data as Record<string, unknown>)[f.key];
      if (typeof x === 'string') value[f.key] = x.slice(0, f.maxLength || 120);
    }
  }
  return value;
}

export interface Target { role: string; }

export function cleanTarget(data: unknown): Target | null {
  if (!data || typeof data !== 'object' || typeof (data as { role?: unknown }).role !== 'string') return null;
  const role = (data as { role: string }).role.trim().slice(0, 60);
  return role ? { role } : null;
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
