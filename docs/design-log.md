# Design log

The decisions taken while shaping SpecSheriff, newest first, and the questions still open. Once the
method's own specification exists, each decision moves onto the rule it settled, and this log
holds only what no rule carries.

## Decisions

### 2026-11-03 — The pictures sit on the page, and a narrow screen has a layout of their own

The owner's ruling, on the site as reviewed: the ground under the pictures goes too, and a small screen
gets a form of its own, the schemes turned from rows to columns, or their boxes breaking onto the next
row below a width. So the site shows each picture and card on the page itself, without the fill and
the texture of its canvas and the star drawn faint behind it; a star the drawing holds as its content,
SpecSheriff's place on the map, stays. Which box follows which on a narrow screen and where a note
sits belong to the picture, so they are made in its page in `_promo/images/html/`, not in the site:
each page marks what is shown as its element of the class `drawing`, and its `<style class="drawing">`
lays that element out again for a column narrower than 700 px, a width under the narrowest column in
which the site shows a drawing on a wide screen. The flows of the first three pictures run downward,
their arrows turned with them and each note beside what it annotates. The map keeps its three columns
and is read level by level, the tools of a level in the columns they stand in, since a tool's place is
where its level and its column meet and a column stacked whole would part the levels from each other.
A card's lines take the full width. At its own size a page is what it was, so its PNG and its SVG stay
as they are: rendered again, every SVG is the same byte for byte.

### 2026-11-03 — The pictures are shown as HTML

The owner's ruling, on the home as reviewed: it shows each of the four pictures from its page in
`_promo/images/html/`, and of each only what the owner marked, its title, its lead and its drawing; in
the end every picture that explains the method is shown as HTML. So the site shows every picture and
card from its page, the source, its text live: a screen reader and a search engine read it, the
localisation will translate it in one place, and it scales to the width of the page. A picture loses
the brand and the motto at its foot, and its own title is the heading of its section, in place of the
question that stood above it and would repeat it. A card on the page of its rule loses its double rule
and the brand, and keeps the line of its reason; its title is no heading there, since the page already
has the rule's title as its own. The picture is no longer a copy of an image, so it is no link to a
PNG: a reader zooms the page instead. The PNG stays the preview when a page is shared, since what
shows a preview does not render a page, and the fonts are those the site serves itself.

### 2026-11-03 — The site is served from the owner's own server, and shown as the owner reviewed it

The owner's ruling, on the site as first published: it is served from the owner's own server rather
than by Cloudflare Pages, and the server builds it again when main moves, here or in the site's own
repository. The server finds a change by itself, so the workflow that asked a host to rebuild,
`.github/workflows/site.yml`, is removed with the secret it read, and no list of paths has to follow
a new kind of material. A public file names nothing of how the server is run — no host, address,
path, schedule, port, account or credential: the brief says only what the site shows and where each
page's material comes from.

The design log is internal to the project and has no page on the site. The map does not repeat the
rules, which have a page of their own: without scripts it points to `/rules/`; with them it takes
the width of the window and grows in height with what is shown, so that nothing of it is cut off,
and it opens collapsed to the main branches, fitting within the visible area. The home shows the four
pictures in one column, each with the question it answers above it as a heading rather than a caption
below. The site shows copies of every picture made at build time, resized and in modern formats, each
a link to its original, which stays in this repository unchanged. (Changed on 2026-11-03: the pictures
and the cards are shown as HTML, each picture under its own title.)

### 2026-11-02 — The first article sets the method between vibe coding and writing by hand

The owner's thesis: the method answers two ways of losing. Vibe coding loses the developer's
understanding of the application's logic and their control of it; writing the code by hand keeps
both, at the cost of speed and of attention spent on the code rather than on what the system must do.
As spec-driven development generally, SpecSheriff puts the specification first and keeps the
developer's attention there, so that they understand all the logic and control it through the
specification, while the code is written by an agent held by the skills and the checks. The method
is told as an assembly of techniques each known elsewhere, since it came of steady study of them
rather than of one moment. The article explains the principles and what they give simply and
briefly, each principle citing its rules by sid, its claims checked against the guidelines by a
reviewer who read them apart from the author's reading; it ends with the way in, the plugin for
Claude Code or for Codex CLI and a first try on the saloon or on the reader's own repository. It is
[`_promo/articles/no-code-without-a-rule.md`](../_promo/articles/no-code-without-a-rule.md).

Opening on a single moment of the origin project was set aside, since the method came of no single
moment; an article holding the whole method, since the guides and the site carry it and the first
article's reader needs only enough to decide whether to try it.

### 2026-11-02 — Every promotional material lives in `_promo/`

The owner's ruling: the promotional materials live in one folder and nowhere else — the mark
(`_promo/brand/`, formerly `brand/`), the pictures and the cards (`_promo/images/`), the style guide
(`_promo/style/`), the articles (`_promo/articles/`) and the site's brief (`_promo/site/`), moved
there whole with no copy left behind. Its name begins with an underscore, as this repository's other
folders of a special kind do, rather than a dot, which hides a folder and which tools that walk a
tree pass over by default. The theory stays in `docs/`, the guidelines in `specs/` and the guides in
`skills/`: they are the method itself, which the tools, the plugins and this repository's own
instructions read where they are, and the site shows them from there. `_promo/` is under CC BY 4.0
as `docs/` is, but for the mark, which is under no open licence.

### 2026-11-02 — The site is built from this repository by a generator kept in a repository of its own

The owner's plan: everything the site shows is kept in this repository, and a builder at the host
takes it from here and lays it out as the site; a change merged here reaches the site by itself, its
pages cached, and the site is nearly static, so that search engines index all of it. Settled on that
plan, with the owner's agreement: the site's templates and navigation live in a repository of their
own, built by a static generator, Astro, and served by Cloudflare Pages. A push to main that touches
the materials asks the host to build again; the build takes the templates, fetches the materials from
here, writes every page as plain HTML and replaces the published site whole. The pages are cached at
the edge and dropped at every deployment, the browser checking each time; styles, fonts and images
carry a digest of their content in their names and are cached for good. Each node of the guidelines
gets a page of its own at an address made from its sid, and a citation by sid becomes a link to it.

The site's code is kept apart because this repository is held by its own checks — every commit through
the hooks and the reviewer, all code bound to a rule — and here the site's code would have to be bound
to rules of the method that say nothing of a site, or be taken out of the checks; either would blur
the example this repository gives of itself, as the saloon's repository of its own avoids. The cost is
a key of the host kept in GitHub's settings and one small step of automation. Netlify works the same
way; GitHub Pages was set aside because its cache cannot be set. (Changed on 2026-11-03: the site is
served from the owner's own server, which finds a change by itself, so no key of a host is kept and
no workflow asks it to build.)

The pages, agreed with the owner the same day: the home, the method, the principles, the rules with
a page for each node, a mind map of the specification, the guides, the landscape, the design log,
the articles and the example. The pictures and the cards have no page of their own: they are
promotional material, shown where a page uses them and as previews when a page is shared. The site
is built and run by an agent of its own, from the brief in `_promo/site/README.md`, which says what each page
is made of and what has been decided. (Changed on 2026-11-03: the design log has no page; it is
internal to the project.)

### 2026-11-02 — The pictures are a frontier ledger, in English first, each kept as a page

The owner was shown three directions, each drawn whole: a blueprint, editorial paper and a frontier
ledger. Having seen the blueprint finished, the owner chose the ledger as closer to the idea:
parchment, ink and a stamp red, Rye for titles and Courier Prime for text, every step a ticket in a
double border and every verdict a rubber stamp. The pictures are in English only, as every material
is until the rest is ready; the localisation comes last, into several languages at once (the owner,
2026-11-02).

Each picture is kept in `_promo/images/html/` as a page of its own, its source, and rendered from it by
a committed script into PNG at twice its size and SVG with the text as outlines, each format in a
folder of its own, as the owner asked. The page is the source because its text stays live, which the
translation and the site both need; the renders are never edited, as the exports of the mark are not.
A card names the rule it shows broken by sid: an address in a picture would go stale at the first
renumbering, which is the very decay the cards are about.

### 2026-11-01 — The worked example lives in a repository of its own

The owner's ruling: the saloon is a repository of its own, set up by spec-init as any project is,
and this repository links to it as the example. Kept in a folder here, its commits would be held by
this repository's hooks rather than its own: their messages could not name its nodes, the reviewer
would not read its code, and the tools would need a rule to leave a nested project alone; a reader
opening the folder would meet this repository's checks rather than the saloon's. In a repository of
its own every commit passes its own checks and its own reviewer, so its history shows the method at
work, and a reader clones it to try breaking a rule.

### 2026-11-01 — The plugin goes to Anthropic's directory last, with nothing left unfinished

The owner's ruling: the plugin is submitted to Anthropic's plugin directory only once the
repository, the plugin and the site are all finished and checked, with nothing in them that looks
unfinished or makeshift. Until then it is installed from the marketplace this repository keeps. The
directory takes a plugin from a public repository on GitHub through its developer portal, validates
and scans every version, and has a person review a new listing. What its review would hold, and what
the plugin must change to come from the directory as well as from this marketplace, are settled when
the step begins.

### 2026-10-31 — SpecSheriff is English, and a user's own language belongs to their personal skills

The owner's ruling: everything SpecSheriff stores is in English — the SpecSheriff guidelines and every
project's specification (§s-7anvune6h4f6mbr), the words the SpecSheriff tools add to what they
generate and their messages, the skills, the internal documentation and the comments in code. A
user's own language belongs only to their personal skills, which work with SpecSheriff to add it, such
as a reading of each node beside the English or a translation of a document, and keep it out of every
file SpecSheriff stores. So the skill spec-review shows the nodes as they are written and keeps no
setting of a language and no table of terms. Two exceptions concern this repository alone:
translations of the documentation into other languages, and the website in several languages.

### 2026-10-31 — A release carries out all it states, and every link that can be checked is made

Two rulings of the owner, taken while the first release was prepared. The SpecSheriff tools of a
release carry out everything the SpecSheriff guidelines of that release state: a gap found between a
rule and the tools is closed before the release, by the tools or by the rule, and never left for a
later one; deferred work stays a todo, which states nothing. So `sheriff types`, which waited for the
worked example, is built for the first release. And wherever a deterministic link that a check can
follow — a reference or a tag — can be made between two things the method holds, it is made, in a
form the standard use of the method does not break: the first case is the tag of its data record on
each type generated from the data record nodes, written by the generator itself.

### 2026-10-29 — Three parts in one repository: the theory, the skills, the worked example

SpecSheriff is three parts kept in this repository. The theory explains the method to a reader who
has never seen it: the approach in a few paragraphs, the principles one line each, a dated comparison
with similar tools with every claim linked to its source, which skills the method needs and why, and
the SpecSheriff guidelines the other two parts are built from. The skills are what a practitioner
installs: for each agent a plugin with the skills — spec, spec-review, spec-adopt and spec-init —
the SpecSheriff guidelines and the SpecSheriff tools, and a guide saying which skill to take in which
case, citing the theory rather than restating it. Their code and tests carry the sids of the
theory's nodes, so that the repository's own checks hold the implementation to the theory and the
method is shown on itself. The worked example is set up by the skills the way any project is, which
is why the packaging comes before it. The plugin is made for Claude Code now and for Codex CLI next;
Gemini CLI is being studied. Licences stay by directory: the theory's prose under CC BY 4.0, the
guidelines, the skills, the tools and the example under Apache 2.0. The plugin goes to Anthropic's
plugin directory last, as the entry of 2026-11-01 says. (Changed on 2026-11-01: the worked example
lives in a repository of its own, which this one links to. Changed on 2026-11-02: the plugin for Codex
CLI came in 0.3.0, a plugin of its own that Codex installs and updates by itself, built from the same
source (§s-2pdy9gw2jrjvfb4).)

### 2026-10-29 — One channel: the plugin carries everything its work needs

The decision stands on the rules it settled (§s-bsya3febm6u64ab, §s-zh2vcr3xjumppg5,
§s-4mej6ccn7xu3d3p): the plugin carries the skills, the SpecSheriff guidelines and the SpecSheriff
tools, comes through the marketplace kept in this repository and updates itself on every machine, and
a project keeps no copy of the guidelines and names no version.

Set aside: an npm package as a second channel, because this repository already serves every file and
a second publication is one more thing to keep in step; and, the same day, the version of the checks
named by the project and taken from this repository at its tag into a cache on the machine, as the
pre-commit framework takes each hook. That held one commit to one answer on every machine, at the
cost of a version each project keeps and moves; the owner took the standard road instead, on which
every release reaches every machine through the marketplace's update and a machine not yet updated is
its user's matter. How a version is released is this repository's own procedure, described in an
internal document rather than in the guidelines. Codex admits no plugin carrying hooks into its public
directory, which its plugin will have to meet. (Met on 2026-11-02: the agent's hooks for Codex stand
in the project, where sheriff init writes them, §s-n76wt2bkqdmh78x.)

### 2026-10-29 — The final gate stands on each participant's machine

Git hooks run on each participant's machine and can be skipped, so the principle calling them the
final gate whoever made the change claimed more than they hold. It now reads: git hooks at every
commit, the final gate on each participant's machine, whoever made the change; a team that needs the
gate to hold for everyone runs the same checks in CI. The practitioner's guide gives the recipe — the
branch reset softly to its base, so that the whole branch reads as the commit being made, and the
same commands run — and a test proves it.

CI shipped with the tools was set aside: the hooks on each machine are the gate, and a team's CI is
its own.

### 2026-10-29 — The worked example is a saloon in a frontier town

The example project specifies the saloon of a Wild West town, which the sheriff guards, in three
domains with the contracts between them: a regular's tab — the account, its limit, the repayments and
the journal of operations — where a regular's debt never exceeds the tab's limit; the stock of bottles
and supplies, which never falls below zero; and the rooms upstairs with their bookings, a room never
let to two guests for the same night. The contracts hold the shared terms — regular, order, tab — and
the rules binding the domains, such as an order put on the tab lowering the stock and raising the
regular's debt in one operation. As with the bank it replaces, the rules are real and meant
seriously, the theme lives only in names, the example is written in TypeScript on Node, and it ships
a recorded run in which a commit is refused.

The scene: an agent asked to make service at the bar faster drops the check of the tab's limit and
rewrites the test it broke, so that every test passes, and the reviewer refuses the commit all the
same, naming the rule on the limit and the line. A second scene, a room let twice for one night, is
kept for the hands-on article. Gambling, the age of patrons and real brands of drink stay out; drink
is background and never the subject of a rule.

A saloon is closer to everyday business software — a till, stock, bookings — gives several domains
and the contracts between them naturally, is judged by nobody against a real one, and a sheriff in a
saloon is the genre's own scene. The bank was set aside because one subject showed the domains, their
levels and the contracts poorly, and readers from finance judge a bank by a real one; the agent only
dropping the check, because an ordinary run of the tests catches that, and the scene would show
nothing the tests do not. (Changed on 2026-11-01: a room is let for 24 hours from the instant its
booking is made, the owner's ruling, kept on the term booking of the saloon's specification; and in
the recorded run the agent drops the debt from the comparison with the limit and rewrites the tests
that broke.)

### 2026-10-29 — The mark is the sheriff's coin and its star

The mark is a five-pointed star drawn as one continuous line, an S tilted inside it whose ends join
the star, each point ending in a small open ring. Full size, it is the coin: the star inside two pairs
of rings, SPECSHERIFF along the top and NO CODE WITHOUT A RULE along the bottom; every icon is the
bare star, since the coin's lettering cannot be read at icon sizes. One folder, `_promo/brand/`, holds the
owner's drawings and every export, rendered from them by a committed script; the README, the plugins
and the promo site copy from it. The marks are under no open licence: anyone may use them unchanged
to refer to SpecSheriff — in an article, a post, a talk, a badge — and nobody may change them or use
them as the mark of another product; their copies in the plugins are excepted from Apache 2.0.

CC BY 4.0, as for the pictures, was set aside: it would let anyone redraw the mark and put it on their
own, and cannot be withdrawn.

### 2026-10-28 — The repository is held by its own tools

The SpecSheriff tools are built along the appendix of the tools and hold this repository: the
SpecSheriff guidelines are written here (`writesSpecSheriffGuidelines`), the owner named by
`specs/_guidelines/project.json` confirms their nodes into `specs/_confirmations.jsonl`, the git
hooks check every commit and the agent's hooks every edit. The tools' own tests carry the sid of the
node of the SpecSheriff guidelines they verify, and those nodes list them. The rulings of building
it that bear on more than one node:

- **The spec skill reads the guidelines through `sheriff guide`** rather than holding a copy generated
  into it, so nothing generated is kept beside the nodes but what the checks compare.
- **A node removed while the SpecSheriff guidelines are first written is no longer deleted**: from
  now on a node ever confirmed goes to the archive (§s-f2b5zvc565s242f).

- **A project gets the hooks, the skills and the SpecSheriff guidelines by `sheriff init`**, a
  command rather than the adopt skill, so that what the checks depend on is laid out by a script
  (step 3). The adopt skill imports a project's documents by the agent, with no import command,
  since every project writes its documents its own way; the owner's reading of every node is what
  guarantees the import. It starts from the directory the owner names, walked whole, the owner
  agreeing which part each document goes into, and the originals are deleted once they stand in the
  nodes.

### 2026-10-28 — The SpecSheriff guidelines read again as a whole, against the principles

The owner stated the principles the method rests on, now in `docs/principles.md`, and went over the
SpecSheriff guidelines again as a whole, each changed node confirmed as it now stands, its decisions
on it. The rulings that bear on more than one node:

- **A symbol, not a declaration, carries the tag**, and only a symbol whose code a commit changes must
  name a checked node; a change to a tag is a change to the code (§s-kgbzk2ph9e6jfb4).
- **The specification has one owner; a domain or any section may have its own**, the nearest above a
  node being its owner, and only the owner confirms (§s-67vekyup7y8smap). A confirmation names its
  owner and is not signed: the agent's hooks and the checks at a commit keep a status honest. This
  sets aside the signed confirmations of 2026-10-27.
- **The checks run at each edit an agent makes**, and an edit that would leave a node checked over an
  unconfirmed wording, or change the code of a rule with no test, is refused before it is made
  (§s-83ev4wwesbwnhnp); the hooks are kept in the repository.
- **Whatever is generated from the nodes is regenerated after every change and never edited**, and a
  generated copy that is kept is checked against what the nodes produce (§s-kh8qcd5kxgh9z3j).
- **A node ever confirmed is archived when removed**, not only one checked at the moment
  (§s-f2b5zvc565s242f). The rule that a node removed while the SpecSheriff guidelines are first
  written is deleted ends before `sheriff validate` first runs on this repository.
- **Comments come back into a node's metadata**, the one type of comment an open problem; the schema
  defines them at step 2 (todo on §s-eferktypcj7njt5).

### 2026-10-27 — The SpecSheriff guidelines are confirmed

The owner went over every node of the SpecSheriff guidelines, the base and the appendix of the
tools, one at a time, the English above a reading in Russian. What came over unchanged kept its
confirmation, since its wording was the one the owner had already confirmed; every changed or new
node was confirmed as it now stands, its decisions on it. The confirmations become lines in a file
once the tools record them (step 2). The rulings of that reading that bear on more than one node:

- **The examples of the SpecSheriff guidelines name what any system has** — a user, an operator, a
  record, a request — and nothing of one implementation. The worked example's bank stays in the
  example, the articles and the pictures, never in a rule.
- **The specification is written fresh.** A node removed while it is first written is deleted, not
  archived: the origin project's experience shapes it, its history does not carry over beyond the
  decisions retold on the rules.
- **A test always carries the sid of what it verifies, and every declaration of the system's code a
  tag**, or the tag saying it implements none and why. Only a test or a declaration whose code a
  commit changes must name a checked node. The origin project, taking the SpecSheriff guidelines,
  tags its code before the check is turned on.
- **The base of the guidelines is tied to no implementation** in three rules — no technology, no look
  of a user interface, no figure measured on one instance; the doctrine's own rule on measured figures
  folded into them.
- **Every procedure that writes the specification is idempotent**, by that name.
- **A restriction by list** names what is allowed or what is forbidden by which mistake would go
  unnoticed.

### 2026-10-27 — The guidelines apply the split between base and appendix to themselves

The base guidelines state what is held, what is checked, when, and what a failure costs — a rule's
tag stands on its declaration, and the check at a commit refuses a declaration without one — and
name no technology. An appendix of the tools describes how SpecSheriff's own tools carry them out:
the commands, the hooks, the layout of the files, the parser and its descriptions of languages, the
runners of the reviewer, the spelling of a tag in a comment. Another toolset, in another language,
can implement the same base.

Keeping the tools named in the rules was set aside because the method would break its own rule that
a base names no technology; moving only the runners and the parser out, because it leaves that rule
broken by the commands.

### 2026-10-27 — The SpecSheriff guidelines carry their history of decisions, retold

Each decision recorded on a rule of the SpecSheriff guidelines in the origin project comes over with
its date, its problem and its ruling, retold without anything of the origin project: not its
components, its stores or its commits, but the shape of the problem — a rule on confirmation that
did not cover the fields of a record, so that a changed field left the status standing over a
structure the owner never saw. A decision that cannot be told without the origin project stays there
alone.

Carrying the decisions over as they stand was set aside because they speak of the origin project,
which the one-way dependency forbids; starting clean, because it drops the strongest evidence a
reader weighing the method has — that each rule came out of a real failure rather than a desk.

### 2026-10-27 — The first article carries a series of four pictures and a set of cards

Each picture answers one question an architect asks, and each can be posted alone with a link to the
article:

1. How does it work? — the life of a rule: the owner confirms it, a test carrying its identifier, code
   carrying its tag, the commit, the checks and the reviewer, the merge; and the loop by which a
   changed wording returns the status to empty until it is confirmed again.
2. What stops bad code? — the gate of a commit: the deterministic checks, and the one judgement, made
   by a reviewer that sees only the change and the text of the rules.
3. Will it survive a change of stack? — one base specification, two technical appendices.
4. How does it differ from Spec Kit? — the map of approaches, spec-first, spec-anchored and
   spec-as-source, with the tools placed on it and SpecSheriff among them.

Beside the series, a set of cards on how requirements decay silently, one per rule of the doctrine of
writing: posts for the weeks after the article, useful even to a reader who never takes up the whole
method. The scene of the sheriff refusing a commit is kept for the second article.

One poster holding the whole method was set aside because nothing on it can be read closely and it
cannot be cut into posts; one picture alone, because it answers one of the four questions.

### 2026-10-27 — An emblem is the face of the project, a character appears where play fits

The emblem is a sheriff's star with a rule node at its centre: the face of the README, the
documentation and the first article. A drawn sheriff appears only where the reader is ready to smile —
the hands-on article, posts on social networks, the scene of the refused commit.

An emblem alone was set aside because it wastes the name chosen for being remembered; a character
everywhere, because it would make the method look like a joke to the architects the first article is
written for. (The mark was fixed on 2026-10-29: the coin and the star with its S.)

### 2026-10-27 — Each article appears in English and in Russian in the same week

The English text is the original and is kept in this repository. The Russian one is written for Habr
rather than translated: its own examples and its own way in, the same meaning. Both appear in the
same week; the comments on Habr feed the second, hands-on article.

English alone was set aside because it gives up Habr, where the method's readers like to argue about
process and the author writes in his own language; Russian first as a trial, because the English
text would lose time while the niche fills. (Changed on 2026-11-02 by the owner: every material is in
English until the rest is ready; the Russian text, with the other languages, comes with the
localisation, done last and into several languages at once. On 2026-11-03 the owner took on the
Russian text of the first article for Habr themselves: written for Habr from the English one, and
kept outside this repository.)

### 2026-10-27 — The first article is written for team leads and architects

Its reader is the engineer bringing coding agents into a team's work: plausible code nobody can trace
to a requirement, decisions an agent quietly undoes, review that cannot keep up with generation. The
method's strengths answer a team's problems — an owner's confirmation, owners per domain, the gate at
every commit, the base kept apart from the appendix — and this reader can introduce a process. Its
proof is the origin project: one engineer with agents, two months, about 1,800 rules and about 3,900
bindings of code to them, and agents that do not drift from the rules. Its venues are InfoQ, LinkedIn,
Habr and Medium. A second, hands-on article, built on the sheriff's scene, is written for developers
working with agents alone, for Hacker News, Reddit and dev.to.

Developers working alone were set aside as the first reader because they are likeliest to see the
method's weight before its value, the criticism Spec Kit already draws; regulated industries, as too
narrow a first audience.

### 2026-10-27 — Apache 2.0 for what is installed, CC BY 4.0 for what is read

What a project installs — the tools, the skills, the guidelines and the worked example — is under the
Apache License 2.0, whose patent clause is the first thing a large company's lawyers look for. What
is read and shared — the concept, the articles and the infographics — is under CC BY 4.0, which
requires naming the source wherever a picture or a passage is reused, so that every reprint carries
the name and a link. The guidelines count as installed, since a project copies them in beside the
tools.

MIT for everything was set aside for want of a patent clause, and because it lets the texts and the
pictures travel without their source; Apache 2.0 for everything, because it is not written for texts
and pictures.

### 2026-10-27 — TypeScript and Python at launch, through one general parser

The binding of code to rules is read through a parser with grammars for many languages, so that a
language is added by describing what counts as a declaration and as a test in it, rather than by new
code. TypeScript and JavaScript, and Python, are supported at launch; Go, Java, C#, Rust and others
follow by description. The rule of the SpecSheriff guidelines binding a test to what it verifies
becomes: a test declares the identifier of the rule it verifies in the way its framework names a
test — the opening of its name in TypeScript, a mark on the test in Python, where an identifier
cannot hold a hyphen.

TypeScript alone was set aside because it cuts the method off from most of the people building
agents and working with data; a tag bound to the next line without parsing, because nothing could
then tell which declarations a commit touched, and so whether each carries its tag.

### 2026-10-27 — The reviewer is a contract, carried out by replaceable runners

The SpecSheriff guidelines state the reviewer's contract: it is given the commit's change and the
text of the rules the commit names, and nothing of the session that wrote the code; it answers with
a verdict naming the rule and the line of each finding; and a review that cannot be held — no
runner, a timeout, an answer that does not parse — refuses the commit. Who carries the review out is
a runner, described in the appendix of the tools: first the Claude Code CLI, which exists, then the
Codex and Gemini CLIs, then any service speaking the OpenAI-compatible API, which covers models run
locally. The example ships a recorded run in which the commit is refused, so that the scene can be
seen without any model installed.

One runner alone was set aside because the method would read as one vendor's tool and a reader
without it could not run the example; a call to an API on the reader's key, because every commit
would cost money and the choice of model would fall on the reader.

### 2026-10-27 — The worked example is a small bank in a frontier town

The example project specifies a small savings bank of a Wild West town, which the sheriff guards:
accounts, transfers between them, a journal of operations. Its rules are a bank's and are meant
seriously — a transfer never leaves an account below zero — and the theme lives only in names, so
that removing it is a renaming. The scene the method is shown by: an agent asked to make transfers
faster drops the check of the balance, and the commit is refused, naming the rule on transfers and
the line that breaks it. The example is written in TypeScript on Node, the stack the tools are
already written in.

A task list was set aside as a subject nobody minds seeing broken; a library's loans, because a
broken rule there costs little; a plain bank, because the frontier town lets the example and the
brand tell one story. (Superseded on 2026-10-29: the worked example is a saloon.)

### 2026-10-27 — Each domain has its owners, and a confirmation names who gave it

A confirmed node means that an owner of the part it stands in read its wording. Each domain names
its owners in its header; the rules of the SpecSheriff guidelines and the agreements between domains
have the specification's chief owner. A confirmation is kept in git beside the fingerprint of the
wording confirmed and the name of whoever confirmed it, and a commit adding a confirmation is
refused unless it is signed by that person. Working alone, one person owns every domain, and nothing
changes.

One owner for the whole specification was set aside because it binds a growing specification to one
person; a confirmation read off the approvals of a merge request, because it would tie what a status
means to one hosting platform. That platform's approvals may later be described as one way an
appendix of the tools records a confirmation, never as what a confirmation is. (The signature was set
aside on 2026-10-28.)

### 2026-10-27 — How the origin project takes the SpecSheriff guidelines

Before the first publication, the origin project takes the SpecSheriff guidelines as a git
dependency pinned to a commit of this repository; after it, as a versioned package. A change to them
is made here and committed here first, and the origin project then moves its pin. (Since 2026-10-29
the origin project, like any project, takes the SpecSheriff guidelines with the plugin that carries
them.)

### 2026-10-27 — The name is SpecSheriff

Chosen for a word known in every country, and for a figure an article and an infographic can carry:
the sheriff who refuses a commit that no rule warrants. Names built on guard, warden, sentinel,
shield or mind were set aside: each is taken by a project in the same niche, and guardrails are the
most worn metaphor in tooling for coding agents. Specbound, SpecWarrant, Rulefirst and Spec Anchor
were weighed and set aside as neutral, or as the name of a category rather than of a project.

### 2026-10-27 — The line between the SpecSheriff guidelines and a project's own rules

The SpecSheriff guidelines hold the model of nodes and statuses, the links and their types, the
binding of code and tests to rules, the map, the doctrine of how a rule is written, the split
between the base specification and the technical appendix, the technical debt, record nodes with the
types and runtime checks generated from them, and record variants.

A project holds as its own rules what only its system needs. For the origin project those are its
model of jobs and of the steps a job consists of, with the registry its runtime reads; the exception
letting a menu entry of its user interface carry its icon and place, with the checks of its pages
and menu; its domains' tables headed by a field's name, with its kinds of problem; and the concrete
list of the levels its domains stand at. The SpecSheriff guidelines keep the rule that every domain
stands at a level the owner defines, from the general to the particular; the list of levels is a
project's setting.

A project's own rules stand to the SpecSheriff guidelines as the technical appendix stands to the
base: they refine them and never contradict them.

### 2026-10-27 — Three skills

- **spec** — the guidelines and the figures counted off the model, and nothing else. Since
  2026-10-28 it is a short skill written by hand that has the agent run `sheriff guide`, which prints
  them as they stand, rather than a copy generated into the skill and kept beside the nodes.
- **spec-review** — how an agent works with the specification's owner: as a colleague rather than a
  clerk; a proposed rule checked by a reviewer apart before it is shown; one node at a time, shown
  whole; one part at a time; a confirmation recorded by a script and guarded by a hook; a technical
  replacement not confirmed again; a domain gone over whole once its nodes are confirmed.
- **spec-adopt** — bringing a project's existing documents into the model: imported verbatim first,
  every citation moved onto a permanent identifier, numbered by place, then gone over with the owner.

(Since 2026-10-29 the plugin adds spec-init.)

A personal working regime — a task list, working time against an estimate, a status line, a local
cache in front of external systems — is not published. Neither is a protocol for teams of agent
sessions: it is a subject of its own. Of it, only the independent reviewer is published, as part of
the commit gate.

### 2026-10-27 — SpecSheriff is the upstream of the method

The SpecSheriff guidelines, the SpecSheriff tools and the skills live here. The project the method
was extracted from — a private system under active development, to be opened once it is finished —
takes the SpecSheriff guidelines from here and keeps only its own extensions. The dependency runs
one way: nothing here names or relies on that project.

### 2026-10-27 — What a reader gets

The concept, and a small worked example project carrying the minimum of tools, on which a commit is
seen being refused with the rule and the line named. Not the concept alone, which would be one more
opinion among many; not yet a standalone product, which would be a second project to support. The
example leaves the road to a product open.

## Findings to act on

- The origin project's code holds many declarations without a tag. Taking the SpecSheriff guidelines
  (step 5), it tags them, finding a rule for each or stating that it implements none and why, before
  the check of tags is turned on.

## Order of work

1. ~~The SpecSheriff guidelines~~ — done 2026-10-27: the base and the appendix of the tools,
   confirmed by the owner node by node.
2. ~~The tools~~ — done 2026-10-28: checks of the specification on its own and against the code, the
   export and the map, confirmations naming who gave them, the general parser with TypeScript,
   JavaScript and Python described, the reviewer's contract with its first runner, the git and agent
   hooks; turned on in this repository. `sheriff types` comes with the first release (2026-10-31).
3. ~~The skills~~ — done 2026-10-28: spec, spec-review, spec-adopt, and `sheriff init` laying them
   out with the hooks and the SpecSheriff guidelines.
4. ~~The packaging~~ — done 2026-11-01, released in 0.1.0: the repository laid out as the three
   parts, with the mark in `_promo/brand/`; the theory; the rules of the appendix of the tools for
   the one channel, then the plugin for Claude Code and its marketplace; the practitioner's guide,
   and a test on a clean machine.
5. ~~The worked example~~ — done 2026-11-01: the frontier town's saloon in a repository of its own,
   its specification confirmed by the owner node by node, its code and tests, and the recorded run
   in which the reviewer refuses a commit every test and every other check let through.
6. ~~The plugin for Codex CLI~~ — done 2026-11-02, released in 0.3.0: a plugin of its own beside the
   one for Claude Code, its agent's hooks in the project, the guard reading Codex's patch, the
   reviewer on `codex exec`; `sheriff remove`, the reverse of `sheriff init`; a git hook that finds
   no plugin lets the commit through and turns itself off; and the reviewer at the model and the
   effort each user confirms once, at their cost.
7. The origin project takes the SpecSheriff guidelines from here and keeps its own rules as a part
   refining it.
8. ~~The four pictures and the cards~~ — done 2026-11-02: the pictures of the first article and a
   card for each rule of how a rule is written, drawn as a frontier ledger, in `_promo/images/` as
   pages rendered to PNG and SVG.
9. ~~The style guide~~ — done 2026-11-02: one style for the site and every picture, taken from
   `_promo/style/` — its tokens the one source of every value, the stylesheet built on them, the
   components the pictures are drawn with, and the brand book; an article's body set in Libre Caslon
   Text, the typewriter kept for labels, stamps and code.
10. ~~The materials for the site~~ — done 2026-11-02: the pages agreed with the owner, each made
    from a document kept here; a home for the articles; the workflow that asked the host to rebuild,
    removed on 2026-11-03; and the brief, `_promo/site/README.md`, for the agent that builds the site.
11. The site, built by an agent of its own from the brief, in a repository of its own, by Astro,
    served from the owner's own server.
12. ~~The first article, in English~~ — done 2026-11-03:
    [No code without a rule](../_promo/articles/no-code-without-a-rule.md), the method set between
    vibe coding and writing by hand, with the four pictures.
13. The article published, and the plugin submitted to Anthropic's plugin directory once the
    repository, the plugin and the site are all finished and checked.
14. The localisation, once everything else is ready: the materials, the site and the pictures in
    several languages at once (the owner, 2026-11-02).

## Open questions

- Whether Gemini CLI gets a package of its own: being studied.
