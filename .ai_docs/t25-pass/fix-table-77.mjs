// Check 10.1.22: the owner found «кроме раздела, вне разделов» awkward and asked for it to be reworded (2026-11-13). The
// proposal states the rule first and lists the exceptions, as agreed 4.2 does, using its names: the section on the stack
// and the technical debt section. The meaning stays as accepted.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.22");
r.proposals = [
  {
    en:
      "Every node of the technical appendix implements a node of the base specification. The exceptions are:\n" +
      "- a section;\n- a node in the section on the stack;\n- a node in the technical debt section.",
    ru:
      "Каждый узел технического приложения реализует узел базовой спецификации. Исключения:\n" +
      "- раздел;\n- узел в разделе стека;\n- узел в разделе технического долга.",
    why:
      "Вы попросили переформулировать: «кроме раздела, вне разделов» звучит криво. Сначала правило, затем исключения списком, как в согласованном 4.2 и с его названиями разделов. Смысл тот же.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| proposal:", r.proposals[0].en.replace(/\n/g, " / "));
