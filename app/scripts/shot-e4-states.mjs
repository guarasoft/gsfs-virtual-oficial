import { chromium } from 'playwright'
const b = await chromium.launch()
const page = await b.newPage({ viewport: { width: 1366, height: 768 } })
await page.goto('http://localhost:5174/prototype', { waitUntil: 'networkidle' })
await page.getByText('NOVA OPERAÇÃO').waitFor({ timeout: 20000 })
await page.getByText('NOVA OPERAÇÃO').click()
await page.getByText('Nova configuração (manual)').click()
await page.getByText(/Cenário 1 —/).click()
await page.getByRole('button', { name: /Iniciar varredura/ }).click()

const gridTop = () => page.evaluate(() => Math.round(document.querySelector('.sv-body').getBoundingClientRect().top))

await page.waitForTimeout(2000)
await page.screenshot({ path: 'shots/e4-idle.png' })
const t1 = await gridTop()

await page.getByText('DETECÇÃO CONFIRMADA', { exact: true }).waitFor({ timeout: 60000 })
await page.waitForTimeout(300)
await page.screenshot({ path: 'shots/e4-detect.png' })
const t2 = await gridTop()

console.log('grid top idle:', t1, ' detect:', t2, ' shift:', t2 - t1)
await b.close()
