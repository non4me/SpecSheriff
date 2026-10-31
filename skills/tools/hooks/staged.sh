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
GIT_DIR=$(git rev-parse --absolute-git-dir) || exit 1
export GIT_DIR
GIT_WORK_TREE="$staged"
export GIT_WORK_TREE
