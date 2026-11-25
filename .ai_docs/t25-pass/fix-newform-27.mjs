// The owner's ruling of 2026-11-08: the paragraph on tests of 1.5.2 moves to a new node 1.4.2, and with
// it the sentence of 1.4.1 on a test's reference to its rule. 1.5.2 is then about symbols only.
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const page = new URL("base-structure.html", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["1.4.2"]) throw new Error("1.4.2 is there already");

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

const cut = (n, k, tail) => {
  if (!n[k].endsWith(tail)) throw new Error("no match at the end of " + k + ": " + tail.slice(0, 40));
  n[k] = n[k].slice(0, -tail.length);
};

// 1.4.1 gives up its sentence on the reference, and the reason's sentence that held it up.
const a = d["1.4.1"];
cut(a, "text", " The test must contain a reference to the rule.");
cut(a, "ruText", " Тест обязан содержать ссылку на правило.");
cut(a, "reason", " A test without a reference to its rule tests something nobody can name.");
cut(a, "ruReason", " Тест без ссылки на своё правило проверяет то, что никто не может назвать.");
a.changes = a.changes.filter(c => !c.startsWith("Третья фраза") && !c.startsWith("Вторая фраза обоснования"));
a.changes.splice(2, 0, "Фраза о ссылке теста на правило перенесена в 1.4.2, по вашему решению.");

// 1.5.2 keeps the symbols.
const b = d["1.5.2"];
const [enText, testsEn] = b.text.split("\n\n");
const [ruText, testsRu] = b.ruText.split("\n\n");
if (!testsEn.startsWith("Every test carries") || !testsRu.startsWith("Каждый тест связан")) throw new Error("no paragraph on tests");
b.text = enText;
b.ruText = ruText;
const [r1, r2, r3] = b.reason.split("\n\n");
const [q1, q2, q3] = b.ruReason.split("\n\n");
if (!r2.startsWith("A test names") || !r3.startsWith("A term whose") || !q2.startsWith("Тест называет") || !q3.startsWith("Термин, определение")) throw new Error("no reason on tests");
b.reason = r1;
b.ruReason = q1;
b.changes = b.changes.map(c =>
  c.startsWith("Текст — абзац 1") ? c.replace(" и первая фраза абзаца 2 нынешнего 3.4", "") :
  c.startsWith("Обоснование собрано") || c.startsWith("Обоснование —") ? "Обоснование — абзац 1 обоснования 3.5, дословно." : c);
b.changes.push("Абзац о тестах и его обоснование перенесены в 1.4.2, по вашему решению.");

// 10.6 cited 1.5.2 for that paragraph.
const c = d["10.6"];
for (const k of ["text", "ruText"]) {
  if (c[k].split("§s-kgbzk2ph9e6jfb4").length !== 2) throw new Error("no citation in 10.6 " + k);
  c[k] = c[k].replace("§s-kgbzk2ph9e6jfb4", "§" + SID);
}
c.changes.push("Ссылка на абзац о тестах теперь ведёт в 1.4.2, куда он перенесён.");

const node = {
  from: "",
  sid: "new",
  title: "Every test has a SpecTag",
  text: "The test must contain a reference to the rule. " + testsEn,
  reason: [r2, r3].join("\n\n"),
  ruTitle: "У каждого теста есть SpecTag",
  ruText: "Тест обязан содержать ссылку на правило. " + testsRu,
  ruReason: [q2, q3].join("\n\n"),
  changes: [
    "Новый узел, по вашему решению.",
    "Заголовок — по образцу вашего заголовка 1.5.2.",
    "Текст — фраза о ссылке из 1.4.1 и абзац о тестах из 1.5.2, дословно.",
    "Обоснование — абзацы о тестах из обоснования 1.5.2, дословно. Фраза обоснования 1.4.1 о ссылке не перенесена: то же говорит последняя фраза первого абзаца.",
  ],
  sidValue: SID,
};

const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "1.4.1") out["1.4.2"] = node;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const lines = fs.readFileSync(page, "utf8").split("\n");
const at = lines.findIndex(l => l.trim().startsWith('["1.4.1",'));
if (at < 0) throw new Error("no row of 1.4.1");
const row = ["1.4.2", "new", 1, "", node.title, node.ruTitle, "", "Новая заповедь, по вашему решению: тест ссылается на своё правило.", ["1.4.1", "10.4", "10.6"], ""];
lines.splice(at + 1, 0, "      " + JSON.stringify(row) + ",");
fs.writeFileSync(page, lines.join("\n"));
console.log("1.4.2", SID);
