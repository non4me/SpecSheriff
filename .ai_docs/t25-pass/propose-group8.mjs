// T25, stage 2, group 8: drafts the new wordings of the nodes of items 57 to 63 of the order in stage2-inventory.md:
// "The hooks" (tools 6), split into an overview that keeps the sid and five new nodes (the pre-commit hook, the
// comparison before a push, turning the git hooks on, asking for the reviewer's settings, the agent's hook after an
// edit); the guard (tools 7.3.2); the agent's hooks for Codex CLI (tools 16); the git hook's lookup of the SpecSheriff
// tools (tools 12); the project's own tools in a git hook (tools 13); the two plugins (tools 14 and 15), with a new
// node on the skills that both plugins hold; and the new row 10.1.37b of the main table of checks, which the agreed
// row 10.1.37a promised to propose with "The hooks".
// Copies tools-drafts.json to tools-drafts.before-group8.json first, checks every draft (citations against links, the
// Russian citing the same sids, no citation by location outside backticks, link targets existing, the new sids
// unique, no key outside the group changed), and only then writes. It also writes english-group8.md, the English of
// every node of the group, for EngStickler's readers. It touches no other file. Run again, it rebuilds the keys of
// this group from the copy made before its first run.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group8.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-25";

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else if (x.kind === "li2") out.push(`  - ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const L2 = (en, ru, change) => ({ kind: "li2", en, ru, change });
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });
const NEW = "Новое.";

// The sids of the new nodes of the group.
const SID = {
  preCommit: "s-npnmwyt6s3gypwe",
  pushCompare: "s-8a5eyy5n5hnsgrs",
  hooksOn: "s-jgcveum8dwdnyzr",
  reviewerSettings: "s-p29yawkkkgk7kxb",
  afterEdit: "s-hcmpjmwtgfwzncu",
  skills: "s-kq6wmdud9c7j2k9",
  row37b: "s-yn5tdx2bp4f5rq7",
};

const entries = {};
const add = (key, e) => {
  entries[key] = e;
};

// ---------------------------------------------------------------------------------------------------------------
// Item 57: "The hooks" (s-477gtdrkw34dzxw), tools 6, split under rule 7.3.3. The node keeps its sid as the list of
// the hooks, which every agreed draft that cites it relies on, and five new nodes take the procedures it held.
// ---------------------------------------------------------------------------------------------------------------
add("s-477gtdrkw34dzxw", {
  location: "tools 6",
  sidValue: "s-477gtdrkw34dzxw",
  testsFrom: [
    "the checks read what is staged, not what the working tree holds beside it",
    "the commit-msg hook refuses a message that leaves out a node the changed code serves",
  ],
  proposal: {
    title: "The hooks",
    ruTitle: "Хуки",
    parts: [
      P("The SpecSheriff tools run at the moments at which the checks run (§s-epaw9sgyaajzn8g), through the following hooks:",
        "Инструменты SpecSheriff запускаются в те моменты, когда выполняются проверки (§s-epaw9sgyaajzn8g), через следующие хуки:",
        "Было: «Each check lives in a command a git hook calls:». Узел теперь перечисляет все хуки, git-хуки и хуки агента, и для каждого называет узел, который его описывает. Порядок шагов каждого хука вынесен в отдельные узлы по правилу 7.3.3. Узел реализует правило 10.2 «When the checks run», которое говорит, когда выполняются проверки, вместо основной таблицы проверок (вопрос X2)."),
      L("the git hooks, which `sheriff init` writes into `.githooks/` (§s-7unxytshhc4md54), and each of which runs the SpecSheriff tools that a plugin keeps on the machine (§s-4mej6ccn7xu3d3p):",
        "git-хуки, которые `sheriff init` записывает в `.githooks/` (§s-7unxytshhc4md54) и каждый из которых запускает инструменты SpecSheriff, которые плагин хранит на машине (§s-4mej6ccn7xu3d3p):",
        "Без изменений по смыслу: прежде это говорили первый абзац и абзац о `core.hooksPath`."),
      L2("`pre-commit`, which runs the tools that rewrite files and the checks that read the commit being made (§s-npnmwyt6s3gypwe);",
        "`pre-commit`, который запускает инструменты, переписывающие файлы, и проверки, читающие создаваемый коммит (§s-npnmwyt6s3gypwe);",
        "Было: «`.githooks/pre-commit` runs `sheriff export` and `sheriff render`, then `sheriff validate`, `sheriff binding` and `sheriff citations`, and last `sheriff types`;». Порядок теперь задаёт правило 10.12, и его описывает новый узел «The pre-commit hook»."),
      L2("`commit-msg`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then `sheriff commit-message`, and then, only after `sheriff commit-message` has passed, `sheriff review` (§s-4kd2pave7vm4hmd);",
        "`commit-msg`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), затем `sheriff commit-message`, а затем, только если `sheriff commit-message` ничего не отверг, — `sheriff review` (§s-4kd2pave7vm4hmd);",
        "Было: «`.githooks/commit-msg` runs `sheriff message` and then `sheriff review` on the file git hands it;». Команда `sheriff message` теперь называется `sheriff commit-message` (согласованный список команд). Что `sheriff review` запускается, только если сообщение прошло проверку, — ваше решение от 2026-11-05, которое прежде было записано только в решениях узла. Собственные инструменты проекта идут первыми по правилу 10.12."),
      L2("`pre-push`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), and then the tests (§s-b6qdtghnyha3fhk) once it has compared the working tree with what the push sends (§s-8a5eyy5n5hnsgrs).",
        "`pre-push`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), а затем тесты (§s-b6qdtghnyha3fhk), после того как сравнил рабочее дерево с тем, что отправляет push (§s-8a5eyy5n5hnsgrs).",
        "Было: «`.githooks/pre-push` runs the tests of the system's code and of the project's own checks and generators, by the command `sheriff.config.json` names as its `testCommand`, as §s-b6qdtghnyha3fhk says.» Как запускаются тесты, говорит согласованный узел «Running the tests before a push»; сравнение рабочего дерева вынесено в новый узел."),
      L("the agent's hooks, which the plugin for Claude Code declares (§s-zh2vcr3xjumppg5) and which `sheriff init --agent codex` writes into the project for Codex CLI (§s-n76wt2bkqdmh78x):",
        "хуки агента, которые объявляет плагин для Claude Code (§s-zh2vcr3xjumppg5) и которые `sheriff init --agent codex` записывает в проект для Codex CLI (§s-n76wt2bkqdmh78x):",
        "Было: «The agent's hooks are Claude Code's, which the plugin for Claude Code declares (§s-zh2vcr3xjumppg5), and Codex's, which `sheriff init` writes into the project (§s-n76wt2bkqdmh78x).» Без изменений по смыслу."),
      L2("when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr) and asks for the settings of the reviewer (§s-p29yawkkkgk7kxb);",
        "при начале сессии — хук, который включает git-хуки (§s-jgcveum8dwdnyzr) и запрашивает настройки рецензента (§s-p29yawkkkgk7kxb);",
        "Было: абзацы о хуке `SessionStart`. Они вынесены в два новых узла."),
      L2("before an edit made with the file-editing tools, a hook that runs `sheriff guard` (§s-st6td4mua9uqt9z);",
        "перед правкой, сделанной инструментами редактирования файлов, — хук, который запускает `sheriff guard` (§s-st6td4mua9uqt9z);",
        "Было: «Before an edit made with the file tools or with `apply_patch`, `sheriff guard` judges it.» Без изменений по смыслу; какими инструментами агента сделана правка, которую оценивает `sheriff guard`, говорит узел о `sheriff guard`."),
      L2("after such an edit or a shell command, a hook that writes what is generated from the nodes and runs the checks (§s-hcmpjmwtgfwzncu).",
        "после такой правки или команды оболочки — хук, который записывает то, что порождается из узлов, и запускает проверки (§s-hcmpjmwtgfwzncu).",
        "Было: абзацы о том, что выполняется после правки. Они вынесены в новый узел."),
      P("At a commit, the pre-commit and commit-msg hooks write what is staged out to a directory of its own. They run the SpecSheriff tools there, with that directory as git's working tree, against the repository's history.",
        "При коммите хуки pre-commit и commit-msg выписывают то, что находится в стейджинге, в отдельный каталог. Они запускают там инструменты SpecSheriff, сделав этот каталог рабочим деревом git и сверяясь с историей репозитория.",
        "Было: «At a commit, the checks read what is staged. What is staged is written out to a directory of its own and read there against the repository's history.» Без изменений по смыслу. На это предложение ссылается согласованный узел «How a project's own check is run»."),
      P("Each check that these hooks or the agent's hook after an edit run reads the commit being made. At a commit, that commit is what is staged. After an edit, it is the working tree's difference from the last commit. Besides that commit, such a check reads only the following:",
        "Каждая проверка, которую запускают эти хуки или хук агента после правки, читает создаваемый коммит. При коммите этот коммит — то, что находится в стейджинге. После правки — отличие рабочего дерева от последнего коммита. Кроме этого коммита, такая проверка читает только следующее:",
        "Новое: по списку изменений основной таблицы проверок, который вы приняли 2026-11-11, узел «The hooks» должен сказать, что проверка читает только свой коммит, guidelines с их схемой, а историю и сообщение коммита — там, где это говорит её узел. Прежде это было в тексте основной таблицы проверок."),
      L("the SpecSheriff guidelines and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g), with their schemas, as the SpecSheriff plugin delivers them (§s-bsya3febm6u64ab);",
        "SpecSheriff guidelines и выбранные проектом расширения guidelines (§s-9ttvcwpqkehm58g) с их схемами в том виде, в каком их поставляет плагин SpecSheriff (§s-bsya3febm6u64ab);",
        NEW),
      L("the repository's history and the commit message, where the node of the check says so.",
        "историю репозитория и сообщение коммита — там, где это говорит узел проверки.",
        NEW),
    ],
    reason: "A check reads the commit being made, because judging anything else would pass or refuse what is not being committed. Hooks that the repository keeps and the plugins declare run each check at its moment in every clone, whoever makes the change (§s-epaw9sgyaajzn8g).",
    ruReason: "Проверка читает создаваемый коммит, потому что, оценивая что-либо другое, она пропускала бы или отвергала то, что в коммит не входит. Хуки, которые хранит репозиторий и объявляют плагины, запускают каждую проверку в её момент в каждом клоне, кто бы ни вносил изменение (§s-epaw9sgyaajzn8g).",
    reasonChange: "Было: много абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Первое предложение — то, которое по списку изменений основной таблицы проверок, принятому вами 2026-11-11, переходит в обоснование этого узла. Обоснования частей, вынесенных в новые узлы, ушли вместе с этими частями.",
    examples: [
      X("A developer stages a change to rule R and leaves a second change to R unstaged. At the commit, `sheriff validate` reads R as it is staged. The most likely mistake is to run the checks over the working tree, so that they judge the second change, which the commit does not hold.",
        "Разработчик добавляет в стейджинг одно изменение правила R, а второе изменение R оставляет вне стейджинга. При коммите `sheriff validate` читает R в том виде, в каком оно находится в стейджинге. Самая вероятная ошибка — запускать проверки над рабочим деревом: тогда они оценивают второе изменение, которого коммит не содержит."),
    ],
    refs: [
      R("implements", "s-epaw9sgyaajzn8g"),
      R("cites", "s-7unxytshhc4md54"),
      R("cites", "s-4mej6ccn7xu3d3p"),
      R("cites", SID.preCommit),
      R("cites", "s-n4m5zvh96yb299p"),
      R("cites", "s-4kd2pave7vm4hmd"),
      R("cites", "s-b6qdtghnyha3fhk"),
      R("cites", SID.pushCompare),
      R("cites", "s-zh2vcr3xjumppg5"),
      R("cites", "s-n76wt2bkqdmh78x"),
      R("cites", SID.hooksOn),
      R("cites", SID.reviewerSettings),
      R("cites", "s-st6td4mua9uqt9z"),
      R("cites", SID.afterEdit),
      R("cites", "s-9ttvcwpqkehm58g"),
      R("cites", "s-bsya3febm6u64ab"),
      // Cited by the node's decisions, which stay on it.
      R("cites", "s-bpdqd9v72wg7vsz"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-hr7j7scmfkkjnws"),
      R("cites", "s-jau82aq9juv9zzh"),
      R("cites", "s-kh8qcd5kxgh9z3j"),
      R("cites", "s-xr5xxa9cxf2mq5u"),
      R("cites", "s-9kfdycuq34beqvs"),
    ],
    todos: [
      { date: "2026-10-28", by: "the owner", text: "The export and the map follow a change that reaches the working tree through git — a pull, a merge, a checkout — only at the next edit an agent makes or the next commit; post-merge and post-checkout hooks running `sheriff markdown` and `sheriff map` would close that." },
    ],
    removed: [
      "The `implements` links to the main table of checks (s-jau82aq9juv9zzh) and to rule 10.3 (s-83ev4wwesbwnhnp): the node implements rule 10.2 (s-epaw9sgyaajzn8g), and the guard (s-st6td4mua9uqt9z) implements rule 10.3 (question X2). The `implements` link to rule 10.14 (s-kh8qcd5kxgh9z3j) becomes a `cites` link kept for the decisions; the new nodes on the pre-commit hook and on the hook after an edit implement it.",
      "The `cites` links to “How each check is made”'s neighbours s-b6qdtghnyha3fhk and s-xr5xxa9cxf2mq5u stay; the `cites` link to s-4kd2pave7vm4hmd stays for `sheriff commit-message` and `sheriff review`.",
      "The order of the pre-commit hook, the comparison before a push, the session start's two tasks and the hook after an edit: each is now a node of its own (rule 7.3.3).",
      "“An edit made through the shell is not judged before it is made. Nor is a file `sheriff types` writes after an edit. The checks after them and at the commit still read them.”: rule 10.3 (s-83ev4wwesbwnhnp) states which edits are judged, and the guard (s-st6td4mua9uqt9z) names the tools.",
      "“So is each node that `sheriff reindex` made a draft, a section and a domain's header left out”: the node on the hook after an edit says it, without the header, since `sheriff reindex` names only the nodes whose approval status approvals set (s-ztseyetus7np6br).",
    ],
    date: DATE,
  },
  stage3: "The decisions of s-477gtdrkw34dzxw stay on it; in stage 3 each decision that concerns a part now in a new node is also copied to that node: 2026-10-26 (citations) and 2026-10-31 (types, staging, the export failure) to s-npnmwyt6s3gypwe; 2026-10-31 (the push) to s-8a5eyy5n5hnsgrs; 2026-11-02 (the executable mode) to s-jgcveum8dwdnyzr; 2026-11-02 (the reviewer's settings) to s-p29yawkkkgk7kxb; 2026-11-05 (after an edit) and 2026-11-06 (drafts reported) to s-hcmpjmwtgfwzncu; 2026-11-05 (the review only once the message passes) stays. The todo stays, with `sheriff markdown` and `sheriff map` named. The tests: “the checks read what is staged, not what the working tree holds beside it” and “the commit-msg hook refuses a message that leaves out a node the changed code serves” keep this sid; the others move to the new nodes as their testsFrom say; “the pre-push hook runs the tests by the command the settings name, and refuses a push without one” and config.test.ts “reads the command that runs the tests of the system's code” move to s-b6qdtghnyha3fhk. hooks/commit-msg: run `sheriff commit-message` (the command `message` renamed) and then `sheriff review`, after the project's own tools for that hook (s-n4m5zvh96yb299p).",
});

add("new:tools-6-pre-commit", {
  location: "tools 6a (new, after “The hooks”)",
  from: "s-477gtdrkw34dzxw",
  sidValue: SID.preCommit,
  testsFrom: [
    "a commit changing no code passes the hooks, and the export and the map are written",
    "a commit goes on where the export and the map cannot be written from the working tree, which reports it",
    "the pre-commit hook refuses a commit whose specification does not hold together",
    "the pre-commit hook stops a commit whose staged RecordTypes cannot be generated",
    "the pre-commit hook writes the types the staged nodes generate into the working tree, stages none of them, and the commit waits for its author to stage them",
    "a changed RecordType is committed before its approval, its types left as they were and their wait reported",
  ],
  proposal: {
    title: "The pre-commit hook",
    ruTitle: "Хук pre-commit",
    parts: [
      P("The pre-commit hook runs the following, in this order (§s-pcnyfp7gev7syax):",
        "Хук pre-commit выполняет следующее в таком порядке (§s-pcnyfp7gev7syax):",
        "Было: «`.githooks/pre-commit` runs `sheriff export` and `sheriff render`, then `sheriff validate`, `sheriff binding` and `sheriff citations`, and last `sheriff types`;» и абзац «Whatever the checks found, `sheriff types` then runs…». Порядок теперь задаёт правило 10.12: сначала инструменты, переписывающие файлы, затем генераторы, затем собственные проверки и остальные инструменты проекта, а проверки SpecSheriff guidelines — последними."),
      L("the project's own tools for that hook that the project's own guidelines list as tools that rewrite files (§s-t9j29hppag2nren, §s-n4m5zvh96yb299p);",
        "собственные инструменты проекта для этого хука, которые собственные guidelines проекта перечисляют как инструменты, переписывающие файлы (§s-t9j29hppag2nren, §s-n4m5zvh96yb299p);",
        "Новое: первый шаг правила 10.12. Перечень таких инструментов читает согласованный узел «What the SpecSheriff tools read in the project's own guidelines»."),
      L("`sheriff types` (§s-a8fn72xa782wvbk), which generates from the nodes as they are staged;",
        "`sheriff types` (§s-a8fn72xa782wvbk), который порождает код из узлов в том виде, в каком они находятся в стейджинге;",
        "Было: `sheriff types` выполнялся последним, после проверок. По правилу 10.12 генераторы идут в первом шаге, до любой проверки."),
      L("the project's other tools for that hook (§s-n4m5zvh96yb299p);",
        "остальные собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p);",
        "Было: собственные инструменты проекта выполнялись после всех проверок SpecSheriff (узел «The project's own tools in a git hook»). По правилу 10.12 они идут во втором шаге."),
      L("`sheriff validate`, which first makes the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against the schema (§s-xzcw3hv4hmxz7h7), and runs the project's own checks only after these have passed (§s-7pk89t8z6wymmj9);",
        "`sheriff validate`, который сначала выполняет проверку ключа, записанного больше одного раза (§s-7zqsstgnuc772ba), и проверку по схеме (§s-xzcw3hv4hmxz7h7), а собственные проверки проекта запускает только после того, как эти проверки пройдены (§s-7pk89t8z6wymmj9);",
        "Было: «then `sheriff validate`». Порядок внутри `sheriff validate` задаёт согласованный узел «How a project's own check is run»; здесь он только назван, чтобы было видно исключение правила 10.12."),
      L("`sheriff binding` and `sheriff citations`, only after the check for a key written more than once and the validation against the schema have passed;",
        "`sheriff binding` и `sheriff citations` — только после того, как пройдены проверка ключа, записанного больше одного раза, и проверка по схеме;",
        "Было: «`sheriff validate`, `sheriff binding` and `sheriff citations`» подряд, что бы ни нашёл `sheriff validate`. По правилу 10.12 остальные проверки SpecSheriff guidelines выполняются только после того, как пройдены эти две."),
      L("where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb), `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), in the working tree.",
        "если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb), — `sheriff markdown` (§s-e3495enbc5h75c3) и `sheriff map` (§s-rpv4fkdqqguptqd) в рабочем дереве.",
        "Было: «`sheriff export` and `sheriff render`» первыми. Команды переименованы (ваше решение от 2026-11-21) и запускаются только в проекте, который выбрал расширение Views (ваш ответ А на второй вопрос группы 7). Экспорт и карту коммит не содержит, поэтому их место в порядке ни на одну проверку не влияет."),
      P("The hook writes what is staged out to its directory (§s-477gtdrkw34dzxw) once the project's tools that rewrite files have run. `sheriff types` and the checks run in that directory.",
        "Хук выписывает то, что находится в стейджинге, в свой каталог (§s-477gtdrkw34dzxw) после того, как отработали собственные инструменты проекта, переписывающие файлы. `sheriff types` и проверки выполняются в этом каталоге.",
        "Было: «Whatever the checks found, `sheriff types` then runs in the directory the staged files are written out to.» Каталог выписывается после инструментов первого шага, потому что такой инструмент может изменить то, что находится в стейджинге."),
      P("The checks read each file that `sheriff types` writes in the form in which that file is staged. The hook writes each such file into the working tree instead, in place of whatever is at the same path, and names it as a file to be staged. The hook stages nothing.",
        "Каждый файл, который записывает `sheriff types`, проверки читают в том виде, в каком он находится в стейджинге. Хук записывает такой файл вместо этого в рабочее дерево, на место того, что лежит по тому же пути, и называет его как файл, который нужно добавить в стейджинг. Сам хук ничего в стейджинг не добавляет.",
        "Было: «The pre-commit hook copies each file `sheriff types` writes there into the working tree, in place of what stands at the same path. The hook stages none of them.» Без изменений по смыслу. Добавлено, что проверки читают такой файл в том виде, в каком он в стейджинге: иначе проверка порождённых копий прошла бы коммит со старой копией. Ваше решение от 2026-10-31: хук ничего не добавляет в стейджинг."),
      P("A failure to write the export or the map is reported and stops nothing.",
        "О неудаче при записи экспорта или карты сообщается, и она ничего не останавливает.",
        "Было: «A failure to write them is reported and stops nothing.» Без изменений по смыслу."),
    ],
    reason: "At every commit, each check judges the commit in the form in which its author makes it (§s-pcnyfp7gev7syax). So whatever rewrites files runs before the checks, and what the hook generates waits in the working tree until the author stages it, since what a commit holds is its author's choice.",
    ruReason: "При каждом коммите каждая проверка оценивает коммит в том виде, в каком его делает автор (§s-pcnyfp7gev7syax). Поэтому всё, что переписывает файлы, выполняется до проверок, а то, что порождает хук, ждёт в рабочем дереве, пока автор не добавит это в стейджинг: что содержит коммит, решает его автор.",
    reasonChange: "Новое. Второе предложение повторяет довод вашего решения от 2026-10-31: «What a commit holds is its author's choice, so the hook stages nothing».",
    examples: [
      X("A developer edits a RecordType, an owner approves the new wording, and the developer stages the specification and commits. `sheriff types` generates the RecordType's new types from the staged nodes, and the hook writes them into the working tree and names them. `sheriff binding` refuses the commit, since the staged types differ from what the approved wording produces (§s-dbk2vyeg8z5jxna). The developer stages the new types and commits again. The most likely mistake is to let the checks read the types that `sheriff types` has just written, so that the commit passes with the old types staged.",
        "Разработчик меняет RecordType, ответственный одобряет новую формулировку, а разработчик добавляет спецификацию в стейджинг и делает коммит. `sheriff types` порождает новые типы этого RecordType из узлов в стейджинге, а хук записывает их в рабочее дерево и называет их. `sheriff binding` отвергает коммит, потому что типы в стейджинге отличаются от того, что даёт одобренная формулировка (§s-dbk2vyeg8z5jxna). Разработчик добавляет новые типы в стейджинг и снова делает коммит. Самая вероятная ошибка — дать проверкам читать типы, которые только что записал `sheriff types`: тогда коммит проходит со старыми типами в стейджинге."),
    ],
    refs: [
      R("implements", "s-pcnyfp7gev7syax"),
      R("implements", "s-kh8qcd5kxgh9z3j"),
      R("cites", "s-t9j29hppag2nren"),
      R("cites", "s-n4m5zvh96yb299p"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-7zqsstgnuc772ba"),
      R("cites", "s-xzcw3hv4hmxz7h7"),
      R("cites", "s-7pk89t8z6wymmj9"),
      R("cites", "s-qgg6sfawtmwvrbb"),
      R("cites", "s-e3495enbc5h75c3"),
      R("cites", "s-rpv4fkdqqguptqd"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-dbk2vyeg8z5jxna"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "skills/tools/hooks/pre-commit is rewritten in this order: the project's own tools that rewrite files (read from project.json through the model, s-t9j29hppag2nren), run in the working tree; then staged.sh writes the index out; then `sheriff types` in a second copy of what is staged, each file it writes copied into the working tree and not into the directory that the checks read; then the project's other tools; then `sheriff validate`; then `sheriff binding` and `sheriff citations` only where `sheriff validate` has not stopped at the check for a key written more than once or at the validation against the schema (for example by an exit code of its own for that stop, which cli.ts and validate.ts are to give); last, `sheriff markdown` and `sheriff map` in the working tree, only where sheriff.config.json chooses the Views extension. The project's own tools move from the git hook that sheriff init writes into this script (s-4mej6ccn7xu3d3p). Tests for the order, for the types that the checks read as staged, and for `sheriff binding` not run after a refused key are written first; the tests named in testsFrom move here from s-477gtdrkw34dzxw and are rewritten for `sheriff markdown` and `sheriff map`.",
});

add("new:tools-6-push-compare", {
  location: "tools 6b (new, after “The pre-commit hook”)",
  from: "s-477gtdrkw34dzxw",
  sidValue: SID.pushCompare,
  testsFrom: [
    "the pre-push hook compares every ref the push sends, tags and other branches included, leaving aside the files the working tree ignores",
    "the pre-push hook refuses a push while the working tree differs from the commit it sends, naming each such file",
  ],
  proposal: {
    title: "The working tree compared with what a push sends",
    ruTitle: "Сравнение рабочего дерева с тем, что отправляет push",
    parts: [
      P("Before a push for which it runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook refuses the push where a file is in either of the following cases, and names each such file:",
        "Перед push, для которого он запускает тесты (§s-b6qdtghnyha3fhk), хук pre-push отвергает push, если какой-либо файл находится в одном из следующих случаев, и называет каждый такой файл:",
        "Было: «Before a push that runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with the commit each ref the push creates or updates names… It refuses the push where a file is in one of these cases, naming each such file:». Узел начинается с того, что отвергается и что называет отказ."),
      L("the file differs between the working tree and a commit that the tests judge;",
        "файл отличается в рабочем дереве и в коммите, который оценивают тесты;",
        "Было: «it differs between the working tree and the commit;». Теперь сравнение идёт только с коммитами, которые оценивают тесты; см. абзац ниже."),
      L("the file is in only one of them, including a file that is in the working tree and has never been added to git.",
        "файл есть только в одном из них, в том числе файл, который есть в рабочем дереве и ни разу не был добавлен в git.",
        "Было два пункта: «it stands in only one of them;» и «it stands in the working tree without having been added.» Второй — частный случай первого, поэтому они объединены."),
      P("A commit that the tests judge is a commit to which the push creates or updates a ref, directly or through a tag, and that meets the conditions under which the tests run (§s-b6qdtghnyha3fhk). A commit that leaves the specification a draft is never compared, since the tests do not judge it.",
        "Коммит, который оценивают тесты, — это коммит, на который push создаёт или обновляет ref, напрямую или через тег, и который удовлетворяет условиям запуска тестов (§s-b6qdtghnyha3fhk). Коммит, после которого спецификация остаётся черновиком, никогда не сравнивается, потому что тесты его не оценивают.",
        "Было: сравнение с коммитом каждого ref, который создаёт или обновляет push. Согласованный узел «Running the tests before a push» запускает тесты только для ref, коммит которого удовлетворяет обоим условиям; коммит другого ref тесты не оценивают, и сравнивать с ним рабочее дерево незачем. Так решён вопрос, который остался открытым при согласовании узла «Running the tests before a push»."),
      P("The hook leaves out the files that the working tree ignores. Where it refuses nothing, it runs the tests in the working tree.",
        "Хук не учитывает файлы, которые рабочее дерево игнорирует. Если он ничего не отверг, он запускает тесты в рабочем дереве.",
        "Было: «It leaves aside the files the working tree ignores.» и «Otherwise it runs the tests in the working tree.» Без изменений по смыслу."),
    ],
    reason: "The tests run in the working tree, which holds what each checkout installs or builds for itself, so they judge a pushed commit only where the working tree holds what that commit holds.",
    ruReason: "Тесты выполняются в рабочем дереве, где есть то, что каждая рабочая копия устанавливает или собирает для себя, поэтому они оценивают отправленный коммит, только если рабочее дерево содержит то же, что этот коммит.",
    reasonChange: "Было: три абзаца — о том, что тест оценивает коммит, только если читает его файлы, о том, почему не учитываются игнорируемые файлы, и о том, почему отказ называет файлы. Теперь одно предложение о том, зачем нужно сравнение (правило 7.4.2).",
    examples: [
      X("A developer commits a change and leaves an edit of `src/a.ts` uncommitted. The specification is approved, and the project's own guidelines name a push as the moment at which the tests run. The pre-push hook refuses the push and names `src/a.ts`. The most likely mistake is to run the tests in the working tree as it is, so that they pass or fail because of an edit that the pushed commit does not hold.",
        "Разработчик делает коммит изменения, а правку `src/a.ts` оставляет вне коммита. Спецификация одобрена, и собственные guidelines проекта называют push моментом запуска тестов. Хук pre-push отвергает push и называет `src/a.ts`. Самая вероятная ошибка — запускать тесты в рабочем дереве как есть: тогда они проходят или падают из-за правки, которой нет в отправленном коммите."),
    ],
    refs: [
      R("implements", "s-aufnqn6t7y2me7a"),
      R("cites", "s-b6qdtghnyha3fhk"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "skills/tools/hooks/pre-push compares the working tree with the commit of every ref that the push creates or updates; it is to compare only with the commits that meet both conditions of s-b6qdtghnyha3fhk, which push-mode.ts is to name. The test “the pre-push hook compares every ref the push sends, tags and other branches included…” is rewritten first for a push of two refs of which only one meets the conditions; both tests named in testsFrom move here from s-477gtdrkw34dzxw.",
});

add("new:tools-6-hooks-on", {
  location: "tools 6c (new, after “The working tree compared with what a push sends”)",
  from: "s-477gtdrkw34dzxw",
  sidValue: SID.hooksOn,
  testsFrom: [
    "the plugin's session start turns the git hooks on where core.hooksPath is unset, saying so, and reports another directory",
    "the session start of the agent's hooks for Codex turns the git hooks on where core.hooksPath is unset, saying so",
    "the plugin's session start names each git hook not executable, says how to make it so, and changes neither the file nor the index",
    "the plugin's session start names no file of the project's own tools, which run by the interpreter their first line names",
  ],
  proposal: {
    title: "Turning the git hooks on when a session starts",
    ruTitle: "Включение git-хуков при начале сессии",
    parts: [
      P("When a session starts in a repository whose root holds `sheriff.config.json`, the agent's hook (§s-477gtdrkw34dzxw) does the following with git's `core.hooksPath`:",
        "Когда сессия начинается в репозитории, в корне которого есть `sheriff.config.json`, хук агента (§s-477gtdrkw34dzxw) делает с `core.hooksPath` в настройках git следующее:",
        "Было: «A clone turns the git hooks on with `git config core.hooksPath .githooks`. The `SessionStart` hook of the agent, the plugin's for Claude Code or the project's for Codex (§s-n76wt2bkqdmh78x), runs that command where `core.hooksPath` is unset, saying so.» Без изменений по смыслу; условие о `sheriff.config.json` было в узлах о плагинах и о хуках для Codex и так работает код."),
      L("where it is unset, the hook sets it to `.githooks` and says so;",
        "если эта настройка не задана, хук задаёт ей значение `.githooks` и сообщает об этом;",
        "Без изменений по смыслу."),
      L("where it names another directory, the hook says that the git hooks that `sheriff init` writes (§s-7unxytshhc4md54) do not run.",
        "если она называет другой каталог, хук сообщает, что git-хуки, которые записывает `sheriff init` (§s-7unxytshhc4md54), не выполняются.",
        "Было: «It reports where `core.hooksPath` names another directory.» Сказано, что именно сообщается, как это делает код."),
      P("The hook also names each git hook in `.githooks/` in either of the following cases:",
        "Хук также называет каждый git-хук в `.githooks/` в любом из следующих случаев:",
        "Было: «The `SessionStart` hook also names each git hook in `.githooks/` in one of these cases:». Без изменений по смыслу."),
      L("git's index holds the hook without the executable mode;",
        "индекс git хранит хук без исполняемого режима;",
        "Без изменений по смыслу."),
      L("on a system whose files keep the executable bit, the hook's file lacks that bit.",
        "в системе, где у файлов есть бит исполнения, у файла хука этого бита нет.",
        "Без изменений по смыслу."),
      P("For each such hook, it says how to make the hook executable on every system: `chmod +x <hook>` and `git update-index --chmod=+x <hook>`, then a commit. It changes neither the mode of a file nor git's index. It leaves out the project's own tools in `.githooks/<hook>.d/`, which run by the interpreter that their first line names (§s-n4m5zvh96yb299p).",
        "Для каждого такого хука он сообщает, как сделать хук исполняемым в любой системе: `chmod +x <hook>` и `git update-index --chmod=+x <hook>`, затем коммит. Он не меняет ни режим файла, ни индекс git. Собственные инструменты проекта в `.githooks/<hook>.d/` он не называет: их запускает интерпретатор, который назван в их первой строке (§s-n4m5zvh96yb299p).",
        "Было: «It says how to make each one executable on every system… It changes neither the mode of a file nor git's index.» Без изменений по смыслу. Добавлено, что собственные инструменты проекта не называются, как это делает код и проверяет тест узла."),
    ],
    reason: "On a system whose files keep the executable bit, git skips a hook that cannot be executed and refuses nothing, so a commit there would pass no check. The session start reaches every clone, while a hook that git skips cannot report itself. The session start leaves the mode to the author, since recording the mode is staging.",
    ruReason: "В системе, где у файлов есть бит исполнения, git пропускает хук, который нельзя исполнить, и ничего не отвергает, поэтому коммит там не прошёл бы ни одной проверки. Начало сессии доходит до каждого клона, тогда как хук, который git пропускает, сам о себе сообщить не может. Режим начало сессии оставляет автору, потому что записать режим — значит добавить файл в стейджинг.",
    reasonChange: "Было: абзацы о том, что git пропускает хук без бита исполнения, что начало сессии доходит до каждого клона и что режим оставляется автору. Без изменений по смыслу, короче.",
    examples: [
      X("A repository set up on Windows has its git hooks committed without the executable mode. A developer clones it on Linux and starts a session. The session start names each hook and says how to make it executable. The most likely mistake is to make the hooks executable in the working tree without saying so, which leaves the index as it was, so that each of the other clones still gets hooks that git skips.",
        "Репозиторий, настроенный в Windows, содержит git-хуки, закоммиченные без исполняемого режима. Разработчик клонирует его в Linux и начинает сессию. Начало сессии называет каждый хук и сообщает, как сделать его исполняемым. Самая вероятная ошибка — молча сделать хуки исполняемыми в рабочем дереве: индекс остаётся прежним, и каждый другой клон по-прежнему получает хуки, которые git пропускает."),
    ],
    refs: [
      R("implements", "s-epaw9sgyaajzn8g"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-7unxytshhc4md54"),
      R("cites", "s-n4m5zvh96yb299p"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "None in the code: session-start.sh already does this. The tests named in testsFrom move here from s-477gtdrkw34dzxw.",
});

add("new:tools-6-reviewer-settings", {
  location: "tools 6d (new, after “Turning the git hooks on when a session starts”)",
  from: "s-477gtdrkw34dzxw",
  sidValue: SID.reviewerSettings,
  testsFrom: [
    "in a repository taking the method the session start names each setting the user's configuration lacks, with its default, and has the agent ask for them once on each machine",
    "the session start of the agent's hooks for Codex names each setting of the runner codex the user's configuration lacks, with its default, and has the agent ask for them once on each machine",
    "the session start of the plugin for Claude Code writes each setting the user gave as an option, in any repository, wherever the configuration lacks it or holds another value",
  ],
  proposal: {
    title: "The reviewer's settings asked for when a session starts",
    ruTitle: "Запрос настроек рецензента при начале сессии",
    parts: [
      P("When a session starts, the agent's hook of the plugin for Claude Code (§s-zh2vcr3xjumppg5) writes into the user's git configuration, with `git config --global`, each setting of the runner `claude` (§s-tnz9zgqx8c629a7) that the user has given as an option of that plugin. It does so in any repository, wherever the configuration lacks the setting or holds another value.",
        "Когда сессия начинается, хук агента плагина для Claude Code (§s-zh2vcr3xjumppg5) записывает в настройки git пользователя командой `git config --global` каждую настройку runner `claude` (§s-tnz9zgqx8c629a7), которую пользователь задал как параметр этого плагина. Он делает это в любом репозитории, если в настройках этой настройки нет или там другое значение.",
        "Было: «The `SessionStart` hook of the plugin for Claude Code writes into the user's git configuration, by `git config --global`, each setting of the runner `claude` (§s-xr5xxa9cxf2mq5u) the user has given as an option of that plugin (§s-zh2vcr3xjumppg5). It writes a setting wherever the configuration lacks it or holds another value.» Без изменений по смыслу. Ссылка теперь ведёт на узел «The settings of each runner», который определяет эти настройки (заметки группы 2, п. 7); «в любом репозитории» было в решении от 2026-11-02 и в тесте."),
      P("Then, in a repository whose root holds `sheriff.config.json`, the agent's hook of either SpecSheriff plugin names each setting that the user's git configuration lacks for the runner that `sheriff review` would run at a commit there (§s-xr5xxa9cxf2mq5u). That runner is the one that `review.runner` names, or otherwise the runner of the SpecSheriff tools that the git hooks would take there (§s-4mej6ccn7xu3d3p). With each setting, the hook names the default that `sheriff review` takes for it. It asks the agent to do the following:",
        "Затем в репозитории, в корне которого есть `sheriff.config.json`, хук агента любого из плагинов SpecSheriff называет каждую настройку, которой нет в настройках git пользователя, у runner, которого `sheriff review` запустил бы при коммите в этом репозитории (§s-xr5xxa9cxf2mq5u). Это runner, которого называет `review.runner`, а иначе — runner инструментов SpecSheriff, которые взяли бы там git-хуки (§s-4mej6ccn7xu3d3p). Вместе с каждой настройкой хук называет значение по умолчанию, которое для неё берёт `sheriff review`. Он просит агента:",
        "Было: «Where the git configuration lacks a setting of the runner `sheriff review` would take at a commit in the repository (§s-xr5xxa9cxf2mq5u, §s-4mej6ccn7xu3d3p), the `SessionStart` hook of either agent names each such setting. With each, it names the default `sheriff review` takes for it. It asks the agent to do the following:». Без изменений по смыслу. Сказано, какой это runner, как его находит код."),
      L("to offer the user each default to confirm or replace;",
        "предложить пользователю подтвердить или заменить каждое значение по умолчанию;",
        "Без изменений по смыслу."),
      L("to write with `git config --global` the value that the user gives in reply, including the default.",
        "записать командой `git config --global` значение, которое пользователь даст в ответ, в том числе значение по умолчанию.",
        "Было: «to write with `git config --global` the value the user answers, the default included.» Без изменений по смыслу."),
      P("The hook asks so once for each runner on each machine. After asking, it records `true` in the user's git configuration as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. While that record holds `true`, the hook asks nothing.",
        "Хук просит об этом один раз для каждого runner на каждой машине. Попросив, он записывает `true` в настройки git пользователя как `specsheriff.review.claudeAsked` или `specsheriff.review.codexAsked`. Пока там записано `true`, хук ни о чём не просит.",
        "Было: «It asks so once for each runner on each machine, and marks it asked in the git configuration, as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. Where the mark stands, it asks nothing.» Без изменений по смыслу; названо значение отметки, как его пишет код."),
    ],
    reason: "A run of the reviewer is paid for by the user who commits, so that user chooses its settings (§s-tnz9zgqx8c629a7), once, as soon as an agent can ask. The git hooks run the reviewer outside the agent, so they read those settings from the user's git configuration, where the session start also writes the options that Claude Code asked for.",
    ruReason: "Прогон рецензента оплачивает пользователь, который делает коммит, поэтому настройки рецензента выбирает этот пользователь (§s-tnz9zgqx8c629a7) — один раз и как только агент может спросить. Git-хуки запускают рецензента вне агента, поэтому читают эти настройки из настроек git пользователя, куда начало сессии записывает и параметры, о которых спросил Claude Code.",
    reasonChange: "Было: пять абзацев о том, почему настройки выбирает пользователь, почему Claude Code спрашивает при установке, почему параметры пишутся в настройки git, почему Codex спрашивает через агента и почему вопрос задаётся один раз. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2).",
    examples: [
      X("A user installs the plugin for Codex CLI and opens a repository that has taken up the method. The session start names `specsheriff.review.codexModel` and `specsheriff.review.codexEffort` with their defaults, and the agent asks the user about them. The user confirms the effort and names a model, and the agent writes both. The most likely mistake is to write the defaults without asking, so that the user pays for settings that the user never chose.",
        "Пользователь устанавливает плагин для Codex CLI и открывает репозиторий, который перешёл на метод. Начало сессии называет `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` с их значениями по умолчанию, и агент спрашивает о них пользователя. Пользователь подтверждает уровень рассуждений и называет модель, и агент записывает оба значения. Самая вероятная ошибка — записать значения по умолчанию, не спросив: тогда пользователь платит за настройки, которых он не выбирал."),
    ],
    refs: [
      R("implements", "s-m4h279nbaqkpa3t"),
      R("cites", "s-zh2vcr3xjumppg5"),
      R("cites", "s-tnz9zgqx8c629a7"),
      R("cites", "s-xr5xxa9cxf2mq5u"),
      R("cites", "s-4mej6ccn7xu3d3p"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "None in the code: session-start.sh already does this. The tests named in testsFrom move here from s-477gtdrkw34dzxw.",
});

add("new:tools-6-after-edit", {
  location: "tools 6e (new, after “The reviewer's settings asked for when a session starts”)",
  from: "s-477gtdrkw34dzxw",
  sidValue: SID.afterEdit,
  testsFrom: [
    "after an agent's edit the types are written before the checks run",
    "after an agent's edit, a file changed while the checks run is checked at the next edit, not taken as checked",
    "the agent's hook after an edit runs the checks only where something changed since they last ran",
    "the agent's hook after an edit tells the agent each node whose status the reindex emptied",
  ],
  proposal: {
    title: "The agent's hook after an edit",
    ruTitle: "Хук агента после правки",
    parts: [
      P("After an agent's edit made with the file-editing tools, or after a shell command that the agent runs, the agent's hook runs the SpecSheriff tools where either of the following holds:",
        "После правки агента, сделанной инструментами редактирования файлов, или после команды оболочки, которую запускает агент, хук агента запускает инструменты SpecSheriff, если выполняется одно из следующего:",
        "Было: «After such an edit or a shell command (Claude Code's `Bash` or `PowerShell`), the checks run over the working tree where one of the following holds:». Без изменений по смыслу; какие инструменты агента вызывают хук, говорят узлы о плагине для Claude Code и о хуках для Codex."),
      L("the last commit or the working tree, other than the files that git ignores, differs from what the hook noted in the clone's git directory when the checks last ran;",
        "последний коммит или рабочее дерево, кроме файлов, которые git игнорирует, отличается от того, что хук отметил в каталоге git клона, когда проверки выполнялись в последний раз;",
        "Без изменений по смыслу."),
      L("nothing is noted.",
        "ничего не отмечено.",
        "Без изменений по смыслу."),
      P("Where it runs them, the hook runs the following, in this order:",
        "Если он их запускает, хук выполняет следующее в таком порядке:",
        "Было: «They run in this order:»."),
      L("`sheriff reindex` (§s-ztseyetus7np6br), where the files that differ include a file under `specs/`, `sheriff.config.json`, or a file in which the SpecSheriff tools look for SpecTags, as the settings in `sheriff.config.json` (§s-zefk589ykh37b8u) set them;",
        "`sheriff reindex` (§s-ztseyetus7np6br), если среди отличающихся файлов есть файл внутри `specs/`, `sheriff.config.json` или файл, в котором инструменты SpecSheriff ищут SpecTag так, как это задают настройки в `sheriff.config.json` (§s-zefk589ykh37b8u);",
        "Было: `sheriff reindex` запускался, только если отличался файл внутри `specs/`, `sheriff.config.json` или код собственного генератора проекта. Согласованный узел «What `sheriff reindex` writes» велит ему писать `meta.code` и `meta.tests` по SpecTag в коде и тестах, поэтому после правки только кода или тестов он тоже должен выполняться; иначе `sheriff binding` отвергал бы эти списки."),
      L("where the files that differ include a file under `specs/` or `sheriff.config.json`, or where `sheriff reindex` has written a file: `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), if the project has chosen the Views extension (§s-qgg6sfawtmwvrbb);",
        "если среди отличающихся файлов есть файл внутри `specs/` или `sheriff.config.json` либо `sheriff reindex` записал какой-либо файл, — `sheriff markdown` (§s-e3495enbc5h75c3) и `sheriff map` (§s-rpv4fkdqqguptqd), если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb);",
        "Было: «`sheriff export`, `sheriff render`». Команды переименованы (ваше решение от 2026-11-21) и запускаются только в проекте, который выбрал расширение Views (ваш ответ А на второй вопрос группы 7)."),
      L("`sheriff types` (§s-a8fn72xa782wvbk), under the same condition, and also where the files that differ include the code of a project's own generator (§s-km4x4s26kv7pjze);",
        "`sheriff types` (§s-a8fn72xa782wvbk) при том же условии, а также если среди отличающихся файлов есть код собственного генератора проекта (§s-km4x4s26kv7pjze);",
        "Было: «`sheriff types`» в первой группе команд. Без изменений по смыслу."),
      L("`sheriff validate`, `sheriff binding` and `sheriff citations`, which read the working tree, with its difference from the last commit as the commit being made.",
        "`sheriff validate`, `sheriff binding` и `sheriff citations`, которые читают рабочее дерево, принимая его отличие от последнего коммита за создаваемый коммит.",
        "Было: «then `sheriff validate`, `sheriff binding` and `sheriff citations`» и «The checks read the working tree's difference from the last commit as the commit.» Без изменений по смыслу."),
      P("Where `sheriff reindex` refuses, the hook runs nothing after it.",
        "Если `sheriff reindex` отказывает, хук после него ничего не запускает.",
        "Новое в тексте: так делает код (after-edit.sh)."),
      P("The hook hands the agent what `sheriff types` and the checks refuse, and names each node that `sheriff reindex` makes a draft. It hands them to Claude Code by exiting with code 2 and writing them to its standard error. It hands them to Codex as the agent's hooks for Codex CLI say (§s-n76wt2bkqdmh78x).",
        "Хук передаёт агенту то, что отвергают `sheriff types` и проверки, и называет каждый узел, который `sheriff reindex` делает черновиком. Claude Code он передаёт это, завершаясь с кодом 2 и записывая это в свой стандартный поток ошибок. Codex он передаёт это так, как говорит узел о хуках агента для Codex CLI (§s-n76wt2bkqdmh78x).",
        "Было: «What they refuse is reported to the agent. So is each node that `sheriff reindex` made a draft, a section and a domain's header left out (§s-9kfdycuq34beqvs).» Оговорка о разделе и заголовке домена убрана: по согласованному узлу «What `sheriff reindex` writes» он называет только узлы, статус одобрения которых задают одобрения, а заголовок домена есть только в расширении Domains. Добавлено, как отказ доходит до Claude Code."),
      P("Once the checks end, whatever they found, the hook notes the last commit and the working tree as they were when the checks began. So a file changed while the checks run is checked at the next run.",
        "Когда проверки закончились, что бы они ни нашли, хук отмечает последний коммит и рабочее дерево такими, какими они были в начале проверок. Поэтому файл, изменённый, пока выполнялись проверки, проверяется при следующем запуске.",
        "Новое в тексте: так делает код (changed.mjs) и проверяет тест узла; прежде это говорило только обоснование."),
    ],
    reason: "The checks run where the agent works, so that a mistake is found at the edit that makes it (§s-epaw9sgyaajzn8g). They run only where something has changed since they last ran, so that a session that only reads the repository through the shell is not held up.",
    ruReason: "Проверки выполняются там, где работает агент, чтобы ошибка находилась при той правке, которая её вносит (§s-epaw9sgyaajzn8g). Они выполняются, только если что-то изменилось с прошлого раза, чтобы сессия, которая лишь читает репозиторий через оболочку, не задерживалась.",
    reasonChange: "Было: абзацы о том, что проверки сравнивают рабочее дерево с последним коммитом, что порождение выполняется только там, где изменение может на него повлиять, и что изменение между вызовами проверяется при следующем вызове. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2).",
    examples: [
      X("An agent adds the SpecTag of rule R to a function in a new file, `src/order.ts`. The hook runs `sheriff reindex`, which adds `src/order.ts` to the `meta.code` of R, and the checks then accept that list. The most likely mistake is to run `sheriff reindex` only where a file under `specs/` has changed, so that `sheriff binding` refuses the `meta.code` of R after an edit to code alone (§s-t383grkn3q68dpf).",
        "Агент добавляет SpecTag правила R к функции в новом файле `src/order.ts`. Хук запускает `sheriff reindex`, который добавляет `src/order.ts` в `meta.code` правила R, и затем проверки этот список принимают. Самая вероятная ошибка — запускать `sheriff reindex`, только если изменился файл внутри `specs/`: тогда после правки одного кода `sheriff binding` отвергает `meta.code` правила R (§s-t383grkn3q68dpf)."),
    ],
    refs: [
      R("implements", "s-epaw9sgyaajzn8g"),
      R("implements", "s-kh8qcd5kxgh9z3j"),
      R("cites", "s-ztseyetus7np6br"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-e3495enbc5h75c3"),
      R("cites", "s-rpv4fkdqqguptqd"),
      R("cites", "s-qgg6sfawtmwvrbb"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-km4x4s26kv7pjze"),
      R("cites", "s-n76wt2bkqdmh78x"),
      R("cites", "s-t383grkn3q68dpf"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "after-edit.sh and changed.mjs: `changed.mjs diff` is to print a third answer where only files read for SpecTags differ (the code and tests globs, the files of the project's own checks and generators, the files of the types and RuntimeChecks, sheriff.bindings.json), on which the hook runs `sheriff reindex` and the checks; `sheriff markdown` and `sheriff map` replace `export` and `render` and run only where sheriff.config.json chooses the Views extension; they and `sheriff types` run where specs/ or sheriff.config.json differ or `sheriff reindex` wrote a file (its `written:` lines). A failure of `sheriff markdown` or `sheriff map` no longer stops the checks. Tests for an edit to code alone, for a project without the Views extension and for the drafts named without headers are written first; the tests named in testsFrom move here from s-477gtdrkw34dzxw.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 58: "An edit judged before it is made" (s-st6td4mua9uqt9z), tools 7.3.2.
// ---------------------------------------------------------------------------------------------------------------
add("s-st6td4mua9uqt9z", {
  location: "tools 7.3.2",
  sidValue: "s-st6td4mua9uqt9z",
  testsFrom: [
    "names sheriff reindex where only a test carrying a bare sid names the rule whose code an edit changes",
    "reads the tests as the edit would leave the working tree",
  ],
  proposal: {
    title: "An edit judged before it is made",
    ruTitle: "Оценка правки до того, как она сделана",
    parts: [
      P("`sheriff guard` refuses each of the following edits by an agent (§s-83ev4wwesbwnhnp):",
        "`sheriff guard` отвергает каждую из следующих правок агента (§s-83ev4wwesbwnhnp):",
        "Было: «`sheriff guard` builds the file as the edit would leave it, without writing it to disk.» Узел проверки теперь начинается с того, что отвергается (правило вашего брифа), а то, как строится файл, сказано ниже."),
      L("an edit that leaves approved a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, while no approval of that wording is in force (§s-v4qus7raqnwzneb);",
        "правку, которая оставляет одобренным узел, который она добавляет, или узел, формулировку (§s-5ah25f6gy99panq) или статус одобрения (§s-tgrnpagrb58tya7) которого она меняет, тогда как ни одно одобрение этой формулировки не действует (§s-v4qus7raqnwzneb);",
        "Было: «A node the edit leaves approved is looked up in the approvals, a section and a domain's header left out. The latest line for its sid and the fingerprint of its wording must be an approval (§s-95w92rnjuv3sst8).» Без изменений по смыслу; что одобрение действует, определяет согласованный узел «How an approval is recorded». Сказано, какие узлы оценивает правка, как это делает код (guard.ts): узел, который правка оставляет как был, позже делает черновиком `sheriff reindex`."),
      L("an edit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), other than tests, while no test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc);",
        "правку, которая добавляет или меняет код, привязанный к правилу (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), кроме тестов, тогда как ни у одного теста кода системы (§s-hheus6f395ynqvc) нет SpecTag этого правила (§s-zrsc6asgmhv8tnc);",
        "Было: «The SpecTags of each changed symbol are looked up among the sids named by the SpecTags of the working tree's tests, the edited file as it would stand included.» Без изменений по смыслу. Правило теперь — любой узел, который может назвать SpecTag (`TextRule`, `TableRule`, RecordType и узел собственного типа проекта, которому нужна имплементация), как требует правило 10.3 и как перечисляет согласованный узел «The form of a SpecTag»; код проверял только `TextRule`."),
      L("an edit of `specs/_approvals.jsonl`, whatever it changes;",
        "правку `specs/_approvals.jsonl`, что бы она ни меняла;",
        "Было: «An edit of `specs/_approvals.jsonl` is refused whatever it changes, since `sheriff approve` records an approval and its withdrawal (§s-v4qus7raqnwzneb).» Без изменений по смыслу; какую команду называет отказ, сказано ниже."),
      L("an edit that adds, changes or removes an entry in the list `approvalStatus`, `strict` or `extensions` of `sheriff.config.json` (§s-d3nkw9b6mn98vuw).",
        "правку, которая добавляет, меняет или удаляет запись в списке `approvalStatus`, `strict` или `extensions` файла `sheriff.config.json` (§s-d3nkw9b6mn98vuw).",
        "Новое: правило 10.3 теперь защищает и записи статуса одобрения спецификации, флага `strict` и выбранных расширений; согласованный узел «The entries of the settings that only an owner changes» хранит их в этих трёх списках (заметки группы 6, п. 8)."),
      P("The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and each such rule by its sid and its location. For an edit of `specs/_approvals.jsonl`, it names `sheriff approve`, which records an approval and its withdrawal (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit of an entry, it names the list and `sheriff settings` (§s-chsfpkgpmfk4fft).",
        "Отказ называет каждый такой узел по его файлу, sid и расположению (§s-kag2m9tzdnduxdx), а каждое такое правило — по sid и расположению. Для правки `specs/_approvals.jsonl` он называет `sheriff approve`, который записывает одобрение и его отзыв (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). Для правки записи он называет список и `sheriff settings` (§s-chsfpkgpmfk4fft).",
        "Новое в тексте: что называет отказ. Так делает код для узла, правила и файла одобрений; для записей настроек отказ называет команду, которая их записывает."),
      P("While the installed SpecSheriff plugin lacks an extension that the project has chosen, `sheriff guard` refuses every edit and names each missing extension (§s-mhsb6fjsq5xn6c9).",
        "Пока в установленном плагине SpecSheriff нет расширения, которое выбрал проект, `sheriff guard` отвергает любую правку и называет каждое недостающее расширение (§s-mhsb6fjsq5xn6c9).",
        "Новое: согласованный узел «The chosen extensions and the installed plugin» относит `sheriff guard` к командам, которые читают выбранные расширения; так решено по вашему решению от 2026-11-18 о строке 10.1.27c (заметки группы 3, п. 8)."),
      P("`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, on its standard input. It builds each file as the edit would leave it, without writing it to disk. Where the edit would not apply, as where `Edit` names text that the file does not hold, `sheriff guard` lets the tool refuse it.",
        "`sheriff guard` оценивает правку, сделанную инструментами Claude Code `Write`, `Edit` или `MultiEdit`, и патч, который применяет инструмент Codex `apply_patch` (§s-n76wt2bkqdmh78x). Правку он читает со стандартного ввода в том виде, в каком её описывает среда агента. Каждый файл он строит таким, каким его оставит правка, не записывая его на диск. Если правка неприменима, например `Edit` называет текст, которого в файле нет, `sheriff guard` оставляет отказ самому инструменту.",
        "Было: «`sheriff guard` builds the file as the edit would leave it, without writing it to disk.» Без изменений по смыслу. Добавлено, какие инструменты агента оценивает `sheriff guard` и откуда он читает правку, как это делает код."),
      P("`sheriff guard` judges the nodes in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out each node whose approval status is derived from other nodes, such as a section (§s-9kfdycuq34beqvs). It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that the edit would leave other than valid JSON.",
        "`sheriff guard` оценивает узлы в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он не оценивает узел, статус одобрения которого выводится из других узлов, например раздел (§s-9kfdycuq34beqvs). Файл спецификации, который правка оставит не в виде корректного JSON, он оставляет проверкам после правки (§s-hcmpjmwtgfwzncu).",
        "Было: «a section and a domain's header left out». Без изменений по смыслу, сказано без названия расширения Domains, как в правиле 10.3. Добавлены узел в ячейке `TableRule` и файл, который не является JSON, как это делает код."),
      P("`sheriff guard` finds the code that an edit adds or changes as it finds what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. It looks for the test among the tests of the working tree as the edit would leave it.",
        "Код, который правка добавляет или меняет, `sheriff guard` находит так же, как то, что добавляет или меняет коммит (§s-2x58az67bm6cxq2), сравнивая каждый файл в нынешнем виде с файлом таким, каким его оставит правка. Тест он ищет среди тестов рабочего дерева в том виде, в каком его оставит правка.",
        "Было: «Each changed line counts for the symbol it stands in. A line holding a SpecTag counts for the symbol the SpecTag marks (§s-2x58az67bm6cxq2).» Как находится изменённый код, говорит согласованный узел «What a commit adds, changes and removes in the code and the tests», и он относит к коду и файлы, привязанные целиком, и записи файла привязок."),
      P("`sheriff guard` reads the lists of `sheriff.config.json` from the file as it is and as the edit would leave it. A `sheriff.config.json` that is missing or is not valid JSON is read as holding none of those lists.",
        "Списки `sheriff.config.json` `sheriff guard` читает из файла в нынешнем виде и в том виде, в каком его оставит правка. `sheriff.config.json`, которого нет или который не является корректным JSON, читается как файл без этих списков.",
        NEW),
      P("Where it refuses an edit, `sheriff guard` writes the refusal to its standard error and exits with code 2. It makes these checks regardless of whether the specification is approved or a draft.",
        "Отвергая правку, `sheriff guard` записывает отказ в свой стандартный поток ошибок и завершается с кодом 2. Эти проверки он выполняет независимо от того, одобрена спецификация или является черновиком.",
        "Новое в тексте: так делает код (cli.ts), а правило 10.3 не делает исключения для черновика."),
    ],
    reason: "`sheriff guard` judges each file as the edit would leave it, so that an edit that the rule on an agent's edit forbids is refused before anything is written (§s-83ev4wwesbwnhnp). It judges only what the edit changes, so that what other files already hold never holds up an edit that the rule allows.",
    ruReason: "`sheriff guard` оценивает каждый файл таким, каким его оставит правка, чтобы правка, которую запрещает правило о правке агента, отвергалась до того, как что-либо записано (§s-83ev4wwesbwnhnp). Он оценивает только то, что меняет правка, чтобы правку, которую правило разрешает, никогда не задерживало то, что уже содержат другие файлы.",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("An owner asks the agent to approve the specification, and the agent tries to add an entry to `approvalStatus` in `sheriff.config.json` with its editing tool. `sheriff guard` refuses the edit and names `approvalStatus` and `sheriff settings`, and the agent runs `sheriff settings status approved`. The most likely mistake is to judge only the files under `specs/`, so that the entry is written without `sheriff settings`, which checks that whoever records it is an owner.",
        "Ответственный просит агента одобрить спецификацию, и агент пытается добавить запись в `approvalStatus` в `sheriff.config.json` своим инструментом редактирования. `sheriff guard` отвергает правку и называет `approvalStatus` и `sheriff settings`, и агент запускает `sheriff settings status approved`. Самая вероятная ошибка — оценивать только файлы внутри `specs/`: тогда запись появляется в обход `sheriff settings`, который проверяет, что её делает ответственный."),
    ],
    refs: [
      R("implements", "s-83ev4wwesbwnhnp"),
      R("cites", "s-5ah25f6gy99panq"),
      R("cites", "s-tgrnpagrb58tya7"),
      R("cites", "s-v4qus7raqnwzneb"),
      R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-zrsc6asgmhv8tnc"),
      R("cites", "s-d3nkw9b6mn98vuw"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-upkur92ry6332y5"),
      R("cites", "s-xybjqp2rxh8gszf"),
      R("cites", "s-chsfpkgpmfk4fft"),
      R("cites", "s-mhsb6fjsq5xn6c9"),
      R("cites", "s-n76wt2bkqdmh78x"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-9kfdycuq34beqvs"),
      R("cites", SID.afterEdit),
      R("cites", "s-2x58az67bm6cxq2"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the refusals before an edit are no rows of that table; the node implements rule 10.3 (question X1).",
      "The `implements` link to “Where a SpecTag may appear” (s-sfjka4zc4rhfu67) and the item “An edit of a file the settings name as the code of a project's own check or generator is refused where no test of the working tree carries the SpecTag of the rule listing it”: on 2026-11-13 the owner removed the requirements on the tests of a project's own checks and generators from rule 10.10, and rule 10.3 no longer lists that refusal.",
      "The `cites` link to “An approved node with no approval in force” (s-95w92rnjuv3sst8): whether an approval is in force is defined by “How an approval is recorded” (s-v4qus7raqnwzneb), which the node now cites.",
    ],
    date: DATE,
  },
  stage3: "guard.ts: the test for code without a test is to cover every kind that s-5z5gnu7pahr82xp lists, not `TextRule` alone, and to find the changed code as s-2x58az67bm6cxq2 does, including files bound as a whole and entries of sheriff.bindings.json; an edit of sheriff.config.json that changes the lists approvalStatus, strict or extensions is to be refused, naming the list and `sheriff settings`, a missing or broken file read as holding none of them; `sheriff guard` is to refuse every edit while a chosen extension is missing from the plugin (s-mhsb6fjsq5xn6c9); the refusal of a node is to name its file and location; judgedHere stops reading writesSpecSheriffGuidelines and reads SPECSHERIFF_GUIDELINES_REPO (s-zefk589ykh37b8u). Tests for each of these are written first and carry this sid; the tests named in testsFrom keep it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 59: "The agent's hooks for Codex CLI" (s-n76wt2bkqdmh78x), tools 16.
// ---------------------------------------------------------------------------------------------------------------
add("s-n76wt2bkqdmh78x", {
  location: "tools 16",
  sidValue: "s-n76wt2bkqdmh78x",
  testsFrom: [
    "after an edit, the hook runs the checks over the working tree and reports to the agent what they refuse",
    "before an edit made with apply_patch, the hook refuses the whole patch where sheriff guard refuses one of its files",
    "each of the agent's hooks for Codex holds only the lookup of the plugin in Codex's cache and a call to its script, and does nothing where it finds no plugin",
    "the scripts the agent's hooks for Codex call do nothing in a repository holding no sheriff.config.json",
    "judges each file a patch adds, updates, deletes or moves as an edit made with the file tools",
    "reads the paths of a patch from the directory the session works in",
    "refuses a patch it cannot read or apply",
    "refuses the whole patch where it refuses one of its files",
  ],
  proposal: {
    title: "The agent's hooks for Codex CLI",
    ruTitle: "Хуки агента для Codex CLI",
    parts: [
      P("The agent's hooks for Codex are in the project's `.codex/hooks.json`, where `sheriff init --agent codex` writes them (§s-7unxytshhc4md54). They are the following:",
        "Хуки агента для Codex находятся в файле проекта `.codex/hooks.json`, куда их записывает `sheriff init --agent codex` (§s-7unxytshhc4md54). Это следующие хуки:",
        "Было: «The agent's hooks for Codex stand in the project's `.codex/hooks.json`…». Без изменений по смыслу; «stand» вы для узлов не используете."),
      L("one when a session starts;",
        "хук при начале сессии;",
        "Без изменений."),
      L("one before an edit made with `apply_patch`;",
        "хук перед правкой, сделанной инструментом `apply_patch`;",
        "Без изменений."),
      L("one after such an edit or a shell command.",
        "хук после такой правки или команды оболочки.",
        "Без изменений."),
      P("Each hook holds only the lookup of the plugin for Codex CLI in Codex's cache (§s-4mej6ccn7xu3d3p) and a call to the plugin's script for that hook: `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`. Where a hook finds no plugin, it does nothing.",
        "Каждый хук содержит только поиск плагина для Codex CLI в кэше Codex (§s-4mej6ccn7xu3d3p) и вызов скрипта плагина для этого хука: `hooks/session-start.sh`, `hooks/guard.sh` или `hooks/after-edit.sh`. Если хук не находит плагина, он ничего не делает.",
        "Без изменений."),
      P("The scripts do what the agent's hooks do (§s-477gtdrkw34dzxw). In a repository without `sheriff.config.json` at its root, they do nothing.",
        "Скрипты делают то, что делают хуки агента (§s-477gtdrkw34dzxw). В репозитории, в корне которого нет `sheriff.config.json`, они ничего не делают.",
        "Было: «In a repository holding no `sheriff.config.json`, they do nothing.» Без изменений по смыслу; уточнено, что файл ищется в корне, как в узле о плагине для Claude Code."),
      P("Codex blocks a tool's call only on an answer that a hook writes as JSON to its standard output. So the scripts answer Codex as follows, and exit with code 0:",
        "Codex блокирует вызов инструмента только по ответу, который хук пишет в виде JSON в свой стандартный вывод. Поэтому скрипты отвечают Codex так и завершаются с кодом 0:",
        "Новое в тексте: ваше решение от 2026-11-02 о Codex CLI — в Codex код завершения 2 у хука ничего не блокирует, поэтому скрипты отвечают Codex в JSON. Так делают guard.sh и after-edit.sh."),
      L("before an edit that `sheriff guard` refuses: `{\"hookSpecificOutput\": {\"hookEventName\": \"PreToolUse\", \"permissionDecision\": \"deny\", \"permissionDecisionReason\": <the refusal>}}`;",
        "перед правкой, которую отвергает `sheriff guard`: `{\"hookSpecificOutput\": {\"hookEventName\": \"PreToolUse\", \"permissionDecision\": \"deny\", \"permissionDecisionReason\": <the refusal>}}`;",
        NEW),
      L("after an edit or a shell command for which the hook has something to hand the agent (§s-hcmpjmwtgfwzncu): `{\"decision\": \"block\", \"reason\": <what it hands the agent>}`.",
        "после правки или команды оболочки, если хуку есть что передать агенту (§s-hcmpjmwtgfwzncu): `{\"decision\": \"block\", \"reason\": <what it hands the agent>}`.",
        NEW),
      P("A script knows that it serves Codex from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u).",
        "Что он работает для Codex, скрипт узнаёт из файла `agent` в папке инструментов SpecSheriff плагина (§s-xr5xxa9cxf2mq5u).",
        "Новое в тексте: так делают guard.sh и after-edit.sh; файл `agent` определяет согласованный узел «Which runner runs the reviewer»."),
      P("Before an edit, `sheriff guard` does the following:",
        "Перед правкой `sheriff guard` делает следующее:",
        "Без изменений."),
      L("it reads from the patch each file that the patch adds, updates, deletes or moves;",
        "читает из патча каждый файл, который патч добавляет, обновляет, удаляет или перемещает;",
        "Без изменений по смыслу."),
      L("it applies the patch to those files in memory, taking a moved file as deleted at its old path and added at its new one;",
        "применяет патч к этим файлам в памяти, считая перемещённый файл удалённым по старому пути и добавленным по новому;",
        "Без изменений по смыслу."),
      L("it judges each of those files as an edit made with the file-editing tools (§s-st6td4mua9uqt9z).",
        "оценивает каждый из этих файлов как правку, сделанную инструментами редактирования файлов (§s-st6td4mua9uqt9z).",
        "Без изменений по смыслу."),
      P("`sheriff guard` refuses the whole patch in either of the following cases:",
        "`sheriff guard` отвергает весь патч в любом из следующих случаев:",
        "Было: «It refuses the whole patch where:». Без изменений по смыслу."),
      L("it refuses one of the patch's files;",
        "он отвергает один из файлов патча;",
        "Без изменений."),
      L("it cannot read or apply the patch.",
        "он не может прочитать или применить патч.",
        "Без изменений."),
    ],
    reason: "Codex takes hooks only from the project, where its user trusts each hook as it is written, so the project's hooks only find and call the scripts that each release of the plugin brings. The scripts answer Codex in the form that Codex reads, so that its agent is held to the same checks as an agent in Claude Code.",
    ruReason: "Codex берёт хуки только из проекта, где пользователь доверяет каждому хуку в том виде, в каком он записан, поэтому хуки проекта лишь находят и вызывают скрипты, которые приносит каждый выпуск плагина. Скрипты отвечают Codex в том виде, который Codex читает, чтобы его агент подчинялся тем же проверкам, что и агент в Claude Code.",
    reasonChange: "Было: четыре абзаца, которые по порядку объясняли абзацы текста (почему хуки в проекте, почему в них только поиск и вызов, почему хук без плагина ничего не делает, почему патч отвергается целиком). Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2), и о новом абзаце про ответ в JSON.",
    examples: [
      X("A patch adds `src/new.ts` and changes `specs/_approvals.jsonl`. `sheriff guard` refuses the patch, and `hooks/guard.sh` writes the denial as JSON with the refusal in `permissionDecisionReason`, so Codex applies no part of the patch. The most likely mistake is to exit with code 2, as for Claude Code, which Codex does not treat as a refusal, so that the patch is applied.",
        "Патч добавляет `src/new.ts` и меняет `specs/_approvals.jsonl`. `sheriff guard` отвергает патч, и `hooks/guard.sh` пишет запрет в виде JSON с отказом в `permissionDecisionReason`, поэтому Codex не применяет ни одной части патча. Самая вероятная ошибка — завершиться с кодом 2, как для Claude Code: Codex не считает это отказом, и патч применяется."),
    ],
    refs: [
      R("implements", "s-83ev4wwesbwnhnp"),
      R("implements", "s-epaw9sgyaajzn8g"),
      R("cites", "s-7unxytshhc4md54"),
      R("cites", "s-4mej6ccn7xu3d3p"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", SID.afterEdit),
      R("cites", "s-xr5xxa9cxf2mq5u"),
      R("cites", "s-st6td4mua9uqt9z"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): it stood for when the checks run, which rule 10.2 (s-epaw9sgyaajzn8g) now states (question X2).",
    ],
    date: DATE,
  },
  stage3: "None in the code: guard.sh and after-edit.sh already answer Codex in JSON. A test that each script answers in JSON and exits with code 0 where it refuses is written first and carries this sid, if codex.test.ts does not already check the JSON.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 60: "A git hook runs the SpecSheriff tools a plugin keeps on the machine" (s-4mej6ccn7xu3d3p), tools 12.
// ---------------------------------------------------------------------------------------------------------------
add("s-4mej6ccn7xu3d3p", {
  location: "tools 12",
  sidValue: "s-4mej6ccn7xu3d3p",
  testsFrom: [
    "the session start of the agent's hooks for Codex names each git hook an earlier release of sheriff init wrote",
    "a git hook runs the tools of the higher release where it finds both plugins', those of the plugin for Claude Code where the two are equal, and either where it finds one",
    "a git hook that finds the tools of neither plugin lets the commit through, keeps the git hooks on, and says at every commit that no check of SpecSheriff ran",
    "a hook's script refuses where Node is missing or older than the tools need, naming the version they need",
    "each git hook sheriff init writes holds the lookup of the tools of both plugins and a call to the script for that hook, and nothing else",
    "the session start names each git hook an earlier release of sheriff init wrote, saying that sheriff init replaces it",
    "when a session starts, the plugin copies its tools into its data directory where the copy there is of another release or missing",
  ],
  proposal: {
    title: "A git hook runs the SpecSheriff tools that a plugin keeps on the machine",
    ruTitle: "Git-хук запускает инструменты SpecSheriff, которые плагин хранит на машине",
    titleChange: "Было: «A git hook runs the SpecSheriff tools a plugin keeps on the machine». Добавлено «that», как пишет careful native writer; смысл тот же.",
    parts: [
      P("When a session starts, the plugin for Claude Code (§s-zh2vcr3xjumppg5) copies the SpecSheriff tools that it holds into its data directory, where the copy there is of another release or missing. The data directory is `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` is `CLAUDE_CODE_PLUGIN_CACHE_DIR` where that variable is set, and `~/.claude/plugins` otherwise.",
        "Когда сессия начинается, плагин для Claude Code (§s-zh2vcr3xjumppg5) копирует инструменты SpecSheriff, которые в нём есть, в свою папку данных, если копия там другого выпуска или её нет. Папка данных — `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` — это `CLAUDE_CODE_PLUGIN_CACHE_DIR`, если эта переменная задана, а иначе `~/.claude/plugins`.",
        "Было: «…copies the SpecSheriff tools it carries into its data directory. It copies them where the copy there is of another release or missing.» Без изменений по смыслу; «carries» вы для узлов не используете."),
      P("The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps no copy. Its SpecSheriff tools are in its directory in Codex's cache, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` is `CODEX_HOME` where that variable is set, and `~/.codex` otherwise.",
        "Плагин для Codex CLI (§s-2pdy9gw2jrjvfb4) копии не хранит. Его инструменты SpecSheriff находятся в его папке в кэше Codex, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` — это `CODEX_HOME`, если эта переменная задана, а иначе `~/.codex`.",
        "Было: «Its tools stand in its directory in Codex's cache…». Без изменений по смыслу."),
      P("`~` is the user's home directory, which on Windows is the user's profile directory.",
        "`~` — домашний каталог пользователя, в Windows — каталог его профиля.",
        "Без изменений по смыслу."),
      P("Each git hook that `sheriff init` writes holds the following:",
        "Каждый git-хук, который записывает `sheriff init`, содержит следующее:",
        "Без изменений."),
      L("the lookup of those SpecSheriff tools;",
        "поиск этих инструментов SpecSheriff;",
        "Без изменений."),
      L("a call to the script for that hook in their `hooks/`;",
        "вызов скрипта для этого хука в их папке `hooks/`;",
        "Без изменений."),
      L("the run of the project's own tools for that hook (§s-n4m5zvh96yb299p) and a notice, for the case in which the SpecSheriff tools cannot run.",
        "запуск собственных инструментов проекта для этого хука (§s-n4m5zvh96yb299p) и сообщение — на случай, когда инструменты SpecSheriff не могут выполняться.",
        "Было два пункта: «what it does where it finds none;» и «the run of the project's own tools (§s-n4m5zvh96yb299p).» Теперь собственные инструменты проекта запускает скрипт хука в порядке правила 10.12, а сам git-хук запускает их, только если инструменты SpecSheriff выполняться не могут."),
      P("Where the hook finds the SpecSheriff tools of both plugins, it takes those whose `release` file opens with the higher version, compared as semantic versions. Where their versions are equal, it takes either.",
        "Если хук находит инструменты SpecSheriff обоих плагинов, он берёт те, у которых файл `release` начинается с более высокой версии при сравнении как семантических версий. Если версии равны, он берёт любые.",
        "Без изменений по смыслу."),
      P("The script for the hook runs what the hook is to run (§s-477gtdrkw34dzxw), including the project's own tools for that hook.",
        "Скрипт хука выполняет то, что должен выполнить хук (§s-477gtdrkw34dzxw), в том числе собственные инструменты проекта для этого хука.",
        "Было: «The hook's script runs what the hook is to run (§s-477gtdrkw34dzxw).» Добавлено, что скрипт запускает и собственные инструменты проекта: по правилу 10.12 они идут между шагами инструментов SpecSheriff."),
      P("The SpecSheriff tools cannot run where the hook finds the tools of neither plugin, or where Node.js is missing or older than the SpecSheriff tools need. In either case, the hook runs the project's own tools for that hook, and lets the commit or the push through unless one of them fails (§s-pcnyfp7gev7syax). The pre-commit and pre-push hooks then say that no check of SpecSheriff ran, and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than the version that they name.",
        "Инструменты SpecSheriff не могут выполняться, если хук не находит инструментов ни одного плагина или если Node.js нет либо он старее, чем нужно инструментам SpecSheriff. В любом из этих случаев хук запускает собственные инструменты проекта для этого хука и пропускает коммит или push, если ни один из них не завершился неудачей (§s-pcnyfp7gev7syax). Тогда хуки pre-commit и pre-push сообщают, что ни одна проверка SpecSheriff не выполнялась, и почему: на машине нет инструментов SpecSheriff ни одного плагина или Node.js нет либо он старее версии, которую они называют.",
        "Было: «It refuses where Node.js is missing or older than the tools need, naming the version they need.» и «Where the hook finds the tools of neither plugin, it runs the project's own tools…». Правило 10.12 говорит: «Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails», поэтому отсутствие или старая версия Node.js теперь обрабатываются так же, как отсутствие инструментов. Вопрос, имело ли в виду правило 10.12 и этот случай, записан для базы."),
      P("The script run when a session starts names each of the following hooks that holds what an earlier release of `sheriff init` wrote:",
        "Скрипт, который выполняется при начале сессии, называет каждый из следующих хуков, который содержит то, что записал более ранний выпуск `sheriff init`:",
        "Без изменений."),
      L("each git hook in `.githooks/`;",
        "каждый git-хук в `.githooks/`;",
        "Без изменений."),
      L("each of the agent's hooks for Codex in `.codex/hooks.json`.",
        "каждый хук агента для Codex в `.codex/hooks.json`.",
        "Без изменений."),
      P("For each such hook, it says that `sheriff init` replaces it (§s-7unxytshhc4md54).",
        "Для каждого такого хука он сообщает, что `sheriff init` его заменяет (§s-7unxytshhc4md54).",
        "Без изменений."),
    ],
    reason: "A git hook written once into a project finds the SpecSheriff tools wherever, and from whichever plugin, a machine keeps them, so that the checks follow each release of the plugin without any change to the project. Where those tools cannot run, the project's own tools keep guarding the commit and the push, as the rule on the order of tools and checks requires (§s-pcnyfp7gev7syax).",
    ruReason: "Git-хук, однажды записанный в проект, находит инструменты SpecSheriff, где бы и из какого бы плагина машина их ни хранила, чтобы проверки следовали за каждым выпуском плагина без изменений в проекте. Если эти инструменты выполняться не могут, коммит и push по-прежнему охраняют собственные инструменты проекта, как требует правило о порядке инструментов и проверок (§s-pcnyfp7gev7syax).",
    reasonChange: "Было: шесть абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Довод «Where the tools are found but cannot run, the plugin is there and its user expects the checks to hold, so the script refuses» убран вместе с отказом, которому он служил.",
    examples: [
      X("A user has both plugins: the plugin for Claude Code at release 0.7.0 and the plugin for Codex CLI at release 0.6.0. Each git hook runs the SpecSheriff tools of 0.7.0 from the data directory of the plugin for Claude Code, also when the commit is made from Codex. The most likely mistake is to take the tools of the agent that is running, so that a commit made from Codex is checked by the earlier release.",
        "У пользователя оба плагина: плагин для Claude Code выпуска 0.7.0 и плагин для Codex CLI выпуска 0.6.0. Каждый git-хук запускает инструменты SpecSheriff выпуска 0.7.0 из папки данных плагина для Claude Code, и тогда, когда коммит сделан из Codex. Самая вероятная ошибка — брать инструменты того агента, который работает: тогда коммит из Codex проверяет более ранний выпуск."),
    ],
    refs: [
      R("implements", "s-pcnyfp7gev7syax"),
      R("implements", "s-bsya3febm6u64ab"),
      R("cites", "s-zh2vcr3xjumppg5"),
      R("cites", "s-2pdy9gw2jrjvfb4"),
      R("cites", "s-n4m5zvh96yb299p"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-7unxytshhc4md54"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements rule 10.12 (s-pcnyfp7gev7syax) and rule 2.5 (s-bsya3febm6u64ab), under which a project uses the SpecSheriff guidelines and the tools as the plugin holds them (question X2).",
      "The refusal where Node.js is missing or too old: rule 10.12 lets the commit or the push through wherever the SpecSheriff tools cannot run.",
    ],
    date: DATE,
  },
  stage3: "skills/tools/hooks/sheriff.sh refuses where Node.js is missing or too old; it is to run the project's own tools of the hook in the byte order of their names, let the commit or the push through unless one fails, and say why no check of SpecSheriff ran. The git hook that sheriff init writes (assets/githook) is to run the project's own tools only where it finds no tools, and the scripts in skills/tools/hooks/ are to run them in the order of s-npnmwyt6s3gypwe and s-n4m5zvh96yb299p; the present text of the git hook joins assets/earlier/ so that sheriff init replaces it. The test “a hook's script refuses where Node is missing or older…” is rewritten first for the new behaviour; “each git hook sheriff init writes holds the lookup … and nothing else” is rewritten for the run of the project's tools where no tools are found.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 61: "The project's own tools in a git hook" (s-n4m5zvh96yb299p), tools 13.
// ---------------------------------------------------------------------------------------------------------------
add("s-n4m5zvh96yb299p", {
  location: "tools 13",
  sidValue: "s-n4m5zvh96yb299p",
  testsFrom: [
    "runs the project's own tools in git's own environment, the locale they are listed in held to the listing",
    "runs the project's own tools of a hook after the checks, names a file it does not run, and fails where one fails or changes the staged files",
  ],
  proposal: {
    title: "The project's own tools in a git hook",
    ruTitle: "Собственные инструменты проекта в git-хуке",
    parts: [
      P("A project's own tools for a git hook are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. Each git hook that `sheriff init` writes runs only those files, and names each other file there.",
        "Собственные инструменты проекта для git-хука — это файлы непосредственно в `.githooks/<hook>.d/`, первая строка которых называет их интерпретатор. Каждый git-хук, который записывает `sheriff init`, запускает только эти файлы и называет каждый другой файл в этой папке.",
        "Было: «Each git hook `sheriff init` writes runs the project's own tools for it after the checks of the SpecSheriff tools (§s-pcnyfp7gev7syax). They are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. They run in the byte order of their names. The hook names each other file there and does not run it.» Когда они выполняются, теперь сказано ниже по правилу 10.12."),
      P("A first line names an interpreter where it opens with `#!`, followed by a path and at most one argument. A carriage return that ends the line is left out.",
        "Первая строка называет интерпретатор, если она начинается с `#!`, за которым идут путь и не больше одного аргумента. Возврат каретки в конце строки не учитывается.",
        "Без изменений по смыслу."),
      P("Where the hook runs the SpecSheriff tools (§s-4mej6ccn7xu3d3p), it runs the project's own tools at the points that the order of that hook sets (§s-477gtdrkw34dzxw, §s-pcnyfp7gev7syax):",
        "Если хук запускает инструменты SpecSheriff (§s-4mej6ccn7xu3d3p), он запускает собственные инструменты проекта в тех местах, которые задаёт порядок этого хука (§s-477gtdrkw34dzxw, §s-pcnyfp7gev7syax):",
        "Было: собственные инструменты проекта выполнялись после проверок SpecSheriff, что бы те ни нашли. Правило 10.12 ставит инструменты, переписывающие файлы, первыми, а остальные инструменты проекта — до проверок SpecSheriff guidelines."),
      L("first, those that the project's own guidelines list as tools that rewrite files (§s-t9j29hppag2nren), in the order of that list;",
        "сначала — инструменты, которые собственные guidelines проекта перечисляют как инструменты, переписывающие файлы (§s-t9j29hppag2nren), в порядке этого перечня;",
        "Новое: первый шаг правила 10.12; перечень читает согласованный узел «What the SpecSheriff tools read in the project's own guidelines», где каждый элемент — путь к инструменту относительно `.githooks/`."),
      L("later, the other tools, in the byte order of their names.",
        "позже — остальные инструменты в порядке байтов их имён.",
        "Было: «They run in the byte order of their names.» Теперь это относится к остальным инструментам, второму шагу правила 10.12."),
      P("The hook names each path in that list for which it runs nothing.",
        "Хук называет каждый путь из этого перечня, для которого он ничего не запускает.",
        "Новое: путь из перечня может не называть файл с интерпретатором в первой строке; хук сообщает об этом, как сообщает о файле, который не запускает."),
      P("Where the SpecSheriff tools cannot run (§s-4mej6ccn7xu3d3p), the hook runs all of the project's own tools for that hook in the byte order of their names.",
        "Если инструменты SpecSheriff выполняться не могут (§s-4mej6ccn7xu3d3p), хук запускает все собственные инструменты проекта для этого хука в порядке байтов их имён.",
        "Новое в тексте: ваше решение от 2026-11-21 об узле «What the SpecSheriff tools read in the project's own guidelines» — без инструментов SpecSheriff перечень в `project.json` прочитать нельзя."),
      P("Each of the project's own tools does the following:",
        "Каждый собственный инструмент проекта:",
        "Было: «Each of the project's tools:». Без изменений по смыслу."),
      L("it runs from the root of the working tree, by the interpreter that its first line names, in git's own environment, so that it reads the working tree and git's index;",
        "запускается из корня рабочего дерева интерпретатором, который назван в его первой строке, в собственном окружении git, поэтому он читает рабочее дерево и индекс git;",
        "Без изменений по смыслу."),
      L("it is handed the arguments that git hands the hook, and a copy of the standard input that git hands it.",
        "получает аргументы, которые git передаёт хуку, и копию стандартного ввода, который git ему передаёт.",
        "Без изменений по смыслу."),
      P("Each of them runs regardless of what the others find. The hook fails where one of them ends with an exit code other than zero.",
        "Каждый из них выполняется независимо от того, что нашли остальные. Хук завершается неудачей, если один из них завершился с кодом, отличным от нуля.",
        "Было: «Each of them runs, whatever the others find. The hook fails where: the checks refuse; one of the project's tools ends with an exit code other than zero; one of the project's tools changes the staged files or the commit's message.» Отказ проверок SpecSheriff описывают узлы о хуках; изменения файлов — абзац ниже."),
      P("Where the hook runs the SpecSheriff tools, it also refuses the commit or the push where one of the other tools does any of the following (§s-yn5tdx2bp4f5rq7):",
        "Если хук запускает инструменты SpecSheriff, он также отвергает коммит или push, если один из остальных инструментов делает что-либо из следующего (§s-yn5tdx2bp4f5rq7):",
        "Было: хук отвергал инструмент, который менял файлы в стейджинге или сообщение коммита. Теперь это относится только к остальным инструментам: инструменты первого шага правила 10.12 файлы переписывают. Добавлены файлы рабочего дерева, как требует второй шаг правила 10.12 («each of which leaves the files as they were, except for those that git ignores»), и новая строка 10.1.37b. Без инструментов SpecSheriff эта проверка не выполняется: по правилу 10.12 коммит тогда проходит, если ни один инструмент не завершился неудачей."),
      L("adds, changes or removes a file of the working tree, other than a file that git ignores;",
        "добавляет, меняет или удаляет файл рабочего дерева, кроме файла, который git игнорирует;",
        NEW),
      L("changes what is staged;",
        "меняет то, что находится в стейджинге;",
        "Было в абзаце о том, когда хук завершается неудачей: «one of the project's tools changes the staged files». Без изменений по смыслу."),
      L("changes the commit message.",
        "меняет сообщение коммита.",
        "Было: «…or the commit's message.» Без изменений по смыслу."),
      P("The hook makes this check regardless of whether the specification is approved or a draft.",
        "Эту проверку хук выполняет независимо от того, одобрена спецификация или является черновиком.",
        "Новое в тексте: строка 10.1.37b не делает исключения для черновика."),
      P("The hook names each tool that makes it fail, and each file that such a tool added, changed or removed.",
        "Хук называет каждый инструмент, из-за которого он завершился неудачей, и каждый файл, который такой инструмент добавил, изменил или удалил.",
        "Было: «The hook names each of the project's tools that makes it fail.» Добавлены файлы, как называет отказ строки 10.1.37a."),
      P("These files are among the repository's own tools (§s-hheus6f395ynqvc).",
        "Эти файлы относятся к собственным инструментам репозитория (§s-hheus6f395ynqvc).",
        "Было: «These files are among the repository's own tools, not the system's code (§s-hheus6f395ynqvc).» Без изменений по смыслу: правило 9.1 уже говорит, что собственные инструменты репозитория не являются кодом системы; сказано без отрицания."),
    ],
    reason: "A project keeps its own tools for a hook in a folder that the hook reads without the SpecSheriff tools, so that those tools run on every machine, whatever the SpecSheriff tools can do there (§s-pcnyfp7gev7syax). A tool is recognised by its first line rather than by the executable bit, since a file committed from a system without that bit loses it.",
    ruReason: "Проект хранит собственные инструменты для хука в папке, которую хук читает без инструментов SpecSheriff, чтобы эти инструменты выполнялись на каждой машине, что бы там ни могли инструменты SpecSheriff (§s-pcnyfp7gev7syax). Инструмент распознаётся по первой строке, а не по биту исполнения, потому что файл, закоммиченный из системы без этого бита, его теряет.",
    reasonChange: "Было: четыре абзаца, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2); довод о первой строке оставлен, остальное ушло.",
    examples: [
      X("`.githooks/pre-commit.d/` holds `scan` and `tidy`, and the project's own guidelines list `pre-commit.d/tidy` as a tool that rewrites files. At a commit, `tidy` runs first and stages the files that it rewrites. `scan` runs after `sheriff types`, and the hook refuses the commit where `scan` changes any file. The most likely mistake is to run both in the byte order of their names, so that `scan` reads the files before `tidy` has rewritten them.",
        "В `.githooks/pre-commit.d/` лежат `scan` и `tidy`, и собственные guidelines проекта перечисляют `pre-commit.d/tidy` как инструмент, переписывающий файлы. При коммите `tidy` выполняется первым и добавляет в стейджинг файлы, которые переписывает. `scan` выполняется после `sheriff types`, и хук отвергает коммит, если `scan` меняет какой-либо файл. Самая вероятная ошибка — запускать оба в порядке байтов их имён: тогда `scan` читает файлы до того, как `tidy` их переписал."),
    ],
    refs: [
      R("implements", "s-pcnyfp7gev7syax"),
      R("implements", SID.row37b),
      R("cites", "s-4mej6ccn7xu3d3p"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-t9j29hppag2nren"),
      R("cites", "s-hheus6f395ynqvc"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "The run of the project's own tools moves from the git hook that sheriff init writes into the scripts in skills/tools/hooks/ (s-4mej6ccn7xu3d3p): the tools that project.json lists as rewriting files run first, in the order of the list, and may change what is staged; the others run where s-npnmwyt6s3gypwe and s-477gtdrkw34dzxw say, and the hook refuses where one of them changes a file of the working tree that git does not ignore, what is staged or the message, naming the tool and each file. A listed path for which nothing runs is named. Where the SpecSheriff tools cannot run, all of them run in byte order, and only their failure refuses. The test “runs the project's own tools of a hook after the checks…” is rewritten first for this order; tests for a listed tool, for a changed file of the working tree and for a listed path with no tool are written first and carry this sid.",
});

// The row that the agreed row 10.1.37a promised to propose with "The hooks".
add("proposal:row-10-1-37b", {
  question: "None: the row that the agreed row 10.1.37a, in its change field, said would be proposed together with “The hooks”, for the refusal with which a git hook refuses a commit or a push where the project's other own tools change files (rule 10.12, second step)",
  location: "spec 10.1.37b (new row of the main table of checks, after row 10.1.37a)",
  sidValue: SID.row37b,
  kind: "cell",
  cost: {
    en: "refused, naming the tool and each file that it added, changed or removed",
    ru: "отвергается с указанием инструмента и каждого файла, который он добавил, изменил или удалил",
  },
  change: "Новая строка основной таблицы проверок после строки 10.1.37a. Второй шаг правила 10.12 требует, чтобы собственные инструменты проекта, кроме инструментов первого шага, оставляли файлы такими, какими они были, кроме тех, которые git игнорирует. Строка 10.1.37a проверяет это только для собственных проверок проекта, которые запускает `sheriff validate`, а в её поле изменений сказано, что строку для остальных инструментов предложат вместе с узлом «The hooks»; таблица говорит о себе, что содержит полный перечень проверок. Новую строку реализует узел описания инструментов «The project's own tools in a git hook» (s-n4m5zvh96yb299p). Строка включает то, что находится в стейджинге, и сообщение коммита, потому что инструмент проекта работает в рабочем дереве с индексом git и при хуке commit-msg получает файл сообщения.",
  proposal: {
    title: null,
    ruTitle: null,
    parts: [
      P("A project's own tool that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax), other than a check that a project's own guidelines add (§s-2fau85dfyyeq66m), leaves the working tree, what is staged and the commit message as they were, except for the files that git ignores",
        "Собственный инструмент проекта, который выполняется при коммите или push после инструментов, переписывающих файлы (§s-pcnyfp7gev7syax), кроме проверки, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), оставляет рабочее дерево, то, что находится в стейджинге, и сообщение коммита такими, какими они были, кроме файлов, которые git игнорирует",
        "Новая строка; без точки в конце, как у других строк таблицы. Почему строка нужна, сказано выше."),
    ],
    reason: null,
    ruReason: null,
    refs: [
      R("checks", "s-pcnyfp7gev7syax"),
      R("cites", "s-2fau85dfyyeq66m"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "moved/impl.json gains the row s-yn5tdx2bp4f5rq7 → s-n4m5zvh96yb299p; table-10-1.json and the page of table 10.1 gain the row after 10.1.37a once the owner agrees to it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Items 62 and 63: the two plugins (s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4), tools 14 and 15, and a new node on the
// skills that both hold, which takes the paragraphs that the two nodes repeated.
// ---------------------------------------------------------------------------------------------------------------
add("s-zh2vcr3xjumppg5", {
  location: "tools 14",
  sidValue: "s-zh2vcr3xjumppg5",
  testsFrom: [
    "in a repository holding no sheriff.config.json the plugin's hooks do nothing but keep its copy of the tools",
    "the marketplace lists the plugin by the relative path of its directory",
    "the plugin carries the skills, the SpecSheriff guidelines and their schema, and the SpecSheriff tools",
    "the plugin declares each setting of the runner claude as an option naming its default and taking no default value",
    "the plugin declares the agent's hooks and the one run when a session starts",
    "the plugin's skills and the agent's hooks run sheriff from the tools the plugin carries, spec-init runs sheriff init, and spec-remove sheriff remove, offering to remove the plugin",
  ],
  proposal: {
    title: "The plugin for Claude Code",
    ruTitle: "Плагин для Claude Code",
    titleChange: "Было: «The plugin for Claude Code carries everything its work needs». Слово «carries» вы для узлов не используете; название называет предмет узла.",
    parts: [
      P("The plugin for Claude Code, `specsheriff`, holds the following:",
        "Плагин для Claude Code, `specsheriff`, содержит следующее:",
        "Было: «The plugin for Claude Code, `specsheriff`, carries:». Без изменений по смыслу."),
      L("the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9);",
        "skills плагинов SpecSheriff (§s-kq6wmdud9c7j2k9);",
        "Было: «the skills `spec`, `spec-review`, `spec-adopt`, `spec-init` and `spec-remove`;». Перечень skills и то, что они делают, теперь в общем узле обоих плагинов: прежде узлы двух плагинов это повторяли."),
      L("the SpecSheriff tools, with the files common to every project at the paths given for them in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u): the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8), with their schemas;",
        "инструменты SpecSheriff вместе с файлами, общими для всех проектов, по путям, которые для них заданы в папке инструментов SpecSheriff (§s-zefk589ykh37b8u): SpecSheriff guidelines, каждое расширение guidelines (§s-mbmnsnxenmavu3z) и описание инструментов (§s-a4rbry4hsu34hy8) с их схемами;",
        "Было: «the SpecSheriff guidelines and their schema;» и «the SpecSheriff tools.» По правилу 1.7.1 расширения поставляются с плагином вместе с инструментами, которые выполняют их правила, а согласованный узел «Where the files are» даёт им пути в папке инструментов."),
      L("the scripts of the agent's hooks (§s-477gtdrkw34dzxw).",
        "скрипты хуков агента (§s-477gtdrkw34dzxw).",
        "Новое в тексте: плагин содержит эти скрипты, и их вызывает он сам и хуки агента для Codex."),
      P("The plugin declares to Claude Code the agent's hooks: the hook run when a session starts, the hook before an edit made with `Write`, `Edit` or `MultiEdit`, and the hook after such an edit or a shell command run with `Bash` or `PowerShell` (§s-477gtdrkw34dzxw).",
        "Плагин объявляет Claude Code хуки агента: хук при начале сессии, хук перед правкой, сделанной инструментом `Write`, `Edit` или `MultiEdit`, и хук после такой правки или команды оболочки, выполненной инструментом `Bash` или `PowerShell` (§s-477gtdrkw34dzxw).",
        "Было: «It declares its hooks to Claude Code: the agent's hooks (§s-477gtdrkw34dzxw) and the one run when a session starts (§s-4mej6ccn7xu3d3p).» Без изменений по смыслу; названы инструменты, для которых объявлены хуки, как в hooks.json."),
      P("The plugin declares each setting of the runner `claude` (§s-tnz9zgqx8c629a7) as one of its options. Claude Code asks the user for those options when it enables the plugin. Each option names its default and declares no default value, so that a value that Claude Code holds for it is one that the user gave.",
        "Плагин объявляет каждую настройку runner `claude` (§s-tnz9zgqx8c629a7) как свой параметр. Claude Code спрашивает пользователя об этих параметрах, когда включает плагин. Каждый параметр называет своё значение по умолчанию, но не объявляет его, чтобы значение, которое Claude Code для него хранит, всегда было тем, что дал пользователь.",
        "Было: «It declares each setting of the runner `claude` (§s-xr5xxa9cxf2mq5u) as one of its options… takes no default value…». Без изменений по смыслу. Ссылка ведёт на узел «The settings of each runner», который определяет эти настройки (заметки группы 2, п. 7)."),
      P("In a repository without `sheriff.config.json` at its root, the plugin's hooks do only the following:",
        "В репозитории, в корне которого нет `sheriff.config.json`, хуки плагина делают только следующее:",
        "Было: «In a repository holding no `sheriff.config.json` at its root, the plugin's hooks do nothing but:». Без изменений по смыслу; сказано через «only», как вы просите для перечня единственных случаев."),
      L("keep its copy of the SpecSheriff tools (§s-4mej6ccn7xu3d3p);",
        "поддерживают его копию инструментов SpecSheriff (§s-4mej6ccn7xu3d3p);",
        "Без изменений по смыслу."),
      L("write the settings that the user gave as its options (§s-p29yawkkkgk7kxb).",
        "записывают настройки, которые пользователь задал как его параметры (§s-p29yawkkkgk7kxb).",
        "Было: «write the settings the user gave as its options (§s-477gtdrkw34dzxw).» Ссылка ведёт на новый узел, который это описывает."),
      P("The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory. A project declares both in `.claude/settings.json` (§s-7unxytshhc4md54):",
        "Marketplace `specsheriff-marketplace` перечисляет плагин по относительному пути его папки. Проект объявляет оба в `.claude/settings.json` (§s-7unxytshhc4md54):",
        "Было без ссылки; добавлена ссылка на узел о `sheriff init`, который записывает это объявление."),
      L("the marketplace under `extraKnownMarketplaces`, whose source is the branch `release` of the repository where the SpecSheriff guidelines are written, with `autoUpdate` on;",
        "marketplace — под `extraKnownMarketplaces`, источник которого — ветка `release` репозитория, где пишутся SpecSheriff guidelines, с включённым `autoUpdate`;",
        "Без изменений по смыслу."),
      L("the plugin under `enabledPlugins`.",
        "плагин — под `enabledPlugins`.",
        "Без изменений."),
      P("Each machine runs the release that its copy of the plugin holds, until Claude Code updates that copy.",
        "Каждая машина выполняет тот выпуск, который содержит её копия плагина, пока Claude Code не обновит эту копию.",
        "Без изменений по смыслу."),
      P("The plugin's skills and the agent's hooks run `sheriff` from the SpecSheriff tools in the plugin, as `node \"${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js\"`.",
        "Skills плагина и хуки агента запускают `sheriff` из инструментов SpecSheriff в плагине как `node \"${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js\"`.",
        "Было: «…from the SpecSheriff tools the plugin carries…». Без изменений по смыслу."),
    ],
    reason: "An agent takes up a skill only where it is installed, and Claude Code installs, updates and enables a plugin that a project declares. So the plugin brings the skills, the SpecSheriff guidelines with their extensions and the SpecSheriff tools of one release to the agent of every clone together, and the project keeps only the calls to them.",
    ruReason: "Агент берёт skill, только если тот установлен, а Claude Code сам устанавливает, обновляет и включает плагин, который объявляет проект. Поэтому плагин приносит агенту каждого клона skills, SpecSheriff guidelines с их расширениями и инструменты SpecSheriff одного выпуска вместе, а проект хранит только их вызовы.",
    reasonChange: "Было: восемь абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2); доводы о skills, параметрах и `spec-init` перешли в общий узел о skills.",
    examples: [
      X("A project chooses the RecordType extension. On every machine where Claude Code has updated the plugin to a release that delivers that extension, the SpecSheriff tools find the extension at `guidelines/extensions/recordtype.json` in their own folder. The most likely mistake is to keep a copy of the extension in the project, which `sheriff validate` refuses (§s-6bmnsbskg6en4nf).",
        "Проект выбирает расширение RecordType. На каждой машине, где Claude Code обновил копию плагина до выпуска, который это расширение поставляет, инструменты SpecSheriff находят его в `guidelines/extensions/recordtype.json` в своей папке. Самая вероятная ошибка — хранить копию расширения в проекте: `sheriff validate` её отвергает (§s-6bmnsbskg6en4nf)."),
    ],
    refs: [
      R("implements", "s-bsya3febm6u64ab"),
      R("implements", "s-mbmnsnxenmavu3z"),
      R("implements", "s-83ev4wwesbwnhnp"),
      R("cites", SID.skills),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-a4rbry4hsu34hy8"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-tnz9zgqx8c629a7"),
      R("cites", "s-4mej6ccn7xu3d3p"),
      R("cites", SID.reviewerSettings),
      R("cites", "s-7unxytshhc4md54"),
      R("cites", "s-6bmnsbskg6en4nf"),
      // Cited by the node's decisions, which stay on it.
      R("cites", "s-xr5xxa9cxf2mq5u"),
    ],
    removed: [
      "The paragraphs on `spec-init`, `spec-remove` and the model and the reasoning effort of the skills: the new node on the skills of the SpecSheriff plugins (s-kq6wmdud9c7j2k9) holds them for both plugins.",
    ],
    date: DATE,
  },
  stage3: "copy-assets.mjs copies into the plugin's tools/guidelines/ only spec.json, tools.json and three schemas; it is to copy each extension of the guidelines to guidelines/extensions/<name>.json, each schema of an extension to guidelines/_schema/extensions/<name>.schema.json, and archive-file.schema.json and config.schema.json, as s-zefk589ykh37b8u lists; plugin.json is unchanged. The test “the plugin carries the skills, the SpecSheriff guidelines and their schema, and the SpecSheriff tools” is rewritten first for the extensions, their schemas and the appendix; the test on spec-init and the skills moves to s-kq6wmdud9c7j2k9.",
});

add("s-2pdy9gw2jrjvfb4", {
  location: "tools 15",
  sidValue: "s-2pdy9gw2jrjvfb4",
  testsFrom: [
    "the guide of the plugin for Codex CLI gives the commands that install it on a machine",
    "the marketplace lists the plugin for Codex CLI by the relative path of its directory, beside the file listing the plugin for Claude Code",
    "the plugin for Codex CLI carries the five skills, the SpecSheriff guidelines and their schema, and the SpecSheriff tools, and declares no hooks",
    "the skills run sheriff from the tools beside them, by the path of their SKILL.md; spec-init runs sheriff init for Codex, and spec-remove sheriff remove, offering to remove the plugin",
  ],
  proposal: {
    title: "The plugin for Codex CLI",
    ruTitle: "Плагин для Codex CLI",
    titleChange: "Было: «The plugin for Codex CLI carries everything its work needs». Слово «carries» вы для узлов не используете; название называет предмет узла.",
    parts: [
      P("The plugin for Codex CLI, `specsheriff`, holds the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9). It holds the SpecSheriff tools, with the files common to every project, and the scripts of the agent's hooks, as the plugin for Claude Code does (§s-zh2vcr3xjumppg5).",
        "Плагин для Codex CLI, `specsheriff`, содержит skills плагинов SpecSheriff (§s-kq6wmdud9c7j2k9). Он содержит инструменты SpecSheriff вместе с файлами, общими для всех проектов, и скрипты хуков агента, как и плагин для Claude Code (§s-zh2vcr3xjumppg5).",
        "Было: «The plugin for Codex CLI, `specsheriff`, carries: the skills …; the SpecSheriff guidelines and their schema; the SpecSheriff tools.» Состав теперь назван ссылкой на узел о плагине для Claude Code, где перечислены и расширения guidelines с их схемами (правило 1.7.1), а перечень skills — в общем узле."),
      P("The plugin declares no hooks to Codex. The agent's hooks for Codex are in the project, and call the scripts that the plugin holds (§s-n76wt2bkqdmh78x).",
        "Плагин не объявляет Codex хуков. Хуки агента для Codex находятся в проекте и вызывают скрипты, которые содержит плагин (§s-n76wt2bkqdmh78x).",
        "Было: «It declares no hooks. The agent's hooks for Codex stand in the project (§s-n76wt2bkqdmh78x).» Без изменений по смыслу; добавлено, что эти хуки вызывают скрипты плагина."),
      P("The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json`. That file is beside the file that lists the plugin for Claude Code.",
        "Marketplace `specsheriff-marketplace` перечисляет плагин по относительному пути его папки в `.agents/plugins/marketplace.json`. Этот файл лежит рядом с файлом, который перечисляет плагин для Claude Code.",
        "Было: «That file stands beside the file listing the plugin for Claude Code (§s-zh2vcr3xjumppg5).» Без изменений по смыслу."),
      P("The practitioner's guide, the plugin's `README.md`, gives the commands that install the plugin on a machine:",
        "Руководство практика, `README.md` плагина, даёт команды, которые устанавливают плагин на машину:",
        "Без изменений."),
      L("`codex plugin marketplace add non4me/SpecSheriff@release`;",
        "`codex plugin marketplace add non4me/SpecSheriff@release`;",
        "Без изменений."),
      L("`codex plugin add specsheriff@specsheriff-marketplace`.",
        "`codex plugin add specsheriff@specsheriff-marketplace`.",
        "Без изменений."),
      P("The plugin's skills run `sheriff` from the SpecSheriff tools in the plugin, as `node <plugin>/tools/dist/cli.js`. A skill takes `<plugin>` from the path of its `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.",
        "Skills плагина запускают `sheriff` из инструментов SpecSheriff в плагине как `node <plugin>/tools/dist/cli.js`. Skill берёт `<plugin>` из пути своего `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.",
        "Было: «…from the SpecSheriff tools the plugin carries…». Без изменений по смыслу."),
    ],
    reason: "An agent takes up a skill only where it is installed, and Codex installs a plugin only for the user who adds it. So each user installs the plugin for Codex CLI, which brings the same release of the skills and the SpecSheriff tools as the plugin for Claude Code, while each agent updates its own plugin.",
    ruReason: "Агент берёт skill, только если тот установлен, а Codex устанавливает плагин только для того пользователя, который его добавляет. Поэтому каждый пользователь устанавливает плагин для Codex CLI, который приносит тот же выпуск skills и инструментов SpecSheriff, что и плагин для Claude Code, а каждый агент обновляет свой плагин сам.",
    reasonChange: "Было: восемь абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2); доводы о skills перешли в общий узел о skills.",
    refs: [
      R("implements", "s-bsya3febm6u64ab"),
      R("implements", "s-mbmnsnxenmavu3z"),
      R("cites", SID.skills),
      R("cites", "s-zh2vcr3xjumppg5"),
      R("cites", "s-n76wt2bkqdmh78x"),
      // Cited by the node's decisions, which stay on it.
      R("cites", "s-xr5xxa9cxf2mq5u"),
    ],
    removed: [
      "The `cites` links to s-7unxytshhc4md54 and s-477gtdrkw34dzxw: the paragraphs on `spec-init` and `spec-remove` that cited them moved to the node on the skills (s-kq6wmdud9c7j2k9).",
      "The paragraphs on `spec-init`, `spec-remove` and the model and the reasoning effort of the skills, and the list of the skills: the node on the skills holds them for both plugins.",
    ],
    date: DATE,
  },
  stage3: "copy-assets.mjs lays out the plugin for Codex CLI as it does the plugin for Claude Code (see s-zh2vcr3xjumppg5): the extensions of the guidelines, their schemas and the appendix go into its tools/guidelines/. The test “the plugin for Codex CLI carries the five skills, …” is rewritten first without the count of skills and for the extensions; the test on spec-init moves to s-kq6wmdud9c7j2k9.",
});

add("new:tools-15-skills", {
  location: "tools 15a (new, after “The plugin for Codex CLI”)",
  from: "s-zh2vcr3xjumppg5",
  sidValue: SID.skills,
  testsFrom: [
    "spec-init offers each setting of the runner the configuration lacks and was not asked for, writing what the user answers and marking it asked; the skills set no model and no effort",
    "spec-init offers each setting of the runner codex the configuration lacks and was not asked for, writing what the user answers and marking it asked",
  ],
  proposal: {
    title: "The skills of the SpecSheriff plugins",
    ruTitle: "Skills плагинов SpecSheriff",
    parts: [
      P("Each SpecSheriff plugin holds the skills `spec`, `spec-review`, `spec-adopt`, `spec-init`, `spec-remove` and `spec-settings`.",
        "Каждый плагин SpecSheriff содержит skills `spec`, `spec-review`, `spec-adopt`, `spec-init`, `spec-remove` и `spec-settings`.",
        "Было в узлах обоих плагинов: «the skills `spec`, `spec-review`, `spec-adopt`, `spec-init` and `spec-remove`». Добавлен skill `spec-settings`: вы решили 2026-11-18, что он будет («да скилл делаем»), и по продолжению задачи он описывается в этом шаге T25 (заметки группы 6, п. 10)."),
      P("`spec-init` runs `sheriff init` (§s-7unxytshhc4md54), with `--agent codex` in the plugin for Codex CLI. It then takes up the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). It passes over each setting that the user's git configuration holds, and each setting that the user has already been asked for (§s-p29yawkkkgk7kxb). For each other setting, it does the following:",
        "`spec-init` запускает `sheriff init` (§s-7unxytshhc4md54), в плагине для Codex CLI — с `--agent codex`. Затем он берётся за настройки runner, которого запустил бы `sheriff review` (§s-xr5xxa9cxf2mq5u). Он пропускает каждую настройку, которая есть в настройках git пользователя, и каждую настройку, о которой пользователя уже спрашивали (§s-p29yawkkkgk7kxb). Для каждой другой настройки он:",
        "Было в узлах обоих плагинов: «The skill `spec-init` runs `sheriff init` [`--agent codex`]. It then takes up the settings of the runner `sheriff review` would take. It passes over each setting the user's git configuration holds or the user was asked for (§s-477gtdrkw34dzxw).» Без изменений по смыслу; ссылка ведёт на новый узел о запросе настроек."),
      L("offers the setting to the user at its default, to confirm or replace;",
        "предлагает пользователю эту настройку со значением по умолчанию, чтобы подтвердить или заменить его;",
        "Без изменений по смыслу."),
      L("writes what the user answers.",
        "записывает то, что ответит пользователь.",
        "Без изменений по смыслу."),
      P("`spec-init` then records that the runner has been asked, as the hook run when a session starts does (§s-p29yawkkkgk7kxb).",
        "Затем `spec-init` записывает, что о runner уже спрашивали, так же как это делает хук при начале сессии (§s-p29yawkkkgk7kxb).",
        "Было: «It then marks the runner asked (§s-xr5xxa9cxf2mq5u).» Ссылка ведёт на узел, который определяет эту отметку (заметки группы 2, п. 7)."),
      P("`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove the plugin from the machine.",
        "`spec-remove` запускает `sheriff remove` (§s-7unxytshhc4md54) и затем предлагает удалить плагин с машины.",
        "Без изменений по смыслу."),
      P("`spec-settings` shows in the chat the settings that only an owner of the specification changes, as `sheriff settings` prints them (§s-chsfpkgpmfk4fft). It then offers the user either of the following ways to change them:",
        "`spec-settings` показывает в чате настройки, которые меняет только ответственный за спецификацию, так, как их печатает `sheriff settings` (§s-chsfpkgpmfk4fft). Затем он предлагает пользователю на выбор один из следующих способов изменить их:",
        "Новое: ваше решение от 2026-11-18 («да делаем») — skill открывает программу в отдельном окне на машине пользователя и предлагает вопросы в чате, когда ответственный работает удалённо. Skill не может знать, видит ли пользователь рабочий стол машины (например, при Remote Control), поэтому выбор оставлен пользователю."),
      L("`sheriff settings` in a terminal window of its own, where the session runs on a machine on which the skill can open one, after which the skill reports what changed;",
        "`sheriff settings` в отдельном окне терминала, если сессия работает на машине, где skill может его открыть; после этого skill сообщает, что изменилось;",
        NEW),
      L("questions in the chat, after which the skill runs `sheriff settings` with the arguments of each change that the user asks for.",
        "вопросы в чате, после которых skill запускает `sheriff settings` с аргументами каждого изменения, о котором просит пользователь.",
        NEW),
      P("The skills set neither a model nor a reasoning effort, for themselves or for any agent that they start. They work at those that the user has chosen in the session.",
        "Skills не задают ни модели, ни уровня рассуждений — ни себе, ни агентам, которых они запускают. Они работают с теми, которые пользователь выбрал в сессии.",
        "Было в узлах обоих плагинов. Без изменений по смыслу."),
    ],
    reason: "Each skill performs its procedure through the SpecSheriff tools, so that the agent of either SpecSheriff plugin follows the same steps. What a skill would make the user pay for, the reviewer's settings and the model and effort of the session, is left to the user (§s-tnz9zgqx8c629a7).",
    ruReason: "Каждый skill выполняет свою процедуру через инструменты SpecSheriff, чтобы агент любого из плагинов SpecSheriff делал одни и те же шаги. То, за что skill заставил бы платить пользователя, — настройки рецензента, модель и уровень рассуждений сессии — оставлено пользователю (§s-tnz9zgqx8c629a7).",
    reasonChange: NEW,
    examples: [
      X("An owner works from a browser through Remote Control and asks the agent to choose the Views extension. `spec-settings` offers a terminal window or questions in the chat, and the owner chooses the chat. The skill runs `sheriff settings extension views on`. The most likely mistake is to open the window without asking, on a desktop that the owner cannot see.",
        "Ответственный работает из браузера через Remote Control и просит агента выбрать расширение Views. `spec-settings` предлагает окно терминала или вопросы в чате, и ответственный выбирает чат. Skill запускает `sheriff settings extension views on`. Самая вероятная ошибка — открыть окно, не спросив: на рабочем столе, которого ответственный не видит."),
    ],
    refs: [
      R("implements", "s-9ttvcwpqkehm58g"),
      R("implements", "s-m4h279nbaqkpa3t"),
      R("cites", "s-7unxytshhc4md54"),
      R("cites", "s-xr5xxa9cxf2mq5u"),
      R("cites", SID.reviewerSettings),
      R("cites", "s-chsfpkgpmfk4fft"),
      R("cites", "s-tnz9zgqx8c629a7"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "skills/claude-code/skills/spec-settings/SKILL.md is to be written, and copy-assets.mjs copies it into the plugin for Codex CLI with the overlay that its other skills get. Whether Codex's sandbox lets a skill open a terminal window is to be tried on WSL in the rehearsal of the release; where it does not, the skill offers only the questions in the chat there. The two tests named in testsFrom move here from the two plugin nodes; a test that both plugins hold spec-settings is written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsNodes = new Map();
const collect = (data, into) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") {
      targets.add(n.sid);
      if (into) into.set(n.sid, n);
    }
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools, toolsNodes);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
for (const e of Object.values(entries)) targets.add(e.sidValue);
const isRow = (key) => key.startsWith("proposal:row-");
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (e.from && !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (isRow(key)) {
    if (e.kind !== "cell" || !e.cost?.en || !e.cost?.ru) problems.push(`${key}: a row without its kind or its cost`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}

// The new sids: of the right form and held by nothing in specs/, moved/ or the drafts before this script.
{
  const texts = [backupText];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.jsonl?$/.test(f.name)) texts.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(path.join(root, "specs"));
  walk(path.join(root, ".ai_docs/t25-pass/moved"));
  const all = texts.join("\n");
  for (const sid of Object.values(SID)) {
    if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(sid)) problems.push(`the new sid ${sid} is not of the form of a sid`);
    if (all.includes(sid)) problems.push(`the new sid ${sid} is already held`);
  }
  if (new Set(Object.values(SID)).size !== Object.values(SID).length) problems.push("two new nodes share a sid");
}

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  // A `cites` link that a decision of the node still cites stays: the decisions stay on the node.
  const citedByDecisions = new Set(citedIn(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? [])));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !citedByDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  for (const s of citedByDecisions) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: a decision cites ${s}, and the draft drops the link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!isRow(key) && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
  for (const x of p.parts) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (ticks(p.reason || "") !== ticks(p.ruReason || "")) problems.push(`${key}: the code in backticks differs between the languages in the reason`);
  if (!isRow(key) && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  // The phrases the agreed drafts avoid.
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of| that rewrite files)/, /\bcarr(y|ies|ied)\b/, /(?<!regardless of )whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/, /sheriff export/, /sheriff render/, /sheriff message\b/, /\bdeclaredIn\b/];
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT");
  for (const b of bad) if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  if (/несёт|несут|несущ|владел|NodeKind/.test(ru)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  if (/[Рр]аунд|рецензент[а-я]* групп|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) {
  if (before[key]?.agreed) {
    console.error(`${key} is an agreed draft, which this script must not change`);
    process.exit(1);
  }
  drafts[key] = e;
}
// No key outside the group may differ from the copy.
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group8.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 8: the English of every node",
  "",
  "This file holds the final English of every node of group 8 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group8.mjs: the drafts of items 57 to 63 of the appendix of the tools, which describe the hooks, the guard before an agent's edit, the agent's hooks for Codex CLI, how a git hook finds the SpecSheriff tools, the project's own tools in a git hook, and the two plugins. It also holds the new row 10.1.37b of the main table of checks.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "propose-group8.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title ?? "row 10.1.37b of the main table of checks"}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  else if (isRow(key)) md.push(`A new row of the main table of checks, with the sid ${e.sidValue}. Its cost on failure: “${e.cost.en}”.`, "");
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${p.examples.length > 1 ? ` ${i + 1}` : ""}:**`, "", x.en, "");
  for (const t of p.todos || []) md.push(`**Todo (${t.date}):** ${t.text}`, "");
}
fs.writeFileSync(new URL("english-group8.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
