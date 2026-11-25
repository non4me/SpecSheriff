// The owner's ruling of 2026-11-08 at the showing of 1.3.1:
// - 1.1.2 also says that the base specification may, where needed, be divided into parts;
// - the owners are a node of their own, 1.1.6: the draft 9.4 moved up, opening with the owner's three
//   sentences. Section 9 closes up by remove-node.mjs: 9.5 becomes 9.4, 9.6 becomes 9.5.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const page = new URL("base-structure.html", here);

// 1. Every mention of 9.4 now means 1.1.6. Done first, since remove-node.mjs renumbers 9.5 to 9.4.
const mention = s => s.replace(/(?<![0-9.])9\.4(?![0-9]|\.[0-9])/g, "1.1.6");
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const moved = d["9.4"];
if (moved.sidValue !== "s-6sk8uet75dmq5qz") throw new Error("9.4 is not the node on owners");
for (const [k, v] of Object.entries(d)) if (k !== "9.4") v.changes = v.changes.map(mention);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const lines = fs.readFileSync(page, "utf8").split("\n");
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (!/^\["[0-9.]+","(split|part|move|same|new)"/.test(t) || t.startsWith('["9.4",')) continue;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  if (Array.isArray(row[8])) row[8] = row[8].map(x => (x === "9.4" ? "1.1.6" : x));
  for (const k of [6, 7]) if (typeof row[k] === "string") row[k] = mention(row[k]);
  lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
}
fs.writeFileSync(page, lines.join("\n"));

// 2. Section 9 closes up.
execFileSync(process.execPath, [fileURLToPath(new URL("remove-node.mjs", here)), "9.4"], { stdio: "inherit" });

// 3. The new draft 1.1.6 and the addition to 1.1.2.
const e = JSON.parse(fs.readFileSync(file, "utf8"));
e["1.1.6"] = {
  from: "1.7",
  sid: "new",
  title: moved.title,
  text: "The whole specification must have an owner, responsible for approving its nodes. Each part may be assigned an owner of its own. There may be several owners. A part's owners take the place of the owners above for every node within it.",
  reason: "The owners are those who answer for a rule and approve it (§s-67vekyup7y8smap). A node is implemented only once it is approved. Owners of domains and sections divide the reading as the specification is divided, so that it can grow beyond what one person reads. The owners of one part share its reading. Each of them answers for all of it.",
  ruTitle: moved.ruTitle,
  ruText: "Вся спецификация должна иметь owner, ответственного за одобрение её узлов. Для каждой части может быть назначен свой owner. Owners может быть несколько. Для каждого узла внутри части её owners заменяют owners уровнем выше.",
  ruReason: "Owners — те, кто отвечает за правило и одобряет его (§s-67vekyup7y8smap). Узел реализуется, только когда он одобрен. Owners доменов и разделов делят чтение так же, как разделена спецификация, чтобы она могла вырасти больше того, что читает один человек. Owners одной части делят её чтение. Каждый из них отвечает за неё целиком.",
  changes: [
    "Перенесён из раздела 9 (был 9.4) по вашему решению: понятие owner вводится до первого использования.",
    "Текст: первые три фразы ваши. Они заменили «The specification has owners, one or several. A domain or a section may have owners of its own». Четвёртая — прежняя третья фраза 9.4: «They» стало «A part's owners», потому что перед ней теперь другая фраза.",
    "В ваших фразах: «ответственный» стало owner, союз «и» заменён точкой, «за аппрув» стало «за одобрение её узлов».",
    "Обоснование — прежнее 9.4, дословно, и вторая фраза «A node is implemented only once it is approved»: основание для «must have».",
    "Ссылка на заголовок домена убрана: слова domain в тексте больше нет.",
  ],
  sidValue: moved.sidValue,
};
const n = e["1.1.2"];
if (n.text.includes("Where needed")) throw new Error("1.1.2 already has the addition");
n.text += "\n\nWhere needed, the base specification may be divided into parts, as sections and domains.";
n.ruText += "\n\nБазовая спецификация в случае необходимости может быть разделена на части в виде разделов и доменов.";
n.reason += "\n\nA specification too large to read at once is read a part at a time. The rules of one subject area bear on one another and change together, so they are kept together.";
n.ruReason += "\n\nСпецификацию, слишком большую, чтобы прочесть её сразу, читают по частям. Правила одной предметной области связаны друг с другом и меняются вместе, поэтому их держат вместе.";
n.changes.push("После списка добавлен абзац о делении базы, ваша фраза дословно. К нему добавлен второй абзац обоснования, его основания взяты из 1.35 и 1.36.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(e, null, 2) + "\n");

// 4. The page row of 1.1.6, after 1.1.5.
const after = fs.readFileSync(page, "utf8").split("\n");
const at = after.findIndex(l => l.trim().startsWith('["1.1.5",'));
if (at < 0 || after.some(l => l.trim().startsWith('["1.1.6",'))) throw new Error("no place for 1.1.6");
const row = ["1.1.6", "part", 1, "1.7", "part of 1.7: Only its owners approve a node", "уходит сюда: " + moved.ruTitle, "", "Перенесён из раздела 9 по вашему решению: понятие owner вводится до первого использования.", ["1.3.1", "3.5"], ""];
after.splice(at + 1, 0, "      " + JSON.stringify(row) + ",");
fs.writeFileSync(page, after.join("\n"));

execFileSync(process.execPath, [fileURLToPath(new URL("apply-newform.mjs", here))], { stdio: "inherit" });
