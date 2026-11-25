// Node 12.3.2: the owner decided on 2026-11-14 to drop the item on a data record holding a field its RecordType does not
// describe. The owner wants a rule forbidding a domain to break its own format, with a check built on it, instead; a domain
// reading another domain's data takes only the fields it needs and so ignores the rest, and the real risk is a field that
// disappears or is renamed. That rule is to be drafted with node 12.3.3, on the RuntimeChecks generated from RecordTypes.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.2"].proposals[0];
const cut = (s, a) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, "");
};
p.en = cut(p.en, "- what is done with a data record that holds a field the RecordType does not describe: the record is refused, or it is accepted with that field kept as received;\n");
p.ru = cut(p.ru, "- как поступать с записью данных, в которой есть поле, не описанное в RecordType: отклонить запись или принять её и сохранить это поле как пришло;\n");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
