# T25: the owner's pages for the questions about the base specification — the brief for the page data

The main session shows `base-questions.md` to the owner on three pages, one for each group. The pages are built by `gen-bq-pages.mjs` from `bq-pages.json`, which you write. Read the generator first: it says what each field holds and refuses data that lacks a required field. Run `node gen-bq-pages.mjs` from this folder until it writes all three pages without an error. Edit no node, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## The three pages

1. **`bq-1`**, with the title "Правки базы по решениям" and the heading `h1` "Базовая спецификация: правки по вашим решениям". Two sections:
   - "Изменения без вопроса": items 1.1 to 1.4. Each item has only `id`, `title` and `report`, the one line that the main session reports to the owner, in Russian.
   - "Предложения, которые исполняют ваши решения": items 2.1 to 2.9.
   The question: «Согласны с предложениями 2.1–2.9?»
2. **`bq-2`**, with the title "Новые формулировки базы" and the heading "Базовая спецификация: новые формулировки". One section, "Новые формулировки на согласование": items 3.1 to 3.8. The question: «Согласны с формулировками 3.1–3.8?»
3. **`bq-3`**, with the title "Вопросы по базе" and the heading "Базовая спецификация: вопросы". One section, "Вопросы к вам": items 4.1 to 4.7, then a second section, "Снятые пункты", with one item that lists the dropped items of section 5 in its `why`, each with its reason in one line of Russian. The question: «Согласны с рекомендованным вариантом во всех семи вопросах?»

Each page's `intro` says in two or three short Russian paragraphs what the page holds, that each section opens on a click, that the owner answers the whole page with one reply, and that remarks on single items are welcome in that reply.

## What each item holds

- `title`: the item's subject in Russian, short; `summary`: one line in Russian on what changes.
- `why`: in Russian, the decision that the item carries out, or the problem that it solves, as the file states it.
- `nodes`: every node that the item changes or adds, each **in full**: its title, text, reason and examples (or, for a row of a table, what is checked and what happens on failure), in English in `en` and in Russian in `ru`. Nothing is left out because it "stays as it is": the owner sees the whole node, as the rule "Nodes are shown in groups, each node in full" requires. Reviewer A asked for this explicitly for items 2.1, 2.2, 2.4, 2.5 and 2.8.
  - The English is the file's new wording merged into the node's agreed wording. The agreed wording of a node of the base is in `moved/specs/_guidelines/` and in the agreed drafts of `tools-drafts.json`; `newform.json` holds the Russian of the base nodes as the owner agreed to them (`ruTitle`, `ruText`, `ruReason` and so on).
  - The Russian of an unchanged part is the agreed Russian, word for word. The Russian of a changed part is the file's Russian. Where the file gives no Russian for a changed part, write it from the English by meaning, covering every clause.
  - `agreed` holds the agreed wording that a changed node replaces, in full, in English and in Russian.
  - `changes` lists in Russian what changed: each place, what it said and what it says now. A new node says that it is new.
  - `links`: in Russian, the links that the item adds or removes.
- `assessment`: the five lines of the «Оценка», in Russian, one per criterion, in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes compared, or the problem found. Take them from the last review of the item (`review3-bq-a.md`, `review3-bq-b.md`, or `review2-bq-*.md` for an item that the third review did not reread), updated for what later rounds changed.
- For a question (section 4): `recommendation`, `basis` (a list), and `options`, each with `label`, `title`, `sees`, `cost`, `risk` and, for one of them, `recommended: true`. `nodes` then holds the new wordings under the recommended option.

## What the pages leave out

A page is for the owner, not for the work. It names no round, no reviewer of the drafts, no report and no working file, and it calls the owner «вы» or «ответственный». It cites a node by its sid, as `§s-…`, which the page shows with the node's location and title; it never cites a node by a number that the work gave it. The generator refuses a page that breaks these rules.

When the three pages are written, report the number of items on each page and list every Russian wording that you wrote yourself for a part where the file gives no Russian.
