// Verificação visual do UI Kit (Fase 2).
// Uso: node scripts/kit-shot.mjs <slug1> <slug2> ...  (default: todas)
// Requer o dev server rodando em http://localhost:5173
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const ALL = [
  'cores', 'tipografia', 'logo', 'espacamento', 'iconografia',
  'button', 'campos', 'badge', 'dados', 'deteccao', 'medidores', 'sensores',
]
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : ALL
const BASE = process.env.BASE || 'http://localhost:5173'

mkdirSync(new URL('../shots/kit/', import.meta.url), { recursive: true })
const dir = new URL('../shots/kit/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 })

const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push(String(e)))

for (const slug of slugs) {
  await page.goto(`${BASE}/ui-kit/${slug}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${dir}${slug}.png`, fullPage: true })
  console.log('saved', slug)
}

await browser.close()
if (errors.length) {
  console.log('--- CONSOLE ERRORS ---')
  for (const e of errors) console.log(e)
  process.exit(1)
}
console.log('no console errors')
