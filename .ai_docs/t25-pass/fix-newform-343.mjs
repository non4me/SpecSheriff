// Node 12.3.6, moved from the present node 1.25 (s-adhmw4gw6y82f44), drafted in the new form before the reviewer sees it.
// The field is named as a field of a RecordType; "record" becomes "data record", the owner's term; "the system" becomes
// "the domain", since a RecordType describes the data a domain outputs (12.3.1, 12.3.4); "writes the record" becomes
// "creates the data record". The third condition is stated positively. The list of optional fields moves into examples,
// since it illustrates "every other field" and restricts nothing. The reason gains why a guaranteed field is required.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["12.3.6"]) throw new Error("12.3.6 is drafted already");

const node = {
  from: "1.25",
  sid: "kept",
  title: "A field of a RecordType is required only where its value is guaranteed",
  text: [
    "A field of a RecordType is required where its value is guaranteed in every data record that can hold the field. The value is guaranteed where any one of these holds:",
    "",
    "- the value is set before the domain creates the data record;",
    "- the domain itself produces or observes the value whenever it creates the data record;",
    "- the value identifies the data record, and the domain creates the data record only once it has the value.",
    "",
    "Every other field of a RecordType is optional.",
  ].join("\n"),
  reason: "A required field tells the domains that read the data that every data record has its value, so they need not handle its absence. A value that may be missing cannot be demanded. Where it is demanded, the domain invents a value to fill the field, or the RuntimeCheck generated from the RecordType refuses a data record that the domain should output.",
  examples: [
    "The domain of requests puts the time of creation into every request it creates, so the field holding that time is required. A request that is still open has no time of closing, so the field holding that time is optional, although every closed request has one.",
    "The domain of invoices creates an invoice only once the payment system has given the invoice its number, so the field holding that number is required. The payment system's answer may leave out the payer's name, so the field holding that name is optional.",
  ],
  ruTitle: "Поле RecordType обязательно, только если его значение гарантировано",
  ruText: [
    "Поле RecordType обязательно, если его значение гарантированно есть в каждой записи данных, в которой это поле может быть. Значение гарантировано, если верно хотя бы одно из следующего:",
    "",
    "- значение задано до того, как домен создаёт запись данных;",
    "- домен сам формирует или наблюдает это значение всякий раз, когда создаёт запись данных;",
    "- значение идентифицирует запись данных, и домен создаёт запись данных, только когда это значение у него уже есть.",
    "",
    "Любое другое поле RecordType необязательно.",
  ].join("\n"),
  ruReason: "Обязательное поле сообщает доменам, которые читают данные, что его значение есть в каждой записи данных, поэтому им не нужно обрабатывать его отсутствие. Значение, которого может не быть, нельзя требовать. Если его требуют, домен выдумывает значение, чтобы заполнить поле, или RuntimeCheck, сгенерированный из RecordType, отклоняет запись данных, которую домен должен выдать.",
  ruExamples: [
    "Домен запросов проставляет время создания в каждый запрос, который создаёт, поэтому поле с этим временем обязательно. У запроса, который ещё открыт, нет времени закрытия, поэтому поле с этим временем необязательно, хотя у каждого закрытого запроса оно есть.",
    "Домен счетов создаёт счёт, только когда платёжная система уже дала счёту номер, поэтому поле с этим номером обязательно. В ответе платёжной системы может не быть имени плательщика, поэтому поле с этим именем необязательно.",
  ],
  changes: [
    "Заголовок и текст называют поле RecordType, а не просто поле: «поле» — общее слово (7.8).",
    "«Запись» заменена на «запись данных» — ваш термин. «Система» заменена на «домен»: по 12.3.1 и 12.3.4 RecordType описывает данные, которые выдаёт домен.",
    "«Записывает запись» заменено на «создаёт запись данных»: значение должно быть уже в момент, когда домен создаёт запись.",
    "Третий пункт сказан утвердительно: значение идентифицирует запись данных, и домен создаёт запись, только когда это значение у него есть. Было: «система отказывается записать запись без него».",
    "Сказано явно, что достаточно одного из пунктов. Было: «или» в конце предпоследнего пункта.",
    "Перечень необязательных полей перенесён из текста в примеры (7.16): он не ограничивает правило, а поясняет «любое другое поле». Примеры конкретные. Время закрытия запроса — самая вероятная ошибка: оно есть у каждого закрытого запроса, но не у открытого.",
    "Обоснование: добавлена первая фраза — зачем гарантированное поле делать обязательным. Вместо «отказываются записать запись» сказано, что запись отклоняет RuntimeCheck, сгенерированный из RecordType (12.3.4).",
    "Связь refines ведёт теперь на 12.3.2 «Состав RecordType», где сказано, что для каждого поля указано, обязательно ли оно. Раньше она вела на нынешний 1.24, чей sid теперь у 12.3.3 о генерации.",
    "Сохраняет sid нынешнего 1.25.",
  ],
  sidValue: "s-adhmw4gw6y82f44",
};

const ordered = {};
for (const [k, v] of Object.entries(d)) {
  ordered[k] = v;
  if (k === "12.3.5") ordered["12.3.6"] = node;
}
if (!ordered["12.3.6"]) throw new Error("12.3.5 not found");
fs.writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");
console.log(node.ruText);
