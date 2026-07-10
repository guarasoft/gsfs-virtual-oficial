# Resposta ao Checklist Técnico de Validação — Bloco 3D Interpretativo GSFS

> Versão final de 10/07/2026 (`viewer.html`). Documento de acompanhamento: mapeia
> cada seção do checklist do cliente para como o componente atende. Para conferir,
> abrir o viewer e alternar entre as abas C1–C5.

## 1. Natureza da visualização — ATENDE

- O bloco é gerado de um **campo de probabilidade pós-fusão** (isosuperfícies por
  limiar, como os modelos de inversão reais), não de dado bruto de sensor.
- O selo no canto superior identifica: **"Interpretação multimodal consolidada ·
  Fusão GPR + EMI + IMU + GNSS/RTK"**.
- Nenhuma onda/eco/gráfico de sensor isolado compõe o bloco; o único gráfico de
  sensor é o inset rotulado **"Referência GPR · B-scan · linha central"**,
  explicitamente complementar (ver §6).
- Estética técnica e institucional (paleta da marca, tipografia mono, sem efeito
  de videogame).

## 2. Profundidade — ATENDE

- Régua lateral fixa com **divisão legível a cada 1 m, de 0 a 5 m**, alinhada aos
  anéis de estrato do bloco (1 anel por metro).
- Cada alvo é plotado na profundidade normativa do cenário (fonte única:
  `scenarios.ts`) e o chip do alvo repete o valor ("3,0 m").
- No C5, os 4 alvos ocupam 2,0 / 3,0 / 4,0 / 4,5 m — visualmente escalonados.

## 3. Referência espacial e geolocalização — ATENDE

- **Cada chip de alvo tem 3 linhas**: nome/classe · profundidade (+ ângulo e
  estado) · **coordenada UTM simulada** ("23K · 609.181 E · 7.805.883 N").
- O selo do bloco mostra a **origem da malha da missão** (mesma zona/valores
  coerentes com os alvos — offsets em metros dentro da área varrida).
- Tríade de eixos **X/Y/Z** + barra de escala de 1 m no canto do bloco.
- Linha tracejada da superfície ao alvo relaciona alvo ↔ trajetória ↔ volume.
- Coordenadas em **metros inteiros** — não sugerem precisão centimétrica (§10).

## 4. Morfologia dos alvos — ATENDE

- **Ouro/veio**: corpo tabular inclinado com espessura variável
  (pinch-and-swell), plano ondulado, descontinuidades (boudinage), ramificação
  divergente e vênulas irradiando — nunca chapa/caixa.
- **Magnetita**: massa compacta assimétrica (lóbulo principal + satélites
  fundidos, raio deformado por noise). No C2, A/B/C separadas e rotuladas.
- **Cavidade**: casca de interface com interior oco (o GPR vê a borda, não o
  preenchimento) + contorno tracejado discreto; na face do corte aparece como
  buraco escuro de borda fraturada — leitura de ausência de material.
- **Água**: lâmina/bolsão translúcido de topo irregular, sem núcleo sólido —
  comportamento visual distinto de alvo mineral; profundidades do briefing.
- **Falso-ecos (C4)**: sem núcleo sólido (só envelopes difusos vermelhos),
  rótulo riscado "DESCARTADO" — perdem destaque; o ouro confirmado permanece
  estável com contorno verde "CONFIRMADO".

## 5. Confiança da fusão — ATENDE

- Sem percentuais, sem taxa de acerto, sem probabilidade numérica.
- Legenda qualitativa exatamente nos estados recomendados: **ALTA · sólido /
  MÉDIA · translúcido / BAIXA · difuso**, mais **CONFIRMADO / DESCARTADO** no C4.
- Limiares internos do render nunca são expostos como número (Teto de Métricas).

## 6. Relação com os sensores — ATENDE

- Inset GPR pequeno, no canto, rotulado "**Referência** GPR · B-scan" — dado de
  apoio, não a fonte do bloco.
- O bloco principal leva o selo "Interpretação multimodal consolidada · Fusão
  GPR + EMI + IMU + GNSS/RTK".

## 7. Trajetória da missão — ATENDE

- Trilha RTK em destaque sobre o relevo + grade fina de aquisição (~0,5 m).
- Padrão por modalidade: zigue-zague manual (C1), raster de carrinho (C2/C4),
  orgânico de mochila (C3/C5).
- Linhas tracejadas ligam a trajetória aos alvos; coordenadas dos alvos caem
  dentro da malha varrida.

## 8. Superfície e volume do solo — ATENDE

- Heightfield com morfologia por cenário (encosta rochosa, campo arenoso, solo
  saturado, rochoso plano, transicional) — sem tampa plana.
- Transição superfície→subsolo com "saia" lateral contínua; bloco de rocha
  texturizada com seções dos corpos expostas nas faces do corte.
- Matriz escura de baixo contraste: os alvos dominam a leitura; grade de
  aquisição a 9% de opacidade (discreta).

## 9. Cenários — ATENDE

| Cenário | Conferência |
|---|---|
| C1 | encosta rochosa · magnetita 1,8 m · veio de ouro 3,0 m · 65° · morfologia irregular |
| C2 | 3 massas: A 1,5 m · B 2,2 m · C 3,1 m · separadas em planta e profundidade |
| C3 | cavidade (teto 2,5 m) · lençol 4,2 m · relação espacial visível no corte |
| C4 | 2 zonas de degradação + 2 falso-ecos descartados · ouro confirmado 3,2 m · 50° |
| C5 | ouro 2,0 m · magnetita 3,0 m · vazio 4,0 m · bolsão 4,5 m · leitura multicamadas, nada no mesmo plano |

## 10. Métricas proibidas — ATENDE (por omissão deliberada)

Não existem no componente: precisão RTK em cm · taxa de acerto de IA ·
probabilidade numérica · contagem de voxels · métricas de hardware ·
recomendação de perfuração · tonelagem. As coordenadas UTM usam metros
inteiros justamente para não implicar precisão centimétrica.

## 11. Resultado esperado — ATENDE

Em um relance o operador lê: **onde** (coordenada UTM + posição no volume),
**a que profundidade** (régua por metro + valor no chip), **o quê** (classe e
morfologia própria por material), **como se relaciona com a varredura**
(trilha RTK + linha de ligação) e **com que confiança** (ALTA/MÉDIA/BAIXA ·
CONFIRMADO/DESCARTADO).
