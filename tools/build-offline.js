// Build Portfolio-offline.html — a single-file, double-clickable build.
// Portfolio.html needs a web server (Babel-standalone fetches the JSX files
// via XHR, which Chrome blocks on file:// origins). This script precompiles
// the JSX and inlines React, ReactDOM, d3, all CSS, and all site JS into one
// self-contained HTML file that works straight from Finder.
//
// Usage:
//   cd Claue-Portfolio/tools
//   npm i @babel/standalone@7.29.0 react@18.3.1 react-dom@18.3.1 d3@7.9.0
//   node build-offline.js
//
// Re-run after any change to data.js, the .jsx files, or the stylesheets —
// Portfolio-offline.html is a build artifact and does not update itself.

const path = require('path');
const fs = require('fs');
const Babel = require('@babel/standalone');

const SITE = path.join(__dirname, '..') + path.sep;
const NM = path.join(__dirname, 'node_modules') + path.sep;
const esc = (s) => s.replace(/<\/script/gi, '<\\/script');
const read = (p) => fs.readFileSync(p, 'utf8');

let html = read(SITE + 'Portfolio.html');

// 1. Inline the three stylesheets
for (const css of ['styles.css', 'brain.css', 'gallery.css']) {
  html = html.replace(`<link rel="stylesheet" href="${css}" />`, () => `<style>\n${read(SITE + css)}\n</style>`);
}

// 2. Replace CDN runtime with inlined production builds (no Babel at runtime)
html = html.replace(/<script src="https:\/\/unpkg\.com\/react@18\.3\.1[^>]*><\/script>/, () => `<script>\n${esc(read(NM + 'react/umd/react.production.min.js'))}\n</script>`);
html = html.replace(/<script src="https:\/\/unpkg\.com\/react-dom@18\.3\.1[^>]*><\/script>/, () => `<script>\n${esc(read(NM + 'react-dom/umd/react-dom.production.min.js'))}\n</script>`);
html = html.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>/, '<!-- babel not needed: JSX precompiled -->');
html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/d3@7\.9\.0[^>]*><\/script>/, () => `<script>\n${esc(read(NM + 'd3/dist/d3.min.js'))}\n</script>`);

// 3. Inline plain local scripts
for (const js of ['image-slot.js', 'data.js']) {
  html = html.replace(`<script src="${js}"></script>`, () => `<script>\n${esc(read(SITE + js))}\n</script>`);
}

// 4. Precompile every text/babel script and inline as plain JS (order matters)
const jsxFiles = ['components/GhibliCovers.jsx', 'tweaks-panel.jsx', 'components.jsx', 'components/MagicUI.jsx', 'components/SideProjects.jsx', 'components/Media.jsx', 'brain.jsx', 'app.jsx'];
for (const f of jsxFiles) {
  const compiled = Babel.transform(read(SITE + f), { presets: ['react'], filename: f }).code;
  html = html.replace(`<script type="text/babel" src="${f}"></script>`, () => `<script>\n/* compiled from ${f} */\n${esc(compiled)}\n</script>`);
}

// 5. Sanity: nothing left pointing at babel or unpkg
if (/text\/babel|unpkg\.com/.test(html)) {
  console.error('LEFTOVER external/babel refs — check that Portfolio.html script tags still match this script.');
  process.exit(1);
}

fs.writeFileSync(SITE + 'Portfolio-offline.html', html);
console.log('written Portfolio-offline.html:', (html.length / 1024 / 1024).toFixed(2), 'MB');
