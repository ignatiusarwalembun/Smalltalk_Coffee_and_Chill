const http = require('http');
const { spawn } = require('child_process');

const port = Number(process.env.PORT || 3001);
const runnerKey = process.env.RUNNER_KEY || '';
const siteId = process.env.NETLIFY_SITE_ID || '';
let running = false;
let lastResult = { status: 'idle', at: null, detail: null };

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

function validProxy(value = '') {
  return value.startsWith('https://netlify-mcp.netlify.app/proxy/');
}

function runDeploy(proxyPath) {
  if (running || !validProxy(proxyPath) || !siteId) return false;
  running = true;
  lastResult = { status: 'running', at: new Date().toISOString(), detail: null };

  const child = spawn('npx', [
    '--no-install', '@netlify/mcp', '--site-id', siteId, '--proxy-path', proxyPath, '--no-wait'
  ], { cwd: process.cwd(), env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });

  let output = '';
  const collect = chunk => {
    output += chunk.toString();
    if (output.length > 6000) output = output.slice(-6000);
  };
  child.stdout.on('data', collect);
  child.stderr.on('data', collect);

  child.on('close', code => {
    running = false;
    lastResult = {
      status: code === 0 ? 'success' : 'failed',
      at: new Date().toISOString(),
      detail: output.replace(/https:\/\/netlify-mcp\.netlify\.app\/proxy\/[^\s"']+/g, '[proxy-redacted]').slice(-2500)
    };
    console.log(`Netlify deploy finished with code ${code}`);
  });
  child.on('error', error => {
    running = false;
    lastResult = { status: 'failed', at: new Date().toISOString(), detail: error.message };
  });
  return true;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/health') return json(res, 200, { ok: true, running, lastResult: lastResult.status });
  if (url.pathname === '/status') {
    if (!runnerKey || url.searchParams.get('key') !== runnerKey) return json(res, 401, { ok: false });
    return json(res, 200, { ok: true, running, lastResult });
  }
  if (url.pathname === '/deploy') {
    if (!runnerKey || url.searchParams.get('key') !== runnerKey) return json(res, 401, { ok: false });
    if (running) return json(res, 409, { ok: false, message: 'Deployment already running' });
    const proxyPath = url.searchParams.get('proxy');
    if (!validProxy(proxyPath)) return json(res, 400, { ok: false, message: 'Invalid proxy path' });
    if (!siteId) return json(res, 500, { ok: false, message: 'NETLIFY_SITE_ID missing' });
    runDeploy(proxyPath);
    return json(res, 202, { ok: true, message: 'Deployment started' });
  }
  json(res, 404, { ok: false });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Netlify runner listening on port ${port}`);
  const bootProxy = process.env.NETLIFY_PROXY_PATH || '';
  if (validProxy(bootProxy)) {
    console.log('Fresh Netlify deploy credential detected; starting upload.');
    setTimeout(() => runDeploy(bootProxy), 150);
  }
});
