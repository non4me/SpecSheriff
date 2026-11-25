// The owner of 2026-11-10 on 9.3 chose the restriction: a test is written for a rule or for a node of a project's own kind that requires an implementation in
// code, never for one whose kind has `needsCode: false`; the tools, which today accept any node of a project's own kind (binding.ts:198), follow at the tools step.
// The ruling goes into the node's meta.decisions at the move. The text stands; only the list of changes says whose the restriction is.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.3"];
if (b.sidValue !== "s-8xw4mgvpexyvw5q" || b.agreed) throw new Error("unexpected draft");
const from = "Узел собственного типа — только тот, которому требуется имплементация кода, и для ссылки теста на своё правило он считается правилом, как требует согласованный 1.4.2.";
const at = b.changes.indexOf(from);
if (at < 0) throw new Error("no change line on the restriction");
b.changes[at] = "По вашему решению 2026-11-10: узел собственного типа — только тот, которому требуется имплементация кода. Для ссылки теста на своё правило он считается правилом, как требует согласованный 1.4.2. Инструменты, которые сейчас принимают любой собственный тип, будут поправлены.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.changes[at]);
