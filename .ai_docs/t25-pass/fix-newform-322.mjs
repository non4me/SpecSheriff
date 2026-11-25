// Node 12.4.2, the proposal of fix-newform-321.mjs: its first sentence takes the owner's words of 2026-11-14, «как домены
// взаимосвязаны» instead of «какими доменами пользуется каждый домен». The citation of the domain's header (12.2.3), which
// states a domain's links to the domains it uses, says what "connected" means.
// Node 12.4.1, agreed: the English alone is brought into line after the EngStickler reader's report. "That list" had no
// noun "list" before it, and "the levels are assigned" did not say to what. The Russian does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

const p = d["12.4.2"].proposals[0];
p.en = swap(p.en, "that shows which domains each domain uses (§s-yggv9myedprnaa7).", "that shows how the domains are connected (§s-yggv9myedprnaa7).");
p.ru = swap(p.ru, "на которой видно, какими доменами пользуется каждый домен (§s-yggv9myedprnaa7).", "на которой видно, как домены взаимосвязаны (§s-yggv9myedprnaa7).");

const n = d["12.4.1"];
n.text = swap(n.text, "That list runs from the top of the hierarchy down.", "The list of levels runs from the top of the hierarchy down.");
n.text = swap(n.text, "By default, the levels are assigned from the general to the particular.", "By default, the levels are assigned to the domains from the general to the particular.");
n.changes.push("Только английский текст, по замечаниям читателя: «That list» стало «The list of levels», а «the levels are assigned» — «the levels are assigned to the domains». Смысл узла не изменился.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru.split("\n")[2], "\n", n.text);
