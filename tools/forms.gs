/**
 * Рунетлекс Бенчмарк — приём заявок с сайта.
 *
 * Скрипт привязан к таблице «Бенчмарк // Заявки с сайта» и опубликован как веб-приложение
 * (Deploy → New deployment → Web app, Execute as: Me, Who has access: Anyone).
 * Адрес веб-приложения вписывается в «Настройки сайта» таблицы 2 → forms_endpoint.
 *
 * Сайт присылает POST с полями формы. Поле form говорит, какая это форма:
 *   «Новый сервис для реестра» → лист «Сервисы»
 *   «Заявка эксперта»          → лист «Эксперты»
 *   «Отчёт бенчмарка»          → лист «Отчёт» + передача в GetCourse (группа, по которой процесс шлёт письмо)
 *
 * Script Properties (Project Settings → Script Properties):
 *   GETCOURSE_ACCOUNT  адрес школы без https, например runetlex.getcourse.ru (или свой домен школы)
 *   GETCOURSE_KEY      ключ API GetCourse (секрет, вводит владелец)
 *   GETCOURSE_GROUP    название группы, по умолчанию «Бенчмарк: отчёт»
 */

const SHEET_ID = '1YpRPadicdZzyNGxDnJDkS29y_ljQKs_b7RxUL5ZqMvQ';

const FORMS = {
  'Новый сервис для реестра': { sheet: 'Сервисы', row: (p) => [p.name, p.url, 'новая'] },
  'Заявка эксперта': {
    sheet: 'Эксперты',
    row: (p) => [p.fio, p.email, p.company, p.area === 'другая' && p.areaOther ? 'другая: ' + p.areaOther : p.area, p.consent, 'новая'],
  },
  'Отчёт бенчмарка': { sheet: 'Отчёт', row: (p) => [p.fio, p.email, p.consent] },
};

function doPost(e) {
  const p = clean_((e && e.parameter) || {});
  const form = FORMS[p.form];
  // Скрытое поле website люди не видят и не заполняют; если оно заполнено, это бот.
  if (!form || p.website) return reply_({ ok: false });
  if (p.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return reply_({ ok: false, error: 'email' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let sheet, rowNum;
  try {
    sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(form.sheet);
    sheet.appendRow([new Date()].concat(form.row(p)));
    rowNum = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  if (p.form === 'Отчёт бенчмарка') sheet.getRange(rowNum, 5).setValue(sendToGetCourse_(p));
  return reply_({ ok: true });
}

// Добавляет человека в GetCourse и в группу; процесс GetCourse по этой группе отправляет письмо с отчётом.
function sendToGetCourse_(p) {
  const props = PropertiesService.getScriptProperties();
  const account = (props.getProperty('GETCOURSE_ACCOUNT') || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const key = props.getProperty('GETCOURSE_KEY');
  if (!account || !key) return 'нет: не заданы настройки GetCourse';

  const words = (p.fio || '').split(/\s+/).filter(String);
  // «Фамилия Имя Отчество» → имя и фамилия отдельно; иначе всё в поле имени.
  const name = words.length === 3 ? { first_name: words[1], last_name: words[0] } : { first_name: p.fio };
  const params = {
    user: Object.assign({ email: p.email, group_name: [props.getProperty('GETCOURSE_GROUP') || 'Бенчмарк: отчёт'] }, name),
    // Уже существующему пользователю только добавляем группу: имя и фамилию в базе Академии не трогаем.
    system: { refresh_if_exists: 0 },
  };
  try {
    const res = UrlFetchApp.fetch('https://' + account + '/pl/api/users', {
      method: 'post',
      payload: { action: 'add', key: key, params: Utilities.base64Encode(JSON.stringify(params), Utilities.Charset.UTF_8) },
      muteHttpExceptions: true,
    });
    const body = JSON.parse(res.getContentText());
    if (body.success && body.result && body.result.success) return 'да, ' + (body.result.user_status || 'ok');
    return 'ошибка: ' + ((body.result && body.result.error_message) || body.error_message || res.getContentText().slice(0, 200));
  } catch (err) {
    return 'ошибка: ' + err;
  }
}

// Обрезает длину и не даёт значению стать формулой в таблице.
function clean_(params) {
  const out = {};
  Object.keys(params).forEach((k) => {
    let v = String(params[k] || '').trim().slice(0, 500);
    if (/^[=+\-@]/.test(v)) v = "'" + v;
    out[k] = v;
  });
  return out;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Запустить вручную из редактора: проверяет листы и настройки, ничего не отправляет.
function checkSetup() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const missing = Object.keys(FORMS).map((f) => FORMS[f].sheet).filter((s) => !ss.getSheetByName(s));
  const props = PropertiesService.getScriptProperties();
  Logger.log('Листы: ' + (missing.length ? 'нет ' + missing.join(', ') : 'все на месте'));
  Logger.log('GETCOURSE_ACCOUNT: ' + (props.getProperty('GETCOURSE_ACCOUNT') || 'не задан'));
  Logger.log('GETCOURSE_KEY: ' + (props.getProperty('GETCOURSE_KEY') ? 'задан' : 'не задан'));
  Logger.log('GETCOURSE_GROUP: ' + (props.getProperty('GETCOURSE_GROUP') || 'Бенчмарк: отчёт (по умолчанию)'));
}
