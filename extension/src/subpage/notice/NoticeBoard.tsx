// 모집 공지사항 새 목록(A-M06, 사용자 결정 2026-11-24).
// 군별 게시판 5개를 한 목록으로 합치고, 잘린 제목 복원·같은 글 한 번만·군/분야 필터·접수 마감 D-Day를 보여 준다.
import { Paperclip } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { countdown } from '../../profile/profile';
import { LIST_PAGE_UNIT, NOTICE_BOARDS, boardListUrl, boardViewUrl, type NoticeBoardDef } from './boards';
import { NOTICE_FIELDS, fieldsOf } from './fields';
import {
  detailKey, detailMatches, loadBoards, loadDetails, loadDetailsCache, mergeRows, rowsNeedingDetail,
  type DetailsCache,
} from './noticeStore';
import type { ApplyPeriod, NoticeRow } from './readBoard';

const PAGE_SIZE = 20;

interface NoticeBoardProps {
  board: NoticeBoardDef;          // 지금 열린 게시판
  currentRows: NoticeRow[] | null; // 지금 화면의 원본 목록
  onShowOriginalList: () => void;
}

type StatusKind = 'upcoming' | 'open' | 'closed';
interface Status { kind: StatusKind; label: string; detail: string; }

function shortDate(iso: string): string {
  const [, m, d] = iso.slice(0, 10).split('-').map(Number);
  const time = iso.slice(11, 16);
  return `${m}/${d}${time && time !== '00:00' && time !== '23:59' ? ` ${time}` : ''}`;
}

function applyStatus(apply: ApplyPeriod, now: number): Status {
  const start = Date.parse(apply.startsAt);
  const end = Date.parse(apply.endsAt);
  const range = `접수 ${shortDate(apply.startsAt)} ~ ${shortDate(apply.endsAt)}`;
  if (now < start) {
    const { days } = countdown(apply.startsAt.slice(0, 10));
    return { kind: 'upcoming', label: days > 0 ? `접수 D-${days}` : '오늘 접수 시작', detail: range };
  }
  if (now <= end) {
    const { days } = countdown(apply.endsAt.slice(0, 10));
    return { kind: 'open', label: days > 0 ? `마감 D-${days}` : '오늘 마감', detail: range };
  }
  return { kind: 'closed', label: '접수 마감', detail: range };
}

const boardLabel = (id: string) => NOTICE_BOARDS.find((b) => b.id === id)?.label ?? '';

interface Item { row: NoticeRow; title: string; restored: boolean; fields: string[]; status: Status | null; }

export function NoticeBoard({ board, currentRows, onShowOriginalList }: NoticeBoardProps) {
  const [boards, setBoards] = useState<Record<string, NoticeRow[]>>(() => (currentRows ? { [board.id]: currentRows } : {}));
  const [failed, setFailed] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<DetailsCache>({});
  const [detailsReady, setDetailsReady] = useState(false);
  // 육군 게시판(카드가 여는 곳)은 전체로, 다른 군 게시판으로 들어왔으면 그 군을 먼저 보여 준다.
  const [branch, setBranch] = useState<string>(board.id === NOTICE_BOARDS[0].id ? 'all' : board.id);
  const [field, setField] = useState<string>('all');
  const [openOnly, setOpenOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const requested = useRef(new Set<string>());

  useEffect(() => {
    let alive = true;
    void loadBoards({ board, rows: currentRows }, (update) => {
      if (!alive) return;
      setBoards(update.boards);
      setFailed(update.failed);
      setLoading(update.loading);
    });
    void loadDetailsCache().then((cache) => {
      if (!alive) return;
      setDetails((prev) => ({ ...cache, ...prev }));
      setDetailsReady(true);
    });
    return () => { alive = false; };
  }, [board, currentRows]);

  const rows = useMemo(
    () => mergeRows(...Object.values(boards)).sort((a, b) => b.date.localeCompare(a.date) || Number(b.postNo) - Number(a.postNo)),
    [boards],
  );

  // 잘린 제목·최근 모집 안내의 글 보기 화면을 읽는다(같은 글은 한 번만 요청).
  useEffect(() => {
    if (!detailsReady || loading) return;
    const need = rowsNeedingDetail(rows, details).filter((row) => !requested.current.has(detailKey(row)));
    if (need.length === 0) return;
    need.forEach((row) => requested.current.add(detailKey(row)));
    void loadDetails(need, details, (key, detail) => setDetails((prev) => ({ ...prev, [key]: detail })));
    // details는 결과를 받을 때마다 바뀌므로 의존성에서 뺀다(requested로 중복 요청을 막음).
  }, [rows, detailsReady, loading]);

  const now = Date.now();
  const items: Item[] = useMemo(() => rows.map((row) => {
    const stored = details[detailKey(row)];
    const detail = detailMatches(row, stored) ? stored : null;
    const title = detail?.title ?? row.title;
    return {
      row,
      title,
      restored: Boolean(detail && row.truncated),
      fields: fieldsOf(title),
      status: detail?.apply ? applyStatus(detail.apply, now) : null,
    };
    // now는 렌더마다 바뀌지만 분 단위 표시라 rows·details가 바뀔 때만 다시 계산해도 충분하다.
  }), [rows, details]);

  const inBranch = items.filter((item) => branch === 'all' || item.row.boardId === branch);
  const filtered = inBranch.filter((item) =>
    (field === 'all' || item.fields.includes(field))
    && (!openOnly || item.status?.kind === 'open' || item.status?.kind === 'upcoming'));
  const shown = filtered.slice(0, limit);

  const fieldCounts = new Map(NOTICE_FIELDS.map((f) => [f.id, inBranch.filter((i) => i.fields.includes(f.id)).length]));
  const visibleFields = NOTICE_FIELDS.filter((f) => (fieldCounts.get(f.id) ?? 0) > 0 || f.id === field);

  const pick = <T,>(set: (v: T) => void) => (value: T) => {
    set(value);
    setLimit(PAGE_SIZE);
  };
  const chooseBranch = pick(setBranch);
  const chooseField = pick(setField);

  const failedBoards = NOTICE_BOARDS.filter((b) => failed.includes(b.id));

  return (
    // 페이지 제목(모집 공지사항)은 위쪽 h1에 있으므로 여기서는 설명만 둔다.
    <section className="bmgj-notice" aria-label="모집 공지사항 목록" tabIndex={-1}>
      <p className="bmgj-notice-desc">
        육군·해군·해병대·공군·취업맞춤특기병 공지를 한곳에 모았어요. 잘린 제목은 전체 제목으로 바꾸고, 같은 글은 한 번만 보여 줘요.
      </p>

      <div className="bmgj-filter">
        <span className="bmgj-filter-name" id="bmgj-filter-branch">군</span>
        <div className="bmgj-chips" role="group" aria-labelledby="bmgj-filter-branch">
          <Chip pressed={branch === 'all'} onClick={() => chooseBranch('all')} count={items.length}>전체</Chip>
          {NOTICE_BOARDS.map((b) => (
            <Chip key={b.id} pressed={branch === b.id} onClick={() => chooseBranch(b.id)}
              count={items.filter((i) => i.row.boardId === b.id).length}>
              {b.label}
            </Chip>
          ))}
        </div>
      </div>
      {visibleFields.length > 0 && (
        <div className="bmgj-filter">
          <span className="bmgj-filter-name" id="bmgj-filter-field">분야</span>
          <div className="bmgj-chips" role="group" aria-labelledby="bmgj-filter-field">
            <Chip pressed={field === 'all'} onClick={() => chooseField('all')}>전체</Chip>
            {visibleFields.map((f) => (
              <Chip key={f.id} pressed={field === f.id} onClick={() => chooseField(f.id)} count={fieldCounts.get(f.id) ?? 0}>
                {f.label}
              </Chip>
            ))}
          </div>
        </div>
      )}
      <div className="bmgj-notice-bar">
        <label className="bmgj-check">
          <input type="checkbox" checked={openOnly} onChange={(e) => { setOpenOnly(e.target.checked); setLimit(PAGE_SIZE); }} />
          접수 중·접수 예정인 모집만
        </label>
        <p className="bmgj-notice-count" role="status">
          {loading ? '다른 군 게시판을 불러오는 중이에요…' : `글 ${filtered.length}개`}
        </p>
      </div>

      {failedBoards.length > 0 && (
        <p className="bmgj-notice-error">
          {failedBoards.map((b) => b.label).join('·')} 게시판을 불러오지 못했어요.{' '}
          {failedBoards.map((b) => (
            <a key={b.id} className="bmgj-notice-error-link" href={boardListUrl(b, 10)}>{b.label} 게시판에서 보기</a>
          ))}
        </p>
      )}

      {shown.length > 0 ? (
        <ul className="bmgj-notice-list">
          {shown.map((item) => <NoticeItem key={detailKey(item.row)} item={item} />)}
        </ul>
      ) : (
        <p className="bmgj-notice-empty">{loading ? '목록을 불러오는 중이에요.' : '조건에 맞는 글이 없어요. 필터를 바꿔 보세요.'}</p>
      )}

      {filtered.length > shown.length && (
        <div className="bmgj-more-wrap">
          <button type="button" className="bmgj-more" onClick={() => setLimit((n) => n + PAGE_SIZE)}>
            더보기 ({filtered.length - shown.length}개) <span aria-hidden="true">▾</span>
          </button>
        </div>
      )}

      <div className="bmgj-strip">
        <span>각 게시판의 최근 글 {LIST_PAGE_UNIT}개씩 모았어요. 이전 글 검색은 원래 목록에서 할 수 있어요.</span>
        <button type="button" className="bmgj-strip-link" onClick={onShowOriginalList}>
          {board.label} 게시판 원래 목록 보기 <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function Chip({ pressed, onClick, count, children }: { pressed: boolean; onClick: () => void; count?: number; children: string }) {
  return (
    <button type="button" className="bmgj-chip" aria-pressed={pressed} onClick={onClick}>
      {children}
      {count !== undefined && <span className="bmgj-chip-count">{count}</span>}
    </button>
  );
}

function NoticeItem({ item }: { item: Item }) {
  const { row, status } = item;
  const board = NOTICE_BOARDS.find((b) => b.id === row.boardId);
  if (!board) return null;
  return (
    <li>
      {/* 제목은 React 텍스트로만 넣는다(innerHTML 사용 안 함). */}
      <a className="bmgj-notice-row" href={boardViewUrl(board, row.postNo)}>
        <span className="bmgj-notice-main">
          <span className="bmgj-notice-badges">
            {/* 원본의 고정(공지) 표시는 최근 글 대부분에 붙어 있어 구분이 되지 않으므로 보여 주지 않는다. */}
            <span className="bmgj-notice-board">{boardLabel(row.boardId)}</span>
          </span>
          <span className="bmgj-notice-title">
            {item.title}
            {row.truncated && !item.restored && <span aria-label="(제목 일부)">…</span>}
          </span>
          <span className="bmgj-notice-meta">
            <span>{row.date}</span>
            {row.views !== null && <span>조회 {row.views.toLocaleString('ko-KR')}</span>}
            {row.attachment && (
              <span className="bmgj-notice-file">
                <Paperclip size={13} strokeWidth={1.75} aria-hidden="true" />첨부
              </span>
            )}
            {status && <span>{status.detail}</span>}
          </span>
        </span>
        {status && <span className={`bmgj-dday bmgj-dday--${status.kind}`}>{status.label}</span>}
      </a>
    </li>
  );
}
