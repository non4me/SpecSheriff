// Node 10.4: the owner accepted the wording of fix-newform-252.mjs (2026-11-13, «ок»). Draft 10.5: the reviewer's fix for
// rule 7.11. A list of the cases in which a review cannot be carried out names what is refused, so a case left out, such
// as a run that ends with an error, would let a commit through. The text now states what lets a commit through: an answer
// that the tools can read. The cases become examples.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const a = d["10.4"];
a.agreed = "2026-11-13";
a.changes.push("Вы приняли эту формулировку (2026-11-13).");

const n = d["10.5"];
n.title = "A commit whose review cannot be carried out is refused";
n.ruTitle = "Коммит, рецензию которого нельзя провести, отклоняется";
n.text =
  "The SpecSheriff tools refuse a commit that changes code unless the reviewer gives an answer that the tools can read. " +
  "The refusal says why the review could not be carried out.";
n.ruText =
  "Инструменты SpecSheriff отклоняют коммит, меняющий код, если рецензент не дал ответа, который они могут прочитать. " +
  "В отказе сказано, почему рецензию не удалось провести.";
n.examples =
  "No reviewer is installed. The reviewer's run does not end within its time limit. The run ends with an error. The answer passes the commit but names a finding.";
n.ruExamples =
  "Рецензент не установлен. Запуск рецензента не укладывается в отведённое время. Запуск завершается ошибкой. Ответ пропускает коммит, но называет замечание.";
n.reason = "A review that passes whenever it could not be carried out is a review nobody can rely on.";
n.ruReason = "На рецензию, которая проходит всякий раз, когда её не удалось провести, не может положиться никто.";
n.changes.push(
  "По рецензенту (7.11): список случаев называл то, что отклоняется, и случай вне списка — например, запуск, который завершился ошибкой, — пропустил бы коммит. Теперь текст говорит, что пропускает коммит: ответ, который инструменты могут прочитать. Случаи стали примерами.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.4 agreed; 10.5 rewritten");
