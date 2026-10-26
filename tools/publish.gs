/**
 * Рунетлекс Бенчмарк — публикация данных из таблицы «Сервисы, эксперты, оценщики» на сайт.
 *
 * Меню «Рунетлекс» в таблице:
 *   • Проверить данные — показывает, что уйдёт на сайт, и список ошибок. Ничего не публикует.
 *   • Опубликовать на сайт — проверяет и записывает data.json в репозиторий сайта на GitHub.
 *     Сайт обновляется через 1–2 минуты.
 *
 * Настройка один раз: Настройки проекта (шестерёнка слева) → Свойства скрипта →
 *   GITHUB_TOKEN = токен GitHub с доступом только к репозиторию runetlex.benchmark (Contents: Read and write).
 *
 * Правила выгрузки — лист «Для разработчика».
 */

const REPO = 'RunetlexAcademy/runetlex.benchmark';
const BRANCH = 'main';
const FILE = 'data.json';

const PKG = { 'без покупки': 'free', 'пакет 1': 'p1', 'пакет 2': 'p2', 'пакет 3': 'p3' };
// Колонка листа «Сервисы» (и строка листа «Пакеты») → поле в data.json
const FIELD = {
  'Название': 'name', 'Сайт': 'site', 'Слоган (одна строка)': 'line', 'Навыки': 'skills', 'Логотип (ссылка)': 'logo',
  'Комментарий к результату': 'comment', 'Краткое описание': 'short', 'Полное описание': 'full', 'Промокод': 'promo',
  'Скриншоты (ссылки)': 'shots', 'Демо (ссылка)': 'demo', 'Контакт для закупки': 'contact',
  'Как сервис решает задачи юриста (с примерами)': 'how', 'Видеообзор интерфейса (ссылка)': 'video',
};
const LIST_FIELDS = ['skills', 'shots'];
const IMAGE_FIELDS = ['logo', 'shots'];
const PENDING = ['на проверке', 'нужны правки'];

// Меню «Рунетлекс» добавляется строкой runetlexMenu(); в функции onOpen файла Code.gs.
function runetlexMenu() {
  SpreadsheetApp.getUi().createMenu('Рунетлекс')
    .addItem('Проверить данные', 'checkData')
    .addItem('Опубликовать на сайт', 'publishToSite')
    .addToUi();
}

function checkData() {
  const { data, errors, warnings } = buildData_(SpreadsheetApp.getActive());
  showReport_('Проверка данных', data, errors, warnings, false);
}

function publishToSite() {
  const ui = SpreadsheetApp.getUi();
  const { data, errors, warnings } = buildData_(SpreadsheetApp.getActive());
  if (errors.length) { showReport_('Публикация остановлена', data, errors, warnings, false); return; }
  const answer = ui.alert('Опубликовать на сайт?', summary_(data) + (warnings.length ? '\n\nПредупреждения:\n• ' + warnings.join('\n• ') : ''), ui.ButtonSet.OK_CANCEL);
  if (answer !== ui.Button.OK) return;
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) { ui.alert('Не задан токен', 'Добавьте свойство скрипта GITHUB_TOKEN: Расширения → Apps Script → Настройки проекта → Свойства скрипта.', ui.ButtonSet.OK); return; }
  putFile_(token, FILE, JSON.stringify(data, null, 1), 'Обновление данных из таблицы ' + data.generatedAt);
  ui.alert('Готово', 'Данные отправлены. Сайт обновится через 1–2 минуты:\nhttps://benchmark.runetlex-academy.ru/', ui.ButtonSet.OK);
}

// ---------- сборка data.json ----------

function buildData_(ss) {
  const errors = []; const warnings = [];
  const sheet = (name) => { const sh = ss.getSheetByName(name); if (!sh) { errors.push('Нет листа «' + name + '»'); return []; } return sh.getDataRange().getDisplayValues(); };
  const rows = (name) => {
    const v = sheet(name); if (!v.length) return [];
    const head = v[0].map((h) => String(h).trim());
    return v.slice(1).map((r, i) => { const o = { _row: i + 2 }; head.forEach((h, j) => { if (h) o[h] = String(r[j] == null ? '' : r[j]).trim(); }); return o; })
      .filter((o) => Object.keys(o).some((k) => k !== '_row' && o[k] !== ''));
  };
  const yes = (v) => String(v || '').trim().toLowerCase() === 'да';
  const list = (v) => String(v || '').split(',').map((x) => x.trim()).filter(Boolean);
  const img = (u) => { const m = String(u || '').match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/); return m ? 'https://lh3.googleusercontent.com/d/' + m[1] : String(u || ''); };
  const pendingCheck = (sheetName, r, label) => { if (yes(r['Публиковать']) && PENDING.indexOf(String(r['Статус анкеты'] || '').toLowerCase()) >= 0) errors.push(sheetName + ', строка ' + r._row + ': ' + label + ' — анкета «' + r['Статус анкеты'] + '». Проверьте и поставьте «одобрена».'); };
  const dupCheck = (sheetName, items, key) => { const seen = {}; items.forEach((r) => { const id = r[key]; if (!id) return; if (seen[id]) errors.push(sheetName + ': ID ' + id + ' повторяется (строки ' + seen[id] + ' и ' + r._row + ')'); else seen[id] = r._row; }); };

  // справочники
  const dict = sheet('Справочники');
  const col = (title) => { const j = (dict[0] || []).indexOf(title); return j < 0 ? [] : dict.slice(1).map((r) => String(r[j]).trim()).filter(Boolean); };
  const skills = col('Навыки'); const areas = col('Отрасль'); const short = col('Короткое название');
  if (!skills.length) errors.push('Справочники: пустой список навыков');
  if (!areas.length) errors.push('Справочники: пустой список отраслей');

  // пакеты: поле → какие пакеты его показывают
  const allow = {};
  const pv = sheet('Пакеты');
  if (pv.length) {
    const ph = pv[0].map((h) => String(h).trim().toLowerCase());
    const pcol = { free: ph.indexOf('без покупки'), p1: ph.indexOf('пакет 1'), p2: ph.indexOf('пакет 2'), p3: ph.indexOf('пакет 3') };
    pv.slice(1).forEach((r) => {
      const name = String(r[0]).trim(); const key = FIELD[name] || (name === 'Кейс с клиентом' ? 'cases' : null); if (!key) return;
      allow[key] = {}; Object.keys(pcol).forEach((p) => { allow[key][p] = pcol[p] >= 0 && yes(r[pcol[p]]); });
    });
  }

  // сервисы
  const svcRows = rows('Сервисы'); dupCheck('Сервисы', svcRows, 'ID сервиса');
  const services = [];
  svcRows.forEach((r) => {
    if (!yes(r['Публиковать'])) { if (r['Название'] && !r['Публиковать']) warnings.push('Сервисы, строка ' + r._row + ': «' + r['Название'] + '» не попадёт на сайт — в колонке «Публиковать» пусто'); return; }
    const where = 'Сервисы, строка ' + r._row;
    if (!r['ID сервиса']) { errors.push(where + ': нет ID сервиса'); return; }
    if (!r['Название']) errors.push(where + ': нет названия');
    const pkg = PKG[String(r['Пакет'] || '').toLowerCase()];
    if (!pkg) errors.push(where + ': не указан пакет');
    pendingCheck('Сервисы', r, r['Название'] || r['ID сервиса']);
    const s = { id: r['ID сервиса'], pkg: pkg || 'free', tested: yes(r['Протестирован']), testedAt: r['Дата проверки'] || '' };
    Object.keys(FIELD).forEach((colName) => {
      const key = FIELD[colName]; const v = r[colName]; if (!v) return;
      if (allow[key] && !allow[key][s.pkg]) return; // не входит в пакет — не выгружаем вовсе
      if (LIST_FIELDS.indexOf(key) >= 0) s[key] = list(v).map((x) => (IMAGE_FIELDS.indexOf(key) >= 0 ? img(x) : x));
      else s[key] = IMAGE_FIELDS.indexOf(key) >= 0 ? img(v) : v;
    });
    s.skills = s.skills || [];
    if (!s.skills.length) warnings.push(where + ': у «' + (s.name || s.id) + '» не указаны навыки — в реестре сервис не попадёт ни в один раздел');
    s.skills.forEach((k) => { if (skills.indexOf(k) < 0) errors.push(where + ': навыка «' + k + '» нет в «Справочниках»'); });
    if (s.site) s.site = s.site.replace(/^https?:\/\//, '').replace(/\/$/, '');
    services.push(s);
  });
  const pkgOf = {}; services.forEach((s) => { pkgOf[s.id] = s.pkg; });

  // кейсы: только у опубликованных сервисов, чей пакет включает кейс
  const caseRows = rows('Кейсы'); dupCheck('Кейсы', caseRows, 'ID кейса');
  const cases = [];
  caseRows.forEach((r) => {
    if (!yes(r['Публиковать'])) return;
    const where = 'Кейсы, строка ' + r._row;
    const sid = r['ID сервиса'];
    if (!pkgOf[sid]) { warnings.push(where + ': сервис ' + sid + ' не опубликован — кейс не попадёт на сайт'); return; }
    if (!(allow.cases && allow.cases[pkgOf[sid]])) { warnings.push(where + ': в пакете сервиса ' + sid + ' нет кейса — кейс не попадёт на сайт'); return; }
    pendingCheck('Кейсы', r, r['Заголовок'] || r['ID кейса']);
    const area = areas.indexOf(r['Отрасль']);
    if (area < 0) errors.push(where + ': отрасли «' + r['Отрасль'] + '» нет в «Справочниках»');
    cases.push({ id: r['ID кейса'], service: sid, client: r['Клиент (компания)'] || '', clientLogo: img(r['Логотип клиента (ссылка)']), area: Math.max(area, 0), title: r['Заголовок'] || '', text: r['Текст кейса'] || '', k: r['Результат (цифра)'] || '', kd: r['Что означает результат'] || '' });
  });

  // эксперты
  const expRows = rows('Эксперты'); dupCheck('Эксперты', expRows, 'ID эксперта');
  const experts = []; const taskOwner = {};
  expRows.forEach((r) => {
    if (!yes(r['Публиковать'])) return;
    const where = 'Эксперты, строка ' + r._row;
    if (!r['ФИО']) errors.push(where + ': нет ФИО');
    pendingCheck('Эксперты', r, r['ФИО'] || r['ID эксперта']);
    const tasks = list(r['ID задач']);
    tasks.forEach((t) => { if (taskOwner[t]) errors.push(where + ': задача ' + t + ' уже закреплена за ' + taskOwner[t]); else taskOwner[t] = r['ID эксперта']; });
    experts.push({ id: r['ID эксперта'], name: r['ФИО'] || '', company: r['Компания'] || '', position: r['Должность'] || '', companyLogo: img(r['Логотип компании (ссылка)']), photo: img(r['Фото (ссылка)']), tasks });
  });

  // организации-оценщики
  const orgRows = rows('Оценщики'); dupCheck('Оценщики', orgRows, 'ID организации');
  const assessorOrgs = orgRows.filter((r) => yes(r['Публиковать'])).map((r) => { pendingCheck('Оценщики', r, r['Название'] || r['ID организации']); return { id: r['ID организации'], name: r['Название'] || '', type: r['Тип'] || '', logo: img(r['Логотип (ссылка)']) }; });

  const num = (v, d) => { const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? d : n; };
  const team = rows('Команда').filter((r) => yes(r['Публиковать'])).sort((a, b) => num(a['Порядок'], 99) - num(b['Порядок'], 99))
    .map((r) => ({ order: num(r['Порядок'], 99), name: r['ФИО'] || '', position: r['Должность'] || '', role: r['Роль в проекте'] || '', photo: img(r['Фото (ссылка)']) }));
  const takeaways = rows('Ключевые выводы').filter((r) => yes(r['Публиковать']) && r['Текст вывода']).sort((a, b) => num(a['№'], 99) - num(b['№'], 99)).map((r) => r['Текст вывода']);
  const academyStats = rows('Цифры Академии').filter((r) => yes(r['Публиковать'])).sort((a, b) => num(a['Порядок'], 99) - num(b['Порядок'], 99))
    .map((r) => ({ num: r['Число'] || '', label: r['Подпись'] || '', text: r['Описание'] || '', linkText: r['Текст ссылки'] || '', url: r['Ссылка'] || '' }));
  const settings = {}; rows('Настройки сайта').forEach((r) => { if (r['Параметр']) settings[r['Параметр']] = r['Значение'] || ''; });

  if (!services.length) errors.push('Ни один сервис не отмечен «Публиковать: да» — сайт останется пустым');

  const data = {
    generatedAt: Utilities.formatDate(new Date(), 'Europe/Moscow', 'dd.MM.yyyy HH:mm'),
    settings, skills, areas, short, services, cases, experts, assessorOrgs, team, takeaways, academyStats,
  };
  return { data, errors, warnings };
}

// ---------- GitHub ----------

function putFile_(token, path, text, message) {
  const api = 'https://api.github.com/repos/' + REPO + '/contents/' + encodeURIComponent(path);
  const headers = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  const current = UrlFetchApp.fetch(api + '?ref=' + BRANCH, { headers, muteHttpExceptions: true });
  if (current.getResponseCode() === 401 || current.getResponseCode() === 403) throw new Error('GitHub не принял токен (' + current.getResponseCode() + '). Проверьте GITHUB_TOKEN и его доступ к репозиторию.');
  const sha = current.getResponseCode() === 200 ? JSON.parse(current.getContentText()).sha : undefined;
  const body = { message, branch: BRANCH, content: Utilities.base64Encode(text, Utilities.Charset.UTF_8) };
  if (sha) body.sha = sha;
  const res = UrlFetchApp.fetch(api, { method: 'put', headers, contentType: 'application/json', payload: JSON.stringify(body), muteHttpExceptions: true });
  if (res.getResponseCode() >= 300) throw new Error('GitHub ответил ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 300));
}

// ---------- отчёты ----------

function summary_(d) {
  const tested = d.services.filter((s) => s.tested).length;
  return 'На сайт уйдёт:\n' +
    '• сервисов: ' + d.services.length + ' (протестированы: ' + tested + ')\n' +
    '• кейсов: ' + d.cases.length + '\n' +
    '• экспертов: ' + d.experts.length + '\n' +
    '• организаций-оценщиков: ' + d.assessorOrgs.length + '\n' +
    '• людей в команде: ' + d.team.length + ', выводов: ' + d.takeaways.length;
}

function showReport_(title, data, errors, warnings) {
  let text = summary_(data);
  if (errors.length) text += '\n\nОшибки (исправьте перед публикацией):\n• ' + errors.join('\n• ');
  if (warnings.length) text += '\n\nПредупреждения:\n• ' + warnings.join('\n• ');
  if (!errors.length && !warnings.length) text += '\n\nОшибок нет, можно публиковать.';
  SpreadsheetApp.getUi().alert(title, text, SpreadsheetApp.getUi().ButtonSet.OK);
}
