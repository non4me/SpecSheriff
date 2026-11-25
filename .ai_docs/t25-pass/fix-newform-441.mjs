// Node 1.5.2: the wording checker's findings on fix-newform-440.mjs. The list names who places the SpecTags; each bullet
// names the checks again instead of "they"; the appendix is that of the SpecSheriff tools; the reason's sentence on
// technical code says why instead of what.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-441.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const CHECKS = "s-jau82aq9juv9zzh";
const APPENDIX = "s-a4rbry4hsu34hy8";
const TECH = "s-2jcmb9xe9d64t2t";
const t = d["1.5.2~"];
const paras = t.text.split("\n\n");
const ruParas = t.ruText.split("\n\n");
paras[1] = [
  "Whoever writes a file places its SpecTags:",
  `- directly before each symbol, where the checks (§${CHECKS}) can tell the file's symbols apart;`,
  "- in the file's first comment, where the checks cannot tell them apart;",
  `- outside the file, in the place that the appendix of the SpecSheriff tools (§${APPENDIX}) names, where the file's format allows no comment.`,
].join("\n");
ruParas[1] = [
  "Тот, кто пишет файл, ставит его SpecTag:",
  `- непосредственно перед каждым символом, если проверки (§${CHECKS}) могут различить символы файла;`,
  "- в первый комментарий файла, если проверки не могут их различить;",
  `- вне файла, в место, которое называет описание инструментов SpecSheriff (§${APPENDIX}), если формат файла не допускает комментариев.`,
].join("\n");
paras[2] = "A file whose SpecTags stand in its first comment or outside it counts as one symbol.";
ruParas[2] = "Файл, SpecTag которого стоят в его первом комментарии или вне его, считается одним символом.";
t.text = paras.join("\n\n");
t.ruText = ruParas.join("\n\n");
const r = t.reason.split("\n\n");
const rr = t.ruReason.split("\n\n");
r[1] = `A SpecTag on technical code (§${TECH}), marking the exception made for it, keeps technical code in view.`;
rr[1] = `SpecTag на техническом коде (§${TECH}) с пометкой о сделанном для него исключении держит технический код на виду.`;
t.reason = r.join("\n\n");
t.ruReason = rr.join("\n\n");
t.examples[1] = "A file that holds the texts a user interface shows is in a format that allows no comment. Its SpecTags stand outside it, in the place that the appendix of the SpecSheriff tools names.";
t.ruExamples[1] = "Файл с текстами, которые показывает пользовательский интерфейс, записан в формате, который не допускает комментариев. Его SpecTag стоят вне его, в месте, которое называет описание инструментов SpecSheriff.";
const p = d["1.5.2"].proposals[0];
p.en = [`Title: ${t.title}`, `Text: ${t.text}`, ...t.examples.map((e) => `Example: ${e}`), `Reason: ${t.reason}`].join("\n\n");
p.ru = [`Заголовок: ${t.ruTitle}`, `Текст: ${t.ruText}`, ...t.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${t.ruReason}`].join("\n\n");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
