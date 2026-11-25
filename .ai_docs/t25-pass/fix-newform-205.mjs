// The owner of 2026-11-11 on 9.7: an exemption holds only through an approved node whose text cites what it
// exempts, as agreed 6.3 holds a `cites` link, so that no `exempts` link added unseen to an approved node exempts
// a rule nobody approved exempting. The chosen words are split into one thought a sentence (7.5), no meaning changed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.7"];
if (b.sidValue !== "s-gf6n8ge4mke3pr2" || b.agreed) throw new Error("unexpected 9.7");

b.text += "\n\nThe exempting node's text cites each rule, node or section it exempts. An `exempts` link stands only where that text cites its target. An exemption holds only while the exempting node is approved.";
b.ruText += "\n\nТекст освобождающего узла ссылается на каждое правило, узел или раздел, которые он освобождает. Связь `exempts` стоит только там, где этот текст ссылается на её цель. Освобождение действует, только пока освобождающий узел одобрен.";
b.changes.push("Новое по вашему решению: текст освобождающего узла ссылается на каждую цель освобождения, связь `exempts` стоит только там, где он на неё ссылается, и освобождение действует, только пока освобождающий узел одобрен. Так же согласованный 6.3 держит связь `cites`. Выбранные слова разделены на три фразы по одной мысли (7.5), смысл тот же.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
