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

    // Fix mixed quotes
    const badQuotes = [
      { from: /from\s+'(\.\.\/.*?)";/g, to: 'from "$1";' },
      { from: /from\s+'(\.\.\/.*?)'/g, to: 'from "$1"' }, // uniform double quotes
      { from: /from\s+'(\.\.\/.*?)"/g, to: 'from "$1"' }, // fix mismatched
    ];

    badQuotes.forEach(({ from, to }) => {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Fixed quotes in ${file}`);
    }
  }
});
