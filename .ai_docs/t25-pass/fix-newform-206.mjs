// The owner of 2026-11-11: code implements rules, and a node is the form a rule is kept in, so a node of a
// project's own kind that requires an implementation in code is a rule of that kind. 9.7 and agreed 9.2 stop
// setting "node" beside "rule": "a rule of a project's own kind". 9.2 is changed at the owner's word, so its
// agreement comes off and it is checked whole.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const seven = d["9.7"], two = d["9.2"];
if (seven.sidValue !== "s-gf6n8ge4mke3pr2" || seven.agreed) throw new Error("unexpected 9.7");
if (two.sidValue !== "s-6fw72j65jkqrfpf") throw new Error("unexpected 9.2");

const swap = (b, field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${b.sidValue} ${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};

swap(seven, "text", "exempts a rule, or a node of a project's own kind, from being implemented.", "exempts a rule from being implemented, a rule of a project's own kind included.");
swap(seven, "text", "- that rule or node;\n- a section it is under, at any depth.", "- that rule;\n- a section the rule is under, at any depth.");
swap(seven, "text", "cites each rule, node or section it exempts.", "cites each rule or section it exempts.");
swap(seven, "ruText", "освобождает от реализации правило или узел собственного типа в проекте.", "освобождает от реализации правило, в том числе правило собственного типа в проекте.");
swap(seven, "ruText", "- к этому правилу или узлу;\n- к разделу, в который входит это правило или узел, на любом уровне вложенности.", "- к этому правилу;\n- к разделу, в который входит это правило, на любом уровне вложенности.");
swap(seven, "ruText", "ссылается на каждое правило, узел или раздел, которые он освобождает.", "ссылается на каждое правило или раздел, которые он освобождает.");
seven.changes.push("По вашему решению узел не ставится рядом с правилом: код реализует правило, а узел — форма, в которой правило хранится. «A rule, or a node of a project's own kind» стало «a rule …, a rule of a project's own kind included»; «that rule or node» — «that rule»; «each rule, node or section» — «each rule or section».");

delete two.agreed;
swap(two, "text", "The same holds for every approved node of a project's own kind that requires an implementation in code (§s-vsh384ybt4w25a2). Such a rule or node counts as implemented", "The same holds for every approved rule of a project's own kind that requires an implementation in code (§s-vsh384ybt4w25a2). Such a rule counts as implemented");
swap(two, "text", "naming a rule that implements such a rule or node counts for it. Such a rule or node may also be implemented", "naming a rule that implements such a rule counts for it. Such a rule may also be implemented");
swap(two, "text", "- a rule or node exempted from being implemented", "- a rule exempted from being implemented");
swap(two, "ruText", "То же самое распространяется и на каждый одобренный узел собственного типа в проекте, которому требуется имплементация кода (§s-vsh384ybt4w25a2). Такое правило или узел считаются реализованными", "То же самое распространяется и на каждое одобренное правило собственного типа в проекте, которому требуется имплементация кода (§s-vsh384ybt4w25a2). Такое правило считается реализованным");
swap(two, "ruText", "называющие правило, которое реализует такое правило или узел, засчитываются ему. Правило или такой узел также могут быть реализованы через цепочку правил, связанных с ними связями `implements`.", "называющие правило, которое реализует такое правило, засчитываются ему. Такое правило также может быть реализовано через цепочку правил, связанных с ним связями `implements`.");
swap(two, "ruText", "- правило или узел, освобождённые от реализации", "- правило, освобождённое от реализации");
two.changes.push("По вашему решению от 11 ноября узел не ставится рядом с правилом: «every approved node of a project's own kind» стало «every approved rule of a project's own kind», «such a rule or node» — «such a rule», «a rule or node exempted» — «a rule exempted». По-русски «узел собственного типа» стало «правило собственного типа», «правило или такой узел» — «такое правило». Остальное не менялось.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(seven.text + "\n===\n" + two.text);
