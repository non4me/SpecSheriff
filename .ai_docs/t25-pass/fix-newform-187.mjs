// The fresh reviewer of the merged 9.4 (2026-11-11): the comments item names what it excludes, the
// citation item says which comments, the rename says where the checks look, the reason says what the
// list solves, and the Russian title says "или" as the English "or". The comments of a test join those
// of a symbol, by the owner's ruling of the same day that tests and code are one whole.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

b.ruTitle = "Что считается изменением теста или кода";
b.text = "A change to the SpecTag of a test or of a symbol is a change to that test or that code. These change neither:\n- a new name of a test whose SpecTag stays the same;\n- rewording the comments of a test or of a symbol, other than its SpecTag;\n- replacing a sid cited in those comments;\n- renaming an identifier everywhere the code and the tests spell it.";
b.ruText = "Изменение SpecTag теста или символа — это изменение самого теста или кода. Ни тест, ни код не меняют:\n- новое название теста при прежнем SpecTag;\n- переформулировка комментариев теста или символа, кроме его SpecTag;\n- замена sid, на который ссылаются эти комментарии;\n- переименование идентификатора везде, где он написан в коде и тестах.";
b.reason = "No test or code is written or changed for a draft rule (§s-utvqbypzhmgndug). Were a change to a SpecTag not counted as one, a test or code could be bound to a draft rule with nothing refusing it. A new name of a test, a reworded comment or an identifier renamed throughout changes nothing a test verifies or code does, so none is refused while their rule is a draft.";
b.ruReason = "Для правила со статусом черновик не пишут и не меняют ни тесты, ни код (§s-utvqbypzhmgndug). Если бы изменение SpecTag не считалось изменением, тест или код можно было бы связать SpecTag с правилом со статусом черновик, и ничто бы этого не отклонило. Новое название теста, переформулированный комментарий или идентификатор, переименованный везде, не меняют того, что проверяет тест или делает код, поэтому ничто из этого не отклоняется, пока их правило — черновик.";
b.changes = b.changes.filter((c) => !c.startsWith("Заголовок новый") && !c.startsWith("Обоснование новое"));
b.changes.splice(1, 0, "Заголовок новый: «What counts as a change to a test or to code» / «Что считается изменением теста или кода».");
b.changes.push(
  "По замечанию рецензента в списке: «the other comments» стало «the comments … other than its SpecTag», потому что ни один узел ещё не сказал, что SpecTag стоит в комментарии; «moving a citation onto another sid» стало «replacing a sid cited in those comments», чтобы пункт не читался как перенос самого SpecTag на другой узел.",
  "Новое по смыслу, по вашему принципу «тесты и код — единое целое»: пункт о комментариях теперь говорит о комментариях теста и символа. Прежде он говорил только о символе, и переформулированный комментарий теста считался бы изменением теста.",
  "Новое по смыслу, по замечанию рецензента: «everywhere it is spelled» стало «everywhere the code and the tests spell it». Проверки SpecSheriff смотрят только код и тесты, а «везде» читалось бы и как документация и спецификация.",
  "Обоснование новое, из обоих узлов: 9.4 говорило о черновике, 9.5 — о правиле на пересмотре. Что изменение SpecTag иначе нельзя было бы отклонить, взято из обоснования нынешнего 3.5. Последняя фраза говорит, зачем нужен список: перечисленное не отклоняется, пока правило — черновик.",
);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.changes.join("\n"));
