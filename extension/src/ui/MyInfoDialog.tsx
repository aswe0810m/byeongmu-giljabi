// 3.6 내 정보 창. 사용자 결정(2026-11-05): 화면을 가리는 대화상자 대신 오른쪽 아래에 떠 있는 창으로,
// 병무청의 모든 페이지에서 띄운다. 떠 있는 동안에도 페이지를 그대로 쓸 수 있다(배경을 막지 않음).
// 값은 저장소에만 쓰고, 열린 메인 탭은 6절 onChanged로 바로 반영된다.
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS } from '../catalog/cards';
import type { Prefs } from '../storage/prefs';
import { clearPrefs, loadPrefs, saveGroup, saveViewMode, subscribePrefs } from '../storage/prefs';

const GROUPS: GroupId[] = ['A', 'B'];
const SAVE_FAILED = '설정을 저장하지 못했어요. 다음 방문에는 다시 선택해야 할 수 있어요.';

interface MyInfoPanelProps {
  id: string;
  focusOnOpen: boolean;
  isMainPage: boolean;
  onClose: () => void;
}

export function MyInfoPanel({ id, focusOnOpen, isMainPage, onClose }: MyInfoPanelProps) {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const wasConfirming = useRef(false);
  const focused = useRef(false);

  useEffect(() => {
    let alive = true;
    void loadPrefs().then((p) => alive && setPrefs(p));
    const off = subscribePrefs(setPrefs);
    return () => {
      alive = false;
      off();
    };
  }, []);

  // 버튼으로 열었을 때만 창으로 포커스를 옮긴다(페이지 이동 후 다시 떠 있을 때는 옮기지 않음).
  useEffect(() => {
    if (prefs && focusOnOpen && !focused.current) {
      focused.current = true;
      panelRef.current?.focus();
    }
  }, [prefs, focusOnOpen]);

  useEffect(() => {
    if (confirming) cancelRef.current?.focus();
    else if (wasConfirming.current) resetButtonRef.current?.focus();
    wasConfirming.current = confirming;
  }, [confirming]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  if (!prefs) return null;

  const persist = async (saving: Promise<boolean>) => {
    if (!(await saving)) setMessage(SAVE_FAILED);
  };

  const changeGroup = (group: GroupId) => {
    setPrefs({ ...prefs, group });
    void persist(saveGroup(group));
  };

  const toggleView = () => {
    const viewMode = prefs.viewMode === 'improved' ? 'original' : 'improved';
    setPrefs({ ...prefs, viewMode });
    void persist(saveViewMode(viewMode));
    if (isMainPage) onClose(); // 메인 화면이 바뀌므로 창을 닫는다
  };

  const reset = () => {
    setConfirming(false);
    setPrefs({ schemaVersion: 1, group: null, viewMode: 'improved' });
    void persist(clearPrefs());
    if (isMainPage) onClose(); // 메인에서는 첫 방문 선택창이 뜨므로 창을 닫는다
  };

  return (
    <section
      id={id}
      ref={panelRef}
      className="bmgj-floating"
      role="dialog"
      aria-modal="false"
      aria-labelledby="bmgj-info-title"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <div className="bmgj-info-head">
        <h2 id="bmgj-info-title" className="bmgj-dialog-title">내 정보</h2>
        <button type="button" className="bmgj-icon-btn" aria-label="닫기" onClick={onClose}>
          <X size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      <p className="bmgj-dialog-desc">이 브라우저에 저장된 화면 설정입니다</p>

      <dl className="bmgj-info-current">
        <dt>현재 그룹</dt>
        <dd>{prefs.group ? GROUP_LABELS[prefs.group] : '선택 안 함'}</dd>
      </dl>

      <h3 id="bmgj-info-group-label" className="bmgj-info-label">그룹 변경</h3>
      <div className="bmgj-info-groups" role="group" aria-labelledby="bmgj-info-group-label">
        {GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            className="bmgj-btn bmgj-info-group"
            aria-pressed={prefs.group === g}
            onClick={() => changeGroup(g)}
          >
            {GROUP_LABELS[g]}
          </button>
        ))}
      </div>

      <div className="bmgj-info-actions">
        <button type="button" className="bmgj-btn" onClick={toggleView}>
          {prefs.viewMode === 'improved' ? '원래 화면 보기' : '병무길잡이 켜기'}
        </button>
        <button
          ref={resetButtonRef}
          type="button"
          className="bmgj-btn"
          aria-expanded={confirming}
          aria-controls="bmgj-info-confirm"
          onClick={() => setConfirming(true)}
        >
          설정 초기화
        </button>
      </div>

      {confirming && (
        <div id="bmgj-info-confirm" className="bmgj-confirm">
          <p className="bmgj-confirm-text">그룹 선택과 화면 모드를 지웁니다. 초기화할까요?</p>
          <div className="bmgj-confirm-actions">
            <button type="button" className="bmgj-btn" onClick={reset}>초기화</button>
            <button ref={cancelRef} type="button" className="bmgj-btn" onClick={() => setConfirming(false)}>취소</button>
          </div>
        </div>
      )}

      <p className="bmgj-floating-msg" role="status">{message}</p>
    </section>
  );
}
