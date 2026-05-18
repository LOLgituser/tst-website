const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1440 });

  const url = process.argv[2] || 'http://localhost:8081/xhs-6signals.html';
  await page.goto(url, { waitUntil: 'networkidle' });

  const cards = await page.locator('.card');
  const count = await cards.count();
  console.log(`Found ${count} cards`);

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const filename = `/home/willi/tst-website/xhs-signal-${String(i+1).padStart(2,'0')}.png`;
    await card.screenshot({ path: filename });
    console.log(`Saved: ${filename}`);
  }

  await browser.close();
  console.log('Done.');
})();
