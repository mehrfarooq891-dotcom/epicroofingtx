const fs = require('fs');
const path = require('path');

// Helper to style contextual links
function makeLink(url, text) {
  return `<a href="${url}" style="color: var(--hazard-amber); text-decoration: underline; font-weight: 600;">${text}</a>`;
}

// -------------------------------------------------------------------------------------------------
// 1. SERVICE PAGES
// -------------------------------------------------------------------------------------------------
const servicePageUpdates = {
  "roof-repair-houston.html": [
    {
      find: "We identify damp spots around plumbing pipes, valleys, and vents.",
      replace: `We specialize in forensic ${makeLink("/roof-leak-detection-houston", "roof leak detection in Houston")} to identify hidden damp spots around plumbing pipes, valleys, and vents before water causes structural rot.`
    },
    {
      find: "Intense Texas hailstones cause structural bruising, crushing composite shingle layers and breaking the fiberglass mat.",
      replace: `When severe convective storms roll through, our certified specialists perform ${makeLink("/hail-damage-roof-repair-houston", "hail damage roof repair")} to address bruised composite layers, fractured mats, and granular dislodgement.`
    },
    {
      find: "Houston’s coastal environment forces roofing systems to expand and contract under severe heat.",
      replace: `Houston’s coastal environment forces roofing systems to expand and contract under severe heat, making routine ${makeLink("/free-roof-inspection-houston", "free roof inspections")} critical to spotting micro-fissures before heavy seasonal rains hit.`
    }
  ],

  "hail-damage-roof-repair-houston.html": [
    {
      find: "We document hail hits with chalk marks, high-resolution photography, and test squares.",
      replace: `We document hail hits with chalk marks, high-resolution photography, and test squares to support your ${makeLink("/insurance-claim-roofing-houston", "storm damage roof insurance claim")} and ensure complete adjuster alignment.`
    },
    {
      find: "Hail rarely travels alone in Southeast Texas; it is accompanied by high-velocity wind gusts.",
      replace: `Hail rarely travels alone in Southeast Texas; it is accompanied by high-velocity wind gusts that demand comprehensive ${makeLink("/storm-damage-roofing-houston", "storm damage roof restoration")} to secure loose flashing and compromised decking.`
    },
    {
      find: "If your neighborhood experienced recent hail, do not wait for ceiling leaks to appear.",
      replace: `If your neighborhood experienced recent hail, do not wait for ceiling leaks to appear—schedule a thorough ${makeLink("/free-roof-inspection-houston", "free roof damage inspection")} to evaluate shingle integrity.`
    }
  ],

  "storm-damage-roofing-houston.html": [
    {
      find: "Tropical depressions, hurricanes, and severe thunderstorms frequently generate wind speeds exceeding 60 to 80 mph.",
      replace: `Tropical depressions, hurricanes, and severe thunderstorms frequently generate wind speeds exceeding 60 to 80 mph, requiring rapid ${makeLink("/wind-damage-roof-repair-houston", "wind damage roof repairs")} to seal lifted tabs and restore wind-uplift resistance.`
    },
    {
      find: "When branches fall or decking is exposed, immediate stabilization is essential.",
      replace: `When branches fall or decking is exposed, immediate stabilization through ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping services")} prevents secondary water destruction inside your living spaces.`
    },
    {
      find: "Navigating homeowner insurance after a severe storm can be stressful and complex.",
      replace: `Navigating homeowner insurance after a severe storm can be stressful and complex, which is why our staff provides start-to-finish ${makeLink("/insurance-claim-roofing-houston", "insurance claim roofing assistance")} with detailed photographic proof.`
    }
  ],

  "roof-replacement-houston.html": [
    {
      find: "Investing in a complete roof replacement represents a major financial decision.",
      replace: `Investing in a complete roof replacement represents a major financial decision, which is why we offer flexible ${makeLink("/financing", "roof replacement financing options")} with low monthly payments to fit your family budget.`
    },
    {
      find: "For homeowners seeking the ultimate in weather resilience and modern architectural aesthetics",
      replace: `For homeowners seeking the ultimate in weather resilience and modern architectural aesthetics, engineered ${makeLink("/metal-roofing-houston", "standing seam metal roofing")} provides exceptional 150+ mph wind uplift protection and 50-year longevity.`
    },
    {
      find: "In cases where localized damage is confined to a single roof slope or flashing transition",
      replace: `In cases where localized damage is confined to a single roof slope or flashing transition, precision ${makeLink("/roof-repair-houston", "residential roof repairs")} can often extend the overall lifespan of your system without a full tear-off.`
    }
  ],

  "emergency-roof-tarping-houston.html": [
    {
      find: "Emergency tarping is a temporary protective measure designed to halt active water intrusion.",
      replace: `Emergency tarping is a temporary protective measure designed to halt active water intrusion until permanent ${makeLink("/roof-repair-houston", "architectural roof repairs")} can be safely scheduled.`
    },
    {
      find: "When hurricane eyewalls or convective microbursts compromise residential roof planes",
      replace: `When hurricane eyewalls or convective microbursts compromise residential roof planes, comprehensive ${makeLink("/storm-damage-roofing-houston", "storm damage roofing services")} are required to replace saturated insulation and broken rafters.`
    },
    {
      find: "Once the weather clears, our HAAG-certified forensicians return to complete a full forensic review.",
      replace: `Once the weather clears, our HAAG-certified forensicians return to complete a ${makeLink("/free-roof-inspection-houston", "comprehensive free roof inspection")} to document all impact points for your insurance carrier.`
    }
  ],

  "free-roof-inspection-houston.html": [
    {
      find: "Our certified inspectors examine every shingle slope, flashing joint, and drainage valley.",
      replace: `Our certified inspectors examine every shingle slope, flashing joint, and drainage valley to determine whether minor ${makeLink("/roof-repair-houston", "shingle roof repairs")} can restore watertight performance.`
    },
    {
      find: "Hail impacts leave microscopic cracks in the asphalt substrate that are invisible from ground level.",
      replace: `Hail impacts leave microscopic cracks in the asphalt substrate that are invisible from ground level, which is why specialized ${makeLink("/hail-damage-roof-repair-houston", "hail damage roof restorations")} require hands-on physical deck testing.`
    },
    {
      find: "Following intense Gulf Coast tropical fronts and seasonal thunderstorm squalls",
      replace: `Following intense Gulf Coast tropical fronts and seasonal thunderstorm squalls, our team identifies hidden ${makeLink("/storm-damage-roofing-houston", "storm damage roofing issues")} before damp decking develops structural rot.`
    }
  ],

  "chimney-flashing-repair-houston.html": [
    {
      find: "Chimneys are one of the most common sources of persistent, hard-to-find roof leaks.",
      replace: `Chimneys are one of the most common sources of persistent water stains, requiring forensic ${makeLink("/roof-leak-detection-houston", "roof leak detection")} to trace the exact pathway water travels behind brickwork.`
    },
    {
      find: "Rusted step flashing, cracked mortar joints, and degraded counter-flashing allow rain to seep directly onto interior ceilings.",
      replace: `Rusted step flashing, cracked mortar joints, and degraded counter-flashing allow rain to seep directly onto interior ceilings, demanding targeted ${makeLink("/roof-repair-houston", "roof leak repairs")} to replace rusted metals with 26-gauge galvanized steel.`
    },
    {
      find: "When severe storm winds wrench chimney flashing away during heavy downpours",
      replace: `When severe storm winds wrench chimney flashing away during heavy downpours, our 24/7 crews provide immediate ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping")} to safeguard your home until custom flashing is fabricated.`
    }
  ],

  "metal-roofing-houston.html": [
    {
      find: "Standing seam metal roofing has become the premium standard for Texas coastal living.",
      replace: `Standing seam metal roofing has become the premium standard for Texas coastal living, serving as a permanent ${makeLink("/roof-replacement-houston", "long-term roof replacement")} that resists 150+ mph hurricane wind uplift.`
    },
    {
      find: "While metal roofing carries a higher initial investment than traditional 3-tab shingles",
      replace: `While metal roofing carries a higher initial investment than traditional 3-tab shingles, our competitive ${makeLink("/financing", "roof financing programs")} allow homeowners to pay over time with manageable monthly terms.`
    },
    {
      find: "If an older metal roof suffers from loose exposed fasteners or damaged ridge seals",
      replace: `If an older metal roof suffers from loose exposed fasteners or damaged ridge seals, our technicians perform specialized ${makeLink("/roof-repair-houston", "metal roof repair services")} to re-seal seams and prevent corrosion.`
    }
  ],

  "commercial-roofing-houston.html": [
    {
      find: "Commercial low-slope and flat roof surfaces face relentless ultraviolet degradation and thermal expansion.",
      replace: `Commercial low-slope and flat roof surfaces face relentless ultraviolet degradation and thermal expansion, making monolithic ${makeLink("/roof-coating-houston", "commercial roof coating applications")} an ideal way to restore watertight integrity without costly tear-offs.`
    },
    {
      find: "Whether managing an industrial warehouse, retail strip center, or office complex",
      replace: `Whether managing an industrial warehouse, retail strip center, or office complex, property managers can ${makeLink("/contact", "contact our commercial roofing division")} for prompt on-site assessments and customized preventative maintenance.`
    },
    {
      find: "Routine commercial evaluations help identify ponding water, open seams, and failing parapet flashing early.",
      replace: `Routine commercial evaluations help identify ponding water, open seams, and failing parapet flashing early—schedule a ${makeLink("/free-roof-inspection-houston", "complimentary commercial roof inspection")} with our HAAG-certified forensicians.`
    }
  ],

  "insurance-claim-roofing-houston.html": [
    {
      find: "Hail impacts frequently produce cosmetic granule loss that insurance adjusters may initially classify as normal wear.",
      replace: `Hail impacts frequently produce cosmetic granule loss that insurance adjusters may initially classify as normal wear, making professional ${makeLink("/hail-damage-roof-repair-houston", "hail damage roof assessments")} vital to documenting broken fiberglass mats.`
    },
    {
      find: "High-wind tropical weather systems often lift shingle tabs and crack adhesive seal strips.",
      replace: `High-wind tropical weather systems often lift shingle tabs and crack adhesive seal strips, creating legitimate claims for full ${makeLink("/storm-damage-roofing-houston", "storm damage roof replacement")} under Texas property insurance policies.`
    },
    {
      find: "Before filing a formal claim with your insurance company, it is essential to have an independent contractor verify physical damage.",
      replace: `Before filing a formal claim with your insurance company, it is essential to have an independent contractor verify physical damage with a ${makeLink("/free-roof-inspection-houston", "free pre-claim roof inspection")} to avoid filing claims without compensable loss.`
    }
  ],

  "wind-damage-roof-repair-houston.html": [
    {
      find: "When severe coastal winds or severe convective thunderstorm fronts sweep across Greater Houston",
      replace: `When severe coastal winds or severe convective thunderstorm fronts sweep across Greater Houston, comprehensive ${makeLink("/storm-damage-roofing-houston", "storm damage roof repairs")} are critical to securing displaced shingles and compromised hip caps.`
    },
    {
      find: "If high winds have torn shingles from your roof deck and rain is actively penetrating your attic",
      replace: `If high winds have torn shingles from your roof deck and rain is actively penetrating your attic, our rapid-response team provides 2-hour ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping")} to seal the breach immediately.`
    },
    {
      find: "Wind uplift damage is fully covered under standard Texas residential insurance policies.",
      replace: `Wind uplift damage is fully covered under standard Texas residential insurance policies, and our experts provide end-to-end ${makeLink("/insurance-claim-roofing-houston", "roof insurance claim guidance")} to ensure all missing tabs and creased shingles are compensated.`
    }
  ],

  "gutter-installation-houston.html": [
    {
      find: "Clogged or damaged gutters cause rainwater to overflow and pool against wooden fascia boards and roof eaves.",
      replace: `Clogged or damaged gutters cause rainwater to overflow and pool against wooden fascia boards and roof eaves, requiring wood rot ${makeLink("/roof-repair-houston", "eave and roof repairs")} before new gutters are hung.`
    },
    {
      find: "When upgrading your home's total water shedding system, coordinating seamless gutter installation",
      replace: `When upgrading your home's total water shedding system, coordinating seamless gutter installation alongside a ${makeLink("/roof-replacement-houston", "full roof replacement")} ensures seamless drip edge integration and maximum manufacturer warranty coverage.`
    },
    {
      find: "If you notice water spilling over gutter edges or rotting siding during rainstorms",
      replace: `If you notice water spilling over gutter edges or rotting siding during rainstorms, book a ${makeLink("/free-roof-inspection-houston", "free roof and gutter evaluation")} to inspect drainage slopes and eave structural health.`
    }
  ],

  "roof-coating-houston.html": [
    {
      find: "Elastomeric roof coatings provide an advanced silicone or acrylic protective membrane over aging commercial roofs.",
      replace: `Elastomeric roof coatings provide an advanced silicone or acrylic protective membrane over aging flat roofs, delivering cost-effective ${makeLink("/commercial-roofing-houston", "commercial roofing restoration")} that avoids full tear-offs.`
    },
    {
      find: "Before applying any restorative coating, all compromised seams, punctures, and open parapet flashings must be properly addressed.",
      replace: `Before applying any restorative coating, all compromised seams, punctures, and open parapet flashings must receive targeted ${makeLink("/roof-repair-houston", "commercial roof repairs")} to ensure an airtight substrate.`
    },
    {
      find: "To determine if your commercial or low-slope roof is a candidate for reflective elastomeric coating",
      replace: `To determine if your commercial or low-slope roof is a candidate for reflective elastomeric coating, schedule a ${makeLink("/free-roof-inspection-houston", "free commercial roof inspection")} with our technical coating specialists.`
    }
  ],

  "tile-roofing-houston.html": [
    {
      find: "Concrete and clay tile roofs offer timeless Spanish, Mediterranean, and modern architectural elegance.",
      replace: `Concrete and clay tile roofs offer timeless Spanish, Mediterranean, and modern architectural elegance, functioning as a lifetime ${makeLink("/roof-replacement-houston", "luxury roof replacement")} built to withstand 130+ mph Gulf winds.`
    },
    {
      find: "Upgrading to a high-end tile roofing system is a substantial long-term property investment.",
      replace: `Upgrading to a high-end tile roofing system is a substantial long-term property investment; explore our tailored ${makeLink("/financing", "roof financing packages")} to spread the cost into manageable monthly installments.`
    },
    {
      find: "Broken mortar joints, cracked tiles, or degraded batten underlayment require specialized care.",
      replace: `Broken mortar joints, cracked tiles, or degraded batten underlayment require specialized care, and our craftsmen deliver precision ${makeLink("/roof-repair-houston", "tile roof repairs")} that protect the structural integrity of your underlayment.`
    }
  ],

  "affordable-roofing-houston.html": [
    {
      find: "Quality roofing protection should never be out of reach for Houston working families.",
      replace: `Quality roofing protection should never be out of reach for Houston working families, which is why we connect clients with low-interest ${makeLink("/financing", "roof financing plans")} designed for manageable monthly budgets.`
    },
    {
      find: "In many cases, an aging roof can be safely maintained through timely targeted maintenance.",
      replace: `In many cases, an aging roof can be safely maintained through timely targeted maintenance, and our ${makeLink("/roof-repair-houston", "affordable roof repair services")} fix isolated leaks without the expense of a full reroof.`
    },
    {
      find: "When an older roof has reached the end of its useful lifespan and repairs are no longer cost-effective",
      replace: `When an older roof has reached the end of its useful lifespan and repairs are no longer cost-effective, our team installs budget-friendly ${makeLink("/roof-replacement-houston", "architectural shingle replacements")} with lifetime GAF warranties.`
    }
  ],

  "financing.html": [
    {
      find: "A failing roof cannot wait for months while you save up cash for replacement costs.",
      replace: `A failing roof cannot wait for months while you save up cash for replacement costs; our competitive financing covers complete ${makeLink("/roof-replacement-houston", "residential roof replacement")} with immediate approval.`
    },
    {
      find: "We believe every homeowner deserves transparent pricing, zero hidden fees, and flexible payment terms.",
      replace: `We believe every homeowner deserves transparent pricing, zero hidden fees, and flexible payment terms through our ${makeLink("/affordable-roofing-houston", "affordable roofing options in Houston")}.`
    },
    {
      find: "Before choosing a financing plan, our certified forensicians provide an honest assessment of your home's actual damage.",
      replace: `Before choosing a financing plan, our certified forensicians provide an honest assessment of your home's actual damage with a ${makeLink("/free-roof-inspection-houston", "free roof inspection")} and itemized project estimate.`
    }
  ],

  "contact.html": [
    {
      find: "Get in touch with Epic Roofing & Construction LLC for prompt, professional roofing assistance.",
      replace: `Get in touch with Epic Roofing & Construction LLC for prompt, professional roofing assistance or to schedule your ${makeLink("/free-roof-inspection-houston", "free on-site roof inspection")} anywhere in Greater Houston.`
    },
    {
      find: "Whether you have an active ceiling leak, storm damage, or need a full roof replacement quote",
      replace: `Whether you have an active ceiling leak requiring same-day ${makeLink("/roof-repair-houston", "emergency roof repairs")} or need a full reroofing proposal, our licensed specialists are ready to help.`
    },
    {
      find: "We operate 24 hours a day, 7 days a week for active water leaks and storm damage emergencies.",
      replace: `We operate 24 hours a day, 7 days a week for active water leaks, providing rapid 2-hour dispatch for ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping")} across all local Harris and Fort Bend county communities.`
    }
  ]
};

// -------------------------------------------------------------------------------------------------
// 2. CITY PAGES (23 Pages)
// -------------------------------------------------------------------------------------------------
const cityPageServices = {
  "atascocita-kingwood-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free comprehensive roof inspection", phrase: "During every roof assessment in Atascocita and Kingwood" },
    { url: "/roof-repair-houston", anchor: "targeted roof repairs", phrase: "rotting the underlying plywood decking" },
    { url: "/gutter-installation-houston", anchor: "seamless gutter installation", phrase: "deposits hundreds of pounds of pine needles" }
  ],
  "baytown-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free roof damage inspection", phrase: "When our team inspects Baytown roofs" },
    { url: "/storm-damage-roofing-houston", anchor: "coastal storm damage roofing", phrase: "Hurricane Ike made landfall" },
    { url: "/roof-replacement-houston", anchor: "corrosion-resistant roof replacement", phrase: "rapidly oxidizes non-galvanized roofing nails" }
  ],
  "channelview-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free on-site roof inspection", phrase: "When inspecting Channelview properties" },
    { url: "/emergency-roof-tarping-houston", anchor: "emergency roof tarping", phrase: "tropical squalls from Hurricane Beryl" },
    { url: "/roof-repair-houston", anchor: "professional roof leak repairs", phrase: "expose hidden deck rot beneath unsealed shingles" }
  ],
  "conroe-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free 21-point roof inspection", phrase: "When inspecting Conroe roofs" },
    { url: "/storm-damage-roofing-houston", anchor: "storm damage roof restoration", phrase: "severe storm winds toppling tall pine timber" },
    { url: "/roof-replacement-houston", anchor: "architectural roof replacement", phrase: "routine summer temperatures in Conroe" }
  ],
  "cypress-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free hail damage inspection", phrase: "When evaluating Cypress roofs" },
    { url: "/hail-damage-roof-repair-houston", anchor: "hail damage roof repair", phrase: "Cypress sits directly within Northwest Harris County" },
    { url: "/wind-damage-roof-repair-houston", anchor: "wind damage roof repairs", phrase: "allowing high-velocity winds to funnel" }
  ],
  "deer-park-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free industrial roof assessment", phrase: "During our Deer Park inspections" },
    { url: "/wind-damage-roof-repair-houston", anchor: "wind damage roof restoration", phrase: "EF-3 tornado ripped across Southeast Harris County" },
    { url: "/roof-repair-houston", anchor: "structural roof repairs", phrase: "break down the asphalt binder oils" }
  ],
  "friendswood-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free residential roof inspection", phrase: "Our Friendswood inspection process" },
    { url: "/roof-leak-detection-houston", anchor: "precision roof leak detection", phrase: "letting water seep beneath shingle laps" },
    { url: "/roof-repair-houston", anchor: "specialized roof repairs", phrase: "creates persistent challenges for residential roofing" }
  ],
  "galveston-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free windstorm roof inspection", phrase: "Our specialized Galveston inspections evaluate" },
    { url: "/storm-damage-roofing-houston", anchor: "hurricane storm damage restoration", phrase: "Hurricane Ike battered Galveston" },
    { url: "/wind-damage-roof-repair-houston", anchor: "high-wind roof repairs", phrase: "140-plus mph wind uplift resistance" }
  ],
  "humble-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free attic and roof inspection", phrase: "During our Humble inspections" },
    { url: "/roof-repair-houston", anchor: "flashing and roof repair", phrase: "produce continuous low-frequency acoustic vibrations" },
    { url: "/storm-damage-roofing-houston", anchor: "severe storm damage repairs", phrase: "toppled pine trees across Kenswick" }
  ],
  "katy-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free forensic roof inspection", phrase: "Our Katy inspections focus on" },
    { url: "/hail-damage-roof-repair-houston", anchor: "hail damage roof repair", phrase: "position in the Fort Bend-Harris County hail corridor" },
    { url: "/roof-leak-detection-houston", anchor: "roof leak detection", phrase: "stresses structural roof trusses and can pull valley flashing joints apart" }
  ],
  "la-porte-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free coastal roof inspection", phrase: "Our forensic inspections in La Porte" },
    { url: "/wind-damage-roof-repair-houston", anchor: "wind damage roof repair", phrase: "sustained 85-plus mph wind gusts" },
    { url: "/storm-damage-roofing-houston", anchor: "hurricane storm damage restoration", phrase: "Hurricane Ike’s eyewall struck the bay coastline" }
  ],
  "league-city-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free windstorm roof evaluation", phrase: "Our League City roofing specialists inspect" },
    { url: "/wind-damage-roof-repair-houston", anchor: "wind-resistant roof repairs", phrase: "Texas Department of Insurance (TDI) and TWIA windstorm building standards" },
    { url: "/insurance-claim-roofing-houston", anchor: "storm insurance claim guidance", phrase: "flooded attic spaces across waterfront subdivisions" }
  ],
  "manvel-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free builder-grade roof inspection", phrase: "During our Manvel inspections" },
    { url: "/wind-damage-roof-repair-houston", anchor: "prairie wind damage repair", phrase: "unimpeded southerly Gulf winds" },
    { url: "/insurance-claim-roofing-houston", anchor: "roof insurance claim assistance", phrase: "wind crease damage that qualifies for insurance replacement" }
  ],
  "missouri-city-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free HAAG-certified roof inspection", phrase: "When inspecting Missouri City roofs" },
    { url: "/roof-repair-houston", anchor: "HOA-compliant roof repairs", phrase: "strict HOA architectural review committee standards" },
    { url: "/hail-damage-roof-repair-houston", anchor: "hail and storm restoration", phrase: "tested roof flashing along dormers" }
  ],
  "pasadena-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free property roof evaluation", phrase: "Our Pasadena inspection protocol checks" },
    { url: "/roof-replacement-houston", anchor: "complete roof replacement", phrase: "require reinforcement during roof replacement" },
    { url: "/emergency-roof-tarping-houston", anchor: "emergency roof tarping", phrase: "rare EF-3 tornado tore a path of destruction" }
  ],
  "pearland-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free comprehensive roof inspection", phrase: "When inspecting Pearland roofs" },
    { url: "/roof-replacement-houston", anchor: "full roof replacement", phrase: "reaching the 20-to-25-year threshold" },
    { url: "/insurance-claim-roofing-houston", anchor: "storm damage insurance claims", phrase: "navigate the insurance claims process" }
  ],
  "richmond-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free residential roof assessment", phrase: "Our Richmond inspections check" },
    { url: "/hail-damage-roof-repair-houston", anchor: "hail damage roof repair", phrase: "supercells that produce damaging hail" },
    { url: "/roof-repair-houston", anchor: "valley and deck repairs", phrase: "trapping moisture and promoting wood rot" }
  ],
  "rosenberg-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free attic and roof inspection", phrase: "During our Rosenberg roof evaluations" },
    { url: "/roof-replacement-houston", anchor: "durable roof replacement", phrase: "builder-grade 3-tab shingles installed" },
    { url: "/wind-damage-roof-repair-houston", anchor: "prairie wind damage repairs", phrase: "snapped unbonded 3-tab shingles" }
  ],
  "spring-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free roof health inspection", phrase: "Our Spring inspection protocol focuses" },
    { url: "/roof-repair-houston", anchor: "architectural roof repairs", phrase: "hold rainwater against shingle edges" },
    { url: "/gutter-installation-houston", anchor: "seamless gutter replacement", phrase: "standard aluminum gutters also clog quickly" }
  ],
  "sugar-land-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free certified roof inspection", phrase: "When evaluating Sugar Land properties" },
    { url: "/roof-replacement-houston", anchor: "HOA-approved roof replacement", phrase: "First Colony Community Association or individual neighborhood" },
    { url: "/roof-leak-detection-houston", anchor: "precision leak detection", phrase: "tested roof flashing around masonry chimneys" }
  ],
  "the-woodlands-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free DSC-compliant roof inspection", phrase: "Our Woodlands specialists ensure full Township DSC compliance" },
    { url: "/roof-repair-houston", anchor: "pine needle valley repairs", phrase: "rot the underlying plywood decking" },
    { url: "/gutter-installation-houston", anchor: "protective gutter installation", phrase: "continuous organic matter into valleys and gutters" }
  ],
  "tomball-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free on-site roof inspection", phrase: "During our Tomball inspections" },
    { url: "/roof-repair-houston", anchor: "pipe boot and roof repairs", phrase: "cracked pipe flashings, pulled nails" },
    { url: "/chimney-flashing-repair-houston", anchor: "chimney and transition flashing repair", phrase: "worn fascia boards often need repair" }
  ],
  "webster-clear-lake-tx-roofing-contractor.html": [
    { url: "/free-roof-inspection-houston", anchor: "free coastal roof inspection", phrase: "Our Clear Lake inspections evaluate" },
    { url: "/wind-damage-roof-repair-houston", anchor: "wind-locked roof repair", phrase: "coastal windstorm catastrophe zone" },
    { url: "/roof-repair-houston", anchor: "marine-grade roof repairs", phrase: "rapidly oxidizes standard steel roofing nails" }
  ]
};

// -------------------------------------------------------------------------------------------------
// EXECUTION SCRIPT
// -------------------------------------------------------------------------------------------------
let totalLinksAdded = 0;
const pagesUpdatedList = [];

// Apply Service Page Updates
console.log("=== UPDATING SERVICE PAGES ===");
for (const [filename, updates] of Object.entries(servicePageUpdates)) {
  if (!fs.existsSync(filename)) {
    console.log(`File not found: ${filename}`);
    continue;
  }
  let html = fs.readFileSync(filename, 'utf8');
  let count = 0;
  for (const item of updates) {
    if (html.includes(item.find)) {
      html = html.replace(item.find, item.replace);
      count++;
    } else {
      console.log(`  [WARN] ${filename}: Could not find snippet "${item.find.substring(0, 40)}..."`);
    }
  }
  if (count > 0) {
    fs.writeFileSync(filename, html, 'utf8');
    totalLinksAdded += count;
    pagesUpdatedList.push({ file: filename, count, type: "Service" });
    console.log(`  ${filename.padEnd(38)}: Added ${count} links`);
  }
}

// Apply City Page Updates
console.log("\n=== UPDATING CITY PAGES ===");
for (const [filename, linkConfigs] of Object.entries(cityPageServices)) {
  if (!fs.existsSync(filename)) {
    console.log(`File not found: ${filename}`);
    continue;
  }
  let html = fs.readFileSync(filename, 'utf8');
  let count = 0;

  for (const config of linkConfigs) {
    // Find the sentence containing config.phrase inside <p>...</p>
    const regex = new RegExp(`(<p[^>]*>[\\s\\S]*?)(${config.phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})([\\s\\S]*?<\\/p>)`, 'i');
    if (regex.test(html)) {
      // Replace the phrase with phrase + contextual link anchor
      const linkTag = makeLink(config.url, config.anchor);
      html = html.replace(regex, (match, pStart, phraseMatch, pEnd) => {
        // Construct replacement smoothly
        let updatedPhrase = phraseMatch;
        if (config.url === "/free-roof-inspection-houston") {
          updatedPhrase = `${phraseMatch}, including a ${linkTag},`;
        } else if (config.url.includes("hail")) {
          updatedPhrase = `${phraseMatch}, which frequently requires specialized ${linkTag},`;
        } else if (config.url.includes("wind")) {
          updatedPhrase = `${phraseMatch} that demands certified ${linkTag}`;
        } else if (config.url.includes("tarp")) {
          updatedPhrase = `${phraseMatch} where immediate ${linkTag} is vital`;
        } else if (config.url.includes("gutter")) {
          updatedPhrase = `${phraseMatch} unless protected by heavy-gauge ${linkTag}`;
        } else if (config.url.includes("replacement")) {
          updatedPhrase = `${phraseMatch} necessitating a long-term ${linkTag}`;
        } else {
          updatedPhrase = `${phraseMatch} (calling for prompt ${linkTag})`;
        }
        return `${pStart}${updatedPhrase}${pEnd}`;
      });
      count++;
    } else {
      console.log(`  [WARN] ${filename}: Could not find phrase "${config.phrase.substring(0, 35)}..."`);
    }
  }

  if (count > 0) {
    fs.writeFileSync(filename, html, 'utf8');
    totalLinksAdded += count;
    pagesUpdatedList.push({ file: filename, count, type: "City" });
    console.log(`  ${filename.padEnd(46)}: Added ${count} links`);
  }
}

console.log(`\nService & City Pages Updated: ${pagesUpdatedList.length}, Links Added: ${totalLinksAdded}`);
