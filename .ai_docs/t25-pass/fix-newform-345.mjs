// The owner's decision of 2026-11-15: the rule of 12.3.6 is titled "Guaranteed fields" («Гарантированные поля»), and the
// property of a field of a RecordType is renamed from "required" to "guaranteed" wherever that makes sense («да,
// переименовывай везде где это имеет смысл»). A RecordType states what the domain that outputs the data can guarantee;
// whether a field is required is for the domain that reads the data to decide. Node 12.3.6 is rewritten around the mark
// "guaranteed". In the agreed nodes 12.3.2 and 12.3.4 only the term changes, so they stay agreed (a term renamed by the
// owner's decision is not shown again and is reported in one line).
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

const n = d["12.3.6"];
n.title = "Guaranteed fields";
n.ruTitle = "Гарантированные поля";
n.text = [
  "A RecordType marks a field as guaranteed where the field's value is guaranteed in every data record that can contain the field, each time a domain outputs or stores that data record. The value is guaranteed only where at least one of these holds:",
  "",
  "- the value is set before the domain outputs or stores the data record;",
  "- the domain itself produces or observes the value whenever it outputs or stores the data record;",
  "- the domain outputs or stores the data record only once it has the value, such as an identifier from an external system.",
  "",
  "A RecordType marks no other field as guaranteed.",
].join("\n");
n.reason = "A guaranteed field tells the domains that read the data what they can rely on. Each of those domains decides for itself whether it needs the field. A value that may be missing cannot be guaranteed. Where its field is marked as guaranteed, the domain invents a value to fill the field, or the RuntimeCheck generated from the RecordType refuses a data record that the domain should output or store.";
n.examples = [
  "The domain of requests puts the time of creation into every request it creates, so the field holding that time is guaranteed. Every closed request has a time of closing. A request still open has none, so the field holding that time is not guaranteed.",
  "The domain of users stores a user only once an external sign-in service has given the user an identifier, so the field holding that identifier is guaranteed. That service's answer may leave out the user's display name, so the field holding that name is not guaranteed.",
];
n.ruText = [
  "RecordType отмечает поле как гарантированное, если значение этого поля гарантированно есть в каждой записи данных, в которой это поле может быть, всякий раз, когда домен выдаёт или сохраняет эту запись данных. Значение гарантировано, только если верно хотя бы одно из следующего:",
  "",
  "- значение задано до того, как домен выдаёт или сохраняет запись данных;",
  "- домен сам формирует или наблюдает это значение всякий раз, когда выдаёт или сохраняет запись данных;",
  "- домен выдаёт или сохраняет запись данных, только когда это значение у него уже есть, например идентификатор от внешней системы.",
  "",
  "Никакое другое поле RecordType не отмечает как гарантированное.",
].join("\n");
n.ruReason = "Гарантированное поле сообщает доменам, которые читают данные, на что они могут полагаться. Нужно ли им это поле, каждый из этих доменов решает сам. Значение, которого может не быть, нельзя гарантировать. Если его поле отмечено как гарантированное, домен выдумывает значение, чтобы заполнить поле, или RuntimeCheck, сгенерированный из RecordType, отклоняет запись данных, которую домен должен выдать или сохранить.";
n.ruExamples = [
  "Домен запросов проставляет время создания в каждый запрос, который создаёт, поэтому поле с этим временем гарантированное. У каждого закрытого запроса есть время закрытия. У ещё открытого запроса его нет, поэтому поле с этим временем не гарантированное.",
  "Домен пользователей сохраняет пользователя, только когда внешний сервис входа уже дал ему идентификатор, поэтому поле с этим идентификатором гарантированное. В ответе этого сервиса может не быть отображаемого имени пользователя, поэтому поле с этим именем не гарантированное.",
];
n.changes = [
  "Название — ваше: «Гарантированные поля». По вашему решению от 15 ноября свойство поля «обязательно» переименовано в «гарантировано»: RecordType говорит, что домен может гарантировать, а нужно ли поле, решает домен, который читает данные.",
  "Подлежащее — RecordType: он отмечает поле как гарантированное (7.3).",
  "«Запись» заменена на «запись данных» — ваш термин. «Система» заменена на «домен»: по 12.3.1 и 12.3.4 RecordType описывает данные, которые выдаёт домен.",
  "«Записывает запись» заменено на «выдаёт или сохраняет запись данных»: в эти же моменты запись проверяет RuntimeCheck по 12.3.4.",
  "Значение должно быть всякий раз, когда домен выдаёт или сохраняет запись. Значение, заданное при создании записи и потом удалённое, гарантированным не считается.",
  "Перечень условий закрыт: «только если верно хотя бы одно из следующего». Было: «или» в конце предпоследнего пункта.",
  "Третий пункт: домен выдаёт или сохраняет запись данных, только когда значение у него уже есть, например идентификатор от внешней системы. Было: «система отказывается записать запись без него, как то, что идентифицирует запись». Идентификатор теперь пример, а не единственный случай — как в вашем решении от 25 октября.",
  "Виды негарантированных полей перенесены из текста в примеры (7.16): последняя фраза текста и так охватывает их все. Время закрытия запроса — самая вероятная ошибка: оно есть у каждого закрытого запроса, но не у открытого.",
  "Обоснование: первые две фразы — что гарантированное поле даёт доменам, которые читают данные, и что каждый из них сам решает, нужно ли ему поле. Вместо «отказываются записать запись» сказано, что её отклоняет RuntimeCheck, сгенерированный из RecordType (12.3.4).",
  "Связь refines ведёт теперь на 12.3.2 «Состав RecordType», где сказано, что для каждого поля указано, гарантировано ли его значение. Раньше она вела на нынешний 1.24, чей sid теперь у 12.3.3 о генерации.",
  "Сохраняет sid нынешнего 1.25.",
];

const a = d["12.3.2"];
a.text = swap(a.text, "whether the field is required and what the field means", "whether the field's value is guaranteed and what the field means");
a.ruText = swap(a.ruText, "обязательно ли поле и что оно означает", "гарантировано ли значение поля и что оно означает");
a.changes.push("По вашему решению от 15 ноября «обязательно ли поле» заменено на «гарантировано ли значение поля». Смысл узла не изменился, узел остаётся согласованным.");

const b = d["12.3.4"];
b.examples[0] = swap(b.examples[0], "renames a user's optional field `phone` to `tel` in its code.", "renames a user's field `phone`, whose value is not guaranteed, to `tel` in its code.");
b.ruExamples[0] = swap(b.ruExamples[0], "переименовывает в коде необязательное поле пользователя `phone` в `tel`.", "переименовывает в коде поле пользователя `phone`, значение которого не гарантировано, в `tel`.");
b.changes.push("По вашему решению от 15 ноября в примере «необязательное поле `phone`» заменено на «поле `phone`, значение которого не гарантировано». Смысл узла не изменился, узел остаётся согласованным.");

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText);
