# Vídeo 3D — Cenário 4: Operação sob Interferência Eletromagnética (CA-06)

> Ler junto com **00-regras-gerais.md**. Este é o cenário obrigatório do **CA-06** (degradação de sinal + ruído magnético + falsos-positivos descartados pela fusão).

## Identificação
- **Aplicação:** Demonstração de **resiliência operacional** (mineração).
- **Solo:** Rochoso com **massas metálicas espúrias** distribuídas.
- **Modalidade:** Carrinho Autônomo.
- **Área (planta):** **25 × 25 m** (a maior) × 5,0 m de profundidade.
- **Duração do vídeo:** **20 s**, em loop.
- **Volume (simbólico):** ~**1,8 m³** (1 alvo confirmado).

## Cena / ambientação
- **Ruído magnético alto desde o início** (clima "instável"). A grande ideia visual é o **contraste antes/depois da fusão**: ruído poluindo a cena → sinal limpo com o ouro real emergindo.
- Tema "resiliência": o sistema **discrimina sinal de ruído**.

## Trajetória (percurso)
- **Raster regular** (carrinho), cobrindo a área de 25×25 m.

## Elementos a mostrar (em ordem)

| Elemento | Quando | Representação | Cor/estado |
|---|---|---|---|
| **Zona de degradação NW** | início | faixa **sombreada**, "BAIXA CONFIANÇA" | preenchimento `rgba(229,72,77,.18)`, borda `#C7363B` |
| **Falso-eco 1** (Magnetita "fantasma") | depois | surge como **suspeita** → **descartado** (marcador **riscado**) | suspeita âmbar `#F5A623` → descartado vermelho `#E5484D` |
| **Falso-eco 2** (Magnetita "fantasma") | depois | igual ao 1 (suspeita → riscado) | âmbar → vermelho |
| **Zona de degradação SE** | depois | segunda faixa sombreada | igual à NW |
| **Ouro real** | clímax | **veio confirmado**, emergindo do ruído | dourado `#F5A623` + halo **verde** `#7ED321` (CONFIRMADO) |

## Alvo confirmado

| Material | Marcador | Profundidade | Ângulo | Status | Representação |
|---|---|---|---|---|---|
| Ouro (veio) | `[Au · CONFIRMADO]` | **3,2 m** | **~50°** | **confirmado por 3 sensores (fusão)** | veio planar inclinado a ~50°, com halo verde de confirmação |

## Sequência de revelação (beat sheet — 20 s, loop)
- **0–3 s:** cena ruidosa (ruído magnético alto) + raster começando.
- **3–6 s:** **zona de degradação NW** sombreada; **Falso-eco 1** pisca como suspeita e é **riscado/descartado**.
- **6–10 s:** **Falso-eco 2** (suspeita → riscado) + **zona de degradação SE**.
- **10–16 s:** **fusão** limpa a cena; o **Ouro real (3,2 m, ~50°)** emerge **confirmado** (halo verde) — contraste antes/depois.
- **16–20 s:** vista consolidada (1 confirmado, 2 descartados, faixas de baixa confiança) girando; loop.

## Métricas que fazem sentido exibir
- Profundidade `3,2 m`; ângulo `50°`; **1 alvo confirmado, 2 falsos-positivos descartados**; **% sinal recuperado** (índice de resiliência — única métrica numérica de resiliência permitida). Confiança por região é **qualitativa** (`BAIXA/MÉDIA/ALTA`).

## Ênfase narrativa
- Fusão multimodal corrigindo ruído (Pilar 3); atende diretamente ao **CA-06**.
