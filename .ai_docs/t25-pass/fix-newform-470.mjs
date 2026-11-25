// The owner agreed on 2026-11-18 («Окей, в таком виде согласую этот пункт») to 1.7.5 "Configuring extensions" in the
// wording shown in the conversation: an owner of the specification chooses the extensions, in person with a utility of
// the SpecSheriff plugin or through an agent, the choice is recorded in the repository's configuration, and an agent
// changes it only when that owner asks. 1.7.6 "Who enables or disables an extension" went into that node, so this script
// writes 1.7.5 and leaves the removal of 1.7.6 to remove-node.mjs, which renumbers 1.7.7 as 1.7.6.
// The draft 1.7.7 speaks of a "chosen" extension instead of an "active" one, since the agreed 1.7.5 and 2.3 speak of
// a choice; its other wording is the reviewer's, as fix-newform-469.mjs wrote it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-470.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const EXT = "s-mbmnsnxenmavu3z";
const SPEC_STATUS = "s-qzthyh7yqvfhsa2";
const CONF = d["1.7.5"].sidValue;

Object.assign(d["1.7.5"], {
  title: "Configuring extensions",
  ruTitle: "Настройка расширений",
  text: `An owner of the specification chooses which extensions of the guidelines (§${EXT}) the project uses. The owner does so in person with a utility of the SpecSheriff plugin, or through an agent working for that owner. The choice is recorded in the repository's configuration. An agent changes the choice only when that owner asks it to.`,
  ruText: `Ответственный за спецификацию выбирает, какие расширения guidelines (§${EXT}) использует проект. Он делает это сам при помощи утилиты плагина SpecSheriff или через агента, который на него работает. Выбор записывается в конфигурацию репозитория. Агент меняет выбор, только когда ответственный его об этом просит.`,
  reason: `Choosing an extension changes the rules that bind everyone working on the project. So the choice is made by those accountable for the specification, as approving the specification is (§${SPEC_STATUS}). Recorded in the repository, the choice is the same in every clone.`,
  ruReason: `Выбор расширения меняет правила, обязательные для всех, кто работает над проектом. Поэтому решать его должны те, кто отвечает за спецификацию, как и при одобрении спецификации (§${SPEC_STATUS}). Выбор записан в репозитории, поэтому он одинаков в каждом клоне.`,
  examples: ["An owner opens the utility, sees every extension that the installed plugin delivers, and marks one of them. Later the owner asks the agent in the conversation to enable another, and the agent does so on the owner's behalf. The most likely mistake is an agent that enables an extension that seems to it to be needed for the work at hand, although the owner did not ask for it."],
  ruExamples: ["Ответственный открывает утилиту, видит все расширения, которые поставляет установленный плагин, и отмечает одно из них. Позже он просит агента в чате включить ещё одно, и агент делает это от его имени. Самая вероятная ошибка: агент включает расширение, которое кажется ему нужным для текущей работы, хотя ответственный об этом не просил."],
  agreed: "2026-11-18",
});
d["1.7.5"].changes.push("Согласовано 18 ноября в вашей редакции: заголовок «Настройка расширений»; узел говорит, кто выбирает расширения и как — ответственный, сам при помощи утилиты или через агента; «доступны» и «действуют только отмеченные» убраны, потому что это уже говорит 1.7.1; черновик 1.7.6 вошёл в этот узел.");

Object.assign(d["1.7.7"], {
  title: "An extension that a node depends on stays chosen",
  ruTitle: "Расширение, от которого зависит узел, остаётся выбранным",
  text: `An extension of the guidelines (§${EXT}) that the project has chosen (§${CONF}) stays chosen while a node outside the extension depends on it. A node depends on the extension while it:\n- is of a kind, or holds a property or a link of a type, that the extension adds;\n- links to one of the extension's nodes.\n\nThe procedure that withdraws the choice of an extension refuses while a node depends on the extension. The refusal names each node that depends on the extension.`,
  ruText: `Расширение guidelines (§${EXT}), которое выбрал проект (§${CONF}), остаётся выбранным, пока от него зависит узел вне этого расширения. Узел зависит от расширения, пока он:\n- имеет тип, который добавляет расширение, или содержит свойство либо связь того типа, который оно добавляет;\n- ведёт связью к одному из узлов расширения.\n\nПроцедура, которая отменяет выбор расширения, отказывает, пока от расширения зависит узел. Отказ называет каждый узел, который зависит от расширения.`,
  reason: "Withdrawing the choice of an extension that a node still depends on would leave that node relying on rules and definitions that no longer hold in the project.",
  ruReason: "Отмена выбора расширения, от которого ещё зависит узел, оставила бы этот узел опирающимся на правила и определения, которые в проекте больше не действуют.",
  examples: ["An owner asks to withdraw the choice of an extension while the specification still holds nodes of a kind that the extension adds. The procedure refuses and names those nodes by their sids. Once the nodes are removed, the choice of the extension can be withdrawn. The most likely mistake is a procedure that withdraws the choice and leaves the checks to refuse the next commit."],
  ruExamples: ["Ответственный просит отменить выбор расширения, а в спецификации ещё есть узлы типа, который это расширение добавляет. Процедура отказывает и называет эти узлы по их sid. Когда узлы удалены, выбор расширения можно отменить. Самая вероятная ошибка: процедура отменяет выбор, и следующий коммит отклоняют уже проверки."],
});
d["1.7.7"].changes.push("«Активным» заменено на «выбранным», по согласованному 1.7.5, который говорит о выборе; так же говорит и 2.3.");

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const rows = [
  ['["1.7.5","new",1,"","A project\'s active extensions","Активные расширения проекта"', '["1.7.5","new",1,"","Configuring extensions","Настройка расширений"'],
  ['["1.7.7","new",1,"","An extension that a node depends on stays active","Расширение, от которого зависит узел, остаётся активным"', '["1.7.7","new",1,"","An extension that a node depends on stays chosen","Расширение, от которого зависит узел, остаётся выбранным"'],
];
for (const [a, b] of rows) {
  if (!h.includes(a)) throw new Error("page row: " + a.slice(0, 40));
  h = h.split(a).join(b);
}
fs.writeFileSync(page, h);
console.log("ok");
