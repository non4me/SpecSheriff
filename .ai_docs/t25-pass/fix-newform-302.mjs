// Node 12.3.2: the owner's remarks of 2026-11-14 on the proposal.
// - «содержит» for «говорит», and «описание того, для чего он предназначен» for the unclear «что он такое».
// - «что происходит с полем, которого никто не объявлял» did not say what can happen; the schema allows two outcomes, a field
//   the RecordType does not declare is refused or kept as it came, so the item names them.
// - The owner found the last sentence obvious. Its point is where a condition binding several fields is written: not in
//   the RecordType but as a rule of its own, linked to it. The agent keeps it, worded so that this point shows, and tells
//   the owner why.
// - The owner proposed the title «Формат RecordType». Since 12.3.1 says that a RecordType is a data format, it would read
//   as the format of a format, so the agent proposes «Состав RecordType», "What a RecordType contains", matching «содержит».
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.2"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(p.en, "Title: What a RecordType states", "Title: What a RecordType contains");
p.en = swap(p.en, "A RecordType (§s-7vm323mhry2enx3) states:", "A RecordType (§s-7vm323mhry2enx3) contains:");
p.en = swap(p.en, "- what it is;", "- a description of what it is for;");
p.en = swap(p.en, "- what happens to a field nobody declared;", "- whether a field it does not declare is refused or kept as it came;");
p.en = swap(
  p.en,
  "The rules that bind one field to another are rules linked to the RecordType.",
  "A condition that binds several fields is written not in the RecordType but as a rule of its own, linked to the RecordType.",
);
p.ru = swap(p.ru, "Заголовок: Что говорит RecordType", "Заголовок: Состав RecordType");
p.ru = swap(p.ru, "RecordType (§s-7vm323mhry2enx3) говорит:", "RecordType (§s-7vm323mhry2enx3) содержит:");
p.ru = swap(p.ru, "- что он такое;", "- описание того, для чего он предназначен;");
p.ru = swap(p.ru, "- что происходит с полем, которого никто не объявлял;", "- отклоняется ли поле, которого он не объявляет, или сохраняется как пришло;");
p.ru = swap(
  p.ru,
  "Правила, которые связывают одно поле с другим, — это правила, связанные с RecordType.",
  "Условие, которое связывает несколько полей, записывается не в RecordType, а отдельным правилом со связью с ним.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
