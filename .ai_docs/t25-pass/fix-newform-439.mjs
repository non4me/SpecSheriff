// Node 1.5.2: the second pass of the wording checker. The first use of "SpecTag" cites 9.3; the sentence on technical code
// in the reason states one relation each; the last paragraph of the reason says why a link kept only by the rule is
// accepted instead of restating the text.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-439.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const SPECTAG = "s-8xw4mgvpexyvw5q";
const t = d["1.5.2~"];
const swap = (field, from, to) => {
  if (!t[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  t[field] = t[field].replace(from, to);
};
swap("text", "outside its tests has a SpecTag that names", `outside its tests has a SpecTag (§${SPECTAG}) that names`);
swap("ruText", "вне его тестов есть SpecTag, который называет", `вне его тестов есть SpecTag (§${SPECTAG}), который называет`);
swap("reason", "Technical code contains no business logic, yet it too has a SpecTag, one that says an exception has been made for it, so that it stays in view.", "Technical code, which contains no business logic, has a SpecTag too: one that says an exception has been made for it. That keeps technical code in view.");
swap("ruReason", "Технический код не содержит бизнес-логики, но и у него есть SpecTag — с пометкой, что для этого кода сделано исключение, — чтобы он оставался на виду.", "У технического кода, который не содержит бизнес-логики, тоже есть SpecTag — с пометкой, что для этого кода сделано исключение. Так технический код остаётся на виду.");
swap("reason", "A format that allows no comment leaves no place in the file for a SpecTag. The system may still need such a file, so the rule that the file implements keeps the link instead.", "The system may need a file in a format that it cannot change. A link kept only by the rule is weaker than a SpecTag, since nothing in the file shows it, but it is better than no link.");
swap("ruReason", "Формат, который не допускает комментариев, не оставляет в файле места для SpecTag. Системе такой файл всё же может быть нужен, поэтому связь хранит правило, которое файл реализует.", "Системе может быть нужен файл в формате, который она не может изменить. Связь, которую хранит только правило, слабее SpecTag, ведь в самом файле её не видно, но она лучше, чем никакой.");
const n = d["1.5.2"];
const p = n.proposals[0];
p.en = [`Title: ${t.title}`, `Text: ${t.text}`, ...t.examples.map((e) => `Example: ${e}`), `Reason: ${t.reason}`].join("\n\n");
p.ru = [`Заголовок: ${t.ruTitle}`, `Текст: ${t.ruText}`, ...t.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${t.ruReason}`].join("\n\n");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
