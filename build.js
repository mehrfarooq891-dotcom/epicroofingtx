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

// Run dynamic blog section and navigation compiler before file copy
require('./update_blog_sections.js');

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
      name === 'metadata.json' ||
      name === 'favicon.ico'
    ) {
      copyFile(path.join(srcDir, name), path.join(distDir, name));
    }
  } else if (entry.isDirectory()) {
    if (name === 'blog' || name === 'images' || 
        name === 'assets') {
      copyFolderRecursive(path.join(srcDir, name), path.join(distDir, name));
    }
  }
}

// Copy contents of public folder to dist root if public exists
const publicDir = path.join(srcDir, 'public');
if (fs.existsSync(publicDir)) {
  console.log('Copying public assets to dist root...');
  const publicEntries = fs.readdirSync(publicDir, { withFileTypes: true });
  for (const entry of publicEntries) {
    const srcPath = path.join(publicDir, entry.name);
    const destPath = path.join(distDir, entry.name);
    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// Post-build link sanitization to resolve Google Search Console redirect index warnings
function sanitizeHTMLFileLinks(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      sanitizeHTMLFileLinks(fullPath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      // Globally clean absolute index.html references
      if (content.includes('href="/index.html"')) {
        content = content.replace(/href="\/index.html"/g, 'href="/"');
        changed = true;
      }
      
      // Globally clean relative index.html references
      if (content.includes('href="index.html"')) {
        content = content.replace(/href="index.html"/g, 'href="/"');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Sanitized Google indexing links in: ${path.relative(distDir, fullPath)}`);
      }
    }
  });
}

console.log('Optimizing links for Google Search Console...');
sanitizeHTMLFileLinks(distDir);

console.log('Build completed successfully!');
