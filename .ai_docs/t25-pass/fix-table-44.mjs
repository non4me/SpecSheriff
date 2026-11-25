// Check 10.1.9 of the table of checks, in the new form: its approved words as the text, with their Russian, what it
// touches, its test, and one proposal: the draft's wording, in which a commit is no longer what records the approval
// (the owner's ruling: a rule never presents a commit as what adds or changes anything), and only the approvals a commit
// adds are checked.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.9");
r.en = r.was.split(" | ")[0];
r.ru = "Каждое одобрение, которое записывает коммит, называет одного из ответственных за его узел — такими, какими их хранит коммит";
r.about =
  "Затрагивает каждое одобрение, которое появляется в коммите: тот, кого оно называет, должен быть среди ответственных за узел, по составу ответственных в этом же коммите. " +
  "Одобрение правила, которое одобряет всю спецификацию, судят по ответственным за спецификацию. Одобрения, записанные раньше, проверка не пересматривает, даже если ответственные с тех пор сменились.";
r.tests = [
  "unit/validate.test.ts: refuses an approval the commit records by someone none of the node's owners, as the commit holds them, and judges the rule approving the specification by the specification's owners",
];
r.proposals = [
  {
    en: "Each approval added in a commit names one of the owners of its node as of that commit",
    ru: "Каждое одобрение, добавленное в коммите, называет одного из ответственных за его узел на момент этого коммита",
    why:
      "Ваше правило: коммит не действующее лицо, он ничего не записывает и не меняет. «Добавленное» вместо «записанное»: проверяются только одобрения, которые появились в этом коммите, а не все одобрения в истории. " +
      "Формулировка верна и после T28, когда одобрение будет храниться в самом узле.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.9 proposals:", r.proposals.length);
