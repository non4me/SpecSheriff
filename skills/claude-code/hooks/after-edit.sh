#!/bin/sh
# After an agent's edit, in a repository taking the method: the specification reindexed, the export and
# the map written, the types the data record nodes generate written, and then the checks run over the
# working tree, its difference from the last commit read as the commit. What the generator and the checks
# refuse is handed to the agent: Claude Code reads exit code 2 and passes standard error on, Codex reads a
# reason written as JSON to standard output. The plugin is the directory Claude Code names, or for Codex
# the one above this script, and its tools name its agent.
plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
cd "$root" || exit 0
sheriff() { node "$plugin/tools/dist/cli.js" "$@"; }
refuse() {
  if [ "$(cat "$plugin/tools/agent" 2>/dev/null)" = codex ]; then
    node -e 'process.stdout.write(JSON.stringify({ decision: "block", reason: process.argv[1] }))' "$1"
    exit 0
  fi
  printf '%s' "$1" >&2
  exit 2
}
found=""
if ! sheriff reindex >/dev/null 2>&1 || ! found=$(sheriff export 2>&1 >/dev/null) || ! found=$(sheriff render 2>&1 >/dev/null); then
  refuse "$(sheriff reindex 2>&1)$found"
fi
refused=""
found=$(sheriff types 2>&1) || refused="$found
"
for check in validate binding citations; do
  found=$(sheriff "$check" 2>&1) || refused="$refused$found
"
done
[ -z "$refused" ] && exit 0
refuse "$refused"
