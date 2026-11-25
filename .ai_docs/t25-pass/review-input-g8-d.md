# Group 8 drafts for the review (generated 2026-11-25T16:09:08.061Z)

## The plugin for Claude Code | key s-zh2vcr3xjumppg5 | sid s-zh2vcr3xjumppg5 | tools 14

### Text

The plugin for Claude Code, `specsheriff`, holds the following:

the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9);

the SpecSheriff tools, with the files common to every project at the paths given for them in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u): the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8), with their schemas;

the scripts of the agent's hooks (§s-477gtdrkw34dzxw).

The plugin declares to Claude Code the agent's hooks: the hook run when a session starts, the hook before an edit made with `Write`, `Edit` or `MultiEdit`, and the hook after such an edit or a shell command run with `Bash` or `PowerShell` (§s-477gtdrkw34dzxw).

The plugin declares each setting of the runner `claude` (§s-tnz9zgqx8c629a7) as one of its options. Claude Code asks the user for those options when it enables the plugin. Each option names its default and declares no default value, so that a value that Claude Code holds for it is one that the user gave.

In a repository without `sheriff.config.json` at its root, the plugin's hooks do only the following:

keep its copy of the SpecSheriff tools (§s-4mej6ccn7xu3d3p);

write the settings that the user gave as its options (§s-p29yawkkkgk7kxb).

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory. A project declares both in `.claude/settings.json` (§s-7unxytshhc4md54):

the marketplace under `extraKnownMarketplaces`, whose source is the branch `release` of the repository where the SpecSheriff guidelines are written, with `autoUpdate` on;

the plugin under `enabledPlugins`.

Each machine runs the release that its copy of the plugin holds, until Claude Code updates that copy.

The plugin's skills and the agent's hooks run `sheriff` from the SpecSheriff tools in the plugin, as `node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

### Reason

An agent takes up a skill only where it is installed, and Claude Code installs, updates and enables a plugin that a project declares. So the plugin brings the skills, the SpecSheriff guidelines with their extensions and the SpecSheriff tools of one release to the agent of every clone together, and the project keeps only the calls to them.

### Examples

```json
[
  {
    "en": "A project chooses the RecordType extension. On every machine where Claude Code has updated the plugin to a release that delivers that extension, the SpecSheriff tools find the extension at `guidelines/extensions/recordtype.json` in their own folder. The most likely mistake is to keep a copy of the extension in the project, which `sheriff validate` refuses (§s-6bmnsbskg6en4nf).",
    "ru": "Проект выбирает расширение RecordType. На каждой машине, где Claude Code обновил копию плагина до выпуска, который это расширение поставляет, инструменты SpecSheriff находят его в `guidelines/extensions/recordtype.json` в своей папке. Самая вероятная ошибка — хранить копию расширения в проекте: `sheriff validate` её отвергает (§s-6bmnsbskg6en4nf)."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-bsya3febm6u64ab"
  },
  {
    "type": "implements",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "implements",
    "to": "s-83ev4wwesbwnhnp"
  },
  {
    "type": "cites",
    "to": "s-kq6wmdud9c7j2k9"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-a4rbry4hsu34hy8"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  },
  {
    "type": "cites",
    "to": "s-4mej6ccn7xu3d3p"
  },
  {
    "type": "cites",
    "to": "s-p29yawkkkgk7kxb"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  },
  {
    "type": "cites",
    "to": "s-6bmnsbskg6en4nf"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  }
]
```

### The current node

Title: The plugin for Claude Code carries everything its work needs

The plugin for Claude Code, `specsheriff`, carries:

- the skills `spec`, `spec-review`, `spec-adopt`, `spec-init` and `spec-remove`;
- the SpecSheriff guidelines and their schema;
- the SpecSheriff tools.

It declares its hooks to Claude Code: the agent's hooks (§s-477gtdrkw34dzxw) and the one run when a session starts (§s-4mej6ccn7xu3d3p).

It declares each setting of the runner `claude` (§s-xr5xxa9cxf2mq5u) as one of its options. Claude Code asks the user for those options when it enables the plugin. Each option names its default and takes no default value, so that a value Claude Code holds for it is one the user gave.

In a repository holding no `sheriff.config.json` at its root, the plugin's hooks do nothing but:

- keep its copy of the tools (§s-4mej6ccn7xu3d3p);
- write the settings the user gave as its options (§s-477gtdrkw34dzxw).

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory. A project declares both in `.claude/settings.json`:

- the marketplace under `extraKnownMarketplaces`, its source the branch `release` of the repository the SpecSheriff guidelines are written in, and `autoUpdate` on;
- the plugin under `enabledPlugins`.

Each machine runs the release its copy of the plugin holds until Claude Code updates it there.

The plugin's skills and the agent's hooks run `sheriff` from the SpecSheriff tools the plugin carries, as `node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

The skill `spec-init` runs `sheriff init`. It then takes up the settings of the runner `sheriff review` would take. It passes over each setting the user's git configuration holds or the user was asked for (§s-477gtdrkw34dzxw). For each other setting, it:

- offers the setting to the user at its default, to confirm or replace;
- writes what the user answers.

It then marks the runner asked (§s-xr5xxa9cxf2mq5u).

`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove the plugin from the machine.

The skills set neither a model nor a reasoning effort, for themselves or for any agent they start. They work at those the user has chosen in their session.

Reason: An agent takes up a skill only where it is installed. Claude Code installs and updates a plugin from a marketplace itself. It runs the hooks a plugin declares while the plugin is enabled. So, declared in the project, the plugin is offered to the agent of every clone. Updating itself, it brings every machine the latest release.

Carrying the guidelines and the tools beside the skills, the plugin keeps everything of one release together on the machine. It keeps nothing of a release in the project but the calls to it.

A plugin installed for a user runs in every project they open. A project not taking the method is held to nothing of it.

The marketplace is read from `release`, which holds only releases, so an agent loads a release and never the work in progress on `main`. Wherever a skill or a hook names `${CLAUDE_PLUGIN_ROOT}`, Claude Code writes there the directory of the plugin's installed release. So each skill and each hook runs the tools of its own release.

A plugin is installed for its user on the machine, beyond any one project. So `spec-remove` offers its removal and leaves the choice to the user.

The user pays for their session at the model and the effort they choose in it, so the skills set neither. The reviewer runs outside the session, at the cost of the user who commits and at the settings that user confirms (§s-xr5xxa9cxf2mq5u). Claude Code asks for those settings as the plugin's options when it enables the plugin.

A default value declared for an option would be taken for a user who gave none. The hooks could not tell it from an answer. So the options declare none.

Where Claude Code enabled the plugin without asking, `spec-init` asks for the settings. It asks before the first commit of a project it sets up is reviewed, unless the user was asked before.

## The plugin for Codex CLI | key s-2pdy9gw2jrjvfb4 | sid s-2pdy9gw2jrjvfb4 | tools 15

### Text

The plugin for Codex CLI, `specsheriff`, holds the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9). It holds the SpecSheriff tools, with the files common to every project, and the scripts of the agent's hooks, as the plugin for Claude Code does (§s-zh2vcr3xjumppg5).

The plugin declares no hooks to Codex. The agent's hooks for Codex are in the project, and call the scripts that the plugin holds (§s-n76wt2bkqdmh78x).

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json`. That file is beside the file that lists the plugin for Claude Code.

The practitioner's guide, the plugin's `README.md`, gives the commands that install the plugin on a machine:

`codex plugin marketplace add non4me/SpecSheriff@release`;

`codex plugin add specsheriff@specsheriff-marketplace`.

The plugin's skills run `sheriff` from the SpecSheriff tools in the plugin, as `node <plugin>/tools/dist/cli.js`. A skill takes `<plugin>` from the path of its `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.

### Reason

An agent takes up a skill only where it is installed, and Codex installs a plugin only for the user who adds it. So each user installs the plugin for Codex CLI, which brings the same release of the skills and the SpecSheriff tools as the plugin for Claude Code, while each agent updates its own plugin.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-bsya3febm6u64ab"
  },
  {
    "type": "implements",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-kq6wmdud9c7j2k9"
  },
  {
    "type": "cites",
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-n76wt2bkqdmh78x"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  }
]
```

### The current node

Title: The plugin for Codex CLI carries everything its work needs

The plugin for Codex CLI, `specsheriff`, carries:

- the skills `spec`, `spec-review`, `spec-adopt`, `spec-init` and `spec-remove`;
- the SpecSheriff guidelines and their schema;
- the SpecSheriff tools.

It declares no hooks. The agent's hooks for Codex stand in the project (§s-n76wt2bkqdmh78x).

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json`. That file stands beside the file listing the plugin for Claude Code (§s-zh2vcr3xjumppg5).

The practitioner's guide, the plugin's `README.md`, gives the commands that install the plugin on a machine:

- `codex plugin marketplace add non4me/SpecSheriff@release`;
- `codex plugin add specsheriff@specsheriff-marketplace`.

The plugin's skills run `sheriff` from the SpecSheriff tools the plugin carries, as `node <plugin>/tools/dist/cli.js`. A skill takes `<plugin>` from the path of its `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.

The skill `spec-init` runs `sheriff init --agent codex`. It then takes up the settings of the runner `sheriff review` would take. It passes over each setting the user's git configuration holds or the user was asked for (§s-477gtdrkw34dzxw). For each other setting, it:

- offers the setting to the user at its default, to confirm or replace;
- writes what the user answers.

It then marks the runner asked (§s-xr5xxa9cxf2mq5u).

`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove the plugin from the machine.

The skills set neither a model nor a reasoning effort, for themselves or for any agent they start. They work at those the user has chosen in their session.

Reason: An agent takes up a skill only where it is installed. Codex installs a plugin for the user who adds it, and none that a project declares. So each user installs the plugin, as they install Codex.

Codex reads `.agents/plugins/marketplace.json` before the file listing the plugin for Claude Code, so each agent finds its own plugin.

Codex admits no plugin carrying hooks into its public directory, so the plugin carries none.

Carrying the guidelines and the tools beside the skills, the plugin keeps everything of one release together on the machine. Each agent installs and updates its own plugin. So neither plugin waits on the other. Each can also change for its agent alone.

A skill reaches the tools beside it by the path of its own file, which Codex gives it.

A plugin is installed for its user on the machine, beyond any one project. So `spec-remove` offers its removal and leaves the choice to the user.

The user pays for their session at the model and the effort they choose in it, so the skills set neither. The reviewer runs outside the session, at the cost of the user who commits and at the settings that user confirms (§s-xr5xxa9cxf2mq5u).

Codex asks nothing for a plugin it installs. The session in which a project is set up started before `sheriff init` wrote the agent's hooks for Codex into the project (§s-n76wt2bkqdmh78x). So no session start asked for the settings there. `spec-init` asks in its place, before the first commit is reviewed, unless the user was asked before.

## The skills of the SpecSheriff plugins | key new:tools-15-skills | sid s-kq6wmdud9c7j2k9 | tools 15a (new, after “The plugin for Codex CLI”)

### Text

Each SpecSheriff plugin holds the skills `spec`, `spec-review`, `spec-adopt`, `spec-init`, `spec-remove` and `spec-settings`.

`spec-init` runs `sheriff init` (§s-7unxytshhc4md54), with `--agent codex` in the plugin for Codex CLI. It then takes up the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). It passes over each setting that the user's git configuration holds, and each setting that the user has already been asked for (§s-p29yawkkkgk7kxb). For each other setting, it does the following:

offers the setting to the user at its default, to confirm or replace;

writes what the user answers.

`spec-init` then records that the runner has been asked, as the hook run when a session starts does (§s-p29yawkkkgk7kxb).

`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove the plugin from the machine.

`spec-settings` shows in the chat the settings that only an owner of the specification changes, as `sheriff settings` prints them (§s-chsfpkgpmfk4fft). It then offers the user either of the following ways to change them:

`sheriff settings` in a terminal window of its own, where the session runs on a machine on which the skill can open one, after which the skill reports what changed;

questions in the chat, after which the skill runs `sheriff settings` with the arguments of each change that the user asks for.

The skills set neither a model nor a reasoning effort, for themselves or for any agent that they start. They work at those that the user has chosen in the session.

### Reason

Each skill performs its procedure through the SpecSheriff tools, so that the agent of either SpecSheriff plugin follows the same steps. What a skill would make the user pay for, the reviewer's settings and the model and effort of the session, is left to the user (§s-tnz9zgqx8c629a7).

### Examples

```json
[
  {
    "en": "An owner works from a browser through Remote Control and asks the agent to choose the Views extension. `spec-settings` offers a terminal window or questions in the chat, and the owner chooses the chat. The skill runs `sheriff settings extension views on`. The most likely mistake is to open the window without asking, on a desktop that the owner cannot see.",
    "ru": "Ответственный работает из браузера через Remote Control и просит агента выбрать расширение Views. `spec-settings` предлагает окно терминала или вопросы в чате, и ответственный выбирает чат. Skill запускает `sheriff settings extension views on`. Самая вероятная ошибка — открыть окно, не спросив: на рабочем столе, которого ответственный не видит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-p29yawkkkgk7kxb"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  }
]
```

### The current node

(none: this node is new)
