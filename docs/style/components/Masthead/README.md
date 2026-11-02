# Masthead

The masthead is the top of every page: the star and the name on the left, the navigation on the right.

- Use `ss-masthead` holding a `ss-brand` link (the star, drawn in `ink`, and "SpecSheriff" in the `display` face) and a `ss-nav` list of links.
- The star is the owner's drawing, `brand/icon.svg`, inlined so that it takes `ink`; it is never redrawn.
- The current page's link carries `aria-current="page"`.
