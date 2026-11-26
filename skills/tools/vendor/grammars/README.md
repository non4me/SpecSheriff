# Grammars kept in the repository

The SpecSheriff tools compare the syntax trees of two versions of a file that is bound as a whole (§s-u6mj5yv8ngnz79v).
They parse a file in YAML, CSS, SQL or Bash with a grammar kept here as a WebAssembly file. `scripts/copy-assets.mjs` copies
these files into `grammars/`, beside the grammars that npm installs.

These grammars are kept here because npm cannot install them alongside the other grammars. Their npm packages compile native code
when they are installed. The npm package of the YAML grammar also declares a version of `tree-sitter` that conflicts
with the version that the other grammars declare. The SpecSheriff tools read only the WebAssembly files, through
`web-tree-sitter`.

| File | Source | Version | Licence |
|------|--------|---------|---------|
| `tree-sitter-yaml.wasm` | the npm package `@tree-sitter-grammars/tree-sitter-yaml` | 0.7.1 | MIT, `LICENSE-tree-sitter-yaml` |
| `tree-sitter-css.wasm` | the npm package `tree-sitter-css` | 0.25.0 | MIT, `LICENSE-tree-sitter-css` |
| `tree-sitter-bash.wasm` | the npm package `tree-sitter-bash` | 0.25.1 | MIT, `LICENSE-tree-sitter-bash` |
| `tree-sitter-sql.wasm` | the release v0.3.13 of `DerekStride/tree-sitter-sql` on GitHub | 0.3.13 | MIT, `LICENSE-tree-sitter-sql` |

The WebAssembly files of the YAML, CSS and Bash grammars are copied unchanged from their npm packages. The npm package of the SQL grammar ships no
WebAssembly file, so `tree-sitter-sql.wasm` was built from the sources of that version of the package with
`npx tree-sitter-cli@0.26.3 build --wasm -o tree-sitter-sql.wasm`.
