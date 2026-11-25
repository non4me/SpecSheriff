// Node 2.5 "The archive", the reviewer's report on the six proposals:
// - P2: "Each of these nodes", and "even where something cites it", so that the phrase cannot be read as opening the list;
// - P5: only "and is approved anew", as the owner ruled; the exception that bars an agent belongs in 1.3.6 (rule 7.7);
// - P6: restoration named again as a purpose of the archive; the last wording shows which reasoning proved mistaken;
//   "anything relying on an archived node could break" in place of a ban that the text never states (rule 1.2.3);
//   "For that reason" in place of a second "So".
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["2.5"].proposals;
if (p.length !== 6) throw new Error("2.5: expected six proposals");

p[1].en = "Each of these nodes is deleted outright, even where something cites it:\n\n- a section with no node left in it;\n- a node that was never approved.";

p[4].where = "текст, последнее предложение вместо нынешнего";
p[4].en = "A node restored from the archive returns to the specification as a new node, with a new sid, and is approved anew.";
p[4].ru = "Узел, восстановленный из архива, возвращается в спецификацию как новый узел, с новым sid, и одобряется заново.";
p[4].why =
  "Ваше решение: восстановленный узел одобряется заново, а текст этого не говорит. Запрет агенту одобрять такой узел от имени ответственного относится к правилу 1.3.6 и будет предложен там, когда до него дойдёт очередь.";

p[5].en =
  "The archive keeps the removed rules that the code may have implemented, so that each can be restored. It also keeps what later work can learn from them. The last wording of such a rule shows which line of reasoning or which approach to its problem proved mistaken. A node that was never approved was never implemented, and a section requires nothing, so in the archive either would only bury the rules that had to be removed.\n\n" +
  "A node may be deleted from the archive at any time, so anything relying on an archived node could break. For that reason, an archived node has no sid by which anything could name it. For the same reason, it names as its replacement only a node of the specification. A sid kept in the archive could also come back into the specification in a copy of its node, and would then name two nodes.";
p[5].ru =
  "Архив хранит удалённые правила, которые код мог реализовать, чтобы каждое можно было восстановить. Он также хранит то, чему по ним может научиться дальнейшая работа. Последняя формулировка такого правила показывает, какая логика или какой подход к задаче этого правила оказались ошибочными. Узел, на который никогда не давали одобрения, никогда не реализовывался, а раздел ничего не требует, поэтому в архиве и тот и другой лишь заслоняли бы правила, которые пришлось убрать.\n\n" +
  "Узел могут удалить из архива в любой момент, поэтому всё, что опирается на архивный узел, может сломаться. Из-за этого у архивного узла нет sid, по которому что-либо могло бы его назвать. По той же причине он называет своей заменой только узел спецификации. К тому же sid, оставленный в архиве, мог бы вернуться в спецификацию в копии своего узла и тогда называл бы два узла.";
p[5].why +=
  " Принимается вместе с предложением 3: новое обоснование уже не говорит о последней формулировке, и без предложения 3 об этом не скажет ничто.";

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");

const q = new URL("fix-newform-227.mjs", import.meta.url);
const t = fs.readFileSync(q, "utf8");
const old = "// - the former sid kept in no form (the owner's ruling of 2026-11-12);";
if (t.split(old).length !== 2) throw new Error("fix-newform-227.mjs: the comment line is not found exactly once");
fs.writeFileSync(q, t.replace(old, "// - the former sid not kept in any form (the owner's ruling of 2026-11-12);"));
console.log(p.map((x, i) => i + 1 + ". " + x.where).join("\n"));
