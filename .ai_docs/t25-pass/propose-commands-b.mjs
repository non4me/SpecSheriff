// Drafts the second group of the nodes that replace "The commands" (s-f5rz6b7dhxejjts), by the plan the owner agreed to
// on 2026-11-21: `sheriff types`, `sheriff json`, `sheriff todos`, `sheriff guide`, and `sheriff settings` with
// `sheriff untagged`. Uses the sids given in commands:sids and the command names the owner agreed to. Writes the drafts
// into tools-drafts.json for specsheriff-rule-reviewer.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-commands-b.json", here), JSON.stringify(drafts, null, 2) + "\n");
const sids = drafts["commands:sids"];
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const draft = (key, fields) => {
  const p = fields.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  p.date = "2026-11-21";
  p.removed ??= [];
  drafts[key] = { agreed: false, from: "s-f5rz6b7dhxejjts", ...fields };
};
const cites = (list) => list.map((to) => ({ type: "cites", to }));
const impl = (list) => list.map((to) => ({ type: "implements", to }));

// 5. `sheriff types`.
draft("new:tools-2-types", {
  location: "tools 2.5 (new)",
  sidValue: sids.types,
  testsFrom: ["sheriff types"],
  proposal: {
    title: "Code generated from the approved wordings",
    ruTitle: "Код, порождённый из одобренных формулировок",
    parts: [
      P("`sheriff types` generates the parts of the system's code that come from the nodes (§s-qyjw8xez6t6adc3):",
        "`sheriff types` порождает те части кода системы, которые получаются из узлов (§s-qyjw8xez6t6adc3):",
        "Из узла «The commands». Было: «`sheriff types` порождает следующее…»."),
      L("from the RecordTypes, the types and the runtime checks, in the files that the technical appendix lists for them (§s-pvzms7d8kxb8dk2);",
        "из RecordType — типы и проверки во время работы, в файлах, которые для них перечисляет техническое приложение (§s-pvzms7d8kxb8dk2);", "Как было."),
      L("the files that each of the project's own code generators prints (§s-km4x4s26kv7pjze).",
        "файлы, которые печатает каждый собственный генератор кода проекта (§s-km4x4s26kv7pjze).", "Как было."),
      P("It generates each part from the last approved wording of each node that the part comes from, even where that approval has since been withdrawn. It finds that wording in the history of the repository, as the latest version of the node whose wording has the fingerprint that the node's last approval records (§s-v4qus7raqnwzneb).",
        "Каждую часть он порождает из последней одобренной формулировки каждого узла, из которого получается эта часть, даже если это одобрение потом отозвано. Эту формулировку он находит в истории репозитория — как последнюю версию узла, формулировка которой имеет отпечаток, записанный в последнем одобрении узла (§s-v4qus7raqnwzneb).",
        "Новое: по согласованному правилу 10.15 код порождается из последних одобренных формулировок. Сейчас `sheriff types` ждёт, пока одобрят каждый узел, и одна черновая RecordType задерживает все файлы."),
      P("It generates a part only from a node that has been approved and whose approved wording relies only on nodes that have been approved. It names by its sid each node that it leaves out because that node relies on a node that has never been approved (§s-f8fmudceuyaj942).",
        "Часть он порождает только из узла, который одобряли и одобренная формулировка которого опирается только на узлы, которые одобряли. Каждый узел, который он пропускает, потому что тот опирается на ни разу не одобренный узел, он называет по sid (§s-f8fmudceuyaj942).",
        "Новое: так требует правило 10.15 и строка 10.1.39b."),
      P("A RecordType relies on each RecordType that it refines or that one of its fields refers to, and on each node from which values are gathered for one of its fields. A file that a project's generator prints relies on each node that the generator names as a source of that file, and on the rule that lists the generator (§s-km4x4s26kv7pjze).",
        "RecordType опирается на каждый RecordType, который он уточняет или на который ссылается одно из его полей, и на каждый узел, из которого собираются значения для одного из его полей. Файл, который печатает генератор проекта, опирается на каждый узел, который генератор называет источником этого файла, и на правило, которое перечисляет этот генератор (§s-km4x4s26kv7pjze).",
        "Новое: правило 10.15 говорит «опирается», но не говорит, на что опирается RecordType. Это моё предложение."),
      P(`A project's generator is run by the command that \`sheriff.config.json\` names for it. On its standard input it is handed the model of the specification that \`sheriff json\` prints (§${sids.model}), in which each node has its last approved wording. It prints as JSON each file's path, the file's content, and the sids of the nodes that the file is written from.`,
        `Генератор проекта запускается командой, которую для него называет \`sheriff.config.json\`. На стандартный вход ему передаётся модель спецификации, которую печатает \`sheriff json\` (§${sids.model}), где у каждого узла — его последняя одобренная формулировка. Он печатает в JSON путь каждого файла, содержимое файла и sid узлов, из которых файл написан.`,
        "Как было; новое — модель с последними одобренными формулировками."),
      P("`sheriff types` writes a file only where the file is missing or holds, line endings aside, a text other than the one it generates. It names each file that it writes.",
        "`sheriff types` пишет файл, только если файла нет или в нём, без учёта концов строк, другой текст, чем тот, который он порождает. Он называет каждый файл, который пишет.", "Как было."),
      P("Where any of the following holds, `sheriff types` names each refusal and writes no file:",
        "Если выполнено что-либо из следующего, `sheriff types` называет каждый отказ и не пишет ни одного файла:", "Как было."),
      L("the check of the generated copies refuses the list of the files that it generates, or a RecordType (§s-dbk2vyeg8z5jxna);",
        "проверка порождённых копий отвергает перечень файлов, которые он порождает, или RecordType (§s-dbk2vyeg8z5jxna);", "Как было."),
      L("a project's generator exits with a failure.", "генератор проекта завершается с ошибкой.", "Было: «завершается с кодом выхода, отличным от нуля». Смысл тот же.")
    ],
    reason: "Generated from approved wordings, the code implements only what the owners approved, and each file is regenerated as soon as each approval is given (§s-utvqbypzhmgndug).\n\n`sheriff types` runs after every edit an agent makes and at every commit, and the files that it names are exactly those its author has to stage. A file whose content no edit changed keeps its modification time, so that nothing watching the files takes it for changed. Line endings are set aside because git may check a file out with line endings other than those committed. Where anything is refused, no file is written, so that nothing that a failed run generated reaches the code.",
    ruReason: "Порождённый из одобренных формулировок, код реализует только то, что одобрили ответственные, и каждый файл порождается заново, как только дано очередное одобрение (§s-utvqbypzhmgndug).\n\n`sheriff types` запускается после каждой правки агента и при каждом коммите, и файлы, которые он называет, — ровно те, которые автору нужно добавить в коммит. Файл, содержимое которого не изменила ни одна правка, сохраняет время изменения, чтобы ничто, следящее за файлами, не приняло его за изменённый. Концы строк не учитываются, потому что git может выгрузить файл с другими концами строк, чем были в коммите. Если что-то отвергнуто, ни один файл не пишется, чтобы ничего, порождённого неудачным запуском, не попало в код.",
    reasonChange: "Из обоснования узла «The commands»; первое предложение новое, по правилу 10.15.",
    removed: ["«`sheriff types` пишет файл, только когда одобрен каждый узел, из которого он порождается… типы и проверки ждут каждую RecordType»: по правилу 10.15 код порождается из последних одобренных формулировок, а не ждёт одобрения."],
    refs: [...impl(["s-qyjw8xez6t6adc3", "s-km4x4s26kv7pjze", "s-kh8qcd5kxgh9z3j", "s-e877bnfa559tvk9", "s-f8fmudceuyaj942"]), ...cites(["s-pvzms7d8kxb8dk2", "s-v4qus7raqnwzneb", sids.model, "s-dbk2vyeg8z5jxna", "s-utvqbypzhmgndug"])]
  }
});

// 6. `sheriff json`.
draft("new:tools-2-json", {
  location: "tools 2.6 (new)",
  sidValue: sids.model,
  testsFrom: ["sheriff model gives every node"],
  proposal: {
    title: "The model of the specification",
    ruTitle: "Модель спецификации",
    parts: [
      P("`sheriff json` prints as JSON the model of the specification where it runs. The model holds each node of the specification and of the chosen extensions of the guidelines, including each node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6), as its file holds the node, without the nodes under it, together with:",
        "`sheriff json` печатает в JSON модель спецификации того места, где запущен. Модель содержит каждый узел спецификации и выбранных расширений guidelines, в том числе каждый узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), так, как его хранит файл, без узлов под ним, а вместе с ним:",
        "Из узла «The commands». Было: «`sheriff model` печатает в JSON модель… каждый узел так, как его хранит файл». Новое: имя команды по вашему решению, узлы выбранных расширений и узлы в ячейках."),
      L("the part and the file that the node is in;", "часть и файл, где стоит узел;", "Как было."),
      L("the node above it;", "узел над ним;", "Новое в тексте: код уже так делает, и тест это проверяет."),
      L("the owners named nearest above it (§s-6sk8uet75dmq5qz).", "ответственных, названных ближе всего над ним (§s-6sk8uet75dmq5qz).", "Как было."),
      P(`A project's own check is handed the model on its standard input (§s-7pk89t8z6wymmj9). A project's own code generator is handed it as §${sids.types} says.`,
        `Собственной проверке проекта модель передаётся на стандартный вход (§s-7pk89t8z6wymmj9). Собственному генератору кода проекта она передаётся так, как говорит §${sids.types}.`,
        "Как было, со ссылками на узлы, которые это описывают.")
    ],
    reason: "Handed the model rather than left to read the files, a project's check or generator finds nodes by their location, finds owners and follows links as the SpecSheriff tools do, in whatever language the project writes it.",
    ruReason: "Получая модель, а не читая файлы сама, проверка или генератор проекта находит узлы по расположению, находит ответственных и проходит по связям так же, как инструменты SpecSheriff, на каком бы языке проект её ни написал.",
    reasonChange: "Как было в узле «The commands».",
    refs: [...impl(["s-2fau85dfyyeq66m", "s-km4x4s26kv7pjze"]), ...cites(["s-5fewsp22mmdz7y6", "s-6sk8uet75dmq5qz", "s-7pk89t8z6wymmj9", sids.types])]
  }
});

// 7. `sheriff todos`.
draft("new:tools-2-todos", {
  location: "tools 2.7 (new)",
  sidValue: sids.todos,
  testsFrom: ["sheriff todos", "lists every item of the todos"],
  proposal: {
    title: "The list of the todos",
    ruTitle: "Перечень задач на потом",
    parts: [
      P("`sheriff todos` prints as text every item of `meta.todos` of the nodes of the specification where it runs (§s-t28j22vbdmmeqnh), and of the nodes of the SpecSheriff guidelines and of the chosen extensions where the project takes them from the plugin.",
        "`sheriff todos` печатает текстом каждый элемент `meta.todos` узлов спецификации того места, где запущен (§s-t28j22vbdmmeqnh), а также узлов SpecSheriff guidelines и выбранных расширений, если проект берёт их из плагина.",
        "Из узла «The commands». Было: «…архив не входит». Теперь сказано утвердительно: только узлы спецификации. Новое: и выбранные расширения."),
      P("The items come the newest first, and those of one day in the order in which the specification reads. Each item comes with its date, its author, what is to be done, and the sid, the location and the title of its node.",
        "Элементы идут от новых к старым, а элементы одного дня — в том порядке, в каком читается спецификация. Каждый элемент идёт с датой, автором, тем, что нужно сделать, и sid, расположением и заголовком его узла.", "Как было.")
    ],
    reason: "A todo is kept on the node it concerns (§s-t28j22vbdmmeqnh), so it is found where that node is. Listed together, the todos show all the deferred work at once, the latest first.",
    ruReason: "Задача на потом хранится в узле, которого она касается (§s-t28j22vbdmmeqnh), поэтому её находят там, где этот узел. Собранные вместе, задачи показывают всю отложенную работу сразу, начиная с последней.",
    reasonChange: "Новое: у этой части узла «The commands» не было обоснования.",
    refs: [...impl(["s-t28j22vbdmmeqnh"])]
  }
});

// 8. `sheriff guide`.
draft("new:tools-2-guide", {
  location: "tools 2.8 (new)",
  sidValue: sids.guide,
  testsFrom: ["sheriff export, render and guide", "sheriff guide prints"],
  proposal: {
    title: "The guidelines that a project follows, printed",
    ruTitle: "Печать guidelines, которым следует проект",
    parts: [
      P("`sheriff guide` prints the guidelines that the project follows, each node as §s-k4nqjr96ux7a5m7 says:",
        "`sheriff guide` печатает guidelines, которым следует проект, каждый узел так, как говорит §s-k4nqjr96ux7a5m7:",
        "Из узла «The commands». Было: «каждый узел guidelines — базы, описания инструментов и собственных guidelines проекта»."),
      L("the SpecSheriff guidelines;", "SpecSheriff guidelines;", "Как было."),
      L("each extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g);", "каждое расширение guidelines, которое выбрал проект (§s-9ttvcwpqkehm58g);", "Новое: правило 1.7.5."),
      L("the project's own guidelines (§s-u7tw6m8npxmv5tu).", "собственные guidelines проекта (§s-u7tw6m8npxmv5tu).", "Как было."),
      P("For each other extension that the plugin delivers, it prints the extension's name and what the extension is for. It prints the appendix of the tools in none of these, since that appendix is no part of the guidelines (§s-a4rbry4hsu34hy8).",
        "О каждом другом расширении, которое поставляет плагин, он печатает его имя и назначение. Описание инструментов он не печатает, потому что оно не входит в guidelines (§s-a4rbry4hsu34hy8).",
        "Новое. Сейчас `sheriff guide` печатает и описание инструментов, а по правилу 2.1 оно не часть guidelines."),
      P("It also prints, counted off the model as it prints, how many nodes each part holds and how many of them are approved, and whether the specification is approved (§s-qzthyh7yqvfhsa2).",
        "Он также печатает, подсчитав по модели, сколько узлов в каждой части и сколько из них одобрено, и одобрена ли спецификация (§s-qzthyh7yqvfhsa2).", "Как было; статус спецификации теперь читается из записей в `sheriff.config.json`.")
    ],
    reason: "An agent reads the guidelines before it works on the specification. Printed by one command, they are exactly the rules that the project follows, whatever release and extensions it uses, and the other extensions are named so that an owner sees what can be chosen.",
    ruReason: "Агент читает guidelines, прежде чем работать со спецификацией. Напечатанные одной командой, они — ровно те правила, которым следует проект, каким бы ни был выпуск и выбранные расширения, а другие расширения названы, чтобы ответственный видел, что можно выбрать.",
    reasonChange: "Новое: у этой части узла «The commands» не было обоснования.",
    refs: [...impl(["s-a4rbry4hsu34hy8", "s-9ttvcwpqkehm58g"]), ...cites(["s-k4nqjr96ux7a5m7", "s-u7tw6m8npxmv5tu", "s-qzthyh7yqvfhsa2"])]
  }
});

// 9. `sheriff settings` and `sheriff untagged`.
draft("new:tools-2-settings", {
  location: "tools 2.9 (new)",
  sidValue: sids.settings,
  testsFrom: ["match no test"],
  proposal: {
    title: "The settings that only an owner of the specification changes",
    ruTitle: "Настройки, которые меняет только ответственный за спецификацию",
    parts: [
      P("`sheriff settings` shows and changes the settings that only an owner of the specification changes: the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2), and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g).",
        "`sheriff settings` показывает и меняет настройки, которые меняет только ответственный за спецификацию: статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и выбранные проектом расширения guidelines (§s-9ttvcwpqkehm58g).",
        "Новое: по вашему решению от 18 ноября эти настройки меняет программа в терминале."),
      P("Run with no arguments in a terminal, it shows the three settings and every extension that the plugin delivers, and lets the person who runs it change each of them. Run with one of the following arguments, it makes that change alone:",
        "Запущенная в терминале без аргументов, она показывает три настройки и каждое расширение, которое поставляет плагин, и даёт тому, кто её запустил, изменить каждую из них. Запущенная с одним из следующих аргументов, она делает только это изменение:", "Новое."),
      L("`approve` or `draft`, for the specification's approval status;", "`approve` или `draft` — для статуса одобрения спецификации;", "Новое."),
      L("`strict on` or `strict off`, for the `strict` flag;", "`strict on` или `strict off` — для флага `strict`;", "Новое."),
      L("`extension <name> on` or `extension <name> off`, for the choice of an extension.", "`extension <имя> on` или `extension <имя> off` — для выбора расширения.", "Новое."),
      P("It records each change as an entry in `sheriff.config.json` that names the person who made it, as git identifies that person. It refuses a change made by anyone other than an owner of the specification (§s-6sk8uet75dmq5qz).",
        "Каждое изменение она записывает в `sheriff.config.json` записью, которая называет того, кто его сделал, — так, как его определяет git. Изменение, сделанное не ответственным за спецификацию, она отвергает (§s-6sk8uet75dmq5qz).",
        "Новое: так требуют правила 10.6, 10.7 и 1.7.5."),
      P("Before it records an approval of the specification, it runs the checks that rule 10.6 names, shows what they find, and records the approval only after the owner confirms it where they find anything. It refuses an approval or turning the `strict` flag on in the cases that the rule on the `strict` flag names, and the refusal names the command that lists what the check finds. It refuses to withdraw the choice of an extension while a node depends on it, naming each such node (§s-j8y62pa9hzz6nwx).",
        "Прежде чем записать одобрение спецификации, она запускает проверки, которые называет правило 10.6, показывает, что они нашли, и, если они что-то нашли, записывает одобрение только после подтверждения ответственного. Одобрение и включение флага `strict` она отвергает в тех случаях, которые называет правило о флаге `strict`, и отказ называет команду, которая перечисляет, что находит проверка. Отказаться от выбранного расширения она не даёт, пока от него зависит какой-либо узел, и называет каждый такой узел (§s-j8y62pa9hzz6nwx).",
        "Новое: так требуют правила 10.6, 10.7 и 1.7.6."),
      P("`sheriff untagged` lists the symbols of the system's code that have no SpecTag, each with its file (§s-kkbqcb9xrpaepwn). It is the command that the warning and the refusal of rule 9.5 name, and the one that a refusal names for the check that rule 9.5 makes stricter while the `strict` flag is on. For a check that a project's own guidelines make stricter, the refusal names that check's own command (§s-2fau85dfyyeq66m).",
        "`sheriff untagged` перечисляет символы кода системы, у которых нет SpecTag, каждый с его файлом (§s-kkbqcb9xrpaepwn). Это та команда, которую называют предупреждение и отказ по правилу 9.5, и та, которую называет отказ для проверки, которую правило 9.5 ужесточает при включённом флаге `strict`. Для проверки, которую ужесточают собственные guidelines проекта, отказ называет собственную команду этой проверки (§s-2fau85dfyyeq66m).",
        "Новое: правила 9.5 и 10.7 требуют команду, которая перечисляет код без SpecTag. Сейчас такой команды нет.")
    ],
    reason: "These settings change the rules that bind everyone working on the project, so only an owner of the specification changes them, and each change records who made it. One program shows them all, so that an owner sees the project's state in one place, and an agent working for that owner makes the same change with an argument.",
    ruReason: "Эти настройки меняют правила, обязательные для всех, кто работает над проектом, поэтому их меняет только ответственный за спецификацию, и каждое изменение записывает, кто его сделал. Одна программа показывает их все, чтобы ответственный видел состояние проекта в одном месте, а агент, работающий на этого ответственного, делает то же изменение с аргументом.",
    reasonChange: "Новое.",
    refs: [...impl(["s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-9ttvcwpqkehm58g", "s-j8y62pa9hzz6nwx", "s-kkbqcb9xrpaepwn"]), ...cites(["s-6sk8uet75dmq5qz", "s-2fau85dfyyeq66m"])]
  }
});
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
for (const k of ["new:tools-2-types", "new:tools-2-json", "new:tools-2-todos", "new:tools-2-guide", "new:tools-2-settings"]) console.log(`===== ${k}: ${drafts[k].proposal.text.split(/\s+/).length} words`);
