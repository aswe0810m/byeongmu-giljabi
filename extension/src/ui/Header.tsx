import { ChevronDown, Search } from 'lucide-react';
import type { ReactNode, RefObject } from 'react';
import type { GroupId } from '../catalog/cards';
import { GROUP_LABELS, SITE_ORIGIN } from '../catalog/cards';

const LOGO_SRC = 'https://www.mma.go.kr/images/syjy/common/ico_mma_logo.svg';
const PORTAL_URL = 'https://mwpt.mma.go.kr';
const PORTAL_HOME = 'https://mwpt.mma.go.kr/caisBMHS/index_mwps.jsp';

interface HeaderProps {
  group: GroupId | null;
  onOpenSearch: () => void;
  searchButtonRef: RefObject<HTMLButtonElement>;
  onGroupChange: (group: GroupId) => void;
  onShowOriginal: () => void;
  originalButtonRef: RefObject<HTMLButtonElement>;
  /** 'portal' = 병무민원 화면. `병무민원`이 현재 사이트라 같은 탭의 포털 첫 화면으로 간다. */
  site?: 'main' | 'portal';
  /** 병무민원 화면의 로그인 상태(남은 시간·연장·나가기/로그인). */
  session?: ReactNode;
}

// 3.2 헤더. 고정하지 않는다.
export function Header({
  group, onOpenSearch, searchButtonRef, onGroupChange, onShowOriginal, originalButtonRef, site = 'main', session,
}: HeaderProps) {
  return (
    <header className="bmgj-header">
      <div className="bmgj-header-brand">
        {/* 사용자 결정(2026-11-12): 지금 있는 사이트(병무청/병무민원)를 진하게 채운 칸으로 알린다 */}
        <nav className="bmgj-sites" aria-label="사이트">
          <a className="bmgj-site" href={`${SITE_ORIGIN}/index.do`} aria-current={site === 'main' ? 'page' : undefined}>
            <span className="bmgj-logo" role="img" aria-label="병무청">
              <span className="bmgj-logo-mark"><img src={LOGO_SRC} alt="" /></span>
              <span className="bmgj-logo-word"><img src={LOGO_SRC} alt="" /></span>
            </span>
          </a>
          {site === 'portal' ? (
            <a className="bmgj-site" href={PORTAL_HOME} aria-current="page">병무민원</a>
          ) : (
            <a className="bmgj-site" href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
              병무민원<span className="bmgj-sr-only">(새 탭)</span>
            </a>
          )}
        </nav>
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
        {session}
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
