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
  await new Promise(r => setTimeout(r, 5000));

  const code = `
    (() => {
      const map = document.querySelector("#map");
      if (!map) return "No #map";
      // Get all style tags and scripts inside map
      const styles = Array.from(map.querySelectorAll("style")).map(s => s.innerHTML).join("\\n");
      const scripts = Array.from(map.querySelectorAll("script")).map(s => s.innerHTML).join("\\n");
      return {
        styles,
        scriptsLength: scripts.length,
        scriptsPreview: scripts.substring(0, 3000)
      };
    })()
  `;

  const res = await sendSession("Runtime.evaluate", {
    expression: code,
    returnByValue: true
  });

  fs.writeFileSync("docs/reference/21oaks/map-scripts-extracted.json", JSON.stringify(res.result.value, null, 2));
  console.log("Wrote docs/reference/21oaks/map-scripts-extracted.json");

  ws.close();
  chrome.kill();
}

run().catch(console.error);
