const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const operationsFile = path.join(__dirname, 'operations', 'index.html');
const newsDataUrl = 'https://raw.githubusercontent.com/ignatiusarwalembun/Smalltalk_Coffee_and_Chill/news-data/data/news.json';

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

function sendJson(res, status, payload, extraHeaders = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
    ...extraHeaders
  });
  res.end(JSON.stringify(payload));
}

async function getNews() {
  const response = await fetch(`${newsDataUrl}?v=${Date.now()}`, {
    headers: { 'User-Agent': 'smalltalk-coffee-and-chill' },
    cache: 'no-store'
  });

  if (!response.ok) throw new Error(`News source responded ${response.status}`);
  const parsed = await response.json();
  if (!Array.isArray(parsed)) return [];

  return parsed
    .filter(item => item && typeof item === 'object' && typeof item.title === 'string')
    .slice(0, 50);
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === '/api/health') {
    return sendJson(res, 200, { ok: true, service: 'smalltalk-coffee-and-chill' });
  }

  if (requestUrl.pathname === '/api/place') {
    return sendJson(res, 200, place);
  }

  if (requestUrl.pathname === '/api/news') {
    if (req.method !== 'GET') {
      return sendJson(res, 405, { ok: false, error: 'Method not allowed' }, { Allow: 'GET' });
    }

    try {
      const news = await getNews();
      return sendJson(res, 200, { ok: true, news });
    } catch (error) {
      console.error('Unable to load news:', error.message);
      return sendJson(res, 200, { ok: true, news: [], degraded: true });
    }
  }

  if (requestUrl.pathname === '/operations' || requestUrl.pathname === '/operations/') {
    fs.readFile(operationsFile, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Operations page not found');
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer'
      });
      return res.end(content);
    });
    return;
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
