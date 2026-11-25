# Batch: what a link is, and the archive (2026-11-09)

The owner's comments: section 6 is built the wrong way round. First comes a rule saying what a link is and which types exist, so that the entity is introduced; working with outgoing links and building incoming ones follows from it. And the archive is mentioned with nobody having said what it is: section 2 should say what the archive is, why it is needed and how it is worked with.

Rulings that bear on it (2026-11-09): a main rule, that is a rule of the guidelines outside the extensions, names no particular extension and cites none of its nodes (`newform.json`, keys 14.1.1–14.1.3); domains and RecordTypes belong to the extension on domains. Reasons are short: why the rule exists, and nothing else.

## 1. A new first node of section 6, from the present node 2.2 (s-sn6au3vcr9uy5pm)

The present 6.1 and 6.2, "Outgoing links are written" and the node on incoming links, follow it. Compared with the present 2.2: a definition opens it; `consumes` leaves, since it belongs to the extension on domains; an extension may define further types; the `cites` item names s-cxtt6jvhqcey2k9; the reason is cut to its first paragraph.

Title: "What a link is" / «Что такое связь»

EN text:

A link is a directed relation from one node of the specification to another. Every link names what it means by a type. The main rules define these types:
- `implements` — the linking node is how the linked one is carried out.
- `refines` — the linking node states the linked node more precisely, or for a narrower case.
- `constrains` — the linking node holds a condition the linked rule depends on.
- `supersedes` — the linking node replaces the linked node, which is archived.
- `exempts` — a node of the project's own guidelines takes out of the rule that it is implemented (§s-6fw72j65jkqrfpf), for the reason its text gives, the linked rule or node of a project's own NodeKind (§s-vsh384ybt4w25a2), or every such node under the linked section.
- `cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two bear on each other. So it holds no link of another type to it.
- `term-relation` — the linking term and the linked term are bound, for as long as both exist, in the ratio the link carries.
- `uses` — what the linking term names makes use of what the linked term names while taking part in a process. For example, a user fills in a form while signing up. The link carries no ratio. A term that only starts a process, as an operator starting an export, uses nothing the process uses.

An extension of the guidelines may define further types.

A `term-relation` link and a `uses` link bind two terms. No other type does, `cites` included: a term citing another term holds a `term-relation` or a `uses` link to it.

A ratio is the multiplicity of each end in the usual notation: 1, 0..1, 1..N or 0..N. The linking term's end comes first. For example, user 1:0..N session says that a user has any number of sessions and that a session belongs to exactly one user. Read from the linked term, the ratio is reversed.

EN reason: A link without a type records only that somebody thought of two nodes together. No check can grade it. No diagram can draw it. A type named without its meaning is the same guess one step later.

RU text:

Связь — это направленное отношение одного узла спецификации к другому. Каждая связь называет, что она означает, своим типом. Основные правила определяют такие типы:
- `implements` — связывающий узел показывает, как выполняется связанный.
- `refines` — связывающий узел говорит о связанном точнее или для более узкого случая.
- `constrains` — связывающий узел содержит условие, от которого зависит связанное правило.
- `supersedes` — связывающий узел заменяет связанный, который уходит в архив.
- `exempts` — узел собственных guidelines проекта выводит из-под правила о том, что узел реализован (§s-6fw72j65jkqrfpf), по причине, указанной в его тексте, связанное правило или узел собственного NodeKind проекта (§s-vsh384ybt4w25a2) либо все такие узлы под связанным разделом.
- `cites` — связывающий узел ссылается на связанный (§s-cxtt6jvhqcey2k9), и никакой другой тип не говорит, как эти два узла соотносятся. Поэтому у него нет связи другого типа с этим узлом.
- `term-relation` — связывающий термин и связанный термин соединены, пока существуют оба, в соотношении, которое указывает связь.
- `uses` — то, что называет связывающий термин, пользуется тем, что называет связанный термин, участвуя в процессе. Например, пользователь заполняет форму при регистрации. У связи нет соотношения. Термин, который только запускает процесс, как оператор, запускающий экспорт, не использует ничего из того, что использует процесс.

Расширение guidelines может определять другие типы.

Связи `term-relation` и `uses` соединяют два термина. Никакой другой тип этого не делает, включая `cites`: термин, ссылающийся на другой термин, содержит связь `term-relation` или `uses` с ним.

Соотношение — это кратность каждого конца в обычной записи: 1, 0..1, 1..N или 0..N. Сначала идёт конец связывающего термина. Например, user 1:0..N session означает, что у пользователя может быть любое число сессий, а сессия принадлежит ровно одному пользователю. При чтении со стороны связанного термина соотношение обратное.

RU reason: Связь без типа лишь фиксирует, что кто-то подумал о двух узлах вместе. Ни одна проверка не может её оценить. Ни одна диаграмма не может её нарисовать. Тип, названный без значения, — та же догадка на шаг дальше.

## 2. The archive, moved into section 2 from the present node 1.9 (s-f2b5zvc565s242f), now 10.5 on the page

A move rather than a new node, since 1.9 already says how removal works. Compared with 1.9: a definition opens it; "a domain's header" leaves; the reason is cut.

Title: "The archive" / «Архив»

EN text:

The archive holds the nodes removed from the specification after an approval was given for them. Such a node goes there together with the reason for its removal and the sid of the node that replaces it, if one does.

A section and a node no approval was ever given for are deleted outright, whatever cited them.

A node may later be deleted from the archive.

EN reason:

A rule one of its owners approved is one the code may implement, so it is kept in its last wording and can be restored. An archived rule also records a logic or an approach that was mistaken, which later work has to take into account. A node no approval was ever given for was never implemented, so archived it would only bury the rules that had to go.

Nothing guarantees how long the archive keeps a node. So a link or a citation naming an archived node breaks when the node is deleted, and the checks refuse it until it is removed.

RU text:

Архив содержит узлы, удалённые из спецификации после того, как на них было дано одобрение. Такой узел попадает туда вместе с причиной удаления и sid узла, который его заменяет, если такой есть.

Раздел и узел, на который никогда не давали одобрения, удаляются сразу, что бы на них ни ссылалось.

Позже узел можно удалить и из архива.

RU reason:

Правило, одобренное одним из его ответственных, код может реализовать, поэтому оно хранится в последней формулировке и его можно восстановить. Архивное правило также фиксирует логику или подход, оказавшиеся ошибочными, и это нужно учитывать в дальнейшей работе. Узел, на который никогда не давали одобрения, никогда не реализовывался, поэтому в архиве он только заслонял бы правила, которые пришлось убрать.

Ничто не гарантирует, как долго архив хранит узел. Поэтому связь или ссылка, называющая архивный узел, ломается, когда узел удаляется, и проверки отклоняют её, пока её не уберут.
