// The owner's ruling of 2026-11-08 that a term only introduces an entity gets a node of its own, 3.3,
// since it can be carried out without "defined once, in contracts". The Russian of 3.2 says «контракты».
import fs from "node:fs";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const page = new URL("base-structure.html", here);
if (JSON.parse(fs.readFileSync(file, "utf8"))["3.3"]) throw new Error("3.3 has a draft already");

execFileSync(process.execPath, [fileURLToPath(new URL("insert-node.mjs", here)), "3.3"], { stdio: "inherit" });

const d = JSON.parse(fs.readFileSync(file, "utf8"));
const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const walk = p => fs.readdirSync(p, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(p + "/" + e.name) : [p + "/" + e.name]));
const taken = walk(fileURLToPath(new URL("../../specs", here))).filter(f => f.endsWith(".json") || f.endsWith(".jsonl")).map(f => fs.readFileSync(f, "utf8")).join("\n") + JSON.stringify(d);
const draw = () => {
  for (;;) {
    let s = "s-";
    for (let i = 0; i < 15; i++) s += alphabet[crypto.randomInt(alphabet.length)];
    if (!taken.includes(s)) return s;
  }
};

const b = d["3.2"];
const swap = (k, a, c) => {
  if (b[k].split(a).length !== 2) throw new Error("no single match in " + k + ": " + a);
  b[k] = b[k].replace(a, c);
};
b.ruTitle = "Термин определяется один раз, в контрактах";
swap("ruText", "нужный ему термин добавляют в contracts", "нужный ему термин добавляют в контракты");
b.changes.push("В русском тексте contracts стали «контрактами», как в 2.1 и 3.1.");

const node = {
  from: "",
  sid: "new",
  title: "What a term states",
  text: "A term only introduces an entity. What the system does is stated in rules.",
  reason: "Behaviour held in a term applies in every rule that uses the word, yet none of them states it. Whoever reads such a rule does not see what it requires.",
  ruTitle: "Что говорит термин",
  ruText: "Термин только вводит сущность. То, что делает система, описывают правила.",
  ruReason: "Поведение, записанное в термине, действует в каждом правиле, которое использует это слово, но ни одно из них его не описывает. Тот, кто читает такое правило, не видит, чего оно требует.",
  changes: ["Новый узел, по вашему решению: термин только вводит сущность, а поведение стоит в правилах. Формулировка прошла рецензента."],
  sidValue: draw(),
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "3.2") out["3.3"] = node;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const lines = fs.readFileSync(page, "utf8").split("\n");
const at = lines.findIndex(l => l.trim().startsWith('["3.2",'));
if (at < 0) throw new Error("no row of 3.2");
lines.splice(at + 1, 0, "      " + JSON.stringify(["3.3", "new", 0, "", node.title, node.ruTitle, "", "", ["3.2", "3.4", "10.5"], ""]) + ",");
fs.writeFileSync(page, lines.join("\n"));
console.log("3.3", node.sidValue);
