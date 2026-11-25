// The owner's ruling of 2026-11-09 on node 3.4 "RecordType": "at most one RecordType" goes, as the reviewer
// recommended. A domain may keep one structure of an entity and pass on another. The citation moves up.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];
const en = n.text.split("\n\n"), ru = n.ruText.split("\n\n");
const enR = n.reason.split("\n\n"), ruR = n.ruReason.split("\n\n");

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

en[0] = swap(en[0], "A RecordType is the format", "A RecordType (§s-6eb92ddch7shuvu) is the format");
ru[0] = swap(ru[0], "RecordType — это формат", "RecordType (§s-6eb92ddch7shuvu) — это формат");
en[1] = swap(en[1], "A domain defines at most one RecordType (§s-6eb92ddch7shuvu) for an entity's data. ", "");
ru[1] = swap(ru[1], "Домен определяет для данных сущности не более одного RecordType (§s-6eb92ddch7shuvu). ", "");
enR[0] = swap(enR[0], "Two definitions of one entity within a domain, or of one structure in two domains, are a duplicate", "Two definitions of the same structure are a duplicate");
ruR[0] = swap(ruR[0], "Два определения одной сущности внутри домена или одной структуры в двух доменах — это дубликат", "Два определения одной и той же структуры — это дубликат");

n.text = en.join("\n\n");
n.ruText = ru.join("\n\n");
n.reason = enR.join("\n\n");
n.ruReason = ruR.join("\n\n");
n.changes.push("По вашему решению убрана фраза «не более одного RecordType»: домен может хранить одну структуру сущности и передавать другую. Ссылка на определение RecordType перенесена в первый абзац.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("words of text:", n.text.split(/\s+/).length, "of reason:", n.reason.split(/\s+/).length);
