# SpecSheriff style guide

One style for everything SpecSheriff shows: the site, the pictures, the cards, a slide. It is a
frontier ledger — parchment, ink and a stamp red; a typewriter for labels and a poster face for
titles; every step a ticket in a double border, every verdict a rubber stamp. The look says what the
method is: a record kept for good, and a sheriff who refuses what breaks the rules.

## Using it

Load the fonts, then `tokens.css`, then `specsheriff.css`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rye&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="specsheriff.css">
```

- `tokens.json` is the one source of every value. Change a value there and run
  `node docs/style/build.mjs`, which writes `tokens.css`; never edit `tokens.css` by hand.
- `specsheriff.css` styles the page itself (the ground, headings, links, code) and the components,
  each a class beginning `ss-`. It takes every value from a token; a new rule does the same.
- Each component's guidelines and live preview are in `components/<Name>/`.

## Content

- Write in English, plainly, in full sentences; say what a thing does, not what it is called inside.
- Titles are short noun phrases or the question a page answers ("How does it work?").
- A rule is cited by its sid, `§s-…`, never by its address: an address goes stale when the rules are
  renumbered.
- No emoji. Capitals belong to the stamps and the kickers, set by the stylesheet; never type a
  phrase in capitals.
- The motto, where one is wanted, is "No code without a rule", as written.

## Colour

- The ground is `paper`, washed by `paper-glow` at its top left and `paper-shade` at its bottom
  right; the body does this itself.
- A piece of paper on the ground — a ticket, a slip, a code block, a button — is filled `ticket`.
- All text and every border is `ink`. Secondary text (a lede, a caption, the colophon) is
  `ink-soft`; kickers and table headings are `ink-faint`, never body text.
- `stamp` is the one accent: links, a sid, a stamp, the fault marked in a rule, the key ticket of a
  figure. Keep it rare: a page where everything is red has no verdict left. Under the pointer a link
  turns `stamp-deep`.
- Hairlines that mean nothing — the rows of a table, a divider — are `rule`.
- Every text colour holds at least 4.5:1 on `paper` and on `ticket`; the figures are in each token's
  note.

## Type

- `display` (Rye) sets titles and headings only, never a paragraph: `title` once per page,
  `heading`, `subheading`, and `label` for the heading of a ticket or of a pair's half.
- `text` (Libre Caslon Text) sets everything read at length: `lede`, `body` at most `measure` wide,
  `body-small` inside a ticket or a note.
- `type` (Courier Prime) sets what a clerk would type: `kicker`, `caption`, the navigation, `code`
  and the word of a stamp (`stamp-word`).
- Line lengths stay near the measure; headings balance their lines.

## Shape

- Paper is cut square: tickets, slips, frames, code blocks and buttons take `radius-none`. Only a
  stamp's corners round (`radius-stamp`), and the ring round a marked word (`radius-ring`).
- Borders are drawn, never shaded: a ticket and a button in a `border-ticket` double line, a whole
  card in a `border-frame` double line, a slip or a figure in a `border-line`. No shadows, no
  gradients but the ground's washes.
- A stamp is never set straight: `tilt-stamp` for a verdict on a step or a rule, `tilt-seal` for
  the verdict that closes a flow. It overhangs the edge of what it judges.
- Space comes from the `space-` steps: `space-4` between paragraphs, `space-6` between the halves
  of a pair, `space-7` between the sections of a page, `space-8` inside a frame. A page's content runs
  at most `page-width`, with at least `space-4` at the sides.

## The mark

The star — one line, an S inside it, each point ending in a ring — is the owner's drawing in
`brand/`; it is used unchanged and never redrawn. On the site and in the pictures it is inlined from
`brand/icon.svg` with its stroke in `ink`, beside "SpecSheriff" in `display`. The mark is under no
open licence: `brand/README.md` says how it may be used.

## Pictures

The pictures and the cards in `docs/images/` are drawn in this style: a ground of `paper`, steps as
tickets, verdicts as stamps, the brand and the motto at the foot. A new picture starts from one of
them, and is rendered by `docs/images/render.mjs`.
