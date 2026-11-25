// Node 1.2.2 is agreed with its proposal (the owner, 2026-11-12: «1.2.2 - согласован»): the first sentence speaks of a
// node of the specification. Node 6.1 "What a link is" gets one proposal: the link type `supersedes` is removed from its
// list, since the owner ruled on 2026-11-12 that the type goes, and node 2.5 now records the replacement in the archive.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["1.2.2"];
const [p] = a.proposals;
const oldEn = "A node carries a sid, given to it once and never changed.";
const oldRu = "У узла есть sid, данный ему один раз и никогда не меняющийся.";
if (!a.text.startsWith(oldEn) || !a.ruText.startsWith(oldRu)) throw new Error("1.2.2: the first sentence has changed");
a.text = p.en + a.text.slice(oldEn.length);
a.ruText = p.ru + a.ruText.slice(oldRu.length);
delete a.proposals;
a.agreed = "2026-11-12";
a.changes.push("Вы приняли предложение и согласовали узел (2026-11-12): sid есть у узла спецификации, у архивного узла его нет.");

const b = d["6.1"];
const en = "- `supersedes` — the linking node replaces the linked node, which is archived.";
const ru = "- `supersedes` — связывающий узел заменяет связанный, который уходит в архив.";
if (!b.text.includes(en) || !b.ruText.includes(ru)) throw new Error("6.1: the supersedes line has changed");
b.proposals = [
  {
    where: "текст, список типов связей: строка `supersedes` убирается",
    en: "(the line removed) " + en.slice(2),
    ru: "(строка убирается) " + ru.slice(2),
    why:
      "Ваше решение по архиву (2026-11-12): тип связи supersedes уходит. Архивный узел не имеет sid, и на него нельзя сослаться связью. Замену теперь называет запись архивного узла (узел 2.5).",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(a.text.split("\n")[0]);
