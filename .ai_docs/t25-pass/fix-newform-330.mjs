// Node 12.3.5, not yet agreed: rewritten after the owner's remark of 2026-11-14 («Прямой связи между RecordType не
// предусмотрено ... ЧТо значит не называет? Они просто не связаны»). RecordTypes of different domains are simply not linked:
// a RecordType refers to no RecordType of another domain, neither in the types of its fields nor through `refines`. The
// identifier of another domain's data record, which the owner allowed («2. да»), is held as an ordinary value, so it is no
// exception to the rule. The title says what holds rather than what a RecordType does not do.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.5"];
n.title = "RecordTypes of different domains are not linked";
n.ruTitle = "RecordType разных доменов не связаны между собой";
n.text = "A RecordType of one domain refers to no RecordType of another domain, neither in the types of its fields nor through `refines`. A field holds the identifier of another domain's data record as an ordinary value.";
n.ruText = "RecordType одного домена не ссылается на RecordType другого домена ни в типах своих полей, ни через `refines`. Идентификатор записи данных другого домена поле хранит как обычное значение.";
n.reason = "A RecordType describes the data its own domain outputs and stores, not what the domain takes in from other domains or from outside the system. Linked to another domain's RecordType, it would change whenever that domain changed that RecordType, though nothing in its own domain had changed.";
n.ruReason = "RecordType описывает данные, которые его собственный домен выдаёт и хранит, а не то, что домен берёт у других доменов или извне системы. Связанный с RecordType другого домена, он менялся бы при каждом изменении этого RecordType тем доменом, хотя в его собственном домене ничего не менялось.";
n.examples = ["The RecordType of a request holds the identifier of the user who made the request in a text field. That field does not refer to the RecordType of a user."];
n.ruExamples = ["RecordType запроса хранит идентификатор пользователя, сделавшего запрос, в текстовом поле. Это поле не ссылается на RecordType пользователя."];
n.changes.push("По вашему замечанию от 14 ноября: RecordType разных доменов просто не связаны. Заголовок говорит, что верно, а не что RecordType не делает. Исключение для идентификатора не нужно: идентификатор хранится как обычное значение.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const old = `"A RecordType does not name another domain's RecordType","RecordType не называет RecordType другого домена"`;
if (!page.includes(old)) throw new Error("row 12.3.5 not found");
page = page.replace(old, `"${n.title}","${n.ruTitle}"`);
fs.writeFileSync(pageFile, page);
console.log(n.text, "\n", n.ruText);
