// Follow-up proposals that carry out the owner's ruling of 2026-11-17 returning a project's own code generators to the
// SpecSheriff guidelines (10.9), as specsheriff-rule-reviewer found when reviewing 10.9:
// - 10.12: a project's own generators run in step 1 together with the generators of the SpecSheriff tools, after the
//   project's other tools that rewrite files, so that no formatter changes generated code;
// - 10.2, 1.6.1 and row 66 of table 10.1 (10.1.44): the tests of a project's own generators run as those of its own
//   checks do; "and generators" had been removed when the generators moved to the extension.
// It also marks 10.9 as agreed (the owner, 2026-11-18, «ок»).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-generators-followups.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
d["10.9"].agreed = "2026-11-18";
d["10.9"].changes.push("Вы согласовали 18 ноября («ок»).");

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.replace(from, to);
};
const propose = (key, edits, why) => {
  const n = d[key];
  if (n.proposals?.length) throw new Error(`${key} already holds a proposal`);
  const f = { title: n.title, text: n.text, reason: n.reason, examples: n.examples ?? [], ruTitle: n.ruTitle, ruText: n.ruText, ruReason: n.ruReason, ruExamples: n.ruExamples ?? [] };
  for (const [field, from, to] of edits) f[field] = swap(f[field], from, to);
  n.proposals = [{
    where: "Текст" + (edits.some(([fl]) => fl.endsWith("eason")) ? " и обоснование" : ""),
    en: [`Title: ${f.title}`, `Text: ${f.text}`, ...f.examples.map((e) => `Example: ${e}`), `Reason: ${f.reason}`].join("\n\n"),
    ru: [`Заголовок: ${f.ruTitle}`, `Текст: ${f.ruText}`, ...f.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${f.ruReason}`].join("\n\n"),
    why,
  }];
};

propose("10.12", [
  ["text", "and then the generators of the SpecSheriff tools;", "and then the generators, both those of the SpecSheriff tools and the project's own (§s-km4x4s26kv7pjze);"],
  ["ruText", "а затем генераторы инструментов SpecSheriff;", "а затем генераторы — и инструментов SpecSheriff, и собственные генераторы проекта (§s-km4x4s26kv7pjze);"],
  ["reason", "The generators of the SpecSheriff tools run after the project's own tools that rewrite files, so that no formatter changes what they generate.", "The generators, both those of the SpecSheriff tools and the project's own, run after the project's other tools that rewrite files, so that no formatter changes what they generate."],
  ["ruReason", "Генераторы инструментов SpecSheriff запускаются после собственных инструментов проекта, которые переписывают файлы, чтобы ни один форматтер не менял того, что они генерируют.", "Генераторы, и инструментов SpecSheriff, и собственные генераторы проекта, запускаются после остальных собственных инструментов проекта, которые переписывают файлы, чтобы ни один форматтер не менял того, что они генерируют."],
], "Собственные генераторы проекта (10.9) тоже переписывают файлы. Если форматтер запустится после генератора, сгенерированный код перестанет совпадать с тем, что дают узлы, и проверка отклонит коммит. Поэтому генераторы проекта идут вместе с генераторами инструментов SpecSheriff, после форматтеров.");

propose("10.2", [
  ["text", "the tests of the system's code and of a project's own checks, while", "the tests of the system's code and of a project's own checks and generators, while"],
  ["ruText", "тесты кода системы и собственных проверок проекта, пока", "тесты кода системы и собственных проверок и генераторов проекта, пока"],
], "«и генераторов» было убрано, когда генераторы проекта ушли в расширение. Теперь они снова в guidelines (10.9), и их тесты запускаются так же, как тесты собственных проверок проекта.");

propose("1.6.1", [
  ["text", "the tests of the system's code and of a project's own checks must pass", "the tests of the system's code and of a project's own checks and generators must pass"],
  ["ruText", "тесты кода системы и собственных проверок проекта должны пройти", "тесты кода системы и собственных проверок и генераторов проекта должны пройти"],
], "То же, что в 10.2: тесты собственных генераторов проекта (10.9) должны пройти до того, как изменение попадёт в общую ветку, как и тесты его собственных проверок.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const tableFile = new URL("table-10-1.json", here);
fs.copyFileSync(tableFile, new URL("table-10-1.before-generators-followups.json", here));
const t = JSON.parse(fs.readFileSync(tableFile, "utf8"));
let done = 0;
for (const g of t.tables) for (const r of g.rows ?? []) if (r.n === 66) {
  if (r.proposal || r.proposals) throw new Error("row 66 already holds a proposal");
  r.proposal = {
    en: "The tests of the system's code and of a project's own checks and generators pass",
    ru: "Тесты кода системы и собственных проверок и генераторов проекта проходят",
    why: "То же, что в 10.2 и 1.6.1: «и генераторов» возвращается, потому что генераторы проекта снова в guidelines (10.9). Цена не меняется.",
  };
  done++;
}
if (done !== 1) throw new Error("row 66 not found");
fs.writeFileSync(tableFile, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
