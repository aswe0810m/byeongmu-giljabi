// 병무민원 세부 화면 공통 틀 — 화면 머리. 첫 화면 카드와 같은 아이콘·이름·설명을 배너 모양으로 보여 주고,
// 링크가 여러 개인 카드(신청·변경·취소 등)면 그 사이를 오가는 탭을 둔다. 본문은 아래 원본 프레임(frame.css)이 그린다.
import { ChevronLeft } from 'lucide-react';
import { PORTAL_HOME } from '../../catalog/portalCards';
import { ICONS } from '../../ui/MenuCard';
import type { PortalPage } from './registry';
import { menuNoOf } from './registry';

export function PageHead({ page }: { page: PortalPage }) {
  const { entry, tabs, menuNo } = page;
  const { card } = entry;
  const Icon = ICONS[card.icon];
  const current = tabs.find((t) => menuNoOf(t.href) === menuNo);
  return (
    <>
      <nav className="bmgj-page-crumbs" aria-label="현재 위치">
        <a className="bmgj-page-back" href={PORTAL_HOME}>
          <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          민원 첫 화면
        </a>
      </nav>
      <section className="bmgj-page-head" aria-labelledby="bmgj-page-head-title">
        <div className="bmgj-page-head-main">
          <span className="bmgj-page-head-icon" aria-hidden="true">
            <Icon size={26} strokeWidth={1.75} />
          </span>
          <div className="bmgj-page-head-text">
            <p className="bmgj-page-head-eyebrow">병무민원</p>
            <h1 id="bmgj-page-head-title" className="bmgj-page-head-title">
              {card.title}
              {current && <span className="bmgj-sr-only"> — {current.label}</span>}
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
                aria-current={tab === current ? 'page' : undefined}
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
