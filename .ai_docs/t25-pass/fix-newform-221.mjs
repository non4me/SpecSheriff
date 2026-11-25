// The fresh reviewer of 7.16 (2026-11-11): "a typical case" and "the nearest mistake" say of what (7.8); the last
// sentence ends at "the text holds", since a disagreement may show a text saying less than its owners meant, not a
// wrong example, and "the example is mended" named nobody (7.3, 7.5); "examples of what its text states", so that a
// term may hold one too; the node shows an example of its own, the reviewer's.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["7.16"];
if (b.sidValue !== "s-pqemhjzvxtw4byc" || b.agreed) throw new Error("unexpected 7.16");

b.text = "A node may hold examples of what its text states, apart from its text, in its property `examples`. An example shows a typical case of applying the rule and, where it helps, the mistake that comes closest to it. An example requires nothing. Where an example and the text disagree, the text holds.";
b.ruText = "Узел может приводить примеры того, что говорит его текст, отдельно от текста, в своём свойстве `examples`. Пример показывает обычный случай применения правила и, где это помогает, ближайшую к нему ошибку. Пример ничего не требует. Если пример и текст расходятся, верен текст.";
b.reason = "A reader, an agent above all, grasps a rule faster from an example of it than from its text alone. Kept apart from the text, an example neither lengthens it nor reads as a further requirement.";
b.ruReason = "Читатель, прежде всего агент, понимает правило по его примеру быстрее, чем по одному тексту. Отдельно от текста пример не удлиняет его и не читается как ещё одно требование.";
b.examples = ["A rule says: the system refuses a request whose token has expired. An example of it: a request sent a second after its token expired is refused. So not: the request is refused and its user is signed out, which the text does not require."];
b.ruExamples = ["Правило говорит: система отклоняет запрос, токен которого истёк. Пример к нему: запрос, отправленный через секунду после истечения его токена, отклоняется. Но не так: запрос отклоняется, а его пользователь выходит из системы — этого текст не требует."];
b.changes.push("По рецензенту: сказано, обычный случай чего и ошибка ближайшая к чему (7.8); последняя фраза кончается на «верен текст» — расхождение может показать и текст, который говорит меньше, чем имели в виду его ответственные; «что говорит его текст» вместо «чего требует», чтобы пример мог быть и у термина; у узла есть свой пример.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
