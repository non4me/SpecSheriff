// Proposes a new wording of 11.1.2 that follows the owner's account of how a specification is divided: a large domain's
// document may be divided into several documents, each section kept whole in one of them. The two principles the
// owner explained are not rules, so they are taken out of the recorded ruling. The draft row 11.3.7, never agreed, is
// deleted, since a section cannot span several files and no row is needed for it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const nFile = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nFile, "utf8"));
const n = nf["11.1.2"];
const last = n.decisions[n.decisions.length - 1];
const cut = " Two principles of division are distinct: the logical one, into domains, follows the meaning of the rules; the physical one, into documents, follows only how much is stored and loaded into the context window.";
if (!last.ruling.endsWith(cut)) throw new Error("the ruling does not end as expected");
last.ruling = last.ruling.slice(0, -cut.length);

const enText = [
  "If the specification is divided into domains, each domain, the contracts section, the technical appendix and the guidelines are kept in separate documents.",
  "",
  "If a domain's document is too large to fit well in the context window, its owners may divide it into several documents. Each section of the domain is then kept whole in one document.",
].join("\n");
const ruText = [
  "Если спецификация разделена по доменам, то каждый домен, контракты, техническое приложение и guidelines хранятся в отдельных документах.",
  "",
  "Если документ домена слишком велик, чтобы оптимально размещаться в контекстном окне, ответственные за домен могут разделить его на несколько документов. Каждый раздел домена при этом лежит целиком в одном документе.",
].join("\n");
const enReason = "Domains are separated by meaning, and their owners decide how, as the architecture of the system suggests. A domain's document is divided by size alone, so that each part of the specification that is loaded fits easily in the context window of the model in use. A section is the smallest part of such a division, since its rules are read together.";
const ruReason = "Домены выделяют по смыслу, и как именно, решают ответственные, исходя из архитектуры системы. Документ домена делят только по объёму, чтобы каждая загружаемая часть спецификации легко помещалась в контекстное окно используемой модели. Раздел — наименьшая часть такого деления, потому что его правила читают вместе.";
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${enText}`, `Reason: ${enReason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${ruReason}`].join("\n\n"),
  why: "По вашему решению от 19 ноября: раздел — наименьшая единица деления документа домена, а как делить, решают ответственные. Обоснование говорит, почему домены выделяют по смыслу, а документ делят по объёму.",
}];
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");

const tFile = new URL("table-11-3.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const before = t.tables[0].rows.length;
t.tables[0].rows = t.tables[0].rows.filter((r) => r.num !== "11.3.7");
if (t.tables[0].rows.length !== before - 1) throw new Error("row 11.3.7 not found");
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
