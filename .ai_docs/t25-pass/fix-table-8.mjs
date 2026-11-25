// Records, for the page of 10.1, what changed in its head against the node as spec.json holds it (5.1).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
t.head.changes = [
  "Тип. Был обычный текстовый узел с двумя таблицами в тексте; теперь TableRule — одна таблица, строки в двух группах. Заголовки групп — бывшие заголовки двух таблиц.",
  "Заголовок. Был «What is checked, when, and what a failure costs»; «when» ушло: «когда» говорят согласованный 1.6.1 и 10.2.",
  "Первый абзац. Был «Two things are checked mechanically: … The checks run when a commit is made. The tests of the system's code run at a push while the specification is approved.» — это теперь в согласованном 1.6.1. Вместо него — какие проверки стоят в таблице: после правки агента, при коммите, при push. Отказ правке до того, как она сделана, — отдельный узел, его в таблице нет.",
  "Фраза о правиле собственного типа в проекте — новая.",
  "Абзац о том, что читает проверка. Был «Each check reads the commit being made, and the history behind it where its row says so. It never reads what the commit does not hold.» После правки агента коммита ещё нет, а «ничего, кроме коммита» запрещало то, что строки читают: guidelines, их схему и сообщение коммита. Теперь: что проверка читает как свой коммит в каждый момент, и что ещё она читает кроме него.",
  "«A check refuses unless its row says otherwise» удалено: это говорит согласованный 1.6.1, а цену каждая строка называет сама.",
  "Пример — новый.",
  "Обоснование. Было пять абзацев; осталось то, зачем существует таблица. Абзацы о двоичных проверках и о тестах при push — в обосновании согласованного 1.6.1. Почему некоторые проверки только сообщают (расхождение, неимплементированное правило и другие), перейдёт в обоснования этих проверок, когда до них дойдём.",
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("changes", t.head.changes.length);
