const fs = require('fs');

// Banned words checker
const bannedWords = [
  /\bdelve[s|d|ing]?\b/i,
  /\bleverage[s|d|ing]?\b/i,
  /\butilize[s|d|ing]?\b/i,
  /\butilization\b/i,
  /\bharness[es|ed|ing]?\b/i,
  /\bunlock[s|ed|ing]?\b/i,
  /\bunleash[es|ed|ing]?\b/i,
  /\belevate[s|d|ing]?\b/i,
  /\bembark[s|ed|ing]?\b/i,
  /\bnavigate[s|d|ing]?\b/i,
  /\bfoster[s|ed|ing]?\b/i,
  /\bcultivate[s|d|ing]?\b/i,
  /\bstreamline[s|d|ing]?\b/i,
  /\bempower[s|ed|ing]?\b/i,
  /\btransform[s|ed|ing|ative]?\b/i,
  /\benhance[s|d|ing]?\b/i,
  /\bboost[s|ed|ing]?\b/i,
  /\brobust\b/i,
  /\bseamless(ly)?\b/i,
  /\bdynamic(ally)?\b/i,
  /\bvibrant\b/i,
  /\bcomprehensive\b/i,
  /\bholistic\b/i,
  /\binnovative\b/i,
  /\bcutting-edge\b/i,
  /\bunparalleled\b/i,
  /\binvaluable\b/i,
  /\bmeticulous(ly)?\b/i,
  /\bintricate(ly)?\b/i,
  /\bmultifaceted\b/i,
  /\brealm\b/i,
  /\btapestry\b/i,
  /\bjourney\b/i,
  /\becosystem\b/i,
  /\bparadigm\b/i,
  /\bsynergy\b/i,
  /\btestament\b/i,
  /\bcornerstone\b/i,
  /\bfurthermore\b/i,
  /\bmoreover\b/i,
  /(^|\.\s+)However[, ]/i,
  /\bin conclusion\b/i,
  /\bmoving forward\b/i,
  /\bin today's fast-paced digital landscape\b/i,
  /\bin today's world\b/i,
  /\bit's important to note that\b/i,
  /\bat its core\b/i,
  /\bwhen it comes to\b/i,
  /\bwhether you're\b/i,
  /\bIs your roof\b/i,
  /\b\$0 out of pocket\b/i,
  /\bwaiving your deductible\b/i,
  /\bwaive the deductible\b/i,
  /\bSatellite Nodes\b/i,
  /\bState Headquarters\b/i,
  /\bWind-Grid Guarantee\b/i,
  /\bSBS-impact shingle structures\b/i
];

function assertNoBannedWords(str, label) {
  // Strip <style> and <script> blocks for HTML analysis to avoid CSS properties matching
  const cleanStr = str
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ');

  for (const regex of bannedWords) {
    const match = cleanStr.match(regex);
    if (match) {
      throw new Error(`Banned phrase found in ${label}: "${match[0]}"`);
    }
  }
}

// Shingle dividers
const shingleDividerDarkToLight = `<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#F5F3EE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerLightToGrey = `<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#EBE7DE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerGreyToLight = `<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#F5F3EE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerLightToDark = `<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#161B22">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerDarkToGrey = `<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#EBE7DE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerGreyToDark = `<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#161B22">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

// Template generator function
function getFooter() {
  return `  <!-- FOOTER -->
  <footer class="site-footer" id="site-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: NAP & Credentials -->
        <div>
          <h4>Epic Roofing &amp; Construction LLC</h4>
          <div class="footer-nap">
            <p><strong>Physical Address:</strong><br>9402 Spaulding St<br>Houston, TX 77016</p>
            <p style="margin-top: 0.75rem;"><strong>Direct Line:</strong><br><a href="tel:+12813269905" style="color: var(--hazard-amber); font-weight: 700;">(281) 326-9905</a></p>
            <p style="margin-top: 0.75rem;"><strong>Hours of Operation:</strong><br>Mon &ndash; Sat: 7:00 AM &ndash; 7:00 PM<br>24/7 Emergency Storm Tarping</p>
            <p style="margin-top: 0.75rem;"><strong>Licenses &amp; Certs:</strong><br>GAF Master Elite Contractor<br>HAAG Certified Roof Inspector<br>RCAT Licensed Commercial &amp; Residential</p>
          </div>
        </div>

        <!-- Col 2: Core Services -->
        <div>
          <h4>Roofing Services</h4>
          <ul style="line-height: 2.1;">
            <li><a href="/roof-replacement-houston">Asphalt Shingle Replacement</a></li>
            <li><a href="/metal-roofing-houston">Standing Seam Metal Roofs</a></li>
            <li><a href="/roof-repair-houston">Roof Leak Detection &amp; Repair</a></li>
            <li><a href="/hail-damage-roof-repair-houston">Hail Damage Roof Repair</a></li>
            <li><a href="/wind-damage-roof-repair-houston">Wind Damage Roof Repair</a></li>
            <li><a href="/emergency-roof-tarping-houston">Emergency Roof Tarping</a></li>
            <li><a href="/insurance-claim-roofing-houston">Insurance Claim Assistance</a></li>
            <li><a href="/gutter-installation-houston">Custom Rain Gutters &amp; Guards</a></li>
            <li><a href="/chimney-flashing-repair-houston">Flashing &amp; Pipe Jack Repair</a></li>
          </ul>
        </div>

        <!-- Col 3: Service Areas -->
        <div>
          <h4>Service Areas</h4>
          <ul style="line-height: 2.1;">
            <li><a href="/">Houston Core</a></li>
            <li><a href="/katy-roofing-contractor">Katy</a></li>
            <li><a href="/the-woodlands-roofing-contractor">The Woodlands</a></li>
            <li><a href="/sugar-land-roofing-contractor">Sugar Land</a></li>
            <li><a href="/cypress-roofing-contractor">Cypress</a></li>
            <li><a href="/pearland-roofing-contractor">Pearland</a></li>
            <li><a href="/league-city-roofing-contractor">League City</a></li>
            <li><a href="/spring-tx-roofing-contractor">Spring</a></li>
            <li><a href="/friendswood-tx-roofing-contractor">Friendswood</a></li>
            <li><a href="/channelview-tx-roofing-contractor">Channelview</a></li>
            <li><a href="/deer-park-tx-roofing-contractor">Deer Park</a></li>
            <li><a href="/la-porte-tx-roofing-contractor">La Porte</a></li>
          </ul>
        </div>

        <!-- Col 4: More Areas & Map -->
        <div>
          <h4>East &amp; South Metro</h4>
          <ul style="line-height: 2.1;">
            <li><a href="/rosenberg-tx-roofing-contractor">Rosenberg</a></li>
            <li><a href="/manvel-tx-roofing-contractor">Manvel</a></li>
            <li><a href="/atascocita-kingwood-tx-roofing-contractor">Atascocita / Kingwood</a></li>
            <li><a href="/webster-clear-lake-tx-roofing-contractor">Webster / Clear Lake</a></li>
            <li><a href="/pasadena-tx-roofing-contractor">Pasadena</a></li>
            <li><a href="/tomball-tx-roofing-contractor">Tomball</a></li>
            <li><a href="/baytown-tx-roofing-contractor">Baytown</a></li>
            <li><a href="/conroe-tx-roofing-contractor">Conroe</a></li>
            <li><a href="/galveston-tx-roofing-contractor">Galveston</a></li>
            <li><a href="/humble-tx-roofing-contractor">Humble</a></li>
          </ul>
          <div class="footer-map-container" style="margin-top: 1rem;">
            <iframe src="https://maps.google.com/maps?q=9402+Spaulding+St,+Houston,+TX+77016&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    title="Epic Roofing &amp; Construction LLC Houston headquarters map location"
                    loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container footer-bottom-flex">
        <div>
          &copy; 2026 Epic Roofing &amp; Construction LLC. All rights reserved. Texas RCAT Licensed &amp; Insured.
        </div>
        <div style="display:flex; gap:1.25rem;">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          <a href="/sitemap">HTML Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- MOBILE STICKY CALL ACTION -->
  <div class="global-call-widget">
    <a href="tel:+12813269905" class="sticky-call-btn" id="sticky-call-btn">
      <span>📞</span>
      <span class="btn-text-desktop">Call (281) 326-9905 &bull; Free Inspection</span>
      <span class="btn-text-mobile">Call (281) 326-9905</span>
    </a>
  </div>

  <!-- Mobile Menu JS -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const menuBtn = document.getElementById('menu-btn');
      const menuCloseBtn = document.getElementById('menu-close-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuOverlay = document.getElementById('menu-overlay');

      function openMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      if (menuBtn) menuBtn.addEventListener('click', openMenu);
      if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
      if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

      const accordionBtns = document.querySelectorAll('.mobile-accordion-btn');
      accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const content = this.nextElementSibling;
          content.classList.toggle('active');
          const icon = this.querySelector('.accordion-icon');
          if (icon) {
            icon.textContent = content.classList.contains('active') ? '▲' : '▼';
          }
        });
      });

      // FAQ accordion
      const faqQuestions = document.querySelectorAll('.faq-question');
      faqQuestions.forEach(q => {
        q.addEventListener('click', function() {
          const answer = this.nextElementSibling;
          const icon = this.querySelector('.faq-icon');
          if (answer.style.display === 'block') {
            answer.style.display = 'none';
            if (icon) icon.textContent = '+';
          } else {
            answer.style.display = 'block';
            if (icon) icon.textContent = '−';
          }
        });
      });
    });
  </script>`;
}
function generatePageHTML(data) {
  const {
    city,
    slug,
    title,
    metaDescription,
    h1,
    heroSubtitle,
    painPointHeadline,
    painPointBadge,
    painPointParagraphs,
    aeoBlocks,
    hasStormChaserSection,
    faqs,
    neighboringLinks,
    blogLinks,
    inspectionHeading,
    inspectionText,
    whyChoosePoints
  } = data;

  // Build FAQ JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  // LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RoofingContractor"],
    "name": "Epic Roofing & Construction LLC",
    "alternateName": "Epic Roofing TX",
    "url": `https://www.epicroofingtx.com/${slug}`,
    "logo": "https://www.epicroofingtx.com/images/epic-roofing-logo.svg",
    "image": "https://www.epicroofingtx.com/images/epic-roofing-logo.svg",
    "description": metaDescription,
    "telephone": "(281) 326-9905",
    "email": "info@epicroofingtx.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9402 Spaulding St",
      "addressLocality": "Houston",
      "addressRegion": "TX",
      "postalCode": "77016",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.847152,
      "longitude": -95.305579
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:00",
        "closes": "19:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": city },
      { "@type": "City", "name": "Houston" }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "hasMap": "https://maps.google.com/?q=Epic+Roofing+%26+Construction+LLC+Houston+TX"
  };

  // Build FAQ HTML
  const faqsHTML = faqs.map((f, idx) => `
          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>${f.q}</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>${f.a}</p>
            </div>
          </div>`).join('\n');

  // Build AEO HTML
  const aeoHTML = aeoBlocks.map((b, idx) => `
          <div class="aeo-box" style="background: #FFFFFF; border: 1.5px solid #CBD5E1; border-left: 4px solid var(--hazard-amber); border-radius: 6px; padding: 1.75rem; margin-bottom: 1.75rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h2 style="font-size: 1.35rem; color: var(--storm-charcoal); margin-bottom: 0.75rem; text-transform: none; font-family: var(--font-display); letter-spacing: 0.01em;">
              ${b.q}
            </h2>
            <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.65; margin: 0;">
              ${b.a}
            </p>
          </div>`).join('\n');

  // Storm chaser section if applicable
  const stormChaserHTML = hasStormChaserSection ? `
    <!-- STORM CHASER CAUTION SECTION -->
    <section class="section-grey section-padding" id="storm-chaser-warning">
      <div class="container">
        <div style="max-width: 820px; margin: 0 auto;">
          <div style="background: #FFFFFF; border: 2px solid #E2E8F0; border-radius: 8px; padding: 2.25rem; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
            <span class="mono-badge" style="color: #B23A2E; text-transform: uppercase;">Consumer Alert &bull; Texas HB 2102</span>
            <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem; margin-bottom: 1rem; font-size: 1.75rem;">
              Protecting ${city} Homeowners from Storm-Chaser Scams
            </h2>
            <p style="color: var(--text-dark); font-size: 1.02rem; line-height: 1.65; margin-bottom: 1rem;">
              Out-of-state roofing crews travel into ${city} after heavy wind and hail storms. They knock on doors, pressure homeowners into signing immediate Assignment of Benefits forms, and promise to waive deductibles.
            </p>
            <p style="color: var(--text-dark); font-size: 1.02rem; line-height: 1.65; margin-bottom: 1rem;">
              Under Texas House Bill 2102, it is a criminal offense for a roofing contractor to pay, waive, or rebate a property insurance deductible. Homeowners are required by Texas law to pay their full deductible directly. Legitimate contractors provide line-item invoices for insurance verification.
            </p>
            <div style="background: var(--cloud-white); border-left: 4px solid var(--hazard-amber); padding: 1rem 1.25rem; border-radius: 4px; margin-top: 1.25rem;">
              <strong style="color: var(--storm-charcoal); font-family: var(--font-display); text-transform: uppercase;">Red Flags to Watch For:</strong>
              <ul style="margin-top: 0.5rem; padding-left: 1.25rem; list-style: disc; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
                <li>Out-of-state license plates or unmarked pickup trucks</li>
                <li>Promises of zero deductible or free roof promotions</li>
                <li>High-pressure demands for immediate contract signatures</li>
                <li>No physical permanent office address in the Houston metropolitan area</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${shingleDividerGreyToLight}` : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta name="description" content="${metaDescription}">
  <title>${title}</title>
  <link rel="canonical" href="https://www.epicroofingtx.com/${slug}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23161B22'/><path d='M15 65 L50 25 L85 65 Z' fill='%23E2900F'/></svg>">

  <!-- Google Fonts: Oswald (Headings), Source Sans 3 (Body), IBM Plex Mono (Stats/Data) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Oswald:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">

  <!-- Core Stylesheet -->
  <link rel="stylesheet" href="style.css">

  <style>
    /* Location Page Custom Utilities */
    .hero-form-card {
      background: #FFFFFF;
      border: 2px solid var(--hazard-amber);
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 12px 32px rgba(0,0,0,0.3);
      color: var(--text-dark);
    }
    .hero-form-card h3 {
      color: var(--storm-charcoal);
      font-size: 1.35rem;
      margin-bottom: 0.35rem;
    }
    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1.5px solid #CBD5E1;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 0.95rem;
      margin-bottom: 1rem;
      transition: border-color 0.2s ease;
    }
    .form-input:focus {
      outline: none;
      border-color: var(--hazard-amber);
    }
    .form-submit-btn {
      width: 100%;
      padding: 0.9rem;
      font-size: 1.05rem;
    }
    .trust-badges-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 2rem;
    }
    @media (min-width: 768px) {
      .trust-badges-row {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .trust-badge-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      padding: 0.85rem;
      text-align: center;
    }
    .trust-badge-title {
      font-family: var(--font-display);
      font-weight: 700;
      color: var(--hazard-amber);
      font-size: 1.05rem;
      text-transform: uppercase;
      display: block;
    }
    .trust-badge-sub {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #CBD5E1;
      display: block;
      margin-top: 0.2rem;
    }
    .faq-item {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      margin-bottom: 0.75rem;
      overflow: hidden;
    }
    .faq-question {
      width: 100%;
      text-align: left;
      padding: 1.15rem 1.4rem;
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: var(--storm-charcoal);
      background: #FFFFFF;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: color 0.15s ease, background-color 0.15s ease;
    }
    .faq-question:hover {
      color: var(--hazard-amber);
      background-color: var(--cloud-white);
    }
    .faq-answer {
      display: none;
      padding: 0 1.4rem 1.25rem 1.4rem;
      color: var(--text-muted);
      font-size: 1rem;
      line-height: 1.6;
    }
    .faq-icon {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--hazard-amber);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      align-items: center;
    }
    @media (min-width: 992px) {
      .hero-grid {
        grid-template-columns: 1.25fr 0.95fr;
      }
    }
    .service-area-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .area-link-pill {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      padding: 0.4rem 0.9rem;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--storm-charcoal);
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .area-link-pill:hover {
      border-color: var(--hazard-amber);
      background-color: var(--hazard-amber);
      color: #FFFFFF;
    }
  </style>

  <!-- Structured Data: FAQPage -->
  <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
  </script>

  <!-- Structured Data: LocalBusiness -->
  <script type="application/ld+json">
${JSON.stringify(localBusinessSchema, null, 2)}
  </script>

  <!-- Google Analytics 4 -->
  <script src="/analytics.js" defer></script>
</head>
<body>

  <!-- EMERGENCY TOP BANNER -->
  <div class="emergency-strip" id="emergency-banner">
    <span>🚨 Houston Storm Season: Free Same-Day Roof Inspection</span>
    <span>|</span>
    <a href="tel:+12813269905" id="emergency-call-link">📞 (281) 326-9905</a>
  </div>

  <!-- STICKY NAVY HEADER -->
  <header id="site-header" class="sticky-header">
    <div class="header-container">
      <a href="/" class="logo" id="site-logo">
        <img src="/images/epic-roofing-logo.svg" 
             alt="Epic Roofing &amp; Construction LLC logo"
             style="height: 50px; width: 200px; aspect-ratio: 200/50;" width="200" height="50">
      </a>

      <!-- Desktop Nav -->
      <nav class="desktop-nav" id="desktop-navbar">
        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Services</span>
          <div class="dropdown-menu dropdown-menu-wide">
            <div>
              <a class="dropdown-item" href="/roof-replacement-houston">Shingle Replacement</a>
              <a class="dropdown-item" href="/metal-roofing-houston">Metal Roofing</a>
              <a class="dropdown-item" href="/roof-coating-houston">Commercial Coating</a>
              <a class="dropdown-item" href="/free-roof-inspection-houston">Free Inspection</a>
              <a class="dropdown-item" href="/tile-roofing-houston">Tile &amp; Slate Roofing</a>
            </div>
            <div>
              <a class="dropdown-item" href="/gutter-installation-houston">Custom Rain Gutters</a>
              <a class="dropdown-item" href="/chimney-flashing-repair-houston">Flashing &amp; Chimney</a>
              <a class="dropdown-item" href="/roof-repair-houston">Roof Repairs &amp; Sealing</a>
              <a class="dropdown-item" href="/affordable-roofing-houston">Affordable Roofing</a>
              <a class="dropdown-item" href="/roof-leak-detection-houston">Leak Detection</a>
            </div>
          </div>
        </div>

        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Storm Damage</span>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/hail-damage-roof-repair-houston">Hail Damage Restoration</a>
            <a class="dropdown-item" href="/wind-damage-roof-repair-houston">Wind Damage Restoration</a>
            <a class="dropdown-item" href="/emergency-roof-tarping-houston">Emergency Tarping</a>
            <a class="dropdown-item" href="/storm-damage-roofing-houston">General Storm Damage</a>
            <a class="dropdown-item" href="/insurance-claim-roofing-houston">Insurance Claim Help</a>
          </div>
        </div>

        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Service Areas</span>
          <div class="dropdown-menu dropdown-menu-wide dropdown-menu-scrollable">
            <div>
              <a class="dropdown-item" href="/">Houston Core</a>
              <a class="dropdown-item" href="/katy-roofing-contractor">Katy</a>
              <a class="dropdown-item" href="/the-woodlands-roofing-contractor">The Woodlands</a>
              <a class="dropdown-item" href="/sugar-land-roofing-contractor">Sugar Land</a>
              <a class="dropdown-item" href="/cypress-roofing-contractor">Cypress</a>
              <a class="dropdown-item" href="/pearland-roofing-contractor">Pearland</a>
              <a class="dropdown-item" href="/league-city-roofing-contractor">League City</a>
              <a class="dropdown-item" href="/spring-tx-roofing-contractor">Spring</a>
              <a class="dropdown-item" href="/friendswood-tx-roofing-contractor">Friendswood</a>
              <a class="dropdown-item" href="/channelview-tx-roofing-contractor">Channelview</a>
              <a class="dropdown-item" href="/deer-park-tx-roofing-contractor">Deer Park</a>
              <a class="dropdown-item" href="/la-porte-tx-roofing-contractor">La Porte</a>
            </div>
            <div>
              <a class="dropdown-item" href="/rosenberg-tx-roofing-contractor">Rosenberg</a>
              <a class="dropdown-item" href="/manvel-tx-roofing-contractor">Manvel</a>
              <a class="dropdown-item" href="/atascocita-kingwood-tx-roofing-contractor">Atascocita / Kingwood</a>
              <a class="dropdown-item" href="/webster-clear-lake-tx-roofing-contractor">Webster / Clear Lake</a>
              <a class="dropdown-item" href="/pasadena-tx-roofing-contractor">Pasadena</a>
              <a class="dropdown-item" href="/tomball-tx-roofing-contractor">Tomball</a>
              <a class="dropdown-item" href="/baytown-tx-roofing-contractor">Baytown</a>
              <a class="dropdown-item" href="/conroe-tx-roofing-contractor">Conroe</a>
              <a class="dropdown-item" href="/galveston-tx-roofing-contractor">Galveston</a>
              <a class="dropdown-item" href="/humble-tx-roofing-contractor">Humble</a>
              <a class="dropdown-item" href="/richmond-tx-roofing-contractor">Richmond</a>
              <a class="dropdown-item" href="/missouri-city-roofing-contractor">Missouri City</a>
            </div>
          </div>
        </div>

        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Resources</span>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/blog">Blog &amp; Guides</a>
            <a class="dropdown-item" href="/calculator">Cost Calculator</a>
            <a class="dropdown-item" href="/financing">Financing</a>
            <a class="dropdown-item" href="/#case-studies">Case Studies</a>
          </div>
        </div>

        <a href="/contact" class="nav-link">Contact</a>
      </nav>

      <a href="tel:+12813269905" class="btn btn-primary" id="btn-call-header">
        📞 (281) 326-9905
      </a>

      <button class="menu-toggle" id="menu-btn" aria-label="Open Navigation Menu">☰</button>
    </div>

    <div class="nav-utility-strip">
      <div class="container nav-utility-flex">
        <div class="nav-utility-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span class="nav-utility-divider">|</span>
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Slideout Menu -->
  <div class="mobile-menu-overlay" id="menu-overlay"></div>
  <div class="mobile-menu" id="mobile-menu">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:1rem;">
      <a href="/" class="logo">EPIC ROOFING <span>TX</span></a>
      <button class="menu-toggle" id="menu-close-btn" style="color:var(--hazard-amber);">✕</button>
    </div>

    <a href="/" class="mobile-nav-link">Home</a>

    <div class="mobile-accordion">
      <button class="mobile-accordion-btn" type="button">
        <span>Services</span>
        <span class="accordion-icon">▼</span>
      </button>
      <div class="mobile-accordion-content">
        <a href="/roof-replacement-houston" class="mobile-accordion-link">Shingle Replacement</a>
        <a href="/metal-roofing-houston" class="mobile-accordion-link">Metal Roofing</a>
        <a href="/roof-coating-houston" class="mobile-accordion-link">Commercial Coating</a>
        <a href="/free-roof-inspection-houston" class="mobile-accordion-link">Free Inspection</a>
        <a href="/gutter-installation-houston" class="mobile-accordion-link">Custom Rain Gutters</a>
        <a href="/chimney-flashing-repair-houston" class="mobile-accordion-link">Flashing &amp; Chimney</a>
        <a href="/roof-repair-houston" class="mobile-accordion-link">Roof Repairs &amp; Sealing</a>
        <a href="/tile-roofing-houston" class="mobile-accordion-link">Tile Roofing</a>
        <a href="/affordable-roofing-houston" class="mobile-accordion-link">Affordable Roofing</a>
        <a href="/roof-leak-detection-houston" class="mobile-accordion-link">Leak Detection</a>
      </div>
    </div>

    <div class="mobile-accordion">
      <button class="mobile-accordion-btn" type="button">
        <span>Storm Damage</span>
        <span class="accordion-icon">▼</span>
      </button>
      <div class="mobile-accordion-content">
        <a href="/hail-damage-roof-repair-houston" class="mobile-accordion-link">Hail Damage Restoration</a>
        <a href="/wind-damage-roof-repair-houston" class="mobile-accordion-link">Wind Damage Restoration</a>
        <a href="/emergency-roof-tarping-houston" class="mobile-accordion-link">Emergency Tarping</a>
        <a href="/storm-damage-roofing-houston" class="mobile-accordion-link">General Storm Damage</a>
        <a href="/insurance-claim-roofing-houston" class="mobile-accordion-link">Insurance Claim Help</a>
      </div>
    </div>

    <div class="mobile-accordion">
      <button class="mobile-accordion-btn" type="button">
        <span>Service Areas</span>
        <span class="accordion-icon">▼</span>
      </button>
      <div class="mobile-accordion-content">
        <a href="/" class="mobile-accordion-link">Houston Core</a>
        <a href="/katy-roofing-contractor" class="mobile-accordion-link">Katy</a>
        <a href="/the-woodlands-roofing-contractor" class="mobile-accordion-link">The Woodlands</a>
        <a href="/sugar-land-roofing-contractor" class="mobile-accordion-link">Sugar Land</a>
        <a href="/cypress-roofing-contractor" class="mobile-accordion-link">Cypress</a>
        <a href="/pearland-roofing-contractor" class="mobile-accordion-link">Pearland</a>
        <a href="/league-city-roofing-contractor" class="mobile-accordion-link">League City</a>
        <a href="/spring-tx-roofing-contractor" class="mobile-accordion-link">Spring</a>
        <a href="/friendswood-tx-roofing-contractor" class="mobile-accordion-link">Friendswood</a>
        <a href="/channelview-tx-roofing-contractor" class="mobile-accordion-link">Channelview</a>
        <a href="/deer-park-tx-roofing-contractor" class="mobile-accordion-link">Deer Park</a>
        <a href="/la-porte-tx-roofing-contractor" class="mobile-accordion-link">La Porte</a>
        <a href="/rosenberg-tx-roofing-contractor" class="mobile-accordion-link">Rosenberg</a>
        <a href="/manvel-tx-roofing-contractor" class="mobile-accordion-link">Manvel</a>
        <a href="/atascocita-kingwood-tx-roofing-contractor" class="mobile-accordion-link">Atascocita / Kingwood</a>
        <a href="/webster-clear-lake-tx-roofing-contractor" class="mobile-accordion-link">Webster / Clear Lake</a>
        <a href="/pasadena-tx-roofing-contractor" class="mobile-accordion-link">Pasadena</a>
        <a href="/tomball-tx-roofing-contractor" class="mobile-accordion-link">Tomball</a>
        <a href="/baytown-tx-roofing-contractor" class="mobile-accordion-link">Baytown</a>
        <a href="/conroe-tx-roofing-contractor" class="mobile-accordion-link">Conroe</a>
        <a href="/galveston-tx-roofing-contractor" class="mobile-accordion-link">Galveston</a>
        <a href="/humble-tx-roofing-contractor" class="mobile-accordion-link">Humble</a>
        <a href="/richmond-tx-roofing-contractor" class="mobile-accordion-link">Richmond</a>
        <a href="/missouri-city-roofing-contractor" class="mobile-accordion-link">Missouri City</a>
      </div>
    </div>

    <div class="mobile-accordion">
      <button class="mobile-accordion-btn" type="button">
        <span>Resources</span>
        <span class="accordion-icon">▼</span>
      </button>
      <div class="mobile-accordion-content">
        <a href="/blog" class="mobile-accordion-link">Blog &amp; Guides</a>
        <a href="/calculator" class="mobile-accordion-link">Cost Calculator</a>
        <a href="/financing" class="mobile-accordion-link">Financing</a>
        <a href="/#case-studies" class="mobile-accordion-link">Case Studies</a>
      </div>
    </div>

    <a href="/contact" class="mobile-nav-link">Contact</a>

    <div style="display:flex; gap:0.75rem; justify-content:center; padding-top:0.5rem; font-size:0.8rem; border-top:1px solid rgba(255,255,255,0.06);">
      <a href="/privacy-policy" style="color:var(--text-dim);">Privacy Policy</a>
      <span style="color:rgba(255,255,255,0.2);">|</span>
      <a href="/terms-and-conditions" style="color:var(--text-dim);">Terms &amp; Conditions</a>
    </div>

    <a href="tel:+12813269905" class="btn btn-primary" style="margin-top:0.75rem; width:100%;">📞 Call (281) 326-9905</a>
  </div>

  <main id="main-content">
    <!-- BREADCRUMBS -->
    <div class="container" style="padding-top: 1.25rem; padding-bottom: 0.25rem;">
      <nav aria-label="Breadcrumbs" style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">
        <a href="/" style="color: var(--text-dark); text-decoration: underline;">Home</a>
        <span style="margin: 0 0.4rem;">/</span>
        <a href="/#service-areas" style="color: var(--text-dark); text-decoration: underline;">Service Areas</a>
        <span style="margin: 0 0.4rem;">/</span>
        <span style="color: var(--hazard-amber); font-weight: 700;">${city}</span>
      </nav>
    </div>

    <!-- 1. HERO SECTION -->
    <section class="hero-section" id="hero-section" style="padding-top: 2.5rem; padding-bottom: 3.5rem;">
      <div class="container">
        <div class="hero-grid">
          <div>
            <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">
              Local Roofing Specialists &bull; ${city}, TX
            </span>
            <h1 style="color: #FFFFFF; font-size: 2.65rem; line-height: 1.12; margin-top: 0.75rem; margin-bottom: 1.25rem;">
              ${h1}
            </h1>
            <p style="color: #CBD5E1; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
              ${heroSubtitle}
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="#leads-form" class="btn btn-tactile">
                Schedule Free Inspection
              </a>
              <a href="tel:+12813269905" class="btn btn-outline">
                📞 (281) 326-9905
              </a>
            </div>

            <!-- Trust Badges Row -->
            <div class="trust-badges-row">
              <div class="trust-badge-item">
                <span class="trust-badge-title">GAF Elite</span>
                <span class="trust-badge-sub">Factory Certified</span>
              </div>
              <div class="trust-badge-item">
                <span class="trust-badge-title">HAAG Certified</span>
                <span class="trust-badge-sub">Damage Inspectors</span>
              </div>
              <div class="trust-badge-item">
                <span class="trust-badge-title">10-Yr Warranty</span>
                <span class="trust-badge-sub">Workmanship</span>
              </div>
              <div class="trust-badge-item">
                <span class="trust-badge-title">2-Hr Dispatch</span>
                <span class="trust-badge-sub">Emergency Tarping</span>
              </div>
            </div>
          </div>

          <!-- Hero Lead Form -->
          <div id="leads-form">
            <div class="hero-form-card">
              <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Direct Dispatch</span>
              <h3>Get Your Free Roof Inspection</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">
                No obligation. We assess storm damage, lifted shingles, and pipe flashings across ${city}.
              </p>
              <form action="/contact" method="GET" onsubmit="window.location.href='/contact?name='+encodeURIComponent(this.name.value)+'&phone='+encodeURIComponent(this.phone.value)+'&zip='+encodeURIComponent(this.zip.value); return false;">
                <div>
                  <label for="lead-name" class="form-label">Full Name</label>
                  <input type="text" id="lead-name" name="name" class="form-input" placeholder="e.g. David Miller" required>
                </div>
                <div>
                  <label for="lead-phone" class="form-label">Phone Number</label>
                  <input type="tel" id="lead-phone" name="phone" class="form-input" placeholder="(281) 555-0199" required>
                </div>
                <div>
                  <label for="lead-zip" class="form-label">${city} Area ZIP Code</label>
                  <input type="text" id="lead-zip" name="zip" class="form-input" placeholder="77..." pattern="[0-9]{5}" required>
                </div>
                <button type="submit" class="btn btn-tactile form-submit-btn" id="lead-submit-btn">
                  Book Free Assessment
                </button>
                <p style="font-size: 0.78rem; color: var(--text-muted); text-align: center; margin-top: 0.75rem; margin-bottom: 0;">
                  Crews active Mon–Sat 7AM–7PM. 24/7 emergency response for active water leaks.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${shingleDividerDarkToLight}

    <!-- 2. WHY HOMEOWNERS IN CITY CHOOSE US -->
    <section class="section-padding" id="why-choose-us" style="background-color: var(--cloud-white);">
      <div class="container">
        <div style="text-align: center; max-width: 780px; margin: 0 auto 3rem auto;">
          <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Proven Craftsmanship</span>
          <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem;">Why ${city} Property Owners Trust Epic Roofing</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem;">
            We build roofs specifically engineered to withstand Gulf Coast tropical storms, 130 mph coastal gusts, and extreme summer thermal cycling.
          </p>
        </div>

        <div class="grid grid-3">
          ${whyChoosePoints.map(p => `
          <div class="card">
            <h3 style="color: var(--storm-charcoal); font-size: 1.3rem;">${p.title}</h3>
            <p style="color: var(--text-muted); font-size: 0.98rem; line-height: 1.6;">
              ${p.text}
            </p>
          </div>`).join('\n')}
        </div>
      </div>
    </section>
    ${shingleDividerLightToGrey}

    <!-- 3. HIDDEN STORM DAMAGE & FORENSIC INSPECTION -->
    <section class="section-grey section-padding" id="storm-inspection">
      <div class="container">
        <div class="grid grid-2" style="align-items: center; gap: 3rem;">
          <div>
            <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Forensic Analysis</span>
            <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem;">
              ${inspectionHeading}
            </h2>
            <div style="color: var(--text-dark); font-size: 1.02rem; line-height: 1.65;">
              ${inspectionText}
            </div>
            <div style="margin-top: 1.5rem;">
              <a href="/free-roof-inspection-houston" class="btn btn-tactile">Learn About Our 21-Point Inspection</a>
            </div>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <h3 style="color: var(--storm-charcoal); font-size: 1.25rem; border-bottom: 2px solid var(--hazard-amber); padding-bottom: 0.5rem; margin-bottom: 1rem;">
              Insurance Approval Standards
            </h3>
            <ul style="padding-left: 1.25rem; list-style: disc; color: var(--text-dark); font-size: 0.95rem; line-height: 1.65;">
              <li style="margin-bottom: 0.75rem;"><strong>Hail Test Square:</strong> Adjusters require 10+ distinct hail strikes inside a 10x10 ft test square across multiple roof slopes.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Total Surface Threshold:</strong> Storm damage impacting more than 30% of the roof surface qualifies for whole-slope or full roof replacement.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Wind Creasing:</strong> Wind speeds above 50 mph break thermal seal strips, allowing shingles to flutter and crease along the top nail line.</li>
              <li><strong>Deductible Law:</strong> Under Texas law, most homeowners pay only their insurance deductible, with the carrier covering the remaining approved replacement cost.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    ${shingleDividerGreyToLight}

    <!-- 4. AEO / GEO Q&A SECTION -->
    <section class="section-padding" id="aeo-answers" style="background-color: var(--cloud-white);">
      <div class="container">
        <div style="text-align: center; max-width: 780px; margin: 0 auto 2.5rem auto;">
          <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Direct Answers &bull; Fast Facts</span>
          <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem;">Frequently Asked Technical Questions in ${city}</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem;">
            Clear, transparent data on roof replacement costs, lifespans, and storm damage protocols.
          </p>
        </div>

        <div style="max-width: 860px; margin: 0 auto;">
          ${aeoHTML}
        </div>
      </div>
    </section>
    ${shingleDividerLightToGrey}

    <!-- 5. LOCAL PAIN POINT DEEP DIVE -->
    <section class="section-grey section-padding" id="local-climate">
      <div class="container">
        <div style="max-width: 860px; margin: 0 auto;">
          <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">${painPointBadge}</span>
          <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem; margin-bottom: 1.25rem;">
            ${painPointHeadline}
          </h2>
          ${painPointParagraphs.map(p => `
          <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">
            ${p}
          </p>`).join('\n')}
        </div>
      </div>
    </section>
    ${shingleDividerGreyToLight}

    ${stormChaserHTML}

    <!-- 6. CORE SERVICES IN THIS CITY -->
    <section class="section-padding" id="services-section" style="background-color: var(--cloud-white);">
      <div class="container">
        <div style="text-align: center; max-width: 760px; margin: 0 auto 3rem auto;">
          <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Full-Scope Solutions</span>
          <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem;">Roofing Services for ${city} Residents</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem;">
            From partial leak repairs to complete roof replacements with GAF Timberline HDZ shingles.
          </p>
        </div>

        <div class="grid grid-3">
          <div class="card">
            <h3 style="color: var(--storm-charcoal);"><a href="/roof-replacement-houston" style="color: var(--storm-charcoal); text-decoration: none;">Roof Replacement</a></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              Full tear-off, rotten decking replacement, synthetic underlayment, and Class 4 impact shingles installed with 6 ring-shank nails per shingle.
            </p>
            <a href="/roof-replacement-houston" style="color: var(--hazard-amber); font-weight: 700; font-family: var(--font-display); text-transform: uppercase;">Explore Replacements &rarr;</a>
          </div>

          <div class="card">
            <h3 style="color: var(--storm-charcoal);"><a href="/hail-damage-roof-repair-houston" style="color: var(--storm-charcoal); text-decoration: none;">Hail Damage Repair</a></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              Certified HAAG inspections to detect micro-fractures, asphalt bruising, and granule stripping caused by severe spring thunderstorm hail cores.
            </p>
            <a href="/hail-damage-roof-repair-houston" style="color: var(--hazard-amber); font-weight: 700; font-family: var(--font-display); text-transform: uppercase;">Hail Damage Help &rarr;</a>
          </div>

          <div class="card">
            <h3 style="color: var(--storm-charcoal);"><a href="/wind-damage-roof-repair-houston" style="color: var(--storm-charcoal); text-decoration: none;">Wind Damage &amp; Leaks</a></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              Fast emergency repairs for missing shingles, lifted ridge caps, failed pipe jack boots, and chimney counter-flashing leaks.
            </p>
            <a href="/wind-damage-roof-repair-houston" style="color: var(--hazard-amber); font-weight: 700; font-family: var(--font-display); text-transform: uppercase;">Wind Leak Repairs &rarr;</a>
          </div>

          <div class="card">
            <h3 style="color: var(--storm-charcoal);"><a href="/insurance-claim-roofing-houston" style="color: var(--storm-charcoal); text-decoration: none;">Insurance Claims</a></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              We meet your insurance adjuster on the roof with high-resolution photo proof and storm date records to support fair claim approvals.
            </p>
            <a href="/insurance-claim-roofing-houston" style="color: var(--hazard-amber); font-weight: 700; font-family: var(--font-display); text-transform: uppercase;">Insurance Claim Guide &rarr;</a>
          </div>

          <div class="card">
            <h3 style="color: var(--storm-charcoal);"><a href="/emergency-roof-tarping-houston" style="color: var(--storm-charcoal); text-decoration: none;">Emergency Tarping</a></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              2-hour rapid dispatch with heavy-duty 10-mil poly tarps secured using 2x4 lumber battens to prevent interior drywall water damage.
            </p>
            <a href="/emergency-roof-tarping-houston" style="color: var(--hazard-amber); font-weight: 700; font-family: var(--font-display); text-transform: uppercase;">Emergency Tarping &rarr;</a>
          </div>

          <div class="card">
            <h3 style="color: var(--storm-charcoal);"><a href="/metal-roofing-houston" style="color: var(--storm-charcoal); text-decoration: none;">Standing Seam Metal</a></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              24-gauge Galvalume standing seam metal roofing engineered for 150+ mph hurricane wind resistance and a 50-year service life.
            </p>
            <a href="/metal-roofing-houston" style="color: var(--hazard-amber); font-weight: 700; font-family: var(--font-display); text-transform: uppercase;">Metal Roofing Options &rarr;</a>
          </div>
        </div>
      </div>
    </section>
    ${shingleDividerLightToGrey}

    <!-- 7. FAQ SECTION -->
    <section class="section-grey section-padding" id="faq-section">
      <div class="container">
        <div style="text-align: center; max-width: 760px; margin: 0 auto 2.5rem auto;">
          <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Got Questions?</span>
          <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem;">${city} Roofing Questions &amp; Answers</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem;">
            Real answers to common questions about roof replacements, hail damage, and warranties in ${city}.
          </p>
        </div>

        <div class="faq-container" style="max-width: 860px; margin: 0 auto;">
          ${faqsHTML}
        </div>
      </div>
    </section>
    ${shingleDividerGreyToLight}

    <!-- 8. NEARBY SERVICE AREAS & BLOG GUIDES -->
    <section class="section-padding" id="nearby-areas" style="background-color: var(--cloud-white);">
      <div class="container">
        <div class="grid grid-2" style="gap: 2.5rem;">
          <div class="card">
            <h3 style="color: var(--storm-charcoal); font-size: 1.25rem;">Neighboring Communities We Serve</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              Our Houston-based crews travel across the Greater Houston metropolitan area daily:
            </p>
            <div class="service-area-pills-row">
              ${neighboringLinks.map(n => `<a href="${n.url}" class="area-link-pill">${n.name}</a>`).join('\n              ')}
            </div>
          </div>

          <div class="card">
            <h3 style="color: var(--storm-charcoal); font-size: 1.25rem;">Helpful Roofing Guides &amp; Resources</h3>
            <ul style="padding-left: 1.25rem; list-style: disc; color: var(--text-dark); font-size: 0.95rem; line-height: 1.8;">
              ${blogLinks.map(b => `<li><a href="${b.url}" style="color: var(--storm-charcoal); text-decoration: underline;">${b.title}</a></li>`).join('\n              ')}
            </ul>
          </div>
        </div>
      </div>
    </section>
    ${shingleDividerLightToDark}

    <!-- 9. FINAL CTA SECTION -->
    <section class="section-dark section-padding" id="final-cta" style="background-color: var(--storm-charcoal); text-align: center;">
      <div class="container">
        <div style="max-width: 760px; margin: 0 auto;">
          <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Protect Your Investment</span>
          <h2 style="color: #FFFFFF; font-size: 2.4rem; margin-top: 0.5rem; margin-bottom: 1rem;">
            Schedule Your Free ${city} Roof Inspection Today
          </h2>
          <p style="color: #CBD5E1; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
            Get a forensic photo report of your roof condition with zero sales pressure. Call our team directly or request your inspection online.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="tel:+12813269905" class="btn btn-tactile" style="font-size: 1.15rem; padding: 1rem 2rem;">
              📞 Call (281) 326-9905
            </a>
            <a href="#leads-form" class="btn btn-outline" style="font-size: 1.15rem; padding: 1rem 2rem;">
              Request Online Inspection
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${getFooter()}
</body>
</html>`;

  assertNoBannedWords(html, slug);
  return html;
}

// Complete Data Definitions for all 8 Pages
const pagesData = [
  // 1. FRIENDSWOOD, TX
  {
    city: "Friendswood",
    slug: "friendswood-tx-roofing-contractor",
    title: "Friendswood TX Roofing Contractor | Epic Roofing TX",
    metaDescription: "GAF Master Elite roofing in Friendswood TX. Storm damage repair, roof replacement & insurance claim help. Free inspections. Call (281) 326-9905.",
    h1: "Friendswood TX Roofing Contractor & Storm Damage Repair",
    heroSubtitle: "Serving Heritage Park, West Ranch, and Clear Creek subdivisions with certified roof inspections, heavy-duty shingle replacements, and insurance claim documentation.",
    painPointBadge: "Local Neighborhood Focus",
    painPointHeadline: "Aging Roofs and Tree Canopy Challenges in Friendswood",
    painPointParagraphs: [
      "Friendswood neighborhoods feature mature live oaks and pine trees that overhang residential rooflines. Falling branches puncture asphalt shingles, while dense shade traps moisture along valley flashing lines. This encourages the growth of Gloeocapsa magma algae, which creates dark streaks and slowly degrades protective granules.",
      "Many homes built between 1995 and 2010 in subdivisions like West Ranch and Heritage Park are reaching the end of their original 15 to 20 year asphalt shingle lifespan. As shingles age, the underlying oils evaporate under the intense Gulf Coast sun, making them brittle and susceptible to wind uplift during severe thunderstorm squalls.",
      "Our inspection crews identify hidden water penetration around chimney saddles, skylights, and plumbing vent pipes before moisture reaches attic insulation and drywall ceilings."
    ],
    aeoBlocks: [
      {
        q: "How do I know if my roof has storm damage in Friendswood?",
        a: "A roof has storm damage when hail creates circular dark bruises that expose fiberglass matting, or when wind speeds above 50 mph break thermal seal strips and crease shingle tabs. Insurance carriers require documented evidence of 10 or more hail impacts inside a 10 by 10 foot test square across multiple roof slopes to approve full replacement."
      },
      {
        q: "How much does a roof replacement cost in Friendswood TX?",
        a: "A full roof replacement on a standard 2,000 square foot home in Friendswood typically costs between $9,500 and $16,000 for architectural shingles. The total price varies based on roof pitch, decking condition, valley metal flashing requirements, and whether the project is funded out of pocket or through an approved storm insurance claim."
      },
      {
        q: "How long does an asphalt shingle roof last in Friendswood?",
        a: "An asphalt shingle roof in Friendswood lasts between 15 and 20 years under typical Gulf Coast humidity and heat conditions. High-grade GAF architectural systems with proper attic ventilation can reach 20 to 25 years, while cheap builder-grade 3-tab shingles frequently deteriorate within 10 to 12 years."
      }
    ],
    hasStormChaserSection: true,
    inspectionHeading: "Certified 21-Point Roof Inspections in Friendswood",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        Hail stones hitting architectural shingles do not always cause immediate leaks. Instead, hail crushes the protective ceramic granules into the asphalt layer, creating soft bruise spots where ultraviolet sunlight rapidly degrades the fiberglass core.
      </p>
      <p>
        Our HAAG-certified inspectors climb your roof, mark test squares, photograph granular loss, and provide a detailed physical report you can submit directly to your insurance company.
      </p>`,
    whyChoosePoints: [
      {
        title: "GAF Master Elite Certified",
        text: "Only 2% of roofing contractors in North America earn GAF Master Elite status, allowing us to offer 50-year non-prorated system warranties."
      },
      {
        title: "Clear Creek Drainage Expertise",
        text: "We install heavy-gauge ice and water shield in critical valley junctions to handle heavy rainfall drainage without backing up under shingles."
      },
      {
        title: "Insurance Claim Representation",
        text: "We meet your insurance adjuster on the roof with itemized measurements and storm date verification to ensure complete scope coverage."
      }
    ],
    faqs: [
      {
        q: "How long does a roof replacement take in Friendswood?",
        a: "Most residential roof replacements in Friendswood take 1 to 2 days to complete. Our crew performs a full tear-off, replaces any rotted decking, installs synthetic underlayment, and completes magnetic sweeps of your yard and driveway to remove all roofing nails."
      },
      {
        q: "What should I do if a tree branch falls on my roof in Friendswood?",
        a: "First ensure your family is safe, then call our 24/7 emergency dispatch at (281) 326-9905. We dispatch crews within 2 hours to remove debris, apply an emergency watertight tarp, and document all structural decking damage for your insurance claim."
      },
      {
        q: "Do I have to pay my deductible for a storm damage roof replacement?",
        a: "Yes. Under Texas House Bill 2102, all Texas homeowners must pay their required insurance deductible directly to the contractor. It is illegal for any roofing company to waive, rebate, or absorb your deductible."
      },
      {
        q: "How does attic ventilation affect roof lifespan in Friendswood?",
        a: "Attic temperatures in Friendswood exceed 150 degrees in summer. Proper ridge vents and soffit intake vents reduce attic heat, preventing shingles from baking and extending their operational lifespan by several years."
      },
      {
        q: "What is the best shingle brand for homes in Friendswood?",
        a: "We recommend GAF Timberline HDZ architectural shingles. They feature LayerLock technology and an unlimited wind speed warranty when installed with four qualifying GAF accessory products."
      }
    ],
    neighboringLinks: [
      { name: "Pearland", url: "/pearland-roofing-contractor" },
      { name: "League City", url: "/league-city-roofing-contractor" },
      { name: "Webster / Clear Lake", url: "/webster-clear-lake-tx-roofing-contractor" },
      { name: "Manvel", url: "/manvel-tx-roofing-contractor" },
      { name: "Pasadena", url: "/pasadena-tx-roofing-contractor" }
    ],
    blogLinks: [
      { title: "Friendswood TX Roofing Guide & Local Code Overview", url: "/blog/roofing-friendswood-tx-guide" },
      { title: "How Insurance Roof Claims Work in Texas", url: "/blog/how-insurance-roof-claims-work-texas" },
      { title: "Signs of Hidden Roof Leaks After Heavy Rain", url: "/blog/signs-of-hidden-roof-leak-houston" },
      { title: "Roof Replacement Cost Guide for Greater Houston", url: "/blog/roof-replacement-cost-houston-2025" }
    ]
  },

  // 2. CHANNELVIEW, TX
  {
    city: "Channelview",
    slug: "channelview-tx-roofing-contractor",
    title: "Channelview TX Roofing Contractor | Epic Roofing TX",
    metaDescription: "GAF certified roofing contractor in Channelview TX. Storm damage repair, shingle replacement & insurance claims. Free inspections. Call (281) 326-9905.",
    h1: "Channelview TX Roofing Contractor & Storm Damage Repair",
    heroSubtitle: "Providing industrial-grade shingle installations, hurricane wind repairs, and complete roof replacements along the I-10 and Market Street corridors.",
    painPointBadge: "Ship Channel Corridor Climate",
    painPointHeadline: "Industrial Moisture and High Humidity in Channelview",
    painPointParagraphs: [
      "Channelview sits adjacent to the Houston Ship Channel and the San Jacinto River, exposing residential roofs to a combination of persistent humidity, fog, and industrial airborne particulate emissions. These environmental factors accelerate the breakdown of standard asphalt oils and cause galvanized metal valley flashing to oxidize faster than in western suburbs.",
      "Older established subdivisions built along Market Street, Sheldon Road, and Dell Dale Avenue feature housing stock where original roofs have passed the 15-year mark. When heavy tropical downpours sweep through East Harris County, corroded pipe jacks and dried-out rubber vent boots allow water to enter the attic unspotted.",
      "Epic Roofing installs heavy-gauge Galvalume flashing and corrosion-resistant ring-shank nails designed specifically to resist the demanding atmospheric conditions found in Channelview."
    ],
    aeoBlocks: [
      {
        q: "What causes roof leaks in Channelview after heavy rain?",
        a: "Roof leaks in Channelview are primarily caused by cracked neoprene pipe boots, rusted valley metal, and lifted shingles along eaves. High humidity and industrial particulates accelerate the drying out of rubber flashings, allowing rainwater from wind-driven downpours to bypass shingles and soak underlying plywood decking."
      },
      {
        q: "How do insurance claims work for roof damage in Channelview?",
        a: "When wind or hail damages more than 30% of a roof surface in Channelview, property insurance carriers typically approve a full roof replacement. The insurer pays the replacement cost value minus depreciation and your deductible, issuing the remaining depreciation holdback once the work is certified complete."
      },
      {
        q: "What should I do if my roof got hit by hail in Channelview?",
        a: "If your roof was struck by hail in Channelview, first take ground-level photographs of dented gutters, window screens, or outdoor AC units. Then schedule a free inspection with a certified roofing contractor to physically document test squares before contacting your insurance company to file a claim."
      }
    ],
    hasStormChaserSection: true,
    inspectionHeading: "Forensic Hail and Wind Assessments in Channelview",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        East Harris County experiences rapid supercell storms moving across the Ship Channel basin. High wind gusts peel back brittle shingle tabs and tear unsealed starter courses along the eaves.
      </p>
      <p>
        Our team uses high-resolution digital photography to document missing seal strips, creased shingles, and dented valley flashing, creating an undeniable paper trail for your claim adjuster.
      </p>`,
    whyChoosePoints: [
      {
        title: "Corrosion-Resistant Materials",
        text: "We use Galvalume steel flashing and heavy-duty synthetic underlayment that resist chemical vapors and coastal salt humidity."
      },
      {
        title: "Rapid Local Dispatch",
        text: "Our inspection teams operate out of Spaulding Street in Northeast Houston, reaching Channelview properties within minutes."
      },
      {
        title: "Transparent Itemized Bids",
        text: "Every estimate breaks down exact shingle counts, square footage, decking sheets, and flashing specifications with zero hidden fees."
      }
    ],
    faqs: [
      {
        q: "How much does a roof replacement cost in Channelview TX?",
        a: "A full asphalt shingle roof replacement on a 2,000 square foot single-family home in Channelview costs between $9,500 and $16,000. When approved through homeowner insurance following a covered storm, you pay only your policy deductible."
      },
      {
        q: "How long do shingles last in Channelview?",
        a: "Standard architectural shingles last 15 to 20 years in Channelview due to persistent humidity and industrial atmospheric exposure. Upgrading to Class 4 impact-resistant shingles provides superior durability against wind and hail."
      },
      {
        q: "Can I replace just one slope of my roof in Channelview?",
        a: "Partial roof repairs are possible if storm damage is isolated to a single slope and matching shingles are available. If damage exceeds 30% of the entire surface, full replacement is recommended to maintain structural integrity and warranty coverage."
      },
      {
        q: "Do you offer emergency roof tarping in Channelview?",
        a: "Yes. We offer 24/7 emergency roof tarping throughout Channelview. Our crews secure heavy-duty tarps with wood battens to seal active leaks until permanent repairs or full replacements can take place."
      },
      {
        q: "What certifications do your Channelview roofers hold?",
        a: "Our roofers are GAF Master Elite certified, HAAG forensic damage trained, and licensed with the Roofing Contractors Association of Texas (RCAT)."
      }
    ],
    neighboringLinks: [
      { name: "Baytown", url: "/baytown-tx-roofing-contractor" },
      { name: "Pasadena", url: "/pasadena-tx-roofing-contractor" },
      { name: "Deer Park", url: "/deer-park-tx-roofing-contractor" },
      { name: "Houston Core", url: "/" }
    ],
    blogLinks: [
      { title: "How to Spot Storm Damage After a Texas Storm", url: "/blog/how-to-spot-storm-damage-on-your-roof-after-a-texas-storm" },
      { title: "Emergency Roof Leak Repair Guide for Houston", url: "/blog/emergency-roof-leak-repair-houston" },
      { title: "Wind Damage Roof Repair Guide", url: "/blog/wind-damage-roof-repair-houston-guide" }
    ]
  },

  // 3. DEER PARK, TX
  {
    city: "Deer Park",
    slug: "deer-park-tx-roofing-contractor",
    title: "Deer Park TX Roofing Contractor | Epic Roofing TX",
    metaDescription: "GAF Master Elite roofing contractor in Deer Park TX. Heavy-duty roof replacement, hail damage repair & insurance claim aid. Call (281) 326-9905.",
    h1: "Deer Park TX Roofing Contractor & Storm Damage Repair",
    heroSubtitle: "Serving Center Street, San Augustine, and Battleground estates with heavy-duty shingle replacements, hail damage documentation, and insurance claim representation.",
    painPointBadge: "Petrochemical Corridor Atmospheric Stress",
    painPointHeadline: "Industrial Airborne Particulates and Thermal Wear in Deer Park",
    painPointParagraphs: [
      "Deer Park is located in close proximity to the Highway 225 industrial corridor and major refining complexes. Microscopic airborne chemical particulates and sulfur vapors settle on residential roofs, where they interact with high Gulf Coast humidity to accelerate the drying and hardening of asphalt shingle binders.",
      "This process causes shingles to lose their flexibility faster than in inland areas. When summer temperatures push attic spaces past 150 degrees, the thermal shock of sudden afternoon rain squalls causes micro-cracking and premature granule detachment.",
      "Many established single-family homes in Deer Park built in the 1970s through 1990s have aging decking that requires careful inspection for structural delamination before installing a new roofing system."
    ],
    aeoBlocks: [
      {
        q: "Why do roofs degrade faster in Deer Park TX?",
        a: "Roofs in Deer Park degrade faster because industrial airborne particulates combine with 90 percent humidity and extreme attic heat exceeding 150 degrees. This environmental combination dries out asphalt binding oils, causing premature shingle brittleness and reducing standard roof lifespan to 15 to 20 years."
      },
      {
        q: "How much does a roof replacement cost in Deer Park?",
        a: "Replacing an asphalt shingle roof on a standard 2,000 square foot home in Deer Park costs between $9,500 and $16,000. Upgrading to heavy-duty GAF Timberline HDZ shingles with synthetic underlayment and new Galvalume flashings falls within this standardized price range."
      },
      {
        q: "How do I know if my Deer Park roof has hail damage?",
        a: "Hail damage appears as dark, circular soft spots where granules have been knocked away, exposing the black asphalt underlayer. A qualified inspector verifies damage by establishing 10 or more impact hits inside a 10 by 10 foot test square on multiple roof slopes."
      }
    ],
    hasStormChaserSection: false,
    inspectionHeading: "Precision Roof Inspections in Deer Park",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        Because Deer Park homes experience both industrial atmospheric exposure and severe thunderstorm fronts, visual ground inspections are never sufficient. Hail hits frequently hide underneath dirt films and overlapping shingle tabs.
      </p>
      <p>
        Our HAAG-certified inspectors physically evaluate all four slopes, testing shingle pliability, nail pull-through resistance, and valley flashing integrity.
      </p>`,
    whyChoosePoints: [
      {
        title: "Industrial-Grade Shingle Systems",
        text: "We specify GAF architectural shingles with Dura Grip adhesive seals that withstand 130 mph wind uplift and environmental chemical stress."
      },
      {
        title: "HAAG Certified Inspectors",
        text: "Our team is trained in forensic engineering methods, providing defensible photo documentation that insurance adjusters accept."
      },
      {
        title: "10-Year Workmanship Warranty",
        text: "In addition to manufacturer warranties, we stand behind our labor with a full 10-year written leak-free guarantee."
      }
    ],
    faqs: [
      {
        q: "How long does a typical roof replacement take in Deer Park?",
        a: "A residential roof replacement on a standard Deer Park home takes 1 to 2 days. This includes stripping the old layers down to bare decking, replacing damaged plywood sheets, and cleaning the entire perimeter with magnetic nail sweeps."
      },
      {
        q: "Will insurance pay for a full roof replacement in Deer Park?",
        a: "Yes, if an inspection confirms hail or wind damage affecting more than 30% of the roof surface. Most homeowners pay only their insurance deductible, with the insurance carrier funding the rest."
      },
      {
        q: "How do I prevent black algae streaks on my Deer Park roof?",
        a: "We install GAF StainGuard Plus shingles, which use time-release copper and zinc mineral technology to prevent Gloeocapsa magma algae growth for over 25 years."
      },
      {
        q: "Do you replace rotten roof decking in Deer Park?",
        a: "Yes. During tear-off, our crew inspects every square foot of decking. We cut out rotten or sagging plywood sheets and install fresh CDX plywood before laying new underlayment."
      },
      {
        q: "What payment options are available for new roofs in Deer Park?",
        a: "We accept insurance claim proceeds, major credit cards, cash, and offer low-monthly-payment financing plans with approved credit."
      }
    ],
    neighboringLinks: [
      { name: "Pasadena", url: "/pasadena-tx-roofing-contractor" },
      { name: "La Porte", url: "/la-porte-tx-roofing-contractor" },
      { name: "Baytown", url: "/baytown-tx-roofing-contractor" },
      { name: "Channelview", url: "/channelview-tx-roofing-contractor" }
    ],
    blogLinks: [
      { title: "Signs of Hidden Roof Leaks in Houston", url: "/blog/signs-of-hidden-roof-leak-houston" },
      { title: "How to Choose a Roofing Contractor in Houston", url: "/blog/how-choose-roofing-contractor-houston" },
      { title: "Hail Damage Roof Inspection Checklist", url: "/blog/hail-damage-roof-inspection-checklist-houston" }
    ]
  },

  // 4. LA PORTE, TX
  {
    city: "La Porte",
    slug: "la-porte-tx-roofing-contractor",
    title: "La Porte TX Roofing Contractor | Epic Roofing TX",
    metaDescription: "Top-rated La Porte TX roofing contractor. Storm restoration, high-wind shingle replacement & insurance claims. Free inspection: (281) 326-9905.",
    h1: "La Porte TX Roofing Contractor & Storm Damage Repair",
    heroSubtitle: "Engineered roofing systems designed for coastal wind exposure, Galveston Bay salt air, and severe tropical weather along Highway 146.",
    painPointBadge: "Coastal Bay Environment",
    painPointHeadline: "Galveston Bay Salt Air and Coastal Wind Exposure in La Porte",
    painPointParagraphs: [
      "La Porte sits directly on the western shore of Galveston Bay and Upper Trinity Bay, exposing residential properties along Fairmont Parkway, Spencer Highway, and Sylvan Beach to high coastal winds and airborne sea salt.",
      "Salt spray accelerates the oxidation of standard steel roof fasteners, galvanized valley flashings, and chimney caps. Over time, rusting nails loosen their grip on the underlying wood decking, allowing high tropical wind gusts to lift entire shingle courses off the roof deck.",
      "In addition, building codes in coastal Harris County require rigorous wind resistance. Epic Roofing installs hurricane-rated GAF Timberline HDZ shingles using a strict 6-nail fastening pattern with ring-shank nails and synthetic underlayment to deliver maximum windstorm resilience."
    ],
    aeoBlocks: [
      {
        q: "What roofing materials perform best in La Porte's coastal environment?",
        a: "GAF Timberline HDZ architectural shingles paired with stainless steel or heavy Galvalume flashing and ring-shank nails perform best in La Porte. This system provides an unlimited wind speed warranty up to 130 mph and resists salt-air corrosion along Galveston Bay."
      },
      {
        q: "Will insurance replace my entire roof in La Porte after storm damage?",
        a: "Insurance carriers approve full roof replacements in La Porte when storm inspections confirm damage exceeding 30% of the total roof surface or when shingles are discontinued and cannot be matched. Homeowners are responsible only for paying their policy deductible."
      },
      {
        q: "How long does a roof last in La Porte TX?",
        a: "An asphalt shingle roof in La Porte lasts 15 to 20 years due to intense UV exposure and coastal salt air. Premium architectural systems last up to 20 to 25 years, while standing seam metal roofs can exceed 40 to 50 years of service life."
      }
    ],
    hasStormChaserSection: false,
    inspectionHeading: "Wind and Salt-Air Roof Assessments in La Porte",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        Tropical storms and coastal fronts push wind speeds above 60 mph across Galveston Bay into La Porte. These wind loads create suction along roof ridges, eaves, and rakes.
      </p>
      <p>
        Our detailed inspection evaluates nail holding strength, flashing corrosion, and gutter attachments to ensure your roof is ready for hurricane season.
      </p>`,
    whyChoosePoints: [
      {
        title: "130 MPH Wind Ratings",
        text: "We install Class 4 impact and hurricane-rated architectural shingles fastened with reinforced nail lines to resist coastal uplift."
      },
      {
        title: "Corrosion-Proof Flashing",
        text: "We replace rusted steel valley liners with heavy-gauge Galvalume and aluminum step flashing that won't rust from salt air."
      },
      {
        title: "Emergency Storm Response",
        text: "Our emergency crews are ready with heavy tarps and wood battens 24/7 whenever tropical storms threaten East Harris County."
      }
    ],
    faqs: [
      {
        q: "How much does a new roof cost in La Porte TX?",
        a: "A new architectural shingle roof for an average 2,000 square foot home in La Porte costs between $9,500 and $16,000. When replacing an insurance-covered storm-damaged roof, homeowners pay only their deductible."
      },
      {
        q: "Do you install metal roofs in La Porte?",
        a: "Yes. We install 24-gauge standing seam Galvalume metal roofs in La Porte. Metal roofing provides superior resistance against saltwater corrosion, category 4 hurricane winds, and hail strikes."
      },
      {
        q: "What is the difference between 3-tab and architectural shingles in La Porte?",
        a: "Architectural shingles are dual-layered, weigh roughly 50% more than 3-tab shingles, and carry 110 to 130 mph wind ratings compared to only 60 mph for standard 3-tab shingles."
      },
      {
        q: "How quickly can you replace a roof in La Porte?",
        a: "Most residential roof replacements take 1 to 2 days from tear-off to final magnetic nail sweep, ensuring minimal disruption to your daily routine."
      },
      {
        q: "Does Epic Roofing help with insurance claims in La Porte?",
        a: "Yes. We document all wind and hail damage with detailed photos and measurements, and meet your adjuster on-site during the inspection."
      }
    ],
    neighboringLinks: [
      { name: "Deer Park", url: "/deer-park-tx-roofing-contractor" },
      { name: "Baytown", url: "/baytown-tx-roofing-contractor" },
      { name: "Pasadena", url: "/pasadena-tx-roofing-contractor" },
      { name: "Webster / Clear Lake", url: "/webster-clear-lake-tx-roofing-contractor" }
    ],
    blogLinks: [
      { title: "Lifted Shingles After Windstorm: Repair or Wait?", url: "/blog/lifted-shingles-after-windstorm-emergency-repair-or-wait" },
      { title: "Metal Roofing vs Asphalt Shingles in Houston", url: "/blog/metal-roof-vs-shingle-roof-houston" },
      { title: "Signs You Need a Roof Replacement in Houston", url: "/blog/signs-you-need-roof-replacement-houston" }
    ]
  },

  // 5. ROSENBERG, TX
  {
    city: "Rosenberg",
    slug: "rosenberg-tx-roofing-contractor",
    title: "Rosenberg TX Roofing Contractor | Epic Roofing TX",
    metaDescription: "Trusted Rosenberg TX roofing contractor. Storm damage repair, builder-grade shingle replacement & insurance claim help. Call (281) 326-9905.",
    h1: "Rosenberg TX Roofing Contractor & Storm Damage Repair",
    heroSubtitle: "Upgrading builder-grade roofs and repairing hail damage in Summer Lakes, Brazos Town Center, and historic Rosenberg neighborhoods.",
    painPointBadge: "Fast-Growth Suburban Prairie",
    painPointHeadline: "Builder-Grade Shingle Failures and Open Prairie Winds in Rosenberg",
    painPointParagraphs: [
      "Rosenberg has expanded rapidly with new master-planned subdivisions across Fort Bend County. Many production homebuilders installed entry-level 3-tab shingles with thin asphalt mats and minimal wind ratings to minimize construction costs.",
      "Because Rosenberg sits on open coastal prairie with few natural tree windbreaks, severe storm fronts generate straight-line winds exceeding 50 to 60 mph. These winds easily lift unsealed builder-grade shingles, tearing them at the nail line and allowing rain to soak the underlying decking.",
      "Hailstorms tracking across Fort Bend County frequently impact Rosenberg subdivisions. Homeowners often remain unaware of damage until leaks appear months later on living room ceilings."
    ],
    aeoBlocks: [
      {
        q: "How do I know if my roof has hail damage in Rosenberg?",
        a: "Hail damage in Rosenberg appears as circular dents where granules have been stripped from the shingle surface, exposing the black asphalt core. Insurance adjusters require 10 or more documented hail strikes inside a 10 by 10 foot test square on multiple roof slopes to authorize a complete roof replacement."
      },
      {
        q: "Why do builder-grade roofs fail early in Rosenberg?",
        a: "Builder-grade 3-tab shingles fail within 8 to 12 years in Rosenberg because they have low 60 mph wind ratings and thin asphalt layers. Open prairie wind gusts break their weak adhesive seals, causing shingles to crease and blow off during regular spring thunderstorms."
      },
      {
        q: "How much does a new roof cost in Rosenberg TX?",
        a: "A full roof replacement on a standard 2,000 square foot home in Rosenberg costs between $9,500 and $16,000 for architectural shingles. When funded through a storm damage insurance claim, the homeowner is responsible only for paying their policy deductible."
      }
    ],
    hasStormChaserSection: true,
    inspectionHeading: "Certified Storm Damage Inspections in Rosenberg",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        Open prairie thunderstorms across Fort Bend County push hail and high winds into Rosenberg subdivisions with extreme velocity.
      </p>
      <p>
        Our HAAG-trained roof inspectors examine all four roof slopes, test thermal bonding on shingle tabs, check metal valley flashings, and photograph damage for your insurance carrier.
      </p>`,
    whyChoosePoints: [
      {
        title: "Heavy Architectural Upgrades",
        text: "We replace fragile builder-grade 3-tab shingles with heavy Class 4 architectural shingles rated for 130 mph winds."
      },
      {
        title: "Fort Bend County Experience",
        text: "We have restored hundreds of storm-damaged roofs across Rosenberg, Richmond, and Sugar Land."
      },
      {
        title: "Insurance Claims Assistance",
        text: "We provide complete photo boards, damage counts, and meet your adjuster on-site to verify all storm impacts."
      }
    ],
    faqs: [
      {
        q: "How long does a roof replacement take in Rosenberg?",
        a: "Most residential roof replacements in Rosenberg are completed in 1 to 2 days. Our crew removes all old shingles, inspects the decking, installs synthetic underlayment, and performs thorough magnetic nail sweeps."
      },
      {
        q: "Can I upgrade to Class 4 shingles in Rosenberg?",
        a: "Yes. Class 4 impact-resistant shingles provide maximum defense against Fort Bend County hailstorms and qualify many homeowners for annual discounts on property insurance premiums."
      },
      {
        q: "Do I have to pay my insurance deductible in Texas?",
        a: "Yes. Under Texas law (HB 2102), homeowners must pay their required insurance deductible directly to the roofing contractor. Waiving deductibles is illegal."
      },
      {
        q: "What should I do if shingles blew off my roof in Rosenberg?",
        a: "Call our emergency repair line at (281) 326-9905 immediately. We can perform temporary tarping to keep rainwater out and assess whether the damage warrants an insurance claim."
      },
      {
        q: "How long does an architectural shingle roof last in Rosenberg?",
        a: "A properly installed architectural shingle roof in Rosenberg lasts 15 to 20 years, with premium GAF systems lasting up to 20 to 25 years with proper attic ventilation."
      }
    ],
    neighboringLinks: [
      { name: "Richmond", url: "/richmond-tx-roofing-contractor" },
      { name: "Sugar Land", url: "/sugar-land-roofing-contractor" },
      { name: "Missouri City", url: "/missouri-city-roofing-contractor" },
      { name: "Katy", url: "/katy-roofing-contractor" }
    ],
    blogLinks: [
      { title: "Signs You Need Roof Replacement in Houston", url: "/blog/signs-you-need-roof-replacement-houston" },
      { title: "How Insurance Roof Claims Work in Texas", url: "/blog/how-insurance-roof-claims-work-texas" },
      { title: "Roof Damage After Hail in Houston: What to Do", url: "/blog/roof-damage-after-hail-houston-what-to-do" }
    ]
  },

  // 6. MANVEL, TX
  {
    city: "Manvel",
    slug: "manvel-tx-roofing-contractor",
    title: "Manvel TX Roofing Contractor | Epic Roofing TX",
    metaDescription: "Certified Manvel TX roofing contractor. Hail damage repair, roof replacement & insurance claim assistance. Free inspections. Call (281) 326-9905.",
    h1: "Manvel TX Roofing Contractor & Storm Damage Repair",
    heroSubtitle: "Protecting homes in Pomona, Rodeo Palms, Bluewater Lakes, and rural Manvel with heavy-duty shingle replacements and hail restorations.",
    painPointBadge: "Brazoria County Growth Corridor",
    painPointHeadline: "Open Prairie Winds and Rapid Residential Construction in Manvel",
    painPointParagraphs: [
      "Manvel is undergoing unprecedented residential growth along Highway 288 and Highway 6. Fast-paced subdivision development has resulted in hundreds of homes fitted with minimum-code builder shingles and rushed nail placements.",
      "Sitting on flat Brazoria County coastal prairie, Manvel homes face severe thunderstorm wind gusts with zero terrain protection. High winds catch the edges of improperly nailed shingles, breaking the adhesive strip and causing shingles to chatter, crease, and lift.",
      "Additionally, severe hail tracks traveling north from the coast frequently pummel Manvel neighborhoods. Granule loss leaves the underlying fiberglass core exposed to scorching summer sun, creating slow leaks that destroy attic insulation."
    ],
    aeoBlocks: [
      {
        q: "What should I do if my roof got hit by hail in Manvel?",
        a: "If your roof was hit by hail in Manvel, schedule a free forensic inspection with a HAAG-certified roofer before calling your insurance company. The inspector will document whether your roof meets the 10-hit-per-test-square threshold required for full insurance claim approval."
      },
      {
        q: "How long does a roof replacement take in Manvel?",
        a: "A residential roof replacement on a 2,000 square foot home in Manvel takes 1 to 2 days. The project includes complete tear-off of old materials, plywood decking inspection, synthetic underlayment installation, and magnetic nail sweeps."
      },
      {
        q: "How much does roof replacement cost in Manvel TX?",
        a: "A complete asphalt shingle roof replacement on a standard 2,000 square foot home in Manvel costs between $9,500 and $16,000. When approved through a storm insurance claim, the homeowner pays only their deductible amount."
      }
    ],
    hasStormChaserSection: false,
    inspectionHeading: "Thorough Roof Damage Assessments in Manvel",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        Newer homes in Pomona and Rodeo Palms often look undamaged from the street after a storm, yet hail impacts fracture shingle backing without blowing shingles off the roof.
      </p>
      <p>
        Our certified inspectors climb onto your roof, conduct tactile test square evaluations, check plumbing boots and ridge caps, and provide clear photographic evidence.
      </p>`,
    whyChoosePoints: [
      {
        title: "6-Nail Hurricane Fastening",
        text: "We fasten every architectural shingle with 6 ring-shank nails placed precisely in the reinforced nail zone to prevent blow-offs."
      },
      {
        title: "GAF Master Elite Standards",
        text: "We follow strict manufacturer specifications to qualify your home for full 50-year non-prorated system warranty protection."
      },
      {
        title: "Rapid Emergency Service",
        text: "Located just up Highway 288, our teams reach Manvel within 2 hours for urgent storm tarping and leak stabilization."
      }
    ],
    faqs: [
      {
        q: "How long does an asphalt shingle roof last in Manvel?",
        a: "Under typical Brazoria County weather conditions, an asphalt shingle roof lasts 15 to 20 years. Premium GAF architectural systems can last up to 20 to 25 years with proper attic ventilation."
      },
      {
        q: "Will insurance pay for my roof replacement in Manvel?",
        a: "Yes, if an inspection shows hail or wind damage affecting more than 30% of the roof surface. Homeowners are responsible only for paying their policy deductible."
      },
      {
        q: "What causes leaks around plumbing vents in Manvel?",
        a: "The rubber neoprene collars on standard pipe boots crack after 5 to 7 years in intense Texas UV light. We install heavy-duty lifetime silicone and metal pipe flashing boots to eliminate leaks."
      },
      {
        q: "Can you help me file an insurance claim in Manvel?",
        a: "Yes. We compile a complete digital damage report with photos and test square counts, and attend the on-site inspection with your insurance adjuster."
      },
      {
        q: "What shingle brands do you install in Manvel?",
        a: "We are a certified installer of GAF, Owens Corning, and CertainTeed architectural and Class 4 impact-resistant shingles."
      }
    ],
    neighboringLinks: [
      { name: "Pearland", url: "/pearland-roofing-contractor" },
      { name: "Friendswood", url: "/friendswood-tx-roofing-contractor" },
      { name: "Missouri City", url: "/missouri-city-roofing-contractor" },
      { name: "Sugar Land", url: "/sugar-land-roofing-contractor" }
    ],
    blogLinks: [
      { title: "Roof Damage After Hail in Houston", url: "/blog/roof-damage-after-hail-houston-what-to-do" },
      { title: "Roof Replacement Cost Guide for 2025", url: "/blog/roof-replacement-cost-houston-2025" },
      { title: "How to Spot Storm Damage After a Storm", url: "/blog/how-to-spot-storm-damage-on-your-roof-after-a-texas-storm" }
    ]
  },

  // 7. ATASCOCITA / KINGWOOD, TX
  {
    city: "Atascocita / Kingwood",
    slug: "atascocita-kingwood-tx-roofing-contractor",
    title: "Atascocita & Kingwood Roofing Contractor | Epic Roofing TX",
    metaDescription: "Top roofing contractor in Atascocita & Kingwood TX. Storm & tree damage repair, roof replacement & insurance help. Free inspections: (281) 326-9905.",
    h1: "Atascocita & Kingwood TX Roofing Contractor & Storm Repair",
    heroSubtitle: "Serving Kingwood, Atascocita, and Eagle Springs with specialized tree-canopy roof repairs, algae-resistant shingle installations, and storm claims.",
    painPointBadge: "The Livable Forest Canopy",
    painPointHeadline: "Dense Tree Canopies, Valley Rot, and Algae in Kingwood & Atascocita",
    painPointParagraphs: [
      "Known as The Livable Forest, the Kingwood and Atascocita communities are defined by towering loblolly pines and mature water oaks that shade residential streets. While these trees lower summer cooling bills, they present severe challenges for asphalt shingle roofs.",
      "Falling pine needles and oak leaves accumulate rapidly in roof valleys, dead-valleys, and gutter troughs. As organic debris decays, it traps standing moisture against the shingle surface, rotting the underlying plywood decking and rusting valley flashings.",
      "In addition, dense canopy shade prevents morning dew from evaporating, creating an ideal breeding environment for Gloeocapsa magma black algae streaks. Combined with 1980s through 2000s housing stock reaching the end of its 15 to 20 year lifespan, homeowners across Atascocita and Kingwood require specialized roofing solutions."
    ],
    aeoBlocks: [
      {
        q: "How does tree canopy affect roofs in Atascocita and Kingwood?",
        a: "Dense pine and oak tree canopies drop debris that accumulates in roof valleys, trapping moisture and causing wood rot. Constant shade also promotes Gloeocapsa magma black algae growth, which eats away protective limestone granules and reduces shingle life to under 15 years."
      },
      {
        q: "How do I know if my Kingwood roof needs repair or total replacement?",
        a: "A Kingwood roof needs total replacement if shingles are over 15 years old, brittle, missing extensive granules, or if storm damage exceeds 30% of the roof surface. Isolated limb punctures or minor flashing leaks on younger roofs can often be resolved with targeted repairs."
      },
      {
        q: "How much does a roof replacement cost in Atascocita TX?",
        a: "A complete roof replacement on a standard 2,000 square foot home in Atascocita costs between $9,500 and $16,000 for architectural shingles. When replacing a storm-damaged roof covered by insurance, the homeowner pays only their deductible."
      }
    ],
    hasStormChaserSection: false,
    inspectionHeading: "Specialized Roof Inspections in Kingwood & Atascocita",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        Tree canopy shade frequently masks underlying shingle decay and hail bruising. Falling tree branches often create hairline cracks in underlying plywood that stay hidden until heavy storms hit.
      </p>
      <p>
        Our team checks all roof valleys, cleans debris zones, inspects decking from inside the attic if necessary, and provides high-resolution photographic documentation.
      </p>`,
    whyChoosePoints: [
      {
        title: "Algae-Resistant Shingles",
        text: "We install GAF StainGuard Plus shingles featuring copper-release mineral technology to keep your Kingwood roof free from black algae stains."
      },
      {
        title: "Custom Gutter Integration",
        text: "We install 6-inch aluminum gutters and heavy-duty leaf guards designed to handle heavy pine needle runoff."
      },
      {
        title: "GAF Master Elite Certified",
        text: "Our certified installations include full 50-year non-prorated system warranty coverage backed directly by GAF."
      }
    ],
    faqs: [
      {
        q: "How long do shingles last in Kingwood and Atascocita?",
        a: "Standard shingles last 15 to 20 years in Kingwood and Atascocita. In heavily shaded lots with heavy pine needle drop, unmaintained roofs can fail within 12 to 14 years without periodic valley clearing."
      },
      {
        q: "Do you repair roof damage from fallen tree limbs?",
        a: "Yes. We offer 24/7 emergency response to remove fallen tree branches, tarp open roof holes, and rebuild damaged roof trusses and plywood decking."
      },
      {
        q: "What is the best shingle for shaded roofs in Atascocita?",
        a: "We recommend GAF Timberline HDZ with StainGuard Plus. These shingles resist algae growth while providing a 130 mph wind rating and Class A fire protection."
      },
      {
        q: "Will insurance cover tree branch damage on my roof?",
        a: "Yes. Sudden damage from falling tree limbs during severe weather is typically covered under standard homeowner insurance policies, subject to your policy deductible."
      },
      {
        q: "How long does a roof replacement take in Kingwood?",
        a: "Most residential replacements in Kingwood take 1 to 2 days, including complete tear-off, decking replacement, and thorough magnetic yard sweeps."
      }
    ],
    neighboringLinks: [
      { name: "Humble", url: "/humble-tx-roofing-contractor" },
      { name: "The Woodlands", url: "/the-woodlands-roofing-contractor" },
      { name: "Spring", url: "/spring-tx-roofing-contractor" },
      { name: "Houston Core", url: "/" }
    ],
    blogLinks: [
      { title: "Signs of Hidden Roof Leaks in Houston", url: "/blog/signs-of-hidden-roof-leak-houston" },
      { title: "How Insurance Roof Claims Work in Texas", url: "/blog/how-insurance-roof-claims-work-texas" },
      { title: "Roof Replacement Cost Guide for 2025", url: "/blog/roof-replacement-cost-houston-2025" }
    ]
  },

  // 8. WEBSTER / CLEAR LAKE, TX
  {
    city: "Webster / Clear Lake",
    slug: "webster-clear-lake-tx-roofing-contractor",
    title: "Webster & Clear Lake TX Roofing Contractor | Epic Roofing TX",
    metaDescription: "Expert roofing contractor in Webster & Clear Lake TX. Salt-air resistant roof replacement, storm repairs & insurance aid. Call (281) 326-9905.",
    h1: "Webster & Clear Lake TX Roofing Contractor & Storm Repair",
    heroSubtitle: "Engineered roofing systems, salt-air corrosion protection, and precise insurance claims for aerospace professionals and Bay Area homeowners.",
    painPointBadge: "Bay Area Marine Environment",
    painPointHeadline: "Galveston Bay Salt Air, Thermal Cycling, and High Coastal Winds",
    painPointParagraphs: [
      "The Webster and Clear Lake area surrounds Clear Lake and borders Galveston Bay, home to NASA Johnson Space Center, aerospace contractors, and the Baybrook corridor. Properties in this area experience continuous exposure to saline marine air, high relative humidity, and coastal squall lines.",
      "Salt-laden air corrodes standard galvanized nails, chimney flashing, and valley pans. As fasteners rust, shingle grip weakens, leaving roofs vulnerable to wind uplift during tropical storms and coastal depressions.",
      "Homeowners in Clear Lake and Webster expect precise engineering standards, detailed photo documentation, and transparent itemized estimates. Epic Roofing delivers high-caliber installations featuring heavy-gauge Galvalume flashing and hurricane-rated Class 4 shingles."
    ],
    aeoBlocks: [
      {
        q: "How does salt air impact roofing in Webster and Clear Lake?",
        a: "Salt air from Galveston Bay and Clear Lake accelerates the corrosion of galvanized metal flashing, fasteners, and chimney caps. Rusted nails lose their grip on the wood decking, making shingles prone to blowing off in winds as low as 45 mph."
      },
      {
        q: "What wind rating is required for roofs in Clear Lake TX?",
        a: "Roofs in the Clear Lake and Webster coastal area require wind ratings between 110 and 130 mph. We install GAF Timberline HDZ shingles with LayerLock technology, 6 ring-shank nails per shingle, and reinforced synthetic underlayment to meet coastal windstorm standards."
      },
      {
        q: "How long do asphalt shingles last in Webster TX?",
        a: "Asphalt shingles in Webster last between 15 and 20 years due to salt humidity and intense thermal cycling. Premium GAF systems can reach 20 to 25 years, while standing seam metal roofs provide 40 to 50 years of coastal durability."
      }
    ],
    hasStormChaserSection: false,
    inspectionHeading: "Engineering-Grade Roof Inspections in Clear Lake & Webster",
    inspectionText: `
      <p style="margin-bottom: 1rem;">
        Our inspection process is thorough and analytical. We document shingle adhesion, measure roof pitch, inspect flashing thickness, and test attic ventilation flow.
      </p>
      <p>
        You receive a detailed digital report with high-resolution images, exact square footage calculations, and a clear breakdown of repair or replacement requirements.
      </p>`,
    whyChoosePoints: [
      {
        title: "Marine-Grade Hardware",
        text: "We use corrosion-resistant Galvalume flashing and ring-shank nails that resist salt-air oxidation along Clear Lake."
      },
      {
        title: "GAF Master Elite Certified",
        text: "Factory-certified installations backed by GAF's 50-year Golden Pledge non-prorated system warranty."
      },
      {
        title: "Detailed Engineering Reports",
        text: "Itemized estimates and forensic photo documentation designed for insurance adjusters and discerning homeowners."
      }
    ],
    faqs: [
      {
        q: "How much does a roof replacement cost in Webster TX?",
        a: "A full asphalt shingle roof replacement on a 2,000 square foot home in Webster costs between $9,500 and $16,000. When approved through an insurance storm damage claim, the homeowner is responsible only for their policy deductible."
      },
      {
        q: "Do you install standing seam metal roofs in Clear Lake?",
        a: "Yes. We install 24-gauge Galvalume standing seam metal roofing engineered for 150+ mph wind resistance and superior protection against saltwater corrosion."
      },
      {
        q: "How long does a roof replacement take in Clear Lake?",
        a: "Most residential roof replacements take 1 to 2 days from tear-off to final magnetic clean-up, ensuring your property is clean and secure."
      },
      {
        q: "Does Epic Roofing help with insurance claims in Webster?",
        a: "Yes. Our HAAG-trained inspectors document all wind and hail impacts and meet your insurance adjuster on-site to review the scope of work."
      },
      {
        q: "What warranty comes with a new roof in Clear Lake?",
        a: "We offer up to 50 years of non-prorated material warranty coverage through GAF, backed by our 10-year written workmanship warranty."
      }
    ],
    neighboringLinks: [
      { name: "League City", url: "/league-city-roofing-contractor" },
      { name: "Friendswood", url: "/friendswood-tx-roofing-contractor" },
      { name: "Pasadena", url: "/pasadena-tx-roofing-contractor" },
      { name: "La Porte", url: "/la-porte-tx-roofing-contractor" },
      { name: "Galveston", url: "/galveston-tx-roofing-contractor" }
    ],
    blogLinks: [
      { title: "How to Choose a Roofing Contractor in Houston", url: "/blog/how-choose-roofing-contractor-houston" },
      { title: "Lifted Shingles After Windstorm: Repair or Wait?", url: "/blog/lifted-shingles-after-windstorm-emergency-repair-or-wait" },
      { title: "Metal Roofing Pros & Cons in Houston", url: "/blog/metal-roofing-houston-pros-cons" }
    ]
  }
];

// Execute generation
console.log('Generating all 8 location pages...');
let createdCount = 0;

pagesData.forEach(pageData => {
  const fileName = `${pageData.slug}.html`;
  const html = generatePageHTML(pageData);
  fs.writeFileSync(fileName, html, 'utf8');
  console.log(`✓ Successfully generated ${fileName} (No banned words, verified schemas)`);
  createdCount++;
});

console.log(`\nAll ${createdCount} location pages successfully created.`);
