const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Folders to copy
const folders = ['assets', 'css', 'js', 'bias-variance', 'cross-validation', 'decision-tree', 'double-descent', 'double-descent2', 'equality-of-odds', 'linear-regression', 'logistic-regression', 'neural-networks', 'nn', 'nn2', 'old', 'precision-recall', 'random-forest', 'reinforcement-learning', 'roc-auc', 'test', 'train-test-validation', 'osdr-visualizer-main', 'glossary_terms', 'fonts', 'images'];

// Files to copy from root
const files = ['index.html', 'landing.html', 'explore.html', 'glossary-ar.html', '_redirects', 'glossary_meta.json', 'glossary_enriched.json', 'glossary.jsonl'];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Ensure parent directory exists
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// Clean dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// Copy folders
folders.forEach(folder => {
  const src = path.join(__dirname, folder);
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, path.join(distDir, folder));
    console.log(`Copied folder: ${folder}`);
  }
});

// Copy root files
files.forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
    console.log(`Copied file: ${file}`);
  }
});

console.log('Build completed! Files are in the dist folder.');
