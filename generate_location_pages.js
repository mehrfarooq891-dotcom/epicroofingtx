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

const shingleDividerGreyToDark = `<!-- SHINGLE DIVIDER (Grey to Dark) -->
<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#161B22">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

const shingleDividerLightToDark = `<!-- SHINGLE DIVIDER (Light to Dark) -->
<div class="shingle-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="#161B22">
    <path d="M0,0 L50,18 L100,0 L150,18 L200,0 L250,18 L300,0 L350,18 L400,0 L450,18 L500,0 L550,18 L600,0 L650,18 L700,0 L750,18 L800,0 L850,18 L900,0 L950,18 L1000,0 L1050,18 L1100,0 L1150,18 L1200,0 L1200,24 L0,24 Z"></path>
  </svg>
</div>`;

// Check banned words
const bannedWordsRegexes = [
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
  /\bwaive the deductible\b/i,
  /\bwaiving your deductible\b/i,
  /\bSatellite Nodes\b/i,
  /\bState Headquarters\b/i,
  /\bWind-Grid Guarantee\b/i,
  /\bSBS-impact shingle structures\b/i
];

function checkContentForBanned(text, fileName) {
  let found = [];
  bannedWordsRegexes.forEach(regex => {
    const match = text.match(regex);
    if (match) {
      found.push(match[0]);
    }
  });
  if (found.length > 0) {
    console.error(`ERROR: Found banned words in ${fileName}:`, found);
    return false;
  }
  return true;
}

console.log('Script loaded successfully.');
