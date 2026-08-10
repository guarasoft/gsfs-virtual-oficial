// Bateria de homologação — GSFS Virtual
// Jornada completa E1→E7 nos 5 cenários (resolução de referência 1280×800)
// + jornada C1 em 1920×1080 e 1366×768 + coleta de erros de console.
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const OUT = process.argv[2] ?? 'homolog-out'
mkdirSync(OUT, { recursive: true })
const BASE = 'http://localhost:4173'
const log = { startedAt: new Date().toISOString(), runs: [], errors: [] }

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })

async function journey({ scenario, viewport, tag, full }) {
  const run = { scenario, viewport: `${viewport.width}x${viewport.height}`, tag, steps: [], consoleErrors: [], pageErrors: [], e5: {} }
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1.25 })
  const page = await ctx.newPage()
  page.setDefaultTimeout(180000)
  page.on('console', (m) => { if (m.type() === 'error') run.consoleErrors.push(m.text()) })
  page.on('pageerror', (e) => run.pageErrors.push(String(e)))
  const shot = async (name) => { await page.screenshot({ path: `${OUT}/${tag}-${name}.png` }); run.steps.push(name); console.log(`[${tag}] ${name}`) }

  await page.goto(`${BASE}/prototype`, { waitUntil: 'load' })

  // E1 boot (autoteste, avança sozinho)
  await page.waitForTimeout(3000)
  await shot('e1-boot')
  await page.getByText(/nova operação/i).first().waitFor({ timeout: 40000 })
  await shot('e2-menu')

  // E3 setup — seleciona o cenário
  await page.getByText(/nova operação/i).first().click()
  await page.getByText('Nova configuração (manual)').click()
  await page.getByText(new RegExp(`Cenário ${scenario} —`)).click()
  await page.waitForTimeout(800)
  await shot('e3-setup')

  // E4 varredura (90 s reais, determinística)
  await page.getByText('Iniciar varredura →').click()
  await page.waitForTimeout(45000)
  await shot('e4-scan')
  await page.getByText('RESULTADO DA OPERAÇÃO').waitFor({ timeout: 120000 })

  // E5 resultado (bloco 3D)
  await page.waitForTimeout(15000)
  await shot('e5-result')
  run.e5.text = (await page.locator('body').innerText()).slice(0, 4000)

  if (full) {
    // Replay E7 completo (90 s) até o bloco 3D final, depois volta e exporta (E6)
    await page.getByText('Replay', { exact: true }).click()
    await page.getByText('MODO REPLAY').waitFor()
    await page.waitForTimeout(4000)
    await shot('e7-replay')
    await page.getByText(/Replay concluído/).waitFor({ timeout: 180000 })
    await page.waitForTimeout(12000)
    await shot('e7-end')
    await page.getByText('Voltar', { exact: true }).click()
    await page.getByText('RESULTADO DA OPERAÇÃO').waitFor()
  }

  // E6 exportação (encerra a jornada)
  await page.getByText('Exportar →').click()
  await page.waitForTimeout(2500)
  await shot('e6-export')

  await ctx.close()
  log.runs.push(run)
  console.log(`[${tag}] concluído — consoleErrors=${run.consoleErrors.length} pageErrors=${run.pageErrors.length}`)
}

const REF = { width: 1280, height: 800 }
try {
  // 5 cenários — jornada completa na resolução de referência
  for (const n of [1, 2, 3, 4, 5]) {
    await journey({ scenario: n, viewport: REF, tag: `c${n}`, full: true })
  }
  // Varredura de resoluções — C1 completo em desktop e notebook
  await journey({ scenario: 1, viewport: { width: 1920, height: 1080 }, tag: 'c1-1920x1080', full: false })
  await journey({ scenario: 1, viewport: { width: 1366, height: 768 }, tag: 'c1-1366x768', full: false })
} catch (e) {
  log.errors.push(String(e))
  console.error('FALHA:', e)
}

log.finishedAt = new Date().toISOString()
writeFileSync(`${OUT}/homolog-log.json`, JSON.stringify(log, null, 2))
console.log('BATERIA CONCLUÍDA')
await browser.close()
