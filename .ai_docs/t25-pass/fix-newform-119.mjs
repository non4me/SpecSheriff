// The owner of 2026-11-10 chose the reason recommended for 8.3: their own first sentence, why only the project can say whether its kind needs code,
// and why a rule lists those kinds. The reason names no node, so at the move 8.3 loses its cites link to s-6fw72j65jkqrfpf.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");
if (!b.reason.startsWith("Only a project knows")) throw new Error("unexpected reason");
if (!b.ruReason.startsWith("Только проект знает")) throw new Error("unexpected ruReason");

b.reason = "A project may need kinds of node of its own, beyond those the SpecSheriff guidelines already describe. Only the project knows whether such a kind's nodes are carried out by code, by tools or by people. Nobody approves an extension of the schema, so a rule lists those kinds.";
b.ruReason = "Проекту могут потребоваться собственные типы узлов, помимо тех, что уже описаны в SpecSheriff guidelines. Только проект знает, выполняются ли узлы такого типа кодом, инструментами или людьми. Расширение схемы никто не одобряет, поэтому эти типы узлов перечисляет правило.";
b.changes = [...b.changes, "Обоснование заменено выбранным вами вариантом: ваше первое предложение, почему решает только проект и почему эти типы узлов перечисляет правило."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason);
console.log(b.ruReason);
