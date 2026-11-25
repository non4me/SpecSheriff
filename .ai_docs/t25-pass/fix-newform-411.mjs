// The wording checker's findings on the drafts of fix-newform-410.mjs, as the agent judged them:
// - 10.6: the title states the rule (7.3.1); "and nobody else" and "has no effect on" are negations, and the third paragraph
//   of the text is replaced by "Only the latest such entry sets…"; "They" and "it" in the reason referred to the previous
//   paragraph; SpecTag and the checks are cited at their first use; "the owner" names the approving owner; the new paragraph
//   of the reason no longer restates the text.
// - 9.5: the checks are named as the actor; the two conditions are a list; "does not change" is stated as "leaves it
//   unchanged"; SpecTag is cited; the reason no longer restates the text's condition. "carries" stays, the agreed word of
//   1.5.2 and of row 10.1.26.
// - 1.3.2: "a push runs no test" becomes "a push runs without its tests"; the findings on its agreed bullets are left for
//   the reading of section 1 as a whole.
// - 1.3.3: "the tests" now names whose tests, and cites 5.3.
// The temporary keys are rewritten to match, and are removed before the page is built.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-411.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const T53 = "s-xhcmchcngykvn2k";
const TAG = "s-8xw4mgvpexyvw5q";
const TABLE = "s-jau82aq9juv9zzh";
const DECIDED = "По вашему решению от 17 ноября статус одобрения спецификации и проверка SpecTag развязаны: статус спецификации решает только, запускаются ли тесты при push.";

const proposal = (n, f, why) => ({
  where: f.where,
  en: [`Title: ${f.title ?? n.title}`, `Text: ${f.text ?? n.text}`, ...(f.examples ?? n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${f.reason ?? n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${f.ruTitle ?? n.ruTitle}`, `Текст: ${f.ruText ?? n.ruText}`, ...(f.ruExamples ?? n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${f.ruReason ?? n.ruReason}`].join("\n\n"),
  why,
});
const temp = (key, n, f) => {
  const t = { ...n };
  for (const k of ["title", "ruTitle", "text", "ruText", "reason", "ruReason", "examples", "ruExamples"]) if (f[k] !== undefined) t[k] = f[k];
  delete t.proposals;
  d[`${key}~`] = t;
};

// 10.6
{
  const n = d["10.6"];
  const reasons = n.reason.split("\n\n");
  const ruReasons = n.ruReason.split("\n\n");
  if (!reasons[1].startsWith("They may need") || !ruReasons[1].startsWith("Им может понадобиться")) throw new Error("10.6: paragraph 2 of the reason moved");
  const f = {
    where: "заголовок, текст, пример и обоснование",
    title: "The specification's approval status",
    ruTitle: "Статус одобрения спецификации",
    text: [
      "Only an owner of the specification approves it or returns it to draft. That owner records each such act in a separate entry, which names that owner. Only the latest such entry sets the specification's approval status.",
      `Before the approval procedure records an approval of the specification, it shows the approving owner what the checks in the table of checks (§${TABLE}) report on the specification and the code. Such a report names, for example, a symbol without a SpecTag (§${TAG}) or an approved rule that has no code. If the checks report anything, the procedure records the approval only once the owner confirms it.`,
    ].join("\n\n"),
    ruText: [
      "Одобрить спецификацию или вернуть её в черновик может только её ответственный. Каждое такое действие этот ответственный фиксирует отдельной записью, в которой назван он сам. Статус одобрения спецификации задаёт только последняя такая запись.",
      `Прежде чем процедура одобрения запишет одобрение спецификации, она показывает одобряющему ответственному, о чём проверки из таблицы проверок (§${TABLE}) сообщают по спецификации и коду. Такое сообщение называет, например, символ без SpecTag (§${TAG}) или одобренное правило, у которого нет кода. Если проверки о чём-то сообщают, процедура записывает одобрение, только когда ответственный его подтвердит.`,
    ].join("\n\n"),
    examples: [...n.examples, "Two symbols of old code have no SpecTag. An owner starts the approval procedure, sees the two symbols listed, confirms, and the specification is approved. But not: the procedure refuses to approve the specification until every symbol has a SpecTag."],
    ruExamples: [...n.ruExamples, "У двух символов старого кода нет SpecTag. Ответственный запускает процедуру одобрения, видит эти два символа в списке, подтверждает, и спецификация одобрена. Но не так: процедура отказывается одобрить спецификацию, пока SpecTag не будет у каждого символа."],
    reason: [
      `Whether the specification is approved determines whether the tests run on a push (§${T53}). So its owners decide it, in both directions, by an act of their own.`,
      `The owners may need to return the specification to draft for any reason. ${reasons[1].split(". ").slice(1).join(". ")}`,
      reasons[2],
      "The owners decide by what they see, and old code without a SpecTag may still work correctly. So such code does not block the approval. The approval procedure shows the checks' reports first, so that approving the specification is a deliberate decision rather than an oversight.",
    ].join("\n\n"),
    ruReason: [
      `От того, одобрена ли спецификация, зависит, запускаются ли тесты при push (§${T53}). Поэтому решают это её ответственные, в обе стороны, отдельным действием.`,
      `Ответственным может понадобиться вернуть спецификацию в черновик по любой причине. ${ruReasons[1].split(". ").slice(1).join(". ")}`,
      ruReasons[2],
      "Ответственные решают по тому, что видят, а старый код без SpecTag может работать правильно. Поэтому такой код одобрению не мешает. Процедура одобрения сначала показывает сообщения проверок, чтобы одобрение спецификации было осознанным решением, а не недосмотром.",
    ].join("\n\n"),
  };
  n.proposals = [proposal(n, f, `${DECIDED} Второй абзац текста новый: прежде чем записать одобрение спецификации, процедура одобрения показывает одобряющему ответственному, о чём сообщают проверки, и, если они о чём-то сообщают, записывает одобрение только после его подтверждения. Добавлен второй пример. Обоснование: первый абзац говорит о тестах при push вместо строгости проверок, ссылка на 1.3.2 убрана; последний абзац новый. По замечаниям проверки формулировок: заголовок называет тему узла, а не формулирует правило (7.3.1); «и никто другой» и «не влияет» заменены утверждениями со словом «только» (правило о формулировке через отрицание); последний абзац текста («статус одобрения узла или раздела на статус спецификации не влияет») заменён словом «только» в «статус задаёт только последняя такая запись», а его смысл показывает первый пример; во втором абзаце обоснования «им» и «её» заменены на «ответственным» и «спецификацию», потому что ссылались на прошлый абзац; при первом упоминании процитированы SpecTag и таблица проверок.`)];
  temp("10.6", n, f);
}

// 9.5
{
  const n = d["9.5"];
  n.text = `The checks report, rather than refuse, a symbol of the system's code outside its tests, or a test, if both of these hold:\n- it carries no SpecTag (§${TAG});\n- the commit leaves it unchanged.`;
  n.ruText = `Проверки только сообщают о символе кода системы вне тестов или о тесте и не отклоняют коммит, если выполнены оба условия:\n- у него нет SpecTag (§${TAG});\n- коммит его не меняет.`;
  n.reason = "Code and tests written before their rules may carry no SpecTag and still work correctly. Refusing every symbol and every test that carries no SpecTag would refuse every commit until all of them had their rules.\n\nThe relief is limited to what a commit leaves unchanged, so that every change to code is bound to its rules from the start.";
  n.ruReason = "Код и тесты, написанные раньше своих правил, могут не иметь SpecTag и при этом работать правильно. Если отклонять каждый символ и каждый тест без SpecTag, отклонялся бы каждый коммит, пока у всех них не появятся правила.\n\nПослабление ограничено тем, чего коммит не меняет, чтобы каждое изменение кода с самого начала было связано со своими правилами.";
  n.changes = n.changes.filter((c) => !c.startsWith("Текст:") && !c.startsWith("Обоснование"));
  n.changes.push(
    "Текст: убрано условие «спецификация проекта — черновик». Осталось одно условие сверх отсутствия SpecTag: коммит не меняет символ или тест. Оба условия теперь списком, проверки названы как действующее лицо, SpecTag процитирован при первом упоминании. Новый и изменённый код без SpecTag по-прежнему отклоняется (10.1.26, 10.1.26a).",
    "Обоснование переписано. Ушли рассуждения о переходе проекта на метод и о черновике: «While the specification is a draft, the work is above all on the specification…» и рассуждение о SpecTag, добавленном к символу. Осталось, почему старый код без SpecTag не отклоняют и почему послабление ограничено тем, чего коммит не меняет.",
  );
}

// 1.3.2
{
  const n = d["1.3.2"];
  const items = n.text.split("\n- ");
  const ruItems = n.ruText.split("\n- ");
  items[1] = `While the specification as a whole is a draft, a push runs without its tests (§${T53}).`;
  ruItems[1] = `Пока вся спецификация — черновик, push проходит без запуска тестов (§${T53}).`;
  const p = n.proposals[0];
  const f = { where: p.where, text: items.join("\n- "), ruText: ruItems.join("\n- "), reason: d["1.3.2~"].reason, ruReason: d["1.3.2~"].ruReason };
  n.proposals = [proposal(n, f, p.why.replace("Остальное не меняется.", "Оставшийся пункт сформулирован утверждением: «push проходит без запуска тестов». Остальное не меняется."))];
  temp("1.3.2", n, f);
}

// 1.3.3
{
  const n = d["1.3.3"];
  const reasons = n.reason.split("\n\n");
  const ruReasons = n.ruReason.split("\n\n");
  reasons[0] = `Whether the specification is approved decides whether the tests of the system's code run on a push (§${T53}). So its owners decide it by an act of their own, and not by how many rules are approved.`;
  ruReasons[0] = `От того, одобрена ли спецификация, зависит, запускаются ли при push тесты кода системы (§${T53}). Поэтому решают её ответственные своим отдельным действием, а не тем, сколько правил одобрено.`;
  const f = { where: "первое предложение обоснования", reason: reasons.join("\n\n"), ruReason: ruReasons.join("\n\n") };
  n.proposals = [proposal(n, f, `${DECIDED} В первом предложении обоснования «насколько строго проверки держат её код и тесты» заменено на «запускаются ли при push тесты кода системы», с ссылкой на 5.3. Остальное не меняется.`)];
  temp("1.3.3", n, f);
}

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
