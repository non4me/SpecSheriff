// Nodes 1.1.5 and 4.1, agreed: proposals that carry out the owner's agreement of 2026-11-17 to the new 1.1.4, by which the
// base specification names a technology the system is built with only as an example, and names a technology that is
// part of what the system does like any other part of a rule. The reason of 1.1.5 said that the base names no
// technology, and the reason of 4.1 that the appendix keeps "technical detail" apart from what the system does; both
// are reworded in the words of the new 1.1.4. Nothing else in the two nodes changes.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-408.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const changes = [
  ["1.1.5", "How a rule is implemented has no other home, since the base names no technology.", "How a rule is implemented has no other home, since the base specification names a technology that the system is built with only as an example.", "У того, как выполняется правило, нет другого места, потому что база не называет технологий.", "У того, как выполняется правило, нет другого места, потому что технологию, на которой система построена, базовая спецификация называет только как пример.", "В первой фразе обоснования «база не называет технологий» заменено словами нового 1.1.4: технологию, на которой система построена, база называет только как пример. Так следует из 1.1.4, который вы согласовали 17 ноября. Остальное не меняется."],
  ["4.1", "It exists to keep technical detail apart from what the system does.", "It exists to keep how the system is built apart from what the system does.", "Оно нужно, чтобы отделить технические подробности от того, что делает система.", "Оно нужно, чтобы отделить то, как система построена, от того, что она делает.", "Во второй фразе обоснования «технические подробности» заменены на «то, как система построена»: по новому 1.1.4, который вы согласовали 17 ноября, технология, которая входит в то, что делает система, стоит в базе. Остальное не меняется."],
];
for (const [k, en, enNew, ru, ruNew, why] of changes) {
  const n = d[k];
  if (!n.reason.includes(en) || !n.ruReason.includes(ru)) throw new Error(`${k} reason not found`);
  const reason = n.reason.replace(en, enNew), ruReason = n.ruReason.replace(ru, ruNew);
  n.proposals = [{
    where: "обоснование",
    en: [`Title: ${n.title}`, `Text: ${n.text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
    ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${n.ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
    why,
  }];
}
const note = d["2.1"].changes.findIndex((c) => /1\.1\.4/.test(c) && /не меняется|unchanged/.test(c));
if (note >= 0) d["2.1"].changes[note] = d["2.1"].changes[note] + " (С 17 ноября 1.1.4 запрещает базе называть только технологии, на которых система построена; текст и обоснование 2.1 этот запрет не упоминают и остаются верными.)";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok; note on 2.1", note >= 0 ? "updated" : "not found");
