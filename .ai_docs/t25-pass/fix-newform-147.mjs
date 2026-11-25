// The owner of 2026-11-10 on 1.3.8: the reason only retold the text; the reason the node had, that a section's status shows at a glance how its nodes stand,
// was lost when an earlier reviewer cut it. Their words go in: «статус раздела позволяет легко видеть состояние согласования узлов внутри него.
// Что может быть полезно в случаях, когда видны только разделы.» At the move 1.3.8 loses its cites link to s-kh8qcd5kxgh9z3j.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["1.3.8"];
if (b.sidValue !== "s-9kfdycuq34beqvs" || !b.reason.startsWith("Built from the nodes under it")) throw new Error("unexpected draft");
b.reason = "A section's status lets one easily see the approval state of the nodes inside it. This can be useful where only sections are visible.";
b.ruReason = "Статус раздела позволяет легко видеть состояние согласования узлов внутри него. Это может быть полезно, когда видны только разделы.";
b.changes = b.changes.map((c) => (c === "Обоснование сокращено до того, зачем статус строится заново." ? "Обоснование ваше: зачем разделу статус. Прежний рецензент сократил его до того, что статус не отстаёт от узлов, и сама причина пропала." : c));
if (!b.changes.some((c) => c.startsWith("Обоснование ваше"))) b.changes = [...b.changes, "Обоснование ваше: зачем разделу статус. Прежний рецензент сократил его до того, что статус не отстаёт от узлов, и сама причина пропала."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason);
console.log(b.ruReason);
