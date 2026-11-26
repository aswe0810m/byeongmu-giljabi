// 내 정보 — 병무민원 로그인 칸(사용자 결정 2026-11-26).
// 병무민원에서 본인인증을 마쳤으면 "병무청 공식 로그인" 안내 대신 로그인 남은 시간을 보여 준다.
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { PortalLogin } from './portalLogin';
import { PORTAL_LOGIN_KEY, cleanPortalLogin, formatRemaining, loginRemainingMs } from './portalLogin';

interface LoginBoxProps {
  connectUrl: string;
  syncedAt: string | null;
}

export function LoginBox({ connectUrl, syncedAt }: LoginBoxProps) {
  const [login, setLogin] = useState<PortalLogin | null>(null);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    let live = true;
    chrome.storage.local.get(PORTAL_LOGIN_KEY)
      .then((data) => { if (live) setLogin(cleanPortalLogin(data[PORTAL_LOGIN_KEY])); })
      .catch(() => { /* 읽지 못하면 로그인 안내를 보여 줌 */ });
    const onChange = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
      if (area === 'local' && changes[PORTAL_LOGIN_KEY]) setLogin(cleanPortalLogin(changes[PORTAL_LOGIN_KEY].newValue));
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => { live = false; chrome.storage.onChanged.removeListener(onChange); };
  }, []);

  const left = loginRemainingMs(login, now);
  const loggedIn = left !== null;

  // 로그인 중일 때만 1초마다 다시 그린다.
  useEffect(() => {
    if (!loggedIn) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [loggedIn]);

  const syncNote = syncedAt && (
    <p className="bmgj-profile-sync-note" role="status">
      {`최근 인적사항 자동 반영: ${new Date(syncedAt).toLocaleString('ko-KR')}`}
    </p>
  );

  if (loggedIn) {
    const soon = left < 5 * 60 * 1000;
    return (
      <div className={`bmgj-profile-login bmgj-login-on${soon ? ' bmgj-login-soon' : ''}`}>
        <strong>병무민원 로그인 중</strong>
        <p className="bmgj-login-time">
          <Clock size={20} strokeWidth={1.75} aria-hidden="true" />
          <span>로그인 남은 시간</span>
          <b aria-hidden="true">{formatRemaining(left)}</b>
          <span className="bmgj-sr-only">{`${Math.floor(left / 60000)}분 남음`}</span>
        </p>
        <p>
          {soon
            ? '곧 자동으로 로그아웃돼요. 병무민원 화면 위쪽의 ‘연장’을 눌러 시간을 늘려 주세요.'
            : '시간 연장과 나가기는 병무민원 화면 위쪽에서 할 수 있어요.'}
        </p>
        {syncNote}
      </div>
    );
  }

  return (
    <div className="bmgj-profile-login">
      <div>
        <strong>병무청 공식 로그인</strong>
        <p>병무민원에서 본인인증을 마치면 통합지원서 작성 안내가 자동으로 열려요. 안내에서 ‘예’를 누르면 인적사항이 이 패널에 자동으로 반영돼요.</p>
      </div>
      <a href={connectUrl} target="_blank" rel="noopener noreferrer" className="bmgj-profile-login-button">
        병무민원 접속하기 ↗
      </a>
      <p className="bmgj-profile-login-note">
        병무청 안내와 유의사항을 확인하면 인적사항을 이 브라우저에 저장해요.
      </p>
      {syncNote}
    </div>
  );
}
