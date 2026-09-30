const fs = require('fs');
const path = require('path');

function makeLink(url, text) {
  return `<a href="${url}" style="color: var(--hazard-amber); text-decoration: underline; font-weight: 600;">${text}</a>`;
}

// City mapping by topic/slug keyword
const blogCityMapping = {
  // explicit city guides
  "roofing-cypress-tx-guide.html": { city: "/cypress-roofing-contractor", name: "Cypress roofing contractor" },
  "roofing-friendswood-tx-guide.html": { city: "/friendswood-tx-roofing-contractor", name: "Friendswood roofing contractor" },
  "roofing-katy-tx-guide.html": { city: "/katy-roofing-contractor", name: "Katy roofing contractor" },
  "roofing-league-city-tx-guide.html": { city: "/league-city-roofing-contractor", name: "League City roofing contractor" },
  "roofing-pasadena-tx-guide.html": { city: "/pasadena-tx-roofing-contractor", name: "Pasadena roofing contractor" },
  "roofing-pearland-tx-guide.html": { city: "/pearland-roofing-contractor", name: "Pearland roofing contractor" },
  "roofing-spring-tx-guide.html": { city: "/spring-tx-roofing-contractor", name: "Spring roofing contractor" },
  "roofing-sugar-land-tx-guide.html": { city: "/sugar-land-roofing-contractor", name: "Sugar Land roofing contractor" },
  "roofing-the-woodlands-tx-guide.html": { city: "/the-woodlands-roofing-contractor", name: "The Woodlands roofing contractor" },
  "roofing-tomball-tx-guide.html": { city: "/tomball-tx-roofing-contractor", name: "Tomball roofing contractor" },

  // other blogs
  "asphalt-vs-metal-roofing-houston.html": { city: "/the-woodlands-roofing-contractor", name: "The Woodlands roofing specialists" },
  "best-affordable-roofing-contractors-houston.html": { city: "/pasadena-tx-roofing-contractor", name: "Pasadena roofing contractor services" },
  "commercial-roofing-houston-guide.html": { city: "/baytown-tx-roofing-contractor", name: "Baytown commercial roofing facilities" },
  "emergency-roof-tarp-houston.html": { city: "/galveston-tx-roofing-contractor", name: "Galveston emergency roofing crews" },
  "free-roof-inspection-houston-guide.html": { city: "/katy-roofing-contractor", name: "Katy roofing contractor inspections" },
  "hail-damage-roof-inspection-checklist-houston.html": { city: "/cypress-roofing-contractor", name: "Cypress roofing contractor territory" },
  "hidden-hail-damage-roof-houston.html": { city: "/katy-roofing-contractor", name: "Katy roofing contractor coverage" },
  "houston-hail-damage-guide.html": { city: "/cypress-roofing-contractor", name: "Cypress roofing contractors" },
  "houston-hail-season-roof-guide.html": { city: "/katy-roofing-contractor", name: "Katy roofing specialists" },
  "houston-roof-adjuster-tips.html": { city: "/league-city-roofing-contractor", name: "League City roofing claims" },
  "houston-roof-maintenance-tips.html": { city: "/spring-tx-roofing-contractor", name: "Spring roofing contractor team" },
  "how-choose-roofing-contractor-houston.html": { city: "/pearland-roofing-contractor", name: "Pearland roofing contractor operations" },
  "how-insurance-roof-claims-work-texas.html": { city: "/league-city-roofing-contractor", name: "League City roofing contractor teams" },
  "how-long-roof-lasts-houston.html": { city: "/sugar-land-roofing-contractor", name: "Sugar Land roofing contractor specialists" },
  "metal-roofing-houston-pros-cons.html": { city: "/conroe-tx-roofing-contractor", name: "Conroe roofing contractor crews" },
  "roof-damage-after-hail-houston-what-to-do.html": { city: "/katy-roofing-contractor", name: "Katy roofing contractor crews" },
  "roof-decking-rot-hidden-emergency-houston.html": { city: "/atascocita-kingwood-tx-roofing-contractor", name: "Atascocita and Kingwood roofing contractor services" },
  "roof-financing-options-houston.html": { city: "/missouri-city-roofing-contractor", name: "Missouri City roofing contractor projects" },
  "roof-inspection-before-buying-home-houston.html": { city: "/the-woodlands-roofing-contractor", name: "The Woodlands roofing contractor inspections" },
  "roof-insurance-adjuster-visit-houston.html": { city: "/deer-park-tx-roofing-contractor", name: "Deer Park roofing insurance claims" },
  "roof-leak-detection-houston-guide.html": { city: "/friendswood-tx-roofing-contractor", name: "Friendswood roofing contractor professionals" },
  "roof-leak-near-chimney-causes-fixes-houston.html": { city: "/tomball-tx-roofing-contractor", name: "Tomball roofing contractor specialists" },
  "roof-leak-repair-houston-guide.html": { city: "/humble-tx-roofing-contractor", name: "Humble roofing contractor repairs" },
  "roof-replacement-cost-houston-2025.html": { city: "/cypress-roofing-contractor", name: "Cypress roofing contractor services" },
  "roof-replacement-cost-houston.html": { city: "/sugar-land-roofing-contractor", name: "Sugar Land roofing contractor estimates" },
  "roof-replacement-financing-houston.html": { city: "/pearland-roofing-contractor", name: "Pearland roofing contractor services" },
  "roof-replacement-zero-cost-insurance-houston.html": { city: "/deer-park-tx-roofing-contractor", name: "Deer Park roofing contractor claims" },
  "roof-to-wall-flashing-leaks-houston.html": { city: "/richmond-tx-roofing-contractor", name: "Richmond roofing contractor technicians" },
  "roof-truss-damage-when-repair-isnt-enough-houston.html": { city: "/channelview-tx-roofing-contractor", name: "Channelview roofing contractor teams" },
  "signs-need-new-roof-houston.html": { city: "/humble-tx-roofing-contractor", name: "Humble roofing contractor evaluations" },
  "signs-of-hidden-roof-leak-houston.html": { city: "/webster-clear-lake-tx-roofing-contractor", name: "Clear Lake and Webster roofing contractor services" },
  "signs-you-need-roof-replacement-houston.html": { city: "/rosenberg-tx-roofing-contractor", name: "Rosenberg roofing contractor assessments" },
  "storm-chaser-roofers-houston-warning.html": { city: "/la-porte-tx-roofing-contractor", name: "La Porte roofing contractor verifications" },
  "storm-damage-roof-repair-timeline-houston.html": { city: "/manvel-tx-roofing-contractor", name: "Manvel roofing contractor crews" }
};

// Target primary service for each blog
function getTargetService(filename) {
  if (filename.includes('hail')) return { url: '/hail-damage-roof-repair-houston', text: 'hail damage roof repair' };
  if (filename.includes('wind') || filename.includes('lifted')) return { url: '/wind-damage-roof-repair-houston', text: 'wind damage roof repair' };
  if (filename.includes('tarp')) return { url: '/emergency-roof-tarping-houston', text: 'emergency roof tarping' };
  if (filename.includes('metal')) return { url: '/metal-roofing-houston', text: 'standing seam metal roofing' };
  if (filename.includes('commercial')) return { url: '/commercial-roofing-houston', text: 'commercial roofing services' };
  if (filename.includes('chimney') || filename.includes('flashing')) return { url: '/chimney-flashing-repair-houston', text: 'chimney flashing repair' };
  if (filename.includes('financing')) return { url: '/financing', text: 'roof replacement financing' };
  if (filename.includes('leak')) return { url: '/roof-leak-detection-houston', text: 'roof leak detection' };
  if (filename.includes('insurance') || filename.includes('adjuster') || filename.includes('claim')) return { url: '/insurance-claim-roofing-houston', text: 'roof insurance claim assistance' };
  if (filename.includes('replacement') || filename.includes('cost') || filename.includes('signs')) return { url: '/roof-replacement-houston', text: 'residential roof replacement' };
  if (filename.includes('storm')) return { url: '/storm-damage-roofing-houston', text: 'storm damage roof restoration' };
  return { url: '/roof-repair-houston', text: 'residential roof repair' };
}

const blogDir = 'blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let totalModified = 0;
let totalLinksAdded = 0;

for (const filename of files) {
  const filePath = path.join(blogDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');

  // Find article content
  let articleStart = html.indexOf('<article');
  let articleEnd = html.indexOf('</article>');
  if (articleStart === -1 || articleEnd === -1) {
    articleStart = html.indexOf('</header>');
    articleEnd = html.indexOf('<footer');
  }

  let articleHtml = html.substring(articleStart, articleEnd);

  // Check existing links inside <p> in article
  const getLinksInArticleP = (artStr) => {
    const ps = artStr.match(/<p[\s\S]*?<\/p>/gi) || [];
    let links = [];
    for (const p of ps) {
      if (p.includes('breadcrumb') || p.includes('meta') || p.includes('author-bio')) continue;
      const aTags = p.match(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
      for (const a of aTags) {
        const hrefMatch = a.match(/href="([^"]+)"/i);
        if (hrefMatch && !hrefMatch[1].startsWith('tel:') && !hrefMatch[1].startsWith('mailto:') && !hrefMatch[1].startsWith('#')) {
          links.push(hrefMatch[1]);
        }
      }
    }
    return links;
  };

  let currentLinks = getLinksInArticleP(articleHtml);
  let modifiedThisFile = false;

  // 1. Remove duplicate links inside <p> if any
  const seenHrefs = new Set();
  const ps = articleHtml.match(/<p[\s\S]*?<\/p>/gi) || [];
  for (const p of ps) {
    if (p.includes('breadcrumb') || p.includes('meta')) continue;
    const aMatches = [...p.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    for (const m of aMatches) {
      const fullA = m[0];
      const href = m[1];
      const text = m[2];
      if (seenHrefs.has(href)) {
        // Replace duplicate link with just its text (or an alternative link)
        let altHref = '/roof-repair-houston';
        let altText = 'expert roof repairs';
        if (href === '/free-roof-inspection-houston') {
          if (!seenHrefs.has('/storm-damage-roofing-houston')) {
            altHref = '/storm-damage-roofing-houston';
            altText = 'comprehensive storm damage restoration';
          } else if (!seenHrefs.has('/roof-repair-houston')) {
            altHref = '/roof-repair-houston';
            altText = 'structural roof repairs';
          }
        }
        if (!seenHrefs.has(altHref)) {
          const replacementLink = makeLink(altHref, altText);
          const newP = p.replace(fullA, replacementLink);
          articleHtml = articleHtml.replace(p, newP);
          seenHrefs.add(altHref);
          modifiedThisFile = true;
        } else {
          const newP = p.replace(fullA, text);
          articleHtml = articleHtml.replace(p, newP);
          modifiedThisFile = true;
        }
      } else {
        seenHrefs.add(href);
      }
    }
  }

  currentLinks = getLinksInArticleP(articleHtml);

  // 2. Ensure matching city page is linked
  const hasCityLink = currentLinks.some(l => l.includes('-roofing-contractor'));
  const cityInfo = blogCityMapping[filename] || { city: '/katy-roofing-contractor', name: 'Katy roofing contractor' };

  if (!hasCityLink && currentLinks.length < 5) {
    // Find a paragraph to insert city link
    const candidatePs = articleHtml.match(/<p[\s\S]*?<\/p>/gi) || [];
    let inserted = false;
    for (const p of candidatePs) {
      if (p.includes('breadcrumb') || p.includes('meta') || p.includes('<a ')) continue;
      if (p.length > 80 && (p.includes('Houston') || p.includes('Texas') || p.includes('roof') || p.includes('homeowner'))) {
        const cityLinkHtml = makeLink(cityInfo.city, cityInfo.name);
        const newP = p.replace('</p>', ` Homeowners can consult with our dedicated ${cityLinkHtml} to address area-specific storm exposure and windstorm codes.</p>`);
        articleHtml = articleHtml.replace(p, newP);
        inserted = true;
        modifiedThisFile = true;
        totalLinksAdded++;
        break;
      }
    }
    if (!inserted && candidatePs.length > 2) {
      const p = candidatePs[candidatePs.length - 2];
      const cityLinkHtml = makeLink(cityInfo.city, cityInfo.name);
      const newP = p.replace('</p>', ` For personalized service, connect with our local ${cityLinkHtml}.</p>`);
      articleHtml = articleHtml.replace(p, newP);
      modifiedThisFile = true;
      totalLinksAdded++;
    }
  }

  currentLinks = getLinksInArticleP(articleHtml);

  // 3. Ensure primary service page is linked
  const targetService = getTargetService(filename);
  const hasServiceLink = currentLinks.some(l => l === targetService.url);

  if (!hasServiceLink && currentLinks.length < 5) {
    const candidatePs = articleHtml.match(/<p[\s\S]*?<\/p>/gi) || [];
    let inserted = false;
    for (const p of candidatePs) {
      if (p.includes('breadcrumb') || p.includes('meta') || p.includes('<a ')) continue;
      if (p.length > 80) {
        const serviceLinkHtml = makeLink(targetService.url, targetService.text);
        const newP = p.replace('</p>', ` If you suspect structural compromise, explore our professional ${serviceLinkHtml} to safeguard your property.</p>`);
        articleHtml = articleHtml.replace(p, newP);
        inserted = true;
        modifiedThisFile = true;
        totalLinksAdded++;
        break;
      }
    }
  }

  currentLinks = getLinksInArticleP(articleHtml);

  // 4. Ensure at least 3 links total
  if (currentLinks.length < 3) {
    const candidatePs = articleHtml.match(/<p[\s\S]*?<\/p>/gi) || [];
    for (const p of candidatePs) {
      if (currentLinks.length >= 3) break;
      if (p.includes('breadcrumb') || p.includes('meta') || p.includes('<a ')) continue;
      if (!currentLinks.includes('/free-roof-inspection-houston')) {
        const inspLink = makeLink('/free-roof-inspection-houston', 'free comprehensive roof inspection');
        const newP = p.replace('</p>', ` Contact Epic Roofing TX today to request your ${inspLink} with zero obligations.</p>`);
        articleHtml = articleHtml.replace(p, newP);
        currentLinks.push('/free-roof-inspection-houston');
        modifiedThisFile = true;
        totalLinksAdded++;
      } else if (!currentLinks.includes('/roof-repair-houston')) {
        const repLink = makeLink('/roof-repair-houston', 'dependable Houston roof repairs');
        const newP = p.replace('</p>', ` Schedule ${repLink} before moisture breaches your attic insulation and interior drywall.</p>`);
        articleHtml = articleHtml.replace(p, newP);
        currentLinks.push('/roof-repair-houston');
        modifiedThisFile = true;
        totalLinksAdded++;
      }
    }
  }

  if (modifiedThisFile) {
    html = html.substring(0, articleStart) + articleHtml + html.substring(articleEnd);
    fs.writeFileSync(filePath, html, 'utf8');
    totalModified++;
  }
}

console.log(`Finished processing blogs. Modified ${totalModified} files, added/updated ${totalLinksAdded} contextual links.`);
