# Changelog

All notable changes to the Epic Roofing & Construction LLC website will be documented in this file.

## [1.4.0] - 2026-11-06

### Added
- Added Asphalt Shingle Roofing service page: `/asphalt-roofing-houston.html` (served at `/asphalt-roofing-houston`, PDF Page 1 Push Plan §6)
  - Title: "Asphalt Shingle Roofing Houston TX | Epic Roofing TX"; meta per PDF §6; H1 "Asphalt Shingle Roofing in Houston, TX".
  - Sections: hero, 3 option cards (Architectural / 3-tab / Class 4 impact-resistant), Why Asphalt Wins, cost drivers (ranges from the site's own 2026 Houston pricing guide), Repair or Replace, 5 FAQs with FAQPage JSON-LD, anonymised Homeowner Incident Spotlight (no names, ratings or review language), closing CTA band.
  - Images: hero + 2 in-body photos (.jpg + .webp pairs in /images/), hero watermarked in the Epic style; no geo-tagging on this page.
  - Registered in service-sitemap.xml; redirect added to vercel.json; footer "Our Services" entry added on this page and the homepage (site-wide footer rollout is a later batch).
  - Pending links (to add when the posts go live): Blog 1 (/blog/asphalt-shingle-roofing-houston) and Blog 3 (/blog/what-does-a-roof-cost-houston) from the cost / repair-or-replace sections.

## [1.3.1] - 2026-11-06

### Changed
- Title & meta CTR fixes (PDF Page 1 Push Plan §7.1–§7.4, changed 2026-11-06):
  - Homepage (/): title "Epic Roofing & Construction | Houston Roofing Contractor"; meta "Epic Roofing & Construction LLC — Houston's roofing contractor for roof repair, replacement and storm damage. Free roof inspection. Call (281) 326-9905." (OG title/description updated to match.)
  - /metal-roofing-houston: title "Metal Roofing Houston TX | Cost, Lifespan & Free Quote"; meta "Metal roofing in Houston, TX: standing seam and panels built for hurricanes and Gulf heat. Real costs, 40+ year lifespan, free quotes — (281) 326-9905."
  - /free-roof-inspection-houston: title "Free Roof Inspection Houston | Photo Report, No Obligation"; meta "Free roof inspection in Houston, TX: we photograph all damage and hand you a written report — no pressure, no obligation. Book yours: (281) 326-9905."
  - /chimney-flashing-repair-houston: title "Chimney Leak & Flashing Repair Houston | Epic Roofing TX"; meta "Chimney leaking in Houston? Failed flashing lets water rot your decking in silence. Expert chimney & step-flashing repair — call (281) 326-9905."
- Footer "Write for Us" links verified present (homepage Quick Links, /blog index via template, /contact) — no changes needed.

## [1.3.0] - 2026-11-06

### Added
- Added Write for Us page: `/write-for-us.html` (served at `/write-for-us`)
  - Title: "Write for Us | Roofing Guest Posts — Epic Roofing TX"
  - Targets "roofing write for us" / "write for us roofing" searches; offers three contributor routes — Sponsored Post (paid, permanent, up to 2 dofollow links), Link Insertion (paid, inside an existing post), and Guest Post (free, strict quality bar). No prices on the page; pricing handled by email.
  - Accepted topics: roofing (repair/replacement, shingle vs metal, storm/hail/wind damage, inspection & maintenance, insurance-claim guides, chimney flashing, skylight leaks, gutters, attic ventilation), Houston/Texas local angles, and limited roofing-tied home-exterior topics. Non-home niches politely declined.
  - Submissions go to contact@epicroofingtx.com only, subject "Guest Post Inquiry – [Your Proposed Topic]"; guidelines: 1,000+ words, 100% original, H2/H3 structure, 2+ images, max 2 links, replies within 48 hours.
  - Built on the standard top-level page layout (same header/nav/footer skeleton as the legal pages); linked from the page's Resources menu and footer Quick Links.
- Registered `/write-for-us` in `sitemap.xml`, `public/sitemap.xml`, and `page-sitemap.xml`, and added it to the Corporate Pages card in `sitemap.html`.

## [1.2.0] - 2026-11-06

### Added
- Added GSC-driven blog guide: `/blog/metal-roofing-companies-houston-guide.html`
  - Title: "Metal Roofing Companies in Houston: How to Choose the Right Installer"
  - Targets the metal roofing near-me cluster (companies/contractors near me, standing seam Sugar Land); links to `/metal-roofing-houston`. Three fresh generated in-body photos.
- Added GSC-driven blog guide: `/blog/roof-insurance-claim-specialist-houston.html`
  - Title: "Roof Insurance Claim Specialist: What Houston Homeowners Actually Get"
  - Targets roof insurance claim specialist / Kingwood roof claim queries; explains specialist vs. adjuster vs. public adjuster roles and ACV vs RCV; links to `/insurance-claim-roofing-houston`. Three fresh generated in-body photos.
- Added GSC-driven blog guide: `/blog/emergency-roof-repair-cypress-wind-damage.html`
  - Title: "Emergency Roof Repair in Cypress TX: Wind Damage Steps for the First 24 Hours"
  - Targets emergency roof repair Cypress and Houston roof wind damage queries; links to `/emergency-roof-tarping-houston` and `/wind-damage-roof-repair-houston`. Three fresh generated in-body photos.
- Registered all three posts in `update_blog_sections.js` (blog index + hero mechanism) and added their URLs to `sitemap.xml`, `public/sitemap.xml`, and `blog/sitemap.xml`.

## [1.1.0] - 2026-06-11

### Added
- Added high-quality local SEO blog guide: `/blog/roofing-the-woodlands-tx-guide.html`
  - Title: "Roofing in The Woodlands TX: Tree Damage, Storms & What Local Homeowners Should Know"
  - Focusing on the lush pine tree canopy damage, strict localized Development Standards Committee rules, and specific village covenant guidelines (Cochran's Crossing, Grogans Mill, Alden Bridge, Carlton Woods).
  - Included fully optimized schema markup and clear internal link routing.
- Added high-quality local SEO blog guide: `/blog/roofing-pearland-tx-guide.html`
  - Title: "Pearland TX Roofing Guide: Why So Many Homes Need Replacement Right Now"
  - Detailing the 1990s housing boom shingle lifespans, coastal Gulf wind-shear exposures, high hail claim rates in Brazoria County, and community-specific challenges in Shadow Creek Ranch, Silverlake, and Clear Creek.
  - Formatted with structured semantic tags, customized sidebar components, and responsive layout classes of the main site template.

### Technical Improvements
- Ensured all blog and service assets preserve exact desktop and mobile navigation elements from the core master layouts.
- Verified all clickable calls-to-action link naturally to `/free-roof-inspection-houston.html` for maximum conversion.
- Bumped package version to ensure complete environment synchronization.
