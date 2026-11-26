// 병무민원 세부 화면 공통 틀 — 화면 머리. 첫 화면 카드와 같은 아이콘·이름·설명을 배너 모양으로 보여 주고,
// 링크가 여러 개인 카드(신청·변경·취소 등)면 그 사이를 오가는 탭을 둔다. 본문은 아래 원본 프레임(frame.css)이 그린다.
// 배너 자체는 병무청 하위 페이지와 함께 쓰는 공용 부품(src/ui/CardBanner)이다(디자인 통일 2026-11-26).
import { PORTAL_HOME } from '../../catalog/portalCards';
import { CardBanner } from '../../ui/CardBanner';
import type { PortalPage } from './registry';
import { menuNoOf } from './registry';

export function PageHead({ page }: { page: PortalPage }) {
  const { entry, tabs, menuNo } = page;
  return (
    <CardBanner
      card={entry.card}
      eyebrow="병무민원"
      back={{ href: PORTAL_HOME, label: '민원 첫 화면' }}
      tabs={tabs}
      currentTab={tabs.find((t) => menuNoOf(t.href) === menuNo)}
    />
  );
}
