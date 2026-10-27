# The landscape: what already exists

Surveyed on 2026-10-27. The field moves month by month, and this survey is not exhaustive.

## The vocabulary

Birgitta Böckeler (martinfowler.com, October 2025) divides spec-driven development into three
levels:

- **spec-first** — a specification is written before the code and guides one change; it is not
  kept afterwards;
- **spec-anchored** — the specification is kept and maintained for the life of the system, and the
  code is held to it;
- **spec-as-source** — the specification is what people maintain, and the code is produced from it.

SpecSheriff is spec-anchored with mechanical enforcement, and spec-as-source in part: the types,
the runtime checks of data and any registry the code reads as data are generated from the
specification.

## What exists

| Family | Examples | What they share with SpecSheriff | What they lack |
|---|---|---|---|
| Spec-driven toolkits for coding agents | GitHub Spec Kit, Kiro (AWS), OpenSpec, BMAD-METHOD, Tessl | a specification written before the code, guiding an agent | the specification is markdown scoped to one feature or one change; no binding of each declaration or test to a rule; no mechanical gate at the commit. In practice mostly spec-first |
| Requirements traceability from regulated industries | OpenFastTrace, StrictDoc, Doorstop, Sphinx-Needs, BMW Lobster, mantra | permanent identifiers, links, tags in code and tests, coverage reports; Doorstop's review stamp, which is cleared when an item's text changes, is the same idea as an owner's confirmation | built for human audit rather than for agents; no reviewer judging what the code does against the rules; no doctrine of how a rule is written; no split between a technology-free base and a replaceable technical appendix |
| Recent research and small projects | Spec Growth Engine (H. Grabowski, arXiv 2606.27045 and 2610.11725, 2026); LiveSpec; KeelSpec | a machine-readable spec graph; contract kept apart from design; the agent's context scoped to an ownership path; a deterministic drift gate as a git hook (Spec Growth Engine). `@spec` anchors in code and an LLM review of plans (LiveSpec). Typed artefacts, cross-references and a CI gate on drift (KeelSpec) | code is held to the graph through its import graph, not through per-declaration tags (Spec Growth Engine); specifications are markdown per feature, and the LLM reviews the plan rather than the code against the rules (LiveSpec); no binding of code or tests to rules (KeelSpec) |

## Where SpecSheriff differs

The parts exist separately, some of them for decades. No source found combines them, and three
were found nowhere:

1. **An independent reviewer as a gate of every commit**, deliberately given nothing of the session
   that wrote the code: only the change and the text of the rules the commit names. It refuses a
   commit whose code does something no named rule states, or leaves out what one requires, naming
   the rule and the line.
2. **A doctrine of how a rule is written**, each item derived from a way requirements were seen to
   decay silently: a count in prose that goes stale, a figure measured on one instance, a general
   word without its object, a rule written against a name rather than a property, an allow-list
   where a deny-list was needed.
3. **A technology-free base specification beside a replaceable technical appendix**, so that the
   same rules can be implemented on another stack, or with another look, without editing a rule.

## Sources

- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) — B. Böckeler, martinfowler.com
- [The Spec Growth Engine](https://arxiv.org/pdf/2606.27045) and [Implementing the Spec Growth Engine](https://arxiv.org/abs/2610.11725) — H. Grabowski, arXiv; [grabow/spec-growth-engine](https://github.com/grabow/spec-growth-engine)
- [julien-m/livespec](https://github.com/julien-m/livespec)
- [Tech-Res-Group/keelspec](https://github.com/Tech-Res-Group/keelspec)
- [Best Spec-Driven Development Tools for AI Coding in 2026](https://www.augmentcode.com/tools/best-spec-driven-development-tools) — Augment Code
- [Spec-Driven Development in 2026](https://dev.to/krlz/spec-driven-development-in-2026-what-it-is-the-tooling-and-how-teams-actually-use-it-2fk2) — DEV Community
- [Spec Kit vs Kiro vs Tessl](https://particula.tech/blog/spec-driven-development-tools-spec-kit-vs-kiro-vs-tessl) — particula.tech
- [cameronsjo/spec-compare](https://github.com/cameronsjo/spec-compare)
- [OpenFastTrace user guide](https://github.com/itsallcode/openfasttrace/blob/main/doc/user_guide.md)
- [StrictDoc user guide](https://strictdoc.readthedocs.io/en/stable/strictdoc_01_user_guide.html)
- [RTEMS — requirements tooling](https://docs.rtems.org/docs/6.2/eng/req/tooling.html) (an evaluation of Doorstop and others)
- [bmw-lobster-tool-cpp](https://pypi.org/project/bmw-lobster-tool-cpp), [mantra](https://lib.rs/crates/mantra)
