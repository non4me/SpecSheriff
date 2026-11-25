// Node 12.1.2: the owner accepted the proposal of fix-newform-265.mjs (2026-11-14, «ок»), so the node is agreed in the
// wording that includes it. Node 9.1, agreed on 2026-11-10: a proposal carrying out node 12.1.3, agreed on 2026-11-09,
// which forbids a rule of the SpecSheriff guidelines to cite a node of an extension. Node 9.1 cites s-km4x4s26kv7pjze,
// the present node 5.6 on a project's own generators, which moves to 12.5.2 in the extension for generation.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["12.1.2"];
const p = a.proposals[0];
a.text = p.en.replace(/^Text: /, "");
a.ruText = p.ru.replace(/^Текст: /, "");
delete a.proposals;
a.agreed = "2026-11-14";
a.changes.push("Вы приняли предложение (2026-11-14): текст узла со связью `overrides` ссылается на правило, которое он изменяет.");

const n = d["9.1"];
const en = "A project's own checks and generators are among those tools (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze).";
const ru = "Собственные проверки и генераторы проекта входят в число этих инструментов (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze).";
if (!n.text.includes(en) || !n.ruText.includes(ru)) throw new Error("9.1 anchor not found");
n.proposals = [
  {
    where: "второй абзац, второе предложение",
    en: "Text: " + n.text.replace(en, "A project's own checks (§s-2fau85dfyyeq66m) and generators are among those tools."),
    ru: "Текст: " + n.ruText.replace(ru, "Собственные проверки проекта (§s-2fau85dfyyeq66m) и его генераторы входят в число этих инструментов."),
    why:
      "Убрана ссылка на узел о собственных генераторах проекта (§s-km4x4s26kv7pjze): он переходит в расширение «Генерация кода» как 12.5.2, а согласованный узел 12.1.3 запрещает правилу SpecSheriff guidelines ссылаться на узлы расширения. Оставшаяся ссылка поставлена сразу после слова «проверки», потому что ведёт только на узел о проверках. Слова о генераторах остаются: это не название расширения.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.1.2 agreed; 9.1 proposal set");
