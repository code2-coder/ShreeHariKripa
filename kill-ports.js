/**
 * kill-ports.js
 * Finds and terminates any processes running on the backend port (8085)
 * and frontend port (5173) before starting the development servers.
 * This prevents EADDRINUSE errors and zombie processes from previous sessions.
 */

const { execSync } = require('child_process');

const PORTS = [8085, 5173];

function killProcessOnPort(port) {
  const isWin = process.platform === 'win32';
  try {
    if (isWin) {
      // Find PID on Windows using netstat
      const output = execSync(`netstat -ano | findstr :${port}`).toString().trim();
      const lines = output.split('\n');
      const pids = new Set();
      
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') {
            pids.add(pid);
          }
        }
      }
      
      for (const pid of pids) {
        console.log(`[kill-ports] Found process ${pid} on port ${port}. Terminating...`);
        try {
          execSync(`taskkill /F /PID ${pid}`);
          console.log(`[kill-ports] Successfully terminated process ${pid}.`);
        } catch (err) {
          console.log(`[kill-ports] Failed to terminate process ${pid}: ${err.message}`);
        }
      }
    } else {
      // Find PID on Unix (Mac/Linux) using lsof
      try {
        const pid = execSync(`lsof -t -i:${port}`).toString().trim();
        if (pid) {
          const pids = pid.split('\n');
          for (const p of pids) {
            console.log(`[kill-ports] Found process ${p} on port ${port}. Terminating...`);
            execSync(`kill -9 ${p}`);
            console.log(`[kill-ports] Successfully terminated process ${p}.`);
          }
        }
      } catch (e) {
        // lsof returns exit code 1 if no process matches, which is fine
      }
    }
  } catch (error) {
    // If no process is listening, netstat/lsof will fail/return empty, which is normal
  }
}

console.log('[kill-ports] Cleaning up ports 8085 and 5173...');
PORTS.forEach(killProcessOnPort);
console.log('[kill-ports] Ports cleanup complete.');
