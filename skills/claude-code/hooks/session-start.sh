#!/bin/sh
# When a session starts: the SpecSheriff tools this plugin carries are kept in its data directory,
# where the git hooks find them, and a repository taking the method has its git hooks turned on.
tools="$CLAUDE_PLUGIN_ROOT/tools"
data="$CLAUDE_PLUGIN_DATA"
if ! cmp -s "$tools/release" "$data/release"; then
  mkdir -p "$(dirname "$data")" && rm -rf "$data.new.$$" && cp -R "$tools" "$data.new.$$" && rm -rf "$data" && mv "$data.new.$$" "$data" || exit 1
fi
root=$(git -C "${CLAUDE_PROJECT_DIR:-.}" rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
path=$(git -C "$root" config core.hooksPath)
if [ -z "$path" ]; then
  git -C "$root" config core.hooksPath .githooks && echo "SpecSheriff: the git hooks are turned on: core.hooksPath is .githooks"
elif [ "$path" != ".githooks" ]; then
  echo "SpecSheriff: core.hooksPath is $path, not .githooks, so the git hooks sheriff init writes do not run"
fi
exit 0
