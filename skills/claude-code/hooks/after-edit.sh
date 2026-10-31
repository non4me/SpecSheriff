#!/bin/sh
# After an agent's edit, in a repository taking the method: the specification reindexed, the export and
# the map written, the types the data record nodes generate written, and then the checks run over the
# working tree, its difference from the last commit read as the commit. What the generator and the checks
# refuse is handed to the agent: the harness reads exit code 2 and passes standard error on.
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
cd "$root" || exit 0
sheriff() { node "$CLAUDE_PLUGIN_ROOT/tools/dist/cli.js" "$@"; }
if ! sheriff reindex >/dev/null 2>&1 || ! sheriff export >/dev/null || ! sheriff render >/dev/null; then
  sheriff reindex >&2
  exit 2
fi
refused=""
found=$(sheriff types 2>&1) || refused="$found
"
for check in validate binding citations; do
  found=$(sheriff "$check" 2>&1) || refused="$refused$found
"
done
[ -z "$refused" ] && exit 0
printf '%s' "$refused" >&2
exit 2
