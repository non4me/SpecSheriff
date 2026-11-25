// The owner of 2026-11-11: the head keeps only their sentence; the reason says that a table shows every check in one
// place, which is more convenient — its meaning, not their words.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const h = t.head;
h.reason =
  "In one table, every check can be seen at a glance with what its failure costs. " +
  "That is easier to read and to compare than checks spread across separate rules.";
h.ruReason =
  "В одной таблице все проверки видны сразу, вместе с ценой непрохождения каждой. " +
  "Так их проще читать и сравнивать, чем проверки, разнесённые по отдельным правилам.";
const i = h.changes.findIndex((c) => c.startsWith("Обоснование."));
if (i < 0) throw new Error("no reason change");
h.changes[i] = "Обоснование. Было пять абзацев о том, что ответ, разнесённый по правилам, распадается, и о причинах отдельных проверок; теперь — что в одной таблице все проверки видны сразу и их проще читать и сравнивать, по вашему смыслу. Абзацы о двоичных проверках и о тестах при push — в обосновании согласованного 1.6.1; почему некоторые проверки только сообщают, перейдёт в обоснования этих проверок.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(h.reason);
