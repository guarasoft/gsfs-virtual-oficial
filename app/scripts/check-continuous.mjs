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
const sweepX = () => page.evaluate(() => {
  const l = document.querySelector('.svg-gpr .gpr-sweep')
  return l ? parseFloat(l.getAttribute('x1')) : null
})
const samples = []
for (let i = 0; i < 5; i++) { samples.push(await sweepX()); await page.waitForTimeout(120) }
console.log('gpr sweep x1 samples:', samples.map(s => s?.toFixed(3)).join(' -> '))
await b.close()
