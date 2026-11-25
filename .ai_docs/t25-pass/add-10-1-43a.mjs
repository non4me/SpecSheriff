// Applies the rule reviewer's fixes to the drafts of rows 10.1.43a and 10.1.43b in draft-10-1-43ab.json, and puts row
// 10.1.43a into the main table of checks after row 10.1.43, as a new row that waits for the owner's decision. Row
// 10.1.43b stays in the draft file: it reads no code, so it goes to the group "The specification alone" as 10.1.25a, and
// it is proposed after the principle's third item is settled, since its scope depends on that item.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const draftPath = new URL("draft-10-1-43ab.json", here);
const d = JSON.parse(fs.readFileSync(draftPath, "utf8"));
const [a, b] = d.rows;
if (a.num !== "10.1.43a" || b.num !== "10.1.43b") throw new Error("the draft rows are not 10.1.43a and 10.1.43b");

a.en = swap(a.en, "through a chain of `implements` links, do", "through a chain of `implements` links (§s-sn6au3vcr9uy5pm), do", "43a en");
a.ru = swap(a.ru, "через цепочку связей `implements`, делают", "через цепочку связей `implements` (§s-sn6au3vcr9uy5pm), делают", "43a ru");
a.reason = "Without this check, a commit could leave a rule's tests and code behind its new wording, and escape the cost of that lag, merely by stating that the rule's implementation needs no change.";
a.ruReason = "Без этой проверки коммит мог бы оставить тесты и код правила отстающими от его новой формулировки и избежать цены этого отставания, просто заявив, что реализацию правила менять не нужно.";
a.change += " Рецензент правил проверил строку: добавлена ссылка на узел о связях; обоснование говорит одной фразой и о проверке, и о цене.";

b.num = "10.1.25a";
b.en = "A node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in a commit and has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification refines the rules of the base specification that it implements. Such a node contradicts no rule of the base specification";
b.ru = "Узел технического приложения (§s-qmmzf9nksfsa3qp), который одобрен в коммите и имеет связь `implements` (§s-sn6au3vcr9uy5pm) с правилом базовой спецификации, уточняет реализуемые им правила базовой спецификации. Такой узел не противоречит ни одному правилу базовой спецификации";
b.cost = "refused, naming the node and each rule of the base specification that the node contradicts, or that it implements without refining it";
b.ruCost = "отклоняется с названием узла и каждого правила базовой спецификации, которому узел противоречит или которое он реализует, не уточняя его";
b.reason = swap(b.reason, "before that code is written.", "before code written from it is committed.", "43b reason");
b.ruReason = swap(b.ruReason, "до того, как этот код написан.", "до того, как код, написанный по нему, попадёт в коммит.", "43b ruReason");
b.change += " Рецензент правил проверил строку: она не читает код, поэтому стоит в группе «Только спецификация» как 10.1.25a; текст разделён на два предложения; добавлены ссылки на узлы о структуре спецификации и о связях.";
d.note += " Row 10.1.43b became 10.1.25a, in the group 'The specification alone', since it reads no code.";
fs.writeFileSync(draftPath, JSON.stringify(d, null, 2) + "\n");

const tablePath = new URL("table-10-1.json", here);
fs.copyFileSync(tablePath, new URL("table-10-1.before-10-1-43a.json", here));
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const group = t.tables[1];
if (group.heading !== "The specification and the code") throw new Error("group 2 is not 'The specification and the code'");
if (t.tables.flatMap(g => g.rows).some(r => r.num === "10.1.43a")) throw new Error("row 10.1.43a is already in the table");
const at = group.rows.findIndex(r => r.num === "10.1.43");
if (at < 0) throw new Error("row 10.1.43 not found");
group.rows.splice(at + 1, 0, a);
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*If the session is interrupted, the next session starts by\*\* reading the report of the rule reviewer[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the new row 10.1.43a of the main table of checks, which stands after row 10.1.43 in table-10-1.json and on the page of the main table of checks. The row checks the reviewer's judgement on a commit message that states that a rule's implementation needs no change. Then the agent proposes the new wording of the third item in the principle's list of the reviewer's judgements, and after it row 10.1.25a, the check of the reviewer's judgement on an approved node of the technical appendix, kept in draft-10-1-43ab.json, since the scope of that row depends on the third item. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.\n\n**The page of the main table of checks** is now at https://claude.ai/artifact/TABLE_PAGE_URL, published as two files, table-page/index.html and table-page/page.js. split-table-page.mjs writes both from table-10-1.html after gen-table-10-1.mjs has run. A later session reads only index.html with the Artifact tool, lists the artifact's files, and republishes both files to that URL. The earlier page, Hku1cffdcWxNGnTUaqpJXH, is no longer updated.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "The agent decided to propose two new rows, 10.1.43a and 10.1.43b, one for each new judgement, rather than broaden row 10.1.43, since each judgement can be made without the others (node 7.3.3, s-6j8ystpj2yzcchq). Their drafts are in draft-10-1-43ab.json; the rule reviewer checks them before each is shown to the owner separately;",
  "The agent decided to propose two new rows, one for each new judgement, rather than broaden row 10.1.43, since each judgement can be made without the others (node 7.3.3, s-6j8ystpj2yzcchq); the rule reviewer agreed. Row 10.1.43a, on the statement that a rule's implementation needs no change, is proposed to the owner and waits for the owner's decision; its cost is that of row 10.1.40, since the statement takes the place of the changes that row 10.1.40 requires. The other row reads no code, so it goes to the group \"The specification alone\" as row 10.1.25a; its draft, with the rule reviewer's fixes, is in draft-10-1-43ab.json. It is proposed after the third item of the principle, below, since its scope depends on that item. The rule reviewer also found that node 10.5 refuses a commit without a readable answer from the reviewer only where the commit changes code, which is the item on node 10.5 below;",
  "table item");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "draft-10-1-43ab.json holds the drafts of rows 10.1.43a and 10.1.43b of the main table of checks.",
  "draft-10-1-43ab.json holds the drafts of rows 10.1.43a and 10.1.25a of the main table of checks, with the rule reviewer's fixes. add-10-1-43a.mjs puts row 10.1.43a into table-10-1.json.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o,
  "### ◐ новые строки основной таблицы проверок для двух новых суждений рецензента\n- 10.1.43a: «реализацию менять не нужно» верно\n- 10.1.43b: одобренный узел приложения уточняет реализуемые правила базы и не противоречит базе\n- по одной строке; сначала их проверяет рецензент правил\n",
  "### ◐ новая строка 10.1.43a основной таблицы проверок\n- если в сообщении коммита сказано, что реализацию правила менять не нужно, тесты и код правила делают то, что говорит его новая формулировка\n- цена — как у 10.1.40: отклоняется, пока спецификация одобрена; сообщается, пока черновик\n", "outline waiting");
o = swap(o, "- ● строки 10.1.43a и 10.1.43b основной таблицы проверок\n",
  "- ● строка 10.1.43a основной таблицы проверок\n- ○ третий пункт принципа о суждениях рецензента\n- ○ строка 10.1.25a: одобренный узел приложения уточняет реализуемые правила базы и не противоречит базе\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("row 10.1.43a added at", now);
