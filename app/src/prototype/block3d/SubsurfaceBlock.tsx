import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import type { ScenarioMeta } from '../data/scenarios'
import {
  DEPTH_M,
  getSceneSpec,
  resolveTarget,
  type DegradationZone,
  type SceneSpec,
  type TargetGeom,
  type TerrainKind,
  type TrajectoryPattern,
} from './sceneSpec'
import {
  getTerrainPreset,
  hash3,
  fbm2,
  rampColor,
  RAMP_CSS,
  terrainHeight,
  voxelizeBlob,
  voxelizeShell,
  voxelizeSlab,
  voxelizeVein,
  VOXEL_BLOB,
  VOXEL_VEIN,
  VOXEL_WATER,
  type Voxel,
} from './voxelize'
import './SubsurfaceBlock.css'

/** Cores institucionais (brand-assets/tokens + briefing §4/§6) */
const COLORS = {
  edge: '#1E3A5F',
  soil: '#14294A',
  cyan: '#00B6C8',
  text: '#8190A8',
  ouro: '#F5A623',
  magnetita: '#9B6DFF',
  vazio: '#A6B2C6',
  agua: '#2BC8D9',
  confirmado: '#7ED321',
  descartado: '#E5484D',
  zona: '#C7363B',
} as const

/** volta completa da órbita, em segundos (síntese do "vídeo em loop") */
const ORBIT_PERIOD_S = 30

function usePrefersReducedMotion(): boolean {
  return useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
}

/** Órbita lenta e contínua no eixo vertical — loop perfeito por construção */
function OrbitGroup({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!reduced && group.current) {
      group.current.rotation.y += (delta * Math.PI * 2) / ORBIT_PERIOD_S
    }
  })
  return (
    <group ref={group} rotation={[0, Math.PI / 7, 0]}>
      {children}
    </group>
  )
}

/** Revela o conteúdo em revealAt segundos (beat sheet); com reduced-motion, aparece direto */
function Reveal({ at, reduced, children }: { at: number; reduced: boolean; children: React.ReactNode }) {
  const [visible, setVisible] = useState(reduced || at <= 0)
  const inner = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!visible && clock.elapsedTime >= at) setVisible(true)
    if (visible && inner.current) {
      const t = Math.min(1, (clock.elapsedTime - at) / 0.8)
      const s = reduced ? 1 : 0.6 + 0.4 * (1 - (1 - t) * (1 - t))
      inner.current.scale.setScalar(s)
    }
  })
  if (!visible) return null
  return <group ref={inner}>{children}</group>
}

/** Casca do bloco de solo: volume translúcido + arestas + estratos por metro */
function SoilBox({ ax, az }: { ax: number; az: number }) {
  const strata = useMemo(() => {
    const pts: THREE.Vector3[][] = []
    for (let d = 1; d < DEPTH_M; d++) {
      const y = -d
      pts.push([
        new THREE.Vector3(-ax / 2, y, -az / 2),
        new THREE.Vector3(ax / 2, y, -az / 2),
        new THREE.Vector3(ax / 2, y, az / 2),
        new THREE.Vector3(-ax / 2, y, az / 2),
        new THREE.Vector3(-ax / 2, y, -az / 2),
      ])
    }
    return pts
  }, [ax, az])

  return (
    <group>
      <mesh position={[0, -DEPTH_M / 2, 0]}>
        <boxGeometry args={[ax, DEPTH_M, az]} />
        <meshStandardMaterial color={COLORS.soil} transparent opacity={0.3} depthWrite={false} />
        <Edges color={COLORS.edge} />
      </mesh>
      {strata.map((ring, i) => (
        <Line key={i} points={ring} color={COLORS.edge} transparent opacity={0.45} lineWidth={1} />
      ))}
    </group>
  )
}

/**
 * Tampa de terreno (ambientação do cenário). Heightfield determinístico com
 * pintura por vértice (preset por cenário) + "saia" lateral até o topo (y=0).
 */
function Terrain({ ax, az, kind }: { ax: number; az: number; kind: TerrainKind }) {
  const { topGeo, skirtGeo, preset } = useMemo(() => {
    const preset = getTerrainPreset(kind)
    const seg = 56
    const topGeo = new THREE.PlaneGeometry(ax, az, seg, seg)
    topGeo.rotateX(-Math.PI / 2)
    const pos = topGeo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const base = new THREE.Color(preset.base)
    const base2 = preset.base2 ? new THREE.Color(preset.base2) : null
    const dark = new THREE.Color(preset.dark)
    const acc1 = new THREE.Color(preset.acc1)
    const acc2 = new THREE.Color(preset.acc2)
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const h = terrainHeight(kind, x, z, ax, az)
      pos.setY(i, h)
      // pintura: base (com transição opcional ao longo de X) + máscaras 0–1
      c.copy(base)
      if (base2) c.lerp(base2, Math.min(1, Math.max(0, x / ax + 0.5)))
      const grain = fbm2(x * 1.1 + 21, z * 1.1 - 13)
      c.lerp(dark, grain * 0.45)
      const m1 = fbm2(x * 0.5 - 33, z * 0.5 + 27)
      if (m1 > 0.56) c.lerp(acc1, Math.min(1, (m1 - 0.56) * 2.4))
      const m2 = fbm2(x * 0.45 + 55, z * 0.45 + 55)
      if (m2 > 0.6) c.lerp(acc2, Math.min(1, (m2 - 0.6) * 2.6))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    topGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    topGeo.computeVertexNormals()

    // saia: 4 tiras verticais do contorno do relevo até y=0
    const sPos: number[] = []
    const push = (a: THREE.Vector3, b: THREE.Vector3, c2: THREE.Vector3) => {
      sPos.push(a.x, a.y, a.z, b.x, b.y, b.z, c2.x, c2.y, c2.z)
    }
    const edgePoint = (t: number, side: 0 | 1 | 2 | 3) => {
      const s = t - 0.5
      const x = side === 0 ? -ax / 2 : side === 1 ? ax / 2 : s * ax
      const z = side === 2 ? -az / 2 : side === 3 ? az / 2 : s * az
      return new THREE.Vector3(x, terrainHeight(kind, x, z, ax, az), z)
    }
    for (const side of [0, 1, 2, 3] as const) {
      for (let i = 0; i < seg; i++) {
        const p0 = edgePoint(i / seg, side)
        const p1 = edgePoint((i + 1) / seg, side)
        const b0 = new THREE.Vector3(p0.x, 0, p0.z)
        const b1 = new THREE.Vector3(p1.x, 0, p1.z)
        push(p0, b0, p1)
        push(p1, b0, b1)
      }
    }
    const skirtGeo = new THREE.BufferGeometry()
    skirtGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sPos), 3))
    skirtGeo.computeVertexNormals()
    return { topGeo, skirtGeo, preset }
  }, [ax, az, kind])

  return (
    <group>
      <mesh geometry={topGeo}>
        <meshStandardMaterial vertexColors roughness={0.95} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={skirtGeo}>
        <meshStandardMaterial color={preset.skirt} roughness={1} metalness={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/**
 * Grade de linhas de varredura + trilha RTK sobre o relevo.
 * Volume 3D real de GPR é interpolado de perfis paralelos densos — a grade
 * fina mostra o plano de aquisição; a trilha em destaque, o percurso RTK.
 */
function SurveyLines({ ax, az, kind, pattern }: { ax: number; az: number; kind: TerrainKind; pattern: TrajectoryPattern }) {
  const drape = (x: number, z: number, lift: number) =>
    new THREE.Vector3(x, terrainHeight(kind, x, z, ax, az) + lift, z)

  // grade fina de aquisição (espaçamento realista ~0,5 m)
  const gridGeo = useMemo(() => {
    const spacing = pattern === 'organic' ? 0.75 : 0.5
    const margin = 0.06
    const x0 = -ax / 2 + ax * margin
    const x1 = ax / 2 - ax * margin
    const z0 = -az / 2 + az * margin
    const z1 = az / 2 - az * margin
    const lines = Math.floor((z1 - z0) / spacing)
    const sub = 24
    const pts: number[] = []
    for (let i = 0; i <= lines; i++) {
      const z = z0 + i * spacing
      for (let s = 0; s < sub; s++) {
        const xa = x0 + ((x1 - x0) * s) / sub
        const xb = x0 + ((x1 - x0) * (s + 1)) / sub
        const a = drape(xa, z, 0.05)
        const b = drape(xb, z, 0.05)
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
    return g
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ax, az, kind, pattern])

  // trilha RTK em destaque (padrão por modalidade)
  const track = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const passes = pattern === 'raster' ? 9 : pattern === 'zigzag' ? 7 : 6
    const margin = 0.08
    const x0 = -ax / 2 + ax * margin
    const x1 = ax / 2 - ax * margin
    const z0 = -az / 2 + az * margin
    const z1 = az / 2 - az * margin
    const steps = 24
    for (let i = 0; i <= passes; i++) {
      const zBase = z0 + ((z1 - z0) * i) / passes
      const [xa, xb] = i % 2 === 0 ? [x0, x1] : [x1, x0]
      for (let s = 0; s <= steps; s++) {
        const t = s / steps
        const wiggle =
          pattern === 'zigzag'
            ? Math.sin(t * Math.PI * 3 + i * 1.7) * az * 0.02
            : pattern === 'organic'
              ? (fbm2(t * 6 + i * 3.1, i * 2.7) - 0.5) * az * 0.06
              : (hash3(i, s, 7) - 0.5) * az * 0.004 // raster: drift mínimo
        pts.push(drape(xa + (xb - xa) * t, zBase + wiggle, 0.09))
      }
      if (i < passes) {
        const zNext = z0 + ((z1 - z0) * (i + 1)) / passes
        pts.push(drape(xb, zNext, 0.09))
      }
    }
    return pts
  }, [ax, az, kind, pattern])

  return (
    <group>
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color={COLORS.cyan} transparent opacity={0.14} />
      </lineSegments>
      <Line points={track} color={COLORS.cyan} lineWidth={1.6} transparent opacity={0.9} />
    </group>
  )
}

/**
 * Régua de profundidade (0 · 2,5 · 5 m) — referência lateral FIXA (fora da
 * órbita), à esquerda do bloco.
 */
function DepthRuler({ ax, az }: { ax: number; az: number }) {
  const x = -(ax / 2 + Math.max(1, ax * 0.12))
  const z = az / 2 + Math.max(1, az * 0.12)
  const marks = [0, 2.5, 5]
  return (
    <group>
      <Line
        points={[new THREE.Vector3(x, 0, z), new THREE.Vector3(x, -DEPTH_M, z)]}
        color={COLORS.edge}
        lineWidth={1.2}
      />
      {marks.map((m) => (
        <group key={m} position={[x, -m, z]}>
          <Line
            points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(-0.3, 0, 0.3)]}
            color={COLORS.edge}
            lineWidth={1.2}
          />
          <Html position={[-0.85, 0, 0.85]} className="sb3d-ruler-label" center zIndexRange={[5, 0]}>
            {m.toFixed(1).replace('.', ',')} m
          </Html>
        </group>
      ))}
    </group>
  )
}

/** Tríade de eixos X/Y/Z + barra de escala de 1 m — fixas, canto direito */
function AxesAndScale({ ax, az }: { ax: number; az: number }) {
  const ox = ax / 2 + Math.max(1, ax * 0.12) + 1.2
  const oz = az / 2 + Math.max(1, az * 0.12)
  const o = new THREE.Vector3(ox, -DEPTH_M, oz)
  const L = Math.max(1.1, ax * 0.09)
  return (
    <group>
      <Line points={[o, o.clone().add(new THREE.Vector3(L, 0, 0))]} color={COLORS.text} lineWidth={1.2} />
      <Line points={[o, o.clone().add(new THREE.Vector3(0, 0, L))]} color={COLORS.text} lineWidth={1.2} />
      <Line points={[o, o.clone().add(new THREE.Vector3(0, L, 0))]} color={COLORS.text} lineWidth={1.2} />
      <Html position={[o.x + L + 0.35, o.y, o.z]} className="sb3d-ruler-label" center zIndexRange={[5, 0]}>X</Html>
      <Html position={[o.x, o.y, o.z + L + 0.35]} className="sb3d-ruler-label" center zIndexRange={[5, 0]}>Y</Html>
      <Html position={[o.x, o.y + L + 0.35, o.z]} className="sb3d-ruler-label" center zIndexRange={[5, 0]}>Z</Html>
      <Line
        points={[new THREE.Vector3(ox, -DEPTH_M, oz - 2.4), new THREE.Vector3(ox, -DEPTH_M, oz - 3.4)]}
        color={COLORS.text}
        lineWidth={2}
      />
      <Html position={[ox + 0.55, -DEPTH_M, oz - 2.9]} className="sb3d-ruler-label" center zIndexRange={[5, 0]}>1 m</Html>
    </group>
  )
}

/** Linha tracejada da superfície até o alvo ("furo de sondagem" simbólico) */
function DrillLine({ x, z, depth, surfaceY }: { x: number; z: number; depth: number; surfaceY: number }) {
  return (
    <Line
      points={[new THREE.Vector3(x, surfaceY, z), new THREE.Vector3(x, -depth, z)]}
      color={COLORS.cyan}
      lineWidth={1.4}
      dashed
      dashSize={0.18}
      gapSize={0.12}
      transparent
      opacity={0.8}
    />
  )
}

function formatDepth(d: number): string {
  return d.toFixed(1).replace('.', ',') + ' m'
}

const MARKER: Record<string, string> = { ouro: '[Au]', magnetita: '[M]', vazio: '[V]', agua: '[H₂O]' }
const MATERIAL_NAME: Record<string, string> = {
  ouro: 'Ouro',
  magnetita: 'Magnetita',
  vazio: 'Cavidade',
  agua: 'Água',
}

/**
 * Cluster de voxels. Cor por voxel = rampa de probabilidade (como modelos de
 * inversão reais); camadas por limiar: ≥90% sólido · 70–90% translúcido ·
 * <70% fantasma. `fixedColor` troca a rampa por cor única (cavidade, descartado).
 */
function VoxelCluster({
  voxels,
  size,
  fixedColor,
  ghost,
}: {
  voxels: Voxel[]
  size: number
  fixedColor?: string
  ghost?: boolean
}) {
  const group = useMemo(() => {
    const geo = new THREE.BoxGeometry(size, size, size)
    const materials: THREE.MeshStandardMaterial[] = [
      new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.2, emissiveIntensity: 0.5 }),
      new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.3, depthWrite: false, roughness: 0.5 }),
      new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.16, depthWrite: false, roughness: 0.6 }),
    ]
    const g = new THREE.Group()
    const M = new THREE.Matrix4()
    const c = new THREE.Color()
    const fixed = fixedColor ? new THREE.Color(fixedColor) : null
    for (const tier of [0, 1, 2] as const) {
      const list = voxels.filter((v) => (ghost ? tier === 2 : v.tier === tier))
      if (list.length === 0) continue
      const mat = materials[tier]
      if (tier === 0 && !fixed) mat.emissive = new THREE.Color('#803a1e')
      const mesh = new THREE.InstancedMesh(geo, mat, list.length)
      list.forEach((v, idx) => {
        M.makeTranslation(v.x, v.y, v.z)
        mesh.setMatrixAt(idx, M)
        if (fixed) {
          c.copy(fixed)
        } else {
          const rc = rampColor(v.prob)
          c.setRGB(rc.r, rc.g, rc.b)
        }
        mesh.setColorAt(idx, c)
      })
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
      mesh.renderOrder = tier
      g.add(mesh)
      if (ghost) break
    }
    return g
  }, [voxels, size, fixedColor, ghost])

  return <primitive object={group} />
}

/** Um achado plotado na profundidade/posição do cenário */
function TargetMesh({
  geom,
  order,
  scenario,
  spec,
}: {
  geom: TargetGeom
  order: number
  scenario: ScenarioMeta
  spec: SceneSpec
}) {
  const t = resolveTarget(geom, scenario.targets)
  const x = (geom.plot.x - 0.5) * scenario.area.x
  const z = (geom.plot.z - 0.5) * scenario.area.y
  // para cavidade, depth do briefing é o TETO
  const centerDepth = t.kind === 'vazio' ? t.depth + geom.size.y / 2 : t.depth
  const y = -centerDepth
  const surfaceY = terrainHeight(spec.terrain, x, z, scenario.area.x, scenario.area.y)
  const descartado = t.status === 'descartado'

  const voxels = useMemo(() => {
    if (t.kind === 'ouro') return voxelizeVein(geom.size.x, geom.size.z, t.angle ?? 0, centerDepth, spec.attenuation)
    if (t.kind === 'magnetita')
      return voxelizeBlob(Math.max(geom.size.x, geom.size.y) * 0.72, centerDepth, spec.attenuation, order * 13)
    if (t.kind === 'vazio') return voxelizeShell(geom.size)
    return voxelizeSlab(geom.size, order * 17) // água — lâmina/bolsão em voxels
  }, [geom, t.kind, t.angle, centerDepth, spec.attenuation, order])

  const num = String(order + 1).padStart(2, '0')
  const metrics = [
    MARKER[t.kind],
    formatDepth(t.depth),
    t.angle != null ? `${t.angle}°` : null,
    t.status === 'confirmado' ? 'CONFIRMADO' : null,
    descartado ? 'DESCARTADO' : null,
  ]
    .filter(Boolean)
    .join(' · ')
  const side = order % 2 === 0 ? -1 : 1
  const anchor = new THREE.Vector3(
    side * scenario.area.x * (0.26 + 0.07 * Math.floor(order / 2)),
    1.0 + order * 0.9 + (t.kind === 'ouro' ? 0.5 : 0),
    0,
  )
  const chipClass = descartado ? 'descartado' : t.status === 'confirmado' ? 'confirmado' : t.kind

  return (
    <group>
      {!descartado && <DrillLine x={x} z={z} depth={t.depth} surfaceY={surfaceY} />}
      <group position={[x, y, z]}>
        <VoxelCluster
          voxels={voxels}
          size={t.kind === 'ouro' ? VOXEL_VEIN : t.kind === 'agua' ? VOXEL_WATER : VOXEL_BLOB}
          fixedColor={
            descartado
              ? COLORS.descartado
              : t.kind === 'vazio'
                ? COLORS.vazio
                : t.kind === 'agua'
                  ? COLORS.agua
                  : undefined
          }
          ghost={descartado}
        />
        {t.kind === 'vazio' && !descartado && (
          // delimitação da cavidade (briefing: contorno, sem preenchimento)
          <mesh>
            <boxGeometry args={[geom.size.x, geom.size.y, geom.size.z]} />
            <meshStandardMaterial color={COLORS.vazio} transparent opacity={0.05} depthWrite={false} />
            <Edges color={COLORS.vazio} />
          </mesh>
        )}
        {t.status === 'confirmado' && (
          // halo de confirmação da fusão (3 sensores) — briefing C4
          <mesh>
            <boxGeometry args={[geom.size.x + 0.6, geom.size.z * 0.9 + 0.6, geom.size.z + 0.6]} />
            <meshStandardMaterial color={COLORS.confirmado} transparent opacity={0.04} depthWrite={false} />
            <Edges color={COLORS.confirmado} />
          </mesh>
        )}
        <Line
          points={[new THREE.Vector3(0, 0, 0), anchor]}
          color={descartado ? COLORS.descartado : COLORS.text}
          lineWidth={1}
          transparent
          opacity={0.5}
        />
        <Html position={anchor.toArray()} center className="sb3d-target-label" zIndexRange={[10, 0]}>
          <span className={`sb3d-chip sb3d-chip--${chipClass}`}>
            <span className="sb3d-chip-name">TARGET {num} — {t.label}</span>
            {metrics}
          </span>
        </Html>
      </group>
    </group>
  )
}

/** Faixa sombreada de baixa confiança (C4 — CA-06) */
function Zone({ zone, scenario }: { zone: DegradationZone; scenario: ScenarioMeta }) {
  const ax = scenario.area.x
  const az = scenario.area.y
  const x0 = (zone.rect.x0 - 0.5) * ax
  const x1 = (zone.rect.x1 - 0.5) * ax
  const z0 = (zone.rect.z0 - 0.5) * az
  const z1 = (zone.rect.z1 - 0.5) * az
  const w = x1 - x0
  const d = z1 - z0
  return (
    <group position={[x0 + w / 2, -DEPTH_M / 2, z0 + d / 2]}>
      <mesh>
        <boxGeometry args={[w, DEPTH_M - 0.1, d]} />
        <meshStandardMaterial color={COLORS.zona} transparent opacity={0.1} depthWrite={false} />
        <Edges color={COLORS.zona} />
      </mesh>
      <Html position={[0, DEPTH_M / 2 + 2.2, 0]} center className="sb3d-target-label" zIndexRange={[6, 0]}>
        <span className="sb3d-chip sb3d-chip--zona">{zone.label}</span>
      </Html>
    </group>
  )
}

function BlockScene({ scenario, spec, reduced }: { scenario: ScenarioMeta; spec: SceneSpec; reduced: boolean }) {
  const ax = scenario.area.x
  const az = scenario.area.y
  return (
    <>
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#9fb2cc', '#0a1324', 0.7]} />
      <directionalLight position={[6, 8, 4]} intensity={1.35} />
      <DepthRuler ax={ax} az={az} />
      <AxesAndScale ax={ax} az={az} />
      <OrbitGroup reduced={reduced}>
        <SoilBox ax={ax} az={az} />
        <Terrain ax={ax} az={az} kind={spec.terrain} />
        <SurveyLines ax={ax} az={az} kind={spec.terrain} pattern={spec.trajectory} />
        {spec.zones?.map((zone) => (
          <Reveal key={zone.label} at={zone.revealAt} reduced={reduced}>
            <Zone zone={zone} scenario={scenario} />
          </Reveal>
        ))}
        {spec.targets.map((g, i) => (
          <Reveal key={i} at={g.revealAt} reduced={reduced}>
            <TargetMesh geom={g} order={i} scenario={scenario} spec={spec} />
          </Reveal>
        ))}
      </OrbitGroup>
    </>
  )
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Inset de radargrama (B-scan sintético da linha central) — o "dado bruto"
 * ao lado do resultado, critério de credibilidade da prática real
 * ("if it cannot be seen in the raw data — is it really there?", Cassidy 2009).
 * Hipérboles nos alvos pontuais, refletor contínuo no lençol, reverberação na
 * cavidade, ruído crescendo com a profundidade (ganho SEC).
 */
function RadargramInset({ scenario, spec }: { scenario: ScenarioMeta; spec: SceneSpec }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width
    const H = canvas.height
    const ax = scenario.area.x
    const az = scenario.area.y
    // linha do corte: z do alvo principal (primeiro ouro, senão primeiro alvo)
    const main = spec.targets.find((t) => t.kind === 'ouro') ?? spec.targets[0]
    const zLine = (main.plot.z - 0.5) * az
    const xToPx = (x: number) => ((x / ax + 0.5) * W) | 0
    const dToPx = (d: number) => ((d / DEPTH_M) * (H - 14) + 14) | 0

    ctx.fillStyle = '#0D1F3A'
    ctx.fillRect(0, 0, W, H)

    // onda direta (banda no topo — presente em todo radargrama real)
    for (let b = 0; b < 3; b++) {
      ctx.fillStyle = b % 2 === 0 ? 'rgba(207,216,230,0.55)' : 'rgba(13,31,58,0.9)'
      ctx.fillRect(0, 4 + b * 3, W, 2)
    }

    // ruído de fundo (cresce com a profundidade — ganho compensando atenuação)
    for (let px = 0; px < W; px += 2)
      for (let py = 14; py < H; py += 2) {
        const depth = ((py - 14) / (H - 14)) * DEPTH_M
        const a = hash3(px, py, 5) * 0.1 * (0.25 + (depth / DEPTH_M) * spec.attenuation * 1.6)
        if (a > 0.02) {
          ctx.fillStyle = `rgba(159,178,204,${a.toFixed(3)})`
          ctx.fillRect(px, py, 2, 2)
        }
      }

    const wavelet = (yc: number, xp: number, alpha: number) => {
      ctx.fillStyle = `rgba(230,234,240,${(alpha * 0.9).toFixed(3)})`
      ctx.fillRect(xp, yc - 2, 2, 2)
      ctx.fillStyle = `rgba(10,19,36,${alpha.toFixed(3)})`
      ctx.fillRect(xp, yc, 2, 2)
      ctx.fillStyle = `rgba(230,234,240,${(alpha * 0.6).toFixed(3)})`
      ctx.fillRect(xp, yc + 2, 2, 2)
    }

    for (const g of spec.targets) {
      const t = resolveTarget(g, scenario.targets)
      const tz = (g.plot.z - 0.5) * az
      const tx = (g.plot.x - 0.5) * ax
      const near = Math.abs(tz - zLine) < Math.max(1.5, g.size.z / 2)
      const decay = 1 - spec.attenuation * 0.45 * (t.depth / DEPTH_M)
      if (t.kind === 'agua' && g.size.x > ax * 0.6) {
        // lençol: refletor horizontal contínuo + ringing
        for (let e = 0; e < 3; e++) {
          const alpha = (0.75 - e * 0.25) * decay
          for (let px = 0; px < W; px += 2) {
            const wig = (fbm2(px * 0.05, e * 3.3) - 0.5) * 4
            wavelet(dToPx(t.depth + e * 0.35) + wig, px, alpha * (0.7 + hash3(px, e, 9) * 0.3))
          }
        }
        continue
      }
      if (!near) continue
      const x0 = xToPx(tx)
      if (t.kind === 'vazio') {
        // cavidade: refletor forte no teto + reverberação abaixo
        const wpx = ((g.size.x / ax) * W) | 0
        for (let e = 0; e < 3; e++) {
          const alpha = (0.85 - e * 0.28) * decay
          for (let px = Math.max(0, x0 - wpx / 2); px < Math.min(W, x0 + wpx / 2); px += 2)
            wavelet(dToPx(t.depth + e * 0.5), px, alpha)
        }
        continue
      }
      // alvo pontual/veio: hipérbole de difração
      const halfSpread = Math.min(W / 2, ((t.depth * 1.6) / ax) * W + 30)
      for (let dx = -halfSpread; dx <= halfSpread; dx += 2) {
        const xm = (dx / W) * ax
        const tt = Math.sqrt(t.depth * t.depth + xm * xm)
        const yp = dToPx(tt)
        if (yp > H - 2) continue
        const alpha = Math.max(0.08, (1 - Math.abs(dx) / halfSpread) * 0.9) * decay * (t.status === 'descartado' ? 0.45 : 1)
        wavelet(yp, x0 + dx, alpha)
      }
    }

    // marcas de profundidade
    ctx.fillStyle = 'rgba(129,144,168,0.9)'
    ctx.font = '9px monospace'
    ctx.fillText('0', 3, 12)
    ctx.fillText('2,5', 3, dToPx(2.5))
    ctx.fillText('5m', 3, H - 3)
  }, [scenario, spec])

  return (
    <div className="sb3d-radargram">
      <canvas ref={ref} width={300} height={130} />
      <span className="sb3d-radargram-label">GPR · B-SCAN · linha central · ganho SEC</span>
    </div>
  )
}

/** Legenda gerada pelo próprio gráfico: rampa de probabilidade com limiares */
function Legend({ spec }: { spec: SceneSpec }) {
  const kinds = Array.from(new Set(spec.targets.map((t) => t.kind)))
  return (
    <div className="sb3d-legend">
      <span className="sb3d-legend-title">Probabilidade (fusão)</span>
      <span className="sb3d-legend-ramp">
        <i style={{ background: RAMP_CSS }} />
        <em>0</em>
        <em>50</em>
        <em>100%</em>
      </span>
      <span className="sb3d-legend-sep" />
      <span className="sb3d-legend-item"><i className="sb3d-cube sb3d-cube--alta" /> ≥90%</span>
      <span className="sb3d-legend-item"><i className="sb3d-cube sb3d-cube--media" /> 70–90%</span>
      <span className="sb3d-legend-item"><i className="sb3d-cube sb3d-cube--baixa" /> &lt;70%</span>
      <span className="sb3d-legend-sep" />
      {kinds.map((k) => (
        <span key={k} className={`sb3d-legend-item sb3d-legend-item--${k}`}>
          {MARKER[k]} {MATERIAL_NAME[k]}
        </span>
      ))}
      <span className="sb3d-legend-note">prof. 0–5 m · v≈0,10 m/ns</span>
    </div>
  )
}

export interface SubsurfaceBlockProps {
  scenario: ScenarioMeta
}

/**
 * Bloco 3D interpretativo da área escaneada (E5 · Resultado — D-020/CA-04).
 * Template único dos 5 cenários, fiel ao que a geofísica real entrega
 * (pesquisa verificada 2026-07-08): terreno do cenário, grade de varredura +
 * trilha RTK, achados como voxels de probabilidade com limiares e atenuação
 * em profundidade, estados da fusão (C4), radargrama sintético e legenda com
 * colorbar. Sem spec de cena ou sem WebGL, cai no placeholder textual.
 */
export function SubsurfaceBlock({ scenario }: SubsurfaceBlockProps) {
  const spec = getSceneSpec(scenario.id)
  const reduced = usePrefersReducedMotion()
  const [glOk] = useState(webglAvailable)

  if (!spec || !glOk) {
    return (
      <div className="sb3d-fallback">
        <div className="sb3d-fallback-label">[ Bloco 3D do subsolo · perspectiva em 1ª pessoa ]</div>
        <div className="sb3d-fallback-caption">
          vídeo interpretativo (Guarasoft) · marcadores: {scenario.targets.map((t) => t.label).join(', ')}
        </div>
      </div>
    )
  }

  // câmera elevada ("god view" da referência), distância proporcional à área
  const dist = Math.max(scenario.area.x, scenario.area.y) * 1.55
  return (
    <div className="sb3d-canvas" aria-hidden="true">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [dist * 0.95, dist * 0.11, dist * 1.1], fov: 38 }}
        onCreated={({ camera }) => camera.lookAt(0, -DEPTH_M / 2 + 0.2, 0)}
      >
        <BlockScene scenario={scenario} spec={spec} reduced={reduced} />
      </Canvas>
      <RadargramInset scenario={scenario} spec={spec} />
      <Legend spec={spec} />
    </div>
  )
}
