// The owner's ruling of 2026-11-09 on node 3.4 "RecordType": a domain taking data from another keeps their
// RecordType while their structure stays, since a renamed copy is a duplicate. Reviewed wording.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];
const en = n.text.split("\n\n"), ru = n.ruText.split("\n\n");
const enR = n.reason.split("\n\n"), ruR = n.ruReason.split("\n\n");
if (en.length !== 4 || !en[1].includes("Another domain may define")) throw new Error("3.4 text is not as expected");
if (ru.length !== 4 || !ru[1].includes("Другой домен может определить")) throw new Error("3.4 Russian text is not as expected");
if (enR.length !== 4 || ruR.length !== 4) throw new Error("3.4 reason is not as expected");

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

en[1] = "A domain defines at most one RecordType (§s-6eb92ddch7shuvu) for an entity's data. A domain that takes data from another domain uses the RecordType they come in. It defines a RecordType of its own only where it changes the structure of those data. RecordType names are unique across the specification.";
ru[1] = "Домен определяет для данных сущности не более одного RecordType (§s-6eb92ddch7shuvu). Домен, который получает данные от другого домена, использует тот RecordType, в котором они пришли. Свой RecordType он определяет, только если меняет структуру этих данных. Имена RecordType уникальны во всей спецификации.";
en[2] = swap(en[2], "A RecordType stands in the domain that provides it.", "A RecordType stands in the domain that first provides it.");
ru[2] = swap(ru[2], "RecordType стоит в домене, который его предоставляет.", "RecordType стоит в домене, который первым его предоставляет.");
enR[0] = "Two definitions of one entity within a domain, or of one structure in two domains, are a duplicate, and the two are changed apart. A domain that changes the structure answers for the new format, so it defines that format itself. RecordTypes are referred to by name, so two with one name cannot be told apart.";
ruR[0] = "Два определения одной сущности внутри домена или одной структуры в двух доменах — это дубликат, и меняются они по отдельности. Домен, который меняет структуру, отвечает за новый формат, поэтому сам его определяет. На RecordType ссылаются по имени, поэтому два с одним именем нельзя различить.";

n.text = en.join("\n\n");
n.ruText = ru.join("\n\n");
n.reason = enR.join("\n\n");
n.ruReason = ruR.join("\n\n");
n.changes.push("По вашему замечанию: домен, получивший данные от другого, использует их RecordType и определяет свой только при изменении структуры. Прежняя фраза о том, что другой домен может определить свой RecordType для той же сущности, убрана. RecordType стоит в домене, который первым его предоставляет.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("words of text:", n.text.split(/\s+/).length, "of reason:", n.reason.split(/\s+/).length);
