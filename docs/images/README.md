# The pictures

The pictures of the first article and the cards on how requirements decay, one card for each rule of
how a rule is written (§s-3w8puyqn2ramsre). Each is kept in three formats, a folder for each:

- `html/` — the source: each picture a page of its own, its text live, its fonts (Rye and Courier
  Prime) loaded from Google Fonts. A picture is changed here and nowhere else.
- `png/` — each page rendered at twice its size, for a post or a media platform.
- `svg/` — the same render as vectors, its text drawn as outlines, so that it looks the same where the
  fonts are missing and scales to any size.

The files of `png/` and `svg/` are never edited: the page in `html/` is changed and
`node docs/images/render.mjs` run again, or `node docs/images/render.mjs <name>` for one picture. It
needs Chrome (another Chromium named by `CHROME`) and Python with PyMuPDF (`pip install pymupdf`; an
interpreter other than `python3`, or `python` on Windows, named by `PYTHON`).

## What each one shows

| Picture | The question it answers |
|---------|-------------------------|
| `1-how-it-works` | How does it work? The life of a rule: confirmed by its owner, a test and the code carrying its sid, the commit through the checks and the reviewer; a changed wording returns it to unconfirmed. |
| `2-what-stops-bad-code` | What stops bad code? The gate of every commit: the deterministic checks, then the reviewer's one judgement. |
| `3-change-of-stack` | Will it survive a change of stack? One base specification, a technical appendix for each stack. |
| `4-map-of-approaches` | How does it differ from Spec Kit? Spec-first, spec-anchored and spec-as-source, the tools placed on them. |

| Card | The rule it shows broken |
|------|--------------------------|
| `card-6-1-one-language` | §s-7anvune6h4f6mbr |
| `card-6-2-name-the-subject` | §s-3dgt5c94jr55j3z |
| `card-6-3-bind-the-property` | §s-ybq7wbhkrh5pjqs |
| `card-6-4-reason-as-wide-as-its-rule` | §s-hwnzhgw5b683fc7 |
| `card-6-5-grounds-and-nothing-more` | §s-ydzyh9nqm3x64h4 |
| `card-6-6-no-count-in-prose` | §s-xtqebaxjrqjsjwn |
| `card-6-7-allowed-or-forbidden` | §s-hgdc2543ms5spwj |
| `card-6-8-word-with-its-object` | §s-me9k7g34jqb4rzn |
| `card-6-9-no-phrase-in-capitals` | §s-m6upmfq64kw5h4r |
| `card-6-10-what-no-rule-requires` | §s-2jcmb9xe9d64t2t |

A card names its rule by sid, as everything outside the specification does: an address would go
stale the first time the guidelines are renumbered.

The pictures are under CC BY 4.0, as the rest of `docs/` is. The mark drawn in them is not: it is used
as [`brand/README.md`](../../brand/README.md) says.
