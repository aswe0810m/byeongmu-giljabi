// 내 정보 — 병무민원 로그인 남은 시간(사용자 결정 2026-11-26).
// 병무민원 탭이 원본 #counter(남은 시간)와 나가기/로그인 버튼을 읽어 "언제까지 로그인돼 있는지"만 저장하고,
// 병무청·병무민원 어느 화면의 내 정보에서나 그 시각까지 남은 시간을 보여 준다.
// 저장하는 것은 만료 시각과 확인 시각뿐이다(쿠키·세션 값·개인 정보는 읽지 않음).
import { readSession } from '../portal/portalDom';

export const PORTAL_LOGIN_KEY = 'bmgj.portalLogin.v1';
const POLL_MS = 1000;
/** 남은 시간 표시는 1초 단위라, 이 정도 차이는 같은 만료 시각으로 본다(저장 횟수를 줄이기 위해). */
const SAME_EXPIRY_MS = 4000;

export interface PortalLogin {
  loggedIn: boolean;
  /** 로그인이 끝나는 시각(ms). loggedIn일 때만 의미가 있다. */
  expiresAt: number;
  checkedAt: number;
}

export function cleanPortalLogin(data: unknown): PortalLogin | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (typeof d.loggedIn !== 'boolean' || typeof d.expiresAt !== 'number' || typeof d.checkedAt !== 'number') return null;
  return { loggedIn: d.loggedIn, expiresAt: d.expiresAt, checkedAt: d.checkedAt };
}

/** 지금 로그인돼 있으면 남은 밀리초, 아니면 null. */
export function loginRemainingMs(login: PortalLogin | null, now = Date.now()): number | null {
  if (!login?.loggedIn) return null;
  const left = login.expiresAt - now;
  return left > 0 ? left : null;
}

/** 1234000 → '20:34' */
export function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function parseCounter(text: string | null): number | null {
  const m = /^(\d{1,3}):(\d{2})$/.exec(text ?? '');
  return m ? (Number(m[1]) * 60 + Number(m[2])) * 1000 : null;
}

/** 병무민원 바깥 틀에서 한 번 호출. 로그인 상태가 바뀌거나 연장되면 저장한다. */
export function startPortalLoginWatch(frame: HTMLIFrameElement): void {
  let last: PortalLogin | null = null;

  const write = (next: PortalLogin) => {
    last = next;
    chrome.storage.local.set({ [PORTAL_LOGIN_KEY]: next }).catch(() => { /* 다음 확인 때 다시 시도 */ last = null; });
  };

  const check = () => {
    const session = readSession(frame);
    const left = parseCounter(session.remaining);
    const now = Date.now();
    if (session.canLogout && left !== null) {
      const expiresAt = now + left;
      if (!last?.loggedIn || Math.abs(last.expiresAt - expiresAt) > SAME_EXPIRY_MS) {
        write({ loggedIn: true, expiresAt, checkedAt: now });
      }
    } else if (session.canLogin && last?.loggedIn !== false) {
      // 로그인 버튼이 보일 때만 로그아웃으로 본다(화면을 옮기는 중이라 버튼을 못 읽는 순간은 건너뜀).
      write({ loggedIn: false, expiresAt: 0, checkedAt: now });
    }
  };

  window.setInterval(check, POLL_MS);
  frame.addEventListener('load', check);
  check();
}
