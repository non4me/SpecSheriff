# Group 6 drafts for the review (generated 2026-11-25T00:40:05.368Z)

## Setting a repository up and taking SpecSheriff out of it | key s-7unxytshhc4md54 | sid s-7unxytshhc4md54 | tools 3

### Text

`sheriff init` sets a repository up for the SpecSheriff tools. For the git hooks, it does the following:

it writes them into `.githooks/` (§s-4mej6ccn7xu3d3p);

it stages, with the executable mode 100755, each hook there that holds what it would write, unless git's index already holds that hook with that mode, and names each hook that it stages;

where it cannot stage a hook, it names the hook and says how to stage it as executable;

it turns the hooks on by setting git's `core.hooksPath` to `.githooks`.

`sheriff init` stages only the git hooks.

`sheriff init` writes the following for the agent that the option `--agent` names, `claude` or `codex`, or for `claude` where the option is not given:

for `claude`, it adds the marketplace and the plugin to `.claude/settings.json` as a project declares them (§s-zh2vcr3xjumppg5), keeping any other key there;

for `codex`, it writes the agent's hooks for Codex into `.codex/hooks.json` (§s-n76wt2bkqdmh78x), keeping any other hook there.

`sheriff init` refuses any other agent name, naming the agents that it supports.

`sheriff init` configures git to merge `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) by union. What `sheriff init` does depends on the state that `git check-attr merge specs/_approvals.jsonl` reports for the `merge` attribute of that file:

where git reports the attribute as unspecified, `sheriff init` appends the line `specs/_approvals.jsonl merge=union` to the `.gitattributes` file at the repository's root, creating that file where it is missing;

where git reports `union`, `sheriff init` appends nothing;

where git reports any other state of that attribute, `sheriff init` appends nothing and names that state.

Outside a git repository, `sheriff init` appends the line `specs/_approvals.jsonl merge=union` to `.gitattributes` unless the file already holds it, spacing and line endings aside. The appended line starts on a line of its own and ends with the same line ending as the other lines of the file.

`sheriff init` writes each of the following files where it is missing (§s-zefk589ykh37b8u):

a `sheriff.config.json` that holds only `code` and `tests`, each an empty list of glob patterns;

a `specs/_guidelines/project.json` whose top node is a section that names, as the specification's owner (§s-t9j29hppag2nren), the email address set in git's configuration.

The top node of `project.json` holds, as a draft, a rule with a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). The rule's title is “When the tests run”. Its text is “The tests run before every push.” Its reason is “Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.”

The rule's `TextRule.list` (§s-eferktypcj7njt5) lists `push` (§s-b6qdtghnyha3fhk). The list's `of` is “the moments at which the tests run”.

Where git's configuration sets no email address, `sheriff init` writes no `project.json` and says how to set that address.

Where `sheriff.config.json` holds an empty list of glob patterns for code or for tests, or holds no `testCommand`, `sheriff init` says how to set what the file lacks (§s-b6qdtghnyha3fhk).

`sheriff init` replaces a hook, or a declaration that it writes into `.claude/settings.json` or `.codex/hooks.json`, where that hook or declaration holds what an earlier release of `sheriff init` wrote, and names each. It leaves as it is any other hook, declaration or file that differs from what it would write, and names each. So `sheriff init`, when run again, changes nothing (§s-jsqxdx47wkkj7gp).

A hook or a declaration holds what an earlier release wrote where, line endings aside, it equals one of the texts that the earlier releases wrote. The SpecSheriff tools store those texts.

Where the repository's hooks ran from elsewhere before, from `.git/hooks/` or from another folder that `core.hooksPath` named, `sheriff init` names each hook found there, apart from git's samples. It says that none of them runs until it is moved into `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).

`sheriff remove` takes out of a repository what `sheriff init` writes outside `specs/`, for each agent that `sheriff init` supports:

each git hook, the marketplace and the plugin in `.claude/settings.json`, and the agent's hooks for Codex in `.codex/hooks.json`, where each holds what `sheriff init` writes now or wrote in an earlier release;

each line of the `.gitattributes` file at the repository's root that matches the line that `sheriff init` appends there, spacing and line endings aside;

`core.hooksPath`, where it names `.githooks`;

a key of `.claude/settings.json` or of `.codex/hooks.json` that is left holding nothing, and either file where it is left holding no key;

`.gitattributes`, where it is left holding nothing but blank lines;

`.githooks/`, `.claude/` or `.codex/`, where it is left empty;

`sheriff.config.json`, whatever it holds, including the entries of the settings that only an owner of the specification changes (§s-d3nkw9b6mn98vuw).

`sheriff remove` leaves each hook and declaration that differs from every text that `sheriff init` writes now or wrote in an earlier release, and names it. It leaves `specs/` and the bindings file (§s-trwczfskj5zmuft) as they are, and names each of them. It names each folder `.githooks/<hook>.d/` that it leaves, and says that the project's own tools in it (§s-n4m5zvh96yb299p) no longer run.

`sheriff remove` stages nothing. Run again, it changes nothing.

### Reason

Adopting the method and removing it each take one command, so that nobody has to know every file and setting that the SpecSheriff tools need. What `sheriff init` writes reaches every clone through git, so the checks run the same way for everyone who works on the project (§s-epaw9sgyaajzn8g). Each command changes only what serves the SpecSheriff tools, and leaves the rest of the repository to the project.

### Examples

```json
[
  {
    "en": "Someone runs `sheriff init` in a project on Windows. Git on Windows does not read the executable mode from a file, so `sheriff init` stages with the mode 100755 each hook that it wrote and names it. The most likely mistake is to make the hooks executable on disk only: git on Windows does not record that mode, so a clone on Linux or macOS runs none of the hooks.",
    "ru": "Кто-то запускает `sheriff init` в проекте на Windows. Git на Windows не читает исполняемый режим из файла, поэтому `sheriff init` добавляет в стейджинг с режимом 100755 каждый записанный им хук и называет его. Самая вероятная ошибка — сделать хуки исполняемыми только на диске: git на Windows этот режим не записывает, и клон на Linux или macOS не запускает ни одного хука."
  },
  {
    "en": "Two branches each approve a node, and each appends a line to `specs/_approvals.jsonl`. Because `sheriff init` configured git to merge that file by union, the merge keeps both lines and puts the line from the branch being merged after the line from the current branch. Without the union merge, git raises a conflict in that file. The most likely mistake is to resolve that conflict by keeping the lines of one branch, which loses the approval made on the other branch.",
    "ru": "Две ветки одобряют по узлу, и каждая добавляет строку в `specs/_approvals.jsonl`. Поскольку `sheriff init` настроил git так, чтобы он сливал этот файл по union, слияние сохраняет обе строки и ставит строку вливаемой ветки после строки текущей ветки. Без слияния по union git сообщает о конфликте в этом файле. Самая вероятная ошибка — разрешить этот конфликт, оставив строки одной ветки: так теряется одобрение, сделанное в другой ветке."
  },
  {
    "en": "The owner runs `sheriff init` in a new repository. `project.json` then holds a section that names the owner and holds, as a draft, the rule on when the tests run. So the first commit passes the check that every section contains a rule (§s-exxuckgakfxkycp). The most likely mistake is to write the section without a rule, so that the check refuses the first commit.",
    "ru": "Ответственный запускает `sheriff init` в новом репозитории. Тогда `project.json` содержит раздел, который называет ответственного и содержит черновик правила о том, когда запускаются тесты. Поэтому первый коммит проходит проверку того, что каждый раздел содержит правило (§s-exxuckgakfxkycp). Самая вероятная ошибка — записать раздел без правила: тогда эта проверка отвергает первый коммит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "implements",
    "to": "s-jsqxdx47wkkj7gp"
  },
  {
    "type": "implements",
    "to": "s-6sk8uet75dmq5qz"
  },
  {
    "type": "cites",
    "to": "s-4mej6ccn7xu3d3p"
  },
  {
    "type": "cites",
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-n76wt2bkqdmh78x"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-t9j29hppag2nren"
  },
  {
    "type": "cites",
    "to": "s-x8uzc8z44pwtd3h"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-b6qdtghnyha3fhk"
  },
  {
    "type": "cites",
    "to": "s-n4m5zvh96yb299p"
  },
  {
    "type": "cites",
    "to": "s-d3nkw9b6mn98vuw"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-exxuckgakfxkycp"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-pcnyfp7gev7syax"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  }
]
```

### The current node

Title: Setting a repository up and taking SpecSheriff out of it

`sheriff init` sets a repository up for the SpecSheriff tools. With the git hooks, it does the following:

- it writes them into `.githooks/` (§s-4mej6ccn7xu3d3p);
- it stages with the executable mode, 100755, each hook there that holds what it would write and that git's index does not already hold with that mode, naming each one;
- where it cannot stage a hook, it names the hook and says how to stage it executable;
- it turns the hooks on.

`sheriff init` writes for the agent the option `--agent` names, `claude` or `codex`, taking `claude` where the option is not given:

- for `claude`, it adds the marketplace and the plugin to `.claude/settings.json` as a project declares them (§s-zh2vcr3xjumppg5), keeping every other key there;
- for `codex`, it writes the agent's hooks for Codex into `.codex/hooks.json` (§s-n76wt2bkqdmh78x), keeping every other hook there.

It refuses another name, naming the two it takes.

`sheriff init` has git merge the approvals (§s-v4qus7raqnwzneb) by union. What `sheriff init` does depends on the state `git check-attr merge specs/_approvals.jsonl` reports for the approvals' merge attribute:

- where git reports the attribute unspecified, `sheriff init` appends the line `specs/_approvals.jsonl merge=union` to the `.gitattributes` at the repository's root, writing the file where it is missing;
- where git reports `union`, `sheriff init` appends nothing;
- where git reports any other state of that attribute, it appends nothing and names that state.

Outside a git repository, it appends the line unless the file holds it already, spacing and line endings aside. The appended line starts a line of its own and ends as the file's lines end.

Where they are missing, `sheriff init` writes these files:

- a `sheriff.config.json` naming no file as code or tests;
- a `specs/_guidelines/project.json`.

That `project.json` names the email git is configured with as the specification's owner. It also holds, as a draft, the rule "The specification is approved", refining §s-qzthyh7yqvfhsa2, whose text is "This project's specification is approved."

`sheriff init` replaces a hook or a declaration that holds what an earlier release of `sheriff init` wrote, naming each. It replaces no other file that differs from what it would write, and names each one instead. So, run again, it changes nothing. A hook or a declaration holds what an earlier release wrote where, line endings aside, it equals one of the texts the earlier releases wrote. The SpecSheriff tools keep those texts.

Where the repository's hooks ran from elsewhere before, from `.git/hooks/` or from another folder `core.hooksPath` named, `sheriff init` names each hook found there, git's samples aside. It says that each one no longer runs until it is moved into `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).

`sheriff remove` takes out of a repository what `sheriff init` writes outside `specs/`, for both agents:

- each git hook, the marketplace and the plugin in `.claude/settings.json` and the agent's hooks for Codex in `.codex/hooks.json`, where each holds what `sheriff init` writes now or wrote in an earlier release;
- each line of the `.gitattributes` at the repository's root that is the line `sheriff init` appends there, spacing and line endings aside;
- `core.hooksPath` where it names `.githooks`;
- a key of `.claude/settings.json` or `.codex/hooks.json` left holding nothing, and either file left holding no key;
- `.gitattributes` left holding nothing but blank lines;
- `.githooks/`, `.claude/` or `.codex/` left empty;
- `sheriff.config.json`, whatever it holds.

`sheriff remove` leaves each hook and declaration that differs, naming it. It leaves `specs/` as it is, naming it. It names each folder `.githooks/<hook>.d/` it leaves, and says that the project's own tools in it no longer run.

`sheriff remove` stages nothing. Run again, it changes nothing.

Reason: On a system whose files keep an executable bit, git runs a hook only where its file has the bit. A clone checks a file out with the mode its commit records. Where files keep the bit, git takes that mode from the file when it stages it. Where they keep none, as on Windows, git records the mode as not executable. There git runs a hook whatever its mode. So a hook set up there would reach the clones unable to run. Nothing on the machine that set it up would show it.

A mode reaches the clones only staged and committed, and git stages a mode only with the file's content. So `sheriff init` stages the hooks it holds and nothing else: what else a commit holds stays its author's choice.

Claude Code reads its plugin from `.claude/settings.json`, and Codex reads its hooks from `.codex/hooks.json`. So `sheriff init` writes for the agent the project is set up with. A project moving to another agent runs it again for that one. A hook or a declaration written by an earlier release is the tools' own, so it is replaced. One that differs otherwise was changed by hand and is the project's.

Two branches that each append a line to the approvals conflict where they are merged. The approvals keep every approval ever given (§s-v4qus7raqnwzneb), so the lines of both branches belong in the merge. Git's union merge keeps them, wherever the branch merged into holds the line `specs/_approvals.jsonl merge=union`. It suits the approvals, each of whose lines is a whole JSON object.

A union merge puts the lines of the branch being merged after those of the branch merged into. So where both branches wrote a line for one node and one wording, the line of the branch being merged decides, whatever the order they were written in. An owner who finds the result wrong approves or withdraws again after the merge.

A line removed through git can come back where another branch appended directly after it. So an approval is taken back by a withdrawal, which a merge keeps.

`sheriff init` asks git for the approvals' merge attribute, so a setting in any attributes file git reads is found. A project that set it otherwise chose that setting. Git takes, for each attribute, the last line matching a path, so a line appended after the project's would override it. `sheriff init` names the setting, since the approvals then conflict at merges.

The rule is written in every project, so that its owners approve the specification by approving the rule, with nothing to write (§s-qzthyh7yqvfhsa2). It is written as a draft, since an approval is an owner's act on reading the rule, which `sheriff init` does not perform for them (§s-67vekyup7y8smap).

`sheriff remove` takes out what `sheriff init` writes and no more. A line of `.gitattributes` equal to the one `sheriff init` writes is taken as its own, whoever wrote it, as a hook is.

`sheriff.config.json` goes whatever it holds, because a repository holding it is one the plugins act in (§s-zh2vcr3xjumppg5), and its settings serve only the tools. `specs/` stays, being the project's own content.

What `sheriff remove` takes out is in git's history, and what a commit holds stays its author's choice, so it stages nothing.

Taking up the method moves where git looks for hooks, so a hook the repository ran before stops running unless it is moved. `sheriff init` names each such hook rather than moving a file of the project. Taking the method out unsets that place again, so the project's own steps stop running with the checks.

## What `sheriff reindex` changes in what an earlier release wrote | key proposal:s-gb8s9657a65hqmv-g6 | sid s-gb8s9657a65hqmv | tools 2.3 (new)

### Text

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive (§s-f2b5zvc565s242f), it makes the following changes:

a node's key `id` becomes `location`;

a node's key `rationale` becomes `reason`;

the kinds of node `record` and `recordType` become `RecordType`;

the kind of node `rule` becomes `TextRule`;

the kind of node `domain` becomes `header`;

a node's status `""` becomes `draft`;

a node's status `checked` becomes `approved`;

a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;

a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows:

each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y);

the field's `text` becomes the property's `description`;

each field that the RecordType marks as required is listed in the schema's `required`;

a field that is required only "where it holds a value" becomes an optional property;

`unknown: "refused"` becomes `additionalProperties: false`;

the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);

`TextRule.list.declaredIn` (§s-eferktypcj7njt5) is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);

`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`, and its key `declaration` becomes `pointer`, where it points to any other place in a JSON Schema;

`TextRule.list.declaredIn` becomes `TextRule.list.valueList`, and its key `declaration` becomes `symbol`, where it names a declaration in code;

a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);

a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys.

The name of a kind of node is also renamed in each of these places:

the source of a field's values, where those values are the sids of that kind's nodes;

the `fields` of the project's extension of the schema, where the name is the key under which those `fields` add properties to that kind.

A bare sid is a word that has the form of a sid and meets one of these conditions:

it opens a test's name, followed by a space or by the end of the name;

it is the only argument of a test's mark.

`sheriff reindex` also makes the following changes:

`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`;

the key `owner` in each line of `specs/_confirmations.jsonl` becomes `by`;

where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it, and `specs/_confirmations.jsonl` is removed;

where `sheriff.config.json` holds no entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification (§s-d3nkw9b6mn98vuw);

the entry that approves the specification names the owner who last approved the rule that the entry replaces;

the rule that the entry replaces is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";

where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with the same reason if it was ever approved, and is deleted otherwise (§s-f2b5zvc565s242f);

in the run that archives or deletes such a rule, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;

the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;

in each file that `sheriff.config.json` names as tests of the system's code (§s-hheus6f395ynqvc) or of a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze), `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines (§s-mbmnsnxenmavu3z) adds, and the project has not chosen that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

When `sheriff reindex` adds the draft rule on when the tests run, it names that rule, since the SpecSheriff tools read the rule only after an owner approves it (§s-t9j29hppag2nren).

A renamed key and a renamed kind of node leave a node's fingerprint (§s-f5brvuuu6xmkj6t) unchanged, so the approval of the node's wording stays in force (§s-v4qus7raqnwzneb).

`sheriff reindex` names each file that it rewrites because an earlier release wrote or read that file differently, including the files of the specification.

### Reason

Each file and each test of a project follows the form used by the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them in a different form rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.

### Examples

```json
[
  {
    "en": "In a project that an earlier release set up, the only rule of `project.json` is an approved rule that refines the rule on the specification's approval status. `sheriff reindex` replaces that rule with an entry that approves the specification and, in the same run, adds the draft rule on when the tests run. The most likely mistake is to add that draft rule again in a later run, after the project has deleted it.",
    "ru": "В проекте, который настроил прежний выпуск, единственное правило `project.json` — одобренное правило, которое уточняет правило о статусе одобрения спецификации. `sheriff reindex` заменяет это правило записью, которая одобряет спецификацию, и в том же запуске добавляет черновик правила о том, когда запускаются тесты. Самая вероятная ошибка — добавить этот черновик снова в одном из следующих запусков, после того как проект его удалил."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-jsqxdx47wkkj7gp"
  },
  {
    "type": "implements",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "implements",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-w5wg69pvvhedsws"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-4npdup7mjkva69y"
  },
  {
    "type": "cites",
    "to": "s-bpdqd9v72wg7vsz"
  },
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-x8uzc8z44pwtd3h"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  },
  {
    "type": "cites",
    "to": "s-t9j29hppag2nren"
  },
  {
    "type": "cites",
    "to": "s-f5brvuuu6xmkj6t"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-d3nkw9b6mn98vuw"
  }
]
```

### The wording the owner agreed to (proposal:s-gb8s9657a65hqmv-g3)

Title: What `sheriff reindex` changes in what an earlier release wrote

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive, it makes the following changes:

a node's key `id` becomes `location`;

a node's key `rationale` becomes `reason`;

the kinds of node `record` and `recordType` become `RecordType`;

the kind of node `rule` becomes `TextRule`;

the kind of node `domain` becomes `header`;

a node's status `""` becomes `draft`;

a node's status `checked` becomes `approved`;

a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;

a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows:

each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y);

the field's `text` becomes the property's `description`;

each field that the RecordType marks as required is listed in the schema's `required`;

a field that is required only "where it holds a value" becomes an optional property;

`unknown: "refused"` becomes `additionalProperties: false`;

the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);

`TextRule.list.declaredIn` is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);

`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points to any other place in a JSON Schema;

`TextRule.list.declaredIn` becomes `TextRule.list.valueList` where it names a declaration in code;

a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);

a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys. A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.

A bare sid is a word that has the form of a sid and occurs in one of these places:

it opens a test's name, followed by a space or by the end of the name;

it is the only argument of the test's mark.

`sheriff reindex` also makes the following changes:

`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`;

the key `owner` in each line of `specs/_confirmations.jsonl` becomes `by`;

where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it, and `specs/_confirmations.jsonl` is removed;

until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification;

that entry names the owner who last approved that rule;

that rule is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";

the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;

in each file that `sheriff.config.json` names as tests of the system's code or of a project's own check or generator, `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines adds, and the project has yet to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

A renamed key and a renamed kind of node leave a node's fingerprint unchanged (§s-v4qus7raqnwzneb). `sheriff reindex` names each file that it changes in this way, including the files of the specification.

Reason: Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.
