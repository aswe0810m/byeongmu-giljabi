import { useCallback, useRef } from 'react';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS } from '../catalog/cards';
import { useModal } from './useModal';

interface GroupDialogProps {
  onSelect: (group: GroupId) => void;
  onShowOriginal: () => void;
}

const CHOICES: { group: GroupId; description: string }[] = [
  { group: 'A', description: '모집병 지원, 병역판정검사, 입영 연기 등' },
  { group: 'B', description: '병적증명서 발급 안내, 동원훈련 안내 등' },
];

// 3.1 첫 방문 그룹 선택창. 배경 클릭으로는 닫히지 않는다.
export function GroupDialog({ onSelect, onShowOriginal }: GroupDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onEscape = useCallback(() => onShowOriginal(), [onShowOriginal]);
  useModal(dialogRef, onEscape);

  return (
    <div
      className="bmgj-overlay"
      onMouseDown={(event) => {
        // 배경을 눌러도 닫지 않고 포커스도 빼앗기지 않게 한다.
        if (event.target === event.currentTarget) event.preventDefault();
      }}
    >
      <div
        ref={dialogRef}
        className="bmgj-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bmgj-group-title"
        aria-describedby="bmgj-group-desc"
        tabIndex={-1}
      >
        <p className="bmgj-dialog-label">병무길잡이</p>
        <h2 id="bmgj-group-title" className="bmgj-dialog-title">지금 어떤 상황인가요?</h2>
        <p id="bmgj-group-desc" className="bmgj-dialog-desc">
          선택에 맞춰 자주 쓰는 메뉴를 앞에 보여 드려요. 나중에 언제든 바꿀 수 있어요.
        </p>
        <div className="bmgj-choices">
          {CHOICES.map(({ group, description }) => (
            <button key={group} type="button" className="bmgj-choice" onClick={() => onSelect(group)}>
              <span className="bmgj-choice-title">{GROUP_LABELS[group]}</span>
              <span className="bmgj-choice-desc">{description}</span>
            </button>
          ))}
        </div>
        <p className="bmgj-dialog-note">선택한 값은 이 브라우저에만 저장되고 외부로 보내지 않아요.</p>
        <button type="button" className="bmgj-link-btn" onClick={onShowOriginal}>
          원래 화면으로 보기
        </button>
      </div>
    </div>
  );
}
