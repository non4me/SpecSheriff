// The owner's wording of 2026-11-17 for the proposal on 9.5: code outside the commit is the system's code, tests
// included, that the commit leaves unchanged; 9.1 already counts the tests as part of the system's code. Also the English
// of the agreed 1.5.2 brought into line with its Russian text after EngStickler's readers had read it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-448.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swapIn = (obj, field, from, to, where) => {
  if (!obj[field].includes(from)) throw new Error(`${where}.${field}: not found: ${from}`);
  obj[field] = obj[field].replace(from, to);
};
const p = d["9.5"].proposals[0];
swapIn(p, "en", "Code outside the commit means the system's code other than tests, and every test, that the commit leaves unchanged.", "Code outside the commit means the system's code, tests included, that the commit leaves unchanged.", "9.5");
swapIn(p, "ru", "Код за пределами коммита — это код системы вне тестов и тесты, которые коммит не меняет.", "Код за пределами коммита — это код системы, включая тесты, который коммит не меняет.", "9.5");
p.why = `${p.why} Второе предложение — в вашей формулировке от 17 ноября: код системы, включая тесты (тесты входят в код системы по 9.1).`;

const n = d["1.5.2"];
swapIn(n, "text", "Code that implements no rule has the SpecTag that says so.", "Code that implements no rule has a SpecTag that says so.", "1.5.2");
swapIn(n, "text", "The formats that allow no comments are JSON and those that a project's own guidelines (§s-u7tw6m8npxmv5tu) name.", "The formats that allow no comments are JSON and those that a project's own guidelines (§s-u7tw6m8npxmv5tu) name as allowing none.", "1.5.2");
swapIn(n, "text", "Each entry in the bindings file names a file that exists and holds that file's SpecTags.", "Each entry in the bindings file names an existing file and holds that file's SpecTags.", "1.5.2");
n.examples = [
  "A stylesheet whose symbols the checks cannot identify has its SpecTag in a comment at its start.",
  "A JSON file that holds the texts a user interface shows has an entry in the bindings file. The entry names the JSON file and holds its SpecTags.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
