// Node 10.7: the second review by specsheriff-rule-reviewer, as the agent judged it.
// - The refusals are judged as if the specification were approved and the flag on; judged as things stand, a draft would
//   never be refused, against the owner's ruling that the flag cannot be turned on while such code is left.
// - A check that the flag makes stricter may be one made at a commit or at a push, as the owner made the flag general, so
//   the refusals cover a push as well as a commit.
// - "Such a rule says what the check does differently" is cut, being implied; "Two procedures" becomes "The following
//   procedures" (no count in prose); the sentence on the command goes under the list; "a check" cites the table of checks;
//   the first example names 9.5 by what it states, not by its number; the reason keeps its first two sentences and ends on
//   why the flag is the owners' act and why it must not stop all work.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-429.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWN = "s-u7tw6m8npxmv5tu";
const EXT = "s-mbmnsnxenmavu3z";
const APPROVAL = "s-qzthyh7yqvfhsa2";
const TABLE = "s-jau82aq9juv9zzh";
const n = d["10.7"];
const p = n.text.split("\n\n");
const rp = n.ruText.split("\n\n");
n.text = [
  `The specification has a \`strict\` flag. A rule of the SpecSheriff guidelines, of an extension of the guidelines (§${EXT}) or of a project's own guidelines (§${OWN}) may make a check (§${TABLE}) stricter while the flag is on.`,
  p[1],
  `The following procedures refuse to act while a check that the \`strict\` flag makes stricter would refuse a commit or a push that changed nothing, were the specification approved and the flag on:\n- the procedure that turns the \`strict\` flag on;\n- while the \`strict\` flag is on, the procedure that approves the specification (§${APPROVAL}).\n\nEach refusal names the command of the SpecSheriff tools that lists what that check finds.`,
].join("\n\n");
n.ruText = [
  `У спецификации есть флаг \`strict\`. Правило SpecSheriff guidelines, расширения guidelines (§${EXT}) или собственных guidelines проекта (§${OWN}) может сделать проверку (§${TABLE}) строже, пока флаг включён.`,
  rp[1],
  `Следующие процедуры отказываются действовать, пока проверка, которую флаг \`strict\` делает строже, отклонила бы коммит или push, ничего не меняющий, будь спецификация одобрена и флаг включён:\n- процедура, которая включает флаг \`strict\`;\n- пока флаг \`strict\` включён, процедура одобрения спецификации (§${APPROVAL}).\n\nКаждый отказ называет команду инструментов SpecSheriff, которая выводит то, что находит эта проверка.`,
].join("\n\n");
const swapEx = (arr, from, to) => {
  if (!arr[0].includes(from)) throw new Error(`example: not found: ${from}`);
  arr[0] = arr[0].replace(from, to);
};
swapEx(n.examples, "Under 9.5 (§", "Under the rule on code without a SpecTag (§");
swapEx(n.ruExamples, "По 9.5 (§", "По правилу о коде без SpecTag (§");
const r = n.reason.split("\n\n")[0].split(". ");
const rr = n.ruReason.split("\n\n")[0].split(". ");
n.reason = `${r[0]}. ${r[1]}. The \`strict\` flag lets the owners make the checks stricter by an act of their own, without stopping all work when they do.`;
n.ruReason = `${rr[0]}. ${rr[1]}. Флаг \`strict\` позволяет ответственным сделать проверки строже своим отдельным действием, не останавливая при этом всю работу.`;
n.changes.push("После второй рецензии: отказы оцениваются так, будто спецификация одобрена и флаг включён (иначе в черновике отказа не было бы никогда, вопреки вашему решению); строже можно сделать и проверку при push, потому что флаг общий, и отказы учитывают push; убрано предложение «такое правило говорит, что проверка делает иначе» — оно следует из предыдущего; «Две процедуры» → «Следующие процедуры»; предложение о команде стоит под списком; «проверка» ссылается на таблицу проверок; первый пример называет 9.5 по содержанию; обоснование заканчивается тем, почему флаг — действие ответственных и почему он не должен останавливать работу.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason);
console.log(n.ruReason);
