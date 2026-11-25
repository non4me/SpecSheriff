// The owner of 2026-11-12 accepted the English of their wording of check 10.1.2 — "Every file of the specification
// complies with its JSON Schema" — which confirms it (a dictated wording is confirmed once).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.2");
r.agreed = "2026-11-12";
r.change = "Было «Every file matches its schema». Теперь ваши слова: «Каждый файл спецификации соответствует своей JSON-схеме», по-английски по смыслу — «complies with».";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, r.en, "| agreed", r.agreed);
