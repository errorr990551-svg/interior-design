import * as ftp from 'basic-ftp';

// 1. Hostname Sanitizer: Strips protocol prefixes, port numbers, paths, trailing slashes
const rawServer = process.env.FTP_SERVER || '';
const host = rawServer
  .replace(/^[a-zA-Z]+:\/\//, '') // Remove ftp://, ftps://, https://
  .replace(/:\d+$/, '')           // Remove port :21
  .replace(/\/.*$/, '')           // Remove trailing paths /public_html
  .trim();

const user = (process.env.FTP_USERNAME || '').trim();
const password = process.env.FTP_PASSWORD || '';
const deployToken = process.env.DEPLOY_TOKEN || '';
const siteUrl = (process.env.SITE_URL || 'https://2bhkinteriors.in').replace(/\/$/, '');

if (!host || !user || !password) {
  console.error('❌ Error: FTP_SERVER, FTP_USERNAME, or FTP_PASSWORD missing from GitHub Secrets!');
  process.exit(1);
}

console.log(`🚀 Starting Fast ZIP Deploy to [${host}] with user [${user}]...`);

const client = new ftp.Client();
client.ftp.verbose = false;

async function runDeploy() {
  let connected = false;

  // 1. Try Explicit TLS / FTPS
  try {
    console.log('🔒 Connecting via Explicit TLS (FTPS)...');
    await client.access({
      host,
      user,
      password,
      secure: true,
      port: 21,
    });
    connected = true;
    console.log('✅ Connected via Explicit TLS.');
  } catch (err) {
    console.log(`ℹ️ TLS connection attempt failed: ${err.message}. Trying implicit FTPS...`);
  }

  // 2. Try Implicit FTPS if needed
  if (!connected) {
    try {
      console.log('🔒 Connecting via Implicit FTPS (Port 990)...');
      await client.access({
        host,
        user,
        password,
        secure: 'implicit',
        port: 990,
      });
      connected = true;
      console.log('✅ Connected via Implicit FTPS.');
    } catch (err) {
      console.log(`ℹ️ Implicit FTPS failed: ${err.message}. Falling back to standard FTP...`);
    }
  }

  // 3. Fallback to Standard FTP
  if (!connected) {
    console.log('⚡ Connecting via Standard FTP fallback...');
    await client.access({
      host,
      user,
      password,
      secure: false,
      port: 21,
    });
    console.log('✅ Connected via Standard FTP.');
  }

  // 4. Directory Navigation
  const rootList = await client.list();
  const hasPublicHtml = rootList.some(item => item.name === 'public_html' && item.isDirectory);
  if (hasPublicHtml) {
    console.log('📁 Navigating to public_html directory...');
    await client.cd('public_html');
  } else {
    console.log('📁 Target directory is current root.');
  }

  // 5. Upload deploy.zip and deploy_extract.php
  console.log('📦 Uploading deploy.zip (approx. 2-3 seconds)...');
  await client.uploadFrom('deploy.zip', 'deploy.zip');

  console.log('⚙️ Uploading deploy_extract.php...');
  await client.uploadFrom('deploy_extract.php', 'deploy_extract.php');

  console.log('✅ Fast upload complete! Closing FTP connection...');
  client.close();

  // 6. Server-Side Auto-Extraction via HTTP Webhook
  console.log('🔓 Triggering server-side extraction on Hostinger (2bhkinteriors.in)...');
  const extractUrls = [
    `https://2bhkinteriors.in/deploy_extract.php?token=${deployToken}`,
    `http://2bhkinteriors.in/deploy_extract.php?token=${deployToken}`,
    `${siteUrl}/deploy_extract.php?token=${deployToken}`,
    `http://${host}/deploy_extract.php?token=${deployToken}`,
  ];

  let extracted = false;
  for (const url of extractUrls) {
    try {
      console.log(`🌐 Calling extraction trigger: ${url}`);
      const res = await fetch(url, { signal: AbortSignal.timeout(25000) });
      const text = await res.text();
      console.log(`Response: ${text.trim()}`);
      if (text.includes('EXTRACTION_SUCCESS')) {
        extracted = true;
        console.log('🎉 Server-side extraction verified! All files deployed and temporary files removed.');
        break;
      }
    } catch (e) {
      console.log(`⚠️ Trigger attempt failed on ${url}: ${e.message}`);
    }
  }

  if (!extracted) {
    console.error('❌ Extraction failed or was not confirmed by Hostinger.');
    process.exit(1);
  }

  console.log('✨ CI/CD Fast ZIP Auto-Deploy finished in under 45 seconds!');
}

runDeploy().catch(err => {
  console.error('❌ Deployment script failed:', err.message);
  process.exit(1);
});
