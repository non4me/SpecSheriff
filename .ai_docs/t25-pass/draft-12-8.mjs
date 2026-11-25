// Node 12.8, the existing 1.31 "Sids of a NodeKind's nodes as a field's values" (s-mt6auv3jz8m5gzh), for the owner's
// review of every rule:
// - "NodeKind" becomes "one of the project's own kinds of node" (8.3), the name the owner gave on 2026-11-10;
// - "standing in the base specification" becomes "in the base specification", since a node is in the specification and
//   does not "stand" there (the owner's correction of 2026-11-05);
// - the second paragraph of the reason relied on "An instance changes the technical appendix for itself (§4.1)", which
//   the agreed 4.1 no longer says; it now gives the reason from the agreed 1.1.5: the appendix describes how the rules
//   are implemented, so it changes with the implementation.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-12-8.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["12.8"]) throw new Error("12.8 already drafted");
const KIND = "s-vsh384ybt4w25a2"; // 8.3 A project's own kinds of node
const APPX = "s-tj38pvm38nepaf5"; // 1.1.5 The technical appendix describes how the rules are implemented
d["12.8"] = {
  from: "1.31",
  sid: "kept",
  title: "Sids of the nodes of a project's own kind as a field's values",
  ruTitle: "sid узлов собственного типа проекта как значения поля",
  text: `The values of a field of type \`one of\` may be the sids of the nodes of one of the project's own kinds of node (§${KIND}) that are in the base specification, read from the specification. A node of that kind added or archived adds or removes a value.`,
  ruText: `Значениями поля типа \`one of\` могут быть sid узлов одного из собственных типов узлов проекта (§${KIND}), которые находятся в базовой спецификации, прочитанные из спецификации. Узел этого типа, добавленный или отправленный в архив, добавляет или удаляет значение.`,
  reason: `The sids of those nodes are already held by the specification, so a field whose values they are declares none of them again and cannot fall behind it.\n\nThey are read from the base specification alone. The technical appendix describes how the rules are implemented (§${APPX}), so a value read from it would change whenever the implementation changed. The guidelines describe no system, so a value read from them would name nothing of the system.`,
  ruReason: `sid этих узлов уже есть в спецификации, поэтому поле, значения которого — эти sid, не объявляет ни одного из них заново и не может от спецификации отстать.\n\nИх читают только из базовой спецификации. Техническое приложение описывает, как реализуются правила (§${APPX}), поэтому значение из него менялось бы при каждом изменении реализации. Guidelines не описывают никакой системы, поэтому значение из них ничего в системе не называло бы.`,
  changes: [
    "Нынешний 1.31. «NodeKind» → «один из собственных типов узлов проекта (§8.3)» — имя, которое вы дали 10 ноября; заголовок — так же.",
    "«standing in the base specification» → «которые находятся в базовой спецификации»: узел находится в спецификации, а не «стоит» в ней (ваша поправка 5 ноября).",
    "Обоснование, второй абзац: было «Инстанс меняет техническое приложение под себя (§4.1), поэтому значение из приложения отличалось бы от инстанса к инстансу». Согласованный 4.1 этого больше не говорит. Стало: «Техническое приложение описывает, как реализуются правила (§1.1.5), поэтому значение из него менялось бы при каждом изменении реализации».",
  ],
};
const out = {};
for (const [k, v] of Object.entries(d)) { if (k !== "12.8") out[k] = v; if (k === "12.7") out["12.8"] = d["12.8"]; }
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const a = '["12.8","move",0,"1.31","Sids of a NodeKind\'s nodes as a field\'s values"';
if (!h.includes(a)) throw new Error("row 12.8");
h = h.split(a).join('["12.8","move",0,"1.31","Sids of the nodes of a project\'s own kind as a field\'s values"');
fs.writeFileSync(page, h);
console.log("ok");
