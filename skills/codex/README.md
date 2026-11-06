# SpecSheriff for Codex CLI

The plugin `specsheriff` carries the method into a project worked on with Codex CLI: the skills an
agent takes up, the SpecSheriff guidelines, and the SpecSheriff tools with their command `sheriff`.
The agent's hooks that check every edit stand in the project, where `spec-init` writes them; the git
hooks it sets up check every commit, whether the agent or a person makes it. What the method is and
why: [the method on one page](../../docs/README.md). The skills, the checks and what they refuse are
those of the plugin for Claude Code, whose [guide](../claude-code/README.md) describes them; this one
says what differs with Codex.

## What it needs

- Codex CLI 0.166 or later.
- git, with your email in `git config user.email`: the tools name the specification's owner by it.
- Node 24 or later on the `PATH`, and `sh`, which Git for Windows brings on Windows. The hooks
  refuse to run on an older Node and say so.

## Installing it

```sh
codex plugin marketplace add non4me/SpecSheriff@release
codex plugin add specsheriff@specsheriff-marketplace
```

The branch `release` holds only releases, so a machine never reads the work in progress on `main`.
Codex installs a plugin for the user who adds it, never one a project declares, so each person
working on a project installs it on their machine.

## Setting a project up: the skill `spec-init`

**When.** Once, when a repository takes up the method, before anything is written into its
specification. Ask the agent to set the repository up for SpecSheriff.

**What it changes.** `sheriff init --agent codex` writes the git hooks into `.githooks/` and turns
them on; writes the agent's hooks for Codex into `.codex/hooks.json`, beside any hook already there;
has git merge `specs/_approvals.jsonl` by union, by a line of `.gitattributes`, so that the approvals
two branches record merge without a conflict; writes `sheriff.config.json`; and writes `specs/_guidelines/project.json`, naming you as the
specification's owner. The specification is a draft until its owners approve the rule "The specification is
approved" that `project.json` holds, by `sheriff approve <sid>`: at once where the repository holds no
code yet, and otherwise once every symbol and every test carries its SpecTag. It replaces no file that differs from what it would write, naming each one. The agent then commits what
init wrote. Codex's sandbox lets nothing write into `.codex/` or git's index, so the agent asks you
to let `sheriff init` and the commit run outside it.

**The agent's hooks.** One runs when a session starts, one before an edit made with `apply_patch`,
and one after such an edit or a shell command. Each only looks for this plugin in Codex's cache and
calls its script, so Codex asks you once to trust the project and each hook, and again only when a
release changes that lookup. Where the plugin is not installed, the hooks do nothing.

**For everyone else.** A teammate who clones the repository installs the plugin, opens Codex in it
and trusts the project and its hooks. The first session turns the git hooks on.

## Moving between Claude Code and Codex

A project set up for one agent is set up for the other by running `spec-init` in it: the git hooks
are the same, and each agent's own declarations are added beside the other's. Where a machine has
both plugins, the git hooks run the tools of the newer release. The reviewer at each commit is run by
the agent whose plugin the git hooks take, unless `review.runner` in `sheriff.config.json` names one
for everyone.

## The reviewer

At each commit that changes code, the commit-msg hook asks an independent reviewer whether the code
does only what its rules say. With this plugin it runs `codex exec` in an empty folder, with a Codex
home of its own made for the run that holds a copy of your sign-in and nothing else: no settings,
instructions, skills or hooks of yours reach it, its tools are turned off, and it may write nothing.

The skills work in your session, at the model and the effort you choose there. The reviewer runs
outside it, at your cost, at the settings in your global git configuration:

| Setting | Default |
|---|---|
| `specsheriff.review.codexModel` | empty: the model Codex chooses for your account |
| `specsheriff.review.codexEffort` | `high` |

Codex asks nothing of a plugin it installs, so the first session in a project taking the method
asks you once, through the agent, and writes what you answer; `spec-init` asks where that session has
not. A setting you have not confirmed runs at its default, and every review held so says which and
how to confirm it, as `git config --global specsheriff.review.codexEffort high`.

## Taking SpecSheriff out: the skill `spec-remove`

`sheriff remove` takes out of the repository what `sheriff init` writes for either agent, and keeps
`specs/`; the skill then offers to remove the plugin from the machine:

```sh
codex plugin remove specsheriff@specsheriff-marketplace
```

Removing the plugin alone leaves no hook failing: the agent's hooks do nothing without it, and a git
hook that finds the tools of no plugin still runs the project's own tools, lets the commit through
unless one of them fails, and says that no check of SpecSheriff ran; the hooks stay on.

## `sheriff` in a terminal

The skills and the hooks run `sheriff` themselves. In a terminal it runs from the plugin in Codex's
cache, `<version>` being the one installed:

```sh
node ~/.codex/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/dist/cli.js <command>
```

## Updates

`codex plugin marketplace upgrade specsheriff-marketplace` takes a new release; Codex keeps only the
version installed last.

From 0.6.0 a node's status is `draft` or `approved`, a part may name several `owners`, and
`sheriff approve` replaces `sheriff confirm`. The first `sheriff reindex` of 0.6.0 rewrites what an
earlier release wrote — `""` and `checked`, `owner`, `specs/_confirmations.jsonl` — and keeps every
approval; it names each file it writes, for you to commit. A project's own check that reads `owner`
from `sheriff model` reads `owners`, a list, from then on. Ask the agent to set the repository up once more, through
`spec-init`: `sheriff init --agent codex` then has git merge `specs/_approvals.jsonl` by union, so
that the approvals two branches record merge without a conflict.
