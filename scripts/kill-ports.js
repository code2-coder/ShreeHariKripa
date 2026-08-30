const { execSync } = require('child_process');

const PORTS = [8085, 5173];

function isPortInUse(port) {
  const isWin = process.platform === 'win32';
  try {
    if (isWin) {
      const output = execSync(`netstat -ano | findstr :${port}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
      return output.length > 0;
    } else {
      const output = execSync(`lsof -t -i:${port}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
      return output.length > 0;
    }
  } catch (_) {
    return false;
  }
}

function killProcessOnPort(port) {
  const isWin = process.platform === 'win32';
  try {
    if (isWin) {
      let output = '';
      try {
        output = execSync(`netstat -ano | findstr :${port}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
      } catch (_) {
        return;
      }

      const lines = output.split('\n');
      const pids = new Set();

      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0' && pid !== 'PID') {
            pids.add(pid);
          }
        }
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: ['pipe', 'pipe', 'ignore'] });
          console.log(`[kill-ports] Successfully terminated process ${pid} on port ${port}.`);
        } catch (_) {
          // Process might have already terminated
        }
      }
    } else {
      try {
        const pid = execSync(`lsof -t -i:${port}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
        if (pid) {
          const pids = pid.split('\n');
          for (const p of pids) {
            try {
              execSync(`kill -9 ${p}`, { stdio: ['pipe', 'pipe', 'ignore'] });
              console.log(`[kill-ports] Successfully terminated process ${p} on port ${port}.`);
            } catch (_) {
              // Process already terminated
            }
          }
        }
      } catch (_) {}
    }
  } catch (_) {}
}

console.log('[kill-ports] Cleaning up ports 8085 and 5173...');
PORTS.forEach(killProcessOnPort);

// Wait up to 3 seconds for ports to be completely freed
const start = Date.now();
while (PORTS.some(isPortInUse) && Date.now() - start < 3000) {
  const waitMs = 100;
  const waitTill = Date.now() + waitMs;
  while (Date.now() < waitTill) {}
}

console.log('[kill-ports] Ports cleanup complete.');

