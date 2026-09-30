const fs = require('fs');
const { citiesData, countWords } = require('./build-city-data.js');

const filesMap = {
  "atascocita-kingwood": "atascocita-kingwood-tx-roofing-contractor.html",
  "baytown": "baytown-tx-roofing-contractor.html",
  "channelview": "channelview-tx-roofing-contractor.html",
  "conroe": "conroe-tx-roofing-contractor.html",
  "cypress": "cypress-roofing-contractor.html",
  "deer-park": "deer-park-tx-roofing-contractor.html",
  "friendswood": "friendswood-tx-roofing-contractor.html",
  "galveston": "galveston-tx-roofing-contractor.html",
  "humble": "humble-tx-roofing-contractor.html",
  "katy": "katy-roofing-contractor.html",
  "la-porte": "la-porte-tx-roofing-contractor.html",
  "league-city": "league-city-roofing-contractor.html",
  "manvel": "manvel-tx-roofing-contractor.html",
  "missouri-city": "missouri-city-roofing-contractor.html",
  "pasadena": "pasadena-tx-roofing-contractor.html",
  "pearland": "pearland-roofing-contractor.html",
  "richmond": "richmond-tx-roofing-contractor.html",
  "rosenberg": "rosenberg-tx-roofing-contractor.html",
  "spring": "spring-tx-roofing-contractor.html",
  "sugar-land": "sugar-land-roofing-contractor.html",
  "the-woodlands": "the-woodlands-roofing-contractor.html",
  "tomball": "tomball-tx-roofing-contractor.html",
  "webster-clear-lake": "webster-clear-lake-tx-roofing-contractor.html"
};

const cityTitles = {
  "atascocita-kingwood": "Atascocita & Kingwood",
  "baytown": "Baytown",
  "channelview": "Channelview",
  "conroe": "Conroe",
  "cypress": "Cypress",
  "deer-park": "Deer Park",
  "friendswood": "Friendswood",
  "galveston": "Galveston",
  "humble": "Humble",
  "katy": "Katy",
  "la-porte": "La Porte",
  "league-city": "League City",
  "manvel": "Manvel",
  "missouri-city": "Missouri City",
  "pasadena": "Pasadena",
  "pearland": "Pearland",
  "richmond": "Richmond",
  "rosenberg": "Rosenberg",
  "spring": "Spring",
  "sugar-land": "Sugar Land",
  "the-woodlands": "The Woodlands",
  "tomball": "Tomball",
  "webster-clear-lake": "Webster & Clear Lake"
};

const heroOpenings = {
  "atascocita-kingwood": "Nestled along the northeastern rim of Harris County, homes in Kingwood and Atascocita live under an extraordinary canopy of towering loblolly pines and water oaks that deliver welcome summer shade but subject asphalt shingles to relentless organic decay and severe wind-driven branch impacts.",
  "baytown": "Bordered by Upper Galveston Bay and the industrial waterway of the Houston Ship Channel, Baytown properties endure a relentless combination of corrosive saltwater humidity, chemical vapor fallout, and powerful coastal storm fronts that rapidly degrade substandard roofing materials.",
  "channelview": "Flanked by the busy industrial bends of the Houston Ship Channel and the San Jacinto River, Channelview residences need rugged, hurricane-reinforced roofing systems engineered to withstand both heavy industrial emissions and violent Gulf Coast thunderstorm squalls.",
  "conroe": "Rapidly expanding through the dense pine woodlands of Montgomery County along Interstate 45 and Lake Conroe, Conroe residences demand premium architectural roofing capable of enduring intense summer heat cycles, heavy forestry debris, and strict subdivision architectural standards.",
  "cypress": "Stretching across the open coastal prairie of Northwest Harris County along US-290, Cypress master-planned communities showcase expansive, multi-tiered rooflines that require advanced storm-resistant engineering to survive severe spring hail corridors and high-velocity prairie winds.",
  "deer-park": "Deep in the heart of Southeast Harris County near the historic San Jacinto Monument, Deer Park residences require industrial-grade roofing resilience designed to repel aggressive chemical airborne fallout, extreme solar ultraviolet exposure, and brutal Gulf storm winds.",
  "friendswood": "Straddling the scenic, tree-lined banks of Clear Creek across northern Galveston and southern Harris counties, Friendswood homes demand high-caliber craftsmanship capable of satisfying stringent municipal windstorm codes while resisting heavy coastal moisture and persistent tree canopy debris.",
  "galveston": "Perched directly on the barrier island sands of the Upper Texas Gulf Coast, Galveston Island residences demand the highest caliber of coastal storm engineering, strict Texas Windstorm Insurance Association (TWIA) compliance, and non-corrosive marine-grade components.",
  "humble": "Situated near the scenic bend of the San Jacinto River and the busy flight paths of George Bush Intercontinental Airport, Humble homes face a challenging mix of high forestry humidity, low-frequency acoustic vibrations, and severe North Harris County thunderstorm fronts.",
  "katy": "Sprawling across the flat coastal prairie of western Harris and northern Fort Bend counties along Interstate 10, Katy homes face unobstructed severe wind shear, intense prairie heat, and the region's most active seasonal hail corridors.",
  "la-porte": "Fronting the open waters of Galveston Bay near Barbours Cut, La Porte residences demand heavy-duty coastal roofing systems built to repel persistent saltwater air, industrial atmospheric wear, and severe tropical hurricane wind shear.",
  "league-city": "Positioned along the vibrant shoreline of Clear Lake in northern Galveston County, League City residences must comply with rigorous Texas Department of Insurance windstorm codes while defending against relentless marine humidity and coastal hurricane squalls.",
  "manvel": "Rapidly transforming from open Brazoria County cattle ranches into vibrant master-planned communities along Highway 288, Manvel homes face intense southern prairie wind exposure, high agricultural humidity, and violent Gulf tropical weather systems.",
  "missouri-city": "Winding along the lush waterways of Oyster Creek and the Brazos River basin in eastern Fort Bend County, Missouri City homes require sophisticated architectural roofing engineered to blend strict master-planned HOA aesthetics with superior storm and humidity resilience.",
  "pasadena": "Anchored in the historic industrial heartland of Southeast Harris County between Beltway 8 and the Ship Channel, Pasadena homes require durable, heat-and-chemical-resistant roofing systems capable of handling intense industrial air emissions, tropical downpours, and severe convective windstorms.",
  "pearland": "Spanning the rapidly developing southern gateway of Greater Houston along Highway 288 and FM 518, Pearland residences require modern, high-velocity storm protection to safeguard thousands of aging 1990s and 2000s suburban roof systems.",
  "richmond": "Stretching along the historic bends of the Brazos River in western Fort Bend County, Richmond residences require versatile roofing expertise capable of protecting historic shaded acreage homes as well as modern master-planned prairie communities.",
  "rosenberg": "Rising above the agricultural plains of southwestern Fort Bend County along Interstate 69, Rosenberg homes face intense prairie solar radiation, strong unobstructed crosswinds, and early failure of builder-grade roofing materials.",
  "spring": "Encompassing the forested corridor between Interstate 45, the Grand Parkway, and FM 2920, Spring residences contend with dense pine needle debris, severe thunderstorm microbursts, and heavy tree-canopy moisture.",
  "sugar-land": "Nestled along the winding waterways of Oyster Creek and the Brazos River in prestigious eastern Fort Bend County, Sugar Land estates demand elite architectural roofing that strictly adheres to rigorous master-planned HOA covenants while resisting severe tropical storms.",
  "the-woodlands": "Immersed in the towering pine forests of southern Montgomery County, custom residences across The Woodlands require specialized architectural roofing that complies with rigorous Township Residential Development Standards while enduring heavy pine needle debris and canopy shade.",
  "tomball": "Bridging the scenic pine forests of northern Harris County with open prairie pastures along Highway 249 and FM 2920, Tomball homes require durable roofing systems engineered to withstand intense thermal swings, heavy tree debris, and severe convective thunderstorm squalls.",
  "webster-clear-lake": "Situated adjacent to NASA Johnson Space Center and the coastal waters of Clear Lake and Galveston Bay, Webster and Clear Lake homes demand aerospace-caliber roofing resilience, rigorous windstorm compliance, and robust defense against corrosive salt air."
};

const h2Replacements = {
  "katy": [
    ["OUR 6 CORE SERVICE VERTICALS", "HIGH-PERFORMANCE ARCHITECTURAL ROOFING & HAIL RESTORATIONS IN KATY"],
    ["LOCAL SHIFTING & HOA OBSTACLES IN KATY DEVELOPMENTS", "PRAIRIE WIND FETCH, HAIL CORRIDORS & STRICT MASTER-PLANNED HOA STANDARDS"],
    ["Why Katy Homeowners Rely on Epic Roofing TX", "Why Homeowners in Cinco Ranch, Grand Lakes & Firethorne Choose Epic Roofing TX"],
    ["LOCAL KATY & GREATER HOUSTON CLIENT REVIEW", "Verified Storm Recovery Experience from a Katy Homeowner"],
    ["Frequently Asked Katy Roofing Questions", "Frequently Asked Questions About Roofing in Katy, TX"],
    ["OUR INTEGRATED SERVICE COVERAGES IN KATY, TEXAS", "Serving Master-Planned Neighborhoods Across Greater Katy"]
  ],
  "baytown": [
    ["OUR 6 CORE SERVICE VERTICALS", "ENGINEERED COASTAL ROOFING & STORM RESTORATION SERVICES IN BAYTOWN"],
    ["LOCAL COASTAL & INDUSTRIAL CHALLENGES IN BAYTOWN", "INDUSTRIAL ATMOSPHERE & GALVESTON BAY WIND VULNERABILITIES"],
    ["Why Baytown Homeowners Rely on Epic Roofing TX", "Why Property Owners Across Baytown Rely on Epic Roofing TX"],
    ["LOCAL BAYTOWN CUSTOMER SUCCESS STORY", "Real Experience from a Lakewood & Baytown Homeowner"],
    ["Frequently Asked Baytown Roofing Questions", "Key Answers for Baytown Roof Repairs & Replacements"],
    ["OUR INTEGRATED SERVICE COVERAGES IN BAYTOWN, TEXAS", "Serving Communities Across Greater Baytown & Upper Galveston Bay"]
  ],
  "conroe": [
    ["OUR 6 CORE SERVICE VERTICALS", "FULL-SPECTRUM RESIDENTIAL ROOFING & STORM RESTORATION IN CONROE"],
    ["LOCAL CHALLENGES FOR CONROE ROOFS", "LAKE CONROE WINDS, FOREST DEBRIS & MONTGOMERY COUNTY CLIMATE STRESS"],
    ["Why Conroe Homeowners Rely on Epic Roofing TX", "The Roofing Contractor Conroe Families Trust for Quality Craftsmanship"],
    ["LOCAL CONROE CUSTOMER SUCCESS STORY", "Conroe Customer Storm Recovery Story"],
    ["Frequently Asked Conroe Roofing Questions", "Frequently Asked Questions About Conroe Roof Replacements"],
    ["OUR INTEGRATED SERVICE COVERAGES IN CONROE, TEXAS", "Serving Lake Conroe Communities & Montgomery County Neighborhoods"]
  ],
  "cypress": [
    ["OUR REINFORCED STRUCTURAL VERTICALS", "ARCHITECTURAL & IMPACT-RESISTANT ROOFING SERVICES FOR CYPRESS PROPERTIES"],
    ["CYPRESS MOISTURE REJECTION VULNERABILITIES", "PRAIRIE HAIL DYNAMICS & COMPLEX ROOF ARCHITECTURE IN CYPRESS"],
    ["Why Cypress Homeowners Trust Epic Roofing TX", "Why Families in Bridgeland, Fairfield & Towne Lake Choose Epic Roofing TX"],
    ["CYPRESS CLIENT TESTIMONIAL", "Recent Cypress Homeowner Storm Restoration Experience"],
    ["Frequently Asked Cypress Roofing Questions", "Essential Cypress Roofing & Insurance Claim FAQs"],
    ["AREAS WE SERVE IN CYPRESS, TEXAS", "Serving Communities Across Northwest Harris County & Cypress"]
  ],
  "galveston": [
    ["OUR 6 CORE COASTAL SERVICE VERTICALS", "TWIA-COMPLIANT COASTAL ROOFING & WINDSTORM SOLUTIONS ON GALVESTON ISLAND"],
    ["ISLAND CHALLENGES: SALTWATER, WIND UPLIFT & HURRICANE RISK", "SALT-AIR CORROSION, 140 MPH COASTAL UPLIFT & ISLAND BUILDING CODES"],
    ["Why Galveston Island Trusts Epic Roofing TX", "Why Galveston Island Property Owners Depend on Epic Roofing TX"],
    ["LOCAL GALVESTON CUSTOMER SUCCESS STORY", "Galveston Island Resident Restoration Account"],
    ["Frequently Asked Galveston Roofing Questions", "Crucial FAQs on TWIA Certification & Galveston Island Roofs"],
    ["OUR INTEGRATED SERVICE COVERAGES IN GALVESTON, TEXAS", "Protecting Properties From West End to Historic East End Galveston"]
  ],
  "humble": [
    ["PREMIUM RESTORATION SERVICES IN HUMBLE TX", "TARGETED ROOF RESTORATION & REPLACEMENT SERVICES IN HUMBLE, TX"],
    ["HUMBLE'S UNIQUE ENVIRONMENTAL THREATS", "PINE FOREST MOISTURE, AIRPORT CORRIDOR VIBRATIONS & DRAINAGE STRAINS IN HUMBLE"],
    ["Why Humble & Atascocita Families Select Epic Roofing TX", "Why Humble & Northeast Harris County Homeowners Select Epic Roofing TX"],
    ["HUMBLE LOCAL CLIENT TESTIMONIAL", "Humble Homeowner Storm Restoration Story"],
    ["Frequently Asked Humble Roofing Questions", "Frequently Asked Questions About Humble Roof Replacements"],
    ["AREAS WE SERVE IN HUMBLE, TEXAS", "Serving Communities Across Humble, Fall Creek & Lake Houston"]
  ],
  "league-city": [
    ["LEAGUE CITY'S CORE ROOFING SOLUTIONS", "CERTIFIED WINDSTORM-RATED ROOFING SYSTEMS IN LEAGUE CITY, TX"],
    ["LEAGUE CITY'S CORE WEATHER THREATS", "GALVESTON COUNTY WINDSTORM CODES & MARITIME HUMIDITY REALITIES IN LEAGUE CITY"],
    ["Why League City Homeowners Choose Epic Roofing TX", "Why League City Property Owners Choose Epic Roofing TX"],
    ["LEAGUE CITY LOCAL CLIENT TESTIMONIAL", "League City Customer Success Experience"],
    ["Frequently Asked League City Roofing Questions", "Common Questions About League City Windstorm Roofing & Insurance"],
    ["AREAS WE SERVE IN LEAGUE CITY", "Serving Communities Across League City & Clear Lake"]
  ],
  "missouri-city": [
    ["OUR LEADING RESTORATION SOLUTIONS", "MASTER-PLANNED & HOA-COMPLIANT ROOFING SOLUTIONS IN MISSOURI CITY"],
    ["MISSOURI CITY'S COVENANT & ENVIRONMENTAL FAULTS", "OYSTER CREEK HUMIDITY, COMPLEX ARCHITECTURAL ROOFLINES & SIENNA HOA STANDARDS"],
    ["Why Missouri City Homeowners Choose Epic Roofing TX", "Why Missouri City Families Select Epic Roofing TX"],
    ["MISSOURI CITY LOCAL CLIENT TESTIMONIAL", "Missouri City Homeowner Restoration Account"],
    ["Frequently Asked Missouri City Roofing Questions", "Frequently Asked Questions on Missouri City Roof Replacements"],
    ["AREAS WE SERVE IN MISSOURI CITY, TEXAS", "Serving Neighborhoods Across Missouri City & Fort Bend County"]
  ],
  "pasadena": [
    ["CORE HIGH-END RESTORATION SERVICES", "HIGH-PERFORMANCE ROOF REPAIRS & REPLACEMENTS IN PASADENA, TX"],
    ["PASADENA'S CRITICAL ROOFING VULNERABILITIES", "INDUSTRIAL ATMOSPHERIC STRESS, AGING DECKING & STORM VULNERABILITIES IN PASADENA"],
    ["Why Pasadena Homeowners Trust Epic Roofing TX", "Why Pasadena Property Owners Trust Epic Roofing TX"],
    ["PASADENA LOCAL CLIENT TESTIMONIAL", "Pasadena Resident Roof Restoration Story"],
    ["Frequently Asked Pasadena Roofing Questions", "Commonly Asked Pasadena Roofing & Insurance Questions"],
    ["AREAS WE SERVE IN PASADENA, TEXAS", "Serving Residential & Commercial Communities Across Pasadena"]
  ],
  "pearland": [
    ["OUR PEARLAND STORM RESTORATION SERVICES", "COMPREHENSIVE ROOF REPLACEMENT & STORM RESTORATION IN PEARLAND"],
    ["PEARLAND STRUCTURAL DECAY HOLES", "AGING 1990S-2000S SUBDIVISIONS & HIGHWAY 288 WIND CHANNELS IN PEARLAND"],
    ["Why Pearland Families Trust Epic Roofing TX", "The Roofing Contractor Pearland Homeowners Rely Upon"],
    ["PEARLAND & GREATER HOUSTON CLIENT REVIEW", "Pearland Homeowner Storm Recovery Story"],
    ["Frequently Asked Pearland Roofing Questions", "Key Answers for Pearland Roof Replacements & Repairs"],
    ["AREAS WE SERVE IN PEARLAND, TEXAS", "Serving Neighborhoods Across Pearland & Northern Brazoria County"]
  ],
  "richmond": [
    ["OUR HIGH-END RESTORATION SOLUTIONS", "PREMIUM ROOFING & STORM DAMAGE RESTORATION SERVICES IN RICHMOND"],
    ["FORT BEND'S HIGHEST RISK CLIMATE FAULTS", "BRAZOS RIVER MICROCLIMATES, PECAN CANOPIES & WESTERN PRAIRIE STORMS IN RICHMOND"],
    ["Why Fort Bend Families Trust Epic Roofing TX", "Why Richmond & Fort Bend Families Choose Epic Roofing TX"],
    ["RICHMOND LOCAL CLIENT TESTIMONIAL", "Richmond Customer Roofing Account"],
    ["Frequently Asked Richmond Roofing Questions", "Answers to Common Questions on Richmond Roof Replacements"],
    ["AREAS WE SERVE IN RICHMOND, TEXAS", "Serving Communities Across Historic Richmond & Western Fort Bend"]
  ],
  "spring": [
    ["OUR NORTH HOUSTON RESTORATION SERVICES", "ARCHITECTURAL ROOFING & TREE-DAMAGE RESTORATIONS IN SPRING, TX"],
    ["COMMON ROOF DAMAGE & WEATHER RISKS IN SPRING, TX", "SPRING CREEK CANOPY DECAY, DENSE PINES & SEVERE CONVECTIVE SQUALLS IN SPRING"],
    ["Why Spring Families Trust Epic Roofing TX", "The Roofing Specialist Spring & Klein Homeowners Recommend"],
    ["SPRING & GREATER HOUSTON CLIENT REVIEW", "Spring Resident Roof Replacement Account"],
    ["Frequently Asked Spring Roofing Questions", "Frequently Asked Questions on Spring Roof Replacements"],
    ["AREAS WE SERVE IN SPRING, TEXAS", "Serving Communities Across Spring, Klein & Northwest Harris County"]
  ],
  "sugar-land": [
    ["OUR PREMIUM RESTORATION SERVICES", "LUXURY & HOA-COMPLIANT ROOFING SOLUTIONS IN SUGAR LAND"],
    ["SUGAR LAND'S CRITICAL ROOFING VULNERABILITIES", "FIRST COLONY ARCHITECTURAL COVENANTS & SEVERE CONVECTIVE STORMS IN SUGAR LAND"],
    ["THE CONTRACTING STANDARD OF EPIC ROOFING TX", "The Roofing Contractor Sugar Land Property Owners Prefer"],
    ["SUGAR LAND CLIENT CASE STUDY", "Sugar Land Homeowner Restoration Account"],
    ["Frequently Asked Sugar Land Roofing Questions", "Key Inquiries on Sugar Land Architectural Roof Replacements"],
    ["AREAS WE SERVE IN SUGAR LAND, TEXAS", "Serving Master-Planned Communities Across Greater Sugar Land"]
  ],
  "the-woodlands": [
    ["OUR HIGH-END RESTORATION SERVICES", "TOWNSHIP COVENANT-APPROVED ROOFING SYSTEMS IN THE WOODLANDS"],
    ["THE WOODLANDS COVENANT & CANOPY VULNERABILITIES", "PINE NEEDLE VALLEY DECAY & TOWNSHIP DEVELOPMENT STANDARDS IN THE WOODLANDS"],
    ["Why The Woodlands Families Trust Epic Roofing TX", "Why Homeowners Across The Woodlands Choose Epic Roofing TX"],
    ["THE WOODLANDS LOCAL CLIENT TESTIMONIAL", "The Woodlands Client Storm Restoration Account"],
    ["Frequently Asked The Woodlands Roofing Questions", "Township Standards & Roofing FAQs for The Woodlands"],
    ["AREAS WE SERVE IN THE WOODLANDS", "Serving All Villages Across The Woodlands Township"]
  ],
  "tomball": [
    ["RECONSTRUCTIVE SOLUTIONS AVAILABLE IN TOMBALL", "ENGINEERED ROOFING & STORM RECOVERY SOLUTIONS IN TOMBALL, TX"],
    ["TOMBALL'S PRIMARY HOUSING ROOF FAULTS", "PRAIRIE CROSSWINDS, RURAL CANOPY OVERHANGS & THERMAL SHOCK IN TOMBALL"],
    ["Why Tomball Homeowners Choose Epic Roofing TX", "Why Tomball Homeowners Count on Epic Roofing TX"],
    ["TOMBALL LOCAL CLIENT TESTIMONIAL", "Tomball Family Roof Restoration Experience"],
    ["Frequently Asked Tomball Roofing Questions", "Answers to Frequently Asked Tomball Roofing Questions"],
    ["AREAS WE SERVE IN TOMBALL, TEXAS", "Serving Communities Across Tomball & the TX-249 Corridor"]
  ],
  // Variant A pages
  "atascocita-kingwood": [
    ["Why Atascocita / Kingwood Property Owners Trust Epic Roofing", "Proven Craftsmanship for Kingwood & Atascocita Estates"],
    ["Specialized Roof Inspections in Kingwood & Atascocita", "Forensic Storm Damage Diagnostics in the Livable Forest"],
    ["Frequently Asked Technical Questions in Atascocita / Kingwood", "Technical Roofing FAQs for Kingwood & Atascocita Homeowners"],
    ["Roofing Services for Atascocita / Kingwood Residents", "Full-Scope Roofing & Storm Restoration Solutions in Atascocita and Kingwood"],
    ["Atascocita / Kingwood Roofing Questions &amp; Answers", "Key Roofing Questions for Kingwood & Atascocita Properties"],
    ["Atascocita / Kingwood Roofing Questions & Answers", "Key Roofing Questions for Kingwood & Atascocita Properties"],
    ["Schedule Your Free Atascocita / Kingwood Roof Inspection Today", "Protect Your Kingwood or Atascocita Home With a Comprehensive Roof Inspection"]
  ],
  "channelview": [
    ["Why Channelview Property Owners Trust Epic Roofing", "High-Performance Roofing Standards in Channelview"],
    ["Forensic Hail and Wind Assessments in Channelview", "Industrial Corridor Hail & Wind Damage Assessments"],
    ["Frequently Asked Technical Questions in Channelview", "Channelview Technical Roofing & Insurance Claim Inquiries"],
    ["Roofing Services for Channelview Residents", "Comprehensive Roofing Installations & Repairs in Channelview, TX"],
    ["Channelview Roofing Questions &amp; Answers", "Practical Answers on Channelview Roof Durability"],
    ["Channelview Roofing Questions & Answers", "Practical Answers on Channelview Roof Durability"],
    ["Schedule Your Free Channelview Roof Inspection Today", "Schedule Your Comprehensive Channelview Roof Assessment Today"]
  ],
  "deer-park": [
    ["Why Deer Park Property Owners Trust Epic Roofing", "Reliable Industrial-Border Roofing Standards in Deer Park"],
    ["Precision Roof Inspections in Deer Park", "Forensic Engineering Inspections for Deer Park Homes"],
    ["Frequently Asked Technical Questions in Deer Park", "Technical Roofing Inquiries from Deer Park Property Owners"],
    ["Roofing Services for Deer Park Residents", "Engineered Roofing Installations & Repairs in Deer Park, TX"],
    ["Deer Park Roofing Questions &amp; Answers", "Clear Facts on Deer Park Roofing Lifespans & Codes"],
    ["Deer Park Roofing Questions & Answers", "Clear Facts on Deer Park Roofing Lifespans & Codes"],
    ["Schedule Your Free Deer Park Roof Inspection Today", "Book Your On-Site Deer Park Roof Assessment Today"]
  ],
  "friendswood": [
    ["Why Friendswood Property Owners Trust Epic Roofing", "Architectural Integrity & Craftsmanship in Friendswood"],
    ["Certified 21-Point Roof Inspections in Friendswood", "Comprehensive 21-Point Roof Inspections in Friendswood"],
    ["Frequently Asked Technical Questions in Friendswood", "Common Roofing & Storm Repair Inquiries in Friendswood"],
    ["Protecting Friendswood Homeowners from Storm-Chaser Scams", "Local Consumer Protection: Avoiding Transient Storm Chasers"],
    ["Roofing Services for Friendswood Residents", "Premium Roofing & Leak Restoration Services for Friendswood Residents"],
    ["Friendswood Roofing Questions &amp; Answers", "Friendswood Roofing Questions & Technical Answers"],
    ["Friendswood Roofing Questions & Answers", "Friendswood Roofing Questions & Technical Answers"],
    ["Schedule Your Free Friendswood Roof Inspection Today", "Schedule Your Certified Friendswood Roof Inspection Today"]
  ],
  "la-porte": [
    ["Why La Porte Property Owners Trust Epic Roofing", "Coastal Marine Durability Standards in La Porte"],
    ["Wind and Salt-Air Roof Assessments in La Porte", "Marine Wind & Coastal Salt-Air Roof Assessments in La Porte"],
    ["Frequently Asked Technical Questions in La Porte", "Technical Coastal Roofing Questions for La Porte Homeowners"],
    ["Roofing Services for La Porte Residents", "Hurricane-Resistant Roofing Services for La Porte Property Owners"],
    ["La Porte Roofing Questions &amp; Answers", "Essential Facts on Coastal La Porte Roofing & Windstorm Codes"],
    ["La Porte Roofing Questions & Answers", "Essential Facts on Coastal La Porte Roofing & Windstorm Codes"],
    ["Schedule Your Free La Porte Roof Inspection Today", "Schedule Your Free La Porte Coastal Roof Inspection Today"]
  ],
  "manvel": [
    ["Why Manvel Property Owners Trust Epic Roofing", "Modern Prairie Craftsmanship for Growing Manvel Neighborhoods"],
    ["Thorough Roof Damage Assessments in Manvel", "Comprehensive Storm Damage & Wind Uplift Assessments in Manvel"],
    ["Frequently Asked Technical Questions in Manvel", "Technical Roofing Inquiries for Manvel Property Owners"],
    ["Roofing Services for Manvel Residents", "Premium Roofing Installations & Repairs for Manvel Residents"],
    ["Manvel Roofing Questions &amp; Answers", "Important Questions & Answers on Manvel Roof Replacements"],
    ["Manvel Roofing Questions & Answers", "Important Questions & Answers on Manvel Roof Replacements"],
    ["Schedule Your Free Manvel Roof Inspection Today", "Book Your Free Manvel Roof Inspection Today"]
  ],
  "rosenberg": [
    ["Why Rosenberg Property Owners Trust Epic Roofing", "Heavy-Duty Prairie Protection for Rosenberg Properties"],
    ["Certified Storm Damage Inspections in Rosenberg", "Precision Storm Damage & Hail Inspections in Rosenberg"],
    ["Frequently Asked Technical Questions in Rosenberg", "Technical Roofing Questions from Rosenberg Property Owners"],
    ["Protecting Rosenberg Homeowners from Storm-Chaser Scams", "Guarding Rosenberg Property Owners Against Unlicensed Roofers"],
    ["Roofing Services for Rosenberg Residents", "Heavy-Duty Roofing Systems & Repairs for Rosenberg Residents"],
    ["Rosenberg Roofing Questions &amp; Answers", "Helpful Information on Rosenberg Roofing Systems"],
    ["Rosenberg Roofing Questions & Answers", "Helpful Information on Rosenberg Roofing Systems"],
    ["Schedule Your Free Rosenberg Roof Inspection Today", "Schedule Your Free Rosenberg Roof Inspection Today"]
  ],
  "webster-clear-lake": [
    ["Why Webster / Clear Lake Property Owners Trust Epic Roofing", "Aerospace-Corridor Precision & Coastal Reliability"],
    ["Engineering-Grade Roof Inspections in Clear Lake & Webster", "Aerospace-Corridor Roof Damage & Wind Assessments in Clear Lake"],
    ["Frequently Asked Technical Questions in Webster / Clear Lake", "Technical Roofing Inquiries for Clear Lake & Webster Homeowners"],
    ["Roofing Services for Webster / Clear Lake Residents", "Engineered Coastal Roofing Solutions for Webster & Clear Lake Residents"],
    ["Webster / Clear Lake Roofing Questions &amp; Answers", "Key Facts on Clear Lake Windstorm Resistance & Longevity"],
    ["Webster / Clear Lake Roofing Questions & Answers", "Key Facts on Clear Lake Windstorm Resistance & Longevity"],
    ["Schedule Your Free Webster / Clear Lake Roof Inspection Today", "Schedule Your Free Webster / Clear Lake Roof Inspection Today"]
  ]
};

const wordCountsReport = {};

for (const [key, filename] of Object.entries(filesMap)) {
  let html = fs.readFileSync(filename, 'utf8');
  const cityTitle = cityTitles[key];
  const opening = heroOpenings[key];
  const bodyText = citiesData[key];

  // 1. Update hero opening paragraph
  // In Variant B, it is <p class="hero-subtitle"...>...</p>
  // In Variant A, it is <p style="color: #CBD5E1; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">...</p>
  if (html.includes('class="hero-subtitle"')) {
    html = html.replace(/<p class="hero-subtitle"[^>]*>[\s\S]*?<\/p>/i, `<p class="hero-subtitle" style="max-width: 840px; font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.6; color: #94A3B8; margin-left: auto; margin-right: auto;">\n        ${opening}\n      </p>`);
  } else {
    html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*<p[^>]*>[\s\S]*?<\/p>/i, (match) => {
      const h1Part = match.substring(0, match.indexOf('</h1>') + 5);
      return `${h1Part}\n            <p style="color: #CBD5E1; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">\n              ${opening}\n            </p>`;
    });
  }

  // 2. Add or update dedicated section
  let dedicatedSectionHtml = '';
  const paragraphs = bodyText.split('\n\n').filter(p => p.trim());
  const formattedParas = paragraphs.map((p, idx) => {
    const isLast = idx === paragraphs.length - 1;
    return `            <p style="${isLast ? 'margin-bottom: 0;' : 'margin-bottom: 1.25rem;'}">\n              ${p.trim()}\n            </p>`;
  }).join('\n');

  if (html.includes('id="services-provided"')) {
    // Variant B
    dedicatedSectionHtml = `  <!-- LOCAL CHALLENGES & WHAT WE WATCH FOR -->\n  <section class="section-padding" id="local-challenges" style="background-color: var(--dark);">\n    <div class="container">\n      <h2 style="text-align: center;">ROOFING IN ${cityTitle.toUpperCase()}: LOCAL CHALLENGES &amp; WHAT WE WATCH FOR</h2>\n      <div style="background-color: var(--navy-light); padding: 2.25rem 2.5rem; border-radius: 8px; border: 1px solid #1E293B; max-width: 960px; margin: 2rem auto 0 auto;">\n        <div style="color: #CBD5E1; font-size: 1.02rem; line-height: 1.75;">\n${formattedParas}\n        </div>\n      </div>\n    </div>\n  </section>\n\n`;

    // Replace the existing dark section between hero and services-provided
    const darkSectionRegex = /<!-- LOCAL STORM CONTEXT & STATS -->[\s\S]*?<section class="section-padding" id="services-provided"/i;
    if (darkSectionRegex.test(html)) {
      html = html.replace(darkSectionRegex, `${dedicatedSectionHtml}  <!-- SIX MAIN SERVICES AVAILABLE IN THIS CITY -->\n  <section class="section-padding" id="services-provided"`);
    } else {
      // Fallback: replace any section with style="background-color: var(--dark);" right before services-provided
      const genericDarkRegex = /<section class="section-padding" style="background-color: var\(--dark\);">[\s\S]*?<\/section>\s*(?:<div class="shingle-divider"[\s\S]*?<\/div>\s*)?(?:<!--[^\n]*-->\s*)?<section class="section-padding" id="services-provided"/i;
      html = html.replace(genericDarkRegex, `${dedicatedSectionHtml}  <section class="section-padding" id="services-provided"`);
    }
  } else {
    // Variant A
    dedicatedSectionHtml = `    <!-- 2. LOCAL CHALLENGES & WHAT WE WATCH FOR -->\n    <section class="section-padding" id="local-challenges" style="background-color: var(--cloud-white);">\n      <div class="container">\n        <div style="max-width: 880px; margin: 0 auto;">\n          <span class="mono-badge" style="color: var(--hazard-amber); text-transform: uppercase;">Area Vulnerabilities &bull; Climate Dynamics</span>\n          <h2 style="color: var(--storm-charcoal); margin-top: 0.5rem; margin-bottom: 1.25rem;">Roofing in ${cityTitle}: Local Challenges &amp; What We Watch For</h2>\n          <div style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7;">\n${formattedParas}\n          </div>\n        </div>\n      </div>\n    </section>\n    <div class="shingle-divider" aria-hidden="true">\n  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#EBE7DE">\n    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>\n  </svg>\n</div>\n\n`;

    // In Variant A, insert dedicated section before id="why-choose-us"
    html = html.replace(/<!-- 2\. WHY HOMEOWNERS IN CITY CHOOSE US -->\s*<section class="section-padding" id="why-choose-us"/i,
      `${dedicatedSectionHtml}    <!-- 3. WHY HOMEOWNERS IN CITY CHOOSE US -->\n    <section class="section-padding" id="why-choose-us"`
    );

    // And remove old repetitive section 5 (#local-climate) and its preceding divider if present
    const climateSectionRegex = /<div class="shingle-divider"[\s\S]*?<\/div>\s*<!-- 5\. LOCAL PAIN POINT DEEP DIVE -->\s*<section class="section-grey section-padding" id="local-climate">[\s\S]*?<\/section>/i;
    html = html.replace(climateSectionRegex, '');
  }

  // 3. Apply H2 rewrites
  if (h2Replacements[key]) {
    for (const [target, replacement] of h2Replacements[key]) {
      // Replace case-insensitively or exact
      const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(<h2[^>]*>)\\s*${escaped}\\s*(</h2>)`, 'gi');
      html = html.replace(regex, `$1${replacement}$2`);
    }
  }

  // Save file
  fs.writeFileSync(filename, html, 'utf8');

  // Verify word count of the dedicated section in this file
  const sectionMatch = html.match(/id="local-challenges"[\s\S]*?<\/section>/i);
  const wc = sectionMatch ? countWords(sectionMatch[0]) : 0;
  wordCountsReport[key] = {
    file: filename,
    city: cityTitle,
    wordCount: wc,
    valid: wc >= 250 && wc <= 350
  };
}

console.log("=== FINAL VERIFIED WORD COUNT PER PAGE ===");
let allPass = true;
for (const [key, report] of Object.entries(wordCountsReport)) {
  if (!report.valid) allPass = false;
  console.log(`${report.city.padEnd(25)} (${report.file}): ${report.wordCount} words [${report.valid ? 'PASS' : 'FAIL'}]`);
}
console.log("All 23 cities PASS:", allPass);
