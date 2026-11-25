// Node 12.3.1: the owner proposed «Исключение — фрагмент формата…» (2026-11-14). "A fragment of a format" says at once that
// it is only ever part of other formats, which keeps out a whole format such as a user's, so the exception takes the
// owner's words. The text says that fragments are declared in the contracts section and that any domain may reuse them.
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
  "The exception is a shared fragment: a format that is only ever part of other formats, such as an address. A shared fragment is declared in the contracts section (§s-z6tq6a3btnvvwx7), and any domain may reuse it.",
  "The exception is a fragment of a format, such as an address. Fragments are declared in the contracts section (§s-z6tq6a3btnvvwx7), and any domain may reuse them.",
);
p.ru = swap(
  p.ru,
  "Исключение — общий фрагмент: формат, который бывает только частью других форматов, например адрес. Общий фрагмент объявляется в контрактах (§s-z6tq6a3btnvvwx7), и его может переиспользовать любой домен.",
  "Исключение — фрагмент формата, например адрес. Фрагменты объявляются в контрактах (§s-z6tq6a3btnvvwx7), и их может переиспользовать любой домен.",
);
p.why = "See fix-newform-282.mjs to fix-newform-297.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1: the exception in the owner's words");
