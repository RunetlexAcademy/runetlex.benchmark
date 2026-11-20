const D = window.DATA;
// One name per area everywhere on the site (filters, tables, tags, forms): the sheet name up to the first comma.
D.areas = (D.areas || []).map((a) => String(a).split(',')[0].trim()); D.short = D.areas;
const WM = '<svg class="wm" viewBox="0 0 271.5 32.6" fill="currentColor" aria-hidden="true"> <g> <g> <g> <g> <g> <g> <g> <path  d="M81.4,22.8c-1.4,0-2-0.8-2-2.5V12h6.4V9.5h-6.4V4.1h-2.9v5.4H73V12h3.4v8c0,2.6,1.5,5.2,5.6,5.2h3.7 v-2.5H81.4z"></path> <path  d="M36.8,17.3c0.1-3,1.8-5.8,5.7-5.8c3.1,0,5.1,1.8,5.1,5.6v8.1h2.9v-8.1c0-5.7-3.7-8.4-8.3-8.2 c-2.8,0.1-4.8,1.5-5.9,3V9.5h-2.9v15.7h3.4L36.8,17.3z"></path> <rect x="89.2" y="4.1"  width="3.4" height="21.1"></rect> <polygon  points="129.6,25.2 123.7,17.4 129.6,9.5 126,9.5 121.9,15 117.8,9.5 114.2,9.5 120.1,17.4 114.2,25.2 117.8,25.2 121.9,19.7 126,25.2 "></polygon> <g> <path d="M62.9,23.1c1.1,0,2.1-0.2,3-0.6c0.9-0.4,1.6-1,1.9-1.7h3.1c-0.6,1.5-1.6,2.7-3.2,3.6c-1.5,0.9-3.2,1.4-5,1.4 c-2.5,0-4.6-0.8-6.3-2.4c-1.7-1.6-2.5-3.6-2.5-6.1c0-2.3,0.8-4.3,2.4-6c1.6-1.6,3.7-2.4,6.3-2.4c2.7,0,4.8,0.9,6.4,2.7 c1.6,1.8,2.4,4.1,2.4,6.8H57c0.3,1.4,0.9,2.6,2,3.5C60,22.7,61.3,23.1,62.9,23.1z M62.5,11.5c-1.5,0-2.7,0.4-3.7,1.2 s-1.6,1.9-1.8,3.1h11c-0.3-1.4-0.9-2.4-1.9-3.2C65.2,11.9,64,11.5,62.5,11.5z"></path> </g> <g> <path d="M104.8,23.1c1.1,0,2.1-0.2,3-0.6c0.9-0.4,1.6-1,1.9-1.7h3.1c-0.6,1.5-1.6,2.7-3.2,3.6c-1.5,0.9-3.2,1.4-5,1.4 c-2.5,0-4.6-0.8-6.3-2.4c-1.7-1.6-2.5-3.6-2.5-6.1c0-2.3,0.8-4.3,2.4-6c1.6-1.6,3.7-2.4,6.3-2.4c2.7,0,4.8,0.9,6.4,2.7 c1.6,1.8,2.4,4.1,2.4,6.8H99c0.3,1.4,0.9,2.6,2,3.5C102,22.7,103.3,23.1,104.8,23.1z M104.5,11.5c-1.5,0-2.7,0.4-3.7,1.2 s-1.6,1.9-1.8,3.1h11c-0.3-1.4-0.9-2.4-1.9-3.2C107.1,11.9,105.9,11.5,104.5,11.5z"></path> </g> <path  d="M5.5,12c-1.4,0-2,0.8-2,2.5v10.8H0V9.5h3.4v1.6c0.6-1,1.7-1.6,3.4-1.6h3V12H5.5z"></path> <path  d="M26,17.4c-0.1,3-1.8,5.8-5.7,5.8c-3.1,0-5.1-1.8-5.1-5.6V9.5h-3.4v8.1c0,5.7,3.7,8.4,8.3,8.2 c2.8-0.1,4.8-1.5,5.9-3v2.4h3.4V9.5H26L26,17.4z"></path> </g> <rect x="98.5" y="15.9"  width="13.2" height="2.5"></rect> <rect x="55.9" y="15.9"  width="13.2" height="2.5"></rect> </g> </g> </g> </g> </g> <g> <path d="M137.4,22.4l2.3,0.6l-0.6,2.5c-0.8,0-1.9-0.3-2.5-0.6L137.4,22.4z"></path> <path d="M148.9,10.7l5.4-2.2c2.1,0.4,4.3,1.6,5.6,2.5v12.5L163,24l-0.5,1.4c-1.9-0.2-3.3-0.5-4.5-1.1v-2.6l-4.7,3.8 c-2.3-0.5-4.3-1.4-5.5-2.4l0.4-4.6l9.7-2.6v-4.2c-1.3-0.7-3.1-1.3-4.5-1.6l-4.2,2.3L148.9,10.7z M149.9,22.6 c0.8,0.4,2.4,1,3.8,1.2l4.5-3.3v-3.5l-8.2,2.5V22.6z"></path> <path d="M174.3,11.5c-1-0.5-2.7-1.1-3.8-1.4l-3.1,1.3v10.9c1.2,0.6,3.5,1.4,4.8,1.7l4.2-2.1l0.6,1.4l-5.5,2.2 c-2.2-0.5-4.5-1.6-5.8-2.5V10.9l5.4-2.4c1.4,0.4,2.6,0.8,3.4,1.3l0.5-2.6l1.1,0.4l-0.4,8.9l-1.7-0.3L174.3,11.5z"></path> <path d="M180.4,10.7l5.4-2.2c2.1,0.4,4.3,1.6,5.6,2.5v12.5l3.1,0.5l-0.5,1.4c-1.9-0.2-3.3-0.5-4.5-1.1v-2.6l-4.7,3.8 c-2.3-0.5-4.3-1.4-5.5-2.4l0.4-4.6l9.7-2.6v-4.2c-1.3-0.7-3.1-1.3-4.5-1.6l-4.2,2.3L180.4,10.7z M181.4,22.6 c0.8,0.4,2.4,1,3.8,1.2l4.5-3.3v-3.5l-8.2,2.5V22.6z"></path> <path d="M207.5,1.9l-3.1-0.4L205,0c1.9,0.2,3.3,0.4,4.4,1v22.5l3.1,0.4l-0.5,1.5c-1.9-0.2-3.4-0.4-4.5-1v-2.4l-4.6,3.5 c-1.9-0.2-4.5-1.3-5.9-2.5V11.2l5.8-2.6c1.5,0.2,3.1,0.8,4.6,1.4V1.9z M207.5,11.8c-0.9-0.5-3.5-1.2-5.1-1.5l-3.6,1.4v10.7 c1.2,0.5,3.1,1.2,4.4,1.5l4.3-2.9V11.8z"></path> <path d="M215.2,10.9l5.4-2.4c2.2,0.4,4.5,1.6,6,2.8l-1.5,5.9l-8.1,2.4v2.8c1.3,0.6,3.9,1.3,5.1,1.5l4.6-2l0.5,1.5l-5.8,2.1 c-2.2-0.4-4.7-1.4-6.2-2.3V10.9z M224.5,11.8c-1.4-0.8-3.1-1.4-4.4-1.7l-3.1,1.3v7.1l6.8-2.3L224.5,11.8z"></path> <path d="M234,12l4.3-3.5c1.7,0.4,3.9,1.5,5.5,2.9l4.2-2.9c1.7,0.4,3.9,1.5,5.4,2.8v12.2l3.1,0.4l-0.5,1.5c-2.6-0.2-4.8-0.6-6-1 v-0.1l1.6-0.8V12c-1-0.7-2.7-1.5-3.8-1.7l-4.1,2.5v10.8l3.2,0.4l-0.5,1.5c-2.6-0.2-4.9-0.6-6-1v-0.1l1.5-0.8V12 c-1-0.7-2.6-1.5-3.8-1.7l-4.1,2.9v10.4l3.1,0.4l-0.5,1.5c-2.5-0.2-4.8-0.6-6-1v-0.1l1.6-0.8V10.8l-2.9-0.4l0.5-1.5 c1.8,0.1,3,0.4,4.1,1V12z"></path> <path d="M257.1,9c1.1,0.1,1.9,0.3,2.8,0.8l2.3,12.2c0.7,0.5,2.4,1.2,3.4,1.4l3.9-12.3c-1.5-0.3-3.1-0.5-4.7-0.6l0.6-1.6 c2.3,0.1,4.6,0.6,6.1,1.2l-5,15.1l-1,7.5l-2-0.6l1.6-7c-1.6-0.5-3.6-1.5-4.5-2.3l-2.3-11.9l-1.6-0.2L257.1,9z"></path> </g> </g> </svg>';
// Smooth scroll to a section, below the menu and (in the catalog on phones) below the sticky category chips.
window.go = (id) => { const el = document.getElementById(id); if (!el) return; const sb = document.querySelector('.sidebar'); const nv = document.querySelector('.nav'); let off = 90; if (sb && getComputedStyle(sb).position === 'sticky' && window.innerWidth <= 900) off = (nv ? nv.offsetHeight : 60) + sb.offsetHeight + 16; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' }); };
const S = { area: -1, taskArea: -1, filt: 'all', cfilt: 'all', cq: '', open: {}, view: {} };
const $ = (h) => h;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const byId = (id) => D.services.find((x) => x.id === id);
const task = (id) => D.tasks.find((t) => t.id === id);
const expert = (id) => D.experts.find((e) => e.id === id);
const authorIds = (t) => t.authors || [t.author];
// Names are shown as «Имя Фамилия», without patronymic, whatever order the sheet uses.
const personName = (name) => {
  const w = String(name || '').trim().split(/\s+/).filter(Boolean); if (w.length < 2) return w.join(' ');
  const rest = w.filter((x, i) => !(i > 0 && /(вна|вич|чна|ична|ьич)$/i.test(x)));
  if (rest.length !== 2) return rest.join(' ');
  const last = surname(w.join(' ')); const first = rest.find((x) => x !== last) || rest[0];
  return `${first} ${last}`;
};
const authorNames = (t) => authorIds(t).map((id) => personName((expert(id) || {}).name)).filter(Boolean).join(', ') || '—';
// Author names link to the expert's card on the experts page.
const authorLinks = (t) => authorIds(t).map((id) => { const e = expert(id); if (!e) return ''; const n = esc(personName(e.name)); return e.hidden ? n : `<a href="#/experts" onclick="event.stopPropagation();PENDING_EXP='${e.id}'">${n}</a>`; }).filter(Boolean).join(', ') || '—';
// Links that open another page and then scroll to a section: the scroll waits until the new page is drawn.
window.PENDING_GO = null;
window.goTo = (id, el) => {
  const h = (el && el.getAttribute('href')) || ''; const cur = location.hash || '#/';
  if (!h || h === cur || (h === '#/' && cur === '#')) { go(id); return; }
  PENDING_GO = id;
};
window.PENDING_EXP = null;
window.goExpert = (id) => { const el = document.getElementById('exp-' + id); if (!el) return; go('exp-' + id); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1600); };
const authorLabel = (t) => (authorIds(t).length > 1 ? 'авторы' : 'автор');
const resOf = (s, tid) => s.res.find((r) => r.t === tid);
// Vendor comment on the results: a short preview in the table, the full text in a light popover.
const CMT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const commentCell = (s) => (s.comment ? `<button type="button" class="cmt" onclick="event.stopPropagation();openCmt('${s.id}',this)" aria-label="Комментарий ${esc(s.name)} к результатам">${CMT_ICON}<span class="cmt-txt">${esc(String(s.comment).replace(/\s+/g, ' ').trim())}</span></button>` : '');
window.openCmt = (sid, btn) => {
  closeCmt(); const s = byId(sid); if (!s || !s.comment) return;
  const pop = document.createElement('div'); pop.className = 'cmt-pop'; pop.id = 'cmt-pop'; pop.setAttribute('role', 'dialog');
  pop.innerHTML = `<div class="cmt-head"><span class="cmt-ava">${s.logo ? `<img src="${esc(s.logo)}" alt="">` : esc(s.name.slice(0, 2).toUpperCase())}</span><div class="cmt-who"><p class="b">${esc(s.name)}</p><p class="muted">комментарий сервиса к результатам</p></div><button type="button" class="cmt-x" aria-label="закрыть" onclick="closeCmt()">×</button></div><p class="cmt-body">${esc(s.comment)}</p><a class="cmt-more" href="#/service/${s.id}">Страница сервиса</a>`;
  document.body.appendChild(pop);
  if (window.innerWidth > 640) {
    const r = btn.getBoundingClientRect(); const w = pop.offsetWidth;
    pop.style.left = Math.max(16, Math.min(r.right - w, window.innerWidth - w - 16)) + 'px';
    pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
  } else pop.classList.add('sheet');
  setTimeout(() => document.addEventListener('click', cmtOutside), 0);
};
window.closeCmt = () => { const p = document.getElementById('cmt-pop'); if (p) p.remove(); document.removeEventListener('click', cmtOutside); };
function cmtOutside(e) { if (!e.target.closest('#cmt-pop')) closeCmt(); }
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCmt(); });
window.copyPromo = (btn, code) => {
  const done = () => { btn.classList.add('copied'); btn.querySelector('.promo-hint').textContent = 'скопирован'; setTimeout(() => { btn.classList.remove('copied'); btn.querySelector('.promo-hint').textContent = 'скопировать'; }, 1800); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(done, done);
  else { const t = document.createElement('textarea'); t.value = code; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) { /* old browsers */ } t.remove(); done(); }
};
const tested = D.services.filter((s) => s.tested);
const untested = D.services.filter((s) => !s.tested);
const TOTAL = D.tasks.reduce((a, t) => a + t.total, 0);
// «Полнота ответов» is shown as the share of all criteria (key and optional) the service met.
const pct = (pts) => (TOTAL ? Math.round((pts / TOTAL) * 100) : 0) + '%';
const AREA_N = D.areas.map((_, i) => D.tasks.filter((t) => t.area === i).length);
// Site settings from the sheet «Настройки сайта»; empty values fall back to what the data says.
const SET = D.settings || {};
const set = (k, def) => (SET[k] !== undefined && String(SET[k]).trim() !== '' ? String(SET[k]).trim() : def);
const EMAIL = set('contact_email', 'academy@runetlex.ru');
const N_SERVICES = set('stat_services', String(tested.length || D.services.length));
const N_TASKS = set('stat_tasks', String(D.tasks.length));
const N_EXPERTS = set('stat_experts', String(D.experts.filter((e) => !e.hidden).length));
const UPDATED = set('updated', '');
// Team preview of package layouts: add ?preview to the address (e.g. /?preview#/service/S001).
const PREVIEW = /[?&]preview\b/.test(location.search);
const one = (n) => n % 10 === 1 && n % 100 !== 11;
const svcWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'сервис' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'сервиса' : 'сервисов');
const WARN = '<svg class="bulb" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16.5v.01"/></svg>';
const BULB = '<svg class="bulb" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></svg>';
const hint = (...paras) => `<div class="hint">${BULB}<div class="hint-body">${paras.map((p, i) => `<p>${i ? '' : '<b>Подсказка:</b> '}${p}</p>`).join('')}</div></div>`;
// Collapsible hint: only the title line is shown until the reader opens it.
const hintMore = (title, ...paras) => `<details class="hint hint-more"><summary>${BULB}<span>${title}</span><span class="hint-chev" aria-hidden="true"></span></summary><div class="hint-body">${paras.map((p) => (/^<ul/.test(p) ? p : `<p>${p}</p>`)).join('')}</div></details>`;
const METHOD_LINK = '<a href="#/method">Методология</a>';
const PERIOD = set('collection_period', '29.10–13.11.2026');
// Shown next to every result: the benchmark measures one function, not the whole service.
const DISCLAIMER_TEXT = '<p>Мы проверяли одну функцию сервисов: как они отвечают на практический правовой вопрос. Результат бенчмарка говорит только об этом и не равен оценке сервиса целиком. Работа с документами, поиск судебной практики и другие возможности в этой проверке не участвовали.</p><p>У проверки есть ограничения:</p><ul><li>для одних сервисов ответ на правовой вопрос — главная функция, для других дополнительная, например к работе с договорами;</li><li>одни сервисы дают готовый ответ, другие помогают юристу подготовить собственное заключение.</li></ul><p>Поэтому слабый результат здесь не значит, что сервис плохо справляется с задачами, для которых он создан.</p>';
// «Важно»: an open note on wide screens; on phones it folds like «Как читать таблицу».
const DISCLAIMER = '<div class="disclaimer disc-wide"><p><b>Важно.</b> ' + DISCLAIMER_TEXT.slice(3) + '</div><details class="hint hint-more disc-fold"><summary>' + WARN + '<span>Важно: что значит результат</span><span class="hint-chev" aria-hidden="true"></span></summary><div class="hint-body">' + DISCLAIMER_TEXT + '</div></details>';
// Course promo under the hero; texts can be overridden from «Настройки сайта».
const COURSE_URL = set('course_url', 'https://runetlex-academy.ru/neuralnetworks?utm_source=benchmark&utm_medium=course_block');
const MOUNTAINS = '<svg class="course-art" viewBox="0 0 320 200" aria-hidden="true"><polygon points="0,200 70,110 120,150 175,60 230,130 270,95 320,140 320,200" fill="#1a56db" opacity=".18"/><polygon points="20,200 110,95 160,140 205,40 260,120 320,200" fill="#1a56db" opacity=".55"/><polygon points="205,40 230,80 214,76 200,100 188,82 175,90" fill="#fff" opacity=".9"/><polygon points="90,200 205,40 320,200" fill="#1a56db"/><path d="M205,40 C215,80 190,100 210,130 C228,158 200,175 215,200" fill="none" stroke="#f62a17" stroke-width="3"/><circle cx="205" cy="40" r="7" fill="#f62a17"/></svg>';
// Partners: services with any paid package, highest package first; each logo links to the service site.
const PKG_RANK = { p3: 3, p2: 2, p1: 1 };
const FAIR = '<div class="fair"><p>Место в бенчмарке и итоговые оценки не могли быть приобретены или изменены по запросу вендора. Все сервисы тестировались в равных условиях; вендоры не получали информации о задачах, сроках и порядке проверки, а также предварительных результатах.</p><p>Доступ к каждому сервису команда оформляла самостоятельно. Мы предложили всем вендорам возможность поддержать бенчмарк, оплатив размещение подробной информации о себе на странице сайта бенчмарка. На это предложение откликнулись Докзилла, aiXpert, Когневия, Консультант Плюс, ПравоТех, Стриж и jhelper.</p></div>';
const partnersBlock = () => { const ps = D.services.filter((s) => PKG_RANK[s.pkg]).sort((x, y) => PKG_RANK[y.pkg] - PKG_RANK[x.pkg] || x.name.localeCompare(y.name, 'ru')); return ps.length ? `<div class="partners" id="partners"><h2>Партнёры Рунетлекс Бенчмарк</h2><div class="gallery"><div class="gallery-track partners-track">${ps.map((s) => `<a class="logo-item logo-img partner${s.logo ? '' : ' logo-txt'}" href="#/service/${s.id}" title="${esc(s.name)}">${s.logo ? `<img src="${esc(s.logo)}" alt="${esc(s.name)}">` : `<span>${esc(s.name)}</span>`}</a>`).join('')}</div><div class="gallery-nav"><button type="button" class="gbtn" aria-label="назад" onclick="slideLogos(this,-1)">←</button><button type="button" class="gbtn" aria-label="вперёд" onclick="slideLogos(this,1)">→</button></div></div>${FAIR}</div>` : ''; };
const courseBlock = () => `<div class="course" id="course"><div class="course-body"><div class="course-pills"><span>${esc(set('course_stream', '8 поток'))}</span><span>${esc(set('course_dates', '16 ноября — 19 декабря 2026'))}</span></div><p class="course-kicker">Курс Рунетлекс Академии</p><h2 class="course-title">${esc(set('course_title', 'Нейросети для юриста: практика и результат'))}</h2><p>${esc(set('course_text', 'Пять недель практики, на которых вы соберёте своих ИИ-помощников для работы с документами, договорами и судебными делами. Успеете начать работать с ними ещё до нового года.'))}</p><ul class="course-facts"><li>5 недель</li><li>2 вебинара в неделю</li><li>4 ИИ-агента</li></ul>${set('course_promo', 'BENCH10') ? `<p class="course-promo">Промокод <button type="button" class="promo-copy" onclick="copyPromo(this,'${esc(set('course_promo', 'BENCH10'))}')" title="Скопировать промокод"><b>${esc(set('course_promo', 'BENCH10'))}</b><span class="promo-hint">скопировать</span></button> даёт скидку ${esc(set('course_promo_discount', '10%'))}</p>` : ''}<div class="course-cta"><a class="btn red" href="${esc(COURSE_URL)}" target="_blank" rel="noopener">Записаться на курс</a><a class="course-more" href="${esc(COURSE_URL)}" target="_blank" rel="noopener">Посмотреть программу</a></div></div>${MOUNTAINS}</div>`;

function stats(s) {
  const solved = s.res.filter((r) => r.s).length;
  const pts = s.res.reduce((a, r) => a + r.p, 0);
  const src = s.res.filter((r) => r.src).length;
  const byArea = D.areas.map((_, a) => s.res.filter((r) => task(r.t).area === a && r.s).length);
  return { solved, pts, src, byArea, min: Math.min(...byArea) };
}
const ST = {}; tested.forEach((s) => { ST[s.id] = stats(s); });
const ranked = [...tested].sort((a, b) => ST[b.id].solved - ST[a.id].solved || ST[b.id].pts - ST[a.id].pts);
const isLatin = (n) => /^[A-Za-z]/.test(n);
const byName = (a, b) => (isLatin(b.name) - isLatin(a.name)) || a.name.localeCompare(b.name, isLatin(a.name) ? 'en' : 'ru', { sensitivity: 'base' });
// Nominations: fixed list from the nominations sheet (name, winners, what it measures, formula).
const KEY_F = 'Число ответов, выполнивших все применимые ключевые критерии / число ответов со всеми валидно оценёнными ключевыми критериями';
const UNI_F = 'Сумма оценок по точному нормализованному тексту универсального критерия / число его валидных сданных оценок';
const areaNom = (area) => `Доля полностью решённых задач в отрасли «${area}».`;
const NOMS = [
  { t: 'Самое аккуратное обращение с фактами', w: ['S017'], m: 'Доля баллов по критерию, который проверяет, не добавляет ли ответ обстоятельства вне фабулы и не выдаёт ли несостоявшиеся события за состоявшиеся.', f: UNI_F },
  { t: 'Самая надёжная опора на источники', w: ['S005'], m: 'Доля баллов по критерию корректности и достаточности ссылок на нормы права и судебную практику.', f: UNI_F },
  { t: 'Больше всего полностью решённых задач', w: ['S006'], m: 'Доля ответов, в которых выполнены все применимые ключевые критерии.', f: KEY_F },
  { t: 'Самая сильная дополнительная проработка', w: ['S028'], m: 'Доля набранных баллов по опциональным критериям без трёх универсальных критериев.', f: 'Сумма валидных сданных оценок по прочим опциональным критериям / число таких оценок' },
  { t: 'Сильнее всего в корпоративном праве', w: ['S026'], m: areaNom('Корпоративное право'), f: KEY_F },
  { t: 'Сильнее всего в разрешении споров', w: ['S003'], m: areaNom('Разрешение споров'), f: KEY_F },
  { t: 'Сильнее всего в интеллектуальной собственности', w: ['S015', 'S017'], m: areaNom('Интеллектуальная собственность'), f: KEY_F },
  { t: 'Сильнее всего в вопросах недвижимости', w: ['S006'], m: areaNom('Недвижимость'), f: KEY_F },
  { t: 'Сильнее всего в договорном праве', w: ['S018', 'S028', 'S006'], m: areaNom('Договорное право'), f: KEY_F },
  { t: 'Самый сильный по всем отраслям', w: ['S006'], m: 'Среднее отраслевых долей полностью решённых задач при одинаковом весе каждой отрасли.', f: 'Сумма отраслевых долей полностью решённых задач / число отраслей' },
].map((n, i) => ({ ...n, i, w: n.w.map(byId).filter(Boolean) })).filter((n) => n.w.length);
const nomsOf = (id) => NOMS.filter((n) => n.w.some((x) => x.id === id));
const winLinks = (n) => n.w.map((x) => `<a href="#/service/${x.id}">${esc(x.name)}</a>`).join(', ');
const nomCard = (n) => `<div class="box nomc"><span class="tag nom">${n.t}</span><p class="b">${n.w.length > 1 ? 'Ничья: ' : ''}${winLinks(n)}</p><button type="button" class="nom-how" onclick="event.stopPropagation();openNom(${n.i},this)">Как считали</button></div>`;
// Same light popup as the vendor comments: next to the button on wide screens, from the bottom on phones.
window.openNom = (i, btn) => {
  closeCmt(); const n = NOMS.find((x) => x.i === i); if (!n) return;
  const pop = document.createElement('div'); pop.className = 'cmt-pop nom-pop'; pop.id = 'cmt-pop'; pop.setAttribute('role', 'dialog');
  pop.innerHTML = `<div class="cmt-head"><div class="cmt-who"><p class="muted">номинация</p><p class="b">${n.t}</p></div><button type="button" class="cmt-x" aria-label="закрыть" onclick="closeCmt()">×</button></div><p class="nom-win">${n.w.length > 1 ? 'Ничья' : 'Победитель'}: ${n.w.map((x) => `<a href="#/service/${x.id}" onclick="closeCmt()">${esc(x.name)}</a>`).join(', ')}</p><div class="nom-part"><p class="b">Что измеряет номинация</p><p>${n.m}</p></div><div class="nom-part"><p class="b">Формула расчёта</p><p>${n.f}</p></div>`;
  document.body.appendChild(pop);
  if (window.innerWidth > 640 && btn) {
    const r = btn.getBoundingClientRect(); const w = pop.offsetWidth;
    pop.style.left = Math.max(16, Math.min(r.left, window.innerWidth - w - 16)) + 'px';
    pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
  } else pop.classList.add('sheet');
  setTimeout(() => document.addEventListener('click', cmtOutside), 0);
};

const NAV = [['#/', 'Результаты', 'results'], ['#/method', 'Методология', null], ['#/catalog', 'Все ИИ-сервисы', null], ['#/cases', 'Кейсы', null], ['#/experts', 'Эксперты', null], ['#/about', 'О нас', null]];
function nav(cur) {
  return '<div class="nav"><a class="logo" href="#/" aria-label="Рунетлекс Бенчмарк">' + WM + '<span class="x">×</span><span class="prod">бенчмарк</span></a><div class="navlinks">' + NAV.map(([h, n, t]) => { const oc = t ? ` onclick="goTo('${t}',this)"` : ''; return `<a href="${h}" class="${cur === h ? 'cur' : ''}"${oc}>${n}</a>`; }).join('') + '</div><span class="muted right"></span><button class="burger" aria-label="меню" onclick="document.body.classList.toggle(\'menu-open\')"><span></span><span></span><span></span></button><div class="mmenu">' + NAV.map(([h, n, t]) => { const oc = t ? `goTo('${t}',this);` : ''; return `<a href="${h}" class="${cur === h ? 'cur' : ''}" onclick="document.body.classList.remove('menu-open');${oc}">${n}</a>`; }).join('') + '</div></div>';
}
const foot = `<footer class="foot">
<a class="logo" href="#/" aria-label="Рунетлекс Бенчмарк">${WM}<span class="x">×</span><span class="prod">бенчмарк</span></a>
<div class="fcol"><p>ИП Мищенко Павел Андреевич</p><p>ИНН 772972822874</p><p>ОГРНИП 318774600011541</p><a href="${set('policy_url', '#')}" target="_blank" rel="noopener">Политика в отношении обработки персональных данных</a></div>
<div class="fcol"><p class="fh">Свяжитесь с нами</p><a href="mailto:${EMAIL}">${EMAIL}</a></div>
<div class="fcol"><p class="fh">Адрес</p><p>Москва,<br>Летниковская, 16</p></div>
</footer>`;

// Forms post to the Apps Script web app from «Настройки сайта» (forms_endpoint, tools/forms.gs); without it they open a prefilled email.
window.sendForm = (ev, subject) => {
  ev.preventDefault();
  const f = ev.target; const ok = f.querySelector('.form-ok'); const btn = f.querySelector('button');
  const fields = [...f.elements].filter((el) => el.name && !(el.closest('[hidden]')));
  const val = (el) => (el.type === 'checkbox' ? (el.checked ? 'да' : 'нет') : el.value.trim());
  const endpoint = set('forms_endpoint', '');
  if (endpoint) {
    const body = new URLSearchParams({ form: subject, page: location.hash || '#/' });
    fields.forEach((el) => body.append(el.name, val(el)));
    btn.disabled = true;
    fetch(endpoint, { method: 'POST', mode: 'no-cors', body }).then(() => { ok.textContent = f.dataset.done; ok.hidden = false; f.reset(); })
      .catch(() => { ok.textContent = `Не получилось отправить. Напишите нам на ${EMAIL}.`; ok.hidden = false; })
      .finally(() => { btn.disabled = false; });
    return;
  }
  const lines = fields.filter((el) => el.name !== 'website').map((el) => `${el.dataset.label || el.name}: ${val(el)}`);
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  ok.textContent = 'Спасибо! Откроется почта с заполненным письмом, отправьте его.'; ok.hidden = false;
};
const field = (name, label, attrs = '') => `<label class="fld"><span>${label}</span><input name="${name}" data-label="${label}" required ${attrs}></label>`;
const consent = () => `<label class="chk"><input type="checkbox" name="consent" data-label="Согласие на обработку ПДн" required><span>Я соглашаюсь на обработку персональных данных в соответствии с <a href="${set('policy_url', '#')}" target="_blank" rel="noopener">политикой</a></span></label>`;
// The hidden «website» field is a bot trap: people never see it, the form script drops submissions that fill it.
const formBox = (title, subject, fields, btn, done = 'Спасибо! Заявка отправлена.') => `<form class="box form" onsubmit="sendForm(event,'${subject}')" data-done="${done}"><p class="b">${title}</p>${fields}<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn dark" type="submit">${btn}</button><p class="note form-ok" hidden></p></form>`;
// Area filter, the same on every page: pills on wide screens, a dropdown on phones.
function areaTags(sel, on) {
  const pills = '<div class="seg" role="tablist" aria-label="отрасль права">' + ['<button class="' + (sel === -1 ? 'on' : '') + '" onclick="' + on + '(-1)">все отрасли</button>'].concat(D.areas.map((a, i) => '<button class="' + (sel === i ? 'on' : '') + '" onclick="' + on + '(' + i + ')">' + a + '</button>')).join('') + '</div>';
  const drop = `<label class="fsel afsel"><span class="muted">Отрасль</span><select aria-label="отрасль права" onchange="${on}(+this.value)"><option value="-1"${sel === -1 ? ' selected' : ''}>все отрасли</option>${D.areas.map((a, i) => `<option value="${i}"${sel === i ? ' selected' : ''}>${a}</option>`).join('')}</select></label>`;
  return pills + drop;
}
const areaFilter = (sel, on) => `<div class="filters">${areaTags(sel, on)}</div>`;
window.setArea = (i) => refilter(() => { S.area = i; render(true); });
// Re-render without moving the page: the element the user clicked stays at the same place on screen.
function keepInPlace(sel, fn) {
  const el = sel && document.querySelector(sel); const top = el ? el.getBoundingClientRect().top : null;
  fn();
  const el2 = sel && document.querySelector(sel);
  if (top !== null && el2) window.scrollBy(0, el2.getBoundingClientRect().top - top);
}
// Filters: if the sticky bar is pinned, show the start of the new list right under it; otherwise stay put.
function refilter(fn) {
  const bar = document.querySelector('.filters, .content > .seg, .sec > .seg, .wrap > .seg');
  const navh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navh')) || 60;
  const pinned = bar && bar.getBoundingClientRect().top <= navh + 1 && bar.nextElementSibling && bar.nextElementSibling.getBoundingClientRect().top < bar.getBoundingClientRect().bottom;
  const idx = bar ? [...document.querySelectorAll('.filters, .seg')].indexOf(bar) : -1;
  keepInPlace(null, fn);
  if (!pinned || idx < 0) return;
  const bar2 = document.querySelectorAll('.filters, .seg')[idx]; const list = bar2 && bar2.nextElementSibling;
  if (list) window.scrollTo(0, list.getBoundingClientRect().top + window.scrollY - navh - bar2.offsetHeight);
}
window.setTaskArea = (i) => refilter(() => { S.taskArea = i; render(true); });
window.setFilt = (f) => refilter(() => { S.filt = f; render(true); });
window.toggle = (k) => keepInPlace(`[data-k="${k}"]`, () => { S.open[k] = !S.open[k]; render(true); });
window.setView = (id, v) => { S.view[id] = v; render(true); };

function home() {
  const a = S.area;
  const order = a === -1 ? ranked : [...ranked].sort((x, y) => ST[y.id].byArea[a] - ST[x.id].byArea[a] || ST[y.id].solved - ST[x.id].solved);
  const vOf = (s) => (a === -1 ? ST[s.id].solved : ST[s.id].byArea[a]);
  const maxV = Math.max(...order.map(vOf));
  const rows = order.map((s) => {
    const st = ST[s.id];
    const solved = a === -1 ? st.solved + ' / ' + D.tasks.length : st.byArea[a] + ' / ' + AREA_N[a];
    const strong = st.byArea.map((v, i) => [v, i]).sort((x, y) => y[0] - x[0]).slice(0, 2).map((x) => D.short[x[1]]).join(', ');
    return `<tr class="clk" onclick="location.hash='#/service/${s.id}'"><td><a class="sname" href="#/service/${s.id}">${s.name}</a></td><td>${solved}</td><td>${pct(st.pts)}</td><td>${strong}</td><td class="ccell">${commentCell(s)}</td></tr>`;
  });
  const chartMax = a === -1 ? D.tasks.length : AREA_N[a];
  const top5 = order.slice(0, 5).map((s, i) => {
    const st = ST[s.id];
    const val = a === -1 ? st.solved : st.byArea[a];
    const pct = Math.round((val / chartMax) * 100);
    return `<div class="bar-row"><a href="#/service/${s.id}" class="thin">${s.name}</a><div class="bar-track"><div class="bar-fill${val === maxV ? ' top' : ''}" style="width:${pct}%"></div></div><span class="muted">${val} / ${chartMax}</span></div>`;
  }).join('');
  return `
<div class="hero">
<h1 class="hero-title">Рунетлекс<br><em>Бенчмарк</em></h1>
<p class="hero-sub">// оценка юридических ИИ-сервисов</p>
<span class="updated"><span class="dot"></span>сбор ответов сервисов: ${esc(PERIOD)}</span>
<div class="cta-hero"><a class="btn dark" href="#/" onclick="goTo('stats',this)">Смотреть результаты</a><a class="btn" href="#/catalog">Найти сервис под задачу</a><a class="btn" href="#/method" onclick="goTo('m-report',this)">Получить отчёт</a></div>
</div>
<div class="grid4" id="stats"><a class="box stat lnk" href="#/catalog"><span class="num">${N_SERVICES}</span><p class="muted">${one(+N_SERVICES) ? "юридический" : "юридических"} ИИ-${svcWord(+N_SERVICES)}</p><span class="stat-go">все сервисы →</span></a><a class="box stat lnk" href="#/method" onclick="goTo('m-tasks',this)"><span class="num">${N_TASKS}</span><p class="muted">${taskWord(+N_TASKS)} по пяти отраслям права</p><span class="stat-go">к задачам →</span></a><a class="box stat lnk" href="#/experts"><span class="num">${N_EXPERTS}</span><p class="muted">экспертов готовили задачи для оценки</p><span class="stat-go">к экспертам →</span></a><a class="box stat lnk" href="#/" onclick="event.preventDefault();go('results')"><span class="num">${NOMS.length}</span><p class="muted">номинаций</p><span class="stat-go">к номинациям ↓</span></a></div>
${D.takeaways.length ? `<div class="takeaways"><h2>Ключевые выводы</h2><ol>${D.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ol></div>` : ''}
<div class="sec" id="results"><h2>Номинации</h2>
<div class="grid4 noms-row noms10">${NOMS.map(nomCard).join('')}</div></div>
<div class="sec" id="all-results"><div class="layout">
<div class="content">
<h2>Результаты${a === -1 ? ' по всем задачам' : ': ' + D.short[a]}</h2>
${DISCLAIMER}
${areaFilter(a, 'setArea')}
<div class="chart">${top5}</div>
${hintMore('Как читать таблицу', 'У каждого сервиса два показателя:', `<ul class="hint-list"><li><b>Решено задач</b> — сколько ответов можно использовать в работе: в них выполнены все ключевые критерии.</li><li><b>Полнота ответов</b> — доля всех критериев, ключевых и опциональных, которые сервис выполнил по всем ${N_TASKS} задачам.</li></ul>`, `Например, «${Math.round(+N_TASKS / 2)} из ${N_TASKS}» и «65%» означают, что половина ответов пригодна для работы, а в целом ответы содержат почти две трети того, что ожидали эксперты.`, 'Показатели не зависят друг от друга. Подробный ответ не засчитывается, если не выполнен хотя бы один ключевой критерий, а засчитанный ответ может быть коротким.', `<b>Сильные отрасли</b> — отрасли, в которых сервис решил больше всего задач. Задачи, ответы и оценки — на странице сервиса и в разделе ${METHOD_LINK}.`)}
<table class="rtable"><tr><th>сервис</th><th>решено задач${a === -1 ? '' : ', ' + D.short[a]}</th><th>полнота ответов</th><th>сильные отрасли</th><th>комментарий к результатам</th></tr>${rows.join('')}</table>
</div></div>
<div class="row cta-list"><a class="btn dark" href="#/method" onclick="goTo('m-report',this)">Получить отчёт</a><a class="btn" href="#/method" onclick="goTo('m-tasks',this)">Смотреть задачи</a><a class="btn" href="#/method">Изучить методологию</a></div></div>
${partnersBlock()}`;
}

function skillTags(s) { return '<div class="row skills" style="gap:8px">' + s.skills.map((k) => `<span class="tag soft">${k}</span>`).join('') + '</div>'; }
function viewSwitch(id, opts) {
  const v = S.view[id] || opts[0][0];
  return '<div class="switch"><span class="muted">показать как:</span>' + opts.map(([k, n]) => `<span class="tag ${v === k ? 'on' : ''}" onclick="setView('${id}','${k}')">${n}</span>`).join('') + '</div>';
}
const PKGS = [['free', 'без покупки'], ['p1', 'пакет 1'], ['p2', 'пакет 2'], ['p3', 'пакет 3']];
const LVL = { free: 0, p1: 1, p2: 2, p3: 3 };
const vendorTag = '<span class="vtag">материал вендора</span>';
// A vendor field: the value from the sheet; in team preview an empty field shows a placeholder so the layout is visible.
const vf = (v, ph) => (v ? esc(v) : PREVIEW ? `<span class="muted">${ph}</span>` : '');
const url = (u) => (/^https?:\/\//.test(u) ? u : 'https://' + u);
// A service may list several addresses (one per line); the site shows and links the first one.
const site1 = (s) => String(s || '').trim().split(/[\s,]+/)[0] || '';
const siteText = (s) => site1(s).replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
// Demo links from Kinescope, YouTube, Rutube or VK become an embedded player; any other link stays a button.
const embedUrl = (raw) => {
  const u = url(String(raw || '').trim()); let m;
  if ((m = u.match(/kinescope\.io\/(?:embed\/|watch\/)?([A-Za-z0-9]+)/))) return 'https://kinescope.io/embed/' + m[1];
  if ((m = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/))) return 'https://www.youtube.com/embed/' + m[1];
  if ((m = u.match(/rutube\.ru\/(?:video|play\/embed)\/([a-f0-9]{20,})/))) return 'https://rutube.ru/play/embed/' + m[1];
  if ((m = u.match(/vk(?:video)?\.(?:com|ru)\/.*video(-?\d+)_(\d+)/))) return `https://vkvideo.ru/video_ext.php?oid=${m[1]}&id=${m[2]}&hd=2`;
  return '';
};
const gallery = (items, cls, label) => `<div class="gallery" aria-label="${label}"><div class="gallery-track ${cls}">${items}</div><div class="gallery-nav"><button type="button" class="gbtn" aria-label="назад" onclick="slideLogos(this,-1)">←</button><button type="button" class="gbtn" aria-label="вперёд" onclick="slideLogos(this,1)">→</button></div></div>`;
// Screenshot viewer: opens over the page, arrows / keys / swipe move between screenshots.
const LB = { list: [], i: 0, name: '' };
function lbShow() {
  const el = document.getElementById('lb'); if (!el) return;
  el.querySelector('img').src = LB.list[LB.i];
  el.querySelector('.lb-count').textContent = `${LB.i + 1} / ${LB.list.length}`;
}
window.openShot = (sid, i) => {
  const s = byId(sid); if (!s) return;
  LB.list = s.shots || []; LB.i = i; LB.name = s.name;
  let el = document.getElementById('lb');
  if (!el) {
    el = document.createElement('div'); el.id = 'lb'; el.className = 'lb'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = '<button type="button" class="lb-close" aria-label="закрыть" onclick="closeShot()">×</button><button type="button" class="lb-arr lb-prev" aria-label="предыдущий" onclick="stepShot(-1)">←</button><figure class="lb-fig"><img alt=""><figcaption class="lb-count"></figcaption></figure><button type="button" class="lb-arr lb-next" aria-label="следующий" onclick="stepShot(1)">→</button>';
    el.addEventListener('click', (e) => { if (e.target === el || e.target.classList.contains('lb-fig')) closeShot(); });
    let x0 = null;
    el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) stepShot(dx < 0 ? 1 : -1); });
    document.body.appendChild(el);
  }
  el.querySelector('img').alt = 'скриншот ' + LB.name;
  el.classList.toggle('single', LB.list.length < 2);
  lbShow(); document.body.style.overflow = 'hidden'; el.hidden = false;
};
window.stepShot = (d) => { if (!LB.list.length) return; LB.i = (LB.i + d + LB.list.length) % LB.list.length; lbShow(); };
window.closeShot = () => { const el = document.getElementById('lb'); if (el) el.hidden = true; document.body.style.overflow = S.modal ? 'hidden' : ''; };
document.addEventListener('keydown', (e) => { const el = document.getElementById('lb'); if (!el || el.hidden) return; if (e.key === 'Escape') closeShot(); else if (e.key === 'ArrowRight') stepShot(1); else if (e.key === 'ArrowLeft') stepShot(-1); });
function svcHead(s) {
  const line = vf(s.line, '[Слоган: одна строка о сервисе]');
  return `<div class="svc-head"><div class="svc-logo${s.logo ? '' : ' svc-ini'}">${s.logo ? `<img src="${esc(s.logo)}" alt="">` : esc(s.name.slice(0, 2).toUpperCase())}</div><div class="col svc-hcol"><h1>${esc(s.name)}</h1>${line ? `<p class="muted">${line}</p>` : ''}${skillTags(s)}<p class="svc-site"><a href="${url(site1(s.site))}" target="_blank" rel="noopener">${esc(siteText(s.site))}</a></p></div></div>`;
}
function areaBars(st) {
  return `<div class="box"><p class="b">По отраслям</p><div class="abars">${D.areas.map((n, i) => { const pct = AREA_N[i] ? Math.round((st.byArea[i] / AREA_N[i]) * 100) : 0; return `<div class="abar"><span>${D.short[i]}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><span class="muted">${st.byArea[i]} / ${AREA_N[i]}</span></div>`; }).join('')}</div></div>`;
}
// Emails, phones and links in vendor contacts become clickable (text is escaped first).
const linkify = (html) => html.replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g, '<a href="mailto:$1">$1</a>').replace(/(\+?\d[\d\s()-]{8,}\d)/g, (m) => `<a href="tel:${m.replace(/[^\d+]/g, '')}">${m}</a>`).replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
const box = (title, body, tag = true) => (body ? `<div class="box"><div class="between"><h2>${title}</h2>${tag ? vendorTag : ''}</div>${body}</div>` : '');
function pkgBlocks(s, lvl) {
  if (lvl === 0) return '';
  const desc = lvl >= 2 ? vf(s.full || s.short, '[Полное описание сервиса от вендора: что делает, для кого, чем отличается.]') : vf(s.short, '[Краткое описание сервиса от вендора, два-три предложения.]');
  const promo = s.promo || PREVIEW ? `<p><a href="${url(site1(s.site))}" target="_blank" rel="noopener">Перейти на сайт</a>, промокод <b>${vf(s.promo, '[XXXX]')}</b></p>` : '';
  const contact = lvl >= 2 ? vf(s.contact, '[имя, должность, почта или телефон]') : '';
  let out = contact ? `<div class="buy"><p class="buy-h">Контакт для закупки</p><p class="pre">${linkify(contact)}</p></div>` : '';
  out += box('Описание', (desc ? `<p class="pre">${desc}</p>` : '') + promo);
  if (lvl >= 2) {
    const how = vf(s.how, '[Развёрнутый текст вендора с примерами решения задач.]');
    out += box('Как сервис решает задачи юриста', how ? `<p class="pre">${how}</p>` : '');
    const shots = (s.shots || []).map((u, i) => `<button type="button" class="shot" onclick="openShot('${s.id}',${i})" aria-label="открыть скриншот ${i + 1}"><img src="${esc(u)}" alt="скриншот ${esc(s.name)}" loading="lazy"></button>`).join('');
    if (shots) out += `<div class="box"><div class="between"><h2>Как работает сервис</h2>${vendorTag}</div>${gallery(shots, 'shots-track', 'как работает сервис')}</div>`; else if (PREVIEW) out += '<div class="grid2"><div class="ph media">скриншоты</div><div class="ph media">демо</div></div>';
    if (s.demo) { const em = embedUrl(s.demo); out += box('Демо', em ? `<div class="player"><iframe src="${esc(em)}" title="Демо ${esc(s.name)}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write" allowfullscreen loading="lazy"></iframe></div><p class="muted player-alt"><a href="${esc(url(s.demo))}" target="_blank" rel="noopener">Посмотреть демо в отдельном окне</a></p>` : `<p><a class="btn" href="${esc(url(s.demo))}" target="_blank" rel="noopener">Посмотреть демо</a></p>`); }
  }
  if (lvl >= 3) {
    const cs = D.cases.filter((c) => c.service === s.id);
    out += cs.length ? `<div class="box"><div class="between"><h2>${cs.length > 1 ? 'Кейсы с клиентами' : 'Кейс с клиентом'}</h2>${vendorTag}</div>${gallery(cs.map((c) => caseCard(c, true)).join(''), 'cases-track', 'кейсы с клиентами')}<a class="more" href="#/cases">Все кейсы</a></div>`
      : (PREVIEW ? box('Кейс с клиентом', '<p class="muted">[Кейс появится, когда вендор заполнит его на листе «Кейсы».]</p>') : '');
    if (s.video) out += box('Видеообзор интерфейса', `<p class="muted">Обзор от Павла Мищенко, 20 минут</p><p><a class="btn" href="${esc(url(s.video))}" target="_blank" rel="noopener">Смотреть обзор</a></p>`, false);
    else if (PREVIEW) out += box('Видеообзор интерфейса', '<p class="muted">Обзор от Павла Мищенко, 20 минут</p><div class="ph media wide">видео</div>', false);
  }
  return out ? `<div class="sec"><h2>О сервисе</h2>${out}</div>` : '';
}

// Task texts and answers come as light Markdown: ### headings, **bold**, lists, > quotes, | tables |.
// Everything is escaped first, so a text can never inject HTML.
const inlineMd = (s) => esc(s).replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>').replace(/__([^_]+?)__/g, '<b>$1</b>').replace(/(^|[\s(«])\*([^*\s][^*]*?)\*(?=[\s).,;:!?»]|$)/g, '$1<i>$2</i>');
function richText(txt) {
  const lines = String(txt || '').replace(/\r/g, '').split('\n').map((l) => l.trim());
  const out = []; let i = 0;
  const isTable = (l) => /^\|.*\|$/.test(l);
  const isSep = (l) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(l);
  const cells = (l) => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  while (i < lines.length) {
    const l = lines[i];
    if (!l) { i += 1; continue; }
    let m;
    if ((m = l.match(/^#{1,6}\s+(.*)$/))) { out.push(`<h4>${inlineMd(m[1].replace(/\s*#+$/, ''))}</h4>`); i += 1; continue; }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(l)) { out.push('<hr>'); i += 1; continue; }
    if (isTable(l)) {
      const rows = []; while (i < lines.length && isTable(lines[i])) { rows.push(lines[i]); i += 1; }
      const head = rows.length > 1 && isSep(rows[1]) ? cells(rows[0]) : null; const body = rows.slice(head ? 2 : 0).filter((r) => !isSep(r)).map(cells);
      out.push(`<div class="md-table"><table>${head ? `<thead><tr>${head.map((c) => `<th>${inlineMd(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inlineMd(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^>/.test(l)) { const q = []; while (i < lines.length && /^>/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, '')); i += 1; } out.push(`<blockquote>${q.filter(Boolean).map((x) => `<p>${inlineMd(x)}</p>`).join('')}</blockquote>`); continue; }
    if (/^([-*•–]|\d+[.)])\s+/.test(l)) {
      const ordered = /^\d+[.)]\s+/.test(l); const items = [];
      while (i < lines.length && (/^([-*•–]|\d+[.)])\s+/.test(lines[i]) || (!lines[i] && i + 1 < lines.length && /^([-*•–]|\d+[.)])\s+/.test(lines[i + 1])))) {
        if (lines[i]) items.push(lines[i].replace(/^([-*•–]|\d+[.)])\s+/, '')); i += 1;
      }
      const tag = ordered ? 'ol' : 'ul'; out.push(`<${tag}>${items.map((x) => `<li>${inlineMd(x)}</li>`).join('')}</${tag}>`); continue;
    }
    out.push(`<p>${inlineMd(l)}</p>`); i += 1;
  }
  return out.join('');
}
// «Показать полностью»: the start of the text stays where it was, the rest unfolds downward.
// «Свернуть»: if the block's start has scrolled off screen, bring it back under the menu.
window.toggleMore = (k) => {
  const sel = `[data-sec="${k}"]`; const opening = !S.open[k];
  const r1 = document.querySelector(sel + ' .rich'); const before = r1 ? r1.getBoundingClientRect().top : null;
  S.open[k] = opening; render(true);
  const r2 = document.querySelector(sel + ' .rich'); if (!r2 || before === null) return;
  if (opening) { window.scrollBy(0, r2.getBoundingClientRect().top - before); return; }
  const navh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navh')) || 60;
  const bar = document.querySelector('.filters'); const cover = Math.max(navh, bar ? bar.getBoundingClientRect().bottom : 0) + 16;
  const top = document.querySelector(sel).getBoundingClientRect().top;
  if (top < cover) window.scrollBy(0, top - cover);
};
const clampBlock = (k, title, html) => { const open = S.open[k]; return `<section class="tblock" data-sec="${k}"><h3>${title}</h3><div class="rich${open ? '' : ' clamp'}">${html}</div><button type="button" class="more-btn" onclick="toggleMore('${k}')">${open ? 'Свернуть' : 'Показать полностью'}</button></section>`; };
// Task texts, criteria and all services' answers live in tasks/<id>.json and are fetched when a task is opened.
const LOADING = '<div class="tloading"><span class="spin" aria-hidden="true"></span>Загружаем текст задачи и ответы…</div>';
const TASKFILE = {};
function loadTask(id) {
  if (TASKFILE[id]) return; TASKFILE[id] = 'loading';
  const t = task(id);
  (window.fetchTaskFile ? window.fetchTaskFile(id) : fetch('tasks/' + encodeURIComponent(id) + '.json?v=' + encodeURIComponent(D.resultsAt || ''))
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status)))))
    .then((f) => {
      t.text = f.text; t.reference = f.reference; if (f.crit && f.crit.length) t.crit = f.crit;
      D.services.forEach((sv) => { const r = resOf(sv, id); if (r && f.answers && f.answers[sv.id] !== undefined) r.answer = f.answers[sv.id]; });
      t.loaded = true; TASKFILE[id] = 'ok';
    })
    .catch(() => { t.loaded = 'none'; TASKFILE[id] = 'none'; }) // demo data without task files: sample texts are shown
    .then(() => render(true));
}
const taskReady = (t) => { if (t.loaded) return true; loadTask(t.id); return false; };
// Per-criterion results come from r.c when loaded; until then statuses are derived from the score.
function critList(t, r) {
  const crit = t.crit || SAMPLE.crit;
  if (!r) return crit.map((c) => ({ ...c, ok: null }));
  if (r.c) return crit.map((c) => ({ ...c, ok: !!r.c[c.code] }));
  const keys = crit.filter((c) => c.type === 'key'); const opts = crit.filter((c) => c.type !== 'key');
  const okOpt = Math.max(0, Math.min(opts.length, Math.round((r.p / t.total) * opts.length)));
  let h = 0; for (const ch of t.id + r.p) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const met = opts.map((c, i) => [c, (i * 7 + h) % 11]).sort((a, b) => a[1] - b[1]).slice(0, okOpt).map((x) => x[0]);
  return crit.map((c) => ({ ...c, ok: c.type === 'key' ? (r.s || c !== keys[keys.length - 1]) : met.includes(c) }));
}
function critPanel(t, r) {
  const cl = critList(t, r);
  const grp = (isKey, title) => {
    const g = cl.filter((c) => (c.type === 'key') === isKey); const n = g.filter((c) => c.ok).length;
    return `<div class="cgroup"><div class="cgroup-h"><p class="b">${title}</p>${r ? `<span class="cscore">${n} из ${g.length}</span>` : ''}</div><ol class="clist">${g.map((c) => `<li class="citem${c.ok === null ? '' : c.ok ? ' ok' : ' no'}">${c.ok === null ? '' : `<span class="cmark" aria-hidden="true">${c.ok ? '✓' : '✕'}</span>`}<div><p class="chead"><span class="ccode">${c.code}</span>${c.ok === null ? '' : `<span class="cstate">${c.ok ? 'выполнен' : 'не выполнен'}</span>`}</p><p>${esc(c.text)}</p></div></li>`).join('')}</ol></div>`;
  };
  return `<aside class="crit-panel">${grp(true, 'Ключевые критерии')}${grp(false, 'Опциональные критерии')}</aside>`;
}
function taskDetail(s, t, r, k) {
  if (!taskReady(t)) return LOADING;
  return `<div class="tdetail"><div class="tmain">${clampBlock(k + 'q', 'Задача', richText(t.text || SAMPLE.task))}${clampBlock(k + 'a', `Ответ сервиса ${esc(s.name)}, дословно`, richText(r.answer || (t.loaded === true ? 'Текст ответа не найден.' : SAMPLE.answer)))}<a class="tlink" href="#/task/${t.id}">Эта задача у всех сервисов →</a></div>${critPanel(t, r)}</div>`;
}

// How the service was tested (tariff, mode) and the answer collector's comment, from notes.json.
function testedOn(s) {
  const rows = [['Тариф', s.tariff], ['Режим', s.mode]].filter((x) => x[1]);
  return rows.length ? `<dl class="tested-on">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : '';
}
function collectorBlock(s) {
  if (!s.collector) return '';
  return `<div class="sec" id="collector"><h2>Комментарий сборщика ответов</h2><div class="disclaimer"><p>Это комментарий сборщика ответов — специалиста, который отправлял задачи в сервис и собирал ответы. Это субъективное мнение одного человека о том, как было работать с сервисом. Оно не входит в оценку и приводится только для информации: делать по нему серьёзных выводов не стоит.</p></div><div class="box collector rich">${richText(s.collector)}</div></div>`;
}
function service(id) {
  const s = byId(id); if (!s) return '<p>Нет такого сервиса</p>';
  const lvl = LVL[S.view[id] || s.pkg || 'free'];
  const sw = PREVIEW ? `<div class="pkg-switch">${viewSwitch(id, PKGS)}</div>` : '';
  if (!s.tested) {
    return `<div class="pghead"><div><a class="btn backlink" href="#/catalog">← Ко всем сервисам</a></div>${sw}${svcHead(s)}${testedOn(s)}</div>${pkgBlocks(s, lvl)}${collectorBlock(s)}`;
  }
  const st = ST[s.id];
  const resultBlock = `<div class="sec"><h2>Результат</h2>
${DISCLAIMER}
<div class="grid3"><div class="box stat"><span class="num">${st.solved} / ${D.tasks.length}</span><p class="muted">задач решено</p></div><div class="box stat"><span class="num">${pct(st.pts)}</span><p class="muted">полнота ответов</p></div>${areaBars(st)}</div>
${lvl >= 1 ? box('Комментарий к результату', vf(s.comment, `[Комментарий вендора к своим результатам. Подпись: ${s.name}, дата.]`) ? `<p class="pre">${vf(s.comment, `[Комментарий вендора к своим результатам. Подпись: ${s.name}, дата.]`)}</p>` : '') : ''}</div>`;
  const f = S.filt; const ta = S.taskArea;
  const inArea = s.res.filter((r) => ta === -1 || task(r.t).area === ta);
  const cnt = { all: inArea.length, ok: inArea.filter((r) => r.s).length, no: inArea.filter((r) => !r.s).length };
  const taskRows = inArea.filter((r) => f === 'all' || (f === 'ok' ? r.s : !r.s)).map((r) => {
    const t = task(r.t); const k = id + r.t; const open = S.open[k];
    return `<div class="trow${open ? ' open' : ''}"><button type="button" class="trow-h" data-k="${k}" aria-expanded="${!!open}" onclick="toggle('${k}')"><span class="ttitle">${t.title}<span class="tmeta"><span>${D.short[t.area]}</span><span>${authorLabel(t)}: ${esc(authorNames(t))}</span></span></span><span class="tstat ${r.s ? 'ok' : 'no'}">${r.s ? 'решена' : 'не решена'}</span><span class="tpts">${r.p} / ${t.total}</span><span class="chev" aria-hidden="true"></span></button>${open ? taskDetail(s, t, r, k) : ''}</div>`;
  });
  const tasksBlock = `<div class="sec"><h2>По задачам</h2>
<div class="filters">${areaTags(ta, 'setTaskArea')}<div class="seg2" aria-label="итог по задаче">${[['all', 'Все'], ['ok', 'Решены'], ['no', 'Не решены']].map(([k, n]) => `<button type="button" class="${f === k ? 'on' : ''}" onclick="setFilt('${k}')">${n}<span>${cnt[k]}</span></button>`).join('')}</div></div>
<div class="tlist">${taskRows.join('') || '<p class="muted">Нет задач по выбранным фильтрам.</p>'}</div></div>`;
  return `<div class="pghead"><div><a class="btn backlink" href="#/" onclick="goTo('all-results',this)">← Ко всем результатам</a></div>
${sw}
${svcHead(s)}
${testedOn(s)}
${s.testedAt ? `<p class="muted" style="font-size:12px">проверен ${esc(s.testedAt)}</p>` : ''}
${nomsOf(id).length ? `<div class="noms">${nomsOf(id).map((n) => `<button type="button" class="nomb" onclick="event.stopPropagation();openNom(${n.i},this)"><span class="nt">${n.t}</span><span class="nd">${n.w.length > 1 ? 'ничья · ' : ''}как считали →</span></button>`).join('')}</div>` : ''}</div>
${resultBlock}
${pkgBlocks(s, lvl)}
${collectorBlock(s)}
${tasksBlock}`;
}

// Logos scroll continuously; the set is rendered twice so the loop is seamless.
// Swipe/trackpad gallery; arrows scroll by one viewport of logos.
window.slideLogos = (btn, dir) => {
  const g = btn.closest('.gallery').querySelector('.gallery-track'); const from = g.scrollLeft; const dx = dir * g.clientWidth * 0.8;
  g.scrollBy({ left: dx, behavior: 'smooth' });
  setTimeout(() => { if (g.scrollLeft === from) g.scrollBy({ left: dx }); }, 450); // browsers without smooth scrolling
};
// Phones: carousels get blue dots (one per screen) instead of arrow buttons.
function initGalleries() {
  document.querySelectorAll('.gallery').forEach((g) => {
    const tr = g.querySelector('.gallery-track'); const nav = g.querySelector('.gallery-nav'); if (!tr || !nav) return;
    let dots = nav.querySelector('.gdots');
    if (!dots) { dots = document.createElement('div'); dots.className = 'gdots'; nav.appendChild(dots); }
    const max = () => Math.max(0, tr.scrollWidth - tr.clientWidth);
    const pages = () => (tr.clientWidth ? Math.max(1, Math.ceil(tr.scrollWidth / tr.clientWidth - 0.05)) : 1);
    const mark = () => { const n = dots.children.length; const k = n > 1 && max() ? Math.round((tr.scrollLeft / max()) * (n - 1)) : 0; [...dots.children].forEach((d, i) => d.classList.toggle('on', i === k)); };
    const build = () => {
      const n = pages();
      if (dots.children.length !== n) dots.innerHTML = n > 1 ? Array.from({ length: n }, (_, i) => `<button type="button" class="gdot" aria-label="экран ${i + 1}" data-k="${i}"></button>`).join('') : '';
      g.classList.toggle('one-page', n < 2); mark();
    };
    if (!g.dataset.init) {
      g.dataset.init = '1';
      dots.addEventListener('click', (e) => { const b = e.target.closest('.gdot'); if (!b) return; const n = dots.children.length; tr.scrollTo({ left: n > 1 ? (max() * +b.dataset.k) / (n - 1) : 0, behavior: 'smooth' }); });
      tr.addEventListener('scroll', mark, { passive: true });
      tr.querySelectorAll('img').forEach((im) => { if (!im.complete) im.addEventListener('load', build, { once: true }); });
      g._build = build;
    }
    build();
  });
}
window.addEventListener('resize', () => document.querySelectorAll('.gallery').forEach((g) => g._build && g._build()));
// One logo per company: several experts from one firm upload the same logo as separate files.
const companyKey = (c) => String(c || '').toLowerCase().replace(/[«»"'“”]/g, '').replace(/,?\s*г\.\s*[^,]+$/, '').replace(/\s+/g, ' ').trim();
const logoCarousel = () => { const logos = [...new Map(D.experts.filter((e) => !e.hidden && e.companyLogo).map((e) => [companyKey(e.company) || e.companyLogo, e])).values()]; return `<div class="gallery" aria-label="юрфирмы-эксперты"><div class="gallery-track">${logos.length ? logos.map((e) => `<div class="logo-item logo-img"><img src="${esc(e.companyLogo)}" alt="${esc(e.company)}" loading="lazy"></div>`).join('') : Array.from({ length: 8 }, (_, i) => `<div class="ph logo-item">логотип ${i + 1}</div>`).join('')}</div><div class="gallery-nav"><button type="button" class="gbtn" aria-label="назад" onclick="slideLogos(this,-1)">←</button><button type="button" class="gbtn" aria-label="вперёд" onclick="slideLogos(this,1)">→</button></div></div>`; };
// Stepan's job title: the «Настройки сайта» value if it is filled in, otherwise his position on the «Команда» sheet.
const authorPos = () => {
  const v = set('methodology_author_position', ''); if (v && !/^\[/.test(v)) return v;
  const p = (D.team.find((x) => /Леонтьев/.test(x.name)) || {}).position || '';
  return p ? p.charAt(0).toLowerCase() + p.slice(1) : 'автор методологии';
};
function methodology() {
  const a = S.taskArea;
  const list = D.tasks.filter((t) => a === -1 || t.area === a);
  // text: one paragraph or an array of paragraphs.
  const step = (n, title, text, extra = '') => `<div class="step"><span class="step-n">${n}</span><div class="col" style="gap:10px"><h2>${title}</h2>${[].concat(text).map((p) => `<p>${p}</p>`).join('')}${extra}</div></div>`;
  const svcGen = +N_SERVICES % 10 === 1 && +N_SERVICES % 100 !== 11 ? 'сервиса' : 'сервисов';
  // Full methodology text (Yandex Disk link) from «Настройки сайта» → methodology_pdf; the buttons appear once it is filled.
  const pdf = set('methodology_pdf', '');
  const pdfBtn = (cls) => (pdf ? `<a class="btn${cls}" href="${esc(pdf)}" target="_blank" rel="noopener">Скачать полный файл с методологией</a>` : '');
  const crit = `<ul class="step-list">
<li><b>Ключевые критерии</b> описывают то, без чего ответом нельзя пользоваться в работе. Задача решена, только если ответ выполнил все ключевые критерии. Мы называем такой ответ пригодным.</li>
<li><b>Опциональные критерии</b> описывают то, что очень желательно, но не обязательно. Вместе с ключевыми они дают полноту ответа: долю выполненных критериев.</li>
<li><b>Вес у всех критериев одинаковый.</b> Поэтому задача с 20 критериями влияет на итоговый процент сильнее, чем задача с 8. Так сложность задачи задаёт сам эксперт.</li>
<li><b>Полнота считается для всех ответов</b>, в том числе непригодных. Так видно, сколько полезного в них всё же было.</li>
<li><b>Правила для критериев.</b> Критерий неделим: ответ либо соответствует ему, либо нет. Критерий засчитывается за нужную информацию в ответе, а не за отсутствие ошибок, штрафов нет. Типичные ошибки нейросетей ловят общие критерии, одинаковые для всех задач: выдуманные нормы и акты, ошибки в ссылках, противоречия, домысленные факты.</li>
</ul>`;
  return `<div class="intro" id="m-method"><div class="row wrap" style="align-items:baseline;gap:12px"><h1>Методология</h1><span class="updated"><span class="dot"></span>сбор ответов сервисов: ${esc(PERIOD)}</span></div><p>Мы проверяли, как ИИ-сервисы справляются с практическими юридическими задачами. Оценивали текст ответа. Создание документов, поиск судебных решений и интерфейсы сервисов мы сознательно не оценивали: они у всех слишком разные.</p><p>Ниже рассказываем, кто составлял задачи, как оценивали ответы и как считали итог. В конце страницы собраны все задачи с ответами сервисов.</p><div class="intro-cta cta-list">${pdfBtn(' dark')}<a class="btn${pdf ? '' : ' dark'}" href="#/method" onclick="goTo('m-steps',this)">Изучить методологию</a></div></div>
<div class="sec"><h2 id="m-steps">Как проходила проверка</h2>
<div class="steps">
${step(1, 'Разработали методологию', [`Методологию бенчмарка разработал Степан Леонтьев, ${esc(authorPos())}. Он описал, какими должны быть задачи, как их оценивать и как считать итог.`, 'Главное в методологии — система ключевых и опциональных критериев. Благодаря ей ответ сервиса сравнивают не с чьим-то личным мнением, а с конкретным списком того, что в нём должно быть.'], crit + (pdf ? `<div class="step-cta">${pdfBtn('')}</div>` : ''))}
${step(2, 'Эксперты подготовили задачи', [`${N_EXPERTS} практикующих юристов составили ${N_TASKS} ${taskWord(+N_TASKS)} по пяти отраслям права: разрешение споров, договорное право, недвижимость, корпоративное право и интеллектуальная собственность.`, 'Все задачи прикладные: в фабуле есть участники, даты и суммы, а в конце явный вопрос. Задачи средней сложности, из повседневной практики, но почти в каждой есть «двойное дно»: популярная ошибка, сложный расчёт сроков или подход, который со временем изменился.', 'У каждой задачи один правильный ответ или явно преобладающий подход. Он опирается на действующее законодательство и практику российских судов. Вопросы, где возможны несколько верных ответов, в проверку не брали.', 'Задачи писали без помощи ИИ. К каждой автор приложил эталонный ответ, до пяти ключевых и 10–15 опциональных критериев. Мы проверяли каждую задачу с точки зрения методологии, а в остальном полагались на опыт экспертов.'], `${logoCarousel()}<div class="step-cta"><a class="btn" href="#/experts">Об экспертах</a></div>`)}
${step(3, 'Собрали ответы сервисов', [`Каждый из ${N_SERVICES} ${svcGen} получил все ${N_TASKS} ${taskWord(+N_TASKS)} в одинаковой формулировке. Ответы мы собирали ${esc(PERIOD)} и сохранили дословно, их можно прочитать на странице каждой задачи.`, 'Ответы собирала отдельная команда, а не те, кто писал задачи или оценивал ответы. На каждом этапе работали разные люди: так меньше риск ошибок и предвзятости.', 'Сервисы заранее не знали ни вопросов, ни сроков, ни порядка проверки.'])}
${step(4, 'Оценили ответы по критериям', ['Оценщики не знали, чей ответ читают. Сначала они читали фабулу и ответ сервиса целиком, затем эталонный ответ и критерии. Эталон служил ориентиром, а не единственно верным текстом.', 'Каждый критерий проверяли по существу: если мысль передана верно, критерий засчитывается, даже когда формулировка отличается от эталона или вывод обоснован другой подходящей нормой.', 'Все ссылки на нормы и судебные акты сверяли с первоисточниками. Ошибка в номере статьи стоит одного балла, а выдуманная норма, на которой построен вывод, делает весь ответ непригодным.', 'Если оценщик признавал ответ непригодным, он выбирал причину из закрытого списка, например выдуманное обоснование, опасная рекомендация или бессодержательный ответ, и подкреплял её цитатой. Сомнения в задаче или критерии он записывал в особое мнение, и такие случаи мы перепроверяли отдельно.'], `${D.assessorOrgs.length ? orgCarousel() : ''}<div class="step-cta"><a class="btn" href="#/experts" onclick="goTo('assessors',this)">Об оценщиках</a></div>`)}
${step(5, 'Подвели итоги', ['У каждого сервиса два показателя. Решено задач: сколько ответов пригодны для работы. Полнота ответов: какая доля всех критериев выполнена. Например, «26 из 52» и «65%» значат, что половина ответов пригодна, а в целом ответы содержат почти две трети того, что ожидали эксперты.', 'Команда Рунетлекс и Рунетлекс Академии посчитала результаты и номинации по заранее объявленным правилам и опубликовала всё как есть. Купить место в результатах нельзя.'], '<div class="step-cta"><a class="btn dark" href="#/" onclick="goTo(\'results\',this)">Смотреть результаты</a></div>')}
</div></div>
<div class="sec mnotes">
<div class="mnote"><h2>Сделано людьми для людей</h2><p>Мы могли бы поручить оценку нейросетям, но бенчмарк задуман как человеческий. Задачи писали практикующие юристы без помощи ИИ, ответы собирали и оценивали люди. Работать с этими сервисами будут люди, поэтому и судить о них, по-нашему, должны люди, хотя так дольше и сложнее.</p></div>
<div class="mnote"><h2>Оговорки</h2><ul class="step-list"><li><b>Результаты субъективны.</b> За каждой задачей стоит позиция эксперта, а оценивают люди, поэтому ошибки возможны.</li><li><b>Это срез на период проверки.</b> Сервисы могут сменить модель или базу знаний, и качество ответов изменится в любую сторону.</li><li><b>Тест избирателен.</b> Многословие, повторы и непоследовательность на оценку не влияют: мы измеряем, есть ли в ответе нужное, а не отсутствие лишнего.</li></ul></div>
</div>
<div class="sec">
<div class="intro" id="m-tasks"><h2>Задачи</h2><p>Здесь все ${N_TASKS} ${taskWord(+N_TASKS)}, на которых мы проверяли сервисы. Откройте любую, и вы увидите фабулу, вопрос, эталонный ответ, критерии и дословные ответы всех ${N_SERVICES} ${svcGen}.</p></div>
${areaFilter(a, 'setTaskArea')}
<div class="tlist mlist">${list.map((t) => { const n = tested.filter((s) => (resOf(s, t.id) || {}).s).length; return `<div class="trow"><div class="trow-h" role="link" tabindex="0" onclick="location.hash='#/task/${t.id}'" onkeydown="if(event.key==='Enter')location.hash='#/task/${t.id}'"><span class="ttitle">${t.title}<span class="tmeta"><span>${D.areas[t.area]}</span><span>${authorLabel(t)}: ${authorLinks(t)}</span><span>${t.total} ${critWord(t.total)}</span></span></span><span class="tstat ${n ? 'ok' : 'no'}">решили ${n} из ${tested.length}</span><span class="chev go" aria-hidden="true"></span></div></div>`; }).join('')}</div>
</div>
<div class="sec" id="m-report">
<div class="rep"><div class="rep-main"><div class="rep-intro"><p class="rep-k">полный отчёт в PDF</p><h2>Отчёт</h2><p class="rep-lead">Полная история бенчмарка: от того, зачем мы его затеяли, до того, что получилось.${set('report_pages', '') ? ' ' + esc(set('report_pages', '')) + ' страниц.' : ''}</p>${formBox('Получить отчёт на почту', 'Отчёт бенчмарка', field('fio', 'ФИО', 'autocomplete="name"') + field('email', 'Почта', 'type="email" autocomplete="email"') + consent(), 'Получить отчёт', 'Спасибо! Отчёт придёт на почту в течение нескольких минут. Если письма нет, проверьте папку «Спам».')}</div><div class="rep-cover" aria-hidden="true"><span class="rep-cover-wm">${WM}</span><span class="rep-cover-t">Отчет<br>бенчмарка</span><span class="rep-cover-s">юридические ИИ-сервисы<br>2026</span><span class="rep-cover-n"><b>${N_TASKS}</b> ${taskWord(+N_TASKS)}<br><b>${N_SERVICES}</b> ${svcWord(+N_SERVICES)}</span></div></div><p class="rep-h">что внутри</p><ol class="rep-list"><li><b>Зачем мы это сделали</b><span>Какие задачи ставили и каких принципов держались: открытость, перепроверка на каждом этапе, независимость.</span></li><li><b>Как отбирали сервисы</b><span>Из 57 найденных на рынке в проверку вошли 33, протестировали 31. По каким правилам отбирали и почему исключили двоих.</span></li><li><b>Как готовили задачи</b><span>Как работали с экспертами, собирали ответы сервисов и устроили слепую оценку.</span></li><li><b>Результаты</b><span>Итоговые результаты, номинации и победители.</span></li><li><b>Сложности</b><span>Выбор тарифов, разные режимы работы сервисов, расхождения в оценках и как мы их решали.</span></li><li><b>Выводы</b><span>Что сервисы уже умеют и где им ещё расти.</span></li></ol></div>
</div>`;
}
// Team photos uploaded to the site; a photo link in the sheet («Команда») takes priority.
const TEAM_PHOTOS = { 'Павел Мищенко': 'assets/team/mishchenko.jpg', 'Ксения Даньшина': 'assets/team/danshina.jpg', 'Екатерина Чевычелова': 'assets/team/chevychelova.jpg', 'Валентина Виноградова': 'assets/team/vinogradova.jpg', 'Марина Джатэ': 'assets/team/dzhate.jpg', 'Евгений Вихров': 'assets/team/vikhrov.jpg' };
const initials = (n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2);
const ACADEMY = 'https://runetlex-academy.ru';
const astat = (st) => `<div class="box astat"><span class="num">${esc(st.num).replace(/ /g, '&nbsp;')}</span><p class="b">${esc(st.label)}</p>${st.text ? `<p class="muted">${esc(st.text)}</p>` : ''}${st.url ? `<a class="more" href="${esc(st.url)}" target="_blank" rel="noopener">${esc(st.linkText || 'Подробнее')}</a>` : ''}</div>`;
function about() {
  const team = D.team.map((p) => { const ph = TEAM_PHOTOS[p.name] || p.photo; return `<div class="box person">${ph ? `<img class="photo" src="${esc(ph)}" alt="${esc(p.name)}" loading="lazy">` : '<div class="ph photo">фото</div>'}<div class="col" style="gap:4px"><p class="b">${esc(p.name)}</p><p class="muted">${esc(p.position)}</p><p>${esc(p.role)}</p></div></div>`; }).join('');
  return `<div class="intro"><h1>О Рунетлекс Академии</h1><p>Рунетлекс Академия учит юристов работать с нейросетями. Бенчмарк подготовила наша команда.</p><p>Полезные материалы о нейросетях в юридических задачах собраны в нашей <a href="${ACADEMY}/neuralnetworks/base" target="_blank" rel="noopener">базе знаний</a>. Задачи для бенчмарка готовили и оценивали практикующие юристы и юрфирмы, они на странице <a href="#/experts">«Эксперты»</a>.</p></div>
${D.academyStats.length ? `<div class="astats">${D.academyStats.map(astat).join('')}</div>` : ''}
${team ? `<div class="sec"><h2>Команда проекта</h2><div class="grid3 team">${team}</div></div>` : ''}
${courseBlock()}
<div class="box contact"><h2>Связаться с нами</h2><p>Вопросы о бенчмарке, участие в следующей проверке, сотрудничество — пишите на <a href="mailto:${EMAIL}">${EMAIL}</a>.</p><div><a class="btn dark" href="mailto:${EMAIL}">Написать нам</a></div></div>`;
}
const critWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'критерий' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'критерия' : 'критериев');
function taskPage(id) {
  const t = task(id); if (!t) return '<p>Нет такой задачи</p>';
  const i = D.tasks.indexOf(t); const prev = D.tasks[i - 1]; const next = D.tasks[i + 1];
  const all = [...tested].map((s) => ({ s, r: resOf(s, id) })).filter((x) => x.r);
  const tf = S.tf || 'all'; const cntT = { all: all.length, ok: all.filter((x) => x.r.s).length, no: all.filter((x) => !x.r.s).length };
  const rows = all.filter((x) => tf === 'all' || (tf === 'ok' ? x.r.s : !x.r.s)).sort((x, y) => (y.r.s - x.r.s) || (y.r.p - x.r.p)).map(({ s, r }) => `<div class="trow"><div class="trow-h" role="button" tabindex="0" onclick="openAns('${s.id}','${id}')" onkeydown="if(event.key==='Enter')openAns('${s.id}','${id}')"><span class="ttitle"><a class="tsvc-name" href="#/service/${s.id}" onclick="event.stopPropagation()">${s.name}</a><span class="tmeta"><span class="tread">читать ответ</span></span></span><span class="tstat ${r.s ? 'ok' : 'no'}">${r.s ? 'решена' : 'не решена'}</span><span class="tpts">${r.p} / ${t.total}</span><span class="chev go" aria-hidden="true"></span></div></div>`);
  const n = tested.filter((s) => (resOf(s, id) || {}).s).length;
  return `<div class="pghead"><div><a class="btn backlink" href="#/method" onclick="goTo('m-tasks',this)">← Ко всем задачам</a></div>
<div class="col" style="gap:14px"><h1>${t.title}</h1><div class="tfacts"><span class="tag soft">${D.areas[t.area]}</span><span>${authorLabel(t)}: ${authorLinks(t)}</span><span>${t.total} ${critWord(t.total)}</span><span>решили ${n} ${svcWord(n)} из ${tested.length}</span></div><div class="row" style="gap:8px">${prev ? `<a class="tag" href="#/task/${prev.id}">← предыдущая</a>` : ''}${next ? `<a class="tag" href="#/task/${next.id}">следующая →</a>` : ''}</div></div>
</div>
${!taskReady(t) ? LOADING : `<div class="tdetail"><div class="tmain">${clampBlock('tq' + id, 'Задача', richText(t.text || SAMPLE.task))}${clampBlock('tr' + id, 'Эталонный ответ', richText(t.reference || SAMPLE.answer))}</div>${critPanel(t, null)}</div>`}
<div class="sec"><h2 id="t-svc">Как решили ${tested.length} ${svcWord(tested.length)}</h2>
<div class="seg2" aria-label="итог по задаче">${[['all', 'Все'], ['ok', 'Решили'], ['no', 'Не решили']].map(([k, nm]) => `<button type="button" class="${tf === k ? 'on' : ''}" onclick="refilter(()=>{S.tf='${k}';render(true)})">${nm}<span>${cntT[k]}</span></button>`).join('')}</div>
<div class="tlist">${rows.join('') || '<p class="muted">Нет сервисов по этому фильтру.</p>'}</div></div>`;
}
// Latin-named services first, then Russian alphabetical order.
// Catalog search. Names are compared three ways: as typed, transliterated to Latin, and as a sound skeleton
// (consonants only, similar sounds merged), so «доксилла», «лав копайлот» or «yandex» find Doczilla, LawCopilot, Яндекс.
const CYR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'iu', я: 'ia' };
const latin = (t) => String(t).toLowerCase().replace(/[а-яё]/g, (c) => (c in CYR ? CYR[c] : c));
const skel = (t, merge) => latin(t).replace(/[^a-z0-9]/g, '').replace(/ph/g, 'f').replace(/ck/g, 'k').replace(/x/g, 'ks').replace(/qu/g, 'kv').replace(/q/g, 'k').replace(/w/g, 'v').replace(/j/g, 'dzh').replace(/c(?=[eiy])/g, 's').replace(/ts|tz/g, 's').replace(/c/g, 'k').replace(/z/g, 's').replace(/th/g, 't').replace(/[aeiouyv]/g, '').replace(/ks/g, merge ? 's' : 'ks').replace(/(.)\1+/g, '$1');
// «Doczilla» is read both as «док-зилла» and «до-цзилла»: a second skeleton merges «кс» into «с».
const skels = (t) => [...new Set([skel(t), skel(t, true)])];
// Skeletons of the name from each word start («Нейро Защита» → «нейрозащита», «защита»), so a query matches a word beginning, not the middle of a word.
const wordTails = (t) => { const w = String(t).replace(/([a-zа-яё])([A-ZА-ЯЁ])/g, '$1 $2').split(/[\s\-–—_.()]+/).filter(Boolean); return w.flatMap((_, i) => skels(w.slice(i).join(''))).filter(Boolean); };
const searchKeys = (name, site) => [String(name).toLowerCase() + ' ' + String(site || '').toLowerCase(), latin(name) + ' ' + latin(site || ''), wordTails(name).concat(wordTails(String(site || '').replace(/\.[a-zа-я]+$/i, ''))).join(' ')].join('\u0001');
const lev = (a, b) => { let prev = Array.from({ length: b.length + 1 }, (_, j) => j); for (let i = 1; i <= a.length; i++) { const cur = [i]; for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; } return prev[b.length]; };
function matchSvc(keys, q) {
  const [plain, lat, tails] = keys.split('\u0001'); const ql = q.toLowerCase().replace(/\s+/g, ' ');
  if (plain.includes(ql) || lat.includes(latin(ql))) return true;
  return skels(q).filter((sq) => sq.length >= 2).some((sq) => tails.split(' ').some((sk) => sk.startsWith(sq) || (sq.length >= 5 && [sq.length - 1, sq.length, sq.length + 1].some((L) => lev(sq, sk.slice(0, L)) <= 1))));
}
// Phones: when the search field gets focus, lift it to just under the sticky menu and chips so the results show below it.
window.searchFocus = (el) => {
  if (window.innerWidth > 900) return;
  setTimeout(() => {
    const box = el.closest('.csearch'); const nv = document.querySelector('.nav'); const sb = document.querySelector('.sidebar');
    const top = (nv ? nv.offsetHeight : 60) + (sb && getComputedStyle(sb).position === 'sticky' ? sb.offsetHeight : 0) + 12;
    window.scrollTo({ top: box.getBoundingClientRect().top + window.scrollY - top, behavior: 'smooth' });
  }, 300); // after the keyboard has opened
};
// Enter on the phone keyboard closes it so the results are visible.
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.closest && e.target.closest('.csearch')) { e.preventDefault(); e.target.blur(); } });
window.setCatFilt = (k) => { S.cfilt = S.cfilt === k ? 'all' : k; document.querySelectorAll('.lg-btn').forEach((b) => { const on = b.dataset.f === S.cfilt; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); applyCatFilter(); };
function applyCatFilter() {
  const q = (S.cq || '').trim(); const f = S.cfilt;
  let any = false;
  document.querySelectorAll('.cat-sec').forEach((sec) => {
    let n = 0;
    sec.querySelectorAll('.scard').forEach((c) => { const ok = (f === 'all' || (f === 'on') === (c.dataset.on === '1')) && (!q || matchSvc(c.dataset.q, q)); c.hidden = !ok; if (ok) n += 1; });
    sec.hidden = !n; if (n) any = true;
    const chip = document.querySelector(`.sidebar .stag[data-sec="${sec.id}"]`); if (chip) chip.classList.toggle('empty', !n);
  });
  const e = document.querySelector('.cat-empty'); if (e) e.hidden = any;
  catalogSpy();
}
function catalog() {
  const card = (s) => `<a class="box lnk hrow scard" href="#/service/${s.id}" data-on="${s.checked ? 1 : 0}" data-q="${esc(searchKeys(s.name, siteText(s.site)))}"><div class="avatar">${s.name.slice(0, 2).toUpperCase()}</div><div class="col grow" style="gap:2px"><p class="b">${s.name}</p><p class="muted csite">${esc(siteText(s.site))}</p></div><span class="sdot${s.checked ? ' on' : ''}" title="${s.checked ? 'проверен в бенчмарке' : 'пока не проверялся'}"></span></a>`;
  const secs = D.skills.map((k, i) => { const list = D.services.filter((s) => s.skills.includes(k)).sort(byName); return list.length ? `<div class="col cat-sec" id="reg${i}" style="gap:14px"><h2 class="cat-h">${k}</h2><div class="grid3">${list.map(card).join('')}</div></div>` : ''; }).join('');
  const nOn = D.services.filter((s) => s.checked).length;
  const lg = (k, dot, label, n) => `<button type="button" class="lg-btn${S.cfilt === k ? ' on' : ''}" data-f="${k}" aria-pressed="${S.cfilt === k}" onclick="setCatFilt('${k}')">${dot}${label}<span class="lg-n">${n}</span></button>`;
  return `<div class="intro"><h1>Реестр сервисов</h1><p>В бенчмарке мы проверили навык «Ответ на правовой вопрос»: у этих сервисов есть результат на ${N_TASKS} задачах. Остальные навыки пока не оценивали, по ним реестр работает как справочник.</p></div>
<div class="layout">
<div class="sidebar"><p class="muted" style="padding:0 12px 6px">Выбрать категорию</p>${D.skills.map((k, i) => `<a class="stag" data-sec="reg${i}" href="#/catalog" onclick="event.preventDefault();go('reg${i}')">${k}</a>`).join('')}</div>
<div class="content">
<label class="csearch"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><input type="search" placeholder="Найти сервис по названию" aria-label="Поиск сервиса" value="${esc(S.cq || '')}" oninput="S.cq=this.value;applyCatFilter()" onfocus="searchFocus(this)" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search"></label>
<div class="legend lg-filter">${lg('all', '', 'все сервисы', D.services.length)}${lg('on', '<span class="sdot on"></span>', 'проверен в бенчмарке', nOn)}${lg('off', '<span class="sdot"></span>', 'пока не проверялся', D.services.length - nOn)}</div>
<h2 style="border-top:1px solid var(--line);padding-top:28px">Все сервисы по категориям</h2>
${secs}
<div class="dash cat-empty" hidden><p class="muted">Ничего не нашлось. Попробуйте другое написание или напишите нам о сервисе в форме ниже.</p></div>
${formBox('Знаете юридический ИИ-сервис, которого нет в реестре? Напишите нам об этом.', 'Новый сервис для реестра', field('name', 'Название сервиса') + field('url', 'Ссылка на сервис', 'type="url" placeholder="https://"'), 'Отправить', 'Спасибо! Мы проверим сервис и добавим его в реестр.')}
</div></div>`;
}
// A client case card: the same on the «Кейсы» page and in the carousel on a service page (onSvc: text folds, no service line).
function caseCard(c, onSvc) {
  const s = byId(c.service);
  return `<div class="box case">${c.clientLogo ? `<span class="clogo-plate"><img class="clogo" src="${esc(c.clientLogo)}" alt="" loading="lazy"></span>` : ''}<p class="b case-client">${esc(c.client)}</p><h2>${esc(c.title)}</h2>${onSvc ? `<p class="muted pre case-text">${esc(c.text)}</p><button type="button" class="case-more" onclick="this.closest('.case').classList.toggle('open');this.textContent=this.closest('.case').classList.contains('open')?'Свернуть':'Читать полностью'">Читать полностью</button>` : `<p class="muted pre">${esc(c.text)}</p>`}${c.k ? `<div class="res"><span class="k">${esc(c.k)}</span><span class="muted" style="font-size:13px">${esc(c.kd)}</span></div>` : ''}${onSvc ? '' : `<div class="svc"><span class="muted">сервис: ${s ? `<a href="#/service/${s.id}">${esc(s.name)}</a>` : esc(c.service)}</span>${vendorTag}</div>`}</div>`;
}
function cases() {
  const list = D.cases;
  const cards = list.map((c) => caseCard(c)).join('');
  return `<div class="intro"><h1>Кейсы</h1><p>Как юристы применяют ИИ-сервисы в работе.</p></div>
<div class="blk">${list.length ? `<div class="grid3">${cards}</div>` : '<div class="dash"><p class="muted">Кейсы появятся скоро.</p></div>'}</div>`;
}
const taskWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'задача' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'задачи' : 'задач');
// Assessor organisations: a logo tile, or the name when there is no logo.
const orgTile = (o) => `<div class="logo-item logo-img${o.logo ? '' : ' logo-txt'}">${o.logo ? `<img src="${esc(o.logo)}" alt="${esc(o.name)}" loading="lazy">` : `<span>${esc(o.name)}</span>`}</div>`;
const orgCarousel = () => `<div class="gallery" aria-label="оценщики"><div class="gallery-track">${D.assessorOrgs.map(orgTile).join('')}</div><div class="gallery-nav"><button type="button" class="gbtn" aria-label="назад" onclick="slideLogos(this,-1)">←</button><button type="button" class="gbtn" aria-label="вперёд" onclick="slideLogos(this,1)">→</button></div></div>`;
// Names in the sheet come both as «Фамилия Имя Отчество» and «Имя Фамилия»; sort by the surname either way.
const SURNAME_END = /(ов|ова|ев|ева|ёв|ёва|ин|ина|ын|ына|ский|ская|цкий|цкая|ко|ук|юк|их|ых)$/i;
const PATRONYMIC = /(вна|вич|чна|ична|ьич|ич)$/i;
const surname = (name) => {
  const w = String(name).trim().split(/\s+/);
  if (w.length < 2) return w[0] || '';
  const p = w.findIndex((x, i) => i > 0 && PATRONYMIC.test(x));
  if (p === 1) return w[2] || w[0]; // Имя Отчество Фамилия
  if (p === 2) return /(вна|чна)$/i.test(w[2]) && /(ова|ева|ёва|ина|ына|ская|цкая)$/i.test(w[1]) && !SURNAME_END.test(w[0]) ? w[1] : w[0]; // «Мария Великова Георгиевна»
  return SURNAME_END.test(w[0]) && !SURNAME_END.test(w[1]) ? w[0] : w[1];
};
// Where the face is on each expert photo: [x, y] as shares of the photo, and how much to zoom into the circle.
// Photos not listed are framed by shape: tall portraits keep the upper part, where the head is.
const FACES = { EXP023: [0.48, 0.19, 1.4], EXP015: [0.47, 0.26, 1.4], EXP007: [0.47, 0.27, 1.25], EXP022: [0.52, 0.21, 1.35], EXP004: [0.48, 0.23, 1.4], EXP005: [0.48, 0.37, 1.05], EXP009: [0.45, 0.4, 1.05], EXP018: [0.58, 0.25, 1.7], EXP024: [0.5, 0.38, 1.05], EXP013: [0.53, 0.33, 1.6], EXP016: [0.5, 0.22, 1.5], EXP002: [0.52, 0.27, 1.6] };
window.frameFace = (img) => {
  const r = img.naturalHeight / img.naturalWidth; if (!r) return;
  const [fx, fy, z] = FACES[img.dataset.id] || (r > 1.15 ? [0.5, 0.28, 1.25] : [0.5, 0.5, 1.1]);
  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  // object-fit:cover inside the circle; all sizes in shares of the circle's diameter
  const W = r < 1 ? 1 / r : 1, H = r > 1 ? r : 1;
  const px = W > 1 ? clamp((fx * W - 0.5) / (W - 1)) : 0.5, py = H > 1 ? clamp((fy * H - 0.5) / (H - 1)) : 0.5;
  const x0 = -px * (W - 1), y0 = -py * (H - 1); const ox = x0 + fx * W, oy = y0 + fy * H;
  // zoom from the centre, then move the face to the centre as far as the photo still covers the circle
  const shift = (o, a0, len) => clamp(-z * (o - 0.5), 0.5 - z * (a0 + len - 0.5), -0.5 - z * (a0 - 0.5));
  const tx = shift(ox, x0, W), ty = shift(oy, y0, H);
  img.style.objectPosition = `${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`;
  img.style.transformOrigin = '50% 50%';
  img.style.transform = `translate(${(tx * 100).toFixed(1)}%, ${(ty * 100).toFixed(1)}%) scale(${z})`;
};
function experts() {
  const list = D.experts.filter((e) => !e.hidden).sort((a, b) => surname(a.name).localeCompare(surname(b.name), 'ru') || a.name.localeCompare(b.name, 'ru'));
  const mainArea = {};
  const cards = list.map((e) => {
    const ts = D.tasks.filter((t) => authorIds(t).includes(e.id)); const per = D.areas.map((a, i) => [a, ts.filter((t) => t.area === i).length]).filter((x) => x[1]);
    mainArea[e.id] = per.length ? D.areas.indexOf([...per].sort((x, y) => y[1] - x[1])[0][0]) : -1;
    const pic = e.photo ? `<span class="ephoto"><img src="${esc(e.photo)}" alt="${esc(personName(e.name))}" loading="lazy" data-id="${esc(e.id)}" onload="frameFace(this)"></span>` : `<span class="ephoto ph-ini">${esc(initials(personName(e.name)))}</span>`;
    const company = e.company ? `<div class="ecompany">${e.companyLogo ? `<span class="eclogo"><img src="${esc(e.companyLogo)}" alt="" loading="lazy"></span>` : ''}<span>${esc(e.company)}</span></div>` : '';
    return `<div class="box ecard" id="exp-${esc(e.id)}">${per.length ? `<div class="etags">${per.map((x) => `<span class="etag">${esc(D.short[D.areas.indexOf(x[0])] || x[0])}</span>`).join('')}</div>` : ''}<div class="ehead">${pic}<div class="col" style="gap:4px"><p class="b">${esc(personName(e.name))}</p>${e.position ? `<p class="muted">${esc(e.position)}</p>` : ''}</div></div>${per.length ? `<div class="etasks">${per.map((x) => `<div class="etask-group"><p class="etask-area">${esc(x[0])}, ${x[1]} ${taskWord(x[1])}</p><ul class="etask-list">${ts.filter((t) => D.areas[t.area] === x[0]).map((t) => `<li><a href="#/task/${t.id}">${esc(t.title)}</a></li>`).join('')}</ul></div>`).join('')}</div>` : ''}${company}</div>`;
  });
  const areaSelect = `<label class="fld"><span>Ваша экспертная отрасль</span><select name="area" data-label="Отрасль" required onchange="const o=this.form.querySelector('.fld-other');o.hidden=this.value!=='другая';o.querySelector('input').required=!o.hidden"><option value="">Выберите отрасль</option>${D.areas.map((a) => `<option>${a}</option>`).join('')}<option>другая</option></select></label><label class="fld fld-other" hidden><span>Напишите вашу отрасль</span><input name="areaOther" data-label="Другая отрасль"></label>`;
  return `<div class="intro"><h1>Эксперты и оценщики</h1><p>Бенчмарк сделали, проверили и оценили люди. Искусственный интеллект мы использовали для перепроверки: он помогал проверять задачи, а ИИ-агент оценивал ответы параллельно с людьми, чтобы находить расхождения в оценках. Практикующие юристы придумали задачи, а оценщики из юрфирм, компаний и университетов проверили, как с ними справились сервисы.</p></div>
<div class="grid2 estats"><a class="box stat lnk" href="#/experts" onclick="event.preventDefault();go('experts-list')"><span class="num">${N_EXPERTS}</span><p class="muted">практикующих юристов-экспертов</p><span class="stat-go">к экспертам ↓</span></a><a class="box stat lnk" href="#/experts" onclick="event.preventDefault();go('assessors')"><span class="num">${set('stat_assessors', '50')}</span><p class="muted">оценщиков</p><span class="stat-go">к оценщикам ↓</span></a></div>
<div class="sec" id="experts-list"><div class="intro"><h2>Эксперты</h2><p>Задачи составили практикующие юристы из юрфирм и компаний. Это ситуации из практики, часто с подвохом, в которых могут допускать ошибки и опытные юристы.</p><p>Задачи писали без помощи ИИ. К каждой автор приложил эталонный ответ, ключевые и опциональные критерии.</p></div>
${!list.length ? '<div class="dash"><p class="muted">Список экспертов появится скоро.</p></div>' : list.some((e) => mainArea[e.id] >= 0) ? `${D.areas.map((name, i) => { const idx = list.map((e, k) => (mainArea[e.id] === i ? k : -1)).filter((k) => k >= 0); return idx.length ? `<div class="earea"><h3 class="earea-h">${esc(name)}</h3><div class="grid3 ecards">${idx.map((k) => cards[k]).join('')}</div></div>` : ''; }).join('')}${(() => { const idx = list.map((e, k) => (mainArea[e.id] < 0 ? k : -1)).filter((k) => k >= 0); return idx.length ? `<div class="earea"><h3 class="earea-h">Другие эксперты</h3><div class="grid3 ecards">${idx.map((k) => cards[k]).join('')}</div></div>` : ''; })()}` : `<div class="grid3 ecards">${cards.join('')}</div>`}</div>
<div class="sec" id="assessors"><div class="intro"><h2>Оценщики ответов</h2><p>Ответы сервисов оценивали вслепую: оценщики не знали, чей ответ перед ними.</p><p>Каждый критерий они проверяли по существу, а все ссылки на нормы и судебные акты сверяли с первоисточниками. Если оценщик сомневался в задаче или критерии, он оставлял особое мнение, и такие случаи перепроверяли отдельно.</p></div>
${D.assessorOrgs.length ? `<div class="orgs">${D.assessorOrgs.map((o) => `<div class="box org">${o.logo ? `<span class="org-logo"><img src="${esc(o.logo)}" alt="" loading="lazy"></span>` : ''}<p class="b">${esc(o.name)}</p>${o.type ? `<p class="muted">${esc(o.type)}</p>` : ''}</div>`).join('')}</div>` : '<div class="dash"><p class="muted">Список оценщиков появится скоро.</p></div>'}</div>
${formBox('Хотите подготовить задачи для следующей проверки? Оставьте свои контакты, мы свяжемся с вами, когда начнём подготовку.', 'Заявка эксперта', field('fio', 'ФИО', 'autocomplete="name"') + field('email', 'Почта', 'type="email" autocomplete="email"') + field('company', 'Название компании', 'autocomplete="organization"') + areaSelect + consent(), 'Отправить заявку', 'Спасибо! Мы свяжемся с вами, когда начнём подготовку следующей проверки.')}`;
}

window.openAns = (sid, tid) => { S.modal = { sid, tid }; render(true); };
window.closeAns = () => { S.modal = null; render(true); };
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && S.modal) closeAns(); });
function ansModal() {
  if (!S.modal) return '';
  const s = byId(S.modal.sid); const t = task(S.modal.tid); const r = s.res.find((x) => x.t === t.id);
  return `<div class="modal-bg" onclick="if(event.target===this)closeAns()"><div class="modal" role="dialog" aria-modal="true"><button class="close" onclick="closeAns()" aria-label="закрыть">×</button>
<p class="crumbs">${t.title}</p>
<h2>ответ: ${s.name}</h2>
<div class="row wrap" style="gap:8px"><span class="tag ${r.s ? 'on' : 'soft'}" style="cursor:default">${r.s ? 'задача решена' : 'задача не решена'}</span><span class="tag soft">критерии: ${r.p} / ${t.total}</span>${r.f ? `<span class="tag claim">${r.f}</span>` : ''}</div>
${taskDetail(s, t, r, 'm' + s.id + t.id)}
<div class="row wrap" style="gap:12px"><a class="btn" href="#/service/${s.id}" onclick="S.modal=null">Страница сервиса</a><span class="btn" onclick="closeAns()">Закрыть</span></div>
</div></div>`;
}
function fixYo() {
  document.querySelectorAll('h1,h2,.hero-sub,.prod,.num,.k,.nt').forEach((el) => {
    if (!getComputedStyle(el).fontFamily.includes('Steinbeck')) return;
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) n.nodeValue = n.nodeValue.replace(/ё/g, 'е').replace(/Ё/g, 'Е');
  });
}
// Catalog: highlight the category whose section is under the sticky chips.
function catalogSpy() {
  const links = [...document.querySelectorAll('.sidebar .stag[data-sec]')];
  const sb = document.querySelector('.sidebar');
  const line = (sb ? sb.getBoundingClientRect().bottom : 60) + 24;
  let cur = null;
  links.forEach((l) => { const sec = document.getElementById(l.dataset.sec); if (sec && sec.getBoundingClientRect().top <= line) cur = l; });
  links.forEach((l) => l.classList.toggle('on', l === cur));
}
window.addEventListener('scroll', catalogSpy, { passive: true });
// White logos vanish on the white logo plate: measure each logo once and give light ones a dark plate.
// Logos on plates: measure each logo once.
// 1) white logos vanish on the white plate, so light ones get a dark plate;
// 2) many logos come with wide empty margins and look tiny, so the drawn part is found and enlarged to fill the plate.
const LOGO_TONE = {}; const LOGO_BOX = {};
// Partner logos: the empty margins inside the image are cut off, so every logo shows its drawn part at the same height.
function partnerFit(img, plate, bb) {
  const nw = img.naturalWidth, nh = img.naturalHeight; if (!nw || !nh) return;
  const small = window.innerWidth <= 560; const T = small ? 60 : 80; const MAXW = small ? 170 : 230;
  const cw = bb[2] - bb[0], ch = bb[3] - bb[1]; const aspect = (cw * nw) / (ch * nh);
  let h = T, w = T * aspect; if (w > MAXW) { w = MAXW; h = MAXW / aspect; }
  const ih = h / ch, iw = ih * (nw / nh);
  Object.assign(plate.style, { width: w.toFixed(1) + 'px', height: h.toFixed(1) + 'px', minWidth: '0', position: 'relative', overflow: 'hidden', boxSizing: 'content-box' });
  Object.assign(img.style, { position: 'absolute', maxWidth: 'none', maxHeight: 'none', width: iw.toFixed(1) + 'px', height: ih.toFixed(1) + 'px', left: (-bb[0] * iw).toFixed(1) + 'px', top: (-bb[1] * ih).toFixed(1) + 'px' });
}
function fitLogo(img) {
  const bb = LOGO_BOX[img.src]; const plate = img.parentElement;
  if (bb && plate && plate.matches('.partner')) { partnerFit(img, plate, bb); return; }
  if (!bb || !plate || !plate.matches('.logo-item.logo-img:not(.partner), .eclogo')) return;
  const w = img.offsetWidth, h = img.offsetHeight; if (!w || !h) return;
  const cs = getComputedStyle(plate);
  const bw = plate.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const bh = plate.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  const cw = w * (bb[2] - bb[0]), ch = h * (bb[3] - bb[1]);
  const k = Math.min(3, bw / cw, bh / ch);
  if (k < 1.12) { img.style.transform = ''; return; }
  const cx = w * ((bb[0] + bb[2]) / 2 - 0.5), cy = h * ((bb[1] + bb[3]) / 2 - 0.5);
  img.style.transform = `translate(${(-cx * k).toFixed(1)}px, ${(-cy * k).toFixed(1)}px) scale(${k.toFixed(3)})`;
}
function measureLogo(probe, src) {
  try {
    const W = 96, H = Math.max(8, Math.round(96 * probe.naturalHeight / probe.naturalWidth)) || 96;
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    g.drawImage(probe, 0, 0, W, H); const d = g.getImageData(0, 0, W, H).data;
    let sum = 0, n = 0, x0 = W, y0 = H, x1 = -1, y1 = -1;
    const lum = (k) => (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
    for (let k = 0; k < d.length; k += 4) if (d[k + 3] > 128) { sum += lum(k); n += 1; }
    const light = n > 20 && sum / n > 0.85 && n < W * H * 0.9; // mostly light pixels on a transparent background
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const k = (y * W + x) * 4; const ink = d[k + 3] > 40 && (light || d[k + 3] < 250 || lum(k) < 0.93);
      if (ink) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    LOGO_TONE[src] = light;
    LOGO_BOX[src] = x1 >= x0 && y1 >= y0 ? [x0 / W, y0 / H, (x1 + 1) / W, (y1 + 1) / H] : null;
  } catch (e) { LOGO_TONE[src] = false; LOGO_BOX[src] = null; }
}
function markLightLogos() {
  document.querySelectorAll('.eclogo img, .org-logo img, .logo-item.logo-img img, .svc-logo img').forEach((img) => {
    const done = (x) => { if (!x.parentElement) return; x.parentElement.classList.toggle('on-dark', !!LOGO_TONE[x.src]); if (x.complete && x.naturalWidth) fitLogo(x); else x.addEventListener('load', () => fitLogo(x), { once: true }); };
    if (img.src in LOGO_TONE) { done(img); return; }
    const probe = new Image(); probe.crossOrigin = 'anonymous'; probe.referrerPolicy = 'no-referrer';
    probe.onload = () => { measureLogo(probe, img.src); document.querySelectorAll('img').forEach((x) => { if (x.src === img.src) done(x); }); };
    probe.onerror = () => { LOGO_TONE[img.src] = false; LOGO_BOX[img.src] = null; };
    probe.src = img.src;
  });
}
function render(preserve) {
  const keepY = window.scrollY;
  const h = location.hash || '#/';
  const p = h.replace(/^#\//, '').split('/');
  let cur = '#/' + (p[0] || ''); let body = '';
  if (p[0] === '' || p[0] === undefined) { cur = '#/'; body = home(); }
  else if (p[0] === 'service') { cur = byId(p[1]) && byId(p[1]).tested ? '#/' : '#/catalog'; body = service(p[1]); }
  else if (p[0] === 'task') { cur = '#/method'; body = taskPage(p[1]); }
  else if (p[0] === 'catalog') { cur = '#/catalog'; body = catalog(); }
  else if (p[0] === 'cases') body = cases();
  else if (p[0] === 'experts') body = experts();
  else if (p[0] === 'method') body = methodology();
  else if (p[0] === 'about') body = about();
  else body = home();
  document.getElementById('app').innerHTML = (window.PRIVATE ? `<div class="demo-bar private-bar">Закрытый просмотр: настоящие результаты${D.resultsAt ? ' от ' + esc(D.resultsAt) : ''}. Видны только по паролю. <button type="button" onclick="PRIVATE.exit()">Выйти</button></div>` : set('demo_banner', 'да') === 'да' ? '<div class="demo-bar">Демоверсия: названия сервисов настоящие, результаты условные. Реальные результаты появятся после проверки.</div>' : '') + nav(cur) + '<div class="wrap">' + body + '</div>' + foot + ansModal();
  catalogSpy();
  fixYo();
  markLightLogos();
  initGalleries();
  if (window.PENDING_GO) { const id = PENDING_GO; PENDING_GO = null; setTimeout(() => go(id), 60); }
  if (window.PENDING_EXP && p[0] === 'experts') { const id = PENDING_EXP; PENDING_EXP = null; setTimeout(() => goExpert(id), 60); }
  if (p[0] === 'catalog') applyCatFilter();
  const nv = document.querySelector('.nav'); if (nv) document.documentElement.style.setProperty('--navh', nv.offsetHeight + 'px'); const bar = document.querySelector('.demo-bar'); document.documentElement.style.setProperty('--barh', (bar ? bar.offsetHeight : 0) + 'px');
  document.querySelectorAll('#app table').forEach((t) => { if (!t.parentElement.classList.contains('tscroll') && !t.parentElement.classList.contains('md-table')) { const w = document.createElement('div'); w.className = 'tscroll'; t.parentNode.insertBefore(w, t); w.appendChild(t); } });
  document.body.style.overflow = S.modal ? 'hidden' : '';
  // jumps on page change are instant; smooth scrolling is for moving within a page
  if (!preserve) window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); else if (window.scrollY !== keepY) window.scrollTo({ top: keepY, left: 0, behavior: 'instant' });
}
window.addEventListener('hashchange', () => { S.modal = null; closeShot(); closeCmt(); document.body.classList.remove('menu-open'); render(); });
render();
