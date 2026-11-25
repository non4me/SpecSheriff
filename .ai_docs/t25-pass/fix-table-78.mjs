// Check 10.1.22: the owner asked what sense it makes that all three exceptions speak of a section, the first of any
// section and the other two of particular ones (2026-11-13). The first exception is the section node itself, by its kind;
// the other two are the nodes in two particular sections, by their place. The new proposal keeps the two apart: one
// sentence excludes a section by kind, the next exempts the nodes of the two sections by place.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.22");
r.proposals = [
  {
    en:
      "Every node of the technical appendix other than a section implements a node of the base specification. " +
      "Nodes in the section on the stack and in the technical debt section are exempt.",
    ru:
      "Каждый узел технического приложения, кроме раздела, реализует узел базовой спецификации. " +
      "Узлы в разделе стека и в разделе технического долга от этого освобождены.",
    why:
      "Вы спросили, какой смысл в трёх исключениях, если во всех говорится о разделе. Исключения разного рода. Первое — сам узел-раздел, любой: раздел ничего не требует (8.1), и реализовывать ему нечего. " +
      "Два других — не разделы, а узлы внутри двух определённых разделов. В одном списке они смешивались. Теперь первое предложение исключает раздел по его типу, второе освобождает узлы двух разделов по месту.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| proposal:", r.proposals[0].en);
