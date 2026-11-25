// Node 12.3.5, not yet agreed: the reviewer's report on the wording of fix-newform-330.mjs, applied to the wording of
// fix-newform-331.mjs. The rule covers the whole type of a field, including the members of lists and maps ("anywhere in the
// types of its fields"). The sentence on an identifier held "as an ordinary value" goes, since "ordinary" was undefined and
// the first sentence already rules out `identifier of` another domain's RecordType; the first example now shows that case
// with its domains named. A new sentence binds the fragments of a format too, after the reviewer's doubt that a fragment
// referring to a domain's RecordType would tie every reuser to that domain: this is the agent's proposal. "Linked to" in the
// reason becomes "referring to", since in this method a link is a typed relation between nodes (§s-sn6au3vcr9uy5pm).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.5"];
n.text = "Anywhere in the types of its fields and through `refines`, a RecordType refers only to RecordTypes of its own domain and to fragments of a format declared in the contracts section (§s-7vm323mhry2enx3). A fragment of a format refers only to other fragments. The rules of a domain may cite a RecordType of another domain.";
n.ruText = "В любом месте типов своих полей и через `refines` RecordType ссылается только на RecordType своего домена и на фрагменты формата, объявленные в контрактах (§s-7vm323mhry2enx3). Фрагмент формата ссылается только на другие фрагменты. Правила домена могут ссылаться на RecordType другого домена.";
n.reason = "A RecordType describes the data its own domain outputs and stores, not what the domain takes in from other domains or from outside the system. Referring to another domain's RecordType, it would change whenever that domain changed that RecordType, though nothing in its own domain had changed. A fragment that referred to a domain's RecordType would tie to that domain every RecordType that uses the fragment.";
n.ruReason = "RecordType описывает данные, которые его собственный домен выдаёт и хранит, а не то, что домен берёт у других доменов или извне системы. Ссылающийся на RecordType другого домена, он менялся бы при каждом изменении этого RecordType тем доменом, хотя в его собственном домене ничего не менялось. Фрагмент, ссылающийся на RecordType домена, привязал бы к этому домену каждый RecordType, который этот фрагмент использует.";
n.examples = [
  "In the domain of requests, the RecordType of a request has a text field for the identifier of the user who made the request, since the RecordType of a user belongs to the domain of users.",
  "The technical appendix of the domain of requests states what the domain does with a user's data record that it takes as input, and cites the RecordType of a user.",
];
n.ruExamples = [
  "В домене запросов RecordType запроса содержит текстовое поле для идентификатора пользователя, сделавшего запрос, потому что RecordType пользователя принадлежит домену пользователей.",
  "Техническое приложение домена запросов описывает, что домен делает с записью данных о пользователе, которую берёт на вход, и ссылается на RecordType пользователя.",
];
n.changes.push("По замечаниям рецензента: запрет действует в любом месте типа поля, значит, и на элементы списков и словарей; фраза про «обычное значение» убрана — случай с идентификатором показывает первый пример, где названы домены; в обосновании «связанный» заменено на «ссылающийся», потому что связь в методе — это типизированное отношение узлов (6.1).");
n.changes.push("Фраза о фрагментах формата — моё предложение, по сомнению рецензента: фрагмент, ссылающийся на RecordType домена, привязал бы к этому домену всех, кто его использует.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText);
