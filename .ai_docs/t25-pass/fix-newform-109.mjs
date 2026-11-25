// The reviewer of 2026-11-10 on 8.2: terms and a project's own NodeKinds were ruled apart, so the first sentence held two thoughts and
// the cases go in a list (7.5, 7.6); the reason left out the NodeKind case and sections of mixed content. Whether the count reaches past
// the requirement of 8.1 is a doubt for the owner and is not written here.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.2"];
if (b.sidValue !== "s-pctqj9wqaq8762t") throw new Error("unexpected draft");

b.text = "Each of these nodes counts as a rule of a section:\n\n- a term the section holds;\n- a node of a project's own NodeKind the section holds;\n- a rule of a section inside that section.";
b.ruText = "Правилом раздела считается каждый из этих узлов:\n\n- термин, который раздел содержит;\n- узел собственного NodeKind проекта, который раздел содержит;\n- правило раздела, находящегося внутри этого раздела.";
b.reason = "Without this, a section holding only terms, nodes of a project's own NodeKind or sections would count as holding no rule.";
b.ruReason = "Иначе раздел, содержащий только термины, узлы собственного NodeKind проекта или разделы, считался бы не содержащим правил.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("8.2 updated");
