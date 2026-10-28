# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

SpecSheriff is a method of spec-anchored development and the upstream of its core: the guidelines
and the `sheriff` toolset now, later the skills and a worked example. The toolset is being built
(step 2): `npm install` at the root builds `packages/specsheriff/` and links `sheriff`, and `npm test`
runs its unit and end-to-end tests and those of `packages/pytest-specsheriff/` (Python 3.10 or later
with pytest). `specs/_schema/` and `sheriff.config.json` exist; the `sheriff`
commands the appendix of the tools specifies, and `.githooks/`, do not exist yet unless `sheriff`'s
usage lists them. Never report a check as having run that has not.

The principles the method rests on, as the owner states them, are below. Weigh every decision and
proposal against them first; one that contradicts a principle is raised with the owner, never carried
out quietly.

@docs/principles.md

`docs/design-log.md` holds the decisions (newest first), the order of work and the open questions;
read it before proposing anything. A decision moves onto the rule it settled once that rule exists,
and the log keeps only what no rule carries.

`specs/_guidelines/` is the core of the guidelines — the method's own specification, normative for
all work here:

- `spec.json` — the base: what is held, what is checked, when, and what a failure costs. It names no
  technology.
- `tools.json` — the appendix of the tools: how SpecSheriff's toolset carries the base out — file
  layout, commands, hooks, the table of how each check is made, tag and test syntax, the reviewer's
  runner, how a confirmation is recorded. It is the specification the tools are built from.

What a project installs (tools, skills, guidelines, example) is Apache 2.0; `docs/` is CC BY 4.0.

## The node files

A file is `{schemaVersion, scope, section, nodes}`, a tree of nodes through `children`. A node holds:

- `sid` — permanent, `s-` plus 15 characters from `23456789abcdefghjkmnpqrstuvwxyz`; the only way a
  node is cited, anywhere. A new node gets a fresh, unique one.
- `id` — the address computed from where the node stands (part, file, number among its siblings).
  Nothing cites it. Until `sheriff reindex` exists, renumber by hand after inserting or moving a node.
- `kind` (`section`, which holds rules and requires nothing, or `rule`), `title`, `status` (`""` or
  `"checked"`), `text` (what must hold), `rationale` (why, kept apart from the requirement), `list`
  (`of`, `members`, `declaredIn`), `refs`, `meta.decisions` (`date`, `problem`, `ruling`, `type`),
  `meta.todos`.
- `refs` — typed outgoing links `{type, to}` and, in the same list, incoming ones `{type, from}`
  mirroring every link that points here. The types and their meanings: §s-sn6au3vcr9uy5pm.

Formatting is exactly `json.dumps(data, indent=2, ensure_ascii=False) + "\n"`, LF endings, the
existing key order.

## Editing the specification by hand (until the tools enforce it)

- **Status.** Any change to a node's wording — title, text, rationale, or the values its kind carries
  such as `list` — empties its status. A node becomes `checked` only on the owner's agreement after
  reading it, never on your own judgement; until `sheriff confirm` exists, you write the status once
  they agree. The one exception the owner allows: a purely technical replacement that changes no
  meaning, such as a renamed term or path, is confirmed by you and reported in one line. A change to
  links or metadata leaves the status as it is; a move that gives the node another owner empties it
  (§s-5ah25f6gy99panq).
- **Citations.** A node cites another as `§<sid>`, in any field but its links and children. Every
  citation needs an outgoing link to that node (`cites` unless another type says how the two bear on
  each other), a `cites` link stands only where the node cites its target, and the target holds the
  mirroring incoming entry (§s-bpdqd9v72wg7vsz).
- **Decisions** are recorded in the `meta.decisions` of the rule they settled, never as a document
  (§s-gqbj8849rf224qa), retold without anything of the private origin project the method was
  extracted from: nothing here names it or relies on it.
- **Removal.** While the core is first written, a removed node is deleted, not archived (design log,
  2026-10-27); afterwards a checked node goes to the archive (§s-f2b5zvc565s242f).
- **Where a rule goes.** The base names no technology, no look of a user interface and no figure
  measured on one instance; those go to the appendix of the tools, each of whose rules implements a
  node of the base. Examples in the core name what any system has — a user, an operator, a record, a
  request — never the worked example's bank.
- **How a rule is written** is the last section of `spec.json` — one language (English), a named
  subject, a reason that gives only its grounds and is no narrower than its rule, no count in prose,
  no capitals for stress, a general word carrying its object. Read it before writing any node.

After every edit, run this stand-in for `sheriff validate` from the repository root:

```bash
python - <<'EOF'
import glob, json, re
nodes, errs = {}, []
for f in glob.glob("specs/**/*.json", recursive=True):
    raw = open(f, encoding="utf-8").read()
    data = json.loads(raw)
    if json.dumps(data, indent=2, ensure_ascii=False) + "\n" != raw: errs.append(f"{f}: not in canonical formatting")
    stack = list(data.get("nodes", []))
    while stack:
        n = stack.pop(); stack += n.get("children", [])
        if not re.fullmatch(r"s-[2-9a-hjkmnp-z]{15}", n["sid"]) or n["sid"] in nodes: errs.append(f"bad or duplicate sid {n['sid']}")
        nodes[n["sid"]] = n
for sid, n in nodes.items():
    out = {(r["type"], r["to"]) for r in n["refs"] if "to" in r}
    cited = set(re.findall(r"§(s-\w+)", json.dumps({k: v for k, v in n.items() if k not in ("refs", "children")}, ensure_ascii=False))) - {sid}
    for t, to in out:
        if to not in nodes: errs.append(f"{sid}: link to missing {to}")
        elif {"type": t, "from": sid} not in nodes[to]["refs"]: errs.append(f"{to}: missing incoming {t} from {sid}")
        if t == "cites" and to not in cited: errs.append(f"{sid}: cites link to {to} without a § citation")
    for r in n["refs"]:
        if "from" in r and {"type": r["type"], "to": sid} not in nodes.get(r["from"], {"refs": []})["refs"]: errs.append(f"{sid}: stale incoming {r}")
    errs += [f"{sid}: cites {c} without a link" for c in cited - {to for _, to in out}]
print("\n".join(errs) or f"ok: {len(nodes)} nodes")
EOF
```

## Working with the owner

- The owner reviews one node at a time, shown whole: the English original above a reading in
  Russian, never fragments of it. Their confirmation is the only thing that makes a node checked.
- A node changed only to carry out what the owner already confirmed elsewhere is not shown again:
  the owner's agreement to that node covers it, so confirm it and report it in one line, naming the
  node it follows from.
- Files outside `specs/` — the docs, this file, later the code — cite a node by its sid, never by its
  address; the tools refuse an address outside the specification.
- Commit messages follow the history: the part first, then what changed, in plain sentences
  ("Design log: …", "Core guidelines: …").

## When code arrives

The tools are written in TypeScript on Node and read code with tree-sitter. Their source is kept in
`packages/specsheriff/` (the npm package providing `sheriff`) and `packages/pytest-specsheriff/` (the
plugin for pytest). In the worked example and
any project taking the core, every symbol of the system's code carries `@spec <sid>` (or
`@spec none <reason>`) in the comment directly above it, a test declares the sid it verifies and is
written first, and a commit changing code names every checked node it serves; the exact syntax is in
`tools.json`. The repository's tools, configuration and tests are exempt from tags by where they live
(§s-kgbzk2ph9e6jfb4). The tools' own tests are not exempt from sids, by the owner's choice
(2026-10-28): each declares the sid of the node of `spec.json` or `tools.json` it verifies and is
written before the code it tests, so that this repository works by the method it offers.
