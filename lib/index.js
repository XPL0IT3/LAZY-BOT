"use strict";

/* ===== LAZY BOT — Banner full update (tanpa dependency) =====
   - Memakai teks custom yang kamu kasih (3 baris ▒█…)
   - Gradien ANSI 256-color (magenta → cyan)
   - Auto center sesuai lebar terminal
   - Border kotak rapi
   - Matikan warna: NO_COLOR=1  |  Matikan banner: NO_BANNER=1
   ============================================================ */
(() => {
  if (process.env.NO_BANNER === "1" || !process.stdout.isTTY) return;

  const RESET = "\x1b[0m";
  const BOLD = "\x1b[1m";
  const fg256 = (n) => (process.env.NO_COLOR ? "" : `\x1b[38;5;${n}m`);
  const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");

  // === ART: pakai persis teks dari kamu ===
  const art = [
    "▒█░░░ █▀▀█ ▀▀█ █░░█ ░░ █▀▀▄ █▀▀█ ▀▀█▀▀",
    "▒█░░░ █▄▄█ ▄▀░ █▄▄█ ▀▀ █▀▀▄ █░░█ ░░█░░",
    "▒█▄▄█ ▀░░▀ ▀▀▀ ▄▄▄█ ░░ ▀▀▀░ ▀▀▀▀ ░░▀░░",
  ];

  // === Perhitungan lebar & border ===
  const width = Math.max(60, Math.min(process.stdout.columns || 80, 120));
  const inner = Math.max(...art.map((l) => l.length)) + 2; // +2 padding kiri/kanan
  const boxInner = Math.min(inner, width - 6); // sisakan ruang untuk border + centering
  const horiz = "─".repeat(boxInner);
  const top = `╭${horiz}╮`;
  const bottom = `╰${horiz}╯`;

  const padCenter = (lineRaw) => {
    const visibleLen = stripAnsi(lineRaw).length;
    const left = Math.max(0, Math.floor((width - visibleLen) / 2));
    return " ".repeat(left) + lineRaw;
  };

  // === Gradien per baris: 201 (pink) → 51 (cyan) ===
  const start = 201, end = 51, n = art.length + 2;
  const tone = (i) =>
    Math.round(start + (end - start) * (i / Math.max(1, n - 1)));

  const frame = (s) => {
    const padSize = Math.max(0, boxInner - s.length);
    const right = " ".repeat(padSize);
    return `│ ${s}${right.slice(0, Math.max(0, padSize - 1))} │`;
  };

  const lines = [
    padCenter(`${BOLD}${fg256(tone(0))}${top}${RESET}`),
    ...art.map((l, i) =>
      padCenter(`${BOLD}${fg256(tone(i + 1))}${frame(l)}${RESET}`)
    ),
    padCenter(`${BOLD}${fg256(tone(art.length + 1))}${bottom}${RESET}`),
  ];

  console.log("\n" + lines.join("\n") + "\n");
})();
