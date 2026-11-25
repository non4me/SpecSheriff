// The fresh reviewer of the chosen 9.2 (2026-11-11), every checklist line ✓; its precisions, each decided by an
// agreed node: the symbol is one "outside its tests", as agreed 1.5.2 and 9.5 say (agreed 9.1 counts the tests as the
// system's code, so a bound test alone met both conditions); "counts for it" names the rule implemented (two rules
// stood before "it"); the Russian «которого» could point at the project or the rule.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.2"];
if (b.sidValue !== "s-6fw72j65jkqrfpf" || b.agreed) throw new Error("unexpected 9.2");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "- a symbol of the system's code is bound to it;", "- a symbol of the system's code outside its tests is bound to it;");
swap("text", "directly or through a chain of `implements` links, counts for it.", "directly or through a chain of `implements` links, counts for the rule implemented.");
swap("ruText", "- символ кода системы связан с ним;", "- символ кода системы вне его тестов связан с ним;");
swap("ruText", "напрямую или через цепочку связей `implements`, засчитываются ему.", "напрямую или через цепочку связей `implements`, засчитываются реализуемому правилу.");
swap("ruText", "- правило собственного типа в проекте, узлам которого не требуется имплементация кода", "- правило собственного типа в проекте, если узлам этого типа не требуется имплементация кода");
b.changes.push("По рецензенту, по согласованным узлам: символ — «вне его тестов», как в 1.5.2 и 9.5 (по 9.1 тесты тоже код системы, и один связанный тест выполнял бы оба условия); «засчитываются ему» стало «засчитываются реализуемому правилу» (перед «ему» стояли два правила); в русском «узлам которого» стало «если узлам этого типа».");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
