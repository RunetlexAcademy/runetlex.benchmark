/**
 * Рунетлекс Бенчмарк — выгрузка задач и результатов на сайт.
 *
 * Источник: таблица «ДЛЯ САЙТА Бенчмарк // Сборщики / Оценщики» (ID ниже, можно переопределить
 * в «Настройках сайта» строкой results_sheet_id).
 *
 * Меню «Рунетлекс»:
 *   • Проверить результаты — показывает, что уйдёт на сайт, и ошибки. Ничего не публикует.
 *   • Опубликовать результаты — записывает на сайт одним коммитом:
 *       results.json      — задачи (название, отрасль, автор, число критериев) и итоги оценок: решена ли задача,
 *                           баллы и какие критерии выполнены. Грузится на каждой странице, поэтому без длинных текстов.
 *       tasks/T001.json … — по файлу на задачу: фабула, эталонный ответ, тексты критериев и ответы всех сервисов.
 *                           Сайт подгружает файл, только когда человек открывает задачу.
 *
 * Что НИКОГДА не уходит на сайт: листы «Сборщики», «Оценщики», «Назначения», «Скринкасты»,
 * «Оценки (детально)», колонки «Сборщик», «Оценщик», «ID оценщика», комментарии оценщиков,
 * время запросов и отправки. В выгрузку попадают только колонки из списка RES_COLS ниже (и колонки критериев K1…/O1…).
 *
 * Токен GitHub тот же, что у «Опубликовать на сайт» (свойство скрипта GITHUB_TOKEN).
 */

const RESULTS_SOURCE_ID = '1uEZt8D39bsN-M0BuQ9MGBwx7UErfUFAFgafIOAAPlvQ';
const SOURCES_RE = /^Ответ опирается на необходимые источники/i;
const RES_COLS = {
  tasks: ['ID задачи', 'Отрасль', 'Фабула', 'Эталонный ответ', 'Файл', 'Автор', 'Название задачи'],
  crit: ['ID задачи', 'Код', 'Тип', 'Текст критерия'],
  services: ['Сервис', 'Ссылка на сервис'],
  answers: ['ID ответа', 'ID задачи', 'Сервис', 'Текст ответа'],
  grades: ['ID ответа', 'ID задачи', 'Сервис', 'Статус', 'Результат задачи', 'Баллы'],
};

function checkResults() {
  const r = buildResults_();
  resultsReport_('Проверка результатов', r);
}

function publishResults() {
  const ui = SpreadsheetApp.getUi();
  const r = buildResults_();
  if (r.errors.length) { resultsReport_('Публикация остановлена', r); return; }
  const ok = ui.alert('Опубликовать результаты на сайт?', resultsSummary_(r) + (r.warnings.length ? '\n\nПредупреждения:\n• ' + r.warnings.join('\n• ') : ''), ui.ButtonSet.OK_CANCEL);
  if (ok !== ui.Button.OK) return;
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) { ui.alert('Не задан токен', 'Добавьте свойство скрипта GITHUB_TOKEN: Расширения → Apps Script → Настройки проекта → Свойства скрипта.', ui.ButtonSet.OK); return; }
  const files = { 'results.json': JSON.stringify(r.results) };
  Object.keys(r.taskFiles).forEach((id) => { files['tasks/' + id + '.json'] = JSON.stringify(r.taskFiles[id]); });
  commitFiles_(token, files, 'Результаты бенчмарка из таблицы ' + r.results.generatedAt);
  ui.alert('Готово', 'Результаты отправлены. Сайт обновится через 1–2 минуты:\nhttps://benchmark.runetlex-academy.ru/', ui.ButtonSet.OK);
}

// ---------- сборка ----------

function buildResults_() {
  const errors = []; const warnings = [];
  const own = SpreadsheetApp.getActive();
  const srcId = siteSetting_(own, 'results_sheet_id') || RESULTS_SOURCE_ID;
  let src;
  try { src = SpreadsheetApp.openById(srcId); } catch (e) { errors.push('Нет доступа к таблице с результатами (' + srcId + '): ' + e.message); return empty_(errors, warnings); }

  const read = (name, cols, required) => {
    const sh = src.getSheetByName(name);
    if (!sh) { errors.push('В таблице результатов нет листа «' + name + '»'); return []; }
    return readCols_(sh, cols, required, errors);
  };

  // 1. Сервисы: название в таблице результатов → ID сервиса на сайте (по адресу сайта, затем по названию)
  const siteSvc = readCols_(own.getSheetByName('Сервисы'), ['ID сервиса', 'Название', 'Сайт'], ['ID сервиса', 'Название'], errors);
  const byHost = {}; const byName = {};
  siteSvc.forEach((s) => {
    if (!s['ID сервиса']) return;
    hosts_(s['Сайт']).forEach((h) => { byHost[h] = s['ID сервиса']; });
    byName[norm_(s['Название'])] = s['ID сервиса'];
  });
  const svcId = {};
  read('Сервисы', RES_COLS.services, ['Сервис']).forEach((s) => {
    const name = String(s['Сервис']).trim(); if (!name) return;
    const id = hosts_(s['Ссылка на сервис']).map((h) => byHost[h]).find(Boolean) || byName[norm_(name)];
    if (id) svcId[name] = id; else errors.push('Сервис «' + name + '» не найден в листе «Сервисы» этой таблицы: проверьте адрес сайта');
  });

  // 2. Задачи и критерии
  const crit = {};
  read('Критерии', RES_COLS.crit, ['ID задачи', 'Код', 'Тип', 'Текст критерия']).forEach((c) => {
    const t = String(c['ID задачи']).trim(); const code = String(c['Код']).trim(); if (!t || !code) return;
    (crit[t] = crit[t] || []).push({ code, type: /ключ/i.test(c['Тип']) ? 'key' : 'opt', text: String(c['Текст критерия']).trim() });
  });
  const tasks = []; const taskFiles = {}; const taskIds = {};
  read('Задачи', RES_COLS.tasks, ['ID задачи', 'Отрасль', 'Фабула', 'Эталонный ответ', 'Автор']).forEach((t) => {
    const id = String(t['ID задачи']).trim(); if (!id) return;
    const cs = crit[id] || [];
    if (!cs.length) errors.push('У задачи ' + id + ' нет критериев на листе «Критерии»');
    if (!String(t['Фабула']).trim()) errors.push('У задачи ' + id + ' пустая фабула');
    if (!String(t['Автор']).trim()) warnings.push('У задачи ' + id + ' не указан автор');
    const title = String(t['Название задачи'] || '').trim() || titleFromFile_(t['Файл']) || id;
    // the standard criterion «Ответ опирается на необходимые источники…» feeds the nomination «самый точный по источникам»
    const srcCode = (cs.find((c) => SOURCES_RE.test(c.text)) || {}).code || '';
    tasks.push({ id, title, srcCode, areaName: String(t['Отрасль']).trim(), authorName: String(t['Автор']).trim(), total: cs.length, key: cs.filter((c) => c.type === 'key').length, opt: cs.filter((c) => c.type === 'opt').length });
    taskFiles[id] = { id, text: String(t['Фабула']).trim(), reference: String(t['Эталонный ответ']).trim(), crit: cs, answers: {} };
    taskIds[id] = true;
  });

  // 3. Оценки: только сданные; колонки K1…/O1… — выполнен ли критерий
  const gradeSheet = src.getSheetByName('Оценки');
  const grades = gradeSheet ? readCols_(gradeSheet, RES_COLS.grades.concat(critCols_(gradeSheet)), ['ID ответа', 'ID задачи', 'Сервис', 'Статус'], errors) : [];
  if (!gradeSheet) errors.push('В таблице результатов нет листа «Оценки»');
  const byAnswer = {};
  grades.forEach((g) => {
    if (String(g['Статус']).trim() !== 'сдано') return;
    const a = String(g['ID ответа']).trim(); if (!a) return;
    if (byAnswer[a]) warnings.push('У ответа ' + a + ' несколько сданных оценок — на сайт идёт последняя');
    byAnswer[a] = g;
  });

  // 4. Ответы: только те, у которых есть сданная оценка
  const answers = {};
  read('Ответы', RES_COLS.answers, ['ID ответа', 'ID задачи', 'Сервис', 'Текст ответа']).forEach((a) => { const id = String(a['ID ответа']).trim(); if (byAnswer[id]) answers[id] = a; });

  const results = {}; const seen = {};
  Object.keys(byAnswer).forEach((aid) => {
    const g = byAnswer[aid]; const t = String(g['ID задачи']).trim(); const svc = String(g['Сервис']).trim();
    const sid = svcId[svc];
    if (!sid) { errors.push('Оценка ответа ' + aid + ': сервис «' + svc + '» не сопоставлен с сайтом'); return; }
    if (!taskIds[t]) { errors.push('Оценка ответа ' + aid + ': задачи ' + t + ' нет на листе «Задачи»'); return; }
    const key = sid + '|' + t; if (seen[key]) { warnings.push(svc + ', ' + t + ': несколько оценённых ответов — на сайт идёт ' + aid); } seen[key] = true;
    const cs = taskFiles[t].crit; const c = {}; let p = 0; let keysOk = true;
    cs.forEach((k) => { const v = String(g[k.code] === undefined ? '' : g[k.code]).trim(); const ok = v === '1'; if (ok) { c[k.code] = 1; p += 1; } else if (k.type === 'key') keysOk = false; if (v === '') warnings.push('Ответ ' + aid + ': не оценён критерий ' + k.code); });
    const solved = String(g['Результат задачи']).trim() === 'выполнена';
    if (solved !== keysOk) warnings.push('Ответ ' + aid + ': «Результат задачи» не совпадает с ключевыми критериями — на сайт идёт значение из таблицы');
    const pts = Number(g['Баллы']); if (g['Баллы'] !== '' && !isNaN(pts) && pts !== p) warnings.push('Ответ ' + aid + ': «Баллы» (' + pts + ') не совпадают с суммой критериев (' + p + ')');
    const srcCode = tasks.find((x) => x.id === t).srcCode;
    (results[sid] = results[sid] || []).push({ t, s: solved, p, c, src: !!(srcCode && c[srcCode]) });
    const ans = answers[aid];
    if (ans) taskFiles[t].answers[sid] = String(ans['Текст ответа']).trim(); else warnings.push('Ответ ' + aid + ' не найден на листе «Ответы»');
  });
  Object.keys(results).forEach((sid) => results[sid].sort((a, b) => (a.t < b.t ? -1 : 1)));

  const out = { generatedAt: Utilities.formatDate(new Date(), 'Europe/Moscow', 'dd.MM.yyyy HH:mm'), tasks, results };
  return { results: out, taskFiles, errors, warnings: dedupe_(warnings) };
}

function empty_(errors, warnings) { return { results: { tasks: [], results: {} }, taskFiles: {}, errors, warnings }; }

// Columns read by header name only; anything not listed is never read.
function readCols_(sheet, cols, required, errors) {
  const vals = sheet.getDataRange().getDisplayValues(); if (!vals.length) return [];
  const head = vals[0].map((h) => String(h).trim()); const idx = {};
  cols.forEach((c) => { const i = head.indexOf(c); if (i >= 0) idx[c] = i; });
  (required || []).forEach((c) => { if (!(c in idx)) errors.push('На листе «' + sheet.getName() + '» нет колонки «' + c + '»'); });
  return vals.slice(1).map((row) => { const o = {}; Object.keys(idx).forEach((c) => { o[c] = row[idx[c]]; }); return o; });
}
function critCols_(sheet) { return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0].map((h) => String(h).trim()).filter((h) => /^[KO]\d+$/.test(h)); }
function hosts_(s) { return String(s || '').split(/[\s,]+/).filter(Boolean).map((u) => u.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0]).filter(Boolean); }
function norm_(s) { return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, ''); }
function titleFromFile_(f) { const s = String(f || '').replace(/\.docx?$/i, '').replace(/^LB-[^-]+-[^-]+-/, '').trim(); return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
function dedupe_(a) { return a.filter((x, i) => a.indexOf(x) === i); }
function siteSetting_(ss, key) {
  const sh = ss.getSheetByName('Настройки сайта'); if (!sh) return '';
  const row = sh.getDataRange().getDisplayValues().find((r) => String(r[0]).trim() === key);
  return row ? String(row[1]).trim() : '';
}

// ---------- GitHub: все файлы одним коммитом ----------

function commitFiles_(token, files, message) {
  const api = 'https://api.github.com/repos/' + REPO + '/git/';
  const headers = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  const call = (path, method, body) => {
    const res = UrlFetchApp.fetch(api + path, { method: method || 'get', headers, contentType: 'application/json', payload: body ? JSON.stringify(body) : undefined, muteHttpExceptions: true });
    const code = res.getResponseCode();
    if (code === 401 || code === 403) throw new Error('GitHub не принял токен (' + code + '). Проверьте GITHUB_TOKEN и его доступ к репозиторию.');
    if (code >= 300) throw new Error('GitHub ответил ' + code + ': ' + res.getContentText().slice(0, 300));
    return JSON.parse(res.getContentText());
  };
  const head = call('ref/heads/' + BRANCH).object.sha;
  const baseTree = call('commits/' + head).tree.sha;
  const paths = Object.keys(files); const tree = [];
  for (let i = 0; i < paths.length; i += 10) { // blobs in parallel batches of 10
    const batch = paths.slice(i, i + 10);
    const reqs = batch.map((p) => ({ url: api + 'blobs', method: 'post', headers, contentType: 'application/json', muteHttpExceptions: true, payload: JSON.stringify({ content: Utilities.base64Encode(files[p], Utilities.Charset.UTF_8), encoding: 'base64' }) }));
    UrlFetchApp.fetchAll(reqs).forEach((res, k) => {
      if (res.getResponseCode() >= 300) throw new Error('GitHub ответил ' + res.getResponseCode() + ' на файл ' + batch[k] + ': ' + res.getContentText().slice(0, 200));
      tree.push({ path: batch[k], mode: '100644', type: 'blob', sha: JSON.parse(res.getContentText()).sha });
    });
  }
  const t = call('trees', 'post', { base_tree: baseTree, tree });
  const c = call('commits', 'post', { message, tree: t.sha, parents: [head] });
  call('refs/heads/' + BRANCH, 'patch', { sha: c.sha });
}

// ---------- отчёт ----------

function resultsSummary_(r) {
  const R = r.results; const svc = Object.keys(R.results);
  const n = svc.reduce((a, s) => a + R.results[s].length, 0);
  const ans = Object.keys(r.taskFiles).reduce((a, t) => a + Object.keys(r.taskFiles[t].answers).length, 0);
  const authors = {}; R.tasks.forEach((t) => t.authorName.split(/\s*,\s*/).filter(Boolean).forEach((a) => { authors[a] = 1; }));
  return 'На сайт уйдёт:\n' +
    '• задач: ' + R.tasks.length + ' (с фабулой, эталонным ответом и критериями)\n' +
    '• авторов задач: ' + Object.keys(authors).length + '\n' +
    '• сервисов с результатами: ' + svc.length + '\n' +
    '• оценённых ответов: ' + n + ' (с текстом ответа: ' + ans + ')\n\n' +
    'Сборщики, оценщики и их комментарии на сайт не попадают.';
}

function resultsReport_(title, r) {
  let text = resultsSummary_(r);
  if (r.errors.length) text += '\n\nОшибки (исправьте перед публикацией):\n• ' + r.errors.slice(0, 30).join('\n• ') + (r.errors.length > 30 ? '\n… и ещё ' + (r.errors.length - 30) : '');
  if (r.warnings.length) text += '\n\nПредупреждения:\n• ' + r.warnings.slice(0, 30).join('\n• ') + (r.warnings.length > 30 ? '\n… и ещё ' + (r.warnings.length - 30) : '');
  if (!r.errors.length && !r.warnings.length) text += '\n\nОшибок нет, можно публиковать.';
  SpreadsheetApp.getUi().alert(title, text, SpreadsheetApp.getUi().ButtonSet.OK);
}
