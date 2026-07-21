const net = require('net');

const port = 8085;
const host = '127.0.0.1';
const interval = 300; // ms
const timeout = 60000; // 60 seconds max

const start = Date.now();

function check() {
  const socket = new net.Socket();
  
  socket.on('connect', () => {
    socket.destroy();
    console.log(`Backend port ${port} is open. Starting client...`);
    process.exit(0);
  });
  
  socket.on('error', () => {
    socket.destroy();
    retry();
  });
  
  socket.connect(port, host);
}

function retry() {
  if (Date.now() - start > timeout) {
    console.error('Timed out waiting for backend to start.');
    process.exit(1);
  }
  setTimeout(check, interval);
}

console.log(`Waiting for backend server to start on ${host}:${port}...`);
check();
