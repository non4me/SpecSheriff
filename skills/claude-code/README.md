# SpecSheriff for Claude Code

The plugin `specsheriff` carries the method into a project: the skills an agent takes up, the
agent's hooks that check every edit, the SpecSheriff guidelines, and the SpecSheriff tools with
their command `sheriff`. The git hooks it sets up check every commit, whether the agent or a person
makes it. What the method is and why: [the method on one page](../../docs/README.md). A project set
up and built with it from the start: [the saloon](https://github.com/non4me/specsheriff-saloon).

## What it needs

- Claude Code.
- git, with your email in `git config user.email`: the tools name the specification's owner by it.
- Node.js 24 or later on the `PATH`. The hooks refuse to run on an older one and say so.

## Installing it

```sh
claude plugin marketplace add non4me/SpecSheriff#release
claude plugin install specsheriff@specsheriff-marketplace
```

The branch `release` holds only releases, so a machine never reads the work in progress on `main`.
In a session, `/plugin` does the same. From a private fork or mirror, git must already be able to
read the repository with a credential it stores, which the background updates use too; a
`GITHUB_TOKEN` alone does nothing for them.

## Setting a project up: the skill `spec-init`

**When.** Once, when a repository takes up the method, before anything is written into its
specification. Ask the agent to set the repository up for SpecSheriff.

**What it asks.** Where the system's code lives, where its tests live, and which command runs the
tests. The code and the tests are named by glob patterns of files, such as `src/**/*.ts` and
`test/**/*.test.ts`: a folder's name alone matches no file inside it. A file neither pattern names is
read for nothing, which is how the repository's own scripts and configuration stay exempt from SpecTags.

**What it changes.** `sheriff init` writes the git hooks into `.githooks/` and turns them on;
declares the marketplace and the plugin in `.claude/settings.json`, with automatic updates on; has
git merge `specs/_approvals.jsonl` by union, by a line of `.gitattributes`, so that the approvals
two branches record merge without a conflict; writes `sheriff.config.json`; and writes `specs/_guidelines/project.json`, the project's own
guidelines, naming you as the specification's owner. The specification is a draft until its owners approve the rule "The specification is
approved" that `project.json` holds, by `sheriff approve <sid>`: at once where the repository holds no
code yet, and otherwise once every symbol and every test carries its SpecTag. It replaces a git hook or a declaration an earlier release of it wrote,
naming each, and no other file that differs from what it would write: it names each one, and the
skill shows you how it differs. The agent then commits what init wrote. When a session starts, the
plugin names each git hook an earlier release wrote, so that you run `spec-init` again.

**For everyone else.** A teammate who clones the repository and opens Claude Code in it is offered
the marketplace and the plugin once they trust the folder. The first session on a machine copies the
tools to where the git hooks find them and turns the hooks on. A git hook that finds the tools of no
plugin on the machine still runs the project's own tools, lets the commit through unless one of them
fails, and says that no check of SpecSheriff ran; the hooks stay on.

## The reviewer's model and effort

The skills work in your session, at the model and the effort you choose there; the plugin sets
neither. The one run outside your session is the independent reviewer, at every commit that changes
code, and you pay for it. Claude Code asks you for its settings once, when it enables the plugin, as
the plugin's options; the defaults are named in each and set for none:

| Option | Default | Kept in your git configuration as |
|---|---|---|
| Reviewer's model | `opus` | `specsheriff.review.claudeModel` |
| Reviewer's fallback model | `sonnet` | `specsheriff.review.claudeFallbackModel` |
| Reviewer's reasoning effort | `high` | `specsheriff.review.claudeEffort` |

`claude plugin install` in a terminal asks for none of them: give them there, as

```sh
claude plugin install specsheriff@specsheriff-marketplace --config claudeModel=opus --config claudeFallbackModel=sonnet --config claudeEffort=high
```

or later in a session by `/plugin configure specsheriff@specsheriff-marketplace`. The session start
writes what you gave into your global git configuration, where the git hooks read it, and writes it
again when you change an option in `/config`. Where you gave none, the first session in a project
taking the method asks you once, through the agent.
A setting you have not confirmed runs at its default, and every review held so says which and how to
confirm it.

## Moving between Claude Code and Codex CLI

The method has a plugin for each agent, installed and updated by each on its own; the plugin for
Codex CLI has [its own guide](../codex/README.md). A project set up for one agent is set up for the
other by running `spec-init` there: the git hooks are the same, and each agent's declarations are
added beside the other's. Where a machine has both plugins, the git hooks run the tools of the newer
release. The reviewer is run by the agent whose plugin runs the git hooks, unless `review.runner` in
`sheriff.config.json` names one for everyone.

## Taking SpecSheriff out: the skill `spec-remove`

`sheriff remove` takes out of the repository what `sheriff init` writes, for either agent: the git
hooks, the declarations, the line of `.gitattributes`, `core.hooksPath` and `sheriff.config.json`. It keeps `specs/`, which is the
project's own, and each hook or declaration that differs from what init writes, naming each. It stages
nothing; the agent commits it once you agree, and then offers to remove the plugin from the machine:

```sh
claude plugin uninstall specsheriff@specsheriff-marketplace
```

Removing the plugin alone leaves no hook failing: a git hook that finds the tools of no plugin lets
the commit through, as above.

## The other skills

### `spec` — the guidelines as they stand

**When.** The agent takes it before it writes or changes a node, a test or code bound to the
specification, and before it answers how the specification works. Ask it about the guidelines, or
about any rule, and it takes this skill.

**What it asks.** Nothing. It prints the guidelines — the SpecSheriff guidelines and the project's
own — with every node's wording and links, and works by them.

**What it changes.** Nothing.

### `spec-review` — working on the specification with its owners

**When.** Whenever a node is drafted, changed or put to an owner, and whenever an owner reads a part
of the specification. Ask for a new rule in your own words, and the agent drafts it by this skill.

**What it asks.** Whether you approve a node, one node at a time, shown in full: its title, its location
and sid, its text and its reason, with the changes marked. Before it shows you a node, another agent
that did not write it looks for what is wrong with it; a doubt that would change what the node states
comes to you with its reason. Answer with a plain "ok": a reply that asks a question
approves nothing.

**What it changes.** The node, written as a draft; on your approval, `sheriff approve` records it
under your git email and marks the node approved. A node is implemented only once approved. A
section's and a domain's header's status nobody approves: it is built from the nodes under them,
approved once all of them are. A decision goes to the node it settled, work put off to its todos.

### `spec-adopt` — bringing existing documents in

**When.** When a project takes up the method with a specification, requirements or design notes it
already has.

**What it asks.** Where the documentation is, then which documents to bring in and into which part of
the specification — a domain, the contracts, the technical appendix, or the project's own
guidelines.

**What it changes.** It writes each document into nodes exactly as it reads, word for word, and
deletes the originals in the same commit, so that no second version of the rules remains. It moves
every citation onto a sid. Then it goes over the nodes with you by `spec-review`, and once a part is
approved, binds its code and tests: a SpecTag on every symbol and on every test.

## What the checks refuse

**At every edit the agent makes.** Before an edit, `sheriff guard` judges it: it refuses an edit that adds
code whose rule has no test yet, since the test is written first, and an edit that would leave a node
approved with a wording that no approval records. After an edit that changes a file, the specification is reindexed and the
generated types are written. Where the project has chosen the Views extension, the readable export and
the map are written too. Then `sheriff validate`, `binding` and `citations` run, and the agent is
given what they refuse and fixes it.

**At every commit, whoever makes it.**

- `pre-commit` checks the commit being made. First, the project's own tools that rewrite files run,
  and `sheriff types` writes the types generated from the RecordTypes. The project's other tools run
  next. Then `sheriff validate` checks the specification on its own. Once the specification passes the check of its keys and the
  validation against its schema, `sheriff binding` checks the specification against the code, and `sheriff citations` the citations
  outside it.
- `commit-msg` checks that a commit changing code names every approved rule that the SpecTags on its
  changed symbols name (`sheriff commit-message`). Then an independent reviewer makes the judgements
  that no check can make (`sheriff review`). The reviewer is Claude Code, run with no tools and no
  settings and given only the change and the rules that bear on it; with the plugin for Codex CLI, it is
  Codex, run the same way. It judges whether the code does what its rules say and nothing that they do
  not say, and whether each comment that the commit adds or changes agrees with the code and its rules.
  It also judges a commit message's statement that a rule's implementation needs no change, and a node
  of the technical appendix that the commit approves. A finding about a comment is only a warning.
- `pre-push` runs the project's own tools for that hook. Where the project's own guidelines name a
  push as the moment at which the tests run, it also runs the tests with the command that
  `sheriff.config.json` names. Before that, it refuses the push if the working tree differs from the
  commits being tested.
  For a ref whose commit leaves the specification a draft, it runs no test, and says why.

**What a refusal means**, for the ones met most:

| The refusal | What it means |
|---|---|
| `src/greet.js:1: greet carries no SpecTag` | Every symbol names the rule it implements by its SpecTag, `@spec <sid>`, in the comment above it, or says `@spec none` and why it implements none. |
| a test carries no SpecTag | A test opens its name with the SpecTag of the rule it is written from, `test("@spec <sid> …")`; in Python it carries the mark `@pytest.mark.spec("@spec <sid>")`. |
| a test carries the bare sid | The form 0.4.0 read: `sheriff reindex` writes the SpecTag of every such test. |
| a SpecTag names a draft node | Nothing unapproved is implemented: have the rule approved first. |
| a rule whose code changes has no test | Write the test first; it carries the rule's SpecTag. |
| the message names no node | Name in the commit message the sid of every approved rule the changed code serves. |
| the reviewer names a node and a line | The code does something its rules do not say. Change the code, or change the rule first, with its owner. `@spec none` on code that behaves is refused here. |
| an approved node holds no approval | Its wording changed after it was approved; it needs one of its owners' approval again. |
| puts the specification back to draft without a withdrawal | Only one of the specification's owners puts it back, by `sheriff approve --withdraw <sid>` of the rule "The specification is approved". |

Every refusal names the file and the line, or the node, it concerns; `sheriff show <sid>` prints a
node with its links.

## An approved rule is implemented

Every approved rule of the project's specification is implemented: a symbol carries its SpecTag, and
a test carries it too and passes. A SpecTag or a test on a rule of the technical appendix implementing
it counts for it. `sheriff binding` reports each rule that lacks one, naming what it lacks; the report
stops no commit, and a release of the SpecSheriff tools is made only when it is empty for their own
guidelines.

A rule that is not implemented in code — one a process or a person carries out — is exempted by a
node of the project's own guidelines, `specs/_guidelines/project.json`, with a link of type
`exempts` to the rule, or to a section to exempt every rule under it, and the reason in its own text.

## `sheriff` in a terminal

The skills and the agent's hooks run `sheriff` themselves. In a terminal, you run it from the copy
that the plugin keeps on the machine, in the directory that your git configuration names in
`specsheriff.claudePluginData`:

```sh
node "$(git config --global --get specsheriff.claudePluginData)/dist/cli.js" <command>
```

An alias makes it `sheriff <command>`. `sheriff show <sid>` prints a node with its links,
`sheriff binding` what the code and the tests lack, `sheriff guide` the guidelines whole, and
`sheriff approve <sid>` records an owner's approval.

Where the project has chosen the Views or the Domains extension, `sheriff view --detach` starts the
viewer of the specification in the background. The viewer is a web page that is redrawn after each change to the
specification. It is served at `http://127.0.0.1:5278/`, or at the first free port above 5278.
`sheriff view --stop` stops it. You can also ask the agent to start the viewer.

## Updates

A project's settings turn automatic updates on. Claude Code then takes a new release in the
background, within ten minutes of the first message of an interactive session; the running session
keeps the version it loaded, and the next session runs the new one, the git hooks included. `claude plugin update
specsheriff@specsheriff-marketplace` takes it at once.

As of 0.7.0, the first `sheriff reindex` rewrites what an earlier release wrote, keeps every
approval in force, and names each file that it rewrites, for you to commit. It makes these changes:
- the kind of node `rule` becomes `TextRule`, `record` and `recordType` become `RecordType`, and
  `domain` becomes `header`;
- the key `rationale` becomes `reason`;
- a RecordType's fields become its `schema`, written in JSON Schema;
- `declaredIn`, which says where a list is declared, becomes `jsonSchema` or `valueList`;
- the rule of `project.json` that set the specification's approval status becomes an entry in
  `sheriff.config.json`;
- `@spec ` is put before each sid that opens a test's name without it.

Four commands are renamed: `sheriff message` is now `sheriff commit-message`, `sheriff model` is
`sheriff json`, `sheriff export` is `sheriff markdown`, and `sheriff render` is `sheriff map`.
`sheriff markdown` and `sheriff map` run only where the project has chosen the Views extension.
`sheriff map` writes the map into `specs/_map/`, and `sheriff reindex` removes `specs/_viewer/`, the
folder into which an earlier release wrote it. The new command `sheriff view` serves the viewer of
the specification, which also draws the diagram of the domains. An
owner changes the specification's approval status, its `strict` flag and the chosen extensions with
`sheriff settings`, or through the skill `spec-settings`. Where the specification holds a node of a
kind that an extension adds, such as a domain's header or a RecordType, `sheriff reindex` names that
extension, and an owner chooses it. A project's own check that reads `sheriff json` must from then on
read `reason` and the new names of the kinds. Ask the agent to run `spec-init` again: `sheriff init`
replaces the git hooks that an earlier release wrote.

As of 0.6.0, a node's approval status is `draft` or `approved`, a section or a domain's header may name several `owners`, and
`sheriff approve` replaces `sheriff confirm`. The first `sheriff reindex` run with 0.6.0 rewrites what an
earlier release wrote — `""` and `checked`, `owner`, `specs/_confirmations.jsonl` — and keeps every
approval; it names each file it writes, for you to commit. A project's own check that reads `owner`
from `sheriff json` must from then on read `owners`, a list. Ask the agent to set up the repository again, through
`spec-init`: `sheriff init` then has git merge `specs/_approvals.jsonl` by union, so that the
approvals that two branches record merge without a conflict.

## The plugin for pytest

A Python project's tests declare their SpecTag by `@pytest.mark.spec("@spec s-…")`, which the plugin for
pytest registers, opening the name a run reports with it. It is installed in the project's test environment from the same releases:

```sh
pip install "pytest-specsheriff @ git+https://github.com/non4me/SpecSheriff@release#subdirectory=skills/pytest-specsheriff"
```

The same command with `--upgrade` takes a later release.

## Running the checks in CI

The git hooks hold every machine where the plugin is installed. A team that needs the same gate to
hold for a branch whatever machine it came from runs the same hooks in CI, reading the whole branch as
the commit being made:

```sh
git clone --depth 1 --branch v0.6.0 https://github.com/non4me/SpecSheriff "$RUNNER_TEMP/specsheriff"
hooks="$RUNNER_TEMP/specsheriff/skills/claude-code/tools/hooks"
base=$(git merge-base HEAD origin/main)
git log --format=%B "$base..HEAD" > "$RUNNER_TEMP/message"
git reset --soft "$base"
sh "$hooks/pre-commit"
sh "$hooks/commit-msg" "$RUNNER_TEMP/message"
sh -c "$(node -p "require('./sheriff.config.json').testCommand")"
```

The job's clone holds the history of the branch and of `main`, and the branch's commit messages
together stand as the message of that one commit. The reviewer runs Claude Code, so the job needs it
installed and signed in. The release is pinned by its tag, moved when the project updates.
