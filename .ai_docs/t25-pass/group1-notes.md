# T25, stage 2, group 1: notes on the drafts of items 9 to 19

The drafts of items 9 to 19 are in `tools-drafts.json`: ten nodes of the appendix of the tools, rewritten, and six new nodes.
Eight proposals on nodes outside the appendix sit beside them, under keys that begin with `proposal:`.

Six scripts wrote them. Each copies `tools-drafts.json` before its first run, and each, run again, rebuilds only the keys of this group:

- `propose-group1.mjs` wrote the first drafts (copy: `tools-drafts.before-group1.json`);
- `fix-group1-b.mjs` applied the first review, `review-g1-a.md` to `review-g1-d.md` (copy: `tools-drafts.before-group1-b.json`);
- `fix-group1-c.mjs` applied the second review, `review-g1b-a.md` to `review-g1b-e.md`, and added the proposal for rule 10.3 (copy: `tools-drafts.before-group1-c.json`);
- `fix-group1-d.mjs` applied the third review, `review-g1c-a.md` on the proposals and `review-g1c-b.md` on seven drafts (copy: `tools-drafts.before-group1-d.json`). It also writes `english-group1.md`, the final English of every node of the group, for EngStickler's readers. A second run was checked to give the same file, and only the eleven reviewed keys changed;
- `fix-group1-f.mjs` applied the confirming review, `review-g1e.md`, and the final assessment, `review-g1f-a.md` to `review-g1f-c.md` (copy: `tools-drafts.before-group1-f.json`); see the section on round f;
- `fix-group1-e.mjs` applied the fourth review, `review-g1d.md`, and the reports of EngStickler's readers on `english-group1.md`, `english-g1-a-fast.md` to `english-g1-c-thorough.md` (copy: `tools-drafts.before-group1-e.json`). It rewrites `english-group1.md` and writes `english-group1-changed.md`, which lists each sentence that round e changed. A second run was checked to give the same files, and only keys of the group changed.

Before it writes, each script checks every draft and proposal:

- each citation `§<sid>` in the English has a link;
- each `cites` link has a citation, or is kept for a citation in the node's decisions (`citedInDecisions`);
- the Russian cites the same sids as the English;
- no citation by location stands outside backticks;
- each link points at a known node.

## The group is agreed

On 2026-11-24 the owner agreed to group 1 and chose option A in both questions. The owner answered «ок» to «Согласны с группой 1 и с вариантом А в обоих вопросах?». So all 24 nodes are agreed as the page `group1-page/index.html` shows them.

`agree-group1.mjs` recorded the agreement. It copied `tools-drafts.json` to `tools-drafts.before-agree-group1.json` first, and a second run gave the same file. It did the following:

- it marked each of the 24 drafts as agreed on 2026-11-24, and recorded the owner's answer in each draft's `rulings`;
- in the proposal for rule 8.5, it turned the proposed decision into a `meta.decisions` entry whose ruling names option A of Q1 and quotes the owner's answer;
- in the proposal for row 10.1.17, which had no proposed decision, it wrote a `meta.decisions` entry whose ruling names option A of Q2 and quotes the owner's answer.

No other proposal of the group held a proposed decision. The decision of 2026-11-11 already in the proposal for rule 6.1 stays as it is.

Rerunning `fix-group1-e.mjs` or `fix-group1-f.mjs` now would undo the agreement, since each rebuilds the group from the state before its own round.

The section "Changes still to be made to nodes and files outside the group" below stays as the record of what later groups and stage 3 must take up.

## Decisions that apply to the whole group

- **Rows.** Each node implements the rows whose checks it makes (the agent's decision on X1, recorded in the continuation file).
- **Which files are checked.** Each check reads "each node of the specification in the files that the repository keeps", including the nodes in the cells of a `TableRule`. The phrase leaves out the archive (rule 6.3) and what a project takes from the SpecSheriff plugin.
- **Form.** Each node opens with what `sheriff validate` refuses or accepts, and then says what the refusal names.
- **Citations at first use (rule 7.2.7).** Every "location" cites rule 8.5. "Technical appendix" cites rule 1.1.5, which says what it is; "base specification" cites rule 1.1.4. "Term" cites rule 3.3, which says what a term is (review-g1c-a.md), in the proposals for rules 8.5 and 6.1 and in "How a node's location is computed". "Term node" in "Link types reserved for terms" keeps its citation of rule 3.2, as the agreed s-vke5hakwf3uyrjs cites it, since no report asked to change it there.
- **The plugin** is named "the SpecSheriff plugin" (review-g1b-d.md, rule 7.2.3).
- **Renamed terms**, without a question: NodeKind → "a project's own kind"; "a field of type `one of`" → "a field with `enum`"; "the base of the guidelines" removed.

## Round f: the confirming review and the final assessment

`fix-group1-f.mjs` applied every fix that four reports mark as the author's, in the reports' own words in English and in Russian:

- `review-g1e.md`, the confirming review of s-stxmhq3hgfndvn6, proposal:s-sn6au3vcr9uy5pm and proposal:s-ztseyetus7np6br;
- `review-g1f-a.md`, `review-g1f-b.md` and `review-g1f-c.md`, the final assessment of the other 17 drafts.

It copied `tools-drafts.json` to `tools-drafts.before-group1-f.json` first, and a second run gave the same files. It rewrites `english-group1.md`. It also writes `english-group1-changed-f.md`, which lists each sentence that round f changed, for EngStickler's readers. Rerunning `fix-group1-e.mjs` now would undo round f, since that script rebuilds the group from the state before round e.

### What changed

- **s-stxmhq3hgfndvn6:** both DOUBTs of review-g1e.md.
  - The text now refuses a node whose location "is missing or differs from the one computed for it", as row 10.1.5 requires and validate.ts:90 already does.
  - The reason's last sentence now reads "So a location that differs from the computed one was left behind by a change that no run of `sheriff reindex` has followed yet, such as an edit made without an agent." Before, it named only a hand edit and a move. A location also changes when a sibling node is added or removed.
- **proposal:s-sn6au3vcr9uy5pm:** "A node extends another when it adds a requirement on something that the other leaves open within its own subject …".
- **proposal:s-ztseyetus7np6br:** the header item says "including the nodes in the cells of a `TableRule`".
- **new:tools-7-1-approval-by:** the Russian of paragraph 2 says «файл узла, его расположение», since «файл, расположение» could be read as the file and the line of the approval.
- **s-pvnnr844f3y964m:** stage 3 adds "validate.ts:149 is to skip a link whose target is no node of the model, which only s-c4rn9fj4czk768b refuses."
- **s-zhen42p6mnaxu7w:** "a term" cites rule 3.3, and "a project's own kind" cites rule 8.3, with `cites` links.
- **s-qvgzubkrafadqgf:** the new opening.
  - "Any other `exempts` link" is now in the same paragraph as the condition it refers to.
  - The node checks only a link whose target is a node of the model, so only "The target of a link" refuses a link to a sid with no node.
  - A `cites` link to s-w6gybeqn2ttydqx is added, and stage 3 names validate.ts:253.
- **new:tools-7-1-consumes:** the same two fixes. The paragraphs are joined, a `cites` link to s-w6gybeqn2ttydqx is added, and stage 3 names validate.ts:259–260.
- **proposal:s-kag2m9tzdnduxdx, rule 8.5:**
  - only the *first* top-level node of a file takes the part's name followed by the file's name;
  - the appendix of the tools is named beside the guidelines and the technical appendix, since rule 2.1 puts it outside the guidelines, and the top node of `tools.json` would otherwise get a number;
  - a `cites` link to s-a4rbry4hsu34hy8 is added.
  These change the meaning of two agreed sentences, so the owner sees them in the proposal's list of what changed. They replace round e's English fixes 1 and 2 to these sentences.
- **proposal:row-10-1-8:** the row takes the form of row 10.1.11, which the owner ruled on 2026-11-13. It states the requirement first, then lists the nodes the check leaves out. It cites rules 1.7.5 and 1.3.1, with `cites` links. This replaces round e's English fix 8.
- **proposal:row-10-1-17:**
  - the Russian of the addition now reads «если их не больше двух подряд», as the English says. The meaning is the same as that of the former «если их одно или два подряд», and the owner's page quotes the new words in Q2;
  - its `question` says "only where there are no more than two of them in a row".
- **proposal:s-83ev4wwesbwnhnp, rule 10.3:**
  - "SpecTag" also cites rule 9.3, which defines it, with a `cites` link;
  - the Russian of the third item says «изменила бы одобрения, или записи, …», as round e's English does.

### The assessment

Each node's «Оценка» from the latest of these reports is in `group1-assessments.json`, and `assess-group1.mjs` copied it into the drafts. Four nodes keep the «Оценка» of an earlier report that judged them ready:

- new:tools-7-1-location, from review-g1d.md;
- s-95w92rnjuv3sst8, from review-g1b-a.md;
- new:tools-7-1-one-header, from review-g1b-b.md;
- proposal:11-3-header-status-row, from review-g1b-e.md.

Eleven lines read ✗ in the reports. Round f applied each report's own fix to them, so each now reads ✓ "после правки, предложенной рецензентом" and names what it was compared with. No line reads ✗ now. Five lines are ✓ only on a condition, as the reports state them:

- rule 8.5 and new:tools-7-1-location, on the owner's answer A to Q1;
- row 10.1.17 and s-e2vdhfsndy5stq9, on the owner's answer A to Q2;
- s-yprj7d6tnvauggr, on the owner's agreement to the proposal for rule 6.1.

The line on consistency for s-95w92rnjuv3sst8 (review-g1b-a.md) is conditioned on "вопрос 2" of that round. That question was the approval status of a domain's header, which the ruling of 2026-11-06 has since settled, not the present Q2.

### Which nodes still need a reviewer

None. Every fix of round f is a report's own wording. The sentences that round f changed go to EngStickler's readers in `english-group1-changed-f.md`.

## Round e: the fourth review and EngStickler's readers

`fix-group1-e.mjs` changed 23 of the 24 nodes of the group. Row 11.3.2a is the only node it left as it was. Each sentence that round e changed is listed, as it now reads, in `english-group1-changed.md`, for one more reading by EngStickler's readers.

### The coordinator's rulings on recurring phrases

The coordinator ruled on six phrases, and round e applied the rulings to every node of the group:

- "refuses", "refused" and "refusal" stay. They are the specification's own words for what a check does, so every finding that would change them to "rejects" is rejected.
- "The closest mistake" became "The most likely mistake" in the eleven examples that named it, and «Ближайшая ошибка» became «Самая вероятная ошибка». The files in `moved/` already use that phrase.
- "the files that the repository keeps" stays. The agreed nodes use it, and every reader's Russian gave the intended meaning.
- "at the top of a file", "the nodes at the top of its files" and "the file's top node" now speak of a file's top-level nodes. This applies to the agreed sentences of rule 8.5 too. The Russian keeps «на вершине», which already means the top of the file's tree.
- "a standing approval" and "stands for" are gone. The node they were in is now titled "An approved node with no approval in force", and it says "is in force" throughout, as row 10.1.8, which it implements, does. "Stands" stays in the agreed sentences of rule 10.3 and of "What `sheriff reindex` writes", where it cannot be misread.
- "ratio" stays, and rule 6.1 now cites the rule on how a ratio is written (s-bckzdwd35d2nefa).

The agent applied one more change to the whole group. Every construction of the form "X included" became "including X", since such a construction at the end of a sentence is a calque.

### The fourth review

The fourth review found "How a node's location is computed" ready once the owner answers Q1 with A. It found the other two nodes it read not ready, for small fixes. Every fix was applied word for word:

- **s-stxmhq3hgfndvn6, "A location that differs from the computed one":** the reason's second sentence is split at "so".
- **new:tools-7-1-location:** the optional readability fix is applied. The sentence on the first top-level node of a file now names the kinds of file first. The change of locations that the review found under «целостность» is item 9 of "Changes still to be made to nodes and files outside the group".
- **proposal:s-sn6au3vcr9uy5pm, rule 6.1:**
  - "ratio" cites rule 6.6, and "an extension of the guidelines" cites rule 1.7.1, each with a `cites` link;
  - the decision's problem names the rule on a project's own guidelines by its sid, not as "rule 2.3";
  - the decision's ruling is in the form of the node's other decisions, without quotation marks. Line 1274 of the continuation file and line 10 of `fix-table-4.mjs` both record the ruling in the agent's words, so no record keeps the owner's own words. `decisionSources` now says so;
  - the `change` of the `refines` item ends with the review's Russian, and `question` says that the proposal also adds the sentence on leaving every requirement in force.

The fourth review also found that the sentence on `implements` cut in round d was the agent's own addition, never part of the agreed wording. Cutting it returns rule 6.1 to its agreed meaning, so the owner's page does not report it as a cut.

### The readers' findings applied

Each fix makes the English say what the node's Russian says. The Russian changed only where the English fix showed that it said something else.

- **s-stxmhq3hgfndvn6:** "the computed location". The reason now says "a location that differs from the computed one". It also says that the location "was left behind when the node was moved and `sheriff reindex` did not run afterwards". In "a move of the node that no `sheriff reindex` followed", the relative clause could attach to the node.
- **new:tools-7-1-location:**
  - "where the node is in the specification" replaces "its place in the specification", since "place" is this node's word for the last part of a location;
  - "go through" replaces "take" in both sentences on the order of the nodes, and the Russian says «обходят»;
  - "are treated as nodes under one parent", and "the top-level nodes of one file come in the order in which the file lists them";
  - "the header's position", since a header has no place; the Russian says «позицию заголовка»;
  - "Both commands", and "a location of its own that is the same on every machine";
  - in the example, "a domain named `requests`" and "the sections' locations".
- **s-95w92rnjuv3sst8:** the new title and "is in force", as above. Also:
  - "the header of each domain", since "each domain's header" could be read as each header of one domain;
  - "recorded separately from the node", since "apart from" reads as "except";
  - "Comparing the two reveals".
- **new:tools-7-1-approval-by:**
  - "Where the node is in the files that the repository keeps", since "keeps hold" read as "keeps hold of";
  - "more lines identical to that approval after the commit than it held in the commit's parent";
  - "takes a node's owners from the model of the specification";
  - in the reason, "judged against the owners as of the commit that adds it";
  - in the example, the second commit "adds the same approval and also makes `b@example.com` an owner", and the mistake judges against "the owners named in the commit's parent".
- **s-agc6fb3vx46pc23:**
  - "`sheriff validate` computes the following values", since "It" followed a mention of `sheriff reindex`;
  - "the header of each domain", twice;
  - "the values gathered for each field that has an `enum`", as "What `sheriff reindex` writes" says, since "beside" read as "besides";
  - "Computing every such value again reveals a commit that holds an out-of-date value or a value written by hand".
- **new:tools-7-1-one-header:** "So only reading all of them reveals that a header is missing or that there is a second one."
- **new:tools-7-1-link-target:**
  - "any other link declared by a node …, including a node in a cell";
  - the reason says that only such a link "appears among the links pointing at its target", since "built into that node" left the node unclear;
  - in the example, "a rule still has", "the nodes in the files", and a last sentence that says what the mistake would refuse, since it read as a general statement.
- **s-qzyacnqwvaeaps4:**
  - "A `§` followed by a sid cites that sid, in text in backticks too, where no lower-case letter or digit follows the sid", since "and then by no lower-case letter or digit" could be read two ways;
  - "every property of a node", and "in whatever property of a node it appears", since "stands" is a calque;
  - the example names `§base/3.2` as a citation by location, since "a refused citation" that the check then accepts read as a contradiction;
  - the example says "In backticks, a `§` followed by a sid still counts as a citation", as the text says. Before, it left out the `§`.
- **s-pvnnr844f3y964m:**
  - "declared by a node …";
  - "the link is to be agreed with the specification's owners", since a link is not "settled";
  - the reason says that whether two terms are bound "shows how the entities that they name relate to one another".
- **s-e2vdhfsndy5stq9:**
  - "The refusal names the run, the property that holds it, and the node by its file, its sid and its location", since the old order let every item read as a way of naming the node;
  - "whatever its approval status";
  - "a sequence of two or more consecutive characters", and "comes immediately before or after them";
  - quoted text "is not read", since "is left out" did not say what it is left out of. The code removes such text before it looks for runs (validate.ts:165);
  - in the example, "part of a sentence".
- **s-zhen42p6mnaxu7w:** "still looks like a part of the specification".
- **s-qvgzubkrafadqgf:** the example is restructured.
  - It opens "The section on the stack holds a rule that chooses the programming language", since "the rule of the stack" read as a rule that belongs to the stack;
  - "gives that reason and cites the rule that it exempts", since "says so" could be read two ways;
  - "no symbol in the code";
  - "in which case `sheriff validate` refuses the link", since "and … then" made the refusal part of the mistake.
- **new:tools-7-1-consumes:**
  - "both read from the `consumes` links";
  - "would make the index wrong or the cycle check give a wrong result";
  - in the example, "the domain `requests`" and "in which case".
- **new:tools-7-1-guidelines-to-extension:**
  - the title says "an extension of the guidelines", as rule 7.2.3 requires;
  - "runs this check", since "makes a check" is a calque;
  - "the extensions of the guidelines are kept beside them".
- **s-yprj7d6tnvauggr:**
  - the title says "links in the appendices and in a project's own guidelines";
  - "the link listed for it", since "named for" means "named after";
  - "determines … from the path of its file", and "can be found";
  - in the example, "the rule of `project.json`".
- **s-6bmnsbskg6en4nf:**
  - "each copy of a file that is common to every project and comes with …";
  - "As long as", since "While" read as a contrast;
  - "runs only the check for copies";
  - "but not by any of the SpecSheriff tools";
  - "it falls behind the plugin's files". "In force" is said of rules, and the files in force are the plugin's.
- **proposal:s-kag2m9tzdnduxdx, rule 8.5:**
  - the third item of the list opens with the node, like the two items before it: "a node of a kind that an extension of the guidelines defines and that a part of the base specification opens with, which takes the part's name alone as its location";
  - in the example, "the fifth node of the file's eighth section".
- **proposal:domains-header-status:**
  - "in the same way as they derive a section's", since "as" could be read as "while";
  - in the example, "the header's approval status" and "show the header as approved".
- **proposal:row-10-1-17:**
  - "where there are no more than two of them in a row", since "one … in a row" is not idiomatic;
  - in the example, "two consecutive abbreviations" and "three consecutive words in capitals".
- **proposal:s-sn6au3vcr9uy5pm, rule 6.1:**
  - the sentence on extending reads "A node extends another when it adds a requirement on a question that the other leaves open within its own subject". Before, the requirement was what the other node "leaves open";
  - in the second example, "an `implements` link from the project's rule" and "the rule it refines", since "that rule" and "the rule it builds on" could each be read two ways.
- **proposal:s-83ev4wwesbwnhnp, rule 10.3:** in the reason, "a test together with the code it tests" and "a decision that only the owners may make".

### English fixes to agreed sentences

Each fix keeps the meaning. The owner's page reports them in one line, and each part's `change` says «Английский текст поправлен, смысл тот же»:

1. Rule 8.5, the second item of the list: "the node at the top of a file … which takes as its location the part's name and the file's" now reads "the top-level node of a file … which takes as its location the part's name followed by the file's name".
2. Rule 8.5, the paragraph after the list: "the file's top node" now reads "the file's top-level node".
3. Rule 6.1, the item on `refines`: "the linking node states the linked node more precisely" now reads "the linking node states more precisely what the linked node states", since a node is not "stated".
4. Rule 6.1, the reason: "No diagram can draw it" now reads "No diagram can show it".
5. Rule 10.3, the third item: "change the approvals, the entries that set …" now reads "change the approvals, or the entries that set …". The comma made the entries read as a gloss on the approvals, while rules 10.6 and 10.7 make them separate entries.
6. "What `sheriff reindex` writes", the last paragraph: "in the order that the file already has them" now reads "in the order in which the file already has them".
7. "What `sheriff reindex` writes", the reason: "What the SpecSheriff tools can compute …, the tools write themselves" now reads "The SpecSheriff tools themselves write whatever they can compute …". The object placed first made "themselves" read as the object of "write".
8. Row 10.1.8: "outside the SpecSheriff guidelines that a project uses and the extensions that it has chosen" now reads "outside both the SpecSheriff guidelines that a project uses and the extensions that the project has chosen".

Two agreed sentences of rule 6.1 also gained a citation, which review-g1d.md required under rule 7.2.7: "ratio" in the item on `term-relation`, and "an extension of the guidelines" in the last paragraph.

### Findings rejected

- Every "refuses" → "rejects", and every change to "the files that the repository keeps" or to "ratio": the coordinator's rulings.
- "Only while it is the computed one", where "it" might be the node: "it" can only be the location, and both readers read it so.
- "Row by row through its groups", where the groups are not named: the cited rule 8.6 defines the groups of a `TableRule`.
- "As of that commit", before or after the commit's changes: the example settles it, since the commit that also makes `b@example.com` an owner is accepted.
- "Accepts a domain" and "may be kept in several files": the reader suggested keeping the first, and both readings of "may" lead to the same reason.
- "A link whose target is that sid" → "a link to the node with that sid": in this specification a link's target is a sid ("The target of a link").
- "Up to a whitespace character", where the delimiter might be included: "up to" leaves the delimiter out.
- A `consumes` link in a project without the Domains extension: that extension defines the type `consumes`, so no such link exists elsewhere.
- "A rule of the SpecSheriff guidelines" against a check that reads only `spec.json`: under rule 2.1 the appendix of the tools is not part of the guidelines, so `spec.json` contains all their rules.
- Rule 8.5, "numbered under the location of the file's top-level node" → "numbered within the file …": an agreed sentence. The reader was not sure the replacement kept the meaning, and "How a node's location is computed" says the same in other words.
- The header-status rule, "while" → "if and only if": rule 1.3.3 says "A section is approved while every rule in it is approved", and the header rule follows it.
- Row 11.3.2a, "all the other nodes of the domain", which includes the sections: the row follows the owner's row 10.1.10, "derived from the approval statuses of all the nodes in it". Both rows leave the choice of which nodes count to the rule they check.
- Row 10.1.17, "No sentence" → "No word", and "part numbers", which might be read as parts of the specification: the owner's dictated words, whose Russian says «предложения» and «артикулов».
- Rule 6.1, "A term that only starts a process … uses nothing the process uses", where a term starts nothing: the agreed English says what the agreed Russian says.
- Rule 6.1, "the same guess, one step removed": an agreed reason, and both readers read it as intended.
- Rule 6.1, "the linked rule" in `constrains` and `checks` → "the linked node": agreed wording, and those links always point at a rule.
- "What `sheriff reindex` writes", "each remaining such node" → "every other such node": "every other" would read as "every second", and the context gives one reading.
- "Names it" and "names each file" → "reports": every node of the group uses "names" for what a command reports.
- Rule 10.3, "a rule of a project's own kind": the settled name of the term (s-vsh384ybt4w25a2), given without a question.
- Rule 10.3, "that rule's SpecTag": the specification's own usage, "the SpecTag of the node".
- Rule 10.3, "The refusal before an edit applies only to …" and "other than through": agreed wording. The reader was not sure its replacement for the first kept the meaning, and the second means the same as "except through".
- "It leaves out the following nodes" in s-95w92rnjuv3sst8: both readers read it as intended.
- The other two readings that each reader settled by the context, mostly of "it", "its" and "which": the context gives one reading, so nothing changed.

### A fix that changes the meaning, made at the coordinator's instruction

"What `sheriff reindex` writes" said that the approval status of a domain's header is "derived from the domain's nodes". Read literally, that includes the domain's sections and the header itself. The proposed header-status rule, which the item cites, leaves both out. A wording that matches the rule changes the item's literal meaning, so the agent did not make the fix and proposed it to the coordinator instead.

The coordinator then instructed the agent to make it. The fix changes the meaning only so that the item says what the header-status rule of the same group says, and the two proposals agree. The owner sees the fix in the proposal's list of what changed and agrees to both proposals together. The item's `change` now says so. The item reads:

- EN: "the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including those in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);"
- RU: «статус одобрения заголовка каждого домена, выведенный из каждого узла домена, кроме его разделов и самого заголовка, в том числе из узлов в ячейках `TableRule` (§s-yccuyqbypzzx2gu);»

### Which nodes still need a reviewer

- **s-stxmhq3hgfndvn6 and proposal:s-sn6au3vcr9uy5pm** need a short review to confirm them. The fourth review found both not ready. Its fixes are applied word for word, but each node also took readers' fixes in the agent's words: the reason of the first, and two sentences of the item on `refines` in the second.
- **proposal:s-ztseyetus7np6br** goes to the same review, since its item on the header's approval status now says what the header-status rule says.
- **The example of s-qvgzubkrafadqgf**, the largest rewrite of round e, keeps its meaning and the reviewer's most likely mistake. A reviewer may look at it, but no rule requires that.
- Every other change of round e keeps the node's meaning and its form, and goes to EngStickler's readers in `english-group1-changed.md`.

## The drafts

Each entry says what changed in round d and in round c, and why. Round e is in its own section above. Round b's changes are in the draft's `change` fields and in the scripts.

The third review read seven drafts and found all of them not ready, each for small fixes (review-g1c-b.md). Round d changed only those seven. The other nine were not reviewed again, since the second review had found nothing left in them or the third review confirmed their fixes word for word.

### Ready, unchanged in rounds c and d

- **s-95w92rnjuv3sst8 — "An approved node without a standing approval"** (row 10.1.8). Ready, once the owner agrees to the proposals on the header's status.
- **new:tools-7-1-one-header — "One header for each domain"** (s-8esbyvaj2yx5eqf, row 11.3.1). Ready.

### s-stxmhq3hgfndvn6 — "A location that differs from the computed one" (row 10.1.5)

- "Location" now cites rule 8.5, as every other draft of the group does (review-g1b-a.md).

### new:tools-7-1-location — "How a node's location is computed" (s-ygg5kpcxgzq3m7w)

Round d (review-g1c-b.md):

- "A file of the guidelines, of the appendix of the tools or of the technical appendix", citing rule 2.1, in paragraph 2, in the list items that name such a file and in the last paragraph. The nodes of `tools.json` had no location, since the appendix of the tools is not part of the guidelines (rule 2.1).
- The term item says what a term's place is: "a term, whose place is the term's name".
  - Its citation is rule 3.3, not rule 3.2 as the report wrote. Report review-g1c-a.md moved the same citation to rule 3.3 in the proposal for rule 8.5, on which this node rests. Rule 3.3 says what a term is, and rule 3.2 only where a term is defined.
- Paragraphs 2 and 3 are joined, so that "every other node" points within its own paragraph.

Round c, every fix of review-g1b-a.md was applied:

- the opening is two sentences: what the node computes, then for which nodes;
- "the first node at the top of a file", everywhere, and "each further node" in the last paragraph, so that paragraph 2 and the last paragraph no longer clash;
- a domain's header "takes the domain's name as its location". The words "the node that its part opens with" are gone, since rule 8.5, as proposed, says why;
- "Such locations include", since the three paths are examples;
- a new sentence: the children of a domain's header take the header's place in the order of the files, as model.ts does;
- the reason opens with "`sheriff reindex` writes the locations that `sheriff validate` checks", one fact per sentence;
- the term case is cut from the example, since it rests on rule 8.5, not on this node.

It still rests on Q1.

### new:tools-7-1-approval-by — "Who an added approval names" (s-75ue25v6r23jkk8, row 10.1.9)

- "The refusal names the sid and the email address that the approval holds". An approval has no sid of its own (review-g1b-a.md).

### s-agc6fb3vx46pc23 — "Values built from other nodes" (rows 10.1.10, 10.1.16, 11.3.2, 11.3.2a, 12.12.14)

Round d (review-g1c-b.md), each in the reviewer's words:

- "The refusal … names the value that differs". Before, "which of these values" pointed back to another paragraph.
- The reason opens "After an edit to one node, a value built from it stays out of date until `sheriff reindex` runs", for the same reason.
- In the Russian example, «ячеек которого», as "How a node's location is computed" declines `TableRule`.

Round c:

- The node now opens with the refusal (rule 7.2.2). The sentence "It refuses each node whose value … differs" is cut from the closing (review-g1b-b.md).
- The note on the header item now cites the ruling of 2026-11-06 that it puts into effect.
- Stage 3: model.ts:218 (see below).

### new:tools-7-1-link-target — "The target of a link" (s-c4rn9fj4czk768b, row 10.1.12)

Round d (review-g1c-b.md):

- In the example, a full stop replaces the colon after "keeps", in both languages. The last sentence ran to about fifty words and held several thoughts.

Round c:

- The text says what it accepts, then what it refuses (review-g1b-c.md; the rule "A rule says what holds").
- The reason is two sentences, one fact each.
- The example gains the most likely mistake, the reviewer's: looking for the target only in the repository's files, which would refuse a link to the SpecSheriff guidelines taken from the SpecSheriff plugin.

### s-qzyacnqwvaeaps4 — "Citations and the links that match them" (rows 10.1.13, 10.1.14)

- New title, the reviewer's. "Outgoing links and citations" no longer sets the node apart from "The target of a link" and "Link types reserved for terms".
- "Any other `§` followed by one or more characters, …". Before, "one or more other characters" left unclear what they were other than, so a sid followed by a lower-case letter fell into neither case.

### s-pvnnr844f3y964m — "Link types reserved for terms" (row 10.1.15)

Round d (review-g1c-b.md):

- The two paragraphs are joined. "Every other link", which opened the second, referred to the first.

Round c:

- "Only where both of its ends are term nodes", instead of "to another term node". A link from a term to itself is accepted by the code, and no rule forbids it (review-g1b-c.md). So no question for the owner arises.
- A new sentence: "It checks only a link whose target is a node of the model of the specification." A `term-relation` link to a sid with no node is then refused once, by "The target of a link", and not twice.
- The reason is two sentences, one fact each.

### s-e2vdhfsndy5stq9 — "A run of words in capitals" (row 10.1.17)

Round d (review-g1c-b.md), each in the reviewer's words:

- "In what `sheriff validate` reads" and "three or more words set in capitals", so that neither phrase points back to another paragraph.
- The quotation marks are named as the code reads them: "in straight double quotation marks or in curly double quotation marks (“…”)". «…» and „…“ are not left out, and the node now says so by naming only those it leaves out.
- The reason says "defined exactly", as the Russian already did.
- The example says that the run stands "outside backticks and quotation marks", since the run inside the example is in quotation marks itself.

Round c:

- The definition of a word set in capitals is a list of conditions, the reviewer's (rule 7.2.2). "Of any script" now applies to the letters only. The code accepts only the ASCII hyphen.
- `TableRule` cites rule 8.6 at its first use.
- "HTTP REST API" is in quotation marks in the example, as in the proposal for row 10.1.17.

It still rests on Q2 (row 10.1.17).

### s-zhen42p6mnaxu7w — "A section with a rule in it" (row 10.1.18)

- The reason now says "Its approval status, which the SpecSheriff tools derive from the nodes under it", citing rule 1.3.8, "does not show that the section contains no rule". The Russian uses «статус одобрения», the owner's term.

### s-qvgzubkrafadqgf — "`exempts` links" (row 10.1.19)

- New reason, the reviewer's: an `exempts` link lifts the requirement that the code implement its target (rule 9.2), so a link that rule 9.8 does not allow would hide a rule that the code does not implement. It says what the check prevents. The citation of rule 1.2.3 is replaced by one of rule 9.2.
- In the example, "and `sheriff validate` accepts the link". Before, "so" made the link itself the reason for accepting it.

### new:tools-7-1-consumes — "`consumes` links" (s-p3n666zfjdrrw6a, row 11.3.3)

- The reason's second sentence now reads "Any other `consumes` link would make the index or the cycle check wrong". In the example's mistake, a domain does use the section, so "a use that no domain makes" was not true (review-g1b-b.md).
- In the Russian example, «описывающим» replaces «который описывает», which could attach to «домена».

### new:tools-7-1-guidelines-to-extension — "A link from the SpecSheriff guidelines to an extension" (s-75r4pg4wdqu3gw5, row 10.1.20a)

Round d (review-g1c-b.md):

- The example, in the reviewer's words, says that the rule "declares the `cites` link that the citation requires". Without that link, the refusal would come from "Citations and the links that match them", not from this node.

Round c:

- Cut: the sentence naming the folder of the extensions, which "Where the files are", already cited, gives.
- A new example, the reviewer's: a citation of a rule of an extension, refused through its `cites` link. It shows the case that the text leaves to "Citations and the links that match them".

### s-yprj7d6tnvauggr — "`implements` and `refines` links of the appendices and of a project's own guidelines" (rows 10.1.22 to 10.1.24)

- "…other than a section, where the node lacks the link named for it". The Russian read as "a section that lacks the link".
- `implements` cites rule 6.1 at its first use.
- "It checks a node in a cell … as it checks any other node".
- The Russian reason keeps "still" and "can": «Согласуются ли они по-прежнему, может судить только читатель».
- Stage 3: validate.ts:462 and model.ts:55 (see below).

It still rests on the proposed wording of rule 6.1.

### s-6bmnsbskg6en4nf — "Copies of the files that the SpecSheriff plugin delivers" (row 10.1.25)

Round d (review-g1c-b.md):

- The reason's second sentence is split in two, in the reviewer's words. It stated two relations (rule 7.3.2).

Round c:

- "The SpecSheriff plugin" in the title, the text and the reason. The reason now opens "In a project, the SpecSheriff tools read the files common to every project from the SpecSheriff plugin".
- "The refusal names each copy. While the repository keeps a copy, `sheriff validate` makes only the check for copies." The old "makes this check alone" could be read as "by itself".

## Findings not applied as written

### Round d

- **review-g1c-b.md, the citation of "term" in "How a node's location is computed".** The report wrote "a term (§s-ypa92gpcj3f5zj8), whose place is the term's name". The draft cites rule 3.3 instead. Report review-g1c-a.md moved the citation of "term" in rule 8.5 from rule 3.2 to rule 3.3. Rule 3.3 says what a term is, and rule 3.2 says only where a term is defined. This node rests on rule 8.5 and uses "term" in the same sense, so it cites the same rule. The rest of the fix is the report's.
- **review-g1c-a.md, the questions it lists for the owner.** The report lists three: Q1, the sentence of rule 6.1 on `implements`, and the agreed reasons and the citation of "term". Only Q1 remains a question:
  - the reasons and the citation are agreed sentences of nodes that a proposal already changes. So they go into that proposal's single complete wording (the rule "A change to an approved wording is proposed as a single, complete new wording"), and the owner agrees to them with it;
  - for the sentence on `implements`, the report recommends option A, and nothing in the specification gives a reason for option B (see the proposal for rule 6.1 below).

### Round c

- **review-g1b-e.md, Q3 narrowed to two sentences for the owner.** The reviewer held that the owner still has to decide two sentences of rule 6.1. One was "the linking node leaves every requirement of the linked node in force"; the other gave `implements` precedence over `refines`. Round c answered that neither is a new requirement. The third review (review-g1c-a.md) found that answer right only in part, and round d corrected it:
  - "leaves every requirement … in force" is new for a `refines` link within one part of the specification, such as 4.1 → 1.1.4 or 9.5 → 1.5.2. Rules 2.3, 1.7.2 and 4.2 apply only to links from one part to another. Rule 2.4 applies only to the shared rules. The sentence stays, and its `change` now says that it is new there. No existing `refines` link breaks it;
  - the sentence on `implements` is cut in round d (see the proposal for rule 6.1).
- **review-g1b-e.md, the example proposed for rule 8.5.** It opened with "Rule 8.5 of `specs/_guidelines/spec.json` is at `_guidelines/spec/8.5`". A rule names a node by its sid and never by its number (rule 1.2.2). So the example names that rule by its place instead: "A rule kept in `specs/_guidelines/spec.json` as the fifth node of its eighth section …". The rest is the reviewer's. The third review accepted this, and round e made it "the file's eighth section".
- **review-g1b-e.md, DOUBT for the owner on the agreed sentences of rule 8.5** (cite "term" and "technical appendix", and gather the three exceptions into a list). These were applied inside the proposal, not raised as a separate question. An agreed node is brought into line with the rules on writing when it changes for another reason (`.claude/vt/rules.md`). The third review found that this holds.

## The proposals

Each proposal is a full wording with its Russian, in the form of a draft. Each `change` says what differs from the agreed wording. The drafts that rest on a proposal name it in their `dependsOn`. The owner sees each proposal once, whole, with its list of what changed, and agrees to it together with the rest of the group.

Six proposals put into effect rulings the owner has already made, and raise no question.

### The approval status of a domain's header — three proposals

They put into effect the ruling of 2026-11-06 on rule 1.3.8. Its words, in that rule's `meta.decisions`, are: "their status is the state of what they hold, built and only shown, whatever the number of rules; their own wording is meta-information nobody approves". The choice of which nodes count comes from the approved former rule 1.6, which followed the same ruling. It said that the status of a domain's header "is built the same way from every node of the domain but the header itself" (review-g1c-a.md).

- **`proposal:domains-header-status`**, the rule of the Domains extension. What changed in round d (review-g1c-a.md):
  - "other than its sections and the header itself", the reviewer's shorter wording. The Russian already said so;
  - its links to rules 1.3.1 and 1.3.3 are `refines`. Under the proposed rule 6.1, the rule extends both: it gives a header an approval status, and it says when that status is approved. Its link to rule 1.3.8 stays `cites`;
  - the reviewer's example: a header and a section in the first document, another section in the second. A document holding only a header would be smaller than the section that rule 11.1.2 recommends as the smallest part.
- **`proposal:11-3-header-status-row`**, row 11.3.2a. Reviewed and ready; unchanged.
- **`proposal:row-10-1-8`**, which reads "except a section and any other node whose approval status is derived from other nodes". Unchanged in round d.

### `proposal:s-83ev4wwesbwnhnp` — rule 10.3

It cannot wait. As agreed, rule 10.3 refuses an agent's edit that leaves a node approved with no approval of its wording, "unless the node is a section". Under the header-status rule, a header whose status is approved has no approval of its wording. So the moment the owner agrees to that rule, it would contradict rule 10.3. An extension's rule must not contradict a rule of the guidelines (rule 1.7.2). The third review confirmed this. It also found that the change brings back what the approved former rule 5.12 said: "a section and a domain's header left out".

What changed in round d (review-g1c-a.md), each in the reviewer's words:

- the first item reads "unless the node is a section or any other node whose approval status (rule 1.3.1) is derived from other nodes". "Any other node" is used, as in row 10.1.8, because "another node" read as one particular node. "Approval status" is used here first, so it cites rule 1.3.1;
- the agreed reason failed the pairing test: its paragraphs justified the items one by one and out of order. It is replaced by the reviewer's candidate: "A check that runs later sees only the result: the approvals, which it takes as given, and a commit that contains a test together with its code. So only a check made before an edit can keep an agent from making a decision that only the owners make, or from writing code before its test." Why a shell command is left out stays in the decision of 2026-11-13. Round e changed "its code" to "the code it tests" and "make" to "may make".

### `proposal:s-sn6au3vcr9uy5pm` — rule 6.1

It puts into effect the owner's ruling of 2026-11-11, which round d recorded in the proposal's `meta.decisions` and round e reworded (review-g1d.md):

- date 2026-11-11, type textual;
- problem: "The rule on a project's own guidelines (§s-u7tw6m8npxmv5tu) and the row of the main table of checks that checks it say that a rule of a project's own guidelines refines or extends a rule. This rule gave `refines` only the meaning of refining, and no type of link expressed extending."
- ruling: "The owner: one link, `refines`, covers both refining and extending, since the line between them is thin and no check could tell them apart. The meaning of `refines` in this rule is widened to cover extending."

Round d quoted the ruling's reason as the owner's words. The fourth review found that both records of it are the agent's wording: line 1274 of the continuation file, and line 10 of `fix-table-4.mjs`, which is the Russian `change` of row 10.1.24. So round e states the ruling in the form of the node's other decisions, without quotation marks, and `decisionSources` says so. The `proposedDecisions` of round c are gone. The ruling of 2026-11-11 is now in `meta.decisions`, and the decision that records the owner's agreement is written when the owner agrees.

What changed in round d (review-g1c-a.md):

- **The sentence on `implements` is cut (option A).** The fourth review found that this sentence was the agent's own addition and never part of the agreed wording, so cutting it returns rule 6.1 to its agreed meaning. It read "Where the linking node states how the linked node is implemented, the link is of type `implements` instead." The report recommends A. The coordinator asked for A unless cutting the sentence loses a statement that no other node makes, and it loses none:
  - rule 6.1 itself defines `implements`: "the linking node states how the linked one is implemented";
  - rule 4.2 says that each node of the technical appendix implements a node of the base specification;
  - rows 10.1.22 to 10.1.24 set the type of link for the technical appendix, the appendix of the tools and the project's own guidelines.
  Keeping the sentence would also have contradicted rule 4.4 and its ruling of 2026-11-09. A description of technical debt states a shortcoming in how a node is implemented, and it may still refine that node. Option B would have kept that sentence with an exception for technical debt, one more exception inside a definition.
- The `change` of the `refines` item now says that "the linking node leaves every requirement of the linked node in force" is new for a link within one part of the specification. Rules 2.3, 1.7.2 and 4.2 already require it only for links from one part to another.
- "The linking term" in `term-relation` cites rule 3.3, which says what a term is, as rule 7.2.7 requires. The rest of that agreed sentence is unchanged.
- The agreed reason's second paragraph is cut. It restated the text's last paragraph, and the decision of 2026-11-17 already records why a project may add a type of link. The reason now pairs with the text's first paragraph.

The table of the `refines` links in the round-b notes still applies. Two of its rows changed:

- the header rule's link to rule 1.3.8 is `cites`;
- the header rule's links to rules 1.3.1 and 1.3.3 are `refines`, in the sense of extending.

### `proposal:s-ztseyetus7np6br` — "What `sheriff reindex` writes"

It follows from Q1, from the header-status proposals and from the clauses moved into it on the advice of report B (review-g1-b.md). Unchanged in round d. The third review confirmed its round-c fixes word for word.

### The two proposals that raise a question

`proposal:s-kag2m9tzdnduxdx` (Q1) and `proposal:row-10-1-17` (Q2). What changed in rule 8.5 in round d is under Q1.

## Questions only the owner can answer

The earlier Q2 (the header's status) and Q3 (rule 6.1) are gone: the rulings of 2026-11-06 and 2026-11-11 settle them, as shown above. Neither report of the third review names a further question.

### Q1. Where a node that a part opens with is located — `proposal:s-kag2m9tzdnduxdx` (rule 8.5)

Rule 8.5 was agreed on 2026-11-10 with its decision of 2026-11-04. It numbers every node except a term and the top-level node of a file of the guidelines or of the technical appendix. The former rule 1.4, which the owner approved, also set two locations: a domain's header took the domain's name, and the top node of a contracts file took the part's name and the file's. When 8.5 was agreed, both cases were to "move to part 14", and neither was written down. The question changes an agreed decision, so only the owner can answer it; the second and the third review agree.

The proposal adds a third case to rule 8.5. Where an extension of the guidelines defines a kind of node that a part of the base specification opens with, a node of that kind takes the part's name alone as its location. The nodes under a node whose location is the part's name alone are numbered together with the other top-level nodes of the part. The case names no extension (rule 1.7.3). Rule 11.1.3 already says that a domain opens with its header. A section that merely comes first in `base` or `contracts` is not caught.

The proposal also brings the agreed sentences of 8.5 into line with the rules on writing. What changed in round d (review-g1c-a.md):

- the sentence after the list now names the node by its location: "The nodes under a node whose location is the part's name alone …". "A node that a part opens with" would also catch the first section of `base` or `contracts`, which the list's third item does not catch;
- "term" cites rule 3.3, which says what a term is, instead of rule 3.2;
- the agreed reason failed the pairing test: its first sentence restated the text's first sentence. It is replaced by the reviewer's candidate: "A location is computed from where a node is, so it always shows a reader where to find the node."

Round c had already gathered the three cases without a number into one list, and cited "term" and "technical appendix". The proposal has an example, with the most likely mistake. Its proposed decision records why a node that a part opens with takes the part's name as its location.

- **A (recommended).** Agree to the proposal. A domain's header keeps the domain's name as its location. The contracts section follows rule 8.5 as it stands.
  - Cost: rule 8.5 is reworded.
  - Cost: the locations in every project's contracts section change once, at the first `sheriff reindex` of the new release, for example `contracts/shared` → `contracts/1`. Nothing cites a node by its location.
- **B.** Also keep the contracts section as the code has it: the top-level node of each contracts file takes `contracts/<file>`, and the nodes under it are numbered straight through `contracts`.
  - Cost: rule 8.5 needs a further case, an exception for the contracts section that nests no number under its parent.
  - No project's locations change.
- **C.** No new case. A header takes a number like a rule.
  - Cost: in every project, a header takes the location `<domain>/1`, and the domain's sections shift to `<domain>/2`, `<domain>/3` and so on, or nest under the header where they are its children.

Recommendation: A. It is the smallest change that keeps every agreed rule consistent, and it numbers the contracts section as every other part of the base specification is numbered. "How a node's location is computed" (s-ygg5kpcxgzq3m7w) rests on it.

### Q2. Row 10.1.17: abbreviations are an exception only where there are no more than two of them in a row — `proposal:row-10-1-17`

The owner dictated row 10.1.17 on 2026-11-13. Its second sentence names abbreviations as an exception. Its criterion and rule 7.6.2 refuse three words in capitals in a row, including abbreviations. On 2026-11-20 the agent settled this without asking (open problem P5 in `stage2-inventory.md`), although line 1226 of the continuation file deferred it to this step. The row is in the owner's own words, so only the owner can change it; the second and the third review agree.

The proposal keeps the owner's wording and adds only "where there are no more than two of them in a row". Round e changed only the English of that addition, which read "one or two of them in a row", and round f changed its Russian to «если их не больше двух подряд». The example shows "REST API" passing and "HTTP REST API" refused. No report of round e names a further question.

- **A (recommended).** The proposed wording.
  - Cost: the row you dictated gains one clause. The tools need no change, since `sheriff validate` already refuses three abbreviations in a row (review-g1f-c.md).
- **B.** The row stays as it is.
  - Cost: its second sentence exempts what its third sentence and rule 7.6.2 refuse.
- **C.** The check lets any run of abbreviations pass.
  - Cost: it contradicts rule 7.6.2.
  - Cost: no check can tell an abbreviation from an emphasised word (rule 7.6.2's reason).

Recommendation: A. "A run of words in capitals" (s-e2vdhfsndy5stq9) rests on it, and its example's most likely mistake, three abbreviations allowed to pass, is a mistake only under A.

Not raised: whether a check should require a domain's header to be in the first of the domain's files (review-g1-b.md, minor). Nothing relies on which file contains the header.

## Stage-3 corrections that the reports found

- **model.ts:218 (`builtStatuses`).**
  - It derives a header's status from every top-level node of the domain's files other than the header. It leaves out the header's own children and every node in a cell.
  - The round-b notes said that the code "derives it from every node of the domain", and that was wrong.
  - The proposed header-status rule requires both to count.
- **guard.ts:117.**
  - `isContainer` already skips a header, although agreed rule 10.3 exempts only a section.
  - With `proposal:s-83ev4wwesbwnhnp`, the rule says what the code does, and the code needs no change.
- **validate.ts:462 and model.ts:55 (`partOf`).**
  - `partOf` marks only `spec.json` and `tools.json` as the SpecSheriff guidelines. So the check of links reads the files of the extensions in `specs/_guidelines/extensions/` as the project's own guidelines.
  - Only `specs/_guidelines/project.json` is to be read that way.
- **model.test.ts:33.** The test of the contracts section expects `contracts/<file>`. Under option A of Q1, it is to expect the numbered locations.
- **validate.ts:165, round d.** The check for capitals leaves out text in backticks, in straight double quotation marks and in “…”, and not «…» or „…“. That is what "A run of words in capitals" now says, so the code needs no change here.

The other stage-3 changes are in each draft's `stage3` field.

## Changes still to be made to nodes and files outside the group

1. **Rule 11.1.5 (s-hr7j7scmfkkjnws)**, agreed: "The link may be of any type" literally includes a `consumes` link from a rule, which row 11.3.3 refuses. It is recorded in the continuation file, and is to be fixed when the node next changes.
2. **The schema comments** (review-g1b-e.md). The schema is not a node, and nobody approves it, so these wait for the move into `specs/` in stage 3:
   - `node.schema.json`, `$defs/location`: "the part's name alone for the node a part opens with" should read "for a node of a kind that an extension defines as the node a part opens with", as the proposed rule 8.5 says;
   - `extensions/domains.schema.json`, the header's `$comment`: "Its status, like a section's, is built from the nodes under it" should read "from every node of the domain other than its sections and the header", as the proposed header-status rule says.
3. **"Validation against the schema before a command works on the files"** (agreed): its item on the approval status of a domain's header may cite s-yccuyqbypzzx2gu once that rule is agreed. This is a technical replacement.
4. **moved/impl.json**:
   - row 10.1.9 → s-75ue25v6r23jkk8;
   - row 10.1.12 → s-c4rn9fj4czk768b;
   - row 10.1.20a → s-75r4pg4wdqu3gw5;
   - row 11.3.1 → s-8esbyvaj2yx5eqf;
   - row 11.3.3 → s-p3n666zfjdrrw6a;
   - row 11.3.2a → s-agc6fb3vx46pc23;
   - row 12.12.14 → s-agc6fb3vx46pc23, which moved/impl.json maps to `[]` (review-g1f-a.md).
5. **The staged files in moved/**, once the owner agrees:
   - the new rule s-yccuyqbypzzx2gu and the new row s-bn8rvk6du2jkf2d go into `extensions/domains.json`;
   - rules 6.1, 8.5 and 10.3 and rows 10.1.8 and 10.1.17 take their new wordings, each with its decisions.
6. **Rows 10.1.19 and 10.1.20a**: their todos are removed in stage 3, once the checks exist and their tests pass.
7. **The docs**: a gloss of `refines` covering extending, with the no-weakening rule (review-g1-d.md, review-g1b-d.md and review-g1c-a.md, TERM).
8. **Rule 8.6 (s-5fewsp22mmdz7y6)** still allows a term in a cell, although a node in a cell has no title, and so a term there would have no name to serve as its place. This is already recorded in the continuation file.
9. **The locations of the top-level nodes of the files of the extensions** (review-g1d.md, «целостность»). In `moved/`, they are `_guidelines/extensions/domains/11` and `_guidelines/extensions/recordtype/12`. Under "How a node's location is computed" and the agreed rule 8.5, they become `_guidelines/extensions/domains` and `_guidelines/extensions/recordtype`, and table 11.3 becomes `_guidelines/extensions/domains/3`. The first `sheriff reindex` after the move writes them, since nothing cites a node by its location.

## The fourth review

The fourth review, `review-g1d.md`, read the three keys that round d changed with words that no report dictated: new:tools-7-1-location, proposal:s-sn6au3vcr9uy5pm and s-stxmhq3hgfndvn6. What it found, and which nodes still need a reviewer, is in the section on round e above.

`english-group1.md` contains the English of all twenty-four nodes of the group, and `english-group1-changed.md` contains each sentence that round e changed.

## What was not touched

No round changed anything under `specs/` or any node outside the group. `.ai_docs/INDEX.md`, `tasks.md`, the continuation file and the files under `thread-trial/` were not touched.
