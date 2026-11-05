# Masthead

The masthead is the top of every page: the star and the name on the left, the navigation on the right.

- Use `ss-masthead` holding a `ss-brand` link (the star, drawn in `ink`, and "SpecSheriff" in the `display` face) and a `ss-nav` list of links.
- The star is the owner's drawing, `_promo/brand/icon.svg`, inlined so that it takes `ink`; it is never redrawn.
- The current page's link carries `aria-current="page"`.
- A stamp, `ss-stamp`, may follow the brand: a verdict on the whole site, in the words the place that uses the masthead gives. It is half the size of the stamp a rule's page sets and turned further, and it stands right of the name, set lower, with its upper left corner overlapping the foot of the name's last letter, so that name and stamp read as one; it covers no more of the name than that corner. Under 360 px, where the two cannot share a line, it stands under the name instead.
