#!/bin/sh
# Before an edit made with the file tools, in a repository taking the method: sheriff guard judges it.
# The harness blocks the edit on exit code 2 and hands what is written to standard error to the agent.
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/sheriff.config.json" ] || exit 0
cd "$root" && exec node "$CLAUDE_PLUGIN_ROOT/tools/dist/cli.js" guard
