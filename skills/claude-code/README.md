# SpecSheriff for Claude Code

The plugin `specsheriff` carries the method into a project: the skills an agent takes up, the
agent's hooks that check every edit, the SpecSheriff guidelines, and the SpecSheriff tools with
their command `sheriff`. The git hooks it sets up check every commit, whether the agent or a person
makes it. What the method is and why: [the method on one page](../../docs/README.md).

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
read for nothing, which is how the repository's own scripts and configuration stay exempt from tags.

**What it changes.** `sheriff init` writes the git hooks into `.githooks/` and turns them on;
declares the marketplace and the plugin in `.claude/settings.json`, with automatic updates on;
writes `sheriff.config.json`; and writes `specs/_guidelines/project.json`, the project's own
guidelines, naming the owner. It replaces no file that differs from what it would write: it names
each one, and the skill shows you how it differs. The agent then commits what init wrote.

**For everyone else.** A teammate who clones the repository and opens Claude Code in it is offered
the marketplace and the plugin once they trust the folder. The first session on a machine copies the
tools to where the git hooks find them and turns the hooks on; until then a commit is refused with a
message saying so.

## The other skills

### `spec` — the guidelines as they stand

**When.** The agent takes it before it writes or changes a node, a test or code bound to the
specification, and before it answers how the specification works. Ask it about the guidelines, or
about any rule, and it takes this skill.

**What it asks.** Nothing. It prints the guidelines — the SpecSheriff guidelines and the project's
own — with every node's sid, text and reason, and works by them.

**What it changes.** Nothing.

### `spec-review` — working on the specification with its owner

**When.** Whenever a node is drafted, changed or put to the owner, and whenever the owner reads a part
of the specification. Ask for a new rule in your own words, and the agent drafts it by this skill.

**What it asks.** Whether you confirm a node, one node at a time, shown whole: its title, its address
and sid, its text and its reason, with what changed marked. Before it shows you a node, another agent
that did not write it looks for what is wrong with it; a doubt that would change what the node states
comes to you with its reason. Answer with a plain confirmation, such as "ok": a reply that asks
something confirms nothing.

**What it changes.** The node, written with its status empty; on your confirmation, `sheriff confirm`
records it under your git email and marks the node checked. A node is implemented only once checked.
A decision goes to the node it settled, work put off to its todos.

### `spec-adopt` — bringing existing documents in

**When.** When a project takes up the method with a specification, requirements or design notes it
already has.

**What it asks.** Where the documentation is, then which documents to bring in and into which part of
the specification — a domain, the contracts, the technical appendix, or the project's own
guidelines.

**What it changes.** It writes each document into nodes exactly as it reads, word for word, and
deletes the originals in the same commit, so that no second version of the rules remains. It moves
every citation onto a sid. Then it goes over the nodes with you by `spec-review`, and once a part is
confirmed, binds its code and tests: a tag on every symbol, a sid on every test.

## What the checks refuse

**At every edit the agent makes.** Before an edit, `sheriff guard` judges it: it refuses code whose
rule has no test yet, since the test is written first, and a node left checked over a wording its
owner never confirmed. After every edit, the specification is reindexed, the readable export, the map
and the generated types are rebuilt, and `sheriff validate`, `binding` and `citations` run; the agent
is handed what they refuse and fixes it.

**At every commit, whoever makes it.**

- `pre-commit` checks the commit being made: the specification on its own (`sheriff validate`), the
  specification against the code (`sheriff binding`), and the citations outside it
  (`sheriff citations`); last, `sheriff types` writes the types generated from the data records.
- `commit-msg` checks that a commit changing code names every checked rule its changed symbols' tags
  name (`sheriff message`), and then an independent reviewer — Claude Code run with no tools and no
  settings, given only the change and the text of those rules — judges whether the code does what
  they say and nothing they do not (`sheriff review`).
- `pre-push` runs the tests by the command `sheriff.config.json` names, after refusing a working tree
  that differs from what the push sends.

**What a refusal means**, for the ones met most:

| The refusal | What it means |
|---|---|
| `src/greet.js:1: greet carries no tag` | Every symbol names the rule it implements by `@spec <sid>` in the comment above it, or says `@spec none` and why it implements none. |
| a tag names a node that is not checked | Nothing unconfirmed is implemented: have the rule confirmed first. |
| a rule whose code changes has no test | Write the test first; it carries the rule's sid. |
| the message names no node | Name in the commit message the sid of every checked rule the changed code serves. |
| the reviewer names a node and a line | The code does something its rules do not say. Change the code, or change the rule first, with its owner. `@spec none` on code that behaves is refused here. |
| a checked node holds no confirmation | Its wording changed after it was confirmed; it needs its owner's confirmation again. |

Every refusal names the file and the line, or the node, it concerns; `sheriff show <sid>` prints a
node with its links.

## A checked rule is implemented

Every checked rule of the project's specification is implemented: a symbol carries its tag, and a
test carries its sid and passes. A tag or a test on a rule of the technical appendix implementing
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
`sheriff confirm <sid>` records the owner's confirmation.

## Updates

A project's settings turn automatic updates on. Claude Code then takes a new release in the
background, within ten minutes of the first message of an interactive session; the running session
keeps the version it loaded, and the next session runs the new one, the git hooks included. `claude plugin update
specsheriff@specsheriff-marketplace` takes it at once.

## The plugin for pytest

A Python project's tests declare their sid by `@pytest.mark.spec("s-…")`, which the plugin for pytest
registers. It is installed in the project's test environment from the same releases:

```sh
pip install "pytest-specsheriff @ git+https://github.com/non4me/SpecSheriff@release#subdirectory=skills/pytest-specsheriff"
```

The same command with `--upgrade` takes a later release.

## Running the checks in CI

The git hooks hold every machine where the plugin is installed. A team that needs the same gate to
hold for a branch whatever machine it came from runs the same hooks in CI, reading the whole branch as
the commit being made:

```sh
git clone --depth 1 --branch v0.1.0 https://github.com/non4me/SpecSheriff "$RUNNER_TEMP/specsheriff"
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
