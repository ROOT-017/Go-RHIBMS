/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const fs = require('fs');
// eslint-disable-next-line no-undef
const path = require('path');

const isObject = val => val != null && !Array.isArray(val) && typeof val === 'object';

// eslint-disable-next-line no-undef
const readDir = path.resolve(__dirname, './public/locales');
const files = fs.readdirSync(readDir);

// eslint-disable-next-line no-undef
const writePath = path.resolve(__dirname, './public/web-texts');

const parsData = (data, res) => {
    Object.values(data).forEach(d => {
        if (isObject(d)) {
            parsData(d, res);
        } else {
            res.push(d);
        }
    })
}
try {
    if (!fs.existsSync(writePath)) {
      fs.mkdirSync(writePath);
    }
} catch(e) { /* empty */ }
for (const file of files) {
    const dataStr = fs.readFileSync(path.resolve(readDir, './', file));
    const data = JSON.parse(dataStr);
    const res = [];
    parsData(data, res);
    fs.writeFileSync(path.resolve(writePath, './', file.replace(".json", ".txt")), res.join('\n'));
}

