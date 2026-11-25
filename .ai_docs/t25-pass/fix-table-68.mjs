// Check 10.1.19 of the table of checks, in the new form: its approved words as the text, with their Russian, what it
// touches, its tests, the Russian of tools 7.1.12, and two proposals that carry out agreed 9.7 (s-gf6n8ge4mke3pr2):
// NodeKind renamed by the owner's decision of 2026-11-10, and the sentence of 9.7 that the exempting node's text cites
// the link's target, which no check states yet. The second proposal takes the words of agreed 10.1.13.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.19");
r.en = r.was.split(" | ")[0];
r.ru = "Связь `exempts` идёт от узла собственных guidelines проекта к правилу, узлу собственного NodeKind проекта или разделу";
r.change = "Одобренная формулировка не менялась. Изменения — в предложениях.";
r.about =
  "Затрагивает каждую связь `exempts`, то есть каждое освобождение правила от реализации (правило 9.7). Такую связь может объявить только узел собственных guidelines проекта, и вести она может только к правилу или к разделу. " +
  "Согласованное 9.7 требует ещё, чтобы текст освобождающего узла ссылался на цель связи: одобряя узел, ответственный видит в его тексте, что именно освобождается. Этого требования в проверке пока нет, его добавляет предложение о ссылке в тексте. " +
  "Инструменты сейчас проверяют только концы связи; проверку ссылки добавим на шаге инструментов.";
r.tests = [
  "unit/validate.test.ts: passes an exempts link from a node of the project's own guidelines to a rule or a section, and refuses one standing elsewhere or reaching anything else",
  "unit/validate.test.ts: counts a node of a project's own kind as a rule of its section, and lets an exempts link reach it",
];
t.toolsRu["s-qvgzubkrafadqgf"] = {
  title: "Связи `consumes` и `exempts`",
  text:
    "`sheriff validate` проверяет, какие узлы стоят на концах каждой связи `consumes` и каждой связи `exempts`:\n\n" +
    "- у связи `consumes` в начале должен быть заголовок домена, а в конце — раздел другого домена;\n" +
    "- у связи `exempts` в начале должен быть узел `project.json`, а в конце — правило, узел собственного NodeKind проекта или раздел.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "\"to a rule, a node of a project's own NodeKind or a section\" becomes \"to a rule, including a rule of a project's own kind, or to a section\"",
    ru: "«к правилу, узлу собственного NodeKind проекта или разделу» становится «к правилу, в том числе к правилу собственного типа в проекте, или к разделу»",
    why:
      "NodeKind переименован вашим решением 2026-11-10. Новые слова — из согласованного 9.7: освобождается правило, в том числе правило собственного типа в проекте.",
  },
  {
    en: "A second sentence is added: \"The text of a node that declares an `exempts` link cites the node that link names.\"",
    ru: "Добавляется второе предложение: «Текст узла, который объявляет связь `exempts`, ссылается на узел, который эта связь называет.»",
    why:
      "Это требование согласованного 9.7: связь `exempts` допустима, только если текст освобождающего узла ссылается на её цель. Ни одна проверка таблицы его пока не называет: 10.1.13 требует связь там, где есть ссылка, а здесь нужна ссылка там, где есть связь. Слова — как в согласованной 10.1.13.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.19 proposals:", r.proposals.length);
