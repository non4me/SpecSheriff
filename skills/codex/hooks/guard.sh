#!/bin/sh
# Before an edit made with the file tools or with apply_patch, in a repository taking the method: sheriff
# guard judges it. Claude Code blocks the edit on exit code 2 and hands standard error to the agent;
# Codex blocks it on a denial written as JSON to standard output. The plugin is the directory Claude Code
# names, or for Codex the one above this script, and its tools name its agent.
plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
cd "$root" || exit 0
reason=$(node "$plugin/tools/dist/cli.js" guard 2>&1)
code=$?
[ "$code" -eq 0 ] && exit 0
if [ "$code" -eq 2 ] && [ "$(cat "$plugin/tools/agent" 2>/dev/null)" = codex ]; then
  node -e 'process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: process.argv[1] } }))' "$reason"
  exit 0
fi
printf '%s\n' "$reason" >&2
exit "$code"
