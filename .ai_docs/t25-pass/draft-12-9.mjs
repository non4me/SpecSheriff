// Node 12.9, the existing 1.33 "Gathered values stand beside their field" (s-ju5vcanbjph7mgh), for the owner's review of
// every rule, after the owner agreed on 2026-11-18 to remove the former 12.9 (the existing 1.32):
// - the title says "are written beside" rather than "stand beside", since a value is written somewhere and does not
//   "stand" there (the owner's correction of 2026-11-05 on "stands");
// - the reason no longer cites 11.1.2, a node of the Domains extension, which 1.7.4 forbids in the RecordType extension;
//   the parts the values come from are named as parts of the specification instead.
// The text is the existing wording.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-12-9.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["12.9"]) throw new Error("12.9 already drafted");
const GEN = "s-kh8qcd5kxgh9z3j"; // 10.14
d["12.9"] = {
  from: "1.33",
  sid: "kept",
  title: "Gathered values are written beside their field",
  ruTitle: "Собранные значения записываются рядом со своим полем",
  text: "Where the values of a field of type `one of` are gathered from elsewhere in the specification, all of them are written beside the field. Each is written with the node it comes from. They are gathered anew after every change to the specification and never written by hand.",
  ruText: "Если значения поля типа `one of` собираются из других мест спецификации, все они записываются рядом с полем. Каждое записывается вместе с узлом, из которого оно приходит. Их собирают заново после каждого изменения спецификации и никогда не пишут вручную.",
  reason: `Beside the field, its values are read whole where the field is described, without searching the parts of the specification they come from. The node each value comes from tells whom to ask about it. Gathered anew after every change, they never fall behind their source, as a list kept by hand would (§${GEN}).`,
  ruReason: `Рядом с полем его значения читаются целиком там, где описано поле, без поиска по частям спецификации, из которых они приходят. Узел, из которого приходит каждое значение, говорит, кого о нём спрашивать. Собранные заново после каждого изменения, они никогда не отстают от своего источника, как отставал бы список, который ведут вручную (§${GEN}).`,
  changes: [
    "Нынешний 1.33. Заголовок: «stand beside» → «записываются рядом»: значение записано где-то, а не «стоит» там (ваша поправка 5 ноября о слове «стоит»).",
    "Обоснование: убрана ссылка на 11.1.2 (узел расширения «Домены»), которую 1.7.4 запрещает в расширении RecordType; «частей, из которых они приходят» → «частей спецификации, из которых они приходят».",
    "Текст — нынешний, без изменений; русский текст — перевод.",
  ],
};
const out = {};
for (const [k, v] of Object.entries(d)) { if (k !== "12.9") out[k] = v; if (k === "12.8") out["12.9"] = d["12.9"]; }
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const a = '["12.9","move",0,"1.33","Gathered values stand beside their field"';
if (!h.includes(a)) throw new Error("row 12.9");
h = h.split(a).join('["12.9","move",0,"1.33","Gathered values are written beside their field"');
fs.writeFileSync(page, h);
console.log("ok");
