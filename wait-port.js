/**
 * wait-port.js
 * Polls the backend /health HTTP endpoint until it returns 200 (meaning both
 * the Express server AND MongoDB are fully ready). Only then starts Vite.
 *
 * This prevents the ECONNRESET / ECONNREFUSED errors that occurred when Vite
 * fired initial API requests before the backend was fully initialised.
 */

const http = require('http');

const HOST     = '127.0.0.1';
const PORT     = 8085;
const INTERVAL = 500;   // ms between polls
const TIMEOUT  = 90000; // 90 s max wait

const start = Date.now();

function check() {
  const req = http.request(
    { host: HOST, port: PORT, path: '/health', method: 'GET', timeout: 2000 },
    (res) => {
      if (res.statusCode === 200) {
        console.log(`[wait-port] Backend is ready (HTTP 200). Starting client...`);
        process.exit(0);
      } else {
        // 503 = server up but DB still connecting — keep waiting
        retry(`HTTP ${res.statusCode} — DB still starting`);
      }
      // Consume and discard body so the socket is freed
      res.resume();
    }
  );

  req.on('error', (err) => retry(err.code || err.message));
  req.on('timeout', () => { req.destroy(); retry('timeout'); });
  req.end();
}

function retry(reason) {
  if (Date.now() - start > TIMEOUT) {
    console.error('[wait-port] Timed out waiting for backend to become ready.');
    process.exit(1);
  }
  process.stdout.write(`\r[wait-port] Waiting for backend... (${reason})          `);
  setTimeout(check, INTERVAL);
}

console.log(`[wait-port] Waiting for backend on ${HOST}:${PORT}/health ...`);
check();
