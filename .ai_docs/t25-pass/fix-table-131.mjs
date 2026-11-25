// Checks 10.1.20 and 10.1.20a: the term "main rule" is replaced by "rule of the SpecSheriff guidelines", as the owner decided
// on 2026-11-13. Agreed node 12.1.1 now says that an extension's rules are not rules of the SpecSheriff guidelines, so the
// meaning does not change: check 10.1.20 stays agreed, and check 10.1.20a waits for the owner with the new wording.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const swap = (obj, field, from, to) => {
  if (!obj[field].includes(from)) throw new Error(`${field}: missing ${from}`);
  obj[field] = obj[field].replace(from, to);
};
const a = rows.find((x) => x.num === "10.1.20");
swap(a, "en", "to a main rule.", "to a rule of the SpecSheriff guidelines.");
swap(a, "ru", "к основному правилу.", "к правилу SpecSheriff guidelines.");
swap(a, "about", "каждое изменение основного правила расширением guidelines", "каждое изменение правила SpecSheriff guidelines расширением guidelines");
swap(a, "about", "только к основному правилу — правилу SpecSheriff guidelines вне расширений", "только к правилу SpecSheriff guidelines");
swap(a, "about", "тот, кто читает основное правило,", "тот, кто читает правило SpecSheriff guidelines,");
a.change += " «Основное правило» заменено на «правило SpecSheriff guidelines» по вашему решению от 13 ноября; смысл не изменился (согласованный 12.1.1).";

const b = rows.find((x) => x.num === "10.1.20a");
const pr = b.proposals[0];
swap(pr, "en", "A main rule declares no link", "A rule of the SpecSheriff guidelines declares no link");
swap(pr, "ru", "Основное правило не объявляет", "Правило SpecSheriff guidelines не объявляет");
swap(b, "about", "которую объявляет основное правило — правило SpecSheriff guidelines вне расширений.", "которую объявляет правило SpecSheriff guidelines.");
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.20:", a.ru, "\n10.1.20a:", pr.ru);
