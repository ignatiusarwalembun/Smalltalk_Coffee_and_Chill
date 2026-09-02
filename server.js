const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const operationsFile = path.join(__dirname, 'operations', 'index.html');
const newsFile = process.env.NEWS_DATA_PATH || path.join(__dirname, 'data', 'news.json');
const adminKeyHash = (process.env.NEWS_ADMIN_KEY_HASH || '').trim().toLowerCase();

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
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    'Cache-Control': 'no-store',
    ...extraHeaders
  });
  res.end(JSON.stringify(payload));
}

async function ensureNewsFile() {
  await fs.promises.mkdir(path.dirname(newsFile), { recursive: true });
  try {
    await fs.promises.access(newsFile, fs.constants.F_OK);
  } catch (_) {
    await fs.promises.writeFile(newsFile, '[]\n', 'utf8');
  }
}

async function readNews() {
  await ensureNewsFile();
  const raw = await fs.promises.readFile(newsFile, 'utf8');
  const parsed = JSON.parse(raw || '[]');
  return Array.isArray(parsed) ? parsed : [];
}

async function writeNews(news) {
  await ensureNewsFile();
  const tempFile = `${newsFile}.${process.pid}.tmp`;
  await fs.promises.writeFile(tempFile, `${JSON.stringify(news, null, 2)}\n`, 'utf8');
  await fs.promises.rename(tempFile, newsFile);
}

function keyIsValid(value) {
  if (!value || !/^[a-f0-9]{64}$/.test(adminKeyHash)) return false;
  const suppliedHash = crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
  const expected = Buffer.from(adminKeyHash, 'hex');
  const supplied = Buffer.from(suppliedHash, 'hex');
  return expected.length === supplied.length && crypto.timingSafeEqual(expected, supplied);
}

function requireApiKey(req, res) {
  const key = req.headers['x-api-key'];
  if (!keyIsValid(key)) {
    sendJson(res, 401, { ok: false, error: 'Invalid API key' });
    return false;
  }
  return true;
}

function readJsonBody(req, maxBytes = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (_) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function normalizeLink(value) {
  const link = String(value || '').trim();
  if (!link) return '';
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : '';
  } catch (_) {
    return '';
  }
}

function validateNewsInput(body) {
  const title = String(body.title || '').trim();
  const content = String(body.content || '').trim();
  const rawLink = String(body.link || '').trim();
  const link = normalizeLink(rawLink);

  if (!title || title.length > 120) return { error: 'Title is required and must be 120 characters or fewer.' };
  if (!content || content.length > 900) return { error: 'Content is required and must be 900 characters or fewer.' };
  if (rawLink && !link) return { error: 'Link must be a valid http or https URL.' };
  return { title, content, link };
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS' && requestUrl.pathname.startsWith('/api/')) {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  if (requestUrl.pathname === '/api/health') {
    return sendJson(res, 200, { ok: true, service: 'smalltalk-coffee-and-chill' });
  }

  if (requestUrl.pathname === '/api/place') {
    return sendJson(res, 200, place);
  }

  if (requestUrl.pathname === '/api/ops/verify') {
    if (req.method !== 'POST') return sendJson(res, 405, { ok: false, error: 'Method not allowed' }, { Allow: 'POST' });
    if (!requireApiKey(req, res)) return;
    return sendJson(res, 200, { ok: true });
  }

  if (requestUrl.pathname === '/api/news') {
    if (req.method === 'GET') {
      try {
        const news = await readNews();
        return sendJson(res, 200, { ok: true, news: news.slice(0, 50) });
      } catch (error) {
        console.error('Unable to load news:', error.message);
        return sendJson(res, 500, { ok: false, news: [], error: 'Unable to load news' });
      }
    }

    if (req.method === 'POST') {
      if (!requireApiKey(req, res)) return;
      try {
        const body = await readJsonBody(req);
        const input = validateNewsInput(body);
        if (input.error) return sendJson(res, 400, { ok: false, error: input.error });

        const news = await readNews();
        const item = {
          id: crypto.randomUUID(),
          title: input.title,
          content: input.content,
          link: input.link,
          publishedAt: new Date().toISOString()
        };
        news.unshift(item);
        await writeNews(news.slice(0, 50));
        return sendJson(res, 201, { ok: true, item });
      } catch (error) {
        const status = error.message === 'Payload too large' ? 413 : 400;
        return sendJson(res, status, { ok: false, error: error.message || 'Unable to publish news' });
      }
    }

    return sendJson(res, 405, { ok: false, error: 'Method not allowed' }, { Allow: 'GET, POST' });
  }

  if (requestUrl.pathname.startsWith('/api/news/')) {
    const id = decodeURIComponent(requestUrl.pathname.slice('/api/news/'.length)).trim();
    if (!id) return sendJson(res, 400, { ok: false, error: 'Missing news id' });

    if (req.method === 'PUT') {
      if (!requireApiKey(req, res)) return;
      try {
        const body = await readJsonBody(req);
        const input = validateNewsInput(body);
        if (input.error) return sendJson(res, 400, { ok: false, error: input.error });

        const news = await readNews();
        const index = news.findIndex(item => item && item.id === id);
        if (index === -1) return sendJson(res, 404, { ok: false, error: 'News not found' });

        const existing = news[index];
        const updated = {
          ...existing,
          title: input.title,
          content: input.content,
          link: input.link,
          editedAt: new Date().toISOString()
        };
        news[index] = updated;
        await writeNews(news);
        return sendJson(res, 200, { ok: true, item: updated });
      } catch (error) {
        const status = error.message === 'Payload too large' ? 413 : 400;
        return sendJson(res, status, { ok: false, error: error.message || 'Unable to edit news' });
      }
    }

    if (req.method === 'DELETE') {
      if (!requireApiKey(req, res)) return;
      try {
        const news = await readNews();
        const filtered = news.filter(item => item && item.id !== id);
        if (filtered.length === news.length) return sendJson(res, 404, { ok: false, error: 'News not found' });
        await writeNews(filtered);
        return sendJson(res, 200, { ok: true });
      } catch (error) {
        return sendJson(res, 500, { ok: false, error: 'Unable to delete news' });
      }
    }

    return sendJson(res, 405, { ok: false, error: 'Method not allowed' }, { Allow: 'PUT, DELETE' });
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

server.listen(port, '0.0.0.0', async () => {
  try {
    await ensureNewsFile();
    console.log(`Smalltalk Coffee and Chill listening on port ${port}; news store: ${newsFile}`);
  } catch (error) {
    console.error(`Smalltalk server started but news storage initialization failed: ${error.message}`);
  }
});
