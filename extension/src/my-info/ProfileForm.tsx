// 내 정보 — 인적사항 입력·보기(사용자 결정 2026-11-26).
// 전화번호·휴대전화·전자우편·응시지역 병무청(목록에서 고르기)·학력사항·자격/면허.
// 학력사항은 통합지원서처럼 학교 구분마다 한 줄, 자격/면허는 줄을 더하고 뺄 수 있다(칸은 options.ts 참고).
import type { Education, License, Profile, ProfileField } from '../profile/profile';
import {
  MAX_EDUCATION, MAX_LICENSES, PROFILE_FIELDS, emptyEducation, emptyLicense,
} from '../profile/profile';
import {
  APPLICATION_OFFICES, SCHOOL_DEGREES, SCHOOL_LEVELS, SCHOOL_SYSTEMS, TRAINING_PERIODS, levelSpec,
} from './options';

interface FormProps {
  profile: Profile;
  busy: boolean;
  onChange: (next: Profile) => void;
}

function Select({ label, value, options, disabled, onChange }: {
  label: string; value: string; options: readonly string[]; disabled: boolean; onChange: (v: string) => void;
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
        <p className="bmgj-info-hint">통합지원서처럼 학교 구분마다 한 줄씩 적어요. 학교명·전공학과는 통합지원서에서 검색 버튼으로 직접 골라야 해요.</p>
        {profile.education.length === 0 && <p className="bmgj-info-empty">입력한 학력이 없어요.</p>}
        {profile.education.map((e, i) => {
          const spec = levelSpec(e.level);
          const usedElsewhere = new Set(profile.education.filter((_, n) => n !== i).map((x) => x.level));
          return (
            <div className="bmgj-info-row" key={i}>
              <div className="bmgj-info-row-head">
                <strong>{e.level || `학력 ${i + 1}`}</strong>
                <button type="button" className="bmgj-info-remove" disabled={busy} onClick={() => set({ education: profile.education.filter((_, n) => n !== i) })}>
                  삭제
                </button>
              </div>
              <Select
                label="학교 구분" value={e.level} options={SCHOOL_LEVELS.filter((l) => !usedElsewhere.has(l))} disabled={busy}
                onChange={(v) => setEdu(i, { level: v, system: '', degree: '', grade: '', status: '', period: '' })}
              />
              <Text label="학교명" value={e.school} disabled={busy} placeholder="예: 한국고등학교" onChange={(v) => setEdu(i, { school: v })} />
              {spec?.major && (
                <Text label="전공학과" value={e.major} disabled={busy} placeholder="예: 컴퓨터공학과" onChange={(v) => setEdu(i, { major: v })} />
              )}
              {(spec?.system || spec?.degree) && (
                <div className="bmgj-info-pair">
                  {spec.degree && <Select label="학위" value={e.degree} options={SCHOOL_DEGREES} disabled={busy} onChange={(v) => setEdu(i, { degree: v })} />}
                  {spec.system && <Select label="학제" value={e.system} options={SCHOOL_SYSTEMS} disabled={busy} onChange={(v) => setEdu(i, { system: v })} />}
                </div>
              )}
              {spec && !spec.period && (
                <div className="bmgj-info-pair">
                  <Select label="학년" value={e.grade} options={spec.grades} disabled={busy} onChange={(v) => setEdu(i, { grade: v })} />
                  <Select label="졸업구분" value={e.status} options={spec.statuses} disabled={busy} onChange={(v) => setEdu(i, { status: v })} />
                </div>
              )}
              {spec?.period && (
                <Select label="수료기간" value={e.period} options={TRAINING_PERIODS} disabled={busy} onChange={(v) => setEdu(i, { period: v })} />
              )}
            </div>
          );
        })}
        {profile.education.length < MAX_EDUCATION && (
          <button type="button" className="bmgj-profile-secondary bmgj-info-add" disabled={busy} onClick={() => set({ education: [...profile.education, emptyEducation()] })}>
            + 학력 추가
          </button>
        )}
      </fieldset>

      <fieldset className="bmgj-info-group">
        <legend>자격/면허</legend>
        <p className="bmgj-info-hint">명칭은 통합지원서에서 검색 버튼으로 직접 골라야 해요. 같은 명칭이 있으면 취득시기를 채워 줘요.</p>
        {profile.licenses.length === 0 && <p className="bmgj-info-empty">입력한 자격/면허가 없어요.</p>}
        {profile.licenses.map((l, i) => (
          <div className="bmgj-info-row" key={i}>
            <div className="bmgj-info-row-head">
              <strong>{`자격/면허 ${i + 1}`}</strong>
              <button type="button" className="bmgj-info-remove" disabled={busy} onClick={() => set({ licenses: profile.licenses.filter((_, n) => n !== i) })}>
                삭제
              </button>
            </div>
            <Text label="명칭" value={l.name} disabled={busy} placeholder="예: 정보처리기사" onChange={(v) => setLic(i, { name: v })} />
            <Text label="취득시기" type="date" value={l.acquired} disabled={busy} onChange={(v) => setLic(i, { acquired: v })} />
          </div>
        ))}
        {profile.licenses.length < MAX_LICENSES && (
          <button type="button" className="bmgj-profile-secondary bmgj-info-add" disabled={busy} onClick={() => set({ licenses: [...profile.licenses, emptyLicense()] })}>
            + 자격/면허 추가
          </button>
        )}
      </fieldset>

    </>
  );
}

const or = (v: string) => v.trim() || '미입력';
const join = (...parts: string[]) => parts.map((p) => p.trim()).filter(Boolean).join(' · ');

export function ProfileValues({ profile }: { profile: Profile }) {
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
              {join(e.level, e.school, e.major)}
              {(e.degree || e.system || e.grade || e.status || e.period) && <small>{join(e.degree, e.system, e.grade, e.status, e.period && `수료기간 ${e.period}`)}</small>}
            </span>
          )) : '미입력'}
        </dd>
      </div>
      <div className="bmgj-profile-value">
        <dt>자격/면허</dt>
        <dd>
          {profile.licenses.length ? profile.licenses.map((l, i) => (
            <span className="bmgj-info-line" key={i}>
              {l.name.trim() || '명칭 미입력'}
              {l.acquired && <small>{`취득 ${l.acquired}`}</small>}
            </span>
          )) : '미입력'}
        </dd>
      </div>
    </dl>
  );
}
