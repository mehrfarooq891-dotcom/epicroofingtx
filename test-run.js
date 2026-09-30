const fs = require('fs');

// Read katy
const katyHtml = fs.readFileSync('katy-roofing-contractor.html', 'utf8');
console.log("Katy read ok, length:", katyHtml.length);

// Read atascocita
const ataHtml = fs.readFileSync('atascocita-kingwood-tx-roofing-contractor.html', 'utf8');
console.log("Atascocita read ok, length:", ataHtml.length);
