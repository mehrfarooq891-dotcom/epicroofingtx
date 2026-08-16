const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git' && file !== '.aistudio') {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files.`);

const UNIFIED_FAVICON = `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23161B22'/><path d='M15 65 L50 25 L85 65 Z' fill='%23E2900F'/></svg>">`;

const UNIFIED_FONTS = `  <!-- Google Fonts: Oswald (Headings), Source Sans 3 (Body), IBM Plex Mono (Stats/Data) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Oswald:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">`;

const GMB_MAP_EMBED = `<div class="footer-map-container" style="margin-top: 1rem; width: 100%; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); height: 180px;">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.593673179513!2d-95.30300489999999!3d29.8471482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640bb7e3984dd09%3A0x133cf4def5feeaee!2sEpic%20Roofing%20%26%20Construction%20LLC!5e0!3m2!1sen!2s!4v1786888441852!5m2!1sen!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="Epic Roofing & Construction LLC Location"></iframe>
          </div>`;

let updatedCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Update Favicon
  if (content.includes('<link rel="icon"') || content.includes("<link rel='icon'")) {
    const newContent = content.replace(/<link rel=["']icon["'][^>]*>/i, UNIFIED_FAVICON);
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  }

  // 2. Update Google Fonts
  if (content.includes('fonts.googleapis.com')) {
    // Replace old Barlow or Open Sans or Roboto fonts
    const fontRegex = /(?:<link rel=["']preconnect["'][^>]*>\s*)*<link\s+[^>]*href=["']https:\/\/fonts\.googleapis\.com\/css2\?[^"']+["'][^>]*>(?:\s*<noscript>[\s\S]*?<\/noscript>)?/i;
    if (fontRegex.test(content)) {
      const newContent = content.replace(fontRegex, UNIFIED_FONTS);
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }
  }

  // 3. Ensure Blog is in Desktop Nav if missing
  // Check if header contains nav and if Blog link is missing
  if (content.includes('<header') && content.includes('</header>')) {
    const headerStart = content.indexOf('<header');
    const headerEnd = content.indexOf('</header>') + 9;
    let header = content.substring(headerStart, headerEnd);

    // Ensure Privacy Policy and Terms & Conditions are in top utility strip
    if (!header.includes('/privacy-policy') || !header.includes('/terms-and-conditions')) {
      if (header.includes('class="nav-utility-links"') || header.includes("class='nav-utility-links'")) {
        header = header.replace(
          /<div class=["']nav-utility-links["']>[\s\S]*?<\/div>/i,
          `<div class="nav-utility-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span class="nav-utility-divider">|</span>
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>
        </div>`
        );
        content = content.substring(0, headerStart) + header + content.substring(headerEnd);
        changed = true;
      }
    }

    // Ensure Blog link in header nav
    if (!header.includes('href="/blog"') && !header.includes('href="blog"') && !header.includes("href='/blog'")) {
      // Add Blog link before Contact or as item 4
      if (header.includes('<a href="/contact"') || header.includes("<a href='/contact'")) {
        header = header.replace(/<a href=["']\/contact["']/i, '<a href="/blog" class="nav-link">Blog</a>\n        <a href="/contact"');
        content = content.substring(0, headerStart) + header + content.substring(headerEnd);
        changed = true;
      }
    }
  }

  // 4. Ensure GMB Map embed in Footer Col 1
  if (content.includes('<footer') && content.includes('</footer>')) {
    const footerStart = content.indexOf('<footer');
    const footerEnd = content.indexOf('</footer>') + 9;
    let footer = content.substring(footerStart, footerEnd);

    if (!footer.includes('133cf4def5feeaee') && !footer.includes('google.com/maps/embed')) {
      // Find where to insert map in footer Col 1 (after address/phone or after first footer-col / Col 1)
      if (footer.includes('9402 Spaulding St')) {
        // Insert right after the address/phone block
        const addressPattern = /(9402 Spaulding St[^\n<]*(?:<br\s*\/?>)?(?:[\s\S]*?)(?:<\/p>|<\/div>))/i;
        if (addressPattern.test(footer)) {
          footer = footer.replace(addressPattern, `$1\n          ${GMB_MAP_EMBED}`);
          content = content.substring(0, footerStart) + footer + content.substring(footerEnd);
          changed = true;
        }
      }
    }

    // Ensure Privacy Policy, Terms & Conditions, and Blog are in footer links
    if (!footer.includes('/privacy-policy')) {
      if (footer.includes('© 2026 Epic Roofing') || footer.includes('&copy; 2026 Epic Roofing')) {
        footer = footer.replace(
          /(<div class=["']footer-bottom[^>]*>[\s\S]*?<\/div>)/i,
          `$1\n        <div style="display: flex; gap: 1.25rem; font-size: 0.85rem;">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>
        </div>`
        );
        content = content.substring(0, footerStart) + footer + content.substring(footerEnd);
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Successfully unified ${updatedCount} files.`);
