const PACKAGE_VERSION = require('./package.json').version;

console.log(PACKAGE_VERSION);

// const fs = require('fs');
// const path = require('path');
// const srStrContents = fs.readFileSync(path.resolve(__dirname, './sr.html')).toString();
// fs.writeFileSync(
//   path.resolve(__dirname, './dist', 'index.html'),
//   srStrContents.replace(/__RELEASE_VERSION__/g, `'${PACKAGE_VERSION}'`).replace(/ __MANIFEST_DIR__/g, `'/.vite'`)
// );