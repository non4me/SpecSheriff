// Removes section 14, "Adoption of an existing project", from the new structure of the base, by the
// owner's decision of 2026-11-18, and corrects every note that sent a part of a node there.
import fs from "node:fs";
const swap = (s, a, b) => { if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 80)); return s.split(a).join(b); };
const here = new URL(".", import.meta.url);
const edit = (name, f) => { const p = new URL(name, here); fs.writeFileSync(p, f(fs.readFileSync(p, "utf8"))); };

edit("base-structure.html", h => swap(h,
  `    { n: "14", en: "Adoption of an existing project", ru: "Адоптация существующего проекта", purpose: "Расширение: что действует, пока существующий проект переходит на метод.", rows: [\n      ["14.1","part",0,"1.8","part of 1.8: What a draft means","уходит сюда: Код и тесты, написанные до перехода на метод"]\n    ]},\n`,
  ""));

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const c = nf["10.6"].changes;
const at = (needle) => { const i = c.findIndex(x => x.includes(needle)); if (i < 0) throw new Error("no change with: " + needle); return i; };
c[at("уходит в расширение «Адоптация существующего проекта» (12.6.2)")] =
  "Второй абзац 5.4 (спецификацию не одобряют, пока у кода или тестов нет SpecTag) должен был уйти в расширение «Адоптация существующего проекта». По вашему решению от 17 ноября его заменило правило ниже: процедура одобрения показывает сообщения проверок. Раздел «Адоптация» убран 18 ноября.";
c[at("11.2 может уйти в расширение «Адоптация»")] =
  "Ссылка на 11.2 (код без SpecTag в черновике) заменена ссылкой на 1.3.2 «Что значит черновик»: основное правило не ссылается на расширение (12.1.3), а 11.2 тогда могло уйти в расширение «Адоптация». По вашему решению от 17 ноября этот узел, теперь 9.5, остался в базе.";
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const tPath = new URL("table-10-1.json", here);
let t = fs.readFileSync(tPath, "utf8");
t = swap(t, "цена в черновике ушла в 12.6.", "цена в черновике — в 9.5, который по вашему решению от 17 ноября остался в базе.");
t = swap(t, "Цена в черновике ушла в расширение «Адоптация» (12.6).", "Цена в черновике — в 9.5, который по вашему решению от 17 ноября остался в базе.");
fs.writeFileSync(tPath, t);

edit("extensions-runtime.html", h => swap(h, "<span>Представления спецификации</span><span>Адоптация</span>", "<span>Представления спецификации</span>"));
edit("settings-prototype.mjs", s => swap(s, `  { id: "adoption", name: "Adoption of an existing project", about: "bringing existing documents and code under the checks", active: false },\n`, ""));
console.log("section 14 removed");
