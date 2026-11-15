// 병무민원(병무민원포털 첫 화면) 개선 화면 메뉴 데이터 — 「병무길잡이 민원 메뉴 분류안」(2026-11-12) 기준.
// ① 메인 = main, ② 더보기 = more, ③ 기타 = 전체 메뉴 창(포털 원본 메뉴를 실행 시 읽음).
// 주소는 포털 사이트맵의 menuNo(2026-11-12 확인)로 만든다. 모두 같은 탭.
// 사용자 결정(2026-11-12): 신청/변경/취소처럼 포털에서 여러 메뉴로 나뉜 민원은 묶음 카드로 만든다.

import type { GroupId, GroupLayout, HomeCard, IconKey, IconTone, MenuLink } from './cards';
import type { ExpectedCounts } from './validate';

export const PORTAL_ORIGIN = 'https://mwpt.mma.go.kr';

/** 포털 메뉴 주소. 포털 틀(index_mwps.jsp)이 menuNo의 화면을 프레임 안에 연다. */
export function portalMenuUrl(menuNo: string): string {
  return `${PORTAL_ORIGIN}/caisBMHS/index_mwps.jsp?menuNo=${menuNo}`;
}

/** 포털 첫 화면(틀 + 첫 화면 프레임). */
export const PORTAL_HOME = `${PORTAL_ORIGIN}/caisBMHS/index_mwps.jsp`;
/** 원본 사이트맵(전체 메뉴를 읽지 못했을 때 대신 연다). */
export const PORTAL_SITEMAP = portalMenuUrl('22399');

const link = (label: string, menuNo: string): MenuLink => ({ label, href: portalMenuUrl(menuNo), newTab: false });

function card(
  id: string, title: string, description: string, icon: IconKey, tone: IconTone,
  links: MenuLink[] | string,
): HomeCard {
  return { id, title, description, icon, tone, links: typeof links === 'string' ? [link(title, links)] : links };
}

export const portalCards: HomeCard[] = [
  // ── A ① 메인 ──
  card('P-A-M01', '병역판정검사 일자 선택', '검사 날짜·장소를 직접 골라요.', 'calendar', 'mint',
    [link('신청', '22017'), link('변경', '22018'), link('취소', '22019')]),
  card('P-A-M02', '병역판정검사 일자연기', '검사일 5일 전까지 신청해요.', 'clock', 'blue', '22021'),
  card('P-A-M03', '입영판정검사 신청', '입영 직전 검사를 신청·취소해요.', 'shield-check', 'sand',
    [link('신청', '22365'), link('신청 취소', '22366')]),
  // 사용자 결정(2026-11-12): 본인선택원은 묶음 없이 신청 화면으로 바로 이동(변경·취소는 포털 왼쪽 메뉴).
  card('P-A-M04', '올해 입영일자 선택', '선착순으로 바로 결정돼요.', 'calendar', 'blue', '22059'),
  card('P-A-M05', '다음연도 접수 일정', '내 접수 회차와 일시를 확인해요.', 'search', 'mint', '22374'),
  card('P-A-M06', '내년 입영일자 선택', '입영일 60일 전까지 1회 변경해요.', 'calendar', 'solid', '22308'),
  card('P-A-M07', '입영일자·부대 조회', '결정된 입영일과 부대를 확인해요.', 'map-pin', 'sand', '22073'),
  card('P-A-M08', '입영일자 연기', '부득이한 사유로 입영을 미뤄요.', 'clock', 'sand', '22062'),
  card('P-A-M09', '입영통지서 출력', '입영 당일 가져가요.', 'printer', 'blue', '22077'),
  card('P-A-M10', '통합지원서 작성', '육·해·해병·공군 모집병 지원.', 'file-pen', 'mint', '22041'),
  card('P-A-M11', '실시간 지원현황', '분야별 지원 인원을 봐요.', 'chart', 'blue', '22039'),
  card('P-A-M12', '접수결과·합격 조회', '수험표와 합격 여부를 확인해요.', 'search', 'sand',
    [link('지원서접수결과·수험표조회', '22052'), link('합격여부조회', '22053')]),

  // ── A ② 더보기 ──
  card('P-A-R01', '검사 희망일정 조회', '날짜별 남은 자리를 확인해요.', 'calendar', 'mint', '22223'),
  card('P-A-R02', '검사 일자·장소 조회', '확정된 검사 일정을 확인해요.', 'search', 'blue', '22025'),
  card('P-A-R03', '검사 출석확인서', '학교·직장 제출용으로 출력해요.', 'printer', 'sand', '22257'),
  card('P-A-R04', '입영판정검사 일정 변경', '일자와 장소를 바꿔요.', 'calendar', 'blue', '22364'),
  card('P-A-R05', '입영일자 연기포기', '연기를 포기하고 입영해요.', 'clock', 'mint', '22261'),
  card('P-A-R06', '취업맞춤특기병 지원', '취업맞춤특기병에 지원해요.', 'file-pen', 'sand', '22222'),
  card('P-A-R07', '지원서 수정', '내용이나 희망순위를 바꿔요.', 'file-pen', 'blue',
    [link('지원서수정', '22043'), link('희망순위변경', '22044')]),
  card('P-A-R08', '지원서 접수취소', '최종 발표 7일 전까지 가능해요.', 'file-x', 'sand', '22045'),
  card('P-A-R09', '육군 추가모집', '정규 모집을 놓쳤다면 지원해요.', 'megaphone', 'mint', '22201'),
  card('P-A-R10', '서류제출', '1차 합격 후 서류를 내요.', 'file-text', 'blue', '22380'),
  card('P-A-R11', '선발취소 신청', '모집병 선발을 취소해요.', 'file-x', 'sand', '22046'),

  // ── B ① 메인 ──
  card('P-B-M01', '동원훈련 연기', '소집일 5일 전까지 신청해요.', 'clock', 'blue', '22123'),
  card('P-B-M02', '소집통지서 출력', '못 받은 통지서를 출력해요.', 'printer', 'sand', '22138'),
  card('P-B-M03', '훈련 일자·교통편 조회', '소집일과 입영부대를 확인해요.', 'calendar', 'solid', '22132'),
  card('P-B-M04', '병적증명서 발급', '취업 등에 내는 증명서예요.', 'file-text', 'mint', '22029'),

  // ── B ② 더보기 ──
  card('P-B-R01', '통지서 앱·메일 수령', '통지서를 앱·메일로 받아요.', 'file-text', 'mint', '22275'),
  card('P-B-R02', '통지서 희망 수령지', '다른 곳에서 통지서를 받아요.', 'map-pin', 'blue', '22126'),
  card('P-B-R03', '입영방법 변경', '개별·차량 입영을 바꿔요.', 'bus', 'sand', '22127'),
  card('P-B-R04', '사전 여비지급 신청', '훈련 여비를 미리 받아요.', 'wallet', 'mint', '22130'),
];

export const portalLayouts: Record<GroupId, GroupLayout> = {
  A: {
    main: ['P-A-M01', 'P-A-M02', 'P-A-M03', 'P-A-M04', 'P-A-M05', 'P-A-M06',
      'P-A-M07', 'P-A-M08', 'P-A-M09', 'P-A-M10', 'P-A-M11', 'P-A-M12'],
    more: ['P-A-R01', 'P-A-R02', 'P-A-R03', 'P-A-R04', 'P-A-R05', 'P-A-R06',
      'P-A-R07', 'P-A-R08', 'P-A-R09', 'P-A-R10', 'P-A-R11'],
  },
  B: {
    main: ['P-B-M01', 'P-B-M02', 'P-B-M03', 'P-B-M04'],
    more: ['P-B-R01', 'P-B-R02', 'P-B-R03', 'P-B-R04'],
  },
};

export const PORTAL_EXPECTED_COUNTS: ExpectedCounts = {
  A: { main: 12, more: 11 },
  B: { main: 4, more: 4 },
};

const portalCardById = new Map(portalCards.map((c) => [c.id, c]));

export function getPortalCard(id: string): HomeCard {
  const found = portalCardById.get(id);
  if (!found) throw new Error(`[bmgj] unknown portal card ${id}`);
  return found;
}
