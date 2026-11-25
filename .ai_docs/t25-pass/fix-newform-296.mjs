// Node 12.3.1: the owner meant that a shared fragment can be reused anywhere (2026-11-14: «тут как раз был смысл что можно
// переиспользовать фрагмент где угодно»). So the exception no longer limits the fragment to several domains. It is a shared
// fragment, a format that is only ever part of other formats, such as an address, declared in the contracts section, and
// any domain may reuse it. "Only ever part of other formats" keeps out a whole format such as a user's, which another
// domain also reuses. A fragment that only one domain needs then also stands in the contracts section, which node 3.1
// keeps for what more than one section needs, a term excepted; so 12.3.1 is to carry an `overrides` link to 3.1, which its
// text already cites (12.1.2).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(
  p.en,
  "The exception is a shared format used only as part of the formats of several domains. An address is an example. Such a format is declared in the contracts section (§s-z6tq6a3btnvvwx7).",
  "The exception is a shared fragment: a format that is only ever part of other formats, such as an address. A shared fragment is declared in the contracts section (§s-z6tq6a3btnvvwx7), and any domain may reuse it.",
);
p.ru = swap(
  p.ru,
  "Исключение — общий формат, который используется только как часть форматов нескольких доменов. Например, адрес. Такой формат объявляется в контрактах (§s-z6tq6a3btnvvwx7).",
  "Исключение — общий фрагмент: формат, который бывает только частью других форматов, например адрес. Общий фрагмент объявляется в контрактах (§s-z6tq6a3btnvvwx7), и его может переиспользовать любой домен.",
);
p.why = "See fix-newform-282.mjs to fix-newform-296.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1: the exception is a shared fragment");
