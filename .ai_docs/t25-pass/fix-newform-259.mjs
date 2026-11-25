// Node 7.16: the owner accepted it (2026-11-14, «ок») and asked to check at once that the JSON Schema supports the property
// `examples`. It does not: node.schema.json declares no `examples`, and its `unevaluatedProperties: false` refuses a node
// that holds one, such as agreed nodes 7.16 and 10.5. Nothing in the tools reads `examples` either. The schema and the
// tools must support it before these nodes are moved into the files of the specification; the note below records it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.16"];
n.agreed = "2026-11-14";
n.changes.push(
  "Вы приняли эту формулировку (2026-11-14).",
  "По вашей просьбе проверено: JSON-схема свойства `examples` пока не поддерживает. В node.schema.json его нет, а `unevaluatedProperties: false` отклонит узел с примерами — 7.16 и 10.5. Инструменты его тоже не читают. На шаге инструментов, до переноса узлов в файлы спецификации: `examples` в схеме (список непустых строк), его показ в render, export и show, тест — первым.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("7.16 agreed");
