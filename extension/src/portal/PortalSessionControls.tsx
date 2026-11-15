// 헤더의 로그인 상태(사용자 결정 2026-11-12). 원본 첫 화면의 남은 시간·연장·나가기(또는 로그인)를
// 1초마다 읽어 보여 주고, 누르면 원본 요소를 대신 누른다.
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { PortalSession } from './portalDom';
import { EMPTY_SESSION, clickSession, readSession } from './portalDom';

const POLL_MS = 1000;

function same(a: PortalSession, b: PortalSession) {
  return a.remaining === b.remaining && a.canExtend === b.canExtend
    && a.canLogout === b.canLogout && a.canLogin === b.canLogin;
}

export function PortalSessionControls({ frame }: { frame: HTMLIFrameElement }) {
  const [session, setSession] = useState<PortalSession>(() => readSession(frame));

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = readSession(frame);
      setSession((prev) => (same(prev, next) ? prev : next));
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [frame]);

  if (same(session, EMPTY_SESSION)) return null;

  return (
    <div className="bmgj-session">
      {session.remaining && (
        <span className="bmgj-session-time">
          <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
          <span className="bmgj-sr-only">로그인 남은 시간</span>
          {session.remaining}
        </span>
      )}
      {session.canExtend && session.remaining && (
        <button type="button" className="bmgj-session-btn" onClick={() => clickSession(frame, 'extend')}>
          연장
        </button>
      )}
      {session.canLogout && (
        <button type="button" className="bmgj-text-btn" onClick={() => clickSession(frame, 'logout')}>
          나가기
        </button>
      )}
      {session.canLogin && (
        <button type="button" className="bmgj-text-btn" onClick={() => clickSession(frame, 'login')}>
          로그인
        </button>
      )}
    </div>
  );
}
