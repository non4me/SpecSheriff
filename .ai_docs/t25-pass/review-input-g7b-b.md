# Group 7 drafts for the review (generated 2026-11-25T12:20:52.292Z)

## Building the map | key s-rpv4fkdqqguptqd | sid s-rpv4fkdqqguptqd | tools 4

### Text

`sheriff map` writes the map of the specification (§s-zu8ne3wq84zchc4) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run. The refusal names the Views extension.

`sheriff map` writes the map into `specs/_viewer/` (§s-zefk589ykh37b8u) as follows:

it first removes everything in that folder;

it then writes two files there: the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`.

That `.gitignore` file makes git ignore the folder's contents whatever the repository's own ignore files say.

The web page draws the map with markmap, from an outline in Markdown that `sheriff map` builds from the nodes and writes only into the page itself. The page holds markmap and every library that markmap needs, each with its licence notice. The page loads nothing from the network.

The outline has the following top-level branches, in this order. None of them represents a node. Each holds the nodes of the files listed with it:

`Guidelines`: the SpecSheriff guidelines, then each extension of the guidelines whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx), in the code-point order of the extensions' names, and then the project's own guidelines (§s-u7tw6m8npxmv5tu);

`Appendix of the tools`: the appendix of the tools (§s-a4rbry4hsu34hy8);

`Base specification`: the files of the contracts section (§s-z6tq6a3btnvvwx7) first, and then those of the other folders of the base specification (§s-5x737t9nee4zgaa);

`Technical appendix`: the files of the technical appendix (§s-tj38pvm38nepaf5).

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch `Base specification` takes the domains row by row, from the top row of the diagram of the domains to its row `No level`. It takes the domains of each row in the order in which the diagram places them (§s-jzm6qw992j3bnxt).

The files of one folder of the base specification, and the files of the technical appendix, are taken in the code-point order of their paths. Each node holds the nodes under it as follows, in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w):

a node holds its children, and a `TableRule` (§s-5fewsp22mmdz7y6) also holds the nodes in its cells;

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) also holds the other top-level nodes of its folder;

the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix also holds the file's other top-level nodes.

Each node is labelled with its title. A node in a cell of a `TableRule`, which has no title, is labelled with its location (§s-kag2m9tzdnduxdx).

In the outline, `sheriff map` writes each node's title or location in an element whose class names the node's approval status (§s-tgrnpagrb58tya7). The page draws that element with a border, dotted where the node is a draft and solid where it is approved. A branch that represents no node has no border. Apart from that border, the branch of each node is drawn in the same way, whatever the node's approval status.

### Reason

A person opens the map wherever the repository is, often without network access. On the map, the person sees the approval status of every node at a glance, at whatever size the map is drawn. The map is drawn from the nodes alone, with nothing stored between the nodes and the page, so it never shows a structure that the nodes no longer have (§s-kh8qcd5kxgh9z3j).

### Examples

```json
[
  {
    "en": "A project that has chosen the Views and Domains extensions lists the levels `core` and `services`. The domain `requests` is at the level `core`, and the domains `accounts` and `billing` are at the level `services`, where `billing` uses `accounts`. The branch `Base specification` holds the top-level node of the contracts section first, and then the headers of `requests`, `accounts` and `billing`, in that order, each with the sections of its domain under it. A `TableRule` in a section of `requests` holds the nodes in its cells under it, each labelled with its location. The most likely mistake is to take the domains in the alphabetical order of their names, which puts `accounts` before `requests`, although `requests` is in a higher row of the diagram of the domains.",
    "ru": "Проект, который выбрал расширения Views и Domains, перечисляет уровни `core` и `services`. Домен `requests` находится на уровне `core`, а домены `accounts` и `billing` — на уровне `services`, причём `billing` пользуется `accounts`. Ветвь `Base specification` содержит сначала узел верхнего уровня раздела контрактов, а затем заголовки `requests`, `accounts` и `billing`, в этом порядке, каждый с разделами своего домена под ним. `TableRule` в разделе `requests` содержит под собой узлы своих ячеек, каждый подписан своим расположением. Самая вероятная ошибка — брать домены в алфавитном порядке имён: тогда `accounts` оказывается перед `requests`, хотя `requests` стоит в более высокой линии схемы доменов."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-zu8ne3wq84zchc4"
  },
  {
    "type": "implements",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-qgg6sfawtmwvrbb"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-a4rbry4hsu34hy8"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-tgrnpagrb58tya7"
  },
  {
    "type": "cites",
    "to": "s-z6tq6a3btnvvwx7"
  },
  {
    "type": "cites",
    "to": "s-jzm6qw992j3bnxt"
  }
]
```

### The current node

Title: Building the map

`sheriff render` reads the nodes and writes into `specs/_viewer/` a web page that draws the map from them. The web page draws it with markmap, from an outline in markdown that the command builds and keeps nowhere. Nothing is written by hand at any step: the map is regenerated from the nodes exactly as the readable export is.

The outline writes each node's title in an element whose class names the node's status. The page draws that element in a frame, dotted where the node is a draft and solid where it is approved. A branch that stands for no node, such as a level, has no frame. The branches are drawn alike, whatever the status of their nodes.

The page carries markmap and every library it needs, each with its licence notice. It loads nothing from the network.

Reason: The nodes are already a structure any drawing tool can read, so the map keeps no format of its own between them and the web page. A kept format would be a second copy of the structure. It would also keep only titles and nesting, dropping the sids, status and links that anything shown on top of the map would be bound to.

The specification is worked on wherever its repository is, often without a network. Carried with the page, the drawing needs no network there, as the export needs none. The libraries' licences ask that every copy keep its notice.

A frame leaves the branches as they are drawn, so the status adds to the map without changing what it already shows. A dotted frame is told from a solid one at a glance, at any size the map is drawn at.

## Drawing the diagram of the domains | key new:tools-4-diagram | sid s-jzm6qw992j3bnxt | tools 4a (new, after “Building the map”)

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the SpecSheriff tools draw the diagram of the domains (§s-4azsb49pj6sech8) from the headers of the domains (§s-yggv9myedprnaa7) as follows:

each domain is drawn once, labelled with its name, which is the name of its folder under `specs/` (§s-zefk589ykh37b8u);

an arrow leads from each domain to each domain that it uses, that is, to any other domain that has a section to which a `consumes` link in the using domain's header points;

each level that the project's own guidelines list (§s-t9j29hppag2nren) and that the header of at least one domain contains has a row of its own, labelled with the level's number (§s-nkyty4dy9x2v2a4) and its name, such as `2 services`;

below the rows of the levels, a row labelled `No level` holds each domain whose header contains none of those levels, where there is such a domain.

To place a domain, the SpecSheriff tools:

first place, in the same way, each domain of its row that it uses and that they have not yet started to place;

then place the domain itself, right after the domains already placed in its row.

They take the domains of each row in this order (§s-uw9n84edf7cbe9n):

first, each domain that uses no domain of the row and that no domain of the row uses;

then, each domain that no domain of the row uses and that uses a domain of the row;

last, each domain not yet placed, which remains only where domains of the row use one another in a cycle (§s-bncp7gtyaukur8e).

This order takes into account only the domains of the same row that a domain uses. Where the steps above leave a choice between several domains, the SpecSheriff tools take them in the alphabetical order of their names. They compare the names character by character, by the characters' code points.

### Reason

The rule on the order of the domains in a row leaves its harder cases to the appendix of the tools (§s-uw9n84edf7cbe9n). This node settles them, together with how the rows are labelled, so that the same headers give the same diagram on every machine.

### Examples

```json
[
  {
    "en": "The domains `a`, `b`, `c`, `d` and `e` are at the same level. `a` uses `b` and `c`, `c` uses `d`, and `e` has no link to any domain of the row. The row is `e`, `b`, `d`, `c`, `a`: `e` comes first, and `a` comes after `b` and after `c`, which comes after `d`. The most likely mistake is to place `a` right after `b`, the first domain that it uses, which puts `a` to the left of `c`, which it also uses.",
    "ru": "Домены `a`, `b`, `c`, `d` и `e` одного уровня. `a` пользуется `b` и `c`, `c` пользуется `d`, а у `e` нет связи ни с одним доменом линии. Линия: `e`, `b`, `d`, `c`, `a`: `e` идёт первым, а `a` идёт после `b` и после `c`, который идёт после `d`. Самая вероятная ошибка — поставить `a` сразу после `b`, первого домена, которым он пользуется: тогда `a` оказывается левее `c`, которым он тоже пользуется."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-4azsb49pj6sech8"
  },
  {
    "type": "implements",
    "to": "s-uw9n84edf7cbe9n"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-nkyty4dy9x2v2a4"
  },
  {
    "type": "cites",
    "to": "s-t9j29hppag2nren"
  },
  {
    "type": "cites",
    "to": "s-bncp7gtyaukur8e"
  }
]
```

### The current node

(none: this node is new)
