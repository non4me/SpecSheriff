// Applies the findings of the wording checker and of specsheriff-rule-reviewer (2026-11-18) to the drafts 1.7.5, 1.7.6
// and 1.7.7, none of which the owner has seen yet.
// - 1.7.5: "the list" named again; "that the project uses" cut as a restatement; the reason says why the rule exists,
//   citing 5.1, rather than commenting on each paragraph; the example shows the mistake an agent is likeliest to make.
//   The refusal of a name the installed release does not deliver goes to a new row of table 10.1, not into the text.
// - 1.7.6: the owner is an owner of the specification, acting in person or through an agent, so the two sentences no
//   longer contradict each other; the reason is one sentence. What names the owner of a change stays as it is until
//   the owner rules on it.
// - 1.7.7: the reviewer's wording: a node outside the extension depends on it through a kind, a property or a type of
//   link the extension adds, or through a link to one of its nodes; the procedure that disables an extension refuses.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-469.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const EXT = "s-mbmnsnxenmavu3z";
const SCHEMA = "s-eferktypcj7njt5";
const SPEC_STATUS = "s-qzthyh7yqvfhsa2";
const ACTIVE = d["1.7.5"].sidValue;

Object.assign(d["1.7.5"], {
  text: `The repository's configuration lists the extensions of the guidelines (§${EXT}) that are active in the project. Of the extensions of the guidelines, only the active ones hold in the project.\n\nThe list of active extensions names only extensions that the installed release of the SpecSheriff plugin delivers.`,
  ruText: `Конфигурация репозитория перечисляет расширения guidelines (§${EXT}), активные в проекте. Из расширений guidelines в проекте действуют только активные.\n\nПеречень активных расширений называет только расширения, которые поставляет установленный выпуск плагина SpecSheriff.`,
  reason: `The schema of the specification and the rules that the checks and an agent apply depend on which extensions are active (§${SCHEMA}). Kept in the repository, the list is the same in every clone, so everyone working on the project works under the same rules.`,
  ruReason: `От того, какие расширения активны, зависят схема спецификации и правила, которые применяют проверки и агент (§${SCHEMA}). Перечень хранится в репозитории и потому одинаков в каждом клоне, так что все, кто работает над проектом, работают по одним и тем же правилам.`,
  examples: ["A project's configuration lists an extension of the guidelines, and the installed plugin delivers others as well. Only the listed extension's rules hold in the project. The most likely mistake is an agent that applies the rules of an extension because the plugin delivers it, although the list does not name it."],
  ruExamples: ["Конфигурация проекта перечисляет одно расширение guidelines, а установленный плагин поставляет и другие. В проекте действуют только правила перечисленного расширения. Самая вероятная ошибка: агент применяет правила расширения, потому что его поставляет плагин, хотя перечень его не называет."],
});

Object.assign(d["1.7.6"], {
  text: `Only an owner of the specification enables or disables an extension of the guidelines (§${EXT}), in person or through an agent working for that owner. Each such change to the list of active extensions (§${ACTIVE}) names that owner.\n\nAn agent working for an owner enables or disables an extension only when that owner asks it to.`,
  ruText: `Включает и выключает расширение guidelines (§${EXT}) только ответственный за спецификацию — сам или через агента, который на него работает. Каждое такое изменение перечня активных расширений (§${ACTIVE}) называет этого ответственного.\n\nАгент, который работает на ответственного, включает или выключает расширение, только когда этот ответственный его об этом просит.`,
  reason: `Enabling or disabling an extension changes the rules that bind everyone working on the project, so it is a decision for those accountable for the specification, as approving the specification is (§${SPEC_STATUS}).`,
  ruReason: `Включение или выключение расширения меняет правила, обязательные для всех, кто работает над проектом, поэтому это решение тех, кто отвечает за спецификацию, как и одобрение спецификации (§${SPEC_STATUS}).`,
});

Object.assign(d["1.7.7"], {
  title: "An extension that a node depends on stays active",
  ruTitle: "Расширение, от которого зависит узел, остаётся активным",
  text: `An extension of the guidelines (§${EXT}) stays active (§${ACTIVE}) while a node outside the extension depends on it. A node depends on the extension while it:\n- is of a kind, or holds a property or a link of a type, that the extension adds;\n- links to one of the extension's nodes.\n\nThe procedure that disables an extension refuses to disable one that a node depends on. The refusal names each node that depends on the extension.`,
  ruText: `Расширение guidelines (§${EXT}) остаётся активным (§${ACTIVE}), пока от него зависит узел вне этого расширения. Узел зависит от расширения, пока он:\n- имеет тип, который добавляет расширение, или содержит свойство либо связь того типа, который оно добавляет;\n- ведёт связью к одному из узлов расширения.\n\nПроцедура, которая выключает расширение, отказывается выключить расширение, от которого зависит узел. Отказ называет каждый узел, который зависит от расширения.`,
  reason: "Disabling an extension that a node still depends on would leave that node relying on rules and definitions that no longer hold in the project.",
  ruReason: "Выключение расширения, от которого ещё зависит узел, оставило бы этот узел опирающимся на правила и определения, которые в проекте больше не действуют.",
  examples: ["An owner asks to disable an extension while the specification still holds nodes of a kind that the extension adds. The procedure refuses and names those nodes by their sids. Once the nodes are removed, the extension can be disabled. The most likely mistake is a procedure that disables the extension and leaves the checks to refuse the next commit."],
  ruExamples: ["Ответственный просит выключить расширение, а в спецификации ещё есть узлы типа, который это расширение добавляет. Процедура отказывает и называет эти узлы по их sid. Когда узлы удалены, расширение можно выключить. Самая вероятная ошибка: процедура выключает расширение, и следующий коммит отклоняют уже проверки."],
});
d["1.7.7"].changes.push("По рецензенту: зависимость — у узла вне расширения: его тип, свойство или тип связи из расширения либо связь к узлу расширения. Свои связи расширения внутри него не мешают его выключить, как в PostgreSQL. Отказывает процедура выключения.");

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const row = h.indexOf('["1.7.7","new",1,"","An extension the specification depends on stays active"');
if (row < 0) throw new Error("row 1.7.7");
h = h.split('["1.7.7","new",1,"","An extension the specification depends on stays active","Расширение, от которого зависит спецификация, остаётся активным"').join('["1.7.7","new",1,"","An extension that a node depends on stays active","Расширение, от которого зависит узел, остаётся активным"');
fs.writeFileSync(page, h);
console.log("ok");
