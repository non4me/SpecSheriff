# Sourced by the hooks that judge the commit being made: writes what is staged out to a directory of
# its own and points git at it, so that the checks read the commit, never what it does not hold.
root=$(git rev-parse --show-toplevel) || exit 1
case "${GIT_INDEX_FILE:-}" in
  "" | /* | [A-Za-z]:*) ;;
  *) GIT_INDEX_FILE="$root/$GIT_INDEX_FILE"; export GIT_INDEX_FILE ;;
esac
staged=$(mktemp -d) || exit 1
trap 'rm -rf "$staged"' EXIT
git checkout-index -a --prefix="$staged/" || exit 1
# The repository where the SpecSheriff guidelines are written is recognized by the path to its root in
# SPECSHERIFF_GUIDELINES_REPO (s-zefk589ykh37b8u); the directory written out here stands for that root.
if [ -n "${SPECSHERIFF_GUIDELINES_REPO:-}" ] &&
  [ "$(cd "$SPECSHERIFF_GUIDELINES_REPO" 2>/dev/null && pwd -P)" = "$(cd "$root" && pwd -P)" ]; then
  SPECSHERIFF_GUIDELINES_REPO="$staged"
  export SPECSHERIFF_GUIDELINES_REPO
fi
GIT_DIR=$(git rev-parse --absolute-git-dir) || exit 1
export GIT_DIR
GIT_WORK_TREE="$staged"
export GIT_WORK_TREE
