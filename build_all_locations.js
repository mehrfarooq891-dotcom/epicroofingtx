const fs = require('fs');
const path = require('path');

// Design System SVG Shingle Dividers
const shingleDividerDarkToLight = `<!-- SHINGLE DIVIDER (Dark to Light) -->
<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#F5F3EE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerLightToGrey = `<!-- SHINGLE DIVIDER (Light to Grey) -->
<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#EBE7DE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerGreyToLight = `<!-- SHINGLE DIVIDER (Grey to Light) -->
<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#F5F3EE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerGreyToDark = `<!-- SHINGLE DIVIDER (Grey to Dark) -->
<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#161B22">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerDarkToGrey = `<!-- SHINGLE DIVIDER (Dark to Grey) -->
<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#EBE7DE">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

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

function validatePageContent(html, filename) {
  for (const regex of bannedWords) {
    const match = html.match(regex);
    if (match) {
      throw new Error(`Banned phrase found in ${filename}: "${match[0]}"`);
    }
  }
}

// Generate shared navigation and header
function generateHeader() {
  return `  <!-- EMERGENCY TOP BANNER -->
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
             alt="Epic Roofing & Construction LLC logo"
             style="height: 50px; width: 200px; aspect-ratio: 200/50;" width="200" height="50">
      </a>

      <!-- Desktop Nav -->
      <nav class="desktop-nav" id="desktop-navbar">
        <!-- 1. Services -->
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
              <a class="dropdown-item" href="/gutter-installation-houston">Seamless Gutters</a>
              <a class="dropdown-item" href="/chimney-flashing-repair-houston">Flashing &amp; Chimney</a>
              <a class="dropdown-item" href="/roof-repair-houston">Roof Repairs &amp; Sealing</a>
              <a class="dropdown-item" href="/affordable-roofing-houston">Affordable Roofing</a>
              <a class="dropdown-item" href="/roof-leak-detection-houston">Leak Detection</a>
            </div>
          </div>
        </div>

        <!-- 2. Storm Damage -->
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

        <!-- 3. Service Areas -->
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

        <!-- 4. Resources -->
        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Resources</span>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/blog">Blog &amp; Guides</a>
            <a class="dropdown-item" href="/calculator">Cost Calculator</a>
            <a class="dropdown-item" href="/financing">Financing</a>
            <a class="dropdown-item" href="/#case-studies">Case Studies</a>
          </div>
        </div>

        <!-- 5. Contact -->
        <a href="/contact" class="nav-link">Contact</a>
      </nav>

      <a href="tel:+12813269905" class="btn btn-primary" id="btn-call-header">
        📞 (281) 326-9905
      </a>

      <button class="menu-toggle" id="menu-btn" aria-label="Open Navigation Menu">☰</button>
    </div>

    <!-- Slim Secondary Utility Line -->
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

    <!-- Accordion 1: Services -->
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
        <a href="/gutter-installation-houston" class="mobile-accordion-link">Seamless Gutters</a>
        <a href="/chimney-flashing-repair-houston" class="mobile-accordion-link">Flashing &amp; Chimney</a>
        <a href="/roof-repair-houston" class="mobile-accordion-link">Roof Repairs &amp; Sealing</a>
        <a href="/tile-roofing-houston" class="mobile-accordion-link">Tile Roofing</a>
        <a href="/affordable-roofing-houston" class="mobile-accordion-link">Affordable Roofing</a>
        <a href="/roof-leak-detection-houston" class="mobile-accordion-link">Leak Detection</a>
      </div>
    </div>

    <!-- Accordion 2: Storm Damage -->
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

    <!-- Accordion 3: Service Areas -->
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

    <!-- Accordion 4: Resources -->
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
  </div>`;
}

// Generate shared footer
function generateFooter() {
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
            <li><a href="/gutter-installation-houston">Seamless Gutters &amp; Guards</a></li>
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

console.log('Header and Footer templates ready.');
