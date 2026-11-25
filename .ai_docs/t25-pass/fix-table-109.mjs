// The owner's ruling of 2026-11-13 unites the checks for a project's own checks with the general ones:
// - checks 10.1.32 and 10.1.33 are deleted; draft 10.8 counts a project's own check as code of the rule listing it;
// - agreed check 10.1.26a drops "of the system's code", so that it covers every test, those of a project's own checks
//   included. That change carries out the ruling the owner just made, so 10.1.26a stays agreed.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

for (const num of ["10.1.32", "10.1.33"]) {
  const d = rows.find((x) => x.num === num);
  d.fate = "deleted";
  d.change =
    "Удаляется (вы, 2026-11-13): собственная проверка проекта считается кодом правила, которое её перечисляет (черновик 10.8), поэтому её код и тесты держат общие проверки 10.1.26a, 10.1.28a и 10.1.31. " +
    "Строка ни разу не одобрялась в новой форме, поэтому удаляется, а не уходит в архив.";
  delete d.proposals;
  delete d.agreed;
  d.num = null;
}

const a = rows.find((x) => x.num === "10.1.26a");
const from = "Every test of the system's code carries a SpecTag";
if (!a.en.startsWith(from)) throw new Error("10.1.26a wording changed");
a.en = a.en.replace(from, "Every test carries a SpecTag");
a.ru = a.ru.replace("У каждого теста кода системы есть SpecTag", "У каждого теста есть SpecTag");
if (!a.rests.includes("s-sfjka4zc4rhfu67")) a.rests.push("s-sfjka4zc4rhfu67");
a.change += " По вашему решению от 13 ноября убрано «кода системы»: проверка охватывает любой тест, и тесты собственных проверок проекта тоже.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.32, 10.1.33 deleted | 10.1.26a:", a.ru);
