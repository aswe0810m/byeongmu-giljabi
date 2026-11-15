// 병무민원 통합지원서의 인적사항 표에 보이는 값만 chrome.storage.local에 저장한다.
// 로그인 자격 증명·쿠키·세션 토큰·비밀번호·인증번호·주민등록번호는 읽거나 저장하지 않는다.
import { portalMenuUrl } from '../catalog/portalCards';
import { readSession } from '../portal/portalDom';
import { PROFILE_KEY, PROFILE_SYNC_HASH, PROFILE_SYNC_KEY } from './profile';

const APPLICATION_PATH = '/caisBMHS/dmem/dmem/mwgr/gjwn/moveTHJWSJSGBJeongBoIR_M.do';
const APPLICATION_MENU = '22041';
const PENDING_LOGIN_KEY = 'bmgj.pendingProfileLogin';
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

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

type FieldKey =
  | 'fullName' | 'birthDate' | 'contactPhone' | 'mobilePhone' | 'militaryEmail'
  | 'registeredOffice' | 'personalEmail' | 'applicationOffice' | 'address';

const CAPS: Record<FieldKey, number> = {
  fullName: 60, birthDate: 10, contactPhone: 24, mobilePhone: 24, militaryEmail: 120,
  registeredOffice: 80, personalEmail: 120, applicationOffice: 80, address: 260,
};

const normal = (v: unknown) => String(v || '').replace(/[\s:*＊•·()（）[\]【】/]/g, '').trim();
const visible = (el: Element | null): el is Element => {
  if (!el || !el.getClientRects().length) return false;
  const style = getComputedStyle(el);
  return style.display !== 'none' && style.visibility === 'visible';
};

function labelKey(label: string | null): FieldKey | null {
  const s = normal(label);
  if (!s || s.length > 36) return null;
  if (/^(성명|이름|지원자성명)$/.test(s)) return 'fullName';
  if (/^(생년월일|출생일)$/.test(s)) return 'birthDate';
  if (/^(전화번호|비상연락처|비상전화번호|전화번호비상연락처|유선전화|연락전화번호)$/.test(s)) return 'contactPhone';
  if (/^(휴대전화|휴대폰|휴대전화번호|휴대폰번호|핸드폰번호)$/.test(s)) return 'mobilePhone';
  if (/나라사랑(메일|이메일|전자우편)?/.test(s)) return 'militaryEmail';
  if (/^(병적지청|병적지방병무청)$/.test(s)) return 'registeredOffice';
  if (/^(응시지역병무청|응시지역|응시지방병무청|응시지구)$/.test(s)) return 'applicationOffice';
  if (/^(전자우편|전자우편상용|전자우편일반|상용이메일|일반이메일|이메일|이메일주소)$/.test(s)) return 'personalEmail';
  if (/^(주소|현주소|거주지주소|도로명주소)$/.test(s)) return 'address';
  return null;
}

type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function readCell(cell: HTMLTableCellElement, key: FieldKey): string {
  if (!visible(cell)) return '';
  const controls = [...cell.querySelectorAll<FormControl>('input,textarea,select')];
  if (!controls.length) return cell.innerText ?? cell.textContent ?? '';

  const values = controls.filter((control) => {
    const type = control.getAttribute('type')?.toLowerCase() ?? '';
    return visible(control)
      && !['hidden', 'password', 'file', 'checkbox', 'radio', 'submit', 'button'].includes(type)
      && !/(password|passwd|jumin|rrn|token|csrf|session|auth|인증|비밀번호|주민등록)/i.test(`${control.name} ${control.id}`);
  }).map((control) => {
    if (!control.value.trim()) return '';
    return control instanceof HTMLSelectElement
      ? (control.selectedOptions[0]?.textContent ?? '').trim()
      : control.value.trim();
  }).filter(Boolean);

  // 입력칸이 있는 셀의 안내 문구는 저장하지 않는다.
  return key === 'address' ? values.join(' ') : values[0] ?? '';
}

function valid(key: FieldKey, raw: string): string {
  const value = String(raw || '').replace(/\s+/g, ' ').trim();
  if (!value || value.length > (key === 'birthDate' ? 32 : CAPS[key])
    || /(비밀번호|인증번호|예\)|예시|접속하기|선택하세요|선택해)/.test(value)
    || /(?:^|\D)\d{6}[-\s]?\d{7}(?:\D|$)/.test(value)) return '';
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
  if (key === 'militaryEmail' || key === 'personalEmail') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : '';
  if (key === 'registeredOffice' || key === 'applicationOffice') {
    return /병무(지)?청|병무지청|서울|부산|대구|경북|광주|전남|대전|충남|경기|강원|충북|전북|경남|제주|인천|울산/.test(value) ? value : '';
  }
  if (key === 'address') return value.length >= 5 && !/^\d{5,6}$/.test(value) ? value : '';
  return '';
}

/** 병무민원 통합지원서 작성 화면이 열린 프레임에서 실행한다. */
export function startProfileSync(): void {
  if (location.pathname !== APPLICATION_PATH) return;

  let timer: number | undefined;
  let working = false;
  let pending = false;
  let last = '';

  async function syncVisibleForm() {
    if (working) {
      pending = true;
      return;
    }
    const table = [...document.querySelectorAll('table')].find((candidate) =>
      visible(candidate) && normal(candidate.caption?.textContent) === '인적사항');
    if (!table) return;
    const found: Partial<Record<FieldKey, string>> = {};
    for (const header of table.querySelectorAll('th')) {
      const key = labelKey(header.textContent);
      const cell = header.nextElementSibling;
      if (!key || !visible(header) || !(cell instanceof HTMLTableCellElement) || cell.tagName !== 'TD') continue;
      const checked = valid(key, readCell(cell, key));
      if (checked && !found[key]) found[key] = checked;
    }
    if (!found.fullName || !found.birthDate) return;
    const signature = JSON.stringify(found);
    if (signature === last) return;
    working = true;
    try {
      const saved = await chrome.storage.local.get([PROFILE_KEY, PROFILE_SYNC_KEY]);
      const previous = saved[PROFILE_KEY] && typeof saved[PROFILE_KEY] === 'object' ? saved[PROFILE_KEY] : {};
      const differentPerson = saved[PROFILE_SYNC_KEY] && (
        (previous.fullName && previous.fullName !== found.fullName)
        || (previous.birthDate && previous.birthDate !== found.birthDate)
      );
      const next = differentPerson ? found : { ...previous, ...found };
      if (!saved[PROFILE_SYNC_KEY] || JSON.stringify(next) !== JSON.stringify(previous)) {
        await chrome.storage.local.set({
          [PROFILE_KEY]: next,
          [PROFILE_SYNC_KEY]: { updatedAt: new Date().toISOString(), fields: Object.keys(found), source: 'visible-application-form' },
        });
      }
      last = signature;
    } catch {
      /* 개인 정보와 오류 상세를 콘솔/서버로 보내지 않음 */
    } finally {
      working = false;
      if (pending) {
        pending = false;
        schedule();
      }
    }
  }

  const schedule = () => {
    if (timer !== undefined) return;
    timer = window.setTimeout(() => {
      timer = undefined;
      void syncVisibleForm();
    }, 350);
  };
  schedule();
  // 일부 입력값은 DOM 변경 이벤트 없이 스크립트가 value 속성에 뒤늦게 넣는다.
  const initialChecks = [1000, 2500, 5000].map((delay) => window.setTimeout(schedule, delay));
  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    subtree: true, childList: true, characterData: true, attributes: true,
    attributeFilter: ['value', 'selected', 'hidden'],
  });
  document.addEventListener('input', schedule, true);
  document.addEventListener('change', schedule, true);
  window.addEventListener('pageshow', schedule);
  const stop = (event: PageTransitionEvent) => {
    if (event.persisted) return;
    observer.disconnect();
    window.clearTimeout(timer);
    for (const check of initialChecks) window.clearTimeout(check);
    document.removeEventListener('input', schedule, true);
    document.removeEventListener('change', schedule, true);
    window.removeEventListener('pageshow', schedule);
    window.removeEventListener('pagehide', stop);
  };
  window.addEventListener('pagehide', stop);
}
