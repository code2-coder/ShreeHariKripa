const fs = require('fs');
let content = fs.readFileSync('./src/routes/index.jsx', 'utf8');
content = content.replace(/"\.\/pages/g, '"../pages');
content = content.replace(/"\.\/components/g, '"../components');
fs.writeFileSync('./src/routes/index.jsx', content);
