const fs = require('fs');
const path = require('path');

function makeLink(url, text) {
  return `<a href="${url}" style="color: var(--hazard-amber); text-decoration: underline; font-weight: 600;">${text}</a>`;
}

// =============================================================================
// PART 1: SERVICE PAGES
// =============================================================================
const serviceUpdates = [
  {
    file: "roof-repair-houston.html",
    replacements: [
      {
        find: "We identify damp spots around plumbing pipes and stop active water infiltration.",
        replace: `We utilize forensic ${makeLink("/roof-leak-detection-houston", "roof leak detection in Houston")} to identify damp spots around plumbing pipes and stop active water infiltration.`
      },
      {
        find: "Intense Texas hailstones cause structural bruising, crushing composite shingle layers and breaking the water-tight shield.",
        replace: `Intense Texas hailstones cause structural bruising, crushing composite shingle layers and breaking the water-tight shield; our specialized ${makeLink("/hail-damage-roof-repair-houston", "hail damage roof repair")} restores compromised impact zones.`
      }
    ]
  },
  {
    file: "hail-damage-roof-repair-houston.html",
    replacements: [
      {
        find: "Let's explore the science of how freezing ice blocks falling at 80+ MPH destroy roofing membranes, leading to long-term framing rot.",
        replace: `Let's explore the science of how freezing ice blocks falling at 80+ MPH destroy roofing membranes, leading to long-term framing rot, and why scheduling a ${makeLink("/free-roof-inspection-houston", "free roof inspection")} is the crucial first step.`
      },
      {
        find: "Hail impact compresses the pliable asphalt layer down. This creates deep \"bruises,\" fracturing the structural weave of the inner fiberglass backing mat.",
        replace: `Hail impact compresses the pliable asphalt layer down. This creates deep \"bruises,\" fracturing the structural weave of the inner fiberglass backing mat—requiring comprehensive ${makeLink("/storm-damage-roofing-houston", "storm damage roof restoration")}.`
      },
      {
        find: "Fractured backing mats expand during freezing and summer expansion cycles. Within 12-18 months, water seeps through, rotting decking boards and attic insulation.",
        replace: `Fractured backing mats expand during freezing and summer expansion cycles. Within 12-18 months, water seeps through, rotting decking boards and attic insulation, which qualifies for a full ${makeLink("/insurance-claim-roofing-houston", "roof insurance claim replacement")} under most Texas policies.`
      }
    ]
  },
  {
    file: "storm-damage-roofing-houston.html",
    replacements: [
      {
        find: "More recently, intense tropical cycles like Hurricane Beryl have shown that local roofing systems face constant wind shear and impact hazards.",
        replace: `More recently, intense tropical cycles like Hurricane Beryl have shown that local roofing systems face constant wind shear and impact hazards requiring dedicated ${makeLink("/wind-damage-roof-repair-houston", "wind damage roof repair")}.`
      },
      {
        find: "From small hail strikes to major hurricane damage, our specialized crews resolve structural issues quickly.",
        replace: `From small hail strikes to major hurricane damage, our specialized crews resolve structural issues quickly, deploying 24/7 ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping")} to stabilize compromised sections.`
      },
      {
        find: "Hail damage roofing houston is complex. Hail bruising dents the underlying reinforcing mats and strips protective asphalt granules, exposing the bare structural materials underneath.",
        replace: `Hail damage roofing houston is complex. Hail bruising dents the underlying reinforcing mats and strips protective asphalt granules, exposing bare structural materials and initiating your ${makeLink("/insurance-claim-roofing-houston", "storm damage insurance claim")}.`
      }
    ]
  },
  {
    file: "roof-replacement-houston.html",
    replacements: [
      {
        find: "Selecting the correct outer barrier protects your attic from severe Texas summer humidity and physical coastal storm impacts.",
        replace: `Selecting the correct outer barrier protects your attic from severe Texas summer humidity and physical coastal storm impacts, backed by flexible ${makeLink("/financing", "roof replacement financing options")}.`
      },
      {
        find: "40-50 year life panel system. Reflects severe Gulf Coast heat rays, resulting in extreme energy savings and high impact resistance.",
        replace: `For the pinnacle of storm durability, an engineered ${makeLink("/metal-roofing-houston", "standing seam metal roofing")} system provides a 40-50 year life panel system that reflects severe Gulf Coast heat rays, resulting in extreme energy savings and high impact resistance.`
      },
      {
        find: "Most popular, cost-effective, 25-30 year life service. Heavy-grade architectural options offer high hurricane wind rating defenses.",
        replace: `Most popular, cost-effective, 25-30 year life service. When damage is isolated to a single plane, targeted ${makeLink("/roof-repair-houston", "residential roof repairs")} can often preserve your existing structure without a full reroof.`
      }
    ]
  },
  {
    file: "emergency-roof-tarping-houston.html",
    replacements: [
      {
        find: "Heavy oak branches snap and crash through roof framing. This leaves structural holes that catch water instantly, requiring quick structural tarping.",
        replace: `Heavy oak branches snap and crash through roof framing. This leaves structural holes that catch water instantly, requiring quick structural tarping before comprehensive ${makeLink("/storm-damage-roofing-houston", "storm damage roofing repairs")} begin.`
      },
      {
        find: "High winds strip shingle blocks entirely off decking. Exposed underlayment paper will split and rot quickly under Texas shower lines.",
        replace: `High winds strip shingle blocks entirely off decking. Exposed underlayment paper will split and rot quickly under Texas shower lines, demanding permanent ${makeLink("/roof-repair-houston", "architectural roof repairs")} once the storm clears.`
      },
      {
        find: "Unlike standard blue plastic sheets that easily tear in weak breezes, professional tarping relies on heavy, UV-inhibited polymer membranes.",
        replace: `Unlike standard blue plastic sheets that easily tear in weak breezes, professional tarping relies on heavy, UV-inhibited polymer membranes followed by a ${makeLink("/free-roof-inspection-houston", "free 21-point roof inspection")} to document the total scope of loss.`
      }
    ]
  },
  {
    file: "free-roof-inspection-houston.html",
    replacements: [
      {
        find: "Because high-velocity hailstones crush the protective asphalt binder directly into the fiberglass reinforcement mat, the shattered substrate absorbs moisture during Houston humid cycles.",
        replace: `Because high-velocity hailstones crush the protective asphalt binder directly into the fiberglass reinforcement mat, the shattered substrate absorbs moisture during Houston humid cycles, requiring specialized ${makeLink("/hail-damage-roof-repair-houston", "hail damage roof restoration")}.`
      },
      {
        find: "We locate horizontal folding crease marks along shingle overlaps, indicating wind lift stress that broke the adhesive sealant strip.",
        replace: `We locate horizontal folding crease marks along shingle overlaps, indicating wind lift stress that broke the adhesive sealant strip and necessitate timely ${makeLink("/roof-repair-houston", "shingle roof repairs")}.`
      },
      {
        find: "Active valleys handle massive water loads. We verify underlayment condition, rust, and physical wear patterns on metal valley channels.",
        replace: `Active valleys handle massive water loads. We verify underlayment condition, rust, and physical wear patterns on metal valley channels to identify hidden ${makeLink("/storm-damage-roofing-houston", "storm damage roofing issues")} before interior ceilings stain.`
      }
    ]
  },
  {
    file: "chimney-flashing-repair-houston.html",
    replacements: [
      {
        find: "While wind-blown shingles produce immediate, obvious damage, compromised flashing acts as a slow, hidden gateway for rainwater during Houston's notorious tropical storms.",
        replace: `While wind-blown shingles produce immediate, obvious damage, compromised flashing acts as a slow, hidden gateway for rainwater during Houston's notorious tropical storms, requiring forensic ${makeLink("/roof-leak-detection-houston", "roof leak detection")} to trace the moisture.`
      },
      {
        find: "Chimneys intersect the roof plane at right angles, catching massive water runoff. If the counter flashing isn’t properly reglet-cut into brick mortar joints, wind-driven rain penetrates straight behind the masonry facade.",
        replace: `Chimneys intersect the roof plane at right angles, catching massive water runoff. If the counter flashing isn’t properly reglet-cut into brick mortar joints, wind-driven rain penetrates straight behind the masonry facade, requiring precision ${makeLink("/roof-repair-houston", "roof flashing repairs")}.`
      },
      {
        find: "Where two-story walls, dormers, or porch roofs meet an upper slope, overlapping step flashing pieces must be woven beneath each shingle row.",
        replace: `Where two-story walls, dormers, or porch roofs meet an upper slope, overlapping step flashing pieces must be woven beneath each shingle row; in storm emergencies, rapid ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping")} prevents water from saturating interior drywall.`
      }
    ]
  },
  {
    file: "metal-roofing-houston.html",
    replacements: [
      {
        find: "Features vertical interlocking panels with hidden floating fasteners that isolate thermal movement. Zero exposed screws means 100% leak protection.",
        replace: `Features vertical interlocking panels with hidden floating fasteners that isolate thermal movement. As a permanent ${makeLink("/roof-replacement-houston", "hurricane-rated roof replacement")}, zero exposed screws means 100% leak protection.`
      },
      {
        find: "Traditional shingle products cook under the Texas sun, splitting and curling within 12 years. Our metal panels offer distinct structural superiorities:",
        replace: `Traditional shingle products cook under the Texas sun, splitting and curling within 12 years. Our competitive ${makeLink("/financing", "roof financing options")} make upgrading to standing seam metal affordable with low monthly payments.`
      },
      {
        find: "Constructed of high-strength stamped steel or copper. Replicates the rich shadows of standard slate, barrel clay, or premium cedar shakes while providing 24-gauge storm durability.",
        replace: `Constructed of high-strength stamped steel or copper. Replicates the rich shadows of standard slate, barrel clay, or premium cedar shakes while providing 24-gauge storm durability. For damaged older systems, we also provide specialized ${makeLink("/roof-repair-houston", "metal roof repairs")}.`
      }
    ]
  },
  {
    file: "commercial-roofing-houston.html",
    replacements: [
      {
        find: "Highly reflective Thermoplastic Polyolefin single-ply membranes reduce structural cooling costs. Our hot-air welded seams withstand high winds and severe UV exposure.",
        replace: `Highly reflective Thermoplastic Polyolefin single-ply membranes reduce structural cooling costs, and when combined with elastomeric ${makeLink("/roof-coating-houston", "commercial roof coatings")}, can extend flat roof life by 15+ years.`
      },
      {
        find: "We hold certified alignments with leading national manufacturers, deploying premium structural materials backed by multi-decade warranties.",
        replace: `We hold certified alignments with leading national manufacturers, deploying premium structural materials backed by multi-decade warranties; ${makeLink("/contact", "contact our commercial roofing division")} for customized property management estimates.`
      },
      {
        find: "Interlocking structural metal panels conceal anchors to resist 140+ MPH hurricane-force winds. Ideal for multi-family, school, and modern commercial builds.",
        replace: `Interlocking structural metal panels conceal anchors to resist 140+ MPH hurricane-force winds. Ideal for multi-family, school, and modern commercial builds, backed by a ${makeLink("/free-roof-inspection-houston", "free commercial roof inspection")}.`
      }
    ]
  },
  {
    file: "insurance-claim-roofing-houston.html",
    replacements: [
      {
        find: "Navigating the insurance claims cycle can seem daunting. We split it into 8 secure steps so you know exactly where your replacement stand.",
        replace: `Navigating the insurance claims cycle can seem daunting. We split it into 8 secure steps starting with an on-site ${makeLink("/free-roof-inspection-houston", "free roof damage inspection")} so you know exactly where your replacement stands.`
      },
      {
        find: "Our HAAG-certified experts run a forensic site assessment. We inspect shingles, gutters, chimney flashing, valleys, and vents to locate dynamic hail fractures and shingle liftoff.",
        replace: `Our HAAG-certified experts run a forensic site assessment. We inspect shingles, gutters, chimney flashing, valleys, and vents to document ${makeLink("/hail-damage-roof-repair-houston", "hail damage roof repair")} criteria and shingle liftoff.`
      },
      {
        find: "We compile high-resolution, scale-measured photo evidence, drone scans, moisture indices, and weather reports confirming exact storm calendar dates in Houston.",
        replace: `We compile high-resolution, scale-measured photo evidence, drone scans, moisture indices, and weather reports confirming exact storm calendar dates in Houston to ensure full coverage for ${makeLink("/storm-damage-roofing-houston", "storm damage roofing claims")}.`
      }
    ]
  },
  {
    file: "wind-damage-roof-repair-houston.html",
    replacements: [
      {
        find: "When high gusts catch aged, dry, or poorly nailed shingles, they rip the entire piece cleanly off the deck, exposing the underlying roofing paper and raw OSB sheathing sheets directly to the downpour.",
        replace: `When high gusts catch aged, dry, or poorly nailed shingles, they rip the entire piece cleanly off the deck, exposing underlying paper directly to the downpour—demanding rapid ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping")}.`
      },
      {
        find: "High velocity air movement doesn't strike roofs equally. It creates specific structural stress zones that fail during severe gulf storms.",
        replace: `High velocity air movement doesn't strike roofs equally. It creates specific structural stress zones that fail during severe gulf storms, requiring full-scope ${makeLink("/storm-damage-roofing-houston", "storm damage roof restoration")}.`
      },
      {
        find: "The edges and corners of your roof structure bear the strongest focal uplift pressures. If starter course pathways or drip edges lack structural asphalt cement seals, the wind peels massive shingle sheets backward.",
        replace: `The edges and corners of your roof structure bear the strongest focal uplift pressures. If starter courses lack seals, wind peels shingle sheets backward, creating valid grounds for a ${makeLink("/insurance-claim-roofing-houston", "wind damage roof insurance claim")}.`
      }
    ]
  },
  {
    file: "gutter-installation-houston.html",
    replacements: [
      {
        find: "Houston receives over 50 inches of annual rainfall, often delivered in intense tropical downpours and severe thunderstorms. Without properly sized and pitched gutters, this water volume creates costly structural damage.",
        replace: `Houston receives over 50 inches of annual rainfall, often delivered in intense tropical downpours and severe thunderstorms. Schedule a ${makeLink("/free-roof-inspection-houston", "free roof and drainage inspection")} to assess your home's water management.`
      },
      {
        find: "Standard 5-inch sectioned gutters easily overflow during Gulf Coast cloudbursts. We install oversized 6-inch seamless systems with heavy-flow downspouts to handle high water volume without backing up.",
        replace: `Standard 5-inch sectioned gutters easily overflow during Gulf Coast cloudbursts, rotting fascia and eave framing that require structural ${makeLink("/roof-repair-houston", "eave and roof repairs")}.`
      },
      {
        find: "Houston's expansive clay soil swells when wet and shrinks when dry. Uncontrolled roof runoff dumping right at the foundation line causes soil erosion, slab shifting, interior drywall cracks, and costly leveling repairs.",
        replace: `Houston's expansive clay soil swells when wet and shrinks when dry. When coordinating new seamless gutters alongside a ${makeLink("/roof-replacement-houston", "complete roof replacement")}, we ensure integrated drip edge flashing and foundation protection.`
      }
    ]
  },
  {
    file: "roof-coating-houston.html",
    replacements: [
      {
        find: "Selecting the correct material chemistry matches your architectural profile, drainage slopes, and capital projections perfectly:",
        replace: `Selecting the correct material chemistry matches your architectural profile, drainage slopes, and capital projections perfectly, complementing our full suite of ${makeLink("/commercial-roofing-houston", "commercial roofing systems")}.`
      },
      {
        find: "The ultimate standard. Solvent-free and constructed from dense liquid silicone. It stands as 100% waterproof and chemically immune to continuous subset ponding rainwater, making it perfect for flat commercial complexes.",
        replace: `The ultimate standard. Solvent-free and constructed from dense liquid silicone. Before coating, open seams and punctures receive precision ${makeLink("/roof-repair-houston", "commercial roof repairs")} to ensure a clean, stable foundation.`
      },
      {
        find: "Constructed of high-grade flexible polymers that expand and contract over 300% during rapid temperature swings without tearing.",
        replace: `Constructed of high-grade flexible polymers that expand and contract over 300% during rapid temperature swings without tearing; book a ${makeLink("/free-roof-inspection-houston", "free commercial roof evaluation")} to test coating viability.`
      }
    ]
  },
  {
    file: "tile-roofing-houston.html",
    replacements: [
      {
        find: "While both structural products deliver incredible elegance and longevity, understanding their specific material dynamics protects your roof investment capital:",
        replace: `While both structural products deliver incredible elegance and longevity, investing in a lifetime ${makeLink("/roof-replacement-houston", "tile roof replacement")} shields your home against 140+ mph coastal winds.`
      },
      {
        find: "Manufactured from high-density Portland cement, structural sands, and mineral oxides. Features incredible mechanical density, making it extremely walk-tolerant and highly customizable to simulate flat wood slate, shake, or standard tiles.",
        replace: `Manufactured from high-density Portland cement, structural sands, and mineral oxides. Explore our convenient ${makeLink("/financing", "roof replacement financing plans")} to spread the cost into predictable monthly payments.`
      },
      {
        find: "The S-profile barrel curves create a continuous under-tile buffer. This dynamic structural gap guides cooler air upward from eave vents, venting out hot attic pocket spaces.",
        replace: `The S-profile barrel curves create a continuous under-tile buffer. This dynamic structural gap guides cooler air upward from eave vents, while our certified crews perform targeted ${makeLink("/roof-repair-houston", "tile roof repairs")} to replace damaged mortar and cracked tiles.`
      }
    ]
  },
  {
    file: "affordable-roofing-houston.html",
    replacements: [
      {
        find: "When many homeowners search for an affordable roofing contractor in Houston, TX , they worry that \"affordable\" means cheap, sub-standard materials, unlicensed labor, or cut corners that lead to chronic leaks. At Epic Roofing TX, we reject that trade-off entirely.",
        replace: `When many homeowners search for an affordable roofing contractor in Houston, TX , they worry that \"affordable\" means cheap materials or cut corners. We offer competitive ${makeLink("/financing", "low-APR roof financing options")} to make elite protection accessible.`
      },
      {
        find: "To us, genuine affordability means delivering maximum long-term value per dollar spent. It means installing manufacturer-warrantied GAF, Owens Corning, or CertainTeed roofing systems that withstand severe Gulf Coast weather, while eliminating the unnecessary corporate overhead, excessive sales commissions, and inflated price gouging common among large national storm franchises.",
        replace: `To us, genuine affordability means delivering maximum value per dollar spent. Often, isolated leaks can be resolved through affordable ${makeLink("/roof-repair-houston", "residential roof repairs")} without the cost of a full reroof.`
      },
      {
        find: "We operate with streamlined local crews, direct manufacturer distributor purchasing power, and itemized transparent pricing. You get full structural protection, local Texas accountability, and zero hidden costs.",
        replace: `We operate with streamlined local crews, direct manufacturer distributor purchasing power, and itemized transparent pricing when installing a budget-conscious ${makeLink("/roof-replacement-houston", "architectural roof replacement")}.`
      }
    ]
  },
  {
    file: "financing.html",
    replacements: [
      {
        find: "When severe hail fractures or high-speed Gulf wind shears strike, postponing restoration is the most expensive mistake a Houston homeowner can make. In our intense Texas heat and extreme atmospheric humidity, a tiny leak in the ridge line doesn't stay small for long.",
        replace: `When severe hail fractures or high-speed Gulf wind shears strike, postponing restoration is the most expensive mistake a Houston homeowner can make; our zero-down financing covers full ${makeLink("/roof-replacement-houston", "residential roof replacement")} immediately.`
      },
      {
        find: "Delaying a roof because of tight cash flow can turn a manageable shingle repair into a complex, multi-thousand-dollar structural overhaul. Roof financing empowers you to secure your home's shield today, keeping water out while preserving your personal cash flow.",
        replace: `Delaying a roof because of tight cash flow can turn a manageable shingle repair into a complex overhaul. Discover our transparent, ${makeLink("/affordable-roofing-houston", "affordable roofing options in Houston")} designed to stop water intrusion within your monthly budget.`
      },
      {
        find: "We partner with premier Texas home-improvement lenders to deliver flexible financing plans tailored for every household budget.",
        replace: `We partner with premier Texas home-improvement lenders to deliver flexible financing plans, starting with a ${makeLink("/free-roof-inspection-houston", "free roof damage inspection")} to give you an exact itemized estimate.`
      }
    ]
  },
  {
    file: "contact.html",
    replacements: [
      {
        find: "Active wind leaks, sliding shingles, or structural tarping emergencies? Call us instantly at +1 (281) 326-9905 . We dispatch crew trucks day and night.",
        replace: `Active wind leaks, sliding shingles, or structural tarping emergencies? Call us instantly at +1 (281) 326-9905 for same-day ${makeLink("/roof-repair-houston", "emergency roof repair")}. We dispatch crew trucks day and night.`
      },
      {
        find: "Whether you want to text an assessor, launch a WhatsApp thread, or visit our administration maps, we make reaching us friction-free.",
        replace: `Whether you want to text an assessor, launch a WhatsApp thread, or schedule a ${makeLink("/free-roof-inspection-houston", "free 21-point roof inspection")}, we make reaching us friction-free.`
      },
      {
        find: "Fill out this form directly to feed your details to our field estimator. Submitted through secure GAF compliance. Form integrates directly with active email triggers.",
        replace: `Fill out this form directly to feed your details to our field estimator, including immediate dispatch requests for ${makeLink("/emergency-roof-tarping-houston", "emergency roof tarping")}.`
      }
    ]
  }
];

let serviceCount = 0;
for (const item of serviceUpdates) {
  let html = fs.readFileSync(item.file, 'utf8');
  let fileUpdated = 0;
  for (const r of item.replacements) {
    if (html.includes(r.find)) {
      html = html.replace(r.find, r.replace);
      fileUpdated++;
      serviceCount++;
    } else {
      console.log(`[WARN] Service snippet not found in ${item.file}: "${r.find.substring(0, 35)}..."`);
    }
  }
  fs.writeFileSync(item.file, html, 'utf8');
  console.log(`Updated ${item.file}: ${fileUpdated} links`);
}

// =============================================================================
// PART 2: CITY PAGES (REMAINING 7 CITIES TO ENSURE ALL 23 HAVE 3 LINKS)
// =============================================================================
const remainingCityUpdates = [
  {
    file: "baytown-tx-roofing-contractor.html",
    find: "swiftly oxidizes non-galvanized roofing nails",
    replace: `swiftly oxidizes non-galvanized roofing nails, calling for corrosion-resistant ${makeLink("/roof-replacement-houston", "architectural roof replacement")},`
  },
  {
    file: "channelview-tx-roofing-contractor.html",
    find: "Many of these homes still rest on original plywood decking",
    replace: `Many of these homes still rest on original plywood decking requiring specialized ${makeLink("/roof-repair-houston", "roof deck repairs")}`
  },
  {
    file: "conroe-tx-roofing-contractor.html",
    find: "demand premium architectural roofing capable of enduring intense summer heat cycles",
    replace: `demand premium architectural ${makeLink("/roof-replacement-houston", "roof replacement")} capable of enduring intense summer heat cycles`
  },
  {
    file: "deer-park-tx-roofing-contractor.html",
    find: "break down the asphalt binder oils that hold protective ceramic granules in place.",
    replace: `break down the asphalt binder oils that hold protective ceramic granules in place, demanding structural ${makeLink("/roof-repair-houston", "roof shingle repairs")}.`
  },
  {
    file: "league-city-roofing-contractor.html",
    find: "Texas Department of Insurance (TDI) and TWIA windstorm building standards",
    replace: `Texas Department of Insurance (TDI) and TWIA windstorm building standards for ${makeLink("/wind-damage-roof-repair-houston", "wind damage roof repairs")}`
  },
  {
    file: "pasadena-tx-roofing-contractor.html",
    find: "Many older Pasadena homes feature original 1x6 tongue-and-groove decking or aged plywood",
    replace: `Many older Pasadena homes feature original 1x6 tongue-and-groove decking or aged plywood that requires reinforced ${makeLink("/roof-replacement-houston", "roof replacement")}`
  },
  {
    file: "the-woodlands-roofing-contractor.html",
    find: "rot the underlying plywood decking",
    replace: `rot the underlying plywood decking unless protected by regular maintenance and ${makeLink("/gutter-installation-houston", "seamless gutter installation")}`
  }
];

let cityCount = 0;
for (const item of remainingCityUpdates) {
  let html = fs.readFileSync(item.file, 'utf8');
  if (html.includes(item.find)) {
    html = html.replace(item.find, item.replace);
    fs.writeFileSync(item.file, html, 'utf8');
    cityCount++;
    console.log(`Updated city link in ${item.file}`);
  } else {
    console.log(`[WARN] City snippet not found in ${item.file}: "${item.find.substring(0, 35)}..."`);
  }
}

console.log(`\nService links added: ${serviceCount}`);
console.log(`Remaining city links added: ${cityCount}`);
