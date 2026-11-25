// Node 12.3.4, not yet agreed: the sentence saying that a data record with a field its RecordType does not describe does
// not conform is removed, after the owner's remark of 2026-11-14 that it is obvious («очевидное утверждение»). A record in
// a format other than its RecordType's does not conform, as 12.3.1 already implies. What a generated RuntimeCheck does with
// such a field is a matter for the appendix of the tools: JSON Schema accepts it by default, so rules 18 and 19 there are
// to require that it be refused.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.4"];
const cut = (s, a) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, "");
};
n.text = cut(n.text, " A data record with a field that its RecordType does not describe does not conform to that RecordType.");
n.ruText = cut(n.ruText, " Запись данных, в которой есть поле, не описанное в её RecordType, этому RecordType не соответствует.");
n.changes = n.changes.filter(c => !c.startsWith("Предложение о поле, которого RecordType не описывает"));
n.changes.push("Предложение о записи с полем, которого RecordType не описывает, убрано по вашему замечанию: оно очевидно из слова «соответствует». Что сгенерированный RuntimeCheck отклоняет такое поле, скажут правила 18 и 19 описания инструментов: JSON Schema по умолчанию такое поле принимает.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.ruText);
