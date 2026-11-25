// Node 2.5 "The archive", agreed 2026-11-09: the owner's design of 2026-11-12 («принимаем»), that an archived node
// loses its sid, is proposed beside the agreed wording, which stands until the owner takes a proposal. The reviewer's
// fixes are in: "its own sid"; the chain paragraph says which node names which, covers several archived nodes naming
// one replacement and a replacement deleted before approval ("removed", not "archived"); the reason says why a sid
// kept in the archive is a hazard, and its sentence restating the restored node is cut.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.5"];
if (!n || n.sidValue !== "s-f2b5zvc565s242f") throw new Error("2.5 is not the archive");
n.proposals = [
  {
    where: "текст, первый абзац, новое предложение в конце",
    en: "It goes there without its own sid.",
    ru: "Туда он попадает без своего sid.",
    why: "Ваше решение: в архиве нет sid, поэтому архив больше не участвует в проверке уникальности sid. Принимается вместе с предложением 4, которое объясняет, зачем.",
  },
  {
    where: "текст, новый второй абзац",
    en: "An archived node names as its replacement only a node of the specification. When that replacement is removed from the specification in turn, each archived node naming it names the replacement's own replacement instead, or none where the replacement has none.",
    ru: "Архивный узел называет своей заменой только узел спецификации. Когда из спецификации уходит и эта замена, каждый архивный узел, который её называет, называет вместо неё её собственную замену, а если у неё замены нет — никакую.",
    why: "Замена может сама уйти из спецификации: в архив или, если её так и не одобрили, удалением. Без этого абзаца архивный узел называл бы sid, которого нет ни у одного узла.",
  },
  {
    where: "текст, последний абзац, новое предложение в конце",
    en: "A node restored from the archive returns to the specification as a new node, with a new sid.",
    ru: "Узел, восстановленный из архива, возвращается в спецификацию как новый узел, с новым sid.",
    why: "У архивного узла нет sid, поэтому при восстановлении он получает новый. Одобрение привязано к sid, так что восстановленный узел остаётся черновиком, пока его не одобрят, как любой новый узел.",
  },
  {
    where: "обоснование, второй абзац вместо нынешнего",
    en: "A sid kept in the archive could come back with a copy of its node and would then name two nodes.",
    ru: "sid, оставленный в архиве, мог бы вернуться вместе с копией своего узла и тогда называл бы два узла.",
    why: "Нынешний второй абзац говорит, что ссылка на архивный узел ломается, когда его удаляют из архива. Без sid на архивный узел сослаться нельзя, так что этот абзац больше не верен. Новый объясняет, зачем узел уходит без sid. Принимается вместе с предложением 1.",
  },
  {
    where: "пример (необязательное свойство examples; правило 7.16 о примерах — ещё черновик)",
    en: "A is archived, naming B as its replacement. Later B is archived, naming C. A then names C.",
    ru: "A уходит в архив, называя своей заменой B. Позже в архив уходит B, называя C. Теперь A называет C.",
    why: "Показывает цепочку замен из предложения 2 на конкретном случае.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("2.5 proposals:", n.proposals.length);
