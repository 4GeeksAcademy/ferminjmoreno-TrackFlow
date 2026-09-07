const puppeteer = require('puppeteer');
const lighthouse = require('/usr/local/share/nvm/versions/node/v22.15.0/lib/node_modules/lighthouse');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const flow = await lighthouse.navigation('http://localhost:3001/', {
    page,
    config: lighthouse.defaultConfig,
    onlyCategories: ['seo'],
  });

  const lhr = flow.reportJson[0];
  const score = (lhr.categories.seo.score * 100).toFixed(0);

  console.log('========================================');
  console.log(' SCORE SEO:', score);
  console.log('========================================');

  const refs = lhr.categories.seo.auditRefs;
  for (const ref of refs) {
    const audit = lhr.audits[ref.id];
    if (!audit) continue;
    const status = audit.score === 1 ? 'PASS' : audit.score === 0 ? 'FAIL' : 'WARN';
    console.log(status, '-', audit.title);
    if (audit.score !== 1 && audit.explanation) {
      console.log('     ', audit.explanation);
    }
  }

  await browser.close();
})();