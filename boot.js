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

  Promise.all([get('data.json'), get('results.json')])
    .then(([d, r]) => { window.DATA = merge(d, r); return load('sample.js'); })
    .then(() => load('app.js?v=' + Date.now()))
    .catch((e) => { console.error(e); document.getElementById('app').innerHTML = '<p style="padding:40px">Не удалось загрузить данные сайта. Обновите страницу.</p>'; });
})();
