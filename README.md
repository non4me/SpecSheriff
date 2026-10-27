# SpecSheriff

**No code ships without a rule that warrants it.**

SpecSheriff is a method of spec-anchored development, and a worked example of it. The
specification is a set of small rule nodes, each with a permanent identifier, a reason held
apart from the requirement, and a status that says whether the specification's owner has read
the wording. Every declaration in the code names the rule it implements, every test opens its
name with the rule it verifies, and every commit is checked against the rules it claims to serve
— by deterministic checks, and by an independent reviewer that sees only the change and the text
of those rules.

## Status

Design phase. Nothing here is ready to use yet.

- [`docs/research/landscape.md`](docs/research/landscape.md) — what already exists, and where this
  method differs.
- [`docs/design-log.md`](docs/design-log.md) — the decisions taken so far, and the questions still open.

## License

What a project installs — the tools, the skills, the guidelines and the worked example — is licensed
under the [Apache License 2.0](LICENSE). What is read and shared — everything under `docs/`, the
articles and the infographics — is licensed under
[Creative Commons Attribution 4.0 International](LICENSE-docs): reuse it freely, naming SpecSheriff
and linking here.
