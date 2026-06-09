import { DocSection, DocBlock, Cell } from '../docs-kit'

export default function Logo() {
  return (
    <DocSection
      title="Logo"
      desc="Lockup horizontal único (validado, D-012). Versão colorida sobre fundos escuros; mono branco para fundos escuros/foto; mono preto para fundos claros."
    >
      <DocBlock title="Versões">
        <Cell label="RGB / cor (fundo escuro)">
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
    </DocSection>
  )
}
