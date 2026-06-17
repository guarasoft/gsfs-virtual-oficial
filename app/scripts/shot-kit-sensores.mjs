import { chromium } from 'playwright'
const b = await chromium.launch()
const page = await b.newPage({ viewport: { width: 1366, height: 900 } })
await page.goto('http://localhost:5174/ui-kit/sensores', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: 'shots/kit-sensores.png', fullPage: true })
console.log('saved')
await b.close()
