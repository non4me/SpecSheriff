// The owner of 2026-11-12: on the page, each check shows everything bound to it — the base rules it checks and the
// nodes of the appendix of the tools implementing it, with their text and reason, and its tests — so the owner sees
// what the agent sees; a check's own reason is optional, recommended; a short note says what the check touches.
// Writes, for each check staying in 10.1, the tools nodes implementing it (`impl`), and for 10.1.1, the first shown,
// its note, its proposed reason, its tests and the Russian of its tools node.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const impl = {
  "10.1.1": ["s-7zqsstgnuc772ba"],
  "10.1.2": ["s-xzcw3hv4hmxz7h7"],
  "10.1.3": ["s-vke5hakwf3uyrjs"],
  "10.1.4": ["s-vke5hakwf3uyrjs"],
  "10.1.5": ["s-stxmhq3hgfndvn6"],
  "10.1.6": ["s-vke5hakwf3uyrjs"],
  "10.1.7": ["s-vke5hakwf3uyrjs"],
  "10.1.8": ["s-95w92rnjuv3sst8"],
  "10.1.9": ["s-95w92rnjuv3sst8"],
  "10.1.10": ["s-agc6fb3vx46pc23"],
  "10.1.11": ["s-j4webte36gkraju"],
  "10.1.12": ["s-qzyacnqwvaeaps4"],
  "10.1.13": ["s-qzyacnqwvaeaps4"],
  "10.1.14": ["s-qzyacnqwvaeaps4"],
  "10.1.15": ["s-pvnnr844f3y964m"],
  "10.1.16": ["s-agc6fb3vx46pc23"],
  "10.1.17": ["s-e2vdhfsndy5stq9"],
  "10.1.18": ["s-zhen42p6mnaxu7w"],
  "10.1.19": ["s-qvgzubkrafadqgf"],
  "10.1.20": [],
  "10.1.21": [],
  "10.1.22": ["s-yprj7d6tnvauggr"],
  "10.1.23": ["s-yprj7d6tnvauggr"],
  "10.1.24": ["s-yprj7d6tnvauggr"],
  "10.1.25": ["s-6bmnsbskg6en4nf"],
  "10.1.26": ["s-9rtrj24myzjvshu"],
  "10.1.27": ["s-j9r8z4xdrfkfs47"],
  "10.1.28": ["s-9rtrj24myzjvshu", "s-2x58az67bm6cxq2"],
  "10.1.29": ["s-9rtrj24myzjvshu"],
  "10.1.30": ["s-utf4mbt7ref8g9c"],
  "10.1.31": ["s-utf4mbt7ref8g9c", "s-2x58az67bm6cxq2"],
  "10.1.32": ["s-utf4mbt7ref8g9c"],
  "10.1.33": ["s-utf4mbt7ref8g9c"],
  "10.1.34": ["s-t383grkn3q68dpf"],
  "10.1.35": ["s-5hb9k2e34dgn284"],
  "10.1.36": ["s-cdachayybfvg4na"],
  "10.1.37": ["s-7pk89t8z6wymmj9"],
  "10.1.38": ["s-nh8b2hjvzasdxmd"],
  "10.1.39": ["s-m8nmfsxkcfu7cjp", "s-nh8b2hjvzasdxmd"],
  "10.1.40": ["s-txbwsthdqhvyzd2"],
  "10.1.41": ["s-jgejd5rpd9d43pd"],
  "10.1.42": ["s-qqs2svksmjct753", "s-2x58az67bm6cxq2"],
  "10.1.43": ["s-vp24dqydygztqbt"],
  "10.1.44": ["s-b6qdtghnyha3fhk"],
};
const rows = t.tables.flatMap((g) => g.rows);
for (const r of rows) if (r.num) {
  if (!(r.num in impl)) throw new Error(`no mapping for ${r.num}`);
  r.impl = impl[r.num];
}
const first = rows.find((r) => r.num === "10.1.1");
first.about =
  "Затрагивает каждый файл спецификации, её архива и схемы, то есть всё, что читают остальные проверки. " +
  "Если ключ записан в объекте дважды, парсер молча оставляет одно значение, и проверки работали бы не с тем, что написано в файле.";
first.reason = "Where one property is given two values, a parser silently keeps one of them, and the tools read something other than what the file says.";
first.ruReason = "Если одному свойству задано два значения, парсер молча оставляет одно из них, и инструменты читают не то, что написано в файле.";
first.tests = ["skills/tools/test/unit/validate.test.ts: refuses a file giving one field two values"];
t.toolsRu = t.toolsRu ?? {};
t.toolsRu["s-7zqsstgnuc772ba"] = {
  title: "Ключ, записанный в одном объекте дважды",
  text: "`sheriff validate` читает каждый проверяемый файл как текст и считает ключи каждого объекта.",
  reason: "Парсер оставляет одно из двух значений и молча отбрасывает другое, поэтому ключ, записанный дважды, виден только в тексте.",
};
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("impl written:", rows.filter((r) => r.impl).length, "gaps:", rows.filter((r) => r.impl && !r.impl.length).map((r) => r.num).join(", "));
