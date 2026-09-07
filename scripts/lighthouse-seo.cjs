const lh = require('/usr/local/share/nvm/versions/node/v22.15.0/lib/node_modules/lighthouse');
const chromeLauncher = require('/usr/local/share/nvm/versions/node/v22.15.0/lib/node_modules/lighthouse/node_modules/chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({
    chromePath: '/workspaces/ferminjmoreno-TrackFlow/chrome/linux-152.0.7977.82/chrome-linux64/chrome',
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  const config = lh.desktopConfig || lh.defaultConfig;
  const flow = await lh.navigation('http://localhost:3001/', {
    port: chrome.port,
    config: config,
    onlyCategories: ['seo'],
  });

  const lhr = flow.reportJson[0];
  const score = (lhr.categories.seo.score * 100).toFixed(0);
  console.log('===========================');
  console.log(' SCORE SEO:', score);
  console.log('===========================');

  const refs = lhr.categories.seo.auditRefs;
  for (const ref of refs) {
    const a = lhr.audits[ref.id];
    if (!a) continue;
    const status = a.score === 1 ? 'PASS' : a.score === 0 ? 'FAIL' : 'WARN';
    console.log(status, '-', a.title);
    if (a.score !== 1 && a.explanation) {
      console.log('     ', a.explanation);
    }
  }

  await chrome.kill();
})();