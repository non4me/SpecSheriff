// The owner's ruling of 2026-11-08: the subsection 1.3 is "Approval status" («Статус одобрения»), four
// nodes in this order: the status, what a draft means, when the status is approved, and the agreed
// node "Only its owners approve a node", which moves to 1.3.4 with its wording. The former 1.3.2 goes,
// its sid and its content passing to the node on a draft. Each condition is stated once.
import fs from "node:fs";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const page = new URL("base-structure.html", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["1.3.2"].sidValue !== "s-utvqbypzhmgndug") throw new Error("1.3.2 is not the former 1.8");
if (d["1.3.1"].sidValue !== "s-67vekyup7y8smap") throw new Error("1.3.1 is not the node on who approves");

// Two new sids, drawn from the alphabet the specification uses, unique under specs/ and in the drafts.
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

// 1.3.1 becomes 1.3.4: the draft's key, and every mention in the lists of changes and on the page.
const mention = s => s.replace(/(?<![0-9.])1\.3\.1(?![0-9]|\.[0-9])/g, "1.3.4");
const out = {};
for (const [k, v] of Object.entries(d)) {
  v.changes = v.changes.map(mention);
  out[k === "1.3.1" ? "1.3.4" : k] = v;
}

const SPEC_5_2 = "§s-kkbqcb9xrpaepwn", SPEC_5_3 = "§s-xhcmchcngykvn2k", SPEC_APPROVED = "§s-qzthyh7yqvfhsa2", SECTION = "§s-9kfdycuq34beqvs", NODE_STATUS = "§s-5ah25f6gy99panq";

out["1.3.1"] = {
  from: "",
  sid: "new",
  title: "The approval status",
  text: "The approval status is `draft` or `approved`. The specification as a whole, a section or a domain, and a rule each have one.",
  reason: "It tells whoever works on the specification what its owners have agreed to and what still waits for them.",
  ruTitle: "Статус одобрения",
  ruText: "Статус одобрения — это `draft` или `approved`. Он есть у всей спецификации, у раздела или домена и у правила.",
  ruReason: "Он говорит тому, кто работает со спецификацией, с чем её ответственные согласились и что ещё их ждёт.",
  changes: ["Новый узел, по вашему решению: сначала вводится статус одобрения и то, у чего он бывает.", "Название подраздела и этого узла — ваше."],
  sidValue: draw(),
};

const former = out["1.3.2"];
out["1.3.2"] = {
  from: "1.8",
  sid: "kept",
  title: "What a draft means",
  text: `The specification, a section, a domain or a rule that is not approved at present is a draft. What that means depends on what is a draft:\n\n- While the specification as a whole is a draft, code and tests a commit leaves alone may name no rule (${SPEC_5_2}). A push runs no test (${SPEC_5_3}). No other check is relaxed.\n- A section or a domain that is a draft only shows that a rule in it waits for approval.\n- A draft rule is not implemented: no code or test is written or changed for it. Where the implementation finds an approved rule silent or wrong, that rule is changed and put to its owners when the problem is found, not later.`,
  reason: "While the specification is a draft, the work is above all on the specification, the code and the tests secondary in it. Only what a commit leaves alone is relieved.\n\nThe status of a section or a domain shows at a glance which parts of the specification wait for their owners.\n\nThe specification is expected to be incomplete. Implementing a draft rule fills its gap with a guess made in the code, which the specification then does not hold. Changing the rule at once keeps the answer in the specification.",
  ruTitle: "Что значит черновик",
  ruText: `Спецификация, раздел, домен или правило, которые сейчас не одобрены, — черновик. Что это значит, зависит от того, что именно черновик:\n\n- Пока вся спецификация — черновик, код и тесты, которых коммит не касается, могут не называть правила (${SPEC_5_2}). Push не запускает тестов (${SPEC_5_3}). Другие проверки не смягчаются.\n- Раздел или домен-черновик лишь показывает, что какое-то правило в нём ждёт одобрения.\n- Правило-черновик не реализуется: для него не пишут и не меняют ни код, ни тесты. Если при реализации обнаруживается, что одобренное правило молчит или ошибается, это правило меняют и передают его ответственным тогда, когда проблема найдена, а не позже.`,
  ruReason: "Пока спецификация — черновик, работа идёт прежде всего над спецификацией, а код и тесты в ней второстепенны. Послабление касается только того, чего коммит не трогает.\n\nСтатус раздела или домена сразу показывает, какие части спецификации ждут своих ответственных.\n\nПредполагается, что спецификация неполна. Реализация правила-черновика заполняет его пробел догадкой, сделанной в коде, которой затем нет в спецификации. Немедленное изменение правила сохраняет ответ в спецификации.",
  changes: [
    "Заменяет прежний 1.3.2 «A draft node is not implemented» (нынешний 1.8), по вашему решению. Сохраняет его sid: на него указывают ссылки и тесты.",
    "Из 1.8 пришло: «A node is implemented only once it is approved» — теперь о правиле: «A draft rule is not implemented: no code or test is written or changed for it». Фраза о неполном правиле тоже из 1.8: «reviewed» заменено на «put to its owners», потому что «reviewed» читается как ревью кода, и добавлено «approved».",
    "Пункт о спецификации — общая формулировка правил 12.2 и 12.3. Пункт о разделе или домене — общая формулировка 9.3.",
    "Обоснование: абзац о спецификации — из обоснований 12.2 и 12.3, абзац о разделе и домене — из обоснования 9.3, абзац о правиле — обоснование 1.8, где «node» заменено на «rule», а «Reviewing» на «Changing».",
  ],
  sidValue: former.sidValue,
};

out["1.3.3"] = {
  from: "",
  sid: "new",
  title: "When the status is approved",
  text: `What makes the status approved depends on what holds it:\n\n- The specification as a whole is approved while the rule that approves it is approved (${SPEC_APPROVED}). Its other rules do not bear on this.\n- A section or a domain is approved while every rule in it is approved (${SECTION}). Nobody approves it as such.\n- A rule is approved while an approval stands for its present wording (${NODE_STATUS}). Any change to that wording makes it a draft again.`,
  reason: "Whether the specification is approved decides how strictly the checks hold its code and tests. So its owners decide it, by one rule, and not by how many rules are approved.\n\nA section or a domain requires nothing of its own, so it leaves an owner nothing to agree to.\n\nAn approved status claims that one of a rule's owners agreed to what it now states. A status that survived a rewrite would certify words nobody approved.",
  ruTitle: "Когда статус — одобрено",
  ruText: `От чего статус становится одобренным, зависит от того, у чего он:\n\n- Вся спецификация одобрена, пока одобрено правило, которое её одобряет (${SPEC_APPROVED}). Другие её правила на это не влияют.\n- Раздел или домен одобрен, пока одобрено каждое правило в нём (${SECTION}). Сам по себе он никем не одобряется.\n- Правило одобрено, пока в силе одобрение его нынешней формулировки (${NODE_STATUS}). Любое изменение этой формулировки снова делает его черновиком.`,
  ruReason: "От того, одобрена ли спецификация, зависит, насколько строго проверки держат её код и тесты. Поэтому решают её ответственные, одним правилом, а не тем, сколько правил одобрено.\n\nРаздел или домен сам ничего не требует, поэтому ответственному не с чем соглашаться.\n\nСтатус «одобрено» утверждает, что один из ответственных за правило согласился с тем, что оно теперь говорит. Статус, переживший переписывание, удостоверял бы слова, которых никто не одобрял.",
  changes: [
    "Новый узел, по вашему решению: всё, что связано с одобренным статусом.",
    "Условие для спецификации — общая формулировка 12.4, для раздела или домена — 9.3, для правила — 9.1.",
    "Обоснование собрано из обоснований 12.4, 9.3 и 9.1. В первом абзаце добавлено «by one rule, and not by how many rules are approved».",
  ],
  sidValue: draw(),
};
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

// The page: the subsection's heading, then its four rows in order.
const lines = fs.readFileSync(page, "utf8").split("\n");
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (t.startsWith('["1.3.1",') || t.startsWith('["1.3.2",')) continue;
  if (!/^\["[0-9.]+","(split|part|move|same|new)"/.test(t)) continue;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  if (Array.isArray(row[8])) row[8] = row[8].map(x => (x === "1.3.1" ? "1.3.4" : x));
  for (const k of [6, 7]) if (typeof row[k] === "string") row[k] = mention(row[k]);
  lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
}
const head = lines.findIndex(l => l.includes('n: "1.3", en: "Approval"'));
if (head < 0) throw new Error("no heading of 1.3");
lines[head] = lines[head].replace('en: "Approval", ru: "Одобрение", purpose: "Кто одобряет правило и что ждёт одобрения."', 'en: "Approval status", ru: "Статус одобрения", purpose: "Что такое статус одобрения и кто его меняет."');
if (lines[head].includes('"Approval",')) throw new Error("the heading of 1.3 was not rewritten");
const a = lines.findIndex(l => l.trim().startsWith('["1.3.1",'));
const b = lines.findIndex(l => l.trim().startsWith('["1.3.2",'));
if (b !== a + 1) throw new Error("the rows of 1.3 are not adjacent");
const oldA = JSON.parse(lines[a].trim().replace(/,$/, ""));
oldA[0] = "1.3.4";
const rows = [
  ["1.3.1", "new", 1, "", "The approval status", "Статус одобрения", "", "Новая заповедь, по вашему решению: сначала вводится статус одобрения.", ["1.3.2", "1.3.3", "9.1", "9.3", "12.4"], ""],
  ["1.3.2", "split", 1, "1.8", "What a draft means", "Что значит черновик", "", "Заменяет прежний узел о черновике, с его sid. Проверка домена целиком до реализации уходит в 10.2.", ["10.2", "12.2", "12.3"], ""],
  ["1.3.3", "new", 1, "", "When the status is approved", "Когда статус — одобрено", "", "Новая заповедь, по вашему решению: всё, что связано с одобренным статусом.", ["1.3.4", "9.1", "9.3", "12.4"], ""],
  oldA,
];
lines.splice(a, 2, ...rows.map(r => "      " + JSON.stringify(r) + ","));
fs.writeFileSync(page, lines.join("\n"));

execFileSync(process.execPath, [fileURLToPath(new URL("apply-newform.mjs", here))], { stdio: "ignore" });
console.log("1.3.1", out["1.3.1"].sidValue, "| 1.3.2", out["1.3.2"].sidValue, "| 1.3.3", out["1.3.3"].sidValue, "| 1.3.4", out["1.3.4"].sidValue);
