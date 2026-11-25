# "A removed node and the archive", a node of the appendix of the tools, agreed on 2026-11-21

## Title

A removed node and the archive

## Text

`sheriff validate` checks that a commit adds to the archive (§s-f2b5zvc565s242f) exactly the nodes that it removes from the specification and that must be archived (§s-qb79dcw694x2h63). It checks only the nodes of the files that the repository keeps.

A node is removed by a commit if the parent of the commit holds a node with its sid, and that sid is gone from the specification after the commit. For a merge commit, the parent is its first parent. A removed node must be archived where both of the following hold:
- it has ever been approved (§s-67vekyup7y8smap);
- its approval status is set by approvals, unlike a section's, which is derived from the nodes under it (§s-9kfdycuq34beqvs).

`sheriff validate` looks up the approvals of a removed node by the sid that the node has in the parent of the removing commit.

A node of the archive is added by a commit in which the archive after the commit holds more nodes with that node's location (§s-kag2m9tzdnduxdx), kind and wording (§s-5ah25f6gy99panq) than the archive of the commit's parent. `sheriff validate` reads the parent's archive in the form to which `sheriff reindex` would rewrite it (§s-f5rz6b7dhxejjts). For a node in a cell of a `TableRule`, the wording compared is the node's own wording.

The entry of a removed node is a node that the commit adds to the archive with the location, the kind and the wording that the removed node had in the commit's parent. `sheriff validate` accepts the commit only if all of the following hold:
- each removed node that must be archived has its entry in the archive;
- the `archived` field of each such entry gives the date of the removal and the reason for it;
- each node that the commit adds to the archive is the entry of a removed node that must be archived.

When `sheriff validate` refuses a commit, it names the sid of each removed node that the refusal concerns, and the file and the location of each node of the archive that it concerns.

## Reason

The archive keeps each removed rule that the code may have implemented, and nothing else (§s-f2b5zvc565s242f). An archived node has no sid, so the entry of a removed node can be checked only in the commit that removes the node.

## Example

A commit removes the approved rule `base/3.2` and the empty section `base/5`. It adds to `specs/_archive/base.json` a `TextRule` that has the location `base/3.2` and the rule's wording, and whose `archived` field gives the date and the reason. The closest mistake is to archive the empty section as well: `sheriff validate` then refuses the commit, naming `specs/_archive/base.json` and `base/5`.
