const fs = require('fs');

let file = fs.readFileSync('build-city-data.js', 'utf8');

// Expand richmond
file = file.replace(
  `Our Richmond inspections check for microscopic hail fractures, clear valley debris dams, and ensure wind-resistant fastener patterns.`,
  `Our Richmond inspections check for microscopic hail fractures on high-profile shingles, clear accumulated valley debris dams around riverfront properties, and ensure wind-resistant fastener patterns are installed across every new roof.`
);

// Expand the-woodlands
file = file.replace(
  `Our Woodlands specialists ensure full Township DSC compliance, inspect shaded valleys for hidden deck rot, and install algae-resistant GAF Timberline HDZ systems.`,
  `Our Woodlands specialists ensure full Township DSC compliance from permit filing through final inspection, examine shaded valleys for hidden deck rot, and install algae-resistant GAF Timberline HDZ systems that keep roofs clean for decades.`
);

// Expand channelview
file = file.replace(
  `When inspecting Channelview properties, we evaluate structural deck deflection, examine chimney and pipe boot seals for chemical brittleness, and verify that roof ventilation effectively vents humid attic air.`,
  `When inspecting Channelview properties, we evaluate structural deck deflection under foot traffic, examine chimney and pipe boot seals for chemical brittleness, and verify that intake and exhaust ventilation systems effectively cycle out trapped humid attic air.`
);

// Expand sugar-land
file = file.replace(
  `When evaluating Sugar Land properties, our HAAG-certified forensicians verify HOA compliance, inspect flashing lines around intricate masonry details, and ensure that all replacement systems feature 130 mph wind warranties.`,
  `When evaluating Sugar Land properties, our HAAG-certified forensicians verify neighborhood HOA compliance, inspect flashing lines around intricate masonry details and parapets, and ensure that all replacement systems feature certified 130 mph wind warranties.`
);

fs.writeFileSync('build-city-data.js', file);
console.log("Updated build-city-data.js");
