// p-a-left: 다음연도 접수 일정 — 관할 지방청 칸 표시(사용자 요청 2026-11-23).
// 화면에 "나의 관할 지방청(병적지청) : 서울"처럼 나오면 일정표에서 그 지방청 칸을 칠하고,
// 그 칸의 시간(줄 머리)·날짜(열 머리)도 옅게 칠한다. 원본 글은 바꾸지 않고 표시(data-bmgj-p-a-left-*)만 단다.
// 칸 글자는 "강원, 강원영동"처럼 여러 곳일 수 있어 쉼표로 나눠 정확히 같은 이름만 찾는다.

const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
const MY_OFFICE = /관할\s*지방(?:병무)?청[^:：]{0,12}[:：]\s*([^\s,()]+)/;

export function markMyOffice(doc: Document): void {
  const root = doc.getElementById('contents');
  if (!root) return;
  let office = '';
  for (const el of root.querySelectorAll('h3, h4, strong, p, li, th, td')) {
    const m = MY_OFFICE.exec(clean(el.textContent ?? ''));
    if (m) { office = m[1]; break; }
  }
  if (!office) return;
  for (const table of root.querySelectorAll<HTMLTableElement>('table')) {
    const rows = [...table.rows];
    rows.forEach((row) => {
      [...row.cells].forEach((cell, col) => {
        if (cell.tagName !== 'TD') return;
        const names = clean(cell.textContent ?? '').split(/\s*[,，·]\s*/);
        if (!names.includes(office)) return;
        cell.dataset.bmgjPALeftMine = '';
        const rowHead = row.cells[0];
        if (rowHead && rowHead.tagName === 'TH') rowHead.dataset.bmgjPALeftMineAxis = '';
        const colHead = rows[0]?.cells[col];
        if (colHead && colHead.tagName === 'TH' && rows[0] !== row) colHead.dataset.bmgjPALeftMineAxis = '';
      });
    });
  }
}
