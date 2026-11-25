// The owner of 2026-11-10 titled section 9 "Todos", in English in the Russian too, over "Work put off" / «Отложенная работа».
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const page = fs.readFileSync(pagePath, "utf8");
const from = `{ n: "9", en: "Work put off", ru: "Отложенная работа",`;
const to = `{ n: "9", en: "Todos", ru: "Todos",`;
if (page.split(from).length !== 2) throw new Error("section 9 heading is not there exactly once");
fs.writeFileSync(pagePath, page.replace(from, to));
console.log("section 9: Todos");
