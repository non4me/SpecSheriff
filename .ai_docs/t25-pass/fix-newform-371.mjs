// Node 7.2.1, after the wording checker: the first sentence states the requirement whole, and the second says what an
// actor may be, so neither repeats the other. The kinds of actor are examples, and another system is among them. The
// paragraph on the technical debt states its two parts in two sentences.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-371.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.1"];
const debt = "s-2r7k2aeyusgy6fw";
n.text = [
  "A rule names the actor and says what that actor must do. An actor may be a person, a role, a part of the system, another system or a tool.",
  `Where the technical debt (§${debt}) describes a shortcoming, the description too names an actor. It says what that actor does while the shortcoming persists.`,
].join("\n\n");
n.ruText = [
  "Правило называет исполнителя и говорит, что этот исполнитель должен делать. Исполнителем может быть человек, роль, часть системы, другая система или инструмент.",
  `Там, где технический долг (§${debt}) описывает недостаток, описание тоже называет исполнителя. Оно говорит, что этот исполнитель делает, пока недостаток существует.`,
].join("\n\n");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
