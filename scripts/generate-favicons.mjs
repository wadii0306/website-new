import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import toIco from "to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoSource = join(root, "public/logo/favicon_logo.png");

const CIRCLE = { left: 166, top: 166, size: 692 };
const W_SHIFT_LEFT = 22;
const W_SHIFT_DOWN = 14;
const W_SCALE = 1.32;
const BRAND_RED = { r: 230, g: 46, b: 45 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function removeGreyArtboard(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isGreyBg =
      Math.abs(r - g) < 14 && Math.abs(g - b) < 14 && r > 85 && r < 215;

    if (isGreyBg) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
    }
  }

  return sharp(data, { raw: info }).png().toBuffer();
}

function isWPixel(r, g, b, a) {
  return a > 20 && r > 100 && r > g + 15 && r > b + 15;
}

/** White W silhouette on transparent — used as a crisp mask */
async function extractWMask(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const on = isWPixel(r, g, b, a);
    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
    out[i + 3] = on ? 255 : 0;
  }

  return sharp(out, { raw: info }).png().toBuffer();
}

/** Force every W pixel to solid brand red — no pink anti-alias fringe */
async function applyBrandRed(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a > 20 && isWPixel(r, g, b, a)) {
      data[i] = BRAND_RED.r;
      data[i + 1] = BRAND_RED.g;
      data[i + 2] = BRAND_RED.b;
      data[i + 3] = 255;
    }
  }

  return sharp(data, { raw: info }).png().toBuffer();
}

async function buildMasterCircle() {
  const size = CIRCLE.size;
  const noGrey = await removeGreyArtboard(await sharp(logoSource).png().toBuffer());
  const cropped = await sharp(noGrey)
    .extract({ left: CIRCLE.left, top: CIRCLE.top, width: size, height: size })
    .png()
    .toBuffer();

  const wMask = await sharp(await extractWMask(cropped))
    .trim({ threshold: 1 })
    .png()
    .toBuffer();

  const { width: tw = 300, height: th = 63 } = await sharp(wMask).metadata();
  const scaledMask = await sharp(wMask)
    .resize(Math.round(tw * W_SCALE), Math.round(th * W_SCALE), {
      fit: "inside",
      background: TRANSPARENT,
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  const { width: mw = scaledDim, height: mh = scaledDim } = await sharp(scaledMask).metadata();
  const left = Math.round(size / 2 - mw / 2 - W_SHIFT_LEFT);
  const top = Math.round(size / 2 - mh / 2 + W_SHIFT_DOWN);

  const redW = await sharp({
    create: {
      width: mw,
      height: mh,
      channels: 4,
      background: { ...BRAND_RED, alpha: 1 },
    },
  })
    .composite([{ input: scaledMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const circleSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="#ffffff"/>
    </svg>`
  );

  return sharp(circleSvg)
    .composite([{ input: redW, left, top }])
    .png()
    .toBuffer();
}

async function buildIconBuffer(circleMaster, iconSize) {
  const renderSize = iconSize <= 48 ? iconSize * 4 : iconSize;
  const rendered = await sharp(circleMaster)
    .resize(renderSize, renderSize, {
      fit: "contain",
      background: TRANSPARENT,
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  const downscaled = await sharp(rendered)
    .resize(iconSize, iconSize, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  return applyBrandRed(downscaled);
}

async function writeIcon(circleMaster, iconSize, out) {
  const buf = await buildIconBuffer(circleMaster, iconSize);
  await sharp(buf).png({ compressionLevel: 9, force: true }).toFile(out);
}

const circleMaster = await buildMasterCircle();

const tabSizes = [16, 32, 48];
const icoBuffers = await Promise.all(tabSizes.map((size) => buildIconBuffer(circleMaster, size)));

await writeIcon(circleMaster, 48, join(root, "app/icon.png"));
await writeIcon(circleMaster, 180, join(root, "app/apple-icon.png"));
writeFileSync(join(root, "app/favicon.ico"), await toIco(icoBuffers));

console.log("Favicons generated with solid brand red");
