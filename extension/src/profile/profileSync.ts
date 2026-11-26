// 병무민원 통합지원서 ↔ 내 정보 연결(사용자 결정 2026-11-26).
// - 예전처럼 화면을 열자마자 자동으로 읽지 않는다. 통합지원서 화면의 버튼 두 개로만 움직인다.
//   · '내 정보로 채우기': 내 정보에 저장한 값을 지원서 입력칸에 넣는다(값이 있어도 덮어씀). 제출·다음 단계는 누르지 않는다.
//   · '내 정보에 가져오기': 지원서에 보이는 값을 내 정보에 저장한다.
// - 학교명·전공학과·자격/면허 명칭은 원본 검색 팝업이 숨은 코드값을 같이 넣는 읽기 전용 칸이라 채우지 않는다(가져오기만).
// - 로그인 자격 증명·쿠키·세션 토큰·비밀번호·인증번호·주민등록번호·계좌·주소는 읽거나 저장하지 않는다.
// - 성명·생년월일은 저장하지 않고, 다른 사람이 같은 브라우저로 로그인했는지 가리는 데만 해시로 쓴다.
import { portalMenuUrl } from '../catalog/portalCards';
import { LEVEL_SPECS, SCHOOL_LEVELS, levelSpec, matchOffice } from '../my-info/options';
import { readSession } from '../portal/portalDom';
import type { Education, License, Profile } from './profile';
import {
  PROFILE_KEY, PROFILE_KEY_V1, PROFILE_SYNC_HASH, PROFILE_SYNC_KEY, cleanProfile, emptyEducation, emptyProfile, profileFromStorage,
} from './profile';

const APPLICATION_PATH = '/caisBMHS/dmem/dmem/mwgr/gjwn/moveTHJWSJSGBJeongBoIR_M.do';
const APPLICATION_MENU = '22041';
const PENDING_LOGIN_KEY = 'bmgj.pendingProfileLogin';
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const TOOLS_ID = 'bmgj-apply-tools';

/** 내 정보에서 연 탭만, 본인인증 후 병무청의 통합지원서 안내로 이동한다. */
export function openProfileGuideAfterLogin(frame: HTMLIFrameElement): void {
  const url = new URL(location.href);
  let expiresAt = 0;
  try {
    if (url.hash === PROFILE_SYNC_HASH) {
      expiresAt = Date.now() + LOGIN_WINDOW_MS;
      // 본인인증이 포털 첫 화면으로 돌아와도 같은 탭에서 이 요청을 찾는다.
      sessionStorage.setItem(PENDING_LOGIN_KEY, String(expiresAt));
      url.hash = '';
      history.replaceState(history.state, '', url);
    } else {
      expiresAt = Number(sessionStorage.getItem(PENDING_LOGIN_KEY));
    }
  } catch { /* 저장소를 사용할 수 없으면 현재 문서에서만 인증 완료를 기다린다. */ }

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return;

  const check = () => {
    const expired = expiresAt <= Date.now();
    if (!expired && !readSession(frame).canLogout) return;

    window.clearInterval(timer);
    frame.removeEventListener('load', check);
    try { sessionStorage.removeItem(PENDING_LOGIN_KEY); } catch { /* 무시 */ }

    if (!expired && url.searchParams.get('menuNo') !== APPLICATION_MENU) {
      location.assign(portalMenuUrl(APPLICATION_MENU));
    }
  };

  const timer = window.setInterval(check, 750);
  frame.addEventListener('load', check);
  check();
}

// ── 표 읽기 공통

/** 인적사항 표에서 쓰는 칸. fullName·birthDate는 본인 확인용(저장 안 함). */
type FieldKey = 'fullName' | 'birthDate' | 'contactPhone' | 'mobilePhone' | 'email' | 'applicationOffice';
type SavedKey = Exclude<FieldKey, 'fullName' | 'birthDate'>;
const SAVED_KEYS: SavedKey[] = ['contactPhone', 'mobilePhone', 'email', 'applicationOffice'];
const FIELD_NAMES: Record<SavedKey, string> = {
  contactPhone: '전화번호', mobilePhone: '휴대전화', email: '전자우편', applicationOffice: '응시지역 병무청',
};

const CAPS: Record<FieldKey, number> = {
  fullName: 60, birthDate: 10, contactPhone: 24, mobilePhone: 24, email: 120, applicationOffice: 40,
};

const normal = (v: unknown) => String(v || '').replace(/[\s:*＊•·()（）[\]【】/]/g, '').trim();
const visible = (el: Element | null): el is Element => {
  if (!el || !el.getClientRects().length) return false;
  const style = getComputedStyle(el);
  return style.display !== 'none' && style.visibility === 'visible';
};
const RRN = /(?:^|\D)\d{6}[-\s]?\d{7}(?:\D|$)/;
const SECRET_NAME = /(password|passwd|jumin|rrn|token|csrf|session|auth|gyejwa|account|인증|비밀번호|주민등록|계좌)/i;

function labelKey(label: string | null): FieldKey | null {
  const s = normal(label);
  if (!s || s.length > 36) return null;
  if (/^(성명|이름|지원자성명)$/.test(s)) return 'fullName';
  if (/^(생년월일|출생일)$/.test(s)) return 'birthDate';
  // 통합지원서 표기: '전화번호(비상연락처)'
  if (/^(전화번호|전화번호비상연락처|비상연락처|유선전화|연락전화번호)$/.test(s)) return 'contactPhone';
  if (/^(휴대전화|휴대폰|휴대전화번호|휴대폰번호|핸드폰번호)$/.test(s)) return 'mobilePhone';
  if (/^(응시지역병무청|응시지역|응시지방병무청|응시지구)$/.test(s)) return 'applicationOffice';
  // '전자우편(나라사랑메일)'은 저장하지 않는다.
  if (/^(전자우편상용|전자우편일반|상용이메일|일반이메일|이메일|이메일주소)$/.test(s)) return 'email';
  return null;
}

type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const isPlainControl = (control: FormControl) => {
  const type = control.getAttribute('type')?.toLowerCase() ?? '';
  return !['hidden', 'password', 'file', 'checkbox', 'radio', 'submit', 'button', 'image'].includes(type)
    && !SECRET_NAME.test(`${control.name} ${control.id}`);
};

/** select는 고른 항목 글자('선택'이면 빈 값), 입력칸은 값. */
function controlText(control: FormControl | null): string {
  if (!control) return '';
  if (control instanceof HTMLSelectElement) {
    const text = (control.selectedOptions[0]?.textContent ?? '').trim();
    return !control.value || /^선택/.test(text) ? '' : text;
  }
  return control.value.trim();
}

function cellControls(cell: Element): FormControl[] {
  return [...cell.querySelectorAll<FormControl>('input,textarea,select')].filter((c) => visible(c) && isPlainControl(c));
}

function readCell(cell: HTMLTableCellElement): string {
  if (!visible(cell)) return '';
  const controls = cellControls(cell);
  if (!controls.length && !cell.querySelector('input,textarea,select')) return cell.innerText ?? cell.textContent ?? '';
  // 입력칸이 있는 셀의 안내 문구는 저장하지 않는다.
  return controls.map(controlText).find(Boolean) ?? '';
}

function valid(key: FieldKey, raw: string): string {
  const value = String(raw || '').replace(/\s+/g, ' ').trim();
  if (!value || value.length > (key === 'birthDate' ? 32 : CAPS[key])
    || /(비밀번호|인증번호|예\)|예시|접속하기|선택하세요|선택해)/.test(value)
    || RRN.test(value)) return '';
  if (key === 'fullName') return /^[가-힣a-zA-Z\s·-]{2,60}$/.test(value) ? value : '';
  if (key === 'birthDate') {
    let m = value.match(/^(\d{4})[./\-년\s]+(\d{1,2})[./\-월\s]+(\d{1,2})일?\.?$/);
    if (!m) m = value.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (!m) return '';
    const year = +m[1], month = +m[2], day = +m[3];
    const d = new Date(Date.UTC(year, month - 1, day));
    return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day
      ? `${m[1]}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      : '';
  }
  if (key === 'contactPhone' || key === 'mobilePhone') return /^[+\d()\s-]{7,24}$/.test(value) ? value : '';
  if (key === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : '';
  if (key === 'applicationOffice') {
    return /병무(지)?청|병무지청|서울|부산|대구|경북|광주|전남|대전|충남|경기|강원|충북|전북|경남|제주|인천|울산/.test(value) ? matchOffice(value) : '';
  }
  return '';
}

/** 학력·자격 칸의 짧은 글자만 받는다(주민등록번호처럼 보이면 버림). */
const plain = (v: string, max = 80) => {
  const s = v.replace(/\s+/g, ' ').trim();
  return !s || RRN.test(s) ? '' : s.slice(0, max);
};

/** 성명+생년월일 SHA-256(본인 확인용). 원문은 저장하지 않는다. */
async function ownerHash(name: string, birth: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${name}|${birth}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function findTable(captionStart: string): HTMLTableElement | null {
  const key = normal(captionStart);
  return [...document.querySelectorAll('table')].find((t) => visible(t) && normal(t.caption?.textContent).startsWith(key)) ?? null;
}

/** 인적사항 표: 칸 이름 → 값 칸 */
function personalCells(): Map<FieldKey, HTMLTableCellElement> {
  const cells = new Map<FieldKey, HTMLTableCellElement>();
  const table = findTable('인적사항');
  if (!table) return cells;
  for (const header of table.querySelectorAll('th')) {
    const key = labelKey(header.textContent);
    const cell = header.nextElementSibling;
    if (!key || cells.has(key) || !visible(header) || !(cell instanceof HTMLTableCellElement) || cell.tagName !== 'TD') continue;
    cells.set(key, cell);
  }
  return cells;
}

async function formOwner(cells: Map<FieldKey, HTMLTableCellElement>): Promise<string | null> {
  const name = valid('fullName', cells.get('fullName') ? readCell(cells.get('fullName')!) : '');
  const birth = valid('birthDate', cells.get('birthDate') ? readCell(cells.get('birthDate')!) : '');
  return name && birth ? ownerHash(name, birth) : null;
}

/** 학력사항 표에서 학교 구분 줄 찾기(첫 칸 th가 '초등학교'·'대학교' 등) */
function educationRow(table: HTMLTableElement, level: string): HTMLTableRowElement | null {
  const key = normal(level);
  return [...table.rows].find((row) => row.cells[0]?.tagName === 'TH' && normal(row.cells[0].textContent) === key) ?? null;
}

const byId = <T extends Element>(row: Element, id: string) => row.querySelector<T>(`[id="${id}"]`);

/** 자격/면허 표의 줄들(명칭 칸 jgmyeonheo_nm_N이 있는 줄) */
function licenseRows(): { row: HTMLTableRowElement; name: HTMLInputElement }[] {
  const table = findTable('자격면허');
  if (!table) return [];
  return [...table.rows].flatMap((row) => {
    const name = row.querySelector<HTMLInputElement>('input[name^="jgmyeonheo_nm"]');
    return name && visible(row) ? [{ row, name }] : [];
  });
}

const dateSelects = (row: Element) => ({
  y: row.querySelector<HTMLSelectElement>('select[name="chwideuk_yyyy"]'),
  m: row.querySelector<HTMLSelectElement>('select[name="chwideuk_mm"]'),
  d: row.querySelector<HTMLSelectElement>('select[name="chwideuk_dd"]'),
});

// ── 가져오기: 지원서 → 내 정보

interface Pulled {
  owner: string;
  fields: SavedKey[];
  values: Partial<Record<SavedKey, string>>;
  education: Education[];
  licenses: License[];
}

async function readForm(): Promise<Pulled | null> {
  const cells = personalCells();
  const owner = await formOwner(cells);
  // 성명·생년월일이 보이는 본인 표에서만 읽는다(다른 표를 잘못 읽지 않게).
  if (!owner) return null;
  const values: Partial<Record<SavedKey, string>> = {};
  for (const key of SAVED_KEYS) {
    const cell = cells.get(key);
    const value = cell ? valid(key, readCell(cell)) : '';
    if (value) values[key] = value;
  }

  const education: Education[] = [];
  const eduTable = findTable('학력사항');
  if (eduTable) {
    for (const level of SCHOOL_LEVELS) {
      const row = educationRow(eduTable, level);
      if (!row) continue;
      const spec = LEVEL_SPECS[level];
      const p = spec.prefix;
      const e = emptyEducation();
      e.level = level;
      e.school = plain(level === '직업전문/인력개발원'
        ? controlText(byId<HTMLSelectElement>(row, 'Gjejmhakgyo_cd'))
        : controlText(byId<HTMLInputElement>(row, `${p}hakgyo_nm`)));
      e.major = spec.major ? plain(controlText(byId<HTMLInputElement>(row, `${p}jeongong_cdm`))) : '';
      e.system = spec.system ? plain(controlText(byId<HTMLSelectElement>(row, `${p}hakje_cd`))) : '';
      e.degree = spec.degree ? plain(controlText(byId<HTMLSelectElement>(row, 'ssbaksagbcd'))) : '';
      if (spec.period) {
        e.period = plain(controlText(byId<HTMLSelectElement>(row, `${p}suryo_gbcd`)));
      } else {
        e.grade = plain(controlText(byId<HTMLSelectElement>(row, `${p}haknyeon_cd`)));
        e.status = plain(controlText(byId<HTMLSelectElement>(row, `${p}suryo_gbcd`)));
      }
      if (e.school || e.major || e.system || e.degree || e.grade || e.status || e.period) education.push(e);
    }
  }

  const licenses: License[] = [];
  for (const { row, name } of licenseRows()) {
    const title = plain(name.value);
    if (!title) continue;
    const { y, m, d } = dateSelects(row);
    const [yy, mm, dd] = [controlText(y), controlText(m), controlText(d)];
    const acquired = /^\d{4}$/.test(yy) && /^\d{2}$/.test(mm) && /^\d{2}$/.test(dd) ? `${yy}-${mm}-${dd}` : '';
    licenses.push({ name: title, acquired });
  }

  return { owner, fields: SAVED_KEYS.filter((k) => values[k]), values, education, licenses };
}

async function pullIntoMyInfo(): Promise<string> {
  const pulled = await readForm();
  if (!pulled) return '인적사항 표에서 성명·생년월일을 찾지 못해 가져오지 않았어요. 기본정보 화면인지 확인해 주세요.';
  const saved = await chrome.storage.local.get([PROFILE_KEY, PROFILE_KEY_V1, PROFILE_SYNC_KEY]);
  const sync = saved[PROFILE_SYNC_KEY] as { owner?: string } | undefined;
  // 다른 사람이 로그인했으면 이전 사람의 인적사항을 이어 쓰지 않는다.
  const differentPerson = !!sync?.owner && sync.owner !== pulled.owner;
  const base = differentPerson ? emptyProfile() : profileFromStorage(saved);
  const next: Profile = cleanProfile({
    ...base,
    ...pulled.values,
    education: pulled.education,
    licenses: pulled.licenses,
  });
  await chrome.storage.local.set({
    [PROFILE_KEY]: next,
    [PROFILE_SYNC_KEY]: { updatedAt: new Date().toISOString(), fields: pulled.fields, owner: pulled.owner, source: 'application-form-button' },
  });
  await chrome.storage.local.remove(PROFILE_KEY_V1);
  const parts = [
    ...pulled.fields.map((k) => FIELD_NAMES[k]),
    `학력 ${pulled.education.length}줄`,
    `자격/면허 ${pulled.licenses.length}개`,
  ];
  return `내 정보에 가져왔어요: ${parts.join(', ')}.${differentPerson ? ' 다른 사람의 정보가 있어서 새로 저장했어요.' : ''}`;
}

// ── 채우기: 내 정보 → 지원서

/** 원본 스크립트(jQuery 핸들러, phoneFormat 등)가 알아채도록 사용자가 입력한 것처럼 이벤트를 보낸다. */
function fire(el: Element, types: string[]) {
  for (const type of types) {
    const event = type.startsWith('key')
      ? new KeyboardEvent(type, { bubbles: true, cancelable: true })
      : new Event(type, { bubbles: true, cancelable: true });
    el.dispatchEvent(event);
  }
}

/** 값이 이미 같으면(isSame) 손대지 않는다. 원본이 change 이벤트로 줄을 '수정됨'으로 표시하는 것을 막기 위해서. */
function setInput(el: HTMLInputElement | null, value: string, isSame = (current: string) => current === value): boolean {
  if (!el || el.readOnly || el.disabled || !value) return false;
  if (isSame(el.value.trim())) return true;
  const v = el.maxLength > 0 ? value.slice(0, el.maxLength) : value;
  el.focus();
  el.value = v;
  fire(el, ['input', 'keyup', 'change']);
  el.blur();
  return true;
}

function setSelect(el: HTMLSelectElement | null, match: (text: string) => boolean): boolean {
  if (!el || el.disabled) return false;
  const option = [...el.options].find((o) => o.value && match((o.textContent ?? '').trim()));
  if (!option) return false;
  if (el.value === option.value) return true;
  el.value = option.value;
  fire(el, ['change']);
  return true;
}

const same = (a: string) => (b: string) => normal(a) === normal(b);

async function fillFromMyInfo(): Promise<string> {
  const saved = await chrome.storage.local.get([PROFILE_KEY, PROFILE_KEY_V1, PROFILE_SYNC_KEY]);
  const profile = profileFromStorage(saved);
  const cells = personalCells();
  if (!cells.size) return '인적사항 표를 찾지 못했어요. 기본정보 화면에서 눌러 주세요.';

  const sync = saved[PROFILE_SYNC_KEY] as { owner?: string } | undefined;
  const owner = await formOwner(cells);
  if (sync?.owner && owner && sync.owner !== owner) {
    return '내 정보에 저장된 인적사항이 지금 로그인한 사람의 것이 아니에요. 채우지 않았어요.';
  }

  const done: string[] = [];
  const failed: string[] = [];
  const firstInput = (key: SavedKey) => {
    const cell = cells.get(key);
    return cell ? cellControls(cell).find((c): c is HTMLInputElement => c instanceof HTMLInputElement) ?? null : null;
  };

  // 전화번호·휴대전화: 원본 안내대로 숫자만 넣는다.
  for (const key of ['contactPhone', 'mobilePhone'] as const) {
    const digits = profile[key].replace(/\D/g, '');
    if (!digits) continue;
    (setInput(firstInput(key), digits, (current) => current.replace(/\D/g, '') === digits) ? done : failed).push(FIELD_NAMES[key]);
  }
  if (profile.email.trim()) {
    (setInput(firstInput('email'), profile.email.trim()) ? done : failed).push(FIELD_NAMES.email);
  }
  if (profile.applicationOffice) {
    const cell = cells.get('applicationOffice');
    const select = cell?.querySelector<HTMLSelectElement>('select') ?? null;
    (setSelect(select, (text) => matchOffice(text) === matchOffice(profile.applicationOffice)) ? done : failed).push(FIELD_NAMES.applicationOffice);
  }

  // 학력: 고르기 칸(학제·학위·학년·졸업구분·수료기간, 직업전문 학교)만 넣는다.
  const eduTable = findTable('학력사항');
  let eduCount = 0;
  let needSearch = false;
  for (const e of profile.education) {
    const spec = levelSpec(e.level);
    const row = eduTable && spec ? educationRow(eduTable, e.level) : null;
    if (!spec || !row) {
      if (e.level) failed.push(`학력(${e.level})`);
      continue;
    }
    const p = spec.prefix;
    let any = false;
    if (spec.system && e.system) any = setSelect(byId(row, `${p}hakje_cd`), same(e.system)) || any;
    if (spec.degree && e.degree) any = setSelect(byId(row, 'ssbaksagbcd'), same(e.degree)) || any;
    if (spec.period) {
      if (e.period) any = setSelect(byId(row, `${p}suryo_gbcd`), same(e.period)) || any;
      if (e.school) {
        const key = normal(e.school);
        any = setSelect(byId(row, 'Gjejmhakgyo_cd'), (text) => normal(text).includes(key)) || any;
      }
    } else {
      if (e.grade) any = setSelect(byId(row, `${p}haknyeon_cd`), same(e.grade)) || any;
      if (e.status) any = setSelect(byId(row, `${p}suryo_gbcd`), same(e.status)) || any;
      // 학교명·전공학과는 지원서 값과 다를 때만 검색 버튼으로 고르라고 알려 준다.
      const formSchool = controlText(byId<HTMLInputElement>(row, `${p}hakgyo_nm`));
      const formMajor = spec.major ? controlText(byId<HTMLInputElement>(row, `${p}jeongong_cdm`)) : '';
      if ((e.school && normal(e.school) !== normal(formSchool)) || (e.major && normal(e.major) !== normal(formMajor))) needSearch = true;
    }
    if (any) eduCount += 1;
  }
  if (eduCount) done.push(`학력 ${eduCount}줄`);

  // 자격/면허: 명칭이 같은 줄이 있으면 취득시기만 넣는다.
  const rows = licenseRows();
  let licCount = 0;
  let licMissing = 0;
  for (const l of profile.licenses) {
    if (!l.name.trim()) continue;
    const found = rows.find((r) => normal(r.name.value) === normal(l.name));
    if (!found) { licMissing += 1; continue; }
    const m = l.acquired.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) continue;
    const { y, m: mm, d } = dateSelects(found.row);
    const ok = [setSelect(y, same(m[1])), setSelect(mm, same(m[2])), setSelect(d, same(m[3]))].every(Boolean);
    if (ok) licCount += 1;
  }
  if (licCount) done.push(`자격/면허 취득시기 ${licCount}개`);

  const notes: string[] = [];
  if (needSearch) notes.push('학교명·전공학과는 원본의 검색 버튼으로 골라 주세요.');
  if (licMissing) notes.push(`자격/면허 ${licMissing}개는 지원서에 같은 명칭이 없어요. '자격/면허사항 추가'와 검색으로 넣은 뒤 다시 눌러 주세요.`);
  if (failed.length) notes.push(`넣지 못한 칸: ${failed.join(', ')}.`);
  if (!done.length) return ['채운 칸이 없어요. 내 정보에 인적사항을 먼저 저장해 주세요.', ...notes].join(' ');
  return [`채웠어요: ${done.join(', ')}. 내용을 확인한 뒤 직접 저장·제출해 주세요.`, ...notes].join(' ');
}

// ── 통합지원서 화면의 버튼

const TOOL_CSS = `
:host { all: initial; display: block; margin: 0 0 14px; }
.box { font-family: 'Pretendard', 'Noto Sans KR', 'Malgun Gothic', sans-serif; border: 1px solid #cfe1d5; border-radius: 14px;
  background: #f3faf5; padding: 14px 16px; color: #203d33; }
.title { margin: 0 0 4px; font-size: 15px; font-weight: 800; }
.help { margin: 0 0 10px; font-size: 13px; line-height: 1.55; color: #4f6a5c; word-break: keep-all; }
.buttons { display: flex; flex-wrap: wrap; gap: 8px; }
button { min-height: 40px; padding: 8px 16px; border-radius: 11px; font: inherit; font-size: 15px; font-weight: 750; cursor: pointer;
  border: 1px solid #286c50; }
.fill { background: #286c50; color: #fff; }
.pull { background: #fff; color: #286c50; }
button:disabled { opacity: .55; cursor: default; }
button:focus-visible { outline: 3px solid #79b496; outline-offset: 2px; }
.confirm { padding: 10px 12px; border-radius: 11px; background: #fff; border: 1px solid #cfe1d5; }
.question { margin: 0 0 8px; font-size: 14px; line-height: 1.55; font-weight: 700; word-break: keep-all; }
[hidden] { display: none !important; }
.status { margin: 10px 0 0; font-size: 14px; line-height: 1.55; font-weight: 650; color: #1f5a41; word-break: keep-all; }
.status:empty { display: none; }
`;

function mountTools(): boolean {
  if (document.getElementById(TOOLS_ID)) return true;
  const table = findTable('인적사항');
  if (!table?.parentElement) return false;

  const host = document.createElement('div');
  host.id = TOOLS_ID;
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = `<style>${TOOL_CSS}</style>
<section class="box" aria-label="병무길잡이 내 정보 연결">
  <p class="title">병무길잡이 · 내 정보 연결</p>
  <p class="help">채우기: 내 정보에 저장한 연락처·응시지역·학력(학년·졸업구분 등)·자격/면허 취득시기를 이 지원서에 넣어요. 이미 적힌 값도 바뀌고, 저장·제출은 직접 해야 해요.<br>가져오기: 이 지원서에 적힌 연락처·학력·자격/면허를 내 정보에 저장해요.</p>
  <div class="buttons">
    <button type="button" class="fill">내 정보로 채우기</button>
    <button type="button" class="pull">내 정보에 가져오기</button>
  </div>
  <div class="confirm" hidden>
    <p class="question"></p>
    <div class="buttons">
      <button type="button" class="fill">예</button>
      <button type="button" class="pull">아니오</button>
    </div>
  </div>
  <p class="status" role="status" aria-live="polite"></p>
</section>`;
  const status = shadow.querySelector<HTMLElement>('.status')!;
  const actions = shadow.querySelector<HTMLElement>('.buttons')!;
  const confirmBox = shadow.querySelector<HTMLElement>('.confirm')!;
  const question = shadow.querySelector<HTMLElement>('.question')!;
  const [fillButton, pullButton] = [...actions.querySelectorAll<HTMLButtonElement>('button')];
  const [yesButton, noButton] = [...confirmBox.querySelectorAll<HTMLButtonElement>('button')];
  let pendingTask: (() => Promise<string>) | null = null;
  let lastButton: HTMLButtonElement = fillButton;

  // 브라우저 기본 confirm 창 대신 이 박스 안에서 한 번 더 묻는다(내 정보의 '저장된 정보 삭제'와 같은 방식).
  const ask = (task: () => Promise<string>, text: string, from: HTMLButtonElement) => {
    pendingTask = task;
    lastButton = from;
    question.textContent = text;
    status.textContent = '';
    actions.hidden = true;
    confirmBox.hidden = false;
    yesButton.focus();
  };
  const closeAsk = () => {
    pendingTask = null;
    confirmBox.hidden = true;
    actions.hidden = false;
    lastButton.focus();
  };
  yesButton.addEventListener('click', async () => {
    const task = pendingTask;
    if (!task) return;
    yesButton.disabled = true;
    noButton.disabled = true;
    status.textContent = '처리하는 중…';
    try {
      status.textContent = await task();
    } catch {
      // 개인 정보와 오류 상세를 콘솔/서버로 보내지 않는다.
      status.textContent = '처리하지 못했어요. 화면을 새로고침한 뒤 다시 시도해 주세요.';
    } finally {
      yesButton.disabled = false;
      noButton.disabled = false;
      closeAsk();
    }
  });
  noButton.addEventListener('click', closeAsk);
  fillButton.addEventListener('click', () => ask(fillFromMyInfo, '내 정보에 저장한 값으로 이 지원서의 입력칸을 바꿀까요? 이미 적힌 값도 바뀌어요.', fillButton));
  pullButton.addEventListener('click', () => ask(pullIntoMyInfo, '이 지원서의 연락처·학력·자격/면허를 내 정보에 저장할까요? 내 정보의 학력·자격/면허는 지원서 내용으로 바뀌어요.', pullButton));
  table.parentElement.insertBefore(host, table);
  return true;
}

/** 병무민원 통합지원서 작성 화면이 열린 프레임에서 실행한다. */
export function startProfileSync(): void {
  if (location.pathname !== APPLICATION_PATH) return;
  let timer: number | undefined;
  const schedule = () => {
    if (timer !== undefined) return;
    timer = window.setTimeout(() => {
      timer = undefined;
      mountTools();
    }, 300);
  };
  schedule();
  // 원본이 표를 늦게 그리거나 다시 그리면 버튼을 다시 붙인다.
  const observer = new MutationObserver(() => { if (!document.getElementById(TOOLS_ID)) schedule(); });
  observer.observe(document.documentElement, { subtree: true, childList: true });
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    observer.disconnect();
    window.clearTimeout(timer);
  }, { once: true });
}
