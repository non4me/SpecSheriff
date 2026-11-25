# "Where the files are" (s-zefk589ykh37b8u), the appendix of the tools, agreed on 2026-11-21

## Title

Where the files are

## Text

The SpecSheriff tools find each file of a project at the path given below, relative to the root of the repository:

| What is kept | Where |
|---|---|
| The base specification, if the project has not chosen the Domains extension (§s-h6h25ctd3yryudh) | `specs/base/` |
| Each domain, if the project has chosen the Domains extension | `specs/<domain>/`, where `<domain>` is the domain's name, which is neither `stack` nor `debt` nor the name of any directory that this table names under `specs/` |
| The contracts section (§s-z6tq6a3btnvvwx7) | `specs/contracts/` |
| The section of the technical appendix (§s-vj7ercem526zd6v) that implements a domain, if the project has chosen the Domains extension | `specs/tech/<domain>.json` |
| The section of the technical appendix that implements the base specification, if the project has not chosen the Domains extension | `specs/tech/base.json` |
| The section of the technical appendix for the stack | `specs/tech/stack.json` |
| The technical debt | `specs/tech/debt.json` |
| The project's own guidelines (§s-u7tw6m8npxmv5tu) | `specs/_guidelines/project.json` |
| The project's extension of the schema (§s-xm8rz4uupb73gu5) | `specs/_schema/project.schema.json` |
| The approvals of nodes (§s-67vekyup7y8smap) | `specs/_approvals.jsonl` |
| The archive of removed nodes (§s-f2b5zvc565s242f) | every JSON file in `specs/_archive/`, each named after the part of the specification that its nodes were removed from, such as `contracts.json` or `guidelines.json` |
| The bindings file (§s-kgbzk2ph9e6jfb4) | `sheriff.bindings.json` |
| The settings of the SpecSheriff tools that are common to the whole project, among them the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g) | `sheriff.config.json` |
| The map (§s-zu8ne3wq84zchc4) and the human-readable export (§s-ce24ynwabt5yx8h), if the project has chosen the Views extension (§s-qgg6sfawtmwvrbb) | `specs/_viewer/` for the map and `md-version/` for the export, both of which git ignores |
| The documentation | every Markdown file that the repository keeps outside `specs/` |

The files common to every project come with the SpecSheriff tools that a plugin keeps on the machine (§s-4mej6ccn7xu3d3p). The tools find each of these files at the path in the second column below, relative to their own folder, the one that holds their `dist/`. Only the repository where the SpecSheriff guidelines are written keeps these files under `specs/`, each at the path in the third column (§s-6bmnsbskg6en4nf). In that repository, the tools read the files at those paths:

| What is kept | Path in the folder of the tools | Path in the repository where the SpecSheriff guidelines are written |
|---|---|---|
| The SpecSheriff guidelines | `guidelines/spec.json` | `specs/_guidelines/spec.json` |
| Each extension of the guidelines (§s-mbmnsnxenmavu3z) | `guidelines/extensions/<name>.json` | `specs/_guidelines/extensions/<name>.json` |
| The appendix of the tools (§s-a4rbry4hsu34hy8) | `guidelines/tools.json` | `specs/_guidelines/tools.json` |
| The schema of the SpecSheriff guidelines (§s-eferktypcj7njt5): `node.schema.json` for a node, `section-file.schema.json` for a file of a part of the specification, `archive-file.schema.json` for a file of the archive, and `extension.schema.json` for an extension of the schema, whether it is added by an extension of the guidelines or by the project | `guidelines/_schema/` | `specs/_schema/` |
| The schema of `sheriff.config.json`, which sets the default value of the `strict` flag (§s-q3pfzyaxvpr2zj2) | `guidelines/_schema/config.schema.json` | `specs/_schema/config.schema.json` |
| The schema of each extension of the guidelines that has one | `guidelines/_schema/extensions/<name>.schema.json` | `specs/_schema/extensions/<name>.schema.json` |

`<name>` is the extension's name, which `sheriff.config.json` uses to list the extension once the project has chosen it.

## Reason

The SpecSheriff tools find every file without a setting that says where it is kept, whatever the project and wherever the plugin is installed. A person or an agent who knows where a file is kept in one project finds it in any other.
