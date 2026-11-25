// The owner, 2026-11-13: the specification as a whole is approved by an entry of its own, made by one of its owners,
// with no rule in between («Делаем одобрение спецификации отдельной записью ответственного, без правила-посредника?» —
// «ок»). The owner's ground: the approval of the specification has nothing to do with the approval of its nodes; the
// specification, a section and a node have three different approval procedures (agreed 1.3.3), so no node's approval
// may affect the specification. Drafts node 10.6, the present 5.4, which carried out the procedure through a rule of the
// project's own guidelines. Its second paragraph, on approving a specification whose code carries no SpecTags, goes to
// the extension "Adoption of an existing project" (12.6.2), as the owner ruled on 2026-11-11. The node keeps its sid.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["10.6"]) throw new Error("10.6 exists");

d["10.6"] = {
  from: "5.4",
  sid: "kept",
  sidValue: "s-qzthyh7yqvfhsa2",
  title: "The specification's status is its owners' act",
  ruTitle: "Статус спецификации — решение её ответственных",
  text:
    "One of the specification's owners approves the specification or returns it to draft. " +
    "Each such act is recorded in an entry of its own that names the owner who made it. " +
    "The latest entry gives the specification's status. With no entry, the specification is a draft.\n\n" +
    "The status of a node or a section has no effect on the specification's status.",
  ruText:
    "Одобряет спецификацию или возвращает её в черновик один из её ответственных. " +
    "Каждое такое действие записывается отдельной записью, которая называет сделавшего его ответственного. " +
    "Статус спецификации задаёт последняя такая запись. Пока записей нет, спецификация — черновик.\n\n" +
    "Статус узла или раздела на статус спецификации не влияет.",
  reason:
    "Whether the specification is approved decides how strictly the checks hold its code and tests (§s-kkbqcb9xrpaepwn, §s-xhcmchcngykvn2k). " +
    "So its owners decide it, both ways, by an act of their own.\n\n" +
    "They must be able to put it back to draft, whatever leads them to it. " +
    "While the specification changes at its core, as when another version of it is adopted or the system's architecture changes, the code and the tests are secondary.\n\n" +
    "Were the status tied to a node, anyone could change it by editing that node or removing it.",
  ruReason:
    "От того, одобрена ли спецификация, зависит, насколько строго проверки держат её код и тесты (§s-kkbqcb9xrpaepwn, §s-xhcmchcngykvn2k). " +
    "Поэтому решают это её ответственные, в обе стороны, отдельным действием.\n\n" +
    "Они должны иметь возможность вернуть её в черновик, что бы к этому ни привело. " +
    "Пока спецификация меняется в своей основе, например при переходе на другую её версию или при смене архитектуры системы, код и тесты вторичны.\n\n" +
    "Будь статус привязан к узлу, любой мог бы изменить его, поправив этот узел или удалив его.",
  changes: [
    "По вашему решению от 13 ноября: одобрение спецификации — отдельная запись ответственного, без правила-посредника. Статус узла или раздела на статус спецификации не влияет, как и говорит согласованный 1.3.3: у спецификации, раздела и правила три разные процедуры.",
    "Нынешний 5.4 делал это через правило собственных guidelines проекта: спецификация одобрена, пока одобрено это правило. Это правило и его отзыв ушли.",
    "Второй абзац 5.4 (спецификацию не одобряют, пока у кода или тестов нет SpecTag) уходит в расширение «Адоптация существующего проекта» (12.6.2), по вашему решению от 11 ноября.",
    "Последний абзац обоснования был о том, что любой может вернуть правило в черновик правкой; теперь он говорит, почему статус не привязан к узлу.",
    "Где хранится запись, решают описание инструментов и T28. Сохраняет sid 5.4.",
  ],
};
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const h = fs.readFileSync(pagePath, "utf8");
const a = '["10.6","same",0,"5.4",';
if (!h.includes(a)) throw new Error("row 10.6 not found");
fs.writeFileSync(pagePath, h.replace(a, '["10.6","split",0,"5.4",'));
console.log("10.6 drafted");
