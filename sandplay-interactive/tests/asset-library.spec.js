const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { test, expect } = require("@playwright/test");

const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "assets", "manifest.json");
const batchesPath = path.join(root, "imagegen-prompts", "supplement-generation-batches.json");
const appPath = path.join(root, "app.js");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readAppAssetIds() {
  const source = fs.readFileSync(appPath, "utf8");
  const match = source.match(/const ASSETS = \[([\s\S]*?)\]\s*\.map/);
  expect(match).toBeTruthy();
  return [...match[1].matchAll(/\["([^"]+)"\s*,/g)].map((item) => item[1]);
}

function readPngAlphaBounds(filePath) {
  const png = fs.readFileSync(filePath);
  const signature = "89504e470d0a1a0a";
  expect(png.subarray(0, 8).toString("hex")).toBe(signature);

  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idatChunks = [];

  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.subarray(offset + 4, offset + 8).toString("ascii");
    const data = png.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      expect(data[8]).toBe(8);
      colorType = data[9];
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  expect(colorType).toBe(6);
  const bytesPerPixel = 4;
  const rowLength = width * bytesPerPixel;
  const inflated = zlib.inflateSync(Buffer.concat(idatChunks));
  const pixels = Buffer.alloc(rowLength * height);
  let sourceOffset = 0;
  let previousRow = Buffer.alloc(rowLength);

  for (let y = 0; y < height; y += 1) {
    const filter = inflated[sourceOffset];
    sourceOffset += 1;
    const row = Buffer.from(inflated.subarray(sourceOffset, sourceOffset + rowLength));
    sourceOffset += rowLength;

    for (let x = 0; x < rowLength; x += 1) {
      const left = x >= bytesPerPixel ? row[x - bytesPerPixel] : 0;
      const up = previousRow[x] || 0;
      const upLeft = x >= bytesPerPixel ? previousRow[x - bytesPerPixel] : 0;

      if (filter === 1) {
        row[x] = (row[x] + left) & 0xff;
      } else if (filter === 2) {
        row[x] = (row[x] + up) & 0xff;
      } else if (filter === 3) {
        row[x] = (row[x] + Math.floor((left + up) / 2)) & 0xff;
      } else if (filter === 4) {
        const predictor = left + up - upLeft;
        const pa = Math.abs(predictor - left);
        const pb = Math.abs(predictor - up);
        const pc = Math.abs(predictor - upLeft);
        const paeth = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        row[x] = (row[x] + paeth) & 0xff;
      }
    }

    row.copy(pixels, y * rowLength);
    previousRow = row;
  }

  const bounds = { minX: width, minY: height, maxX: -1, maxY: -1 };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[y * rowLength + x * bytesPerPixel + 3];
      if (alpha > 8) {
        bounds.minX = Math.min(bounds.minX, x);
        bounds.minY = Math.min(bounds.minY, y);
        bounds.maxX = Math.max(bounds.maxX, x);
        bounds.maxY = Math.max(bounds.maxY, y);
      }
    }
  }

  return {
    ...bounds,
    width: bounds.maxX - bounds.minX + 1,
    height: bounds.maxY - bounds.minY + 1,
  };
}

function readPngAlphaInfo(filePath) {
  const png = fs.readFileSync(filePath);
  const signature = "89504e470d0a1a0a";
  expect(png.subarray(0, 8).toString("hex")).toBe(signature);

  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idatChunks = [];

  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.subarray(offset + 4, offset + 8).toString("ascii");
    const data = png.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      expect(data[8]).toBe(8);
      colorType = data[9];
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  expect(colorType).toBe(6);
  const bytesPerPixel = 4;
  const rowLength = width * bytesPerPixel;
  const inflated = zlib.inflateSync(Buffer.concat(idatChunks));
  const pixels = Buffer.alloc(rowLength * height);
  let sourceOffset = 0;
  let previousRow = Buffer.alloc(rowLength);

  for (let y = 0; y < height; y += 1) {
    const filter = inflated[sourceOffset];
    sourceOffset += 1;
    const row = Buffer.from(inflated.subarray(sourceOffset, sourceOffset + rowLength));
    sourceOffset += rowLength;

    for (let x = 0; x < rowLength; x += 1) {
      const left = x >= bytesPerPixel ? row[x - bytesPerPixel] : 0;
      const up = previousRow[x] || 0;
      const upLeft = x >= bytesPerPixel ? previousRow[x - bytesPerPixel] : 0;

      if (filter === 1) {
        row[x] = (row[x] + left) & 0xff;
      } else if (filter === 2) {
        row[x] = (row[x] + up) & 0xff;
      } else if (filter === 3) {
        row[x] = (row[x] + Math.floor((left + up) / 2)) & 0xff;
      } else if (filter === 4) {
        const predictor = left + up - upLeft;
        const pa = Math.abs(predictor - left);
        const pb = Math.abs(predictor - up);
        const pc = Math.abs(predictor - upLeft);
        const paeth = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        row[x] = (row[x] + paeth) & 0xff;
      }
    }

    row.copy(pixels, y * rowLength);
    previousRow = row;
  }

  return { width, height, rowLength, pixels };
}

function countAlphaPixelsInRegion(filePath, predicate) {
  const { width, height, rowLength, pixels } = readPngAlphaInfo(filePath);
  let count = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[y * rowLength + x * 4 + 3];
      if (alpha > 8 && predicate(x, y)) {
        count += 1;
      }
    }
  }

  return count;
}

function readConnectedAlphaComponentSizes(filePath) {
  const { width, height, rowLength, pixels } = readPngAlphaInfo(filePath);
  const visited = new Uint8Array(width * height);
  const sizes = [];

  for (let start = 0; start < width * height; start += 1) {
    if (visited[start]) continue;
    const alpha = pixels[Math.floor(start / width) * rowLength + (start % width) * 4 + 3];
    if (alpha <= 8) continue;

    let size = 0;
    const stack = [start];
    visited[start] = 1;

    while (stack.length > 0) {
      const current = stack.pop();
      size += 1;
      const x = current % width;
      const y = Math.floor(current / width);
      const neighbors = [
        y > 0 ? current - width : -1,
        y < height - 1 ? current + width : -1,
        x > 0 ? current - 1 : -1,
        x < width - 1 ? current + 1 : -1,
      ];

      neighbors.forEach((next) => {
        if (next < 0 || visited[next]) return;
        const nextAlpha = pixels[Math.floor(next / width) * rowLength + (next % width) * 4 + 3];
        if (nextAlpha <= 8) return;
        visited[next] = 1;
        stack.push(next);
      });
    }

    sizes.push(size);
  }

  return sizes.sort((a, b) => b - a);
}

test("expanded asset manifest keeps 96 planned unique sandplay objects", () => {
  const manifest = readJson(manifestPath);
  const ids = manifest.map((item) => item.id);
  const uniqueIds = new Set(ids);
  const highPriorityFamilyIds = ["person-couple", "person-infant", "person-caregiver"];

  expect(manifest).toHaveLength(96);
  expect(uniqueIds.size).toBe(ids.length);

  highPriorityFamilyIds.forEach((id) => {
    const item = manifest.find((asset) => asset.id === id);
    expect(item).toBeTruthy();
    expect(item.category).toBe("家庭/关系");
  });

  const adultIndex = manifest.findIndex((asset) => asset.id === "person-adult");
  const womanIndex = manifest.findIndex((asset) => asset.id === "person-woman");
  const woman = manifest[womanIndex];

  expect(womanIndex).toBe(adultIndex + 1);
  expect(woman.name).toBe("成年人");
  expect(woman.category).toBe("人物");

  manifest.forEach((item) => {
    expect(item.id).toMatch(/^[a-z0-9-]+$/);
    expect(item.name.length).toBeGreaterThan(0);
    expect(item.category.length).toBeGreaterThan(0);
    expect(item.placeholderSrc).toBe(`assets/generated/${item.id}.png`);
    expect(item.recommendedImagePrompt).toContain("Create a single isolated sandplay miniature object:");
    expect(item.symbolicNotes).toContain("个人意义");
  });
});

test("generation batches are six groups of sixteen manifest assets in manifest order", () => {
  const manifest = readJson(manifestPath);
  const manifestIds = manifest.map((item) => item.id);
  const manifestIdSet = new Set(manifestIds);
  const batches = readJson(batchesPath);
  const batchIds = batches.flatMap((batch) => batch.assetIds);
  const uniqueBatchIds = new Set(batchIds);

  expect(batches).toHaveLength(6);
  batches.forEach((batch) => {
    expect(batch.assetIds).toHaveLength(16);
    batch.assetIds.forEach((id) => expect(manifestIdSet.has(id)).toBeTruthy());
  });
  expect(uniqueBatchIds.size).toBe(batchIds.length);
  expect(batchIds).toHaveLength(96);
  expect(batchIds).toEqual(manifestIds);
});

test("front-end asset list exposes every manifest asset", () => {
  const manifest = readJson(manifestPath);
  const manifestIds = manifest.map((item) => item.id);
  const appAssetIds = readAppAssetIds();

  expect(appAssetIds).toHaveLength(96);
  expect(new Set(appAssetIds).size).toBe(appAssetIds.length);
  expect(appAssetIds).toEqual(manifestIds);
});

test("all generated transparent PNG asset files exist", () => {
  const manifest = readJson(manifestPath);

  manifest.forEach((item) => {
    const filePath = path.join(root, item.placeholderSrc);
    expect(fs.existsSync(filePath), `${item.id} should exist at ${item.placeholderSrc}`).toBeTruthy();
  });
});

test("adult woman generated miniature keeps the full head visible", () => {
  const filePath = path.join(root, "assets", "generated", "person-woman.png");
  const bounds = readPngAlphaBounds(filePath);

  expect(bounds.minY).toBeLessThanOrEqual(115);
  expect(bounds.height).toBeGreaterThanOrEqual(250);
});

test("daily object miniatures do not include next-row fragments", () => {
  ["daily-phone", "daily-clock", "daily-cup", "daily-food-basket", "daily-toy-blocks"].forEach((id) => {
    const filePath = path.join(root, "assets", "generated", `${id}.png`);
    const [, secondLargest = 0] = readConnectedAlphaComponentSizes(filePath);

    expect(secondLargest, `${id} has a stray disconnected fragment`).toBeLessThan(80);
  });
});

test("batch five role miniatures are not clipped or contaminated by neighbors", () => {
  const teacher = readPngAlphaBounds(path.join(root, "assets", "generated", "role-teacher.png"));
  const doctor = readPngAlphaBounds(path.join(root, "assets", "generated", "role-doctor.png"));
  const friendGroup = readPngAlphaBounds(path.join(root, "assets", "generated", "role-friend-group.png"));
  const policeRightPixels = countAlphaPixelsInRegion(
    path.join(root, "assets", "generated", "role-police-officer.png"),
    (x) => x >= 360,
  );

  expect(teacher.height).toBeGreaterThanOrEqual(270);
  expect(doctor.height).toBeGreaterThanOrEqual(270);
  expect(friendGroup.width).toBeGreaterThanOrEqual(260);
  expect(policeRightPixels).toBeLessThan(80);
});
