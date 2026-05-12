const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const appUrl = `file:///${path.resolve(__dirname, "..", "index.html").replace(/\\/g, "/")}`;

async function enterApp(page) {
  await page.goto(appUrl);
  await page.locator("#safetyConsent").check();
  await page.locator("#startBtn").click();
}

test("sand tray keeps its fixed size while side panels scroll inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  const trayBox = await page.locator("#sandTray").boundingBox();
  expect(Math.round(trayBox.width)).toBe(900);
  expect(Math.round(trayBox.height)).toBe(620);

  const metrics = await page.evaluate(() => {
    const inspector = document.querySelector(".inspector-panel");
    const libraryGrid = document.querySelector(".asset-grid");
    return {
      pageHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      inspectorClientHeight: inspector.clientHeight,
      inspectorScrollHeight: inspector.scrollHeight,
      libraryClientHeight: libraryGrid.clientHeight,
      libraryScrollHeight: libraryGrid.scrollHeight,
    };
  });

  expect(metrics.pageHeight).toBeLessThanOrEqual(metrics.viewportHeight + 1);
  expect(metrics.inspectorScrollHeight).toBeGreaterThan(metrics.inspectorClientHeight);
  expect(metrics.libraryScrollHeight).toBeGreaterThan(metrics.libraryClientHeight);
});

test("wide screens keep sidebars fixed and expand only the center cell", async ({ page }) => {
  await page.setViewportSize({ width: 2048, height: 900 });
  await enterApp(page);

  const trayBox = await page.locator("#sandTray").boundingBox();
  const libraryBox = await page.locator(".library-panel").boundingBox();
  const sandSectionBox = await page.locator(".sand-section").boundingBox();
  const inspectorBox = await page.locator(".inspector-panel").boundingBox();
  const wrapperMetrics = await page.locator(".sand-tray-wrap").evaluate((node) => ({
    clientWidth: node.clientWidth,
    scrollWidth: node.scrollWidth,
  }));

  expect(Math.round(trayBox.width)).toBe(900);
  expect(Math.round(trayBox.height)).toBe(620);
  expect(Math.round(libraryBox.width)).toBe(280);
  expect(Math.round(inspectorBox.width)).toBe(320);
  expect(sandSectionBox.width).toBeGreaterThan(trayBox.width);
  expect(wrapperMetrics.scrollWidth).toBe(wrapperMetrics.clientWidth);
});

test("placed objects stay fixed when only the center cell resizes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  await page.locator(".asset-card").first().click();
  const before = await page.locator(".sand-object").boundingBox();
  const beforeTray = await page.locator("#sandTray").boundingBox();

  await page.setViewportSize({ width: 2048, height: 900 });
  await page.waitForFunction(() => {
    const node = document.querySelector(".sand-object");
    return node && node.getBoundingClientRect().width > 0;
  });
  const after = await page.locator(".sand-object").boundingBox();
  const afterTray = await page.locator("#sandTray").boundingBox();

  const beforeCenterRatio = {
    x: (before.x + before.width / 2 - beforeTray.x) / beforeTray.width,
    y: (before.y + before.height / 2 - beforeTray.y) / beforeTray.height,
  };
  const afterCenterRatio = {
    x: (after.x + after.width / 2 - afterTray.x) / afterTray.width,
    y: (after.y + after.height / 2 - afterTray.y) / afterTray.height,
  };

  expect(Math.abs(afterCenterRatio.x - beforeCenterRatio.x)).toBeLessThan(0.02);
  expect(Math.abs(afterCenterRatio.y - beforeCenterRatio.y)).toBeLessThan(0.02);
  expect(Math.round(after.width)).toBe(Math.round(before.width));
  expect(Math.round(afterTray.width)).toBe(900);
});

test("asset library keeps a two-column grid", async ({ page }) => {
  await page.setViewportSize({ width: 2048, height: 900 });
  await enterApp(page);

  const columns = await page.locator(".asset-grid").evaluate((node) => {
    return getComputedStyle(node).gridTemplateColumns.split(" ").filter(Boolean).length;
  });

  expect(columns).toBe(2);
});

test("asset cards keep the same size across category filters", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  const measure = async () => page.locator(".asset-card").first().evaluate((card) => {
    const grid = document.querySelector(".asset-grid");
    const rect = card.getBoundingClientRect();
    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      scrollbarGutter: getComputedStyle(grid).scrollbarGutter,
    };
  });

  const allCategory = await measure();
  await page.locator(".category-tabs button").nth(1).click();
  const singleCategory = await measure();

  expect(singleCategory.width).toBe(allCategory.width);
  expect(singleCategory.height).toBe(allCategory.height);
  expect(allCategory.scrollbarGutter).toContain("stable");
  expect(singleCategory.scrollbarGutter).toContain("stable");
});

test("sand objects use asset-specific base sizes and scale ranges", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  await page.locator(".asset-card").nth(5).click();
  const birdMax = await page.locator("#scaleControl").getAttribute("max");
  await page.locator(".asset-card").nth(14).click();
  const castleMax = await page.locator("#scaleControl").getAttribute("max");

  const sizes = await page.locator(".sand-object").evaluateAll((nodes) => {
    return nodes.map((node) => ({
      width: Math.round(Number.parseFloat(getComputedStyle(node).width)),
      height: Math.round(Number.parseFloat(getComputedStyle(node).height)),
    }));
  });

  expect(sizes[0].width).toBeLessThan(sizes[1].width);
  expect(sizes[0].height).toBeLessThan(sizes[1].height);
  expect(birdMax).not.toBe(castleMax);
});

test("frontend design pass applies tactile workbench styling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  const visual = await page.evaluate(() => {
    const styleFor = (selector) => getComputedStyle(document.querySelector(selector));
    const toolbar = styleFor(".toolbar");
    const tabs = styleFor(".category-tabs");
    const trayWrap = styleFor(".sand-tray-wrap");
    const tray = styleFor(".sand-tray");
    return {
      toolbarBackground: toolbar.backgroundColor,
      toolbarRadius: Number.parseFloat(toolbar.borderRadius),
      tabsBackground: tabs.backgroundColor,
      tabsRadius: Number.parseFloat(tabs.borderRadius),
      trayWrapBackground: trayWrap.backgroundImage,
      trayShadow: tray.boxShadow,
    };
  });

  expect(visual.toolbarBackground).not.toBe("rgba(0, 0, 0, 0)");
  expect(visual.toolbarRadius).toBeGreaterThan(0);
  expect(visual.tabsBackground).not.toBe("rgba(0, 0, 0, 0)");
  expect(visual.tabsRadius).toBeGreaterThan(0);
  expect(visual.trayWrapBackground).toContain("linear-gradient");
  expect(visual.trayShadow).not.toBe("none");
});

test("asset card labels stay inside their cards", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  const overflow = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".asset-card")).map((card) => {
      const cardRect = card.getBoundingClientRect();
      const spanRect = card.querySelector("span").getBoundingClientRect();
      const smallRect = card.querySelector("small").getBoundingClientRect();
      return {
        label: card.textContent.trim(),
        spanInside: spanRect.bottom <= cardRect.bottom - 2,
        smallInside: smallRect.bottom <= cardRect.bottom - 2,
        smallTopAfterSpan: smallRect.top >= spanRect.bottom - 1,
      };
    }).filter((item) => !item.spanInside || !item.smallInside || !item.smallTopAfterSpan);
  });

  expect(overflow).toEqual([]);
});

test("save PNG produces a downloadable PNG file", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  await page.locator(".asset-card").first().click();
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#savePngBtn").click();
  const download = await downloadPromise;
  const outputPath = path.join(testInfo.outputDir, download.suggestedFilename());
  await download.saveAs(outputPath);

  const bytes = fs.readFileSync(outputPath);
  expect(download.suggestedFilename()).toMatch(/^sandplay-\d{8}-\d{6}\.png$/);
  expect(bytes.length).toBeGreaterThan(1000);
  expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
});

test("save PNG loads real asset images instead of fallback placeholders", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await enterApp(page);

  await page.locator(".asset-card").nth(7).click();
  await page.evaluate(() => {
    window.__exportImageSources = [];
    window.__captureExportSources = true;
    if (window.__imageSourcePatchInstalled) return;

    const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      configurable: true,
      get() {
        return descriptor.get.call(this);
      },
      set(value) {
        if (window.__captureExportSources) {
          window.__exportImageSources.push(String(value));
        }
        descriptor.set.call(this, value);
      },
    });
    window.__imageSourcePatchInstalled = true;
  });

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#savePngBtn").click();
  const download = await downloadPromise;
  const outputPath = path.join(testInfo.outputDir, download.suggestedFilename());
  await download.saveAs(outputPath);

  const sources = await page.evaluate(() => window.__exportImageSources);
  expect(sources.some((source) => source.startsWith("data:image/png;base64,") || source.includes("/assets/generated/nature-tree.png"))).toBeTruthy();
  expect(sources.some((source) => source.startsWith("data:image/svg+xml"))).toBeFalsy();
});
