// 3.6 내 정보 창 — 팀 구현(bmgj-recruit-dday-update, v0.5.1)을 소스로 옮김(0.4.8). 화면과 동작은 그대로.
// 지원 희망 분야와 공식 모집 일정 D-Day, 인적사항(직접 입력 또는 병무민원 통합지원서에서 자동 반영), 화면 설정.
// 모든 값은 이 브라우저(chrome.storage.local)에만 저장한다.
import { Fragment, useEffect, useRef, useState, type FormEvent } from 'react';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS } from '../catalog/cards';
import { getPortalCard } from '../catalog/portalCards';
import type { Profile, ProfileField, Target } from '../profile/profile';
import {
  PROFILE_FIELDS, PROFILE_KEY, PROFILE_SYNC_HASH, PROFILE_SYNC_KEY, TARGET_KEY, cleanProfile, cleanTarget, countdown, emptyProfile,
} from '../profile/profile';
import type { RecruitCache } from '../profile/recruit';
import {
  RECRUIT_INDEX_URL, RECRUIT_KEY, RECRUIT_MAX_AGE, RECRUIT_REFRESH_MS,
  recruitBadge, recruitDateText, recruitForRole, recruitMonthLabel, refreshRecruit,
} from '../profile/recruit';
import type { Prefs } from '../storage/prefs';
import { clearPrefs, loadPrefs, saveGroup, saveViewMode, subscribePrefs } from '../storage/prefs';

const GROUPS: GroupId[] = ['A', 'B'];
const PORTAL_CONNECT_URL = `${getPortalCard('P-A-M06').links[0].href}${PROFILE_SYNC_HASH}`;

interface MyInfoPanelProps {
  id: string;
  focusOnOpen: boolean;
  isMainPage: boolean;
  onClose: () => void;
}

export function MyInfoPanel({ id, focusOnOpen, isMainPage, onClose }: MyInfoPanelProps) {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [resetConfirm, setResetConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [target, setTarget] = useState<Target | null>(null);
  const [roleText, setRoleText] = useState('어학병');
  const [roleEditing, setRoleEditing] = useState(false);
  const [roleBusy, setRoleBusy] = useState(false);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [recruitCache, setRecruitCache] = useState<RecruitCache | null>(null);
  const [recruitLoading, setRecruitLoading] = useState(false);
  const [recruitError, setRecruitError] = useState('');
  const [, setNowTick] = useState(0);
  const root = useRef<HTMLElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const alive = useRef(true);
  const editedFields = useRef(new Set<string>());

  useEffect(() => {
    let live = true;
    let profileChanged = false;
    let syncChanged = false;
    alive.current = true;
    void loadPrefs().then((p) => { if (live) setPrefs(p); });
    const unwatch = subscribePrefs(setPrefs);
    chrome.storage.local.get([PROFILE_KEY, TARGET_KEY, PROFILE_SYNC_KEY, RECRUIT_KEY]).then((data) => {
      if (!live) return;
      const current = cleanProfile(data[PROFILE_KEY]);
      const chosen = cleanTarget(data[TARGET_KEY]);
      setRecruitCache((data[RECRUIT_KEY] as RecruitCache | undefined) || null);
      if (!profileChanged) {
        setProfile(current);
        setEditing(!PROFILE_FIELDS.some((f) => current[f.key].trim()));
      }
      setTarget(chosen);
      if (chosen) setRoleText(chosen.role);
      const sync = data[PROFILE_SYNC_KEY] as { updatedAt?: string } | undefined;
      if (!syncChanged) setSyncedAt(sync?.updatedAt ?? null);
      setLoading(false);
    }).catch(() => {
      if (live) {
        setNotice('저장된 정보를 읽지 못했어요. 저장소를 확인해 주세요.');
        setEditing(true);
        setLoading(false);
      }
    });
    const onStorage = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
      if (!live || area !== 'local') return;
      if (changes[PROFILE_KEY]) {
        profileChanged = true;
        const next = cleanProfile(changes[PROFILE_KEY].newValue);
        const draftKeys = [...editedFields.current];
        setProfile((draft) => ({ ...next, ...Object.fromEntries(draftKeys.map((key) => [key, draft[key]])) }));
        if (!draftKeys.length) setEditing(!PROFILE_FIELDS.some((f) => next[f.key].trim()));
      }
      if (changes[RECRUIT_KEY]) {
        setRecruitCache((changes[RECRUIT_KEY].newValue as RecruitCache | undefined) || null);
        setRecruitError('');
      }
      if (changes[PROFILE_SYNC_KEY]) {
        syncChanged = true;
        const synced = changes[PROFILE_SYNC_KEY].newValue as { updatedAt?: string } | undefined;
        setSyncedAt(synced?.updatedAt ?? null);
        if (synced?.updatedAt) setNotice('병무민원 화면에서 확인된 인적사항을 업데이트했어요.');
      }
    };
    chrome.storage.onChanged.addListener(onStorage);
    return () => {
      live = false;
      alive.current = false;
      unwatch();
      chrome.storage.onChanged.removeListener(onStorage);
    };
  }, []);

  useEffect(() => {
    if (focusOnOpen && root.current) {
      const active = (root.current.getRootNode() as ShadowRoot | Document)?.activeElement;
      if (!active || !root.current.contains(active)) root.current.focus();
    }
  }, [focusOnOpen]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => { if (alive.current) setNotice(''); }, 4800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  // D-Day가 날짜가 바뀌어도 맞도록 1분마다 다시 그린다.
  useEffect(() => {
    const timer = window.setInterval(() => setNowTick((n) => n + 1), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.hostname !== 'www.mma.go.kr') return;
    let live = true;
    const pull = async () => {
      if (live) setRecruitLoading(true);
      try { await refreshRecruit(false); } catch {
        if (live) setRecruitError('공식 일정 갱신에 실패했어요. 인터넷 연결 또는 병무청 공지를 확인해 주세요.');
      } finally { if (live) setRecruitLoading(false); }
    };
    void pull();
    const interval = window.setInterval(pull, RECRUIT_REFRESH_MS);
    return () => { live = false; window.clearInterval(interval); };
  }, []);

  const refreshNow = async () => {
    if (location.hostname !== 'www.mma.go.kr') {
      window.open(RECRUIT_INDEX_URL, '_blank', 'noopener,noreferrer');
      setNotice('공식 일정 페이지에서 업데이트를 확인해 주세요.');
      return;
    }
    setRecruitLoading(true);
    setRecruitError('');
    try {
      const r = await refreshRecruit(true);
      setNotice(`공식 모집 일정 ${r.count}개를 확인했어요.`);
    } catch {
      setRecruitError('공식 일정을 가져오지 못했어요. 잠시 뒤 다시 시도하거나 원문을 확인해 주세요.');
    } finally { setRecruitLoading(false); }
  };

  const known = PROFILE_FIELDS.some((f) => profile[f.key].trim());
  const change = (key: string, value: string) => {
    editedFields.current.add(key);
    setProfile((old) => ({ ...old, [key]: value }));
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setNotice('');
    try {
      const saved = await chrome.storage.local.get(PROFILE_KEY);
      const latest = cleanProfile(saved[PROFILE_KEY]);
      for (const key of editedFields.current) latest[key] = profile[key];
      const cleaned = cleanProfile(latest);
      await chrome.storage.local.set({ [PROFILE_KEY]: cleaned });
      if (alive.current) {
        editedFields.current.clear();
        setProfile(cleaned);
        setEditing(false);
        setNotice('인적사항을 이 브라우저에 저장했어요.');
      }
    } catch {
      if (alive.current) setNotice('저장하지 못했어요. 확장 프로그램 저장소를 확인해 주세요.');
    } finally { if (alive.current) setBusy(false); }
  };

  const saveRole = async (event: FormEvent) => {
    event.preventDefault();
    if (roleBusy) return;
    const name = roleText.trim().slice(0, 60);
    if (!name) { setNotice('지원 희망 분야를 입력해 주세요.'); return; }
    setRoleBusy(true);
    try {
      const chosen = { role: name };
      await chrome.storage.local.set({ [TARGET_KEY]: chosen });
      if (alive.current) {
        setTarget(chosen);
        setRoleEditing(false);
        setNotice('지원 희망 분야를 저장했어요.');
      }
    } catch {
      if (alive.current) setNotice('지원 희망 분야를 저장하지 못했어요.');
    } finally { if (alive.current) setRoleBusy(false); }
  };

  const removeProfile = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await chrome.storage.local.remove([PROFILE_KEY, PROFILE_SYNC_KEY]);
      if (alive.current) {
        editedFields.current.clear();
        setProfile(emptyProfile());
        setSyncedAt(null);
        setEditing(true);
        setDeleteConfirm(false);
        setNotice('저장된 인적사항을 삭제했어요.');
      }
    } catch {
      if (alive.current) setNotice('인적사항 삭제에 실패했어요.');
    } finally { if (alive.current) setBusy(false); }
  };

  const changeGroup = async (group: GroupId) => {
    if (!prefs) return;
    setPrefs({ ...prefs, group });
    if (!(await saveGroup(group))) setNotice('화면 그룹 설정을 저장하지 못했어요.');
  };

  const toggleView = async () => {
    if (!prefs) return;
    const viewMode = prefs.viewMode === 'improved' ? 'original' : 'improved';
    setPrefs({ ...prefs, viewMode });
    if (!(await saveViewMode(viewMode))) setNotice('화면 설정을 저장하지 못했어요.');
    if (isMainPage) onClose();
  };

  const resetSettings = async () => {
    if (!prefs) return;
    setResetConfirm(false);
    setPrefs({ schemaVersion: 1, group: null, viewMode: 'improved' });
    if (!(await clearPrefs())) setNotice('화면 설정 초기화에 실패했어요.');
    if (isMainPage) onClose();
  };

  const cancelEdit = () => {
    if (known) {
      chrome.storage.local.get(PROFILE_KEY).then((a) => {
        if (alive.current) {
          editedFields.current.clear();
          setProfile(cleanProfile(a[PROFILE_KEY]));
          setEditing(false);
        }
      }).catch(() => setNotice('저장된 정보를 불러오지 못했어요.'));
    } else {
      onClose();
    }
  };

  const inputField = (f: ProfileField) => (
    <label className="bmgj-profile-field" key={f.key}>
      <span className="bmgj-profile-field-name">{f.label}</span>
      {f.type === 'textarea' ? (
        <textarea
          name={f.key} value={profile[f.key]} placeholder={f.placeholder} autoComplete={f.autoComplete}
          maxLength={f.maxLength} rows={3} disabled={busy} onChange={(e) => change(f.key, e.target.value)} className="bmgj-profile-input"
        />
      ) : (
        <input
          ref={f.key === 'fullName' ? firstInput : null} name={f.key} value={profile[f.key]} type={f.type}
          placeholder={f.placeholder} autoComplete={f.autoComplete} maxLength={f.maxLength} disabled={busy}
          onChange={(e) => change(f.key, e.target.value)} className="bmgj-profile-input"
        />
      )}
    </label>
  );

  const valField = (f: ProfileField) => (
    <div className="bmgj-profile-value" key={f.key}>
      <dt>{f.label}</dt>
      <dd>{profile[f.key].trim() || '미입력'}</dd>
    </div>
  );

  const filteredSchedules = target ? recruitForRole(recruitCache, target.role) : [];
  const nextSchedule = filteredSchedules[0] || null;
  const remaining = nextSchedule ? countdown(nextSchedule.endsAt.slice(0, 10)) : null;
  const recruitStale = !!recruitCache?.checkedAt && Date.now() - recruitCache.checkedAt > RECRUIT_MAX_AGE;
  const scheduleLabel = nextSchedule ? recruitBadge(nextSchedule) : '모집 공고 확인 중';

  const roleForm = (
    <form className="bmgj-role-setup" onSubmit={saveRole}>
      <p className="bmgj-role-eyebrow">{target ? '지원 희망 분야 변경' : '처음 시작하기 · 1단계'}</p>
      <h3>{target ? '어떤 분야로 지원할까요?' : '어떤 병으로 지원하고 싶나요?'}</h3>
      <p className="bmgj-role-help">희망 분야를 먼저 저장하면 내 정보에서 지원 마감일까지 남은 날짜를 볼 수 있어요.</p>
      <label className="bmgj-profile-field">
        <span className="bmgj-profile-field-name">지원 희망 분야</span>
        <input
          className="bmgj-profile-input" type="text" name="role" value={roleText} maxLength={60}
          placeholder="예: 어학병" required onChange={(e) => setRoleText(e.target.value)}
        />
      </label>
      <div className="bmgj-role-hint">
        예시: 어학병, 영어어학병, 기술행정병, 기술병, 정보보호병
        <span> · 공식 모집 일정에서 키워드별로 검색합니다.</span>
      </div>
      <button type="submit" className="bmgj-profile-primary" disabled={roleBusy}>
        {roleBusy ? '저장하는 중…' : target ? '지원 분야 변경 저장' : '이 분야로 시작하기'}
      </button>
      {target && (
        <button
          type="button" className="bmgj-profile-secondary"
          onClick={() => { setRoleText(target.role); setRoleEditing(false); }}
        >
          취소
        </button>
      )}
    </form>
  );

  const footerText = notice || (loading ? '불러오는 중…'
    : !target ? '지원 희망 분야를 선택해 주세요.'
      : roleEditing ? '지원 희망 분야를 수정 중입니다.'
        : editing ? '입력을 마친 뒤 저장하기를 눌러주세요.'
          : '지원 정보가 저장되어 있습니다.');

  return (
    <section
      id={id}
      ref={root}
      className="bmgj-floating bmgj-profile-drawer"
      role="dialog"
      aria-modal="false"
      aria-labelledby="bmgj-info-title"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !event.defaultPrevented) {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <div className="bmgj-profile-header">
        <div>
          <p className="bmgj-profile-eyebrow">병무길잡이 · 내 정보</p>
          <h2 id="bmgj-info-title">{target ? '나의 병역 지원' : '지원 분야 선택'}</h2>
          <p className="bmgj-profile-subtitle">
            {target ? '희망 분야와 인적사항을 한곳에서 관리합니다' : '지원 희망 분야를 먼저 선택해 주세요'}
          </p>
        </div>
        <button type="button" className="bmgj-profile-close" aria-label="내 정보 닫기" onClick={onClose}>×</button>
      </div>

      <div className="bmgj-profile-scroller">
        {loading ? (
          <p className="bmgj-profile-loading" role="status">저장된 정보를 읽는 중…</p>
        ) : !target || roleEditing ? roleForm : (
          <Fragment>
            <div className="bmgj-profile-deadline bmgj-role-deadline">
              <div className="bmgj-profile-section-heading">
                <h3>나의 지원 D-Day</h3>
                <span className="bmgj-role-prototype-badge bmgj-recruit-official">병무청 공식 일정</span>
              </div>
              <div className="bmgj-role-overview">
                <div>
                  <span className="bmgj-role-label">지원 희망 분야 · 키워드</span>
                  <strong className="bmgj-role-name">{target.role}</strong>
                  <span className="bmgj-role-date">
                    {nextSchedule ? recruitMonthLabel(nextSchedule) : '다음 접수 회차가 공식 발표되면 표시해요'}
                  </span>
                </div>
                {remaining ? (
                  <strong
                    className="bmgj-role-days"
                    aria-label={remaining.days > 0 ? `마감까지 ${remaining.days}일` : '오늘 마감'}
                  >
                    {remaining.label}
                  </strong>
                ) : (
                  <strong className="bmgj-recruit-waiting">{recruitLoading ? '확인 중…' : '일정 대기'}</strong>
                )}
              </div>
              {nextSchedule ? (
                <div className="bmgj-recruit-next">
                  <span className="bmgj-recruit-status">{scheduleLabel}</span>
                  <strong>{nextSchedule.title || nextSchedule.label}</strong>
                  <p>{`접수 시작  ${recruitDateText(nextSchedule.startsAt)}`}</p>
                  <p>{`접수 마감  ${recruitDateText(nextSchedule.endsAt)}`}</p>
                  <a href={nextSchedule.url} target="_blank" rel="noopener noreferrer">공식 모집 공고 확인 ↗</a>
                </div>
              ) : (
                <div className="bmgj-recruit-empty">
                  <strong>{recruitLoading ? '병무청 모집 일정을 읽는 중이에요' : '현재 확인된 다음 접수 일정이 없어요'}</strong>
                  <p>마감된 모집은 D-Day로 표시하지 않아요. 새 회차가 공지되면 다음 마감일로 자동 변경됩니다.</p>
                </div>
              )}
              <div className="bmgj-role-deadline-foot">
                <button type="button" className="bmgj-profile-text-button" onClick={() => setRoleEditing(true)}>
                  지원 분야 변경
                </button>
                <button type="button" className="bmgj-profile-text-button" disabled={recruitLoading} onClick={refreshNow}>
                  {recruitLoading ? '새로고침 중…' : '일정 새로고침'}
                </button>
              </div>
              {filteredSchedules.length > 1 && (
                <div className="bmgj-recruit-upcoming">
                  <h4>{`다음 모집 회차 · ${Math.min(5, filteredSchedules.length)}개`}</h4>
                  {filteredSchedules.slice(0, 5).map((item) => (
                    <a
                      key={item.url + item.endsAt + item.label} href={item.url} target="_blank"
                      rel="noopener noreferrer" className="bmgj-recruit-row"
                    >
                      <span className="bmgj-recruit-row-month">{recruitMonthLabel(item)}</span>
                      <strong>{item.label}</strong>
                      <small>{`${recruitDateText(item.endsAt)} 마감`}</small>
                    </a>
                  ))}
                </div>
              )}
              {recruitCache?.checkedAt ? (
                <p className="bmgj-recruit-checked">
                  {`마지막 확인: ${new Date(recruitCache.checkedAt).toLocaleString('ko-KR')}${recruitStale ? ' · 오래된 정보, 최신 공고 확인 필요' : ''}`}
                </p>
              ) : null}
              {recruitError && <p className="bmgj-recruit-error" role="status">{recruitError}</p>}
              <p className="bmgj-role-disclaimer">
                ※ 공개된 병무청 공고에서 접수 시작·마감일이 모두 확인된 회차만 표시합니다. 게시판 구조 변경이나 지연으로 누락될 수 있으니 지원 전 원문을 확인해 주세요.
              </p>
              <a href={RECRUIT_INDEX_URL} target="_blank" rel="noopener noreferrer" className="bmgj-recruit-index-link">
                병무청 이달의 모집계획 보기 ↗
              </a>
            </div>

            <div className="bmgj-profile-login">
              <div>
                <strong>병무청 공식 로그인</strong>
                <p>병무민원에서 본인인증을 마치면 통합지원서 작성 안내가 자동으로 열려요. 안내에서 ‘예’를 누르면 인적사항이 이 패널에 자동으로 반영돼요.</p>
              </div>
              <a href={PORTAL_CONNECT_URL} target="_blank" rel="noopener noreferrer" className="bmgj-profile-login-button">
                병무민원 접속하기 ↗
              </a>
              <p className="bmgj-profile-login-note">
                병무청 안내와 유의사항을 확인하면 인적사항을 이 브라우저에 저장해요.
              </p>
              {syncedAt && (
                <p className="bmgj-profile-sync-note" role="status">
                  {`최근 인적사항 자동 반영: ${new Date(syncedAt).toLocaleString('ko-KR')}`}
                </p>
              )}
            </div>

            {editing ? (
              <form id="bmgj-profile-form" onSubmit={save} className="bmgj-profile-form">
                <div className="bmgj-profile-section-heading">
                  <h3>인적사항 입력</h3>
                  <span>브라우저에만 저장</span>
                </div>
                {PROFILE_FIELDS.map(inputField)}
                <div className="bmgj-profile-form-buttons">
                  <button type="submit" className="bmgj-profile-primary" disabled={busy}>
                    {busy ? '저장 중…' : '인적사항 저장하기'}
                  </button>
                  {known && (
                    <button type="button" className="bmgj-profile-secondary" onClick={cancelEdit} disabled={busy}>취소</button>
                  )}
                </div>
              </form>
            ) : (
              <div className="bmgj-profile-summary">
                <div className="bmgj-profile-section-heading">
                  <h3>저장된 인적사항</h3>
                  <button
                    type="button" className="bmgj-profile-text-button"
                    onClick={() => { setEditing(true); window.setTimeout(() => firstInput.current?.focus(), 0); }}
                  >
                    수정하기
                  </button>
                </div>
                <dl className="bmgj-profile-values">{PROFILE_FIELDS.map(valField)}</dl>
                <button
                  type="button" className="bmgj-profile-secondary bmgj-profile-delete"
                  onClick={() => setDeleteConfirm(!deleteConfirm)}
                >
                  저장된 정보 삭제
                </button>
                {deleteConfirm && (
                  <div className="bmgj-profile-confirm">
                    <p>저장된 인적사항을 모두 삭제할까요? 이 작업은 되돌릴 수 없어요.</p>
                    <div>
                      <button type="button" onClick={removeProfile} disabled={busy}>삭제</button>
                      <button type="button" onClick={() => setDeleteConfirm(false)}>취소</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <details className="bmgj-profile-settings">
              <summary>화면 설정</summary>
              <p>{`현재 그룹: ${prefs?.group ? GROUP_LABELS[prefs.group] : '선택 안 함'}`}</p>
              <div className="bmgj-profile-group-buttons">
                {GROUPS.map((group) => (
                  <button key={group} type="button" aria-pressed={prefs?.group === group} onClick={() => changeGroup(group)}>
                    {GROUP_LABELS[group]}
                  </button>
                ))}
              </div>
              <button type="button" className="bmgj-profile-secondary" onClick={toggleView}>
                {prefs?.viewMode === 'original' ? '병무길잡이 켜기' : '원래 화면 보기'}
              </button>
              <button type="button" className="bmgj-profile-text-button" onClick={() => setResetConfirm(!resetConfirm)}>
                화면 설정 초기화
              </button>
              {resetConfirm && (
                <div className="bmgj-profile-confirm">
                  <p>그룹 선택과 화면 모드만 초기화할까요? 인적사항 및 지원 분야는 유지됩니다.</p>
                  <div>
                    <button type="button" onClick={resetSettings}>초기화</button>
                    <button type="button" onClick={() => setResetConfirm(false)}>취소</button>
                  </div>
                </div>
              )}
            </details>

            <p className="bmgj-profile-privacy">
              인적사항과 희망 분야는 Chrome 확장 프로그램의 로컬 저장소에 보관됩니다. 같은 브라우저 프로필에서 다시 열면 유지되지만 다른 컴퓨터와 자동 동기화되지는 않습니다. 병무청 로그인 세션 자체는 저장하지 않습니다.
            </p>
          </Fragment>
        )}
      </div>

      <div className="bmgj-profile-footer">
        <span role="status" aria-live="polite">{footerText}</span>
      </div>
    </section>
  );
}
