#!/bin/sh
# Runs after an agent's edit or shell command, in a repository that uses the method, where the last commit or the
# working tree differs from what this hook recorded when the checks last ran (s-hcmpjmwtgfwzncu):
# - `sheriff reindex` runs where a file under specs/, sheriff.config.json or a file read for SpecTags differs;
# - `sheriff types` runs where a file under specs/, sheriff.config.json or the code of a project's own generator differs,
#   or where the reindex wrote a file;
# - `sheriff markdown` and `sheriff map` run where the Views extension is chosen, and a file under specs/ or
#   sheriff.config.json differs or the reindex wrote a file;
# - the checks then run over the working tree, its difference from the last commit read as the commit.
# What the generators and the checks refuse is handed to the agent: Claude Code reads exit code 2 and passes standard
# error on, and Codex reads a reason written as JSON to standard output. Each node that the reindex made a draft is
# reported to the agent too. The plugin is the directory that Claude Code names or, for Codex, the one above this
# script, and its tools name its agent.
plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
cd "$root" || exit 0
sheriff() { node "$plugin/tools/dist/cli.js" "$@"; }
changed=$(node "$plugin/hooks/changed.mjs" diff 2>/dev/null) || changed="spec tags generator"
[ "$changed" = none ] && exit 0
differs() { case " $changed " in *" $1 "*) return 0 ;; esac; return 1; }
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
wrote=""
if differs spec || differs tags; then
  reindexed=$(sheriff reindex 2>&1) || refuse "$reindexed"
  emptied=$(printf '%s\n' "$reindexed" | grep '^made a draft: ')
  printf '%s\n' "$reindexed" | grep -qE '^(re)?written: ' && wrote=yes
fi
if differs spec || differs generator || [ -n "$wrote" ]; then
  found=$(sheriff types 2>&1) || refused="$found
"
fi
# A failure to write the export or the map stops none of the checks.
if { differs spec || [ -n "$wrote" ]; } && sheriff settings 2>/dev/null | grep -q '^extension views: chosen$'; then
  sheriff markdown >/dev/null 2>&1
  sheriff map >/dev/null 2>&1
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
