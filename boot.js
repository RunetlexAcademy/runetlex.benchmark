// Loads site data: data.json (services, experts, team, settings — published from the Google Sheet)
// and results.json (tasks and assessment results), merges them into window.DATA and starts the app.
(function () {
  const get = (url) => fetch(url + '?v=' + Date.now(), { cache: 'no-store' }).then((r) => { if (!r.ok) throw new Error(url + ': ' + r.status); return r.json(); });
  const load = (src) => new Promise((ok, fail) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = fail; document.body.appendChild(s); });

  function merge(d, r) {
    const tasks = r.tasks || [];
    // author: the expert whose «ID задач» list contains the task; otherwise the name stored with the task
    const experts = (d.experts || []).map((e) => ({ ...e, tasks: e.tasks || [] }));
    const byTask = {}; experts.forEach((e) => e.tasks.forEach((t) => { byTask[t] = e.id; }));
    const extra = [];
    tasks.forEach((t) => {
      if (byTask[t.id]) { t.author = byTask[t.id]; return; }
      const id = 'x:' + (t.authorName || '—');
      if (!extra.find((e) => e.id === id)) extra.push({ id, name: t.authorName || '—', hidden: true, tasks: [] });
      t.author = id;
    });
    const res = r.results || {};
    const services = (d.services || []).map((s) => ({ ...s, skills: s.skills || [], res: res[s.id] || [], tested: !!s.tested && (res[s.id] || []).length > 0 }));
    return {
      areas: d.areas && d.areas.length ? d.areas : r.areas, short: d.short && d.short.length ? d.short : r.short, skills: d.skills || [],
      tasks, services, experts: experts.concat(extra),
      settings: d.settings || {}, team: d.team || [], takeaways: d.takeaways || [], academyStats: d.academyStats || [],
      cases: d.cases || [], assessorOrgs: d.assessorOrgs || [], generatedAt: d.generatedAt || ''
    };
  }

  Promise.all([get('data.json'), get('results.json')])
    .then(([d, r]) => { window.DATA = merge(d, r); return load('sample.js'); })
    .then(() => load('app.js'))
    .catch((e) => { console.error(e); document.getElementById('app').innerHTML = '<p style="padding:40px">Не удалось загрузить данные сайта. Обновите страницу.</p>'; });
})();
