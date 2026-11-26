// 분야 필터(사용자 결정 2026-11-24). 군별 게시판 글 제목(2026-11-24 확인)에 자주 나오는 모집 분야.
// 제목에 낱말이 들어 있으면 그 분야로 본다. 한 글이 여러 분야에 들 수 있다.

export interface NoticeField { id: string; label: string; words: string[]; }

export const NOTICE_FIELDS: NoticeField[] = [
  { id: 'schedule', label: '연간·모집 일정', words: ['모집일정', '모집 일정', '모집주기'] },
  { id: 'tech-admin', label: '기술행정병', words: ['기술행정병'] },
  { id: 'specialty', label: '전문특기병', words: ['전문특기병', '특기병('] },
  { id: 'tech', label: '전문기술병', words: ['전문기술병'] },
  { id: 'general', label: '일반병', words: ['일반병', '일반기술병'] },
  { id: 'language', label: '어학병·어학성적', words: ['어학병', '어학성적'] },
  { id: 'katusa', label: '카투사', words: ['카투사', 'KATUSA'] },
  { id: 'local', label: '동반입대·연고지·직계가족', words: ['동반입대', '연고지', '직계가족'] },
  { id: 'extra', label: '추가모집', words: ['추가모집', '추가 모집'] },
  { id: 'employment', label: '취업맞춤특기병', words: ['취업맞춤'] },
];

const squash = (text: string) => text.normalize('NFKC').replace(/\s+/g, '').toLowerCase();

export function fieldsOf(title: string): string[] {
  const t = squash(title);
  return NOTICE_FIELDS.filter((f) => f.words.some((w) => t.includes(squash(w)))).map((f) => f.id);
}
