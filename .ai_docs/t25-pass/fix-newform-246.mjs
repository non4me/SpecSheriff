// Node 2.1: the owner accepted the proposal of fix-newform-245.mjs (2026-11-13, «ок»), so the node is agreed again in that
// wording. Node 2.3, agreed on 2026-11-08: a single, complete new wording proposed to the owner. It carries out the owner's
// decisions of 2026-11-13: the appendix of the tools is not part of the guidelines, and the extensions of the guidelines are
// not part of the SpecSheriff guidelines. A project's own rules may still refine a rule of an extension it chose, as they
// could while an extension's rules counted as rules of the SpecSheriff guidelines.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["2.1"];
const p = a.proposals[0];
const pick = (s, re) => {
  const m = s.match(re);
  if (!m) throw new Error(`no match for ${re}`);
  return m[1].trim();
};
a.title = pick(p.en, /^Title: (.*)\n/);
a.text = pick(p.en, /\n\nText: ([\s\S]*?)\n\nReason: /);
a.reason = pick(p.en, /\n\nReason: ([\s\S]*)$/);
a.ruTitle = pick(p.ru, /^Заголовок: (.*)\n/);
a.ruText = pick(p.ru, /\n\nТекст: ([\s\S]*?)\n\nОбоснование: /);
a.ruReason = pick(p.ru, /\n\nОбоснование: ([\s\S]*)$/);
delete a.proposals;
a.agreed = "2026-11-13";
a.changes.push(
  "Вы приняли предложение (2026-11-13): описание инструментов — отдельный документ и в guidelines не входит; что проверяется, когда и чего стоит сбой, остаётся в правилах guidelines. В обоснование добавлен довод из принципа «Три документа, три скорости изменения».",
);

const n = d["2.3"];
n.proposals = [
  {
    where: "текст и обоснование целиком",
    en:
      "Text: The guidelines of a project are:\n\n" +
      "- the SpecSheriff guidelines, made up of the rules every project shares;\n" +
      "- the extensions of the guidelines that the project has chosen (§s-mbmnsnxenmavu3z);\n" +
      "- the project's own guidelines, which set out what only its specification needs, such as who owns the specification.\n\n" +
      "Beyond what the SpecSheriff guidelines and the chosen extensions require of a project's own guidelines, the project may add rules of its own where it needs them.\n\n" +
      "Each rule of a project's own guidelines refines or extends a rule of the SpecSheriff guidelines or of a chosen extension. It never contradicts that rule.\n\n" +
      "Reason: The SpecSheriff guidelines, shared by every project, let a tool, a skill or a reader carry over from one project to the next. A project may also need what they cannot foresee.\n\n" +
      "Refining or extending the rules it builds on and never contradicting them, a project's own rules extend them as the technical appendix extends the base. " +
      "A rule of the SpecSheriff guidelines or of an extension can then be relied on in every project that uses it, without reading that project's own rules.",
    ru:
      "Текст: Guidelines проекта — это:\n\n" +
      "- SpecSheriff guidelines, которые состоят из правил, общих для всех проектов;\n" +
      "- расширения guidelines, которые выбрал проект (§s-mbmnsnxenmavu3z);\n" +
      "- собственные guidelines проекта, которые держат то, что нужно только его спецификации, например ответственные за спецификацию.\n\n" +
      "Сверх того, что требуют от собственных guidelines проекта SpecSheriff guidelines и выбранные расширения, проект может добавлять собственные правила, если они ему нужны.\n\n" +
      "Каждое правило собственных guidelines проекта уточняет или расширяет правило SpecSheriff guidelines или выбранного расширения. Оно никогда этому правилу не противоречит.\n\n" +
      "Обоснование: SpecSheriff guidelines, общие для всех проектов, позволяют инструменту, skill или читателю переходить из одного проекта в другой. Проекту может понадобиться и то, чего они не могут предвидеть.\n\n" +
      "Уточняя или расширяя правила, на которых они строятся, и никогда им не противореча, собственные правила проекта расширяют их так же, как техническое приложение расширяет базу. " +
      "Тогда на правило SpecSheriff guidelines или расширения можно положиться в любом проекте, который его использует, не читая собственных правил этого проекта.",
    why:
      "По вашим решениям от 13 ноября. Описание инструментов из SpecSheriff guidelines убрано: это отдельный документ. " +
      "Выбранные расширения — отдельный пункт: в SpecSheriff guidelines они больше не входят. " +
      "Собственные правила проекта могут уточнять и правило выбранного расширения: раньше правила расширений считались правилами SpecSheriff guidelines, и это было разрешено, а без этих слов разрешение пропало бы. Обоснование изменено так же.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("2.1 agreed:", a.ruTitle, "| 2.3 proposal set");
