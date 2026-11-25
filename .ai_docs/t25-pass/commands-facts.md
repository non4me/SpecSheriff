# "The commands" (s-f5rz6b7dhxejjts): facts for its rewrite

This file gathers the facts that the drafts of the new wording of "The commands" (tools 2) must rest on.
It proposes no wording.
It was written on 2026-11-21 from the code of the SpecSheriff tools, the current appendix, the staged new form and the notes.

How to read it:

- A path such as `cli.ts:62` is under `skills/tools/src/`, unless it starts with another folder.
- "tools.json" is `specs/_guidelines/tools.json`, the current appendix.
- "staged" means `.ai_docs/t25-pass/moved/specs/`; a path such as `staged spec.json:6783` is in `staged/_guidelines/`.
- "The continuation file" is `.ai_docs/t25-one-thought.md`, and "the inventory" is `.ai_docs/t25-pass/stage2-inventory.md`.
- "(inference)" marks a conclusion of this file's author, not a fact found in a source.

The node itself is at tools.json:190.
It holds 22 outgoing links, 17 decisions, 1 todo and 32 tests.

---

## 1. Every `sheriff` subcommand that exists today

The CLI dispatches in `run()`, `cli.ts:62-165`.
Its usage text is at `cli.ts:18-45`.
An unknown command is written to standard error with the usage text, with exit code 2 (`cli.ts:161-163`).
An error thrown by any command is printed as `sheriff <command>: <message>`, with exit code 1 (`cli.ts:171-176`).
A reader that closes the pipe early, as `| head` does, ends the command with exit code 0 (`cli.ts:167-168`).

| Command | What it does | Dispatch | Implementation |
|---|---|---|---|
| (none) | Prints the usage text, exit 0. | `cli.ts:64-66` | — |
| `--version` | Prints the version from `skills/tools/package.json`. | `cli.ts:67-69` | — |
| `reindex` | First rewrites the tests that name a node by a bare sid, then reindexes the specification. Prints `rewritten:`, `merged:`, `made a draft:` and `written:` lines. Always exit 0 unless it throws. | `cli.ts:70-77` | `rewriteTests` `reindex.ts:283-327`; `reindex` `reindex.ts:188-273` |
| `validate` | Checks the specification on its own, against the specification of the last commit (`lastCommitted`, `cli.ts:51-60`). Exit 1 if any finding is not marked "reported". | `cli.ts:78-82` | `validate.ts:30` |
| `approve [--withdraw] <sid>...` | Records an approval, or its withdrawal, for each sid. Requires `git config user.email`. Then runs `reindex()` (but not `rewriteTests`) and discards its report. | `cli.ts:83-93` | `approvals.ts:84-125` |
| `export` | Writes the readable export, one markdown file per file of the specification, into `md-version/`. | `cli.ts:94-96` | `generated.ts:46-55` |
| `render` | Writes the map into `specs/_viewer/index.html`. | `cli.ts:97-99` | `generated.ts:106-131` |
| `model` | Prints the model of the specification as JSON. | `cli.ts:100-102` | `model.ts:160-166` |
| `guide` | Prints the figures, whether the specification is approved, and every node of `specs/_guidelines/`. | `cli.ts:103-105` | `generated.ts:134-150` |
| `types` | Writes the types and RuntimeChecks generated from the RecordTypes, and the files of the project's own generators. Prints refusals, waiting nodes and written files. Exit 1 on a refusal. | `cli.ts:106-112` | `types.ts:385-404`; `generators.ts:27-74` |
| `binding` | Checks the specification against the code and the tests. | `cli.ts:113-117` | `binding.ts:115` |
| `citations` | Checks the sids in the code, the tests and the documentation. | `cli.ts:149-153` | `citationsOutside`, `binding.ts:519` |
| `message <file>` | Checks a commit message against the code it changes. | `cli.ts:118-126` | `message.ts:12` |
| `review <file>` | Asks the independent reviewer for its verdict on the commit. | `cli.ts:118-126` | `review.ts:305` |
| `guard` | Judges the edit that the agent's harness describes on standard input. Exit 2 with the reason on standard error. | `cli.ts:127-132` | `guard.ts:64` |
| `init [--agent claude\|codex]` | Sets the repository up. | `cli.ts:133-141` | `init.ts:126` |
| `remove` | Takes out what `init` writes, leaving `specs/` as it is. | `cli.ts:142-148` | `init.ts:248` |
| `show <sid\|location>` | Prints one node with its links. Refuses a key that no node holds (`show.ts:83`). | `cli.ts:154-157` | `show.ts:81-85` |
| `todos` | Prints every item of `meta.todos`. | `cli.ts:158-160` | `show.ts:73-78` |

There are 19 subcommands, plus `--version` and the call without a command.
No command `settings`, `extension`, `strict` or any command that approves the specification exists (a search of `src/` and the usage text).
The tools read no extension of the guidelines: no file under `src/` refers to `guidelines/extensions/`, and `withTaken` loads only `spec.json` and `tools.json` from the plugin (`spec-files.ts:102-106`).
The tools do not read `SPECSHERIFF_GUIDELINES_REPO` anywhere (a search of `src/` and `test/`).

The node's text does not mention `--version`, the call without a command, or the refusal of an unknown command.
Three of its tests test exactly these (section 8).

---

## 2. Commands that other nodes of the appendix already describe

| Command | Node that describes it | What "The commands" adds |
|---|---|---|
| `validate`, `binding`, `citations`, `guard`, `message`, `review` | "How each check is made" (s-4kd2pave7vm4hmd, tools 7, tools.json:945) and its sections "Checks made by `sheriff validate`" (s-6uqu6vn5fnp7fwb, tools 7.1), "Checks made by `sheriff binding`" (s-p34692nwceaxq2p, tools 7.2) and "Checks made by the other commands" (s-bgegrkhrgpefs69, tools 7.3), whose text reads "How `sheriff citations`, `sheriff guard`, `sheriff message`, `sheriff review` and the project's test command make their checks." `sheriff guard` is also in "The hooks" (s-477gtdrkw34dzxw, tools 6). | Only the cross-reference: "`sheriff validate`, `sheriff binding`, `sheriff citations`, `sheriff guard`, `sheriff message` and `sheriff review` implement the checks as the rules of §s-4kd2pave7vm4hmd describe them." |
| `init`, `remove` | "Setting a repository up and taking SpecSheriff out of it" (s-7unxytshhc4md54, tools 3, tools.json:456). | Only the cross-reference, one sentence each. The paragraph on the rule that `sheriff init` writes is about `sheriff reindex` (section 3). |
| `approve` | "How an approval is recorded" (s-v4qus7raqnwzneb, tools 11, tools.json:2880). | Only the cross-reference: "`sheriff approve` records an approval or its withdrawal (§s-v4qus7raqnwzneb)." Neither node says that the CLI runs `reindex()` after an approval or a withdrawal (`cli.ts:90-91`, comment: "A status changed is a change to the specification, after which the status of each section and header is built anew."). |
| `export` | "What the export, the guide and `sheriff show` write of a node" (s-k4nqjr96ux7a5m7, tools 5, tools.json:658) says what is written of a node. | "writes the readable export in markdown, one file for each file of the specification". Tools 5 does not name `md-version/`. The agreed draft of "Where the files are" (s-zefk589ykh37b8u) now names it: "`specs/_viewer/` for the map and `md-version/` for the export, both of which git ignores". The code empties the directory and writes a `.gitignore` holding `*` into it (`generated.ts:39-43`). |
| `render` | "Building the map" (s-rpv4fkdqqguptqd, tools 4, tools.json:605), which already says it "writes into `specs/_viewer/` a web page that draws the map". | A description of the map: "the mindmap of the specification's structure drawn from its nodes". |
| `show` | Tools 5: "`sheriff show` writes the node alone." | How the node is found: "found by its sid or its location". Two unit tests check this (`show.test.ts:41`, `:57`). |
| `guide` | Tools 5: "`sheriff guide` writes each node of the guidelines as the export does, except its metadata." | What `guide` prints as a whole: the nodes of "the base, the appendix of the tools and the project's own", the figures per part, and whether the specification is approved. |
| `model` | No node describes it. "How a project's own check is run" (s-7pk89t8z6wymmj9, tools 7.1.23) says a check "is handed on its standard input what `sheriff model` prints". "Generated copies against the nodes" (s-dbk2vyeg8z5jxna, tools 7.2.8) runs each generator "as `sheriff types` runs it". | The only description of the model's content. |
| `todos` | No other node. | The whole description. |
| `types` | "Where the types and RuntimeChecks generated from the RecordTypes are written" (s-pvzms7d8kxb8dk2, tools 17, tools.json:3380) gives the files and the languages. "What a RecordType generates" (s-suv42g8r3ra2h6b, tools 18), "A RecordType its variants refine" (s-nk8td3ez58gahc4, tools 19) and "The type each neutral type of a field gives" (s-4npdup7mjkva69y, tools 20) give the content. "The hooks" (tools 6) says when it runs and how the pre-commit hook copies its files. Tools 7.2.8 compares the copies. | Which files it writes (only changed ones), that it names them, its refusals, the waiting for approvals, and the protocol of a project's generator. |
| `reindex` | No node describes it whole. "The hooks" (tools 6) says when it runs. "Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt" (s-agc6fb3vx46pc23, tools 7.1.9) says that `sheriff validate` rebuilds the same things in memory. The current "The schema and a project's extension" (s-xzcw3hv4hmxz7h7, tools 7.1.2) and the agreed draft "Validation against the schema before a command works on the files" say when it validates. | Everything else (section 3). |

These nodes cite "The commands" for a behaviour of `sheriff reindex` or `sheriff types`:

- tools 7.1.2 (s-xzcw3hv4hmxz7h7): "once it has merged each key written twice and changed what an earlier release wrote, as §s-f5rz6b7dhxejjts says";
- "An approved node's approval" (s-95w92rnjuv3sst8, tools 7.1.5): "The approvals of the parent are read as `sheriff reindex` would rewrite them (§s-f5rz6b7dhxejjts).";
- "From a draft to an approved specification, and back" (s-j9r8z4xdrfkfs47, tools 7.2.3): the specification before a commit is "read as `sheriff reindex` would rewrite it (§s-f5rz6b7dhxejjts)";
- "The SpecTags the tests carry" (s-utf4mbt7ref8g9c, tools 7.2.4): "A test whose only change puts `@spec ` before the bare sid it carried (§s-f5rz6b7dhxejjts) does not count as changed";
- tools 7.2.8 (s-dbk2vyeg8z5jxna): "Each copy is compared with what the last commit holds instead while a node it waits for is a draft (§s-f5rz6b7dhxejjts)."

Four agreed drafts cite it too (section 9).

---

## 3. `sheriff reindex`

### 3.1 What it writes or changes today

In the order the code runs it:

1. **Tests named by a bare sid** (`rewriteTests`, `reindex.ts:283-327`, called by the CLI before `reindex()`, `cli.ts:71`).
   - It reads only tracked files (`reindex.ts:289`, `diff.ts:38`) that the settings name as tests of the system's code or of a project's own check or generator (`reindex.ts:284-286`).
   - A bare sid is found by `code.ts:243` and `code.ts:251-258`.
   - It writes `@spec ` before the sid (`reindex.ts:297-299`) and renames the test in every node's `meta.tests` (`reindex.ts:307-325`).
   - It names each test file it rewrites (`reindex.ts:304-305`; printed as `rewritten:`, `cli.ts:71`).
   - It does not name the files of the specification whose `meta.tests` it rewrites (`reindex.ts:323`). Those files are already rewritten when `reindex()` reads them, so `reindex()` does not report them either. The node says "`sheriff reindex` names each file it rewrites."
   - It reads and writes those files of the specification with `JSON.parse` and `canonical` (`reindex.ts:309`, `:323`), before any merge of keys written twice. JSON.parse keeps the last of two values under one key (`json-text.ts:1-4`). So a file that holds a key twice and a renamed test loses the first value without a word (inference from the code; no test covers it).
2. **Reading and merging** (`reindex.ts:192-202`). Every JSON file under `specs/` except `_schema/` and `_viewer/` is read, the archive included (`spec-files.ts:38-62`). Each is read through `mergeKeys` (`json-text.ts:139-166`). Each merge is reported (`reindex.ts:197`, printed as `merged:` at `cli.ts:73`). Two values that cannot be merged throw, naming the file, the key and both lines (`json-text.ts:157-160`, `reindex.ts:199-201`), before any file is written.
3. **What an earlier release wrote** (`renameEarlier`, `reindex.ts:70-102`), in every file, the archive included:
   - keys `id` → `location` and `rationale` → `reason`, each in its place; the old key is dropped where the node already holds the new one (`reindex.ts:34`, `:74-78`);
   - kinds `record` and `recordType` → `RecordType`, `rule` → `TextRule`, `domain` → `header` (`reindex.ts:36`, `:80`);
   - status `""` → `draft`, `checked` → `approved` (`reindex.ts:82-83`);
   - a string `owner` → `owners: [owner]`, in place, on any node, not only a section or a header (`reindex.ts:84-88`);
   - the kind named by a field `from: "kindSids"`, at any depth of a RecordType's fields (`reindex.ts:39-45`, `:90`);
   - an empty own list of a field `is: "one of"` with no `from` → `from: "domains"` (`reindex.ts:92-97`).
4. **The project's extension of the schema**: its `fields` keyed by an earlier kind are renamed (`renamedExtension`, `reindex.ts:51-64`). The file is written and reported whenever anything was renamed (`reindex.ts:268-271`).
5. **Validation**. A copy of each file is validated against the schema composed with the project's extension (`reindex.ts:205-207`). The copy has what the reindex writes itself set to an accepted value (`asValidated`, `reindex.ts:104-137`). A refusal throws, and no file is written.
6. **The rule that approves the specification** is added to `project.json`, as a draft, where no rule there refines s-qzthyh7yqvfhsa2 (`reindex.ts:208-218`, node built by `model.ts:19-25`). In the repository where the guidelines are written, it is added only if the files hold s-qzthyh7yqvfhsa2 (`reindex.ts:211-213`).
7. **Sids**. Every node without a sid that matches the pattern gets a new random sid, and every node's `location` and `sid` are put first (`giveSids`, `reindex.ts:139-155`; `newSid`, `reindex.ts:25-31`). The archive is left out (`reindex.ts:154`).
8. **Locations** are computed (`locations`, `model.ts:67-110`) and written (`reindex.ts:222-225`).
9. **Incoming links** are rebuilt (`incoming`, `model.ts:140-154`; written at `reindex.ts:223-227`).
   - A node of `spec.json` or `tools.json` keeps only the links from those two files (`model.ts:146-147`, with `specSheriffGuidelines` defined at `model.ts:55`).
   - The incoming links of the archive's nodes are removed (`reindex.ts:228-230`).
   - The archive's outgoing links are not mirrored, since `incoming` walks only the nodes outside the archive (`spec-files.ts:65-80`).
10. **The index of each domain's header**: sid, title, text and `usedBy`, for every header in a part other than `_guidelines`, `tech` and `contracts` (`reindex.ts:157-181`, `:231`). No extension is consulted.
11. **Gathered values**: beside each RecordType field `is: "one of"` with a `from`, the key `gathered` is written, and elsewhere it is deleted (`reindex.ts:232-240`). The sources are `domains`, `domainNames` and `kindSids` (`values.ts:43-69`).
12. **Drafts**. An approved node whose latest line for its sid and fingerprint is not an approval becomes a draft and is reported (`reindex.ts:242-251`; `stands`, `approvals.ts:64-67`; `fingerprint`, `model.ts:300-313`). Sections, headers and the SpecSheriff guidelines a project takes are left out (`judgedHere`, `reindex.ts:183-186`). Printed as `made a draft:` (`cli.ts:74`).
13. **Statuses of sections and headers** are built (`builtStatuses`, `model.ts:205-228`) and written (`reindex.ts:252-255`).
14. **`specs/_confirmations.jsonl`** is moved into `specs/_approvals.jsonl` (`migrateApprovals`, `approvals.ts:46-56`, called at `reindex.ts:257`).
15. **Writing**. Each of the repository's own files whose canonical text differs is written and named (`reindex.ts:259-267`; `canonical`, `spec-files.ts:109-111`; printed as `written:`, `cli.ts:75`). The guidelines taken from the plugin are never written.

What it does not do today:

- It does not build `meta.code` or `meta.tests`. No command builds them (a search of `src/` for writes to them finds only the renaming in step 1). `sheriff binding` only compares them with the SpecTags (`binding.ts:231-253`), as "A node's `meta.code` and `meta.tests`" (s-t383grkn3q68dpf, tools 7.2.5) says.
- It knows no `TableRule`: no file under `src/` reads `rows` or `cells`.
- It removes no sid from the archive.
- It writes no `x-enumSource`.

The current node orders the steps differently from the code: "Before anything else, `sheriff reindex` renames each key and value an earlier release of the SpecSheriff tools wrote under another name", then "Then, in every file it rewrites, `sheriff reindex` merges".
The code merges first, while reading (step 2), and renames afterwards (step 3).
The agreed draft "Validation against the schema before a command works on the files" states the code's order (section 9).

### 3.2 What the staged new form requires of it

**Sids and locations, including the nodes in cells of a `TableRule`.**

- "A node of the specification has a sid, given to it once and never changed." (s-9spq78kdwsxr759, 1.2.2, staged spec.json:293)
- "Each cell of the table holds either text or a node of a kind that the specification's schema declares, such as a rule or a term. A node in a cell has no title of its own. Its column and its row name it." Its reason: "A requirement in a cell that is a node can be approved, cited and bound to code on its own." (s-5fewsp22mmdz7y6, 8.6, staged spec.json:3828)
- "The location is computed from where the node is and is never written by hand." (s-kag2m9tzdnduxdx, 8.5, staged spec.json:3781)
- The staged schema: "a node in a cell requires a `sid` and refuses a `title`" (`moved/report.md`, "The node").
- Open: 8.5 does not say how a node in a cell is numbered (inventory P2). The staged files hold temporary numbers such as 10.1.20a. No rule states the location of a domain's header, nor the numbering of the contracts section across files (inventory P3).

**Incoming links** (s-bpdqd9v72wg7vsz, 6.4, staged spec.json:2543):

- "The links pointing at a node are rebuilt from the links the nodes declare: every such entry is removed first and built again. They are never written by hand."
- "A node of the archive holds no link pointing at it. No link it declares is mirrored in another node."
- "A node of the SpecSheriff guidelines holds only the links pointing at it from the SpecSheriff guidelines and from the appendix of the tools (§s-a4rbry4hsu34hy8). A node of an extension that the project has chosen (§s-9ttvcwpqkehm58g) holds only the links pointing at it from that extension and from the appendix of the tools."
- Today's code treats `spec.json` and `tools.json` as one group (`model.ts:55`, `:146-147`), which gives the same result for the guidelines. It knows no extension.

**The index of a domain's header** (s-2r59txnms5serdr, 11.1.4, staged extensions/domains.json:192), only where the Domains extension is chosen:

- "The index a domain's header carries (§s-yggv9myedprnaa7) is built from the domain's sections and never written by hand. For each section the index lists: its sid, its title and its text, which states what the section is responsible for; the domains that use it."
- "A project uses an extension only by its own choice." (s-mbmnsnxenmavu3z, 1.7.1, staged spec.json:1405)
- The staged schema makes `sections` optional (`moved/report.md`, "The Domains extension").

**Gathered values in `x-enumSource.gathered`** (s-ju5vcanbjph7mgh, 12.9, staged extensions/recordtype.json:578):

- "The values of a field with `enum` (§s-xfu2gpzddjnmgks) that come from elsewhere in the specification are written beside the field. Each is written with the node it comes from. The SpecSheriff tools gather them anew after every change to the specification. Only the SpecSheriff tools write them."
- The staged schema keeps them in `x-enumSource.gathered`, as `[{value, sid}]` (`staged/_schema/extensions/recordtype.schema.json:147-208`, comment at `:148`).
- `moved/report.md` ("The RecordType extension", "For stage 3"): "`sheriff reindex` must write the gathered values into `x-enumSource.gathered` (12.9), and `validate` must refuse gathered values that the source does not produce."
- The sources are now `{"from": "parts"}` and `{"from": "kind", "kind": …}` (`recordtype.schema.json:151-156`). Today's sources are `domains`, `domainNames` and `kindSids` (`values.ts:51-63`).
- Row 12.12.14 (s-93jpnb4c96qhwbu): "The values gathered beside a field are exactly what their source produces".

**The approval status of sections and headers** (s-9kfdycuq34beqvs, 1.3.8, staged spec.json:975):

- "The SpecSheriff tools derive a section's approval status from every node under it other than a section, at any depth. They recompute it after every change to the specification. Nobody sets it by hand."
- The rule speaks only of a section. The Domains extension has no rule saying that a header's status is derived from the nodes under it (`t25-one-thought.md:130`: "that gap is to be brought up with the owner when the extension is next changed").
- The agreed draft "Validation against the schema before a command works on the files" lists "the approval status of a section (§s-9kfdycuq34beqvs) and of a domain's header (§s-yggv9myedprnaa7)" among what `sheriff reindex` writes.

**Making a node a draft** (s-5ah25f6gy99panq, 1.3.5, staged spec.json:771):

- "The wording an approval covers is a node's title, text, reason and examples, and the fields the node's kind adds alongside them, such as `TextRule.list`. A change to any of these makes the node a draft, even where one of the node's owners makes it. The wording of a node in a cell of a `TableRule` also includes the text cells of its row and the headings of its column and of its group."
- "An approval survives a change to: the node's links or its metadata; who its owners are; what is built into it from other nodes; where it is in the specification."
- Today's fingerprint counts every key outside `NOT_WORDING` (`model.ts:285`), so `examples` already counts. It cannot include the cells of a row or the headings of a column, since the tools know no `TableRule` (fact). It drops a key named `gathered` at any depth (`model.ts:311`), so `x-enumSource.gathered` would also be left out (inference).
- The SpecSheriff guidelines and the chosen extensions "stand approved there as they were approved where they are written" (s-bsya3febm6u64ab, 2.5, staged spec.json:1802). So the reindex leaves the extensions' nodes out as it leaves out the guidelines (inference).
- Which repository judges the guidelines' approvals is decided today by `writesSpecSheriffGuidelines` (`reindex.ts:184-189`, `:246`, `:254`). The agreed "Where the files are" replaces the key by the environment variable (section 4).

**`meta.code` and `meta.tests`** (s-rwqzepmrt77rv35, 9.7, staged spec.json:4261):

- "The SpecSheriff tools build a node's `meta.code` and `meta.tests` from the SpecTags that bind code and tests to it. They rebuild them after every edit to the code, the tests or the specification. Nobody writes them by hand."
- "In a node of the SpecSheriff guidelines or of an extension of the guidelines (§s-mbmnsnxenmavu3z), the SpecSheriff tools list only the code and the tests of the repository where the guidelines are written."
- Row 10.1.34 (s-tqdmk6jakx97wra, staged spec.json:5633): "A node's `meta.code` refers to every code file that a SpecTag naming the node binds, and to no other file. Its `meta.tests` refers to every test file that holds a test with a SpecTag naming the node, and to no other file". Today `meta.tests` names each test as `<file>::<name>`, and `binding.ts:250-253` compares whole entries (fact). The row compares files only (fact); whether the built list keeps test names is open (inference).
- No command builds the lists today (section 3.1).
- The continuation file (2026-11-11, line 1221 of `t25-one-thought.md`): "**Owed to tools.json and the tools step, test first:** a rule of tools.json on building the lists (which command, reading the code with tree-sitter, writing `meta.code` and `meta.tests` into `specs/`, run where the reindex runs), its tests, `binding.ts:232-238` no longer comparing lists written by hand".
- The after-edit hook runs `sheriff reindex` only where "a file under `specs/`, `sheriff.config.json` or a file the settings name as the code of a project's own generator differs" (tools 6; `skills/claude-code/hooks/after-edit.sh:29-37`). An edit to code or tests alone would leave the lists stale (inference). The git hooks do not run `sheriff reindex` at all (tools 6).

**The rule that approves the specification, which the new form removes** (s-qzthyh7yqvfhsa2, 10.6, staged spec.json:6783):

- "Only an owner of the specification approves it or returns it to draft. That owner records each such act in a separate entry, which names that owner. Only the latest such entry determines the specification's approval status."
- Its reason: "Approving the specification is a decision of its own, separate from approving any rule. Were the specification's approval status tied to a rule, anyone editing that rule would change it."
- The agreed draft "Project-wide settings" keeps "the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag" in `sheriff.config.json`.
- So the reindex's step 6 has no ground in the new form (inference). Its code is `reindex.ts:208-218`, its test is `reindex.test.ts:121`, and `sheriff init` writes the same rule (`init.ts:188`).
- The continuation file (`t25-one-thought.md:162`): "The nodes s-f5rz6b7dhxejjts, s-j9r8z4xdrfkfs47, s-v4qus7raqnwzneb and s-7unxytshhc4md54 still say that the specification's approval status is read from a rule in `project.json`, and binding.ts, push-mode.ts, reindex.ts and generated.ts still read that rule; they are to say that it is read from the entries in `sheriff.config.json`."
- The readers of that rule today: `binding.ts:147-162`, `push-mode.ts:18`, `generated.ts:147`, `approvals.ts:97-99`, `validate.ts:110`.

**The merge of keys written twice.**

- No staged rule of the guidelines asks the reindex to merge. Row 10.1.1 (s-d5cgda5bdsn7bzy, staged spec.json:4513) refuses "No object in a file of the specification, of its archive or of its schema assigns two values to one property".
- The merge is required by the agreed draft "Validation against the schema before a command works on the files": "Before that validation, `sheriff reindex` merges each key written twice and changes what an earlier release wrote (§s-f5rz6b7dhxejjts)." Its reason: "A key written twice is merged first, since a file read without the merge holds only its last value."
- The current node's text and reason state the merge rules (two lists, two objects, two values equal as JSON Schema holds them; every merge named; any other pair refused, no file written). Its decision of 2026-10-21 records the owner's ruling.

**The rewriting of tests that name a node by a bare sid.**

- No staged rule requires it. Its ground is the current node's reason: "A test names its node in the form the release of its day reads, so a release that changes that form rewrites the tests as well." Its decision of 2026-11-06 records it.
- "The SpecTags the tests carry" (s-utf4mbt7ref8g9c, tools 7.2.4) relies on it, and `binding.ts:194` names `sheriff reindex` in its message for a bare sid.

**What else the new form asks of the reindex.**

- An archived node loses its sid (section 4.2).
- "Every procedure that writes the specification, or what is generated from it, is idempotent: run again on what its previous run left, it gives the same result and changes nothing." (s-jsqxdx47wkkj7gp, 10.13, staged spec.json:7243)
- The inventory's item "moves on an archived node's replacement when that replacement is archived (s-f2b5zvc565s242f)" is obsolete. On 2026-11-21 the owner made the replacement optional, and "No tool updates the reference to a replacement any more" (continuation file, stage-2 notes on "A removed node and the archive").

---

## 4. Migrations from earlier releases

### 4.1 Done today

| Migration | Code | What the staged form requires |
|---|---|---|
| `id` → `location` | `reindex.ts:34`, `:74-78` | 8.5 (s-kag2m9tzdnduxdx): a node has a location. The archive's schema requires "a location (§s-kag2m9tzdnduxdx) and a kind" (agreed draft "Validation of a file of the archive"), so this rename must precede the archive's validation (inference). |
| `rationale` → `reason` | `reindex.ts:34`, `:74-78`; the fingerprint still puts the reason under `rationale` (`model.ts:296-301`) | 1.3.5 (s-5ah25f6gy99panq) names "reason" as part of the wording. |
| Kinds `record`, `recordType` → `RecordType`; `rule` → `TextRule`; `domain` → `header`; also in a field's `kindSids` kind and in the extension's `fields` | `reindex.ts:36-64`, `:80`, `:90`; the fingerprint keeps the earlier names (`model.ts:282-283`, `:308`) | The staged `node.schema.json` defines only `section`, `TextRule`, `TableRule` and `term`. `header` comes only with the Domains extension, and `RecordType` only with the RecordType extension (`moved/report.md`, "The files and how they compose"). A migrated `header` or `RecordType` node is valid only where the project has chosen that extension (inference). No staged rule or note says how a project on an earlier release comes to have them chosen. Only an owner chooses (s-9ttvcwpqkehm58g). |
| Status `""` → `draft`, `checked` → `approved` | `reindex.ts:82-83`; `statusNow`, `model.ts:28` | The status enum is `draft`, `approved` (`staged/_schema/node.schema.json:240-246`); the list of 1.3.1 (s-tgrnpagrb58tya7). |
| `owner` → `owners` | `reindex.ts:84-88`; `named`, `model.ts:169-173` still reads `owner` | `owners` is a list (`staged node.schema.json:247`). |
| `_confirmations.jsonl` → `_approvals.jsonl`, `owner` → `by` in each line | `approvals.ts:15-56`, `:131-142`; `reindex.ts:257` | The agreed "Where the files are" keeps "The approvals of nodes (§s-67vekyup7y8smap) — `specs/_approvals.jsonl`". The owner kept that row "until T28" (its ruling of 2026-11-21). |
| An empty own list of a field `one of` → `from: "domains"` | `reindex.ts:91-97`; the fingerprint writes it back as an empty list (`model.ts:309`) | The list of 12.7 (s-xfu2gpzddjnmgks) has no such source: "its own list", "the names of the parts of the base specification", "the sids of the nodes of one kind". The inventory: "The migration of an empty list of a field of type `one of` goes with the source "the values the domains add" (s-xfu2gpzddjnmgks)." The rules that let domains add values, 1.28 (s-96df5fcfqsvex9d) and 1.29 (s-gzfq3x8hesj227e), are archived (`moved/report.md`). |

### 4.2 Needed for the new form

**The sid of an archived node is removed.**

- "An archived node has no sid of its own." (s-f2b5zvc565s242f, 2.6, staged spec.json:1899)
- The agreed draft "Validation of a file of the archive": the schema requires that a node of the archive "holds no sid, no node under it and no link pointing at it (§s-bpdqd9v72wg7vsz)", and "`sheriff reindex` does so after it has changed what an earlier release wrote (§s-f5rz6b7dhxejjts)".
- The continuation file: "\"The commands\" (s-f5rz6b7dhxejjts) is to say that `sheriff reindex` removes the sid of a node that an earlier release archived with one, before it validates the archive. archive-file.schema.json and its comments are to change with this node." It repeats this under "Still to be done for these nodes in stage 3".
- Today `giveSids` skips the archive (`reindex.ts:154`), `validate` matches an archived node by its sid (`validate.ts:114-126`), and `citations` accepts a sid of the archive (`binding.ts:522-531`). Row 10.1.39's todo: "`sheriff citations` stops looking for sids among the archived nodes".

**`required` → `guaranteed`, overtaken.**

- 12.5 (s-adhmw4gw6y82f44, staged extensions/recordtype.json:298) is about which fields "A RecordType … marks … as guaranteed". It names no property.
- The continuation file (2026-11-15): "`sheriff reindex` renames the property `required` to `guaranteed` in every RecordType node of a project, as it renamed the kinds of node in commit 1e50209".
- The later JSON Schema ruling (2026-11-19, continuation file under "The owner ruled that everything about RecordType follows JSON Schema 2020-12") replaces the field list by a JSON Schema: "In node.schema.json, a RecordType contains a `schema` property, a JSON Schema object, instead of the properties `fields` and `unknown`." It also says: "The type `variant` and the value `"where it holds a value"` of `required` are removed."
- The staged schema has no `guaranteed` property. It marks a guaranteed field by JSON Schema's own `required`: "each field a property, with its type, its bounds, whether its value is guaranteed (required) and what it means (description)" (`recordtype.schema.json:10`).
- So the rename to `guaranteed` is overtaken, and a guaranteed field is migrated as part of the next item (inference).

**A RecordType's `fields` and `unknown` → `schema`.**

- 12.2 (s-6eb92ddch7shuvu, staged extensions/recordtype.json:109): "each of its fields, with the field's type in terms that belong to no programming language, including any bounds on the field's value, whether the field's value is guaranteed and what the field means".
- The staged schema requires `schema` and keeps `chosenBy`, `answersTo` and `identifiedBy` (`recordtype.schema.json:4-50`). The current schema requires `fields` and `unknown` (`specs/_schema/node.schema.json:126-181`), each field with `name`, `type`, `required` and `text` (`:473-549`).
- The mapping is not written down anywhere found (inference). Probable correspondences: a field → a property of `schema.properties`; `required: true` → the name in `schema.required`; `text` → `description`; `unknown: "refused"` → closing the object; `is: "one of"` with values → `enum`; `from: "domainNames"` → `x-enumSource: {from: "parts"}`; `from: "kindSids"` with `kind` → `x-enumSource: {from: "kind", kind}`; `gathered` → `x-enumSource.gathered`; a field of type `variant` → its variants' fields at the same level, under 12.6 (s-z3dnru6qqdf9m6j).
- The fingerprint would change for every RecordType, and each would become a draft, unless the fingerprint maps the new form back as it does for the earlier renames (`model.ts:282-312`) (inference).

**`supersedes` links are removed.**

- The list of 6.1 (s-sn6au3vcr9uy5pm, staged spec.json:2390): `implements`, `refines`, `constrains`, `exempts`, `checks`, `cites`, `term-relation`, `uses`.
- `moved/report.md`, "Links": "`supersedes` is removed, which the owner ruled on 2026-11-12. `consumes` moves to the Domains extension (11.1.3, s-yggv9myedprnaa7)."
- The staged enum of link types has no `supersedes` (`staged/_schema/node.schema.json:266-277`). Today's schema allows it (`specs/_schema/node.schema.json:342`), and `validate.ts:137` accepts a `supersedes` link to an archived node.
- This repository's specification holds no `supersedes` link; the word appears only in the list of current 2.2 (`specs/_guidelines/spec.json:2631`). A project's files may hold such links (inference).
- A `consumes` link is valid only where the Domains extension is chosen (inference from the report).

**`TextRule.list.declaredIn` changes.**

- The todo of row 10.1.35 (s-f5mm7tagez38ffz, staged spec.json:5671, in `meta.todos`, 2026-11-20): "In node.schema.json, `TextRule.list.declaredIn` is replaced by two properties of `TextRule.list`: `jsonSchema` ({file, pointer}) and `valueList` ({file, symbol}). … The nodes s-tgrnpagrb58tya7 and s-sn6au3vcr9uy5pm of spec.json and the node s-xr5xxa9cxf2mq5u of tools.json are switched to the new properties."
- The row's text: "Each value listed in `TextRule.list` is valid against the JSON Schema at the place that `TextRule.list.jsonSchema` points to. … The code symbol that `TextRule.list.valueList` points to declares exactly the values listed in `TextRule.list`".
- The staged schema still holds `declaredIn` (`staged/_schema/node.schema.json:368-386`), and so do 8.4 (s-hhnahzmhahf8jht), the lists of 1.3.1 and 6.1 (inventory P1).
- The todo names only the nodes of the guidelines. A project's own lists that hold `declaredIn` would need the same migration: a JSON pointer becomes `jsonSchema.pointer`, and the name of a declaration in code becomes `valueList.symbol` (inference).
- `TextRule.list.field` is removed from the schema (`moved/report.md`, "The node"). `values.ts:53` still reads it.

**The approval of the specification moves from a rule to an entry.**

- Not in the task's list, but found. The continuation file (line 1084): "the rule s-p92k6vfe3ju27at in `specs/_guidelines/project.json`, where a project already approved by means of that rule must keep its status when the tools move its approval to the new entry".
- The entry lives in `sheriff.config.json` (agreed "Project-wide settings").

**`writesSpecSheriffGuidelines` gives way to `SPECSHERIFF_GUIDELINES_REPO`.**

- The agreed "Where the files are": "The SpecSheriff tools recognize that repository only by the environment variable `SPECSHERIFF_GUIDELINES_REPO`, which holds the path to its root."
- The continuation file: "In stage 3 the variable replaces the key `writesSpecSheriffGuidelines`: the SpecSheriff repository's own `sheriff.config.json` no longer contains the key; the tests that write the key into the configuration of a test repository set the variable instead".
- The readers of the key: `config.ts:42`, `:61`, `:69`, `:75`; `spec-files.ts:90-96`; `reindex.ts:184-189`, `:213`, `:246`, `:254`; `validate.ts:36`, `:97`, `:109`, `:125`; `binding.ts:232`, `:497`; `guard.ts:117`.
- `config.ts:61` refuses an unknown key. Once the key is dropped from the accepted keys, a `sheriff.config.json` that still holds it is refused unless something removes it (inference). `sheriff init` never writes the key (ruling recorded in the draft "Project-wide settings").

**NodeKind renamed "kind of node".**

- This is a matter of the node's wording, not of the files. The node says "NodeKinds" three times.
- The decision of 8.3 (s-vsh384ybt4w25a2), 2026-11-10: "The owner: the name NodeKind is removed, and the node speaks of a project's own kind of node."
- The continuation file: "NodeKind goes from the 19 lines of `spec.json` and the 11 of `tools.json` not otherwise rewritten".
- The node's other bare keys are to be written with their object: "**Owed at the review of `tools.json`.** `declaredIn` in spec/1.23 becomes `TextRule.list.declaredIn`, and the bare keys in tools/2." Bare keys in the node today: `id`, `location`, `rationale`, `reason`, `owner`, `owners`, `by`.
- The inventory (X4) also lists "a field of type `one of`, now a field with `enum` (s-xfu2gpzddjnmgks)" among the renamed terms that the node uses.

---

## 5. `sheriff types` and generated code

### 5.1 The staged rule

"Code generated from approved wordings" (s-qyjw8xez6t6adc3, 10.15, staged spec.json:7347):

> Whatever the SpecSheriff tools and a project's own generators (§s-km4x4s26kv7pjze) generate as part of the system's code (§s-hheus6f395ynqvc), they generate from the nodes' approved wordings (§s-5ah25f6gy99panq). The part generated from each node follows the last wording of that node that was approved, even if that approval has since been withdrawn. Nothing is generated from a node that has never been approved.
>
> Where the approved wording of a node relies on a node that has never been approved, nothing is generated from the dependent node either, and the SpecSheriff tools report the dependent node by its sid.

Its reason: "A generated file often comes from many nodes, some of them drafts. The rule lets that file be regenerated as soon as each approval is given, yet implement only what the nodes' owners have approved (§s-utvqbypzhmgndug). The code of a node whose approval has been withdrawn stays as it was, as the code of any rule that has become a draft does. Code generated from a node that relies on a node that has never been approved would implement the latter as well."

Rows of the main table:

- 10.1.39a (s-dwxjxb7rw4w5yn3, staged spec.json:5839): "Every copy of the system's code generated from the nodes and kept in the repository is exactly what the approved wordings of its nodes produce".
- 10.1.39b (s-f8fmudceuyaj942, staged spec.json:5881): "A node from which nothing is generated, because its approved wording relies on a node that has never been approved".

10.14 (s-kh8qcd5kxgh9z3j, staged spec.json:7275): "The SpecSheriff tools regenerate everything that is generated from the nodes after every change to them. What is generated as part of the system's code is generated from the approved wordings of the nodes (§s-qyjw8xez6t6adc3)."

### 5.2 How the node and the code differ from it

| Today | Where | The new form |
|---|---|---|
| The types and RuntimeChecks wait while any RecordType is not approved. One draft RecordType holds back every file. | `waitingRecords`, `types.ts:380-383`; `types.ts:392-394` | Each node's part follows its last approved wording. Only a node never approved, or one relying on such a node, generates nothing. |
| A generator's file waits while any node it names, or the rule listing the generator, is a draft. | `generators.ts:66-71` | Generated from approved wordings. 10.9 keeps one waiting case: "While the rule that lists the generator is a draft, the code the generator has written stays as it is." |
| Generation reads the current wordings (`loadSpecification`). | `types.ts:386`; the model handed to a generator, `generators.ts:32`, `:42` | The last approved wording of each node. To generate from approved wordings, a generator would have to be handed a model of those wordings (inference). |
| No lookup in git history. An approval line holds only the sid, the fingerprint, `by` and `withdrawn` (`approvals.ts:7-13`). | — | The continuation file: "a description of where the tools find the last approved wording (since the record of an approval, s-v4qus7raqnwzneb, holds only the wording's fingerprint, the tools look the wording up in git history)". The inventory: "Generation from the last approved wording of each node, which the tools find in git history, and the report of a node that relies on a node never approved". |
| Reports "a draft node; the files generated from it wait for its approval" for each waiting node. | `cli.ts:109` | Reports a node from which nothing is generated because it relies on a node never approved (10.1.39b). |
| `sheriff binding` compares a waiting copy with the last commit instead, and reports each waiting node. | `binding.ts:316-356` | 10.1.39a compares each copy with what the approved wordings produce. |

What "relies on" means for a RecordType is not stated (inference).
Candidates are a `refines` link to another RecordType, an `identifierOf` reference, and the source of gathered values.

The node's own todo (2026-11-06): "The types and runtime checks take the values gathered beside a field, so the nodes those values come from are nodes they are generated from, yet they wait for the RecordTypes alone. Make them wait for those nodes too, once it is settled how a domain's header and a node of a project's own kind are confirmed."
The inventory: "“Code generated from approved wordings” (s-qyjw8xez6t6adc3) replaces waiting, so this todo is to be reconsidered."

The continuation file lists what changes with 10.15: "`sheriff types` (s-f5rz6b7dhxejjts), s-dbk2vyeg8z5jxna and s-477gtdrkw34dzxw in tools.json; a description of where the tools find the last approved wording …; skills/tools/test/unit/types.test.ts:516; the code of types.ts and binding.ts."
`types.test.ts:516` is the test "each generated file waits only for the nodes it is generated from", tagged s-kh8qcd5kxgh9z3j.
`types.test.ts:116`, tagged with this node, tests the old waiting too.

What the node says today and still holds in the code:

- `sheriff types` writes a file only where it is missing or differs, line endings aside (`types.ts:397-402`).
- It names each file it writes (`cli.ts:110`).
- It writes no file where anything is refused (`types.ts:389`; `generateTypes`, `types.ts:352-374`).
- The refusals of the types come from `typeFiles` (`types.ts:50-67`) and `declarations` (`types.ts:78-222`). The refusals of a generator come from `runGenerators` (`generators.ts:38-65`). The node attributes them to "the check of generated copies … (§s-dbk2vyeg8z5jxna)".

### 5.3 The project's own generators and generated copies

"A project's own code generators" (s-km4x4s26kv7pjze, 10.9, staged spec.json:6996):

> A project's own guidelines may add generators that write code from the nodes, alongside those of the SpecSheriff tools. A rule of the project's own guidelines refining this one lists these generators, with what each writes and from which nodes.
>
> Each such generator always writes the same code from the same nodes. Its code is generated from the approved wordings of its nodes, as §s-qyjw8xez6t6adc3 says. While the rule that lists the generator is a draft, the code the generator has written stays as it is.

The continuation file records the reviewer's remark that the sentence "Its code is generated from the approved wordings of its nodes, as §10.15 says" restates 10.15, "to be removed the next time 10.9 changes for another reason".

The protocol of a generator today (`generators.ts:8-74`), which the node states:

- it is run by the command the settings name, with the model on its standard input (`generators.ts:42`);
- it prints a JSON list of `{path, content, sids}` (`generators.ts:47-68`);
- it is refused when its rule does not list it (`generators.ts:35-41`), when it exits non-zero (`generators.ts:43-46`), when it prints no JSON list (`generators.ts:53-56`), or for a path outside the repository, into `.git` or under `specs/` (`generators.ts:57-65`).

The agreed draft "Project-wide settings" says the settings hold, for each generator, "the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests".
The agreed draft "What the SpecSheriff tools read in the project's own guidelines" lists "the project's own checks and generators … the members of the `TextRule.list` of the rule that `sheriff.config.json` names for each such check or generator".

"Generated copies against the nodes" (s-dbk2vyeg8z5jxna, tools 7.2.8, tools.json:2106) is the node that compares copies.
It says: "Each copy is compared with what the last commit holds instead while a node it waits for is a draft (§s-f5rz6b7dhxejjts). Each such node is reported."
It also refuses "a RecordType holding two fields of type `variant`, its inherited ones counted", which the JSON Schema ruling removes (continuation file: "Node 7.2.8 (s-dbk2vyeg8z5jxna) of the appendix of the tools must change. It requires the tools to refuse a RecordType with two fields of type `variant`.").
The inventory's proposed order says the paragraphs of "The commands" on `sheriff types` "may be revisited after Generated copies against the nodes".

---

## 6. `sheriff todos`, `sheriff model`, `sheriff guide`

### `sheriff todos`

The staged rule "A todo is kept on a node it concerns" (s-t28j22vbdmmeqnh, 1.2.5, staged spec.json:388):

> A todo is deferred work that concerns one node or several. It is kept as an item in the `meta.todos` of a node it concerns. It is never kept in a comment on the node. A todo is removed in each of these cases: it is done; it is given up.
>
> A todo that concerns several nodes is kept on one of them and cites the others. …

Its reason: "Kept in a comment, it is missed wherever the todos are collected."

No staged rule asks for a listing of the todos.

- The current text of the same sid said: "Every item of `meta.todos` across the specification can be listed at once, the newest first, each with the node it stands on." The staged text no longer says so.
- A decision kept in the staged node, 2026-11-10: "The reason referred to a node that required a list of all the todos." Ruling: "The owner: that node is deleted, so the reason no longer refers to it."
- The deleted node was 9.2 "The listing of every todo" (s-5z7d52ykd6bzctg). The continuation file: "it said what a tool does, not how the specification is kept; tools/2 (s-f5rz6b7dhxejjts) already describes `sheriff todos` fully, implements s-t28j22vbdmmeqnh, and its tests carry its own SpecTag, so at the move its `implements` link keeps pointing to 9.1's sid."
- The decision of 2026-11-05 kept in the staged node still reads "every item can be listed, the newest first, each with its node". The decision of "The commands" of the same day says "`sheriff todos` lists every item … Carrying out the owner's rule on work put off (§s-t28j22vbdmmeqnh)".
- The continuation file: "tools/2's `sheriff todos` paragraph still cites s-t28j22vbdmmeqnh and its decision restates the deleted listing; whether that citation and `implements` link stay will be settled there."
- The staged 1.2.5 no longer says that an item holds a date and an author. The staged schema still requires `date`, `by` and `text` (`staged/_schema/node.schema.json:549-572`).

The code: `show.ts:68-78`.
It reads every node of the specification except the archive, the guidelines taken from the plugin included.

### `sheriff model`

No staged rule names `sheriff model`.
10.8 (s-2fau85dfyyeq66m) and 10.9 (s-km4x4s26kv7pjze) do not say how a check or a generator reads the specification.
"How a project's own check is run" (s-7pk89t8z6wymmj9, tools 7.1.23) hands a check "what `sheriff model` prints".

The code gives each node "as its file holds it, without the nodes under it", with `part`, `file`, `parent` and `owners` (`model.ts:156-166`).
The node's text does not mention `parent`; its test does ("the node above it", `model.test.ts:175`).
In the new form the model would have to cover nodes in cells and the nodes of the chosen extensions (inference).

### `sheriff guide`

No staged rule names `sheriff guide`.
2.1 (s-a4rbry4hsu34hy8, staged spec.json:1664): "How one toolset carries out these rules is described in a separate document, the appendix of the tools. It is not part of the guidelines."

- Today `guide` prints every file whose part is `_guidelines`: `spec.json`, `tools.json` and `project.json` (`generated.ts:144-149`). It counts nodes per part, where `_guidelines` holds all three files (`generated.ts:135-143`). It reads the approval of the specification from the rule in `project.json` (`generated.ts:147`).
- It cannot print any extension, since no extension is loaded (`spec-files.ts:104`).
- The continuation file, from the agent's explanation to the owner of 2026-11-18: "On every run, the tools read the list, compose the schema, run the checks of the guidelines and of the active extensions, and `sheriff guide` prints the rules of the active extensions with an index of the others."
- The inventory: "`sheriff guide` also prints the chosen extensions, and no longer counts the appendix of the tools among the guidelines (s-a4rbry4hsu34hy8)." That conclusion is drawn from 2.1 (inference); no staged rule states it.
- The skill `spec` tells the agent to run `sheriff guide` first and calls its output "the SpecSheriff guidelines every project shares, their base and the appendix of the tools, and this project's own guidelines" (`skills/claude-code/skills/spec/SKILL.md:11-14`; the same in `skills/codex/skills/spec/SKILL.md:12-15`).
- Tests that encode the current content: `generated.test.ts:278` ("prints the SpecSheriff guidelines of this repository whole", every node under `specs/_guidelines/`) and `commands.test.ts:85` (checks `contracts: 4 nodes, 0 approved` and `The specification is a draft.`).

---

## 7. New procedures that may need commands

### Approving the specification, with its run of the checks

s-qzthyh7yqvfhsa2 (10.6, staged spec.json:6783):

- "Only an owner of the specification approves it or returns it to draft. That owner records each such act in a separate entry, which names that owner. Only the latest such entry determines the specification's approval status."
- "Before the approval procedure records an approval of the specification, it runs the checks listed in the main table of checks (§s-jau82aq9juv9zzh) or in the table of checks of an extension. It skips the review and the checks that need a commit message or a run of the tests. It runs the others as if the specification were approved and one commit added the whole specification and all of the system's code (§s-hheus6f395ynqvc). It shows the approving owner what they find … If the checks find anything, the procedure records the approval only after the owner confirms the approval. While the specification's `strict` flag is on, the procedure refuses to record the approval in the cases that the rule on that flag names (§s-q3pfzyaxvpr2zj2)."

10.2 (s-epaw9sgyaajzn8g, staged spec.json:6435) adds the moment: "before the approval procedure records an approval of the specification: the checks that the rule on the specification's approval status names (§s-qzthyh7yqvfhsa2), run over the whole specification and all of the system's code."

10.3 (s-83ev4wwesbwnhnp) refuses an agent's edit that would "change the approvals, the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them."

Row 10.1.27 has a todo (`moved/report.md`): the tests of the former mechanism "are rewritten for the entry that records the specification's approval status", together with tools 7.2.3, `approve.ts`, `binding.ts`, `approvals.ts` and `model.ts`.

Command today: none.
The specification is approved today by `sheriff approve <sid of the rule in project.json>` (`approvals.ts:97-99`).
`sheriff binding` checks the passage back to draft (`binding.ts:138-162`).
No command runs the checks over the whole specification and code "as if one commit added" everything.

### Turning the `strict` flag on and off, and listing what a check finds

s-q3pfzyaxvpr2zj2 (10.7, staged spec.json:6886):

- "Only an owner of the specification turns the `strict` flag on or off. That owner records each such act in a separate entry, which names that owner. Only the latest such entry determines the `strict` flag."
- "The following procedures refuse to run while a check that the `strict` flag makes stricter would refuse a commit or a push that changes nothing, if the specification were approved and the flag were on: the procedure that turns the `strict` flag on; the procedure that approves the specification, while the `strict` flag is on (§s-qzthyh7yqvfhsa2)."
- "Each refusal names the command of the SpecSheriff tools that lists what that check finds."

s-kkbqcb9xrpaepwn (9.5, staged spec.json:4104): "The warning of the second case and the refusal of the third each name the command of the SpecSheriff tools that lists that code by file and symbol."
"That code" is the system's code outside the commit that carries no SpecTag.

Row 10.1.27a (s-y5w6xwvwh857azx): "Each new entry that sets the specification's `strict` flag names one of the specification's owners as of the commit that adds it. No commit removes or changes such an entry".

Command today: none for the flag; `sheriff.config.json` holds no such entry.
The closest to a listing is `sheriff binding`. While the specification is a draft, it reports each untagged symbol and test that the commit leaves alone, one finding each (`binding.ts:164-200`).
Under 9.5 a draft specification passes "without a warning", and an approved one gets "a single warning for all such code". So the per-symbol listing has to move to a command of its own (inference).

The agreed draft "Project-wide settings" puts the entries in `sheriff.config.json`.
The agreed "Where the files are" lists "The schema of `sheriff.config.json`, which sets the default value of the `strict` flag".

### Choosing and withdrawing an extension

s-9ttvcwpqkehm58g (1.7.5, staged spec.json:1535): "An owner of the specification chooses which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project uses. The owner does so personally, using a utility from the SpecSheriff plugin, or through an agent working for that owner. The choice is recorded in the repository's configuration. An agent changes the choice only when that owner asks it to."

s-j8y62pa9hzz6nwx (1.7.6, staged spec.json:1573): "The procedure that withdraws the choice of an extension refuses to withdraw it while a node depends on the extension. The refusal names each node that depends on the extension."
A node depends on the extension while it "is of a kind that the extension adds, or holds a property or a link of a type that the extension adds" or "links to one of the extension's nodes".

Rows: 10.1.27b (s-dxzq5rd6eeteza4): "Each new entry that records the choice of an extension, or the withdrawal of that choice, names one of the specification's owners as of the commit that adds it. No commit removes or changes such an entry". 10.1.27c (s-j5qmmdq4m26mdvw): "The installed release of the SpecSheriff plugin delivers every extension that the project has chosen".

Command today: none.
What the notes record:

- The owner chose a terminal program on 2026-11-18 («Программа в терминале - похоже наиболее подходящее решение») and agreed to a skill `spec-settings` («да скилл делаем»).
- The continuation file, notes on "Where the files are": "The command `sheriff settings`, which the owner agreed to on 2026-11-18, shows and changes the approval status, the `strict` flag and the chosen extensions."
- The agent's earlier proposal, put to the owner on 2026-11-18: "The command `sheriff settings` of the SpecSheriff tools prints these settings. The commands `sheriff extension enable <name>` and `sheriff extension disable <name>` change the list of active extensions." No separate agreement to these two names was found (inference from the notes that follow).
- `.ai_docs/t25-pass/settings-prototype.mjs` is the prototype. It toggles only extensions and prints `sheriff extension enable|disable <id>` (`settings-prototype.mjs:86`). It shows the approval status and the `strict` flag without changing them.
- The inventory: "Commands are needed for the new procedures … Whether they belong in this node or in new nodes is open."

### Approving a whole `TableRule`

Not in the task's list, but the inventory names it.
1.3.4 (s-67vekyup7y8smap, staged spec.json:697): "An owner of a `TableRule` may approve the whole table at once. Doing so approves every node in its cells that is a draft, and each of those approvals names that owner."
`sheriff approve` knows no table today (no code reads `rows` or `cells`).

---

## 8. The node's tests

All 32 entries of `meta.tests` exist in the test files under `skills/tools/test/` with the same names.

**The CLI itself (3)** — `e2e/cli.test.ts`:

- `:24` "an unknown command is refused, naming it"
- `:12` "sheriff --version prints the version of the SpecSheriff tools"
- `:18` "sheriff with no command lists the commands"

**`sheriff reindex` (15)**:

- e2e `commands.test.ts:29` "sheriff reindex rewrites the files it changed and reports it"
- unit `reindex.test.ts:65` "gives a sid to a node that has none, its location and sid first"
- unit `reindex.test.ts:121` "adds to the project's own guidelines the rule approving the specification, a draft, where none refines the base's rule on it" — the behaviour that s-qzthyh7yqvfhsa2 removes (inference)
- unit `reindex.test.ts:261` "gives a field of type one of whose own list an earlier release wrote empty the values the domains add" — a source the new form drops (inference)
- unit `reindex.test.ts:133` "rewrites the statuses, the owners and the confirmations an earlier release wrote, keeping every approval"
- unit `reindex.test.ts:165` "renames what an earlier release wrote under another name, each key keeping its place"
- unit `reindex.test.ts:187` "renames the kinds an earlier release wrote, where a field's values come from a kind and in the extension"
- unit `reindex.test.ts:329` "rewrites each test naming its node by a bare sid, opening its name or as its mark, and the lists naming it, naming each file"
- unit `reindex.test.ts:210` "merges the values an object holds under one key and names every merge"
- unit `reindex.test.ts:220` "refuses two values it cannot merge and then writes no file"
- unit `json-text.test.ts:43` "keeps text it does not merge exactly as JSON.parse reads it"
- unit `json-text.test.ts:17` "merges two lists into one holding the first's members, then the second's the first lacks"
- unit `json-text.test.ts:23` "merges two objects key by key, each key where it was first written"
- unit `json-text.test.ts:29` "merges two values JSON Schema holds equal into one"
- unit `json-text.test.ts:33` "refuses two values it cannot merge, naming the key and each one's line and value"

**`sheriff validate` (1)** — the node only cross-references it:

- e2e `commands.test.ts:39` "sheriff validate passes what holds together and refuses what does not, naming where"

**`sheriff export`, `render` and `guide` (2)**:

- e2e `commands.test.ts:85` "sheriff export, render and guide write the export and the map and print the guidelines"
- unit `generated.test.ts:278` "sheriff guide prints the SpecSheriff guidelines of this repository whole"

**`sheriff show` (3)**:

- e2e `commands.test.ts:124` "sheriff show prints a node by its sid or its location"
- unit `show.test.ts:41` "shows a node found by its location the same as by its sid"
- unit `show.test.ts:57` "refuses a key no node holds"

**`sheriff todos` (2)**:

- e2e `commands.test.ts:133` "sheriff todos prints every item of the todos with its node"
- unit `show.test.ts:92` "lists every item of the todos, the newest first, those of one day in the order the specification reads, each with its date, author, text and node, the archive left out"

**`sheriff model` (1)**:

- unit `model.test.ts:175` "sheriff model gives every node as its file holds it, with its part, its file, the node above it and the owners named nearest above it"

**`sheriff types` (5)**:

- e2e `commands.test.ts:101` "sheriff types writes the types where the technical appendix lists them, and refuses what cannot be generated"
- unit `types.test.ts:103` "sheriff types writes only a file that is missing or holds, line endings aside, anything else than it generates, and names each"
- unit `types.test.ts:116` "sheriff types writes no file while a RecordType is a draft, and names each such node" — the waiting that s-qyjw8xez6t6adc3 replaces (inference)
- unit `types.test.ts:505` "sheriff types writes the files a project's own generator prints, and refuses a path under specs/"
- unit `types.test.ts:534` "sheriff types refuses a path a project's generator prints into git's own directory, or naming the repository itself, and then writes no file"

No test of this node covers `approve`, `export` alone, `render` alone, `init`, `remove`, `binding`, `citations`, `message`, `review` or `guard`; those are tested under their own nodes.
`test/fixture.ts:69` also names this node in a comment about the approving rule.

---

## 9. Agreed drafts that overlap

The drafts are in `.ai_docs/t25-pass/tools-drafts.json`.
Every statement below is quoted from `proposal.text` or `proposal.reason`.

**"Where the files are" (s-zefk589ykh37b8u)**

- The map and the export: "`specs/_viewer/` for the map and `md-version/` for the export, both of which git ignores", only "if the project has chosen the Views extension (§s-qgg6sfawtmwvrbb)". Today `export` and `render` run in every project (`after-edit.sh:31`; the pre-commit hook in tools 6). So "The commands" must make them conditional on the Views extension (inference).
- "The SpecSheriff tools recognize that repository only by the environment variable `SPECSHERIFF_GUIDELINES_REPO`, which holds the path to its root."
- The plugin's paths: `guidelines/spec.json`, `guidelines/extensions/<name>.json`, `guidelines/tools.json`, `guidelines/_schema/`, `guidelines/_schema/config.schema.json`, `guidelines/_schema/extensions/<name>.schema.json`, each relative to the folder that holds the tools' `dist/`. `<name>` "is the extension's name, which `sheriff.config.json` uses to list the extension once the project has chosen it."
- The archive: "every JSON file in `specs/_archive/`, each named after the part of the specification that its nodes were removed from".
- The base specification without the Domains extension is kept in `specs/base/`, and its technical appendix in `specs/tech/base.json`. Today the header index is built for any part that is not `_guidelines`, `tech` or `contracts` (`reindex.ts:162`), so `base` would be treated as a domain (inference).

**"Project-wide settings" (new:tools-1-settings)**

- `sheriff.config.json` holds "the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g)".
- For each check and generator: "the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests".
- "The SpecSheriff tools refuse a `sheriff.config.json` that is not valid JSON or does not conform to its schema".
- "To find the SpecTags … the SpecSheriff tools read only the files that match the glob patterns for code or for tests in `sheriff.config.json`, and the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2). A file that matches both a pattern for code and a pattern for tests is read as a test." This bears on `rewriteTests` and on building `meta.code` and `meta.tests` (inference).
- The key `writesSpecSheriffGuidelines` is removed, by the owner's ruling of 2026-11-21: "A setting that only one repository needs is read from an environment variable".

**"What the SpecSheriff tools read in the project's own guidelines" (new:tools-1-project)**

- It lists what the tools read from `project.json`: the owners, the levels of the domains (only with the Domains extension), the fixtures, the project's own kinds of node, checks and generators, the tools that rewrite files, the formats without comments, and the `exempts` links.
- It no longer lists the rule approving the specification. The continuation file: "the item on the rule in `project.json` whose own approval made the specification approved is removed, since the specification's approval status is now kept in `sheriff.config.json`".
- "Where an item above refers to the rule that refines another rule … read: nothing, if no rule of `project.json` refines that other rule; otherwise, the members of every rule of `project.json` that refines that other rule, in the order in which those rules appear there." This concerns `sheriff model` and the generators, which read these rules (inference).

**"How the schema of the specification is composed" (s-xzcw3hv4hmxz7h7)**

- The schema is composed from the guidelines' schema, then "the schema of each extension of the guidelines … that the project has chosen …, in the bytewise order of the extensions' names", then "the project's own extension of the schema".
- "The conditions set for a kind of node apply to every node of that kind, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6)."
- "They stop composing the schema at the first extension that they refuse."
- It holds an outgoing link to "The commands" (`refs`).

**"Validation against the schema before a command works on the files" (new:tools-7-1-validate)**

- "`sheriff validate`, `sheriff binding` and `sheriff reindex` validate each file of a part of the specification, if the repository keeps that file". `sheriff reindex` does so "before it computes anything".
- "Before that validation, `sheriff reindex` merges each key written twice and changes what an earlier release wrote (§s-f5rz6b7dhxejjts)."
- "It excludes from the validation only what it writes itself: the links pointing at a node; the sid that it gives a node; every location (§s-kag2m9tzdnduxdx); the approval status of a section (§s-9kfdycuq34beqvs) and of a domain's header (§s-yggv9myedprnaa7); the index of the sections in a domain's header (§s-2r59txnms5serdr); the values gathered beside a field (§s-ju5vcanbjph7mgh)."
- "Each of these commands then stops, and `sheriff reindex` leaves every file unchanged."
- Its reason: "A key written twice is merged first, since a file read without the merge holds only its last value. What an earlier release wrote is changed first, since the schema refuses its old names. What `sheriff reindex` writes itself is excluded from the validation, since a node written by hand receives it only when `sheriff reindex` runs."
- That list of what the reindex writes does not include `meta.code` or `meta.tests` (fact). Whether it needs to depends on whether the composed schema requires them, which it does not appear to (inference).

**"A removed node and the archive" (s-j4webte36gkraju)**

- "`sheriff validate` reads the parent's archive in the form to which `sheriff reindex` would rewrite it (§s-f5rz6b7dhxejjts)." So the reindex's migrations must also be applicable to an archive read from a commit, in memory (inference). Today `renameEarlier` is not exported (`reindex.ts:70`).
- Its ruling of 2026-11-21: a node of the archive counts as added by its location, kind and wording, so "A commit that changes the wording of an archived node is therefore refused." A migration that the reindex applies to the archive changes no counted wording only if the parent's archive is read through the same migration (inference).

**"Validation of a file of the archive" (new:tools-7-1-archive-file)**

- "`sheriff validate` and `sheriff reindex` validate each file of the archive only against `archive-file.schema.json` (§s-zefk589ykh37b8u). They do so at the same points at which they validate the files of the specification. `sheriff reindex` does so after it has changed what an earlier release wrote (§s-f5rz6b7dhxejjts)."
- "The only things that schema requires of a node of the archive are the following: it has a location (§s-kag2m9tzdnduxdx) and a kind; it has an `archived` field …; it holds no sid, no node under it and no link pointing at it (§s-bpdqd9v72wg7vsz)."
- "Where the schema refuses a file of the archive, `sheriff validate` and `sheriff reindex` name that file, with every refusal in it. Each of these commands then stops, and `sheriff reindex` leaves every file unchanged."
- So the removal of an archived node's sid belongs among the changes to "what an earlier release wrote", made before this validation (consistent with the continuation file's note quoted in 4.2).
