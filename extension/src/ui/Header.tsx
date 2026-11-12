import { ChevronDown, Search } from 'lucide-react';
import type { RefObject } from 'react';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS, SITE_ORIGIN } from '../catalog/cards';

const LOGO_SRC = 'https://www.mma.go.kr/images/syjy/common/ico_mma_logo.svg';
const PORTAL_URL = 'https://mwpt.mma.go.kr';

interface HeaderProps {
  group: GroupId | null;
  onOpenSearch: () => void;
  searchButtonRef: RefObject<HTMLButtonElement>;
  onGroupChange: (group: GroupId) => void;
  onShowOriginal: () => void;
  originalButtonRef: RefObject<HTMLButtonElement>;
}

// 3.2 헤더. 고정하지 않는다.
export function Header({ group, onOpenSearch, searchButtonRef, onGroupChange, onShowOriginal, originalButtonRef }: HeaderProps) {
  return (
    <header className="bmgj-header">
      <div className="bmgj-header-brand">
        <a className="bmgj-logo" href={`${SITE_ORIGIN}/index.do`}>
          <img src={LOGO_SRC} alt="병무청" />
        </a>
        <span className="bmgj-divider" aria-hidden="true" />
        <a className="bmgj-portal" href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
          병무민원<span className="bmgj-sr-only">(새 탭)</span>
        </a>
        <span className="bmgj-unofficial">비공식 도우미</span>
      </div>

      {/* 사용자 결정(2026-11-05): 헤더 검색은 전체 메뉴 창을 열고, 입력은 창 안에서 한다.
          글자를 치는 도중 창으로 포커스를 옮기면 한글 조합이 끊기기 때문. */}
      <div className="bmgj-search">
        <button ref={searchButtonRef} type="button" className="bmgj-search-input bmgj-search-trigger" aria-haspopup="dialog" onClick={onOpenSearch}>
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          어떤 메뉴를 찾으세요?
        </button>
      </div>

      <div className="bmgj-header-controls">
        {group && (
          <div className="bmgj-select-wrap">
            <select
              className="bmgj-select"
              aria-label="화면 그룹"
              value={group}
              onChange={(event) => onGroupChange(event.target.value as GroupId)}
            >
              <option value="A">{GROUP_LABELS.A}</option>
              <option value="B">{GROUP_LABELS.B}</option>
            </select>
            <ChevronDown className="bmgj-select-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
          </div>
        )}
        <button ref={originalButtonRef} type="button" className="bmgj-text-btn" onClick={onShowOriginal}>
          원래 화면 보기
        </button>
      </div>
    </header>
  );
}
