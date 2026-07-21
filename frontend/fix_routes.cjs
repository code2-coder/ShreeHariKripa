const fs = require('fs');
let content = fs.readFileSync('./src/routes/index.jsx', 'utf8');
content = content.replace(/from '\.\/pages/g, "from '../pages");
content = content.replace(/from '\.\/components/g, "from '../components");
content = content.replace(/from '\.\/admin/g, "from '../admin");
fs.writeFileSync('./src/routes/index.jsx', content);
