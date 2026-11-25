// The owner of 2026-11-11: 9.4 "Binding a test to an approved rule" and 9.5 "Which code must name an
// approved node" become one node, "What counts as a change to a test or to code", keeping 9.5's sid
// (s-9j2mmnuuwmx5ksn, a part of present 3.5); 9.4's sid s-8ykvuqhvtjh66hj, never in a commit, goes.
// Their first sentences go, held by agreed 1.3.2 and 1.5.2, and with them the commit as actor.
// The merged node is written at 9.4; 9.5 is removed afterwards by remove-node.mjs 9.5.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const four = d["9.4"], five = d["9.5"];
if (four.sidValue !== "s-8ykvuqhvtjh66hj" || five.sidValue !== "s-9j2mmnuuwmx5ksn") throw new Error("unexpected drafts");

d["9.4"] = {
  from: five.from,
  sid: five.sid,
  sidValue: five.sidValue,
  title: "What counts as a change to a test or to code",
  ruTitle: "Что считается изменением теста и кода",
  text: "A change to the SpecTag of a test or of a symbol is a change to that test or that code. These change neither:\n- a new name of a test whose SpecTag stays the same;\n- rewording the other comments of a symbol;\n- moving a citation onto another sid;\n- renaming an identifier everywhere it is spelled.",
  ruText: "Изменение SpecTag теста или символа — это изменение самого теста или кода. Ни тест, ни код не меняют:\n- новое название теста при прежнем SpecTag;\n- переформулировка остальных комментариев символа;\n- перенос ссылки на другой sid;\n- переименование идентификатора везде, где он написан.",
  reason: "No test or code is written or changed for a draft rule (§s-utvqbypzhmgndug). Were a change to a SpecTag not counted, a test or code could be moved onto a draft rule with nothing refusing it. A new name, a comment or a spelling changes nothing a test verifies or code does.",
  ruReason: "Для правила со статусом черновик не пишут и не меняют ни тесты, ни код (§s-utvqbypzhmgndug). Если бы изменение SpecTag не считалось изменением, тест или код можно было бы перевести на черновик, и ничто бы этого не отклонило. Новое название, комментарий или написание не меняют ничего в том, что проверяет тест или делает код.",
  changes: [
    "По вашему решению от 11 ноября узел объединяет прежние 9.4 «Привязка теста к одобренному правилу» и 9.5 «Какой код обязан называть одобренный узел». Sid остался от 9.5, sid 9.4 удалён.",
    "Заголовок новый: «What counts as a change to a test or to code» / «Что считается изменением теста и кода».",
    "Ушли первые фразы обоих узлов. Из 9.4: «A test is written or changed only for an approved node, and is bound to it using a SpecTag», её держит согласованный 1.3.2. Из 9.5: «Only a symbol whose code a commit changes must name an approved node», её держат 1.3.2 и 1.5.2, и с ней коммит как действующее лицо.",
    "Остались и соединены: ваша фраза из 9.4 о названии теста, теперь первый пункт списка («a new name of a test whose SpecTag stays the same»), и из 9.5 «A change to its SpecTags is a change to its code» вместе со списком того, что код не меняет. Главная фраза теперь говорит о тесте и коде вместе, пункт о комментариях — о комментариях символа.",
    "Обоснование новое, из обоих: 9.4 говорило о черновике, 9.5 — о правиле на пересмотре; что изменение SpecTag нельзя было бы отклонить, взято из обоснования нынешнего 3.5.",
  ],
};
delete d["9.5"].agreed;

fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

// The page row of 9.4 takes 9.5's columns, so that remove-node.mjs 9.5 leaves the merged row.
const page = new URL("base-structure.html", here);
let html = fs.readFileSync(page, "utf8");
const lines = html.split("\n");
const i4 = lines.findIndex((l) => l.trim().startsWith('["9.4",'));
const i5 = lines.findIndex((l) => l.trim().startsWith('["9.5",'));
if (i4 < 0 || i5 < 0) throw new Error("rows not found");
lines[i4] = lines[i5].replace('["9.5",', '["9.4",');
fs.writeFileSync(page, lines.join("\n"));
console.log(lines[i4].trim().slice(0, 160));
