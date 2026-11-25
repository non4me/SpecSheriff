// Node 12.3.2: the owner still could not see how something undeclared can be refused (2026-11-14). The item is about data:
// a data record may hold a field that its RecordType does not describe, and the RecordType says whether such a record is
// refused or accepted with that field kept as received. The item now says so. In the English, "binds several fields" is
// replaced by "involves several fields", which cannot be read as "obliges".
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.2"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(
  p.en,
  "- whether a field it does not declare is refused or kept as it came;",
  "- what is done with a data record that holds a field the RecordType does not describe: the record is refused, or it is accepted with that field kept as received;",
);
p.en = swap(p.en, "A condition that binds several fields is written", "A condition that involves several fields is written");
p.ru = swap(
  p.ru,
  "- отклоняется ли поле, которого он не объявляет, или сохраняется как пришло;",
  "- как поступать с записью данных, в которой есть поле, не описанное в RecordType: отклонить запись или принять её и сохранить это поле как пришло;",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
