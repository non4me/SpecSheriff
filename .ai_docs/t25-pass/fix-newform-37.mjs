// The owner asked to tighten node 3.4 "RecordType" without losing meaning, 2026-11-09. Reviewed wording.
// It carries new words, so the agreement comes off until the owner has read it.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];
const en = n.text.split("\n\n"), ru = n.ruText.split("\n\n");
if (en.length !== 4 || ru.length !== 4 || !en[0].startsWith("A RecordType is the format")) throw new Error("3.4 is not as expected");

n.text = [
  en[0],
  "Within a domain, at most one RecordType (§s-6eb92ddch7shuvu) defines an entity's data. Another domain may define its own RecordType for the same entity. RecordType names are unique across the specification.",
  "A RecordType stands in the domain that provides it. Contracts holds only those that no single domain provides, such as a store several domains write to.",
  "A RecordType may name another domain's RecordType only if its own domain's header names, in its `consumes` links, the section holding that RecordType. Any other such reference is reported, not refused. A RecordType names another in a field's type or by refining it.",
].join("\n\n");
n.ruText = [
  ru[0],
  "Внутри домена данные сущности определяет не более одного RecordType (§s-6eb92ddch7shuvu). Другой домен может определить для той же сущности свой RecordType. Имена RecordType уникальны во всей спецификации.",
  "RecordType стоит в домене, который его предоставляет. В контрактах стоят только те, которые не предоставляет ни один отдельный домен, например хранилище, в которое пишут несколько доменов.",
  "RecordType может называть RecordType другого домена, только если заголовок его собственного домена называет в своих связях `consumes` раздел, в котором стоит этот RecordType. Любая другая такая ссылка отмечается в отчёте, но не отклоняется. RecordType называет другой RecordType в типе поля или уточняя его.",
].join("\n\n");
n.reason = [
  "Two definitions of one entity within a domain are changed apart. Each domain answers for what it passes on or keeps, so it defines that format itself. RecordTypes are referred to by name, so two with one name cannot be told apart.",
  "A RecordType described away from its provider falls out of step when the provider changes what it gives.",
  "With `consumes` links declared, a domain's header names every section of another domain it relies on. That domain's index names the first domain beside each such section. So whoever changes a RecordType sees which domains it reaches (§s-yggv9myedprnaa7). A RecordType of contracts has no single provider, so naming it makes a domain rely on no other.",
  "Any other such reference is reported rather than refused, since declaring it may close a cycle (§s-yggv9myedprnaa7). Only a change to the design removes a cycle. Until then the dependency stays in view.",
].join("\n\n");
n.ruReason = [
  "Два определения одной сущности внутри домена меняются по отдельности. Каждый домен отвечает за то, что передаёт дальше или хранит, поэтому сам определяет этот формат. На RecordType ссылаются по имени, поэтому два с одним именем нельзя различить.",
  "RecordType, описанный вдали от поставщика, отстаёт, когда поставщик меняет то, что отдаёт.",
  "Когда связи `consumes` объявлены, заголовок домена называет каждый раздел другого домена, на который он опирается. Указатель того домена называет первый домен рядом с каждым таким разделом. Поэтому тот, кто меняет RecordType, видит, до каких доменов это доходит (§s-yggv9myedprnaa7). У RecordType контрактов нет отдельного поставщика, поэтому, называя его, домен ни на кого другого не опирается.",
  "Любая другая такая ссылка отмечается в отчёте, а не отклоняется, потому что её объявление может замкнуть круг (§s-yggv9myedprnaa7). Устранить круг может только изменение проекта. До тех пор зависимость остаётся на виду.",
].join("\n\n");
n.changes.push("Узел сокращён по вашей просьбе, формулировки прошли рецензента: текст с прежних 4 абзацев и обоснование с 5 до 4 абзацев.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("words of text:", n.text.split(/\s+/).length, "of reason:", n.reason.split(/\s+/).length);
