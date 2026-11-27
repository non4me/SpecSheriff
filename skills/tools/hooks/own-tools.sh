# Sourced by the hook scripts that run the project's own tools for a hook (s-n4m5zvh96yb299p). Before sourcing it, a script
# sets `hook`, `root` and `own_input`, a file that holds a copy of the standard input that git handed the hook. A project's
# own tool is a file directly in .githooks/<hook>.d/ whose first line names its interpreter. Each runs from the root of the
# working tree, by that interpreter, with the hook's arguments and a copy of that standard input, even where another failed.
own_dir="$root/.githooks/$hook.d"

# The interpreter that a file's first line names, with a carriage return at its end ignored; nothing where it names none.
own_interpreter() {
  first=$(head -n 1 "$1" | tr -d '\r')
  case $first in '#!'*) printf '%s' "${first#\#!}" ;; esac
}

# The paths, relative to .githooks/, that the project's own guidelines list as tools that rewrite files for this hook.
own_listed() {
  (cd "$root" && node "$tools/dist/own-tools.js" "$hook")
}

# Each file of the working tree that git lists as changed, removed or untracked and does not ignore, with a hash of its content.
own_snapshot() {
  (cd "$root" && git ls-files -m -d -o --exclude-standard | LC_ALL=C sort -u | while IFS= read -r f; do
    if [ -f "$f" ]; then printf '%s %s\n' "$(git hash-object -- "$f")" "$f"; else printf 'removed %s\n' "$f"; fi
  done)
}

# Runs one tool; fails where the tool fails.
own_run() {
  path=$1
  shift
  interpreter=$(own_interpreter "$path")
  (cd "$root" && $interpreter "$path" "$@" < "$own_input") || { echo "sheriff: the project's own tool $path failed" >&2; return 1; }
}

# Runs, in the order of their list, the tools that the project's own guidelines list as rewriting files for this hook, which may
# change files and what is staged. A listed path in this hook's folder for which nothing runs is named.
own_rewriting() {
  status=0
  listed=$(own_listed)
  while IFS= read -r rel; do
    [ -n "$rel" ] || continue
    path="$root/.githooks/$rel"
    if [ ! -f "$path" ] || [ -z "$(own_interpreter "$path")" ]; then
      echo "sheriff: $rel is listed as a tool that rewrites files, and nothing runs for it" >&2
      continue
    fi
    own_run "$path" "$@" || status=1
  done <<EOF
$listed
EOF
  return $status
}

# Runs the other tools of this hook in the byte order of their names, and names each file of the folder that is not run. A tool
# fails the hook where it fails, or where it changes a file of the working tree that git does not ignore, what is staged or the
# commit's message; the hook names the tool and each file.
own_others() {
  status=0
  [ -d "$own_dir" ] || return 0
  listed=$(own_listed)
  paths=$(LC_ALL=C; export LC_ALL; for path in "$own_dir"/*; do printf '%s\n' "$path"; done)
  while IFS= read -r path; do
    [ -f "$path" ] || continue
    rel=${path#"$root/.githooks/"}
    if printf '%s\n' "$listed" | grep -qxF "$rel"; then continue; fi
    if [ -z "$(own_interpreter "$path")" ]; then
      echo "sheriff: $path is not run: its first line names no interpreter" >&2
      continue
    fi
    tree=$(git write-tree 2>/dev/null)
    before=$(own_snapshot)
    message=
    [ "$hook" = commit-msg ] && message=$(cat "$1")
    own_run "$path" "$@" || status=1
    if [ "$(git write-tree 2>/dev/null)" != "$tree" ]; then
      echo "sheriff: the project's own tool $path changed what is staged" >&2
      status=1
    fi
    changed=$(printf '%s\n%s\n' "$before" "$(own_snapshot)" | sed '/^$/d' | LC_ALL=C sort | uniq -u | sed 's/^[^ ]* //' | LC_ALL=C sort -u | tr '\n' ' ')
    if [ -n "$changed" ]; then
      echo "sheriff: the project's own tool $path changed files of the working tree: ${changed% }" >&2
      status=1
    fi
    if [ "$hook" = commit-msg ] && [ "$(cat "$1")" != "$message" ]; then
      echo "sheriff: the project's own tool $path changed the commit's message" >&2
      status=1
    fi
  done <<EOF
$paths
EOF
  return $status
}
