// Check 10.1.4 of the table of checks, in the new form: its approved words stay as the text, with what it touches, its
// test, and two proposals beside them. The table's pause is lifted (the owner, 2026-11-12: «Снимаем паузу с таблицы и
// идём дальше, к 10.1.4»). The proposals follow the agreed 10.1.3: an archived node keeps the location it had when it was
// removed, and another node may later take that location, so the check speaks of the nodes of the specification.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.4");
r.about =
  "Затрагивает расположение каждого узла спецификации. Расположение говорит читателю, где находится узел; его вычисляет `sheriff reindex` по месту узла в дереве. Архивный узел хранит расположение, которое у него было при удалении, и позже это расположение может занять другой узел.";
r.tests = ["unit/validate.test.ts: refuses two nodes sharing a sid, and two sharing a location"];
r.proposals = [
  {
    en: "No two nodes of the specification share a location",
    ru: "Никакие два узла спецификации не имеют одного расположения",
    why:
      "Как в согласованной 10.1.3. Архивный узел хранит своё прежнее расположение, а его место в спецификации может занять другой узел. Без слов «узел спецификации» проверка охватывала бы и архив и отклоняла бы такую обычную перестановку.",
  },
  {
    en: "Reason: A location tells a reader where a node is, so a location that two nodes shared would point to both of them.",
    ru: "Обоснование: Расположение говорит читателю, где находится узел, поэтому расположение, общее для двух узлов, указывало бы сразу на оба.",
    why: "Необязательное обоснование, по образцу согласованной 10.1.3. Оно говорит, зачем нужна проверка, словами согласованного правила 8.5 о расположении узла.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.4 proposals:", r.proposals.length);
