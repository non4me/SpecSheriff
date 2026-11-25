# Group 6 drafts for the review (generated 2026-11-24T23:28:27.092Z)

## The entries of the settings that only an owner changes | key new:tools-2-entries | sid s-d3nkw9b6mn98vuw | tools 2.10a (new, after “The settings that only an owner of the specification changes”)

### Text

`sheriff.config.json` (§s-zefk589ykh37b8u) keeps the entries of each setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft) in a list of its own, under its own key:

`approvalStatus`, for the specification's approval status (§s-qzthyh7yqvfhsa2): each entry holds `status`, whose value is `approved` or `draft`, and `by`;

`strict`, for the specification's `strict` flag (§s-q3pfzyaxvpr2zj2): each entry holds `on`, whose value is `true` or `false`, and `by`;

`extensions`, for the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g): each entry holds `name`, the name of an extension (§s-zefk589ykh37b8u), `chosen`, whose value is `true` or `false`, and `by`.

The value of an entry's `by` is the email address by which `sheriff settings` names the owner who made the change. An entry holds only the keys given above for its list.

`sheriff settings` appends each entry to the end of its list, and a commit keeps the entries of its parent first (§s-j9r8z4xdrfkfs47). So the last entry of a list is the latest.

The specification's approval status and its `strict` flag have the values that the last entry of their lists sets. The project has chosen exactly those extensions for which the last entry of `extensions` that names the extension sets `chosen` to `true`.

Where `approvalStatus` holds no entry, no owner has approved the specification, so the specification is a draft (§s-9g7jj8z4yf9kq93). Where `strict` holds no entry, the flag has the default value that the schema of `sheriff.config.json` sets (§s-zefk589ykh37b8u).

`sheriff settings` records an entry only where the entry changes the value of its setting. Otherwise it records nothing and says that the setting already has that value.

### Reason

The entries keep every change that an owner made to these settings, each with whoever made it, while the last entry of each list gives its setting a value. `sheriff reindex` writes an entry in place of the rule by which an earlier release approved the specification (§s-gb8s9657a65hqmv). An entry holds nothing that depends on when it is written, so that this entry has the same text whenever it is written.

### Examples

```json
[
  {
    "en": "`approvalStatus` holds `{\"status\": \"approved\", \"by\": \"a@example.com\"}` followed by `{\"status\": \"draft\", \"by\": \"b@example.com\"}`. The specification is a draft, since the last entry returns it to draft. The most likely mistake is to treat the specification as approved because one of the entries approves it.",
    "ru": "`approvalStatus` содержит `{\"status\": \"approved\", \"by\": \"a@example.com\"}`, а за ней `{\"status\": \"draft\", \"by\": \"b@example.com\"}`. Спецификация — черновик, потому что последняя запись возвращает её в черновик. Самая вероятная ошибка — считать спецификацию одобренной, потому что одна из записей её одобряет."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "implements",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-j9r8z4xdrfkfs47"
  },
  {
    "type": "cites",
    "to": "s-9g7jj8z4yf9kq93"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  }
]
```

### The current node

(none: this node is new)

## Approving the specification | key new:tools-2-approve-spec | sid s-m59dqwkw2e96wne | tools 2.10b (new, after “The entries of the settings that only an owner changes”)

### Text

Before `sheriff settings` records an entry that approves the specification (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), it runs every check that the rule on the specification's approval status requires before an approval (§s-qzthyh7yqvfhsa2): the checks that `sheriff validate`, `sheriff binding` and `sheriff citations` make (§s-4kd2pave7vm4hmd).

These checks read the specification as approved, whatever the entries in `sheriff.config.json` set. They judge the files in the working tree as one commit that adds the following:

each node of the specification in the files that the repository keeps;

the approval in force of each approved node (§s-v4qus7raqnwzneb);

all of the system's code (§s-hheus6f395ynqvc), including its tests.

The checks treat everything else that the repository keeps, such as the archive (§s-f2b5zvc565s242f), the other lines of `specs/_approvals.jsonl` and the entries in `sheriff.config.json`, as unchanged by that commit. The project's own checks receive the model of the specification (§s-w6gybeqn2ttydqx) that the node on such checks gives for this run (§s-7pk89t8z6wymmj9).

`sheriff settings` also names each node from which `sheriff types` would generate nothing, because the node's approved wording relies on a node that has never been approved (§s-f8fmudceuyaj942). It finds these nodes as `sheriff types` does (§s-a8fn72xa782wvbk), but writes no file.

`sheriff settings` shows the owner who approves the specification every refusal, warning and report that these checks give. Where they give none, it records the entry. Otherwise, it records the entry only after the owner confirms the approval, as the node on `sheriff settings` says (§s-chsfpkgpmfk4fft).

While the `strict` flag (§s-q3pfzyaxvpr2zj2) is on, `sheriff settings` first makes the checks that the flag makes stricter, as it does before it turns the flag on (§s-nxgkp988mej79eg). Where any of them would refuse a commit that changes nothing, `sheriff settings` refuses to record the approval and makes no other check. That refusal is the one that `sheriff settings` gives before it turns the flag on.

`sheriff settings` records an entry that returns the specification to draft without running any check.

### Reason

The checks at a commit judge only what the commit contains, so they never show everything that the specification and the code still lack (§s-qzthyh7yqvfhsa2). Judging one commit that adds the whole specification and all of the code, they show the owner every such gap before the owner approves the specification.

### Examples

```json
[
  {
    "en": "The specification is a draft, and its `strict` flag is off. An approved rule R has neither code nor a test, and no SpecTag binds an old function. The agent runs `sheriff settings status approved` with no terminal attached. `sheriff settings` names R, saying that R lacks code and a test, names the function, and records nothing. The owner agrees, and the agent runs the command again with `--confirm`. The most likely mistake is to read R's approval as one that the commit's parent already holds. R is then not among the rules that the commit includes, and the owner never sees what R lacks.",
    "ru": "Спецификация — черновик, флаг `strict` выключен. У одобренного правила R нет ни кода, ни теста, а старую функцию не связывает ни один SpecTag. Агент запускает `sheriff settings status approved` без терминала. `sheriff settings` называет R, сообщая, что у R нет кода и теста, называет функцию и ничего не вносит. Ответственный соглашается, и агент запускает команду снова с `--confirm`. Самая вероятная ошибка — считать одобрение R тем, что уже есть в родительском коммите. Тогда R не входит в правила, которые включает коммит, и ответственный так и не видит, чего R недостаёт."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "implements",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-d3nkw9b6mn98vuw"
  },
  {
    "type": "cites",
    "to": "s-4kd2pave7vm4hmd"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-7pk89t8z6wymmj9"
  },
  {
    "type": "cites",
    "to": "s-f8fmudceuyaj942"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-nxgkp988mej79eg"
  }
]
```

### The current node

(none: this node is new)

## Withdrawing the choice of an extension | key new:tools-2-extension-off | sid s-n4ny597qdv9c9bu | tools 2.10d (new, after “Turning the `strict` flag on”)

### Text

`sheriff settings` refuses to record an entry that withdraws the choice of an extension of the guidelines (§s-9ttvcwpqkehm58g, §s-d3nkw9b6mn98vuw) while a node depends on that extension (§s-j8y62pa9hzz6nwx). The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx). Where no node depends on the extension, `sheriff settings` records the entry.

A node other than the extension's own nodes depends on the extension where any of the following holds:

the node's kind is one that the `kinds` of the extension's schema (§s-zefk589ykh37b8u) add;

the node holds a property that the `fields` of the extension's schema add to the node's kind;

the node has a link whose type is one of the `linkTypes` of the extension's schema;

the node has a link that holds a property that the `link` of the extension's schema adds;

the node has a link to a node in the extension's file.

`sheriff settings` checks each node in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft.

### Reason

Withdrawn while a node still depends on it, an extension would leave that node relying on rules and definitions that no longer hold in the project (§s-j8y62pa9hzz6nwx). Everything that an extension adds to the specification is either declared in its schema or held in its file, so those two show every node that depends on it.

### Examples

```json
[
  {
    "en": "The project has chosen the RecordType extension, whose name is `recordtype`, and its base specification holds a RecordType. An owner runs `sheriff settings extension recordtype off`. `sheriff settings` refuses and names the RecordType by its file, its sid and its location. The most likely mistake is to look only for links to the extension's nodes, so that a node of a kind that the extension adds goes unnoticed.",
    "ru": "Проект выбрал расширение RecordType, имя которого `recordtype`, и его базовая спецификация содержит RecordType. Ответственный запускает `sheriff settings extension recordtype off`. `sheriff settings` отказывается и называет этот RecordType по его файлу, sid и расположению. Самая вероятная ошибка — искать только связи с узлами расширения: тогда узел типа, который добавляет расширение, остаётся незамеченным."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-j8y62pa9hzz6nwx"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-d3nkw9b6mn98vuw"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  }
]
```

### The current node

(none: this node is new)
