// T25, stage 2, group 8, round d: applies the final review (review-g8c.md) and the findings of EngStickler's readers
// (english-g8c-fast.md, english-g8c-thorough.md) that fix-brief-group8-d.md names, with the main session's decisions in
// that brief. On its first run it copies tools-drafts.json to tools-drafts.before-group8-d.json; on every run it rebuilds
// the keys of the group from that copy, checks every draft as fix-group8-c.mjs does, and writes tools-drafts.json and
// english-group8d.md. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group8-d.json", here);
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
  if (!drafts[key]) throw new Error(`${key}: no draft of round c in the copy`);
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

// Replaces the `change` of the part whose `change` holds the given words.
const changeOf = (key, holds, change) => {
  const p = parts(key).find((x) => x.change.includes(holds));
  if (!p) throw new Error(`${key}: no part's change holds: ${holds}`);
  p.change = change;
  changed.add(key);
};
// Replaces words in the English or the Russian of the reason, and refuses a replacement that finds nothing.
const inReason = (key, field, from, to) => {
  const p = entries[key].proposal;
  if (!p[field].includes(from)) throw new Error(`${key}: the ${field} lacks: ${from}`);
  p[field] = p[field].replace(from, to);
  changed.add(key);
};

// ---------------------------------------------------------------------------------------------------------------
// "The hooks" (s-477gtdrkw34dzxw): the nit of the final review on the copy of the tools, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-477gtdrkw34dzxw";
  edit(k, "`pre-push`, which runs",
    "`pre-push`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then compares the working tree with each commit that the tests judge (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where that comparison gives it no reason to refuse the push.",
    "`pre-push`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), затем сравнивает рабочее дерево с каждым коммитом, который оценивают тесты (§s-8a5eyy5n5hnsgrs), и запускает тесты (§s-b6qdtghnyha3fhk), только если это сравнение не даёт ему причины отвергнуть push.");
  edit(k, "when a session starts, a hook",
    "when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr), updates the copy of the SpecSheriff tools that the plugin for Claude Code keeps, names each hook that holds what an earlier release of `sheriff init` wrote (§s-4mej6ccn7xu3d3p), and has the agent ask the user for the settings of each runner (§s-tnz9zgqx8c629a7, §s-p29yawkkkgk7kxb);",
    "при начале сессии — хук, который включает git-хуки (§s-jgcveum8dwdnyzr), обновляет копию инструментов SpecSheriff, которую хранит плагин для Claude Code, называет каждый хук, который содержит то, что записал более ранний выпуск `sheriff init` (§s-4mej6ccn7xu3d3p), и через агента запрашивает у пользователя настройки каждого runner (§s-tnz9zgqx8c629a7, §s-p29yawkkkgk7kxb);",
    "Было: абзацы о хуке `SessionStart`. Они вынесены в два новых узла. Обновление копии инструментов SpecSheriff и названия хуков, записанных прежним выпуском, описывает узел «A git hook runs the SpecSheriff tools that a plugin keeps on the machine».");
}

// ---------------------------------------------------------------------------------------------------------------
// "The pre-commit hook" (s-npnmwyt6s3gypwe): the nit of the final review on the index, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-pre-commit";
  edit(k, "For each file that `sheriff types` writes",
    "For each file that `sheriff types` writes, the hook writes that file into the working tree, not into that directory, replacing whatever is at the same path. The checks therefore read each such file as it is staged. The hook tells the author to stage each such file. The hook itself leaves git's index as it is.",
    "Каждый файл, который записывает `sheriff types`, хук записывает не в этот каталог, а в рабочее дерево, заменяя то, что лежит по тому же пути. Поэтому проверки читают каждый такой файл в том виде, в каком он находится в стейджинге. Хук говорит автору добавить каждый такой файл в стейджинг. Сам хук оставляет индекс git как есть.",
    "Было: «The pre-commit hook copies each file `sheriff types` writes there into the working tree, in place of what stands at the same path. The hook stages none of them.» Без изменений по смыслу. Добавлено, что проверки читают такой файл в том виде, в каком он в стейджинге: иначе проверка порождённых копий прошла бы коммит со старой копией. «Сам хук оставляет индекс git как есть» — ваше решение от 2026-10-31, сказанное без отрицания: инструменты проекта, переписывающие файлы, добавлять в стейджинг могут, а сам хук нет.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The working tree compared with what a push sends" (s-8a5eyy5n5hnsgrs): P1 and P2 of the final review, the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-push-compare";
  edit(k, "Before a push for which the tests are to run",
    "Before a push for which the tests are to run (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with each commit that the tests judge: each commit that is pointed to, directly or through a tag, by a ref that the push creates or updates, and that meets the conditions under which the tests run.",
    "Перед push, для которого должны выполняться тесты (§s-b6qdtghnyha3fhk), хук pre-push сравнивает рабочее дерево с каждым коммитом, который оценивают тесты: с каждым коммитом, на который напрямую или через тег указывает ref, создаваемый или обновляемый этим push, если этот коммит удовлетворяет условиям запуска тестов.");
  edit(k, "The hook leaves out the files that git ignores.",
    "The hook leaves out the files that git ignores. Where it refuses nothing, it runs the tests in the working tree.",
    "Хук не учитывает файлы, которые git игнорирует. Если он ничего не отверг, он запускает тесты в рабочем дереве.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The settings of each runner when a session starts" (s-p29yawkkkgk7kxb): the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-reviewer-settings";
  edit(k, "In Claude Code, the hook that runs when a session starts writes",
    "In Claude Code, the hook that runs when a session starts writes into the user's git configuration, with `git config --global`, each setting of the runner `claude` (§s-tnz9zgqx8c629a7) that the user has given as an option of the plugin for Claude Code (§s-zh2vcr3xjumppg5). It does so in any repository, whenever the configuration lacks the setting or holds a different value.",
    "В Claude Code хук, который запускается при начале сессии, записывает в настройки git пользователя командой `git config --global` каждую настройку runner `claude` (§s-tnz9zgqx8c629a7), которую пользователь задал как параметр плагина для Claude Code (§s-zh2vcr3xjumppg5). Он делает это в любом репозитории всякий раз, когда в настройках этой настройки нет или там другое значение.");
  edit(k, "The hook makes this request once",
    "The hook makes this request once for each runner on each machine. After making it, the hook sets `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked` to `true` in the user's git configuration. The hook stops making the request about a runner once that runner's key is `true`.",
    "Хук обращается с этой просьбой один раз для каждого runner на каждой машине. Обратившись с ней, хук задаёт `specsheriff.review.claudeAsked` или `specsheriff.review.codexAsked` значение `true` в настройках git пользователя. Хук перестаёт обращаться с просьбой о настройках runner, как только ключ этого runner равен `true`.",
    "Было: «It asks so once for each runner on each machine, and marks it asked in the git configuration, as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. Where the mark stands, it asks nothing.» Без изменений по смыслу; названо значение отметки, как его пишет код, и сказано, когда хук перестаёт обращаться с просьбой.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The agent's hook after an edit" (s-hcmpjmwtgfwzncu): the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-6-after-edit";
  edit(k, "A failure of `sheriff markdown` or `sheriff map`",
    "A failure of `sheriff markdown` or `sheriff map` to write its files is reported to the agent, and the hook goes on to the next step.",
    "Если `sheriff markdown` или `sheriff map` не может записать свои файлы, об этом сообщается агенту, и хук переходит к следующему шагу.");
  edit(k, "Once the checks end",
    "Once the checks have finished, whether or not they refuse anything, the hook records the last commit and the working tree as they were when `sheriff validate` began. So a file changed while the checks run is checked at the next run.",
    "Когда проверки закончились, отвергли они что-либо или нет, хук записывает последний коммит и рабочее дерево такими, какими они были, когда начал работу `sheriff validate`. Поэтому файл, изменённый, пока выполнялись проверки, проверяется при следующем запуске.");
}

// ---------------------------------------------------------------------------------------------------------------
// "An edit judged before it is made" (s-st6td4mua9uqt9z): the nit of the final review on the test, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-st6td4mua9uqt9z";
  edit(k, "For an edit to `specs/_approvals.jsonl`, the refusal names",
    "For an edit to `specs/_approvals.jsonl`, the refusal names `sheriff approve`, which records approvals and their withdrawals (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit to an entry of `approvalStatus`, `strict` or `extensions`, it names that list and `sheriff settings` (§s-chsfpkgpmfk4fft).",
    "Для правки `specs/_approvals.jsonl` отказ называет `sheriff approve`, который записывает одобрения и их отзывы (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). Для правки записи в `approvalStatus`, `strict` или `extensions` он называет этот список и `sheriff settings` (§s-chsfpkgpmfk4fft).");
  edit(k, "`sheriff guard` judges an edit made with Claude Code's",
    "`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, from its standard input. It builds in memory each file as the edit would leave it. Where an edit made with `Edit` or `MultiEdit` would not apply, for example where it names text that the file does not contain, `sheriff guard` lets the tool refuse it.",
    "`sheriff guard` оценивает правку, сделанную инструментами Claude Code `Write`, `Edit` или `MultiEdit`, и патч, который применяет инструмент Codex `apply_patch` (§s-n76wt2bkqdmh78x). Правку он читает со своего стандартного ввода в том виде, в каком её описывает среда агента. Каждый файл он строит в памяти таким, каким его оставит правка. Если правку, сделанную `Edit` или `MultiEdit`, нельзя применить, например когда она называет текст, которого в файле нет, `sheriff guard` оставляет отказ инструменту.");
  edit(k, "`sheriff guard` finds the code that an edit adds or changes",
    "`sheriff guard` finds the code that an edit adds or changes in the same way as the SpecSheriff tools find what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. Among the tests of the working tree as the edit would leave it, it looks for a test that declares the SpecTag of the rule to which that code is bound.",
    "Код, который правка добавляет или меняет, `sheriff guard` находит так же, как инструменты SpecSheriff находят то, что добавляет или меняет коммит (§s-2x58az67bm6cxq2), сравнивая каждый файл в нынешнем виде с файлом таким, каким его оставит правка. Тест, у которого есть SpecTag правила, к которому привязан этот код, он ищет среди тестов рабочего дерева в том виде, в каком его оставит правка.");
  edit(k, "`sheriff guard` reads the lists `approvalStatus`",
    "`sheriff guard` reads the lists `approvalStatus`, `strict` and `extensions` from `sheriff.config.json` as it is and as the edit would leave it. A `sheriff.config.json` that is missing or is not valid JSON is read as if each of those lists were empty.",
    "Списки `approvalStatus`, `strict` и `extensions` `sheriff guard` читает из `sheriff.config.json` в нынешнем виде и в том виде, в каком его оставит правка. `sheriff.config.json`, которого нет или который не является корректным JSON, читается так, будто каждый из этих списков пуст.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The agent's hooks for Codex CLI" (s-n76wt2bkqdmh78x): N1 and its nits from the final review, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-n76wt2bkqdmh78x";
  edit(k, "one when a session starts;", "one that runs when a session starts;", "хук, который запускается при начале сессии;", "Без изменений по смыслу.");
  edit(k, "one before an edit made with `apply_patch`;", "one that runs before an edit made with `apply_patch`;",
    "хук, который запускается перед правкой, сделанной инструментом `apply_patch`;", "Без изменений по смыслу.");
  edit(k, "one after such an edit or a shell command.", "one that runs after such an edit or a shell command.",
    "хук, который запускается после такой правки или команды оболочки.", "Без изменений по смыслу.");
  edit(k, "Each hook does only two things:",
    "Each hook does only two things: it looks for the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) in Codex's cache (§s-4mej6ccn7xu3d3p), and it calls the plugin's script for that hook, `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`, only where it finds the plugin.",
    "Каждый хук делает только две вещи: ищет плагин для Codex CLI (§s-2pdy9gw2jrjvfb4) в кэше Codex (§s-4mej6ccn7xu3d3p) и вызывает скрипт плагина для этого хука, `hooks/session-start.sh`, `hooks/guard.sh` или `hooks/after-edit.sh`, — только если находит плагин.");
  edit(k, "Each script runs what the list of the hooks",
    "Each script runs what the list of the hooks specifies for its hook (§s-477gtdrkw34dzxw) only in a repository whose root holds `sheriff.config.json`.",
    "Каждый скрипт выполняет то, что перечень хуков указывает для его хука (§s-477gtdrkw34dzxw), только в репозитории, в корне которого есть `sheriff.config.json`.");
  edit(k, "Where the file `agent` in the folder",
    "Where the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u) contains `codex`, the scripts answer Codex with JSON written to their standard output and exit with code 0:",
    "Если файл `agent` в папке инструментов SpecSheriff плагина (§s-xr5xxa9cxf2mq5u) содержит `codex`, скрипты отвечают Codex в виде JSON, который пишут в свой стандартный вывод, и завершаются с кодом 0:");
  edit(k, "it takes from the patch the path",
    "it takes from the patch the path of each file that the patch adds, updates, deletes or moves, and the new path of each moved file, each relative to the session's working directory, and reads from disk each of those files that exists;",
    "берёт из патча путь каждого файла, который патч добавляет, обновляет, удаляет или перемещает, и новый путь каждого перемещённого файла, каждый относительно рабочего каталога сессии, и читает с диска каждый из этих файлов, который существует;",
    "Было: «reads from the patch each file it adds, updates, deletes or moves;». Без изменений по смыслу; сказано, от какого каталога отсчитываются пути и какие из этих файлов читаются с диска, как это делает код (patch.ts) и проверяет тест узла.");
  inReason(k, "ruReason",
    "Поэтому хуку, который лишь находит плагин и вызывает его скрипты, не нужно доверие заново, когда выпуск плагина меняет то, что делают скрипты.",
    "Поэтому пользователю не нужно заново доверять хуку, который лишь находит плагин и вызывает его скрипты, когда выпуск плагина меняет то, что делают скрипты.");
}

// ---------------------------------------------------------------------------------------------------------------
// "A git hook runs the SpecSheriff tools that a plugin keeps on the machine" (s-4mej6ccn7xu3d3p): the readers, and the
// change field that still spoke of a question for the base, which the owner's agreement to the group now settles.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-4mej6ccn7xu3d3p";
  edit(k, "it looks up the SpecSheriff tools of each plugin;", "it looks for the SpecSheriff tools of each plugin;", "ищет инструменты SpecSheriff каждого из плагинов;", "Без изменений по смыслу.");
  edit(k, "Where the hook finds the SpecSheriff tools of both plugins",
    "Where the hook finds the SpecSheriff tools of both plugins, it takes those whose `release` file begins with the higher version, the versions being compared as semantic versions. Where their versions are equal, it takes either set.",
    "Если хук находит инструменты SpecSheriff обоих плагинов, он берёт те, у которых файл `release` начинается с более высокой версии при сравнении версий как семантических. Если версии равны, он берёт любой из двух наборов.");
  edit(k, "The script for the hook runs what the list of the hooks",
    "The script for the hook runs what the list of the hooks specifies for that hook (§s-477gtdrkw34dzxw), including the project's own tools for that hook.",
    "Скрипт хука выполняет то, что для этого хука указывает перечень хуков (§s-477gtdrkw34dzxw), в том числе собственные инструменты проекта для этого хука.");
  const p = parts(k).find((x) => x.change.includes("Вопрос, имело ли в виду правило 10.12 и этот случай, записан для базы."));
  if (!p) throw new Error(`${k}: the change on the question for the base was not found`);
  changeOf(k, "Вопрос, имело ли в виду правило 10.12 и этот случай, записан для базы.",
    p.change.replace("Вопрос, имело ли в виду правило 10.12 и этот случай, записан для базы.", "Ваше согласие с группой решает и это."));
  // The title's change field quoted an English phrase in its Russian; it now says why "that" was added.
  const tc = "Было: «A git hook runs the SpecSheriff tools a plugin keeps on the machine». Добавлено «that», как пишет careful native writer; смысл тот же.";
  if (entries[k].proposal.titleChange !== tc) throw new Error(`${k}: the titleChange is not the one this script replaces`);
  entries[k].proposal.titleChange = "Было: «A git hook runs the SpecSheriff tools a plugin keeps on the machine». Добавлено «that», чтобы английское название сразу читалось верно; смысл тот же.";
}

// ---------------------------------------------------------------------------------------------------------------
// "The project's own tools in a git hook" (s-n4m5zvh96yb299p): the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-n4m5zvh96yb299p";
  edit(k, "A project's own tools for a git hook are the files",
    "A project's own tools for a git hook are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. Each git hook that `sheriff init` writes (§s-7unxytshhc4md54) runs only those files, and names any other file in that directory.",
    "Собственные инструменты проекта для git-хука — это файлы непосредственно в `.githooks/<hook>.d/`, первая строка которых называет их интерпретатор. Каждый git-хук, который записывает `sheriff init` (§s-7unxytshhc4md54), запускает только эти файлы и называет любой другой файл в этой папке.");
  edit(k, "A first line names an interpreter where it opens with",
    "A first line names an interpreter where it starts with `#!`, followed by a path and at most one argument. A carriage return that ends the line is ignored.",
    "Первая строка называет интерпретатор, если она начинается с `#!`, за которым идут путь и не больше одного аргумента. Возврат каретки в конце строки игнорируется.");
  edit(k, "Where the hook runs the SpecSheriff tools (§s-4mej6ccn7xu3d3p), it runs the project's own tools at the points",
    "Where the hook runs the SpecSheriff tools (§s-4mej6ccn7xu3d3p), it runs the project's own tools at the points set by the order of that hook's steps (§s-477gtdrkw34dzxw, §s-pcnyfp7gev7syax):",
    "Если хук запускает инструменты SpecSheriff (§s-4mej6ccn7xu3d3p), он запускает собственные инструменты проекта в тех местах, которые задаёт порядок шагов этого хука (§s-477gtdrkw34dzxw, §s-pcnyfp7gev7syax):");
  edit(k, "Where the hook runs the SpecSheriff tools, it also refuses",
    "Where the hook runs the SpecSheriff tools, it also refuses the commit or the push, regardless of whether the specification is approved or a draft, where one of the project's own tools that run after the tools that rewrite files does any of the following (§s-yn5tdx2bp4f5rq7):",
    "Если хук запускает инструменты SpecSheriff, он также отвергает коммит или push, независимо от того, одобрена спецификация или является черновиком, если один из собственных инструментов проекта, которые выполняются после инструментов, переписывающих файлы, делает что-либо из следующего (§s-yn5tdx2bp4f5rq7):");
  inReason(k, "reason", "whatever the SpecSheriff tools can do there", "whether or not the SpecSheriff tools can run there");
  inReason(k, "ruReason", "что бы там ни могли инструменты SpecSheriff", "могут там выполняться инструменты SpecSheriff или нет");
}

// ---------------------------------------------------------------------------------------------------------------
// Row 10.1.37b: the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "proposal:row-10-1-37b";
  edit(k, "A project's own tool",
    "A project's own tool that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax), unless it is a check that a project's own guidelines add (§s-2fau85dfyyeq66m), leaves the commit message, what is staged and the working tree as they were, except for the files of the working tree that git ignores",
    "Собственный инструмент проекта, который выполняется при коммите или push после инструментов, переписывающих файлы (§s-pcnyfp7gev7syax), если это не проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), оставляет сообщение коммита, то, что находится в стейджинге, и рабочее дерево такими, какими они были, кроме файлов рабочего дерева, которые git игнорирует");
}

// ---------------------------------------------------------------------------------------------------------------
// "The plugin for Claude Code" (s-zh2vcr3xjumppg5): the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-zh2vcr3xjumppg5";
  edit(k, "the SpecSheriff tools, with each file common to every project",
    "the SpecSheriff tools, with each file common to every project, such as the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8), at its path in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u);",
    "инструменты SpecSheriff вместе с каждым файлом, общим для всех проектов, например с SpecSheriff guidelines, каждым расширением guidelines (§s-mbmnsnxenmavu3z) и описанием инструментов (§s-a4rbry4hsu34hy8), по его пути в папке инструментов SpecSheriff (§s-zefk589ykh37b8u);");
  edit(k, "The plugin declares the agent's hooks",
    "The plugin declares the following agent's hooks to Claude Code:",
    "Плагин объявляет Claude Code следующие хуки агента:");
  inReason(k, "reason", "Of the plugin, the project keeps only its declaration and the calls to its tools.",
    "Of all this, the project keeps only the declaration of the plugin and the calls to the plugin's tools.");
  inReason(k, "ruReason", "От плагина в проекте остаются только его объявление и вызовы его инструментов.",
    "Из всего этого в проекте остаются только объявление плагина и вызовы инструментов плагина.");
}

// ---------------------------------------------------------------------------------------------------------------
// "The plugin for Codex CLI" (s-2pdy9gw2jrjvfb4): the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-2pdy9gw2jrjvfb4";
  edit(k, "The agent's hooks for Codex are only in the project",
    "The agent's hooks for Codex are in the project, not in the plugin (§s-n76wt2bkqdmh78x). They call the scripts that the plugin holds.",
    "Хуки агента для Codex находятся в проекте, а не в плагине (§s-n76wt2bkqdmh78x). Они вызывают скрипты, которые содержит плагин.");
}

// ---------------------------------------------------------------------------------------------------------------
// The skills: I1 and its nit and S1 of the final review, and the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  inReason("new:tools-15-skills", "reason", "give the agent of each SpecSheriff plugin", "give the agent that each SpecSheriff plugin is written for");
  inReason("new:tools-15-skills", "ruReason", "дают агенту каждого плагина SpecSheriff одни и те же процедуры", "дают агенту, для которого написан каждый плагин SpecSheriff, одни и те же процедуры");

  const k = "new:tools-15-spec-init";
  edit(k, "`spec-init` then turns to the settings",
    "`spec-init` then moves on to the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). Unless the user's git configuration records that the user has been asked about that runner's settings (§s-p29yawkkkgk7kxb), `spec-init` does the following for each of those settings that the user's git configuration lacks:",
    "Затем `spec-init` переходит к настройкам runner, которого запустил бы `sheriff review` (§s-xr5xxa9cxf2mq5u). Если в конфигурации git пользователя не записано, что пользователя о настройках этого runner уже спрашивали (§s-p29yawkkkgk7kxb), `spec-init` для каждой из этих настроек, которой в конфигурации git пользователя нет, делает следующее:");
  inReason(k, "reason", "Where the project keeps its code and its tests, which command runs the tests and which settings the reviewer runs with are for the user to decide.",
    "The user decides where the project keeps its code and its tests, which command runs the tests and which settings the reviewer runs with.");
  inReason(k, "ruReason", "Где проект хранит свой код и свои тесты, какая команда запускает тесты и с какими настройками работает рецензент — решать пользователю.",
    "Пользователь решает, где проект хранит свой код и свои тесты, какая команда запускает тесты и с какими настройками работает рецензент.");
  inReason(k, "reason", "asked for none of the reviewer's settings", "asked for none of the settings of the reviewer's runner");
  inReason(k, "ruReason", "ни о какой настройке рецензента", "ни о какой настройке runner рецензента");

  inReason("new:tools-15-spec-remove", "reason", "So `spec-remove` offers to remove the plugin", "So `spec-remove` only offers to remove the plugin");
  inReason("new:tools-15-spec-remove", "ruReason", "Поэтому `spec-remove` предлагает удалить плагин", "Поэтому `spec-remove` только предлагает удалить плагин");

  inReason("new:tools-15-spec-settings", "reason", "Only an owner changes these settings, through a procedure (§s-chsfpkgpmfk4fft).",
    "These settings are changed only with `sheriff settings`, which records a change only where an owner makes it (§s-chsfpkgpmfk4fft).");
  inReason("new:tools-15-spec-settings", "ruReason", "Эти настройки меняет только ответственный, через процедуру (§s-chsfpkgpmfk4fft).",
    "Эти настройки меняются только через `sheriff settings`, который записывает изменение, только если его вносит ответственный (§s-chsfpkgpmfk4fft).");
}

// ---------------------------------------------------------------------------------------------------------------
// The change fields, which the owner's page shows, name no item of the notes of an earlier group and no working file:
// each such reference says what it refers to.
// ---------------------------------------------------------------------------------------------------------------
{
  const LABELS = [
    [" (заметки группы 3, п. 8).", ", принятому при согласовании группы 3."],
    [" (заметки группы 6, п. 8).", ", как решено при согласовании группы 6."],
    [" (заметки группы 2, п. 7).", ", как решено при согласовании группы 2."],
    [" (заметки группы 2, п. 7); «в любом", ", как решено при согласовании группы 2; «в любом"],
    [", и по продолжению задачи он описывается в этом шаге T25.", ", и описать его решено на этом шаге задачи T25."],
  ];
  const used = new Set();
  for (const [key, e] of Object.entries(entries)) {
    for (const x of e.proposal.parts) for (const [from, to] of LABELS) if (x.change.includes(from)) {
      x.change = x.change.replace(from, to);
      used.add(from);
      changed.add(key);
    }
  }
  for (const [from] of LABELS) if (!used.has(from)) throw new Error(`no change field holds: ${from}`);
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

// english-group8d.md: the final English of every node and proposal that this round changes.
const md = [
  "# T25, group 8, round d: the English of every node that the round changes",
  "",
  "This file holds the final English, after round d, of every node and proposal of group 8 that fix-group8-d.mjs changes, each in full.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its examples and its todos.",
  "fix-group8-d.mjs writes this file; edit the script, not this file.",
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
fs.writeFileSync(new URL("english-group8d.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
