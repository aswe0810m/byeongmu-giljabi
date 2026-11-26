// p-a-left: 병무민원 첫 화면(입영 준비) 카드 중 6개의 세부 화면을 공통 틀(../page)에 등록한다.
// 카드: 병역판정검사 일자 선택(신청·변경·취소), 병역판정검사 일자연기, 다음연도 접수 일정,
//       내년 입영일자 선택, 입영통지서 출력, 통합지원서 작성 — 화면 8개.
import { getPortalCard } from '../../catalog/portalCards';
import { registerPortalPages } from '../page/registry';
import { markMyOffice } from './myOffice';
import myOfficeCss from './p-a-left.css?inline';

const CARD_IDS = ['P-A-M01', 'P-A-M02', 'P-A-M05', 'P-A-M06', 'P-A-M09', 'P-A-M10'] as const;

/** 다음연도 접수 일정: 일정표에서 내 관할 지방청 칸을 칠한다(사용자 요청 2026-11-23). */
const MY_OFFICE_CARD = 'P-A-M05';

export function registerPALeft(): void {
  try {
    registerPortalPages(CARD_IDS.map((id) => (
      id === MY_OFFICE_CARD
        ? { card: getPortalCard(id), frameCss: myOfficeCss, enhance: markMyOffice }
        : { card: getPortalCard(id) }
    )));
  } catch (error) {
    // 카드 ID가 portalCards.ts 에서 사라졌을 때 등: 등록하지 않으면 그 화면들은 원본 그대로 보인다.
    console.error('[bmgj] p-a-left register failed', error);
  }
}
