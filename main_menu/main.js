// 수정1 와이어프레임: 원본 DOM과 링크를 보존하고 메인 화면만 재구성한다.
(() => {
  if (window !== window.top || location.hostname !== 'www.mma.go.kr' ||
      !['/', '/index.do'].includes(location.pathname) || document.getElementById('bmgj-home')) return;

  const KEY = 'bmgj_main_audience';
  const normalize = text => text.replace(/[\s·ㆍ/()↗]/g, '').trim();
  // 실제로 이동하는 링크만 모은다 (javascript:void(0) 같은 메뉴 펼침용 a는 제외)
  const isRealHref = href => !!href && !href.startsWith('#') && !/^javascript:/i.test(href);
  const originalLinks = [...document.querySelectorAll('a')].filter(a => a.textContent.trim() && isRealHref(a.getAttribute('href')));
  const INFO_KEY = 'bmgj_profile'; // 내 정보(사이드 패널) 저장 위치. 지시서의 bmgj_profile 객체에 필드를 더한다.
  const titleOf = a => a.textContent.replace(/\s+/g, ' ').trim();
  const groups = ['병역이행안내', '군지원(입영신청)안내', '국민참여마당', '병무소식', '병무청소개'];
  const menus = {
    ready: {
      label: '입영 준비·복무 중', description: '모집병 지원, 병역판정검사, 입영 연기 등',
      // 모집 관련 공지·계획을 맨 앞에 둔다
      main: ['모집 공지사항', '이달의 모집계획', '내 점수 확인', '모집병 안내 및 신청', '지원서 작성/수정/취소', '지원 결과 조회', '입영일자 본인선택', '선발취소·입영일자 연기'],
      more: ['재학생 입영연기', '지원자격·지원절차', '병역판정검사 안내', '병역판정검사 일자연기', '입영판정검사', '입영시 유의사항', '병역이행일정안내', '병무청 지정병원', 'FAQ', '고객센터']
    },
    reserve: {
      label: '전역·예비군', description: '병적증명서 발급, 동원훈련 안내 등',
      main: ['병적증명서 발급', '동원훈련 안내', '예비군 홈페이지 ↗', '민원처리결과조회'],
      more: ['예비군 FAQ', '민원신청', '예비군 보류(해소) 신청', '군번찾기', '동원 표준훈련장 가는 길', '고객센터']
    }
  };
  // 'A > B' 형식은 GNB에서 중메뉴 A 아래의 소메뉴 B를 뜻한다. 이름이 겹치는 메뉴(FAQ, 공지사항 등)는 이 형식으로 지정한다.
  const aliases = {
    '내 점수 확인': ['내 점수 미리 알아보기', '군지원 서비스'],
    '모집병 안내 및 신청': ['군지원(입영신청) 안내 > 안내 및 신청(지원)'],
    '지원 결과 조회': ['지원결과', '합격여부', '군지원 서비스'],
    '모집 공지사항': ['모집안내서비스 > 공지사항'],
    '이달의 모집계획': ['모집안내서비스 > 이달의 모집계획'],
    '지원자격·지원절차': ['모집안내서비스 > 안내 및 지원절차'],
    '선발취소·입영일자 연기': ['현역병 선발취소 및 입영일자 연기신청', '선발취소'],
    '병역판정검사 안내': ['병역판정검사 > 병역판정검사 대상자'],
    '입영판정검사': ['입영판정검사 > 입영판정검사란?'],
    '병적증명서 발급': ['병적증명서 등 발급안내', '병적증명서'],
    '동원훈련 안내': ['예비군편성 / 병력동원 > 병력동원훈련소집'],
    '예비군 홈페이지 ↗': ['예비군 홈페이지', '예비군누리집'],
    'FAQ': ['자주하는 질문 모음(FAQ) > 각 군 공통 FAQ'],
    '예비군 FAQ': ['예비군편성 / 병력동원 > 자주하는 질문 모음(FAQ)'],
    '고객센터': ['고객센터안내'], '지방병무청 안내': ['지방청 안내']
  };
  function resolvePath(path) {
    const [parent, child] = path.split('>').map(s => normalize(s));
    for (const trigger of document.querySelectorAll('.gnb-menu .gnb-sub-trigger')) {
      if (normalize(trigger.textContent) !== parent) continue;
      const hit = [...trigger.parentElement.querySelectorAll('.depth3-trigger')]
        .find(a => normalize(a.textContent) === child && isRealHref(a.getAttribute('href')));
      if (hit) return hit;
    }
  }
  function resolve(label) {
    const names = aliases[label] || [];
    // 1) 경로 지정 → 2) 모든 이름 정확히 일치 → 3) 모든 이름 부분 일치 (부분 일치가 엉뚱한 메뉴를 먼저 잡지 않도록)
    for (const name of names.filter(n => n.includes('>'))) { const hit = resolvePath(name); if (hit) return hit; }
    const plain = [label, ...names.filter(n => !n.includes('>'))].map(normalize);
    for (const target of plain) { const hit = originalLinks.find(a => normalize(a.textContent) === target); if (hit) return hit; }
    for (const target of plain) { const hit = originalLinks.find(a => normalize(a.textContent).includes(target)); if (hit) return hit; }
  }
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function button(text, action, className = '') {
    const b = el('button', className, text); b.type = 'button'; b.addEventListener('click', action); return b;
  }
  const iconPaths = {
    score: '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 7h6M9 12h1m4 0h1m-6 4h1m4 0h1"/>',
    guide: '<path d="M12 6c-3-3-7-2-9-1v15c3-1 6-2 9 0 3-2 6-1 9 0V5c-2-1-6-2-9 1Zm0 0v14"/>',
    edit: '<path d="m14 5 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14Z"/>',
    check: '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M8 11l2 2 4-4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h2m4 0h2"/>',
    notice: '<path d="m3 10 12-5v14L3 15Zm12-5 3-2v18l-3-2M6 16l1 5h4l-2-4m12-8v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    document: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Zm0 0v6h6M8 13h8m-8 4h5"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Zm-4 9 3 3 5-6"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'
  };
  function icon(name) {
    const wrapper = el('span', 'bmgj-icon'); wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.guide}</svg>`;
    return wrapper;
  }
  function link(label, source = resolve(label), className = '') {
    // 원래 링크의 주소와 target을 그대로 쓰는 진짜 <a>를 만든다 → 새 탭 열기, 오른쪽 클릭, 주소 미리보기가 된다.
    if (source && isRealHref(source.getAttribute('href'))) {
      const a = el('a', ('bmgj-link ' + className).trim(), label);
      a.href = source.href;
      if (source.target === '_blank') { a.target = '_blank'; a.rel = 'noopener'; }
      a.title = titleOf(source) + (a.target === '_blank' ? ' (새 창)' : '');
      return a;
    }
    // 못 찾은 메뉴는 콘솔에 남기고 전체 메뉴 검색으로 안내한다.
    console.warn('[병무길잡이] 링크 없음: ' + label);
    return button(label, () => {
      showAll(label); message.textContent = '해당 메뉴의 바로가기를 찾지 못했어요. 전체 메뉴 또는 원래 화면에서 확인해 주세요.';
    }, className);
  }

  const root = el('div'); root.id = 'bmgj-home'; root.lang = 'ko';
  const header = el('header', 'bmgj-header');
  const brand = button('', () => showHome(), 'bmgj-brand');
  const brandLogo = el('img', 'bmgj-brand-logo');
  brandLogo.src = 'https://www.mma.go.kr/images/syjy/common/ico_mma_logo.svg';
  brandLogo.alt = '병무청'; brandLogo.width = 114; brandLogo.height = 42;
  brand.append(brandLogo); header.append(brand, el('span', 'bmgj-beta', '비공식 도우미'));
  const search = el('input', 'bmgj-search'); search.type = 'search'; search.placeholder = '어떤 메뉴를 찾으세요?'; search.setAttribute('aria-label', '전체 메뉴 검색');
  search.addEventListener('input', () => { if (search.value.trim()) showAll(search.value); else showHome(); });
  const select = el('select', 'bmgj-select'); select.setAttribute('aria-label', '나의 상황');
  Object.entries(menus).forEach(([value, data]) => { const option = el('option', '', data.label); option.value = value; select.append(option); });
  header.append(search, select, button('원래 화면 보기', showOriginal, 'bmgj-text'));
  const content = el('main', 'bmgj-content');
  const message = el('p', 'bmgj-message'); message.setAttribute('role', 'status');
  const footer = el('footer', 'bmgj-footer'); footer.append(link('지방병무청 안내'), document.createTextNode(' · '), el('a', '', '고객센터 1588-9090')); footer.lastChild.href = 'tel:15889090';
  const side = el('aside', 'bmgj-side');
  // 내 정보 사이드 패널: 나의 상황, 입영(예정)일/전역일과 D-day, 관심 특기
  let info = {};
  const sideToggle = button('', () => setSideOpen(sideToggle.getAttribute('aria-expanded') !== 'true'), 'bmgj-side-toggle');
  sideToggle.setAttribute('aria-expanded', 'false'); sideToggle.setAttribute('aria-controls', 'bmgj-side-body');
  const sideBody = el('div', 'bmgj-side-body'); sideBody.id = 'bmgj-side-body'; sideBody.hidden = true;
  sideBody.setAttribute('role', 'region'); sideBody.setAttribute('aria-label', '내 정보');
  function setSideOpen(open) {
    sideToggle.setAttribute('aria-expanded', String(open)); sideBody.hidden = !open;
    side.classList.toggle('open', open); renderSideToggle();
    if (open) sideBody.querySelector('input, button')?.focus();
  }
  function dayDiff(dateText) { // 오늘 기준 날짜 차이(일). 양수면 미래
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText || '')) return null;
    const [y, m, d] = dateText.split('-').map(Number);
    const now = new Date();
    return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
  }
  function ddayText() {
    if (audience === 'ready') {
      const n = dayDiff(info.enlistDate);
      if (n === null) return '';
      return n > 0 ? `입영 D-${n}` : n === 0 ? '입영 D-day' : `입영 ${-n + 1}일째`;
    }
    const n = dayDiff(info.dischargeDate);
    if (n === null) return '';
    return n > 0 ? `전역 D-${n}` : n === 0 ? '전역 D-day' : `전역 후 ${-n}일`;
  }
  function renderSideToggle() {
    const open = sideToggle.getAttribute('aria-expanded') === 'true';
    sideToggle.replaceChildren(icon(open ? 'arrow' : 'user'), el('span', '', open ? '닫기' : '내 정보'));
    const dday = ddayText();
    if (!open && dday) sideToggle.append(el('span', 'bmgj-side-dday', dday));
  }
  function saveInfo(patch) {
    info = Object.assign({}, info, patch);
    chrome.storage.local.set({ [INFO_KEY]: info }); // 이 컴퓨터에만 저장, 외부 전송 없음
    renderSide();
  }
  function field(labelText, input, hint) {
    const wrap = el('label', 'bmgj-field'); wrap.append(el('span', 'bmgj-field-label', labelText), input);
    if (hint) wrap.append(el('span', 'bmgj-field-hint', hint));
    return wrap;
  }
  function renderSide() {
    const ready = audience === 'ready';
    const status = el('div', 'bmgj-side-status');
    status.append(el('span', '', '나의 상황'), el('strong', '', menus[audience].label),
      button('바꾸기', () => onboarding.showModal(), 'bmgj-side-change'));

    const dateKey = ready ? 'enlistDate' : 'dischargeDate';
    const date = el('input'); date.type = 'date'; date.value = info[dateKey] || '';
    date.addEventListener('change', () => saveInfo({ [dateKey]: date.value }));
    const dday = ddayText();
    const ddayBox = el('div', 'bmgj-side-ddaybox', dday || (ready ? '입영(예정)일을 넣으면 D-day를 보여 드려요.' : '전역일을 넣으면 지난 날짜를 보여 드려요.'));
    if (dday) ddayBox.classList.add('on');

    const nodes = [el('h2', '', '내 정보'), status, field(ready ? '입영(예정)일' : '전역일', date), ddayBox];
    if (ready) {
      const interest = el('input'); interest.type = 'text'; interest.placeholder = '예: 공군 전문기술병'; interest.value = info.interest || '';
      interest.maxLength = 40;
      interest.addEventListener('change', () => saveInfo({ interest: interest.value.trim() }));
      nodes.push(field('관심 특기', interest));
      if (info.interest) nodes.push(link(`'${info.interest}' 모집 공지 보기`, resolve('모집 공지사항'), 'bmgj-side-link'));
    }
    nodes.push(el('p', '', '입력한 정보는 이 컴퓨터에만 저장되고 외부로 보내지 않아요.'), button('원래 화면 보기', showOriginal, 'bmgj-side-original'));
    sideBody.replaceChildren(...nodes);
    renderSideToggle();
  }
  sideBody.addEventListener('keydown', e => { if (e.key === 'Escape') { setSideOpen(false); sideToggle.focus(); } });
  root.append(header, content, message, footer, side); side.append(sideToggle, sideBody);
  document.body.append(root);
  let audience = 'ready';
  const returnButton = button('병무길잡이 화면 보기', () => { returnButton.remove(); document.body.classList.add('bmgj-active'); root.hidden = false; }, 'bmgj-return');
  function showOriginal() {
    document.body.classList.remove('bmgj-active'); root.hidden = true;
    onboarding.close(); if (!returnButton.isConnected) document.body.append(returnButton);
  }
  function saveAudience(value) {
    audience = value; select.value = value;
    chrome.storage.local.set({ [KEY]: value }); showHome();
  }
  select.addEventListener('change', () => saveAudience(select.value));

  // 주요 메뉴 타일의 아이콘·설명 (순서를 바꿔도 짝이 맞도록 이름으로 묶는다)
  const TILE_INFO = {
    '모집 공지사항': ['notice', '새로운 모집 소식을 살펴봐요'],
    '이달의 모집계획': ['calendar', '월별 모집 일정을 확인해요'],
    '내 점수 확인': ['score', '지원 전 미리 확인해요'],
    '모집병 안내 및 신청': ['guide', '나에게 맞는 모집 정보를 찾아요'],
    '지원서 작성/수정/취소': ['edit', '지원 내용을 관리해요'],
    '지원 결과 조회': ['check', '지원 결과를 확인해요'],
    '입영일자 본인선택': ['calendar', '나의 입영 일정을 선택해요'],
    '선발취소·입영일자 연기': ['clock', '입영 일정 변경을 알아봐요'],
    '병적증명서 발급': ['document', '발급 방법을 확인해요'],
    '동원훈련 안내': ['shield', '훈련 일정과 준비를 알아봐요'],
    '예비군 홈페이지 ↗': ['guide', '예비군 정보를 한곳에서 봐요'],
    '민원처리결과조회': ['check', '신청한 민원의 진행 상황을 봐요']
  };
  function showHome() {
    search.value = ''; message.textContent = ''; content.replaceChildren(); renderSide();
    const hero = el('section', 'bmgj-hero');
    const heroCopy = el('div', 'bmgj-hero-copy');
    heroCopy.append(el('p', 'bmgj-eyebrow', '나의 병역 여정, 조금 더 가볍게'), el('h1', '', audience === 'ready' ? '막막했던 입영 준비,\n여기서 차근차근.' : '복무 이후의 일상도,\n필요한 것만 간편하게.'), el('p', 'bmgj-hero-description', audience === 'ready' ? '지원부터 입영까지, 지금 필요한 메뉴를 한곳에 모았어요.' : '증명서 발급부터 동원훈련까지, 빠르게 찾아보세요.'));
    // 상단 버튼: 입영 준비는 '이달의 모집계획'으로 바로 보낸다
    const heroAction = audience === 'ready'
      ? link('이달의 모집계획 보러 가기', resolve('이달의 모집계획'), 'bmgj-hero-action')
      : link('병적증명서 발급 안내', resolve('병적증명서 발급'), 'bmgj-hero-action');
    heroAction.append(icon('arrow')); heroCopy.append(heroAction);
    const art = el('div', 'bmgj-hero-art'); art.setAttribute('aria-hidden', 'true');
    art.innerHTML = '<svg viewBox="0 0 300 230" fill="none"><circle cx="166" cy="113" r="99" stroke="#ffffff" stroke-opacity=".1"/><circle cx="166" cy="113" r="72" stroke="#ffffff" stroke-opacity=".1"/><path d="M33 177C80 177 59 68 121 68s38 111 100 76" stroke="#a5dec9" stroke-width="2" stroke-dasharray="5 7"/><rect x="111" y="35" width="127" height="157" rx="16" fill="#ffffff" transform="rotate(9 111 35)"/><rect x="127" y="64" width="59" height="7" rx="3.5" fill="#d6eae4" transform="rotate(9 127 64)"/><rect x="122" y="85" width="78" height="5" rx="2.5" fill="#e7eeeb" transform="rotate(9 122 85)"/><rect x="119" y="102" width="67" height="5" rx="2.5" fill="#e7eeeb" transform="rotate(9 119 102)"/><circle cx="161" cy="146" r="23" fill="#e0f3ea"/><path d="m150 146 8 8 15-17" stroke="#22846b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="66" cy="162" r="22" fill="#b9ecd4"/><path d="m57 162 6 6 12-13" stroke="#17614f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="249" cy="60" r="8" fill="#d8b873"/><path d="M68 43v12m-6-6h12" stroke="#b9ecd4" stroke-width="2" stroke-linecap="round"/></svg>';
    hero.append(heroCopy, art);
    const menu = el('section', 'bmgj-card');
    const menuHead = el('div', 'bmgj-section-head');
    const menuHeading = el('div'); menuHeading.append(el('p', 'bmgj-eyebrow', 'QUICK MENU'), el('h2', '', '자주 찾는 메뉴'));
    menuHead.append(menuHeading, el('span', 'bmgj-audience-badge', menus[audience].label)); menu.append(menuHead);
    const grid = el('div', 'bmgj-grid');
    menus[audience].main.forEach((name, i) => {
      const [symbol, caption] = TILE_INFO[name] || ['guide', ''];
      const tile = link(name, resolve(name), 'bmgj-tile' + (i === 0 ? ' primary' : ''));
      tile.replaceChildren();
      tile.append(icon(symbol), el('strong', 'bmgj-tile-label', name), el('span', 'bmgj-tile-caption', caption));
      grid.append(tile);
    });
    const more = el('div', 'bmgj-more'); more.id = 'bmgj-more'; more.hidden = true;
    menus[audience].more.forEach(name => more.append(link(name, resolve(name), 'bmgj-tile')));
    const toggle = button('더보기 ▾', () => {
      more.hidden = !more.hidden; toggle.textContent = more.hidden ? '더보기 ▾' : '접기 ▴'; toggle.setAttribute('aria-expanded', String(!more.hidden));
    }, 'bmgj-more-toggle'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', more.id);
    const all = button('', () => showAll(), 'bmgj-all'); all.append(el('span', '', '기타 메뉴 (병무청 소개, 국민참여, 병무소식 등)'), el('span', '', '전체 메뉴 페이지로 →'));
    menu.append(grid, toggle, more, all);
    const news = el('section', 'bmgj-card');
    const newsHead = el('div', 'bmgj-section-head'); const newsHeading = el('div'); newsHeading.append(el('p', 'bmgj-eyebrow', 'NOTICE'), el('h2', '', '새로운 소식을 확인하세요')); newsHead.append(newsHeading, button('전체 보기 →', () => showAll('공지사항'), 'bmgj-text')); news.append(newsHead);
    const seen = new Set();
    const noticeLinks = [...document.querySelectorAll('#tab2c1 a, #tab2c3 a')].filter(a => /boardView\.do/.test(a.getAttribute('href') || ''));
    const notices = [...noticeLinks.filter(a => a.closest('#tab2c1')).slice(0, 2), ...noticeLinks.filter(a => a.closest('#tab2c3')).slice(0, 1)].filter(a => !seen.has(a.href) && seen.add(a.href));
    notices.forEach(a => {
      const row = el('div', 'bmgj-news-row'); const date = a.closest('li')?.textContent.match(/\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2}/);
      row.append(el('span', 'bmgj-news-tag' + (a.closest('#tab2c3') ? ' policy' : ''), a.closest('#tab2c3') ? '제도 안내' : '공지사항'), link(a.textContent.trim(), a), el('time', '', date ? date[0] : ''), icon('arrow')); news.append(row);
    });
    if (!notices.length) news.append(el('p', 'bmgj-empty', '메인 화면에서 공지를 불러오지 못했어요. 전체 메뉴에서 공지사항을 확인해 주세요.'));
    content.append(hero, menu, news);
  }

  // 원본 메뉴의 DOM 순서와 분류를 사용해 사이트 변경에도 실제 링크를 유지한다.
  const catalog = groups.map((name, index) => {
    const container = document.getElementById(`mGnb-anchor${index + 1}`);
    const desktop = [...document.querySelectorAll('#nav > ul > li')].find(li => normalize(li.querySelector('button')?.textContent || '').includes(normalize(name)));
    return { name, links: [...(container || desktop || document.createElement('div')).querySelectorAll('a')].filter(a => originalLinks.includes(a)) };
  });
  catalog.unshift({ name: '병무민원', links: ['민원신청', '나만의 누리집', '민원처리결과조회'].map(resolve).filter(Boolean) });
  function showAll(query = '') {
    content.replaceChildren(); message.textContent = '';
    const card = el('section', 'bmgj-card bmgj-catalog');
    card.append(button('← 메인으로', showHome, 'bmgj-text'), el('h1', '', '전체 메뉴'), el('p', 'bmgj-empty', '병무청 누리집의 메뉴를 원래 대메뉴 구조로 보여 드려요.'));
    let total = 0;
    catalog.forEach(group => {
      const seen = new Set();
      const links = group.links.filter(a => normalize(a.textContent).includes(normalize(query)) && !seen.has(a.href + a.textContent.trim()) && seen.add(a.href + a.textContent.trim()));
      if (!links.length) return;
      total += links.length;
      const section = el('section', 'bmgj-menu-group'); section.append(el('h2', '', group.name));
      const columns = el('div', 'bmgj-menu-columns');
      let lastHeading = null;
      links.forEach(a => {
        // 소메뉴라면 상위 중메뉴 이름을 먼저 보여 준다. 중메뉴가 펼침 전용(javascript:)이면 링크가 아닌 제목으로만 표시한다.
        const parentTrigger = a.classList.contains('depth3-trigger')
          ? a.closest('.depth3-wrap')?.parentElement?.querySelector(':scope > .gnb-sub-trigger') : null;
        if (parentTrigger && parentTrigger !== lastHeading) {
          lastHeading = parentTrigger;
          if (!links.includes(parentTrigger)) columns.append(el('p', 'bmgj-menu-heading', titleOf(parentTrigger)));
        }
        if (!parentTrigger) lastHeading = a.classList.contains('gnb-sub-trigger') ? a : null;
        const external = /^https?:/.test(a.href) && new URL(a.href).origin !== location.origin;
        const entry = link(a.textContent.replace(/\s+/g, ' ').trim() + (external ? ' ↗' : ''), a);
        if (parentTrigger) entry.classList.add('bmgj-nested');
        columns.append(entry);
      });
      section.append(columns); card.append(section);
    });
    if (!total) card.append(el('p', 'bmgj-empty', '검색 결과가 없어요. 다른 검색어를 입력하거나 원래 화면에서 확인해 주세요.'));
    card.append(el('p', 'bmgj-empty', '↗ 표시는 병무청 밖 사이트로 연결되는 메뉴입니다.')); content.append(card);
  }

  const onboarding = el('dialog', 'bmgj-onboarding');
  onboarding.setAttribute('aria-labelledby', 'bmgj-welcome-title');
  const welcomeTitle = el('h1', '', '지금 어떤 상황인가요?'); welcomeTitle.id = 'bmgj-welcome-title';
  onboarding.append(el('p', 'bmgj-eyebrow', '병무길잡이'), welcomeTitle, el('p', '', '선택에 맞춰 자주 쓰는 메뉴를 앞에 보여 드려요. 나중에 언제든 바꿀 수 있어요.'));
  const choices = el('div', 'bmgj-choices');
  Object.entries(menus).forEach(([value, data]) => {
    const choice = button('', () => { saveAudience(value); onboarding.close(); }, 'bmgj-choice' + (value === 'ready' ? ' primary' : ''));
    choice.append(el('strong', '', data.label), el('span', '', data.description)); choices.append(choice);
  });
  onboarding.append(choices, el('p', 'bmgj-empty', '선택한 값은 이 컴퓨터에만 저장되고 외부로 보내지 않아요.'), button('원래 화면으로 보기', showOriginal, 'bmgj-text'));
  onboarding.addEventListener('cancel', event => { event.preventDefault(); showOriginal(); }); root.append(onboarding);
  chrome.storage.local.get([KEY, INFO_KEY], result => {
    if (chrome.runtime.lastError) message.textContent = '설정을 불러오지 못했어요. 상황을 다시 선택해 주세요.';
    if (result?.[INFO_KEY] && typeof result[INFO_KEY] === 'object') info = result[INFO_KEY];
    if (Object.hasOwn(menus, result?.[KEY])) audience = result[KEY];
    select.value = audience; showHome(); document.body.classList.add('bmgj-active');
    if (!Object.hasOwn(menus, result?.[KEY])) onboarding.showModal();
  });
})();
