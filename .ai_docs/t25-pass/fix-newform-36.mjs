// The owner's ruling of 2026-11-09: the node on using another domain's RecordTypes (present 1.39) joins the
// node "RecordType", 3.4, word for word; its citation of the rule on cycles now goes to 3.5, where that stands.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const page = fs.readFileSync(new URL("base-structure.html", here), "utf8");
if (!page.includes('["3.8","move",0,"1.39"')) throw new Error("3.8 is not present 1.39");

execFileSync(process.execPath, [fileURLToPath(new URL("remove-node.mjs", here)), "3.8"], { stdio: "inherit" });

const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];
if (n.title !== "RecordType") throw new Error("3.4 is not the node RecordType");

n.text += "\n\nA RecordType of one domain names a RecordType of another domain, in a field's type or as the RecordType it refines, only where the named RecordType stands in a section the first domain's header names in its `consumes` links. A RecordType named from elsewhere is reported, not refused.";
n.ruText += "\n\nRecordType одного домена называет RecordType другого домена — в типе поля или как RecordType, который он уточняет, — только если названный RecordType стоит в разделе, который заголовок первого домена называет в своих связях `consumes`. RecordType, названный откуда-либо ещё, отмечается в отчёте, но не отклоняется.";
n.reason += "\n\nA domain's header then names every section of another domain whose RecordTypes the domain relies on at runtime. That other domain's index names the domain beside each such section. So whoever changes such a RecordType sees which domains it reaches (§s-yggv9myedprnaa7).\n\nA RecordType of contracts is provided by no single domain, so naming it makes a domain rely on no other.\n\nA RecordType named from elsewhere is reported rather than refused, since declaring the use may set the domains using one another in a cycle (§s-yggv9myedprnaa7). Only a change to the design removes such a cycle. Until then the work goes on with the dependency in view.";
n.ruReason += "\n\nТогда заголовок домена называет каждый раздел другого домена, на RecordType которого домен опирается во время работы. Указатель того домена называет этот домен рядом с каждым таким разделом. Поэтому тот, кто меняет такой RecordType, видит, до каких доменов это доходит (§s-yggv9myedprnaa7).\n\nRecordType контрактов не предоставляется ни одним отдельным доменом, поэтому, называя его, домен ни на кого другого не опирается.\n\nRecordType, названный откуда-либо ещё, отмечается в отчёте, а не отклоняется, потому что объявление такого использования может замкнуть домены в круг (§s-yggv9myedprnaa7). Устранить такой круг может только изменение проекта. До тех пор работа идёт с этой зависимостью на виду.";
n.changes.push("Последний абзац текста и последние три абзаца обоснования — нынешний 1.39, дословно, по вашему решению. Ссылка о циклах ведёт на 3.5. Нынешний 1.39 уходит в архив с указанием, что его заменил этот узел; его связи implements переходят сюда.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(Object.keys(d).filter(k => /^3\./.test(k)).join(" "), "| agreed:", n.agreed);
