// 내 정보 — 고르기 목록(사용자 결정 2026-11-26).
// 응시지역 병무청: 병무청 누리집 '지방청 안내'(mc=usr0000276, 2026-11-26 확인)의 지방병무청 11곳 + 병무지청 3곳.
// 학력·자격증·신체조건 칸은 통합지원서 항목에 맞춘 것. 실제 통합지원서 화면과 다르면 이 파일만 고치면 된다.

export const APPLICATION_OFFICES = [
  '서울지방병무청',
  '부산·울산지방병무청',
  '대구·경북지방병무청',
  '경인지방병무청',
  '광주·전남지방병무청',
  '대전·충남지방병무청',
  '강원지방병무청',
  '충북지방병무청',
  '전북지방병무청',
  '경남지방병무청',
  '제주지방병무청',
  '인천병무지청',
  '경기북부병무지청',
  '강원영동병무지청',
];

const officeKey = (s: string) => s.normalize('NFKC').replace(/[\s·ㆍ.,-]/g, '');

/** 통합지원서에서 읽은 이름('부산울산지방병무청' 등)을 목록 이름으로 맞춘다. 없으면 그대로. */
export function matchOffice(value: string): string {
  const key = officeKey(value);
  return APPLICATION_OFFICES.find((o) => officeKey(o) === key) ?? value;
}

export const SCHOOL_LEVELS = ['고등학교', '고졸 검정고시', '전문대학(2·3년제)', '대학교(4년제)', '대학원', '기타'];
export const SCHOOL_STATUSES = ['재학', '휴학', '졸업', '졸업예정', '수료', '중퇴', '제적'];
export const SCHOOL_GRADES = ['1', '2', '3', '4', '5', '6'];
export const COLOR_VISIONS = ['정상', '색약', '색맹'];

/** 학년·전공을 묻지 않는 학교 구분 */
export const NO_MAJOR_LEVELS = new Set(['고등학교', '고졸 검정고시']);
