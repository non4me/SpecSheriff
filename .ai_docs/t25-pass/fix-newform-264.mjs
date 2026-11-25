// Node 1.3.4: the owner accepted the proposal of fix-newform-263.mjs (2026-11-14, «ок»). An EngStickler reader found that
// "in one act" is not natural English, so the English says "at once"; the Russian «одним действием» and the meaning stay.
// Node 6.1, agreed on 2026-11-09: a proposal adding the link type `checks`, as the owner decided on 2026-11-11: a check in
// a cell of the table of checks has a link, written by hand, to each rule it checks.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const pick = (s, re) => {
  const m = s.match(re);
  if (!m) throw new Error(`no match for ${re}`);
  return m[1].trim();
};

const a = d["1.3.4"];
const p = a.proposals[0];
a.text = pick(p.en, /^Text: ([\s\S]*?)\n\nReason: /).replace(
  "An owner of a `TableRule` may approve it as a whole in one act. That act approves every node in its cells that is a draft,",
  "An owner of a `TableRule` may approve the whole table at once. Doing so approves every node in its cells that is a draft,",
);
a.reason = pick(p.en, /\n\nReason: ([\s\S]*)$/);
a.ruText = pick(p.ru, /^Текст: ([\s\S]*?)\n\nОбоснование: /);
a.ruReason = pick(p.ru, /\n\nОбоснование: ([\s\S]*)$/);
if (!a.text.includes("at once")) throw new Error("1.3.4 English fix not applied");
delete a.proposals;
a.agreed = "2026-11-14";
a.changes.push(
  "Вы приняли предложение (2026-11-14): ответственный за `TableRule` может одобрить его целиком одним действием. По замечанию читателя EngStickler в английском «in one act» стало «at once»; русский текст и смысл не менялись.",
);

const n = d["6.1"];
const enAfter = "- `cites` — the linking node cites the linked one";
const ruAfter = "- `cites` — связывающий узел ссылается на связанный";
if (!n.text.includes(enAfter) || !n.ruText.includes(ruAfter)) throw new Error("6.1 anchor not found");
const enItem = "- `checks` — the linking node is a check, and it verifies that the linked rule is followed. Such a link is written by hand.\n";
const ruItem = "- `checks` — связывающий узел — это проверка, и она следит за тем, чтобы связанное правило выполнялось. Такую связь записывают вручную.\n";
n.proposals = [
  {
    where: "новый пункт в списке типов связей, перед `cites`",
    en: "Text: " + n.text.replace(enAfter, enItem + enAfter),
    ru: "Текст: " + n.ruText.replace(ruAfter, ruItem + ruAfter),
    why:
      "По вашему решению от 11 ноября: проверка в ячейке таблицы проверок связана с каждым правилом, за выполнением которого она следит, связью нового типа `checks`, записанной вручную. Входящая связь у правила строится автоматически, как у других типов.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("1.3.4 agreed; 6.1 proposal set");
