// Agreed 6.1, its entry for `exempts` (2026-11-11): cut to what the link means, citing agreed 9.7, which now holds
// the rule whole (a restatement removed while its content stays in its home), and "rule or node of a project's own
// kind" brought to the owner's ruling of the day that a node is the form a rule is kept in. Its "for the reason its
// text gives" collided with a node's reason, the field. The node changes, so it is checked whole before it is reported.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["6.1"];
if (b.sidValue !== "s-sn6au3vcr9uy5pm") throw new Error("unexpected 6.1");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "- `exempts` — a node of the project's own guidelines takes out of the rule that it is implemented (§s-6fw72j65jkqrfpf), for the reason its text gives, the linked rule or node of a project's own kind (§s-vsh384ybt4w25a2), or every such node under the linked section.", "- `exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).");
swap("ruText", "- `exempts` — узел собственных guidelines проекта выводит из-под правила о том, что узел реализован (§s-6fw72j65jkqrfpf), по причине, указанной в его тексте, связанное правило или узел собственного типа в проекте (§s-vsh384ybt4w25a2) либо все такие узлы под связанным разделом.", "- `exempts` — связывающий узел освобождает от реализации связанное правило или каждое правило под связанным разделом (§s-gf6n8ge4mke3pr2).");
b.changes.push("11 ноября: строка о `exempts` сокращена до того, что значит связь, со ссылкой на согласованный 9.7, где правило освобождения стоит целиком; «правило или узел собственного типа» стало «правило», по вашему решению того же дня. При переносе 6.1 теряет связи cites на s-6fw72j65jkqrfpf и s-vsh384ybt4w25a2 и получает cites на s-gf6n8ge4mke3pr2.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok", b.agreed);
