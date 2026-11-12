import { useEffect, useRef, useState } from 'react';
import type { NewsData, NewsItem } from '../news/readNews';

const NOTICE_ALL = 'https://www.mma.go.kr/board/boardList.do?mc=usr0000379&gesipan_id=2';
const POLICY_ALL = 'https://www.mma.go.kr/board/boardList.do?mc=usr0000242&gesipan_id=125';
const LOAD_FAILED = '소식을 불러오지 못했어요. 전체 보기에서 확인해 주세요.';

type Kind = 'notice' | 'policy';
const BADGE: Record<Kind, string> = { notice: '공지사항', policy: '제도 안내' };

function Rows({ items, kind }: { items: NewsItem[] | null; kind: Kind }) {
  if (!items) {
    return <li className="bmgj-news-error">{LOAD_FAILED}</li>;
  }
  return (
    <>
      {items.map((item) => (
        <li key={item.href}>
          {/* 제목·날짜는 React 텍스트로만 넣는다(innerHTML 사용 안 함). */}
          <a className="bmgj-news-row" href={item.href}>
            <span className={`bmgj-news-badge bmgj-news-badge--${kind}`}>{BADGE[kind]}</span>
            <span className="bmgj-news-title">{item.title}</span>
            <span className="bmgj-news-date">{item.date}</span>
            <span className="bmgj-news-arrow" aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </>
  );
}

// 3.5 소식 패널.
export function NewsPanel({ news }: { news: NewsData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 전체 보기 목록: Escape나 바깥 클릭으로 닫는다.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !event.composedPath().includes(wrapRef.current)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setMenuOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [menuOpen]);

  return (
    <section className="bmgj-panel" aria-labelledby="bmgj-news-title">
      <div className="bmgj-panel-head">
        <div>
          <p className="bmgj-eyebrow">NOTICE</p>
          <h2 id="bmgj-news-title" className="bmgj-panel-title">새로운 소식을 확인하세요</h2>
        </div>
        <div ref={wrapRef} className="bmgj-popover-wrap">
          <button
            ref={buttonRef}
            type="button"
            className="bmgj-head-link"
            aria-expanded={menuOpen}
            aria-controls="bmgj-news-all"
            onClick={() => setMenuOpen((v) => !v)}
          >
            전체 보기 <span aria-hidden="true">→</span>
          </button>
          <ul id="bmgj-news-all" className="bmgj-popover" hidden={!menuOpen}>
            <li><a className="bmgj-popover-link" href={NOTICE_ALL}>공지사항 전체 보기</a></li>
            <li><a className="bmgj-popover-link" href={POLICY_ALL}>달라지는 제도 전체 보기</a></li>
          </ul>
        </div>
      </div>

      <ul className="bmgj-news-list">
        <Rows items={news.notices} kind="notice" />
        <Rows items={news.policies} kind="policy" />
      </ul>
    </section>
  );
}
