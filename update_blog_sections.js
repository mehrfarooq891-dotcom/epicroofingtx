const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'blog');
const BLOG_INDEX_PATH = path.join(BLOG_DIR, 'index.html');

console.log('Starting Blog Section Update Script...');

// 1. Get all html files in blog folder
const files = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

console.log(`Found ${files.length} blog files to index and update.`);

const blogPosts = [
  { title: "Signs of a Hidden Roof Leak Before It Becomes a Disaster", filename: "signs-of-hidden-roof-leak-houston.html", description: "Learn the subtle, early warning signs of a hidden roof leak in Houston TX before it turns into costly structural water damage or mold.", category: "Maintenance Guides", date: "July 22, 2026", readTime: "9 Min Read" },
  { title: "Emergency Roof Leak Repair Houston: What to Do in the First 24 Hours", filename: "emergency-roof-leak-repair-houston.html", description: "Active roof leak in Houston? Here is your step-by-step 24-hour action guide to minimize damage, stop the water, and secure expert emergency repair.", category: "Maintenance Guides", date: "July 15, 2026", readTime: "10 Min Read" },
  { title: "How to Get Your Houston Insurance Adjuster to Approve Your Full Roof Claim", filename: "houston-roof-adjuster-tips.html", description: "Filing an insurance claim after a major storm is only the first step. Learn how to get insurance to approve roof claim houston properties, prepare strategically, and maximize your claim.", category: "Insurance Claims", date: "July 12, 2026", readTime: "12 Min Read" },
  { title: "Houston Hail Season Roof Guide", filename: "houston-hail-season-roof-guide.html", description: "When hail season hits Houston and how to protect your roof.", category: "Hail Damage", date: "June 1, 2026", readTime: "7 Min Read" },
  { title: "Hurricane Harvey Roof Lessons", filename: "hurricane-harvey-roof-lessons-houston.html", description: "What Houston homeowners learned about roofs after Harvey.", category: "Storm Repair", date: "May 2, 2026", readTime: "12 Min Read" },
  { title: "Roof Insurance Claim Mistakes", filename: "roof-insurance-claim-mistakes-houston.html", description: "7 costly mistakes Houston homeowners make with roof claims.", category: "Insurance Claims", date: "May 18, 2026", readTime: "9 Min Read" },
  { title: "Hidden Hail Damage Guide", filename: "hidden-hail-damage-roof-houston.html", description: "Why your roof may be damaged without you knowing.", category: "Hail Damage", date: "June 2, 2026", readTime: "8 Min Read" },
  { title: "Emergency Roof Tarping Houston", filename: "emergency-roof-tarp-houston.html", description: "What emergency tarping is, when you need it, and cost.", category: "Storm Repair", date: "May 25, 2026", readTime: "7 Min Read" },
  { title: "Wind Damage Roof Repair Houston", filename: "wind-damage-roof-repair-houston-guide.html", description: "Complete guide to wind damage roof repair in Houston.", category: "Storm Repair", date: "May 24, 2026", readTime: "8 Min Read" },
  { title: "Free Roof Inspection Houston", filename: "free-roof-inspection-houston-guide.html", description: "What to expect from a free professional roof inspection.", category: "Roof Inspection", date: "May 5, 2026", readTime: "6 Min Read" },
  { title: "Storm Chaser Roofers Warning", filename: "storm-chaser-roofers-houston-warning.html", description: "How to spot fake roofers after Houston storms.", category: "Roof Inspection", date: "May 8, 2026", readTime: "9 Min Read" },
  { title: "Insurance Adjuster Roof Visit", filename: "roof-insurance-adjuster-visit-houston.html", description: "What to expect when adjuster inspects your Houston roof.", category: "Insurance Claims", date: "May 19, 2026", readTime: "8 Min Read" },
  { title: "Zero Cost Roof Replacement", filename: "roof-replacement-zero-cost-insurance-houston.html", description: "How Houston homeowners get a new roof for $0 through insurance.", category: "Insurance Claims", date: "May 12, 2026", readTime: "7 Min Read" },
  { title: "Cypress TX Roofing: High Rainfall, Hail Season & What Local Homeowners Must Know", filename: "roofing-cypress-tx-guide.html", description: "Expert guide on Cypress TX roofing. Learn how heavy rainfall, sudden hailstorms, and neighborhood features impact your roof repair and replacement.", category: "Local Guides", date: "June 12, 2026", readTime: "11 Min Read" },
  { title: "Roofing in Katy TX", filename: "roofing-katy-tx-guide.html", description: "What Katy homeowners need to know about their roofs.", category: "Local Guides", date: "June 10, 2026", readTime: "11 Min Read" },
  { title: "Roofing in Sugar Land TX", filename: "roofing-sugar-land-tx-guide.html", description: "Roof repair and replacement guide for Sugar Land homeowners.", category: "Local Guides", date: "June 9, 2026", readTime: "10 Min Read" },
  { title: "Roofing in The Woodlands TX", filename: "roofing-the-woodlands-tx-guide.html", description: "Tree damage, storms and roofing in The Woodlands.", category: "Local Guides", date: "June 11, 2026", readTime: "12 Min Read" },
  { title: "Roofing in Pearland TX", filename: "roofing-pearland-tx-guide.html", description: "Why so many Pearland homes need roof replacement now.", category: "Local Guides", date: "June 11, 2026", readTime: "11 Min Read" },
  { title: "Signs You Need Roof Replacement", filename: "signs-you-need-roof-replacement-houston.html", description: "10 signs you need a new roof in Houston TX.", category: "Cost & Materials", date: "April 15, 2026", readTime: "10 Min Read" },
  { title: "Best Affordable Roofing Contractors", filename: "best-affordable-roofing-contractors-houston.html", description: "How to find the best affordable roofer in Houston.", category: "Cost & Materials", date: "April 12, 2026", readTime: "6 Min Read" },
  { title: "Roof Insurance Claim Process", filename: "how-insurance-roof-claims-work-texas.html", description: "How insurance roof claims work in Texas.", category: "Insurance Claims", date: "May 22, 2026", readTime: "9 Min Read" },
  { title: "Roof Leak Detection Houston", filename: "roof-leak-detection-houston-guide.html", description: "How to find and fix roof leaks in Houston homes.", category: "Roof Inspection", date: "May 20, 2026", readTime: "10 Min Read" },
  { title: "Roof Replacement Financing", filename: "roof-replacement-financing-houston.html", description: "Financing options for roof replacement in Houston.", category: "Cost & Materials", date: "April 14, 2026", readTime: "8 Min Read" },
  { title: "Roof Inspection Before Buying Home", filename: "roof-inspection-before-buying-home-houston.html", description: "Why you need a roof inspection before buying in Houston.", category: "Roof Inspection", date: "May 6, 2026", readTime: "7 Min Read" },
  { title: "Houston Hail Damage Guide", filename: "houston-hail-damage-guide.html", description: "Learn how to identify shingle bruising, metal dimples, and tile cracks.", category: "Hail Damage", date: "May 17, 2026", readTime: "7 Min Read" },
  { title: "Roofing in Pasadena TX: Industrial Area, Humidity & Storm Damage Guide", filename: "roofing-pasadena-tx-guide.html", description: "Discover the specific challenges of roofing in Pasadena, TX. Learn about industrial weather exposure, Ship Channel humidity, and older roof care.", category: "Local Guides", date: "June 14, 2026", readTime: "9 Min Read" },
  { title: "League City TX Roofing: Coastal Storms, Gulf Humidity & Homeowner Guide", filename: "roofing-league-city-tx-guide.html", description: "Discover the unique challenges of roofing in League City, TX. Learn about Galveston County coastal storms, Gulf humidity, Clear Lake wind patterns, and storm prep.", category: "Local Guides", date: "June 16, 2026", readTime: "9 Min Read" },
  { title: "Spring TX Roofing Guide: Storm Damage, Repairs & What Homeowners Need to Know", filename: "roofing-spring-tx-guide.html", description: "Discover the specific roofing challenges in Spring, TX. Learn about storm tracking across the Harris/Montgomery County border, mature tree debris risks, and essential repair guidelines.", category: "Local Guides", date: "June 17, 2026", readTime: "9 Min Read" },
  { title: "Friendswood TX Roofing: Storm Season Tips & Local Homeowner Guide", filename: "roofing-friendswood-tx-guide.html", description: "Discover the specific coastal storm, wind, and spring season hail hazards that local homeowners face when it comes to roofing in Friendswood, TX.", category: "Local Guides", date: "June 18, 2026", readTime: "10 Min Read" },
  { title: "Tomball TX Roofing: New Construction, Builder Roofs & Storm Season Guide", filename: "roofing-tomball-tx-guide.html", description: "Discover why the developer builder-grade shingles installed during the 2010–2020 Tomball suburban boom are failing, and when to upgrade your roof.", category: "Local Guides", date: "June 19, 2026", readTime: "10 Min Read" },
  { title: "How Long Does a Roof Last in Houston TX? (Climate Impact Guide)", filename: "how-long-roof-lasts-houston.html", description: "Learn how Southeast Texas heat domes, UV radiation, thermal shock, and Gulf storms govern the lifespan of asphalt, metal, and tile roofs.", category: "Local Guides", date: "June 20, 2026", readTime: "11 Min Read" },
  { title: "Roof Replacement Cost in Houston TX 2025: Complete Price Guide", filename: "roof-replacement-cost-houston-2025.html", description: "Complete 2025 local pricing guide on roof replacement cost in Houston TX. View current cost tables by home size and material type (asphalt, metal, tile).", category: "Cost & Materials", date: "June 22, 2026", readTime: "13 Min Read" },
  { title: "Metal Roofing in Houston TX: Is It Worth It? Pros, Cons & Cost", filename: "metal-roofing-houston-pros-cons.html", description: "Discover if a metal roof is worth it in Southeast Texas. Read our comprehensive analysis of metal roofing houston pros cons, including costs, weather ratings, and lifespan comparisons.", category: "Local Guides", date: "June 23, 2026", readTime: "11 Min Read" },
  { title: "10 Signs You Need a New Roof in Houston TX (Don't Ignore These)", filename: "signs-need-new-roof-houston.html", description: "Discover the top 10 warning signs you need new roof houston. Learn how Southeast Texas heat waves, UV radiation, high winds, and severe storms cause hidden roof decay.", category: "Local Guides", date: "June 24, 2026", readTime: "10 Min Read" },
  { title: "Roof Leak Repair in Houston TX: Causes, Cost & When to Call a Pro", filename: "roof-leak-repair-houston-guide.html", description: "Ultimate local guide on roof leak repair houston. Discover the most common causes of roof leaks in Southeast Texas, local repair costs, how to find hidden leaks, and troubleshooting steps.", category: "Maintenance Guides", date: "June 25, 2026", readTime: "10 Min Read" },
  { title: "Houston Roof Maintenance Checklist: How to Make Your Roof Last Longer", filename: "houston-roof-maintenance-tips.html", description: "A tiny leak can cost you $15,000. Use our pro-grade roof maintenance houston tx checklist to spot damage early, prepare for hurricane season, and save thousands.", category: "Maintenance Guides", date: "June 27, 2026", readTime: "10 Min Read" },
  { title: "Asphalt Shingles vs Metal Roofing in Houston TX: Which is Better?", filename: "asphalt-vs-metal-roofing-houston.html", description: "Deciding between asphalt vs metal roofing houston? Read our comprehensive comparison on costs, 50-year lifespan, sub-tropical energy efficiency, and hurricane-force wind ratings.", category: "Cost & Materials", date: "June 28, 2026", readTime: "12 Min Read" },
  { title: "How to Choose a Roofing Contractor in Houston TX (Ultimate Guide)", filename: "how-choose-roofing-contractor-houston.html", description: "Hiring a roofer? Learn how to choose roofing contractor houston with our checklist of licenses, insurance, local address, red flags, and essential questions.", category: "Local Guides", date: "June 29, 2026", readTime: "11 Min Read" },
  { title: "Commercial Roofing in Houston TX: TPO, Metal & Flat Roof Guide for Business Owners", filename: "commercial-roofing-houston-guide.html", description: "Ultimate commercial roofing houston guide. Learn the key differences of commercial vs residential roofing, low-slope TPO roofing, flat roof repair, local cost per sq ft, and protective PM plans.", category: "Maintenance Guides", date: "July 1, 2026", readTime: "11 Min Read" },
  { title: "Roof Financing in Houston TX: How to Pay for a New Roof Without Breaking the Bank", filename: "roof-financing-options-houston.html", description: "Struggling to pay for a new roof? Read our ultimate local guide on roof financing houston tx. Explore contractor 0% APR plans, HELOCs, personal loans, and insurance deductible options.", category: "Cost & Materials", date: "July 3, 2026", readTime: "10 Min Read" },
  { title: "Hail Hit Your Houston Home? Here's Exactly What to Do in the Next 48 Hours", filename: "roof-damage-after-hail-houston-what-to-do.html", description: "Discover exactly what to do after hail damage in Houston. Follow our step-by-step pro checklist, learn how to handle insurance claims, avoid common scams, and secure a free professional inspection.", category: "Local Guides", date: "July 8, 2026", readTime: "11 Min Read" }
];

// Unsplash photo mappings for each blog file
const unsplashIdMap = {
  "signs-of-hidden-roof-leak-houston.html": "photo-1534274988757-a28bf1a57c17",
  "emergency-roof-leak-repair-houston.html": "photo-1582268611958-ebfd161ef9cf",
  "houston-roof-adjuster-tips.html": "photo-1584467541268-b040f83be3fd",
  "houston-hail-season-roof-guide.html": "photo-1527489377706-5bf97e608852",
  "hurricane-harvey-roof-lessons-houston.html": "photo-1495107334309-fcf20504a5ab",
  "roof-insurance-claim-mistakes-houston.html": "photo-1589829545856-d10d557cf95f",
  "hidden-hail-damage-roof-houston.html": "photo-1515694346937-94d85e41e6f0",
  "emergency-roof-tarp-houston.html": "photo-1582268611958-ebfd161ef9cf",
  "wind-damage-roof-repair-houston-guide.html": "photo-1527031083126-cbd321ff9224",
  "free-roof-inspection-houston-guide.html": "photo-1581092580497-e0d23cbdf1dc",
  "storm-chaser-roofers-houston-warning.html": "photo-1517245386807-bb43f82c33c4",
  "roof-insurance-adjuster-visit-houston.html": "photo-1584467541268-b040f83be3fd",
  "roof-replacement-zero-cost-insurance-houston.html": "photo-1590069261209-f8e9b8642343",
  "roofing-cypress-tx-guide.html": "photo-1523217582562-09d0def993a6",
  "roofing-katy-tx-guide.html": "photo-1480074568708-e7b720bb3f09",
  "roofing-sugar-land-tx-guide.html": "photo-1564013799919-ab600027ffc6",
  "roofing-the-woodlands-tx-guide.html": "photo-1513584684374-8bab748fbf90",
  "roofing-pearland-tx-guide.html": "photo-1600607687939-ce8a6c25118c",
  "signs-you-need-roof-replacement-houston.html": "photo-1507089947368-19c1da9775ae",
  "best-affordable-roofing-contractors-houston.html": "photo-1504307651254-35680f356dfd",
  "how-insurance-roof-claims-work-texas.html": "photo-1450133064473-71024230f91b",
  "roof-leak-detection-houston-guide.html": "photo-1534274988757-a28bf1a57c17",
  "roof-replacement-financing-houston.html": "photo-1518495973542-4542c06a5843",
  "roof-inspection-before-buying-home-houston.html": "photo-1592595896551-12b371d546d5",
  "houston-hail-damage-guide.html": "photo-1518156677180-95a2893f3e9f",
  "roofing-pasadena-tx-guide.html": "photo-1416339306562-f3d12fefd36f",
  "roofing-league-city-tx-guide.html": "photo-1512915922686-57c11dde9b6b",
  "roofing-spring-tx-guide.html": "photo-1600210492486-724fe5c67fb0",
  "roofing-friendswood-tx-guide.html": "photo-1600596542815-ffad4c1539a9",
  "roofing-tomball-tx-guide.html": "photo-1600585154340-be6161a56a0c",
  "how-long-roof-lasts-houston.html": "photo-1504384308090-c894fdcc538d",
  "roof-replacement-cost-houston-2025.html": "photo-1563013544-824ae1d704d3",
  "metal-roofing-houston-pros-cons.html": "photo-1512917774080-9991f1c4c750",
  "signs-need-new-roof-houston.html": "photo-1513694203232-719a280e022f",
  "roof-leak-repair-houston-guide.html": "photo-1581094794329-c8112a89af12",
  "houston-roof-maintenance-tips.html": "photo-1510798831971-661eb04b3739",
  "asphalt-vs-metal-roofing-houston.html": "photo-1613665813446-82a78c468a1d",
  "how-choose-roofing-contractor-houston.html": "photo-1504307651254-35680f356dfd",
  "commercial-roofing-houston-guide.html": "photo-1486406146926-c627a92ad1ab",
  "roof-financing-options-houston.html": "photo-1554224155-8d04cb21cd6c",
  "roof-damage-after-hail-houston-what-to-do.html": "photo-1504608524841-42fe6f032b4b"
};

// Map Unsplash ID to blogPost list
blogPosts.forEach(post => {
  post.unsplashId = unsplashIdMap[post.filename] || "photo-1504307651254-35680f356dfd";
});

// Sort posts by date (newest first)
const parseDate = (dStr) => {
  return new Date(dStr.replace('July', '7').replace('June', '6').replace('May', '5').replace('April', '4').replace(', 2026', '/2026'));
};
blogPosts.sort((a, b) => parseDate(b.date) - parseDate(a.date));

console.log('Dynamically compiled blog post metadata list with Unsplash IDs. Count:', blogPosts.length);

// 3. Update headers, breadcrumbs, footers, and insert hero image in every individual blog file
files.forEach(file => {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Navigation update: Add "Blog" between "Interactive Center" and "Contact"
  // Look for Desktop Nav
  content = content.replace(/(<a href="\/(?:index\.html)?" class="nav-link">Interactive Center<\/a>)(\s*)(<a href="\/contact\.html" class="nav-link">Contact<\/a>)/g, 
    `$1$2<a href="/blog/index.html" class="nav-link">Blog</a>$2$3`
  );

  // Look for Breadcrumbs and update to /blog/index.html
  // E.g. <a href="/sitemap.html">Blog</a>  -> <a href="/blog/index.html">Blog</a>
  // or <a href="sitemap.html">Blog</a>
  content = content.replace(/<a\s+href=["']\/?sitemap\.html["']\s*>Blog<\/a>/gi, 
    `<a href="/blog/index.html">Blog</a>`
  );

  // Update Footer: add Blog link
  // Locate bottom layout: <a href="/">Home</a>\s*<a href="/privacy-policy.html">Privacy Policy</a>
  content = content.replace(/(<a href="\/(?:index\.html)?"\s*>Home<\/a>)(\s*)(<a href="\/privacy-policy\.html"\s*>Privacy Policy<\/a>)/g,
    `$1$2<a href="/blog/index.html">Blog</a>$2$3`
  );

  // Fallback search to do it more manually if regex was strict
  // E.g. check if "Blog" link is already present.
  if (!content.includes('/blog/index.html') && content.includes('/contact.html')) {
    console.log(`Applying robust fallback replacements to: ${file}`);
    content = content.replace(/Interactive Center<\/a>\s*<a href="\/contact\.html"/, 
      `Interactive Center</a>\n        <a href="/blog/index.html" class="nav-link">Blog</a>\n        <a href="/contact.html"`
    );
    content = content.replace(/Home<\/a>\s*<a href="\/privacy-policy\.html"/, 
      `Home</a>\n          <a href="/blog/index.html">Blog</a>\n          <a href="/privacy-policy.html"`
    );
    content = content.replace(/>Blog<\/a>/gi, 
      ` href="/blog/index.html">Blog</a>`
    );
  }

  // Hero Image Insertion
  const post = blogPosts.find(p => p.filename === file);
  if (post && post.unsplashId) {
    // Remove any existing injected blog hero image to keep it idempotent
    content = content.replace(/<!-- Blog Hero Image -->[\s\S]*?<\/picture>\s*<\/div>/gi, '');

    // Inject the new hero image after the closing tag of the hero-subtitle paragraph
    const imageHTML = `<!-- Blog Hero Image -->
      <div class="blog-hero-img-container" style="max-width: 1000px; margin: 2rem auto 0 auto; height: 450px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
        <picture>
          <source srcset="https://images.unsplash.com/${post.unsplashId}?w=800&auto=format&fit=crop&q=60&fm=webp" type="image/webp">
          <img width="800" height="450" loading="lazy" src="https://images.unsplash.com/${post.unsplashId}?w=800&auto=format&fit=crop&q=60&fm=jpg" alt="${post.title.replace(/"/g, '&quot;')}" class="w-full h-full object-cover" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://placehold.co/1200x630/1e3a5f/ffffff?text=${encodeURIComponent(post.category).replace(/%20/g, '+')}';">
        </picture>
      </div>`;

    content = content.replace(/(<p class="hero-subtitle"[\s\S]*?<\/p>)/i, `$1\n      ${imageHTML}`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated blog file elements and hero image inside: ${file}`);
  }
});

// 4. Generate the /blog/index.html page matching the detailed layouts
// We'll extract the exact layout bones (including head, fonts, css, sticky headers, mobile slideout, sitemap etc.) from roofing-the-woodlands-tx-guide.html
const templateFile = path.join(BLOG_DIR, 'roofing-the-woodlands-tx-guide.html');
const templateContent = fs.readFileSync(templateFile, 'utf-8');

// Build the HTML page dynamically
let headPart = templateContent.split('</head>')[0];
// Update title & description in headPart
headPart = headPart.replace(/<title>.*?<\/title>/i, '<title>Roofing Resources, Guides & Storm Damage Advice | Epic Roofing & Construction LLC</title>');
headPart = headPart.replace(/<meta\s+name=["']description["']\s+content=["'].*?["'][^>]*>/i, '<meta name="description" content="Explore Epic Roofing & Construction LLC blog guides. In-depth analysis on shingle replacement, storm wind assessment, hail repair, insurance claims, and local Houston HOA covenants.">');

// Prepend the required template comments block and add head back
let indexHTML = `<!--
// TO ADD NEW BLOG: copy this object and add to blogPosts array:
// { title: "Your Title", filename: "your-file.html", description: "Short description", category: "Category Name" }
-->
` + headPart + '</head>\n<body>\n';

// Extract Banner, Header, and Mobile Slideout from template
const navStartIndex = templateContent.indexOf('<!-- EMERGENCY TOP BANNER -->');
const navEndIndex = templateContent.indexOf('<!-- BREADCRUMBS STRIP -->');

if (navStartIndex !== -1 && navEndIndex !== -1) {
  let navHTML = `
  <!-- EMERGENCY TOP BANNER -->
  <div class="emergency-strip" id="emergency-banner">
    🚨 Active Roof Leak? Get Certified Same-Day Solutions & Water Isolation | <a href="tel:+12813269905">📞+1 (281) 326-9905</a>
  </div>

  <!-- STICKY NAVY HEADER -->
  <header id="site-header">
    <div class="header-container">
      <a href="/index.html" id="site-logo">
        <img src="/images/epic-roofing-logo.svg" 
        alt="Epic Roofing logo for premium roofing contractor | Epic Roofing TX | Houston TX"
        style="height: 55px; width: 220px; aspect-ratio: 220/55;" width="220" height="55">
      </a>

      <!-- Desktop Nav -->
      <nav class="desktop-nav" id="desktop-navbar">
        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Our Services</span>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/roof-replacement-houston.html">Shingle Replacement</a>
            <a class="dropdown-item" href="/metal-roofing-houston.html">Metal Roofing</a>
            <a class="dropdown-item" href="/roof-coating-houston.html">Commercial Coating</a>
            <a class="dropdown-item" href="/storm-damage-roofing-houston.html">Hail & Wind Damage</a>
            <a class="dropdown-item" href="/emergency-roof-tarping-houston.html">Emergency Leak Tarp</a>
            <a class="dropdown-item" href="/free-roof-inspection-houston.html">Certified Inspection</a>
          </div>
        </div>

        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Storm Repairs</span>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/hail-damage-roof-repair-houston.html">Hail Damage Restoration</a>
            <a class="dropdown-item" href="/wind-damage-roof-repair-houston.html">Wind Damage Restoration</a>
            <a class="dropdown-item" href="/storm-damage-roofing-houston.html">General Storm Damage</a>
            <a class="dropdown-item" href="/emergency-roof-tarping-houston.html">Emergency Tarp Service</a>
          </div>
        </div>

        <div class="dropdown">
          <span class="nav-link dropdown-toggle">Service Areas</span>
          <div class="dropdown-menu dropdown-menu-wide">
            <a class="dropdown-item" href="/index.html">Houston</a>
            <a class="dropdown-item" href="/katy-roofing-contractor.html">Katy</a>
            <a class="dropdown-item" href="/sugar-land-roofing-contractor.html">Sugar Land</a>
            <a class="dropdown-item" href="/cypress-roofing-contractor.html">Cypress</a>
          </div>
        </div>
        <a href="/index.html" class="nav-link">Interactive Center</a>
        <a href="/blog/index.html" class="nav-link">Blog</a>
        <a href="/contact.html" class="nav-link">Contact</a>
      </nav>

      <a href="tel:+12813269905" class="btn btn-primary" id="btn-call-header" style="height: 46px; padding: 0 1.25rem; font-size: 0.85rem; display: inline-flex; align-items: center; justify-content: center;">
        📞 +1 (281) 326-9905
      </a>

      <button class="menu-toggle" id="menu-btn" aria-label="Open Navigation Menu">☰</button>
    </div>
  </header>

  <!-- Mobile Slideout Menu -->
  <div class="mobile-menu-overlay" id="menu-overlay"></div>
  <div class="mobile-menu" id="mobile-menu">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:1rem;">
      <a href="/index.html" class="logo">EPIC ROOFING <span>TX</span></a>
      <button class="menu-toggle" id="menu-close-btn" style="color:var(--orange);">✕</button>
    </div>
    <a href="/index.html" class="mobile-nav-link">Home</a>
    <a href="/roof-replacement-houston.html" class="mobile-nav-link">Shingle Replacement</a>
    <a href="/storm-damage-roofing-houston.html" class="mobile-nav-link">Storm Damage</a>
    <a href="/blog/index.html" class="mobile-nav-link">Blog</a>
    <a href="/index.html" class="mobile-nav-link">Houston Core</a>
    <a href="tel:+12813269905" class="btn btn-primary" style="margin-top:1.5rem; width:100%;">📞 Call Free Inspection</a>
  </div>
`;
  indexHTML += navHTML;
} else {
  // Safe Fallback header
  console.log('WARNING: Header / Nav slice indices not found. Using safe inline header fallback.');
}

// Add index page Breadcrumb Slot
indexHTML += `
  <!-- BREADCRUMBS STRIP -->
  <div class="container" style="padding-top: 1.5rem; padding-bottom: 0.25rem;">
    <div class="breadcrumbs" id="top-breadcrumbs">
      <a href="/">Home</a> <span>/</span> <span style="color:#EA580C; font-weight:700;">Blog</span>
    </div>
  </div>
`;

// Add index page Hero Section
indexHTML += `
  <!-- HERO SECTION -->
  <section class="hero-section" style="padding: 4.5rem 0 3.5rem 0;" id="hero-blog-index">
    <div class="container" style="text-align: center;">
      <div class="badge-orange-light" style="margin-bottom: 1.25rem; display: inline-flex;">
        📋 Certified Roofer Advisory Board
      </div>
      <h1 class="hero-title" style="margin-bottom: 1.25rem; font-size: 2.75rem; line-height: 1.2;">
        Roofing Resources <span style="color: var(--orange);">& Homeowner Guides</span>
      </h1>
      <p class="hero-subtitle" style="margin-bottom: 0; max-width: 800px; margin-left: auto; margin-right: auto;">
        Expert technical advice, storm-damage assessments, Texas insurance claim playbooks, and localized suburban guidelines to help you make informed decisions about your home's roof investment.
      </p>
    </div>
  </section>
`;

// Add main categories navigation (Visual Accents & Actionable Filter Buttons)
indexHTML += `
  <!-- BLOG INDEX LISTING -->
  <section class="section-padding" style="background: var(--navy); padding-top: 2rem;" id="blog-listings-container">
    <div class="container">
      
      <!-- Category Filter Pills (Interactive Buttons) -->
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin-bottom: 3rem;" id="filter-container">
        <button class="filter-btn active" data-category="All" style="background: var(--orange); color: white; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; cursor: pointer; border: 1px solid var(--orange); transition: all 0.3s ease;">All</button>
        <button class="filter-btn" data-category="Hail Damage" style="background: var(--navy-light); color: #94A3B8; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #1E293B; transition: all 0.3s ease;">Hail Damage</button>
        <button class="filter-btn" data-category="Insurance Claims" style="background: var(--navy-light); color: #94A3B8; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #1E293B; transition: all 0.3s ease;">Insurance Claims</button>
        <button class="filter-btn" data-category="Storm Repair" style="background: var(--navy-light); color: #94A3B8; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #1E293B; transition: all 0.3s ease;">Storm Repair</button>
        <button class="filter-btn" data-category="Roof Inspection" style="background: var(--navy-light); color: #94A3B8; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #1E293B; transition: all 0.3s ease;">Roof Inspection</button>
        <button class="filter-btn" data-category="Cost & Materials" style="background: var(--navy-light); color: #94A3B8; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #1E293B; transition: all 0.3s ease;">Cost & Materials</button>
        <button class="filter-btn" data-category="Local Guides" style="background: var(--navy-light); color: #94A3B8; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #1E293B; transition: all 0.3s ease;">Local Guides</button>
        <button class="filter-btn" data-category="Maintenance Guides" style="background: var(--navy-light); color: #94A3B8; padding: 8px 18px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #1E293B; transition: all 0.3s ease;">Maintenance Guides</button>
      </div>

      <!-- Grid layout: 2-3 columns on desktop, 1 on mobile -->
      <div class="grid grid-3" id="blog-grid" style="gap: 2rem;">
        <!-- Blog Cards will be rendered dynamically here -->
      </div>
    </div>
  </section>
`;

// Extract Footer from template
const footerStartIndex = templateContent.indexOf('<!-- FOOTER -->');
if (footerStartIndex !== -1) {
  let footerHTML = templateContent.substring(footerStartIndex);
  // Ensure footer has Blog link added
  footerHTML = footerHTML.replace(/(<a href="\/(?:index\.html)?"\s*>Home<\/a>)(\s*)(<a href="\/privacy-policy\.html"\s*>Privacy Policy<\/a>)/g,
    `$1$2<a href="/blog/index.html">Blog</a>$2$3`
  );
  indexHTML += footerHTML;
} else {
  // Safe Fallback footer
  console.log('WARNING: Footer slice index not found. Using safe footer fallback.');
}

// Add client-side dynamic rendering script
indexHTML = indexHTML.replace('</body>', `
  <script>
    // Blog Posts data catalog compiled automatically
    const blogPosts = ${JSON.stringify(blogPosts, null, 2)};

    // Dynamic rendering engine
    function renderBlogs(filterCategory) {
      const grid = document.getElementById('blog-grid');
      grid.innerHTML = '';
      
      const filtered = filterCategory === 'All' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === filterCategory);
        
      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #94A3B8; padding: 4rem 0;"><p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No active articles found under this category.</p><span style="font-size: 0.9rem; color: #64748B;">Please select a different resource tab above.</span></div>';
        return;
      }
      
      filtered.forEach(post => {
        // Dynamic category badge colors
        let badgeStyle = "background: rgba(234, 88, 12, 0.15); border: 1px solid rgba(234, 88, 12, 0.3); color: var(--orange);";
        if (post.category === 'Storm Repair') {
          badgeStyle = "background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #3B82F6;";
        } else if (post.category === 'Insurance Claims') {
          badgeStyle = "background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10B981;";
        } else if (post.category === 'Cost & Materials') {
          badgeStyle = "background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.3); color: #EAB308;";
        } else if (post.category === 'Local Guides') {
          badgeStyle = "background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); color: #A855F7;";
        } else if (post.category === 'Hail Damage') {
          badgeStyle = "background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #EF4444;";
        } else if (post.category === 'Roof Inspection') {
          badgeStyle = "background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); color: #06B6D4;";
        }
        
        const cardId = 'card-' + post.filename.replace('.html', '');
        
        const cardHTML = \`
          <div id="\${cardId}" class="sitemap-card" style="background: var(--navy-light); border: 1px solid #1E293B; border-radius: 12px; padding: 1.75rem; border-bottom: 4px solid var(--orange); display: flex; flex-direction: column; justify-content: space-between; height: 100%; transition: var(--transition);">
            <div>
              <!-- Blog Card Image Thumbnail -->
              <div style="height: 180px; width: 100%; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.05); position: relative;">
                <picture>
                  <source srcset="https://images.unsplash.com/\${post.unsplashId}?w=350&auto=format&fit=crop&q=50&fm=webp" type="image/webp">
                  <img width="350" height="256" loading="lazy" src="https://images.unsplash.com/\${post.unsplashId}?w=350&auto=format&fit=crop&q=50&fm=jpg" alt="\${post.title.replace(/"/g, '&quot;')}" class="w-full h-full object-cover" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://placehold.co/800x450/1e3a5f/ffffff?text=\${encodeURIComponent(post.category).replace(/%20/g, '+')}';">
                </picture>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                <span style="\${badgeStyle} font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 999px; text-transform: uppercase;">\${post.category}</span>
                <span style="font-size: 0.8rem; color: #64748B; font-weight: 600;">\${post.readTime || '8 Min Read'}</span>
              </div>
              
              <h3 style="font-size: 1.25rem; font-weight: 800; line-height: 1.35; margin-bottom: 1rem; color: var(--white); text-transform: none; text-align: left; letter-spacing: normal;">
                \${post.title}
              </h3>
              
              <p style="color: #94A3B8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                \${post.description}
              </p>
            </div>

            <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1E293B; padding-top: 1.25rem;">
              <span style="font-size: 0.825rem; color: #64748B; font-weight: 500;">📅 \${post.date || 'June 10, 2026'}</span>
              <a href="/blog/\${post.filename}" style="color: var(--orange); font-weight: 700; font-size: 0.95rem; transition: var(--transition); display: inline-flex; align-items: center; gap: 4px;" class="read-link">
                Read Article <span style="font-size: 1.1rem; line-height: 1;">→</span>
              </a>
            </div>
          </div>
        \`;
        
        grid.insertAdjacentHTML('beforeend', cardHTML);
      });

      // Add elegant micro-interactions on hover
      document.querySelectorAll('.sitemap-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-6px)';
          card.style.borderColor = 'var(--orange)';
          card.style.boxShadow = '0 12px 30px rgba(234, 88, 12, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.borderColor = '#1E293B';
          card.style.boxShadow = 'none';
        });
      });
    }

    // Interactive category filtering navigation
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active states
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'var(--navy-light)';
          b.style.color = '#94A3B8';
          b.style.border = '1px solid #1E293B';
          b.style.fontWeight = '600';
        });
        
        btn.classList.add('active');
        btn.style.background = 'var(--orange)';
        btn.style.color = 'white';
        btn.style.border = '1px solid var(--orange)';
        btn.style.fontWeight = '700';

        // Trigger filtered render
        renderBlogs(btn.getAttribute('data-category'));
      });
    });

    // Initial load
    renderBlogs('All');
  </script>
</body>`);

fs.writeFileSync(BLOG_INDEX_PATH, indexHTML, 'utf-8');
console.log('Successfully generated `/blog/index.html`!');

console.log('Blog update process finished successfully.');
