// The second wording check of 12.9 (2026-11-18): the text opened with a long condition; its main thought now comes first
// in a short sentence.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-488.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.9"];
const swap = (s, a, b) => { if (!s.includes(a)) throw new Error("not found: " + a); return s.split(a).join(b); };
n.text = swap(n.text, "Where the values of a field of type `one of` (§s-xfu2gpzddjnmgks) are gathered from elsewhere in the specification, all of them are written beside the field.", "The values of a field of type `one of` (§s-xfu2gpzddjnmgks) that come from elsewhere in the specification are written beside the field.");
n.ruText = swap(n.ruText, "Если значения поля типа `one of` (§s-xfu2gpzddjnmgks) собираются из других мест спецификации, все они записываются рядом с полем.", "Значения поля типа `one of` (§s-xfu2gpzddjnmgks), которые приходят из других мест спецификации, записываются рядом с полем.");
n.changes.push("По второй проверке формулировок: главная мысль — первой, короткой фразой: «Значения поля типа `one of`, которые приходят из других мест спецификации, записываются рядом с полем».");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
