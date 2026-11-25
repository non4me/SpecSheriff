# Group 7 drafts for the review (generated 2026-11-25T11:46:52.475Z)

## Building the map | key s-rpv4fkdqqguptqd | sid s-rpv4fkdqqguptqd | tools 4

### Text

`sheriff map` writes the map of the specification (§s-zu8ne3wq84zchc4) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run, and the refusal names the Views extension.

`sheriff map` first removes everything in `specs/_viewer/` (§s-zefk589ykh37b8u). It then writes there the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`. That file makes git ignore the folder's contents whatever the repository's own ignore files say.

The web page draws the map with markmap, from an outline in Markdown that `sheriff map` builds from the nodes and keeps in no file. The page holds markmap and every library that markmap needs, each with its licence notice, and loads nothing from the network.

Each of the following top-level branches of the outline represents no node. They come in this order, and each holds the top-level nodes of the files named with it:

`Guidelines`: the SpecSheriff guidelines, then each extension of the guidelines whose file the model of the specification holds (§s-w6gybeqn2ttydqx), in the code-point order of the extensions' names, and then the project's own guidelines (§s-u7tw6m8npxmv5tu);

`Appendix of the tools`: the appendix of the tools (§s-a4rbry4hsu34hy8);

`Base specification`: the files of the base specification (§s-5x737t9nee4zgaa), folder by folder in the code-point order of the folders' names;

`Technical appendix`: the files of the technical appendix (§s-tj38pvm38nepaf5).

The files of one folder of the base specification, and the files of the technical appendix, are taken in the code-point order of their paths. Each node holds the nodes under it as follows, in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w):

a node holds its children, and a `TableRule` (§s-5fewsp22mmdz7y6) also holds the nodes in its cells;

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) also holds the other top-level nodes of its folder;

the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix also holds the file's further top-level nodes.

Each node is shown by its title. A node in a cell of a `TableRule`, which has no title, is shown by its location (§s-kag2m9tzdnduxdx).

The outline writes each node's title or location in an element whose class names the node's approval status (§s-tgrnpagrb58tya7). The page draws that element in a frame, dotted where the node is a draft and solid where it is approved. A branch that represents no node has no frame. The branches are drawn alike, whatever the approval status of their nodes.

### Reason

A person opens the map wherever the repository is, often without a network. On the map, the person sees the approval status of every node at a glance, at whatever size the map is drawn. The map is drawn from the nodes alone, with no format kept between them and the page, so it never shows a structure that the nodes no longer have (§s-kh8qcd5kxgh9z3j).

### Examples

```json
[
  {
    "en": "In a project that has chosen the Views and Domains extensions, the branch `Base specification` first holds the section of the contracts section. It then holds the header of the domain `accounts`, with the sections of `accounts` under it, and then the header of the domain `requests`, with its sections. A `TableRule` in a section of `requests` holds under it the nodes in its cells, each shown by its location. The most likely mistake is to draw a branch for each level of the domains, which represents no node.",
    "ru": "В проекте, который выбрал расширения Views и Domains, ветка `Base specification` сначала содержит раздел контрактов. Затем она содержит заголовок домена `accounts` с разделами `accounts` под ним, а затем заголовок домена `requests` с его разделами. `TableRule` в разделе `requests` содержит под собой узлы своих ячеек, каждый показан своим расположением. Самая вероятная ошибка — нарисовать ветку для каждого уровня доменов, которая не представляет никакого узла."
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

an arrow leads from each domain to each domain that it uses: each other domain to a section of which a `consumes` link of its header points;

each level that the header of at least one domain contains has a row of its own, labelled with the level's number and its name, such as `2 services`;

the rows of the levels follow the order of the levels' numbers from the top (§s-nkyty4dy9x2v2a4);

below the rows of the levels, a row labelled `No level` holds each domain whose header contains none of the levels that the project's own guidelines list (§s-t9j29hppag2nren), where there is such a domain.

To place a domain, the SpecSheriff tools first place each domain of its row that it uses and that they have not yet started to place, each in the same way. They then place the domain itself. They take the domains of each row in this order (§s-uw9n84edf7cbe9n):

first, each domain that uses no domain of the row and that no domain of the row uses;

then, each domain that no domain of the row uses and that uses a domain of the row;

last, each domain not yet placed, which only domains that use one another in a cycle leave (§s-bncp7gtyaukur8e).

This order takes into account only the domains of the same row that a domain uses. Where several domains are to be taken at once, the SpecSheriff tools take them in the alphabetical order of their names. They compare the names character by character, by the characters' code points.

### Reason

Drawn from the headers alone, the diagram always shows the hierarchy of the domains as the headers state it (§s-4azsb49pj6sech8). The rule on the order of the domains in a row leaves its harder cases to the appendix of the tools (§s-uw9n84edf7cbe9n). This procedure settles them by placing each domain right after the domains that it uses, in the same way on every machine.

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
