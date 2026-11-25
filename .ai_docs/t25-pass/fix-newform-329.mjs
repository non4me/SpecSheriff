// Node 12.3.5, after the reviewer's report. fix-newform-328.mjs never wrote newform.json, so the key "12.3.5" still held
// present 1.39; this script writes the new node, with the sid that 328 drew (s-8ht2hn88cu2qwz9), and applies the reviewer's
// fixes. The title takes the owner's word «называет»: the rule bans naming another domain's RecordType anywhere in a
// field's type, which covers lists and maps, except in a field holding identifiers, and bans refining it. The sentence on
// fragments of a format is cut, since 12.3.1 already says where fragments are declared. The reason no longer goes
// through the text sentence by sentence.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const sid = "s-8ht2hn88cu2qwz9";
if (JSON.stringify(d).includes(sid)) throw new Error("sid already used");

const title = "A RecordType does not name another domain's RecordType";
const ruTitle = "RecordType не называет RecordType другого домена";
d["12.3.5"] = {
  from: "",
  sid: "new",
  title,
  text: "A RecordType of one domain does not name a RecordType of another domain:\n\n- anywhere in a field's type, except in a field holding identifiers of that RecordType's data records (§s-6eb92ddch7shuvu);\n- as the RecordType it refines.",
  reason: "A RecordType describes the data its own domain outputs and stores, not what the domain takes in from other domains or from outside the system. Built on another domain's RecordType, it would change whenever that domain changed that RecordType, though nothing in its own domain had changed.",
  examples: ["The RecordType of a request holds the identifier of the user who made the request, not the user's data record."],
  ruTitle,
  ruText: "RecordType одного домена не называет RecordType другого домена:\n\n- нигде в типе поля, кроме поля, которое хранит идентификаторы записей данных этого RecordType (§s-6eb92ddch7shuvu);\n- как RecordType, который он уточняет.",
  ruReason: "RecordType описывает данные, которые его собственный домен выдаёт и хранит, а не то, что домен берёт у других доменов или извне системы. Построенный на RecordType другого домена, он менялся бы при каждом изменении этого RecordType тем доменом, хотя в его собственном домене ничего не менялось.",
  ruExamples: ["RecordType запроса хранит идентификатор пользователя, сделавшего запрос, а не запись данных о пользователе."],
  changes: [
    "Новый узел, по вашим решениям от 14 ноября: RecordType описывает только то, что домен выдаёт; RecordType одного домена не называет RecordType другого; ссылка по идентификатору допустима.",
    "Стоит на месте нынешнего 1.39, который уходит в архив. При переносе архивная запись 1.39 назовёт этот узел заменой.",
    "По замечаниям рецензента: заголовок — ваше слово «называет»; запрет действует везде в типе поля, значит, и на списки, и на словари; фраза о фрагментах формата убрана — это уже сказано в 12.3.1; обоснование переписано.",
  ],
  sidValue: sid,
};
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const old = `"A RecordType does not embed another domain's RecordType","RecordType не встраивает RecordType другого домена"`;
if (!page.includes(old)) throw new Error("row 12.3.5 not found");
page = page.replace(old, `"${title}","${ruTitle}"`);
fs.writeFileSync(pageFile, page);
console.log(d["12.3.5"].text);
