#!/bin/sh
# When a session starts: the plugin for Claude Code keeps the SpecSheriff tools it carries in its data
# directory, where the git hooks find them, and writes the reviewer's settings the user gave as its options
# where the git hooks read them; the plugin for Codex CLI keeps no copy, its tools standing in Codex's
# cache. A repository taking the method has its git hooks turned on, each hook that git skips or that an
# earlier release of sheriff init wrote named, and the reviewer's settings the user has not confirmed asked
# for once on each machine. The plugin is the directory Claude Code names, or for Codex the one above this
# script.
plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
tools="$plugin/tools"
data="${CLAUDE_PLUGIN_DATA:-}"
if [ -n "$data" ] && ! cmp -s "$tools/release" "$data/release"; then
  mkdir -p "$(dirname "$data")" && rm -rf "$data.new.$$" && cp -R "$tools" "$data.new.$$" && rm -rf "$data" && mv "$data.new.$$" "$data" || exit 1
fi
# The settings of the runner claude the user gave Claude Code as the plugin's options, in any repository,
# wherever the user's git configuration lacks one or holds another value.
for key in claudeModel claudeFallbackModel claudeEffort; do
  eval "value=\${CLAUDE_PLUGIN_OPTION_$(printf %s "$key" | tr '[:lower:]' '[:upper:]'):-}"
  [ -n "$value" ] || continue
  [ "$(git config --global --get "specsheriff.review.$key")" = "$value" ] || git config --global "specsheriff.review.$key" "$value"
done
root=$(git -C "${CLAUDE_PROJECT_DIR:-.}" rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
path=$(git -C "$root" config core.hooksPath)
if [ -z "$path" ]; then
  git -C "$root" config core.hooksPath .githooks && echo "SpecSheriff: the git hooks are turned on: core.hooksPath is .githooks"
elif [ "$path" != ".githooks" ]; then
  echo "SpecSheriff: core.hooksPath is $path, not .githooks, so the git hooks sheriff init writes do not run"
fi
# A git hook not executable is skipped where files keep that bit: named, with how to make it executable on
# every system, the file and the index left to the author.
filemode=$(git -C "$root" config --bool core.fileMode)
git -C "$root" ls-files -s -- .githooks | while read -r mode object stage file; do
  if [ "$mode" != 100755 ] || { [ "$filemode" != false ] && [ ! -x "$root/$file" ]; }; then
    echo "SpecSheriff: the git hook $file is not executable, so git skips it where files keep that bit: chmod +x $file && git update-index --chmod=+x $file, then commit it"
  fi
done
# A hook an earlier release of sheriff init wrote keeps that release's lookup until sheriff init replaces it.
for earlier in "$tools"/assets/earlier/githook-*; do
  [ -f "$earlier" ] || continue
  for hook in pre-commit commit-msg pre-push; do
    if [ -f "$root/.githooks/$hook" ] && tr -d '\r' < "$root/.githooks/$hook" | cmp -s - "$earlier"; then
      echo "SpecSheriff: the git hook .githooks/$hook holds what an earlier release of sheriff init wrote; sheriff init replaces it"
    fi
  done
done
for earlier in "$tools"/assets/earlier/codex-*; do
  [ -f "$earlier" ] && [ -f "$root/.codex/hooks.json" ] || continue
  if grep -qF -- "$(sed -n 's/.*"command": *"\(.*\)".*/\1/p' "$earlier" | head -n 1)" "$root/.codex/hooks.json"; then
    echo "SpecSheriff: .codex/hooks.json holds a hook an earlier release of sheriff init wrote, $(basename "$earlier"); sheriff init replaces it"
  fi
done
# The runner sheriff review would take at a commit here: the project's review.runner, or the agent of the
# tools the git hooks take, those of the higher release where both plugins keep theirs, as the git hooks
# sheriff init writes find them.
runner=$(cd "$root" && node -e "try { process.stdout.write(String(require('./sheriff.config.json').review?.runner ?? '')) } catch {}" 2>/dev/null)
if [ -z "$runner" ]; then
  newer() {
    a=$1 b=$2
    while [ -n "$a$b" ]; do
      x=${a%%.*} y=${b%%.*}
      x=${x%%[!0-9]*} y=${y%%[!0-9]*}
      [ "${x:-0}" -gt "${y:-0}" ] && return 0
      [ "${x:-0}" -lt "${y:-0}" ] && return 1
      case $a in *.*) a=${a#*.} ;; *) a= ;; esac
      case $b in *.*) b=${b#*.} ;; *) b= ;; esac
    done
    return 1
  }
  codex=${CODEX_HOME:-$HOME/.codex}
  case $codex in *\\*) codex=$(printf '%s' "$codex" | tr '\\' /) ;; esac
  found= version=
  for dir in "${CLAUDE_CODE_PLUGIN_CACHE_DIR:-$HOME/.claude/plugins}/data/specsheriff-specsheriff-marketplace" \
    "$codex"/plugins/cache/specsheriff-marketplace/specsheriff/*/tools; do
    [ -f "$dir/release" ] || continue
    release=$(sed -n '1s/ .*//p' "$dir/release")
    if [ -z "$found" ] || newer "$release" "$version"; then found=$dir version=$release; fi
  done
  runner=$(cat "${found:-$tools}/agent" 2>/dev/null)
fi
[ "$runner" = codex ] || runner=claude
# The settings of that runner the user's git configuration lacks, each with the default sheriff review takes
# for it, asked for once on each machine; the hook writes none of them itself.
if [ "$(git config --get "specsheriff.review.${runner}Asked")" != true ]; then
  if [ "$runner" = codex ]; then
    defaults="codexModel=|codexEffort=high"
  else
    defaults="claudeModel=opus|claudeFallbackModel=sonnet|claudeEffort=high"
  fi
  lacking=$(printf '%s\n' "$defaults" | tr '|' '\n' | while IFS='=' read -r key value; do
    git config --get "specsheriff.review.$key" >/dev/null && continue
    if [ -z "$value" ]; then echo "  specsheriff.review.$key: default empty, the model Codex chooses for the signed-in account"
    else echo "  specsheriff.review.$key: default $value"; fi
  done)
  if [ -n "$lacking" ]; then
    echo "SpecSheriff: the independent reviewer runs at every commit that changes code, at this user's cost, and these settings of its runner $runner are not confirmed on this machine:"
    printf '%s\n' "$lacking"
    echo "Offer the user each default to confirm or replace, and write each value they answer, the default included, with git config --global specsheriff.review.<setting> <value>. Write nothing they have not answered; until they do, each review runs at the default and says so. This is asked once on this machine."
    git config --global "specsheriff.review.${runner}Asked" true
  fi
fi
exit 0
