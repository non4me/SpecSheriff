// The owner's decision of 2026-11-14 («ок»): the examples that are whole sentences move from the text into `examples`, and a
// short "such as" inside a sentence stays in the text. Nodes 6.1, 6.6, 7.3, 7.6, 7.8, 7.10 and 7.12 carry it out with no
// change of meaning, so they keep the owner's agreement; the move is reported to the owner in one line. Node 10.5 gets its
// examples as a list, one example to an item, as node 7.16 holds them. Node 1.3.5 gets a proposal: an approval covers a
// node's examples too, since node 7.16 makes them part of the node.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const cut = (key, field, from) => {
  const n = d[key];
  if (!n[field].includes(from)) throw new Error(`${key}.${field}: missing ${from.slice(0, 60)}`);
  n[field] = n[field].replace(from, "");
};
const move = (key, en, ru) => {
  const n = d[key];
  n.examples = [...(n.examples || []), en];
  n.ruExamples = [...(n.ruExamples || []), ru];
};
const note = "Пример-предложение перенесён из текста в `examples` по вашему решению от 14 ноября; смысл не изменился.";

cut("6.1", "text", " For example, a user fills in a form while signing up.");
cut("6.1", "ruText", " Например, пользователь заполняет форму при регистрации.");
move("6.1", "`uses`: a user fills in a form while signing up.", "`uses`: пользователь заполняет форму при регистрации.");

cut("6.6", "text", " For example, `user 1:0..* session` says that a user has any number of sessions and that a session belongs to exactly one user.");
cut("6.6", "ruText", " Например, `user 1:0..* session` означает, что у пользователя может быть любое число сессий, а сессия принадлежит ровно одному пользователю.");
move(
  "6.6",
  "`user 1:0..* session` says that a user has any number of sessions and that a session belongs to exactly one user.",
  "`user 1:0..* session` означает, что у пользователя может быть любое число сессий, а сессия принадлежит ровно одному пользователю.",
);

cut("7.3", "text", " So a rule says not “credentials are kept encrypted”, which binds nobody, but “the store of secrets keeps every credential encrypted”.");
cut("7.3", "ruText", " Поэтому не «учётные данные хранятся зашифрованными», что никого ни к чему не обязывает, а «хранилище секретов хранит все учётные данные зашифрованными».");
move(
  "7.3",
  "A rule says not “credentials are kept encrypted”, which binds nobody, but “the store of secrets keeps every credential encrypted”.",
  "Правило говорит не «учётные данные хранятся зашифрованными», что никого ни к чему не обязывает, а «хранилище секретов хранит все учётные данные зашифрованными».",
);

cut("7.6", "text", "\n\nSo a node's text says not “the system refuses a request whose token has expired or names a removed user”, but “The system refuses a request in each of these cases:”, followed by the cases as a list.");
cut("7.6", "ruText", "\n\nПоэтому не «система отклоняет запрос, у которого истёк токен или который называет удалённого пользователя», а «Система отклоняет запрос в каждом из этих случаев:», и затем случаи списком.");
move(
  "7.6",
  "A node's text says not “the system refuses a request whose token has expired or names a removed user”, but “The system refuses a request in each of these cases:”, followed by the cases as a list.",
  "Текст узла говорит не «система отклоняет запрос, у которого истёк токен или который называет удалённого пользователя», а «Система отклоняет запрос в каждом из этих случаев:», и затем случаи списком.",
);

cut("7.8", "text", " So a rule says not “a limit on how many records a listing shows”, which also let an export drop records, but “a limit on how many records a user interface shows”.");
cut("7.8", "ruText", " Поэтому не «ограничение на то, сколько записей показывает список», из-за которого экспорт тоже мог отбрасывать записи, а «ограничение на то, сколько записей показывает пользовательский интерфейс».");
move(
  "7.8",
  "A rule says not “a limit on how many records a listing shows”, which also let an export drop records, but “a limit on how many records a user interface shows”.",
  "Правило говорит не «ограничение на то, сколько записей показывает список», из-за которого экспорт тоже мог отбрасывать записи, а «ограничение на то, сколько записей показывает пользовательский интерфейс».",
);

cut("7.10", "text", " So a definition says not “an operator is whoever is not a user”, but “an operator is a person who runs the system for its users”.");
cut("7.10", "ruText", " Поэтому не «оператор — это тот, кто не пользователь», а «оператор — это человек, который эксплуатирует систему для её пользователей».");
move(
  "7.10",
  "A definition says not “an operator is whoever is not a user”, but “an operator is a person who runs the system for its users”.",
  "Определение говорит не «оператор — это тот, кто не пользователь», а «оператор — это человек, который эксплуатирует систему для её пользователей».",
);

cut("7.12", "text", " So a node does not say “contracts holds 45 nodes”, which was true for one day. Instead, the figure is counted from the specification's nodes each time it is shown.");
cut("7.12", "ruText", " Поэтому не «в contracts 45 узлов», что было верно один день, а число, подсчитанное по узлам спецификации каждый раз, когда его показывают.");
move(
  "7.12",
  "A node does not say “contracts holds 45 nodes”, which was true for one day. Instead, the figure is counted from the specification's nodes each time it is shown.",
  "Узел не говорит «в contracts 45 узлов», что было верно один день. Вместо этого число подсчитывается по узлам спецификации каждый раз, когда его показывают.",
);
for (const key of ["6.1", "6.6", "7.3", "7.6", "7.8", "7.10", "7.12"]) d[key].changes.push(note);

const r = d["10.5"];
if (typeof r.examples === "string") {
  r.examples = ["No reviewer is installed.", "The reviewer's run does not end within its time limit.", "The run ends with an error.", "The answer passes the commit but names a finding."];
  r.ruExamples = ["Рецензент не установлен.", "Запуск рецензента не укладывается в отведённое время.", "Запуск завершается ошибкой.", "Ответ пропускает коммит, но называет замечание."];
}

const a = d["1.3.5"];
const from = "The wording an approval covers is a node's title, text and reason, and the fields the node's kind adds alongside them, such as `TextRule.list`.";
if (!a.text.includes(from)) throw new Error("1.3.5 text not found");
const ruFrom = a.ruText.split("\n")[0];
a.proposals = [
  {
    where: "первое предложение текста",
    en:
      "Text: " +
      a.text.replace(from, "The wording an approval covers is a node's title, text, reason and examples, and the fields the node's kind adds alongside them, such as `TextRule.list`."),
    ru: "Текст: " + a.ruText.replace(ruFrom, ruFrom.replace("заголовок, текст и обоснование узла", "заголовок, текст, обоснование и примеры узла")),
    why:
      "По согласованному 7.16 примеры — часть узла: они показывают, как понимать правило. Если бы одобрение их не покрывало, пример можно было бы изменить без согласия ответственного, и он стал бы читаться иначе, чем согласованный текст.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("examples moved; 10.5 examples as a list; 1.3.5 proposal:", a.proposals[0].ru.slice(0, 200));
