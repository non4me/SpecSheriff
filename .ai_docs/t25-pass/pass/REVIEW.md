# Reviewing a rewrite of the SpecSheriff guidelines for meaning

Another agent rewrote nodes of the SpecSheriff guidelines for wording only: one thought to a sentence,
lists for qualifications of one kind, and names settled by the owner (see `RULES.md` in this folder,
sections 2 and 4). The owner will approve these rewrites in one table, trusting that no meaning moved.
You did not write them. Your task is to find every place where the meaning did move.

For each node, compare the input (`<group>.in.json`: title, text, reason) with the output
(`<group>.out.json`, keyed by sid). Read both whole. Flag:

- a requirement, condition, exception, example, value or list member lost, added or altered;
- a scope widened or narrowed (a "some" become "every", an "or" become "and", a qualifier moved from
  one item to all, or from all to one);
- a referent changed: a pronoun or "it" now pointing at another thing, a subject swapped;
- a reason's ground lost, or a ground turned into a requirement;
- a rename applied where RULES.md says the word stays ("rule" stays "rule"; "check" stays "check"
  unless it is a runtime check of data generated from RecordTypes; ordinary "kind" is no NodeKind);
- a rename RULES.md requires but missed (a kind value, "runtime checks", a property written plain where
  the text names the property itself) — mark these "minor".

Do not flag wording you would merely prefer. A sentence split, a list made of a run of clauses, a
reason reordered so it opens with its ground: these are the point of the rewrite.

Write `<group>.review.json` in this folder: an object keyed by sid, for every node of the group:

```json
{ "s-…": { "verdict": "same" | "changed" | "minor", "issues": ["…exactly where, what the input said, what the output says"] } }
```

Then reply with the count of nodes per verdict and one line per "changed" node.
