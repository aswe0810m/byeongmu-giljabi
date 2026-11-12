interface MoreToggleProps {
  count: number;
  expanded: boolean;
  controls: string;
  onToggle: () => void;
}

// 3.4 더보기 버튼. 상태는 저장하지 않는다.
export function MoreToggle({ count, expanded, controls, onToggle }: MoreToggleProps) {
  return (
    <div className="bmgj-more-wrap">
      <button type="button" className="bmgj-more" aria-expanded={expanded} aria-controls={controls} onClick={onToggle}>
        {expanded ? (
          <>접기 <span aria-hidden="true">▴</span></>
        ) : (
          <>더보기 ({count}개) <span aria-hidden="true">▾</span></>
        )}
      </button>
    </div>
  );
}
