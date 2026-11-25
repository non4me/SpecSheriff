// Node 12.3.6, "Guaranteed fields", after the reviewer's report on the draft of fix-newform-345.mjs. The opening no longer
// defines the mark by the word "guaranteed" itself, and the moment of each check moves into the lead-in to the list. The first
// condition, "the value is set before the domain outputs or stores the data record", held for any value present, so the closed
// list excluded nothing: it now reads that the domain sets the value when it creates the data record and never removes it,
// the reviewer's reading of "set beforehand" in the decision of 2026-10-25. The reason loses two sentences that added no
// ground; the owner's thought that the domain reading the data decides whether it needs a field goes into the node's
// decisions when the drafts are moved. The Russian closing sentence no longer reads as "no other field of the RecordType".
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.6"];

n.text = [
  "A RecordType marks a field as guaranteed where the field has a value in every data record that can contain it. That is so only where, each time a domain outputs or stores such a data record, at least one of these holds:",
  "",
  "- the domain sets the value when it creates the data record and never removes it;",
  "- the domain itself produces or observes the value whenever it outputs or stores the data record;",
  "- the domain outputs or stores the data record only once it has the value, such as an identifier from an external system.",
  "",
  "A RecordType marks no other field as guaranteed.",
].join("\n");
n.reason = "A guaranteed field tells the domains that read the data what they can rely on. Where a field whose value may be missing is marked as guaranteed, the domain that outputs the data has to invent a value for it. Otherwise the RuntimeCheck generated from the RecordType refuses a data record that the domain should output or store.";
n.ruText = [
  "RecordType отмечает поле как гарантированное, если у поля есть значение в каждой записи данных, в которой оно может быть. Это так, только если всякий раз, когда домен выдаёт или сохраняет такую запись данных, верно хотя бы одно из следующего:",
  "",
  "- домен задаёт значение, когда создаёт запись данных, и никогда его не удаляет;",
  "- домен сам формирует или наблюдает это значение всякий раз, когда выдаёт или сохраняет запись данных;",
  "- домен выдаёт или сохраняет запись данных, только когда это значение у него уже есть, например идентификатор от внешней системы.",
  "",
  "RecordType не отмечает как гарантированное никакое другое поле.",
].join("\n");
n.ruReason = "Гарантированное поле сообщает доменам, которые читают данные, на что они могут полагаться. Если поле, значения которого может не быть, отмечено как гарантированное, домену, который выдаёт данные, приходится выдумывать для него значение. Иначе RuntimeCheck, сгенерированный из RecordType, отклоняет запись данных, которую домен должен выдать или сохранить.";
n.changes = [
  "Название — ваше: «Гарантированные поля». Предлагаю дополнить: «Гарантированные поля RecordType». По 7.4 название говорит, о чём узел, тому, кто видит только его, а поля есть и у самих узлов спецификации.",
  "По вашему решению от 15 ноября свойство поля «обязательно» переименовано в «гарантировано»: RecordType говорит, что домен может гарантировать.",
  "Подлежащее — RecordType: он отмечает поле как гарантированное (7.3).",
  "«Запись» заменена на «запись данных» — ваш термин. «Система» заменена на «домен»: по 12.3.1 и 12.3.4 RecordType описывает данные, которые выдаёт домен.",
  "«Записывает запись» заменено на «выдаёт или сохраняет запись данных»: в эти же моменты запись проверяет RuntimeCheck по 12.3.4. Условия должны выполняться всякий раз, когда домен выдаёт или сохраняет запись.",
  "Перечень условий закрыт: «только если … верно хотя бы одно из следующего». Было: «или» в конце предпоследнего пункта.",
  "Первый пункт. Было: «значение задано до того, как запись записывается». Этому условию удовлетворяет любое значение, которое есть в записи, поэтому перечень ничего не исключал. Теперь: домен задаёт значение, когда создаёт запись данных, и никогда его не удаляет. Так понято «заданы заранее» из вашего решения от 25 октября.",
  "Третий пункт: домен выдаёт или сохраняет запись данных, только когда значение у него уже есть, например идентификатор от внешней системы. Было: «система отказывается записать запись без него, как то, что идентифицирует запись». Идентификатор теперь пример, а не единственный случай — как в вашем решении от 25 октября.",
  "Виды негарантированных полей перенесены из текста в примеры (7.16): последняя фраза текста и так охватывает их все. Время закрытия запроса — самая вероятная ошибка: оно есть у каждого закрытого запроса, но не у открытого.",
  "Обоснование: первая фраза — что гарантированное поле даёт доменам, которые читают данные; дальше — что случается, если гарантировать значение, которого может не быть. Ваша мысль, что нужно ли поле, решает домен, который читает данные, войдёт в решения узла при переносе.",
  "Связь refines ведёт теперь на 12.3.2 «Состав RecordType», где сказано, что для каждого поля указано, гарантировано ли его значение. Раньше она вела на нынешний 1.24, чей sid теперь у 12.3.3 о генерации.",
  "Сохраняет sid нынешнего 1.25.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText);
