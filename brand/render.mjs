// Renders every export of the mark from the owner's three drawings beside this script, each at its exact
// size, so that a change to a drawing is one run of `node brand/render.mjs` and the exports never drift.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { optimize } from "svgo";

const INK = "#17232b";
const PAPER = "#eef1f3";
const COIN_SHA256 = "d4188105d1f0e5d993f07812e5a2848e7f485f2d1cfb9316a645f60e56148e3a";
const SQUARE = '<rect width="1500" height="1500" fill="#fff"/>';

const read = (name) => readFileSync(new URL(name, import.meta.url), "utf8");
const coin = read("coin.svg");
if (createHash("sha256").update(coin).digest("hex") !== COIN_SHA256 || !coin.includes(SQUARE)) {
  throw new Error("brand/coin.svg is not the owner's drawing: ask the owner for the original file");
}
const icon = read("icon.svg"); // up to 128 px: its line is heavier and its rings larger
const star = read("star.svg"); // above 128 px

const out = new URL("exports/", import.meta.url);
mkdirSync(out, { recursive: true });
const svg = (name, text) => writeFileSync(new URL(name, out), optimize(text, {
  multipass: true,
  plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }], // a scaled image keeps its drawing
}).data);
const sizes = new Map();
const png = (name, text, width, height) => {
  const data = new Resvg(text, { fitTo: { mode: "width", value: width } }).render().asPng();
  writeFileSync(new URL(name, out), data);
  sizes.set(name, { data, width, height });
  return data;
};

/** The coin for the web: the white square becomes a disc of the face colour, the outer ring plus half its stroke, so the corners stay transparent. */
const webCoin = (face, line) => coin.replaceAll(INK, line).replace(SQUARE, `<circle cx="750" cy="750" r="722" fill="${face}"/>`);

/** A canvas of the given size and background with a drawing centred on it, `inner` pixels square. */
function place(width, height, background, drawing, inner) {
  const viewBox = /viewBox="([^"]+)"/.exec(drawing)[1];
  const body = drawing.slice(drawing.indexOf(">") + 1, drawing.lastIndexOf("</svg>"));
  const fill = background ? `<rect width="${width}" height="${height}" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${fill}<svg x="${(width - inner) / 2}" y="${(height - inner) / 2}" width="${inner}" height="${inner}" viewBox="${viewBox}">${body}</svg></svg>`;
}

/** An ICO holding one PNG, which every browser reads. */
function ico(data, size) {
  const head = Buffer.alloc(22);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(1, 4);
  head.writeUInt8(size, 6);
  head.writeUInt8(size, 7);
  head.writeUInt16LE(1, 10);
  head.writeUInt16LE(32, 12);
  head.writeUInt32LE(data.length, 14);
  head.writeUInt32LE(22, 18);
  return Buffer.concat([head, data]);
}

// The README's header, light or dark following the reader's theme.
svg("coin-light.svg", webCoin("#fff", INK));
svg("coin-dark.svg", webCoin(INK, PAPER));
// The star alone, for a dark ground.
svg("icon-dark.svg", icon.replaceAll(INK, PAPER));
svg("star-dark.svg", star.replaceAll(INK, PAPER));
// The browser tab: the icon drawing, its line following the browser's theme.
svg("icon.svg", icon.replace("><path", `><style>path{stroke:${INK}}@media (prefers-color-scheme:dark){path{stroke:${PAPER}}}</style><path`));

png("social-preview.png", place(1280, 640, INK, webCoin(INK, PAPER), 560), 1280, 640);
png("apple-touch-icon.png", place(180, 180, "#fff", star, 140), 180, 180);
png("icon-192.png", place(192, 192, "#fff", star, 150), 192, 192);
png("icon-512.png", place(512, 512, "#fff", star, 400), 512, 512);
png("icon-512-maskable.png", place(512, 512, "#fff", star, 360), 512, 512); // the mark inside the 409 px safe circle
writeFileSync(new URL("favicon.ico", out), ico(png("favicon-32.png", place(32, 32, null, icon, 32), 32, 32), 32));

for (const [name, { data, width, height }] of sizes) {
  if (data.readUInt32BE(16) !== width || data.readUInt32BE(20) !== height) throw new Error(`${name} is not ${width}×${height}`);
}
if (sizes.get("social-preview.png").data.length >= 1 << 20) throw new Error("social-preview.png is not under 1 MB, as GitHub asks");
