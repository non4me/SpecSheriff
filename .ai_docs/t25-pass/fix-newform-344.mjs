// Node 12.3.6, after the reviewer's report on the draft of fix-newform-343.mjs. "Creates" becomes "outputs or stores", the
// moments at which 12.3.4 has the RuntimeCheck check a data record, and the value must be there each time. The list of
// conditions is closed ("only where at least one"). The third condition follows the decision of 2026-10-25, where an identifier
// is an example of a value the domain waits for, not the only such value. The reason's first sentence says why it matters
// whether a field is required; the refusal covers storing too. Example 1 has one thought per sentence; example 2 names only
// what any system has, a user and an external sign-in service.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.6"];
if (!n) throw new Error("12.3.6 not drafted");

n.text = [
  "A field of a RecordType is required where its value is guaranteed in every data record that can hold the field, each time a domain outputs or stores that data record. The value is guaranteed only where at least one of these holds:",
  "",
  "- the value is set before the domain outputs or stores the data record;",
  "- the domain itself produces or observes the value whenever it outputs or stores the data record;",
  "- the domain outputs or stores the data record only once it has the value, such as an identifier from an external system.",
  "",
  "Every other field of a RecordType is optional.",
].join("\n");
n.reason = "Whether a field is required tells the domains that read a RecordType's data whether they must handle the field's absence. A value that may be missing cannot be demanded. Where it is demanded, the domain invents a value to fill the field, or the RuntimeCheck generated from the RecordType refuses a data record that the domain should output or store.";
n.examples = [
  "The domain of requests puts the time of creation into every request it creates, so the field holding that time is required. Every closed request has a time of closing. A request still open has none, so the field holding that time is optional.",
  "The domain of users stores a user only once an external sign-in service has given the user an identifier, so the field holding that identifier is required. That service's answer may leave out the user's display name, so the field holding that name is optional.",
];
n.ruText = [
  "Поле RecordType обязательно, если его значение гарантированно есть в каждой записи данных, в которой это поле может быть, всякий раз, когда домен выдаёт или сохраняет эту запись данных. Значение гарантировано, только если верно хотя бы одно из следующего:",
  "",
  "- значение задано до того, как домен выдаёт или сохраняет запись данных;",
  "- домен сам формирует или наблюдает это значение всякий раз, когда выдаёт или сохраняет запись данных;",
  "- домен выдаёт или сохраняет запись данных, только когда это значение у него уже есть, например идентификатор от внешней системы.",
  "",
  "Любое другое поле RecordType необязательно.",
].join("\n");
n.ruReason = "По тому, обязательно ли поле, домены, которые читают данные RecordType, узнают, нужно ли им обрабатывать его отсутствие. Значение, которого может не быть, нельзя требовать. Если его требуют, домен выдумывает значение, чтобы заполнить поле, или RuntimeCheck, сгенерированный из RecordType, отклоняет запись данных, которую домен должен выдать или сохранить.";
n.ruExamples = [
  "Домен запросов проставляет время создания в каждый запрос, который создаёт, поэтому поле с этим временем обязательно. У каждого закрытого запроса есть время закрытия. У ещё открытого запроса его нет, поэтому поле с этим временем необязательно.",
  "Домен пользователей сохраняет пользователя, только когда внешний сервис входа уже дал ему идентификатор, поэтому поле с этим идентификатором обязательно. В ответе этого сервиса может не быть отображаемого имени пользователя, поэтому поле с этим именем необязательно.",
];
n.changes = [
  "Заголовок и текст называют поле RecordType, а не просто поле: «поле» — общее слово (7.8).",
  "«Запись» заменена на «запись данных» — ваш термин. «Система» заменена на «домен»: по 12.3.1 и 12.3.4 RecordType описывает данные, которые выдаёт домен.",
  "«Записывает запись» заменено на «выдаёт или сохраняет запись данных»: в эти же моменты запись проверяет RuntimeCheck по 12.3.4.",
  "Значение должно быть всякий раз, когда домен выдаёт или сохраняет запись. Значение, заданное при создании записи и потом удалённое, гарантированным не считается.",
  "Перечень условий закрыт: «только если верно хотя бы одно из следующего». Было: «или» в конце предпоследнего пункта.",
  "Третий пункт: домен выдаёт или сохраняет запись данных, только когда значение у него уже есть, например идентификатор от внешней системы. Было: «система отказывается записать запись без него, как то, что идентифицирует запись». Идентификатор теперь пример, а не единственный случай — как в вашем решении от 25 октября.",
  "Виды необязательных полей перенесены из текста в примеры (7.16): «любое другое поле» и так охватывает их все. Время закрытия запроса — самая вероятная ошибка: оно есть у каждого закрытого запроса, но не у открытого.",
  "Обоснование: новая первая фраза говорит, зачем вообще отмечать, обязательно ли поле. Вместо «отказываются записать запись» сказано, что её отклоняет RuntimeCheck, сгенерированный из RecordType (12.3.4).",
  "Связь refines ведёт теперь на 12.3.2 «Состав RecordType», где сказано, что для каждого поля указано, обязательно ли оно. Раньше она вела на нынешний 1.24, чей sid теперь у 12.3.3 о генерации.",
  "Сохраняет sid нынешнего 1.25.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText);
