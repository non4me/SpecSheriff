// The fresh reviewer of the changed 9.7 (2026-11-11): its reason paired with the text and never said why the
// text must cite what it exempts (✗ 7.14, ✗ pairing); its wording fix grounds the rule as a whole from 1.3.4
// and 1.3.5. A `cites` link to s-5ah25f6gy99panq goes with it at the move.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.7"];
if (b.sidValue !== "s-gf6n8ge4mke3pr2" || b.agreed) throw new Error("unexpected 9.7");

b.reason = "A rule the system's code cannot carry out, or that no test can verify, would be reported for as long as it stands. Lifting a rule's requirement to be implemented is an owner's decision (§s-67vekyup7y8smap). An approval covers a node's wording and not its links (§s-5ah25f6gy99panq). So an exemption holds only where approved wording names what it exempts.";
b.ruReason = "Правило, которое код системы не может выполнить или которое не может проверить ни один тест, было бы в отчёте, пока оно существует. Снять с правила требование реализации — решение ответственного (§s-67vekyup7y8smap). Одобрение охватывает формулировку узла, но не его связи (§s-5ah25f6gy99panq). Поэтому освобождение действует, только если одобренная формулировка называет то, что освобождается.";
b.changes = b.changes.filter((c) => !c.startsWith("По замечаниям рецензента: «a section it is in»"));
b.changes.push("Обоснование новое и говорит о правиле в целом: снять с правила требование реализации — решение ответственного (1.3.4), одобрение охватывает формулировку, но не связи (1.3.5), поэтому освобождение действует, только если одобренная формулировка называет то, что освобождается. При переносе узел получит связь cites на s-5ah25f6gy99panq.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
