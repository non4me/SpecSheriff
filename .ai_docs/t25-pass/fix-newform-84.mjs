// The owner, 2026-11-09, on 6.6: a ratio is written as UML writes a multiplicity, which most readers know. The values stand as
// code, since two asterisks in running text read as emphasis in Markdown.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["6.6"];
if (n.sidValue !== "s-bckzdwd35d2nefa") throw new Error("6.6 is another node");
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("text", "the multiplicity of each end: 1, 0..1, 1..N or 0..N.", "the multiplicity of each end in UML notation: `1`, `0..1`, `1..*` or `0..*`.");
swap("text", "user 1:0..N session", "`user 1:0..* session`");
swap("ruText", "кратность каждого конца: 1, 0..1, 1..N или 0..N.", "кратность каждого конца в нотации UML: `1`, `0..1`, `1..*` или `0..*`.");
swap("ruText", "user 1:0..N session", "`user 1:0..* session`");
n.changes = n.changes.map(c => c.startsWith("По вашему решению вынесен из 6.1.") ? "По вашему решению вынесен из 6.1. Текст — последний абзац прежнего 6.1, запись значений приведена к UML: вместо `N` стоит `*`." : c);
n.changes.push("На шаге инструментов меняются шаблон значения в JSON-схеме, тесты с прежними значениями и значения в saloon.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
