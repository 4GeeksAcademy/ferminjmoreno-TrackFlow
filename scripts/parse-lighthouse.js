const r = require('/workspaces/ferminjmoreno-TrackFlow/lighthouse-result.json');
if (!r) {
  console.log('ERROR: No se pudo leer lighthouse-result.json');
  process.exit(1);
}
const score = (r.categories.seo.score * 100).toFixed(0);
console.log('========================================');
console.log(' SCORE SEO:', score);
console.log('========================================');
const refs = r.categories.seo.auditRefs;
for (const ref of refs) {
  const a = r.audits[ref.id];
  if (!a) continue;
  const status = a.score === 1 ? 'PASS' : a.score === 0 ? 'FAIL' : 'WARN';
  console.log(status, '-', a.title);
  if (a.score !== 1 && a.explanation) {
    console.log('     ', a.explanation);
  }
}