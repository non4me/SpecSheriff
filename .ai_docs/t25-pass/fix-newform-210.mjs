// 1.2.7 by the author's checklist (2026-11-11): its first sentence held its examples as a dash list inside the
// sentence (7.6: qualifications of one kind stand as a list); the main thought first, the examples a list after.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["1.2.7"];
if (b.sidValue !== "s-kh8qcd5kxgh9z3j" || b.agreed) throw new Error("unexpected 1.2.7");

b.text = "Whatever is generated from the nodes is regenerated after every change to them. It is never edited. Nothing is ever read back from it into the specification. Examples are:\n- a readable export, for example in markdown;\n- the map;\n- the instructions an agent reads.\n\nWhere a generated copy is kept, it is checked against what the nodes produce.";
b.ruText = "Всё, что генерируется из узлов, генерируется заново после каждого изменения узлов. Оно никогда не редактируется. Ничто из этого никогда не переносится обратно в спецификацию. Примеры:\n- читаемый экспорт, например в markdown;\n- карта;\n- инструкции, которые читает агент.\n\nСгенерированная копия, которая хранится, сверяется с тем, что дают узлы.";
b.changes.push("Примеры сгенерированного стоят списком после главной мысли, а не перечнем через тире внутри фразы (7.6).");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
