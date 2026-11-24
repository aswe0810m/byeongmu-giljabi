// 원본 게시판 HTML 읽기(2026-11-24 확인한 구조).
// 목록: table.board_notice — [번호 또는 `공지`] [제목 링크(서버가 잘라서 `...`)] [첨부] [작성일] [조회수]
// 글 보기: table.notice_view — `제목` 칸, 본문(td.con_text)의 `접수기간 : '26. 11. 27.(금) 14:00 ~ '26. 12. 3.(목) 14:00`

export interface NoticeRow {
  boardId: string;
  postNo: string;     // gsgeul_no
  title: string;      // 목록의 제목(잘렸으면 `...`을 뺀 앞부분)
  truncated: boolean;
  pinned: boolean;    // 원본 목록 맨 위의 `공지`
  date: string;       // YYYY-MM-DD
  views: number | null;
  attachment: boolean;
}

export interface ApplyPeriod { startsAt: string; endsAt: string; } // ISO(+09:00)

export interface NoticeDetail {
  title: string;
  apply: ApplyPeriod | null;
}

const clean = (text: string | null | undefined) => (text || '').replace(/\s+/g, ' ').trim();
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TRUNC_RE = /\s*(?:\.\.\.|…)$/;

/** 목록 표의 글들. 표를 찾지 못하면 null(글이 0개인 게시판은 빈 배열). */
export function readBoardList(doc: Document, boardId: string): NoticeRow[] | null {
  const table = doc.querySelector('table.board_notice');
  if (!table) return null;
  const rows: NoticeRow[] = [];
  for (const tr of table.querySelectorAll('tbody tr')) {
    const anchor = tr.querySelector<HTMLAnchorElement>('a[href*="boardView.do"]');
    if (!anchor) continue;
    let postNo: string | null = null;
    try {
      postNo = new URL(anchor.getAttribute('href') || '', 'https://www.mma.go.kr/board/').searchParams.get('gsgeul_no');
    } catch { /* 건너뜀 */ }
    const raw = clean(anchor.textContent);
    if (!postNo || !raw) continue;
    const cells = [...tr.children].map((cell) => clean(cell.textContent));
    const date = cells.find((text) => DATE_RE.test(text)) ?? '';
    const last = cells[cells.length - 1]?.replace(/,/g, '') ?? '';
    rows.push({
      boardId,
      postNo,
      title: raw.replace(TRUNC_RE, ''),
      truncated: TRUNC_RE.test(raw),
      pinned: cells[0]?.includes('공지') ?? false,
      date,
      views: /^\d+$/.test(last) ? Number(last) : null,
      attachment: tr.querySelector('img[alt*="첨부"]') !== null,
    });
  }
  return rows;
}

// ── 접수기간 ──
const TOKEN_RE = /[‘’'′]?\s*(\d{4}|\d{2})\s*(?:\.|년)\s*(\d{1,2})\s*(?:\.|월)\s*(\d{1,2})\s*(?:\.|일)?\s*(?:\([월화수목금토일]\))?\s*(\d{1,2}:\d{2})?/g;

interface Token { iso: string; stamp: number; end: number; start: number; hasTime: boolean; }

function tokens(text: string): Token[] {
  const found: Token[] = [];
  const re = new RegExp(TOKEN_RE.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    let year = Number(m[1]);
    if (year < 100) year += 2000;
    const month = Number(m[2]);
    const day = Number(m[3]);
    const [hour, minute] = (m[4] || '00:00').split(':').map(Number);
    if (year < 2020 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) continue;
    const pad = (n: number) => String(n).padStart(2, '0');
    const iso = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00+09:00`;
    const stamp = Date.parse(iso);
    if (!Number.isFinite(stamp)) continue;
    found.push({ iso, stamp, start: m.index, end: re.lastIndex, hasTime: Boolean(m[4]) });
  }
  return found;
}

/** `접수기간` 바로 뒤의 [날짜 ~ 날짜]. 끝 시각이 없으면 그날 23:59까지로 본다. */
export function readApplyPeriod(text: string): ApplyPeriod | null {
  const at = text.search(/접\s*수\s*기\s*간/);
  if (at < 0) return null;
  const part = text.slice(at, at + 160);
  const list = tokens(part);
  for (let i = 0; i < list.length - 1; i++) {
    const a = list[i];
    const b = list[i + 1];
    const between = part.slice(a.end, b.start);
    if (!/[~～∼\-–—]|부터/.test(between) || between.length > 20) continue;
    if (b.stamp < a.stamp || b.stamp - a.stamp > 60 * 86400000) continue;
    const endsAt = b.hasTime ? b.iso : b.iso.replace('T00:00:00', 'T23:59:00');
    return { startsAt: a.iso, endsAt };
  }
  return null;
}

/** 글 보기 화면의 전체 제목과 접수기간. 제목을 찾지 못하면 null. */
export function readBoardView(doc: Document): NoticeDetail | null {
  const table = doc.querySelector('table.notice_view');
  if (!table) return null;
  let title = '';
  for (const th of table.querySelectorAll('th')) {
    if (clean(th.textContent) === '제목') {
      title = clean(th.nextElementSibling?.textContent);
      break;
    }
  }
  if (!title) return null;
  const body = clean(table.querySelector('.con_text')?.textContent);
  return { title, apply: readApplyPeriod(body) };
}
