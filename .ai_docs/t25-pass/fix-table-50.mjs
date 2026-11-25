// Check 10.1.11 of the table of checks, in the new form: its approved words as the text, with their Russian, what it
// touches, its test, the Russian of tools 7.1.6, and one proposal: the draft's wording, whose changes interlock (the
// sentence is split in two), so they are shown as one proposal with each change named.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.11");
const draftEn = r.en;
const draftRu = r.ru;
r.en = r.was.split(" | ")[0];
r.ru =
  "Узел, который коммит удаляет, вне SpecSheriff guidelines, которые берёт проект, удаляется, если это раздел, заголовок домена или узел, одобрения которому никогда не давали; иначе он стоит в архиве с причиной своего удаления";
r.about =
  "Затрагивает каждый узел, который исчез из спецификации в коммите. Узел, которому когда-либо давали одобрение, должен оказаться в архиве вместе с причиной удаления (правило 2.5). " +
  "Раздел и узел, которому одобрения не давали, удаляются окончательно: в архиве им не место. У архивного узла нет sid, поэтому удалённый узел находят в архиве по его последней формулировке; " +
  "давали ли ему одобрение, видно по его sid в предыдущем коммите, а после T28 — по одобрению в самом узле.";
r.tests = ["unit/validate.test.ts: deletes a section outright, an approval given for it under an earlier release aside, and refuses one standing in the archive"];
t.toolsRu["s-j4webte36gkraju"] = {
  title: "Удалённый узел и архив",
  text:
    "`sheriff validate` ищет в одобрениях каждый sid, который коммит убирает из спецификации.\n\n" +
    "- Узел, которому когда-либо давали одобрение, ищется в архиве вместе с причиной удаления, если это не раздел и не заголовок домена.\n" +
    "- Любой другой узел отклоняется, если он стоит в архиве.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: draftEn,
    ru: draftRu,
    why:
      "Четыре правки вместе: (1) коммит не действующее лицо — «удалённый в коммите»; (2) заголовок домена ушёл в расширение «Домены» (12.1.3); " +
      "(3) одна мысль в предложении (7.5) — второе условие стало отдельным предложением; (4) слова согласованного 2.5 и 10.1.8: «использует», «удаляется окончательно», «находится в архиве».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.11 proposals:", r.proposals.length);
