// 내 정보 — 지원 희망 분야 고르기(사용자 결정 2026-11-26).
// 1단계 군(육군/해군/해병대/공군) → 2단계 모집 구분(일반병/전문기술병/전문특기병) → 3단계 특기(해군·해병대·공군 기술병은 계열).
// 목록이 SEARCH_THRESHOLD개보다 많으면(육군 기술행정병 147개 등) 검색칸으로 줄여서 고른다.
// 특기 목록이 없는 모집 구분(예: 일반병)은 2단계에서 바로 저장할 수 있다.
import { useMemo, useState } from 'react';
import type { Target } from '../profile/profile';
import type { BranchId, KindId } from './roles';
import { ROLE_BRANCHES, SEARCH_THRESHOLD, findBranch, findKind, roleTitle, searchKey } from './roles';

interface RolePickerProps {
  current: Target | null;
  busy: boolean;
  onSave: (target: Target) => void;
  onCancel?: () => void;
}

export function RolePicker({ current, busy, onSave, onCancel }: RolePickerProps) {
  const [branchId, setBranchId] = useState<BranchId | null>(() => findBranch(current?.branch)?.id ?? null);
  const [kindId, setKindId] = useState<KindId | null>(() => findKind(findBranch(current?.branch), current?.kind)?.id ?? null);
  const [specialty, setSpecialty] = useState<string | null>(current?.specialty ?? null);

  const branch = findBranch(branchId ?? undefined);
  const kind = findKind(branch, kindId ?? undefined);
  const needsSpecialty = !!kind && kind.specialties.length > 0;
  const ready = !!branch && !!kind && (!needsSpecialty || (!!specialty && kind.specialties.includes(specialty)));
  const [query, setQuery] = useState('');
  const searchable = !!kind && kind.specialties.length > SEARCH_THRESHOLD;
  const shown = useMemo(() => {
    if (!kind) return [];
    const q = searchKey(query);
    if (!searchable || !q) return kind.specialties;
    return kind.specialties.filter((s) => searchKey(s).includes(q));
  }, [kind, query, searchable]);

  const pickBranch = (id: BranchId) => {
    if (id === branchId) return;
    setBranchId(id);
    setKindId(null);
    setSpecialty(null);
    setQuery('');
  };
  const pickKind = (id: KindId) => {
    if (id === kindId) return;
    setKindId(id);
    setSpecialty(null);
    setQuery('');
  };

  const save = () => {
    if (!branch || !kind || !ready) return;
    const chosen = needsSpecialty ? specialty! : undefined;
    onSave({ role: roleTitle(branch, kind, chosen), branch: branch.id, kind: kind.id, ...(chosen ? { specialty: chosen } : {}) });
  };

  const step = !branch ? 1 : !kind ? 2 : 3;

  return (
    <div className="bmgj-role-setup bmgj-pick">
      <p className="bmgj-role-eyebrow">{current ? '지원 희망 분야 변경' : '처음 시작하기'}</p>
      <h3>어떤 분야로 지원하고 싶나요?</h3>
      <p className="bmgj-role-help">분야를 고르면 내 정보에서 지원 마감일까지 남은 날짜를 볼 수 있어요.</p>

      <fieldset className="bmgj-pick-step">
        <legend><span className="bmgj-pick-num" aria-hidden="true">1</span>군 선택</legend>
        <div className="bmgj-pick-options bmgj-pick-options-4">
          {ROLE_BRANCHES.map((b) => (
            <button key={b.id} type="button" className="bmgj-pick-option" aria-pressed={b.id === branchId} onClick={() => pickBranch(b.id)}>
              {b.label}
            </button>
          ))}
        </div>
      </fieldset>

      {branch && (
        <fieldset className="bmgj-pick-step">
          <legend><span className="bmgj-pick-num" aria-hidden="true">2</span>모집 구분</legend>
          <div className="bmgj-pick-options bmgj-pick-options-3">
            {branch.kinds.map((k) => (
              <button key={k.id} type="button" className="bmgj-pick-option" aria-pressed={k.id === kindId} onClick={() => pickKind(k.id)}>
                {k.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {kind && needsSpecialty && (
        <fieldset className="bmgj-pick-step">
          <legend><span className="bmgj-pick-num" aria-hidden="true">3</span>{`${kind.label} ${kind.unit}`}</legend>
          {searchable && (
            <input
              type="search"
              className="bmgj-pick-search"
              value={query}
              placeholder={`${kind.unit} 이름 검색 (${kind.specialties.length}개)`}
              aria-label={`${kind.label} ${kind.unit} 검색`}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <div className={`bmgj-pick-options bmgj-pick-options-2${searchable ? ' bmgj-pick-scroll' : ''}`}>
            {shown.map((s) => (
              <button key={s} type="button" className="bmgj-pick-option" aria-pressed={s === specialty} onClick={() => setSpecialty(s)}>
                {s}
              </button>
            ))}
          </div>
          {searchable && !shown.length && <p className="bmgj-pick-empty">{`'${query.trim()}'에 맞는 ${kind.unit === '계열' ? '계열이' : '특기가'} 없어요.`}</p>}
        </fieldset>
      )}

      <p className="bmgj-pick-summary" aria-live="polite">
        {ready && branch && kind
          ? `선택한 분야: ${roleTitle(branch, kind, needsSpecialty ? specialty! : undefined)}`
          : step === 1 ? '먼저 군을 골라 주세요.' : step === 2 ? '모집 구분을 골라 주세요.' : (kind?.unit === '계열' ? '계열을 골라 주세요.' : '특기를 골라 주세요.')}
      </p>

      <button type="button" className="bmgj-profile-primary" disabled={!ready || busy} onClick={save}>
        {busy ? '저장하는 중…' : current ? '이 분야로 변경' : '이 분야로 시작하기'}
      </button>
      {onCancel && (
        <button type="button" className="bmgj-profile-secondary" onClick={onCancel}>취소</button>
      )}
    </div>
  );
}
