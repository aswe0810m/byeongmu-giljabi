import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SEARCH_MAX, normalizeText, searchAllMenu } from '../catalog/search';
import type { MenuCategory, MenuEntry } from '../menu/readAllMenu';
import { useModal } from './useModal';

interface AllMenuDialogProps {
  menu: MenuCategory[];
  onClose: () => void;
}

function linkProps(entry: MenuEntry) {
  return entry.newTab ? { href: entry.href, target: '_blank', rel: 'noopener noreferrer' } : { href: entry.href };
}

function NewTab({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <>
      <span className="bmgj-newtab" aria-hidden="true">{' '}↗</span>
      <span className="bmgj-sr-only">(새 탭)</span>
    </>
  );
}

// 새 전체 메뉴 창(사용자 결정 2026-11-05). 원본 전체 메뉴를 새 디자인으로 보여주고, 창 안에서 모든 메뉴를 검색한다.
export function AllMenuDialog({ menu, onClose }: AllMenuDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(menu[0]?.id ?? '');
  const [announcement, setAnnouncement] = useState('');
  useModal(dialogRef, onClose, inputRef);

  const searching = normalizeText(query) !== '';
  const hits = useMemo(() => searchAllMenu(menu, query), [menu, query]);
  const active = menu.find((c) => c.id === activeId) ?? menu[0];

  // 결과 수는 입력이 멈춘 뒤 한 번만 알린다(8절).
  useEffect(() => {
    if (!searching) return;
    const timer = window.setTimeout(() => setAnnouncement(`전체 메뉴 검색 결과 ${hits.length}개`), 600);
    return () => window.clearTimeout(timer);
  }, [searching, hits.length, query]);

  return (
    <div
      className="bmgj-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          event.preventDefault();
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="bmgj-dialog bmgj-allmenu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bmgj-allmenu-title"
        tabIndex={-1}
      >
        <div className="bmgj-info-head">
          <h2 id="bmgj-allmenu-title" className="bmgj-dialog-title">전체 메뉴</h2>
          <button type="button" className="bmgj-icon-btn" aria-label="닫기" onClick={onClose}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="bmgj-search bmgj-allmenu-search" role="search">
          <input
            ref={inputRef}
            className="bmgj-search-input"
            type="search"
            value={query}
            maxLength={SEARCH_MAX}
            placeholder="어떤 메뉴를 찾으세요?"
            aria-label="전체 메뉴 검색"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.preventDefault();
            }}
          />
          {query && (
            <button
              type="button"
              className="bmgj-search-clear"
              aria-label="검색어 지우기"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="bmgj-sr-only" aria-live="polite">{announcement}</div>

        {searching ? (
          <div className="bmgj-allmenu-scroll">
            <p className="bmgj-search-count">전체 메뉴 검색 결과 {hits.length}개</p>
            {hits.length > 0 ? (
              <ul className="bmgj-allmenu-results">
                {hits.map((hit) => (
                  <li key={`${hit.entry.href}|${hit.entry.label}`}>
                    <a className="bmgj-allmenu-result" {...linkProps(hit.entry)}>
                      <span className="bmgj-allmenu-path">{hit.path.join(' › ')}</span>
                      <span className="bmgj-allmenu-label">
                        {hit.entry.label}
                        <NewTab show={hit.entry.newTab} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="bmgj-allmenu-empty">검색 결과가 없습니다. 다른 검색어를 입력해 보세요.</p>
            )}
          </div>
        ) : (
          <div className="bmgj-allmenu-body">
            <ul className="bmgj-allmenu-cats" aria-label="대분류">
              {menu.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className="bmgj-allmenu-cat"
                    aria-pressed={category.id === active?.id}
                    aria-controls="bmgj-allmenu-list"
                    onClick={() => setActiveId(category.id)}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
            <div id="bmgj-allmenu-list" className="bmgj-allmenu-list">
              {active && (
                <>
                  <h3 className="bmgj-allmenu-cat-title">{active.label}</h3>
                  {active.sections.map((section) => (
                    <div key={section.label} className="bmgj-allmenu-sec">
                      {section.link ? (
                        <a className="bmgj-allmenu-sec-title" {...linkProps(section.link)}>
                          {section.label}
                          <NewTab show={section.link.newTab} />
                        </a>
                      ) : (
                        <h4 className="bmgj-allmenu-sec-title">{section.label}</h4>
                      )}
                      {section.items.length > 0 && (
                        <ul className="bmgj-allmenu-items">
                          {section.items.map((item) => (
                            <li key={`${item.href}|${item.label}`}>
                              <a className="bmgj-allmenu-item" {...linkProps(item)}>
                                {item.label}
                                <NewTab show={item.newTab} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
