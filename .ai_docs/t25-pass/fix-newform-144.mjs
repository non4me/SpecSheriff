// The reviewer of 2026-11-10 on 1.3.5 and 1.3.6. 1.3.5 no longer repeats 1.3.3 and its sentence on an owner's change stands on its own; its list speaks of
// the approval, which a section never has. 1.3.6: "other than a section" cannot attach to "depth"; the Russian reason unfolds its participle.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const a = d["1.3.5"], s = d["1.3.6"];
if (a.sidValue !== "s-5ah25f6gy99panq" || s.sidValue !== "s-9kfdycuq34beqvs") throw new Error("unexpected drafts");

const swap = (node, field, from, to) => {
  if (node[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  node[field] = node[field].replace(from, to);
};
swap(a, "text", "An approval covers a node's present wording. That wording is its title, text and reason, and the values the node's kind adds beside them, such as `TextRule.list`. A change to that wording made by an owner also makes the node a draft.", "The wording an approval covers is a node's title, text and reason, and the fields the node's kind adds beside them, such as `TextRule.list`. A change to any of these makes the node a draft, even where one of the node's owners makes it.");
swap(a, "ruText", "Одобрение покрывает нынешнюю формулировку узла. Эта формулировка — его заголовок, текст и обоснование, а также значения, которые тип узла добавляет к ним, например `TextRule.list`. Изменение этой формулировки, сделанное ответственным, тоже делает узел черновиком.", "Формулировка, на которую распространяется одобрение, — это заголовок, текст и обоснование узла, а также поля, которые тип узла добавляет к ним, например `TextRule.list`. Изменение любой из этих частей делает узел черновиком, даже если его вносит один из ответственных за узел.");
swap(a, "text", "The approval status stays as it is through a change to:", "An approval stands through a change to:");
swap(a, "ruText", "Статус одобрения остаётся прежним при изменении:", "Одобрение остаётся в силе при изменении:");
swap(a, "ruText", "- того, кто его ответственные;", "- состава его ответственных;");
a.changes = [...a.changes, "Рецензент: первый абзац больше не повторяет 1.3.3, а предложение об изменении ответственным понятно само по себе. Список говорит об одобрении, которого у раздела не бывает."];

swap(s, "text", "from every node under it, at any depth, that is no section.", "from every node under it other than a section, at any depth.");
swap(s, "ruReason", "Построенный из узлов под разделом и заново после каждого изменения, статус никогда не отстаёт от этих узлов (§s-kh8qcd5kxgh9z3j).", "Статус строится из узлов под разделом и заново после каждого изменения, поэтому никогда не отстаёт от этих узлов (§s-kh8qcd5kxgh9z3j).");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(a.text);
console.log(s.text);
