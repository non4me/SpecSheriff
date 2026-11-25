// Node 11.1.3 under the owner's ruling of 2026-11-17 on finding 8 about the extensions: the header no longer says where
// the domain's code is, since code is bound to rules by SpecTags, not to sections or domains. The script also applies the
// fixes that EngStickler's readers found in the English of the node; none of them changes its meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-463.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["11.1.3"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("text", "- its level (optional, used when the domains are visualized);\n- where its code is.", "- its level (optional, used when the domains are visualized).");
swap("ruText", "- уровень (опционально, используется при визуализации доменов);\n- где его код.", "- уровень (опционально, используется при визуализации доменов).");
swap("text", "The domains do not use one another in a cycle.", "Domains do not form a cycle in which they use one another.");
swap("text", "Notifications may go in either direction.", "Such notifications may go in either direction.");
swap("ruText", "Уведомления могут идти в любую сторону.", "Такие уведомления могут идти в любую сторону.");
swap("reason", "- what it takes from the others.", "- what it uses from other domains.");
swap("reason", "so domains using one another in a cycle could not be built one after another.", "so domains that use one another cyclically cannot be built one after another.");
n.changes.push("Вы решили 17 ноября: строка «где его код» убрана из заголовка — код привязан SpecTag'ами к правилам, а не к разделам и доменам (находка 8 по расширениям).");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
