const fs = require('fs');
const files = [
  './src/components/layout/Header.jsx',
  './src/components/layout/Footer.jsx',
  './src/components/layout/MobileBottomNav.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    const regexps = [
      { from: /from\s+['"]\.\.\/context/g, to: "from '../../context" },
      { from: /from\s+['"]\.\.\/store/g, to: "from '../../store" },
      { from: /from\s+['"]\.\.\/hooks/g, to: "from '../../hooks" },
      { from: /from\s+['"]\.\.\/assets/g, to: "from '../../assets" },
      { from: /from\s+['"]\.\.\/utils/g, to: "from '../../utils" },
      { from: /from\s+['"]\.\.\/api/g, to: "from '../../api" },
      // What about ./ components?
      { from: /from\s+['"]\.\/(?!layout)/g, to: "from '../" }
    ];

    regexps.forEach(({ from, to }) => {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated imports in ${file}`);
    }
  }
});
