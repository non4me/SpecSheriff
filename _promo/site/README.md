# The site: a brief for whoever builds it

This is what the site of SpecSheriff shows, where each of its pages comes from, and what has been
decided about it. It is written for the agent that builds and runs the site; the owner of this
repository, Vladimir Trojanenko, settles what it leaves open.

## What has been decided

- **Everything the site shows is kept in this repository.** The site takes it from here at every
  build and never holds a copy of its own to edit. A change to a text is made here, by this
  repository's process, and reaches the site by itself; the site's code never changes a material.
- **The site's code is a repository of its own**, built by Astro and served from the owner's own
  server. It is kept apart because this repository is held by its own checks, which would otherwise
  have to bind the site's code to rules of the method that say nothing of a site.
- **The site is nearly static**: every page is plain HTML written at build time, readable whole
  without scripts, so that search engines index all of it. A script is used only where a page needs
  one (the map), and without it the page points to where the same material stands as plain HTML.
- **A change to main reaches the site by itself.** The server builds the site again when main moves,
  here or in the site's own repository, and replaces the published site whole; nothing in this
  repository asks it to, and no material needs a list of paths to be picked up.
- **Caching:** the browser checks a page each time, so that a new build is seen at once; a
  stylesheet, a font or an image carries a digest of its content in its name and is cached for good.
- **English only, for now.** Every material is in English until everything else is ready; then the
  site, the materials and the pictures are localised at once into several languages. Build nothing
  for other languages now, but keep the addresses free to take a language prefix later.
- **One style**, the frontier ledger of [`_promo/style/`](../style/): its tokens, stylesheet and
  components, never values of the site's own.
- **A light theme and a dark one**, the two of the style: a page is shown in the one the reader's
  browser asks for, from the first moment it is drawn. A switch at the top right of every page, a
  button named "Dark theme", pressed while the dark theme is shown, changes it; the choice is kept in
  that browser for every page and every later visit, and until it is made a change of the browser's
  setting applies at once. Without scripts a page follows the browser and shows no switch. The
  pictures and the cards on a page take its theme; their PNG and SVG exports, and the previews when a
  page is shared, stay light.
- **The site says that it is still being built.** The masthead of every page, the one shown for an
  address that has no page among them, carries right of the brand the stamp of the style, the one a
  rule's page sets as Checked, at half its size there, turned a little further, its corner resting on the last letter of the name, reading "In progress", as written.

## The pages

| Page | Address | Made from |
|------|---------|-----------|
| Home | `/` | The thesis and the opening of [`README.md`](../../README.md); the four pictures of [`_promo/images/`](../images/) (1 to 4), in one column, each shown as HTML with its own title as its heading; the principles, [`docs/principles.md`](../../docs/principles.md); links to the pages below. |
| The method | `/method/` | [`docs/README.md`](../../docs/README.md), without its section "Where the rest is", which no page shows. |
| The rules | `/rules/` | The guidelines, [`specs/_guidelines/`](../../specs/_guidelines/): `spec.json`, `tools.json` and `project.json`, as a contents of their sections and rules. |
| A rule | `/rules/<sid>/` | One node of those files (below). |
| The map | `/map/` | The same nodes as a mind map (below). |
| The plugin | `/plugin/` | The section "Installing it" of [`skills/claude-code/README.md`](../../skills/claude-code/README.md) and of [`skills/codex/README.md`](../../skills/codex/README.md): its heading once, each one's code followed by a link to the page below that shows its document, then the text of the first after its code. |
| Details for Claude Code | `/plugin/claude-code/` | The guide of the plugin for Claude Code, [`skills/claude-code/README.md`](../../skills/claude-code/README.md), without its section "Installing it", which The plugin shows. |
| Details for Codex CLI | `/plugin/codex/` | The guide of the plugin for Codex CLI, [`skills/codex/README.md`](../../skills/codex/README.md), without its section "Installing it", which The plugin shows. |
| Articles | `/articles/` and `/articles/<slug>/` | [`_promo/articles/`](../articles/), as its README says; the list newest first. |
| The example | `/example/` | The README of the worked example, [non4me/specsheriff-saloon](https://github.com/non4me/specsheriff-saloon), fetched at build time, with a link to its repository. |

A page shows the markdown documents its row links, in that order. The first opens the page, its first
heading the page's own, and every other is a section of the page under its own first heading, its
headings a level below; a page other than the home made of several documents is titled by its name, and
every document of it is such a section. A link to a document shown as a section leads to that section. A
row may instead name the section of one heading in documents, as `the section "…" of` a link to each,
`and of` between them, a section running from its heading to the next heading of its level or above: the
page is titled by its name and shows the heading once, each document's code followed by a link to the
page that shows that document, then the text of the first after its code; a link to the document still
leads to the page whose row shows it. A row may leave out a section of its document, `without its
section "…"`, and says where that section is shown: `which … shows`, by the name of the page that shows it,
where a link to one of its headings leads; or `which no page shows`, and such a link leads to the document on
GitHub, as a link to a document no page shows does. A page whose address is
under another page's is listed on that page, by its name and in the order of this table, and not on the
home. A row that links no document is made from what its first link names.

Nothing else of the repository is a page: not this brief, not `internal/`, not the survey of what already exists,
[`docs/research/landscape.md`](../../docs/research/landscape.md), not the READMEs of
`_promo/images/` and `_promo/style/`. The pictures and the cards have no page of their own: they are
promotional material, used where a page shows them and as previews when a page is shared.

Every promotional material — the mark, the pictures, the style guide, the articles and this brief —
is in `_promo/`, and nowhere else. Astro takes a name beginning with an underscore for a private one
in its own folders, so the site reads `_promo/` by explicit paths, not by Astro's conventions.

A page's title is its first document's first heading, or its name where it is titled by it, and its
description the first paragraph of that document, cut to 160 characters, unless the document gives its
own (an article's opening block).

## A rule's page

Each node of the guidelines has a page at `/rules/<sid>/`. Its sid is the permanent identifier and
the only thing that names it: an address such as `spec/6.6` is computed from where the node stands
and changes when the rules are renumbered, so it is shown as the node's place, never used in a link.
The node's structure is [`specs/_schema/node.schema.json`](../../specs/_schema/node.schema.json); what
`npx sheriff show <sid>` prints in this repository is everything the page shows. In particular:

- the title, the kind, the text and, apart from it, the reason;
- the status: a node is checked when its owner has confirmed its present wording, recorded in
  [`specs/_confirmations.jsonl`](../../specs/_confirmations.jsonl); the page says "confirmed by its
  owner" or "awaiting its owner's confirmation", and never shows the email address that file
  records;
- a list's members, a section's or a header's owner;
- the links it makes and the links made to it, each with its type (what each type means is the rule
  §s-sn6au3vcr9uy5pm) and the other node's title;
- the decisions taken on it, the work deferred on it and its comments;
- the code and the tests bound to it, each a link to the file on GitHub;
- the sections it stands in, as a path back to `/rules/`.

## The map

`/map/` shows the guidelines as a mind map: the sections and their rules by title, each a link to
its page. `npx sheriff render` draws such a map for this repository, with markmap, into
`specs/_viewer/`, which is generated and never committed; the site draws its own from the same
nodes, in the ledger style. The map does not repeat the rules, which `/rules/` already lists: a
reader or a search engine without scripts is pointed there.

The map takes the width of the window and is not limited in height: it grows with what is shown, so
that nothing of it is cut off and the page scrolls instead. It opens collapsed, with only the main
branches visible, and collapsed it fits within the visible area; a reader opens a branch to see what
it holds.

## Links and citations

- A citation of a rule, `§` and a sid, in any material — a document, an article, a node's text —
  becomes a link to `/rules/<sid>/`. A sid is `s-` and fifteen characters of
  `23456789abcdefghjkmnpqrstuvwxyz`.
- A relative link between documents of this repository becomes a link to the page that shows the
  target; a link to anything that is not a page (code, a JSON file, a script) goes to the file on
  GitHub, `https://github.com/non4me/SpecSheriff/blob/main/<path>`.
- An image's original stays in this repository unchanged. A picture or a card of `_promo/images/`,
  wherever a page shows it (an article links its PNG), is shown from its page in `html/`, its text
  live, scaled to the width it is given: of each only the part its page marks as its drawing, on the
  page itself, without the ground of its canvas and a star drawn behind it; a picture without the
  brand and the motto at its foot, a card without its double rule and the brand. In a column narrower
  than 700 px it takes the narrow layout its page holds instead of shrinking. Any other image is shown as optimized copies made at build
  time — resized to the widths a page needs and in modern formats, with a format every browser reads
  as the fallback — each a link to its original, copied with a digest in its name.

## Style and marks

- Load the fonts the style names, then `_promo/style/tokens.css`, then `_promo/style/specsheriff.css`;
  the fonts may be served from the site itself, the same faces and weights.
- Build the pages from the components of [`_promo/style/components/`](../style/components/): the
  masthead with the star, the stamp right of it and the navigation, the colophon with the motto, prose for every document,
  the ledger for tables, a sid for every citation, a ticket or a note where a page sets something
  apart. A rule's status may be shown as a stamp (Checked).
- The star is inlined from [`_promo/brand/icon.svg`](../brand/icon.svg), its stroke in the `ink` token;
  the browser's icons and the default preview for sharing are in
  [`_promo/brand/exports/`](../brand/exports/) (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `social-preview.png`). The mark is under
  no open licence: [`_promo/brand/README.md`](../brand/README.md).
- A page that shows one of the pictures may take its PNG as its preview for sharing. The card of a
  rule of how a rule is written may illustrate that rule's page.

## For search engines

A sitemap of every page, a canonical address on each, a title and a description of its own, and
`robots.txt` allowing everything. The addresses end with a slash. A published address keeps leading
to its material: where what a page showed has moved to another page, its old address answers a
permanent redirect straight to where it now stands, never through another old address; where the
site no longer shows it, that no page has it.

## When something is missing

A page that needs a material this repository does not hold, or a decision this brief does not make,
is put to the owner; the site does not write it itself.
