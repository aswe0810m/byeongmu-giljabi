// 3.5 소식 패널: 원본 메인에 이미 있는 목록(#tab2c1, #tab2c3)을 읽는다. 네트워크 요청 없음.
import { SITE_ORIGIN } from '../catalog/cards';

export interface NewsItem {
  title: string;
  href: string; // 절대 주소(https://www.mma.go.kr/...)
  date: string; // YYYY-MM-DD
}

/** null = 목록을 못 찾았거나 쓸 수 있는 항목이 없음. */
export interface NewsData {
  notices: NewsItem[] | null;  // 공지사항 앞 2개
  policies: NewsItem[] | null; // 달라지는 제도 앞 1개
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function readItem(li: Element): NewsItem | null {
  const anchor = li.querySelector('a[href]');
  if (!anchor) return null;
  const title = (anchor.getAttribute('title') || anchor.textContent || '').replace(/\s+/g, ' ').trim();
  const date = (li.querySelector('span')?.textContent || '').trim();
  let url: URL;
  try {
    url = new URL(anchor.getAttribute('href') || '', location.href);
  } catch {
    return null;
  }
  if (!title || !DATE_RE.test(date) || url.origin !== SITE_ORIGIN) return null;
  return { title, href: url.href, date };
}

function readList(listId: string, count: number): NewsItem[] | null {
  const list = document.getElementById(listId);
  if (!list) return null;
  const items: NewsItem[] = [];
  for (const li of list.querySelectorAll('li')) {
    const item = readItem(li);
    if (item) items.push(item);
    if (items.length === count) break;
  }
  return items.length > 0 ? items : null;
}

export function readNews(): NewsData {
  return { notices: readList('tab2c1', 2), policies: readList('tab2c3', 1) };
}
