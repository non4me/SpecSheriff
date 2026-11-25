// The fresh reviewer of 9.7 (2026-11-11), wording fixes: "a section it is in" read as the nearest section only
// (agreed 6.1 says "under", 1.3.8 "at any depth", and the tools walk every section above); the reason's second
// sentence no longer dangles "Made a node" and names who approves.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.7"];
if (b.sidValue !== "s-gf6n8ge4mke3pr2" || b.agreed) throw new Error("unexpected 9.7");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "- a section it is in.", "- a section it is under, at any depth.");
swap("ruText", "- к разделу, в котором оно находится.", "- к разделу, в который входит это правило или узел, на любом уровне вложенности.");
swap("reason", "Made a node, the exemption and its grounds are approved as any node is (§s-67vekyup7y8smap).", "Being a node, the exemption is approved with its grounds by one of its owners, as any node is (§s-67vekyup7y8smap).");
swap("ruReason", "Будучи узлом, освобождение вместе с его основанием одобряется так же, как любой узел (§s-67vekyup7y8smap).", "Освобождение — узел, поэтому его вместе с основанием одобряет один из его ответственных, как любой узел (§s-67vekyup7y8smap).");
b.changes.push("По замечаниям рецензента: «a section it is in» стало «a section it is under, at any depth», как в согласованных 6.1 и 1.3.8; вторая фраза обоснования говорит, кто одобряет освобождение.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
