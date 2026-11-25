// Node 2.5 "The archive", the reviewer's report on the node as a whole, after the owner accepted five proposals.
// Two English-only fixes are made, the Russian unchanged:
// - "had to go" becomes "had to be removed";
// - "which later work has to take into account" becomes ", and later work has to take that into account".
// Six proposals are set beside the wording, for the owner to accept or reject:
// - the chain paragraph split into sentences (rule 7.5);
// - the two exceptions set out as a list (rule 7.6);
// - "in its last wording" moved from the reason into the text (rule 1.2.3);
// - the former sid not kept in any form (the owner's ruling of 2026-11-12);
// - a restored node approved by an owner, never by an agent in an owner's name (the owner's ruling; rule 1.3.6);
// - the reason rewritten to speak of the rule as a whole (rules 7.14 and 7.8).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.5"];

const fix = (field, from, to) => {
  if (n[field].split(from).length !== 2) throw new Error(`2.5.${field}: "${from}" is not found exactly once`);
  n[field] = n[field].replace(from, to);
};
fix("reason", "the rules that had to go", "the rules that had to be removed");
fix("reason", "an approach that was mistaken, which later work has to take into account", "an approach that was mistaken, and later work has to take that into account");

n.proposals = [
  {
    where: "текст, второй абзац вместо нынешнего",
    en: "An archived node names only a node of the specification as its replacement. When that replacement is removed from the specification in turn, its own replacement takes its place in every archived node that names it. If the removed replacement has no replacement of its own, those archived nodes name no replacement.",
    ru: "Архивный узел называет своей заменой только узел спецификации. Когда из спецификации удаляется и эта замена, её место в каждом архивном узле, который её называет, занимает её собственная замена. Если у удалённой замены своей замены нет, эти архивные узлы не называют никакой.",
    why: "Правило 7.5, одна мысль в предложении: сейчас одно предложение держит оба случая — у замены есть своя замена и нет. Смысл прежний.",
  },
  {
    where: "текст, третий абзац вместо нынешнего",
    en: "Each of these is deleted outright, whatever cites it:\n\n- a section with no node left in it;\n- a node that was never approved.",
    ru: "Каждый из этих узлов удаляется окончательно, что бы на него ни ссылалось:\n\n- раздел, в котором не осталось ни одного узла;\n- узел, на который никогда не давали одобрения.",
    why: "Правило 7.6: два исключения одного вида идут списком. Заодно видно, что «что бы на него ни ссылалось» относится к обоим.",
  },
  {
    where: "текст, первый абзац, второе предложение вместо нынешнего",
    en: "Such a node goes there in its last wording, together with the reason for its removal and the sid of the node that replaces it, if one does.",
    ru: "Такой узел попадает туда в последней формулировке, вместе с причиной удаления и sid узла, который его заменяет, если такой есть.",
    why: "Правило 1.2.3: обоснование ничего не требует. То, что узел хранится в последней формулировке, — требование, а сейчас оно есть только в обосновании.",
  },
  {
    where: "текст, первый абзац, новое предложение в конце",
    en: "Nor does it keep its former sid in any form.",
    ru: "Свой прежний sid он тоже ни в каком виде не хранит.",
    why: "Ваше решение: прежний sid не хранится ни с префиксом «a-», ни в записи об архивации. Слова «нет собственного sid» этого не исключают: «a-…» можно счесть уже не sid.",
  },
  {
    where: "текст, последний абзац, новое предложение в конце",
    en: "Like any new node, it is approved by one of its owners, never by an agent in an owner's name.",
    ru: "Как и любой новый узел, его одобряет один из его ответственных, а не агент от имени ответственного.",
    why: "Ваше решение: восстановленный узел одобряется заново. Без этого предложения правило 1.3.6 позволило бы агенту одобрить его от имени ответственного, ведь его формулировку уже одобряли.",
  },
  {
    where: "обоснование целиком вместо нынешнего",
    en: "The archive keeps the removed rules that the code may have implemented, and what later work can learn from them. An approved rule may have been implemented, and its last wording shows a line of reasoning or an approach to its problem that proved mistaken. A node that was never approved was never implemented, and a section requires nothing, so in the archive either would only bury the rules that had to be removed.\n\nA node may be deleted from the archive at any time, so nothing may depend on an archived node. So an archived node has no sid by which anything could name it. For the same reason, it names as its replacement only a node of the specification. A sid kept in the archive could also come back into the specification in a copy of its node, and would then name two nodes.",
    ru: "Архив хранит удалённые правила, которые код мог реализовать, и то, чему по ним может научиться дальнейшая работа. Одобренное правило могли реализовать, а его последняя формулировка показывает логику или подход к задаче, оказавшиеся ошибочными. Узел, на который никогда не давали одобрения, никогда не реализовывался, а раздел ничего не требует, поэтому в архиве и тот и другой лишь заслоняли бы правила, которые пришлось убрать.\n\nУзел могут удалить из архива в любой момент, поэтому ничто не должно зависеть от архивного узла. Так что у архивного узла нет sid, по которому что-либо могло бы его назвать. По той же причине он называет своей заменой только узел спецификации. К тому же sid, оставленный в архиве, мог бы вернуться в спецификацию в копии своего узла и тогда называл бы два узла.",
    why: "Рецензент: сейчас каждое предложение обоснования объясняет одно предложение текста (правило 7.14), а абзац о цепочке замен не объяснён вовсе (1.2.3). Новое обоснование говорит один раз, зачем хранить удалённые одобренные правила, почему не хранить остальное и почему ничто не может ссылаться на архивный узел. Последнее объясняет и цепочку замен. «Подход к задаче» вместо просто «подхода»: правило 7.8 требует сказать, к чему подход.",
  },
];

n.changes.push(
  "Только английский, по замечаниям читателя EngStickler; русский текст не изменился: «had to be removed» вместо «had to go»; " +
    "«and later work has to take that into account» вместо «which later work has to take into account». " +
    "Рецензент проверил узел целиком; его замечания — шесть предложений рядом с формулировкой."
);

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason);
