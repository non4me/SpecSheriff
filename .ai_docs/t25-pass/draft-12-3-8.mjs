// Node 12.7 (first written for the key 12.3.8), the current node 1.27 (s-xfu2gpzddjnmgks), moved unchanged into section 12, RecordType, of the new form: a draft that
// holds its current wording, so that it can be checked and shown to the owner in the review of every rule. The English
// is read from spec.json ("=1.27"), its `TextRule.list` included; the Russian is written here, since full-ru.json has
// none for 1.27.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-12-7.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["12.7"]) throw new Error("12.7 already drafted");
const draft = {
  from: "1.27",
  sid: "kept",
  title: "=1.27",
  text: "=1.27",
  reason: "=1.27",
  list: "=1.27",
  ruTitle: "Один источник значений поля типа `one of`",
  ruText: "Значения поля типа `one of` приходят ровно из одного из источников, которые называет `TextRule.list` этого правила. Каждое значение объявляется один раз.",
  ruList: {
    of: "источники, из которых приходят значения поля типа `one of`",
    members: ["его собственный список", "значения, которые добавляют домены", "имена доменов", "sid узлов одного NodeKind"],
  },
  ruReason: [
    "Если значения поля приходят из одного источника, их находят целиком там, куда указывает объявление поля. Их находят там читатель поля, тип, сгенерированный для него (§s-e877bnfa559tvk9), и проверка, которая сравнивает каждый вариант со значениями, которые он называет (§s-z3dnru6qqdf9m6j). Значения из двух источников читали бы из одного из них так, будто он содержит их все.",
    "Значение, объявленное дважды, можно было бы удалить в одном месте, а в другом оно бы осталось.",
  ].join("\n\n"),
  changes: ["Нынешний 1.27 переносится в раздел 12 без изменений; русский текст — перевод нынешней формулировки."],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "12.6") out["12.7"] = draft;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log("drafted 12.7");
