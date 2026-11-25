// The owner, 2026-11-10: 4.1 is titled by what it holds, and its former title becomes the first paragraph of 4.2. Both stay agreed: the
// change is the owner's own wording.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const a = d["4.1"], b = d["4.2"];
if (a.sidValue !== "s-vj7ercem526zd6v" || b.sidValue !== "s-mm2de262g3jkapu") throw new Error("unexpected drafts");
a.title = "What the technical appendix holds";
a.ruTitle = "Что содержит техническое приложение";
a.changes = [...a.changes, "По вашему решению заголовок говорит, что содержит приложение. Прежний заголовок стал первым абзацем 4.2."];
b.text = "The technical appendix is inseparable from the base specification.\n\n" + b.text;
b.ruText = "Техническое приложение неотъемлемо связано с базовой спецификацией.\n\n" + b.ruText;
b.changes = [...b.changes, "По вашему решению первым абзацем стал прежний заголовок 4.1."];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(a.title, "|", b.text.split("\n")[0], "| agreed", a.agreed, b.agreed);
