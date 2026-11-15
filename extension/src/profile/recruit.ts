// 내 정보 — 모집 일정(D-Day). 공개된 병무청 HTML(이달의 모집계획, 육군 모집계획 게시판)만 읽는다.
// 사용자 정보는 읽거나 보내지 않는다(credentials: 'omit'). 팀 구현 v0.5.1을 소스로 옮김(0.4.8). 동작은 그대로.

export const RECRUIT_KEY = 'bmgj.recruitmentSchedules.v1';
export const RECRUIT_INDEX_URL = 'https://www.mma.go.kr/contents.do?mc=mma0000743';
const RECRUIT_BOARD_URL = 'https://www.mma.go.kr/board/boardList.do?gesipan_id=93&mc=usr0000150';
export const RECRUIT_REFRESH_MS = 6 * 60 * 60 * 1000;
export const RECRUIT_MAX_AGE = 14 * 24 * 60 * 60 * 1000;
const DATE_RE = /(?:[‘’'′]?\s*(\d{2}|\d{4})\s*(?:\.|년)\s*(\d{1,2})\s*(?:\.|월)\s*(\d{1,2})\s*(?:\.)?\s*(?:\([월화수목금토일]\))?\s*(\d{1,2}:\d{2})?)/g;

export interface RecruitRecord {
  label: string;
  title: string;
  startsAt: string;
  endsAt: string;
  url: string;
  specialties: string[];
  source: string;
  category: string;
}

export interface RecruitCache { checkedAt: number; records: RecruitRecord[]; source: string; }

interface DateToken { stamp: number; iso: string; text: string; index: number; endIndex: number; }

function dateTokens(text: string): DateToken[] {
  const matches: DateToken[] = [];
  const re = new RegExp(DATE_RE.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    let year = Number(m[1]);
    if (year < 100) year += 2000;
    const month = Number(m[2]), day = Number(m[3]);
    const time = m[4] || '00:00';
    const [hour, minute] = time.split(':').map(Number);
    if (year < 2024 || year > 2100 || month < 1 || month > 12 || hour > 23 || minute > 59) continue;
    const dt = new Date(Date.UTC(year, month - 1, day));
    if (dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day) continue;
    const iso = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(time).padStart(5, '0')}:00+09:00`;
    const stamp = Date.parse(iso);
    if (!Number.isFinite(stamp)) continue;
    matches.push({ stamp, iso, text: m[0], index: m.index, endIndex: re.lastIndex });
  }
  return matches;
}

function rangeFromText(text: string): { startsAt: string; endsAt: string } | null {
  if (!text || text.length > 2500) return null;
  const tokens = dateTokens(text);
  if (tokens.length < 2) return null;
  for (let i = 0; i < tokens.length - 1; i++) {
    const a = tokens[i], b = tokens[i + 1];
    if (a.stamp >= b.stamp || b.stamp - a.stamp > 50 * 86400000) continue;
    const sep = text.slice(a.endIndex, b.index);
    if (!/(?:~|～|∼|부터|에서|[-–—]|까지)/.test(sep) || sep.length > 42) continue;
    return { startsAt: a.iso, endsAt: b.iso };
  }
  return null;
}

const textOf = (element: Element | null | undefined) => (element?.textContent || '').replace(/\s+/g, ' ').trim();
const norm = (s: unknown) => String(s || '').normalize('NFKC').replace(/[\s\-_.·/()[\]「」]/g, '').toLowerCase();

function relevant(role: string, item: RecruitRecord): boolean {
  const r = norm(role);
  if (!r) return false;
  const search = norm([item.title, item.label, ...(item.specialties || [])].join(' '));
  // '기술병'은 기술행정병·전문기술병을 함께 이르는 말.
  if (r === '기술병') return /기술행정병|전문기술병|기술병/.test(search);
  if (r === '어학병') return search.includes('어학병');
  // 언어별 어학병은 일반 '어학병' 제목에서 추측하지 않는다.
  if (/(?:영어|중국어|일본어|러시아어|스페인어|프랑스어|독일어|아랍어)어학병/.test(r)) {
    return (item.specialties || []).some((s) => norm(s).includes(r)) || norm(item.label).includes(r);
  }
  return search.includes(r);
}

function kinds(text: string): string[] {
  const names = ['영어어학병', '중국어어학병', '일본어어학병', '러시아어어학병', '스페인어어학병', '프랑스어어학병', '독일어어학병', '아랍어어학병', '기술행정병', '전문기술병', 'SW개발병', '정보보호병'];
  const n = norm(text);
  return names.filter((name) => n.includes(norm(name)));
}

function record(data: Partial<RecruitRecord> & { startsAt: string; endsAt: string; url: string }): RecruitRecord | null {
  const start = Date.parse(data.startsAt), end = Date.parse(data.endsAt);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end || end - start > 50 * 86400000) return null;
  if (!/^https:\/\/www\.mma\.go\.kr\//.test(data.url)) return null;
  return {
    label: (data.label || '모집병').slice(0, 110),
    title: (data.title || '').slice(0, 180),
    startsAt: data.startsAt,
    endsAt: data.endsAt,
    url: data.url,
    specialties: Array.isArray(data.specialties) ? data.specialties.slice(0, 35) : [],
    source: data.source || '병무청',
    category: data.category || '모집계획',
  };
}

function mainTable(doc: Document): RecruitRecord[] {
  const records: RecruitRecord[] = [];
  for (const table of doc.querySelectorAll('table')) {
    const rows = Array.from(table.querySelectorAll('tr'));
    if (!rows.length || !/접수기간/.test(textOf(rows[0])) || !/모집분야/.test(textOf(rows[0]))) continue;
    let lastSection = '';
    for (let i = 1; i < rows.length; i++) {
      const cells = Array.from(rows[i].querySelectorAll('th,td'));
      if (cells.length < 2) continue;
      const raw = cells.map(textOf);
      const dateIndex = raw.findIndex((v) => !!rangeFromText(v));
      if (dateIndex < 0) continue;
      const range = rangeFromText(raw[dateIndex])!;
      const heading = raw.slice(0, dateIndex).filter((x) => !/^\d+$/.test(x.replace(/,/g, '')) && !dateTokens(x).length);
      const label = heading.join(' ').trim() || lastSection;
      if (!label || !/(?:병|공군|해군|해병대)/.test(label)) continue;
      lastSection = label;
      const r = record({ ...range, label, title: `${label} · 이달의 모집계획`, url: RECRUIT_INDEX_URL, specialties: kinds(label), source: '이달의 모집계획' });
      if (r) records.push(r);
    }
  }
  return records;
}

interface BoardLink { id: string; title: string; url: string; }

function boardLinks(doc: Document): BoardLink[] {
  const out: BoardLink[] = [];
  for (const link of doc.querySelectorAll('a')) {
    const name = textOf(link);
    if (!name || !/(?:모집|어학병|기술행정병|전문특기병|기술병)/.test(name)) continue;
    let href = link.getAttribute('href') || '';
    if (!href.includes('boardView.do')) {
      const oc = link.getAttribute('onclick') || '';
      const no = oc.match(/(?:gsgeul_no|goView|boardView)[^\d]*(\d{5,})/i);
      if (no) href = `/board/boardView.do?gesipan_id=93&gsgeul_no=${no[1]}&mc=usr0000150`;
    }
    let url: URL;
    try { url = new URL(href, 'https://www.mma.go.kr'); } catch { continue; }
    if (url.origin !== 'https://www.mma.go.kr' || url.pathname !== '/board/boardView.do' || !url.searchParams.get('gsgeul_no')) continue;
    const k = url.searchParams.get('gsgeul_no')!;
    if (!out.some((a) => a.id === k)) out.push({ id: k, title: name, url: url.href });
  }
  return out;
}

function notice(doc: Document, meta: BoardLink): RecruitRecord[] {
  const title = (doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || meta.title || '').split('|')[0].trim() || meta.title;
  let content = doc.body?.textContent || '';
  const idx = content.lastIndexOf(title);
  if (idx >= 0) content = content.slice(idx + title.length, idx + 23000);
  content = content.split('병무민원상담')[0].split('첨부파일')[0].replace(/ /g, ' ');
  // 공고 하나에 1·2차 접수기간이 함께 있을 수 있어 모두 모은다.
  const windows: { startsAt: string; endsAt: string }[] = [];
  const add = (range: { startsAt: string; endsAt: string } | null) => {
    if (range && !windows.some((r) => r.startsAt === range.startsAt && r.endsAt === range.endsAt)) windows.push(range);
  };
  for (const candidate of content.matchAll(/(?:지원서\s*)?접수\s*(?:기간|일정)?\s*[:：]?/g)) {
    const at = candidate.index ?? 0;
    add(rangeFromText(content.slice(at, Math.min(content.length, at + 250))));
  }
  // 접수기간이 일정 표 안에만 있는 공고도 있다.
  for (const table of doc.querySelectorAll('table')) {
    const rows = Array.from(table.querySelectorAll('tr'));
    if (!rows.slice(0, 3).some((row) => /접수기간|지원서 접수/.test(textOf(row)))) continue;
    for (const row of rows) {
      for (const cell of Array.from(row.querySelectorAll('th,td')).map(textOf)) add(rangeFromText(cell));
    }
  }
  if (!windows.length) return [];
  const intro = content.slice(0, Math.min(content.indexOf('접수') >= 0 ? content.indexOf('접수') : content.length, 6000));
  const specialties = kinds(intro);
  const label = specialties.length === 1 ? specialties[0] : title;
  return windows
    .map((range, i) => record({
      ...range, label,
      title: windows.length > 1 ? `${title} · 접수 ${i + 1}회차` : title,
      url: meta.url, specialties, source: '육군 모집계획 공고',
    }))
    .filter((r): r is RecruitRecord => r !== null);
}

function unique(items: RecruitRecord[]): RecruitRecord[] {
  const set = new Set<string>();
  return items
    .filter((item) => {
      const key = `${item.startsAt}|${item.endsAt}|${norm(item.title || item.label)}`;
      if (set.has(key)) return false;
      set.add(key);
      return true;
    })
    .sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
}

async function fetchDoc(url: string): Promise<Document> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 12000);
  try {
    const response = await fetch(url, { method: 'GET', credentials: 'omit', signal: ctrl.signal, cache: 'no-store' });
    if (!response.ok) throw Error(`병무청 ${response.status}`);
    const html = await response.text();
    if (!html.includes('병무청') || html.length < 300) throw Error('응답 형식이 올바르지 않음');
    return new DOMParser().parseFromString(html, 'text/html');
  } finally {
    window.clearTimeout(timer);
  }
}

let refreshing: Promise<{ updated: boolean; reason?: string; count?: number }> | null = null;

/** 병무청 누리집(www.mma.go.kr)에서만 공식 일정을 다시 읽는다(같은 출처 요청). 6시간 안에 읽었으면 건너뜀. */
export async function refreshRecruit(force = false): Promise<{ updated: boolean; reason?: string; count?: number }> {
  if (location.hostname !== 'www.mma.go.kr') return { updated: false, reason: 'site' };
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const cached = (await chrome.storage.local.get(RECRUIT_KEY))[RECRUIT_KEY] as RecruitCache | undefined;
    if (!force && cached?.checkedAt && Date.now() - cached.checkedAt < RECRUIT_REFRESH_MS) return { updated: false, reason: 'fresh' };
    const records: RecruitRecord[] = [];
    records.push(...mainTable(await fetchDoc(RECRUIT_INDEX_URL)));
    const links = boardLinks(await fetchDoc(RECRUIT_BOARD_URL)).slice(0, 22);
    for (const group of [links.slice(0, 8), links.slice(8, 16), links.slice(16, 22)]) {
      await Promise.all(group.map(async (link) => {
        try { records.push(...notice(await fetchDoc(link.url), link)); } catch { /* 공고 하나 실패는 건너뜀 */ }
      }));
    }
    const cleaned = unique(records);
    if (cleaned.length === 0) throw Error('공식 일정에서 접수기간을 찾지 못했습니다.');
    const result: RecruitCache = { checkedAt: Date.now(), records: cleaned, source: '병무청 이달의 모집계획 및 육군 모집계획' };
    await chrome.storage.local.set({ [RECRUIT_KEY]: result });
    return { updated: true, count: cleaned.length };
  })().finally(() => { refreshing = null; });
  return refreshing;
}

export function recruitForRole(cache: RecruitCache | null, role: string): RecruitRecord[] {
  const list = Array.isArray(cache?.records) ? cache!.records : [];
  return list
    .filter((item) => relevant(role, item))
    .filter((item) => Date.parse(item.endsAt) > Date.now())
    .sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
}

export function recruitBadge(item: RecruitRecord | null): string {
  if (!item) return '발표 대기';
  return Date.now() < Date.parse(item.startsAt) ? '접수 예정' : '접수 중';
}

export function recruitDateText(iso: string): string {
  if (!iso) return '';
  return `${iso.slice(0, 10).replace(/-/g, '.')} ${iso.slice(11, 16)}`;
}

export function recruitMonthLabel(item: RecruitRecord | null): string {
  if (!item) return '';
  const s = item.startsAt.slice(0, 7), e = item.endsAt.slice(0, 7);
  if (s === e) return `${s.slice(0, 4)}년 ${Number(s.slice(5))}월 접수`;
  return `${s.slice(0, 4)}년 ${Number(s.slice(5))}월 ~ ${e.slice(0, 4)}년 ${Number(e.slice(5))}월 접수`;
}
