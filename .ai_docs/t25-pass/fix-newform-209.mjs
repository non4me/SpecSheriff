// 1.2.7 (the former 10.1, moved into 1.2 at the owner's word of 2026-11-11): a main rule names no particular
// extension (agreed 12.1.3), so its "unless it waits for them (§s-qyjw8xez6t6adc3)" and "unless it waits" go; the
// extension 12.5 changes this main rule by an `overrides` link from 12.5.1 (agreed 12.1.2). The reason is cut to
// why the rule exists, as a whole (7.14).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["1.2.7"];
if (b.sidValue !== "s-kh8qcd5kxgh9z3j" || b.agreed) throw new Error("unexpected 1.2.7");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", " is regenerated after every change to them, unless it waits for them (§s-qyjw8xez6t6adc3).", " is regenerated after every change to them.");
swap("text", "it is checked against what the nodes produce, unless it waits.", "it is checked against what the nodes produce.");
swap("ruText", "после каждого изменения узлов, если только оно не ждёт их (§s-qyjw8xez6t6adc3).", "после каждого изменения узлов.");
swap("ruText", "сверяется с тем, что дают узлы, если только она не ждёт.", "сверяется с тем, что дают узлы.");
b.reason = "A copy that is edited, fed back into the nodes or left behind them becomes a second version of the rules, and sooner or later the two differ. Regenerated at every change and checked against the nodes, a copy stays a view of the one source of truth (§s-xqs2e24mx5253ye).";
b.ruReason = "Копия, которую правят, переносят обратно в узлы или оставляют отставать от них, становится второй версией правил, и рано или поздно две версии расходятся. Генерируемая заново при каждом изменении и сверяемая с узлами, копия остаётся представлением единственного источника правды (§s-xqs2e24mx5253ye).";
b.changes.push(
  "По вашему решению от 11 ноября узел перенесён из раздела 10 в 1.2, сразу за 1.2.6 об источнике правды; раздел 10 разобран.",
  "Ушли «unless it waits for them (§s-qyjw8xez6t6adc3)» и «unless it waits»: основное правило не называет расширений (согласованный 12.1.3). Ожидание сгенерированного кода — правило расширения 12.5, которое меняет это правило связью `overrides` (12.1.2).",
  "Обоснование сокращено до того, зачем правило существует: копия, которую правят или оставляют отставать, становится второй версией правил; генерируемая заново и сверяемая, она остаётся представлением единственного источника правды (согласованный 1.2.6).",
);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
