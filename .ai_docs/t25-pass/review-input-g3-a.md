# Group 3 drafts for review (generated 2026-11-24T11:42:32.147Z)

## Entries that only an owner of the specification records | key s-j9r8z4xdrfkfs47 | sid s-j9r8z4xdrfkfs47 | tools 7.2.3

### Text

`sheriff binding` accepts a commit's change to the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) for a setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft), provided that both of the following hold:

after the commit, the first entries for that setting are those that the commit's parent holds, unchanged and in the same order;

each entry that follows them names an owner of the specification (§s-6sk8uet75dmq5qz).

`sheriff binding` refuses every other change to the entries for a setting that only an owner of the specification changes. The refusal names the setting and each entry concerned. Where an entry names a person who is not an owner of the specification, the refusal also names the specification's owners.

The settings that only an owner of the specification changes are the following:

the specification's approval status (§s-qzthyh7yqvfhsa2);

its `strict` flag (§s-q3pfzyaxvpr2zj2);

the extensions of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen (§s-9ttvcwpqkehm58g).

`sheriff binding` reads the entries of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv). For a merge commit, the parent is its first parent. `sheriff binding` takes the specification's owners from `project.json` as the commit leaves it.

`sheriff binding` makes this check whether the specification is approved or a draft (§s-pa8t49pqpwscuq7, §s-y5w6xwvwh857azx, §s-dxzq5rd6eeteza4).

### Reason

A setting that only an owner of the specification changes is decided by its latest entry, which only an owner records (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g). An entry recorded in another person's name, or an earlier entry removed, edited or moved, would change such a setting without an act of an owner.

### Examples

```json
[
  {
    "en": "The latest entry for the specification's approval status approves the specification, and the entry before it returned the specification to draft. A person deletes the latest entry by hand, so that the specification would be a draft again. `sheriff binding` refuses the commit, since the first entries for that setting are no longer those of the commit's parent. The most likely mistake is to check only the added entries, which lets the commit return the specification to draft without an owner's entry.",
    "ru": "Последняя запись о статусе одобрения спецификации одобряет её, а запись перед ней возвращала спецификацию в черновик. Человек вручную удаляет последнюю запись, чтобы спецификация снова стала черновиком. `sheriff binding` отвергает коммит, потому что первыми записями для этой настройки больше не являются записи родительского коммита. Самая вероятная ошибка — проверять только добавленные записи: тогда коммит возвращает спецификацию в черновик без записи ответственного."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-pa8t49pqpwscuq7"
  },
  {
    "type": "implements",
    "to": "s-y5w6xwvwh857azx"
  },
  {
    "type": "implements",
    "to": "s-dxzq5rd6eeteza4"
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
    "to": "s-6sk8uet75dmq5qz"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  }
]
```

### The current node

Title: From a draft to an approved specification, and back

`sheriff binding` holds the specification's passage from a draft to approved and back (§s-qzthyh7yqvfhsa2). It reads the rule that approves the specification in `project.json`.

It takes the specification before a commit as the commit's first parent holds it, read as `sheriff reindex` would rewrite it (§s-f5rz6b7dhxejjts). Where the commit has no parent, it takes the specification before the commit as a draft.

While the commit leaves the specification a draft, `sheriff binding` reports each of these rather than refusing it, where the commit does not change it (§s-kkbqcb9xrpaepwn):

- a symbol of the system's code outside its tests that carries no SpecTag;
- a test that carries no SpecTag.

While the commit leaves the specification approved, both are refused.

A commit that puts the specification back to draft passes only where it adds to the approvals a withdrawal of that rule's approval, of whichever wording, by one of the specification's owners as the commit holds them.

Reason: (none)

## The chosen extensions and the installed plugin | key new:tools-7-1-extensions-delivered | sid s-mhsb6fjsq5xn6c9 | tools 7.1.2a (new, after "How the schema of the specification is composed")

### Text

A command of the SpecSheriff tools that reads the chosen extensions of the guidelines (§s-mbmnsnxenmavu3z, §s-9ttvcwpqkehm58g) runs only where the installed SpecSheriff plugin delivers each of them (§s-j5qmmdq4m26mdvw). Where the plugin lacks one of them, the command names each missing extension and the version of the SpecSheriff tools in the plugin, and stops. `sheriff reindex` then leaves every file unchanged.

The commands that read the chosen extensions include `sheriff validate`, `sheriff binding` and `sheriff reindex`, which compose the schema of the specification with the schema of each chosen extension (§s-xzcw3hv4hmxz7h7). The plugin delivers an extension where the extension's file is at the path given for each extension of the guidelines (§s-zefk589ykh37b8u).

Each command that reads the chosen extensions makes this check whether the specification is approved or a draft (§s-j5qmmdq4m26mdvw).

### Reason

Without an extension's file, the SpecSheriff tools can neither compose the schema that the extension adds nor run the checks of its table (§s-gpzs5fcxvp6jkrp). A command that ran without the file would accept on one machine what the same command refuses on a machine whose plugin delivers the extension.

### Examples

```json
[
  {
    "en": "A project chooses an extension that a new release of the SpecSheriff plugin delivers. A team member's machine still has an earlier release, which does not deliver it. On that machine, `sheriff validate` names the extension and the earlier release's version, and stops, so the git hook refuses the commit. The most likely mistake is to compose the schema without the missing extension, which accepts on that machine a node that the extension's checks would refuse.",
    "ru": "Проект выбирает расширение, которое поставляет новый выпуск плагина SpecSheriff. На машине одного из участников команды всё ещё стоит более ранний выпуск, который его не поставляет. На этой машине `sheriff validate` называет расширение и версию более раннего выпуска и останавливается, поэтому git hook отвергает коммит. Самая вероятная ошибка — составить схему без недостающего расширения: тогда на этой машине принимается узел, который отвергли бы проверки расширения."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-j5qmmdq4m26mdvw"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-xzcw3hv4hmxz7h7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-gpzs5fcxvp6jkrp"
  }
]
```

### The current node

(none: this node is new)
