// 카드 배너(디자인 통일 2026-11-26): 카드를 눌러 들어간 화면의 머리.
// "‹ 첫 화면" 링크 + 누른 카드와 같은 아이콘·이름·설명의 배너 + 링크가 여러 개인 카드면 탭.
// 병무청 하위 페이지(src/subpage)와 병무민원 세부 화면(src/portal/page)이 함께 쓴다. 색은 화면의 :host 변수를 따른다
// (병무청 초록, 병무민원 남색).
import { ChevronLeft } from 'lucide-react';
import type { HomeCard, MenuLink } from '../catalog/cards';
import css from './cardBanner.css?inline';
import { ICONS } from './MenuCard';

interface CardBannerProps {
  card: HomeCard;
  /** 배너 제목 위의 작은 글자(사이트 이름). */
  eyebrow: string;
  /** "‹ 첫 화면" 링크. */
  back: { href: string; label: string };
  /** 링크가 여러 개인 카드면 그 링크들(탭). */
  tabs?: MenuLink[];
  /** 지금 화면인 탭. */
  currentTab?: MenuLink;
}

export function CardBanner({ card, eyebrow, back, tabs = [], currentTab }: CardBannerProps) {
  const Icon = ICONS[card.icon];
  return (
    <>
      <style>{css}</style>
      <nav className="bmgj-page-crumbs" aria-label="현재 위치">
        <a className="bmgj-page-back" href={back.href}>
          <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          {back.label}
        </a>
      </nav>
      <section className="bmgj-page-head" aria-labelledby="bmgj-page-head-title" tabIndex={-1}>
        <div className="bmgj-page-head-main">
          <span className="bmgj-page-head-icon" aria-hidden="true">
            <Icon size={26} strokeWidth={1.75} />
          </span>
          <div className="bmgj-page-head-text">
            <p className="bmgj-page-head-eyebrow">{eyebrow}</p>
            <h1 id="bmgj-page-head-title" className="bmgj-page-head-title">
              {card.title}
              {currentTab && <span className="bmgj-sr-only"> — {currentTab.label}</span>}
            </h1>
            <p className="bmgj-page-head-desc">{card.description}</p>
          </div>
        </div>
        {tabs.length > 0 && (
          <nav className="bmgj-page-tabs" aria-label="관련 메뉴">
            {tabs.map((tab) => (
              <a
                key={tab.href}
                className="bmgj-page-tab"
                href={tab.href}
                aria-current={tab === currentTab ? 'page' : undefined}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        )}
      </section>
    </>
  );
}
