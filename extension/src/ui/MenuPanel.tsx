import { useState, type RefObject } from 'react';
import type { GroupId, GroupLayout, HomeCard } from '../catalog/cards';
import { GROUP_LABELS, getCard, layouts } from '../catalog/cards';
import { AllMenuStrip } from './AllMenuStrip';
import { MenuCard } from './MenuCard';
import { MoreToggle } from './MoreToggle';

const HEAD: Record<GroupId, { eyebrow: string; title: string }> = {
  A: { eyebrow: 'INFORMATION', title: '입영 준비 정보' },
  B: { eyebrow: 'QUICK MENU', title: '자주 찾는 메뉴' },
};

const GRID_ID = 'bmgj-card-grid';

/** 패널에 그릴 카드 묶음. 없으면 병무청 첫 화면용. 병무민원 화면은 자기 카드를 넘긴다. */
export interface PanelCatalog {
  head: Record<GroupId, { eyebrow: string; title: string }>;
  layouts: Record<GroupId, GroupLayout>;
  getCard: (id: string) => HomeCard;
  /** 큰 화면의 열 수. 없으면 5열(병무청 첫 화면). */
  columns?: 4 | 5;
}

const MAIN_CATALOG: PanelCatalog = { head: HEAD, layouts, getCard };

interface MenuPanelProps {
  group: GroupId;
  onOpenAllMenu: () => void;
  allMenuLinkRef: RefObject<HTMLButtonElement>;
  catalog?: PanelCatalog;
}

// 3.4 메뉴 패널. 그룹이 바뀌면 상위에서 key로 다시 만들어 펼침 상태를 초기화한다.
export function MenuPanel({ group, onOpenAllMenu, allMenuLinkRef, catalog = MAIN_CATALOG }: MenuPanelProps) {
  const [showMore, setShowMore] = useState(false);
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  const layout = catalog.layouts[group];
  const ids = showMore ? [...layout.main, ...layout.more] : layout.main;

  const toggleCard = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="bmgj-panel" aria-labelledby="bmgj-menu-title" tabIndex={-1}>
      <div className="bmgj-panel-head">
        <div>
          <p className="bmgj-eyebrow">{catalog.head[group].eyebrow}</p>
          <h2 id="bmgj-menu-title" className="bmgj-panel-title">{catalog.head[group].title}</h2>
        </div>
        <span className="bmgj-group-badge">
          <span className="bmgj-group-dot" aria-hidden="true">●</span>
          {GROUP_LABELS[group]}
        </span>
      </div>

      <div id={GRID_ID} className={`bmgj-card-grid${catalog.columns === 4 ? ' bmgj-card-grid--4' : ''}`}>
        {ids.map((id) => (
          <MenuCard key={id} card={catalog.getCard(id)} expanded={expanded.has(id)} onToggle={() => toggleCard(id)} />
        ))}
      </div>
      <MoreToggle
        count={layout.more.length}
        expanded={showMore}
        controls={GRID_ID}
        onToggle={() => setShowMore((v) => !v)}
      />
      <AllMenuStrip onOpenAllMenu={onOpenAllMenu} linkRef={allMenuLinkRef} />
    </section>
  );
}
