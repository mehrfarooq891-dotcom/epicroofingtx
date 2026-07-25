const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const REDIRECTS = {
  '/blog/signs-need-new-roof-houston': '/blog/signs-you-need-roof-replacement-houston',
  '/blog/signs-need-new-roof-houston.html': '/blog/signs-you-need-roof-replacement-houston',
  '/blog/roof-replacement-financing-houston': '/blog/roof-financing-options-houston',
  '/blog/roof-replacement-financing-houston.html': '/blog/roof-financing-options-houston',
  '/blog/roof-replacement-cost-houston-2025': '/blog/roof-replacement-cost-houston',
  '/blog/roof-replacement-cost-houston-2025.html': '/blog/roof-replacement-cost-houston',
  '/services/shingle-roof-replacement': '/roof-replacement-houston',
  '/services/metal-roofing-installation': '/metal-roofing-houston',
  '/services/commercial-roof-coating': '/roof-coating-houston',
  '/services/hail-wind-storm-repair': '/hail-damage-roof-repair-houston',
  '/services/emergency-tarping-leak-repair': '/emergency-roof-tarping-houston',
  '/services/roof-inspection-haag': '/free-roof-inspection-houston',
  '/cities/houston': '/roof-replacement-houston',
  '/cities/katy': '/katy-roofing-contractor',
  '/cities/sugar-land': '/sugar-land-roofing-contractor',
  '/cities/cypress': '/cypress-roofing-contractor',
  '/cities/the-woodlands': '/the-woodlands-roofing-contractor',
  '/cities/pearland': '/pearland-roofing-contractor',
  '/cities/league-city': '/league-city-roofing-contractor',
  '/cities/spring': '/spring-tx-roofing-contractor',
  '/cities/pasadena': '/pasadena-tx-roofing-contractor',
  '/cities/conroe': '/the-woodlands-roofing-contractor',
  '/cities/kingwood': '/humble-tx-roofing-contractor',
  '/cities/tomball': '/tomball-tx-roofing-contractor',
  '/portfolio': '/sitemap',
  '/privacy': '/privacy-policy',
  '/terms': '/privacy-policy',
  '/terms-of-service': '/privacy-policy',
  '/roof-replacement-after-hurricane-houston': '/storm-damage-roofing-houston'
};

const server = http.createServer((req, res) => {
  // Decode URL in case of spaces/special characters
  const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  
  if (REDIRECTS[decodedUrl]) {
    res.writeHead(301, { 'Location': REDIRECTS[decodedUrl] });
    return res.end();
  }
  
  // Clean path to prevent directory traversal
  let filePath = path.join(process.cwd(), decodedUrl);
  
  // If request is directory or root, default to index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist directly, check with .html extension (SEO friendly paths)
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    }
  }

  // If file still doesn't exist, check inside public directory
  if (!fs.existsSync(filePath)) {
    const publicFilePath = path.join(process.cwd(), 'public', decodedUrl);
    if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
      filePath = publicFilePath;
    }
  }

  // Serve file if exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404 falling back to index.html or 404 page
    const error404Path = path.join(process.cwd(), 'index.html');
    if (fs.existsSync(error404Path)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(error404Path).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
