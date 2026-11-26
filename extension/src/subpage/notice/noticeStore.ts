// 모집 공지사항 데이터 읽기·저장(사용자 결정 2026-11-24).
// - 군별 게시판 목록 5개를 읽어 합친다(30분 동안은 저장해 둔 목록을 씀).
// - 제목이 잘린 글과 최근 모집 안내 글은 글 보기 화면을 읽어 전체 제목·접수기간을 얻고, 글 번호별로 저장해 다시 읽지 않는다.
// 요청은 공개 페이지 GET만, 로그인 정보 없이(credentials: 'omit'), 한 번에 2개씩. 사용자 정보는 읽거나 보내지 않는다.

import { NOTICE_BOARDS, boardListUrl, boardViewUrl, type NoticeBoardDef } from './boards';
import { readBoardList, readBoardView, type NoticeDetail, type NoticeRow } from './readBoard';

const LISTS_KEY = 'bmgj.noticeLists.v1';
const DETAILS_KEY = 'bmgj.noticeDetails.v1';
const LISTS_TTL_MS = 30 * 60 * 1000;
const DETAILS_MAX = 400;
/** 한 번 방문에 새로 읽는 글 보기 화면 수의 상한 */
const DETAILS_PER_VISIT = 30;
/** 접수기간을 찾아볼 모집 안내 글: 최근 이 기간 안에 올라온 글 */
const RECRUIT_RECENT_DAYS = 45;
const RECRUIT_DETAIL_TTL_MS = 24 * 60 * 60 * 1000;
const CONCURRENCY = 2;

interface ListsCache { checkedAt: number; boards: Record<string, NoticeRow[]>; }
export interface StoredDetail extends NoticeDetail { checkedAt: number; }
export type DetailsCache = Record<string, StoredDetail>;

export const detailKey = (row: Pick<NoticeRow, 'boardId' | 'postNo'>) => `${row.boardId}:${row.postNo}`;

async function storageGet<T>(key: string): Promise<T | null> {
  try {
    return ((await chrome.storage.local.get(key))[key] as T | undefined) ?? null;
  } catch {
    return null;
  }
}

async function storageSet(key: string, value: unknown): Promise<void> {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch { /* 저장 실패해도 화면에는 영향 없음 */ }
}

async function fetchDoc(url: string): Promise<Document> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 12000);
  try {
    const response = await fetch(url, { method: 'GET', credentials: 'omit', signal: ctrl.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return new DOMParser().parseFromString(await response.text(), 'text/html');
  } finally {
    window.clearTimeout(timer);
  }
}

/** 작업 목록을 한 번에 limit개씩 실행한다. */
async function runLimited<T>(items: T[], limit: number, task: (item: T) => Promise<void>): Promise<void> {
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const item = items[next++];
      await task(item);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

export interface BoardsUpdate {
  boards: Record<string, NoticeRow[]>;
  failed: string[];  // 읽지 못한 게시판 ID
  loading: boolean;
}

/**
 * 군별 게시판 목록. 지금 열린 게시판은 화면의 목록(current)을 바로 쓰고, 나머지는 저장값 또는 새로 읽은 값.
 * 게시판 하나를 읽을 때마다 onUpdate로 알린다.
 */
export async function loadBoards(
  current: { board: NoticeBoardDef; rows: NoticeRow[] | null },
  onUpdate: (update: BoardsUpdate) => void,
): Promise<void> {
  const boards: Record<string, NoticeRow[]> = {};
  const failed = new Set<string>();
  if (current.rows) boards[current.board.id] = current.rows;

  const cache = await storageGet<ListsCache>(LISTS_KEY);
  const fresh = cache && Date.now() - cache.checkedAt < LISTS_TTL_MS && cache.boards;
  if (fresh) {
    for (const board of NOTICE_BOARDS) {
      const cached = cache.boards[board.id];
      if (!Array.isArray(cached)) continue;
      boards[board.id] = board.id === current.board.id && current.rows ? mergeRows(current.rows, cached) : cached;
    }
  }
  const missing = NOTICE_BOARDS.filter((b) => !fresh || !Array.isArray(cache.boards[b.id]));
  onUpdate({ boards: { ...boards }, failed: [], loading: missing.length > 0 });
  if (missing.length === 0) return;

  const fetched: Record<string, NoticeRow[]> = fresh ? { ...cache.boards } : {};
  await runLimited(missing, CONCURRENCY, async (board) => {
    try {
      const rows = readBoardList(await fetchDoc(boardListUrl(board)), board.id);
      if (!rows) throw new Error('list not found');
      fetched[board.id] = rows;
      boards[board.id] = board.id === current.board.id && current.rows ? mergeRows(current.rows, rows) : rows;
    } catch {
      if (!boards[board.id]) failed.add(board.id);
    }
    onUpdate({ boards: { ...boards }, failed: [...failed], loading: true });
  });
  onUpdate({ boards: { ...boards }, failed: [...failed], loading: false });
  // 하나라도 못 읽었으면 다음 방문에 다시 읽도록, 모두 읽었을 때만 시각을 남긴다.
  if (failed.size === 0) await storageSet(LISTS_KEY, { checkedAt: Date.now(), boards: fetched } satisfies ListsCache);
}

/** 같은 글(게시판+글 번호)은 한 번만. 고정 공지 표시는 하나라도 고정이면 유지. */
export function mergeRows(...lists: NoticeRow[][]): NoticeRow[] {
  const byKey = new Map<string, NoticeRow>();
  for (const list of lists) {
    for (const row of list) {
      const key = detailKey(row);
      const prev = byKey.get(key);
      if (!prev) byKey.set(key, row);
      else byKey.set(key, { ...prev, pinned: prev.pinned || row.pinned, truncated: prev.truncated && row.truncated });
    }
  }
  return [...byKey.values()];
}

export async function loadDetailsCache(): Promise<DetailsCache> {
  const value = await storageGet<DetailsCache>(DETAILS_KEY);
  return value && typeof value === 'object' ? value : {};
}

const squash = (text: string) => text.normalize('NFKC').replace(/\s+/g, '');

/** 저장해 둔 전체 제목이 지금 목록의 제목과 맞는지(글이 수정되면 다시 읽는다). */
export function detailMatches(row: NoticeRow, detail: StoredDetail | undefined): detail is StoredDetail {
  if (!detail) return false;
  const full = squash(detail.title);
  const shown = squash(row.title);
  return row.truncated ? full.startsWith(shown) : full === shown;
}

function looksLikeRecruit(row: NoticeRow): boolean {
  if (!/모집|접수|지원/.test(row.title)) return false;
  const posted = Date.parse(`${row.date}T00:00:00+09:00`);
  return Number.isFinite(posted) && Date.now() - posted < RECRUIT_RECENT_DAYS * 86400000;
}

/**
 * 글 보기 화면을 읽어야 하는 글: 제목이 잘렸거나 최근 모집 안내인데 저장값이 없거나 맞지 않는 것.
 * 최근 모집 안내는 접수기간이 고쳐질 수 있어 하루가 지나면 다시 읽는다. 최근 글부터.
 */
export function rowsNeedingDetail(rows: NoticeRow[], cache: DetailsCache): NoticeRow[] {
  return rows
    .filter((row) => {
      const recruit = looksLikeRecruit(row);
      if (!row.truncated && !recruit) return false;
      const stored = cache[detailKey(row)];
      if (!detailMatches(row, stored)) return true;
      return recruit && Date.now() - stored.checkedAt > RECRUIT_DETAIL_TTL_MS;
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, DETAILS_PER_VISIT);
}

/** 글 보기 화면을 읽어 저장하고, 하나씩 onDetail로 알린다. */
export async function loadDetails(
  rows: NoticeRow[],
  cache: DetailsCache,
  onDetail: (key: string, detail: StoredDetail) => void,
): Promise<void> {
  if (rows.length === 0) return;
  const next: DetailsCache = { ...cache };
  await runLimited(rows, CONCURRENCY, async (row) => {
    const board = NOTICE_BOARDS.find((b) => b.id === row.boardId);
    if (!board) return;
    try {
      const detail = readBoardView(await fetchDoc(boardViewUrl(board, row.postNo)));
      if (!detail) return;
      const stored: StoredDetail = { ...detail, checkedAt: Date.now() };
      next[detailKey(row)] = stored;
      onDetail(detailKey(row), stored);
    } catch { /* 글 하나 실패는 건너뜀(목록 제목을 그대로 보여 줌) */ }
  });
  // 오래된 것부터 지워 개수를 제한한다.
  const entries = Object.entries(next).sort((a, b) => b[1].checkedAt - a[1].checkedAt).slice(0, DETAILS_MAX);
  await storageSet(DETAILS_KEY, Object.fromEntries(entries));
}
