// 병무민원 세부 화면 공통 틀 — 글 배치("가독성 좋게, 빠뜨리는 내용 없이").
// 원본 글은 지우거나 순서를 바꾸지 않고, 모양을 정할 표시(data-bmgj-page)만 단다. 예외는 "항목명 : 값"의
// 항목명과 "첫째, 둘째…"의 순서말을 감싸는 <span> 뿐이며 글자는 그대로라 원래 화면으로 돌려도 똑같이 보인다.
// 표시에 따른 모양은 frame.css(html.bmgj-page-frame 아래에서만 적용).

const NOTE_TITLE = /유의사항|주의사항|기타사항|참고사항|알려드립니다|안내사항/;
const PHONE = /\d{2,4}-\d{3,4}-\d{4}/;
const SENTENCE_END = /(다|요|함|음|것)[.)\]]*\s*$/;
const LINK_WORDS = /바로가기|다운로드|내려받기|여기|보기|영상|체험/;
const LABEL = /^(\s*)([^:：]{2,16}?)(\s*[:：]\s*)/;
const ORDINAL = /^(\s*)(첫째|둘째|셋째|넷째|다섯째|여섯째|일곱째|여덟째|아홉째|열째)(\s*[,，.]\s*)/;

export const clean = (text: string) => text.replace(/\s+/g, ' ').trim();

// 프레임 문서의 요소는 다른 실행 환경의 객체라 instanceof HTMLElement 가 항상 거짓이다 → nodeType 으로 본다.
const isEl = (node: Node | null): node is HTMLElement => !!node && node.nodeType === Node.ELEMENT_NODE;

const nestedList = (li: Element) => li.querySelector(':scope > ul, :scope > ol');

/** li 의 머리글: 하위 목록과 첫 줄바꿈(<br>) 앞까지의 글자. */
function headText(li: Element): string {
  let text = '';
  for (const node of li.childNodes) {
    if (isEl(node) && (node.tagName === 'UL' || node.tagName === 'OL' || node.tagName === 'BR')) break;
    text += node.textContent ?? '';
  }
  return clean(text);
}

/** li 안의 첫 번째 글자 조각(공백만 있는 조각은 건너뜀). */
function firstText(li: Element): Text | null {
  const walker = li.ownerDocument.createTreeWalker(li, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node && !node.data.trim()) node = walker.nextNode() as Text | null;
  return node;
}

/** 첫 글자 조각의 앞부분(match[0])을 [앞 공백][꼬리표 span][구분 span][나머지]로 나눈다. 글자는 그대로. */
function splitHead(node: Text, match: RegExpExecArray, kind: string): void {
  const doc = node.ownerDocument;
  const [, lead, word, sep] = match;
  const wordEl = doc.createElement('span');
  wordEl.dataset.bmgjPage = kind;
  wordEl.textContent = word;
  const sepEl = doc.createElement('span');
  sepEl.dataset.bmgjPage = 'colon';
  sepEl.textContent = sep;
  const parts: Node[] = [];
  if (lead) parts.push(doc.createTextNode(lead));
  parts.push(wordEl, sepEl);
  const rest = node.data.slice(match[0].length);
  if (rest) parts.push(doc.createTextNode(rest));
  node.replaceWith(...parts);
}

function findLabel(li: Element): { node: Text; match: RegExpExecArray } | null {
  const node = firstText(li);
  if (!node) return null;
  const match = LABEL.exec(node.data);
  if (!match || /[.。]$/.test(match[2])) return null;
  return { node, match };
}

const isFactCandidate = (li: Element) =>
  li.tagName === 'LI' && !nestedList(li) && headText(li).length <= 200
  && (!!li.querySelector('[data-bmgj-page="label"]') || !!findLabel(li));

/** "항목명 : 값" 이면 항목명을 꼬리표로. */
function markLabel(li: Element): boolean {
  if (li.querySelector('[data-bmgj-page="label"]')) return true;
  const found = findLabel(li);
  if (!found) return false;
  splitHead(found.node, found.match, 'label');
  return true;
}

/** 글자색이 원본에서 빨강·파랑으로 강조된 곳을 표시해 개선 화면의 색으로 바꿔 칠한다. */
function markTones(root: HTMLElement): void {
  const view = root.ownerDocument.defaultView;
  if (!view) return;
  for (const el of root.querySelectorAll<HTMLElement>('span, font, strong, b, em, p, a, li, td, u')) {
    const inline = el.getAttribute('style') ?? '';
    const named = el.tagName === 'FONT' ? el.getAttribute('color') ?? '' : '';
    const own = /color/i.test(inline) || named || el.classList.contains('em_red') || el.classList.contains('em_blue');
    if (!own) continue;
    const m = /rgb\((\d+), (\d+), (\d+)\)/.exec(view.getComputedStyle(el).color);
    if (!m) continue;
    const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (r > 150 && g < 110 && b < 110) el.dataset.bmgjPageTone = 'red';
    else if (b > 130 && r < 110 && g < 140) el.dataset.bmgjPageTone = 'blue';
  }
}

/** "첫째, … 둘째, …" 목록 → 순서 꼬리표가 붙은 단계 목록. "첫째" 글자를 꼬리표로 쓰므로 글은 그대로. */
function markSteps(root: HTMLElement): void {
  for (const list of root.querySelectorAll<HTMLElement>('ul, ol')) {
    const items = [...list.children].filter((el) => el.tagName === 'LI');
    const starts = items.filter((li) => ORDINAL.test(headText(li)));
    if (starts.length < 2) continue;
    list.dataset.bmgjPage = 'steps';
    for (const li of starts) {
      if (li.querySelector('[data-bmgj-page="step-no"]')) continue;
      const node = firstText(li);
      const m = node ? ORDINAL.exec(node.data) : null;
      if (!node || !m) continue;
      splitHead(node, m, 'step-no');
      (li as HTMLElement).dataset.bmgjPage = 'step';
    }
  }
}

export function enhanceLayout(doc: Document): void {
  const root = doc.getElementById('contents');
  if (!root || root.dataset.bmgjPageLayout === 'done') return;
  root.dataset.bmgjPageLayout = 'done';

  markTones(root);

  // 짧은 제목 + 하위 목록 = 묶음 상자(위아래로만 쌓음, 사용자 결정 2026-11-23).
  // "항목명 : 값" = 항목명 꼬리표. 맨 위 목록은 그 줄만, 하위 목록은 같은 목록의 모든 줄이 그 꼴일 때만
  // (한 목록 안에서 어떤 줄만 꼬리표가 붙어 들쭉날쭉해 보이지 않게).
  const factLis: Element[] = [];
  for (const li of root.querySelectorAll<HTMLLIElement>('li')) {
    const head = headText(li);
    if (nestedList(li)) {
      if (head && head.length <= 60 && !SENTENCE_END.test(head)) li.dataset.bmgjPage = 'group';
      continue;
    }
    if (!isFactCandidate(li)) continue;
    const topLevel = !li.parentElement?.closest('li');
    const siblings = [...(li.parentElement?.children ?? [])].filter((el) => el.tagName === 'LI');
    if (topLevel || siblings.every(isFactCandidate)) factLis.push(li);
  }
  for (const li of factLis) if (markLabel(li)) (li as HTMLElement).dataset.bmgjPage = 'fact';

  // 연락처 목록(모든 항목에 전화번호)은 표처럼 줄을 맞춘다.
  for (const list of root.querySelectorAll<HTMLElement>('ul, ol')) {
    const items = [...list.children].filter((el) => el.tagName === 'LI');
    if (items.length >= 2 && items.every((li) => PHONE.test(li.textContent ?? '') && !nestedList(li))) {
      list.dataset.bmgjPage = 'contacts';
      for (const li of items) li.removeAttribute('data-bmgj-page');
      for (const el of list.querySelectorAll('[data-bmgj-page="label"], [data-bmgj-page="colon"]')) el.removeAttribute('data-bmgj-page');
    }
  }

  // 유의사항·기타사항 구역은 안내 상자로. 한 구역에 제목이 여러 개면(예: 변경 시 유의사항 + 변경 방법) 묶지 않는다.
  for (const box of root.querySelectorAll<HTMLElement>('.layout_h3, .h4_wrap')) {
    const titles = box.querySelectorAll(':scope > h3, :scope > h4');
    if (titles.length !== 1) continue;
    if (NOTE_TITLE.test(clean(titles[0].textContent ?? ''))) box.dataset.bmgjPage = 'note';
  }

  markSteps(root);

  // 버튼만 있는 목록 항목은 글머리표 없이.
  for (const li of root.querySelectorAll<HTMLLIElement>('li')) {
    const button = li.querySelector('span.button');
    if (button && clean(li.textContent ?? '') === clean(button.textContent ?? '')) li.dataset.bmgjPage = 'button-only';
  }

  // 바로가기·내려받기 같은 링크는 누를 수 있는 꼬리표로.
  for (const a of root.querySelectorAll<HTMLAnchorElement>('a')) {
    if (a.closest('span.button')) continue;
    if (LINK_WORDS.test(a.textContent ?? '') || LINK_WORDS.test(a.closest('li')?.textContent?.slice(-12) ?? '')) a.dataset.bmgjPage = 'chip';
  }

  // 입력칸이 있는 표는 "입력하는 곳"으로 눈에 띄게.
  for (const table of root.querySelectorAll<HTMLTableElement>('table')) {
    if (table.querySelector('select, textarea, input:not([type="hidden"])')) table.dataset.bmgjPage = 'form';
  }

  // 제출 확인 문구 + 버튼.
  for (const p of root.querySelectorAll<HTMLParagraphElement>('p.text_center')) {
    if (!p.querySelector('span.button')) continue;
    p.dataset.bmgjPage = 'action';
    const prev = p.previousElementSibling;
    if (isEl(prev) && prev.matches('p.text_center') && !prev.querySelector('span.button') && clean(prev.textContent ?? '')) {
      prev.dataset.bmgjPage = 'action-q';
      p.dataset.bmgjPage = 'action-btn';
    }
  }
}
