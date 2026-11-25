// The owner's scheme of 2026-11-09, batch 2 in the reviewed wording: the main rules of sections 4–12 stop naming domains
// and RecordTypes. What leaves a node goes to part 13 at its review. Agreement is untouched, since none of these was agreed.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const swap = (k, field, from, to) => {
  const n = d[k];
  if (!n[field].includes(from)) throw new Error(`not found in ${k}.${field}: ${from}`);
  n[field] = n[field].replace(from, to);
};
// Takes a sentence out with the one space or the line break that set it apart.
const drop = (k, field, sentence) => {
  const n = d[k];
  if (!n[field].includes(sentence)) throw new Error(`not found in ${k}.${field}: ${sentence}`);
  n[field] = n[field].replace(" " + sentence, "").replace(sentence + " ", "").replace(sentence + "\n", "").replace(sentence, "");
};
const note = "По вашему решению основные правила не называют домены и RecordType.";

swap("4.1", "text", "The technical appendix is no domain and stands at no level. It stands beside the domains, as contracts does. It holds:", "The technical appendix holds:");
swap("4.1", "ruText", "Техническое приложение — не домен и не стоит ни на каком уровне. Оно стоит рядом с доменами, как contracts. Оно содержит:", "Техническое приложение содержит:");
swap("4.1", "text", "a section for each domain it implements, under that domain's name;", "a section for each top-level section of the base specification it implements, under that section's title;");
swap("4.1", "ruText", "раздел для каждого домена, который оно реализует, под именем этого домена;", "раздел для каждого раздела верхнего уровня базовой спецификации, который оно реализует, под названием этого раздела;");
swap("4.1", "reason", "The appendix is no subject area of the system but the way every one of them is built, which no level can place.", "The appendix is no subject area of the system but the way the system is built.");
swap("4.1", "ruReason", "Приложение — не предметная область системы, а то, как строится каждая из них, и это не может поместить ни один уровень.", "Приложение — не предметная область системы, а то, как система строится.");
swap("4.1", "reason", "which spans the domains as the stack does", "which spans the system as the stack does");
swap("4.1", "ruReason", "который охватывает домены, как и стек", "который охватывает всю систему, как и стек");

swap("5.4", "text", "a RecordType, a term node or a node of a project's own NodeKind", "a term node or a node of a project's own NodeKind");
swap("5.4", "ruText", "RecordType, узел термина или узел собственного NodeKind проекта", "узел термина или узел собственного NodeKind проекта");
swap("5.4", "reason", "A RecordType, a term node and a node of a project's own NodeKind each state", "A term node and a node of a project's own NodeKind each state");
swap("5.4", "ruReason", "RecordType, узел термина и узел собственного NodeKind проекта каждый сам по себе", "Узел термина и узел собственного NodeKind проекта каждый сам по себе");
drop("5.4", "reason", "A RecordType states the shape of its data.");
drop("5.4", "ruReason", "RecordType задаёт форму своих данных.");

drop("5.5", "text", "- a domain's header is located by the domain's name alone;");
drop("5.5", "ruText", "- заголовок домена располагается по одному имени домена;");
swap("5.5", "text", "the part contracts, like a domain, is numbered", "the part contracts is numbered");
swap("5.5", "ruText", "часть contracts, как и домен, нумеруется", "часть contracts нумеруется");

swap("9.1", "text", "The status of a section and of a domain's header is built", "The status of a section is built");
swap("9.1", "ruText", "Статус раздела и заголовка домена строится", "Статус раздела строится");
swap("9.1", "text", "such as `RecordType.fields`", "such as `TextRule.list`");
swap("9.1", "ruText", "например `RecordType.fields`", "например `TextRule.list`");
swap("9.1", "text", "what is built into it from other nodes, such as the values gathered beside a field (§s-ju5vcanbjph7mgh);", "what is built into it from other nodes;");
swap("9.1", "ruText", "того, что встроено в него из других узлов, например значений, собранных рядом с полем (§s-ju5vcanbjph7mgh);", "того, что встроено в него из других узлов;");

swap("9.2", "text", "a section or a domain's header, whose status is built", "a section, whose status is built");
swap("9.2", "ruText", "раздела или заголовка домена, статус которых строится из узлов под ними", "раздела, статус которого строится из узлов под ним");

d["10.2"].title = "A top-level section is reviewed whole before its implementation begins";
d["10.2"].ruTitle = "Раздел верхнего уровня проверяется целиком до начала его реализации";
swap("10.2", "text", "Before a domain's implementation begins, the domain is reviewed whole.", "Before the implementation of a top-level section of the base specification begins, that section is reviewed whole.");
swap("10.2", "ruText", "Прежде чем начнётся реализация домена, домен проверяют целиком.", "Прежде чем начнётся реализация раздела верхнего уровня базовой спецификации, этот раздел проверяют целиком.");
swap("10.2", "reason", "Read whole, a domain shows", "Read whole, a section shows");
swap("10.2", "ruReason", "Прочитанный целиком, домен показывает", "Прочитанный целиком, раздел показывает");

swap("10.4", "reason", "Code generated from a node, as the types and RuntimeChecks of a RecordType are (§s-e877bnfa559tvk9), is held", "Code generated from a node is held");
swap("10.4", "ruReason", "Код, сгенерированный из узла, как типы и RuntimeChecks у RecordType (§s-e877bnfa559tvk9), каждый коммит держит", "Код, сгенерированный из узла, каждый коммит держит");

swap("10.5", "reason", "A section and a domain's header require nothing", "A section requires nothing");
swap("10.5", "ruReason", "Раздел и заголовок домена ничего не требуют", "Раздел ничего не требует");
drop("10.5", "reason", "The code generated from a RecordType owes no test (§s-qxpqtnbgmydusx2).");
drop("10.5", "ruReason", "Код, сгенерированный из RecordType, теста не требует (§s-qxpqtnbgmydusx2).");

swap("10.8", "text", "The message names no domain's header and no section.", "The message names no section.");
swap("10.8", "ruText", "Сообщение не называет ни заголовка домена, ни раздела.", "Сообщение не называет ни одного раздела.");
swap("10.8", "reason", "A header or a section is refused because it requires nothing a change could serve.", "A section is refused because it requires nothing a change could serve.");
swap("10.8", "ruReason", "Заголовок или раздел отклоняются, потому что они не требуют ничего, чему могло бы служить изменение.", "Раздел отклоняется, потому что не требует ничего, чему могло бы служить изменение.");

swap("12.12", "text", "a section and a domain's header left out;", "a section left out;");
swap("12.12", "ruText", "кроме раздела и заголовка домена;", "кроме раздела;");

drop("12.1", "reason", "A RecordType named across domains outside the sections used is reported for the reason §s-5yvpn4zhuqmv5bq gives.");
drop("12.1", "ruReason", "RecordType, названный через границу доменов вне используемых разделов, сообщается по причине, которую даёт §s-5yvpn4zhuqmv5bq.");

for (const k of ["4.1", "5.4", "5.5", "9.1", "9.2", "10.2", "10.4", "10.5", "10.8", "12.1", "12.12"]) d[k].changes.push(note);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const left = /\bdomains?\b|\bdomain's\b|RecordType|домен|заголов/i;
for (const k of ["4.1", "5.4", "5.5", "9.1", "9.2", "10.2", "10.4", "10.5", "10.8", "12.12"]) {
  for (const f of ["title", "text", "reason", "ruTitle", "ruText", "ruReason"]) {
    const s = String(d[k][f]);
    if (!s.startsWith("=") && left.test(s)) console.log(`still names it: ${k}.${f}: ${s.split(/\n|(?<=[.;])\s+/).filter(x => left.test(x)).join(" | ").slice(0, 200)}`);
  }
}
console.log("5.5 ru list:\n" + d["5.5"].ruText.split("\n").filter(l => l.startsWith("- ")).slice(0, 5).map(l => l.slice(0, 80)).join("\n"));
