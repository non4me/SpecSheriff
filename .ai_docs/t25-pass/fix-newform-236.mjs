// Draft 7.17 "A sentence is as short as its meaning allows": the reviewer's report of 2026-11-13.
// - 7.3: the sentences after the first name whoever shortens a sentence as their subject, not the activity.
// - 7.5: the reason's second sentence is split in two.
// - The readers' fix of step 1 in the owner's CLAUDE.md: "another small word" becomes "any other function word".
// - The reviewer's doubt: read literally, the last item would forbid "API" (7.11), "REST API" (7.13) and the key `refs`,
//   which the owner kept on 2026-11-05 as a common abbreviation that misleads nobody (s-dpe5kcz4eamv39g). The item is
//   narrowed to a label or an abbreviation that the specification does not define and a reader may not know; the owner
//   decides on it in the final wording.
// - An example, as node 7.16 lets a node hold, proposed whenever a node is drafted (the owner, 2026-11-11).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.17"];
if (!n) throw new Error("7.17 missing");
n.text =
  "Each sentence of a node is as short as it can be while keeping all of its meaning, correct grammar and natural wording. " +
  "Whoever shortens a sentence keeps every condition and every exception in it. They never:\n" +
  "- leave out its subject or its verb;\n" +
  "- put a string of nouns in place of a verb;\n" +
  "- leave out an article, a preposition or any other function word that a careful native writer of English would use;\n" +
  "- replace words with a label or an abbreviation that the specification does not define and a reader may not know.";
n.ruText =
  "Каждое предложение узла настолько коротко, насколько возможно, при условии, что оно сохраняет весь свой смысл, правильную грамматику и естественный оборот. " +
  "Тот, кто укорачивает предложение, сохраняет в нём каждое условие и каждое исключение. Он никогда:\n" +
  "- не опускает подлежащее или сказуемое;\n" +
  "- не ставит цепочку существительных вместо глагола;\n" +
  "- не опускает артикль, предлог или другое служебное слово, которое употребил бы внимательный носитель английского языка;\n" +
  "- не заменяет слова ярлыком или сокращением, которых спецификация не определяет и которые читатель может не знать.";
n.reason =
  "A sentence longer than its meaning requires makes the reader look for its point. " +
  "A sentence shortened until it is ungrammatical can be read in more than one way. Agents then apply the rule it states in different ways.";
n.ruReason =
  "Предложение длиннее, чем требует его смысл, заставляет читателя искать его суть. " +
  "Предложение, укороченное до потери грамматики, можно прочесть по-разному. Тогда агенты применяют правило, которое оно излагает, по-разному.";
n.examples = [
  "“The system, whenever a request arrives, checks the token that the request carries” becomes “The system checks the token of every request”, not “Token check on every request”.",
];
n.ruExamples = [
  "«The system, whenever a request arrives, checks the token that the request carries» становится «The system checks the token of every request», а не «Token check on every request».",
];
n.changes = [
  n.changes[0],
  "Правки ревьюера: подлежащее второго предложения и списка — тот, кто укорачивает предложение, а не само укорачивание (7.3); второе предложение обоснования разделено на два (7.5).",
  "Запрет на ярлык и сокращение сужен до тех, которых спецификация не определяет и которые читатель может не знать. Буквально прочитанный, он запрещал бы API в 7.11, REST API в 7.13 и ключ `refs`, который вы оставили 2026-11-05 как общепринятое сокращение, никого не вводящее в заблуждение.",
  "Добавлен пример, как разрешает узел 7.16.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
