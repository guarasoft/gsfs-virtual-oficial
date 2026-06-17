import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 })
await page.goto('http://localhost:5174/wireframe/e4-scan', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: 'shots/wf-e4.png' })
console.log('saved wf-e4.png')
await browser.close()
