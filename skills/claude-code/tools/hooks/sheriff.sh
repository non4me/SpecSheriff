# Sourced by every hook of the SpecSheriff tools: the tools are the directory above this one, and they
# run on the Node their package names, which the hook refuses to go without.
tools=$(cd "$(dirname "$0")/.." && pwd) || exit 1
need=$(sed -n 's/.*"node": *">=\([0-9]*\).*/\1/p' "$tools/package.json")
have=$(node -p "process.versions.node" 2>/dev/null)
case "$have" in
  [0-9]*) [ "${have%%.*}" -ge "$need" ] && unset need ;;
esac
if [ -n "${need:-}" ]; then
  echo "sheriff: the SpecSheriff tools need Node $need or later${have:+, and this machine runs Node $have}" >&2
  exit 1
fi
sheriff() { node "$tools/dist/cli.js" "$@"; }
