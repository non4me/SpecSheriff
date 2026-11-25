// Applies the wording checker's findings to the draft 12.8 (2026-11-18): "base specification" cites 1.1.2 at its first use;
// the reason names the nodes again rather than "those nodes", and drops "They are read from the base specification
// alone", which restates the text. The two sentences on the appendix and the guidelines stay: they say why the text
// restricts the values to the base specification.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-486.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.8"];
const PARTS = "s-qmmzf9nksfsa3qp";
const swap = (s, a, b) => { if (!s.includes(a)) throw new Error("not found: " + a); return s.split(a).join(b); };
n.text = swap(n.text, "that are in the base specification, read from the specification.", `that are in the base specification (§${PARTS}), read from the specification.`);
n.ruText = swap(n.ruText, "которые находятся в базовой спецификации, прочитанные из спецификации.", `которые находятся в базовой спецификации (§${PARTS}), прочитанные из спецификации.`);
n.reason = swap(swap(n.reason, "The sids of those nodes are already held by the specification,", "The sids of the nodes of that kind are already held by the specification,"), "They are read from the base specification alone. The technical appendix", "The technical appendix");
n.ruReason = swap(swap(n.ruReason, "sid этих узлов уже есть в спецификации,", "sid узлов этого типа уже есть в спецификации,"), "Их читают только из базовой спецификации. Техническое приложение", "Техническое приложение");
n.changes.push("По проверке формулировок: при первом упоминании базовой спецификации добавлена ссылка на 1.1.2; в обосновании «sid этих узлов» → «sid узлов этого типа»; фраза «Их читают только из базовой спецификации» убрана, потому что повторяет текст.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
