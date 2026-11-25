# Row 10.1.25a of the main table of checks

What is checked: A node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in a commit and has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification refines the rules of the base specification that it implements. Such a node contradicts no rule of the base specification

On failure: refused, naming the node and each rule of the base specification that the node contradicts, or that it implements without refining it

Reason: An agent may approve such a node on an owner's behalf (§s-t5uw8zfxzhfdg86), and code is then written from the node. Without this check, no one but the node's author would compare it with the base specification before code written from it is committed.
