// The owner of 2026-11-11: 10.1 is one TableRule, its rows in two groups; a cell holds text or a node; the head may
// require what holds of every row, so "Each check reads…" stays in it. Writes the head as it would stand in the node.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
t.head = {
  sid: "s-jau82aq9juv9zzh",
  kind: "TableRule",
  title: "The table of checks, with what each failure costs",
  ruTitle: "Таблица проверок и цена непрохождения каждой из них",
  text:
    "Every check the SpecSheriff tools make, with what its failure costs, stands in a row of this table. " +
    "Where a row speaks of a rule, a rule of a project's own kind is included.\n\n" +
    "Each check of this table reads one of these as the commit being made:\n" +
    "- at a commit, what is staged;\n" +
    "- after an agent's edit, the working tree.\n\n" +
    "A check also reads the history behind the commit where its row says so. " +
    "It reads nothing else (§s-m4h279nbaqkpa3t).",
  ruText:
    "Каждая проверка, которую делают инструменты SpecSheriff, стоит в строке этой таблицы вместе с ценой её непрохождения. " +
    "Где строка говорит о правиле, правило собственного типа в проекте тоже входит.\n\n" +
    "Каждая проверка этой таблицы читает как создаваемый коммит одно из следующего:\n" +
    "- при коммите — то, что подготовлено к нему (staged);\n" +
    "- после правки агента — рабочее дерево.\n\n" +
    "Историю за коммитом проверка читает там, где так сказано в её строке. " +
    "Больше она ничего не читает (§s-m4h279nbaqkpa3t).",
  reason:
    "Whoever asks whether a commit will go through must find the whole answer in one place. " +
    "Spread across several rules, the answer comes apart. " +
    "One rule then ends up contradicting another without anybody seeing it.",
  ruReason:
    "Тот, кто спрашивает, пройдёт ли коммит, должен найти весь ответ в одном месте. " +
    "Разнесённый по нескольким правилам, ответ распадается. " +
    "Тогда одно правило начинает противоречить другому, а никто этого не видит.",
  columns: [
    { en: "What is checked", ru: "Что проверяется", holds: "a node: the check, its own sid, links and approval" },
    { en: "On failure", ru: "При непрохождении", holds: "text, part of the wording of the check in its row" },
  ],
  groups: [
    { en: "The specification on its own", ru: "Спецификация сама по себе" },
    { en: "The specification and the code", ru: "Спецификация и код" },
  ],
};
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("head written");
