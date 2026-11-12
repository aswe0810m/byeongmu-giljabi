import { ArrowRight } from 'lucide-react';
import type { GroupId } from '../catalog/cards';
import { getCard } from '../catalog/cards';

const EYEBROW = '나의 병역 여정, 조금 더 가볍게';

const HERO: Record<GroupId, { title: string; description: string; button: string; cardId: string }> = {
  A: {
    title: '막막했던 입영 준비, / 여기서 차근차근.',
    description: '모집 소식과 지원 조건, 입영 절차를 알아보세요. 신청과 조회는 병무민원에서 진행해요.',
    button: '이달의 모집계획 보러 가기',
    cardId: 'A-M04',
  },
  B: {
    title: '복무 이후의 일상도, / 필요한 것만 간편하게.',
    description: '증명서 발급 안내부터 동원훈련까지, 필요한 정보를 빠르게 찾아보세요.',
    button: '병적증명서 등 발급안내',
    cardId: 'B-M01',
  },
};

// 3.3 소개 배너.
export function Hero({ group }: { group: GroupId }) {
  const hero = HERO[group];
  const link = getCard(hero.cardId).links[0];
  const lines = hero.title.split('/').map((line) => line.trim());

  return (
    <section className="bmgj-hero" aria-labelledby="bmgj-hero-title" tabIndex={-1}>
      <div className="bmgj-hero-text">
        <p className="bmgj-hero-eyebrow">{EYEBROW}</p>
        <h1 id="bmgj-hero-title" className="bmgj-hero-title">
          {lines.map((line, i) => (
            <span key={i} className="bmgj-hero-line">{line}</span>
          ))}
        </h1>
        <p className="bmgj-hero-desc">{hero.description}</p>
        <a
          className="bmgj-hero-btn"
          href={link.href}
          {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {hero.button}
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
      <HeroArt />
    </section>
  );
}

/** 배너 오른쪽 장식 그림(직접 그린 SVG). */
function HeroArt() {
  return (
    <svg className="bmgj-hero-art" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <circle className="art-orbit" cx="112" cy="100" r="82" />
      <path className="art-dash" d="M 36 150 A 82 82 0 0 1 62 36" />
      <g className="art-plus">
        <line x1="44" y1="22" x2="44" y2="36" />
        <line x1="37" y1="29" x2="51" y2="29" />
      </g>
      <circle className="art-dot" cx="182" cy="44" r="6" />
      <g transform="rotate(8 118 100)">
        <rect className="art-paper" x="74" y="34" width="90" height="126" rx="10" />
        <rect className="art-line" x="88" y="54" width="56" height="5" rx="2.5" />
        <rect className="art-line" x="88" y="66" width="62" height="5" rx="2.5" />
        <rect className="art-line" x="88" y="78" width="42" height="5" rx="2.5" />
        <circle className="art-check-bg" cx="119" cy="122" r="20" />
        <path className="art-check" d="M 110 122 l 6 6 l 12 -13" />
      </g>
      <circle className="art-check-bg" cx="54" cy="142" r="16" />
      <path className="art-check" d="M 47 142 l 5 5 l 9 -10" />
    </svg>
  );
}
