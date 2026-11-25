// Finding A, settled by the owner on 2026-11-17: the specification's approval status and the check of SpecTags are
// decoupled. The specification's approval status decides only whether the tests run on a push. A symbol or a test
// without a SpecTag that a commit does not change is reported, whatever that status. The ban on approving the
// specification while code has no SpecTag is removed: the approval procedure shows the owner what the checks report and,
// if they report anything, records the approval only once the owner confirms it («просто предусмотреть, что если
// обнаружим код без спецтегов, то выводить предупреждение. И спрашивать, подтверждаете ли вы…»).
// This script writes:
// - proposals for 10.6, 1.3.2 and 1.3.3, with temporary keys "10.6~", "1.3.2~", "1.3.3~" for the wording checker;
// - the draft of 9.5, the present node 5.2 (s-kkbqcb9xrpaepwn), which stays in the base instead of going to the
//   Adoption extension, and its row on the page (run after remove-node.mjs 14.3, 14.2, 14.1 and insert-node.mjs 9.5);
// - the removal of "while the specification is a draft" from the reason of 10.1, which the decision itself removes.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-410.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const T53 = "s-xhcmchcngykvn2k";
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

// 10.6: the status decides only the tests on a push; the approval procedure shows the checks' reports first.
{
  const n = d["10.6"];
  const p = n.text.split("\n\n");
  const rp = n.ruText.split("\n\n");
  const addEn = "Before the approval procedure records an approval of the specification, it shows the owner what the checks report on the specification and the code, such as a symbol without a SpecTag or an approved rule that has no code. If the checks report anything, the procedure records the approval only once the owner confirms it.";
  const addRu = "Прежде чем процедура одобрения запишет одобрение спецификации, она показывает ответственному, о чём проверки сообщают по спецификации и коду, например о символе без SpecTag или об одобренном правиле, у которого нет кода. Если проверки о чём-то сообщают, процедура записывает одобрение, только когда ответственный его подтвердит.";
  const reasons = n.reason.split("\n\n");
  const ruReasons = n.ruReason.split("\n\n");
  reasons[0] = `Whether the specification is approved determines whether the tests run on a push (§${T53}). So its owners decide it, in both directions, by an act of their own.`;
  ruReasons[0] = `От того, одобрена ли спецификация, зависит, запускаются ли тесты при push (§${T53}). Поэтому решают это её ответственные, в обе стороны, отдельным действием.`;
  reasons.push("An owner decides by what they see. Old code without a SpecTag may still work correctly, so it does not stop the owners from approving the specification. The checks' reports, shown before the approval is recorded, make such an approval a deliberate decision rather than an oversight.");
  ruReasons.push("Ответственный решает по тому, что видит. Старый код без SpecTag может работать правильно, поэтому он не мешает ответственным одобрить спецификацию. Сообщения проверок, показанные до записи одобрения, делают такое одобрение осознанным решением, а не недосмотром.");
  const f = {
    where: "текст, пример и обоснование",
    text: [p[0], addEn, ...p.slice(1)].join("\n\n"),
    ruText: [rp[0], addRu, ...rp.slice(1)].join("\n\n"),
    examples: [...n.examples, "Two symbols of old code have no SpecTag. An owner starts the approval procedure, sees the two symbols listed, confirms, and the specification is approved. But not: the procedure refuses to approve the specification until every symbol has a SpecTag."],
    ruExamples: [...n.ruExamples, "У двух символов старого кода нет SpecTag. Ответственный запускает процедуру одобрения, видит эти два символа в списке, подтверждает, и спецификация одобрена. Но не так: процедура отказывается одобрить спецификацию, пока SpecTag не будет у каждого символа."],
    reason: reasons.join("\n\n"),
    ruReason: ruReasons.join("\n\n"),
  };
  n.proposals = [proposal(n, f, `${DECIDED} Второй абзац текста новый: прежде чем записать одобрение спецификации, процедура одобрения показывает ответственному, о чём сообщают проверки, и, если они о чём-то сообщают, записывает одобрение только после его подтверждения. Добавлен второй пример: обычный случай и ближайшая ошибка. В первом абзаце обоснования «насколько строго проверки держат её код и тесты» заменено на «запускаются ли тесты при push», ссылка на 1.3.2 убрана. Последний абзац обоснования новый: почему код без SpecTag не мешает одобрению и зачем показывать сообщения заранее. Остальное не меняется.`)];
  temp("10.6", n, f);
}

// 1.3.2: of the specification's draft, only the tests on a push remain; the paragraph on migrating projects goes.
{
  const n = d["1.3.2"];
  const items = n.text.split("\n- ");
  const ruItems = n.ruText.split("\n- ");
  items[1] = `While the specification as a whole is a draft, no test runs on a push (§${T53}).`;
  ruItems[1] = `Пока вся спецификация — черновик, при push тесты не запускаются (§${T53}).`;
  const reasons = n.reason.split("\n\n").filter((s) => !s.startsWith("An existing project migrating"));
  const ruReasons = n.ruReason.split("\n\n").filter((s) => !s.startsWith("У существующего проекта"));
  if (reasons.length !== 4 || ruReasons.length !== 4) throw new Error("1.3.2: the paragraph on migrating projects was not found");
  const f = { where: "первый пункт текста и обоснование", text: items.join("\n- "), ruText: ruItems.join("\n- "), reason: reasons.join("\n\n"), ruReason: ruReasons.join("\n\n") };
  n.proposals = [proposal(n, f, `${DECIDED} Из первого пункта ушло всё, кроме тестов при push: «одобренное правило не обязано иметь код», «спецификация по-прежнему должна соответствовать guidelines», «то же относится ко всему, что коммит добавляет или меняет…» и «только код и тесты, которых коммит не касается, могут не называть правила». Всё это теперь действует при любом статусе спецификации, и держат это другие узлы: одобренное правило без кода только попадает в отчёт (10.1.41), код и тесты без SpecTag, которых коммит не меняет, — новый 9.5, новый и изменённый код без SpecTag отклоняется (10.1.26, 10.1.26a), соответствие guidelines — таблица проверок. Из обоснования убран третий абзац: старый код без SpecTag больше не требует, чтобы спецификация была черновиком. Остальное не меняется.`)];
  temp("1.3.2", n, f);
}

// 1.3.3: only the first sentence of the reason changes.
{
  const n = d["1.3.3"];
  const reasons = n.reason.split("\n\n");
  const ruReasons = n.ruReason.split("\n\n");
  reasons[0] = "Whether the specification is approved decides whether the tests run on a push. So its owners decide it by an act of their own, and not by how many rules are approved.";
  ruReasons[0] = "От того, одобрена ли спецификация, зависит, запускаются ли тесты при push. Поэтому решают её ответственные своим отдельным действием, а не тем, сколько правил одобрено.";
  const f = { where: "первое предложение обоснования", reason: reasons.join("\n\n"), ruReason: ruReasons.join("\n\n") };
  n.proposals = [proposal(n, f, `${DECIDED} В первом предложении обоснования «насколько строго проверки держат её код и тесты» заменено на «запускаются ли тесты при push». Остальное не меняется.`)];
  temp("1.3.3", n, f);
}

// 9.5: the present 5.2, without the condition that the specification is a draft.
d["9.5"] = {
  from: "5.2",
  sid: "kept",
  sidValue: "s-kkbqcb9xrpaepwn",
  title: "Code and tests without a SpecTag",
  ruTitle: "Код и тесты без SpecTag",
  text: "A symbol of the system's code outside its tests, or a test, that carries no SpecTag is reported rather than refused where the commit does not change it.",
  ruText: "Если коммит не меняет символ кода системы вне тестов или тест, у которого нет SpecTag, проверки только сообщают о нём и не отклоняют коммит.",
  reason: "Code and tests written before their rules may carry no SpecTag and still work correctly. Refusing every symbol and test without one would refuse every commit until all of them had their rules.\n\nOnly what a commit leaves alone is relieved, so every change to code is bound to its rules and reviewed.",
  ruReason: "Код и тесты, написанные раньше своих правил, могут не иметь SpecTag и при этом работать правильно. Если отклонять каждый символ и тест без SpecTag, отклонялся бы каждый коммит, пока у всех них не появятся правила.\n\nПослабление касается только того, чего коммит не меняет, поэтому каждое изменение кода связано со своими правилами и проходит ревью.",
  changes: [
    "Узел — нынешний 5.2, с его sid. Он должен был уйти в расширение «Адоптация существующего проекта»; по вашему решению от 17 ноября он остаётся в базе, в разделе 9, рядом с узлами о SpecTag.",
    "Заголовок: убрано «while the specification is a draft» («пока спецификация — черновик»).",
    "Текст: убрано условие «спецификация проекта — черновик». Осталось одно условие: коммит не меняет символ или тест. Новый и изменённый код без SpecTag по-прежнему отклоняется (10.1.26, 10.1.26a).",
    "Обоснование переписано. Ушли рассуждения о переходе проекта на метод и о черновике: «While the specification is a draft, the work is above all on the specification…» и рассуждение о SpecTag, добавленном к символу. Осталось, почему старый код без SpecTag не отклоняют и почему послабление касается только того, чего коммит не меняет.",
  ],
};

// 10.1: the decision removes "while the specification is a draft" from its reason.
{
  const n = d["10.1"];
  const before = n.reason;
  n.reason = n.reason.replace(" that a commit leaves alone while the specification is a draft is reported", " that a commit leaves alone is reported");
  if (n.reason === before) throw new Error("10.1: the phrase was not found in the reason");
  const ruBefore = n.ruReason;
  n.ruReason = n.ruReason.replace(/,? пока спецификация — черновик,?/, "");
  if (n.ruReason === ruBefore) throw new Error("10.1: the phrase was not found in the Russian reason");
  (n.changes ??= []).push("17 ноября, по вашему решению развязать статус спецификации и проверку SpecTag: из обоснования убрано «while the specification is a draft» («пока спецификация — черновик»). Согласование сохраняется.");
}

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

// The page row of 9.5, placed after 9.4; insert-node.mjs 9.5 has already made room.
const page = new URL("base-structure.html", here);
let html = fs.readFileSync(page, "utf8");
const row94 = html.split("\n").find((l) => l.trim().startsWith('["9.4",'));
if (!row94) throw new Error("row 9.4 not found");
if (html.includes('["9.5","same",0,"5.2"')) throw new Error("row 9.5 is already there");
const indent = row94.match(/^\s*/)[0];
html = html.replace(row94, `${row94}\n${indent}["9.5","same",0,"5.2","Code and tests without a SpecTag while the specification is a draft","Код и тесты без SpecTag, пока спецификация — черновик"],`);
fs.writeFileSync(page, html);
console.log("ok");
