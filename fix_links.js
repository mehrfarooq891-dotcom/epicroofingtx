const fs = require('fs');
const path = require('path');

const replacements = [
  { old: 'services/shingle-roof-replacement', new: 'roof-replacement-houston.html' },
  { old: 'services/metal-roofing-installation', new: 'metal-roofing-houston.html' },
  { old: 'services/commercial-roof-coating', new: 'roof-coating-houston.html' },
  { old: 'services/hail-wind-storm-repair', new: 'storm-damage-roofing-houston.html' },
  { old: 'services/emergency-tarping-leak-repair', new: 'emergency-roof-tarping-houston.html' },
  { old: 'services/roof-inspection-haag', new: 'free-roof-inspection-houston.html' },
  { old: 'repairs/hail-damage', new: 'hail-damage-roof-repair-houston.html' },
  { old: 'repairs/wind-damage', new: 'wind-damage-roof-repair-houston.html' },
  { old: 'repairs/storm-damage', new: 'storm-damage-roofing-houston.html' },
  { old: 'repairs/emergency-tarp', new: 'emergency-roof-tarping-houston.html' },
  { old: 'materials/metal-roofing', new: 'metal-roofing-houston.html' },
  { old: 'materials/tile-roofing', new: 'tile-roofing-houston.html' },
  { old: 'materials/silicone-polyurethane-coatings', new: 'roof-coating-houston.html' },
  { old: 'materials/asphalt-shingles', new: 'roof-replacement-houston.html' },
  { old: 'cities/houston', new: 'index.html' },
  { old: 'cities/katy', new: 'katy-roofing-contractor.html' },
  { old: 'cities/sugar-land', new: 'sugar-land-roofing-contractor.html' },
  { old: 'cities/cypress', new: 'cypress-roofing-contractor.html' },
  { old: 'cities/the-woodlands', new: 'the-woodlands-roofing-contractor.html' },
  { old: 'cities/pearland', new: 'pearland-roofing-contractor.html' },
  { old: 'cities/league-city', new: 'league-city-roofing-contractor.html' },
  { old: 'cities/spring', new: 'spring-tx-roofing-contractor.html' },
  { old: 'cities/pasadena', new: 'pasadena-tx-roofing-contractor.html' },
  { old: 'cities/conroe', new: 'index.html' },
  { old: 'cities/kingwood', new: 'index.html' },
  { old: 'cities/tomball', new: 'tomball-tx-roofing-contractor.html' },
  { old: 'cities/richmond', new: 'richmond-tx-roofing-contractor.html' },
  { old: 'cities/missouri-city', new: 'missouri-city-roofing-contractor.html' },
  { old: 'cities/humble', new: 'humble-tx-roofing-contractor.html' },
  { old: 'blog/katy-hail-impacts', new: 'blog/houston-hail-damage-guide.html' },
  { old: 'blog/continuous-baffle-cooling', new: 'blog/signs-you-need-roof-replacement-houston.html' },
  { old: 'blog/standing-seam-cypress-worth', new: 'blog/how-insurance-roof-claims-work-texas.html' },
  { old: 'about', new: 'about.html' },
  { old: 'contact', new: 'contact.html' },
  { old: 'financing', new: 'financing.html' },
  { old: 'privacy-policy', new: 'privacy-policy.html' },
  { old: 'sitemap', new: 'sitemap.html' },
  { old: 'cities', new: 'sitemap.html' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (file.includes('node_modules') || file.includes('.git') || file.includes('dist')) return;
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.html')) results.push(file);
    }
  });
  return results;
}

const htmlFiles = walk(process.cwd());

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  replacements.forEach(({ old, new: newVal }) => {
    // Replace with leading slash if present
    const oldWithSlash = `href="/${old}"`;
    const newWithSlash = `href="/${newVal}"`;
    if (content.includes(oldWithSlash)) {
      content = content.split(oldWithSlash).join(newWithSlash);
      changed = true;
    }

    // Replace without leading slash
    const oldWithoutSlash = `href="${old}"`;
    const newWithoutSlash = `href="${newVal}"`;
    if (content.includes(oldWithoutSlash)) {
      content = content.split(oldWithoutSlash).join(newWithoutSlash);
      changed = true;
    }
  });

  // Specifically handle the "blog" link if it's just index
  if (content.includes('href="blog"')) {
     content = content.split('href="blog"').join('href="blog/houston-hail-damage-guide.html"');
     changed = true;
  }
  if (content.includes('href="/blog"')) {
     content = content.split('href="/blog"').join('href="/blog/houston-hail-damage-guide.html"');
     changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
});
