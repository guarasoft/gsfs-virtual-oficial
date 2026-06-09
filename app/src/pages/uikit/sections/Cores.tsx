import { DocSection, DocBlock, Swatch } from '../docs-kit'

const BRAND = [
  ['Deep Navy', '#0A1324', '--gsfs-deep-navy'],
  ['Deep Blue', '#0D1F3A', '--gsfs-deep-blue'],
  ['Steel Blue', '#1E3A5F', '--gsfs-steel-blue'],
  ['Technical Cyan', '#00B6C8', '--gsfs-technical-cyan'],
  ['Controlled Green', '#7ED321', '--gsfs-controlled-green'],
  ['Light Gray', '#E6EAF0', '--gsfs-light-gray'],
  ['White', '#FFFFFF', '--gsfs-white'],
] as const

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const
const NAVY_STEPS = ['500', '600', '700', '800', '900', '950'] as const
const NEUTRAL_STEPS = ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const

function Scale({ name, prefix, steps }: { name: string; prefix: string; steps: readonly string[] }) {
  return (
    <>
      {steps.map((s) => (
        <Swatch key={s} name={`${name} ${s}`} value={`var(--${prefix}-${s})`} token={`--${prefix}-${s}`} />
      ))}
    </>
  )
}

const SEMANTIC = [
  ['Fundo', '--color-bg'], ['Superfície', '--color-bg-surface'], ['Superfície elevada', '--color-bg-raised'],
  ['Borda', '--color-border'], ['Borda forte', '--color-border-strong'],
  ['Texto', '--color-text'], ['Texto forte', '--color-text-strong'], ['Texto esmaecido', '--color-text-muted'],
  ['Primária', '--color-primary'], ['Acento', '--color-accent'],
  ['Sucesso', '--color-success'], ['Alerta', '--color-warning'], ['Perigo', '--color-danger'], ['Info', '--color-info'],
  ['Foco', '--color-focus-ring'],
] as const

const SIM = [
  ['Confirmado', '--sim-state-confirmed'], ['Suspeita', '--sim-state-suspect'], ['Descartado', '--sim-state-discarded'],
  ['Confiança alta', '--sim-confidence-high'], ['Confiança média', '--sim-confidence-medium'], ['Confiança baixa', '--sim-confidence-low'],
  ['Bateria OK', '--sim-battery-ok'], ['Bateria atenção', '--sim-battery-warn'], ['Bateria crítica', '--sim-battery-critical'],
  ['Temp normal', '--sim-temp-normal'], ['Temp elevada', '--sim-temp-elevated'], ['Temp crítica', '--sim-temp-critical'],
  ['RTK fix', '--sim-rtk-fix'], ['RTK float', '--sim-rtk-float'], ['RTK nofix', '--sim-rtk-nofix'],
  ['Sensor GPR', '--sensor-gpr'], ['Sensor EMI', '--sensor-emi'], ['Sensor IMU', '--sensor-imu'], ['Sensor GNSS', '--sensor-gnss'],
] as const

export default function Cores() {
  return (
    <DocSection
      title="Cores"
      desc="Paleta de marca (7 cores oficiais do cliente), escalas tonais derivadas, papéis semânticos do tema escuro e tokens do simulador. Cada amostra mostra o nome e o token CSS aplicado."
    >
      <DocBlock title="Marca (cliente)">
        {BRAND.map(([n, v, t]) => <Swatch key={t} name={n} value={v} token={t} />)}
      </DocBlock>
      <DocBlock title="Escala Cyan (primária)"><Scale name="Cyan" prefix="cyan" steps={STEPS} /></DocBlock>
      <DocBlock title="Escala Green"><Scale name="Green" prefix="green" steps={STEPS} /></DocBlock>
      <DocBlock title="Escala Amber"><Scale name="Amber" prefix="amber" steps={STEPS} /></DocBlock>
      <DocBlock title="Escala Red"><Scale name="Red" prefix="red" steps={STEPS} /></DocBlock>
      <DocBlock title="Escala Navy"><Scale name="Navy" prefix="navy" steps={NAVY_STEPS} /></DocBlock>
      <DocBlock title="Escala Neutral"><Scale name="Neutral" prefix="neutral" steps={NEUTRAL_STEPS} /></DocBlock>
      <DocBlock title="Semânticas (tema escuro)">
        {SEMANTIC.map(([n, t]) => <Swatch key={t} name={n} value={`var(${t})`} token={t} />)}
      </DocBlock>
      <DocBlock title="Simulador">
        {SIM.map(([n, t]) => <Swatch key={t} name={n} value={`var(${t})`} token={t} />)}
      </DocBlock>
      <DocBlock title="Gradientes & calor EMI">
        <Swatch name="Gradiente marca" value="var(--gradient-brand)" token="--gradient-brand" />
        <Swatch
          name="Calor EMI"
          value="linear-gradient(90deg,var(--emi-heat-0),var(--emi-heat-25),var(--emi-heat-50),var(--emi-heat-75),var(--emi-heat-100))"
          token="--emi-heat-*"
        />
      </DocBlock>
    </DocSection>
  )
}
