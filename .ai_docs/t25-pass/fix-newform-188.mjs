// The owner of 2026-11-11 on 9.4: the list goes; its second sentence is theirs, word for word
// («Ни тест, ни код не меняет переформулировка названия теста или комментариев в коде и тестах, при
// прежнем SpecTag»), the replacement of a cited sid (covered by the comments) and the rename of an
// identifier (a rename may change what the system shows outside) gone; the reason says why the node
// exists and no longer speaks of a draft rule.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

b.text = "A change to the SpecTag of a test or of a symbol is a change to that test or that code. Rewording a test's name or the comments in the code and the tests changes neither the test nor the code, as long as the SpecTag stays the same.";
b.ruText = "Изменение SpecTag теста или символа — это изменение самого теста или кода. Ни тест, ни код не меняет переформулировка названия теста или комментариев в коде и тестах, при прежнем SpecTag.";
b.reason = "A test or code that changes is checked against its rule anew: the commit's message names that rule, and the reviewer reads the change against it. A SpecTag decides which rule that is. A test's name and a comment change nothing the test verifies or the code does.";
b.ruReason = "Изменённые тест и код заново сверяются со своим правилом: сообщение коммита называет это правило, рецензент читает изменение по нему. SpecTag решает, с каким правилом их сверять. Название теста и комментарий не меняют того, что проверяет тест или делает код.";
b.changes = [
  b.changes[0],
  b.changes[1],
  b.changes[2],
  "Осталось из обоих узлов: из 9.5 — «A change to its SpecTags is a change to its code», теперь о тесте и коде вместе; из 9.4 — что новое название теста при прежнем SpecTag тест не меняет.",
  "Вторая фраза текста — ваша, дословно, только «в кода» исправлено на «в коде». Она заменила список: переформулировка названия теста или комментариев в коде и тестах при прежнем SpecTag не меняет ни теста, ни кода. Комментарии теста теперь входят сюда же: прежде пункт говорил только о комментариях символа.",
  "Ушли два пункта из нынешнего 3.5. «Moving a citation onto another sid»: sid, упомянутый в комментарии, — часть текста комментария, а SpecTag — тот же sid в своём формате, и его изменение остаётся изменением. «Renaming an identifier everywhere it is spelled»: переименование может менять то, что система показывает наружу, а проверка видит только код и тесты.",
  "Обоснование новое. Оно говорит, зачем нужен узел: изменённые тест и код заново сверяются со своим правилом. О черновике в нём больше не говорится.",
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.changes.join("\n"));
