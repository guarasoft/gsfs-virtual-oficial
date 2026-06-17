import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync(new URL('../shots/', import.meta.url), { recursive: true })
const dir = new URL('../shots/', import.meta.url).pathname.replace(/^\//, '')

const sizes = [
  { w: 1280, h: 800, tag: 'tablet' },
  { w: 1366, h: 768, tag: 'notebook' },
]

const browser = await chromium.launch()

for (const { w, h, tag } of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5174/prototype', { waitUntil: 'networkidle' })

  // Boot → wait for menu
  await page.getByText('NOVA OPERAÇÃO').waitFor({ timeout: 20000 })
  await page.getByText('NOVA OPERAÇÃO').click()

  // Setup: pick a scenario via the Select
  await page.getByText('Cenário', { exact: false }).first().waitFor({ timeout: 5000 })
  // open select (the trigger shows the current value "Nova configuração (manual)")
  await page.getByText('Nova configuração (manual)').click()
  await page.getByText(/Cenário 1 —/).click()

  // Start scan
  await page.getByRole('button', { name: /Iniciar varredura/ }).click()

  // Let the scan run so progress/detections accumulate
  await page.waitForTimeout(6000)
  await page.screenshot({ path: `${dir}e4-${tag}.png` })
  console.log('saved', `e4-${tag}.png`)
  await page.close()
}

await browser.close()
