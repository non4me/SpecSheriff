# Ticket

A ticket is a slip of paper in a double border: a step of a flow, a box set apart from the page.

- Use `ss-ticket` on a block holding a `ss-kicker`, a short heading in the `label` style and a few lines of `body-small` text.
- Mark the one ticket of a figure that matters most with `ss-ticket--key` (the reviewer, the base specification); never more than one.
- The consumer gives the content; the ticket gives the fill (`ticket`), the border (`border-ticket`, double, `ink`) and the padding (`space-4` and `space-5`).
- Do not round its corners or give it a shadow: paper is cut square and lies flat.

```html
<div class="ss-ticket"><div class="ss-kicker">Deterministic</div><h4>The checks</h4><p>Every symbol tagged, every rule tested.</p></div>
```
