# Briefing dos Vídeos 3D de Resultado — Regras Gerais (todos os cenários)

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Especificação técnica para produção dos 5 vídeos 3D de fechamento (E5 · Resultado)
**Público:** equipe/profissional que produzirá os vídeos (Guarasoft — D-019)
**Base normativa:** PRD v0.3 §5.5; CA-04 (bloco 3D condizente com trajetória e alvos); CA-08 (sem claims fechados); D-016 (E5 funde Resultado + Bloco 3D); D-020 (vídeo aplicado no fechamento, mantendo a sensação de percurso e os momentos de revelação dos ativos); Roteiro Técnico; Matriz de Cenários; Teto de Métricas v1.0.

> Estas regras valem para **todos** os 5 vídeos. Cada cenário tem um documento próprio com os detalhes específicos (alvos, profundidades, trajetória, sequência).

---

## 1. O que é o vídeo

- Um **bloco 3D interpretativo da área escaneada**, em **perspectiva de 1ª pessoa** (PRD §5.5), exibido no container dedicado da tela de **Resultado (E5)**.
- Estética **simbólica, plausível e institucional** — não é renderização científica real (PRD 2.4.2 / CA-08).
- Deve transmitir: (a) o **percurso da varredura** na superfície (conforme a modalidade), e (b) os **momentos de revelação** de cada alvo, na ordem documentada (D-020).
- **Fiel ao simulador:** posições, profundidades, ângulos e dimensões dos alvos seguem o documento de cada cenário (CA-04).

---

## 2. Duração e loop

| Cenário | Duração do vídeo |
|---|---|
| C1, C2, C3, C4 | **20 s** |
| C5 (showcase) | **30 s** |

- **Loop perfeito (seamless):** o bloco pode ficar **girando** (órbita lenta) e o vídeo **reinicia sem corte perceptível** (o último frame casa com o primeiro).
- A duração do vídeo é **independente** da duração da varredura no simulador (90 s / 135 s); o vídeo é uma síntese condensada. A ordem de revelação dos alvos é o que importa (ver beat sheet de cada cenário).

---

## 3. Formato, escala e encaixe no container (E5)

- **Container na tela de Resultado (E5):** coluna esquerda de um layout `bloco 3D (flexível) | legenda 340 px`, dentro de um corpo com 24 px de respiro e uma barra de ações no rodapé. A proporção efetiva varia conforme o dispositivo:
  - Tablet (1280×800): ~**3:2** (≈ 868 × 570 px).
  - Notebook (1366×768): ~**16:9** (≈ 954 × 540 px).
- **Master recomendado:** **16:9, 1920×1080**.
- **Área segura:** mantenha o bloco e os rótulos essenciais dentro de uma **faixa central de ~3:2**, para que nada importante seja cortado quando o container ficar mais largo (16:9) ou mais quadrado (3:2).
- **Preenchimento:** o vídeo **preenche o container (cover)**, sem tarjas pretas. O fundo deve **sangrar até as bordas** na cor do container para não criar emenda.
- **Cantos arredondados:** são aplicados pelo container (raio ~12 px, com overflow). O vídeo pode ser **retangular** — não precisa arredondar.

---

## 4. Fundo e ambientação (cores do sistema)

- **Fundo:** o **azul padrão** do sistema. Use a cor da superfície do container para casar perfeitamente:
  - Fundo da aplicação: **`#0A1324`** (`--color-bg`, navy profundo).
  - **Superfície do container 3D: `#0D1F3A`** (`--color-bg-surface`) — **use esta como cor de fundo do vídeo**.
- **Ambientação técnica (como o placeholder atual):**
  - Grade técnica sutil (linhas finas) ao fundo, baixa opacidade.
  - **Vinheta radial** suave escurecendo as bordas em direção ao centro (foco no bloco).
- **Paleta institucional do sistema (use somente estas famílias):**

| Papel | Cor | Hex |
|---|---|---|
| Fundo app | navy-950 | `#0A1324` |
| Superfície (fundo do vídeo) | navy-900 | `#0D1F3A` |
| Superfície elevada | navy-800 | `#14294A` |
| Borda/estrutura | steel-blue | `#1E3A5F` |
| **Primária (ciano de marca)** | cyan-500 | `#00B6C8` |
| Acento/confirmado | green-500 | `#7ED321` |
| Alerta/suspeita | amber-500 | `#F5A623` |
| Erro/descartado | red-500 | `#E5484D` |
| Texto | neutral-100 | `#E6EAF0` |
| Texto secundário | neutral-400 | `#8190A8` |

- **Gradiente de marca (opcional, p/ acabamento):** navy → ciano → verde (`#0A1324 → #00B6C8 → #7ED321`).

---

## 5. Eixo de profundidade (coeso entre TODOS os vídeos)

- **Eixo vertical = profundidade.** Superfície em **0 m** (topo do bloco) → **5,0 m** no fundo (teto fixo do simulador — PRD 8.2).
- **A escala de profundidade é ABSOLUTA e idêntica nos 5 vídeos:** um alvo a 3,0 m aparece **na mesma altura visual** no C1 e no C5. Não use escala relativa por cenário.
- O volume da cena é **área do cenário (X×Y m em planta) × 5,0 m de profundidade**.
- Marcações de profundidade discretas (ex.: 0 · 2,5 · 5 m) são bem-vindas como referência lateral.

---

## 6. Materiais — cores e marcadores

Cada alvo é plotado na sua **profundidade** e **posição** com um **marcador rotulado**:

| Material | Rótulo | Cor sugerida | Hex | Representação no 3D |
|---|---|---|---|---|
| Ouro (veio) | `[Au]` | dourado/âmbar | `#F5A623` | veio **planar inclinado** (usar o ângulo); brilho sutil |
| Magnetita | `[M]` | violeta (convenção de mapa magnético) | `#9B6DFF` | massa/bloco sólido |
| Vazio/Cavidade | `[V]` | contorno neutro translúcido (é oco) | contorno `#A6B2C6` | **cavidade oca** delimitada (sem preenchimento sólido) |
| Água/Lençol | `[H2O]` | ciano-água translúcido | `#2BC8D9` | **lâmina/camada** (horizontal contínua ou bolsão) |

> A cor da Magnetita (violeta) é um **acento de material** — o sistema cobre *estados* (verde/âmbar/vermelho), não 4 materiais; o violeta segue a convenção de mapas magnéticos. Ajustável se o cliente preferir outra.

**Estados (usados no Cenário 4):** suspeita = âmbar `#F5A623`; descartado = vermelho `#E5484D` (marcador **riscado**); confirmado = verde `#7ED321` (halo/contorno).

---

## 7. Trajetória (percurso) por modalidade

O caminho da varredura na superfície deve ser visível e condizente com a modalidade:

| Modalidade | Padrão do percurso |
|---|---|
| Manual | **zigue-zague livre** do operador |
| Carrinho Autônomo | **raster regular** (passadas paralelas, malha organizada) |
| Mochila / a pé | **caminhada orgânica** (linha mais livre), com re-passagens sobre o ponto crítico |

---

## 8. Teto de Métricas — o que pode aparecer como número

Se exibir números no vídeo, siga o Teto de Métricas v1.0:

| Métrica | Formato | Exemplo |
|---|---|---|
| Profundidade | 1 casa decimal + `m` | `3,0 m` |
| Ângulo do veio | inteiro + `°` | `65°` |
| Volume | 1 casa decimal + `m³` | `2,4 m³` |
| Posição | qualitativa | `NW · CENTRO · SE` |
| Coordenadas (se houver) | 4 casas, **simbólicas** | `−23,5489°` |
| Fixação GNSS | **qualitativa** | `FIX` |

**Proibido exibir (CA-08):** precisão RTK em centímetros (ex.: "±2 cm"), throughput (MB/s, Hz), % de acerto da IA, tempo de inferência (ms), resolução real do GPR, profundidade nominal de 30 m do equipamento, garantias/MTBF, pesos de fusão. Coordenadas e fixação ficam sempre **simbólicas/qualitativas**.

---

## 9. Checklist de entrega (por vídeo)

- [ ] Duração correta (20 s / 30 s no C5) e **loop perfeito**.
- [ ] 16:9 1920×1080, conteúdo essencial na área segura ~3:2, preenche o container.
- [ ] Fundo `#0D1F3A` sangrando às bordas + grade técnica + vinheta.
- [ ] Escala de profundidade 0–5 m **coesa** com os demais vídeos.
- [ ] Alvos nas profundidades/posições/ângulos/dimensões do doc do cenário, com marcadores e cores corretos.
- [ ] Percurso da varredura visível, conforme a modalidade.
- [ ] Ordem de revelação dos alvos conforme o beat sheet do cenário.
- [ ] Nenhuma métrica proibida (CA-08).
