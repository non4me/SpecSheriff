// Check 10.1.20 after the reviewer (2026-11-13): it passes. The note names the SpecSheriff guidelines; the row gets a todo
// for the tools step; and the reviewer's doubt on the citation becomes a proposal for the owner, since 9.7's reason for
// `exempts` holds for `overrides` too: an approval covers a node's wording and not its links.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.20");
r.about = r.about.replace("к основному правилу — правилу guidelines вне расширений", "к основному правилу — правилу SpecSheriff guidelines вне расширений");
r.change = "Новая строка, по согласованным 6.1 и 12.1.2. Рецензент её пропустил.";
r.todos = [
  {
    date: "2026-11-13",
    by: "the reviewer",
    text:
      "At the tools step, a node of the appendix of the tools implements this check and says where the nodes of an extension are kept. Its test is written first and seen failing.",
  },
];
r.proposals = [
  {
    en: "A second sentence is added: \"The text of a node that declares an `overrides` link cites the node the link names.\" The same requirement is added to 12.1.2 when part 12 is reviewed.",
    ru: "Добавляется второе предложение: «Текст узла, который объявляет связь `overrides`, ссылается на узел, который эта связь называет». То же требование добавится в 12.1.2, когда дойдём до части 12.",
    why:
      "Одобрение охватывает формулировку узла, но не его связи — как и для `exempts` в 9.7. Без этого связь `overrides` можно добавить к одобренному узлу расширения или перенаправить на другое основное правило без нового одобрения. " +
      "Тогда тот, кто читает основное правило, увидит среди его входящих связей, что расширение его меняет, хотя одобренный текст расширения этого не говорит. Формулировка — как во второй фразе согласованной 10.1.19.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| proposals", r.proposals.length);
