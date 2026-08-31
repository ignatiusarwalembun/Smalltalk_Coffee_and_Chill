const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const place = {
  name: 'Smalltalk Coffee and Chill',
  rating: 4.8,
  reviewCount: 45,
  hours: '09:30–23:00',
  address: 'Jl. Pademangan 3 Raya No.6C, Pademangan Timur, Jakarta Utara 14410',
  phone: '+6285117828229',
  priceRange: 'Rp1–25K'
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ ok: true, service: 'smalltalk-coffee-and-chill' }));
  }

  if (requestUrl.pathname === '/api/place') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(place));
  }

  let filePath = path.join(publicDir, requestUrl.pathname === '/' ? 'index.html' : requestUrl.pathname);
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (statErr, stats) => {
    if (!statErr && stats.isDirectory()) filePath = path.join(filePath, 'index.html');

    fs.readFile(filePath, (err, content) => {
      if (err) {
        fs.readFile(path.join(publicDir, 'index.html'), (fallbackErr, fallback) => {
          if (fallbackErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Not found');
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(fallback);
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Smalltalk Coffee and Chill listening on port ${port}`);
});
