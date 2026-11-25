// Node 10.2: the owner accepted the proposal of fix-newform-249.mjs (2026-11-13, «ок»). Node 1.6.1, agreed on 2026-11-08,
// is aligned with what the owner has agreed since: at a push the tests of a project's own checks run too (check 10.1.44,
// node 10.2), and the reviewer judges the code against the rules it names (check 10.1.43, the owner's decision of 11
// November that code implements rules). The change carries out those agreements, so node 1.6.1 stays agreed.
// Draft 10.3: a proposal. Its third item goes, since node 10.8 says a project's own checks and their tests have no
// SpecTags; the open question about shell commands is put as two sentences; the Russian says «у теста есть SpecTag».
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const pick = (s, re) => {
  const m = s.match(re);
  if (!m) throw new Error(`no match for ${re}`);
  return m[1].trim();
};

const a = d["10.2"];
const p = a.proposals[0];
a.text = pick(p.en, /^Text: ([\s\S]*)$/);
a.ruText = pick(p.ru, /^Текст: ([\s\S]*)$/);
delete a.proposals;
a.agreed = "2026-11-13";
a.changes.push(
  "Вы приняли предложение (2026-11-13): первый и четвёртый пункты своими словами говорят, какие проверки запускаются; ссылки только подкрепляют сказанное.",
);

const swap = (key, field, from, to) => {
  const n = d[key];
  if (!n[field].includes(from)) throw new Error(`${key}.${field}: missing ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("1.6.1", "text", "whether the code does what the nodes it names say", "whether the code does what the rules it names say");
swap("1.6.1", "ruText", "делает ли код то, что говорят названные им узлы", "делает ли код то, что говорят названные им правила");
swap("1.6.1", "text", "The tests of the system's code run on a push", "The tests of the system's code and of a project's own checks run on a push");
swap("1.6.1", "ruText", "Тесты кода системы запускаются при push", "Тесты кода системы и собственных проверок проекта запускаются при push");
d["1.6.1"].changes.push(
  "Приведено в соответствие с тем, с чем вы согласились 13 ноября: при push запускаются и тесты собственных проверок проекта (10.1.44, 10.2); рецензент сверяет код с названными им правилами (10.1.43). Смысл ваших решений не менялся.",
);

const n = d["10.3"];
n.proposals = [
  {
    where: "текст и обоснование целиком",
    en:
      "Text: Before an agent's edit is made, the SpecSheriff tools refuse it where it would do any of these:\n" +
      "- leave a node approved with a wording for which no approval stands (§s-5ah25f6gy99panq), unless the node is a section;\n" +
      "- change the code written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-rah8b37kytb682y);\n" +
      "- change the approvals other than through the procedure that records an approval or withdraws one.\n\n" +
      "The refusal before an edit applies only to an edit whose request states the files it writes and what it writes into them. A shell command states neither.\n\n" +
      "Reason: An agent that could set a status, or write an approval itself, could approve what none of the node's owners agreed to. " +
      "Every later check takes the approvals as given, so they can be guarded only where they are written.\n\n" +
      "A commit contains a test and its code together, whichever was written first, so the order of the work can be enforced only where the edits are made. " +
      "Before a shell command runs, no deterministic check can tell which files it will change or how.",
    ru:
      "Текст: Прежде чем правка агента сделана, инструменты SpecSheriff отклоняют её, если она сделала бы что-то из этого:\n" +
      "- оставила бы узел одобренным при формулировке, на которую нет одобрения в силе (§s-5ah25f6gy99panq), кроме раздела;\n" +
      "- изменила бы код, написанный для правила, в том числе для правила собственного типа в проекте (§s-vsh384ybt4w25a2), пока ни у одного теста нет SpecTag этого правила (§s-rah8b37kytb682y);\n" +
      "- изменила бы одобрения иначе, чем через процедуру, которая записывает одобрение или отзывает его.\n\n" +
      "Отказ до правки применяется только к правке, в запросе которой названы файлы, которые она пишет, и то, что она в них пишет. Команда оболочки не называет ни того, ни другого.\n\n" +
      "Обоснование: Агент, который мог бы выставить статус или сам записать одобрение, мог бы одобрить то, с чем не согласился ни один из ответственных за узел. " +
      "Каждая следующая проверка принимает одобрения как данность, поэтому удержать их можно только там, где их пишут.\n\n" +
      "Коммит держит тест и его код вместе, что бы ни было написано первым, поэтому порядок работы можно удержать только там, где делаются правки. " +
      "До запуска команды оболочки ни одна детерминированная проверка не может узнать, какие файлы она изменит и как.",
    why:
      "Третий пункт ушёл: по согласованному 10.8 у собственных проверок проекта и их тестов нет SpecTag, так что требовать тест с SpecTag правила, которое их перечисляет, нельзя. " +
      "Добавлен открытый вопрос о командах оболочки: отказ до правки возможен только для правки, которая заранее называет файлы и их новое содержимое; команда оболочки этого не называет. " +
      "Во втором пункте по-русски «ни у одного теста нет SpecTag», по вашему слову.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.2 agreed; 1.6.1 aligned; 10.3 proposal set");
