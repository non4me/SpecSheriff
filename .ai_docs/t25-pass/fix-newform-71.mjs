// The owner's comments of 2026-11-09, in the reviewed wording. Section 6 opens with what a link is; 6.1 and 6.2 follow it. The
// node on the archive moves from section 10 into section 2 and opens with what the archive is.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const present = {};
(function walk(ns) { for (const n of ns) { present[n.location.replace("_guidelines/spec/", "")] = n; if (n.children) walk(n.children); } })(spec.nodes);

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
const parse = t => JSON.parse(t.endsWith(",") ? t.slice(0, -1) : t);
const sectionTen = lines.map(l => l.trim()).filter(isRow).map(parse).map(r => r[0]).filter(n => /^10\.\d+$/.test(n)).map(n => Number(n.split(".")[1]));
const map = { "6.3": "6.1", "6.1": "6.2", "6.2": "6.3", "10.5": "2.5" };
for (const k of sectionTen) if (k > 5) map[`10.${k}`] = `10.${k - 1}`;
const renum = s => map[s] ?? s;

const titles = {
  "6.1": ["What a link is", "Что такое связь"],
  "2.5": ["The archive", "Архив"],
};
const out = [];
let archive;
const sixth = [];
for (const line of lines) {
  const t = line.trim();
  if (!isRow(t)) { out.push(line); continue; }
  const comma = t.endsWith(",");
  const row = parse(t);
  const from = row[0];
  row[0] = renum(from);
  if (Array.isArray(row[8])) row[8] = row[8].map(renum);
  if (titles[row[0]]) [row[4], row[5]] = titles[row[0]];
  if (from === "10.5") { archive = row; continue; }
  if (/^6\.[123]$/.test(from)) { sixth.push({ row, at: out.length }); out.push(null); continue; }
  out.push(line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : ""));
}
sixth.sort((a, b) => a.at - b.at);
const ordered = [...sixth.map(s => s.row)].sort((a, b) => a[0].localeCompare(b[0]));
sixth.forEach((s, i) => { out[s.at] = "      " + JSON.stringify(ordered[i]) + ","; });
// The section may close after its third row, where a trailing comma was absent before.
const lastSix = sixth[sixth.length - 1].at;
if (/^\s*\]\},?\s*$/.test(out[lastSix + 1] ?? "")) out[lastSix] = out[lastSix].replace(/,\s*$/, "");

const row24 = out.findIndex(l => l && l.trim().startsWith('["2.4",'));
if (row24 < 0) throw new Error("no 2.4");
const closes = /^\s*\]\},?\s*$/.test(out[row24 + 1]);
out[row24] = out[row24].replace(/,?\s*$/, ",");
out.splice(row24 + 1, 0, "      " + JSON.stringify(archive) + (closes ? "" : ","));
fs.writeFileSync(pagePath, out.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const next = {};
for (const [k, v] of Object.entries(d)) next[renum(k)] = v;
const types = "- `implements` — the linking node is how the linked one is carried out.\n- `refines` — the linking node states the linked node more precisely, or for a narrower case.\n- `constrains` — the linking node holds a condition the linked rule depends on.\n- `supersedes` — the linking node replaces the linked node, which is archived.\n- `exempts` — a node of the project's own guidelines takes out of the rule that it is implemented (§s-6fw72j65jkqrfpf), for the reason its text gives, the linked rule or node of a project's own NodeKind (§s-vsh384ybt4w25a2), or every such node under the linked section.\n- `cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two bear on each other. So it holds no link of another type to it.\n- `term-relation` — the linking term and the linked term are bound, for as long as both exist, in the ratio the link carries.\n- `uses` — what the linking term names makes use of what the linked term names while taking part in a process. For example, a user fills in a form while signing up. The link carries no ratio. A term that only starts a process, as an operator starting an export, uses nothing the process uses.";
const ruTypes = "- `implements` — связывающий узел показывает, как выполняется связанный.\n- `refines` — связывающий узел говорит о связанном точнее или для более узкого случая.\n- `constrains` — связывающий узел содержит условие, от которого зависит связанное правило.\n- `supersedes` — связывающий узел заменяет связанный, который уходит в архив.\n- `exempts` — узел собственных guidelines проекта выводит из-под правила о том, что узел реализован (§s-6fw72j65jkqrfpf), по причине, указанной в его тексте, связанное правило или узел собственного NodeKind проекта (§s-vsh384ybt4w25a2) либо все такие узлы под связанным разделом.\n- `cites` — связывающий узел ссылается на связанный (§s-cxtt6jvhqcey2k9), и никакой другой тип не говорит, как эти два узла соотносятся. Поэтому у него нет связи другого типа с этим узлом.\n- `term-relation` — связывающий термин и связанный термин соединены, пока существуют оба, в соотношении, которое указывает связь.\n- `uses` — то, что называет связывающий термин, пользуется тем, что называет связанный термин, участвуя в процессе. Например, пользователь заполняет форму при регистрации. У связи нет соотношения. Термин, который только запускает процесс, как оператор, запускающий экспорт, не использует ничего из того, что использует процесс.";
next["6.1"] = {
  from: "2.2", sid: "kept", title: "What a link is", ruTitle: "Что такое связь",
  text: "A link is a directed relation from one node to another. Every link names what it means by a type. The types of link are:\n" + types + "\n\nAn extension of the guidelines may define further types of link.\n\nA `term-relation` link and a `uses` link bind two terms. No other type does, `cites` included: a term citing another term holds a `term-relation` or a `uses` link to it.\n\nA ratio is the multiplicity of each end in the usual notation: 1, 0..1, 1..N or 0..N. The linking term's end comes first. For example, user 1:0..N session says that a user has any number of sessions and that a session belongs to exactly one user. Read from the linked term, the ratio is reversed.",
  reason: "A link without a type records only that somebody thought of two nodes together. No check can grade it. No diagram can draw it. A type named without its meaning is the same guess one step later.",
  ruText: "Связь — это направленное отношение одного узла к другому. Каждая связь называет, что она означает, своим типом. Типы связей такие:\n" + ruTypes + "\n\nРасширение guidelines может определять дополнительные типы связей.\n\nСвязи `term-relation` и `uses` соединяют два термина. Никакой другой тип этого не делает, включая `cites`: термин, ссылающийся на другой термин, содержит связь `term-relation` или `uses` с ним.\n\nСоотношение — это кратность каждого конца в обычной записи: 1, 0..1, 1..N или 0..N. Сначала идёт конец связывающего термина. Например, user 1:0..N session означает, что у пользователя может быть любое число сессий, а сессия принадлежит ровно одному пользователю. При чтении со стороны связанного термина соотношение обратное.",
  ruReason: "Связь без типа лишь фиксирует, что кто-то подумал о двух узлах вместе. Ни одна проверка не может её оценить. Ни одна диаграмма не может её нарисовать. Тип, названный без значения, — та же догадка на шаг дальше.",
  changes: ["По вашему замечанию этот узел теперь первый в разделе и начинается с определения связи. Тип `consumes` уходит в расширение. Обоснование сокращено. Формулировка прошла рецензента."],
  sidValue: present["2.2"].sid,
};
next["2.5"] = {
  from: "1.9", sid: "kept", title: "The archive", ruTitle: "Архив",
  text: "The archive holds the nodes removed from the specification that an approval was ever given for. Such a node goes there together with the reason for its removal and the sid of the node that replaces it, if one does.\n\nA section is deleted outright, whatever cited it. So is a node no approval was ever given for.\n\nA node may later be deleted from the archive.",
  reason: "A rule one of its owners approved is one the code may implement, so it is kept for a time in its last wording and can be restored. An archived rule also records a logic or an approach that was mistaken, which later work has to take into account. A node no approval was ever given for was never implemented, so archived it would only bury the rules that had to go. A section requires nothing, so no code was implemented from it.\n\nNothing guarantees how long the archive keeps a node. So a link or a citation naming an archived node breaks when the node is deleted, and the checks refuse it until it is removed.",
  ruText: "Архив содержит узлы, удалённые из спецификации, на которые когда-либо давали одобрение. Такой узел попадает туда вместе с причиной удаления и sid узла, который его заменяет, если такой есть.\n\nРаздел удаляется окончательно, что бы на него ни ссылалось. Так же удаляется узел, на который никогда не давали одобрения.\n\nПозже узел можно удалить и из архива.",
  ruReason: "Правило, одобренное одним из его ответственных, код может реализовать, поэтому оно какое-то время хранится в последней формулировке и его можно восстановить. Архивное правило также фиксирует логику или подход, оказавшиеся ошибочными, и это нужно учитывать в дальнейшей работе. Узел, на который никогда не давали одобрения, никогда не реализовывался, поэтому в архиве он только заслонял бы правила, которые пришлось убрать. Раздел ничего не требует, поэтому код по нему не реализован.\n\nНичто не гарантирует, как долго архив хранит узел. Поэтому связь или ссылка, называющая архивный узел, ломается, когда узел удаляется, и проверки отклоняют её, пока её не уберут.",
  changes: ["По вашему замечанию узел перенесён в раздел 2 и начинается с того, что такое архив. Заголовок домена убран. Обоснование сокращено. Формулировка прошла рецензента."],
  sidValue: present["1.9"].sid,
};
fs.writeFileSync(draftsPath, JSON.stringify(next, null, 2) + "\n");
console.log("section 6 keys:", Object.keys(next).filter(k => k.startsWith("6.")).join(" "), "| section 2:", Object.keys(next).filter(k => k.startsWith("2.")).join(" "), "| 10:", Object.keys(next).filter(k => k.startsWith("10.")).join(" "));
