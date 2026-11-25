// Node 12.3.4, not yet agreed: the last sentence of the reason is removed. The owner found it unclear on 2026-11-14 («как то
// мутно - как связно необязательность и переименование?»). It explained why a field that the RecordType does not
// describe must be refused: a renamed required field is caught as missing, while a renamed optional field shows only as the
// new name. Since the owner's remark of the same day, the text no longer mentions such a field, and the example shows that
// case, so the reason keeps only why the rule exists.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.4"];
const cut = (s, a) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, "");
};
n.reason = cut(n.reason, " Where that field is optional, the only sign of the renaming is a field that the RecordType does not describe.");
n.ruReason = cut(n.ruReason, " Если поле необязательное, о переименовании говорит только поле, которого RecordType не описывает.");
n.changes.push("Последняя фраза обоснования убрана по вашему замечанию: связь необязательного поля с переименованием была неясна. Этот случай показывает пример.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason, "\n", n.ruReason);
