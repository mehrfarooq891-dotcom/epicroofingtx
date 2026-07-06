const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('<section') || line.includes('class="hero') || line.includes('id="hero') || line.includes('class="emergency') || line.includes('class="announcement')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
