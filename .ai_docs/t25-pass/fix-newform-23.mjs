// The owner's ruling of 2026-11-08 on 1.2.6 (the present 6.12), which mixed three things:
// - 1.2.6 now says one: whoever implements the specification does only what its rules require;
// - the two sentences of its reason on prohibitions join the reason of 7.4, which already drops a
//   rule governing what nobody here controls;
// - the paragraph on exceptions, with the last sentence of the reason, becomes a node of its own in
//   section 7, 7.5 (room made by insert-node.mjs 7.5).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
let p612;
(function walk(ns) {
  for (const x of ns) {
    if (x.location.endsWith("/6.12")) p612 = x;
    if (x.children) walk(x.children);
  }
})(spec.nodes);
const ruP = {
  text: "Чего не требует ни одно правило, того не делают. Для этого не нужно правила, которое бы так говорило.\n\nЕсли слова правила охватывали бы и случай, которого они охватывать не должны, исключение записывают в само это правило, чтобы правило было точным там, где его читают.",
  reason: "Запрет, который не отвечает ни одному правилу, ничего не решает. Каждый написанный запрет внушает, что всё, чего он не называет, разрешено. Исключение, хранимое отдельно от правила, которое оно сужает, упускает тот, кто читает одно это правило.",
};
const sentences = s => s.split(/(?<=\.) (?=[A-ZА-ЯЁ])/);
const [rA, rB, rC] = sentences(p612.reason);
const [ruA, ruB, ruC] = sentences(ruP.reason);
const exceptionPara = p612.text.split("\n\n")[1];
const ruExceptionPara = ruP.text.split("\n\n")[1];

// 1.2.6
const n = d["1.2.6"];
if (n.from !== "6.12") throw new Error("1.2.6 is not from 6.12");
n.title = "Only what the rules require is done";
n.ruTitle = "Делается только то, что требуют правила";
n.text = "Whoever implements the specification, a person or an agent, does only what its rules require. Nothing beyond them is done: no behaviour, no structure and no change that no rule calls for.";
n.ruText = "Тот, кто реализует спецификацию, человек или агент, делает только то, что требуют её правила. Сверх них не делается ничего: ни поведения, ни структуры, ни изменения, которых не требует ни одно правило.";
n.reason = "Work beyond the rules is work nobody agreed to. Nothing in the specification checks it. It changes the system without its owners knowing.";
n.ruReason = "Работа сверх правил — работа, на которую никто не соглашался. Спецификация её не проверяет. Она меняет систему без ведома её owners.";
n.changes = [
  "Узел переписан целиком, вместе с заголовком, по вашему решению: он говорит одно — тот, кто реализует спецификацию, делает только то, что требуют её правила.",
  "Из нынешнего 6.12 уходят: две фразы обоснования о запретах — в обоснование 7.4; абзац об исключениях с последней фразой обоснования — в новый узел 7.5.",
  "Сохраняет sid 6.12.",
];
delete n.agreed;

// 7.4: the two sentences on prohibitions.
const s74 = d["7.4"];
if (!s74.reason.includes(rA)) {
  const [first, ...rest] = s74.reason.split("\n\n");
  s74.reason = [first, rA + " " + rB, ...rest].join("\n\n");
  const [rfirst, ...rrest] = s74.ruReason.split("\n\n");
  s74.ruReason = [rfirst, ruA + " " + ruB, ...rrest].join("\n\n");
  s74.changes.splice(3, 0, "В обоснование вторым абзацем добавлены две фразы нынешнего 6.12 о запретах, дословно, по вашему решению: «A prohibition that answers no rule decides nothing. Each one written suggests that whatever it does not name is allowed».");
}

// 7.5: the exception, a node of its own.
const fresh = {
  from: "6.12", sid: "new",
  title: "An exception is written into the rule it narrows",
  text: exceptionPara,
  reason: rC,
  ruTitle: "Исключение записывают в правило, которое оно сужает",
  ruText: ruExceptionPara,
  ruReason: ruC,
  changes: [
    "Новый узел, по вашему решению: правило об исключениях — о том, как пишется правило, и место ему в разделе 7.",
    "Заголовок новый.",
    "Текст — абзац 2 нынешнего 6.12, обоснование — последняя фраза его обоснования, дословно.",
    "Новый sid: нынешний sid 6.12 остаётся у 1.2.6.",
  ],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "7.6" && !out["7.5"]) out["7.5"] = fresh;
  out[k] = v;
}
if (!out["7.5"]) out["7.5"] = fresh;
fs.writeFileSync(path, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
const lines = fs.readFileSync(page, "utf8").split("\n");
if (!lines.some(l => l.trim().startsWith('["7.5",'))) {
  const i = lines.findIndex(l => l.trim().startsWith('["7.4",'));
  const indent = lines[i].slice(0, lines[i].indexOf("["));
  lines.splice(i + 1, 0, indent + JSON.stringify(["7.5", "part", 0, "6.12", "part of 6.12: What no rule requires is not done", "уходит сюда: Исключение записывают в правило, которое оно сужает"]) + ",");
}
fs.writeFileSync(page, lines.join("\n"));
console.log("1.2.6:", n.ruText, "\n7.4 reason:", s74.ruReason.split("\n\n").slice(0, 2).join(" / "), "\n7.5:", fresh.ruText, "|", fresh.ruReason);
