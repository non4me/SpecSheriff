# Stamp

A stamp is a verdict pressed onto the page at a tilt: it judges, it never labels.

- Use `ss-stamp` for a verdict on a step or a rule (REFUSED, APPROVED, the name of a fault); it sets the `stamp-word` style in `stamp` with a `border-stamp` line, `radius-stamp` corners and the `tilt-stamp` angle.
- Use `ss-stamp ss-stamp--seal` for the verdict that closes a flow (MERGED, COMMITTED): the `display` face in a double line at `tilt-seal`.
- One word, two at most. Write the word in its normal case: the stylesheet sets the capitals.
- A stamp sits over the edge of what it judges, a little off it, never centred in it. Never more than one per box.
