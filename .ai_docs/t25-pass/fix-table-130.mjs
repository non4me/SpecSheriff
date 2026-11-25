// Check 10.1.44 is agreed unchanged (the owner, 2026-11-13, «ок»). A new check right after 10.1.20 is proposed: no check of
// the table enforced the ban in agreed node 12.1.3 on a main rule declaring a link to a node of an extension. Since a node
// that cites another must also link to it, the new check refuses a citation of an extension's node as well. Whether a
// rule's prose names an extension cannot be checked deterministically. Its number is temporary.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.44");
a.change = "Вы согласились с проверкой без изменений (2026-11-13).";
a.agreed = "2026-11-13";

const group = t.tables.find((g) => g.rows.some((x) => x.num === "10.1.20"));
if (group.rows.some((x) => x.num === "10.1.20a")) throw new Error("10.1.20a exists");
const at = group.rows.findIndex((x) => x.num === "10.1.20");
const n = Math.max(...rows.map((x) => x.n)) + 1;
group.rows.splice(at + 1, 0, {
  n,
  num: "10.1.20a",
  fate: "stays",
  rests: ["s-chk5hnzmcpeqj25"],
  impl: [],
  change: "Новая проверка: ни одна проверка таблицы не следила за запретом согласованного 12.1.3. Номер временный.",
  about:
    "Затрагивает каждую связь, которую объявляет основное правило — правило SpecSheriff guidelines вне расширений. " +
    "Расширение может исчезнуть или быть черновиком, и правило, которое от него зависит, оказалось бы неверным (обоснование 12.1.3). " +
    "Узел, который цитирует другой узел, обязан иметь и связь с ним, поэтому проверка отклоняет и цитату узла расширения. " +
    "Называет ли текст правила расширение словами, детерминированно не проверить. " +
    "Сейчас этот запрет нарушает согласованный 9.1: он цитирует 12.5.2 (s-km4x4s26kv7pjze); это исправим, когда дойдём до 9.1.",
  tests: [],
  todos: ["На шаге инструментов: узел описания инструментов реализует эту проверку; её тест пишется первым и сначала падает."],
  proposals: [
    {
      en: "A main rule declares no link to a node of an extension of the guidelines (§s-chk5hnzmcpeqj25) | refused",
      ru: "Основное правило не объявляет связей с узлами расширения guidelines (§s-chk5hnzmcpeqj25) | отклоняется",
      why:
        "Это второе предложение согласованного 12.1.3, слово в слово. Ни одна проверка таблицы за ним не следила. " +
        "Цитата требует связи, поэтому проверка ловит и цитату узла расширения.",
    },
  ],
});
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.44 agreed; 10.1.20a proposed, n =", n);
