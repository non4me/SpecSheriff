// Applies the first review of the first group of the nodes that replace "The commands". The list node loses the
// paragraph on the Views extension, which goes to the nodes on the export and the map when they are reviewed, and
// implements rule 2.1. The node on what `sheriff reindex` writes follows the record of an approval in the appendix of
// the tools. The node on what an earlier release wrote keeps the fingerprint only for renames, has the agent approve on
// an owner's behalf the nodes that the other changes make drafts, and migrates the rule approving the specification only
// until an entry exists. The merge of keys written twice takes the reviewer's wording and an example. Retargets to the new
// node on earlier releases the citations of "The commands" in three agreed drafts, a technical replacement.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-commands-a2.json", here), JSON.stringify(drafts, null, 2) + "\n");
const sids = drafts["commands:sids"];
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const setParts = (key, parts) => {
  const p = drafts[key].proposal;
  p.parts = parts;
  p.text = render(parts, "en");
  p.ruText = render(parts, "ru");
};

// 1. The list of the commands.
{
  const p = drafts["s-f5rz6b7dhxejjts"].proposal;
  p.title = "The commands of the SpecSheriff tools";
  p.ruTitle = "Команды инструментов SpecSheriff";
  p.titleChange = "Было: «The commands». Узел стал первым из девяти узлов раздела «The commands»: он перечисляет команды и говорит, как `sheriff` отвечает на вызов без команды или с неизвестной командой.";
  const keep = p.parts.filter((x) => x.kind === "li" || x.en.startsWith("The SpecSheriff tools are run as"));
  const views = p.parts.find((x) => x.en.startsWith("`sheriff export` and `sheriff render` write only"));
  if (!views) throw new Error("the Views paragraph is not found");
  keep.find((x) => x.en.startsWith("`sheriff show` and `sheriff export`")).change = "Как было. Что `sheriff show` находит узел по sid или по расположению и что экспорт пишет по файлу на каждый файл спецификации, скажет узел s-k4nqjr96ux7a5m7, когда до него дойдёт очередь.";
  keep.push({ kind: "p",
    en: "`sheriff` with no command prints the list of the commands. `sheriff --version` prints the version number of the SpecSheriff tools. `sheriff` with any other word as its command names that word, prints the list of the commands and ends with the exit code 2.",
    ru: "`sheriff` без команды печатает перечень команд. `sheriff --version` печатает номер версии инструментов SpecSheriff. `sheriff` с любым другим словом в качестве команды называет это слово, печатает перечень команд и завершается с кодом 2.",
    change: "Новое в тексте: код уже так поступает, и три теста узла это проверяют." });
  setParts("s-f5rz6b7dhxejjts", keep);
  p.reason = "A person or an agent who knows a command's name finds here where everything the command does is described.";
  p.ruReason = "Человек или агент, знающий название команды, находит здесь, где описано всё, что команда делает.";
  p.removed = [
    "Всё о `sheriff reindex`, `sheriff types`, `sheriff model`, `sheriff todos` и `sheriff guide`: это теперь узлы этого раздела.",
    "Добавление правила, одобряющего спецификацию, в `project.json`: по согласованному правилу 10.6 статус одобрения спецификации хранят записи в `sheriff.config.json`.",
    "Что `sheriff show` находит узел по sid или по расположению, и что экспорт пишет по файлу на каждый файл спецификации: это перейдёт в узел s-k4nqjr96ux7a5m7, который описывает обе команды."
  ];
  p.refs = [
    { type: "implements", to: "s-a4rbry4hsu34hy8" },
    ...["s-4kd2pave7vm4hmd", "s-7unxytshhc4md54", "s-v4qus7raqnwzneb", sids.writes, sids.earlier, sids.twice, sids.types, sids.model, sids.todos, sids.guide, sids.settings, "s-k4nqjr96ux7a5m7", "s-rpv4fkdqqguptqd"].map((to) => ({ type: "cites", to }))
  ];
  drafts["s-f5rz6b7dhxejjts"].doubt = "Whether `sheriff export` and `sheriff render` write only where the project has chosen the Views extension, as \"Where the files are\" implies, and if so whether the hooks run them only there or the commands end successfully with a notice elsewhere. To be settled when the nodes on the export and the map (s-k4nqjr96ux7a5m7, s-rpv4fkdqqguptqd) and \"The hooks\" (s-477gtdrkw34dzxw) are reviewed.";
}

// 2. What `sheriff reindex` writes.
{
  const parts = drafts["new:tools-2-reindex-writes"].proposal.parts;
  const at = (start) => { const i = parts.findIndex((x) => x.en.startsWith(start)); if (i < 0) throw new Error(start); return i; };
  Object.assign(parts[at("the links pointing at each node")], {
    en: "the links pointing at each node of the specification, rebuilt from the links that the nodes declare, and none on a node of the archive (§s-bpdqd9v72wg7vsz);",
    ru: "связи, указывающие на каждый узел спецификации, заново построенные из связей, которые объявляют узлы, а у узла архива — ни одной (§s-bpdqd9v72wg7vsz);",
    change: "Как было; теперь сказано и об узле архива, у которого по правилу 6.4 нет связей, указывающих на него." });
  Object.assign(parts[at("the lists `meta.code` and `meta.tests`")], {
    en: "the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35): `meta.code` names each code file that such a SpecTag binds, and `meta.tests` names each such test by its file and its name;",
    ru: "списки `meta.code` и `meta.tests` каждого узла, построенные по SpecTag, которые связывают с узлом код и тесты (§s-rwqzepmrt77rv35): `meta.code` называет каждый файл кода, который связывает такой SpecTag, а `meta.tests` — каждый такой тест по его файлу и имени;",
    change: "Новое: правило 9.7 требует, чтобы эти списки строили инструменты. Сейчас их пишут вручную, а `sheriff binding` сверяет. Сказано, что хранит запись списка." });
  Object.assign(parts[at("where the project has chosen the RecordType extension")], {
    en: "where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field with `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).",
    ru: "если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), — значения, собранные для каждого поля с `enum`, значения которого берутся из другого места спецификации, в его `x-enumSource.gathered` (§s-ju5vcanbjph7mgh)." });
  Object.assign(parts[at("An approved node stays approved")], {
    en: "An approved node whose approval status is set by approvals stays approved while an approval stands for its current wording (§s-v4qus7raqnwzneb). `sheriff reindex` makes every other such node a draft.",
    ru: "Одобренный узел, статус одобрения которого задаётся одобрениями, остаётся одобренным, пока для его нынешней формулировки в силе одобрение (§s-v4qus7raqnwzneb). Любой другой такой узел `sheriff reindex` делает черновиком.",
    change: "Было: «делает черновиком каждый одобренный узел, у которого последняя строка для него и отпечатка его формулировки — не одобрение. Раздел, заголовок домена и SpecSheriff guidelines, которые берёт проект, в это не входят». Смысл тот же, сказано утвердительно, со ссылкой на узел о записи одобрения." });
  Object.assign(parts[at("`sheriff reindex` writes only the files")], {
    en: "`sheriff reindex` writes only the files that the repository keeps. It writes a file only where the text it would write differs from the file's text, and names each file that it writes.",
    ru: "`sheriff reindex` пишет только файлы, которые хранит репозиторий. Файл он пишет, только если текст, который он записал бы, отличается от текста файла, и называет каждый файл, который пишет." });
  setParts("new:tools-2-reindex-writes", parts);
  const p = drafts["new:tools-2-reindex-writes"].proposal;
  p.reason = "What the SpecSheriff tools can compute from the specification, the code and the tests, they write themselves, so that it always agrees with its sources and nobody spends effort writing it. Rebuilt whole at every run, it is correct whatever an earlier run left (§s-jsqxdx47wkkj7gp).";
  p.ruReason = "То, что инструменты SpecSheriff могут вычислить по спецификации, коду и тестам, они пишут сами, чтобы оно всегда сходилось с источниками и никто не тратил сил на его запись. Построенное заново целиком при каждом запуске, оно верно, что бы ни оставил прежний запуск (§s-jsqxdx47wkkj7gp).";
  p.refs = p.refs.filter((r) => r.to !== "s-5ah25f6gy99panq").concat([{ type: "implements", to: "s-5ah25f6gy99panq" }, { type: "cites", to: "s-v4qus7raqnwzneb" }]);
}

// 3. What `sheriff reindex` changes in what an earlier release wrote.
{
  const parts = [
    { kind: "p", en: `\`sheriff reindex\` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from its own release. It does so once it has merged the keys written twice (§${sids.twice}), and before it validates the files. In every file of the specification and of its archive, it makes the following changes:`,
      ru: `\`sheriff reindex\` переписывает всё, что прежний выпуск инструментов SpecSheriff писал или читал иначе, чем его собственный выпуск. Он делает это после того, как объединил ключи, записанные дважды (§${sids.twice}), и до того, как проверяет файлы. В каждом файле спецификации и её архива он вносит следующие изменения:`,
      change: "Из узла «The commands». Было: «Прежде всего `sheriff reindex` переименовывает…». Порядок исправлен: код сначала объединяет ключи, записанные дважды, и согласованный узел о проверке по схеме говорит так же." },
    { kind: "li", en: "a node's key `id` becomes `location`, and a node's key `rationale` becomes `reason`;", ru: "ключ узла `id` становится `location`, а ключ узла `rationale` — `reason`;", change: "Как было." },
    { kind: "li", en: "the kinds of node `record` and `recordType` become `RecordType`, `rule` becomes `TextRule`, and `domain` becomes `header`;", ru: "типы узлов `record` и `recordType` становятся `RecordType`, `rule` — `TextRule`, а `domain` — `header`;", change: "Как было." },
    { kind: "li", en: "a node's status `\"\"` becomes `draft`, and `checked` becomes `approved`;", ru: "статус узла `\"\"` становится `draft`, а `checked` — `approved`;", change: "Как было." },
    { kind: "li", en: "a node's key `owner`, which holds an email, becomes `owners`, which holds a list that holds that email;", ru: "ключ узла `owner` с адресом почты становится `owners` со списком из этого адреса;", change: "Было: «ключ `owner` заголовка домена или раздела». Код меняет его у любого узла." },
    { kind: "li", en: "a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), in which each field is a property with the same type, bounds, meaning and guarantee;",
      ru: "`fields` и `unknown` у RecordType становятся его `schema` (§s-6eb92ddch7shuvu), где каждое поле — свойство с тем же типом, границами, смыслом и гарантией;", change: "Новое: по вашему решению от 19 ноября RecordType описывается JSON Schema 2020-12." },
    { kind: "li", en: "the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);", ru: "источник значений поля становится его `x-enumSource` (§s-xfu2gpzddjnmgks);", change: "Новое: так источник записан в подготовленной схеме расширения RecordType." },
    { kind: "li", en: "`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points into a JSON Schema;", ru: "`TextRule.list.declaredIn` становится `TextRule.list.jsonSchema`, если указывает в JSON Schema;", change: "Новое: по вашему решению от 13 ноября (задача у строки 10.1.35)." },
    { kind: "li", en: "`TextRule.list.declaredIn` becomes `TextRule.list.valueList` where it names a declaration in code;", ru: "`TextRule.list.declaredIn` становится `TextRule.list.valueList`, если называет объявление в коде;", change: "Новое: то же решение." },
    { kind: "li", en: "a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);", ru: "связь типа `supersedes` удаляется (§s-sn6au3vcr9uy5pm);", change: "Новое: по вашему решению от 12 ноября этого типа связи больше нет." },
    { kind: "li", en: "a node of the archive loses its sid (§s-f2b5zvc565s242f).", ru: "узел архива теряет свой sid (§s-f2b5zvc565s242f).", change: "Новое: у узла архива нет sid." },
    { kind: "p", en: "A renamed key keeps its place among the node's keys. A kind of node is renamed also where a field's values are the sids of that kind's nodes, and where the project's extension of the schema sets `fields` for that kind.",
      ru: "Переименованный ключ сохраняет своё место среди ключей узла. Тип узла переименовывается и там, где значения поля — sid узлов этого типа, и там, где расширение схемы проекта задаёт `fields` для этого типа.", change: "Как было." },
    { kind: "p", en: "A bare sid is a word in the form of a sid that stands in one of these places:", ru: "Голый sid — это слово в виде sid, которое стоит в одном из этих мест:", change: "Как было, отдельным списком перед тем местом, где голый sid используется." },
    { kind: "li", en: "it opens a test's name, followed by a space or the name's end;", ru: "оно открывает имя теста, и за ним идёт пробел или конец имени;", change: "Как было." },
    { kind: "li", en: "it is the only argument of the test's mark.", ru: "оно — единственный аргумент метки теста.", change: "Как было." },
    { kind: "p", en: "`sheriff reindex` also makes the following changes:", ru: "`sheriff reindex` также вносит следующие изменения:", change: "Новое: собраны вместе изменения, которые не касаются узлов в файлах спецификации." },
    { kind: "li", en: "`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`, and the key `owner` of each of its lines becomes `by`;", ru: "`specs/_confirmations.jsonl` становится `specs/_approvals.jsonl`, а ключ `owner` каждой его строки — `by`;", change: "Как было." },
    { kind: "li", en: "where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl` are appended to it, and `specs/_confirmations.jsonl` is removed;", ru: "если `specs/_approvals.jsonl` уже есть, строки `specs/_confirmations.jsonl` дописываются в него, а `specs/_confirmations.jsonl` удаляется;", change: "Как было." },
    { kind: "li", en: "until `sheriff.config.json` holds an entry that sets the specification's approval status (§s-qzthyh7yqvfhsa2), an approved rule of `project.json` that refines that rule gives way to such an entry, which records the status that the rule's latest approval or withdrawal set and names the owner who gave it;",
      ru: "пока в `sheriff.config.json` нет записи, задающей статус одобрения спецификации (§s-qzthyh7yqvfhsa2), одобренное правило `project.json`, которое уточняет это правило, уступает место такой записи; запись хранит статус, который задало последнее одобрение или его отзыв у правила, и называет ответственного, который его дал;",
      change: "Новое: по согласованному правилу 10.6 статус одобрения спецификации хранят записи. Так проект, одобренный прежним способом, сохраняет свой статус. Перенос идёт только пока записи нет, иначе каждый запуск отправлял бы в архив правило, которое проект написал позже." },
    { kind: "li", en: "that rule goes to the archive (§s-f2b5zvc565s242f), with the reason \"Replaced by the entry in `sheriff.config.json` that records the specification's approval status\";",
      ru: "это правило уходит в архив (§s-f2b5zvc565s242f) с причиной «Заменено записью в `sheriff.config.json`, которая хранит статус одобрения спецификации»;",
      change: "Новое: строка 10.1.11 требует, чтобы удалённый одобренный узел попал в архив." },
    { kind: "li", en: "the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;",
      ru: "ключ `writesSpecSheriffGuidelines` удаляется из `sheriff.config.json` (§s-zefk589ykh37b8u) до того, как инструменты SpecSheriff проверяют этот файл;", change: "Новое: по вашему решению от 21 ноября репозиторий SpecSheriff узнаётся по переменной окружения." },
    { kind: "li", en: "in each file that `sheriff.config.json` names as tests of the system's code or of a project's own check or generator, `@spec ` is put before each bare sid.",
      ru: "в каждом файле, который `sheriff.config.json` называет тестами кода системы или собственной проверки или генератора проекта, перед каждым голым sid ставится `@spec `.", change: "Как было. Новые имена тестов в `meta.tests` записывает узел «Что пишет `sheriff reindex`»." },
    { kind: "p", en: "Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines adds, and the project is still to choose that extension, `sheriff reindex` names that extension, so that an owner of the specification can choose it (§s-9ttvcwpqkehm58g).",
      ru: "Если узел спецификации — того типа или со связью того типа, которые добавляет расширение guidelines, а проекту ещё предстоит выбрать это расширение, `sheriff reindex` называет это расширение, чтобы ответственный за спецификацию мог его выбрать (§s-9ttvcwpqkehm58g).",
      change: "Новое: проект прежнего выпуска мог иметь заголовки доменов, RecordType и связи `consumes` без выбора расширений. Выбирать их может только ответственный, поэтому `sheriff reindex` лишь называет нужное расширение." },
    { kind: "p", en: "A renamed key and a renamed kind of node leave a node's fingerprint as it was (§s-v4qus7raqnwzneb). A node that any other of these changes makes a draft is named by `sheriff reindex`, and an agent approves it on an owner's behalf as a change that alters no meaning (§s-t5uw8zfxzhfdg86). `sheriff reindex` names each file that it changes in this way, the files of the specification included.",
      ru: "Переименованный ключ и переименованный тип узла оставляют отпечаток узла прежним (§s-v4qus7raqnwzneb). Узел, который любое другое из этих изменений делает черновиком, `sheriff reindex` называет, и агент одобряет его от имени ответственного как изменение, которое не меняет смысла (§s-t5uw8zfxzhfdg86). `sheriff reindex` называет каждый файл, который так меняет, в том числе файлы спецификации.",
      change: "Новое. Отпечаток сохраняется только при переименованиях, как уже делает код. Перенос полей RecordType в `schema` и замена `declaredIn` меняют формулировку, поэтому узел становится черновиком, и агент одобряет его от вашего имени как техническую замену, по правилу 1.3.6. Сохранить отпечаток и здесь значило бы вечно переводить новый вид обратно в старый, а у ключевых слов вроде `pattern` старого вида нет. Новое: называются и файлы спецификации, в которых переименованы тесты; сейчас они не называются." }
  ];
  setParts("new:tools-2-reindex-earlier", parts);
  const p = drafts["new:tools-2-reindex-earlier"].proposal;
  p.title = "What `sheriff reindex` changes in what an earlier release wrote";
  p.ruTitle = "Что `sheriff reindex` меняет в записанном прежним выпуском";
  p.reason = "Each file of a project follows the release of the SpecSheriff tools that last wrote it, and each test follows the release that read it. A release that writes or reads them differently rewrites them itself, so that nobody rewrites a project by hand and no approval is lost to a rename.";
  p.ruReason = "Каждый файл проекта следует выпуску инструментов SpecSheriff, который записал его последним, а каждый тест — выпуску, который его читал. Выпуск, который пишет или читает их иначе, переписывает их сам, чтобы никто не переписывал проект вручную и ни одно одобрение не терялось из-за переименования.";
  p.reasonChange = "Новое, на основе обоснования узла «The commands».";
  p.refs = [
    ...["s-jsqxdx47wkkj7gp", "s-qzthyh7yqvfhsa2", "s-f2b5zvc565s242f", "s-5ah25f6gy99panq"].map((to) => ({ type: "implements", to })),
    ...[sids.twice, "s-6eb92ddch7shuvu", "s-xfu2gpzddjnmgks", "s-sn6au3vcr9uy5pm", "s-zefk589ykh37b8u", "s-9ttvcwpqkehm58g", "s-v4qus7raqnwzneb", "s-t5uw8zfxzhfdg86"].map((to) => ({ type: "cites", to }))
  ];
}

// 4. Keys written twice.
{
  const parts = [
    { kind: "p", en: "`sheriff reindex` merges the values that an object holds under a key written twice, known as a duplicate key, each into the values written before it. It does so in every file of the specification and of its archive, before any other change:",
      ru: "`sheriff reindex` объединяет значения, которые объект хранит под ключом, записанным дважды, — каждое со значениями, записанными до него. Он делает это в каждом файле спецификации и её архива, прежде любого другого изменения:",
      change: "Из узла «The commands». Было: «Затем в каждом файле, который он переписывает…». Теперь слияние — первым, как и в коде: до переименований и до переписывания тестов. Добавлено общепринятое название «duplicate key»." },
    { kind: "li", en: "two lists become one, which holds the members of the first and then the members of the second that are new to the first;", ru: "два списка становятся одним, в котором стоят элементы первого, а за ними элементы второго, новые для первого;", change: "Смысл тот же, сказано без отрицания: было «которых нет в первом»." },
    { kind: "li", en: "two objects are merged key by key in the same way, each key staying where it was first written;", ru: "два объекта объединяются по ключам так же, и каждый ключ остаётся там, где был записан впервые;", change: "Смысл тот же, другими словами." },
    { kind: "li", en: "two values that JSON Schema holds equal become one.", ru: "два значения, которые JSON Schema считает равными, становятся одним.", change: "Смысл тот же, другими словами." },
    { kind: "p", en: "It names every key that it merged, with the file and the line of each value. It refuses any other two values under one key, naming the file, the key, and the line and the value of each. It then writes no file.",
      ru: "Он называет каждый ключ, который объединил, с файлом и строкой каждого значения. Любые другие два значения под одним ключом он отвергает, называя файл, ключ, строку и значение каждого. После этого он не пишет ни одного файла.",
      change: "Смысл тот же, другими словами." }
  ];
  setParts("new:tools-2-reindex-twice", parts);
  const p = drafts["new:tools-2-reindex-twice"].proposal;
  p.examples = [{
    en: "A node holds `\"refs\": [A]` and, further down, `\"refs\": [B, A]`: `sheriff reindex` writes `\"refs\": [A, B]` and names `refs` with both lines. A node that holds `\"title\": \"X\"` and `\"title\": \"Y\"` is refused, and no file is written.",
    ru: "Узел хранит `\"refs\": [A]`, а ниже `\"refs\": [B, A]`: `sheriff reindex` пишет `\"refs\": [A, B]` и называет `refs` с обеими строками. Узел с `\"title\": \"X\"` и `\"title\": \"Y\"` отвергается, и ни один файл не пишется.",
    change: "Предложил рецензент."
  }];
  p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed on its first report, once fix-commands-a2.mjs applied its fixes";
  drafts["new:tools-2-reindex-twice"].doubt = "Whether the merge also covers the project's extension of the schema, `specs/_schema/project.schema.json`, as row 10.1.1 covers the files of the schema. Today the merge covers only the files of the specification and of its archive.";
}

// The citations of "The commands" in three agreed drafts, retargeted to the node on earlier releases.
for (const key of ["new:tools-7-1-validate", "s-j4webte36gkraju", "new:tools-7-1-archive-file"]) {
  const p = drafts[key].proposal;
  const before = JSON.stringify(p);
  for (const x of p.parts) {
    x.en = x.en.replaceAll("§s-f5rz6b7dhxejjts", `§${sids.earlier}`);
    x.ru = x.ru.replaceAll("§s-f5rz6b7dhxejjts", `§${sids.earlier}`);
  }
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  p.refs = p.refs.map((r) => (r.to === "s-f5rz6b7dhxejjts" ? { ...r, to: sids.earlier } : r));
  if (JSON.stringify(p) === before) throw new Error(`${key}: no citation of s-f5rz6b7dhxejjts`);
  (drafts[key].technical ??= []).push({ date: "2026-11-21", change: `The citation of "The commands" (s-f5rz6b7dhxejjts) retargeted to the node that now says what \`sheriff reindex\` changes in what an earlier release wrote (${sids.earlier}); no meaning changed.` });
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
for (const k of ["s-f5rz6b7dhxejjts", "new:tools-2-reindex-writes", "new:tools-2-reindex-earlier", "new:tools-2-reindex-twice"]) console.log("\n===== " + k + "\n" + drafts[k].proposal.text + "\n\nREASON: " + drafts[k].proposal.reason);
