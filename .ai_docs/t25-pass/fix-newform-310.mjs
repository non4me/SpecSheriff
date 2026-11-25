// Nodes 12.3.4, 12.3.3 and 12.3.2, after the reviewer's report on the new node 12.3.4. In 12.3.4 the text now says when the
// RuntimeCheck refuses a data record, and the reason no longer restates the text: it says what the rule prevents, a renamed
// field whose value the readers lose. In 12.3.3 the reason's "they" now names a type and a RuntimeCheck, in English only.
// In 12.3.2, agreed, "records" becomes the owner's term "data records", a replacement that changes no meaning.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

const n = d["12.3.4"];
n.text = "A domain outputs and writes to its store only data records that conform to their RecordType. A data record with a field that its RecordType does not describe does not conform to that RecordType. The RuntimeCheck generated from the RecordType (§s-e877bnfa559tvk9) refuses a nonconforming data record before the domain outputs it or writes it to its store.";
n.reason = "The domains that read a domain's data rely on the format of that data. Without this rule, when the domain's code renames a field, those domains lose its value without notice. Where that field is optional, the only sign of the renaming is a field that the RecordType does not describe.";
n.ruText = "Домен выдаёт и записывает в своё хранилище только записи данных, которые соответствуют своему RecordType. Запись данных, в которой есть поле, не описанное в её RecordType, этому RecordType не соответствует. RuntimeCheck, сгенерированный из RecordType (§s-e877bnfa559tvk9), отклоняет запись данных, не соответствующую этому RecordType, до того, как домен её выдаст или запишет в своё хранилище.";
n.ruReason = "Домены, которые читают данные домена, полагаются на формат этих данных. Без этого правила, если код домена переименует поле, эти домены незаметно потеряют его значение. Если поле необязательное, о переименовании говорит только поле, которого RecordType не описывает.";
n.changes.push("По замечаниям рецензента: текст говорит, когда RuntimeCheck отклоняет запись, — до выдачи и до записи в хранилище; обоснование больше не повторяет текст, а говорит, от чего правило защищает.");

const g = d["12.3.3"];
g.reason = swap(g.reason, "Generated from the RecordType, they cannot disagree with it.", "Generated from the RecordType, a type and a RuntimeCheck cannot disagree with it.");
g.changes.push("Только английский текст, по замечанию рецензента: в последней фразе обоснования «they» заменено на «a type and a RuntimeCheck». Русский текст уже был таким.");

const r = d["12.3.2"];
r.text = swap(r.text, "the field that identifies its records.", "the field that identifies its data records.");
r.reason = swap(r.reason, "An identifier of a record has the type of the field that identifies it,", "An identifier of a data record has the type of the field that identifies it,");
r.ruText = swap(r.ruText, "— поле, которое его идентифицирует.", "— поле, которое идентифицирует его записи данных.");
r.ruReason = swap(r.ruReason, "Идентификатор записи имеет тип поля,", "Идентификатор записи данных имеет тип поля,");
r.changes.push("«Records» заменено термином «data records» («записи данных»), по замечанию рецензента. Смысл не изменился.");

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.reason, "\n", g.reason);
