#!/bin/sh
# After an agent's edit or shell command, in a repository taking the method, where the last commit or the working
# tree differs from what this hook noted when the checks last ran: the specification reindexed, the export and the
# map written and the generated files written, where a file under specs/, sheriff.config.json or a project
# generator's code differs; then the checks run over the working tree, its difference from the last commit read as
# the commit. What the generators and the checks refuse is handed to the agent: Claude Code reads exit code 2 and
# passes standard error on, Codex reads a reason written as JSON to standard output. Each node the reindex made a
# draft is told to the agent too. The plugin is the directory Claude Code names, or for Codex the one
# above this script, and its tools name its agent.
plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
cd "$root" || exit 0
sheriff() { node "$plugin/tools/dist/cli.js" "$@"; }
changed=$(node "$plugin/hooks/changed.mjs" diff 2>/dev/null) || changed=regen
[ "$changed" = none ] && exit 0
noted() { node "$plugin/hooks/changed.mjs" note 2>/dev/null; }
refuse() {
  noted
  if [ "$(cat "$plugin/tools/agent" 2>/dev/null)" = codex ]; then
    node -e 'process.stdout.write(JSON.stringify({ decision: "block", reason: process.argv[1] }))' "$1"
    exit 0
  fi
  printf '%s' "$1" >&2
  exit 2
}
emptied=""
refused=""
if [ "$changed" = regen ]; then
  found=""
  if ! reindexed=$(sheriff reindex 2>&1) || ! found=$(sheriff export 2>&1 >/dev/null) || ! found=$(sheriff render 2>&1 >/dev/null); then
    refuse "$reindexed$found"
  fi
  emptied=$(printf '%s\n' "$reindexed" | grep '^made a draft: ')
  found=$(sheriff types 2>&1) || refused="$found
"
fi
# What the checks below run over, noted once they end, so that a file changed while they run is checked next time.
node "$plugin/hooks/changed.mjs" snapshot 2>/dev/null
for check in validate binding citations; do
  found=$(sheriff "$check" 2>&1) || refused="$refused$found
"
done
[ -n "$emptied" ] && refused="$refused$emptied
"
if [ -z "$refused" ]; then
  noted
  exit 0
fi
refuse "$refused"
