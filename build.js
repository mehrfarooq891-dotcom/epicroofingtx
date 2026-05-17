const fs = require('fs');
const path = require('path');

const srcDir = process.cwd();
const distDir = path.join(srcDir, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${path.relative(srcDir, src)} -> ${path.relative(srcDir, dest)}`);
}

function copyFolderRecursive(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
        continue;
      }
      copyFolderRecursive(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// Start build
console.log('Starting static build...');

// Clean and create dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
ensureDir(distDir);

// Read root directory and copy target static files
const entries = fs.readdirSync(srcDir, { withFileTypes: true });
for (const entry of entries) {
  const name = entry.name;
  if (entry.isFile()) {
    // Copy only required static files
    if (
      name.endsWith('.html') ||
      name === 'style.css' ||
      name === 'robots.txt' ||
      name === 'sitemap.xml' ||
      name === 'metadata.json'
    ) {
      copyFile(path.join(srcDir, name), path.join(distDir, name));
    }
  } else if (entry.isDirectory()) {
    if (name === 'blog') {
      copyFolderRecursive(path.join(srcDir, name), path.join(distDir, name));
    }
  }
}

console.log('Build completed successfully!');
