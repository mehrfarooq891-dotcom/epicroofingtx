const fs = require('fs');
const path = require('path');

const SOCIAL_HTML = `          <div class="footer-social-links" aria-label="Social Media Links">
            <a href="https://www.facebook.com/EpicRoofingTX/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/epic-roofing-tx/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.pinterest.com/epicroofingtx/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.225-.177.272-.408.165-1.524-.709-2.476-2.936-2.476-4.726 0-3.85 2.797-7.387 8.069-7.387 4.236 0 7.528 3.018 7.528 7.053 0 4.209-2.654 7.597-6.338 7.597-1.238 0-2.401-.644-2.8-1.406l-.763 2.911c-.276 1.054-1.025 2.376-1.527 3.187 1.139.351 2.348.543 3.602.543 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
          </div>\n`;

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(getAllHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getAllHtmlFiles('.');
let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('footer-social-links')) {
    return; // Already added
  }

  // Look for footer-map-container
  if (content.includes('<div class="footer-map-container"') || content.includes("<div class='footer-map-container'")) {
    content = content.replace(/(<div class=["']footer-map-container["'])/, `${SOCIAL_HTML}          $1`);
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Added social icons to: ${file}`);
  }
});

console.log(`Successfully added social icons to ${updatedCount} HTML files.`);
