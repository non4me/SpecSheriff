// Node 12.1.1: the owner accepted the proposal of fix-newform-247.mjs (2026-11-13, «ок»), so the node is agreed again in
// that wording. Nodes 6.1, 12.1.2 and 12.1.3: the term "main rule" is replaced by "rule of the SpecSheriff guidelines", as
// the owner decided on 2026-11-13. With node 12.1.1 saying that an extension's rules are not rules of the SpecSheriff
// guidelines, the meaning does not change, so the nodes stay agreed and the change is reported to the owner in one line.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["12.1.1"];
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
  "Вы приняли предложение (2026-11-13): правила расширения не входят в SpecSheriff guidelines; каждое расширение стоит отдельно от других. При переносе в meta.decisions: каждое расширение — в своём файле, решение агента по вашему поручению («сам реши»).",
);

const swap = (key, field, from, to) => {
  const n = d[key];
  if (!n[field].includes(from)) throw new Error(`${key}.${field}: missing ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("6.1", "text", "changes the linked main rule in a project", "changes the linked rule of the SpecSheriff guidelines in a project");
swap("6.1", "ruText", "изменяет связанное основное правило", "изменяет связанное правило SpecSheriff guidelines");
swap("12.1.2", "title", "may change a main rule", "may change a rule of the SpecSheriff guidelines");
swap("12.1.2", "text", "may change a main rule.", "may change a rule of the SpecSheriff guidelines.");
swap("12.1.2", "ruTitle", "может изменить основное правило", "может изменить правило SpecSheriff guidelines");
swap("12.1.2", "ruText", "может изменить основное правило.", "может изменить правило SpecSheriff guidelines.");
swap("12.1.3", "title", "A main rule names no particular extension", "A rule of the SpecSheriff guidelines names no particular extension");
swap("12.1.3", "text", "The text and the reason of a main rule name", "The text and the reason of a rule of the SpecSheriff guidelines name");
swap("12.1.3", "ruTitle", "Основное правило не называет", "Правило SpecSheriff guidelines не называет");
swap("12.1.3", "ruText", "Текст и обоснование основного правила", "Текст и обоснование правила SpecSheriff guidelines");
for (const key of ["6.1", "12.1.2", "12.1.3"]) {
  d[key].changes.push(
    "«Основное правило» заменено на «правило SpecSheriff guidelines» по вашему решению от 13 ноября. Смысл не изменился: по согласованному 12.1.1 правила расширения в SpecSheriff guidelines не входят.",
  );
}
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.1.1 agreed; 6.1, 12.1.2, 12.1.3:", d["12.1.3"].ruTitle);
