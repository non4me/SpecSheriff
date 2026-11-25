// The reviewer's wording of the two new nodes. "Governs" missed a term and a section, which have titles and govern nothing; a domain's
// index shows more than a title and belongs to an extension; the title of 7.10 now states the ban.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const a = d["7.4"], b = d["7.10"];
if (a.title !== "A title says what the node governs" || b.title !== "A definition says what a thing is") throw new Error("unexpected drafts");

const pagePath = new URL("base-structure.html", here);
let page = fs.readFileSync(pagePath, "utf8");
const rename = (from, to) => { if (!page.includes(from)) throw new Error("missing on the page: " + from); page = page.replace(from, to); };
rename(`"${a.title}","${a.ruTitle}"`, '"A title says what the node is about","Заголовок говорит, о чём узел"');
rename(`"${b.title}","${b.ruTitle}"`, '"No definition by negation","Никаких определений от противного"');
fs.writeFileSync(pagePath, page);

a.title = "A title says what the node is about";
a.ruTitle = "Заголовок говорит, о чём узел";
a.text = "A node's title tells a reader who sees nothing else, in a few words, what the node is about.";
a.ruText = "Заголовок узла в нескольких словах говорит читателю, который больше ничего не видит, о чём этот узел.";
a.reason = "Links and the map of the specification show a node by its title alone, so a reader chooses what to open by it.";
a.ruReason = "Связи и карта спецификации показывают узел только заголовком, и по нему читатель решает, что открыть.";

b.title = "No definition by negation";
b.ruTitle = "Никаких определений от противного";
b.text = "A definition states what the defined thing is, never only what it is not. So not “an operator is whoever is not a user”, but “an operator is a person who runs the system for its users”.";
b.ruText = "Определение говорит, что представляет собой определяемая вещь, и никогда не ограничивается тем, чем она не является. Поэтому не «оператор — это тот, кто не пользователь», а «оператор — это человек, который эксплуатирует систему для её пользователей».";
b.reason = "A definition by negation takes in everything it does not exclude, including what its author never meant.";
b.ruReason = "Определение от противного захватывает всё, чего не исключает, в том числе то, чего автор не имел в виду.";

fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(a.title, "|", b.title);
