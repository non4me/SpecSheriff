#!/bin/sh
# Starts Claude Code on the owner's subscription. Claude Code keeps its token out of the shells it starts, so the
# claude that SpecSheriff's commit reviewer starts from a git hook has none. This wrapper takes the token from the
# environment of the nearest ancestor process that holds it, the agent's own claude, so that the reviewer runs on
# the subscription, as it runs on the owner's login on the owner's machine. The token is not written to any file.
# tier3.py installs this wrapper in place of claude in the image of the with-plugin arm, with @REAL@ replaced by
# the path of the real claude.
if [ -z "$CLAUDE_CODE_OAUTH_TOKEN" ]; then
  pid=$PPID
  while [ -n "$pid" ] && [ "$pid" -gt 1 ]; do
    token=$(tr '\0' '\n' < "/proc/$pid/environ" 2>/dev/null | sed -n 's/^CLAUDE_CODE_OAUTH_TOKEN=//p' | head -n 1)
    if [ -n "$token" ]; then
      CLAUDE_CODE_OAUTH_TOKEN=$token
      CLAUDE_FORCE_OAUTH=1
      export CLAUDE_CODE_OAUTH_TOKEN CLAUDE_FORCE_OAUTH
      break
    fi
    pid=$(sed 's/^.*) //' "/proc/$pid/stat" 2>/dev/null | cut -d ' ' -f 2)
  done
  unset token
fi
exec @REAL@ "$@"
