import { chromium } from "playwright";
import fs from "fs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const tile = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEAAH/q842iQAAAABJRU5ErkJggg==",
  "base64"
);
async function run(w, h, mob, theme, shot) {
  const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob, deviceScaleFactor: 2, colorScheme: theme });
  const p = await c.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => { if (m.type() === "error") errs.push("C:" + m.text().slice(0, 120)); });
  await p.route("**/*", (r) => {
    const u = r.request().url();
    if (u.startsWith("file:")) return r.continue();
    if (/tile\.openstreetmap/.test(u)) return r.fulfill({ status: 200, contentType: "image/png", body: tile });
    return r.abort();
  });
  await p.goto("file://" + process.cwd() + "/bundle.html");
  await p.waitForTimeout(1500);
  const base = await p.evaluate(() => ({
    cards: document.querySelectorAll("article").length,
    rows: document.querySelectorAll("table.sc tbody tr").length,
    pins: document.querySelectorAll(".pinwrap .pin").length,
    nums: [...document.querySelectorAll(".pinwrap .pin")].map((e) => e.textContent).join(","),
    dots: document.querySelectorAll("svg circle").length,
    h2: document.querySelector("h2")?.textContent,
    tiles: document.querySelectorAll(".leaflet-tile").length,
  }));
  // filter to 2차 조사
  await p.getByRole("button", { name: "국제거리 3분 이내" }).click();
  await p.waitForTimeout(700);
  const f = await p.evaluate(() => ({
    rows: document.querySelectorAll("table.sc tbody tr").length,
    pins: document.querySelectorAll("#lmap .pinwrap .pin").length,
    first: document.querySelector("table.sc tbody tr td.nm b")?.textContent,
  }));
  // sort by area desc
  await p.selectOption("#sortsel", "area-desc");
  await p.getByRole("button", { name: "전체" }).click();
  await p.waitForTimeout(700);
  const s = await p.evaluate(() => ({
    first: document.querySelector("table.sc tbody tr td.nm b")?.textContent,
    firstArea: document.querySelectorAll("table.sc tbody tr")[0]?.children[3]?.textContent,
    rows: document.querySelectorAll("table.sc tbody tr").length,
  }));
  // open a card detail + 제외 사유
  await p.locator("text=시설 보기").first().click();
  await p.getByRole("button", { name: /제외 사유/ }).click();
  await p.waitForTimeout(400);
  const d = await p.evaluate(() => ({
    rooms: document.querySelectorAll("article table tbody tr").length,
    screened: document.querySelectorAll("ul li").length,
  }));
  await p.evaluate(() => document.getElementById("lmap")?.scrollIntoView({ block: "center" }));
  await p.waitForTimeout(500);
  await p.screenshot({ path: shot });
  await c.close();
  return { base, f, s, d, errs };
}
console.log(JSON.stringify(await run(1280, 900, false, "light", "v_desktop.png"), null, 1));
console.log(JSON.stringify(await run(390, 844, true, "dark", "v_mobile.png"), null, 1));
await b.close();
