// Nodes 12.3.3 and 12.3.4, after the reviewer's report on the proposal of fix-newform-306.mjs: the proposal held two rules
// applied separately, so it is split. Node 12.3.3 keeps its sid and its draft, the generation of types and RuntimeChecks,
// with its reason naming a RecordType and a data format instead of "the description" and "the same structure". The owner's
// ruling of 2026-11-14, that a domain must not break its own format and that a check is built on that rule, becomes a new
// node 12.3.4. It also says that a record with a field its RecordType does not describe breaks the format: otherwise an
// optional field renamed in the code passes the check, the case of renaming the owner named. Nodes 12.3.4 to 12.3.13 of
// the structure become 12.3.5 to 12.3.14.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

// A new sid, checked against every file of the specification and the drafts.
const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const root = path.resolve(new URL("../../specs", here).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const texts = [fs.readFileSync(file, "utf8")];
const walk = dir => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(json|jsonl)$/.test(e.name)) texts.push(fs.readFileSync(p, "utf8"));
  }
};
walk(root);
let sid;
do {
  sid = "s-" + Array.from({ length: 15 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
} while (texts.some(t => t.includes(sid)));

const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

// 12.3.3: the proposal withdrawn, the reason's terms named, the list of changes made exact.
const g = d["12.3.3"];
delete g.proposals;
g.reason = "A type or a RuntimeCheck written alongside a RecordType is a second copy of the same data format, and the two copies drift apart. Generated from the RecordType, they cannot disagree with it.";
g.ruReason = "Тип или RuntimeCheck, написанный рядом с RecordType, — вторая копия того же формата данных, и две копии со временем расходятся. Сгенерированные из RecordType, тип и RuntimeCheck разойтись с ним не могут.";
g.changes = g.changes.map(c => c
  .replace("Текст — абзац 3 нынешнего 1.24, дословно, и ссылка на 8.1 после «RecordTypes».", "Текст — абзац 3 нынешнего 1.24: «beside» заменено на «alongside», после «RecordTypes» добавлена ссылка на 12.3.2.")
  .replace("Обоснование — абзац 2 нынешнего обоснования, дословно.", "Обоснование — абзац 2 нынешнего обоснования. «Описание» и «та же структура» заменены на RecordType и формат данных — термины 12.3.1; последняя фраза переписана."));
if (!g.changes.some(c => c.includes("alongside")) || !g.changes.some(c => c.includes("термины 12.3.1"))) throw new Error("12.3.3 changes not updated");
g.changes.push("Ваше правило о том, что домен не нарушает свой формат, вынесено в новый узел 12.3.4: рецензент нашёл, что в одном узле оно и генерация применяются по отдельности.");

// 12.3.4: the new node, placed after 12.3.3, since its check is the RuntimeCheck that 12.3.3 generates.
d["12.3.4"] = {
  from: "",
  sid: "new",
  title: "Data records conform to their RecordType",
  text: "A domain outputs and writes into its store only data records that conform to their RecordType. A data record with a field that its RecordType does not describe does not conform to that RecordType. The RuntimeCheck generated from the RecordType (§s-e877bnfa559tvk9) refuses a data record that does not conform to it.",
  reason: "The domains that read a domain's data rely on the format of that data. A data record that breaks that format is therefore stopped before any reader meets it. A record with a field that its RecordType does not describe is stopped too. Otherwise, an optional field renamed in the code would pass the check, and the domains that read that field would lose its value without notice.",
  examples: [
    "The domain of users renames a user's optional field `phone` to `tel` in its code. A data record of a user with a phone number then has the field `tel`, which the RecordType of a user does not describe. The RuntimeCheck generated from that RecordType refuses the record.",
  ],
  ruTitle: "Записи данных соответствуют своему RecordType",
  ruText: "Домен выдаёт и записывает в своё хранилище только записи данных, которые соответствуют своему RecordType. Запись данных, в которой есть поле, не описанное в её RecordType, этому RecordType не соответствует. RuntimeCheck, сгенерированный из RecordType (§s-e877bnfa559tvk9), отклоняет запись данных, которая не соответствует этому RecordType.",
  ruReason: "Домены, которые читают данные домена, полагаются на формат этих данных. Поэтому запись данных, нарушающая этот формат, останавливается раньше, чем её встретит хоть один читатель. Запись с полем, которого её RecordType не описывает, тоже останавливается. Иначе необязательное поле, переименованное в коде, прошло бы проверку, и домены, которые читают это поле, незаметно потеряли бы его значение.",
  ruExamples: [
    "Домен пользователей переименовывает в коде необязательное поле пользователя `phone` в `tel`. Тогда в записи данных о пользователе с номером телефона есть поле `tel`, которого RecordType пользователя не описывает. RuntimeCheck, сгенерированный из этого RecordType, отклоняет такую запись.",
  ],
  changes: [
    "Новый узел, по вашему решению от 14 ноября: домен не нарушает свой формат, а проверка строится на этом правиле. Проверка — RuntimeCheck, который 12.3.3 уже генерирует из RecordType.",
    "Узел стоит после 12.3.3, потому что ссылается на сгенерированный там RuntimeCheck. Прежние 12.3.4–12.3.13 стали 12.3.5–12.3.14.",
    "«Выдаёт и записывает в своё хранилище» — те же данные, что описывает RecordType по 12.3.1: проверяется не только запись в хранилище.",
    "Предложение о поле, которого RecordType не описывает, — моё предложение. Оно закрывает случай переименования, который вы назвали: переименованное необязательное поле иначе проходит проверку.",
    "Пример — новый.",
  ],
  sidValue: sid,
};

// Keys keep the order of the structure: 12.3.4 goes right after 12.3.3.
const ordered = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "12.3.4") continue;
  ordered[k] = v;
  if (k === "12.3.3") ordered["12.3.4"] = d["12.3.4"];
}

// The mention of the former 12.3.13 in the list of changes of 5.10.
for (const v of Object.values(ordered)) {
  if (Array.isArray(v.changes)) v.changes = v.changes.map(c => c.replace("расширение для доменов (12.3.13)", "расширение для доменов (12.3.14)"));
}
fs.writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");

// The structure of the page: the rows 12.3.4 to 12.3.13 renumbered, the new row inserted.
const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
for (let i = 13; i >= 4; i--) page = swap(page, `["12.3.${i}",`, `["12.3.${i + 1}",`);
page = swap(page, `      ["12.3.5","move",0,"1.25",`, `      ["12.3.4","new",0,"","Data records conform to their RecordType","Записи данных соответствуют своему RecordType","","",[],""],\n      ["12.3.5","move",0,"1.25",`);
fs.writeFileSync(pageFile, page);
console.log("12.3.4 sid:", sid);
