import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync(new URL('../shots/', import.meta.url), { recursive: true })
const dir = new URL('../shots/', import.meta.url).pathname.replace(/^\//, '')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })

async function shot(url, file, fn) {
  await page.goto(url, { waitUntil: 'networkidle' })
  if (fn) {
    await fn()
    await page.waitForTimeout(300)
  }
  await page.screenshot({ path: dir + file })
  console.log('saved', file)
}

await shot('http://localhost:5173/wireframe/e7-replay', 'e7-list.png')
await shot('http://localhost:5173/wireframe/e7-replay', 'e7-replay.png', async () => {
  await page.getByRole('button', { name: 'Replay', exact: true }).click()
})

await browser.close()
