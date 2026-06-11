import { DocSection, DocBlock, Cell } from '../docs-kit'

export default function Logo() {
  return (
    <DocSection
      title="Logo"
      desc="Lockup horizontal (aplicação principal) e símbolo isolado para usos compactos. Versão colorida sobre fundos escuros; mono branco para fundos escuros/foto; mono preto para fundos claros."
    >
      <DocBlock title="Lockup horizontal (aplicação principal)">
        <Cell label="RGB / cor">
          <div style={{ background: 'var(--color-bg)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Primary_Horizontal_RGB.svg" alt="GSFS logo colorido" height={48} />
          </div>
        </Cell>
        <Cell label="Mono branco">
          <div style={{ background: 'var(--navy-700)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Primary_Horizontal_Mono_White.svg" alt="GSFS mono branco" height={48} />
          </div>
        </Cell>
        <Cell label="Mono preto (fundo claro)">
          <div style={{ background: 'var(--neutral-100)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Primary_Horizontal_Mono_Black.svg" alt="GSFS mono preto" height={48} />
          </div>
        </Cell>
      </DocBlock>

      <DocBlock title="Símbolo isolado (usos compactos: ícone, splash, favicon, botões reduzidos, estados de sistema)">
        <Cell label="RGB / cor">
          <div style={{ background: 'var(--color-bg)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Icon_RGB.svg" alt="Símbolo GSFS colorido" height={72} />
          </div>
        </Cell>
        <Cell label="Mono branco">
          <div style={{ background: 'var(--navy-700)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Icon_Mono_White.svg" alt="Símbolo GSFS mono branco" height={72} />
          </div>
        </Cell>
        <Cell label="Mono preto (fundo claro)">
          <div style={{ background: 'var(--neutral-100)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Icon_Mono_Black.svg" alt="Símbolo GSFS mono preto" height={72} />
          </div>
        </Cell>
      </DocBlock>

      <DocBlock title="Símbolo em tamanhos reduzidos (legibilidade)">
        <Cell label="48 px">
          <div style={{ background: 'var(--color-bg)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Icon_RGB.svg" alt="Símbolo GSFS 48px" height={48} />
          </div>
        </Cell>
        <Cell label="32 px (favicon)">
          <div style={{ background: 'var(--color-bg)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Icon_RGB.svg" alt="Símbolo GSFS 32px" height={32} />
          </div>
        </Cell>
        <Cell label="20 px (estado de sistema)">
          <div style={{ background: 'var(--color-bg)', padding: 24, borderRadius: 8 }}>
            <img src="/logos/GSFS_Logo_Icon_RGB.svg" alt="Símbolo GSFS 20px" height={20} />
          </div>
        </Cell>
      </DocBlock>
    </DocSection>
  )
}
