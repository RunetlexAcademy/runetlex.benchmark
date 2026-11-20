/**
 * Рунетлекс Бенчмарк — приём заявок с сайта.
 *
 * Скрипт привязан к таблице «Бенчмарк // Заявки с сайта» и опубликован как веб-приложение
 * (Deploy → New deployment → Web app, Execute as: Me, Who has access: Anyone).
 * Адрес веб-приложения вписывается в «Настройки сайта» таблицы 2 → forms_endpoint.
 * После любой правки кода: Deploy → Manage deployments → карандаш → Version: New version → Deploy,
 * иначе веб-приложение продолжит работать на старой версии.
 *
 * Сайт присылает POST с полями формы. Поле form говорит, какая это форма:
 *   «Новый сервис для реестра» → лист «Сервисы»
 *   «Заявка эксперта»          → лист «Эксперты»
 *   «Отчёт бенчмарка»          → лист «Отчёт» + письмо со ссылкой на отчёт через Unisender
 *
 * Письмо с отчётом уходит через Unisender (метод sendEmail), в GetCourse заявка не передаётся:
 * так человеку не приходит письмо GetCourse «Добро пожаловать» с логином и паролем.
 *
 * Script Properties (Project Settings → Script Properties):
 *   UNISENDER_KEY           ключ API Unisender (секрет, вводит владелец)
 *   UNISENDER_LIST_ID       номер списка Unisender, куда попадут адреса (и из которого можно отписаться)
 *   UNISENDER_SENDER_EMAIL  адрес отправителя, подтверждённый в Unisender
 *   UNISENDER_SENDER_NAME   имя отправителя, по умолчанию «Рунетлекс Академия»
 *   REPORT_URL              ссылка на PDF отчёта
 */

const SHEET_ID = '1YpRPadicdZzyNGxDnJDkS29y_ljQKs_b7RxUL5ZqMvQ';
const SITE_URL = 'https://benchmark.runetlex-academy.ru';

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

  // Колонка E листа «Отчёт»: что стало с письмом («отправлено» или текст ошибки).
  if (p.form === 'Отчёт бенчмарка') sheet.getRange(rowNum, 5).setValue(sendReport_(p.email, p.fio));
  return reply_({ ok: true });
}

// «Фамилия Имя Отчество» → «Имя»; при другом количестве слов имя не угадываем и пишем без обращения по имени.
function firstName_(fio) {
  const words = String(fio || '').split(/\s+/).filter(String);
  return words.length === 3 ? words[1] : '';
}

const esc_ = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function reportHtml_(name, reportUrl) {
  const hello = name ? 'Добрый день, ' + esc_(name) + '!' : 'Добрый день!';
  const p = 'margin:0 0 16px;font-size:16px;line-height:1.5;color:#07141d';
  return '<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px">'
    + '<p style="' + p + '">' + hello + '</p>'
    + '<p style="' + p + '">На связи команда Рунетлекс Академии.</p>'
    + '<p style="' + p + '">Спасибо за интерес к Рунетлекс Бенчмарку! Отчёт о проверке юридических ИИ-сервисов можно скачать по кнопке:</p>'
    + '<p style="margin:0 0 24px"><a href="' + esc_(reportUrl) + '" style="display:inline-block;background:#1f4fd6;color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;padding:14px 28px;border-radius:28px">Скачать отчёт (PDF)</a></p>'
    + '<p style="' + p + '">В отчёте: как мы проверяли сервисы, результаты по отраслям права, что сервисы уже умеют и где ошибаются, какой сервис выбрать под какую задачу.</p>'
    + '<p style="' + p + '">Все результаты и методология — на сайте <a href="' + SITE_URL + '" style="color:#1f4fd6">benchmark.runetlex-academy.ru</a></p>'
    + '<p style="' + p + '">С заботой,<br>команда Рунетлекс Академии</p>'
    + '</div>';
}

// Отправляет письмо со ссылкой на отчёт через Unisender. Возвращает текст для колонки E.
function sendReport_(email, fio) {
  const props = PropertiesService.getScriptProperties();
  const key = props.getProperty('UNISENDER_KEY');
  const listId = props.getProperty('UNISENDER_LIST_ID');
  const sender = props.getProperty('UNISENDER_SENDER_EMAIL');
  const reportUrl = props.getProperty('REPORT_URL');
  if (!key || !listId || !sender || !reportUrl) return 'нет: не заданы настройки Unisender или REPORT_URL';

  const name = firstName_(fio);
  try {
    const res = UrlFetchApp.fetch('https://api.unisender.com/ru/api/sendEmail?format=json', {
      method: 'post',
      payload: {
        api_key: key,
        email: name ? name + ' <' + email + '>' : email,
        sender_name: props.getProperty('UNISENDER_SENDER_NAME') || 'Рунетлекс Академия',
        sender_email: sender,
        subject: 'Отчёт Рунетлекс Бенчмарка',
        body: reportHtml_(name, reportUrl),
        list_id: listId,
        lang: 'ru',
        error_checking: '1',
      },
      muteHttpExceptions: true,
    });
    const body = JSON.parse(res.getContentText());
    if (body.error) return 'ошибка: ' + body.error;
    const r = (body.result || [])[0] || {};
    if (r.id) return 'отправлено';
    const errs = (r.errors || []).map((x) => x.message || x.code).join('; ');
    return 'ошибка: ' + (errs || res.getContentText().slice(0, 200));
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
  Logger.log('UNISENDER_KEY: ' + (props.getProperty('UNISENDER_KEY') ? 'задан' : 'не задан'));
  Logger.log('UNISENDER_LIST_ID: ' + (props.getProperty('UNISENDER_LIST_ID') || 'не задан'));
  Logger.log('UNISENDER_SENDER_EMAIL: ' + (props.getProperty('UNISENDER_SENDER_EMAIL') || 'не задан'));
  Logger.log('UNISENDER_SENDER_NAME: ' + (props.getProperty('UNISENDER_SENDER_NAME') || 'Рунетлекс Академия (по умолчанию)'));
  Logger.log('REPORT_URL: ' + (props.getProperty('REPORT_URL') || 'не задан'));
}

// Запустить вручную из редактора: отправляет письмо с отчётом на TEST_EMAIL (или на адрес отправителя).
function testReportEmail() {
  const props = PropertiesService.getScriptProperties();
  const to = props.getProperty('TEST_EMAIL') || props.getProperty('UNISENDER_SENDER_EMAIL');
  Logger.log('Письмо на ' + to + ': ' + sendReport_(to, ''));
}
