# 디자인 통일 — 카드를 눌러 들어간 화면 (2026-11-26)

메인 카드를 눌러 들어간 화면이 담당자마다 모양이 달라서(경로+제목 / 원본 헤더 유지 / 카드 배너) 한 가지로 맞췄다.

## 정한 모양 (사용자 결정)

```
[확장 헤더: 병무청|병무민원 · 메뉴 검색 · 그룹 · 원래 화면 보기]
‹ 병무청 첫 화면   (병무민원: ‹ 민원 첫 화면)
[카드 배너: 누른 카드와 같은 아이콘·이름·설명, 링크가 여러 개인 카드면 탭]
[흰 패널: 원본 본문을 그대로 두고 모양만 다듬음, 전체 너비]
[푸터]
```

- 색만 사이트별로 다르다: 병무청 초록, 병무민원 남색(0.4.5 결정 그대로).
- 병무청 하위 페이지의 왼쪽 메뉴는 숨긴다. 왼쪽 메뉴의 링크 대부분이 아직 새 화면이 없는 페이지라, 누르면 원본 화면으로 바뀌어 어색하기 때문이다.
- `원래 화면 보기`는 헤더에 둔다.

## 구성

| 부분 | 파일 | 쓰는 곳 |
|---|---|---|
| 카드 배너 | `src/ui/CardBanner.tsx`, `src/ui/cardBanner.css` | 병무청 하위 페이지, 병무민원 세부 화면 |
| 병무청 하위 페이지 공통 틀 | `src/subpage/` (등록부 `pages.ts`, 본문 다듬기 `content.css`) | A-M01~A-M10 |
| 병무민원 세부 화면 공통 틀 | `src/portal/page/` (등록부 `registry.ts`) | 병무민원 입영 준비 카드 12개 |

## 페이지 추가 방법

병무청 하위 페이지 — 자기 폴더에 `register.ts`를 만들고 `content/main.tsx`의 `startSubpage()` 앞에서 부른다.

```ts
import { registerSubpages } from '../subpage/pages';
import css from './myPages.css?inline'; // 선택: 이 페이지들에만 필요한 규칙(html.bmgj-sub 아래로)

export function registerMyPages(): void {
  registerSubpages([
    { mc: 'usr0000042', cardId: 'A-R01', docCss: css, rootAttrs: { 'data-bmgj-a-r01-r05': 'schedule' } },
  ]);
}
```

- `mc`: `contents.do?mc=` 값. `cardId`: 그 페이지로 오는 메인 카드(`catalog/cards.ts`). 배너에 그 카드가 나온다.
- 제목·목록·표·버튼·탭·만족도 조사 모양은 공통 `content.css`가 맡는다. 페이지만의 CSS에는 그 페이지에만 필요한 것만 쓴다.

병무민원 세부 화면은 `src/portal/page/registry.ts`의 `registerPortalPages()`로 등록한다(`p-a-left.md`, `p-a-right.md` 참고).

## 이번에 바뀐 것

- 병무청 하위 페이지(a-m06-m10): 경로·페이지 제목·새 왼쪽 메뉴를 없애고 카드 배너 + 전체 너비로. 페이지 등록부(`registerSubpages`)를 만듦.
- a-m01-m05: 독립 테마 화면(원본 헤더 유지, 왼쪽 아래 전환 버튼)을 공통 틀에 등록하는 방식으로 바꿈. 탭·만족도 조사 규칙은 공통 `content.css`로 옮김(`a-m01-m05.md`).
- 병무민원 세부 화면(p-a-left): 배너를 공용 `CardBanner`로 옮김. 모양은 그대로(`p-a-left.md`).
