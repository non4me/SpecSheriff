// Node 3.4 "RecordType": the fourth paragraph of the text is the owner's wording of 2026-11-09, word for word in
// Russian; the English follows it.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "A RecordType may name another domain's RecordType only if its own domain's header names, in its `consumes` links, the section where that RecordType is declared. Any other such reference is reported, not refused. A RecordType names another in a field's type or by refining it.", "A domain may accept a RecordType of another domain only if its header names, in its `consumes` links, the section where that RecordType is declared.");
n.ruText = swap(n.ruText, "RecordType может называть RecordType другого домена, только если заголовок его собственного домена называет в своих связях `consumes` раздел, в котором объявляется этот RecordType. Любая другая такая ссылка отмечается в отчёте, но не отклоняется. RecordType называет другой RecordType в типе поля или уточняя его.", "Домен может принимать RecordType другого домена, только если его заголовок называет в своих связях `consumes` раздел, в котором объявляется этот RecordType.");
n.changes.push("Абзац 4 — ваша формулировка, дословно; английский текст следует за ней.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[3]);
console.log("---");
console.log(n.ruText.split("\n\n")[3]);
