// The owner's second pass over section 1, 2026-11-08: 1.2.6 does not extend to technical code, and 1.6.1
// says what a script checks, that checks also run at an agent's edits, and that a failed check refuses.
// Both carry new wording, so their agreement comes off until the owner has read them again.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const a = d["1.2.6"];
if (a.text.includes("technical code")) throw new Error("1.2.6 has it already");
a.text += "\n\nThis rule does not extend to technical code. Technical code implements none of the system's logic and is required by the technology the system is built with. Examples are a module's re-exports and the glue a framework needs (§s-ezq67wu75updp98).";
a.ruText += "\n\nЭто правило не распространяется на технический код. Технический код не реализует логику системы и требуется технологией, на которой она построена. Примеры — реэкспорты модуля и связующий код, нужный фреймворку (§s-ezq67wu75updp98).";
a.reason += "\n\nTechnical code adds nothing the system does. It is marked as technical (§s-ezq67wu75updp98), so it stays visible.";
a.ruReason += "\n\nТехнический код не добавляет ничего к тому, что делает система. Он помечен как технический (§s-ezq67wu75updp98), поэтому остаётся на виду.";
a.changes.push("Абзац о техническом коде в тексте — ваше решение, формулировка прошла рецензента. К обоснованию добавлен абзац, который его держит.");
delete a.agreed;

const b = d["1.6.1"];
const en = b.text.split("\n\n"), ru = b.ruText.split("\n\n");
if (en.length !== 4 || ru.length !== 4) throw new Error("1.6.1 has not four paragraphs");
en[0] = "Two things are checked mechanically:\n- that the specification conforms to those rules of the guidelines a script can check;\n- that the specification and the code still agree with each other.";
ru[0] = "Механически проверяются две вещи:\n- что спецификация соответствует тем правилам guidelines, которые можно проверить скриптом;\n- что спецификация и код по-прежнему согласованы между собой.";
en[3] = "The checks run when a commit is made. Where an agent writes the specification, the tests or the code, they also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp). The tests of the system's code run at a push if the specification has the status `approved`.";
ru[3] = "Проверки запускаются, когда делается коммит. Там, где спецификацию, тесты или код пишет агент, они запускаются ещё и после каждой его правки (§s-epaw9sgyaajzn8g). Некоторые его правки отклоняются ещё до того, как они сделаны (§s-83ev4wwesbwnhnp). Тесты кода системы запускаются при push, если спецификация имеет статус `approved`.";
en.push("A failed check refuses the change, unless the table of checks says otherwise (§s-jau82aq9juv9zzh).");
ru.push("Непройденная проверка отклоняет изменение, если таблица проверок не говорит иного (§s-jau82aq9juv9zzh).");
b.text = en.join("\n\n");
b.ruText = ru.join("\n\n");
const r = b.reason.split("\n\n"), q = b.ruReason.split("\n\n");
if (r.length !== 2 || q.length !== 2) throw new Error("the reason of 1.6.1 has not two paragraphs");
r.splice(1, 0, "Run at each of an agent's edits, a check finds a mistake where it is made. The order of test and code can be seen only at the edits, since a commit holds the test and the code together.");
q.splice(1, 0, "Запущенная при каждой правке агента, проверка находит ошибку там, где её сделали. Порядок теста и кода виден только при правках, потому что коммит содержит тест и код вместе.");
b.reason = r.join("\n\n");
b.ruReason = q.join("\n\n");
b.changes.push("По вашему решению дополнено: что проверяется скриптом, запуски при правках агента, отказ при непройденной проверке. Первый абзац стал списком. Формулировки прошли рецензента.");
delete b.agreed;

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("1.2.6 and 1.6.1 rewritten");
