const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");

async function run() {
  const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless=new",
    "--remote-debugging-port=9224",
    "--disable-gpu",
    "--no-sandbox"
  ]);

  await new Promise(r => setTimeout(r, 1500));

  function getWsUrl() {
    return new Promise((resolve, reject) => {
      http.get("http://127.0.0.1:9224/json/version", res => {
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
  await new Promise(r => setTimeout(r, 4000));

  const code = `
    (() => {
      function getStyles(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const comp = window.getComputedStyle(el);
        return {
          selector: sel,
          width: comp.width,
          height: comp.height,
          padding: comp.padding,
          margin: comp.margin,
          background: comp.background,
          backgroundColor: comp.backgroundColor,
          borderRadius: comp.borderRadius,
          border: comp.border,
          display: comp.display,
          flexDirection: comp.flexDirection,
          gap: comp.gap,
          boxShadow: comp.boxShadow,
          fontSize: comp.fontSize,
          fontWeight: comp.fontWeight,
          fontFamily: comp.fontFamily,
          color: comp.color,
          outerHTML: el.outerHTML.substring(0, 400)
        };
      }

      return {
        onTheMap: getStyles(".on_the_map"),
        locationOnMap: getStyles(".location_on_map"),
        mapSec: getStyles(".map_sec"),
        mapCards: getStyles(".map_cards"),
        cardsList: getStyles(".cards_list"),
        mapCard: getStyles(".map_card"),
        wrapperMapCard: getStyles(".wrapper_map_card"),
        imageMapCard: getStyles(".image_map_card"),
        contentInfo: getStyles(".content_info"),
        subBox: getStyles(".sub_box"),
        subtitleText: getStyles(".subtitle_text"),
        titleMapCard: getStyles(".title_map_card"),
        mapBox: getStyles(".map_box"),
        faqSection: getStyles(".faqs.black"),
        faqHeading: getStyles(".faqs.black .faq_heading"),
        shortLeft: getStyles(".faqs.black .short_left"),
        captionFaq: getStyles(".faqs.black .caption_faq"),
        bottomFaq: getStyles(".faqs.black .bottom_faq"),
        captionCta: getStyles(".faqs.black .caption_cta"),
        faqGeneral: getStyles(".faqs.black .faq_general"),
        accordionItem: getStyles(".faqs.black .accordion-item"),
        itemTitle: getStyles(".faqs.black .item_title"),
        iconWrapper: getStyles(".faqs.black .icon_wrapper")
      };
    })()
  `;

  const res = await sendSession("Runtime.evaluate", {
    expression: code,
    returnByValue: true
  });

  fs.writeFileSync("docs/reference/21oaks/computed-styles.json", JSON.stringify(res.result.value, null, 2));
  console.log("Saved computed styles to docs/reference/21oaks/computed-styles.json");

  ws.close();
  chrome.kill();
}

run().catch(console.error);
