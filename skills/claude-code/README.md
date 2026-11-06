# SpecSheriff for Claude Code

The plugin `specsheriff` carries the method into a project: the skills an agent takes up, the
agent's hooks that check every edit, the SpecSheriff guidelines, and the SpecSheriff tools with
their command `sheriff`. The git hooks it sets up check every commit, whether the agent or a person
makes it. What the method is and why: [the method on one page](../../docs/README.md). A project set
up and built with it from the start: [the saloon](https://github.com/non4me/specsheriff-saloon).

## What it needs

- Claude Code.
- git, with your email in `git config user.email`: the tools name the specification's owner by it.
- Node 24 or later on the `PATH`. The hooks refuse to run on an older one and say so.

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

**What it asks.** Whether you approve a node, one node at a time, shown whole: its title, its location
and sid, its text and its reason, with what changed marked. Before it shows you a node, another agent
that did not write it looks for what is wrong with it; a doubt that would change what the node states
comes to you with its reason. Answer with a plain approval, such as "ok": a reply that asks
something approves nothing.

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

**At every edit the agent makes.** Before an edit, `sheriff guard` judges it: it refuses code whose
rule has no test yet, since the test is written first, and a node left approved over a wording no
approval stands for. After every edit, the specification is reindexed, the readable export, the map
and the generated types are rebuilt, and `sheriff validate`, `binding` and `citations` run; the agent
is handed what they refuse and fixes it.

**At every commit, whoever makes it.**

- `pre-commit` checks the commit being made: the specification on its own (`sheriff validate`), the
  specification against the code (`sheriff binding`), and the citations outside it
  (`sheriff citations`); last, `sheriff types` writes the types generated from the RecordTypes.
- `commit-msg` checks that a commit changing code names every approved rule the SpecTags on its changed
  symbols name (`sheriff message`), and then an independent reviewer — Claude Code run with no tools and no
  settings, given only the change and the text of those rules — judges whether the code does what
  they say and nothing they do not (`sheriff review`). With the plugin for Codex CLI, Codex runs it
  the same way.
- `pre-push` runs the tests by the command `sheriff.config.json` names, after refusing a working tree
  that differs from what the push sends. While the specification is a draft, it runs no test and
  compares nothing, and says so.

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

The skills and the agent's hooks run `sheriff` themselves. In a terminal it runs from the copy the
plugin keeps on the machine:

```sh
node ~/.claude/plugins/data/specsheriff-specsheriff-marketplace/dist/cli.js <command>
```

An alias makes it `sheriff <command>`. `sheriff show <sid>` prints a node with its links,
`sheriff binding` what the code and the tests lack, `sheriff guide` the guidelines whole, and
`sheriff approve <sid>` records an owner's approval.

## Updates

A project's settings turn automatic updates on. Claude Code then takes a new release in the
background, within ten minutes of the first message of an interactive session; the running session
keeps the version it loaded, and the next session runs the new one, the git hooks included. `claude plugin update
specsheriff@specsheriff-marketplace` takes it at once.

From 0.6.0 a node's status is `draft` or `approved`, a part may name several `owners`, and
`sheriff approve` replaces `sheriff confirm`. The first `sheriff reindex` of 0.6.0 rewrites what an
earlier release wrote — `""` and `checked`, `owner`, `specs/_confirmations.jsonl` — and keeps every
approval; it names each file it writes, for you to commit. A project's own check that reads `owner`
from `sheriff model` reads `owners`, a list, from then on.

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
git clone --depth 1 --branch v0.5.0 https://github.com/non4me/SpecSheriff "$RUNNER_TEMP/specsheriff"
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
