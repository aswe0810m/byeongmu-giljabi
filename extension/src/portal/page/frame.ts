// 병무민원 세부 화면 공통 틀 — 프레임(원본 화면) 꾸미기.
// 바깥 틀(최상위 문서)에서 같은 출처 프레임 문서에 스타일 한 장과 클래스 하나만 넣고 뺀다.
// 원본 요소·스크립트·입력값은 건드리지 않는다(신청·변경·취소 동작은 원본 그대로).

import { frameDocument } from '../portalDom';
import frameCss from './frame.css?inline';
import { enhanceLayout } from './layout';
import type { PortalPage } from './registry';

const STYLE_ID = 'bmgj-page-frame-style';
export const FRAME_CLASS = 'bmgj-page-frame';
/** 원본 바깥 틀의 frameReLoad()가 프레임 높이에 더하는 값. */
export const ORIGINAL_EXTRA = 100;

/** 포털 왼쪽 메뉴에서 선택된 항목(li.on)의 menuNo들. 바깥쪽 → 안쪽 순서. */
export function activeMenuNos(frame: HTMLIFrameElement): string[] {
  const doc = frameDocument(frame);
  if (!doc || doc.readyState === 'loading') return [];
  return [...doc.querySelectorAll<HTMLLIElement>('#leftMenu li.on')]
    .map((li) => li.id)
    .filter((id) => /^\d+$/.test(id));
}

/** 공통 꾸밈 + 그 카드만의 꾸밈을 넣는다. 실패하면 넣은 것을 모두 빼고 false. */
export function applyPageFrame(frame: HTMLIFrameElement, page: PortalPage): boolean {
  const doc = frameDocument(frame);
  if (!doc?.head) return false;
  try {
    if (!doc.getElementById(STYLE_ID)) {
      const style = doc.createElement('style');
      style.id = STYLE_ID;
      // 포털 글꼴(Pretendard GOV)은 문서마다 등록해야 해서 프레임에도 넣는다(main.tsx 의 ensurePortalFont 와 같은 파일).
      const font = chrome.runtime.getURL('fonts/PretendardGOV-Medium.subset.woff2');
      style.textContent = [
        `@font-face{font-family:"Pretendard GOV";src:url("${font}") format("woff2");font-display:swap;}`,
        frameCss,
        page.entry.frameCss ?? '',
      ].join('\n');
      doc.head.append(style);
    }
    doc.documentElement.classList.add(FRAME_CLASS);
    unlockFrameWidth(frame);
    enhanceLayout(doc);
    page.entry.enhance?.(doc);
    return true;
  } catch (error) {
    console.error('[bmgj] portal page frame failed', page.entry.card.id, error);
    removePageFrame(frame);
    return false;
  }
}

/**
 * 원본 포털 CSS가 프레임에 min-width: 1000px를 걸어 두어 좁은 화면에서 가로로 넘친다(디자인 통일 2026-11-26 확인).
 * 공통 틀이 켜진 동안만 풀어 준다. 프레임의 style 속성은 첫 화면 코드(portalDom의 hideFrame/restoreFrame)가
 * 통째로 저장·복원하므로 건드리지 않고, 클래스 + 바깥 문서 CSS로 푼다.
 */
const WIDE_CLASS = 'bmgj-page-frame-fluid';
const OUTER_STYLE_ID = 'bmgj-page-outer-style';
function unlockFrameWidth(frame: HTMLIFrameElement): void {
  if (!document.getElementById(OUTER_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = OUTER_STYLE_ID;
    style.textContent = `iframe.${WIDE_CLASS}{min-width:0 !important;}`;
    (document.head ?? document.documentElement).append(style);
  }
  frame.classList.add(WIDE_CLASS);
}
function restoreFrameWidth(frame: HTMLIFrameElement): void {
  frame.classList.remove(WIDE_CLASS);
}

export function removePageFrame(frame: HTMLIFrameElement): void {
  restoreFrameWidth(frame);
  const doc = frameDocument(frame);
  if (!doc) return;
  doc.getElementById(STYLE_ID)?.remove();
  doc.documentElement.classList.remove(FRAME_CLASS);
}

export function hasPageFrame(frame: HTMLIFrameElement): boolean {
  return !!frameDocument(frame)?.documentElement.classList.contains(FRAME_CLASS);
}

/**
 * 프레임 높이를 내용에 맞춘다. 원본 바깥 틀의 frameReLoad()와 같은 방식(height=0 → body.scrollHeight)이고,
 * 원본은 +100px, 공통 틀은 패널 아래 여백이 CSS 에 있으므로 +0.
 */
export function fitFrame(frame: HTMLIFrameElement, extra: number): void {
  const doc = frameDocument(frame);
  if (!doc?.body) return;
  frame.height = '0';
  // +2: 소수점 높이 때문에 프레임 안에 스크롤 막대가 생기지 않게
  frame.height = String(doc.body.scrollHeight + extra + 2);
}
