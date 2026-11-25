// Node 1.2.2 "A node is cited by its sid", agreed: one proposal beside its wording. Node 2.5, as agreed on
// 2026-11-12, says that an archived node has no sid of its own. The first sentence of 1.2.2 speaks of any node,
// so it would cover an archived node too; the proposal narrows it to a node of the specification.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.2.2"];
if (!n.text.startsWith("A node carries a sid, given to it once and never changed.")) throw new Error("1.2.2: the text has changed");
n.proposals = [
  {
    where: "текст, первое предложение вместо нынешнего",
    en: "A node of the specification carries a sid, given to it once and never changed.",
    ru: "У узла спецификации есть sid, данный ему один раз и никогда не меняющийся.",
    why:
      "Ваше решение по архиву (узел 2.5, согласован 2026-11-12): у архивного узла собственного sid нет. Сейчас первое предложение говорит о любом узле, а значит и об архивном.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.proposals[0].en);
