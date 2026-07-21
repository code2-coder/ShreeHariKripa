const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.js')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });
  return arrayOfFiles;
}

const mwDir = path.join(srcDir, 'middlewares');
const mwDest = path.join(srcDir, 'middleware');

if (fs.existsSync(mwDir)) {
  fs.mkdirSync(mwDest, { recursive: true });
  let entries = fs.readdirSync(mwDir);
  entries.forEach(e => fs.copyFileSync(path.join(mwDir, e), path.join(mwDest, e)));
  fs.rmSync(mwDir, { recursive: true, force: true });
  console.log('Moved middlewares to middleware');
}

const allFiles = getAllFiles(srcDir);
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('/middlewares/')) {
    content = content.replace(/\/middlewares\//g, '/middleware/');
    changed = true;
  }
  if (content.includes("from './middlewares'")) {
    content = content.replace(/from '\.\/middlewares'/g, "from './middleware'");
    changed = true;
  }
  if (content.includes("from '../middlewares'")) {
    content = content.replace(/from '\.\.\/middlewares'/g, "from '../middleware'");
    changed = true;
  }
  if (content.includes("from '../../middlewares'")) {
    content = content.replace(/from '\.\.\/\.\.\/middlewares'/g, "from '../../middleware'");
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated imports in', file);
  }
});
