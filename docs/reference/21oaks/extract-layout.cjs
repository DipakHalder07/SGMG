const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");

async function run() {
  const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless=new",
    "--remote-debugging-port=9225",
    "--disable-gpu",
    "--no-sandbox"
  ]);

  await new Promise(r => setTimeout(r, 1500));

  function getWsUrl() {
    return new Promise((resolve, reject) => {
      http.get("http://127.0.0.1:9225/json/version", res => {
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
  await sendSession("CSS.enable");
  await sendSession("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sendSession("Page.navigate", { url: "https://21oaks.org/location" });
  await new Promise(r => setTimeout(r, 4000));

  const code = `
    (() => {
      const results = {};
      const selectors = [
        ".on_the_map",
        ".location_on_map",
        ".locations_headings",
        ".h2.white.specific_map",
        ".map_sec",
        ".map_cards",
        ".cards_list",
        ".map_card",
        ".wrapper_map_card",
        ".image_map_card",
        ".content_info",
        ".sub_box",
        ".subtitle_text",
        ".title_map_card",
        ".map_box",
        "#map",
        ".faqs.black",
        ".faq_heading.white_ver",
        ".sides_faq",
        ".short_left",
        ".caption_faq.white_ver",
        ".bottom_faq",
        ".caption_cta.white_ver",
        ".faq_general",
        ".collection_faq.white_ver",
        ".accordion-item.white_ver",
        ".item_title",
        ".icon_wrapper.white_ver"
      ];

      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          const comp = window.getComputedStyle(el);
          results[sel] = {
            position: comp.position,
            top: comp.top,
            bottom: comp.bottom,
            left: comp.left,
            right: comp.right,
            zIndex: comp.zIndex,
            display: comp.display,
            width: comp.width,
            height: comp.height,
            maxWidth: comp.maxWidth,
            minHeight: comp.minHeight,
            padding: comp.padding,
            margin: comp.margin,
            overflow: comp.overflow,
            borderRadius: comp.borderRadius,
            backgroundColor: comp.backgroundColor,
            color: comp.color,
            fontFamily: comp.fontFamily,
            fontSize: comp.fontSize,
            lineHeight: comp.lineHeight,
            border: comp.border
          };
        }
      }
      return results;
    })()
  `;

  const res = await sendSession("Runtime.evaluate", {
    expression: code,
    returnByValue: true
  });

  fs.writeFileSync("docs/reference/21oaks/exact-layout-rules.json", JSON.stringify(res.result.value, null, 2));
  console.log("Saved exact layout rules to docs/reference/21oaks/exact-layout-rules.json");

  ws.close();
  chrome.kill();
}

run().catch(console.error);
