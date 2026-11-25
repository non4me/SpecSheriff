// 12.7 "One source for the values of a field of type `one of`" (the current 1.27), after the owner's choice of 2026-11-18
// («1») to generalize "the names of the domains" to the names of the parts of the base specification. Its list of sources:
// - "the values the domains add" goes: under the owner's ruling of 2026-11-16 the contracts section holds only fragments
//   of a format, so no RecordType there collects values from several domains (1.28 and 1.29, the drafts 12.14 and 12.15,
//   go with it);
// - "the names of the domains" becomes "the names of the parts of the base specification" (the owner's choice);
// - "the sids of a NodeKind's nodes" becomes "the sids of the nodes of one kind", the name the owner gave on 2026-11-10.
// The text and the reason are unchanged.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-485.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
let present;
(function walk(ns) { for (const x of ns) { if (x.sid === "s-xfu2gpzddjnmgks") present = x; if (x.children) walk(x.children); } })(spec.nodes);
const n = d["12.7"];
Object.assign(n, {
  title: present.title,
  text: present.text,
  reason: present.reason,
  list: {
    of: present.list.of,
    members: ["its own list", "the names of the parts of the base specification", "the sids of the nodes of one kind"],
  },
  ruList: {
    of: n.ruList.of,
    members: ["его собственный список", "имена частей базовой спецификации", "sid узлов одного типа"],
  },
});
n.changes.push(
  "Источник «значения, которые добавляют домены» убран: по вашему решению от 16 ноября в контрактах лежат только фрагменты формата, и RecordType, который собирает значения от разных доменов, больше не бывает. Вместе с ним уходят 12.14 и 12.15 (нынешние 1.28 и 1.29).",
  "«Имена доменов» → «имена частей базовой спецификации» — ваш выбор 18 ноября; 12.13 (нынешний 1.30) будет сказан так же.",
  "«sid узлов одного NodeKind» → «sid узлов одного типа» — имя, которое вы дали 10 ноября вместо NodeKind.",
);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
