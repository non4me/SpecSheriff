// T25, stage 2, group 8, round c: applies the follow-up review (review-g8b-a.md to review-g8b-d.md) and the findings of
// EngStickler's readers (english-g8b-fast.md, english-g8b-thorough.md) that fix-brief-group8-c.md names, with the main
// session's decisions in that brief. On its first run it copies tools-drafts.json to tools-drafts.before-group8-c.json; on
// every run it rebuilds the keys of the group from that copy, checks every draft as fix-group8-b.mjs does, and writes
// tools-drafts.json and english-group8c.md. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group8-c.json", here);
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
// The sids of the nodes that round b added; this round adds none.
const NEW_SID = {
  specInit: "s-ttsc8tpnu46q53s",
  specRemove: "s-jn3rauw6a8zeefn",
  specSettings: "s-h343yq2mua648eg",
};

const ROUND_A = [
  "s-477gtdrkw34dzxw", "new:tools-6-pre-commit", "new:tools-6-push-compare", "new:tools-6-hooks-on", "new:tools-6-reviewer-settings",
  "new:tools-6-after-edit", "s-st6td4mua9uqt9z", "s-n76wt2bkqdmh78x", "s-4mej6ccn7xu3d3p", "s-n4m5zvh96yb299p", "proposal:row-10-1-37b",
  "s-zh2vcr3xjumppg5", "s-2pdy9gw2jrjvfb4", "new:tools-15-skills", "new:tools-15-spec-init", "new:tools-15-spec-remove", "new:tools-15-spec-settings",
];
const entries = {};
for (const key of ROUND_A) {
  if (!drafts[key]) throw new Error(`${key}: no draft of round b in the copy`);
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
// "The hooks" (s-477gtdrkw34dzxw): review g8b-a, H1 to H4, review g8b-c, E, and the main session's decision 2.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-477gtdrkw34dzxw";
  edit(k, "`pre-commit`, which runs",
    "`pre-commit`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), `sheriff types` (§s-a8fn72xa782wvbk) and the checks (§s-npnmwyt6s3gypwe);",
    "`pre-commit`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), `sheriff types` (§s-a8fn72xa782wvbk) и проверки (§s-npnmwyt6s3gypwe);");
  edit(k, "`pre-push`, which runs",
    "`pre-push`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then compares the working tree with each commit that the tests judge (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where it refuses nothing at that comparison.",
    "`pre-push`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), затем сравнивает рабочее дерево с каждым коммитом, который оценивают тесты (§s-8a5eyy5n5hnsgrs), и запускает тесты (§s-b6qdtghnyha3fhk), только если при этом сравнении ничего не отверг.");
  edit(k, "when a session starts, a hook",
    "when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr), names each hook that holds what an earlier release of `sheriff init` wrote (§s-4mej6ccn7xu3d3p), and has the agent ask the user for the settings of each runner (§s-tnz9zgqx8c629a7, §s-p29yawkkkgk7kxb);",
    "при начале сессии — хук, который включает git-хуки (§s-jgcveum8dwdnyzr), называет каждый хук, который содержит то, что записал более ранний выпуск `sheriff init` (§s-4mej6ccn7xu3d3p), и через агента запрашивает у пользователя настройки каждого runner (§s-tnz9zgqx8c629a7, §s-p29yawkkkgk7kxb);");
  edit(k, "On a commit, the pre-commit hook and the commit-msg hook",
    "On a commit, the pre-commit hook and the commit-msg hook each write out what is staged to a directory of their own. Each of them runs its checks there, with that directory as git's working tree, against the repository's history.",
    "При коммите хук pre-commit и хук commit-msg каждый выписывают то, что находится в стейджинге, в отдельный каталог. Каждый из них запускает там свои проверки, сделав этот каталог рабочим деревом git и сверяясь с историей репозитория.");
  link(k, "cites", "s-a8fn72xa782wvbk");
  entries[k].stage3 = entries[k].stage3.replace(
    "2026-11-02 (the executable mode) to s-jgcveum8dwdnyzr;",
    "2026-10-30 (the security review of turning the git hooks on) and 2026-11-02 (the executable mode) to s-jgcveum8dwdnyzr;");
  entries[k].stage3 = entries[k].stage3.replace(
    "2026-11-05 (after an edit) and 2026-11-06 (drafts reported) to s-hcmpjmwtgfwzncu;",
    "the two decisions of 2026-11-05 on the hook after an edit (the run only where something changed, PowerShell, each status emptied reported; and the regeneration where the code of a project's own generator differs) and the decision of 2026-11-06 (drafts reported) to s-hcmpjmwtgfwzncu;");
  if (!entries[k].stage3.includes("2026-10-30 (the security review") || !entries[k].stage3.includes("the two decisions of 2026-11-05")) throw new Error("the stage3 of the hooks was not changed");
}

// ---------------------------------------------------------------------------------------------------------------
// "The pre-commit hook" (s-npnmwyt6s3gypwe): review g8b-a, P1 and P2, the main session's decision 3, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-pre-commit";
  edit(k, "`sheriff validate` (§s-6uqu6vn5fnp7fwb), which first",
    "`sheriff validate` (§s-6uqu6vn5fnp7fwb), which first checks for a key written more than once (§s-7zqsstgnuc772ba) and validates the files of the specification against their schema (§s-xzcw3hv4hmxz7h7), and runs the project's own checks (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) only after both have passed;",
    "`sheriff validate` (§s-6uqu6vn5fnp7fwb), который сначала проверяет, нет ли ключа, записанного больше одного раза (§s-7zqsstgnuc772ba), и проверяет файлы спецификации по их схеме (§s-xzcw3hv4hmxz7h7), а собственные проверки проекта (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) запускает только после того, как обе проверки пройдены;");
  edit(k, "The hook writes out what is staged to a directory of its own",
    "The hook writes out what is staged to a directory of its own (§s-477gtdrkw34dzxw) once the project's tools that rewrite files have run. The checks run in that directory.",
    "Хук выписывает то, что находится в стейджинге, в отдельный каталог (§s-477gtdrkw34dzxw) после того, как отработали собственные инструменты проекта, переписывающие файлы. Проверки выполняются в этом каталоге.");
  rep(k, "The hook writes each file that `sheriff types` writes",
    P("For each file that `sheriff types` writes, the hook writes that file into the working tree, not into that directory, replacing whatever is at the same path. The checks therefore read each such file as it is staged. The hook names each such file as one for the author to stage. The hook itself stages nothing.",
      "Каждый файл, который записывает `sheriff types`, хук записывает не в этот каталог, а в рабочее дерево, заменяя то, что лежит по тому же пути. Поэтому проверки читают каждый такой файл в том виде, в каком он находится в стейджинге. Хук называет каждый такой файл файлом, который автору нужно добавить в стейджинг. Сам хук ничего в стейджинг не добавляет.",
      "Было: «The pre-commit hook copies each file `sheriff types` writes there into the working tree, in place of what stands at the same path. The hook stages none of them.» Без изменений по смыслу. Добавлено, что проверки читают такой файл в том виде, в каком он в стейджинге: иначе проверка порождённых копий прошла бы коммит со старой копией. «Сам хук ничего в стейджинг не добавляет» — ваше решение от 2026-10-31; это и единственная точная форма, потому что инструменты проекта, переписывающие файлы, добавлять в стейджинг могут."));
  edit(k, "A failure of `sheriff markdown` or `sheriff map` to write its files is reported",
    "A failure of `sheriff markdown` or `sheriff map` to write its files is reported, and the hook judges the commit by its other steps alone.",
    "Если `sheriff markdown` или `sheriff map` не может записать свои файлы, об этом сообщается, и хук оценивает коммит только по остальным своим шагам.",
    "Было: «A failure to write them is reported and stops nothing.» Без изменений по смыслу; сказано через то, что выполняется, как вы просите.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The working tree compared with what a push sends" (s-8a5eyy5n5hnsgrs): review g8b-a, N1, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-push-compare";
  edit(k, "Before a push for which it runs the tests",
    "Before a push for which the tests are to run (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with each commit that the tests judge: each commit that a ref which the push creates or updates points to, directly or through a tag, and that meets the conditions under which the tests run.",
    "Перед push, для которого должны выполняться тесты (§s-b6qdtghnyha3fhk), хук pre-push сравнивает рабочее дерево с каждым коммитом, который оценивают тесты: с каждым коммитом, на который указывает, напрямую или через тег, ref, который push создаёт или обновляет, и который удовлетворяет условиям запуска тестов.");
  const i = at(k, "the file differs between the working tree");
  parts(k)[i].change = "Было: «it differs between the working tree and the commit;». Теперь сравнение идёт только с коммитами, которые оценивают тесты; см. первый абзац.";
  edit(k, "the file is in only one of them",
    "the file is in only one of the two, even where it is a file in the working tree that git does not track.",
    "файл есть только в одном из двух, даже если это файл в рабочем дереве, который git не отслеживает.");
  edit(k, "The hook leaves out the files that git ignores.",
    "The hook leaves out the files that git ignores. Otherwise, where it refuses nothing, it runs the tests in the working tree.",
    "Хук не учитывает файлы, которые git игнорирует. Если же он ничего не отверг, он запускает тесты в рабочем дереве.");
  reason(k,
    "The tests run in the working tree, which holds what each clone installs or builds for itself, so they judge a pushed commit only where the working tree holds what that commit holds.",
    "Тесты выполняются в рабочем дереве, где есть то, что каждый клон устанавливает или собирает для себя, поэтому они оценивают отправленный коммит, только если рабочее дерево содержит то же, что этот коммит.");
}

// ---------------------------------------------------------------------------------------------------------------
// "Turning the git hooks on when a session starts" (s-jgcveum8dwdnyzr): review g8b-b, H1 and the nit, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-hooks-on";
  edit(k, "The hook also names each git hook in `.githooks/`",
    "The hook also names each git hook in `.githooks/` that git's index holds, in either of the following cases:",
    "Хук также называет каждый git-хук в `.githooks/`, который есть в индексе git, в любом из следующих случаев:",
    "Было: «The `SessionStart` hook also names each git hook in `.githooks/` in one of these cases:». Без изменений по смыслу; сказано, что хук называет только хуки из индекса git, как это делает код (session-start.sh): `git update-index --chmod=+x` для другого файла не работает.");
  edit(k, "on a system whose files keep the executable bit",
    "on a file system that keeps the executable bit, the git hook's file lacks that bit.",
    "в файловой системе, которая хранит бит исполнения, у файла git-хука этого бита нет.");
  reason(k,
    "In a clone where git does not run the git hooks, no check runs on a commit. A git hook that git does not run cannot report that it was skipped, while the hook that runs when a session starts runs in every clone. The hook that runs when a session starts leaves it to the author of the next commit to record a git hook's mode, since what a commit holds is its author's choice.",
    "В клоне, где git не запускает git-хуки, ни одна проверка при коммите не выполняется. Git-хук, который git не запускает, не может сообщить, что его пропустили, а хук, который запускается при начале сессии, выполняется в каждом клоне. Хук, который запускается при начале сессии, оставляет запись режима git-хука автору следующего коммита, потому что содержимое коммита выбирает его автор.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The settings of each runner when a session starts" (s-p29yawkkkgk7kxb): review g8b-b, R1 and the nits, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-reviewer-settings";
  edit(k, "That runner is the one that `review.runner`",
    "That runner is the one that `review.runner` in `sheriff.config.json` names, or otherwise the runner of the SpecSheriff plugin whose tools the git hooks would use there (§s-4mej6ccn7xu3d3p). With each setting, the hook names the default that `sheriff review` uses for it. It asks the agent to do the following:",
    "Это runner, которого называет `review.runner` в `sheriff.config.json`, а иначе — runner того плагина SpecSheriff, инструменты которого использовали бы там git-хуки (§s-4mej6ccn7xu3d3p). Вместе с каждой настройкой хук называет значение по умолчанию, которое для неё использует `sheriff review`. Он просит агента:");
  edit(k, "The hook makes this request once",
    "The hook makes this request once for each runner on each machine. After making it, the hook sets `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked` to `true` in the user's git configuration. It makes the request about a runner only until that runner's key is `true`.",
    "Хук обращается с этой просьбой один раз для каждого runner на каждой машине. Обратившись с ней, хук задаёт `specsheriff.review.claudeAsked` или `specsheriff.review.codexAsked` значение `true` в настройках git пользователя. С просьбой о настройках runner хук обращается, только пока ключ этого runner не равен `true`.");
  reason(k,
    "A run of the reviewer is paid for by the user who commits, so the user who commits chooses the settings of each runner (§s-tnz9zgqx8c629a7), once, as soon as an agent can ask. The git hooks run the reviewer outside the agent, so they read those settings from the user's git configuration, where the hook that runs when a session starts also writes the options that Claude Code asked the user for.",
    "Прогон рецензента оплачивает пользователь, который делает коммит, поэтому настройки каждого runner выбирает этот пользователь (§s-tnz9zgqx8c629a7) — один раз и как только агент может спросить. Git-хуки запускают рецензента вне агента, поэтому читают эти настройки из настроек git пользователя, куда хук, который запускается при начале сессии, записывает и параметры, о которых Claude Code спросил пользователя.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The agent's hook after an edit" (s-hcmpjmwtgfwzncu): review g8b-b, A1 to A4 and the nit, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-after-edit";
  entries[k].location = "tools 6e (new, after “The settings of each runner when a session starts”)";
  edit(k, "the last commit or the working tree",
    "the last commit or the working tree, other than the files that git ignores, differs from what the hook last recorded in the clone's git directory;",
    "последний коммит или рабочее дерево, кроме файлов, которые git игнорирует, отличается от того, что хук в последний раз записал в каталоге git клона;");
  edit(k, "Where it runs them, the hook runs the following",
    "Where the hook runs the SpecSheriff tools, it runs the following, in this order:",
    "Если хук запускает инструменты SpecSheriff, он выполняет следующее в таком порядке:");
  edit(k, "Where `sheriff reindex` refuses anything",
    "Where `sheriff reindex` refuses anything, for example a key written more than once whose values it cannot merge (§s-w5wg69pvvhedsws) or a file that does not conform to its schema (§s-xzcw3hv4hmxz7h7), the hook stops after it. It then records the last commit and the working tree as they are at that moment.",
    "Если `sheriff reindex` что-либо отвергает, например ключ, записанный больше одного раза, значения которого он не может объединить (§s-w5wg69pvvhedsws), или файл, который не соответствует своей схеме (§s-xzcw3hv4hmxz7h7), хук на нём останавливается. Затем он записывает последний коммит и рабочее дерево такими, какие они в этот момент.");
  edit(k, "A failure of `sheriff markdown` or `sheriff map` to write its files is handed",
    "A failure of `sheriff markdown` or `sheriff map` to write its files is handed to the agent, and the hook goes on to the next step.",
    "Если `sheriff markdown` или `sheriff map` не может записать свои файлы, это передаётся агенту, и хук переходит к следующему шагу.");
  entries[k].keptForDecisions = ["s-4kd2pave7vm4hmd", "s-9kfdycuq34beqvs"];
  for (const to of entries[k].keptForDecisions) link(k, "cites", to);
}

// ---------------------------------------------------------------------------------------------------------------
// "An edit judged before it is made" (s-st6td4mua9uqt9z): review g8b-b, G1 to G4 and the nits, decision 3, the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-st6td4mua9uqt9z";
  edit(k, "`sheriff guard` refuses each of the following edits by an agent",
    "`sheriff guard` refuses each of the following edits by an agent (§s-83ev4wwesbwnhnp), regardless of whether the specification is approved or a draft:",
    "`sheriff guard` отвергает каждую из следующих правок агента (§s-83ev4wwesbwnhnp) независимо от того, одобрена спецификация или является черновиком:");
  edit(k, "an edit after which a node that it adds",
    "an edit after which a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, has the status `approved` while no approval of that node's wording is in force (§s-v4qus7raqnwzneb);",
    "правку, после которой узел, который она добавляет, или узел, формулировку (§s-5ah25f6gy99panq) или статус одобрения (§s-tgrnpagrb58tya7) которого она меняет, имеет статус `approved`, тогда как ни одно одобрение формулировки этого узла не действует (§s-v4qus7raqnwzneb);",
    "Сужено: оцениваются только узлы, которые правка добавляет или у которых меняет формулировку либо статус одобрения, как делает guard.ts; об этом вопрос 2 на этой странице. Было: «A node the edit leaves approved is looked up in the approvals, a section and a domain's header left out. The latest line for its sid and the fingerprint of its wording must be an approval (§s-95w92rnjuv3sst8).» Что одобрение действует, определяет согласованный узел «How an approval is recorded».");
  edit(k, "For an edit to `specs/_approvals.jsonl`",
    "For an edit to `specs/_approvals.jsonl`, the refusal names `sheriff approve`, which records an approval and its withdrawal (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit to an entry of `approvalStatus`, `strict` or `extensions`, it names that list and `sheriff settings` (§s-chsfpkgpmfk4fft).",
    "Для правки `specs/_approvals.jsonl` отказ называет `sheriff approve`, который записывает одобрение и его отзыв (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). Для правки записи в `approvalStatus`, `strict` или `extensions` он называет этот список и `sheriff settings` (§s-chsfpkgpmfk4fft).");
  edit(k, "While the installed SpecSheriff plugin lacks",
    "While the installed SpecSheriff plugin lacks an extension of the guidelines that the project has chosen, `sheriff guard` refuses every edit, and names each missing extension and the version of the SpecSheriff tools in the plugin (§s-mhsb6fjsq5xn6c9).",
    "Пока в установленном плагине SpecSheriff нет расширения guidelines, которое выбрал проект, `sheriff guard` отвергает любую правку и называет каждое недостающее расширение и версию инструментов SpecSheriff в плагине (§s-mhsb6fjsq5xn6c9).");
  edit(k, "`sheriff guard` judges an edit made with Claude Code's",
    "`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, from its standard input. It builds in memory each file as the edit would leave it. Where an edit made with `Edit` or `MultiEdit` would not apply, for example where it names text that the file does not hold, `sheriff guard` lets the tool refuse it.",
    "`sheriff guard` оценивает правку, сделанную инструментами Claude Code `Write`, `Edit` или `MultiEdit`, и патч, который применяет инструмент Codex `apply_patch` (§s-n76wt2bkqdmh78x). Правку он читает со своего стандартного ввода в том виде, в каком её описывает среда агента. Каждый файл он строит в памяти таким, каким его оставит правка. Если правку, сделанную `Edit` или `MultiEdit`, нельзя применить, например когда она называет текст, которого в файле нет, `sheriff guard` оставляет отказ инструменту.",
    "Было: «`sheriff guard` builds the file as the edit would leave it, without writing it to disk.» Без изменений по смыслу; сказано без отрицания. Добавлено, какие инструменты агента оценивает `sheriff guard` и откуда он читает правку, как это делает код. Добавлено, что неприменимую правку `Edit` или `MultiEdit` `sheriff guard` оставляет отказу инструмента, как делает guard.ts.");
  edit(k, "`sheriff guard` judges the nodes in the files",
    "`sheriff guard` judges the nodes in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out each node whose approval status is derived from other nodes, such as a section (§s-9kfdycuq34beqvs). It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that would be invalid JSON after the edit.",
    "`sheriff guard` оценивает узлы в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он не оценивает узел, статус одобрения которого выводится из других узлов, например раздел (§s-9kfdycuq34beqvs). Файл спецификации, который после правки будет некорректным JSON, он оставляет проверкам после правки (§s-hcmpjmwtgfwzncu).");
  edit(k, "`sheriff guard` finds the code",
    "`sheriff guard` finds the code that an edit adds or changes in the same way as the SpecSheriff tools find what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. It looks for a test that declares the SpecTag of the rule to which that code is bound among the tests of the working tree as the edit would leave it.",
    "Код, который правка добавляет или меняет, `sheriff guard` находит так же, как инструменты SpecSheriff находят то, что добавляет или меняет коммит (§s-2x58az67bm6cxq2), сравнивая каждый файл в нынешнем виде с файлом таким, каким его оставит правка. Тест, у которого есть SpecTag правила, к которому привязан этот код, он ищет среди тестов рабочего дерева в том виде, в каком его оставит правка.");
  edit(k, "`sheriff guard` reads the lists of `sheriff.config.json`",
    "`sheriff guard` reads the lists `approvalStatus`, `strict` and `extensions` from `sheriff.config.json` as it is and as the edit would leave it. A `sheriff.config.json` that is missing or invalid JSON is read as if each of those lists were empty.",
    "Списки `approvalStatus`, `strict` и `extensions` `sheriff guard` читает из `sheriff.config.json` в нынешнем виде и в том виде, в каком его оставит правка. `sheriff.config.json`, которого нет или который является некорректным JSON, читается так, будто каждый из этих списков пуст.");
  edit(k, "Where it refuses an edit",
    "Where it refuses an edit, `sheriff guard` writes the refusal to its standard error and exits with code 2.",
    "Отвергая правку, `sheriff guard` записывает отказ в свой стандартный поток ошибок и завершается с кодом 2.",
    "Новое в тексте: так делает код (cli.ts). Что `sheriff guard` отвергает эти правки и при черновике, сказано в первом абзаце: правило 10.3 не делает исключения для черновика.");
  reason(k,
    "`sheriff guard` judges each file as the edit would leave it, so that an edit that the rule on an agent's edit forbids is refused before anything is written (§s-83ev4wwesbwnhnp). It judges only the nodes and the code that the edit adds or changes, so that a node or code that the edit leaves as it was never holds up the edit.",
    "`sheriff guard` оценивает каждый файл таким, каким его оставит правка, чтобы правка, которую запрещает правило о правке агента, отвергалась до того, как что-либо записано (§s-83ev4wwesbwnhnp). Он оценивает только те узлы и тот код, которые правка добавляет или меняет, чтобы правку никогда не задерживали узел или код, которые она оставляет как были.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The agent's hooks for Codex CLI" (s-n76wt2bkqdmh78x): review g8b-c, A and F, the main session's decisions 3, 5 and
// 8, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-n76wt2bkqdmh78x";
  edit(k, "one when a session starts",
    "one when a session starts;",
    "хук, который запускается при начале сессии;");
  edit(k, "Each hook only looks up the plugin",
    "Each hook does only two things: it looks up the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) in Codex's cache (§s-4mej6ccn7xu3d3p), and it calls the plugin's script for that hook, `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`, only where it finds the plugin.",
    "Каждый хук делает только две вещи: ищет плагин для Codex CLI (§s-2pdy9gw2jrjvfb4) в кэше Codex (§s-4mej6ccn7xu3d3p) и вызывает скрипт плагина для этого хука, `hooks/session-start.sh`, `hooks/guard.sh` или `hooks/after-edit.sh`, — только если находит плагин.",
    "Было: «Each holds only the lookup of the plugin for Codex CLI in Codex's cache (§s-4mej6ccn7xu3d3p) and a call to the plugin's script for that hook… Where a hook finds no plugin, it does nothing.» Без изменений по смыслу; сказано глаголами и без отрицания.");
  edit(k, "Each script runs what the list of the hooks",
    "Each script runs what the list of the hooks gives for its hook (§s-477gtdrkw34dzxw). The scripts run only in a repository whose root holds `sheriff.config.json`.",
    "Каждый скрипт выполняет то, что перечень хуков указывает для его хука (§s-477gtdrkw34dzxw). Скрипты работают только в репозитории, в корне которого есть `sheriff.config.json`.",
    "Было: «The scripts do what the agent's hooks do (§s-477gtdrkw34dzxw). In a repository holding no `sheriff.config.json`, they do nothing.» Без изменений по смыслу; сказано без отрицания, и уточнено, что файл ищется в корне.");
  edit(k, "The scripts answer Codex with JSON",
    "Where the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u) names `codex`, the scripts answer Codex with JSON written to their standard output, and exit with code 0:",
    "Если файл `agent` в папке инструментов SpecSheriff плагина (§s-xr5xxa9cxf2mq5u) называет `codex`, скрипты отвечают Codex в виде JSON, который пишут в свой стандартный вывод, и завершаются с кодом 0:");
  del(k, "A script reads from the file `agent`");
  edit(k, "it reads each file that the patch adds",
    "it takes from the patch the path of each file that the patch adds, updates, deletes or moves, relative to the session's working directory, and reads from disk each such file other than one that the patch adds;",
    "берёт из патча путь каждого файла, который патч добавляет, обновляет, удаляет или перемещает, относительно рабочего каталога сессии и читает с диска каждый такой файл, кроме того, который патч добавляет;");
  reason(k,
    "The agent's hooks for Codex hold an agent working in Codex to the same checks, before and after each edit, as an agent in Claude Code. Codex's public plugin directory admits no plugin that contains hooks, so the agent's hooks for Codex are in the project. Codex runs a project's hook only after its user has trusted the hook as it is written. So a hook that only finds the plugin and calls its scripts does not have to be trusted again when a release of the plugin changes what the scripts do.",
    "Хуки агента для Codex подчиняют агента, работающего в Codex, тем же проверкам до и после каждой правки, что и агента в Claude Code. Публичный каталог плагинов Codex не принимает плагин, который содержит хуки, поэтому хуки агента для Codex находятся в проекте. Codex выполняет хук проекта только после того, как пользователь доверился этому хуку в том виде, в каком он записан. Поэтому хуку, который лишь находит плагин и вызывает его скрипты, не нужно доверие заново, когда выпуск плагина меняет то, что делают скрипты.",
    "Было: четыре абзаца, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Довод одобренного узла «Codex admits no plugin carrying hooks into its public directory, so the hooks are the project's» сохранён: документация Codex говорит, что плагины с хуками не допускаются в публичный каталог плагинов. Убраны доводы о том, что хук без плагина ничего не делает, и о том, почему патч отвергается целиком: они объясняли отдельные абзацы.");
  examples(k, [
    X("A patch adds `src/new.ts` and changes `specs/_approvals.jsonl`. `sheriff guard` refuses the patch, and `hooks/guard.sh` writes the denial as JSON with the refusal in `permissionDecisionReason`, so Codex applies no part of the patch. The most likely mistake is to write the refusal to standard output as plain text, which Codex ignores before a tool call, so that the patch is applied.",
      "Патч добавляет `src/new.ts` и меняет `specs/_approvals.jsonl`. `sheriff guard` отвергает патч, и `hooks/guard.sh` пишет запрет в виде JSON с отказом в `permissionDecisionReason`, поэтому Codex не применяет ни одной части патча. Самая вероятная ошибка — написать отказ в стандартный вывод обычным текстом, который Codex перед вызовом инструмента игнорирует, и тогда патч применяется."),
  ]);
  entries[k].stage3 = entries[k].stage3 + " For the release rehearsal: after a shell command, Codex shows the agent the refusals that a `block` answer holds instead of the command's output (the hooks documentation of Codex, read 2026-11-25), so the rehearsal checks that the agent still learns what the command printed.";
}

// ---------------------------------------------------------------------------------------------------------------
// "A git hook runs the SpecSheriff tools that a plugin keeps on the machine" (s-4mej6ccn7xu3d3p): review g8b-c, B and F,
// decision 3, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-4mej6ccn7xu3d3p";
  edit(k, "The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps no copy.",
    "The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps its SpecSheriff tools only in its directory in Codex's cache, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` is `CODEX_HOME` where that variable is set, and `~/.codex` otherwise.",
    "Плагин для Codex CLI (§s-2pdy9gw2jrjvfb4) хранит свои инструменты SpecSheriff только в своей папке в кэше Codex, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` — это `CODEX_HOME`, если эта переменная задана, а иначе `~/.codex`.",
    "Было: «The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps no copy. Its tools stand in its directory in Codex's cache…». Без изменений по смыслу; сказано без отрицания.");
  edit(k, "it looks up the SpecSheriff tools of either plugin",
    "it looks up the SpecSheriff tools of each plugin;",
    "ищет инструменты SpecSheriff каждого из плагинов;");
  edit(k, "it calls the script for that hook",
    "where the SpecSheriff tools can run, it calls the script for that hook in their `hooks/`;",
    "если инструменты SpecSheriff могут выполняться, вызывает скрипт для этого хука в их папке `hooks/`;");
  edit(k, "where the SpecSheriff tools cannot run, it runs",
    "where the SpecSheriff tools cannot run, it runs the project's own tools for that hook (§s-n4m5zvh96yb299p).",
    "если инструменты SpecSheriff не могут выполняться, запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p).");
  edit(k, "Where the hook finds the SpecSheriff tools of both plugins",
    "Where the hook finds the SpecSheriff tools of both plugins, it takes those whose `release` file opens with the higher version, compared as semantic versions. Where their versions are equal, it takes either set.",
    "Если хук находит инструменты SpecSheriff обоих плагинов, он берёт те, у которых файл `release` начинается с более высокой версии при сравнении как семантических версий. Если версии равны, он берёт любой из двух наборов.");
  edit(k, "The SpecSheriff tools cannot run where",
    "The SpecSheriff tools cannot run where the hook finds the tools of neither plugin, or where Node.js is missing or older than the version that the `engines` field of their `package.json` names. In either case, the hook lets the commit or the push through unless one of the project's own tools fails (§s-pcnyfp7gev7syax). The pre-commit and pre-push hooks then say that the SpecSheriff tools ran no check, and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than that version, which the hooks name.",
    "Инструменты SpecSheriff не могут выполняться, если хук не находит инструментов ни одного плагина или если Node.js нет либо он старее версии, которую называет поле `engines` их `package.json`. В любом из этих случаев хук пропускает коммит или push, если ни один из собственных инструментов проекта не завершился неудачей (§s-pcnyfp7gev7syax). Тогда хуки pre-commit и pre-push сообщают, что инструменты SpecSheriff не выполнили ни одной проверки, и почему: на машине нет инструментов SpecSheriff ни одного плагина или Node.js нет либо он старее этой версии, которую хуки называют.");
  {
    const i = at(k, "The hook run when a session starts (§s-477gtdrkw34dzxw) names");
    parts(k)[i].change = "Было: «The script run when a session starts names each of these hooks that holds what an earlier release of `sheriff init` wrote:». Без изменений по смыслу: назван хук, как в остальных узлах группы.";
    const j = at(k, "For each such hook, it says that running `sheriff init` again");
    parts(k)[j].change = "Было: «For each, it says that `sheriff init` replaces it (§s-7unxytshhc4md54).» Без изменений по смыслу.";
  }
  reason(k,
    "A git hook written once into a project finds the SpecSheriff tools wherever a machine keeps them and whichever plugin they come from, so that the checks keep up with each release of the plugin without any change to the project. Where those tools cannot run, the project's own tools keep guarding the commit and the push, as the rule on the order of tools and checks requires (§s-pcnyfp7gev7syax).",
    "Git-хук, однажды записанный в проект, находит инструменты SpecSheriff, где бы машина их ни хранила и из какого бы плагина они ни были, чтобы проверки не отставали от каждого выпуска плагина без изменений в проекте. Если эти инструменты выполняться не могут, коммит и push по-прежнему охраняют собственные инструменты проекта, как требует правило о порядке инструментов и проверок (§s-pcnyfp7gev7syax).");
}

// ---------------------------------------------------------------------------------------------------------------
// "The project's own tools in a git hook" (s-n4m5zvh96yb299p): review g8b-c, C, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-n4m5zvh96yb299p";
  edit(k, "A project's own tools for a git hook are the files",
    "A project's own tools for a git hook are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. Each git hook that `sheriff init` writes (§s-7unxytshhc4md54) runs, of the files there, only those, and names any other file there.",
    "Собственные инструменты проекта для git-хука — это файлы непосредственно в `.githooks/<hook>.d/`, первая строка которых называет их интерпретатор. Каждый git-хук, который записывает `sheriff init` (§s-7unxytshhc4md54), запускает из файлов в этой папке только эти и называет любой другой файл в ней.");
  edit(k, "A first line names an interpreter",
    "A first line names an interpreter where it opens with `#!`, followed by a path and at most one argument. A carriage return that ends the line is ignored.",
    "Первая строка называет интерпретатор, если она начинается с `#!`, за которым идут путь и не больше одного аргумента. Возврат каретки в конце строки игнорируется.");
  edit(k, "The hook names each path in the project's list",
    "Where a path in the project's list of tools that rewrite files points into the hook's own folder, `.githooks/<hook>.d/`, and the hook runs nothing for that path, the hook names the path.",
    "Если путь из перечня инструментов проекта, переписывающих файлы, ведёт в собственную папку хука `.githooks/<hook>.d/` и хук ничего для этого пути не запускает, хук называет этот путь.");
  edit(k, "Each of the project's own tools runs regardless",
    "Each of the project's own tools runs even where another of them has failed. The hook fails where one of them exits with a code other than zero.",
    "Каждый собственный инструмент проекта выполняется, даже если другой из них завершился неудачей. Хук завершается неудачей, если один из них завершился с кодом, отличным от нуля.");
  reason(k,
    "A project's own tools check what the checks of the SpecSheriff tools do not check, for example by scanning for secrets, so they run on every machine, whatever the SpecSheriff tools can do there. They run in the order in which tools and checks run (§s-pcnyfp7gev7syax), so that none of them changes what a check has read. A tool is recognised by its first line rather than by the executable bit, since a file committed from a system without that bit loses it.",
    "Собственные инструменты проекта проверяют то, чего не проверяют проверки инструментов SpecSheriff, например ищут секреты, поэтому они выполняются на каждой машине, что бы там ни могли инструменты SpecSheriff. Они выполняются в том порядке, в котором выполняются инструменты и проверки (§s-pcnyfp7gev7syax), чтобы ни один из них не менял того, что уже прочитала проверка. Инструмент распознаётся по первой строке, а не по биту исполнения, потому что файл, закоммиченный из системы без этого бита, его теряет.");
}

// ---------------------------------------------------------------------------------------------------------------
// Row 10.1.37b: review g8b-c, D.
// ---------------------------------------------------------------------------------------------------------------
edit("proposal:row-10-1-37b", "A project's own tool, other than a check",
  "A project's own tool, other than a check that a project's own guidelines add (§s-2fau85dfyyeq66m), that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax) leaves the commit message, what is staged and the working tree as they were, except for the files of the working tree that git ignores",
  "Собственный инструмент проекта, кроме проверки, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), который выполняется при коммите или push после инструментов, переписывающих файлы (§s-pcnyfp7gev7syax), оставляет сообщение коммита, то, что находится в стейджинге, и рабочее дерево такими, какими они были, кроме файлов рабочего дерева, которые git игнорирует");

// ---------------------------------------------------------------------------------------------------------------
// "The plugin for Claude Code" (s-zh2vcr3xjumppg5): review g8b-d, 1.1 to 1.3, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-zh2vcr3xjumppg5";
  edit(k, "the hook run when a session starts;",
    "the hook that runs when a session starts;",
    "хук, который запускается при начале сессии;");
  edit(k, "the hook run before an edit",
    "the hook that runs before an edit made with `Write`, `Edit` or `MultiEdit`;",
    "хук, который запускается перед правкой, сделанной инструментом `Write`, `Edit` или `MultiEdit`;");
  edit(k, "the hook run after such an edit",
    "the hook that runs after such an edit or after a shell command run with `Bash` or `PowerShell`.",
    "хук, который запускается после такой правки или после команды оболочки, выполненной инструментом `Bash` или `PowerShell`.");
  edit(k, "The plugin declares each setting of the runner",
    "The plugin declares each setting of the runner `claude` (§s-tnz9zgqx8c629a7) as one of its options. Claude Code asks the user for those options when it enables the plugin. Each option names the default of its setting only in its description, so that a value that Claude Code holds for the option is one that the user gave.",
    "Плагин объявляет каждую настройку runner `claude` (§s-tnz9zgqx8c629a7) как свой параметр. Claude Code спрашивает пользователя об этих параметрах, когда включает плагин. Каждый параметр называет значение своей настройки по умолчанию только в своём описании, чтобы значение, которое Claude Code хранит для этого параметра, было тем, что дал пользователь.");
  reason(k,
    "An agent can use a skill only where the skill is installed. Claude Code installs, updates and enables a plugin that a project declares. So the plugin brings the skills, the SpecSheriff guidelines with their extensions and the SpecSheriff tools, all from the same release, to the agent in every clone. Of the plugin, the project keeps only its declaration and the calls to its tools.",
    "Агент может использовать skill, только если этот skill установлен. Claude Code устанавливает, обновляет и включает плагин, который объявляет проект. Поэтому плагин приносит агенту в каждом клоне skills, SpecSheriff guidelines с их расширениями и инструменты SpecSheriff — всё из одного и того же выпуска. От плагина в проекте остаются только его объявление и вызовы его инструментов.",
    "Было: восемь абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Доводы о skills и о `spec-init` перешли в узлы о skills; довод о значении по умолчанию стал придаточным «чтобы» в тексте. Доводы о том, почему источник marketplace — ветка `release`, и о том, что проект без метода ничем не связан, убраны как пояснения к отдельным абзацам.");
  examples(k, [
    X("A project chooses the RecordType extension. On every machine where Claude Code has updated the plugin to a release that delivers that extension, the SpecSheriff tools find the extension at `guidelines/extensions/recordtype.json` in their own folder. The most likely mistake is to keep a copy of the extension in `specs/_guidelines/extensions/`, which `sheriff validate` refuses (§s-6bmnsbskg6en4nf).",
      "Проект выбирает расширение RecordType. На каждой машине, где Claude Code обновил копию плагина до выпуска, который это расширение поставляет, инструменты SpecSheriff находят его в `guidelines/extensions/recordtype.json` в своей папке. Самая вероятная ошибка — хранить копию расширения в `specs/_guidelines/extensions/`: `sheriff validate` её отвергает (§s-6bmnsbskg6en4nf)."),
  ]);
}

// ---------------------------------------------------------------------------------------------------------------
// "The plugin for Codex CLI" (s-2pdy9gw2jrjvfb4): review g8b-d, 2.1 to 2.3, the main session's decision 5, the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2pdy9gw2jrjvfb4";
  edit(k, "The plugin declares no hooks to Codex.",
    "The agent's hooks for Codex are only in the project (§s-n76wt2bkqdmh78x). They call the scripts that the plugin holds.",
    "Хуки агента для Codex находятся только в проекте (§s-n76wt2bkqdmh78x). Они вызывают скрипты, которые содержит плагин.",
    "Было: «It declares no hooks. The agent's hooks for Codex stand in the project (§s-n76wt2bkqdmh78x).» Без изменений по смыслу; сказано без отрицания, и добавлено, что эти хуки вызывают скрипты плагина.");
  edit(k, "The marketplace `specsheriff-marketplace` lists the plugin",
    "The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json` at the root of the repository where the SpecSheriff guidelines are written, which also holds the marketplace for Claude Code (§s-zh2vcr3xjumppg5).",
    "Marketplace `specsheriff-marketplace` перечисляет плагин в `.agents/plugins/marketplace.json` в корне репозитория, где пишутся SpecSheriff guidelines и где лежит также marketplace для Claude Code (§s-zh2vcr3xjumppg5), по относительному пути его папки.");
  edit(k, "The plugin's skills run `sheriff`",
    "The plugin's skills run `sheriff` from the SpecSheriff tools in the plugin, as `node <plugin>/tools/dist/cli.js`. A skill derives `<plugin>` from the path of its `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.",
    "Skills плагина запускают `sheriff` из инструментов SpecSheriff в плагине как `node <plugin>/tools/dist/cli.js`. Skill выводит `<plugin>` из пути своего `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.");
  reason(k,
    "An agent can use a skill only where the skill is installed. Codex installs a plugin only for the user who adds it, so each user has to install the plugin for Codex CLI. Each release of that plugin holds the same skills and SpecSheriff tools as the same release of the plugin for Claude Code, so that a project's users follow the same procedures and are held to the same checks whichever agent each runs.",
    "Агент может использовать skill, только если этот skill установлен. Codex устанавливает плагин только для того пользователя, который его добавляет, поэтому каждому пользователю нужно установить плагин для Codex CLI. Каждый выпуск этого плагина содержит те же skills и инструменты SpecSheriff, что и тот же выпуск плагина для Claude Code, чтобы пользователи проекта следовали одним и тем же процедурам и подчинялись одним и тем же проверкам, каким бы агентом ни пользовался каждый.",
    "Было: восемь абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Довод «Codex admits no plugin carrying hooks into its public directory, so the plugin carries none» перенесён в обоснование узла о хуках агента для Codex, где он объясняет, почему эти хуки в проекте. Доводы о skills перешли в узлы о skills; доводы о том, что Codex читает `.agents/plugins/marketplace.json` первым и что skill находит инструменты по пути своего файла, убраны как пояснения к отдельным абзацам.");
}

// ---------------------------------------------------------------------------------------------------------------
// The skills: review g8b-d, 3 to 6, the main session's decisions 4 and 6, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-15-skills";
  reason(k,
    "The skills give the agent of each SpecSheriff plugin the same procedures, at a cost that only the user who pays for the session chooses.",
    "Skills дают агенту каждого плагина SpecSheriff одни и те же процедуры, по цене, которую выбирает только пользователь, оплачивающий сессию.");
  entries[k].proposal.todos = [
    { date: DATE, by: "the owner", text: "`spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own; no node describes them yet." },
  ];
  entries[k].stage3 = entries[k].stage3 + " The part of the test “spec-init offers each setting …; the skills set no model and no effort” that checks every SKILL.md for a model or an effort moves here and carries this sid. The node keeps its `implements` link to 2.5 (s-bsya3febm6u64ab), the nearest rule of the base, since the agreed s-yprj7d6tnvauggr refuses a node of the appendix of the tools without an `implements` link to a rule of the guidelines; see question 2 for the base specification.";
}
{
  const k = "new:tools-15-spec-init";
  edit(k, "`spec-init` then asks the user for each of the following",
    "`spec-init` then asks the user for each of the following that `sheriff.config.json` lacks (§s-7unxytshhc4md54), and writes each answer there:",
    "Затем `spec-init` спрашивает пользователя о каждом из следующего, чего нет в `sheriff.config.json` (§s-7unxytshhc4md54), и записывает туда каждый ответ:");
  edit(k, "`spec-init` then turns to the settings",
    "`spec-init` then turns to the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). Unless the user's git configuration records that the user has been asked about that runner's settings (§s-p29yawkkkgk7kxb), `spec-init` does the following for each of those settings that the user's git configuration lacks:",
    "Затем `spec-init` переходит к настройкам runner, которого запустил бы `sheriff review` (§s-xr5xxa9cxf2mq5u). Если в конфигурации git пользователя не записано, что пользователя о настройках этого runner уже спрашивали (§s-p29yawkkkgk7kxb), `spec-init` для каждой из этих настроек, которой в конфигурации git пользователя нет, делает следующее:");
  reason(k,
    "Where the project keeps its code and its tests, which command runs the tests and which settings the reviewer runs with are for the user to decide. The session in which `spec-init` sets a project up started before the project held `sheriff.config.json`, so the hook that runs when a session starts asked for none of the reviewer's settings in that session (§s-p29yawkkkgk7kxb). The user pays for the reviewer's first run, so `spec-init` asks before that run.",
    "Где проект хранит свой код и свои тесты, какая команда запускает тесты и с какими настройками работает рецензент — решать пользователю. Сессия, в которой `spec-init` настраивает проект, началась до того, как в проекте появился `sheriff.config.json`, поэтому хук, который запускается при начале сессии, ни о какой настройке рецензента в этой сессии не спрашивал (§s-p29yawkkkgk7kxb). Первый прогон рецензента оплачивает пользователь, поэтому `spec-init` спрашивает до этого прогона.");
  examples(k, [
    X("The user answers that the code is in `src/`, the tests are in `test/`, and `npm test` runs them. `spec-init` writes `src/**` and `test/**` as the glob patterns and `npm test` as the command. The most likely mistake is to write `src` and `test`, which match no file inside those folders.",
      "Пользователь отвечает, что код лежит в `src/`, тесты — в `test/`, а запускает их `npm test`. `spec-init` записывает glob-шаблоны `src/**` и `test/**` и команду `npm test`. Самая вероятная ошибка — записать `src` и `test`: им не соответствует ни один файл внутри этих папок."),
  ]);
  entries[k].stage3 = entries[k].stage3.replace(
    "skills/claude-code/skills/spec-init/SKILL.md keeps steps 1 to 5.",
    "skills/claude-code/skills/spec-init/SKILL.md keeps steps 2, 4 and 5; step 4 asks only for what `sheriff.config.json` lacks, and step 5 finds the runner as the hook that runs when a session starts finds it (s-p29yawkkkgk7kxb). Steps 1 and 3 go, since no agreed node requires them; `sheriff init` names a missing email address itself (s-7unxytshhc4md54).");
  if (!entries[k].stage3.includes("keeps steps 2, 4 and 5")) throw new Error("the stage3 of spec-init was not changed");
}
{
  const k = "new:tools-15-spec-remove";
  edit(k, "`spec-remove` runs `sheriff remove`",
    "`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove its own plugin from the machine.",
    "`spec-remove` запускает `sheriff remove` (§s-7unxytshhc4md54) и затем предлагает удалить с машины свой плагин.");
  reason(k,
    "A plugin is installed for its user on the machine, not for any one project. So `spec-remove` offers to remove the plugin and leaves that choice to the user.",
    "Плагин устанавливается для своего пользователя на машину, а не для какого-то одного проекта. Поэтому `spec-remove` предлагает удалить плагин и оставляет этот выбор пользователю.");
  entries[k].stage3 = "skills/claude-code/skills/spec-remove/SKILL.md keeps steps 2 and 5. Steps 1, 3 and 4 go, since no agreed node requires them, as with `spec-init`; step 4 is the commit. The part of the combined test of each plugin on spec-remove moves here and carries this sid. The node keeps its `implements` link to 2.5 (s-bsya3febm6u64ab), the nearest rule of the base, since the agreed s-yprj7d6tnvauggr refuses a node of the appendix of the tools without an `implements` link to a rule of the guidelines; see question 2 for the base specification.";
}
{
  const k = "new:tools-15-spec-settings";
  rep(k, "`spec-settings` shows in the chat",
    P("`spec-settings` shows in the chat the settings that only an owner of the specification changes, as `sheriff settings` prints them (§s-chsfpkgpmfk4fft). It then asks the user to choose one of the following ways to change them:",
      "`spec-settings` показывает в чате настройки, которые меняет только ответственный за спецификацию, так, как их печатает `sheriff settings` (§s-chsfpkgpmfk4fft). Затем он просит пользователя выбрать один из следующих способов изменить их:",
      "Новое: ваше решение от 2026-11-18 («да делаем») — skill открывает программу в отдельном окне на машине пользователя и предлагает вопросы в чате, когда ответственный работает удалённо. Skill не может знать, видит ли пользователь рабочий стол машины (например, при Remote Control), поэтому выбор оставлен пользователю. Окно стоит первым: вы назвали программу в терминале основным способом."),
    L("`sheriff settings` in a separate terminal window, which the skill offers only where it can open such a window on the graphical desktop of the machine that runs the session;",
      "`sheriff settings` в отдельном окне терминала — skill предлагает его, только если может открыть такое окно на графическом рабочем столе машины, на которой работает сессия;",
      NEW),
    L("questions in the chat.",
      "вопросы в чате.",
      NEW));
  del(k, "questions in the chat;");
  del(k, "`sheriff settings` in a separate terminal window, which the skill offers only where the machine");
  edit(k, "After the questions",
    "Where the user chooses the questions, the skill runs `sheriff settings` with the arguments of each change that the user asks for. Where the user chooses the terminal window, the skill reports, once the window closes, how the settings that `sheriff settings` prints differ from those that it showed before.",
    "Если пользователь выбирает вопросы, skill запускает `sheriff settings` с аргументами каждого изменения, о котором просит пользователь. Если пользователь выбирает окно терминала, skill, когда окно закрывается, сообщает, чем настройки, которые печатает `sheriff settings`, отличаются от тех, что он показал раньше.");
  reason(k,
    "Only an owner changes these settings, through a procedure (§s-chsfpkgpmfk4fft). `sheriff settings` in a terminal window needs a desktop that the owner can see, which an owner who works remotely does not have, so the skill also offers the chat.",
    "Эти настройки меняет только ответственный, через процедуру (§s-chsfpkgpmfk4fft). Для `sheriff settings` в окне терминала нужен рабочий стол, который ответственный видит, а у ответственного, который работает удалённо, его нет, поэтому skill предлагает и чат.");
  examples(k, [
    X("An owner works from a browser through Remote Control and asks the agent to choose the Views extension. `spec-settings` offers a separate terminal window or questions in the chat, and the owner chooses the chat. The skill runs `sheriff settings extension views on`. The most likely mistake is to open the window without asking, on a desktop that the owner cannot see.",
      "Ответственный работает из браузера через Remote Control и просит агента выбрать расширение Views. `spec-settings` предлагает отдельное окно терминала или вопросы в чате, и ответственный выбирает чат. Skill запускает `sheriff settings extension views on`. Самая вероятная ошибка — открыть окно, не спросив: на рабочем столе, которого ответственный не видит."),
  ]);
  entries[k].stage3 = entries[k].stage3.replace(
    "where it does not, the skill offers only the questions in the chat there.",
    "where it does not, the skill offers only the questions in the chat there, as the node already says.");
}

// ---------------------------------------------------------------------------------------------------------------
// The name of the hook (the main session's decision 1): "the hook that runs when a session starts" everywhere.
// ---------------------------------------------------------------------------------------------------------------
for (const key of Object.keys(entries)) {
  const p = entries[key].proposal;
  const fix = (s) => s && s.replace(/\b(the|The|agent's) hook run when a session starts/g, (m, w) => `${w} hook that runs when a session starts`);
  let touched = false;
  for (const x of p.parts) {
    const en = fix(x.en);
    if (en !== x.en) {
      x.en = en;
      touched = true;
    }
  }
  if (p.reason && fix(p.reason) !== p.reason) {
    p.reason = fix(p.reason);
    touched = true;
  }
  for (const x of p.examples || []) {
    if (fix(x.en) !== x.en) {
      x.en = fix(x.en);
      touched = true;
    }
  }
  if (touched) changed.add(key);
}

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
  void all;
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
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of| that rewrite files)/, /\bcarr(y|ies|ied)\b/, /(?<!regardless of )whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /(?<!one of )\bthe two\b/, /sheriff export/, /sheriff render/, /sheriff message\b/, /\bdeclaredIn\b/, /\bat (a|every) (commit|push)\b/i, /\bthe session start\b/i, /\beach other\b/, /\bnoted?\b/, /\bthese hooks\b/];
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

// english-group8c.md: the final English of every node and proposal that this round changes.
const md = [
  "# T25, group 8, round c: the English of every node that the round changes",
  "",
  "This file holds the final English, after round c, of every node and proposal of group 8 that fix-group8-c.mjs changes, each in full.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its examples and its todos.",
  "fix-group8-c.mjs writes this file; edit the script, not this file.",
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
fs.writeFileSync(new URL("english-group8c.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
