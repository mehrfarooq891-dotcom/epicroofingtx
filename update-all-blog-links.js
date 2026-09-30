const fs = require('fs');
const path = require('path');

function makeLink(url, text) {
  return `<a href="${url}" style="color: var(--hazard-amber); text-decoration: underline; font-weight: 600;">${text}</a>`;
}

// City mapping based on topic or slug
const cityTopics = [
  { keywords: ['hail', 'derecho'], city: '/katy-roofing-contractor', name: 'Katy TX' },
  { keywords: ['pine', 'tree', 'rot', 'shade'], city: '/the-woodlands-roofing-contractor', name: 'The Woodlands' },
  { keywords: ['wind', 'hurricane', 'tarp', 'coastal'], city: '/galveston-tx-roofing-contractor', name: 'Galveston' },
  { keywords: ['prairie', 'heat', 'sun'], city: '/cypress-roofing-contractor', name: 'Cypress' },
  { keywords: ['hoa', 'aesthetic', 'architectural'], city: '/sugar-land-roofing-contractor', name: 'Sugar Land' },
  { keywords: ['subdivision', '1990', '2000', 'aging'], city: '/pearland-roofing-contractor', name: 'Pearland' },
  { keywords: ['creek', 'canopy'], city: '/friendswood-tx-roofing-contractor', name: 'Friendswood' },
  { keywords: ['bay', 'salt', 'marine'], city: '/league-city-roofing-contractor', name: 'League City' },
  { keywords: ['industrial', 'chemical'], city: '/pasadena-tx-roofing-contractor', name: 'Pasadena' },
  { keywords: ['conroe', 'lake'], city: '/conroe-tx-roofing-contractor', name: 'Conroe' },
  { keywords: ['tomball', 'rural'], city: '/tomball-tx-roofing-contractor', name: 'Tomball' },
  { keywords: ['spring', 'klein'], city: '/spring-tx-roofing-contractor', name: 'Spring' },
  { keywords: ['baytown', 'channel'], city: '/baytown-tx-roofing-contractor', name: 'Baytown' }
];

const cityGuides = {
  'roofing-cypress-tx-guide.html': { city: '/cypress-roofing-contractor', name: 'Cypress roofing contractor' },
  'roofing-friendswood-tx-guide.html': { city: '/friendswood-tx-roofing-contractor', name: 'Friendswood roofing contractor' },
  'roofing-katy-tx-guide.html': { city: '/katy-roofing-contractor', name: 'Katy roofing contractor' },
  'roofing-league-city-tx-guide.html': { city: '/league-city-roofing-contractor', name: 'League City roofing contractor' },
  'roofing-pasadena-tx-guide.html': { city: '/pasadena-tx-roofing-contractor', name: 'Pasadena roofing contractor' },
  'roofing-pearland-tx-guide.html': { city: '/pearland-roofing-contractor', name: 'Pearland roofing contractor' },
  'roofing-spring-tx-guide.html': { city: '/spring-tx-roofing-contractor', name: 'Spring roofing contractor' },
  'roofing-sugar-land-tx-guide.html': { city: '/sugar-land-roofing-contractor', name: 'Sugar Land roofing contractor' },
  'roofing-the-woodlands-tx-guide.html': { city: '/the-woodlands-roofing-contractor', name: 'The Woodlands roofing contractor' },
  'roofing-tomball-tx-guide.html': { city: '/tomball-tx-roofing-contractor', name: 'Tomball roofing contractor' }
};

const blogDir = 'blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let updatedCount = 0;
let linksAdded = 0;

for (const filename of files) {
  const filePath = path.join(blogDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');

  // Skip dummy cookie check files
  if (html.includes('Cookie check') || !html.includes('<article')) {
    continue;
  }

  // Check if page already has city link
  const hasCityLink = html.includes('-roofing-contractor');
  
  // Find which city to link
  let targetCity = { city: '/katy-roofing-contractor', name: 'Katy and West Houston' };
  if (cityGuides[filename]) {
    targetCity = cityGuides[filename];
  } else {
    for (const ct of cityTopics) {
      if (ct.keywords.some(k => filename.toLowerCase().includes(k))) {
        targetCity = { city: ct.city, name: ct.name };
        break;
      }
    }
  }

  // Determine matching service page
  let targetService = { url: '/free-roof-inspection-houston', text: 'free roof inspection' };
  if (filename.includes('hail')) {
    targetService = { url: '/hail-damage-roof-repair-houston', text: 'hail damage roof repair' };
  } else if (filename.includes('wind') || filename.includes('lifted')) {
    targetService = { url: '/wind-damage-roof-repair-houston', text: 'wind damage roof repair' };
  } else if (filename.includes('storm') || filename.includes('harvey') || filename.includes('hurricane')) {
    targetService = { url: '/storm-damage-roofing-houston', text: 'storm damage roof restoration' };
  } else if (filename.includes('leak') || filename.includes('water-stain')) {
    targetService = { url: '/roof-leak-detection-houston', text: 'roof leak detection' };
  } else if (filename.includes('tarp')) {
    targetService = { url: '/emergency-roof-tarping-houston', text: 'emergency roof tarping' };
  } else if (filename.includes('metal')) {
    targetService = { url: '/metal-roofing-houston', text: 'standing seam metal roofing' };
  } else if (filename.includes('insurance') || filename.includes('adjuster') || filename.includes('claim')) {
    targetService = { url: '/insurance-claim-roofing-houston', text: 'roof insurance claim assistance' };
  } else if (filename.includes('replacement') || filename.includes('cost') || filename.includes('signs')) {
    targetService = { url: '/roof-replacement-houston', text: 'residential roof replacement' };
  } else if (filename.includes('commercial')) {
    targetService = { url: '/commercial-roofing-houston', text: 'commercial roofing services' };
  } else if (filename.includes('chimney') || filename.includes('flashing')) {
    targetService = { url: '/chimney-flashing-repair-houston', text: 'chimney flashing repair' };
  } else if (filename.includes('financing')) {
    targetService = { url: '/financing', text: 'roof replacement financing' };
  }

  let fileModified = false;

  // 1. Add city link if not present
  if (!hasCityLink) {
    // Find a paragraph in <article> that mentions Houston or area, or append naturally
    const articleIdx = html.indexOf('<article');
    const articleCloseIdx = html.indexOf('</article>');
    if (articleIdx !== -1 && articleCloseIdx !== -1) {
      const articleText = html.substring(articleIdx, articleCloseIdx);
      
      // Look for a paragraph mentioning Houston or homeowners
      const pMatch = articleText.match(/<p>([\s\S]*?(?:Houston|Texas|homeowners|property)[\s\S]*?)<\/p>/i);
      if (pMatch) {
        const origP = pMatch[0];
        const innerText = pMatch[1];
        // Insert natural city reference
        const cityLinkHtml = makeLink(targetCity.city, targetCity.name);
        const newInner = innerText + ` For local homeowners in ${cityLinkHtml} facing similar issues, local climate dynamics and severe convective storms play an outsized role in shingle longevity.`;
        html = html.replace(origP, `<p>${newInner}</p>`);
        fileModified = true;
        linksAdded++;
      }
    }
  }

  // 2. Check if primary service is linked
  const hasServiceLink = html.includes(targetService.url);
  if (!hasServiceLink) {
    const articleIdx = html.indexOf('<article');
    const articleCloseIdx = html.indexOf('</article>');
    if (articleIdx !== -1 && articleCloseIdx !== -1) {
      const articleText = html.substring(articleIdx, articleCloseIdx);
      // Look for a paragraph mentioning roof or damage
      const pMatch = articleText.match(/<p>([\s\S]*?(?:roof|damage|shingle|inspection)[\s\S]*?)<\/p>/i);
      if (pMatch) {
        const origP = pMatch[0];
        const innerText = pMatch[1];
        const serviceLinkHtml = makeLink(targetService.url, targetService.text);
        const newInner = innerText + ` If you suspect storm impacts or water intrusion, our certified team provides expert ${serviceLinkHtml} across the Greater Houston area.`;
        html = html.replace(origP, `<p>${newInner}</p>`);
        fileModified = true;
        linksAdded++;
      }
    }
  }

  // 3. For the 5 posts that had 0 links initially, ensure they get a 3rd link (free inspection)
  const linksInArticle = (html.match(/<article[\s\S]*?<\/article>/i) || [''])[0].match(/<a\s+[^>]*href="\/[^"]*"[^>]*>[\s\S]*?<\/a>/gi) || [];
  if (linksInArticle.length < 3) {
    const articleIdx = html.indexOf('<article');
    const articleCloseIdx = html.indexOf('</article>');
    if (articleIdx !== -1 && articleCloseIdx !== -1) {
      const articleText = html.substring(articleIdx, articleCloseIdx);
      const paras = articleText.match(/<p>[\s\S]*?<\/p>/gi);
      if (paras && paras.length >= 2) {
        const targetP = paras[paras.length - 1]; // last paragraph
        const inspLink = makeLink('/free-roof-inspection-houston', 'free 21-point roof inspection');
        const newP = targetP.replace('</p>', ` Contact Epic Roofing TX today to schedule your ${inspLink} and protect your property.</p>`);
        html = html.replace(targetP, newP);
        fileModified = true;
        linksAdded++;
      }
    }
  }

  if (fileModified) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
  }
}

console.log(`Updated ${updatedCount} blog posts, added ${linksAdded} contextual links.`);
