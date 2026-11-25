# Group 6 drafts for the review (generated 2026-11-25T00:40:05.315Z)

## The entries of the settings that only an owner changes | key new:tools-2-entries | sid s-d3nkw9b6mn98vuw | tools 2.10a (new, after “The settings that only an owner of the specification changes”)

### Text

`sheriff.config.json` (§s-zefk589ykh37b8u) keeps the entries of each setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft) in a list of its own, under its own key:

`approvalStatus`, for the specification's approval status (§s-qzthyh7yqvfhsa2): each entry holds `status`, whose value is `approved` or `draft`, and `by`;

`strict`, for the specification's `strict` flag (§s-q3pfzyaxvpr2zj2): each entry holds `on`, whose value is `true` or `false`, and `by`;

`extensions`, for the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g): each entry holds `name`, whose value is the name of an extension (§s-zefk589ykh37b8u), `chosen`, whose value is `true` or `false`, and `by`.

An entry's `by` holds the email address of the owner who made the change. An entry holds only the keys given above for its list.

`sheriff settings` (§s-chsfpkgpmfk4fft) appends each entry to the end of its list. In a commit, each list begins with the entries that the commit's parent holds in that list (§s-j9r8z4xdrfkfs47). So the last entry of a list is the latest.

The specification's approval status and its `strict` flag each have the value that the last entry of that setting's list sets. The project has chosen exactly those extensions for which the last entry that names the extension sets `chosen` to `true`.

Where `sheriff.config.json` holds no entry for the approval status, no owner has approved the specification. The specification is then a draft (§s-9g7jj8z4yf9kq93). Where it holds no entry for the `strict` flag, the flag has the value that the schema of `sheriff.config.json` gives as the `default` of an entry's `on` (§s-zefk589ykh37b8u).

`sheriff settings` records an entry only where the entry changes the value of its setting.

### Reason

The entries keep every change that an owner made to these settings, each with the email address of the owner who made it, and the last entry of each list sets the value of its setting. `sheriff reindex` writes an entry in place of the rule through which an owner approved the specification under an earlier release (§s-gb8s9657a65hqmv). Since no entry holds anything that depends on when it is written, the check on the entries (§s-j9r8z4xdrfkfs47) never mistakes the entry that `sheriff reindex` writes for a changed one.

### Examples

```json
[
  {
    "en": "`approvalStatus` holds `{\"status\": \"approved\", \"by\": \"a@example.com\"}` followed by `{\"status\": \"draft\", \"by\": \"b@example.com\"}`. The specification is a draft, since the last entry makes it a draft again. The most likely mistake is to treat the specification as approved because one of the entries approves it.",
    "ru": "`approvalStatus` содержит `{\"status\": \"approved\", \"by\": \"a@example.com\"}`, а за ней `{\"status\": \"draft\", \"by\": \"b@example.com\"}`. Спецификация — черновик, потому что последняя запись снова делает её черновиком. Самая вероятная ошибка — считать спецификацию одобренной, потому что одна из записей её одобряет."
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

Before `sheriff settings` records an entry that approves the specification (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), it runs every check that the rule on the specification's approval status requires before the specification is approved (§s-qzthyh7yqvfhsa2). These are the checks that `sheriff validate`, `sheriff binding` and `sheriff citations` make (§s-4kd2pave7vm4hmd), and the check for a node from which nothing is generated, which `sheriff types` makes (§s-a8fn72xa782wvbk, §s-f8fmudceuyaj942).

The checks before an approval treat the specification as approved, whatever the entries in `sheriff.config.json` set. They judge the files in the working tree as if one commit added the following:

each node of the specification in the files that the repository keeps;

the approval that is in force for each approved node (§s-v4qus7raqnwzneb);

all of the system's code (§s-hheus6f395ynqvc), including its tests;

the bindings file (§s-trwczfskj5zmuft).

The checks before an approval treat everything else that the repository keeps, such as the archive (§s-f2b5zvc565s242f), the other lines of `specs/_approvals.jsonl` and the entries in `sheriff.config.json`, as unchanged by that commit. The project's own checks (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) receive a model of the specification (§s-w6gybeqn2ttydqx) in which the specification is approved and its `strict` flag (§s-q3pfzyaxvpr2zj2) has the value that those entries set.

`sheriff settings` makes the check for a node from which nothing is generated as `sheriff types` does (§s-a8fn72xa782wvbk), but writes no file.

`sheriff settings` shows the owner who approves the specification what the checks before an approval find: every refusal, warning and report. Where they find nothing, it records the entry that approves the specification. Otherwise, it records that entry only after the owner confirms the approval, as the node on `sheriff settings` says (§s-chsfpkgpmfk4fft).

While the `strict` flag is on, `sheriff settings` first runs the checks that the flag makes stricter, as it does when asked to turn the flag on (§s-nxgkp988mej79eg). Where any of them would refuse a commit or a push that changes nothing, `sheriff settings` refuses to record the approval. Its run ends with that refusal. The refusal is the same as the one that `sheriff settings` gives when it refuses to turn the flag on.

### Reason

The checks at a commit judge only what the commit contains, so they never show everything that the specification and the code still lack (§s-qzthyh7yqvfhsa2). The checks before an approval judge the whole specification and all of the code as one commit, so they show the owner everything that is still missing before the owner approves the specification.

### Examples

```json
[
  {
    "en": "The specification is a draft, and its `strict` flag is off. An approved rule R has neither code nor a test, and an old function has no SpecTag. The agent runs `sheriff settings status approved` with no terminal attached. `sheriff settings` names R, saying that R lacks code and a test, names the function, and records nothing. The owner agrees to the approval, and the agent runs the command again with `--confirm`. The most likely mistake is to treat R's approval as one that was in force before the single commit that the checks assume. R is then not among the rules that this commit includes, and the owner never sees what R lacks.",
    "ru": "Спецификация — черновик, флаг `strict` выключен. У одобренного правила R нет ни кода, ни теста, а у старой функции нет SpecTag. Агент запускает `sheriff settings status approved` без терминала. `sheriff settings` называет R, сообщая, что у R нет кода и теста, называет функцию и ничего не вносит. Ответственный соглашается на одобрение, и агент запускает команду снова с `--confirm`. Самая вероятная ошибка — считать, что одобрение R было в силе ещё до того единственного коммита, который предполагают проверки. Тогда R не входит в правила, которые включает этот коммит, и ответственный так и не видит, чего R недостаёт."
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
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  }
]
```

### The current node

(none: this node is new)

## Withdrawing the choice of an extension | key new:tools-2-extension-off | sid s-n4ny597qdv9c9bu | tools 2.10d (new, after “Turning the `strict` flag on”)

### Text

`sheriff settings` (§s-chsfpkgpmfk4fft) refuses to record an entry that withdraws the choice of an extension of the guidelines (§s-9ttvcwpqkehm58g, §s-d3nkw9b6mn98vuw) while anything depends on that extension (§s-j8y62pa9hzz6nwx). The refusal names each node that depends on the extension by its file, its sid and its location (§s-kag2m9tzdnduxdx). Where nothing depends on the extension, `sheriff settings` records the entry.

A node other than the extension's own nodes, including a node of the archive (§s-f2b5zvc565s242f), depends on the extension where any of the following holds:

the node's kind is one that the `kinds` of the extension's schema (§s-zefk589ykh37b8u) add;

the node holds a property that the `fields` of the extension's schema add to the node's kind;

the node has a link whose type is one of the `linkTypes` of the extension's schema;

the node has a link that holds a property that the `link` of the extension's schema adds;

the node is outside the archive and has a link to a node in the extension's file.

The refusal names a node of the archive by its file and its location, since it has no sid.

A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension of the guidelines where the reference points to a definition that the `$defs` of the extension's schema add (§s-xzcw3hv4hmxz7h7). The `fields` of the project's extension of the schema depend on the extension of the guidelines where they set conditions for a kind that the `kinds` of the extension's schema add. The refusal names each such reference and each such kind by the file of the project's extension of the schema and the JSON Pointer to it.

`sheriff settings` checks each node in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) and each node of the archive. It also checks each reference in the project's extension of the schema and each kind in its `fields`. It makes this check regardless of whether the specification is approved or a draft.

### Reason

An extension's schema declares, and its file holds, everything that the extension adds, so together they show everything that would rely on rules and definitions that no longer apply in the project once the choice of the extension is withdrawn (§s-j8y62pa9hzz6nwx).

### Examples

```json
[
  {
    "en": "The project has chosen the RecordType extension, whose name is `recordtype`, and the project's base specification holds a RecordType. An owner runs `sheriff settings extension recordtype off`. `sheriff settings` refuses and names the RecordType by its file, its sid and its location. The most likely mistake is to look only for links to the extension's nodes, so that a node of a kind that the extension adds goes unnoticed.",
    "ru": "Проект выбрал расширение RecordType, имя которого `recordtype`, и базовая спецификация проекта содержит RecordType. Ответственный запускает `sheriff settings extension recordtype off`. `sheriff settings` отказывается и называет этот RecordType по его файлу, sid и расположению. Самая вероятная ошибка — искать только связи с узлами расширения: тогда узел типа, который добавляет расширение, остаётся незамеченным."
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
  },
  {
    "type": "cites",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  },
  {
    "type": "cites",
    "to": "s-xzcw3hv4hmxz7h7"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  }
]
```

### The current node

(none: this node is new)
