# Articles

The articles about the method, each a Markdown file of its own, `docs/articles/<slug>.md`, its slug
the address it takes on the site (`/articles/<slug>/`). The first is being written.

An article opens with a block the site reads for its page:

```markdown
---
title: The title as the page shows it
description: One or two sentences for search engines and previews, at most 160 characters.
date: 2026-11-15
---
```

Then its text, in English (every material is, until the localisation):

- Its pictures are taken from [`docs/images/`](../images/) by a relative link to the PNG, each with
  its alt text; a new picture is drawn there, in [the style](../style/), and never kept beside the
  article.
- A rule is cited by its sid, `§s-…`, which the site turns into a link to the rule's page; never by
  its address.
- A link to another document of this repository is relative, as on GitHub; the site maps it to the
  page that shows that document.
