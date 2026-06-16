import './GnssMap.css'

export interface GnssMapProps {
  /** coordenada simbólica fixa (Teto de Métricas: 4 casas) */
  lat: string
  lng: string
  /** nº de satélites (inteiro) */
  satellites: number
  /** status qualitativo (nunca precisão em cm) */
  fix?: 'FIX' | 'FLOAT' | 'NO FIX'
}

// Mapa GNSS simbólico de "posição atual": grade lat/long + marcador com
// jitter controlado (PRD 5.3 "mapa dinâmico com jitter controlado") + anel de
// precisão pulsante (fixação centimétrica simbólica — PRD 2.4 / 5.5). Coordenadas
// e satélites são simbólicos/fixos; FIX é qualitativo (Teto de Métricas, CA-08).
export function GnssMap({ lat, lng, satellites, fix = 'FIX' }: GnssMapProps) {
  return (
    <div
      className="gsfs-gnssmap"
      role="img"
      aria-label={`Mapa de posição GNSS — ${lat}, ${lng}; ${fix}, ${satellites} satélites`}
    >
      <div className="gsfs-gnssmap-grid" aria-hidden="true" />
      <div className="gsfs-gnssmap-cross" aria-hidden="true" />

      <div className="gsfs-gnssmap-pos" aria-hidden="true">
        <span className="gsfs-gnssmap-ring" />
        <span className="gsfs-gnssmap-dot" />
      </div>

      <span className="gsfs-gnssmap-compass" aria-hidden="true">N</span>

      <div className="gsfs-gnssmap-readout" aria-hidden="true">
        <span>{lat}</span>
        <span>{lng}</span>
      </div>

      <div className="gsfs-gnssmap-fix" aria-hidden="true">
        <span className="gsfs-gnssmap-fixdot" />
        {fix} · {satellites} sat
      </div>
    </div>
  )
}
