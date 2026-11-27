# Sourced by every hook script of the SpecSheriff tools: the tools are the directory above this one. The git hook that calls
# the script has already found that Node.js meets the version that their package names (s-4mej6ccn7xu3d3p).
tools=$(cd "$(dirname "$0")/.." && pwd) || exit 1
sheriff() { node "$tools/dist/cli.js" "$@"; }
