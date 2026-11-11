// Loads site data: data.json (services, experts, team, settings — published from the Google Sheet)
// and results.json (tasks and assessment results), merges them into window.DATA and starts the app.
(function () {
  const get = (url) => fetch(url + '?v=' + Date.now(), { cache: 'no-store' }).then((r) => { if (!r.ok) throw new Error(url + ': ' + r.status); return r.json(); });
  const load = (src) => new Promise((ok, fail) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = fail; document.body.appendChild(s); });

  // Expert names come in any order and with or without patronymic («Бухарин Данил» = «Данил Бухарин»,
  // «Вдовин Владислав» = «Вдовин Влад»): two matching words (or one a prefix of the other) mean the same person.
  const words = (n) => String(n || '').toLowerCase().replace(/ё/g, 'е').split(/[^a-zа-я]+/).filter((w) => w.length > 1);
  const sameWord = (a, b) => a === b || (Math.min(a.length, b.length) >= 4 && (a.startsWith(b) || b.startsWith(a)));
  const samePerson = (a, b) => { const x = words(a); const y = words(b); return x.filter((w) => y.some((v) => sameWord(w, v))).length >= Math.min(2, x.length, y.length); };
  const areaIndex = (name, areas) => { const n = String(name || '').toLowerCase().trim(); const first = n.split(/[\s,]+/)[0]; const i = areas.findIndex((a) => a.toLowerCase() === n); return i >= 0 ? i : areas.findIndex((a) => a.toLowerCase().split(/[\s,]+/)[0] === first); };

  function merge(d, r) {
    const tasks = r.tasks || [];
    const areas = d.areas && d.areas.length ? d.areas : r.areas || [];
    const experts = (d.experts || []).map((e) => ({ ...e, tasks: e.tasks || [] }));
    const byTask = {}; experts.forEach((e) => e.tasks.forEach((t) => { byTask[t] = e.id; }));
    const extra = [];
    tasks.forEach((t) => {
      if (typeof t.area !== 'number') t.area = Math.max(0, areaIndex(t.areaName, areas));
      // authors: the expert whose «ID задач» list contains the task, otherwise every name in «Автор» matched to the experts sheet;
      // names that are not on the sheet stay visible on the task but get no expert card
      if (byTask[t.id]) t.authors = [byTask[t.id]];
      else t.authors = String(t.authorName || '—').split(/\s*[,;]\s*/).filter(Boolean).map((name) => {
        const e = experts.find((x) => samePerson(x.name, name)); if (e) return e.id;
        const id = 'x:' + name; if (!extra.find((x) => x.id === id)) extra.push({ id, name, hidden: true, tasks: [] }); return id;
      });
      t.author = t.authors[0];
    });
    const res = r.results || {};
    const services = (d.services || []).map((s) => ({ ...s, skills: s.skills || [], res: res[s.id] || [], checked: !!s.tested, tested: !!s.tested && (res[s.id] || []).length > 0 }));
    return {
      areas, short: d.short && d.short.length ? d.short : r.short, skills: d.skills || [],
      tasks, services, experts: experts.concat(extra), resultsAt: r.generatedAt || '',
      settings: d.settings || {}, team: d.team || [], takeaways: d.takeaways || [], academyStats: d.academyStats || [],
      cases: d.cases || [], assessorOrgs: d.assessorOrgs || [], generatedAt: d.generatedAt || ''
    };
  }

  // Closed preview: the address /?private asks for a password and loads the real results from the Google web app
  // (address in «Настройки сайта» → preview_endpoint). Without ?private everyone gets the public files.
  const KEY = 'bench_private_key';
  const store = {
    get: () => { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } },
    set: (v) => { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) { /* private mode */ } },
  };
  const wantPrivate = /[?&]private\b/.test(location.search);
  const call = (endpoint, key, file) => fetch(endpoint, { method: 'POST', body: JSON.stringify({ kind: 'preview', key, file }) }).then((r) => r.json());
  const app = () => document.getElementById('app');
  function askPassword(endpoint, note) {
    return new Promise((resolve) => {
      app().innerHTML = `<div class="gate"><form class="box form gate-box"><p class="gate-kicker">Рунетлекс Бенчмарк</p><h1 class="gate-title">Закрытый просмотр</h1><p class="muted">Настоящие результаты до публикации. Введите пароль, который вам передала команда.</p><label class="fld"><span>Пароль</span><input type="password" name="key" autocomplete="current-password" required autofocus></label><p class="gate-err" ${note ? '' : 'hidden'}>${note || ''}</p><button class="btn dark" type="submit">Войти</button><a class="gate-out" href="./">Открыть обычную версию сайта</a></form></div>`;
      const form = app().querySelector('form'); const err = form.querySelector('.gate-err'); const btn = form.querySelector('button');
      form.addEventListener('submit', (ev) => {
        ev.preventDefault(); const key = form.key.value.trim(); if (!key) return;
        btn.disabled = true; btn.textContent = 'Проверяем…'; err.hidden = true;
        call(endpoint, key, 'results').then((r) => {
          if (r && !r.error) { store.set(key); if (document.activeElement) document.activeElement.blur(); resolve({ key, r }); return; }
          err.textContent = r && r.error === 'password' ? 'Неверный пароль.' : 'Данные закрытого просмотра пока не загружены. Попросите обновить их в таблице.'; err.hidden = false;
        }).catch(() => { err.textContent = 'Не удалось связаться с сервером. Попробуйте ещё раз.'; err.hidden = false; })
          .then(() => { btn.disabled = false; btn.textContent = 'Войти'; });
      });
    });
  }
  function privateResults(d) {
    const endpoint = (d.settings || {}).preview_endpoint;
    if (!endpoint) return get('results.json');
    const key = store.get();
    const start = key ? call(endpoint, key, 'results').then((r) => (r && !r.error ? { key, r } : askPassword(endpoint, r && r.error === 'password' ? '' : 'Данные закрытого просмотра пока не загружены.'))).catch(() => askPassword(endpoint, 'Не удалось связаться с сервером. Попробуйте ещё раз.')) : askPassword(endpoint);
    return start.then(({ key: k, r }) => {
      app().innerHTML = '<p style="padding:40px">Загружаем результаты…</p>';
      window.PRIVATE = { exit: () => { store.set(''); location.href = location.pathname; } };
      window.fetchTaskFile = (id) => call(endpoint, k, id).then((f) => (f && !f.error ? f : Promise.reject(new Error(f && f.error))));
      return r;
    });
  }

  get('data.json')
    .then((d) => (wantPrivate ? privateResults(d) : get('results.json')).then((r) => { window.DATA = merge(d, r); return load('sample.js'); }))
    .then(() => load('app.js?v=' + Date.now()))
    .catch((e) => { console.error(e); app().innerHTML = '<p style="padding:40px">Не удалось загрузить данные сайта. Обновите страницу.</p>'; });
})();
