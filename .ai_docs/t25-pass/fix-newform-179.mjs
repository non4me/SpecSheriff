// The owner of 2026-11-10 on 9.4: the reason had cause and effect reversed, a test cannot be required to have an approved node; the chain runs rule, test, code.
// The text's first sentence follows that direction, a test is written or changed only for an approved node; the reason says why, without "under revision": a rule
// whose status is `draft` gets no test written or changed, the tests already written stay. The owner's explanation of the conveyor was for the agent, not the reason.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "A test that is added or changed carries the SpecTag of an approved node it is written for (§s-8xw4mgvpexyvw5q).", "A test is written or changed only for an approved node, and carries that node's SpecTag (§s-8xw4mgvpexyvw5q).");
swap("ruText", "Тест, который добавляют или меняют, связан SpecTag с одобренным узлом, для которого он написан (§s-8xw4mgvpexyvw5q).", "Тест пишут или меняют только для одобренного узла и связывают с ним SpecTag (§s-8xw4mgvpexyvw5q).");
b.reason = "While a rule's status is `draft`, no test is written or changed for it (§s-utvqbypzhmgndug), and the tests already written stay as they are. A new name with the same SpecTag does not change what the test verifies.";
b.ruReason = "Пока правило имеет статус `draft`, для него не пишут и не меняют тестов (§s-utvqbypzhmgndug), а уже написанные тесты остаются как есть. Новое название при прежнем SpecTag не меняет того, что тест проверяет.";
b.changes = [...b.changes, "По вашему замечанию: причина и следствие идут по цепочке правило, тест, код. Тест пишут или меняют только для одобренного узла; обоснование говорит о статусе `draft`, а не о пересмотре, и ссылается на 1.3.2."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
console.log(b.ruReason);
