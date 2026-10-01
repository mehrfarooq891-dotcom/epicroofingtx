const fs = require('fs');
const path = require('path');

const YT = "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";
const IG = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";

const YT_URL = 'https://www.youtube.com/channel/UCbyn7wtzBev0vxw7ydtBCkA';
const IG_URL = 'https://www.instagram.com/epicroofingtx';

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!['node_modules', 'dist', '.git', '.git.corrupt', '.github'].includes(f)) out = out.concat(walk(p));
    } else if (f.endsWith('.html')) {
      out.push(p);
    }
  }
  return out;
}

// Pinterest wala poora <a>...</a> block
const PIN_RE = /<a\b[^>]*pinterest\.com[^>]*>[\s\S]*?<\/a>/i;

function makeIcon(pin, url, label, pathData) {
  let a = pin.replace(/href="[^"]*"/i, `href="${url}"`);
  if (/aria-label="[^"]*"/i.test(a)) {
    a = a.replace(/aria-label="[^"]*"/i, `aria-label="${label}"`);
  } else {
    a = a.replace(/<a\b/i, `<a aria-label="${label}"`);
  }
  a = a.replace(/(<svg\b[^>]*>)[\s\S]*?(<\/svg>)/i, `$1<path d="${pathData}"/>$2`);
  return a;
}

let updated = 0;
let alreadyDone = 0;
const noPinterest = [];

for (const file of walk('.')) {
  let c = fs.readFileSync(file, 'utf8');

  if (c.includes('instagram.com/epicroofingtx')) {
    alreadyDone++;
    continue;
  }

  const m = c.match(PIN_RE);
  if (!m) {
    if (c.includes('footer')) noPinterest.push(file);
    continue;
  }

  const pin = m[0];
  const yt = makeIcon(pin, YT_URL, 'YouTube', YT);
  const ig = makeIcon(pin, IG_URL, 'Instagram', IG);
  c = c.replace(pin, pin + '\n            ' + yt + '\n            ' + ig);

  fs.writeFileSync(file, c, 'utf8');
  updated++;
  console.log('Updated: ' + file);
}

console.log(`\nDONE. Updated: ${updated} | Already had Instagram: ${alreadyDone} | Footer but no Pinterest: ${noPinterest.length}`);
if (noPinterest.length) console.log('Check these:\n' + noPinterest.join('\n'));
