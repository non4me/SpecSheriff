# Group 1 drafts for review (generated 2026-11-24T00:59:48.436Z)

## The runner `claude` | key new:tools-10-claude | sid s-3wh8uhgn9jr2k74 | tools 10.5 (new)

### Text

The runner `claude` is the Claude Code CLI in print mode. It asks for the model and the reasoning effort that the settings of the runner give (§s-tnz9zgqx8c629a7). Where that model is overloaded or not offered, it falls back to the fallback model that those settings give.

### Reason

Print mode answers once and exits, with no session around it to carry anything over.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  }
]
```

### The current node

(none: this node is new)

## The runner `codex` | key new:tools-10-codex | sid s-u2n5hwwqkb6zk4z | tools 10.6 (new)

### Text

The runner `codex` is the Codex CLI in `codex exec`, with a Codex home of its own. That home is made in a temporary directory for the run and deleted after it. It holds a copy of the user's sign-in and nothing else.

The runner `codex` runs with:

its sandbox read-only;

its session not kept;

no skill offered.

It asks for the model and the reasoning effort that the settings of the runner give (§s-tnz9zgqx8c629a7). Where the model is empty, it asks for no model.

### Reason

Codex offers no run without a home and tools of its own, so the runner confines both: the home holds only the sign-in, and the sandbox lets nothing be written.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  }
]
```

### The current node

(none: this node is new)

## The settings of each runner | key new:tools-10-settings | sid s-tnz9zgqx8c629a7 | tools 10.7 (new)

### Text

`sheriff review` reads the settings of each runner from the git configuration of the user who commits:

`specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` and `specsheriff.review.claudeEffort`, for the runner `claude` (§s-3wh8uhgn9jr2k74);

`specsheriff.review.codexModel` and `specsheriff.review.codexEffort`, for the runner `codex` (§s-u2n5hwwqkb6zk4z).

`sheriff review` takes the model and the reasoning effort only from these settings. An empty `codexModel` means the model that Codex chooses for the signed-in account.

A setting that the configuration holds, empty or not, is confirmed. The hooks and the skills of each SpecSheriff plugin ask only for a setting that the configuration lacks. They write a setting only as the user whose configuration it is answers. Where the user answers with the default, they write it like any other value. The session start (§s-477gtdrkw34dzxw) and the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when each setting is asked for.

The defaults are:

for the runner `claude`, the model `opus` at the reasoning effort `high`, falling back to `sonnet`;

for the runner `codex`, the model that Codex chooses, at the reasoning effort `high`.

Where the configuration lacks a setting of the runner that runs, `sheriff review` takes that setting's default. With every review that runs at a default, `sheriff review` names each setting whose default it took, and how the user confirms that setting.

### Reason

A run of the reviewer is paid for by the user who commits, from their own account. So it runs at the models and the efforts that this user has confirmed on their machine. Until the user confirms them, each review tells the user what it ran at.

### Examples

```json
[
  {
    "en": "A user confirms `specsheriff.review.claudeModel` once with `git config --global`. From then on, every project on that machine runs the reviewer at that model, including after the plugin is updated, or removed and installed again. The most likely mistake is to keep the model in `sheriff.config.json`, which every clone shares, so that everyone who commits pays for one person's choice.",
    "ru": "Пользователь один раз подтверждает `specsheriff.review.claudeModel` командой `git config --global`. С тех пор каждый проект на этой машине запускает рецензента на этой модели, в том числе после обновления плагина или после его удаления и повторной установки. Самая вероятная ошибка — хранить модель в `sheriff.config.json`, общем для всех клонов: тогда за выбор одного человека платит каждый, кто делает коммит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-3wh8uhgn9jr2k74"
  },
  {
    "type": "cites",
    "to": "s-u2n5hwwqkb6zk4z"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-2pdy9gw2jrjvfb4"
  }
]
```

### The current node

(none: this node is new)

## SpecTags in the code and the tests | key new:tools-8-section | sid s-6c4hyyrnprekk32 | tools 8 (new section, in place of the node "The SpecTag, and how a symbol carries it")

### Text

How the system's code (§s-hheus6f395ynqvc) and its tests carry SpecTags (§s-8xw4mgvpexyvw5q), and how the SpecSheriff tools read them.

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  }
]
```

### The current node

(none: this node is new)

## The form of a SpecTag | key s-5z5gnu7pahr82xp | sid s-5z5gnu7pahr82xp | tools 8.1

### Text

A SpecTag (§s-8xw4mgvpexyvw5q) is written in one of these forms:

`@spec <sid>`, where `<sid>` is the sid of a rule that the code implements or that the test is written from (§s-sfjka4zc4rhfu67);

`@spec none`, followed by a space and by what the technology the system is built with requires of the code (§s-2jcmb9xe9d64t2t).

A rule here is a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2), including a node in a cell of a `TableRule`.

Code that implements several rules carries a SpecTag for each of them. Code that implements no rule carries `@spec none` as its only SpecTag. A test carries a SpecTag only in the form `@spec <sid>` (§s-nrjxfvpkq3m8hzm).

### Reason

One fixed form lets the SpecSheriff tools find every SpecTag by its text, in any language. That includes the SpecTag that marks technical code (§s-2jcmb9xe9d64t2t), so that such code stays visible.

### Examples

```json
[
  {
    "en": "A function that a web framework calls to register the routes, and that holds none of the system's logic, carries `@spec none the web framework requires a function that registers the routes`. The most likely mistake is `@spec none helper`, which does not say what requires the code.",
    "ru": "У функции, которую веб-фреймворк вызывает, чтобы зарегистрировать маршруты, и в которой нет логики системы, есть SpecTag `@spec none the web framework requires a function that registers the routes`. Самая вероятная ошибка — `@spec none helper`: он не говорит, что требует этот код."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "implements",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-sfjka4zc4rhfu67"
  },
  {
    "type": "cites",
    "to": "s-2jcmb9xe9d64t2t"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-ktfstpv8rurznrp"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-nrjxfvpkq3m8hzm"
  }
]
```

### The current node

Title: The SpecTag, and how a symbol carries it

A SpecTag is the text `@spec <sid>`, or `@spec none` followed by its reason. The form `@spec none` stands on a symbol only.

A symbol carries its SpecTag as a line of the comment directly above it, above its decorators where it has any. That comment is:

- in TypeScript and JavaScript, the symbol's doc comment;
- in Python, a comment line.

A symbol implementing several rules carries several SpecTags. A test carries its SpecTag in its name or in a mark on it (§s-zrsc6asgmhv8tnc).

A symbol that implements no rule says so with `@spec none`, followed by the reason it carries none. Where such a symbol stands first in a run of re-exports, with no blank line between them, it says so for the whole run.

On a symbol, only the delimiters of the comment may share a SpecTag's line, so that a scan finds a SpecTag's text in any language.

Which symbol a SpecTag stands on is found by parsing the file with tree-sitter and the grammar of the file's language. The parser is used alone, with no program and no type checker.

A description of each language names what counts in it as a declaration and as a test. TypeScript, JavaScript and Python are described.

Reason: A comment above a symbol is where an editor shows a SpecTag and where a reader of the symbol is already looking.

A scan finds a SpecTag but cannot see what it is attached to, so a SpecTag standing over nothing would pass it. The parser sees the symbol under the comment. Used alone, the parser answers the same for the same file every time. Alone, it is also cheap enough to run at every commit.

One parser with a grammar per language makes a further language a description rather than new code.
