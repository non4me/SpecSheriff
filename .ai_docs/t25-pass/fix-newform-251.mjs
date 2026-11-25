// Node 10.3: the owner accepted the proposal of fix-newform-250.mjs (2026-11-13, «ок»). Drafts 10.4 and 10.5 are written
// from present node 5.10 (s-nyh9yk22ba6g77q). Node 10.4 keeps what the reviewer is given and keeps the sid; node 10.5, new,
// takes the review that cannot be held. What concerns a RecordType goes to the extension for domains (12.3.13) and what
// concerns a project's generator goes to the extension for generation (12.5). The judgement itself is check 10.1.43, so
// node 10.4 does not restate it. Following the owner's decision of 11 November, code implements rules, not nodes.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const pick = (s, re) => {
  const m = s.match(re);
  if (!m) throw new Error(`no match for ${re}`);
  return m[1].trim();
};

const a = d["10.3"];
const p = a.proposals[0];
a.text = pick(p.en, /^Text: ([\s\S]*?)\n\nReason: /);
a.reason = pick(p.en, /\n\nReason: ([\s\S]*)$/);
a.ruText = pick(p.ru, /^Текст: ([\s\S]*?)\n\nОбоснование: /);
a.ruReason = pick(p.ru, /\n\nОбоснование: ([\s\S]*)$/);
delete a.proposals;
a.agreed = "2026-11-13";
a.changes.push(
  "Вы приняли предложение (2026-11-13): третий пункт ушёл по согласованному 10.8; добавлено, что отказ до правки применяется только к правке, которая называет свои файлы и их содержимое, а команда оболочки их не называет.",
);

if (d["10.4"] || d["10.5"]) throw new Error("drafts 10.4 or 10.5 exist");
d["10.4"] = {
  from: "5.10",
  sid: "kept",
  title: "What the reviewer is given",
  ruTitle: "Что получает рецензент",
  text:
    "The independent reviewer of a commit that changes code is given the following, and nothing of the session that wrote the code:\n" +
    "- the commit's change, less the files generated from the specification;\n" +
    "- the text and the reason of each rule that the commit's message names, or that a SpecTag of a changed symbol of the system's code outside its tests names;\n" +
    "- for such a rule of a project's own kind, also the properties that its kind declares (§s-vsh384ybt4w25a2).\n\n" +
    "The reviewer is told of each file it is not given that the file is generated from the specification. What a rule requires of the generated code counts as carried out by that code.",
  ruText:
    "Независимый рецензент коммита, который меняет код, получает следующее и ничего из сессии, в которой код писали:\n" +
    "- изменение коммита, кроме файлов, сгенерированных из спецификации;\n" +
    "- текст и обоснование каждого правила, которое называет сообщение коммита или SpecTag изменённого символа кода системы вне его тестов;\n" +
    "- для такого правила собственного типа в проекте — ещё и свойства, которые объявляет его тип (§s-vsh384ybt4w25a2).\n\n" +
    "О каждом файле, которого рецензент не получил, ему сообщают, что этот файл сгенерирован из спецификации. То, что правило требует от сгенерированного кода, считается выполненным этим кодом.",
  reason:
    "Given nothing of the session that wrote the code, the reviewer reads the code against its rules rather than against its author's intent. " +
    "A rule's reason tells the reviewer how to read a case that the rule's text leaves open. A file withheld without a word would read to the reviewer as missing.",
  ruReason:
    "Не получив ничего из сессии, в которой писали код, рецензент сверяет код с его правилами, а не с намерением автора. " +
    "Обоснование правила подсказывает рецензенту, как понимать случай, который текст правила оставляет открытым. Файл, который не дали рецензенту и о котором ничего не сказали, он счёл бы пропущенным.",
  changes: [
    "Из нынешнего 5.10, sid сохраняется. Что получает рецензент для RecordType, уходит в расширение для доменов (12.3.13); что написал генератор проекта — в расширение для генерации (12.5).",
    "Отказ рецензента и указание правила и строки не повторяются: это проверка 10.1.43, с которой вы согласились. Рецензия, которую нельзя провести, — отдельный узел 10.5.",
    "«Узлы» стали «правилами»: код реализует правила, по вашему решению от 11 ноября. Обоснование сокращено до того, зачем существует правило (7.14).",
  ],
  sidValue: "s-nyh9yk22ba6g77q",
};
d["10.5"] = {
  from: "5.10",
  sid: "new",
  title: "A review that cannot be held refuses the commit",
  ruTitle: "Рецензия, которую нельзя провести, отклоняет коммит",
  text:
    "When the review of a commit cannot be held, the SpecSheriff tools refuse the commit and say why. A review cannot be held in each of these cases:\n" +
    "- there is no reviewer to run;\n" +
    "- the reviewer's run does not end;\n" +
    "- the reviewer's answer cannot be read.",
  ruText:
    "Если рецензию коммита нельзя провести, инструменты SpecSheriff отклоняют коммит и говорят почему. Рецензию нельзя провести в каждом из этих случаев:\n" +
    "- нет рецензента, которого можно запустить;\n" +
    "- запуск рецензента не заканчивается;\n" +
    "- ответ рецензента нельзя прочитать.",
  reason: "A review that passes whenever it could not be held is a review nobody can rely on.",
  ruReason: "На рецензию, которая проходит всякий раз, когда её не удалось провести, не может положиться никто.",
  changes: ["Новый узел, выделен из нынешнего 5.10: применяется отдельно от того, что получает рецензент (7.7)."],
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.3 agreed; drafts 10.4 and 10.5 written");
