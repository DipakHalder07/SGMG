const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");

async function run() {
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
  await sendSession("Page.navigate", { url: "https://21oaks.org/location" });
  await new Promise(r => setTimeout(r, 4500));

  const code = `
    (() => {
      const mapSec = document.querySelector(".map_sec");
      if (!mapSec) return "No .map_sec";
      const children = Array.from(mapSec.children).map(c => ({
        tag: c.tagName,
        className: c.className,
        id: c.id,
        htmlSnippet: c.outerHTML.substring(0, 500)
      }));
      return children;
    })()
  `;

  const res = await sendSession("Runtime.evaluate", {
    expression: code,
    returnByValue: true
  });

  fs.writeFileSync("docs/reference/21oaks/map-sec-children.json", JSON.stringify(res.result.value, null, 2));
  console.log("Wrote docs/reference/21oaks/map-sec-children.json");

  ws.close();
  chrome.kill();
}

run().catch(console.error);
