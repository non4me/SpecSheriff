// Node 12.3.1: the reviewer passed the short-sentence version after these fixes, applied here.
// - Paragraph 3: "but not its structure" read as a ban that the next sentence lifted, and "structure" and "format" named one
//   thing. It now says what happens if a domain changes only the values, and what happens if it changes the format.
// - The reason restated paragraph 1 and the exception, and stated requirements; it now says only why a format is declared
//   once, under one name.
// - The example came from the worked example (orders), which CLAUDE.md forbids in the guidelines; it now names users and
//   requests, and shows the domain that masks personal data keeping the RecordType.
// The exception itself waits for the owner's answer on its wording.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

p.en = swap(
  p.en,
  "A domain may offer data it has taken from another domain in the same format. It may change the values in that data, but not its structure. The RecordType then keeps its name. A domain that changes the structure declares a RecordType of its own, with a new name. RecordType names are unique across the specification.",
  "A domain may offer data it has taken from another domain. If it changes only the values in that data, the data keeps its RecordType. If it changes the format, the domain declares a RecordType of its own, with a new name. RecordType names are unique across the specification.",
);
p.ru = swap(
  p.ru,
  "Домен может предлагать дальше данные, взятые у другого домена, в том же формате. Он может менять в них значения, но не структуру. Имя RecordType при этом не меняется. Домен, который меняет структуру, объявляет свой RecordType с новым именем. Имена RecordType уникальны во всей спецификации.",
  "Домен может предлагать дальше данные, взятые у другого домена. Если он меняет в них только значения, у данных остаётся их RecordType. Если он меняет формат, он объявляет свой RecordType с новым именем. Имена RecordType уникальны во всей спецификации.",
);

const enReasonStart = p.en.indexOf("Reason: ");
const enExamplesStart = p.en.indexOf("\n\nExamples: ");
p.en =
  p.en.slice(0, enReasonStart) +
  "Reason: Two descriptions of one format drift apart over time. The domains that read the data then cannot tell which description holds. A format declared once, under one name, by whoever changes it, has nothing to drift from." +
  "\n\nExamples: The domain of users declares the RecordType of a user. The domain of requests takes users and declares the RecordType of a request. Users and requests both hold an address, whose format is declared once, in the contracts section. A domain that masks users' personal data and offers them on keeps the RecordType of a user.";
void enExamplesStart;

const ruReasonStart = p.ru.indexOf("Обоснование: ");
p.ru =
  p.ru.slice(0, ruReasonStart) +
  "Обоснование: Два описания одного формата со временем расходятся. Тогда домены, которые читают эти данные, не могут понять, какое описание верно. Формату, объявленному один раз, под одним именем, тем, кто его меняет, расходиться не с чем." +
  "\n\nПримеры: Домен пользователей объявляет RecordType пользователя. Домен запросов берёт пользователей и объявляет RecordType запроса. И пользователи, и запросы содержат адрес, формат которого объявлен один раз — в контрактах. Домен, который маскирует персональные данные пользователей и предлагает их дальше, сохраняет RecordType пользователя.";
p.why = "See fix-newform-282.mjs to fix-newform-295.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
