const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Redux -> Store replacements
  if (content.includes('/redux/')) { content = content.replace(/\/redux\//g, '/store/'); changed = true; }
  if (content.includes("from './redux'")) { content = content.replace(/from '\.\/redux'/g, "from './store'"); changed = true; }
  if (content.includes("from '../redux'")) { content = content.replace(/from '\.\.\/redux'/g, "from '../store'"); changed = true; }
  if (content.includes("from '../../redux'")) { content = content.replace(/from '\.\.\/\.\.\/redux'/g, "from '../../store'"); changed = true; }
  
  // Layout components
  if (content.includes('/components/Header')) { content = content.replace(/\/components\/Header/g, '/components/layout/Header'); changed = true; }
  if (content.includes('/components/Footer')) { content = content.replace(/\/components\/Footer/g, '/components/layout/Footer'); changed = true; }
  if (content.includes('/components/MobileBottomNav')) { content = content.replace(/\/components\/MobileBottomNav/g, '/components/layout/MobileBottomNav'); changed = true; }
  
  // UI components
  if (content.includes('/ui/DropdownMenu')) { content = content.replace(/\/ui\/DropdownMenu/g, '/components/ui/DropdownMenu'); changed = true; }
  if (content.includes("from '../ui'")) { content = content.replace(/from '\.\.\/ui'/g, "from '../components/ui'"); changed = true; }
  if (content.includes("from '../../ui'")) { content = content.replace(/from '\.\.\/\.\.\/ui'/g, "from '../../components/ui'"); changed = true; }

  // Routes
  if (content.includes("./routes.jsx")) { content = content.replace(/\.\/routes\.jsx/g, "./routes"); changed = true; }
  if (content.includes("from './routes'")) { 
    // it was routes.jsx, now it's routes/index.jsx, so from './routes' is valid
  }
  
  // Update the App.jsx that imports routes.jsx
  // "import AppRoutes from './routes';" is already fine.

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in ${file}`);
  }
});
