const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");

async function run() {
  const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless=new",
    "--remote-debugging-port=9230",
    "--disable-gpu",
    "--no-sandbox"
  ]);

  await new Promise(r => setTimeout(r, 1500));

  function getWsUrl() {
    return new Promise((resolve, reject) => {
      http.get("http://127.0.0.1:9230/json/version", res => {
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

  const urls = [
    { name: "gallery", url: "https://21oaks.org/gallery" },
    { name: "how-to-apply", url: "https://21oaks.org/how-to-apply" },
    { name: "faq", url: "https://21oaks.org/faq" }
  ];

  const report = {};

  for (const item of urls) {
    console.log("Navigating to", item.url);
    await sendSession("Page.navigate", { url: item.url });
    await new Promise(r => setTimeout(r, 4000));

    const code = `
      (() => {
        const selectors = [
          "h1", "h2", "h3", ".h1", ".h2", ".h2.smaller", ".h2.big", ".h3",
          ".heading_h1", ".caption_left", ".caption_faq", ".caption_cta", ".cap_footer",
          ".p_gen", ".p_small", ".item_title", ".item_paragraph",
          ".text_box", ".button", ".title_step", ".title_how", ".desc_step",
          ".cat_btn", ".gallery_cat", ".filter_btn"
        ];
        const data = {};
        for (const sel of selectors) {
          const els = Array.from(document.querySelectorAll(sel));
          if (els.length > 0) {
            const el = els[0];
            const comp = window.getComputedStyle(el);
            data[sel] = {
              count: els.length,
              sampleText: el.innerText.substring(0, 40).replace(/\\n/g, " "),
              fontSize: comp.fontSize,
              fontWeight: comp.fontWeight,
              lineHeight: comp.lineHeight,
              letterSpacing: comp.letterSpacing,
              fontFamily: comp.fontFamily,
              color: comp.color,
              tagName: el.tagName,
              className: el.className
            };
          }
        }
        return data;
      })()
    `;

    const res = await sendSession("Runtime.evaluate", {
      expression: code,
      returnByValue: true
    });

    report[item.name] = res.result.value;
  }

  fs.writeFileSync("docs/reference/21oaks/typography-audit-part2.json", JSON.stringify(report, null, 2));
  console.log("Saved typography audit part 2 to docs/reference/21oaks/typography-audit-part2.json");

  ws.close();
  chrome.kill();
}

run().catch(console.error);
