// Node 2.3: the owner accepted the proposal of fix-newform-246.mjs (2026-11-13, «ок»), so the node is agreed again in that
// wording. Node 12.1.1, agreed on 2026-11-09: a single, complete new wording proposed to the owner. It carries out the
// owner's decisions of 2026-11-13: an extension's rules are not rules of the SpecSheriff guidelines, and each extension is
// kept apart from the others, so that a project's agent reads only the extensions the project chose.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["2.3"];
const p = a.proposals[0];
const pick = (s, re) => {
  const m = s.match(re);
  if (!m) throw new Error(`no match for ${re}`);
  return m[1].trim();
};
a.text = pick(p.en, /^Text: ([\s\S]*?)\n\nReason: /);
a.reason = pick(p.en, /\n\nReason: ([\s\S]*)$/);
a.ruText = pick(p.ru, /^Текст: ([\s\S]*?)\n\nОбоснование: /);
a.ruReason = pick(p.ru, /\n\nОбоснование: ([\s\S]*)$/);
delete a.proposals;
a.agreed = "2026-11-13";
a.changes.push(
  "Вы приняли предложение (2026-11-13): описание инструментов убрано из SpecSheriff guidelines; выбранные расширения — отдельный пункт; собственные правила проекта могут уточнять и правило выбранного расширения. Связь на 12.1.1 добавляется при переносе.",
);

const n = d["12.1.1"];
n.proposals = [
  {
    where: "текст и обоснование целиком",
    en:
      "Text: An extension of the guidelines is a named set of rules beyond the SpecSheriff guidelines, which every project shares. " +
      "Its rules are not rules of the SpecSheriff guidelines. " +
      "It is delivered with the SpecSheriff plugin, together with the SpecSheriff tools that carry out its rules.\n\n" +
      "A project uses an extension only by its own choice.\n\n" +
      "Reason: Not every system needs every rule. Rules a project does not use only add to what its agent has to read, " +
      "so they are kept apart from the rules every project shares, and each extension is kept apart from the others. " +
      "The rules of an extension are carried out by tools, so the two are delivered together.",
    ru:
      "Текст: Расширение guidelines — это именованный набор правил сверх SpecSheriff guidelines, общих для всех проектов. " +
      "Правила расширения не входят в SpecSheriff guidelines. " +
      "Расширение поставляется вместе с плагином SpecSheriff и с инструментами SpecSheriff, которые выполняют его правила.\n\n" +
      "Проект использует расширение только по своему выбору.\n\n" +
      "Обоснование: Не каждой системе нужны все правила. Правила, которыми проект не пользуется, только увеличивают объём того, что читает его агент, " +
      "поэтому они отделены от правил, общих для всех проектов, а каждое расширение — от других расширений. " +
      "Правила расширения выполняются инструментами, поэтому их поставляют вместе.",
    why:
      "По вашим решениям от 13 ноября. Правила расширения больше не входят в SpecSheriff guidelines; поэтому «правило SpecSheriff guidelines» вместо «основного правила» становится точным. " +
      "Обоснование говорит и о том, почему каждое расширение стоит отдельно от других. Где лежат файлы расширений, скажет описание инструментов.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("2.3 agreed | 12.1.1 proposal set");
