// Node 12.3.2: the owner found (2026-11-14) that «Каждый формат данных описывается отдельным узлом — RecordType» repeats
// node 12.3.1, since the whole section is about RecordTypes. Node 12.3.1 already says that data in one format has one
// RecordType and where it is declared. So 12.3.2 opens straight with what a RecordType states, and its title says so.
// Node 12.3.1, agreed: the English alone is brought into line after the EngStickler reader's report. "Offers them on" is
// a calque, "takes users" is vague, and "which description holds" is unusual; the Russian does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

const p = d["12.3.2"].proposals[0];
p.en = swap(p.en, "Title: Data formats are described in the specification", "Title: What a RecordType states");
p.en = swap(
  p.en,
  "Each data format is described by a node of its own, a RecordType (§s-7vm323mhry2enx3). The RecordType states:",
  "A RecordType (§s-7vm323mhry2enx3) states:",
);
p.ru = swap(p.ru, "Заголовок: Форматы данных описываются в спецификации", "Заголовок: Что говорит RecordType");
p.ru = swap(
  p.ru,
  "Каждый формат данных описывается отдельным узлом — RecordType (§s-7vm323mhry2enx3). RecordType говорит:",
  "RecordType (§s-7vm323mhry2enx3) говорит:",
);
p.why =
  "Узел 12.3.1, который вы согласовали, уже говорит, что такое RecordType, что у данных одного формата один RecordType и где он объявляется. Поэтому 12.3.2 сразу говорит, что сообщает RecordType, а заголовок называет это. «Структура» в обосновании заменена на «формат», как в 12.3.1.";

const n = d["12.3.1"];
n.reason = swap(n.reason, "cannot tell which description holds.", "cannot tell which description is valid.");
n.examples[0] = swap(n.examples[0], "The domain of requests takes users and declares", "The domain of requests takes users' data and declares");
n.examples[0] = swap(
  n.examples[0],
  "A domain that masks users' personal data and offers them on keeps the RecordType of a user.",
  "A domain that masks users' personal data and offers the masked data to other domains keeps the RecordType of a user.",
);
n.changes.push("Только английский текст, по замечаниям читателя: в обосновании и в примере исправлены обороты, которые читались как калька или двусмысленно. Смысл узла не изменился.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
