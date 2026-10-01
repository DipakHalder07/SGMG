#!/usr/bin/env node
/**
 * SGMG Visual Page Auditor
 * Fast Chrome DevTools Protocol Headless Screenshot Runner
 * Captures pixel-perfect screenshots of all active pages.
 */
const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = 5173;
const OUTPUT_DIR = path.resolve(__dirname, "../../artifacts/audit");

const AUDIT_PAGES = [
  { path: "/", name: "home" },
  { path: "/apartments", name: "apartments" },
  { path: "/apartments/green-view", name: "apartment_detail" },
  { path: "/amenities", name: "amenities" },
  { path: "/location", name: "location" },
  { path: "/about", name: "about" },
  { path: "/faq", name: "faq" },
  { path: "/gallery", name: "gallery" },
  { path: "/team", name: "team" },
  { path: "/careers", name: "careers" },
  { path: "/contact", name: "contact" },
  { path: "/404", name: "not_found" }
];

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("Launching Headless Chrome for Visual Audit...");
  const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-sandbox"
  ]);

  await new Promise(r => setTimeout(r, 1500));

  function getWsUrl() {
    return new Promise((resolve, reject) => {
      http.get("http://127.0.0.1:9222/json/version", res => {
        let data = "";
        res.on("data", chunk => data += chunk);
        res.on("end", () => resolve(JSON.parse(data).webSocketDebuggerUrl));
      }).on("error", reject);
    });
  }

  const wsUrl = await getWsUrl();
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (evt) => {
        const res = JSON.parse(evt.data);
        if (res.id === msgId) {
          ws.removeEventListener("message", handler);
          if (res.error) reject(res.error);
          else resolve(res.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (evt) => {
        const res = JSON.parse(evt.data);
        if (res.id === msgId) {
          ws.removeEventListener("message", handler);
          if (res.error) reject(res.error);
          else resolve(res.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
    });
  }

  await sendSession("Page.enable");
  await sendSession("DOM.enable");
  await sendSession("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  for (const page of AUDIT_PAGES) {
    const url = `http://localhost:${PORT}${page.path}`;
    await sendSession("Page.navigate", { url });
    await new Promise(r => setTimeout(r, 1200));

    const { data } = await sendSession("Page.captureScreenshot", { format: "png" });
    const filePath = path.join(OUTPUT_DIR, `${page.name}.png`);
    fs.writeFileSync(filePath, Buffer.from(data, "base64"));
    console.log(`[PASS] ${page.name.padEnd(20)} -> ${filePath}`);
  }

  ws.close();
  chrome.kill();
  console.log("\nVisual audit completed successfully!");
}

main().catch(console.error);
