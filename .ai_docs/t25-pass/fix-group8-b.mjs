// T25, stage 2, group 8, round b: applies the first review (review-g8-a.md to review-g8-d.md) and the findings of
// EngStickler's readers (english-g8-fast.md, english-g8-thorough.md), with the main session's decisions in
// fix-brief-group8-b.md. It splits the node on the skills of the SpecSheriff plugins into four, adding the nodes on
// `spec-init`, `spec-remove` and `spec-settings`. On its first run it copies tools-drafts.json to
// tools-drafts.before-group8-b.json; on every run it rebuilds the keys of the group from that copy, checks every draft
// as propose-group8.mjs does, and writes tools-drafts.json and english-group8b.md. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group8-b.json", here);
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

const SID = {
  preCommit: "s-npnmwyt6s3gypwe",
  pushCompare: "s-8a5eyy5n5hnsgrs",
  hooksOn: "s-jgcveum8dwdnyzr",
  reviewerSettings: "s-p29yawkkkgk7kxb",
  afterEdit: "s-hcmpjmwtgfwzncu",
  skills: "s-kq6wmdud9c7j2k9",
  row37b: "s-yn5tdx2bp4f5rq7",
};
// The new sids of this round.
const NEW_SID = {
  specInit: "s-ttsc8tpnu46q53s",
  specRemove: "s-jn3rauw6a8zeefn",
  specSettings: "s-h343yq2mua648eg",
};

const ROUND_A = [
  "s-477gtdrkw34dzxw", "new:tools-6-pre-commit", "new:tools-6-push-compare", "new:tools-6-hooks-on", "new:tools-6-reviewer-settings",
  "new:tools-6-after-edit", "s-st6td4mua9uqt9z", "s-n76wt2bkqdmh78x", "s-4mej6ccn7xu3d3p", "s-n4m5zvh96yb299p", "proposal:row-10-1-37b",
  "s-zh2vcr3xjumppg5", "s-2pdy9gw2jrjvfb4", "new:tools-15-skills",
];
const entries = {};
for (const key of ROUND_A) {
  if (!drafts[key]) throw new Error(`${key}: no draft of round a in the copy`);
  entries[key] = structuredClone(drafts[key]);
}
const changed = new Set();
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with: ${start}`);
  return i;
};
const rep = (key, start, ...replacement) => {
  parts(key).splice(at(key, start), 1, ...replacement);
  changed.add(key);
};
const ins = (key, afterStart, ...added) => {
  parts(key).splice(at(key, afterStart) + 1, 0, ...added);
  changed.add(key);
};
const del = (key, start) => {
  parts(key).splice(at(key, start), 1);
  changed.add(key);
};
// Changes the English and the Russian of a part in place, keeping its `change` unless a new one is given.
const edit = (key, start, en, ru, change) => {
  const i = at(key, start);
  const p = parts(key)[i];
  parts(key)[i] = { ...p, en, ru, ...(change ? { change } : {}) };
  changed.add(key);
};
const reason = (key, en, ru, change) => {
  const p = entries[key].proposal;
  p.reason = en;
  p.ruReason = ru;
  if (change) p.reasonChange = change;
  changed.add(key);
};
const examples = (key, list) => {
  entries[key].proposal.examples = list;
  changed.add(key);
};
const link = (key, type, to) => {
  const refs = entries[key].proposal.refs;
  if (!refs.some((r) => r.to === to)) refs.push(R(type, to));
  changed.add(key);
};
const unlink = (key, to) => {
  entries[key].proposal.refs = entries[key].proposal.refs.filter((r) => r.to !== to);
  changed.add(key);
};

// ---------------------------------------------------------------------------------------------------------------
// "The hooks" (s-477gtdrkw34dzxw): review g8-a, part 1, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-477gtdrkw34dzxw";
  edit(k, "The SpecSheriff tools run at the moments",
    "The following hooks run the SpecSheriff tools, and with them the checks before and after an agent's edit, on a commit and on a push (§s-epaw9sgyaajzn8g):",
    "Инструменты SpecSheriff, а с ними и проверки до и после правки агента, при коммите и при push (§s-epaw9sgyaajzn8g), запускают следующие хуки:");
  edit(k, "`pre-commit`, which runs",
    "`pre-commit`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), `sheriff types` and the checks (§s-npnmwyt6s3gypwe);",
    "`pre-commit`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), `sheriff types` и проверки (§s-npnmwyt6s3gypwe);");
  edit(k, "`commit-msg`, which runs",
    "`commit-msg`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then `sheriff commit-message`, and then, only after `sheriff commit-message` has passed, `sheriff review` (§s-4kd2pave7vm4hmd);",
    "`commit-msg`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), затем `sheriff commit-message`, а затем, только после того как проверка `sheriff commit-message` пройдена, — `sheriff review` (§s-4kd2pave7vm4hmd);");
  edit(k, "`pre-push`, which runs",
    "`pre-push`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then compares the working tree with what the push sends (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where that comparison has refused nothing.",
    "`pre-push`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), затем сравнивает рабочее дерево с тем, что отправляет push (§s-8a5eyy5n5hnsgrs), и запускает тесты (§s-b6qdtghnyha3fhk), только если это сравнение ничего не отвергло.");
  edit(k, "when a session starts, a hook",
    "when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr) and has the agent ask the user for the settings of each runner (§s-p29yawkkkgk7kxb);",
    "при начале сессии — хук, который включает git-хуки (§s-jgcveum8dwdnyzr) и через агента запрашивает у пользователя настройки каждого runner (§s-p29yawkkkgk7kxb);");
  edit(k, "At a commit, the pre-commit and commit-msg hooks",
    "On a commit, the pre-commit hook and the commit-msg hook each write out what is staged to a directory of its own. They run `sheriff types` and the checks there, with that directory as git's working tree, against the repository's history.",
    "При коммите хук pre-commit и хук commit-msg каждый выписывают то, что находится в стейджинге, в отдельный каталог. Они запускают там `sheriff types` и проверки, сделав этот каталог рабочим деревом git и сверяясь с историей репозитория.");
  edit(k, "Each check that these hooks",
    "Each check run by the pre-commit hook, the commit-msg hook or the agent's hook after an edit reads the commit being made. On a commit, that commit is what is staged. After an edit, it is the working tree's difference from the last commit. Besides that commit, such a check reads only the following:",
    "Каждая проверка, которую запускает хук pre-commit, хук commit-msg или хук агента после правки, читает создаваемый коммит. При коммите этот коммит — то, что находится в стейджинге. После правки — отличие рабочего дерева от последнего коммита. Кроме этого коммита, такая проверка читает только следующее:");
  edit(k, "the SpecSheriff guidelines and the extensions",
    "the SpecSheriff guidelines and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g), with the schema of the guidelines and that of each such extension that has one, as they are delivered with the SpecSheriff tools that run the check (§s-bsya3febm6u64ab);",
    "SpecSheriff guidelines и выбранные проектом расширения guidelines (§s-9ttvcwpqkehm58g) вместе со схемой guidelines и схемой каждого такого расширения, у которого она есть, в том виде, в каком они поставляются с инструментами SpecSheriff, которые выполняют проверку (§s-bsya3febm6u64ab);");
  ins(k, "the SpecSheriff guidelines and the extensions",
    L("the settings of the reviewer's runner in the git configuration of the user who commits, for the review (§s-tnz9zgqx8c629a7);",
      "настройки runner рецензента в конфигурации git пользователя, который делает коммит, — для ревью (§s-tnz9zgqx8c629a7);",
      "Новое: `sheriff review` читает настройки runner из конфигурации git пользователя (согласованный узел «The settings of each runner»), и без этого пункта перечень «только следующее» был бы неполным."));
  edit(k, "the repository's history and the commit message",
    "the repository's history and the commit message, where the node on how the check is made (§s-4kd2pave7vm4hmd) says so.",
    "историю репозитория и сообщение коммита — там, где это говорит узел о том, как выполняется проверка (§s-4kd2pave7vm4hmd).");
  reason(k,
    "A check reads the commit being made, because judging anything else would pass or refuse what is not being committed. The hooks that the repository keeps and those that the plugin for Claude Code declares run each check at the moment set for it in every clone, whoever makes the change (§s-epaw9sgyaajzn8g).",
    "Проверка читает создаваемый коммит, потому что, оценивая что-либо другое, она пропускала бы или отвергала то, что в коммит не входит. Хуки, которые хранит репозиторий, и хуки, которые объявляет плагин для Claude Code, запускают каждую проверку в назначенный для неё момент в каждом клоне, кто бы ни вносил изменение (§s-epaw9sgyaajzn8g).");
  examples(k, [
    X("A developer stages a change to rule R and leaves a second change to R unstaged. On the commit, `sheriff validate` reads R as it is staged. The most likely mistake is to run the checks on the working tree, so that they judge the second change, which the commit does not hold.",
      "Разработчик добавляет в стейджинг одно изменение правила R, а второе изменение R оставляет вне стейджинга. При коммите `sheriff validate` читает R в том виде, в каком оно находится в стейджинге. Самая вероятная ошибка — запускать проверки на рабочем дереве: тогда они оценивают второе изменение, которого коммит не содержит."),
  ]);
  entries[k].proposal.todos = [
    { date: "2026-10-28", by: "the owner", text: "The export and the map catch up with a change that reaches the working tree through git — a pull, a merge, a checkout — only at the next edit an agent makes or the next commit. Post-merge and post-checkout hooks running `sheriff markdown` and `sheriff map` would remove that delay." },
  ];
  link(k, "cites", "s-tnz9zgqx8c629a7");
}

// ---------------------------------------------------------------------------------------------------------------
// "The pre-commit hook" (s-npnmwyt6s3gypwe): review g8-a, part 2, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-pre-commit";
  edit(k, "the project's own tools for that hook that",
    "the project's own tools for that hook that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as tools that rewrite files (§s-t9j29hppag2nren, §s-n4m5zvh96yb299p);",
    "собственные инструменты проекта для этого хука, которые собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют как инструменты, переписывающие файлы (§s-t9j29hppag2nren, §s-n4m5zvh96yb299p);");
  edit(k, "`sheriff types` (§s-a8fn72xa782wvbk), which",
    "`sheriff types` (§s-a8fn72xa782wvbk), run on the files as they are staged;",
    "`sheriff types` (§s-a8fn72xa782wvbk), запущенный на файлах в том виде, в каком они находятся в стейджинге;");
  edit(k, "`sheriff validate`, which first",
    "`sheriff validate` (§s-6uqu6vn5fnp7fwb), which first checks for a key written more than once (§s-7zqsstgnuc772ba) and validates against the schema (§s-xzcw3hv4hmxz7h7), and runs the project's own checks (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) only after both have passed;",
    "`sheriff validate` (§s-6uqu6vn5fnp7fwb), который сначала проверяет, нет ли ключа, записанного больше одного раза (§s-7zqsstgnuc772ba), и проверяет файлы по схеме (§s-xzcw3hv4hmxz7h7), а собственные проверки проекта (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) запускает только после того, как обе проверки пройдены;");
  edit(k, "`sheriff binding` and `sheriff citations`, only after",
    "`sheriff binding` (§s-p34692nwceaxq2p) and `sheriff citations` (§s-bgegrkhrgpefs69), only after the check for a key written more than once and the validation against the schema have passed;",
    "`sheriff binding` (§s-p34692nwceaxq2p) и `sheriff citations` (§s-bgegrkhrgpefs69) — только после того, как пройдены проверка ключа, записанного больше одного раза, и проверка по схеме;");
  edit(k, "The hook writes what is staged out to its directory",
    "The hook writes out what is staged to a directory of its own (§s-477gtdrkw34dzxw) once the project's tools that rewrite files have run. `sheriff types` and the checks run in that directory.",
    "Хук выписывает то, что находится в стейджинге, в отдельный каталог (§s-477gtdrkw34dzxw) после того, как отработали собственные инструменты проекта, переписывающие файлы. `sheriff types` и проверки выполняются в этом каталоге.");
  edit(k, "The checks read each file that `sheriff types` writes",
    "The hook writes each file that `sheriff types` writes into the working tree, not into that directory, in place of whatever is at the same path, and names it as a file for the author to stage. The checks therefore read each such file as it is staged. The hook itself stages nothing.",
    "Каждый файл, который записывает `sheriff types`, хук записывает не в этот каталог, а в рабочее дерево, на место того, что лежит по тому же пути, и называет его как файл, который автору нужно добавить в стейджинг. Поэтому проверки читают каждый такой файл в том виде, в каком он находится в стейджинге. Сам хук ничего в стейджинг не добавляет.");
  edit(k, "A failure to write the export or the map",
    "A failure of `sheriff markdown` or `sheriff map` to write its files is reported, and does not make the hook refuse the commit.",
    "Если `sheriff markdown` или `sheriff map` не может записать свои файлы, об этом сообщается, и из-за этого хук не отвергает коммит.");
  reason(k,
    "On every commit, each check judges the commit in its final form (§s-pcnyfp7gev7syax). So the tools that rewrite files run before the checks, and what the hook generates waits in the working tree until the author stages it, since what a commit holds is its author's choice.",
    "При каждом коммите каждая проверка оценивает коммит в его окончательном виде (§s-pcnyfp7gev7syax). Поэтому инструменты, переписывающие файлы, выполняются до проверок, а то, что порождает хук, ждёт в рабочем дереве, пока автор не добавит это в стейджинг: что содержит коммит, решает его автор.");
  // The decisions of 2026-10-26 and 2026-10-31 of s-477gtdrkw34dzxw that stage 3 copies to this node cite these.
  entries[k].keptForDecisions = ["s-bpdqd9v72wg7vsz", "s-sn6au3vcr9uy5pm", "s-hr7j7scmfkkjnws", "s-jau82aq9juv9zzh"];
  for (const to of entries[k].keptForDecisions) link(k, "cites", to);
  for (const to of ["s-u7tw6m8npxmv5tu", "s-2fau85dfyyeq66m", "s-6uqu6vn5fnp7fwb", "s-p34692nwceaxq2p", "s-bgegrkhrgpefs69"]) link(k, "cites", to);
}

// ---------------------------------------------------------------------------------------------------------------
// "The working tree compared with what a push sends" (s-8a5eyy5n5hnsgrs): review g8-a, part 3.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-push-compare";
  rep(k, "Before a push for which it runs the tests",
    P("Before a push for which it runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with each commit that the tests judge: each commit to which the push creates or updates a ref, directly or through a tag, and that meets the conditions under which the tests run.",
      "Перед push, для которого он запускает тесты (§s-b6qdtghnyha3fhk), хук pre-push сравнивает рабочее дерево с каждым коммитом, который оценивают тесты: с каждым коммитом, на который push создаёт или обновляет ref, напрямую или через тег, и который удовлетворяет условиям запуска тестов.",
      "Было: «Before a push that runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with the commit each ref the push creates or updates names, directly or through a tag.» Теперь сравнение идёт только с коммитами, которые оценивают тесты. Согласованный узел «Running the tests before a push» запускает тесты только для ref, коммит которого удовлетворяет обоим условиям; коммит другого ref тесты не оценивают, и сравнивать с ним рабочее дерево незачем. Так решён вопрос, который остался открытым при согласовании узла «Running the tests before a push»."),
    P("The hook refuses the push where either of the following holds for a file, and names each such file:",
      "Хук отвергает push, если для какого-либо файла выполняется одно из следующих условий, и называет каждый такой файл:",
      "Было: «It refuses the push where a file is in one of these cases, naming each such file:». Без изменений по смыслу."));
  edit(k, "the file differs between the working tree",
    "the file differs between the working tree and such a commit;",
    "файл отличается в рабочем дереве и в таком коммите;");
  edit(k, "the file is in only one of them",
    "the file is in only one of them, including a file in the working tree that git does not track.",
    "файл есть только в одном из них, в том числе файл в рабочем дереве, который git не отслеживает.");
  del(k, "A commit that the tests judge is");
  edit(k, "The hook leaves out the files",
    "The hook leaves out the files that git ignores. Where it does not refuse the push, it runs the tests in the working tree.",
    "Хук не учитывает файлы, которые git игнорирует. Если он не отвергает push, он запускает тесты в рабочем дереве.");
  examples(k, [
    X("A developer commits a change and leaves an edit to `src/a.ts` uncommitted. The specification is approved, and the project's own guidelines name a push as the moment at which the tests run. The pre-push hook refuses the push and names `src/a.ts`. The most likely mistake is to run the tests in the working tree as it is, so that they pass or fail because of an edit that the pushed commit does not hold.",
      "Разработчик делает коммит изменения, а правку `src/a.ts` оставляет вне коммита. Спецификация одобрена, и собственные guidelines проекта называют push моментом запуска тестов. Хук pre-push отвергает push и называет `src/a.ts`. Самая вероятная ошибка — запускать тесты в рабочем дереве как есть: тогда они проходят или падают из-за правки, которой нет в отправленном коммите."),
  ]);
}

// ---------------------------------------------------------------------------------------------------------------
// "Turning the git hooks on when a session starts" (s-jgcveum8dwdnyzr): review g8-b, part 1, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-hooks-on";
  edit(k, "When a session starts in a repository",
    "In a repository whose root holds `sheriff.config.json`, the agent's hook run when a session starts (§s-477gtdrkw34dzxw) does the following with git's `core.hooksPath`:",
    "В репозитории, в корне которого есть `sheriff.config.json`, хук агента, который запускается при начале сессии (§s-477gtdrkw34dzxw), делает с `core.hooksPath` в настройках git следующее:");
  edit(k, "where it is unset",
    "where it is unset, the hook sets it to `.githooks` in the repository's git configuration and says so;",
    "если эта настройка не задана, хук задаёт ей значение `.githooks` в настройках git этого репозитория и сообщает об этом;",
    "Без изменений по смыслу; сказано, в каких настройках git хук её задаёт, как это делает код (session-start.sh).");
  edit(k, "where it names another directory",
    "where it points to a different directory, the hook says that the git hooks that `sheriff init` writes (§s-7unxytshhc4md54) do not run.",
    "если она указывает на другой каталог, хук сообщает, что git-хуки, которые записывает `sheriff init` (§s-7unxytshhc4md54), не выполняются.");
  edit(k, "git's index holds the hook",
    "git's index holds that git hook without the executable mode;",
    "индекс git хранит этот git-хук без исполняемого режима;");
  edit(k, "on a system whose files keep the executable bit",
    "on a system whose files keep the executable bit, the git hook's file lacks that bit.",
    "в системе, где у файлов есть бит исполнения, у файла git-хука этого бита нет.");
  edit(k, "For each such hook, it says how",
    "For each such git hook, the agent's hook says how to make the git hook executable on every system: `chmod +x <hook>` and `git update-index --chmod=+x <hook>`, then a commit. It leaves the mode of each file and git's index as they are. It leaves out the project's own tools in `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).",
    "Для каждого такого git-хука хук агента сообщает, как сделать этот git-хук исполняемым в любой системе: `chmod +x <hook>` и `git update-index --chmod=+x <hook>`, затем коммит. Режим файлов и индекс git он оставляет как есть. Собственные инструменты проекта в `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p) хук пропускает.",
    "Было: «It says how to make each one executable on every system… It changes neither the mode of a file nor git's index.» Без изменений по смыслу; сказано без отрицания, как вы просите. Добавлено, что собственные инструменты проекта хук не называет, как это делает код и проверяет тест узла.");
  reason(k,
    "In a clone where git does not run the git hooks, no check runs on a commit. A git hook that git does not run cannot report that it was skipped, while the hook run when a session starts reaches every clone. The hook run when a session starts leaves recording a git hook's mode to the author of the next commit, since what a commit holds is its author's choice.",
    "В клоне, где git не запускает git-хуки, ни одна проверка при коммите не выполняется. Git-хук, который git не запускает, не может сообщить, что его пропустили, а хук, который запускается при начале сессии, доходит до каждого клона. Запись режима git-хука хук, который запускается при начале сессии, оставляет автору следующего коммита, потому что содержимое коммита выбирает его автор.",
    "Было: абзацы о том, что git пропускает хук без бита исполнения, что хук при начале сессии доходит до каждого клона и что режим оставляется автору. Теперь обоснование говорит и о том, зачем хук включает git-хуки.");
  examples(k, [
    X("A repository set up on Windows has its git hooks committed without the executable mode. A developer clones it on Linux and starts a session. The hook run when a session starts names each git hook and says how to make it executable. The most likely mistake is to make the git hooks executable in the working tree without saying so, which leaves the index as it was, so that each of the other clones still gets git hooks that git skips.",
      "Репозиторий, настроенный в Windows, содержит git-хуки, закоммиченные без исполняемого режима. Разработчик клонирует его в Linux и начинает сессию. Хук, который запускается при начале сессии, называет каждый git-хук и сообщает, как сделать его исполняемым. Самая вероятная ошибка — молча сделать git-хуки исполняемыми в рабочем дереве: индекс остаётся прежним, и каждый другой клон по-прежнему получает git-хуки, которые git пропускает."),
  ]);
}

// ---------------------------------------------------------------------------------------------------------------
// "The settings of each runner when a session starts" (s-p29yawkkkgk7kxb): review g8-b, part 2, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-reviewer-settings";
  const p = entries[k].proposal;
  p.title = "The settings of each runner when a session starts";
  p.ruTitle = "Настройки каждого runner при начале сессии";
  edit(k, "When a session starts, the agent's hook of the plugin for Claude Code",
    "In Claude Code, the hook run when a session starts writes into the user's git configuration, with `git config --global`, each setting of the runner `claude` (§s-tnz9zgqx8c629a7) that the user has given as an option of the plugin for Claude Code (§s-zh2vcr3xjumppg5). It does so in any repository, where the configuration lacks the setting or holds a different value.",
    "В Claude Code хук, который запускается при начале сессии, записывает в настройки git пользователя командой `git config --global` каждую настройку runner `claude` (§s-tnz9zgqx8c629a7), которую пользователь задал как параметр плагина для Claude Code (§s-zh2vcr3xjumppg5). Он делает это в любом репозитории, если в настройках этой настройки нет или там другое значение.");
  rep(k, "Then, in a repository whose root holds",
    P("Then, in a repository whose root holds `sheriff.config.json`, the agent's hook run when a session starts (§s-477gtdrkw34dzxw), in Claude Code or in Codex CLI, names each setting of the runner that `sheriff review` would run on a commit there (§s-xr5xxa9cxf2mq5u), where the user's git configuration lacks that setting.",
      "Затем в репозитории, в корне которого есть `sheriff.config.json`, хук агента, который запускается при начале сессии (§s-477gtdrkw34dzxw), в Claude Code или в Codex CLI, называет каждую настройку runner, которого `sheriff review` запустил бы при коммите в этом репозитории (§s-xr5xxa9cxf2mq5u), если в настройках git пользователя этой настройки нет.",
      "Было: «Where the git configuration lacks a setting of the runner `sheriff review` would take at a commit in the repository (§s-xr5xxa9cxf2mq5u, §s-4mej6ccn7xu3d3p), the `SessionStart` hook of either agent names each such setting.» Без изменений по смыслу."),
    P("That runner is the one that `review.runner` in `sheriff.config.json` names, or otherwise the runner of the agent whose plugin's SpecSheriff tools the git hooks would take there (§s-4mej6ccn7xu3d3p). With each setting, the hook names the default that `sheriff review` takes for it. It asks the agent to do the following:",
      "Это runner, которого называет `review.runner` в `sheriff.config.json`, а иначе — runner того агента, инструменты SpecSheriff плагина которого взяли бы там git-хуки (§s-4mej6ccn7xu3d3p). Вместе с каждой настройкой хук называет значение по умолчанию, которое для неё берёт `sheriff review`. Он просит агента:",
      "Было: «With each, it names the default `sheriff review` takes for it. It asks the agent to do the following:». Без изменений по смыслу. Сказано, какой это runner, как его находит код (session-start.sh)."));
  edit(k, "to write with `git config --global`",
    "to write with `git config --global` the value that the user gives in reply, even where that value is the default.",
    "записать командой `git config --global` значение, которое пользователь даст в ответ, даже если это значение по умолчанию.");
  edit(k, "The hook asks so once",
    "The hook makes this request once for each runner on each machine. After making it, the hook sets `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked` to `true` in the user's git configuration. While that key is `true`, the hook does not ask about that runner's settings.",
    "Хук обращается с этой просьбой один раз для каждого runner на каждой машине. Обратившись с ней, хук задаёт `specsheriff.review.claudeAsked` или `specsheriff.review.codexAsked` значение `true` в настройках git пользователя. Пока этот ключ равен `true`, хук о настройках этого runner не спрашивает.",
    "Было: «It asks so once for each runner on each machine, and marks it asked in the git configuration, as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. Where the mark stands, it asks nothing.» Без изменений по смыслу; названо значение отметки, как его пишет код, и сказано, о чём хук не спрашивает.");
  reason(k,
    "A run of the reviewer is paid for by the user who commits, so the user who commits chooses the reviewer's settings (§s-tnz9zgqx8c629a7), once, as soon as an agent can ask. The git hooks run the reviewer outside the agent, so they read those settings from the user's git configuration, where the hook run when a session starts also writes the options that Claude Code asked the user for.",
    "Прогон рецензента оплачивает пользователь, который делает коммит, поэтому настройки рецензента выбирает этот пользователь (§s-tnz9zgqx8c629a7) — один раз и как только агент может спросить. Git-хуки запускают рецензента вне агента, поэтому читают эти настройки из настроек git пользователя, куда хук, который запускается при начале сессии, записывает и параметры, о которых Claude Code спросил пользователя.");
  examples(k, [
    X("A user installs the plugin for Codex CLI and opens a repository that `sheriff init --agent codex` has set up. The hook run when a session starts names `specsheriff.review.codexModel` and `specsheriff.review.codexEffort` with their defaults, and the agent asks the user about them. The user confirms the effort and names a model, and the agent writes both. The most likely mistake is to write the defaults without asking, so that the user pays for settings that the user never chose.",
      "Пользователь устанавливает плагин для Codex CLI и открывает репозиторий, который настроил `sheriff init --agent codex`. Хук, который запускается при начале сессии, называет `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` с их значениями по умолчанию, и агент спрашивает о них пользователя. Пользователь подтверждает уровень рассуждений и называет модель, и агент записывает оба значения. Самая вероятная ошибка — записать значения по умолчанию, не спросив: тогда пользователь платит за настройки, которых он не выбирал."),
  ]);
  link(k, "cites", "s-477gtdrkw34dzxw");
}

// ---------------------------------------------------------------------------------------------------------------
// "The agent's hook after an edit" (s-hcmpjmwtgfwzncu): review g8-b, part 3, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-after-edit";
  edit(k, "After an agent's edit made with the file-editing tools",
    "After an agent's edit made with the file-editing tools, or after a shell command that the agent runs, the agent's hook (§s-477gtdrkw34dzxw) runs the SpecSheriff tools where either of the following holds:",
    "После правки агента, сделанной инструментами редактирования файлов, или после команды оболочки, которую запускает агент, хук агента (§s-477gtdrkw34dzxw) запускает инструменты SpecSheriff, если выполняется одно из следующего:");
  edit(k, "the last commit or the working tree",
    "the last commit or the working tree, other than the files that git ignores, differs from what the hook recorded in the clone's git directory when the checks last ran;",
    "последний коммит или рабочее дерево, кроме файлов, которые git игнорирует, отличается от того, что хук записал в каталоге git клона, когда проверки выполнялись в последний раз;");
  edit(k, "nothing is noted",
    "nothing is recorded.",
    "ничего не записано.");
  ins(k, "nothing is recorded",
    P("Where nothing is recorded, the hook treats every file as one that differs.",
      "Если ничего не записано, хук считает отличающимся каждый файл.",
      "Новое в тексте: так делает код (changed.mjs)."));
  edit(k, "`sheriff reindex` (§s-ztseyetus7np6br), where",
    "`sheriff reindex` (§s-ztseyetus7np6br), where the files that differ include `sheriff.config.json`, a file under `specs/`, or a file that the SpecSheriff tools read to find SpecTags (§s-8xw4mgvpexyvw5q);",
    "`sheriff reindex` (§s-ztseyetus7np6br), если среди отличающихся файлов есть `sheriff.config.json`, файл внутри `specs/` или файл, который инструменты SpecSheriff читают, чтобы найти SpecTag (§s-8xw4mgvpexyvw5q);");
  edit(k, "where the files that differ include a file under `specs/` or `sheriff.config.json`, or where `sheriff reindex` has written a file:",
    "`sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb), and either the files that differ include `sheriff.config.json` or a file under `specs/`, or `sheriff reindex` has written a file;",
    "`sheriff markdown` (§s-e3495enbc5h75c3) и `sheriff map` (§s-rpv4fkdqqguptqd), если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb) и либо среди отличающихся файлов есть `sheriff.config.json` или файл внутри `specs/`, либо `sheriff reindex` записал какой-либо файл;");
  edit(k, "`sheriff types` (§s-a8fn72xa782wvbk), under the same condition",
    "`sheriff types` (§s-a8fn72xa782wvbk), where the files that differ include `sheriff.config.json`, a file under `specs/` or the code of a project's own generator (§s-km4x4s26kv7pjze), or where `sheriff reindex` has written a file;",
    "`sheriff types` (§s-a8fn72xa782wvbk), если среди отличающихся файлов есть `sheriff.config.json`, файл внутри `specs/` или код собственного генератора проекта (§s-km4x4s26kv7pjze) либо `sheriff reindex` записал какой-либо файл;");
  edit(k, "`sheriff validate`, `sheriff binding` and `sheriff citations`, which read",
    "`sheriff validate` (§s-6uqu6vn5fnp7fwb), `sheriff binding` (§s-p34692nwceaxq2p) and `sheriff citations` (§s-bgegrkhrgpefs69).",
    "`sheriff validate` (§s-6uqu6vn5fnp7fwb), `sheriff binding` (§s-p34692nwceaxq2p) и `sheriff citations` (§s-bgegrkhrgpefs69).",
    "Было: «then `sheriff validate`, `sheriff binding` and `sheriff citations`» и «The checks read the working tree's difference from the last commit as the commit.» Без изменений по смыслу; что читают проверки, говорит узел «The hooks».");
  edit(k, "Where `sheriff reindex` refuses",
    "Where `sheriff reindex` refuses anything, for example a pair of values under one key (§s-w5wg69pvvhedsws) or a file that the schema refuses (§s-xzcw3hv4hmxz7h7), the hook stops after it. It then records the last commit and the working tree as they are at that moment.",
    "Если `sheriff reindex` что-либо отвергает, например пару значений под одним ключом (§s-w5wg69pvvhedsws) или файл, который отвергает схема (§s-xzcw3hv4hmxz7h7), хук на нём останавливается. Затем он записывает последний коммит и рабочее дерево такими, какие они в этот момент.",
    "Новое в тексте: так делает код (after-edit.sh); что отвергает `sheriff reindex`, говорят его согласованные узлы.");
  edit(k, "The hook hands the agent",
    "The hook hands the agent the refusals of `sheriff reindex`, of `sheriff types` and of the checks, and names each node that `sheriff reindex` makes a draft. It hands them to Claude Code by exiting with code 2 and writing them to its standard error. It hands them to Codex in the answer that the agent's hooks for Codex CLI write (§s-n76wt2bkqdmh78x).",
    "Хук передаёт агенту отказы `sheriff reindex`, `sheriff types` и проверок и называет каждый узел, который `sheriff reindex` делает черновиком. Claude Code он передаёт это, завершаясь с кодом 2 и записывая это в свой стандартный поток ошибок. Codex он передаёт это в ответе, который пишут хуки агента для Codex CLI (§s-n76wt2bkqdmh78x).");
  ins(k, "The hook hands the agent",
    P("A failure of `sheriff markdown` or `sheriff map` to write its files is handed to the agent, and does not stop the hook.",
      "Если `sheriff markdown` или `sheriff map` не может записать свои файлы, это передаётся агенту, и хук из-за этого не останавливается.",
      "Было: сбой экспорта или карты останавливал хук (after-edit.sh). Теперь он, как и при коммите, ничего не останавливает: экспорт и карту проверки не читают."));
  edit(k, "Once the checks end",
    "Once the checks end, whether or not they refuse anything, the hook records the last commit and the working tree as they were when `sheriff validate` began. So a file changed while the checks run is checked at the next run.",
    "Когда проверки закончились, отвергли они что-либо или нет, хук записывает последний коммит и рабочее дерево такими, какими они были, когда начал работу `sheriff validate`. Поэтому файл, изменённый, пока выполнялись проверки, проверяется при следующем запуске.");
  examples(k, [
    X("An agent that has written the test of rule R adds the SpecTag of R to a function in a new file, `src/order.ts`. The hook runs `sheriff reindex`, which adds `src/order.ts` to the `meta.code` of R, and the checks then accept that list. The most likely mistake is to run `sheriff reindex` only where a file under `specs/` has changed, so that `sheriff binding` refuses the `meta.code` of R after an edit to code alone (§s-t383grkn3q68dpf).",
      "Агент, который уже написал тест правила R, добавляет SpecTag правила R к функции в новом файле `src/order.ts`. Хук запускает `sheriff reindex`, который добавляет `src/order.ts` в `meta.code` правила R, и затем проверки этот список принимают. Самая вероятная ошибка — запускать `sheriff reindex`, только если изменился файл внутри `specs/`: тогда после правки одного кода `sheriff binding` отвергает `meta.code` правила R (§s-t383grkn3q68dpf)."),
  ]);
  unlink(k, "s-zefk589ykh37b8u");
  for (const to of ["s-477gtdrkw34dzxw", "s-8xw4mgvpexyvw5q", "s-6uqu6vn5fnp7fwb", "s-p34692nwceaxq2p", "s-bgegrkhrgpefs69", "s-w5wg69pvvhedsws", "s-xzcw3hv4hmxz7h7"]) link(k, "cites", to);
  entries[k].stage3 = entries[k].stage3.replace("(the code and tests globs, the files of the project's own checks and generators, the files of the types and RuntimeChecks, sheriff.bindings.json)", "(the files that the code and tests globs match, the files of the types and RuntimeChecks, sheriff.bindings.json, as “Project-wide settings” lists them)");
  if (!entries[k].stage3.includes("as “Project-wide settings” lists them")) throw new Error("the stage3 of the hook after an edit was not changed");
}

// ---------------------------------------------------------------------------------------------------------------
// "An edit judged before it is made" (s-st6td4mua9uqt9z): review g8-b, part 4, review g8-c's A6, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-st6td4mua9uqt9z";
  edit(k, "an edit that leaves approved a node",
    "an edit after which a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, is approved while no approval of that node's wording is in force (§s-v4qus7raqnwzneb);",
    "правку, после которой узел, который она добавляет, или узел, формулировку (§s-5ah25f6gy99panq) или статус одобрения (§s-tgrnpagrb58tya7) которого она меняет, одобрен, тогда как ни одно одобрение формулировки этого узла не действует (§s-v4qus7raqnwzneb);");
  edit(k, "an edit of `specs/_approvals.jsonl`",
    "an edit to `specs/_approvals.jsonl`, whatever it changes;",
    "правку `specs/_approvals.jsonl`, что бы она ни меняла;");
  edit(k, "an edit that adds, changes or removes an entry",
    "an edit that adds, changes or removes an entry in one of the lists `approvalStatus`, `strict` and `extensions` of `sheriff.config.json` (§s-d3nkw9b6mn98vuw).",
    "правку, которая добавляет, меняет или удаляет запись в одном из списков `approvalStatus`, `strict` и `extensions` файла `sheriff.config.json` (§s-d3nkw9b6mn98vuw).");
  rep(k, "The refusal names each such node",
    P("The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and each such rule by its sid and its location. Where a test names such a rule only by a bare sid (§s-gb8s9657a65hqmv), the refusal also names `sheriff reindex`, which writes the test's SpecTag.",
      "Отказ называет каждый такой узел по его файлу, sid и расположению (§s-kag2m9tzdnduxdx), а каждое такое правило — по sid и расположению. Если тест называет такое правило только голым sid (§s-gb8s9657a65hqmv), отказ называет ещё и `sheriff reindex`, который записывает SpecTag теста.",
      "Новое в тексте: что называет отказ. Так делает код для узла и правила; про голый sid — так делает guard.ts, и это проверяет тест узла."),
    P("For an edit to `specs/_approvals.jsonl`, the refusal names `sheriff approve`, which records an approval and its withdrawal (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit to an entry of one of those lists, it names the list and `sheriff settings` (§s-chsfpkgpmfk4fft).",
      "Для правки `specs/_approvals.jsonl` отказ называет `sheriff approve`, который записывает одобрение и его отзыв (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). Для правки записи в одном из этих списков он называет список и `sheriff settings` (§s-chsfpkgpmfk4fft).",
      "Новое в тексте: что называет отказ. Для записей настроек отказ называет команду, которая их записывает."));
  edit(k, "While the installed SpecSheriff plugin lacks",
    "While the installed SpecSheriff plugin lacks an extension that the project has chosen, `sheriff guard` refuses every edit, and names each missing extension and the version of the SpecSheriff tools in the plugin (§s-mhsb6fjsq5xn6c9).",
    "Пока в установленном плагине SpecSheriff нет расширения, которое выбрал проект, `sheriff guard` отвергает любую правку и называет каждое недостающее расширение и версию инструментов SpecSheriff в плагине (§s-mhsb6fjsq5xn6c9).");
  edit(k, "`sheriff guard` judges an edit made with Claude Code's",
    "`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, from its standard input. It builds each file as the edit would leave it, without writing it to disk. Where an edit made with `Edit` or `MultiEdit` would not apply, for example where it names text that the file does not hold, `sheriff guard` lets the tool refuse it.",
    "`sheriff guard` оценивает правку, сделанную инструментами Claude Code `Write`, `Edit` или `MultiEdit`, и патч, который применяет инструмент Codex `apply_patch` (§s-n76wt2bkqdmh78x). Правку он читает со своего стандартного ввода в том виде, в каком её описывает среда агента. Каждый файл он строит таким, каким его оставит правка, не записывая его на диск. Если правку, сделанную `Edit` или `MultiEdit`, нельзя применить, например когда она называет текст, которого в файле нет, `sheriff guard` оставляет отказ инструменту.");
  edit(k, "`sheriff guard` judges the nodes in the files",
    "`sheriff guard` judges the nodes in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out each node whose approval status is derived from other nodes, such as a section (§s-9kfdycuq34beqvs). It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that would not be valid JSON after the edit.",
    "`sheriff guard` оценивает узлы в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он не оценивает узел, статус одобрения которого выводится из других узлов, например раздел (§s-9kfdycuq34beqvs). Файл спецификации, который после правки не будет корректным JSON, он оставляет проверкам после правки (§s-hcmpjmwtgfwzncu).");
  edit(k, "`sheriff guard` finds the code",
    "`sheriff guard` finds the code that an edit adds or changes in the same way as it finds what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. It looks for a test that declares the rule's SpecTag among the tests of the working tree as the edit would leave it.",
    "Код, который правка добавляет или меняет, `sheriff guard` находит так же, как то, что добавляет или меняет коммит (§s-2x58az67bm6cxq2), сравнивая каждый файл в нынешнем виде с файлом таким, каким его оставит правка. Тест, у которого есть SpecTag правила, он ищет среди тестов рабочего дерева в том виде, в каком его оставит правка.");
  edit(k, "Where it refuses an edit",
    "Where it refuses an edit, `sheriff guard` writes the refusal to its standard error and exits with code 2. `sheriff guard` refuses these edits regardless of whether the specification is approved or a draft.",
    "Отвергая правку, `sheriff guard` записывает отказ в свой стандартный поток ошибок и завершается с кодом 2. `sheriff guard` отвергает эти правки независимо от того, одобрена спецификация или является черновиком.");
  reason(k,
    "`sheriff guard` judges each file as the edit would leave it, so that an edit that the rule on an agent's edit forbids is refused before anything is written (§s-83ev4wwesbwnhnp). It judges only what the edit adds or changes, so that what the edit leaves as it was never holds up the edit.",
    "`sheriff guard` оценивает каждый файл таким, каким его оставит правка, чтобы правка, которую запрещает правило о правке агента, отвергалась до того, как что-либо записано (§s-83ev4wwesbwnhnp). Он оценивает только то, что правка добавляет или меняет, чтобы правку никогда не задерживало то, что она оставляет как было.");
  link(k, "cites", "s-gb8s9657a65hqmv");
}

// ---------------------------------------------------------------------------------------------------------------
// "The agent's hooks for Codex CLI" (s-n76wt2bkqdmh78x): review g8-c, part A, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-n76wt2bkqdmh78x";
  edit(k, "Each hook holds only the lookup",
    "Each hook only looks up the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) in Codex's cache (§s-4mej6ccn7xu3d3p), and calls the plugin's script for that hook: `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`. Where a hook finds no plugin, it does nothing.",
    "Каждый хук только ищет плагин для Codex CLI (§s-2pdy9gw2jrjvfb4) в кэше Codex (§s-4mej6ccn7xu3d3p) и вызывает скрипт плагина для этого хука: `hooks/session-start.sh`, `hooks/guard.sh` или `hooks/after-edit.sh`. Если хук не находит плагина, он ничего не делает.",
    "Было: «Each holds only the lookup of the plugin for Codex CLI in Codex's cache (§s-4mej6ccn7xu3d3p) and a call to the plugin's script for that hook…». Без изменений по смыслу; сказано глаголами.");
  edit(k, "The scripts do what the agent's hooks do",
    "Each script runs what the list of the hooks gives for its hook (§s-477gtdrkw34dzxw). In a repository without `sheriff.config.json` at its root, the scripts do nothing.",
    "Каждый скрипт выполняет то, что перечень хуков указывает для его хука (§s-477gtdrkw34dzxw). В репозитории, в корне которого нет `sheriff.config.json`, скрипты ничего не делают.");
  edit(k, "Codex blocks a tool's call only",
    "The scripts answer Codex with JSON written to their standard output, and exit with code 0:",
    "Скрипты отвечают Codex в виде JSON, который пишут в свой стандартный вывод, и завершаются с кодом 0:",
    "Новое в тексте: ваше решение от 2026-11-02 о Codex CLI — скрипты отвечают Codex в JSON. Тогда в Codex код завершения 2 у хука ничего не блокировал; по нынешней документации Codex блокирует и он, но решение по-прежнему требует ответа в JSON, и так делают guard.sh и after-edit.sh.");
  edit(k, "before an edit that `sheriff guard` refuses",
    "before an edit that `sheriff guard` (§s-st6td4mua9uqt9z) refuses: `{\"hookSpecificOutput\": {\"hookEventName\": \"PreToolUse\", \"permissionDecision\": \"deny\", \"permissionDecisionReason\": <the refusal>}}`;",
    "перед правкой, которую отвергает `sheriff guard` (§s-st6td4mua9uqt9z): `{\"hookSpecificOutput\": {\"hookEventName\": \"PreToolUse\", \"permissionDecision\": \"deny\", \"permissionDecisionReason\": <the refusal>}}`;");
  edit(k, "A script knows that it serves Codex",
    "A script reads from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u) that it serves Codex.",
    "Что он работает для Codex, скрипт читает из файла `agent` в папке инструментов SpecSheriff плагина (§s-xr5xxa9cxf2mq5u).");
  edit(k, "it reads from the patch each file",
    "it reads each file that the patch adds, updates, deletes or moves, at the path that the patch gives, relative to the directory in which the session works;",
    "читает каждый файл, который патч добавляет, обновляет, удаляет или перемещает, по пути, который указан в патче, относительно каталога, в котором работает сессия;",
    "Было: «reads from the patch each file it adds, updates, deletes or moves;». Без изменений по смыслу; сказано, от какого каталога отсчитываются пути, как это делает код (guard.ts) и проверяет тест узла.");
  edit(k, "it applies the patch to those files in memory",
    "it applies the patch to those files in memory, treating a moved file as deleted at its old path and added at its new one;",
    "применяет патч к этим файлам в памяти, считая перемещённый файл удалённым по старому пути и добавленным по новому;");
  edit(k, "it judges each of those files",
    "it judges each of those files as it judges an edit made with the file-editing tools (§s-st6td4mua9uqt9z).",
    "оценивает каждый из этих файлов так же, как оценивает правку, сделанную инструментами редактирования файлов (§s-st6td4mua9uqt9z).");
  reason(k,
    "The agent's hooks for Codex hold an agent working in Codex to the same checks, before and after each edit, as an agent in Claude Code. Codex runs a project's hook only after its user has trusted the hook as it is written. So a hook that only finds the plugin and calls its scripts needs no new trust when a release of the plugin changes what the scripts do.",
    "Хуки агента для Codex подчиняют агента, работающего в Codex, тем же проверкам до и после каждой правки, что и агента в Claude Code. Codex выполняет хук проекта только после того, как пользователь доверился этому хуку в том виде, в каком он записан. Поэтому хуку, который лишь находит плагин и вызывает его скрипты, не нужно нового доверия, когда выпуск плагина меняет то, что делают скрипты.");
  examples(k, [
    X("A patch adds `src/new.ts` and changes `specs/_approvals.jsonl`. `sheriff guard` refuses the patch, and `hooks/guard.sh` writes the denial as JSON with the refusal in `permissionDecisionReason`, so Codex applies no part of the patch. The most likely mistake is to write the refusal to standard output as plain text, which Codex ignores before a tool's call, so that the patch is applied.",
      "Патч добавляет `src/new.ts` и меняет `specs/_approvals.jsonl`. `sheriff guard` отвергает патч, и `hooks/guard.sh` пишет запрет в виде JSON с отказом в `permissionDecisionReason`, поэтому Codex не применяет ни одной части патча. Самая вероятная ошибка — написать отказ в стандартный вывод обычным текстом, который Codex перед вызовом инструмента игнорирует, и тогда патч применяется."),
  ]);
  link(k, "cites", "s-2pdy9gw2jrjvfb4");
}

// ---------------------------------------------------------------------------------------------------------------
// "A git hook runs the SpecSheriff tools that a plugin keeps on the machine" (s-4mej6ccn7xu3d3p): review g8-c,
// part B, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-4mej6ccn7xu3d3p";
  edit(k, "When a session starts, the plugin for Claude Code",
    "When a session starts, the plugin for Claude Code (§s-zh2vcr3xjumppg5) copies the SpecSheriff tools that it holds into its data directory, unless its data directory already holds a copy of the same release. The data directory is `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` is `CLAUDE_CODE_PLUGIN_CACHE_DIR` where that variable is set, and `~/.claude/plugins` otherwise.",
    "Когда сессия начинается, плагин для Claude Code (§s-zh2vcr3xjumppg5) копирует инструменты SpecSheriff, которые в нём есть, в свою папку данных, если в этой папке ещё нет копии того же выпуска. Папка данных — `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` — это `CLAUDE_CODE_PLUGIN_CACHE_DIR`, если эта переменная задана, а иначе `~/.claude/plugins`.");
  rep(k, "Each git hook that `sheriff init` writes holds the following:",
    P("Each git hook that `sheriff init` writes (§s-7unxytshhc4md54) does the following:",
      "Каждый git-хук, который записывает `sheriff init` (§s-7unxytshhc4md54), делает следующее:",
      "Было: «Each git hook `sheriff init` writes holds:». Без изменений по смыслу; сказано глаголами."));
  edit(k, "the lookup of those SpecSheriff tools",
    "it looks up the SpecSheriff tools of either plugin;",
    "ищет инструменты SpecSheriff каждого из плагинов;");
  edit(k, "a call to the script for that hook",
    "it calls the script for that hook in their `hooks/`;",
    "вызывает скрипт для этого хука в их папке `hooks/`;");
  edit(k, "the run of the project's own tools for that hook",
    "where the SpecSheriff tools cannot run, it runs the project's own tools for that hook (§s-n4m5zvh96yb299p) and gives a notice.",
    "если инструменты SpecSheriff не могут выполняться, запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p) и выдаёт сообщение.");
  edit(k, "The script for the hook runs what the hook is to run",
    "The script for the hook runs what the list of the hooks gives for that hook (§s-477gtdrkw34dzxw), including the project's own tools for that hook.",
    "Скрипт хука выполняет то, что для этого хука указывает перечень хуков (§s-477gtdrkw34dzxw), в том числе собственные инструменты проекта для этого хука.");
  edit(k, "The SpecSheriff tools cannot run where",
    "The SpecSheriff tools cannot run where the hook finds the tools of neither plugin, or where Node.js is missing or older than the version that the `engines` field of their `package.json` names. In either case, the hook runs the project's own tools for that hook, and lets the commit or the push through unless one of them fails (§s-pcnyfp7gev7syax). The pre-commit and pre-push hooks then say that the SpecSheriff tools ran no check, and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than that version, which the hooks name.",
    "Инструменты SpecSheriff не могут выполняться, если хук не находит инструментов ни одного плагина или если Node.js нет либо он старее версии, которую называет поле `engines` их `package.json`. В любом из этих случаев хук запускает собственные инструменты проекта для этого хука и пропускает коммит или push, если ни один из них не завершился неудачей (§s-pcnyfp7gev7syax). Тогда хуки pre-commit и pre-push сообщают, что инструменты SpecSheriff не выполнили ни одной проверки, и почему: на машине нет инструментов SpecSheriff ни одного плагина или Node.js нет либо он старее этой версии, которую хуки называют.");
  edit(k, "The script run when a session starts names",
    "The hook run when a session starts (§s-477gtdrkw34dzxw) names each of the following hooks that holds what an earlier release of `sheriff init` wrote:",
    "Хук, который запускается при начале сессии (§s-477gtdrkw34dzxw), называет каждый из следующих хуков, который содержит то, что записал более ранний выпуск `sheriff init`:");
  edit(k, "For each such hook, it says that `sheriff init` replaces it",
    "For each such hook, it says that running `sheriff init` again replaces that hook.",
    "Для каждого такого хука он сообщает, что повторный запуск `sheriff init` этот хук заменяет.");
  reason(k,
    "A git hook written once into a project finds the SpecSheriff tools wherever, and from whichever plugin, a machine keeps them, so that the checks keep up with each release of the plugin without any change to the project. Where those tools cannot run, the project's own tools keep guarding the commit and the push, as the rule on the order of tools and checks requires (§s-pcnyfp7gev7syax).",
    "Git-хук, однажды записанный в проект, находит инструменты SpecSheriff, где бы и из какого бы плагина машина их ни хранила, чтобы проверки не отставали от каждого выпуска плагина без изменений в проекте. Если эти инструменты выполняться не могут, коммит и push по-прежнему охраняют собственные инструменты проекта, как требует правило о порядке инструментов и проверок (§s-pcnyfp7gev7syax).");
  examples(k, [
    X("A user has both plugins: the plugin for Claude Code at release 0.7.0 and the plugin for Codex CLI at release 0.6.0. Each git hook runs the SpecSheriff tools of 0.7.0 from the data directory of the plugin for Claude Code, even when the commit is made from Codex. The most likely mistake is to take the tools of the agent that is running, so that a commit made from Codex is checked by the earlier release.",
      "У пользователя оба плагина: плагин для Claude Code выпуска 0.7.0 и плагин для Codex CLI выпуска 0.6.0. Каждый git-хук запускает инструменты SpecSheriff выпуска 0.7.0 из папки данных плагина для Claude Code, даже когда коммит сделан из Codex. Самая вероятная ошибка — брать инструменты того агента, который работает: тогда коммит из Codex проверяет более ранний выпуск."),
  ]);
  entries[k].stage3 = "The git hook that sheriff init writes (assets/githook) is to check Node.js against `engines.node` in the package.json of the tools it found before it calls their script; where Node.js is missing or older, or where it finds no tools, it runs the project's own tools of the hook in the byte order of their names, lets the commit or the push through unless one fails, and says why the SpecSheriff tools ran no check. skills/tools/hooks/sheriff.sh then no longer refuses. The scripts in skills/tools/hooks/ run the project's own tools in the order of s-npnmwyt6s3gypwe and s-n4m5zvh96yb299p; the present text of the git hook joins assets/earlier/ so that sheriff init replaces it. The test “a hook's script refuses where Node is missing or older…” is rewritten first for the new behaviour; “each git hook sheriff init writes holds the lookup … and nothing else” is rewritten for the run of the project's tools where the SpecSheriff tools cannot run; “a git hook runs the tools of the higher release where it finds both plugins', those of the plugin for Claude Code where the two are equal…” is renamed to say “either where the two are equal”, as the text says.";
}

// ---------------------------------------------------------------------------------------------------------------
// "The project's own tools in a git hook" (s-n4m5zvh96yb299p): review g8-c, part C, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-n4m5zvh96yb299p";
  edit(k, "A project's own tools for a git hook are the files",
    "A project's own tools for a git hook are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. Each git hook that `sheriff init` writes (§s-7unxytshhc4md54) runs only those files, and names any other file there.",
    "Собственные инструменты проекта для git-хука — это файлы непосредственно в `.githooks/<hook>.d/`, первая строка которых называет их интерпретатор. Каждый git-хук, который записывает `sheriff init` (§s-7unxytshhc4md54), запускает только эти файлы и называет любой другой файл в этой папке.");
  edit(k, "The hook names each path in that list",
    "The hook names each path in the project's list of tools that rewrite files for which it runs nothing, where that path points into its own folder, `.githooks/<hook>.d/`.",
    "Хук называет каждый путь из перечня инструментов проекта, переписывающих файлы, для которого он ничего не запускает, если этот путь ведёт в его собственную папку `.githooks/<hook>.d/`.");
  rep(k, "Each of the project's own tools does the following:",
    P("The hook runs each of the project's own tools as follows:",
      "Хук запускает каждый собственный инструмент проекта так:",
      "Было: «Each of the project's tools:». Без изменений по смыслу; названо, кто запускает инструмент."));
  edit(k, "it runs from the root of the working tree",
    "from the root of the working tree, with the interpreter that the tool's first line names, in the environment that git gives the hook, so that the tool reads the working tree and git's index;",
    "из корня рабочего дерева, интерпретатором, который назван в первой строке инструмента, в окружении, которое git даёт хуку, чтобы инструмент читал рабочее дерево и индекс git;");
  edit(k, "it is handed the arguments",
    "with the arguments that git hands the hook, and with a copy of the standard input that git hands the hook.",
    "с аргументами, которые git передаёт хуку, и с копией стандартного ввода, который git передаёт хуку.");
  edit(k, "Each of them runs regardless",
    "Each of the project's own tools runs regardless of what the others find. The hook fails where one of them exits with a code other than zero.",
    "Каждый собственный инструмент проекта выполняется независимо от того, что нашли остальные. Хук завершается неудачей, если один из них завершился с кодом, отличным от нуля.");
  edit(k, "Where the hook runs the SpecSheriff tools, it also refuses",
    "Where the hook runs the SpecSheriff tools, it also refuses the commit or the push, regardless of whether the specification is approved or a draft, where one of the project's own tools that runs after the tools that rewrite files does any of the following (§s-yn5tdx2bp4f5rq7):",
    "Если хук запускает инструменты SpecSheriff, он также отвергает коммит или push, независимо от того, одобрена спецификация или является черновиком, если один из собственных инструментов проекта, который выполняется после инструментов, переписывающих файлы, делает что-либо из следующего (§s-yn5tdx2bp4f5rq7):");
  del(k, "The hook makes this check regardless");
  edit(k, "These files are among the repository's own tools",
    "A project's own tools for a git hook are among the repository's own tools (§s-hheus6f395ynqvc).",
    "Собственные инструменты проекта для git-хука относятся к собственным инструментам репозитория (§s-hheus6f395ynqvc).");
  reason(k,
    "A project's own tools guard what the checks of SpecSheriff do not, such as a scan for secrets, so they run on every machine, whatever the SpecSheriff tools can do there. They run in the order in which tools and checks run (§s-pcnyfp7gev7syax), so that none of them changes what a check has read. A tool is recognised by its first line rather than by the executable bit, since a file committed from a system without that bit loses it.",
    "Собственные инструменты проекта охраняют то, чего не охраняют проверки SpecSheriff, например ищут секреты, поэтому они выполняются на каждой машине, что бы там ни могли инструменты SpecSheriff. Они выполняются в том порядке, в котором выполняются инструменты и проверки (§s-pcnyfp7gev7syax), чтобы ни один из них не менял того, что уже прочитала проверка. Инструмент распознаётся по первой строке, а не по биту исполнения, потому что файл, закоммиченный из системы без этого бита, его теряет.",
    "Было: четыре абзаца, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2): зачем инструменты проекта выполняются всегда и почему в этом порядке; довод о первой строке оставлен.");
  examples(k, [
    X("`.githooks/pre-commit.d/` holds `scan` and `tidy`, and the project's own guidelines list `pre-commit.d/tidy` as a tool that rewrites files. On a commit, `tidy` runs first and stages the files that it rewrites. `scan` runs after `sheriff types`, and the hook refuses the commit where `scan` changes any file that git does not ignore. The most likely mistake is to run both in the byte order of their names, so that `scan` reads the files before `tidy` has rewritten them.",
      "В `.githooks/pre-commit.d/` лежат `scan` и `tidy`, и собственные guidelines проекта перечисляют `pre-commit.d/tidy` как инструмент, переписывающий файлы. При коммите `tidy` выполняется первым и добавляет в стейджинг файлы, которые переписывает. `scan` выполняется после `sheriff types`, и хук отвергает коммит, если `scan` меняет какой-либо файл, который git не игнорирует. Самая вероятная ошибка — запускать оба в порядке байтов их имён: тогда `scan` читает файлы до того, как `tidy` их переписал."),
  ]);
  link(k, "cites", "s-7unxytshhc4md54");
}

// ---------------------------------------------------------------------------------------------------------------
// Row 10.1.37b: the thorough reader's two changes.
// ---------------------------------------------------------------------------------------------------------------
edit("proposal:row-10-1-37b", "A project's own tool that runs",
  "A project's own tool, other than a check that a project's own guidelines add (§s-2fau85dfyyeq66m), that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax) leaves the working tree, other than the files that git ignores, what is staged and the commit message as they were",
  "Собственный инструмент проекта, кроме проверки, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), который выполняется при коммите или push после инструментов, переписывающих файлы (§s-pcnyfp7gev7syax), оставляет рабочее дерево, кроме файлов, которые git игнорирует, то, что находится в стейджинге, и сообщение коммита такими, какими они были");

// ---------------------------------------------------------------------------------------------------------------
// "The plugin for Claude Code" (s-zh2vcr3xjumppg5): review g8-d, part 1, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-zh2vcr3xjumppg5";
  edit(k, "the SpecSheriff tools, with the files common",
    "the SpecSheriff tools, with each file common to every project at its path in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u), such as the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8);",
    "инструменты SpecSheriff вместе с каждым файлом, общим для всех проектов, по его пути в папке инструментов SpecSheriff (§s-zefk589ykh37b8u), например с SpecSheriff guidelines, каждым расширением guidelines (§s-mbmnsnxenmavu3z) и описанием инструментов (§s-a4rbry4hsu34hy8);");
  rep(k, "The plugin declares to Claude Code the agent's hooks",
    P("The plugin declares the agent's hooks (§s-477gtdrkw34dzxw) to Claude Code:",
      "Плагин объявляет Claude Code хуки агента (§s-477gtdrkw34dzxw):",
      "Было: «It declares its hooks to Claude Code: the agent's hooks (§s-477gtdrkw34dzxw) and the one run when a session starts (§s-4mej6ccn7xu3d3p).» Без изменений по смыслу; названы инструменты, для которых объявлены хуки, как в hooks.json."),
    L("the hook run when a session starts;", "хук при начале сессии;", NEW),
    L("the hook run before an edit made with `Write`, `Edit` or `MultiEdit`;", "хук перед правкой, сделанной инструментом `Write`, `Edit` или `MultiEdit`;", NEW),
    L("the hook run after such an edit or after a shell command run with `Bash` or `PowerShell`.", "хук после такой правки или после команды оболочки, выполненной инструментом `Bash` или `PowerShell`.", NEW));
  edit(k, "The plugin declares each setting of the runner",
    "The plugin declares each setting of the runner `claude` (§s-tnz9zgqx8c629a7) as one of its options. Claude Code asks the user for those options when it enables the plugin. The description of each option names the default of its setting. The option declares no default value, so that a value that Claude Code holds for it is one that the user gave.",
    "Плагин объявляет каждую настройку runner `claude` (§s-tnz9zgqx8c629a7) как свой параметр. Claude Code спрашивает пользователя об этих параметрах, когда включает плагин. Описание каждого параметра называет значение его настройки по умолчанию. Сам параметр не объявляет значения по умолчанию, чтобы значение, которое Claude Code для него хранит, было тем, что дал пользователь.");
  edit(k, "keep its copy of the SpecSheriff tools",
    "keep the plugin's copy of the SpecSheriff tools up to date (§s-4mej6ccn7xu3d3p);",
    "поддерживают копию инструментов SpecSheriff плагина в актуальном виде (§s-4mej6ccn7xu3d3p);");
  edit(k, "write the settings that the user gave as its options",
    "write the settings that the user gave as the plugin's options (§s-p29yawkkkgk7kxb).",
    "записывают настройки, которые пользователь задал как параметры плагина (§s-p29yawkkkgk7kxb).");
  edit(k, "The marketplace `specsheriff-marketplace` lists the plugin",
    "The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.claude-plugin/marketplace.json` at the root of the repository where the SpecSheriff guidelines are written. A project declares both in `.claude/settings.json` (§s-7unxytshhc4md54):",
    "Marketplace `specsheriff-marketplace` перечисляет плагин в `.claude-plugin/marketplace.json` в корне репозитория, где пишутся SpecSheriff guidelines, по относительному пути его папки. Проект объявляет оба в `.claude/settings.json` (§s-7unxytshhc4md54):",
    "Было без файла и без ссылки. Назван файл marketplace, как его проверяет тест узла; добавлена ссылка на узел о `sheriff init`, который записывает объявление.");
  edit(k, "the marketplace under `extraKnownMarketplaces`",
    "the marketplace under `extraKnownMarketplaces`, with the branch `release` of that repository as its source and with `autoUpdate` on;",
    "marketplace — под `extraKnownMarketplaces`, с веткой `release` этого репозитория как источником и с включённым `autoUpdate`;");
  reason(k,
    "An agent takes up a skill only where the skill is installed. Claude Code installs, updates and enables a plugin that a project declares. So the plugin brings the skills, the SpecSheriff guidelines with their extensions and the SpecSheriff tools, all of one release, to the agent in every clone. The project keeps only the declaration of the plugin and the calls to its tools.",
    "Агент берёт skill, только если этот skill установлен. Claude Code устанавливает, обновляет и включает плагин, который объявляет проект. Поэтому плагин приносит агенту в каждом клоне skills, SpecSheriff guidelines с их расширениями и инструменты SpecSheriff — всё одного выпуска. Проект хранит только объявление плагина и вызовы его инструментов.");
  entries[k].stage3 = entries[k].stage3 + " The test “the plugin's skills and the agent's hooks run sheriff from the tools the plugin carries, spec-init runs sheriff init, and spec-remove sheriff remove, offering to remove the plugin” is split: its part on running `sheriff` stays here, and its parts on `spec-init` and `spec-remove` move to s-ttsc8tpnu46q53s and s-jn3rauw6a8zeefn.";
}

// ---------------------------------------------------------------------------------------------------------------
// "The plugin for Codex CLI" (s-2pdy9gw2jrjvfb4): review g8-d, part 2, and both readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2pdy9gw2jrjvfb4";
  edit(k, "The plugin for Codex CLI, `specsheriff`, holds",
    "The plugin for Codex CLI, `specsheriff`, holds the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9). It holds the SpecSheriff tools, with the files common to every project (§s-zefk589ykh37b8u), and the scripts of the agent's hooks (§s-477gtdrkw34dzxw), as the plugin for Claude Code does (§s-zh2vcr3xjumppg5).",
    "Плагин для Codex CLI, `specsheriff`, содержит skills плагинов SpecSheriff (§s-kq6wmdud9c7j2k9). Он содержит инструменты SpecSheriff вместе с файлами, общими для всех проектов (§s-zefk589ykh37b8u), и скрипты хуков агента (§s-477gtdrkw34dzxw), как и плагин для Claude Code (§s-zh2vcr3xjumppg5).");
  edit(k, "The plugin declares no hooks to Codex",
    "The plugin declares no hooks to Codex. The agent's hooks for Codex are in the project (§s-n76wt2bkqdmh78x). They call the scripts that the plugin holds.",
    "Плагин не объявляет Codex хуков. Хуки агента для Codex находятся в проекте (§s-n76wt2bkqdmh78x). Они вызывают скрипты, которые содержит плагин.");
  edit(k, "The marketplace `specsheriff-marketplace` lists the plugin",
    "The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json` at the root of the same repository as the marketplace for Claude Code (§s-zh2vcr3xjumppg5).",
    "Marketplace `specsheriff-marketplace` перечисляет плагин в `.agents/plugins/marketplace.json` в корне того же репозитория, что и marketplace для Claude Code (§s-zh2vcr3xjumppg5), по относительному пути его папки.",
    "Было: «…in `.agents/plugins/marketplace.json`. That file stands beside the file listing the plugin for Claude Code (§s-zh2vcr3xjumppg5).» Без изменений по смыслу; сказано, в каком репозитории лежит файл.");
  reason(k,
    "An agent takes up a skill only where the skill is installed. Codex installs a plugin only for the user who adds it, so each user installs the plugin for Codex CLI. Each release of that plugin holds the same skills and SpecSheriff tools as the same release of the plugin for Claude Code, so that a project's users work by the same procedures and checks whichever agent each runs.",
    "Агент берёт skill, только если этот skill установлен. Codex устанавливает плагин только для того пользователя, который его добавляет, поэтому каждый пользователь устанавливает плагин для Codex CLI. Каждый выпуск этого плагина содержит те же skills и инструменты SpecSheriff, что и тот же выпуск плагина для Claude Code, чтобы пользователи проекта работали по одним и тем же процедурам и проверкам, каким бы агентом ни пользовался каждый.");
  link(k, "cites", "s-zefk589ykh37b8u");
  link(k, "cites", "s-477gtdrkw34dzxw");
  entries[k].proposal.removed = entries[k].proposal.removed.filter((x) => !x.startsWith("The `cites` links to s-7unxytshhc4md54 and s-477gtdrkw34dzxw"));
  entries[k].proposal.removed.unshift("The `cites` link to s-7unxytshhc4md54: the paragraphs on `spec-init` and `spec-remove` that cited it moved to the nodes on those skills (s-ttsc8tpnu46q53s, s-jn3rauw6a8zeefn).");
  entries[k].stage3 = entries[k].stage3 + " The test “the skills run sheriff from the tools beside them, by the path of their SKILL.md; spec-init runs sheriff init for Codex, and spec-remove sheriff remove, offering to remove the plugin” is split: its part on running `sheriff` stays here, and its parts on `spec-init` and `spec-remove` move to s-ttsc8tpnu46q53s and s-jn3rauw6a8zeefn.";
}

// ---------------------------------------------------------------------------------------------------------------
// The skills: review g8-d, part 3, split into four nodes (the main session's decision 3), with the readers' changes.
// ---------------------------------------------------------------------------------------------------------------
const DECISION_SKILL_NAMES = {
  date: "2026-11-03",
  problem: "Whether the skills should be renamed from spec and spec-* to ss and ss-*, short for SpecSheriff, to be quicker to call and more distinctive.",
  ruling: "The owner: the skills keep their names. Claude Code shows a plugin's skill under the plugin's name, as specsheriff:spec-review, and loads a user's skill of the same name beside it, so the plugin's name already keeps them distinct. A call by hand keeps that name either way, so a shorter skill name would save almost nothing, and the agent mostly takes the skills up by their descriptions. The name spec-review says what the skill works on, where ss-review has to be decoded. And ss reads first as the abbreviation of the Nazi SS, besides being a standard Linux command.",
  type: "procedural",
};
const DECISION_SETTINGS_ASKED = {
  date: "2026-11-02",
  problem: "The reviewer runs at the settings each user confirms (§s-xr5xxa9cxf2mq5u), and nothing asked a user for them or wrote them where the git hooks read them.",
  ruling: "The owner: the settings of the reviewer are a decision taken once, when the plugin is installed, not a question at each session; Claude Code asks for them as the plugin's options, which the session start of the plugin for Claude Code writes into the git configuration in any repository and wherever they differ, so that a change made in /config reaches the reviewer; Codex, which asks nothing at installation, has the agent ask at the first session in a repository taking the method, or spec-init where it runs first; the question is put once on each machine, and after it only the notice at each review reminds the user. spec-init offers the defaults of any setting still lacking that was never asked for; the skills set no model and no effort.",
  type: "textual",
};
const DECISION_SPEC_SETTINGS = {
  date: "2026-11-18",
  problem: "How an owner sees and changes the settings that only an owner changes, in the terminal or from the chat, including when the owner works remotely.",
  ruling: "The owner: the skill spec-settings is made («да скилл делаем»). It opens the terminal program `sheriff settings` in a separate window on the user's machine, and offers the question dialog in the chat when the owner works remotely («да делаем»). The agent itself must be able to change the settings when a user asks it in the chat to do so, in any project that uses the plugin.",
  type: "textual",
};
{
  const k = "new:tools-15-skills";
  entries[k].proposal.parts = [
    P("Each SpecSheriff plugin, the plugin for Claude Code (§s-zh2vcr3xjumppg5) and the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4), holds the skills `spec`, `spec-review`, `spec-adopt`, `spec-init` (§s-ttsc8tpnu46q53s), `spec-remove` (§s-jn3rauw6a8zeefn) and `spec-settings` (§s-h343yq2mua648eg).",
      "Каждый плагин SpecSheriff — плагин для Claude Code (§s-zh2vcr3xjumppg5) и плагин для Codex CLI (§s-2pdy9gw2jrjvfb4) — содержит skills `spec`, `spec-review`, `spec-adopt`, `spec-init` (§s-ttsc8tpnu46q53s), `spec-remove` (§s-jn3rauw6a8zeefn) и `spec-settings` (§s-h343yq2mua648eg).",
      "Было в узлах обоих плагинов: «the skills `spec`, `spec-review`, `spec-adopt`, `spec-init` and `spec-remove`». Добавлен skill `spec-settings`: вы решили 2026-11-18, что он будет («да скилл делаем»), и по продолжению задачи он описывается в этом шаге T25. Что делают `spec-init`, `spec-remove` и `spec-settings`, говорят их собственные узлы."),
    P("The skills, and any agent that they start, run with the model and the reasoning effort that the user has chosen in the session.",
      "Skills и любой агент, которого они запускают, работают с моделью и effort, которые пользователь выбрал в сессии.",
      "Было в узлах обоих плагинов: «The skills set neither a model nor a reasoning effort, for themselves or for any agent they start. They work at those the user has chosen in their session.» Без изменений по смыслу; сказано без отрицания, как вы просите."),
  ];
  reason(k,
    "Each SpecSheriff plugin holds the same skills, so that the agent of each plugin follows the same procedures. No choice that costs the user tokens is made without the user, so the skills leave the session's model and reasoning effort to the user.",
    "Каждый плагин SpecSheriff содержит одни и те же skills, чтобы агент каждого плагина следовал одним и тем же процедурам. Ни один выбор, за который пользователь платит токенами, не делается без него, поэтому skills оставляют модель и effort сессии пользователю.",
    NEW);
  delete entries[k].proposal.examples;
  entries[k].proposal.refs = [
    R("implements", "s-bsya3febm6u64ab"),
    R("cites", "s-zh2vcr3xjumppg5"),
    R("cites", "s-2pdy9gw2jrjvfb4"),
    R("cites", NEW_SID.specInit),
    R("cites", NEW_SID.specRemove),
    R("cites", NEW_SID.specSettings),
    R("cites", "s-xr5xxa9cxf2mq5u"),
  ];
  entries[k].proposal.meta = { decisions: [DECISION_SKILL_NAMES, DECISION_SETTINGS_ASKED] };
  entries[k].proposal.todos = [
    { date: DATE, by: "the owner", text: "`spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own, which no node does yet. A task after T25 does it." },
  ];
  entries[k].testsFrom = [];
  entries[k].stage3 = "The decisions of 2026-11-02 (the part on the skills' model) and of 2026-11-03 (the names of the skills) are copied onto this node from s-zh2vcr3xjumppg5 and s-2pdy9gw2jrjvfb4, where they also stay. The tests of the two plugins that name the skills are rewritten without counting them; a test that both plugins hold spec-settings is written first and carries this sid.";
  changed.add(k);
}

entries["new:tools-15-spec-init"] = {
  location: "tools 15b (new, after “The skills of the SpecSheriff plugins”)",
  from: "s-zh2vcr3xjumppg5",
  sidValue: NEW_SID.specInit,
  testsFrom: [
    "spec-init offers each setting of the runner the configuration lacks and was not asked for, writing what the user answers and marking it asked; the skills set no model and no effort",
    "spec-init offers each setting of the runner codex the configuration lacks and was not asked for, writing what the user answers and marking it asked",
  ],
  proposal: {
    title: "The skill `spec-init`",
    ruTitle: "Skill `spec-init`",
    parts: [
      P("`spec-init` runs `sheriff init` (§s-7unxytshhc4md54), with the option `--agent codex` in the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).",
        "`spec-init` запускает `sheriff init` (§s-7unxytshhc4md54), в плагине для Codex CLI (§s-2pdy9gw2jrjvfb4) — с параметром `--agent codex`.",
        "Было в узлах обоих плагинов: «The skill `spec-init` runs `sheriff init`.» и «…runs `sheriff init --agent codex`.» Без изменений по смыслу."),
      P("`spec-init` then asks the user for each of the following that `sheriff.config.json` lacks, and writes each answer there (§s-7unxytshhc4md54):",
        "Затем `spec-init` спрашивает пользователя о каждом из следующего, чего нет в `sheriff.config.json`, и записывает туда каждый ответ (§s-7unxytshhc4md54):",
        "Новое в узле: `sheriff init` оставляет пустыми шаблоны кода и тестов и не пишет `testCommand`, а только говорит, как их задать (согласованный узел «Setting a repository up and taking SpecSheriff out of it»). Skill спрашивает о них, как и сейчас (шаг 4 SKILL.md); ваш ответ А на третий вопрос группы 8 требует, чтобы узел называл каждый такой шаг."),
      L("the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc);",
        "шаблоны glob, которым соответствуют файлы с кодом системы (§s-hheus6f395ynqvc);",
        NEW),
      L("the glob patterns that match the files holding its tests;",
        "шаблоны glob, которым соответствуют файлы с его тестами;",
        NEW),
      L("the command that runs the tests (§s-b6qdtghnyha3fhk).",
        "команду, которая запускает тесты (§s-b6qdtghnyha3fhk).",
        NEW),
      P("`spec-init` then turns to the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). Unless the user's git configuration records that the user has been asked about that runner's settings (§s-p29yawkkkgk7kxb), `spec-init` does the following for each of those settings that the configuration lacks:",
        "Затем `spec-init` переходит к настройкам runner, которого запустил бы `sheriff review` (§s-xr5xxa9cxf2mq5u). Если в конфигурации git пользователя не записано, что пользователя о настройках этого runner уже спрашивали (§s-p29yawkkkgk7kxb), `spec-init` для каждой из этих настроек, которой в конфигурации нет, делает следующее:",
        "Было в узлах обоих плагинов: «It then takes up the settings of the runner `sheriff review` would take. It passes over each setting the user's git configuration holds or the user was asked for (§s-477gtdrkw34dzxw). For each other setting, it:». Без изменений по смыслу: отметка ставится на runner, а не на настройку, как и в решении от 2026-11-02."),
      L("offers the user the setting's default, to confirm or replace;",
        "предлагает пользователю значение настройки по умолчанию, чтобы подтвердить его или заменить;",
        "Без изменений по смыслу."),
      L("writes the user's answer with `git config --global`.",
        "записывает ответ пользователя командой `git config --global`.",
        "Было: «writes what the user answers.» Без изменений по смыслу; названа команда, как в узле о настройках при начале сессии."),
      P("`spec-init` then records that the user has been asked about that runner's settings, as the hook run when a session starts does (§s-p29yawkkkgk7kxb).",
        "Затем `spec-init` записывает, что пользователя о настройках этого runner уже спрашивали, так же как это делает хук, который запускается при начале сессии (§s-p29yawkkkgk7kxb).",
        "Было: «It then marks the runner asked (§s-xr5xxa9cxf2mq5u).» Ссылка ведёт на узел, который определяет эту отметку."),
    ],
    reason: "The session in which `spec-init` sets a project up started before the project held `sheriff.config.json`, so the hook run when a session starts asked for none of the reviewer's settings in that session (§s-p29yawkkkgk7kxb). The user pays for the reviewer's first run, so `spec-init` asks before it.",
    ruReason: "Сессия, в которой `spec-init` настраивает проект, началась до того, как в проекте появился `sheriff.config.json`, поэтому хук, который запускается при начале сессии, ни о какой настройке рецензента в этой сессии не спрашивал (§s-p29yawkkkgk7kxb). Первый прогон рецензента оплачивает пользователь, поэтому `spec-init` спрашивает до него.",
    reasonChange: "Было в узлах обоих плагинов: «Codex asks nothing for a plugin it installs. The session in which a project is set up started before `sheriff init` wrote the agent's hooks for Codex into the project… `spec-init` asks in its place, before the first commit is reviewed, unless the user was asked before.» Без изменений по смыслу, короче.",
    refs: [
      R("implements", "s-m4h279nbaqkpa3t"),
      R("cites", "s-7unxytshhc4md54"),
      R("cites", "s-2pdy9gw2jrjvfb4"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-b6qdtghnyha3fhk"),
      R("cites", "s-xr5xxa9cxf2mq5u"),
      R("cites", SID.reviewerSettings),
    ],
    meta: { decisions: [DECISION_SETTINGS_ASKED] },
    removed: [],
    date: DATE,
  },
  stage3: "skills/claude-code/skills/spec-init/SKILL.md keeps steps 1 to 5. Step 6 goes: project.json no longer holds a rule that approves the specification (s-7unxytshhc4md54); an owner approves it with `sheriff settings status approved` (s-chsfpkgpmfk4fft), which `spec-settings` offers. Step 7, the commit, goes too, since no agreed node requires the skill to commit. The overlays of copy-assets.mjs that touch those steps change with them. The decision of 2026-11-02 is copied onto this node. The tests named in testsFrom move here from the two plugin nodes, and the part of the combined test on spec-init moves here too.",
};

entries["new:tools-15-spec-remove"] = {
  location: "tools 15c (new, after “The skill `spec-init`”)",
  from: "s-zh2vcr3xjumppg5",
  sidValue: NEW_SID.specRemove,
  testsFrom: [],
  proposal: {
    title: "The skill `spec-remove`",
    ruTitle: "Skill `spec-remove`",
    parts: [
      P("`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove the plugin from the machine.",
        "`spec-remove` запускает `sheriff remove` (§s-7unxytshhc4md54) и затем предлагает удалить плагин с машины.",
        "Было в узлах обоих плагинов. Без изменений по смыслу."),
    ],
    reason: "A plugin is installed for its user on the machine, beyond any one project. So `spec-remove` offers to remove the plugin and leaves that choice to the user.",
    ruReason: "Плагин устанавливается для своего пользователя на машину, а не для одного проекта. Поэтому `spec-remove` предлагает удалить плагин и оставляет этот выбор пользователю.",
    reasonChange: "Было в узлах обоих плагинов: «A plugin is installed for its user on the machine, beyond any one project. So `spec-remove` offers its removal and leaves the choice to the user.» Без изменений по смыслу.",
    refs: [
      R("implements", "s-bsya3febm6u64ab"),
      R("cites", "s-7unxytshhc4md54"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "None in SKILL.md. The part of the combined test of each plugin on spec-remove moves here and carries this sid.",
};

entries["new:tools-15-spec-settings"] = {
  location: "tools 15d (new, after “The skill `spec-remove`”)",
  from: "s-zh2vcr3xjumppg5",
  sidValue: NEW_SID.specSettings,
  testsFrom: [],
  proposal: {
    title: "The skill `spec-settings`",
    ruTitle: "Skill `spec-settings`",
    parts: [
      P("`spec-settings` shows in the chat the settings that only an owner of the specification changes, as `sheriff settings` prints them (§s-chsfpkgpmfk4fft). It then offers the user the following ways to change them, and the user chooses one:",
        "`spec-settings` показывает в чате настройки, которые меняет только ответственный за спецификацию, так, как их печатает `sheriff settings` (§s-chsfpkgpmfk4fft). Затем он предлагает пользователю следующие способы изменить их, и пользователь выбирает один:",
        "Новое: ваше решение от 2026-11-18 («да делаем») — skill открывает программу в отдельном окне на машине пользователя и предлагает вопросы в чате, когда ответственный работает удалённо. Skill не может знать, видит ли пользователь рабочий стол машины (например, при Remote Control), поэтому выбор оставлен пользователю."),
      L("questions in the chat;",
        "вопросы в чате;",
        NEW),
      L("`sheriff settings` in a separate terminal window, which the skill offers only where the machine that runs the session has a graphical desktop.",
        "`sheriff settings` в отдельном окне терминала — skill предлагает его, только если у машины, на которой работает сессия, есть графический рабочий стол.",
        NEW),
      P("After the questions, the skill runs `sheriff settings` with the arguments of each change that the user asks for. Once the terminal window closes, the skill reports how the settings that `sheriff settings` prints differ from those that it showed before.",
        "После вопросов skill запускает `sheriff settings` с аргументами каждого изменения, о котором просит пользователь. Когда окно терминала закрывается, skill сообщает, чем настройки, которые печатает `sheriff settings`, отличаются от тех, что он показал раньше.",
        NEW),
    ],
    reason: "Only an owner changes these settings, through a procedure (§s-9ttvcwpqkehm58g). The terminal program needs a desktop that the owner can see, which an owner working remotely lacks, so the skill also offers the chat.",
    ruReason: "Эти настройки меняет только ответственный, через процедуру (§s-9ttvcwpqkehm58g). Программе в терминале нужен рабочий стол, который ответственный видит, а у ответственного, работающего удалённо, его нет, поэтому skill предлагает и чат.",
    reasonChange: NEW,
    examples: [
      X("An owner works from a browser through Remote Control and asks the agent to choose the Views extension. `spec-settings` offers questions in the chat or a separate terminal window, and the owner chooses the chat. The skill runs `sheriff settings extension views on`. The most likely mistake is to open the window without asking, on a desktop that the owner cannot see.",
        "Ответственный работает из браузера через Remote Control и просит агента выбрать расширение Views. `spec-settings` предлагает вопросы в чате или отдельное окно терминала, и ответственный выбирает чат. Skill запускает `sheriff settings extension views on`. Самая вероятная ошибка — открыть окно, не спросив: на рабочем столе, которого ответственный не видит."),
    ],
    refs: [
      R("implements", "s-9ttvcwpqkehm58g"),
      R("cites", "s-chsfpkgpmfk4fft"),
    ],
    meta: { decisions: [DECISION_SPEC_SETTINGS] },
    removed: [],
    date: DATE,
  },
  stage3: "skills/claude-code/skills/spec-settings/SKILL.md is to be written, and copy-assets.mjs copies it into the plugin for Codex CLI with the overlay that its other skills get. Whether Codex's sandbox lets a skill open a terminal window is to be tried on WSL in the rehearsal of the release; where it does not, the skill offers only the questions in the chat there. The owner's ruling of 2026-11-18 is recorded in this node's decisions. A test that the skill offers the chat and offers the window only where a graphical desktop is found is written first and carries this sid.",
};
for (const k of ["new:tools-15-spec-init", "new:tools-15-spec-remove", "new:tools-15-spec-settings"]) changed.add(k);

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

// The new sids of this round: of the right form and held by nothing in specs/, moved/ or the drafts before this script.
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
  for (const sid of Object.values(NEW_SID)) {
    if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(sid)) problems.push(`the new sid ${sid} is not of the form of a sid`);
    if (all.includes(sid)) problems.push(`the new sid ${sid} is already held`);
  }
  const allSids = [...Object.values(SID), ...Object.values(NEW_SID)];
  if (new Set(allSids).size !== allSids.length) problems.push("two new nodes share a sid");
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
  const citedByDecisions = new Set([
    ...citedIn(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? [])),
    ...citedIn(JSON.stringify(p.meta?.decisions ?? [])),
    ...(e.keptForDecisions ?? []),
  ]);
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
  if (ticks(p.title || "") !== ticks(p.ruTitle || "")) problems.push(`${key}: the code in backticks differs between the languages in the title`);
  if (!isRow(key) && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of| that rewrite files)/, /\bcarr(y|ies|ied)\b/, /(?<!regardless of )whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/, /sheriff export/, /sheriff render/, /sheriff message\b/, /\bdeclaredIn\b/, /\bat (a|every) (commit|push)\b/i, /\bthe session start\b/i, /\beach other\b/, /\bnoted?\b/, /\bthese hooks\b/];
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
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group8b.md: the final English of every node and proposal that this round changes.
const md = [
  "# T25, group 8, round b: the English of every node that the round changes",
  "",
  "This file holds the final English, after round b, of every node and proposal of group 8 that fix-group8-b.mjs changes or adds, each in full: the hooks, the guard before an agent's edit, the agent's hooks for Codex CLI, how a git hook finds the SpecSheriff tools, the project's own tools in a git hook, row 10.1.37b, the two plugins, and the skills of the plugins, now four nodes.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its examples and its todos.",
  "fix-group8-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  if (!changed.has(key)) continue;
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
fs.writeFileSync(new URL("english-group8b.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
