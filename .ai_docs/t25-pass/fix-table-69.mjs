// Check 10.1.19: the owner accepted both proposals (2026-11-13: «предложения принимаю оба»). The text takes the words of
// agreed 9.7 for a rule of a project's own kind, and the second sentence, in the words of agreed 10.1.13, states 9.7's
// requirement that the exempting node's text cite the link's target. The check's agreement is asked separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.19");
r.en =
  "An `exempts` link goes from a node of the project's own guidelines to a rule, including a rule of a project's own kind, or to a section. " +
  "The text of a node that declares an `exempts` link cites the node that link names";
r.ru =
  "Связь `exempts` идёт от узла собственных guidelines проекта к правилу, в том числе к правилу собственного типа в проекте, или к разделу. " +
  "Текст узла, который объявляет связь `exempts`, ссылается на узел, который эта связь называет";
r.change =
  "Вы приняли оба предложения (2026-11-13): «к правилу, в том числе к правилу собственного типа в проекте, или к разделу» вместо «к правилу, узлу собственного NodeKind проекта или разделу»; " +
  "второе предложение о ссылке в тексте — требование согласованного 9.7, сформулированное так же, как в согласованной 10.1.13.";
r.about =
  "Затрагивает каждую связь `exempts`, то есть каждое освобождение правила от реализации (правило 9.7). Такую связь может объявить только узел собственных guidelines проекта, и вести она может только к правилу или к разделу. " +
  "Текст освобождающего узла ссылается на цель связи: одобряя узел, ответственный видит в его тексте, что именно освобождается. " +
  "Инструменты сейчас проверяют только концы связи; проверку ссылки добавим на шаге инструментов.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.en);
