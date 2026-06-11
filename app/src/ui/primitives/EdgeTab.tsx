import type { ButtonHTMLAttributes } from 'react'
import './EdgeTab.css'

export type EdgeTabSide = 'left' | 'right'

export interface EdgeTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  side: EdgeTabSide
}

// Aba flutuante ancorada na borda da tela, com rótulo vertical. Usada nas telas
// do simulador: "Voltar" (borda esquerda, ex.: Replay) e "Ações" (borda direita,
// ex.: Varredura). Posiciona-se em relação ao ancestral posicionado mais próximo.
export function EdgeTab({ side, className = '', ...rest }: EdgeTabProps) {
  return <button className={`gsfs-edge-tab gsfs-edge-tab--${side} ${className}`} {...rest} />
}
