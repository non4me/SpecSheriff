// Node 9.5: the wording checker's findings on fix-newform-415.mjs, as the agent judged them. "such code" in the second
// paragraph is named again; the definition of code outside the commit covers symbols and tests alike; "the method" in the
// reason is replaced by what it means; the sentence on approving despite the reports is split in two.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-416.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["9.5"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("text", "Code outside the commit is a symbol of the system's code outside the tests, or a test, that the commit leaves unchanged.", "Code outside the commit is every symbol of the system's code outside the tests, and every test, that the commit leaves unchanged.");
swap("text", "The checks warn about such code only while the specification is approved.", "The checks warn about code outside the commit that carries no SpecTag only while the specification is approved.");
swap("text", "They give a single warning for all code outside the commit that carries no SpecTag, saying that such code exists.", "They give a single warning for all such code, saying that it exists.");
swap("ruText", "О таком коде проверки предупреждают, только пока спецификация одобрена.", "О коде за пределами коммита без SpecTag проверки предупреждают, только пока спецификация одобрена.");
swap("ruText", "Предупреждение одно на весь код за пределами коммита без SpecTag: оно говорит, что такой код есть.", "Предупреждение одно на весь такой код: оно говорит, что такой код есть.");
swap("reason", "A commit that changes code is held to the method, so only code outside the commit escapes a refusal.", "Code that a commit changes must carry its SpecTags, so only code outside the commit escapes a refusal.");
swap("ruReason", "Коммит, который меняет код, целиком подчиняется методу, поэтому отказа избегает только код за пределами коммита.", "Код, который коммит меняет, обязан иметь свои SpecTag, поэтому отказа избегает только код за пределами коммита.");
swap("reason", "Once the owners have approved the specification despite the reports shown to them (§s-qzthyh7yqvfhsa2), a warning at every commit reminds them", "The owners may approve the specification after seeing the reports on such code (§s-qzthyh7yqvfhsa2). From then on, a warning at every commit reminds them");
swap("ruReason", "Когда ответственные одобрили спецификацию, несмотря на показанные им сообщения (§s-qzthyh7yqvfhsa2), предупреждение при каждом коммите напоминает", "Ответственные могут одобрить спецификацию, увидев сообщения о таком коде (§s-qzthyh7yqvfhsa2). После этого предупреждение при каждом коммите напоминает");
n.changes.push("После проверки формулировок: «такой код» во втором абзаце назван заново; определение кода за пределами коммита охватывает и символы, и тесты; в обосновании «метод» заменён тем, что имелось в виду, а фраза об одобрении вопреки сообщениям разделена на две.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
