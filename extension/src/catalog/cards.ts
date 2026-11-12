// 병무길잡이 메뉴 데이터 — 개발 명세서 v3.0 4절 표를 그대로 옮긴 것.
// 화면은 이 파일의 cards / layouts 만 보고 그린다.

export type GroupId = 'A' | 'B';
export type IconKey =
  | 'megaphone' | 'calendar' | 'book-open' | 'shield-check' | 'clock'
  | 'file-text' | 'file-pen' | 'search' | 'map-pin' | 'circle-help' | 'headset' | 'store';
export type IconTone = 'mint' | 'blue' | 'sand' | 'solid';

export interface MenuLink { label: string; href: string; newTab: boolean; }

export interface HomeCard {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  tone: IconTone; // 'solid' = 강조 카드(A-M06, B-M01)
  links: MenuLink[]; // 1개면 단일 링크 카드, 2개 이상이면 묶음 카드
}

export interface GroupLayout { main: string[]; more: string[]; }

export const SITE_ORIGIN = 'https://www.mma.go.kr';

/** 그룹 표시 이름(3.1 선택창, 3.2 select, 3.4 배지). */
export const GROUP_LABELS: Record<GroupId, string> = {
  A: '입영 준비·복무 중',
  B: '전역·예비군',
};

/** 상대 경로('/...')에 https://www.mma.go.kr 을 붙인다. 절대 주소는 그대로 둔다. */
export function toAbsoluteUrl(href: string): string {
  return href.startsWith('/') ? SITE_ORIGIN + href : href;
}

// 원본 표의 값(상대 경로 포함). 단일 링크 카드의 링크 이름은 카드 이름과 같다.
// 사용자 결정(2026-11-05): 카드 하나는 페이지 하나로 연결한다. 4절의 묶음 카드는 원본 메뉴의
// 상위 항목과 같은 첫 하위 페이지로, B-M05는 민원포털 첫 화면으로 연결한다(docs 참고).
const rawCards: HomeCard[] = [
  // ── A 메인 ──
  {
    id: 'A-M01', title: '안내 및 신청(지원)',
    description: '현역병·모집병·입영일자 본인선택 신청 안내로 가요.',
    icon: 'book-open', tone: 'sand',
    links: [{ label: '안내 및 신청(지원)', href: '/contents.do?mc=mma0003746', newTab: false }],
  },
  {
    id: 'A-M02', title: '지원서 작성/수정/취소',
    description: '민원포털에서 모집병 지원서를 작성·수정·취소해요.',
    icon: 'file-pen', tone: 'blue',
    links: [{ label: '지원서 작성/수정/취소', href: 'https://mwpt.mma.go.kr/caisBMHS/index_mwps.jsp?menuNo=22041', newTab: true }],
  },
  {
    id: 'A-M03', title: '군지원 서비스(민원/조회)',
    description: '민원포털에서 지원 결과 등을 조회해요.',
    icon: 'search', tone: 'mint',
    links: [{ label: '군지원 서비스(민원/조회)', href: 'https://mwpt.mma.go.kr/caisBMHS/index_mwps.jsp?menuNo=22037', newTab: false }],
  },
  {
    id: 'A-M04', title: '이달의 모집계획',
    description: '육·해·해병·공군의 이번 달 모집계획을 확인해요.',
    icon: 'calendar', tone: 'blue',
    links: [{ label: '이달의 모집계획', href: '/contents.do?mc=mma0000743', newTab: false }],
  },
  {
    id: 'A-M05', title: '안내 및 지원절차',
    description: '지원자격, 접수, 선발절차를 확인해요.',
    icon: 'shield-check', tone: 'mint',
    links: [{ label: '안내 및 지원절차', href: '/contents.do?mc=mma0000386', newTab: false }],
  },
  {
    id: 'A-M06', title: '모집 공지사항',
    description: '모집 관련 공지를 확인해요.',
    icon: 'megaphone', tone: 'solid',
    links: [{ label: '모집 공지사항', href: '/board/boardList.do?mc=usr0000127&gesipan_id=69', newTab: false }],
  },
  {
    id: 'A-M07', title: '병역판정검사',
    description: '검사 대상, 검사과정·지참물, 일자연기를 확인해요.',
    icon: 'shield-check', tone: 'mint',
    links: [{ label: '병역판정검사', href: '/contents.do?mc=usr0000167', newTab: false }],
  },
  {
    id: 'A-M08', title: '입영판정검사',
    description: '입영판정검사 안내, 일자·장소 변경, 신청 메뉴예요.',
    icon: 'shield-check', tone: 'blue',
    links: [{ label: '입영판정검사', href: '/contents.do?mc=mma0002909', newTab: false }],
  },
  {
    id: 'A-M09', title: '재학생 입영연기',
    description: '재학생 입영연기 대상과 절차를 확인해요.',
    icon: 'clock', tone: 'blue',
    links: [{ label: '재학생 입영연기', href: '/contents.do?mc=usr0000174', newTab: false }],
  },
  {
    id: 'A-M10', title: '현역병 선발취소 및 입영일자 연기신청',
    description: '선발취소와 입영일자 연기 안내를 확인해요.',
    icon: 'clock', tone: 'sand',
    links: [{ label: '현역병 선발취소 및 입영일자 연기신청', href: '/contents.do?mc=usr0000295', newTab: false }],
  },

  // ── A 더보기 ──
  {
    id: 'A-R01', title: '병역이행일정안내',
    description: '입대일로 전역·예비군 일정까지 확인해요.',
    icon: 'calendar', tone: 'mint',
    links: [{ label: '병역이행일정안내', href: '/contents.do?mc=usr0000042', newTab: false }],
  },
  {
    id: 'A-R02', title: '병무청 지정병원',
    description: '병무용진단서를 발급하는 병원을 찾아요.',
    icon: 'map-pin', tone: 'blue',
    links: [{ label: '병무청 지정병원', href: '/contents.do?mc=usr0000147', newTab: false }],
  },
  {
    id: 'A-R03', title: 'FAQ',
    description: '각 군 공통·군별 모집 FAQ를 봐요.',
    icon: 'circle-help', tone: 'sand',
    links: [{ label: 'FAQ', href: '/board/boardList.do?mc=mma0002306&gesipan_id=317', newTab: false }],
  },
  {
    id: 'A-R04', title: '고객센터안내',
    description: '상담 전화와 상담 채널을 확인해요.',
    icon: 'headset', tone: 'mint',
    links: [{ label: '고객센터안내', href: '/contents.do?mc=usr0000281', newTab: false }],
  },
  {
    id: 'A-R05', title: '입영시 유의사항',
    description: '입영 준비물과 유의사항을 확인해요.',
    icon: 'book-open', tone: 'sand',
    links: [{ label: '입영시 유의사항', href: '/contents.do?mc=usr0000294', newTab: false }],
  },

  // ── B 메인 ──
  {
    id: 'B-M01', title: '병적증명서 등 발급안내',
    description: '병적증명서 등의 발급 대상과 방법을 확인해요.',
    icon: 'file-text', tone: 'solid',
    links: [{ label: '병적증명서 등 발급안내', href: '/contents.do?mc=usr0000146', newTab: false }],
  },
  {
    id: 'B-M02', title: '병력동원훈련소집',
    description: '동원훈련 대상과 통지, 여비 안내를 확인해요.',
    icon: 'shield-check', tone: 'blue',
    links: [{ label: '병력동원훈련소집', href: '/contents.do?mc=mma0002242', newTab: false }],
  },
  {
    id: 'B-M03', title: '예비군 FAQ',
    description: '예비군 편성·동원 관련 질문을 봐요.',
    icon: 'circle-help', tone: 'sand',
    links: [{ label: '예비군 FAQ', href: '/contents.do?mc=mma0003402', newTab: false }],
  },
  {
    id: 'B-M04', title: '예비군 홈페이지',
    description: '훈련 일정 확인과 신청은 예비군 홈페이지에서 해요.',
    icon: 'book-open', tone: 'sand',
    links: [{ label: '예비군 홈페이지', href: 'https://www.yebigun1.mil.kr', newTab: true }],
  },
  {
    id: 'B-M05', title: '민원신청 / 민원처리결과조회',
    description: '민원을 신청하거나 처리 결과를 조회해요.',
    icon: 'search', tone: 'mint',
    links: [{ label: '민원신청 / 민원처리결과조회', href: 'https://mwpt.mma.go.kr', newTab: true }],
  },

  // ── B 더보기 ──
  {
    id: 'B-R01', title: '예비군 보류(해소) 신청',
    description: '예비군 홈페이지에서 보류·해소를 신청해요.',
    icon: 'file-pen', tone: 'blue',
    links: [{ label: '예비군 보류(해소) 신청', href: 'https://www.yebigun1.mil.kr', newTab: true }],
  },
  {
    id: 'B-R02', title: '군번찾기 안내',
    description: '군번을 찾는 방법을 확인해요.',
    icon: 'search', tone: 'mint',
    links: [{ label: '군번찾기 안내', href: '/contents.do?mc=mma0003365', newTab: false }],
  },
  {
    id: 'B-R03', title: '동원 표준훈련장 가는길',
    description: '훈련장 주소와 교통편을 확인해요.',
    icon: 'map-pin', tone: 'blue',
    links: [{ label: '동원 표준훈련장 가는길', href: '/contents.do?mc=mma0002096', newTab: false }],
  },
  {
    id: 'B-R04', title: '고객센터안내',
    description: '상담 전화와 상담 채널을 확인해요.',
    icon: 'headset', tone: 'mint',
    links: [{ label: '고객센터안내', href: '/contents.do?mc=usr0000281', newTab: false }],
  },
  {
    id: 'B-R05', title: '나라사랑 가게',
    description: '동원훈련 이수자 할인 제도와 가게를 찾아봐요.',
    icon: 'store', tone: 'sand',
    links: [{ label: '나라사랑 가게', href: '/contents.do?mc=mma0003356', newTab: false }],
  },
];

/** 모든 href를 절대 주소로 바꾼 카드 목록. 화면과 검사는 이 값을 쓴다. */
export const cards: HomeCard[] = rawCards.map((card) => ({
  ...card,
  links: card.links.map((link) => ({ ...link, href: toAbsoluteUrl(link.href) })),
}));

export const layouts: Record<GroupId, GroupLayout> = {
  A: {
    main: ['A-M01', 'A-M02', 'A-M03', 'A-M04', 'A-M05', 'A-M06', 'A-M07', 'A-M08', 'A-M09', 'A-M10'],
    more: ['A-R01', 'A-R02', 'A-R03', 'A-R04', 'A-R05'],
  },
  B: {
    main: ['B-M01', 'B-M02', 'B-M03', 'B-M04', 'B-M05'],
    more: ['B-R01', 'B-R02', 'B-R03', 'B-R04', 'B-R05'],
  },
};

const cardById = new Map(cards.map((card) => [card.id, card]));

/** ID로 카드를 찾는다. 검사를 통과한 뒤에만 쓰므로 없으면 예외. */
export function getCard(id: string): HomeCard {
  const card = cardById.get(id);
  if (!card) throw new Error(`[bmgj] unknown card ${id}`);
  return card;
}
