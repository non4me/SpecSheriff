// The fresh reviewer of the new 9.3 "The SpecTag" (2026-11-11): tests are not said to implement, since
// agreed 9.1 keeps "implementing" for code and "verifying" for tests; the reason says what the binding
// solves, its "so" following from nothing and its "one check" naming no check.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const t = d["9.3"];
if (t.sidValue !== "s-8xw4mgvpexyvw5q" || t.agreed) throw new Error("unexpected 9.3");

t.text = "A SpecTag binds a rule to the code that implements it and to the tests written for it.";
t.ruText = "SpecTag связывает правило с кодом, который его реализует, и с тестами, написанными для него.";
t.reason = "Whether a rule is implemented is decided by its code and a passing test together (§s-6fw72j65jkqrfpf). A reference to the rule, written the same way in both, lets that be read off the code and the tests themselves.";
t.ruReason = "Реализовано ли правило, решают его код и проходящий тест вместе (§s-6fw72j65jkqrfpf). Ссылка на правило, записанная в обоих одинаково, позволяет прочесть это прямо по коду и тестам.";
t.changes = t.changes.map((c) => c.startsWith("Текст. Было:")
  ? c.replace(/Стало одной фразой: «.*»$/, "Стало одной фразой: «A SpecTag binds a rule to the code that implements it and to the tests written for it.» Код реализует правило, тесты написаны для него: так глаголы разведены в согласованном 9.1.")
  : c);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify(t, null, 2));
