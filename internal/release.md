# Releasing SpecSheriff, and running its plugin from this repository

What only this repository does: it is where the SpecSheriff guidelines are written and the plugin for
Claude Code is built, so it builds the plugin from its working tree and releases it. Nothing here is a
rule of the SpecSheriff guidelines, and no other project needs any of it.

## The layout

- `skills/specsheriff/` — the SpecSheriff tools: their source, tests, the descriptions of languages,
  the git hooks' scripts in `hooks/` and the template of the hook `sheriff init` writes in `assets/`.
  `npm run build -w specsheriff` compiles them into `dist/`, copies the SpecSheriff guidelines and
  their schema into `guidelines/` and the grammars into `grammars/`, then lays all of it out in the
  plugin as `skills/claude-code/tools/`, with the packages the tools need at runtime and `release`,
  the version and the time of the build. `npm install` at the root runs the build.
- `skills/claude-code/` — the plugin: its manifest, the skills, `hooks/hooks.json` and the scripts it
  names, and `tools/`, which `.gitignore` keeps out of `main` and only a release commits.
- `.claude-plugin/marketplace.json` — the marketplace, listing the plugin by its relative path.
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
it, because every build writes a new `release`. So a change to `skills/specsheriff/src/` reaches the
agent's hooks once `npm run build -w specsheriff` has run, and the git hooks at the next session
start, or at once by running the session start by hand:

```sh
CLAUDE_PLUGIN_ROOT="$PWD/skills/claude-code" \
CLAUDE_PLUGIN_DATA="$HOME/.claude/plugins/data/specsheriff-specsheriff-marketplace" \
CLAUDE_PROJECT_DIR="$PWD" sh skills/claude-code/hooks/session-start.sh
```

Claude Code keeps one marketplace of a name for each user, so on that machine every project reads
this working tree.

## A release

`npm run release -- <major>.<minor>.<patch>` on a clean `main`:

1. writes the version into `skills/specsheriff/package.json` and the lockfile,
   `skills/claude-code/.claude-plugin/plugin.json` and `skills/pytest-specsheriff/pyproject.toml`,
   and commits it on `main` as `Release: <version>`, through the git hooks like any commit;
2. builds the tools;
3. makes the release commit: the tree of that commit with `skills/claude-code/tools/` added, its
   parents that commit and the last commit of `release`, where there is one;
4. tags it `v<version>`, moves `release` to it, and pushes `main`, `release` and the tag in one
   atomic push, the pre-push hook running the tests first.

`release` holds only releases, so a project's marketplace never reads the work in progress on `main`.
Claude Code offers a machine the new release once the version in `plugin.json` has changed, and with
the marketplace's `autoUpdate` on it takes it in the background.
