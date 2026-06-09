import { NavLink } from 'react-router-dom'

// Registro único da navegação do UI Kit. Cada item vira uma rota /ui-kit/<slug>.
export type KitItem = { slug: string; label: string }
export type KitGroup = { title: string; items: KitItem[] }

export const KIT_GROUPS: KitGroup[] = [
  {
    title: 'Fundamentos',
    items: [
      { slug: 'cores', label: 'Cores' },
      { slug: 'tipografia', label: 'Tipografia' },
      { slug: 'logo', label: 'Logo' },
      { slug: 'espacamento', label: 'Espaçamento & Elevação' },
      { slug: 'iconografia', label: 'Iconografia' },
    ],
  },
  {
    title: 'Componentes base',
    items: [
      { slug: 'button', label: 'Button' },
      { slug: 'campos', label: 'Campos (Input/Select/Toggle)' },
      { slug: 'badge', label: 'Badge, Chip, Card, Panel' },
      { slug: 'dados', label: 'Table, Tabs, Progress, Tooltip' },
    ],
  },
  {
    title: 'Simulador (HUD)',
    items: [
      { slug: 'deteccao', label: 'Detecção & Confiança' },
      { slug: 'medidores', label: 'Bateria & Temperatura' },
      { slug: 'sensores', label: 'Sensores, RTK, Métricas, Status' },
    ],
  },
]

export default function Sidebar() {
  return (
    <nav className="kit-sidebar" aria-label="Navegação do UI Kit">
      <div className="kit-sidebar-sticky">
        {KIT_GROUPS.map((g) => (
          <div className="kit-group" key={g.title}>
            <p className="kit-group-title gsfs-ui-label">{g.title}</p>
            {g.items.map((it) => (
              <NavLink
                key={it.slug}
                to={`/ui-kit/${it.slug}`}
                className={({ isActive }) =>
                  'kit-link' + (isActive ? ' is-active' : '')
                }
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}
