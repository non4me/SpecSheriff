// Node 1.39 goes to the archive, and a new node 12.3.5 takes its place in the structure, after the owner's rulings of
// 2026-11-14. A RecordType describes only the data its domain outputs, and no rule governs a domain's input: a domain takes
// what it needs from the other domains or from outside, and external data allows no link at all. A RecordType of one domain
// therefore does not name a RecordType of another domain, and 1.39, which checked the `consumes` links against such names,
// has nothing left to check («1. да»). A reference by an identifier to another domain's data records stays allowed, as
// 12.3.2 says («2. да»). The new node states what is ruled out, so that a check can be built on it: using another domain's
// RecordType as a field's type, or refining it. It is a draft and goes to the reviewer before the owner sees it.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

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

const title = "A RecordType does not embed another domain's RecordType";
const ruTitle = "RecordType не встраивает RecordType другого домена";
d["12.3.5"] = {
  from: "",
  sid: "new",
  title,
  text: "A RecordType does not use a RecordType of another domain as a field's type, and does not refine it. A field of a RecordType may hold the identifier of another domain's data record (§s-6eb92ddch7shuvu). A RecordType may also use a fragment of a format from the contracts section (§s-7vm323mhry2enx3).",
  reason: "A RecordType describes only the data that its domain outputs, and no rule governs what a domain takes as input. A RecordType that embedded another domain's RecordType would make its domain's output depend on a format that the other domain may change. An identifier is a value in the output itself and embeds no format.",
  examples: ["The RecordType of a request holds the identifier of the user who made the request, not the user's data record."],
  ruTitle,
  ruText: "RecordType не использует RecordType другого домена как тип поля и не уточняет его. Поле RecordType может хранить идентификатор записи данных другого домена (§s-6eb92ddch7shuvu). RecordType может также использовать фрагмент формата из контрактов (§s-7vm323mhry2enx3).",
  ruReason: "RecordType описывает только данные, которые выдаёт его домен, а то, что домен берёт на вход, никакое правило не регламентирует. RecordType, встроивший RecordType другого домена, сделал бы выход своего домена зависимым от формата, который тот другой домен может изменить. Идентификатор — это значение в самих выходных данных, и никакого формата он не встраивает.",
  ruExamples: ["RecordType запроса хранит идентификатор пользователя, сделавшего запрос, а не запись данных о пользователе."],
  changes: [
    "Новый узел, по вашим решениям от 14 ноября: RecordType описывает только выход домена, вход не регламентируется; RecordType одного домена не называет RecordType другого; ссылка по идентификатору допустима.",
    "Стоит на месте нынешнего 1.39, который уходит в архив: ему больше нечего проверять. При переносе архивная запись 1.39 назовёт этот узел заменой.",
    "Ещё не прошёл рецензента.",
  ],
  sidValue: sid,
};

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const old = `["12.3.5","same",0,"1.39","A domain uses another domain's RecordTypes only from the sections it declares","Домен использует RecordType другого домена только из разделов, которые он объявляет"]`;
if (!page.includes(old)) throw new Error("row 12.3.5 not found");
page = page.replace(old, `["12.3.5","new",0,"","${title}","${ruTitle}","","Заменяет нынешний 1.39, который уходит в архив.",[],""]`);
fs.writeFileSync(pageFile, page);
console.log("12.3.5 sid:", sid);
