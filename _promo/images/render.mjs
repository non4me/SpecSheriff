// Renders every picture from its page in html/ beside this script: to png/ at twice its size and to svg/
// with its text as outlines, so that a change to a picture is one run of `node _promo/images/render.mjs`
// (or `node _promo/images/render.mjs <name>…` for some of them) and the exports never drift from it.
// Chrome draws both, the SVG through a PDF it prints, which pdf2svg.py turns into SVG with PyMuPDF.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { platform, tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const chrome = process.env.CHROME ?? {
  win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
}[platform()] ?? "google-chrome";
const python = process.env.PYTHON ?? (platform() === "win32" ? "python" : "python3");

const wanted = process.argv.slice(2);
const names = readdirSync(join(here, "html")).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5))
  .filter((name) => wanted.length === 0 || wanted.includes(name));
const unknown = wanted.filter((name) => !names.includes(name));
if (unknown.length > 0) throw new Error(`no page in _promo/images/html/ for: ${unknown.join(", ")}`);

const work = mkdtempSync(join(tmpdir(), "specsheriff-images-"));
const browser = ["--headless=new", `--user-data-dir=${join(work, "profile")}`, "--disable-gpu", "--hide-scrollbars",
  "--no-first-run", "--no-default-browser-check", "--virtual-time-budget=15000"]; // the time lets the fonts load
try {
  for (const dir of ["png", "svg"]) mkdirSync(join(here, dir), { recursive: true });
  for (const name of names) {
    const page = join(here, "html", `${name}.html`);
    const size = readFileSync(page, "utf8").match(/@page\{size:(\d+)px (\d+)px/);
    if (!size) throw new Error(`_promo/images/html/${name}.html names no page size in its @page rule`);
    const [, width, height] = size;
    const url = pathToFileURL(page).href;
    execFileSync(chrome, [...browser, "--force-device-scale-factor=2", `--window-size=${width},${height}`,
      `--screenshot=${join(here, "png", `${name}.png`)}`, url], { stdio: "ignore" });
    const pdf = join(work, `${name}.pdf`);
    execFileSync(chrome, [...browser, "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, url], { stdio: "ignore" });
    execFileSync(python, [join(here, "pdf2svg.py"), pdf, join(here, "svg", `${name}.svg`), width, height], { stdio: "inherit" });
    console.log(name);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
