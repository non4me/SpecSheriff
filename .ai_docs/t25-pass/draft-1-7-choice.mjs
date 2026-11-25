// Drafts of three new nodes of subsection 1.7 on how a project chooses its extensions of the guidelines, under the
// owner's decisions of 2026-11-18: the active extensions are listed in the project's settings in its repository; only
// the active ones are recorded there, the available ones coming with the plugin's release; only an owner enables or
// disables an extension, and an agent does so on an owner's behalf when the owner asks; an extension stays active while
// the specification depends on it, as PostgreSQL refuses to drop an extension that objects depend on. The file, its key,
// the commands, the separate window and the skill spec-settings belong in the appendix of the tools, not here.
import fs from "node:fs";
import { randomInt } from "node:crypto";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-draft-1-7-choice.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
for (const k of ["1.7.5", "1.7.6", "1.7.7"]) if (d[k]) throw new Error(k + " already drafted");

const taken = fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8") + fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8") + JSON.stringify(d);
const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const used = new Set();
function newSid() {
  let s;
  do s = "s-" + Array.from({ length: 15 }, () => alphabet[randomInt(alphabet.length)]).join(""); while (taken.includes(s) || used.has(s));
  used.add(s);
  return s;
}
const [s5, s6, s7] = [newSid(), newSid(), newSid()];
const EXT = "s-mbmnsnxenmavu3z"; // 1.7.1 What an extension of the guidelines is
const OWN = "s-u7tw6m8npxmv5tu"; // 2.3 A project's own guidelines
const SPEC_STATUS = "s-qzthyh7yqvfhsa2"; // 10.6 The specification's approval status

const drafts = {
  "1.7.5": {
    from: "",
    sid: "new",
    title: "A project's active extensions",
    ruTitle: "Активные расширения проекта",
    text: `The repository's configuration lists the extensions of the guidelines (§${EXT}) that the project uses. These are the project's active extensions. Of the extensions of the guidelines, only the active ones hold in the project.\n\nThe list names only extensions that the installed release of the SpecSheriff plugin delivers.`,
    ruText: `Конфигурация репозитория перечисляет расширения guidelines (§${EXT}), которые использует проект. Это активные расширения проекта. Из расширений guidelines в проекте действуют только активные.\n\nПеречень называет только расширения, которые поставляет установленный выпуск плагина SpecSheriff.`,
    reason: "Which extensions are active determines the schema of the specification and the rules that the checks and an agent apply. The SpecSheriff tools therefore read the list before they read the specification. Kept in the repository, the list is the same in every clone. A name that the installed release does not deliver would stand for rules that no check applies.",
    ruReason: "От того, какие расширения активны, зависят схема спецификации и правила, которые применяют проверки и агент. Поэтому инструменты SpecSheriff читают перечень раньше, чем спецификацию. Перечень хранится в репозитории, поэтому он одинаков в каждом клоне. Имя, которого установленный выпуск не поставляет, обозначало бы правила, которых не применяет ни одна проверка.",
    examples: ["A project lists a single active extension, which adds a kind of node of its own. A node of a kind that only an inactive extension adds is refused, since the schema of the specification includes only the kinds that the active extensions add."],
    ruExamples: ["Проект перечисляет одно активное расширение, которое добавляет собственный тип узлов. Узел типа, который добавляет только неактивное расширение, отвергается: схема спецификации включает только типы, которые добавляют активные расширения."],
    changes: [
      "Новый узел, по вашим решениям 18 ноября: активные расширения записаны в настройках проекта в репозитории; в проекте записываются только активные, а доступные приходят с выпуском плагина. Файл настроек, его ключ и команды называет описание инструментов SpecSheriff, а не этот узел.",
    ],
    sidValue: s5,
  },
  "1.7.6": {
    from: "",
    sid: "new",
    title: "Who enables or disables an extension",
    ruTitle: "Кто включает и выключает расширение",
    text: `Only an owner of the specification enables or disables an extension of the guidelines. Each such change to the list of active extensions (§${s5}) names that owner.\n\nAn agent working for an owner enables or disables an extension on that owner's behalf when that owner asks it to.`,
    ruText: `Включает и выключает расширение guidelines только ответственный за спецификацию. Каждое такое изменение перечня активных расширений (§${s5}) называет этого ответственного.\n\nАгент, работающий на ответственного, включает или выключает расширение от его имени, когда этот ответственный его об этом просит.`,
    reason: `An active extension adds rules that bind everyone working on the project, and disabling it removes them. So, like the specification's approval status (§${SPEC_STATUS}), the list is changed only by those accountable for the specification. An owner can then ask for the change in the conversation with the agent.`,
    ruReason: `Активное расширение добавляет правила, обязательные для всех, кто работает над проектом, а выключение расширения их убирает. Поэтому перечень, как и статус одобрения спецификации (§${SPEC_STATUS}), меняют только те, кто отвечает за спецификацию. Тогда ответственный может попросить об изменении в разговоре с агентом.`,
    examples: ["An owner asks the agent in the conversation to enable an extension. The agent enables it on the owner's behalf, and the change names that owner. The most likely mistake is an agent that enables an extension because the work at hand seems to need it, although no owner asked."],
    ruExamples: ["Ответственный просит агента в разговоре включить расширение. Агент включает его от имени ответственного, и изменение называет этого ответственного. Самая вероятная ошибка: агент включает расширение, потому что оно кажется нужным для текущей работы, хотя ни один ответственный об этом не просил."],
    changes: [
      "Новый узел, по вашим решениям 18 ноября: включает и выключает расширение только ответственный; агент делает это от его имени, когда ответственный просит в чате. Как изменение называет ответственного — записью или автором коммита, — решает описание инструментов SpecSheriff.",
    ],
    sidValue: s6,
  },
  "1.7.7": {
    from: "",
    sid: "new",
    title: "An extension the specification depends on stays active",
    ruTitle: "Расширение, от которого зависит спецификация, остаётся активным",
    text: `An extension of the guidelines stays active while the specification holds a node of a kind that the extension adds. It also stays active while a node of the specification links to one of the extension's rules.\n\nA request to disable such an extension is refused. The refusal names the nodes that depend on the extension.`,
    ruText: `Расширение guidelines остаётся активным, пока в спецификации есть узел типа, который добавляет это расширение. Оно также остаётся активным, пока узел спецификации связан с одним из правил этого расширения.\n\nПросьба выключить такое расширение отвергается. Отказ называет узлы, которые зависят от расширения.`,
    reason: "Without the extension, such a node would have no kind in the schema of the specification, and such a link would lead to a rule that no longer holds in the project. The refusal names the nodes, so that whoever asked knows what to change first.",
    ruReason: "Без расширения у такого узла не было бы типа в схеме спецификации, а такая связь вела бы к правилу, которое в проекте больше не действует. Отказ называет узлы, чтобы тот, кто просил, знал, что изменить сначала.",
    examples: ["An owner asks to disable an extension while the specification still holds nodes of a kind that the extension adds. The request is refused, and the refusal names those nodes by their sids. Once the nodes are removed, the extension can be disabled."],
    ruExamples: ["Ответственный просит выключить расширение, а в спецификации ещё есть узлы типа, который это расширение добавляет. Просьба отвергается, и отказ называет эти узлы по их sid. Когда узлы удалены, расширение можно выключить."],
    changes: [
      "Новый узел из предложенной процедуры (18 ноября): расширение нельзя выключить, пока от него что-то зависит, — так PostgreSQL не удаляет расширение, от которого зависят объекты базы.",
    ],
    sidValue: s7,
  },
};

// Insert the three drafts after 1.7.4, keeping the order of the keys.
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "1.7.4") Object.assign(out, drafts);
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
fs.copyFileSync(page, new URL("base-structure.before-draft-1-7-choice.html", here));
let h = fs.readFileSync(page, "utf8");
const anchor = '      ["1.7.4","new",1,"","Independence of extensions"';
const at = h.indexOf(anchor);
if (at < 0) throw new Error("row 1.7.4 not found");
const end = h.indexOf("\n", at);
// 1.7.4 is the last row of its subsection and has no comma after it, so the new rows follow it after a comma, and the
// last of them takes over the end of the subsection.
if (h[end - 1] !== "]") throw new Error("row 1.7.4 is no longer the last of its subsection");
const rows = Object.entries(drafts).map(([k, v]) => "      " + JSON.stringify([k, "new", 1, "", v.title, v.ruTitle, "", v.changes[0], [], ""]));
h = h.slice(0, end) + ",\n" + rows.join(",\n") + h.slice(end);
fs.writeFileSync(page, h);
console.log("ok", s5, s6, s7);
