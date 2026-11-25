// Proposes the new wording of node 1.6.1 (s-m4h279nbaqkpa3t), "What the checks enforce, and when they run", which
// follows from the new list of the reviewer's judgements in the principle "Deterministic checks hold every participant
// to the contract" and from the agreed 1.3.6 and 10.4. The proposal is built from the agreed wording, each changed
// passage asserted before it is replaced, so that nothing else in the node moves.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["1.6.1"];
if (n.sidValue !== "s-m4h279nbaqkpa3t") throw new Error("1.6.1 is not s-m4h279nbaqkpa3t");
if (n.proposals?.length) throw new Error("1.6.1 already holds a proposal");

const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const en = {};
en.title = n.title;
en.text = swap(n.text, "Every check except the review of the code is deterministic.", "Every check except the review is deterministic.", "text");
en.text = swap(en.text,
  "At every commit that changes code, an independent reviewer judges whether the code does what the rules it names say, and nothing that they do not say (§s-nyh9yk22ba6g77q).",
  [
    "In the review, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):",
    "- at every commit that changes code: whether that code does what the rules that the commit names say, and nothing that they do not say;",
    "- at a commit whose message states that a rule's implementation needs no change: whether that statement is true;",
    "- at a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification: whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.",
  ].join("\n"), "text");
en.reason = swap(n.reason,
  "The review is the one judgement, because whether code does only what its rules say cannot be decided by a script.",
  "The review needs a reviewer, because no script can decide whether code does only what its rules say, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification.",
  "reason");

const ru = {};
ru.title = n.ruTitle;
ru.text = swap(n.ruText, "Каждая проверка детерминирована, кроме ревью кода.", "Каждая проверка детерминирована, кроме ревью.", "ruText");
ru.text = swap(ru.text,
  "При каждом коммите, меняющем код, независимый рецензент судит, делает ли код то, что говорят названные им правила, и ничего сверх этого (§s-nyh9yk22ba6g77q).",
  [
    "При ревью независимый рецензент судит о следующем (§s-nyh9yk22ba6g77q):",
    "- при каждом коммите, меняющем код, — делает ли этот код то, что говорят названные в коммите правила, и ничего сверх этого;",
    "- при коммите, в сообщении которого сказано, что реализацию правила менять не нужно, — верно ли это утверждение;",
    "- при коммите, в котором одобряется узел технического приложения (§s-qmmzf9nksfsa3qp), если у узла есть связь `implements` (§s-sn6au3vcr9uy5pm) с правилом базовой спецификации, — уточняет ли узел реализуемые им правила базовой спецификации и не противоречит ли он ни одному правилу базовой спецификации.",
  ].join("\n"), "ruText");
ru.reason = swap(n.ruReason,
  "Ревью — единственное суждение, потому что делает ли код только то, что говорят его правила, скриптом не решить.",
  "Ревью требует рецензента, потому что скриптом не решить, делает ли код только то, что говорят его правила, действительно ли реализацию правила не нужно менять и согласуется ли узел технического приложения с базовой спецификацией.",
  "ruReason");

const block = (labels, w, examples) => [
  `${labels[0]}: ${w.title}`,
  `${labels[1]}: ${w.text}`,
  ...examples.map(e => `${labels[2]}: ${e}`),
  `${labels[3]}: ${w.reason}`,
].join("\n\n");

fs.copyFileSync(nfPath, new URL("newform.before-propose-1-6-1.json", here));
n.proposals = [{
  en: block(["Title", "Text", "Example", "Reason"], en, n.examples || []),
  ru: block(["Заголовок", "Текст", "Пример", "Обоснование"], ru, n.ruExamples || []),
  why: [
    "Следует из согласованного принципа о детерминированных проверках, из 1.3.6 и из 10.4: рецензент судит не только код.",
    "«кроме ревью кода» → «кроме ревью».",
    "Абзац о рецензенте стал списком из трёх суждений. Первое — прежнее, о коде; второе — о сообщении «реализацию менять не нужно»; третье — об одобренном узле технического приложения со связью implements с правилом базы.",
    "«названные им правила» → «названные в коммите правила»: «им» могло читаться как «рецензентом».",
    "Фраза обоснования о ревью называет все три вопроса, которые скриптом не решить, теми же словами, что обоснование 10.4.",
  ].join(" "),
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");
console.log(n.proposals[0].en);
console.log("\n----\n");
console.log(n.proposals[0].ru);
