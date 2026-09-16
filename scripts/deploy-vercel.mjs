import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import https from 'https';

const TOKEN = 'vca_7E0SbIrdq9BeoKSK7lS6TuIc1xfmae60kaCAzCtryoDtX888xt0hqjPy';
const TEAM_ID = 'team_LeS342OoSSK3GbJuTTKRc6LF';
const PROJECT_ID = 'prj_w0O9u1WZONZzAk3b35NvsqFZ9wYt';
const PROJECT_NAME = 'fuehrerscheintausch.de';

function getSha1(buffer) {
  return crypto.createHash('sha1').update(buffer).digest('hex');
}

function uploadFile(sha, buffer) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.vercel.com',
      path: `/v2/files?teamId=${TEAM_ID}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': buffer.length,
        'x-vercel-digest': sha
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve(res.statusCode >= 200 && res.statusCode < 300);
      });
    });

    req.on('error', reject);
    req.write(buffer);
    req.end();
  });
}

const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', '.vercel']);

function getProjectFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (IGNORE_DIRS.has(item) && !base) continue;
    const fullPath = path.join(dir, item);
    const relPath = base ? `${base}/${item}` : item;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getProjectFiles(fullPath, relPath));
    } else {
      results.push({ fullPath, relPath, size: stat.size });
    }
  }
  return results;
}

async function deploy() {
  console.log('🚀 Starte Vercel Source-Deployment für', PROJECT_NAME);
  
  const files = getProjectFiles(process.cwd());
  console.log(`📦 Gefundene Quelldateien: ${files.length}`);

  const filesPayload = [];

  for (const f of files) {
    const buf = fs.readFileSync(f.fullPath);
    const sha = getSha1(buf);
    await uploadFile(sha, buf);
    filesPayload.push({
      file: f.relPath,
      sha,
      size: f.size
    });
    console.log(`  ✓ ${f.relPath} (${f.size} B)`);
  }

  console.log('\n📤 Sende Deployment an Vercel API...');

  const deploymentBody = JSON.stringify({
    name: PROJECT_NAME,
    project: PROJECT_ID,
    target: 'production',
    files: filesPayload,
    projectSettings: {
      framework: 'vite',
      buildCommand: 'vite build',
      outputDirectory: 'dist'
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.vercel.com',
      path: `/v13/deployments?teamId=${TEAM_ID}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(deploymentBody)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('✅ Deployment erfolgreich gestartet!');
            console.log('🔗 URL:', result.url);
            console.log('🆔 ID:', result.id);
            console.log('📌 State:', result.readyState || result.status);
            resolve(result);
          } else {
            console.error('❌ Fehler:', res.statusCode, body);
            reject(new Error(body));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(deploymentBody);
    req.end();
  });
}

deploy().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
