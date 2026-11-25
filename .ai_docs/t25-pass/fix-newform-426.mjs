// Node 10.7: the owner agreed on 2026-11-17 («ок») to the reviewer's first doubt, as the agent recommended: while the flag
// is on, the procedure that approves the specification refuses too while code without a SpecTag remains, and names the
// command. The third paragraph now lists both procedures that refuse; the reason says why the approval refuses.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-426.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const TAG = "s-8xw4mgvpexyvw5q";
const APPROVAL = "s-qzthyh7yqvfhsa2";
const n = d["10.7"];
const p = n.text.split("\n\n");
const rp = n.ruText.split("\n\n");
p[2] = `Two procedures refuse to act while any symbol of the system's code other than tests, or any test, carries no SpecTag (§${TAG}):\n- the procedure that turns the flag on;\n- while the flag is on, the procedure that approves the specification (§${APPROVAL}).\n\nEach refusal names the command of the SpecSheriff tools that lists that code by file and symbol.`;
rp[2] = `Две процедуры отказываются действовать, пока у какого-либо символа кода системы вне тестов или у какого-либо теста нет SpecTag (§${TAG}):\n- процедура, которая включает флаг;\n- пока флаг включён, процедура одобрения спецификации (§${APPROVAL}).\n\nКаждый отказ называет команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.`;
n.text = p.join("\n\n");
n.ruText = rp.join("\n\n");
n.reason += "\n\nWhile the flag is on, approving the specification over such code would bring back the state that the refusal to turn the flag on prevents.";
n.ruReason += "\n\nПока флаг включён, одобрение спецификации при таком коде вернуло бы то состояние, которое предотвращает отказ включать флаг.";
n.changes.push("Ваше решение от 17 ноября («ок») по первому сомнению рецензента: пока флаг включён, процедура одобрения спецификации тоже отказывает, если есть код без SpecTag, и называет команду. Третий абзац перечисляет обе процедуры; в обосновании сказано, почему отказывает и одобрение.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
