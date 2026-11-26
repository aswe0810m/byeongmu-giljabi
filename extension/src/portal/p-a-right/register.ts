// p-a-right: 병무민원 첫 화면(입영 준비) 카드 중 6개의 세부 화면을 공통 틀(../page)에 등록한다.
// 카드: 입영판정검사 신청(신청·신청 취소), 올해 입영일자 선택, 입영일자·부대 조회, 입영일자 연기,
//       실시간 지원현황, 접수결과·합격 조회(접수결과·수험표, 합격여부) — 화면 8개.
// 배너·`민원 첫 화면`·탭·화면 판별·본문 꾸밈은 모두 공통 틀이 한다(docs/p-a-right.md).
import { getPortalCard } from '../../catalog/portalCards';
import { registerPortalPages } from '../page/registry';

const CARD_IDS = ['P-A-M03', 'P-A-M04', 'P-A-M07', 'P-A-M08', 'P-A-M11', 'P-A-M12'] as const;

export function registerPARight(): void {
  try {
    registerPortalPages(CARD_IDS.map((id) => ({ card: getPortalCard(id) })));
  } catch (error) {
    // 카드 ID가 portalCards.ts 에서 사라졌을 때 등: 등록하지 않으면 그 화면들은 원본 그대로 보인다.
    console.error('[bmgj] p-a-right register failed', error);
  }
}
