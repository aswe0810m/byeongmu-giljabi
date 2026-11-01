// 병무길잡이 프로토타입
// 1) 병무청 페이지 오른쪽에 테스트 패널 표시 (최상위 창에서만)
// 2) 「내 점수 미리 알아보기」 추가항목(신체조건) 값을 저장했다가 다시 들어오면 자동으로 채움
//    - 값은 chrome.storage.local(내 컴퓨터)에만 저장, 외부 전송 없음
//    - "다음" 버튼은 누르지 않음. 제출은 사용자가 직접

const LOG = (...a) => console.log("[병무길잡이]", ...a);
LOG("content script loaded:", location.host, window === window.top ? "(top)" : "(iframe)");

/* ---------- 1. 테스트 패널 ---------- */
if (window === window.top && !(location.host === "www.mma.go.kr" && ["/", "/index.do"].includes(location.pathname))) {
  const panel = document.createElement("div");
  panel.id = "bmgj-panel";
  panel.innerHTML = `
    <div style="font-weight:700;margin-bottom:6px">병무길잡이 <span style="font-weight:400;color:#888">(프로토타입)</span></div>
    <div style="margin-bottom:6px;color:#555">확장 프로그램이 이 페이지에 붙었어요.</div>
    <a href="https://www.mma.go.kr/board/boardList.do?gesipan_id=71&mc=usr0000129" style="display:block;color:#1a5fd0">· 공군 공지사항</a>
    <a href="https://mwpt.mma.go.kr/caisBMHS/index_mwps.jsp?menuNo=22037" style="display:block;color:#1a5fd0">· 군지원 서비스(점수 확인)</a>
    <div id="bmgj-status" style="margin-top:6px;color:#2e7d32"></div>
    <button id="bmgj-close" style="position:absolute;top:6px;right:8px;border:0;background:none;cursor:pointer">✕</button>`;
  Object.assign(panel.style, {
    position: "fixed", top: "120px", right: "16px", width: "220px", zIndex: 2147483647,
    background: "#fff", border: "1px solid #ccc", borderRadius: "8px", padding: "12px",
    font: "13px/1.5 sans-serif", boxShadow: "0 4px 16px rgba(0,0,0,.15)"
  });
  document.body.appendChild(panel);
  panel.querySelector("#bmgj-close").onclick = () => panel.remove();
}

function setStatus(msg) {
  try {
    const el = window.top.document.getElementById("bmgj-status"); // 같은 출처 iframe이면 접근 가능
    if (el) el.textContent = msg;
  } catch (e) {}
  LOG(msg);
}

/* ---------- 2. 추가항목 자동 입력 ---------- */
const KEY = "cghm_profile";
const MARKER = "sinJangInput"; // 추가항목 화면에만 있는 '신장' 입력칸

function fields(root) {
  return [...root.querySelectorAll("input, select")].filter(
    (e) => e.type !== "hidden" && e.type !== "button" && e.type !== "image" && (e.id || e.name)
  );
}
const keyOf = (e) => e.id || e.name;

let restoring = false;

function save(root) {
  if (restoring) return;
  const data = {};
  for (const e of fields(root)) {
    data[keyOf(e)] = e.type === "checkbox" ? e.checked : e.value;
  }
  chrome.storage.local.set({ [KEY]: data }, () => setStatus("추가항목 저장됨 (" + Object.keys(data).length + "개)"));
}

function restore(root) {
  chrome.storage.local.get(KEY, (res) => {
    const data = res[KEY];
    if (!data) { setStatus("저장된 추가항목 없음 → 입력하면 저장돼요"); return; }
    restoring = true;
    let n = 0;
    for (const e of fields(root)) {
      const v = data[keyOf(e)];
      if (v === undefined) continue;
      if (e.type === "checkbox") { if (e.checked !== v) { e.checked = v; n++; } }
      else if (e.value !== v && v !== "") { e.value = v; n++; }
      e.dispatchEvent(new Event("input", { bubbles: true }));
      e.dispatchEvent(new Event("change", { bubbles: true }));
    }
    restoring = false;
    setStatus("저장된 값으로 " + n + "개 항목을 채웠어요");
  });
}

const attached = new WeakSet();
function check() {
  const marker = document.getElementById(MARKER);
  if (!marker || attached.has(marker)) return;
  attached.add(marker);
  const root = marker.closest("#cghm") || marker.closest("form") || document;
  LOG("추가항목 화면 감지");
  restore(root);
  // 사이트가 화면을 그린 직후 선택 상자를 다시 초기화하는 경우가 있어 한 번 더 채움
  setTimeout(() => restore(root), 1000);
  root.addEventListener("change", () => save(root));
  root.addEventListener("input", () => save(root));
}

// 추가항목은 "다음"을 누를 때 서버에서 받아와 그려지므로 DOM 변화를 감시
new MutationObserver(check).observe(document.documentElement, { childList: true, subtree: true });
check();

/* ---------- 3. 군별 모집 공지사항 화면 정리 ---------- */
// 대상: 육군(69)·해군(70)·공군(71)·해병대(72)·취업맞춤특기병(267) 공지사항 목록
// 하는 일: 표 → 카드 목록, 잘린 제목 복원, 중복 고정공지 제거, 분야별 필터, NEW/지난 공지 표시
(function boardRedesign() {
  if (window !== window.top) return;
  if (location.host !== "www.mma.go.kr" || !location.pathname.includes("/board/boardList.do")) return;
  const gid = new URLSearchParams(location.search).get("gesipan_id");
  if (!["69", "70", "71", "72", "267"].includes(gid)) return;

  const table = document.querySelector("table");
  if (!table) return;
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 1) 목록 읽기 (고정공지와 일반 목록의 중복 합치기)
  const seen = new Map();
  for (const r of table.querySelectorAll("tbody tr")) {
    const a = r.querySelector("a");
    if (!a) continue;
    const href = a.getAttribute("href");
    const date = (r.innerText.match(/\d{4}-\d{2}-\d{2}/) || [""])[0];
    if (!seen.has(href)) {
      seen.set(href, {
        href, date,
        short: a.innerText.replace(/\s+/g, " ").trim(),
        file: !!r.querySelector('img[alt="첨부파일"]'),
      });
    }
  }
  const items = [...seen.values()];
  if (!items.length) return;

  // 2) 분류 규칙 (제목 키워드 기준, 순서대로 먼저 맞는 것)
  const RULES = [
    ["자격·조건", /자격|면허|어학성적|색약|색맹|선발기준|유의사항/],
    ["일정", /일정|모집계획/],
    ["기술·특기병", /기술병|기술행정병|전문특기병|어학병|특기병/],
    ["일반병", /일반병/],
  ];
  const classify = (t) => (RULES.find(([, re]) => re.test(t)) || ["기타"])[0];

  // 3) 화면 스타일
  const st = document.createElement("style");
  st.textContent = `
  #bmgj-board{font-family:'Pretendard','Malgun Gothic',sans-serif;margin:8px 0 24px}
  #bmgj-board h3{font-size:20px;margin:0 0 4px}
  #bmgj-board .sub{color:#777;font-size:13px;margin-bottom:14px}
  #bmgj-board .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
  #bmgj-board .chip{border:1px solid #c9d3e3;background:#fff;border-radius:999px;padding:6px 14px;font-size:14px;cursor:pointer}
  #bmgj-board .chip.on{background:#1f4e9c;color:#fff;border-color:#1f4e9c}
  #bmgj-board .card{display:block;border:1px solid #e3e7ee;border-radius:10px;padding:14px 16px;margin-bottom:10px;text-decoration:none;color:#222;background:#fff}
  #bmgj-board .card:hover{border-color:#1f4e9c;box-shadow:0 2px 8px rgba(31,78,156,.12)}
  #bmgj-board .t{font-size:16px;font-weight:600;line-height:1.4}
  #bmgj-board .m{font-size:13px;color:#777;margin-top:6px;display:flex;gap:8px;align-items:center}
  #bmgj-board .tag{font-size:12px;padding:2px 8px;border-radius:6px;background:#eef3fb;color:#1f4e9c}
  #bmgj-board .new{background:#e8f5e9;color:#2e7d32}
  #bmgj-board .card.old{opacity:.55}
  #bmgj-board .sec{font-size:13px;color:#999;margin:16px 0 8px}
  #bmgj-board .orig{font-size:12px;color:#999;background:none;border:0;text-decoration:underline;cursor:pointer;margin-left:8px}`;
  document.head.appendChild(st);

  const boardName = (document.querySelector("#sub_head h2, h2")?.innerText || "공지사항").trim();
  const box = document.createElement("div");
  box.id = "bmgj-board";
  box.innerHTML = `<h3>${esc(boardName)} <span style="font-size:13px;color:#1f4e9c;font-weight:400">· 병무길잡이로 정리됨</span>
    <button class="orig">원래 화면 보기</button></h3>
    <div class="sub">중복 고정공지 정리 · 잘린 제목 복원 · 분야별 필터 (이 페이지 ${items.length}건 기준)</div>
    <div class="chips"></div><div id="bmgj-list"><div class="sub">제목 불러오는 중…</div></div>`;
  table.parentElement.insertBefore(box, table);
  table.style.display = "none";
  document.querySelectorAll(".board_search, .bbs_search, .info_box").forEach((e) => (e.style.display = "none"));

  // 원래 화면과 전환
  let showingOrig = false;
  box.querySelector(".orig").onclick = (ev) => {
    showingOrig = !showingOrig;
    table.style.display = showingOrig ? "" : "none";
    box.querySelector("#bmgj-list").style.display = showingOrig ? "none" : "";
    box.querySelector(".chips").style.display = showingOrig ? "none" : "";
    ev.target.textContent = showingOrig ? "정리된 화면 보기" : "원래 화면 보기";
  };

  const render = (cat) => {
    const list = box.querySelector("#bmgj-list");
    const f = items.filter((it) => cat === "전체" || it.cat === cat);
    const card = (it) => `<a class="card${it.old ? " old" : ""}" href="${esc(it.href)}">
      <div class="t">${esc(it.title)}</div>
      <div class="m"><span class="tag">${it.cat}</span>${it.days <= 14 ? '<span class="tag new">NEW</span>' : ""}
      <span>${it.date}</span>${it.file ? "<span>📎 첨부</span>" : ""}</div></a>`;
    const cur = f.filter((x) => !x.old), old = f.filter((x) => x.old);
    list.innerHTML = cur.map(card).join("") +
      (old.length ? `<div class="sec">지난 공지 (${old.length})</div>` + old.map(card).join("") : "") ||
      '<div class="sub">해당 분야 공지가 이 페이지에 없어요.</div>';
  };

  // 4) 잘린 제목을 상세 페이지 <title>에서 복원한 뒤 그리기
  Promise.all(items.map(async (it) => {
    try {
      const h = await (await fetch(it.href)).text();
      const m = h.match(/<title>([^|<]+)/);
      if (m) it.title = m[1].trim();
    } catch (e) {}
    it.title = it.title || it.short;
  })).then(() => {
    const thisYear = new Date().getFullYear() + "-01-01";
    items.forEach((it) => {
      it.cat = classify(it.title);
      it.old = it.date < thisYear;
      it.days = Math.floor((Date.now() - new Date(it.date)) / 864e5);
    });
    items.sort((a, b) => (a.old - b.old) || b.date.localeCompare(a.date));
    const cats = ["전체", ...["기술·특기병", "일반병", "자격·조건", "일정", "기타"].filter((c) => items.some((i) => i.cat === c))];
    const chips = box.querySelector(".chips");
    chips.innerHTML = cats.map((c, i) => `<button class="chip${i ? "" : " on"}" data-c="${c}">${c}</button>`).join("");
    chips.querySelectorAll(".chip").forEach((b) => (b.onclick = () => {
      chips.querySelectorAll(".chip").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      render(b.dataset.c);
    }));
    render("전체");
    LOG("공지 정리 완료:", items.length + "건, 제목 복원", items.filter((i) => i.title !== i.short).length + "건");
  });
})();

