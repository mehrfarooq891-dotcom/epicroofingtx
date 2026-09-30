const fs = require('fs');

function countWords(str) {
  const text = str
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(/\s+/).length : 0;
}

// Load verified city text
const { citiesData } = require('./build-city-data.js');

const heroOpenings = {
  "atascocita-kingwood-tx-roofing-contractor.html": "Nestled along the northeastern rim of Harris County, homes in Kingwood and Atascocita live under an extraordinary canopy of towering loblolly pines and water oaks that deliver welcome summer shade but subject asphalt shingles to relentless organic decay and severe wind-driven branch impacts.",
  "baytown-tx-roofing-contractor.html": "Bordered by Upper Galveston Bay and the industrial waterway of the Houston Ship Channel, Baytown properties endure a relentless combination of corrosive saltwater humidity, chemical vapor fallout, and powerful coastal storm fronts that rapidly degrade substandard roofing materials.",
  "channelview-tx-roofing-contractor.html": "Flanked by the busy industrial bends of the Houston Ship Channel and the San Jacinto River, Channelview residences need rugged, hurricane-reinforced roofing systems engineered to withstand both heavy industrial emissions and violent Gulf Coast thunderstorm squalls.",
  "conroe-tx-roofing-contractor.html": "Rapidly expanding through the dense pine woodlands of Montgomery County along Interstate 45 and Lake Conroe, Conroe residences demand premium architectural roofing capable of enduring intense summer heat cycles, heavy forestry debris, and strict subdivision architectural standards.",
  "cypress-roofing-contractor.html": "Stretching across the open coastal prairie of Northwest Harris County along US-290, Cypress master-planned communities showcase expansive, multi-tiered rooflines that require advanced storm-resistant engineering to survive severe spring hail corridors and high-velocity prairie winds.",
  "deer-park-tx-roofing-contractor.html": "Deep in the heart of Southeast Harris County near the historic San Jacinto Monument, Deer Park residences require industrial-grade roofing resilience designed to repel aggressive chemical airborne fallout, extreme solar ultraviolet exposure, and brutal Gulf storm winds.",
  "friendswood-tx-roofing-contractor.html": "Straddling the scenic, tree-lined banks of Clear Creek across northern Galveston and southern Harris counties, Friendswood homes demand high-caliber craftsmanship capable of satisfying stringent municipal windstorm codes while resisting heavy coastal moisture and persistent tree canopy debris.",
  "galveston-tx-roofing-contractor.html": "Perched directly on the barrier island sands of the Upper Texas Gulf Coast, Galveston Island residences demand the highest caliber of coastal storm engineering, strict Texas Windstorm Insurance Association (TWIA) compliance, and non-corrosive marine-grade components.",
  "humble-tx-roofing-contractor.html": "Situated near the scenic bend of the San Jacinto River and the busy flight paths of George Bush Intercontinental Airport, Humble homes face a challenging mix of high forestry humidity, low-frequency acoustic vibrations, and severe North Harris County thunderstorm fronts.",
  "katy-roofing-contractor.html": "Sprawling across the flat coastal prairie of western Harris and northern Fort Bend counties along Interstate 10, Katy homes face unobstructed severe wind shear, intense prairie heat, and the region's most active seasonal hail corridors.",
  "la-porte-tx-roofing-contractor.html": "Fronting the open waters of Galveston Bay near Barbours Cut, La Porte residences demand heavy-duty coastal roofing systems built to repel persistent saltwater air, industrial atmospheric wear, and severe tropical hurricane wind shear.",
  "league-city-roofing-contractor.html": "Positioned along the vibrant shoreline of Clear Lake in northern Galveston County, League City residences must comply with rigorous Texas Department of Insurance windstorm codes while defending against relentless marine humidity and coastal hurricane squalls.",
  "manvel-tx-roofing-contractor.html": "Rapidly transforming from open Brazoria County cattle ranches into vibrant master-planned communities along Highway 288, Manvel homes face intense southern prairie wind exposure, high agricultural humidity, and violent Gulf tropical weather systems.",
  "missouri-city-roofing-contractor.html": "Winding along the lush waterways of Oyster Creek and the Brazos River basin in eastern Fort Bend County, Missouri City homes require sophisticated architectural roofing engineered to blend strict master-planned HOA aesthetics with superior storm and humidity resilience.",
  "pasadena-tx-roofing-contractor.html": "Anchored in the historic industrial heartland of Southeast Harris County between Beltway 8 and the Ship Channel, Pasadena homes require durable, heat-and-chemical-resistant roofing systems capable of handling intense industrial air emissions, tropical downpours, and severe convective windstorms.",
  "pearland-roofing-contractor.html": "Spanning the rapidly developing southern gateway of Greater Houston along Highway 288 and FM 518, Pearland residences require modern, high-velocity storm protection to safeguard thousands of aging 1990s and 2000s suburban roof systems.",
  "richmond-tx-roofing-contractor.html": "Stretching along the historic bends of the Brazos River in western Fort Bend County, Richmond residences require versatile roofing expertise capable of protecting historic shaded acreage homes as well as modern master-planned prairie communities.",
  "rosenberg-tx-roofing-contractor.html": "Rising above the agricultural plains of southwestern Fort Bend County along Interstate 69, Rosenberg homes face intense prairie solar radiation, strong unobstructed crosswinds, and early failure of builder-grade roofing materials.",
  "spring-tx-roofing-contractor.html": "Encompassing the forested corridor between Interstate 45, the Grand Parkway, and FM 2920, Spring residences contend with dense pine needle debris, severe thunderstorm microbursts, and heavy tree-canopy moisture.",
  "sugar-land-roofing-contractor.html": "Nestled along the winding waterways of Oyster Creek and the Brazos River in prestigious eastern Fort Bend County, Sugar Land estates demand elite architectural roofing that strictly adheres to rigorous master-planned HOA covenants while resisting severe tropical storms.",
  "the-woodlands-roofing-contractor.html": "Immersed in the towering pine forests of southern Montgomery County, custom residences across The Woodlands require specialized architectural roofing that complies with rigorous Township Residential Development Standards while enduring heavy pine needle debris and canopy shade.",
  "tomball-tx-roofing-contractor.html": "Bridging the scenic pine forests of northern Harris County with open prairie pastures along Highway 249 and FM 2920, Tomball homes require durable roofing systems engineered to withstand intense thermal swings, heavy tree debris, and severe convective thunderstorm squalls.",
  "webster-clear-lake-tx-roofing-contractor.html": "Situated adjacent to NASA Johnson Space Center and the coastal waters of Clear Lake and Galveston Bay, Webster and Clear Lake homes demand aerospace-caliber roofing resilience, rigorous windstorm compliance, and robust defense against corrosive salt air."
};

console.log("Hero openings count:", Object.keys(heroOpenings).length);
