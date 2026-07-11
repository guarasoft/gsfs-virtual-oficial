import type { ScenarioId } from './types'

/**
 * Metadados simbólicos da sessão gravada de cada cenário (GSFS_RECORD).
 * Fonte única para E5 (resultado), E7 (lista/tarja de replay) — volume e hash
 * variam por cenário para manter a coerência dos resultados no fluxo completo.
 * Valores simbólicos e plausíveis, não medições (CA-08).
 */
export interface RecordMeta {
  id: string
  dt: string
  hora: string
  hash: string
  volume: string
}

/**
 * ID simbólico da sessão AO VIVO (missão recém-concluída): data real no
 * formato GSFS-RECORD-AAAA-MM-DD-NNN; o sufixo de sessão permanece simbólico,
 * assim como o hash (PRD §6 / Teto: timestamp real).
 */
export function liveSessionId(now: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `GSFS-RECORD-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-142`
}

export const RECORD_META: Record<ScenarioId, RecordMeta> = {
  c1: {
    id: 'GSFS-RECORD-2026-06-03-142',
    dt: '03/06/2026',
    hora: '14:34:31',
    hash: 'a9f2c71d4e8b3f06d21a7c95e0b48f1c6d3a92e7b8045fc1ad9e23b6708c4f5d',
    volume: '2,4 m³',
  },
  c2: {
    id: 'GSFS-RECORD-2026-06-03-138',
    dt: '03/06/2026',
    hora: '11:20:08',
    hash: 'b3d1e82f5a7c40d9e13b8f26a0c97e2d4b5f18a3c6e90d7b2f41c8e35a7b9d06',
    volume: '5,1 m³',
  },
  c3: {
    id: 'GSFS-RECORD-2026-06-02-131',
    dt: '02/06/2026',
    hora: '16:05:44',
    hash: 'c7f4a20e9b1d53f8a2c6e0b7d4f19a8c3e52b0d6f8a1c4e72b9d0f3a6c8e51b4',
    volume: '3,7 m³',
  },
  c4: {
    id: 'GSFS-RECORD-2026-06-02-127',
    dt: '02/06/2026',
    hora: '10:48:22',
    hash: 'd2e8b51f6c3a07e9b4d0f2a7c5e31b8f4d6a09c7e2b5f81d3a0c6e49b7d2f0e5',
    volume: '1,8 m³',
  },
  c5: {
    id: 'GSFS-RECORD-2026-06-01-119',
    dt: '01/06/2026',
    hora: '15:12:53',
    hash: 'e5a0d73c8b2f16e4a9c3d7b0f4a8e21c5b7d0f3a9c6e82b4d1f5a0c7e34b8d2f',
    volume: '8,2 m³',
  },
}
