// The fresh reviewer of the new 9.6 (2026-11-11): the limit for the guidelines' nodes names the tools as its
// subject (✗ 7.3); the reason names the code, not a bare "what implements it" (✗ 7.8), and "fall out of step"
// replaces "drift", a word the method's check of drift uses; "after every edit" replaces "whenever … change",
// since by agreed 9.4 a renamed test is no change while `meta.tests` names a test by its name, so the owner's
// ruling that the lists be built and exact decides it (as 1.3.8 says "after every change to the specification").
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.6"];
if (b.sidValue !== "s-rwqzepmrt77rv35" || b.agreed) throw new Error("unexpected 9.6");

b.text = "The SpecSheriff tools build a node's `meta.code` and `meta.tests` from the SpecTags that bind code and tests to it. They build them anew after every edit to the code, the tests or the specification. Nobody writes them by hand.\n\nIn a node of the SpecSheriff guidelines, the SpecSheriff tools list only the code and the tests of the repository where the guidelines are written.";
b.ruText = "Инструменты SpecSheriff строят `meta.code` и `meta.tests` узла из SpecTag, которые связывают с ним код и тесты. Они строят их заново после каждой правки кода, тестов или спецификации. Вручную их никто не пишет.\n\nВ узле SpecSheriff guidelines инструменты SpecSheriff перечисляют только код и тесты того репозитория, в котором пишутся guidelines.";
b.reason = "A node's lists show a reader who has the node open the code that implements it and the tests written for it. Built from the SpecTags, they cannot fall out of step with the code as a list kept by hand does.";
b.ruReason = "Списки узла показывают читателю, открывшему узел, код, который его реализует, и тесты, написанные для него. Построенные из SpecTag, они не могут разойтись с кодом, как расходится список, который ведут вручную.";
b.changes.push("По замечаниям рецензента: во втором абзаце подлежащее — инструменты SpecSheriff; в обосновании назван код, а не «что его реализует»; «после каждой правки» вместо «при каждом изменении», потому что по согласованному 9.4 переименование теста не изменение, а `meta.tests` называет тест по имени.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
