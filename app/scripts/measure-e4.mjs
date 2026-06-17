import { chromium } from 'playwright'
const b = await chromium.launch()
const page = await b.newPage({ viewport: { width: 1366, height: 768 } })
await page.goto('http://localhost:5174/prototype', { waitUntil: 'networkidle' })
await page.getByText('NOVA OPERAÇÃO').waitFor({ timeout: 20000 })
await page.getByText('NOVA OPERAÇÃO').click()
await page.getByText('Nova configuração (manual)').click()
await page.getByText(/Cenário 1 —/).click()
await page.getByRole('button', { name: /Iniciar varredura/ }).click()
await page.waitForTimeout(2000)
const r = await page.evaluate(() => {
  const q = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { l: Math.round(b.left), r: Math.round(b.right), w: Math.round(b.width) } }
  return {
    hud: q('.sv-hud'),
    progBlock: q('.sv-hud-progress'),
    bar: q('.sv-hud-progress-track .gsfs-progress'),
    pct: q('.sv-hud-progress-pct'),
    metrics: q('.sv-hud-metrics'),
    root: q('.sv-root'),
  }
})
console.log(JSON.stringify(r, null, 2))
await b.close()
