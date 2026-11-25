// The reviewer's report on section 8 (review-8-10.md). The node on a section splits: the requirement that a section is never empty
// stands on its own. The order runs section, its emptiness, NodeKind, location. Location loses what belongs to the extension on domains.
import fs from "node:fs";
import crypto from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

const everything = JSON.stringify(d) + fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8") + fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8");
const A = "23456789abcdefghjkmnpqrstuvwxyz";
let SID;
do { SID = "s-" + Array.from(crypto.randomBytes(15), b => A[b % A.length]).join(""); } while (everything.includes(SID));

const section = d["8.1"], location = d["8.2"];
if (section.sidValue !== "s-7445ahgjck2aefg" || location.sidValue !== "s-kag2m9tzdnduxdx" || d["8.3"] || d["8.4"]) throw new Error("unexpected drafts");

section.text = "A section is a container of rules. Its text states what the section is responsible for. The text requires nothing, since every requirement is a rule.";
section.ruText = "Раздел — это контейнер правил. Его текст говорит, за что раздел отвечает. Текст ничего не требует, поскольку каждое требование — это правило.";
section.reason = "A requirement written into a section's text is a rule nobody can cite, name in a SpecTag or check on its own.";
section.ruReason = "Требование, записанное в текст раздела, — это правило, на которое никто не может сослаться, которое нельзя назвать в SpecTag и нельзя проверить отдельно.";
section.changes = [
  "Заголовок: «A section holds rules» — вторая половина нынешнего заголовка 1.3, «and requires nothing» — новые слова из его текста.",
  "Текст — абзац 2 нынешнего 1.3. Требование, что раздел не бывает пустым, вынесено в 8.2.",
  "Абзац об удалении раздела убран: об этом говорит согласованный 2.5, а связь на несуществующий узел отклоняет проверка.",
  "Обоснование сокращено до одной фразы. Второй абзац утверждал, что термин называют в SpecTag, а согласованный 3.3 и 11.5 говорят иное.",
  "Сохраняет sid 1.3.",
];
d["8.2"] = {
  from: "1.3", sid: "new", title: "A section is never empty", ruTitle: "Раздел не бывает пустым",
  text: "A section holds at least one node that is no section, directly or through the sections inside it.",
  reason: "A section with no such node states a responsibility nothing in the code answers to.",
  ruText: "Раздел содержит хотя бы один узел, не являющийся разделом: прямо или через разделы внутри него.",
  ruReason: "Раздел без такого узла заявляет ответственность, которой ничто в коде не отвечает.",
  changes: [
    "Новый узел: требование из нынешнего 1.3, которое выполняется отдельно. Считаются любые узлы, кроме разделов, поэтому термины и RecordType называть не нужно.",
    "Сюда перейдут узел tools.json 7.1.11 и решения нынешнего 1.3 от 2026-10-30 и 2026-11-04.",
  ],
  sidValue: SID,
};
d["8.3"] = {
  from: "1.23", sid: "kept", title: "Whether a project's own NodeKind needs code", ruTitle: "Нужен ли код узлам собственного NodeKind проекта",
  text: "The nodes of a project's own NodeKind need code unless the project's extension of the schema (§s-xm8rz4uupb73gu5) declares otherwise. Nodes that need code are implemented and tested as a rule is (§s-6fw72j65jkqrfpf, §s-rah8b37kytb682y).\n\nA rule of the project's own guidelines, refining this one, lists each such NodeKind with whether its nodes need code. Its `TextRule.list.declaredIn` names that extension. The check of lists compares the list with it (§s-jau82aq9juv9zzh).",
  reason: "Most NodeKinds a project adds are one more sort of requirement, so each is held to code unless declared otherwise. Listed in a rule of the project's own guidelines, a NodeKind that needs no code is approved by one of the specification's owners, as every exemption is (§s-6fw72j65jkqrfpf).",
  ruText: "Узлам собственного NodeKind проекта нужен код, если расширение схемы проекта (§s-xm8rz4uupb73gu5) не объявляет иное. Узлы, которым нужен код, реализуются и тестируются как правило (§s-6fw72j65jkqrfpf, §s-rah8b37kytb682y).\n\nПравило собственных guidelines проекта, уточняющее это правило, перечисляет каждый такой NodeKind и указывает, нужен ли его узлам код. Его `TextRule.list.declaredIn` называет это расширение. Проверка списков сравнивает с ним этот список (§s-jau82aq9juv9zzh).",
  ruReason: "Большинство NodeKind, которые добавляет проект, — это ещё один вид требований, поэтому каждому нужен код, если не объявлено иное. NodeKind, которому код не нужен, перечислен в правиле собственных guidelines проекта и потому одобрен одним из ответственных за спецификацию, как и всякое исключение (§s-6fw72j65jkqrfpf).",
  changes: [
    "Заголовок новый: о нумерации и подсчёте теперь говорят 8.1, 8.2 и узел о расположении, а о реализации — раздел 11.",
    "Текст оставляет только то, чего нет в других узлах: когда узлам нужен код и где это объявлено.",
    "Обоснование сокращено.",
    "Сохраняет sid 1.23. Тесты нумерации и подсчёта перейдут к узлам, которые об этом говорят.",
  ],
  sidValue: "s-vsh384ybt4w25a2",
};
location.title = "A node's location";
location.ruTitle = "Расположение узла";
location.text = "A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. A term takes no number. Its place is the term's name.\n\nThe node at the top of a file of the guidelines or of the technical appendix is located by the part's name and the file's. Each such file numbers its nodes under its top node's location.\n\nThe location is computed from where the node is and is never written by hand.";
location.ruText = "Расположение узла называет, где он находится в спецификации: часть, в которой он находится, а за ней его место в ней. Место узла — его номер среди узлов того же родителя. Термин номера не получает. Его место — имя термина.\n\nУзел на вершине файла guidelines или технического приложения располагается по имени части и имени файла. Каждый такой файл нумерует свои узлы под расположением своего верхнего узла.\n\nРасположение вычисляется из того, где узел находится, и никогда не пишется вручную.";
location.reason = "A location tells a reader where a node is. Computed, it can never disagree with where the node is.";
location.ruReason = "Расположение говорит читателю, где находится узел. Вычисляемое, оно никогда не расходится с тем, где узел находится.";
location.changes = [
  "Заголовок сокращён.",
  "Фраза, что по расположению никто не ссылается, убрана: это говорит согласованный 1.2.2, и узел tools.json 7.2.7 будет реализовывать его.",
  "То, как располагаются узлы домена и contracts, переходит в часть 14.",
  "Обоснование сокращено.",
  "Сохраняет sid 1.4.",
];
d["8.4"] = location;
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const map = { "8.2": "8.4", "8.3": "8.3", "8.4": "8.5" };
const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const eight = [];
lines.forEach((line, i) => {
  const t = line.trim();
  if (!isRow(t)) return;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  if (Array.isArray(row[8])) row[8] = row[8].map(x => map[x] ?? x);
  if (/^8\.\d+$/.test(row[0])) { row[0] = map[row[0]] ?? row[0]; eight.push({ i, row, comma, indent: line.slice(0, line.indexOf("[")) }); return; }
  lines[i] = line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
});
if (eight.length !== 4) throw new Error("section 8 holds " + eight.length + " rows");
const closes = eight[3].comma;
const indent = eight[0].indent;
const sorted = eight.map(s => s.row).concat([["8.2", "part", 0, "1.3", "part of 1.3: A section holds rules", "уходит сюда: Раздел не бывает пустым"]]).sort((a, b) => a[0].localeCompare(b[0]));
const first = eight[0].i;
lines.splice(first, 4, ...sorted.map((r, k) => indent + JSON.stringify(r) + (k === 4 ? (closes ? "," : "") : ",")));
fs.writeFileSync(pagePath, lines.join("\n"));
console.log("section 8:", sorted.map(r => r[0]).join(" "), "| new sid", SID);
