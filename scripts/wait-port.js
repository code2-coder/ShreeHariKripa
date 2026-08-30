/**
 * scripts/wait-port.js
 * Polls the backend /health HTTP endpoint until it returns 200 (meaning both
 * the Express server AND MongoDB are fully ready). Only then starts Vite.
 *
 * Prevents ECONNRESET / ECONNREFUSED errors that occur when Vite
 * fires initial API requests before backend services are ready.
 */

const http = require('http');

const HOST     = process.env.HOST || '127.0.0.1';
const PORT     = Number(process.env.PORT) || 8085;
const INTERVAL = 500;   // ms between polls
const TIMEOUT  = 90000; // 90 s max wait

const start = Date.now();

function check() {
  const req = http.request(
    { host: HOST, port: PORT, path: '/health', method: 'GET', timeout: 2000 },
    (res) => {
      if (res.statusCode === 200) {
        console.log(`[wait-port] Backend is ready (HTTP 200). Starting frontend client...`);
        process.exit(0);
      } else {
        // 503 = server up but DB still connecting — keep waiting
        retry();
      }
      res.resume();
    }
  );

  req.on('error', () => retry());
  req.on('timeout', () => { req.destroy(); retry(); });
  req.end();
}

function retry() {
  if (Date.now() - start > TIMEOUT) {
    console.error('[wait-port] Timed out waiting for backend to become ready.');
    process.exit(1);
  }
  setTimeout(check, INTERVAL);
}

console.log(`[wait-port] Waiting for backend (http://${HOST}:${PORT}/health)...`);
check();
