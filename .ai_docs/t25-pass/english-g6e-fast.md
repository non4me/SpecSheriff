### english-group6e.md · s-v4qus7raqnwzneb
TRANSLATION:
1. Последнее одобрение узла — это самая поздняя строка для sid узла и для `fingerprint` (отпечатка) его текущей формулировки, если эта строка является одобрением.
2. Иначе последнее одобрение узла — это самая поздняя из строк для sid узла, являющихся одобрением, независимо от того, отзывает ли это одобрение более поздняя строка.

TWO READINGS:
- "the latest line for the node's sid and the fingerprint of its current wording": (а) самая поздняя строка, относящаяся сразу к паре «sid + fingerprint текущей формулировки» (более вероятно); (б) самая поздняя строка для sid, а отдельно упомянут fingerprint.
- "Otherwise": (а) если самая поздняя строка для этой пары не является одобрением (это может быть отзыв); (б) ещё и если строк для этой пары нет вообще. Предложение само не говорит, охвачены ли оба случая. Контекст склоняет к (б).
- "the latest line for the node's sid that is an approval": (а) самая поздняя среди тех строк для sid, которые являются одобрениями (более вероятно, это подкрепляет "whether or not a later line withdraws"); (б) самая поздняя строка для sid вообще, при условии что она — одобрение.
- "that approval": одобрение, которое представляет найденная строка. Какое именно одобрение отзывает более поздняя строка (с тем же fingerprint или с любым), не сказано.

LANGUAGE: none

### english-group6e.md · new:tools-11-withdraw
TRANSLATION: Для каждого одобрения формулировки (§s-5ah25f6gy99panq) такого узла, если это одобрение действует, независимо от того, сохраняет ли узел по-прежнему эту формулировку, команда дописывает в `specs/_approvals.jsonl` строку, отзывающую это одобрение (§s-v4qus7raqnwzneb).

TWO READINGS:
- "such a node": какой узел, в самом предложении не названо. Скорее всего, это узел, о котором говорит предшествующий текст (например, узел с одобрением, которое можно отозвать).
- "the command": команда не названа. Скорее всего, это `sheriff approve --withdraw`.
- "whether or not the node still holds that wording": (а) уточнение к "if that approval is in force": одобрение действует, даже если узел уже имеет другую формулировку (более вероятно); (б) уточнение к "For each approval": отзыв делается для каждого одобрения независимо от текущей формулировки узла. Практически это почти одно и то же.
- "in force": (а) не отозвано; (б) относится к текущей формулировке узла. Контекст склоняет к (а).

LANGUAGE:
- "if that approval is in force" → "if that approval stands" — "in force" is said of laws, contracts and rules, not of an approval. The same project's rules say an approval "stands". Not sure the replacement keeps the meaning exactly.

### english-group6e.md · new:tools-2-entries
TRANSLATION: Записи хранят каждое изменение, которое ответственный внёс в настройки, меняемые только ответственным за спецификацию, каждое — с адресом электронной почты ответственного, внёсшего его, но значение настройки задаёт только последняя запись из каждого списка.

TWO READINGS:
- "The entries": какие записи, в предложении не сказано. Это записи настроек из заголовка.
- "each": (а) каждое изменение (более вероятно); (б) каждая настройка.
- "each list": списки до этого не упоминались. Скорее всего, у каждой настройки есть свой список записей. Возможно также, что настройка сама является списком. Предложение не различает эти случаи.
- "its setting": настройка, которой принадлежит этот список.
- "an owner" и "the owner who made it": один и тот же ответственный в роли автора изменения. Это не два разных человека.

LANGUAGE:
- "The entries keep every change" → "The entries record every change" — entries record or log changes. "Keep" means store or retain. Fairly sure the meaning is kept.
- "each list" → "each such list" or a sentence that first says the entries form one list per setting — the list has not been introduced, so "each list" has nothing to point back to.

### english-group6e.md · new:tools-2-approve-spec
TRANSLATION: Отказ называет то же, что называет отказ включить флаг в этом случае.

TWO READINGS:
- "The refusal": отказ какой команды, не сказано. Из заголовка — отказ одобрить спецификацию.
- "the flag": какой флаг, не сказано. Скорее всего, `strict` (из соседнего узла).
- "in that case": в каком случае, не сказано. Скорее всего, в случае, когда код и тесты вне коммита не связаны SpecTag или проверки проекта отказали бы при `--strict`.
- "names what ... names": (а) называет те же вещи (команды `sheriff untagged` и `sheriff validate --strict`), что и отказ включить флаг (более вероятно); (б) называет то, что названо в отказе, в виде цитаты.

LANGUAGE:
- "The refusal names what the refusal to turn the flag on names in that case." → "The refusal names the same thing as the refusal to turn the flag on does in that case." — "names what ... names" is a hard-to-parse repetition. Not sure the replacement keeps the meaning, since it fixes a reading that the original leaves open.

### english-group6e.md · new:tools-2-strict
TRANSLATION:
1. проверка кода и тестов вне коммита (§s-3xx2eukc8gtd2tx), которые не связывает ни один SpecTag (§s-8xw4mgvpexyvw5q): она отказала бы там, где `sheriff untagged` (§s-weuyx98r7c923ab) вывел бы хоть что-нибудь, а отказ включить флаг называет `sheriff untagged`;
2. каждая из собственных проверок проекта (§s-2fau85dfyyeq66m), любую из которых правило собственных guidelines проекта (§s-u7tw6m8npxmv5tu) может ужесточить (§s-q3pfzyaxvpr2zj2): такая проверка отказала бы там, где отказал бы `sheriff validate --strict` из-за этой проверки (§s-7pk89t8z6wymmj9), а отказ включить флаг называет `sheriff validate --strict`.

TWO READINGS:
- "that no SpecTag binds" (пункт 1): (а) относится к "code and tests" — код и тесты, не связанные с узлом SpecTag (более вероятно); (б) относится к "the check" — проверка, которую не связывает SpecTag, что бессмысленно.
- "outside the commit" (пункт 1): (а) код и тесты вне коммита (более вероятно); (б) проверка вне коммита.
- "it" (пункт 1): проверка кода и тестов, а не сам код.
- "would refuse where ... would list anything": "would" — условное наклонение: если бы флаг был включён. "anything" — любой элемент в списке; "where" — «в случае, когда».
- "the flag" (оба пункта): флаг `strict` из заголовка, в этом отрывке не назван.
- "may make stricter" (пункт 2): (а) разрешение — правило вправе ужесточить проверку (более вероятно); (б) возможность — иногда ужесточает.
- "any of which" (пункт 2): любая из собственных проверок проекта.
- "such a check" (пункт 2): (а) любая из собственных проверок проекта, ужесточённая правилом (более вероятно); (б) каждая собственная проверка проекта вообще.
- "that check" (пункт 2): та же проверка, о которой сказано "such a check".

LANGUAGE:
- "would refuse where `sheriff untagged` (§s-weuyx98r7c923ab) would list anything" → "would refuse if `sheriff untagged` (§s-weuyx98r7c923ab) would list anything" — "where" as a condition is legal-style English. Both are understood, so this is a stylistic point.
- "would refuse where `sheriff validate --strict` would refuse because of that check" → "would refuse if `sheriff validate --strict` would refuse because of that check" — the same reason.

### english-group6e.md · new:tools-2-extension-off
TRANSLATION:
1. Ссылка в расширении схемы проекта (§s-xm8rz4uupb73gu5) зависит от расширения guidelines в том случае, когда она указывает на определение, которое добавляют `$defs` схемы этого расширения guidelines (§s-xzcw3hv4hmxz7h7).
2. `fields` расширения схемы проекта зависят от расширения guidelines в том случае, когда они задают условия для типа узла, который добавляют `kinds` схемы этого расширения guidelines.

TWO READINGS:
- "the extension of the guidelines" (оба пункта, первое упоминание): какое именно расширение, не сказано. Скорее всего, то, выбор которого отзывается (из заголовка).
- "where" (оба пункта): (а) условие «в том случае, когда» (более вероятно); (б) место.
- "they" (пункт 2): `fields` расширения схемы проекта.
- "set conditions for a kind": (а) задают условия, которым должны отвечать узлы этого типа (более вероятно); (б) задают условия, при которых тип узла допустим.

LANGUAGE:
- "set conditions for a kind" → "set conditions on a kind" — "set conditions on" is the usual way to say what is required of a thing. Not sure the replacement keeps the meaning exactly, because the original may mean "for the kind's nodes".
- "a kind that the `kinds` of the schema of that extension of the guidelines add" → "a kind of node that the `kinds` of the schema of that extension of the guidelines add" — a bare "kind" has no object. The terms file requires "kind of node".

### english-group6e.md · s-7unxytshhc4md54
TRANSLATION:
1. Если хуки репозитория раньше запускались из другого места, то есть из `.git/hooks/` или из другой папки, на которую указывал `core.hooksPath`, `sheriff init` называет каждый найденный там хук, кроме образцов хуков git.
2. Он называет каждую папку `.githooks/<hook>.d/`, которую оставляет на месте, и сообщает, что собственные инструменты проекта в этой папке (§s-n4m5zvh96yb299p) больше не запускаются.
3. Без слияния union git сообщил бы о конфликте в этом файле.

TWO READINGS:
- "elsewhere" (пункт 1): иначе чем откуда? Из контекста — не из `.githooks/`; в самом тексте это не названо.
- "another folder that `core.hooksPath` pointed to": другая, чем `.git/hooks/`; указывала до запуска `sheriff init`.
- "names" (пункты 1 и 2): (а) выводит в отчёте имя (более вероятно); (б) присваивает имя.
- "there" (пункт 1): в старом месте запуска хуков.
- "It" (пункт 2): `sheriff init`.
- "that folder" (пункт 2): папка `.githooks/<hook>.d/`, оставленная на месте.
- "no longer run" (пункт 2): (а) перестают запускаться после `sheriff init`, хотя раньше запускались (более вероятно); (б) вообще не запускаются.
- "the union merge" (пункт 3): о каком слиянии речь, в отрывке не сказано. Скорее всего, это драйвер слияния `union` для файла `specs/_approvals.jsonl` в `.gitattributes`.
- "that file" (пункт 3): файл не назван. Скорее всего, `specs/_approvals.jsonl`.
- "Without the union merge": это условие «если бы не было слияния union» (гипотетическое).

LANGUAGE:
- "Without the union merge" → "Without the `union` merge driver" — the merge is not defined in the passage, and a bare "the union merge" reads as a kind of merge, not a configured git setting. Not sure which setting is meant, so the replacement may change the meaning.
- "that file" → "`specs/_approvals.jsonl`" — the antecedent is not in the sentence or the paragraph. Not sure the file is the one I guess.

### english-group6e.md · proposal:s-gb8s9657a65hqmv-g6
TRANSLATION: при запуске, который архивирует или удаляет правило `project.json`, уточняющее правило о статусе одобрения спецификации, — независимо от того, одобрено ли архивируемое или удаляемое правило или оно черновик (draft), — если в `project.json` не остаётся правила, уточняющего правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется правило в статусе draft о том, когда тесты запускаются, которое пишет `sheriff init` (§s-7unxytshhc4md54);

TWO READINGS:
- "the run": запуск чего, не сказано. Из заголовка — запуск `sheriff reindex`.
- "that refines the rule on the specification's approval status": (а) относится к "a rule of `project.json`" (более вероятно); (б) к "project.json" (бессмысленно).
- "whether the archived or deleted rule is approved or a draft": оговорка о том, что условие не зависит от статуса одобрения удаляемого правила.
- "the rule on when the tests must pass" и "the draft rule on when the tests run": (а) два разных правила: первое — требование о том, когда тесты должны проходить; второе — правило о том, когда они запускаются (более вероятно, судя по "draft rule" и разным ссылкам); (б) одно и то же правило.
- "which `sheriff init` writes": (а) относится к "the draft rule" — правило, которое пишет `sheriff init` (более вероятно); (б) к "when the tests run".
- "is added": кем добавляется, не сказано. Скорее всего, тем же запуском reindex.
- "the top node of `project.json`": (а) корневой узел файла (более вероятно); (б) первый узел верхнего уровня.

LANGUAGE:
- "is left holding no rule" → "is left with no rule" — "left holding" suggests an agent that holds something. The usual phrase is "left with".
- "in the run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether the archived or deleted rule is approved or a draft, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;" → split the condition from the action, for example "when a run archives or deletes ... and `project.json` is left with no rule that refines ..., the draft rule ... is added ..." — the main subject "the draft rule" comes too late behind two nested conditions and an aside. Not sure the replacement keeps the meaning, because the original attachment of "in the run" is unclear.
- "the draft rule on when the tests run" → "the draft rule on when the tests run" needs a distinction from "the rule on when the tests must pass" — two similar phrases for rules that are probably different. Not sure of the fix without knowing the author's meaning.
