// The owner of 2026-11-11 on 9.5: its first two paragraphs, which stated one requirement twice with different
// edges, become one sentence from the message's side (the reviewer's wording): the message names each node a
// SpecTag binds to a symbol added or changed in the commit. "Approved" goes (1.3.2 holds it), and so does the
// list "This covers" (it retold 1.5.1 and missed a node implemented for the first time).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.5"];
if (b.sidValue !== "s-ef93u6cnbs2sevr" || b.agreed) throw new Error("unexpected 9.5");

b.text = "The message of a commit names, by its sid, each node that a SpecTag binds to a symbol added or changed in that commit. A symbol in the tests does not count.\n\nThe message names no section.";
b.ruText = "Сообщение коммита называет по sid каждый узел, который SpecTag связывает с символом, добавленным или изменённым в этом коммите. Символ в тестах не учитывается.\n\nСообщение не называет ни одного раздела.";
b.changes.push("По вашему выбору первые два абзаца, говорившие одно требование дважды и с разными границами, стали одной фразой со стороны сообщения: оно называет каждый узел, который SpecTag связывает с добавленным или изменённым символом. Ушли «одобренный» (это следует из 1.3.2) и список «сюда входят» (он пересказывал 1.5.1 и пропускал узел, реализуемый впервые).");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
