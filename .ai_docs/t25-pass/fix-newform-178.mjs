// The owner of 2026-11-10 on 9.4: title, text and reason each said their own thing, so they are brought to the text, which stands. The title is the owner's
// «Привязка теста к правилу» with "approved", the node's matter, «Привязка теста к одобренному правилу», "Binding a test to an approved rule" ("связь" is the term
// for a link, "способ привязки" is 9.3's matter); the reason explains each sentence of the text in its words.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");
b.title = "Binding a test to an approved rule";
b.ruTitle = "Привязка теста к одобренному правилу";
b.reason = "A rule under revision is a draft, while the tests written for its earlier wording still stand. So an approved node is required only of a test that is added or changed. A test whose SpecTag stays the same states nothing new.";
b.ruReason = "Правило на пересмотре остаётся черновиком, а тесты, написанные для его прежней формулировки, продолжают стоять. Поэтому одобренный узел требуется только от теста, который добавляют или меняют. Тест, чей SpecTag остался прежним, ничего нового не утверждает.";
b.changes = [...b.changes, "По вашему решению заголовок и обоснование приведены к тексту. Заголовок ваш, с предметом узла: «Привязка теста к одобренному правилу». Обоснование объясняет каждую фразу текста её же словами."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.title, "|", b.ruTitle);
