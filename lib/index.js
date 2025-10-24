"use strict";

/* ============ preflight: clear dulu, baru banner ============ */
try {
  if (process && process.stdout && process.stdout.isTTY) console.clear();
} catch (_) { /* diem */ }

(() => {
  // Banner solid (tanpa gradient, tanpa deps)
  const RESET = "\x1b[0m";
  const BOLD  = "\x1b[1m";
  const COLOR = "\x1b[96m"; // 90..97 (ganti kalau mau)

  const lines = [
    "▒█░░░ █▀▀█ ▀▀█ █░░█ ░░ █▀▀▄ █▀▀█ ▀▀█▀▀",
    "▒█░░░ █▄▄█ ▄▀░ █▄▄█ ▀▀ █▀▀▄ █░░█ ░░█░░",
    "▒█▄▄█ ▀░░▀ ▀▀▀ ▄▄▄█ ░░ ▀▀▀░ ▀▀▀▀ ░░▀░░",
    "",
    "LAZY BOT"
  ];

  const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");
  const width = (process && process.stdout && process.stdout.columns) || 80;
  const center = (s) => " ".repeat(Math.max(0, Math.floor((width - stripAnsi(s).length) / 2))) + s;

  // log aman biar ga ganggu module loader
  const logSafe = (...a) => { try { console.log(...a); } catch(_){} };

  logSafe(
    "\n" +
    lines.map(l => center(`${BOLD}${COLOR}${l}${RESET}`)).join("\n") +
    "\n"
  );
})();

/* ================= TS helpers (aman, tanpa 'this.esModule') ================= */
var __createBinding = (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || (!("get" in desc) ? desc.writable || desc.configurable : true)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
});
var __importDefault = function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

/* ==================== kode asli Baileys (jangan diutak-atik) ==================== */
Object.defineProperty(exports, "__esModule", { value: true });
exports.proto = exports.makeWASocket = void 0;
const WAProto_1 = require("../WAProto");
Object.defineProperty(exports, "proto", { enumerable: true, get: function () { return WAProto_1.proto; } });

// Pastikan require("./Socket") berhasil → __importDefault akan aman karena mod dicek dulu
const Socket_1 = __importDefault(require("./Socket"));
exports.makeWASocket = Socket_1.default;

__exportStar(require("../WAProto"), exports);
__exportStar(require("./Utils"), exports);
__exportStar(require("./Types"), exports);
__exportStar(require("./Store"), exports);
__exportStar(require("./Defaults"), exports);
__exportStar(require("./WABinary"), exports);
__exportStar(require("./WAM"), exports);
__exportStar(require("./WAUSync"), exports);
exports.default = Socket_1.default;
