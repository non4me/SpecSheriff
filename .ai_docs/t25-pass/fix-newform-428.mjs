// Node 10.7: the wording checker's findings on fix-newform-427.mjs, as the agent judged them. Every paragraph after the
// first names the `strict` flag again; "that check" becomes "the stricter check"; the command is named in a sentence of its
// own, so that "that lists" cannot attach to "tools"; each sentence of the reason states one relation.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-428.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const APPROVAL = "s-qzthyh7yqvfhsa2";
const n = d["10.7"];
const p = n.text.split("\n\n");
const rp = n.ruText.split("\n\n");
const text = [
  p[0],
  "Only an owner of the specification turns the `strict` flag on or off. That owner records each such act in a separate entry, which names that owner. Only the latest such entry sets the `strict` flag.",
  `Two procedures refuse to act while a check that the \`strict\` flag makes stricter would refuse a commit that changed nothing:\n- the procedure that turns the \`strict\` flag on;\n- while the \`strict\` flag is on, the procedure that approves the specification (§${APPROVAL}).`,
  "Each refusal names the command that lists what the stricter check would refuse. That command is one of the SpecSheriff tools.",
];
const ruText = [
  rp[0],
  "Включает или выключает флаг `strict` только ответственный за спецификацию. Каждое такое действие этот ответственный фиксирует отдельной записью, в которой назван он сам. Флаг `strict` задаёт только последняя такая запись.",
  `Две процедуры отказываются действовать, пока проверка, которую флаг \`strict\` делает строже, отклонила бы коммит, ничего не меняющий:\n- процедура, которая включает флаг \`strict\`;\n- пока флаг \`strict\` включён, процедура одобрения спецификации (§${APPROVAL}).`,
  "Каждый отказ называет команду, которая выводит то, что отклонила бы более строгая проверка. Эта команда — одна из инструментов SpecSheriff.",
];
n.text = text.join("\n\n");
n.ruText = ruText.join("\n\n");
n.reason = [
  "The rules of the guidelines require only the minimum that every project needs. Some projects need stricter checks: for example, a project whose code is all bound to its rules and has to stay so. With the `strict` flag, the owners switch such strictness on and off by an act of their own. Each rule that makes a check stricter, a project's own included, says what changes.",
  "Suppose the `strict` flag were turned on, or the specification approved while the flag is on, while a stricter check would refuse a commit that changed nothing. Every commit would then be refused until one commit fixed everything that check finds.",
].join("\n\n");
n.ruReason = [
  "Правила guidelines требуют только минимума, который нужен каждому проекту. Некоторым проектам нужны более строгие проверки: например, проекту, весь код которого связан с правилами и должен таким остаться. Флагом `strict` ответственные включают и выключают такую строгость своим отдельным действием. Каждое правило, которое делает проверку строже, в том числе собственное правило проекта, говорит, что меняется.",
  "Допустим, флаг `strict` включили или одобрили спецификацию при включённом флаге, пока более строгая проверка отклонила бы коммит, ничего не меняющий. Тогда отклонялся бы каждый коммит, пока один коммит не исправит всё, что находит эта проверка.",
].join("\n\n");
n.changes.push("После проверки формулировок: в каждом абзаце флаг назван заново; команда названа отдельным предложением; каждое предложение обоснования говорит об одном отношении.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
