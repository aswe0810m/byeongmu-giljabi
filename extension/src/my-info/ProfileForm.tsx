// 내 정보 — 인적사항 입력·보기(사용자 결정 2026-11-26).
// 전화번호·휴대전화·전자우편·응시지역 병무청(목록에서 고르기)·학력사항·자격증·신체조건사항.
// 학력사항·자격증은 통합지원서처럼 줄을 더하고 뺄 수 있다.
import type { Body, Education, License, Profile, ProfileField } from '../profile/profile';
import {
  MAX_EDUCATION, MAX_LICENSES, PROFILE_FIELDS, emptyEducation, emptyLicense,
} from '../profile/profile';
import {
  APPLICATION_OFFICES, COLOR_VISIONS, NO_MAJOR_LEVELS, SCHOOL_GRADES, SCHOOL_LEVELS, SCHOOL_STATUSES,
} from './options';

interface FormProps {
  profile: Profile;
  busy: boolean;
  onChange: (next: Profile) => void;
}

function Select({ label, value, options, disabled, onChange }: {
  label: string; value: string; options: string[]; disabled: boolean; onChange: (v: string) => void;
}) {
  // 저장된 값이 목록에 없으면(통합지원서에서 읽은 다른 표기 등) 그 값도 보여 준다.
  const list = value && !options.includes(value) ? [value, ...options] : options;
  return (
    <label className="bmgj-profile-field">
      <span className="bmgj-profile-field-name">{label}</span>
      <select className="bmgj-profile-input" value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
        <option value="">선택하세요</option>
        {list.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Text({ label, value, disabled, onChange, type = 'text', placeholder, maxLength = 80, inputMode }: {
  label: string; value: string; disabled: boolean; onChange: (v: string) => void;
  type?: string; placeholder?: string; maxLength?: number; inputMode?: 'decimal' | 'numeric';
}) {
  return (
    <label className="bmgj-profile-field">
      <span className="bmgj-profile-field-name">{label}</span>
      <input
        className="bmgj-profile-input" type={type} value={value} placeholder={placeholder} maxLength={maxLength}
        inputMode={inputMode} disabled={disabled} onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function ProfileFormFields({ profile, busy, onChange }: FormProps) {
  const set = (patch: Partial<Profile>) => onChange({ ...profile, ...patch });
  const setEdu = (i: number, patch: Partial<Education>) =>
    set({ education: profile.education.map((e, n) => (n === i ? { ...e, ...patch } : e)) });
  const setLic = (i: number, patch: Partial<License>) =>
    set({ licenses: profile.licenses.map((l, n) => (n === i ? { ...l, ...patch } : l)) });
  const setBody = (patch: Partial<Body>) => set({ body: { ...profile.body, ...patch } });

  const textField = (f: ProfileField) => (f.type === 'select' ? (
    <Select
      key={f.key} label={f.label} value={profile[f.key]} options={APPLICATION_OFFICES} disabled={busy}
      onChange={(v) => set({ [f.key]: v })}
    />
  ) : (
    <label className="bmgj-profile-field" key={f.key}>
      <span className="bmgj-profile-field-name">{f.label}</span>
      <input
        className="bmgj-profile-input" name={f.key} type={f.type} value={profile[f.key]} placeholder={f.placeholder}
        autoComplete={f.autoComplete} maxLength={f.maxLength} disabled={busy} onChange={(e) => set({ [f.key]: e.target.value })}
      />
    </label>
  ));

  return (
    <>
      <fieldset className="bmgj-info-group">
        <legend>연락처 · 응시지역</legend>
        {PROFILE_FIELDS.map(textField)}
      </fieldset>

      <fieldset className="bmgj-info-group">
        <legend>학력사항</legend>
        {profile.education.length === 0 && <p className="bmgj-info-empty">입력한 학력이 없어요.</p>}
        {profile.education.map((e, i) => (
          <div className="bmgj-info-row" key={i}>
            <div className="bmgj-info-row-head">
              <strong>{`학력 ${i + 1}`}</strong>
              <button type="button" className="bmgj-info-remove" disabled={busy} onClick={() => set({ education: profile.education.filter((_, n) => n !== i) })}>
                삭제
              </button>
            </div>
            <Select label="학교 구분" value={e.level} options={SCHOOL_LEVELS} disabled={busy} onChange={(v) => setEdu(i, { level: v })} />
            <Text label="학교명" value={e.school} disabled={busy} placeholder="예: 한국고등학교" onChange={(v) => setEdu(i, { school: v })} />
            {!NO_MAJOR_LEVELS.has(e.level) && (
              <Text label="학과(전공)" value={e.major} disabled={busy} placeholder="예: 컴퓨터공학과" onChange={(v) => setEdu(i, { major: v })} />
            )}
            <div className="bmgj-info-pair">
              <Select label="학년" value={e.grade} options={SCHOOL_GRADES} disabled={busy} onChange={(v) => setEdu(i, { grade: v })} />
              <Select label="학적 상태" value={e.status} options={SCHOOL_STATUSES} disabled={busy} onChange={(v) => setEdu(i, { status: v })} />
            </div>
            <div className="bmgj-info-pair">
              <Text label="입학 연월" type="month" value={e.admitted} disabled={busy} onChange={(v) => setEdu(i, { admitted: v })} />
              <Text label="졸업(예정) 연월" type="month" value={e.graduated} disabled={busy} onChange={(v) => setEdu(i, { graduated: v })} />
            </div>
          </div>
        ))}
        {profile.education.length < MAX_EDUCATION && (
          <button type="button" className="bmgj-profile-secondary bmgj-info-add" disabled={busy} onClick={() => set({ education: [...profile.education, emptyEducation()] })}>
            + 학력 추가
          </button>
        )}
      </fieldset>

      <fieldset className="bmgj-info-group">
        <legend>자격증</legend>
        {profile.licenses.length === 0 && <p className="bmgj-info-empty">입력한 자격증이 없어요.</p>}
        {profile.licenses.map((l, i) => (
          <div className="bmgj-info-row" key={i}>
            <div className="bmgj-info-row-head">
              <strong>{`자격증 ${i + 1}`}</strong>
              <button type="button" className="bmgj-info-remove" disabled={busy} onClick={() => set({ licenses: profile.licenses.filter((_, n) => n !== i) })}>
                삭제
              </button>
            </div>
            <Text label="자격·면허명" value={l.name} disabled={busy} placeholder="예: 정보처리기사" onChange={(v) => setLic(i, { name: v })} />
            <div className="bmgj-info-pair">
              <Text label="등급" value={l.grade} disabled={busy} placeholder="예: 기사" onChange={(v) => setLic(i, { grade: v })} />
              <Text label="취득일" type="date" value={l.acquired} disabled={busy} onChange={(v) => setLic(i, { acquired: v })} />
            </div>
            <Text label="자격 번호" value={l.number} disabled={busy} onChange={(v) => setLic(i, { number: v })} />
            <Text label="발급 기관" value={l.issuer} disabled={busy} placeholder="예: 한국산업인력공단" onChange={(v) => setLic(i, { issuer: v })} />
          </div>
        ))}
        {profile.licenses.length < MAX_LICENSES && (
          <button type="button" className="bmgj-profile-secondary bmgj-info-add" disabled={busy} onClick={() => set({ licenses: [...profile.licenses, emptyLicense()] })}>
            + 자격증 추가
          </button>
        )}
      </fieldset>

      <fieldset className="bmgj-info-group">
        <legend>신체조건사항</legend>
        <div className="bmgj-info-pair">
          <Text label="신장(cm)" value={profile.body.height} inputMode="decimal" maxLength={5} disabled={busy} placeholder="175" onChange={(v) => setBody({ height: v })} />
          <Text label="체중(kg)" value={profile.body.weight} inputMode="decimal" maxLength={5} disabled={busy} placeholder="70" onChange={(v) => setBody({ weight: v })} />
        </div>
        <div className="bmgj-info-pair">
          <Text label="시력(좌)" value={profile.body.visionLeft} inputMode="decimal" maxLength={4} disabled={busy} placeholder="1.0" onChange={(v) => setBody({ visionLeft: v })} />
          <Text label="시력(우)" value={profile.body.visionRight} inputMode="decimal" maxLength={4} disabled={busy} placeholder="1.0" onChange={(v) => setBody({ visionRight: v })} />
        </div>
        <Select label="색각" value={profile.body.colorVision} options={COLOR_VISIONS} disabled={busy} onChange={(v) => setBody({ colorVision: v })} />
      </fieldset>
    </>
  );
}

const or = (v: string) => v.trim() || '미입력';
const join = (...parts: string[]) => parts.map((p) => p.trim()).filter(Boolean).join(' · ');

export function ProfileValues({ profile }: { profile: Profile }) {
  const b = profile.body;
  const bodyText = join(
    b.height && `신장 ${b.height}cm`, b.weight && `체중 ${b.weight}kg`,
    (b.visionLeft || b.visionRight) && `시력 좌 ${b.visionLeft || '-'} / 우 ${b.visionRight || '-'}`,
    b.colorVision && `색각 ${b.colorVision}`,
  );
  return (
    <dl className="bmgj-profile-values">
      {PROFILE_FIELDS.map((f) => (
        <div className="bmgj-profile-value" key={f.key}>
          <dt>{f.label}</dt>
          <dd>{or(profile[f.key])}</dd>
        </div>
      ))}
      <div className="bmgj-profile-value">
        <dt>학력사항</dt>
        <dd>
          {profile.education.length ? profile.education.map((e, i) => (
            <span className="bmgj-info-line" key={i}>
              {join(e.level, e.school, e.major, e.grade && `${e.grade}학년`, e.status)}
              {(e.admitted || e.graduated) && <small>{`${e.admitted || '?'} ~ ${e.graduated || '?'}`}</small>}
            </span>
          )) : '미입력'}
        </dd>
      </div>
      <div className="bmgj-profile-value">
        <dt>자격증</dt>
        <dd>
          {profile.licenses.length ? profile.licenses.map((l, i) => (
            <span className="bmgj-info-line" key={i}>
              {join(l.name, l.grade)}
              {(l.acquired || l.issuer || l.number) && <small>{join(l.acquired && `취득 ${l.acquired}`, l.issuer, l.number && `번호 ${l.number}`)}</small>}
            </span>
          )) : '미입력'}
        </dd>
      </div>
      <div className="bmgj-profile-value">
        <dt>신체조건사항</dt>
        <dd>{bodyText || '미입력'}</dd>
      </div>
    </dl>
  );
}
