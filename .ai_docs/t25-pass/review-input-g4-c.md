# Group 4 drafts for review (generated 2026-11-24T16:22:56.481Z)

## An approved rule whose tests or code lag behind it | key s-txbwsthdqhvyzd2 | sid s-txbwsthdqhvyzd2 | tools 7.3.3a (moved from tools 7.2.9, after “The nodes that a commit message must name”)

### Text

`sheriff commit-message` refuses a commit after which the tests or the code of an approved rule lag behind that rule (§s-ddd2e96uke4y83j). The commit passes where its message states that the rule's implementation needs no change (§s-7gab4ptjt2khfr5). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It says whether the rule's tests, its code or both lag, and names the trailer by which the commit message can make that statement.

The tests of an approved rule lag behind it where all of the following hold:

the commit changes the rule's approved wording;

a test of the system's code (§s-hheus6f395ynqvc) is bound to the rule before the commit (§s-zrsc6asgmhv8tnc);

the commit adds, changes or removes no test that is bound to the rule before or after the commit (§s-2x58az67bm6cxq2).

The code of an approved rule lags behind it where all of the following hold:

the commit changes the rule's approved wording, or adds, changes or removes a test that is bound to the rule before or after the commit;

code of the system other than tests is bound to the rule before the commit (§s-kgbzk2ph9e6jfb4);

the commit adds, changes or removes no such code that is bound to the rule before or after the commit.

Code or a test is bound to a rule before the commit where it is bound in the commit's parent. It is bound after the commit where it is bound as the commit leaves the code and the tests. For a merge commit, the parent is its first parent.

A commit changes the approved wording of a rule where both of the following hold:

the rule is approved as the commit leaves it;

its wording then differs from its last approved wording in the commit's parent (§s-a8fn72xa782wvbk).

For each approved rule, `sheriff commit-message` compares the fingerprint of the rule's wording as the commit leaves it with the fingerprint that the rule's last approval in the commit's parent records (§s-v4qus7raqnwzneb). It reads the approvals of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).

`sheriff commit-message` checks each approved rule in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).

`sheriff commit-message` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-ddd2e96uke4y83j). Where the commit leaves the specification a draft, the check passes and reports nothing.

### Reason

Unless its tests and code follow its new wording in the same commit, an approved rule enters the history with tests and code written for its earlier wording (§s-ddd2e96uke4y83j). Only the commit message can state that they need no change, so `sheriff commit-message`, which reads the message, makes the check.

### Examples

```json
[
  {
    "en": "The specification is approved. An earlier commit reworded rule R while it was a draft. The next commit adds the approval of the new wording and changes R's code but none of its tests. Its message has no trailer naming R. `sheriff commit-message` refuses the commit and says that R's tests lag behind it. The most likely mistake is to compare R's wording with its wording in the commit's parent. That wording is already the new one, so the lag passes.",
    "ru": "Спецификация одобрена. Более ранний коммит переформулировал правило R, пока оно было черновиком. Следующий коммит добавляет одобрение новой формулировки и меняет код R, но ни одного из его тестов. В его сообщении нет trailer, который называет R. `sheriff commit-message` отвергает коммит и говорит, что тесты R отстают от него. Самая вероятная ошибка — сравнивать формулировку R с его формулировкой в родительском коммите. Та формулировка уже новая, поэтому отставание проходит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ddd2e96uke4y83j"
  },
  {
    "type": "cites",
    "to": "s-7gab4ptjt2khfr5"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-zrsc6asgmhv8tnc"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  }
]
```

### The current node

Title: A node whose tests or code lag behind it

`sheriff binding` reports a node whose tests or code lag behind it, by the order rule, test, code.

The check takes the references to the files from the node's `meta.code` and `meta.tests` (§s-t383grkn3q68dpf). It learns from the history of the repository when each of those files and the node's text last changed. The history is read as follows:

- changes made in one commit count as made at once;
- a commit whose only change to a file of tests puts `@spec ` before bare sids (§s-rah8b37kytb682y) does not count as changing that file;
- a renamed file is followed under its earlier names too.

It reports the node where:

- its text changed later than every file of its tests: the tests lag;
- its text changed later than every file of its code: the code lags;
- its tests changed later than every file of its code: the code may not have caught up with the tests.

The node is reported by its sid, naming what lags. The change is not refused.

Reason: (none)

## An approved rule without code or a test | key s-jgejd5rpd9d43pd | sid s-jgejd5rpd9d43pd | tools 7.2.10

### Text

`sheriff binding` refuses a commit that includes an approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf), where that rule lacks either of the following (§s-c4y63t285gg7jz7):

code of the system other than tests, bound to the rule (§s-kgbzk2ph9e6jfb4);

a test of the system's code, bound to the rule (§s-zrsc6asgmhv8tnc), that is marked neither as skipped nor as expected to fail.

The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and says whether it lacks code, a test or both.

Code or a test counts as bound to an approved rule as the rule on implementing an approved rule says, including through a chain of `implements` links (§s-6fw72j65jkqrfpf, §s-sn6au3vcr9uy5pm).

A commit includes an approved rule where it does any of the following (§s-c4y63t285gg7jz7):

it adds an approval of the rule (§s-75ue25v6r23jkk8);

it adds, changes or removes (§s-2x58az67bm6cxq2) code or a test that is bound to the rule in the commit's parent or as the commit leaves it;

it removes an `implements` link through which, in the commit's parent, code or a test was bound to the rule.

`sheriff binding` checks the approved rules in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp). Of those rules, it leaves out the following, which the system's code need not implement (§s-6fw72j65jkqrfpf):

each node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);

in the repository where the SpecSheriff guidelines are written, each node of those guidelines, of their extensions and of the appendix of the tools, all kept in `specs/_guidelines/`;

each node in `specs/tech/debt.json`, which holds the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);

each rule that an `exempts` link reaches, directly or through a section above the rule at any depth, where the node that declares the link is approved (§s-gf6n8ge4mke3pr2).

A test is marked as skipped or as expected to fail by a mark, a call or an option that the description of its language names for that purpose (§s-33fw3ga4ctd94dq). In TypeScript and JavaScript these include `test.skip` and `test.todo`, and in Python `pytest.mark.skip`, `pytest.mark.skipif` and `pytest.mark.xfail`.

`sheriff binding` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-c4y63t285gg7jz7). Where the commit leaves the specification a draft, the check passes and reports nothing.

### Reason

Committed without code, or without a test that a run can fail, an approved rule would let the specification state what the system does not do, unnoticed (§s-c4y63t285gg7jz7).

### Examples

```json
[
  {
    "en": "The specification is approved. A commit adds the approval of rule R, whose code exists, and the only test that declares R's SpecTag is marked `pytest.mark.skip`. `sheriff binding` refuses the commit, naming R and saying that it lacks a test. The most likely mistake is to count the skipped test, which no run of the tests can fail.",
    "ru": "Спецификация одобрена. Коммит добавляет одобрение правила R, у которого есть код, а единственный тест, который объявляет SpecTag правила R, помечен `pytest.mark.skip`. `sheriff binding` отвергает коммит, называя R и говоря, что у него нет теста. Самая вероятная ошибка — засчитать пропускаемый тест, который не провалит ни один запуск тестов."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-c4y63t285gg7jz7"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-6fw72j65jkqrfpf"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-zrsc6asgmhv8tnc"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-75ue25v6r23jkk8"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-2r7k2aeyusgy6fw"
  },
  {
    "type": "cites",
    "to": "s-gf6n8ge4mke3pr2"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  }
]
```

### The current node

Title: An approved node without code or a test

`sheriff binding` looks up each approved rule among the sids the SpecTags on the system's code and on its tests name. It looks up in the same way each approved node of a project's own NodeKind that needs code.

- A node of a project's own NodeKind needs code unless its extension declares it as needing none (§s-vsh384ybt4w25a2).
- Nodes of the SpecSheriff guidelines, of `project.json` and of `debt.json` are left out.
- A test its framework is told to skip does not count.
- A rule implementing the node through an `implements` link counts for it, and so, in turn, does each rule implementing such a rule.
- A node lacking a symbol carrying its SpecTag, or a test carrying it, is reported, naming what it lacks. It is not reported where an `exempts` link to it or to a section it stands under exempts it.

Reason: (none)

## The nodes that a commit message must name | key s-qqs2svksmjct753 | sid s-qqs2svksmjct753 | tools 7.3.3

### Text

`sheriff commit-message` accepts a commit message only where it gives the sid of each node to which a SpecTag (§s-5z5gnu7pahr82xp) binds code that the commit adds or changes (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). It refuses any other message, naming each node whose sid the message lacks by its file, its sid and its location (§s-kag2m9tzdnduxdx).

In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes in the system's code (§s-hheus6f395ynqvc), other than tests. `sheriff commit-message` reads their SpecTags as the commit leaves them.

A message gives a node's sid where the sid appears anywhere in the message. The lines that start with `#` are left out, since git treats them as comments.

`sheriff commit-message` makes this check regardless of whether the specification is approved or a draft (§s-7sk3s553ukzwtbm).

### Reason

The commit message records, for whoever reads the history, which nodes the changed code implements (§s-ef93u6cnbs2sevr), and the SpecTags on that code name exactly those nodes.

### Examples

```json
[
  {
    "en": "A commit changes only `src/ui/texts.json`, which the bindings file binds to rule R, and its message gives no sid. `sheriff commit-message` refuses the message and names R. The most likely mistake is to read only the SpecTags placed above symbols, which lets the message pass.",
    "ru": "Коммит меняет только `src/ui/texts.json`, который файл привязок привязывает к правилу R, а в его сообщении нет ни одного sid. `sheriff commit-message` отвергает сообщение и называет R. Самая вероятная ошибка — читать только SpecTag над символами: тогда сообщение проходит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-7sk3s553ukzwtbm"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-5qdjyf6t898rsd4"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-ef93u6cnbs2sevr"
  }
]
```

### The current node

Title: A commit message names the nodes its code implements

A commit that changes code names in its message, by sid, every node the SpecTags on its changed symbols outside the tests name. `sheriff message` refuses the message where:

- a node a SpecTag on a changed symbol outside the tests names is not named in it;
- a sid in it names no node;
- a sid in it names a domain's header or a section, which no code implements.

Reason: (none)
