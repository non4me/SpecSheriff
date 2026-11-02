# The site: a brief for whoever builds it

This is what the site of SpecSheriff shows, where each of its pages comes from, and what has been
decided about it. It is written for the agent that builds and runs the site; the owner of this
repository, Vladimir Trojanenko, settles what it leaves open. The decisions behind it are in
[the design log](../../docs/design-log.md), in the entries of 2026-11-02 on the site, the pictures and the
order of work.

## What has been decided

- **Everything the site shows is kept in this repository.** The site takes it from here at every
  build and never holds a copy of its own to edit. A change to a text is made here, by this
  repository's process, and reaches the site by itself; the site's code never changes a material.
- **The site's code is a repository of its own**, built by Astro and served by Cloudflare Pages.
  It is kept apart because this repository is held by its own checks, which would otherwise have to
  bind the site's code to rules of the method that say nothing of a site.
- **The site is nearly static**: every page is plain HTML written at build time, readable whole
  without scripts, so that search engines index all of it. A script is used only where a page needs
  one (the map), and the page says the same without it.
- **A push to main that changes a material rebuilds the site.** The workflow
  [`.github/workflows/site.yml`](../../.github/workflows/site.yml) posts to the host's build hook,
  kept as the secret `SITE_BUILD_HOOK` of this repository, on a push touching any path it lists;
  until the owner sets the secret it does nothing. A new kind of material the site shows is added to
  its list of paths.
- **Caching:** a page is cached at the edge and dropped at every deployment, the browser checking
  each time; a stylesheet, a font or an image carries a digest of its content in its name and is
  cached for good.
- **English only, for now.** Every material is in English until everything else is ready; then the
  site, the materials and the pictures are localised at once into several languages. Build nothing
  for other languages now, but keep the addresses free to take a language prefix later.
- **One style**, the frontier ledger of [`_promo/style/`](../style/): its tokens, stylesheet and
  components, never values of the site's own.

## The pages

| Page | Address | Made from |
|------|---------|-----------|
| Home | `/` | The thesis and the opening of [`README.md`](../../README.md); the four pictures of [`_promo/images/`](../images/) (1 to 4); the way in, the plugin's installation from the guide; links to the pages below. |
| The method | `/method/` | [`docs/README.md`](../../docs/README.md) |
| The principles | `/principles/` | [`docs/principles.md`](../../docs/principles.md) |
| The rules | `/rules/` | The guidelines, [`specs/_guidelines/`](../../specs/_guidelines/): `spec.json`, `tools.json` and `project.json`, as a contents of their sections and rules. |
| A rule | `/rules/<sid>/` | One node of those files (below). |
| The map | `/map/` | The same nodes as a mind map (below). |
| The guide | `/guide/` | [`skills/claude-code/README.md`](../../skills/claude-code/README.md) |
| The guide for Codex | `/guide/codex/` | [`skills/codex/README.md`](../../skills/codex/README.md) |
| The landscape | `/landscape/` | [`docs/research/landscape.md`](../../docs/research/landscape.md) |
| The design log | `/log/` | [`docs/design-log.md`](../../docs/design-log.md) |
| Articles | `/articles/` and `/articles/<slug>/` | [`_promo/articles/`](../articles/), as its README says; the list newest first. |
| The example | `/example/` | The README of the worked example, [non4me/specsheriff-saloon](https://github.com/non4me/specsheriff-saloon), fetched at build time, with a link to its repository. |

Nothing else of the repository is a page: not this brief, not `internal/`, not the READMEs of
`_promo/images/` and `_promo/style/`. The pictures and the cards have no page of their own: they are
promotional material, used where a page shows them and as previews when a page is shared.

Every promotional material — the mark, the pictures, the style guide, the articles and this brief —
is in `_promo/`, and nowhere else. Astro takes a name beginning with an underscore for a private one
in its own folders, so the site reads `_promo/` by explicit paths, not by Astro's conventions.

A page's title is its document's first heading and its description the first paragraph, cut to 160
characters, unless the document gives its own (an article's opening block).

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
nodes, in the ledger style. Under the map the same tree stands as a nested list of links, for a
reader or a search engine without scripts.

## Links and citations

- A citation of a rule, `§` and a sid, in any material — a document, an article, a node's text —
  becomes a link to `/rules/<sid>/`. A sid is `s-` and fifteen characters of
  `23456789abcdefghjkmnpqrstuvwxyz`.
- A relative link between documents of this repository becomes a link to the page that shows the
  target; a link to anything that is not a page (code, a JSON file, a script) goes to the file on
  GitHub, `https://github.com/non4me/SpecSheriff/blob/main/<path>`.
- An image keeps its own file, copied with a digest in its name.

## Style and marks

- Load the fonts the style names, then `_promo/style/tokens.css`, then `_promo/style/specsheriff.css`;
  the fonts may be served from the site itself, the same faces and weights.
- Build the pages from the components of [`_promo/style/components/`](../style/components/): the
  masthead with the star and the navigation, the colophon with the motto, prose for every document,
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
`robots.txt` allowing everything. The addresses end with a slash and never change once published.

## When something is missing

A page that needs a material this repository does not hold, or a decision this brief does not make,
is put to the owner; the site does not write it itself.
