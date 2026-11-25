# Two additions to "Where the files are" (s-zefk589ykh37b8u), the appendix of the tools, agreed on 2026-11-21

## The paragraph before the second table

The files common to every project come with the SpecSheriff tools that a plugin keeps on the machine (§s-4mej6ccn7xu3d3p). The tools find each of these files at the path in the second column below, relative to their own folder, the one that holds their `dist/`. Only the repository where the SpecSheriff guidelines are written keeps these files under `specs/`, each at the path in the third column (§s-6bmnsbskg6en4nf). The SpecSheriff tools recognize that repository only by the environment variable `SPECSHERIFF_GUIDELINES_REPO`, which holds the path to its root. In that repository, the tools read the files at those paths:

## Reason

The SpecSheriff tools find every file without a setting that says where it is kept, whatever the project and wherever the plugin is installed. A person or an agent who knows where a file is kept in one project finds it in any other. The repository where the SpecSheriff guidelines are written is recognized by an environment variable, so that the settings of every project hold nothing that only that repository needs. The variable holds the path to that repository's root, so that no other repository on the same machine is recognized as that repository.
