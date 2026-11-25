// The owner's ruling of 2026-11-08: a term only introduces an entity, all behaviour stands in rules, and
// 1.4.2 holds only their sentence. What a test's SpecTag may name goes to a detail node of its own, 10.5,
// beside 10.4, since it can be carried out without the rest of what is now 10.7.
import fs from "node:fs";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const page = new URL("base-structure.html", here);
const before = JSON.parse(fs.readFileSync(file, "utf8"));
if (before["1.4.2"].title !== "Every test has a SpecTag") throw new Error("1.4.2 is not as expected");
if (before["10.6"].sidValue !== "s-9j2mmnuuwmx5ksn") throw new Error("10.6 is not as expected");

execFileSync(process.execPath, [fileURLToPath(new URL("insert-node.mjs", here)), "10.5"], { stdio: "inherit" });

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
const SID = draw();

const n = d["1.4.2"];
n.title = "A test's reference to its rule";
n.ruTitle = "Ссылка теста на своё правило";
n.text = "A test must contain a reference to a rule of the specification.";
n.ruText = "Тест обязан содержать ссылку на правило спецификации.";
n.reason = "A test without a reference to its rule tests something nobody can name. A test names a rule's behaviour, which survives the refactoring that moves and renames the code underneath it. So a test's reference to its rule is stable.";
n.ruReason = "Тест без ссылки на своё правило проверяет то, что никто не может назвать. Тест называет поведение правила, а оно переживает рефакторинг, который переносит и переименовывает код под ним. Поэтому ссылка теста на правило устойчива.";
n.changes = [
  "Новый узел, по вашему решению.",
  "Текст — ваш.",
  "Заголовок новый, прошёл рецензента.",
  "Обоснование — фразы из обоснований 1.4.1 и 1.5.2. Рецензент поставил довод первым и заменил «the binding through tests» на «a test's reference to its rule»: SpecTag и связь вводятся позже.",
  "Какой узел называет SpecTag теста, сказано в 10.5.",
];

const citing = d["10.7"];
if (citing.sidValue !== "s-9j2mmnuuwmx5ksn") throw new Error("10.7 is not the former 10.6");
for (const k of ["text", "ruText"]) {
  if (citing[k].split("§s-nrjxfvpkq3m8hzm").length !== 2) throw new Error("no citation in 10.7 " + k);
  citing[k] = citing[k].replace("§s-nrjxfvpkq3m8hzm", "§" + SID);
}
citing.changes = citing.changes.map(c => (c.startsWith("Ссылка на абзац о тестах") ? "Ссылка о SpecTag теста теперь ведёт в 10.5, куда перенесён этот абзац." : c));

const node = {
  from: "",
  sid: "new",
  title: "What a test's SpecTag names",
  text: "Every test carries the SpecTag of the node it is written from. That node is a rule or a node of a project's own NodeKind (§s-vsh384ybt4w25a2).",
  reason: "A test verifies that the code carries out what a node requires. A term only introduces an entity, so it holds no behaviour to verify. A section and a domain's header require nothing (§s-ef93u6cnbs2sevr). The code generated from a RecordType owes no test (§s-qxpqtnbgmydusx2).",
  ruTitle: "Что называет SpecTag теста",
  ruText: "Каждый тест связан SpecTag с узлом, из которого он написан. Этот узел — правило или узел собственного NodeKind проекта (§s-vsh384ybt4w25a2).",
  ruReason: "Тест проверяет, что код выполняет то, что требует узел. Термин только вводит сущность, поэтому в нём нет поведения, которое можно проверить. Раздел и заголовок домена ничего не требуют (§s-ef93u6cnbs2sevr). Код, сгенерированный из RecordType, теста не требует (§s-qxpqtnbgmydusx2).",
  changes: [
    "Новый узел: требование из абзаца о тестах нынешнего 3.4, вынесенное из заповеди 1.4.2.",
    "По вашему решению термин из перечисления убран: термин только вводит сущность.",
    "Обоснование новое, у каждого исключённого вида узла своя причина. Прошло рецензента.",
  ],
  sidValue: SID,
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "10.4") out["10.5"] = node;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const lines = fs.readFileSync(page, "utf8").split("\n");
const at = lines.findIndex(l => l.trim().startsWith('["10.4",'));
if (at < 0) throw new Error("no row of 10.4");
lines.splice(at + 1, 0, "      " + JSON.stringify(["10.5", "new", 0, "", node.title, node.ruTitle, "", "", ["1.4.2", "10.4", "10.7"], ""]) + ",");
const rel = lines.findIndex(l => l.trim().startsWith('["1.4.2",'));
const comma = lines[rel].trim().endsWith(",");
const row = JSON.parse(lines[rel].trim().replace(/,$/, ""));
row[4] = n.title; row[5] = n.ruTitle; row[8] = ["1.4.1", "10.4", "10.5"];
lines[rel] = "      " + JSON.stringify(row) + (comma ? "," : "");
fs.writeFileSync(page, lines.join("\n"));
console.log("10.5", SID);
