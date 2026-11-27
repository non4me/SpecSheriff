# Releasing SpecSheriff, and running its plugin from this repository

What only this repository does: it is where the SpecSheriff guidelines are written and the plugin for
Claude Code is built, so it builds the plugin from its working tree and releases it. Nothing here is a
rule of the SpecSheriff guidelines, and no other project needs any of it.

## The layout

- `skills/tools/` — the SpecSheriff tools: their source, tests, the descriptions of languages,
  the git hooks' scripts in `hooks/`, the template of the hook `sheriff init` writes in `assets/`, and
  in `assets/earlier/` each text an earlier release of `sheriff init` wrote, which it replaces and
  `sheriff remove` takes out. A release that changes the git hook or an agent's hooks or declarations
  adds the text it replaces there first, as `<kind>-<the release that first wrote it>`: `githook-…`,
  `claude-<key>-…` for a declaration, `codex-<event>-…` for an entry of `.codex/hooks.json`.
  `npm run build -w specsheriff-tools` compiles them into `dist/`, copies the SpecSheriff guidelines and
  their schema into `guidelines/` and the grammars into `grammars/`, then lays all of it out in each
  plugin as `tools/`, with the packages the tools need at runtime, `release`, the version and the time
  of the build, and `agent`, naming the plugin's agent. `npm install` at the root runs the build.
- `skills/claude-code/` — the plugin for Claude Code: its manifest, the skills, `hooks/hooks.json` and
  the scripts it names, and `tools/`, which `.gitignore` keeps out of `main` and only a release
  commits. Its skills and its hooks' scripts are the source of the plugin for Codex CLI's too.
- `skills/codex/` — the plugin for Codex CLI: its manifest `.codex-plugin/plugin.json`, its guide and
  licence. The build writes its `skills/`, each skill of the plugin for Claude Code with what Codex
  needs of its own (the overlays in `skills/tools/scripts/copy-assets.mjs`, each of which must find
  its text once), its `hooks/`, the scripts the agent's hooks for Codex call, and its `tools/`; all
  three are kept out of `main` and committed by a release.
- `.claude-plugin/marketplace.json` and `.agents/plugins/marketplace.json` — the marketplace, for
  Claude Code and for Codex CLI, each listing its plugin by its relative path.
- `skills/pytest-specsheriff/` — the plugin for pytest, installed by pip from the branch `release`.

## This repository runs its own working tree

`.claude/settings.json` holds what `sheriff init` writes, as in any project: the marketplace read
from the branch `release`. To run the working tree instead, a machine declares the marketplace in
`.claude/settings.local.json`, which git does not keep and which Claude Code reads first:

```json
{
  "extraKnownMarketplaces": {
    "specsheriff-marketplace": { "source": { "source": "directory", "path": "D:/SpecSheriff" } }
  }
}
```

with the path of the clone. Claude Code then loads the plugin in place: the skills and the agent's
hooks are read from the working tree at every session start, and the agent's hooks run the last build.
When a session starts, the plugin copies that build into its data directory, where the git hooks run
it, because every build writes a new `release`. So a change to `skills/tools/src/` reaches the
agent's hooks once `npm run build -w specsheriff-tools` has run, and the git hooks at the next session
start, or at once by running the session start by hand:

```sh
CLAUDE_PLUGIN_ROOT="$PWD/skills/claude-code" \
CLAUDE_PLUGIN_DATA="$HOME/.claude/plugins/data/specsheriff-specsheriff-marketplace" \
CLAUDE_PROJECT_DIR="$PWD" sh skills/claude-code/hooks/session-start.sh
```

The SpecSheriff tools treat the clone as the repository where the SpecSheriff guidelines are written only while the
environment variable `SPECSHERIFF_GUIDELINES_REPO` is set to the path of the clone's root (§s-zefk589ykh37b8u). Otherwise,
the checks of the SpecSheriff tools refuse the guidelines and their schema as copies of the files that the plugin delivers.
On this machine, the variable is set in the Windows user environment variables and in `.claude/settings.local.json`.

Claude Code keeps one marketplace of a name for each user, so on that machine every project reads
this working tree.

Codex CLI installs a plugin from a marketplace on disk as it would from GitHub, copying it into its
cache, so the working tree is tried in Codex after a build by a Codex home of its own holding a copy
of the user's sign-in:

```sh
export CODEX_HOME=<an empty folder>; cp ~/.codex/auth.json "$CODEX_HOME"/
codex plugin marketplace add D:/SpecSheriff
codex plugin add specsheriff@specsheriff-marketplace
```

and `codex plugin remove` then `codex plugin add` again after the next build. Codex runs a project's
hooks only in a project its `config.toml` trusts, `[projects.'<path>'] trust_level = "trusted"`, and
`codex exec --dangerously-bypass-hook-trust` runs them without each hook being trusted.

## A release

`npm run release -- <major>.<minor>.<patch>` on a clean `main`:

1. builds the tools and runs `sheriff binding`, and stops where it refuses anything or reports an
   approved rule not implemented (s-6fw72j65jkqrfpf): a release carries out every rule it states;
2. tests the skills of both plugins, as the section "Testing the skills" describes. It stops if a
   test that can stop a release fails or does not complete;
3. writes the version into `skills/tools/package.json`, `package-lock.json`,
   `skills/claude-code/.claude-plugin/plugin.json`, `skills/codex/.codex-plugin/plugin.json` and
   `skills/pytest-specsheriff/pyproject.toml`. It writes the release's tag into the guide's recipe for
   CI, in `skills/claude-code/README.md`, so that the recipe clones the tools of the same release as
   the project's plugin. It commits these changes on `main` as `Release: <version>`, through the git
   hooks like any commit;
4. builds the tools;
5. makes the release commit. Its tree is the tree of the commit made in step 3, with
   `skills/claude-code/tools/`, `skills/codex/skills/`, `skills/codex/hooks/` and `skills/codex/tools/`
   added. Its parents are that commit and the last commit of `release`, if there is one. Its message contains the results
   of the skills' tests;
6. tags it `v<version>`, moves `release` to it, and pushes `main`, `release` and the tag in one
   atomic push, the pre-push hook running the tests first.

`release` holds only releases, so a project's marketplace never reads the work in progress on `main`.
Claude Code offers a machine the new release once the version in `plugin.json` has changed, and with
the marketplace's `autoUpdate` on it takes it in the background. Codex CLI takes it at
`codex plugin marketplace upgrade`.

## Testing the skills

The release script tests every skill of both plugins with NVIDIA's SkillEvaluator, exactly version
1.0.1, installed as a `uv` tool: `uv tool install --python 3.13 "skillevaluator[all]==1.0.1"`. This
step is implemented in `internal/skill-evals/test-skills.mjs`, and the step's tests run with `npm test`.
The step runs three tiers:

1. Tier 1 runs on each skill without a model: SkillEvaluator's static checks (`tier1 --no-llm`), and
   the check that Claude Code and Codex CLI each load the skill (`harness-check`). The scan for
   secrets in tier 1 needs `gitleaks` on the `PATH`.
2. Tier 2 runs on each skill: it looks for skills that overlap so much that an agent may confuse
   them, with embeddings from NVIDIA Build. It needs an NVIDIA Build API key.
3. Tier 3 is the live run. Claude Code in Docker works through each test case of
   `internal/skill-evals/cases.json` in three runs with the plugin for Claude Code, and in three runs
   without the plugin. An LLM judge scores each run. Tier 3 runs only if
   `skills/claude-code/skills/` or `specs/_guidelines/` has changed since the last release's tag.

A failure in tier 1 or tier 2 stops the release, and so does a check of either tier that does not
complete. Only a check whose result is the same on every run is allowed to stop a release, so the scores of
tier 3 do not stop it. They go into the release commit's message, each next to the same test
case's score at the previous release. The owner reads them before agreeing to publish the release. A live run that produces no
report stops the release.

The test cases of tier 3 run in a small neutral project, which `internal/skill-evals/setup-project.mjs`
sets up with the tools of the release under test. Each test case is adapted from an incident in this
repository's history, and names the rules of the SpecSheriff guidelines that its judge applies.
`internal/skill-evals/tier3.py` runs them with SkillEvaluator's Python interpreter. SkillEvaluator's command
line cannot load a plugin as Claude Code does, with the plugin's skills and hooks together. For this
reason, `tier3.py` calls the function in SkillEvaluator's code that loads a plugin in that way
(`evaluate_prepared_plugin` with `load="native"`).

A live run takes hours, so its report is kept in `~/.specsheriff/skill-evals/<commit>/report.json`.
The release reuses the report that its rehearsal, described in "Checking a release before it is
published", made for the same commit of `main`.

The keys come from Windows user environment variables, and each tier is handed only the keys it
needs:

| Variable | What it holds | Who uses it |
|---|---|---|
| `SKILLEVAL_NVIDIA_API_KEY` | an NVIDIA Build API key | tier 2 |
| `SKILLEVAL_CLAUDE_OAUTH_TOKEN` | an OAuth token for the owner's Claude subscription | the tier 3 agent |
| `SKILLEVAL_ANTHROPIC_API_KEY` | an Anthropic API key | the tier 3 judge |

## Checking a release before it is published

A release is rehearsed before it is published, so that what reaches GitHub is what was tried and a
fault costs no version number:

1. A clone of `main` whose `origin` is a bare repository on disk stands in for GitHub, and
   `npm run release -- <version>` runs there unchanged.
2. A clean machine — here WSL, with Node, Claude Code and uv in the user's home — serves the
   stand-in over smart http, `git http-backend` behind a CGI server, since Claude Code takes no
   `file://` marketplace and clones shallow, which plain http cannot serve. An empty project there
   adds the marketplace by `claude plugin marketplace add "<url>#release" --scope local`, since a
   marketplace a settings file declares applies only after an interactive session's trust dialog,
   so that Claude Code clones the plugin into its cache as it would from GitHub, where this
   repository loads it in place.
3. There the plugin is installed, `spec-init` sets the project up in an interactive session, the
   agent and a person each make a commit and a commit is refused, the agent takes a rule from the
   owner's words to a commit through its test and code, the guide's recipe for CI passes a branch
   and refuses one made around the hooks, and the plugin for pytest is installed by pip from
   `release` under the latest pytest. A second release made in the stand-in alone, from a clone of
   its own, must then reach the project by itself, within ten minutes of an interactive session's
   first message, and the git hooks at the session after. The plugin for Codex CLI is installed there
   from the stand-in by the guide's lines with the stand-in's url, and a project set up by its
   `spec-init` in an interactive Codex session, the project and its hooks trusted: an edit the guard
   refuses is blocked with its reason, a commit of code without a SpecTag is refused, the reviewer runs on
   Codex, and once `codex plugin remove` has run, and no tools of the plugin for Claude Code are on
   the machine either, a commit goes through with the notice that no check of SpecSheriff ran, the
   hooks left on. On both agents the reviewer's settings are asked for once: Claude Code shows the
   plugin's options when it enables the plugin, by `claude plugin install` and by a project's
   declaration both, and the session start writes them into the git configuration; Codex's first
   session in the project has the agent ask; a review at a setting not confirmed says so.
4. A project is also set up on Windows, by the `sheriff init` of the release in the stand-in, as
   `spec-init` runs it, and its setup committed there; cloned on the clean machine, with the plugin
   installed, a session started and a commit of code without a SpecTag made, the commit must be refused —
   git on Windows records no executable bit of its own, so only this shows that the hooks reach a
   clone able to run.
5. All passing, the rehearsed commits are fetched here and pushed to GitHub as they are — `main` at
   `v<version>^1`, `release` and the tag at `v<version>`. The project on the clean machine is
   switched to GitHub by the guide's lines, installs and makes one commit.
6. A fault is fixed on `main`, the stand-in deleted, and the rehearsal run again with the same
   number; a round after a fix runs again what the fix can reach.

Every command run on the clean machine starts in a folder of its own, such as `cd ~`: a `wsl`
command starts in the Windows folder it is run from, and `claude plugin` commands run from this
repository rewrite its `.claude/settings.json` and `.claude/settings.local.json`.
