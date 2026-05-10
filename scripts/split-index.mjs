import fs from 'fs';

const htmlPath = 'index.html';
let s = fs.readFileSync(htmlPath, 'utf8');

const styleRe = /<style>[\s\S]*?<\/style>/;
const scriptRe = /<script>\s*\/\/ --- STATE ---[\s\S]*?<\/script>/m;

if (!styleRe.test(s)) throw new Error('Could not find <style> block');
if (!scriptRe.test(s)) throw new Error('Could not find main app <script> block');

s = s.replace(styleRe, '<link rel="stylesheet" href="css/mustalih-app.css" />');
s = s.replace(scriptRe, '<script src="js/mustalih-app.js"></script>');

fs.writeFileSync(htmlPath, s);
console.log('Updated', htmlPath);
