import React, { useEffect, useRef } from "react";

export default function EndlessStairsGame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const msgRef = useRef<HTMLParagraphElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const nickBlockRef = useRef<HTMLDivElement>(null);
  const nickInputRef = useRef<HTMLInputElement>(null);
  const saveLbBtnRef = useRef<HTMLButtonElement>(null);
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const runSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const scoreEl = scoreRef.current;
    const hintEl = hintRef.current;
    const overlay = overlayRef.current;
    const titleEl = titleRef.current;
    const msgEl = msgRef.current;
    const startBtn = startBtnRef.current;
    const timerEl = timerRef.current;
    const nickBlock = nickBlockRef.current;
    const nickInput = nickInputRef.current;
    const saveLbBtn = saveLbBtnRef.current;
    const leaderboardEl = leaderboardRef.current;
    const runSummaryEl = runSummaryRef.current;

    if (
      !root ||
      !canvas ||
      !scoreEl ||
      !hintEl ||
      !overlay ||
      !titleEl ||
      !msgEl ||
      !startBtn ||
      !timerEl ||
      !nickBlock ||
      !nickInput ||
      !saveLbBtn ||
      !leaderboardEl ||
      !runSummaryEl
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDisposed = false;
    let animFrameId: number;

    function setNickPromptOpen(open: boolean) {
      if (!nickBlock) return;
      if (open) {
        nickBlock.classList.add("es-nick-open");
        nickBlock.setAttribute("aria-hidden", "false");
      } else {
        nickBlock.classList.remove("es-nick-open");
        nickBlock.setAttribute("aria-hidden", "true");
      }
    }

    const STATE_MENU = 0;
    const STATE_PLAY = 1;
    const STATE_OVER = 2;

    let W = 320;
    let H = 560;
    let DPR = 1;

    let gameState = STATE_MENU;
    let camY = 0;

    const player = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 9,
      onGround: false,
      facing: 1,
    };

    const MOVE = 220;
    const JUMP = 575;
    const GRAVITY = 950;
    const MAX_FALL = -620;

    interface Platform {
      y: number;
      w: number;
      x: number;
      seed: number;
      id: number;
      isBase: boolean;
      crumbleLeft: number | null;
      crumbleTotal?: number;
    }

    let platforms: Platform[] = [];
    let maxY = 0;
    let startBasY = 0;

    const CLEAN_RANGE = 3200;
    const DIFF_RAMP = 3800;
    const METER_MAX = 50000;
    const LEVEL_STEP = 5000;
    const MAX_LEVEL = 10;
    const LEADER_MIN = 30000;
    const FINISH_M = 49000;
    const RUN_MS = 10 * 60 * 1000;
    const LB_KEY = "endlessStairs21oaksLb_v1";

    const CRUMBLE_ALT_MIN = 1200;
    const CRUMBLE_DELAY_TOP = 0.36;
    const CRUMBLE_DELAY_BOTTOM = 0.55;

    let nextPlatformId = 1;
    let mountedPlatId: number | null = null;

    let runStartTime = 0;
    let lastEndMeters = 0;
    let lastEndKind = "";
    let lastRunElapsedMs = 0;

    function rng(seed: number) {
      let s = seed % 2147483647;
      if (s <= 0) s += 2147483646;
      return function () {
        return (s = (s * 16807) % 2147483647) / 2147483647;
      };
    }

    function addPlatform(y: number, width: number, cx: number, seed: number, isBase = false) {
      const id = nextPlatformId++;
      platforms.push({
        y,
        w: width,
        x: cx,
        seed: seed | 0,
        id: id,
        isBase: !!isBase,
        crumbleLeft: null,
      });
    }

    function platformById(id: number) {
      for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].id === id) return platforms[i];
      }
      return null;
    }

    function crumbleDelayForSurface(surfaceY: number) {
      const alt = surfaceY - startBasY;
      if (alt < CRUMBLE_ALT_MIN) return CRUMBLE_DELAY_BOTTOM;
      const u = Math.min(1, (alt - CRUMBLE_ALT_MIN) / 5200);
      return CRUMBLE_DELAY_BOTTOM - u * (CRUMBLE_DELAY_BOTTOM - CRUMBLE_DELAY_TOP);
    }

    function tryScheduleCrumble(platId: number) {
      const p = platformById(platId);
      if (!p || p.isBase) return;
      if (p.y - startBasY < CRUMBLE_ALT_MIN) return;
      if (p.crumbleLeft != null) return;
      const d = crumbleDelayForSurface(p.y);
      p.crumbleLeft = d;
      p.crumbleTotal = d;
    }

    function peakJump() {
      return (JUMP * JUMP) / (2 * GRAVITY);
    }

    function difficultyAtHeight(worldY: number) {
      const h = Math.max(0, worldY - startBasY);
      const t = Math.min(1, h / DIFF_RAMP);
      return t * t * (3 - 2 * t);
    }

    function maxStepVertical(rnd: () => number, surfaceY: number) {
      const j = peakJump();
      const d = difficultyAtHeight(surfaceY);
      const lo = 36 + d * 30;
      const hi = 68 + d * (Math.min(j * 0.9, 162) - 68);
      return lo + rnd() * (hi - lo);
    }

    function platformWidth(rnd: () => number, surfaceY: number) {
      const d = difficultyAtHeight(surfaceY);
      const wide = 80 + rnd() * 68;
      const narrow = 48 + rnd() * 52;
      return wide + (narrow - wide) * d;
    }

    function clampCx(pw: number, cx: number) {
      const margin = pw / 2 + 14;
      return Math.max(margin, Math.min(W - margin, cx));
    }

    function nextCenter(prevX: number, pw: number, rnd: () => number, surfaceY: number) {
      const d = difficultyAtHeight(surfaceY);
      const easy = 64 + rnd() * 50;
      const hard = 96 + rnd() * 88;
      const maxStep = easy + (hard - easy) * d;
      return clampCx(pw, prevX + (rnd() - 0.5) * 2 * maxStep);
    }

    function generateInitial() {
      platforms = [];
      nextPlatformId = 1;
      mountedPlatId = null;
      const base = 80;
      startBasY = base;
      player.x = W * 0.5;
      player.y = base + player.r;
      player.vx = 0;
      player.vy = 0;
      maxY = player.y;
      camY = 0;

      addPlatform(base, W * 0.92, W * 0.5, 101, true);

      let py = base;
      const rnd = rng(42);
      let prevX = W * 0.5;
      for (let i = 0; i < 50; i++) {
        let gap;
        if (i < 7) {
          gap = 38 + rnd() * 30;
        } else {
          gap = maxStepVertical(rnd, py);
        }
        py += gap;
        const pw = platformWidth(rnd, py);
        const cx = nextCenter(prevX, pw, rnd, py);
        prevX = cx;
        addPlatform(py, pw, cx, 200 + i * 17);
      }
    }

    function extendWorld(topWorldY: number) {
      const last = platforms.length ? platforms[platforms.length - 1] : null;
      let top = last ? last.y : startBasY;
      let prevX = last ? last.x : W * 0.5;
      const rnd = rng(Math.floor(top * 0.01) + 900);
      while (top < topWorldY + 800) {
        const gap = maxStepVertical(rnd, top);
        top += gap;
        const pw = platformWidth(rnd, top);
        const cx = nextCenter(prevX, pw, rnd, top);
        prevX = cx;
        addPlatform(top, pw, cx, (Math.floor(top) ^ 1337) >>> 0);
      }
    }

    function cullPlatforms(bottomY: number) {
      platforms = platforms.filter((p) => p.y > bottomY - 200);
    }

    function climbMetersRaw() {
      return Math.max(0, Math.round(maxY - player.r - startBasY));
    }

    function climbMeters() {
      return Math.min(METER_MAX, climbMetersRaw());
    }

    function levelFromMeters(m: number) {
      return Math.min(MAX_LEVEL, 1 + Math.floor(m / LEVEL_STEP));
    }

    function cleanliness() {
      const h = climbMeters();
      return Math.min(1, h / CLEAN_RANGE);
    }

    function handLinePath(x0: number, y0: number, x1: number, y1: number, seed: number, amp: number) {
      if (!ctx) return;
      const seg = 14;
      const rnd = rng(seed);
      ctx.beginPath();
      for (let i = 0; i <= seg; i++) {
        const t = i / seg;
        const x = x0 + (x1 - x0) * t;
        const w1 = Math.sin(seed * 0.01 + t * 9) * 0.55;
        const w2 = Math.sin(seed * 0.02 + t * 21 + 1.3) * 0.35;
        const w3 = (rnd() - 0.5) * 0.15;
        const y = y0 + (w1 + w2 + w3) * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    }

    interface NoiseDot {
      x: number;
      y: number;
      s: number;
      o: number;
    }
    let noiseDots: NoiseDot[] = [];
    function initNoiseDots() {
      noiseDots = [];
      const rnd = rng(777);
      for (let i = 0; i < 90; i++) {
        noiseDots.push({
          x: rnd() * W,
          y: rnd() * H,
          s: 0.5 + rnd() * 1.8,
          o: 0.08 + rnd() * 0.2,
        });
      }
    }

    function drawBackground(cl: number) {
      if (!ctx) return;
      const topC = { r: 250, g: 249, b: 247 };
      const botC = { r: 180, g: 170, b: 158 };
      const r = botC.r + (topC.r - botC.r) * cl;
      const g = botC.g + (topC.g - botC.g) * cl;
      const b = botC.b + (topC.b - botC.b) * cl;
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(0, 0, W, H);

      const n = Math.floor(noiseDots.length * (1 - cl * 0.95));
      for (let i = 0; i < n; i++) {
        const d = noiseDots[i];
        ctx.globalAlpha = d.o * (1 - cl);
        ctx.fillStyle = "#5c5349";
        ctx.fillRect(d.x % W, d.y % H, d.s, d.s);
      }
      ctx.globalAlpha = 1;

      if (cl < 0.65) {
        ctx.strokeStyle = "rgba(80, 72, 64, " + (0.07 * (1 - cl)) + ")";
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          const off = ((Date.now() * 0.02 + i * 31) % (W + H)) | 0;
          ctx.beginPath();
          ctx.moveTo(off * 0.4, 0);
          ctx.lineTo(off * 0.25, H);
          ctx.stroke();
        }
      }
    }

    function worldToScreen(wx: number, wy: number) {
      return {
        x: wx,
        y: H - (wy - camY),
      };
    }

    function draw() {
      if (!ctx) return;
      const cl = cleanliness();

      drawBackground(cl);

      const lineJit = 6 * (1 - cl) + 0.8;
      const lineW = 1.2 + (1 - cl) * 0.9;
      const colMix = 30 + Math.floor(40 * (1 - cl));
      ctx.strokeStyle =
        "rgb(" + colMix + "," + Math.max(15, colMix - 8) + "," + Math.max(10, colMix - 12) + ")";
      ctx.lineWidth = lineW;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const p of platforms) {
        const left = p.x - p.w * 0.5;
        const right = p.x + p.w * 0.5;
        const sL = worldToScreen(left, p.y);
        const sR = worldToScreen(right, p.y);
        if (sL.y < -30 || sL.y > H + 40) continue;
        const ct = p.crumbleTotal || 1;
        if (p.crumbleLeft != null && ct > 0) {
          ctx.globalAlpha = Math.max(0.14, p.crumbleLeft / ct);
        } else {
          ctx.globalAlpha = 1;
        }
        handLinePath(sL.x, sL.y, sR.x, sR.y, p.seed, lineJit);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const ps = worldToScreen(player.x, player.y);
      ctx.save();
      ctx.translate(ps.x, ps.y);
      ctx.scale(player.facing, 1);
      ctx.strokeStyle =
        "rgb(" +
        (18 + colMix * 0.1) +
        "," +
        (16 + colMix * 0.08) +
        "," +
        (14 + colMix * 0.06) +
        ")";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, -player.r * 1.15);
      ctx.lineTo(0, player.r * 0.85);
      ctx.moveTo(-player.r * 0.75, 0);
      ctx.lineTo(player.r * 0.75, 0);
      ctx.moveTo(0, player.r * 0.85);
      ctx.lineTo(-player.r * 0.45, player.r * 1.85);
      ctx.moveTo(0, player.r * 0.85);
      ctx.lineTo(player.r * 0.45, player.r * 1.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -player.r * 1.35, player.r * 0.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function horizOverlap(px: number, pr: number, plat: Platform) {
      const half = plat.w * 0.5;
      return px + pr > plat.x - half && px - pr < plat.x + half;
    }

    let inputLeft = false;
    let inputRight = false;

    function step(dt: number) {
      if (gameState !== STATE_PLAY) return;

      let ax = 0;
      if (inputLeft) ax -= 1;
      if (inputRight) ax += 1;
      if (ax !== 0) {
        player.vx = ax * MOVE;
        player.facing = ax > 0 ? 1 : -1;
      } else {
        player.vx *= Math.pow(0.12, dt);
      }

      player.vy -= GRAVITY * dt;
      if (player.vy < MAX_FALL) player.vy = MAX_FALL;

      player.x += player.vx * dt;
      player.y += player.vy * dt;

      if (player.x < player.r) {
        player.x = player.r;
        player.vx *= -0.35;
      }
      if (player.x > W - player.r) {
        player.x = W - player.r;
        player.vx *= -0.35;
      }

      player.onGround = false;

      const prevMounted = mountedPlatId;
      mountedPlatId = null;

      if (player.vy <= 0) {
        const prevCenter = player.y - player.vy * dt;
        const prevFeet = prevCenter - player.r;
        const feet = player.y - player.r;
        for (let pi = 0; pi < platforms.length; pi++) {
          const p = platforms[pi];
          if (p.crumbleLeft != null && p.crumbleLeft <= 0) continue;
          const py = p.y;
          if (!horizOverlap(player.x, player.r, p)) continue;
          const crossed = prevFeet > py && feet <= py + 14;
          const onTop = feet <= py + 9 && feet >= py - 3;
          if (crossed || onTop) {
            player.y = py + player.r;
            player.vy = 0;
            player.onGround = true;
            mountedPlatId = p.id;
            break;
          }
        }
      }

      if (prevMounted != null && prevMounted !== mountedPlatId) {
        tryScheduleCrumble(prevMounted);
      }

      for (let pi = 0; pi < platforms.length; pi++) {
        const p = platforms[pi];
        if (p.crumbleLeft == null) continue;
        p.crumbleLeft -= dt;
        if (p.crumbleLeft <= 0) {
          p.crumbleLeft = 0;
        }
      }
      platforms = platforms.filter(function (p) {
        return p.crumbleLeft == null || p.crumbleLeft > 0;
      });
      if (mountedPlatId != null && !platformById(mountedPlatId)) {
        mountedPlatId = null;
        player.onGround = false;
      }

      if (player.y > maxY) maxY = player.y;

      if (climbMetersRaw() >= FINISH_M) {
        gameOver("finish");
        return;
      }
      if (runStartTime && Date.now() - runStartTime >= RUN_MS) {
        gameOver("timeout");
        return;
      }
      if (player.y - player.r < startBasY - 2) {
        gameOver("pit");
        return;
      }

      const targetCamBottom = player.y - H * 0.38;
      camY += (targetCamBottom - camY) * Math.min(1, dt * 4.2);

      extendWorld(camY + H);
      cullPlatforms(camY - 120);
    }

    function escapeHtml(s: string) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    interface LeaderRow {
      nick: string;
      meters: number;
      ts: number;
      kind?: string;
      runMs?: number;
    }

    function loadLb(): LeaderRow[] {
      try {
        const raw = localStorage.getItem(LB_KEY);
        if (!raw) return [];
        const a = JSON.parse(raw);
        return Array.isArray(a) ? a : [];
      } catch (e) {
        return [];
      }
    }

    function saveLb(rows: LeaderRow[]) {
      try {
        localStorage.setItem(LB_KEY, JSON.stringify(rows));
      } catch (e) {}
    }

    function renderLeaderboard() {
      let rows = loadLb().filter(function (r) {
        return r && typeof r.meters === "number" && r.meters >= LEADER_MIN;
      });
      rows.sort(function (a, b) {
        return b.meters - a.meters;
      });
      rows = rows.slice(0, 30);
      if (rows.length === 0) {
        leaderboardEl!.innerHTML =
          '<div class="es-lb-empty">No entries yet. Reach 30,000 m or more, then save your nickname.</div>';
        return;
      }
      let html =
        '<table><thead><tr><th>#</th><th>Player</th><th class="es-lb-m">Meters</th><th class="es-lb-t">Time</th></tr></thead><tbody>';
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const date = new Date(r.ts || 0);
        const ds = isNaN(date.getTime())
          ? ""
          : date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
        html +=
          "<tr><td>" +
          (i + 1) +
          "</td><td>" +
          escapeHtml(r.nick || "—") +
          (ds
            ? ' <span style="opacity:0.45;font-size:0.85em">' + escapeHtml(ds) + "</span>"
            : "") +
          '</td><td class="es-lb-m">' +
          Math.round(r.meters).toLocaleString("en-US") +
          '</td><td class="es-lb-t">' +
          formatRunTimeMs(r.runMs) +
          "</td></tr>";
      }
      html += "</tbody></table>";
      leaderboardEl!.innerHTML = html;
    }

    function formatRunTimeMs(ms?: number) {
      if (ms == null || !isFinite(ms) || ms < 0) return "—";
      const s = Math.floor(ms / 1000);
      const m = Math.floor(s / 60);
      const r = s % 60;
      return m + ":" + String(r).padStart(2, "0");
    }

    function commitLeaderboard() {
      const nick = nickInput!.value.trim();
      if (nick.length < 2) {
        alert("Enter a nickname (at least 2 characters).");
        return;
      }
      if (lastEndMeters < LEADER_MIN) return;
      const rows = loadLb();
      rows.push({
        nick: nick.slice(0, 32),
        meters: lastEndMeters,
        ts: Date.now(),
        kind: lastEndKind,
        runMs: lastRunElapsedMs,
      });
      const best = new Map<string, LeaderRow>();
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (!r || !r.nick || r.meters < LEADER_MIN) continue;
        const k = r.nick.toLowerCase();
        const o = best.get(k);
        if (!o || r.meters > o.meters) best.set(k, r);
      }
      const merged = Array.from(best.values())
        .sort(function (a, b) {
          return b.meters - a.meters;
        })
        .slice(0, 30);
      saveLb(merged);
      setNickPromptOpen(false);
      nickInput!.value = "";
      runSummaryEl!.innerHTML = "";
      renderLeaderboard();
    }

    function gameOver(kind: string) {
      if (gameState !== STATE_PLAY) return;
      const elapsedMs = runStartTime ? Date.now() - runStartTime : 0;
      gameState = STATE_OVER;
      runStartTime = 0;
      lastRunElapsedMs = elapsedMs;
      lastEndKind = kind;
      const raw = climbMetersRaw();
      lastEndMeters = Math.min(METER_MAX, raw);
      if (kind === "finish") {
        lastEndMeters = Math.min(METER_MAX, Math.max(FINISH_M, lastEndMeters));
        titleEl!.textContent = "Finish";
        msgEl!.textContent = "You reached 49,000 m — run complete.";
      } else if (kind === "timeout") {
        titleEl!.textContent = "Time's up";
        msgEl!.textContent =
          "10 minutes are over. Your result: " +
          lastEndMeters.toLocaleString("en-US") +
          " m.";
      } else {
        titleEl!.textContent = "Fall";
        msgEl!.textContent =
          "Below the start platform. Max height: " +
          lastEndMeters.toLocaleString("en-US") +
          " m.";
      }
      startBtn!.textContent = "Play again";
      const showSave = lastEndMeters >= LEADER_MIN;
      setNickPromptOpen(showSave);
      nickInput!.value = "";
      if (showSave) {
        runSummaryEl!.innerHTML =
          '<div class="es-sum-line"><span>Result</span><strong>' +
          lastEndMeters.toLocaleString("en-US") +
          " m</strong></div>" +
          '<div class="es-sum-line"><span>Time</span><strong>' +
          formatRunTimeMs(lastRunElapsedMs) +
          "</strong></div>" +
          '<p class="es-sum-hint">Add your nickname to save this run to the leaderboard.</p>';
      } else {
        runSummaryEl!.innerHTML = "";
      }
      overlay!.classList.add("visible");
      renderLeaderboard();
      updateScoreUI();
      updateTimerHud();
      if (showSave) {
        setTimeout(function () {
          try {
            nickInput!.focus();
          } catch (e) {}
        }, 100);
      }
    }

    function tryJump() {
      if (gameState !== STATE_PLAY) return;
      if (player.onGround) player.vy = JUMP;
    }

    function updateTimerHud() {
      if (!timerEl) return;
      if (gameState === STATE_PLAY && runStartTime) {
        const rem = Math.max(0, RUN_MS - (Date.now() - runStartTime));
        const mm = Math.floor(rem / 60000);
        const ss = Math.floor((rem % 60000) / 1000);
        timerEl.textContent = mm + ":" + String(ss).padStart(2, "0");
        timerEl.style.visibility = "visible";
      } else {
        timerEl.textContent = "";
        timerEl.style.visibility = "hidden";
      }
    }

    function updateScoreUI() {
      if (!scoreEl || !hintEl) return;
      const cl = cleanliness();
      const m = climbMeters();
      const lvl = levelFromMeters(m);
      const mStr = m.toLocaleString("en-US");
      scoreEl.innerHTML =
        '<div class="es-score-left">' +
        '<span class="es-meters">↑ ' +
        mStr +
        " m</span>" +
        '<span class="es-level">Level ' +
        lvl +
        "</span>" +
        "</div>" +
        '<span class="es-brand" style="opacity:' +
        (0.5 + cl * 0.45) +
        '">21 Oaks</span>';
      const gray = Math.round(80 - cl * 55);
      const col = "rgb(" + gray + "," + gray + "," + gray + ")";
      scoreEl.style.color = col;
      hintEl.style.color = col;
      hintEl.style.opacity = String(Math.max(0, 0.88 - cl * 1.15));
    }

    let lastT = 0;
    function frame(t: number) {
      if (isDisposed) return;
      const dt = Math.min(0.05, lastT ? (t - lastT) / 1000 : 1 / 60);
      lastT = t;
      step(dt);
      draw();
      if (gameState === STATE_PLAY) updateScoreUI();
      updateTimerHud();
      animFrameId = requestAnimationFrame(frame);
    }

    function resize() {
      if (!root || !canvas || !ctx) return;
      const rect = root.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = Math.max(280, rect.width);
      const cssH = Math.max(400, rect.height);
      canvas.width = Math.floor(cssW * DPR);
      canvas.height = Math.floor(cssH * DPR);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      W = cssW;
      H = cssH;
      initNoiseDots();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();
    generateInitial();
    setNickPromptOpen(false);
    updateScoreUI();
    renderLeaderboard();
    updateTimerHud();

    function keyDown(e: KeyboardEvent) {
      const tg = e.target as HTMLElement | null;
      if (tg && (tg.tagName === "INPUT" || tg.tagName === "TEXTAREA")) return;
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        inputLeft = true;
        e.preventDefault();
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        inputRight = true;
        e.preventDefault();
      }
      if (e.code === "KeyW" || e.code === "KeyS") {
        e.preventDefault();
      }
      if (e.code === "ArrowUp" || e.code === "Space") {
        e.preventDefault();
        tryJump();
      }
    }
    function keyUp(e: KeyboardEvent) {
      if (e.code === "ArrowLeft" || e.code === "KeyA") inputLeft = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") inputRight = false;
    }
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    function pointerSide(clientX: number) {
      if (!root) return;
      const r = root.getBoundingClientRect();
      const nx = (clientX - r.left) / r.width;
      inputLeft = nx < 0.5;
      inputRight = nx >= 0.5;
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.target === startBtn || e.target === saveLbBtn || e.target === nickInput) return;
      if (gameState !== STATE_PLAY) return;
      root.setPointerCapture(e.pointerId);
      pointerSide(e.clientX);
      tryJump();
      e.preventDefault();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!root.hasPointerCapture(e.pointerId)) return;
      pointerSide(e.clientX);
    };
    const onPointerUp = (e: PointerEvent) => {
      inputLeft = false;
      inputRight = false;
      if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
    };
    const onPointerCancel = () => {
      inputLeft = false;
      inputRight = false;
    };

    root.addEventListener("pointerdown", onPointerDown, { passive: false });
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerCancel);

    const onSaveLbClick = () => {
      commitLeaderboard();
    };
    saveLbBtn.addEventListener("click", onSaveLbClick);

    const onStartClick = () => {
      overlay.classList.remove("visible");
      setNickPromptOpen(false);
      runSummaryEl.innerHTML = "";
      nickInput.value = "";
      generateInitial();
      gameState = STATE_PLAY;
      runStartTime = Date.now();
      titleEl.textContent = "Endless Stairs";
      msgEl.textContent = "";
      startBtn.textContent = "Play again";
      updateScoreUI();
      updateTimerHud();
    };
    startBtn.addEventListener("click", onStartClick);

    animFrameId = requestAnimationFrame(frame);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameId);
      ro.disconnect();
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerCancel);
      saveLbBtn.removeEventListener("click", onSaveLbClick);
      startBtn.removeEventListener("click", onStartClick);
    };
  }, []);

  return (
    <div
      className="endless-stairs-embed"
      id="endlessStairsRoot"
      ref={rootRef}
      role="application"
      aria-label="Endless Stairs mini game"
    >
      <canvas id="endlessStairsCanvas" ref={canvasRef} aria-hidden="true" />
      <div className="es-timer" id="esTimer" ref={timerRef} />
      <div className="es-score" id="esScore" ref={scoreRef} />
      <div className="es-hint" id="esHint" ref={hintRef}>
        <span>WASD or arrow keys — move left / right.</span>
        <span>Space — jump.</span>
      </div>
      <div className="es-overlay visible" id="esOverlay" ref={overlayRef}>
        <div className="es-overlay-hero">
          <h2 id="esTitle" ref={titleRef}>
            Endless Stairs
          </h2>
          <p id="esMsg" ref={msgRef}>
            Climb the hand-drawn lines. Higher is quieter.
          </p>
          <button type="button" className="es-btn" id="esStart" ref={startBtnRef}>
            Start
          </button>
          <div id="esNickBlock" className="es-nick-block" ref={nickBlockRef} aria-hidden="true">
            <div id="esRunSummary" className="es-run-summary" ref={runSummaryRef} aria-live="polite" />
            <label htmlFor="esNickInput">Your nickname</label>
            <input
              type="text"
              id="esNickInput"
              ref={nickInputRef}
              maxLength={32}
              placeholder="Player name"
              autoComplete="nickname"
            />
            <button type="button" className="es-btn es-btn--secondary" id="esSaveLb" ref={saveLbBtnRef}>
              Save to leaderboard
            </button>
          </div>
        </div>
        <div className="es-lb-panel">
          <div className="es-lb-head">Leaders (30,000+ m)</div>
          <div className="es-lb-table-wrap" id="esLeaderboard" ref={leaderboardRef} />
        </div>
      </div>
    </div>
  );
}
