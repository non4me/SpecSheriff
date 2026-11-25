// Applies the reviewer's findings of 2026-11-07 to newform.json.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const rep = (n, f, a, b) => {
  if (!d[n][f].includes(a)) throw new Error(`${n}.${f}: ${a.slice(0, 60)}`);
  d[n][f] = d[n][f].replace(a, b);
};

// 1.1.1
d["1.1.1"].reason = "A rule held in a node can be cited, linked, approved and checked. Held nowhere else, each rule exists in one version.";
d["1.1.1"].ruReason = "Правило, хранимое в узле, можно процитировать, связать, одобрить и проверить. Нигде больше не хранимое, каждое правило существует в одной версии.";

// 1.1.2
rep("1.1.2", "text", "Each part answers a question of its own:", "Each part of the specification answers a question of its own:");
rep("1.1.2", "ruText", "Каждая часть отвечает на свой вопрос:", "Каждая часть спецификации отвечает на свой вопрос:");
rep("1.1.2", "reason", "The three answers change at different rates.", "The answers change at different rates.");
rep("1.1.2", "reason", "changes with its business logic.", "changes with its business logic or its core functionality.");
rep("1.1.2", "reason", "Held apart, each part changes without touching the others.", "Held apart, each part changes at its own rate.");
rep("1.1.2", "ruReason", "Три ответа меняются с разной скоростью.", "Ответы меняются с разной скоростью.");
rep("1.1.2", "ruReason", "меняется вместе с её бизнес-логикой.", "меняется вместе с её бизнес-логикой или основной функциональностью.");
rep("1.1.2", "ruReason", "Когда части разделены, каждая меняется, не задевая другие.", "Когда части разделены, каждая меняется со своей скоростью.");

// 1.2.3 and 7.9
d["1.2.3"].reason = "Mixed in one text, a rule is long. A reader cannot tell which half of it is being asserted.\n\nNobody sees that a reason has stopped holding while it is buried inside the requirement.";
d["1.2.3"].ruReason = "Смешанное в одном тексте, правило становится длинным. Читатель не может понять, какая его половина утверждается.\n\nНикто не видит, что обоснование перестало держаться, пока оно похоронено внутри требования.";
d["1.2.3"].changes = [
  "Заголовок — ваш, из комментария.",
  "Текст — абзацы 1–2 нынешнего 1.12, дословно. Абзац 3 уходит в 7.9.",
  "Обоснование — абзац 1 нынешнего, дословно. В абзаце 2 первая фраза уходит в 7.9, а вторая переписана, чтобы не опираться на неё: «Nobody sees that a reason has stopped holding while it is buried inside the requirement».",
  "Сохраняет sid 1.12.",
];
d["7.9"].title = "Revising a rule starts with its reason";
d["7.9"].reason = "A reason that has stopped holding is the surest sign the rule should go. Reworded instead, the rule would keep a requirement nothing grounds any more.";
d["7.9"].ruReason = "Обоснование, которое перестало держаться, — вернейший признак того, что правилу пора уйти. Переформулированное вместо этого, правило сохранило бы требование, которое больше ничем не обосновано.";
d["7.9"].changes = [
  "Заголовок новый.",
  "Текст — абзац 3 нынешнего 1.12, дословно.",
  "Обоснование — первая фраза абзаца 2 нынешнего обоснования 1.12, дословно, и новая фраза о том, почему такое правило не переформулируют.",
];

// 1.2.4
d["1.2.4"].title = "Everything that bears on a node is kept in that node";
d["1.2.4"].ruTitle = "Всё, что касается узла, хранится в этом узле";
d["1.2.4"].text = "Everything that bears on a node is kept in that node:\n\n- its reason;\n- its links;\n- the decisions taken on it;\n- the work put off on it;\n- the comments on it.\n\nNone of it is kept in a document of its own.";
d["1.2.4"].ruText = "Всё, что касается узла, хранится в этом узле:\n\n- его обоснование;\n- его связи;\n- решения, принятые по нему;\n- работа, отложенная по нему;\n- комментарии к нему.\n\nНичто из этого не хранится в отдельном документе.";
d["1.2.4"].reason = "A node is read on its own. What bears on it and is kept elsewhere is missed by whoever reads the node. Kept apart, it also changes unseen.";
d["1.2.4"].ruReason = "Узел читают сам по себе. То, что его касается и хранится в другом месте, упускает тот, кто читает узел. Хранимое отдельно, это к тому же меняется незаметно.";

// 1.3.1, 9.4, 9.5
rep("1.3.1", "text", "A node is approved by one of its owners and by nobody else.", "A node is approved by one of its owners, or in an owner's name as §[9.5] allows, and by nobody else.");
rep("1.3.1", "ruText", "Узел одобряет один из его owners, и никто другой.", "Узел одобряет один из его owners или, как позволяет §[9.5], агент от имени owner, и никто другой.");
d["1.3.1"].sid = "kept";
d["1.3.1"].changes = [
  "Заголовок — нынешний 1.7.",
  "Текст — абзац 2 нынешнего 1.7, дословно, и вставка «or in an owner's name as §9.5 allows»: исключение, которое ушло в 9.5, названо в правиле, которое оно сужает.",
  "Обоснование — абзац 1 нынешнего 1.7, дословно.",
  "Сохраняет sid 1.7.",
];
d["9.4"].reason = "The owners are those who answer for a rule and approve it (§[1.3.1]). " + d["9.4"].reason;
d["9.4"].ruReason = "Owners — те, кто отвечает за правило и одобряет его (§[1.3.1]). " + d["9.4"].ruReason;
d["9.4"].changes.push("В начало обоснования добавлена фраза о том, кто такие owners, со ссылкой на 1.3.1: прежнее основание осталось там.");
d["9.4"].sid = "new";
d["9.5"].title = "An agent approves, in an owner's name, a change that states nothing new";
d["9.5"].sid = "new";

// 1.4.1
d["1.4.1"].sid = "kept";
d["1.4.1"].changes = d["1.4.1"].changes.filter(c => !c.startsWith("Какая часть")).concat(["Сохраняет sid 3.4."]);

// 10.4
rep("10.4", "reason", "It is refused where the change is made, which is when a test costs least to write.", "A change that leaves it so is refused where it is made, which is when a test costs least to write.");
rep("10.4", "reason", "(§s-kh8qcd5kxgh9z3j)", "(§s-kh8qcd5kxgh9z3j, §[11.2])");
rep("10.4", "ruReason", "Такое изменение отклоняется там, где его делают: тогда тест дешевле всего написать.", "Изменение, которое оставляет его таким, отклоняется там, где его делают: тогда тест дешевле всего написать.");
rep("10.4", "ruReason", "(§s-kh8qcd5kxgh9z3j)", "(§s-kh8qcd5kxgh9z3j, §[11.2])");
d["10.4"].sid = "new";
d["10.4"].changes = [
  "Заголовок новый.",
  "Текст — абзац 3 нынешнего 3.4, дословно.",
  "Обоснование — вторая и третья фразы абзаца 4 и абзац 3 нынешнего обоснования 3.4. «Both are refused where the change is made» → «A change that leaves it so is refused where it is made»: второй случай ушёл в 1.5.2. К ссылке на 11.1 добавлена ссылка на 11.2, где сказано об ожидании.",
];

// 1.5.1 and 10.7
d["1.5.1"].sid = "new";
d["1.5.1"].changes = d["1.5.1"].changes.filter(c => !c.startsWith("Какая часть"));
d["10.7"].sid = "kept";
d["10.7"].changes.push("Сохраняет sid 3.2: на эту часть указывают проверки и ссылки о том, что раздел и заголовок домена ничего не требуют.");

// 1.5.2, 10.5, 10.6
rep("1.5.2", "text", "carries a SpecTag naming the node it implements.", "carries a SpecTag naming the node it implements, or, where it implements none, the SpecTag that says so (§[10.5]).");
rep("1.5.2", "ruText", "связан SpecTag с узлом, который он реализует.", "связан SpecTag с узлом, который он реализует, а если не реализует никакого, на нём стоит SpecTag, который говорит об этом (§[10.5]).");
d["1.5.2"].ruTitle = "На каждом символе и каждом тесте стоит SpecTag";
d["1.5.2"].sid = "kept";
d["1.5.2"].changes = [
  "Заголовок новый: вторая половина нынешнего заголовка 3.5 («and what carries no rule says so») уходит в 10.5.",
  "Текст — абзац 1 нынешнего 3.5 и первая фраза абзаца 2 нынешнего 3.4, дословно, и вставка «or, where it implements none, the SpecTag that says so (§10.5)»: исключение, которое ушло в 10.5, названо в правиле, которое оно сужает.",
  "Обоснование — абзац 1 обоснования 3.5, а из обоснования 3.4 — вторая и третья фразы абзаца 1, первая фраза абзаца 4 и абзац 2, дословно.",
  "Сохраняет sid 3.5.",
];
rep("10.5", "text", "Such a symbol carries instead a SpecTag that names no node and gives its reason.", "Such a symbol carries a SpecTag that names no node and gives its reason.");
rep("10.5", "ruText", "На таком символе вместо этого стоит SpecTag", "На таком символе стоит SpecTag");
d["10.5"].sid = "new";
d["10.5"].changes = [
  "Заголовок — вторая половина нынешнего заголовка 3.5.",
  "Текст — абзац 2 нынешнего 3.5, дословно, без «instead»: то, вместо чего, осталось в 1.5.2.",
  "Обоснование — абзац 2 обоснования 3.5, дословно.",
];
rep("10.6", "text", "carries the SpecTag of an approved node.", "carries the SpecTag of an approved node it is written from (§[1.5.2]).");
rep("10.6", "ruText", "связан SpecTag с одобренным узлом.", "связан SpecTag с одобренным узлом, из которого он написан (§[1.5.2]).");
d["10.6"].sid = "new";
d["10.6"].changes[0] = "Текст — абзац 3 нынешнего 3.5, вторая фраза абзаца 2 и абзац 4 нынешнего 3.4, дословно, кроме «of an approved one» → «of an approved node it is written from (§1.5.2)»: слова, к которым отсылало «one», остались в 1.5.2.";

// 5.4 and 5.5
d["5.4"].ruTitle = "Раздел содержит правила и ничего не требует";
d["5.4"].changes.unshift("Заголовок: «A section holds rules» — вторая половина нынешнего заголовка 1.3, а «and requires nothing» — новые слова, из абзаца 2 его текста.");
rep("5.5", "reason", "A node is cited by its sid instead (§[1.2.2]), since a reference to a place breaks whenever the place changes.", "A location changes whenever its node moves, so a citation by it would break (§[1.2.2]).");
rep("5.5", "ruReason", "Ссылаются же на узел по его sid (§[1.2.2]), поскольку ссылка на место ломается, как только место меняется.", "Расположение меняется всякий раз, когда узел переносят, поэтому ссылка по нему сломалась бы (§[1.2.2]).");

// 5.9 and 5.10
rep("5.9", "reason", "Its author tells the reader whom to ask.", "An item's date orders the listing (§[5.10]). Its author tells the reader whom to ask.");
rep("5.9", "ruReason", "Её автор подсказывает читателю, кого спросить.", "Дата элемента задаёт порядок списка (§[5.10]). Его автор подсказывает читателю, кого спросить.");
d["5.9"].changes[1] = "Обоснование: «Kept in a comment or a document, it is missed by the listing» → «Kept in a comment, it is missed by the listing of every item (§5.10)». К «An item's date orders the listing» добавлена ссылка на 5.10. Остальное дословно.";
d["5.10"].title = "Every item of work put off can be listed at once, the newest first";
d["5.10"].ruTitle = "Всю отложенную работу можно вывести одним списком, новое сверху";
d["5.10"].reason = "Listed together, the items show what waits across the specification. The newest stand first: each older item was weighed at every listing since, a new one at none.";
d["5.10"].ruReason = "Собранные вместе, элементы показывают, что ждёт по всей спецификации. Новые стоят первыми: каждый более старый элемент взвешивали при каждом выводе списка с тех пор, а новый — ни разу.";
d["5.10"].changes = ["Заголовок новый.", "Текст — абзац 3 нынешнего 1.11, обоснование — абзац 3 его обоснования, дословно."];

// 10.2
d["10.2"].reason = "Read whole, a domain shows the gaps and the contradictions between its rules, which no single rule shows. Found before the code is written, they are settled in the specification, not guessed in the code.";
d["10.2"].ruReason = "Прочитанный целиком, домен показывает пробелы и противоречия между своими правилами, которых не показывает ни одно правило в отдельности. Найденные до того, как написан код, они решаются в спецификации, а не угадываются в коде.";

// 1.6.1 and 12.1
d["1.6.1"].title = "What the checks hold, and when they run";
d["1.6.1"].ruTitle = "Что держат проверки и когда они запускаются";
d["1.6.1"].reason += " No test runs at a push while the specification is a draft, for the reason §s-xhcmchcngykvn2k gives.";
d["1.6.1"].ruReason += " Пока спецификация — черновик, при push не запускается ни один тест, по причине, которую даёт §s-xhcmchcngykvn2k.";
d["1.6.1"].changes = [
  "Заголовок новый, чтобы не совпадать с заголовком таблицы в 12.1.",
  "Текст — абзацы 1–2 нынешнего 5.1, дословно.",
  "Обоснование — абзац 2, вторая фраза абзаца 3 и последняя фраза абзаца 5 нынешнего обоснования, дословно.",
];
rep("12.1", "text", "Each check reads the commit being made", "Every check, with what its failure costs, is a row of the tables below.\n\nEach check reads the commit being made");
rep("12.1", "ruText", "Каждая проверка читает делаемый коммит", "Каждая проверка вместе с тем, чего стоит её отказ, — строка таблиц ниже.\n\nКаждая проверка читает делаемый коммит");
rep("12.1", "reason", " No test runs at a push while the specification is a draft, for the reason §s-xhcmchcngykvn2k gives.", "");
rep("12.1", "ruReason", " Пока спецификация — черновик, при push не запускается ни один тест, по причине, которую даёт §s-xhcmchcngykvn2k.", "");
d["12.1"].changes = [
  "Заголовок — нынешний 5.1.",
  "Текст — новая первая фраза, вводящая таблицы, затем абзацы 3–4 нынешнего 5.1 и обе таблицы, дословно.",
  "Обоснование — абзацы 1 и 4, первая фраза абзаца 3 и первые две фразы абзаца 5 нынешнего обоснования, дословно. Последняя фраза абзаца 5 ушла в 1.6.1.",
  "Сохраняет sid 5.1.",
];

// 11.1
rep("11.1", "text", "is regenerated after every change to them. It is never edited.", "is regenerated after every change to them, unless it waits for them (§[11.2]). It is never edited.");
rep("11.1", "text", "checked against what the nodes produce, unless it waits for them (§[11.2]).", "checked against what the nodes produce, unless it waits.");
rep("11.1", "ruText", "Всё это генерируется заново после каждого изменения узлов.", "Всё это генерируется заново после каждого изменения узлов, если только оно не ждёт их (§[11.2]).");
rep("11.1", "ruText", "если только она не ждёт их (§[11.2]).", "если только она не ждёт.");
d["11.1"].changes = [
  "Заголовок новый.",
  "Текст — абзацы 2 и 4 нынешнего 1.1, дословно, и вставка «unless it waits for them (§11.2)» в первую фразу: исключение, которое ушло в 11.2, названо в правиле, которое оно сужает.",
  "Обоснование — абзацы 1–2 нынешнего обоснования 1.1, дословно.",
  "Сохраняет sid 1.1: на копии указывают шесть ссылок из девяти и тест экспорта. Три ссылки об ожидании, из 10.4, 11.4 и описания хуков, перейдут на 11.2.",
];

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("applied");
