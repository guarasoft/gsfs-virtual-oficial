# Pesquisa: o que sensores geofísicos reais entregam (fundamento do bloco 3D)

**Data:** 2026-07-08 · **Método:** deep research com verificação adversarial (cada afirmação
votada por 3 verificadores independentes contra a fonte primária; 22 confirmadas 3-0, 3 refutadas).
**Uso:** fundamenta o visual do bloco 3D de resultado (E5, Fase 4) para que especialistas de
mineração/geoespectral reconheçam a imagem como fidedigna — pedido do cliente na reunião de 08/07.

## Achados confirmados (e como o componente os aplica)

1. **GPR entrega amplitude × tempo duplo de percurso (ns), não profundidade nem material.**
   Profundidade é conversão via velocidade assumida (V = c/√εr). → Legenda exibe nota
   `prof. 0–5 m · v≈0,10 m/ns`. *(RGPR tutorials; gpg.geosci.xyz)*
2. **O sinal atenua com a profundidade; todo fluxo real aplica ganho (SEC).** Brilho uniforme em
   todas as profundidades denuncia imagem fake. → Probabilidade dos voxels decai com a
   profundidade, por cenário (C3 saturado ≫ C1 rocha); ruído do radargrama cresce com a
   profundidade. *(RGPR; UBC GPG; Sensors & Software)*
3. **Alvos pontuais aparecem como hipérboles de difração**; o ajuste da hipérbole dá a velocidade
   do solo. → Inset de radargrama B-scan sintético com hipérboles nos alvos. *(Manual GPR-SLICE)*
4. **Volumes 3D de GPR são interpolados de perfis 2D paralelos densos (~0,2–0,5 m).** Uma passada
   solta não gera volume. → Grade fina de linhas de aquisição + trilha RTK em destaque.
   *(RGPR; Grasmueck et al., Geophysics)*
5. **A grandeza mapeada é refletividade/energia relativa (Hilbert), não propriedade calibrada.**
   → Corpos coloridos por probabilidade da fusão, não por "material". *(Manual GPR-SLICE)*
6. **Isosuperfícies são superfícies de valor constante extraídas por limiar** (default ~75% do
   máximo no GPR-SLICE; grade shells no Oasis montaj; isovalue no Voxler), sombreadas com luz
   artificial. Um "veio" com forma de objeto limpo e nomeado denuncia fake. → Limiares visuais:
   ≥90% sólido · 70–90% translúcido · <70% fantasma ralo; formas irregulares por noise.
   *(GPR-SLICE pp.244-245; Seequent; Voxler QSG; Springer 2019)*
7. **Magnetômetro (mapa nT) só vira 3D via inversão voxel** (VOXI/UBC-GIF MAG3D — susceptibilidade
   por célula; inversão não-única e regularizada). → Massas magnetíticas como clusters voxel.
   *(Seequent/Geosoft; Li & Oldenburg; SimPEG)*
8. **Cenas críveis compõem múltiplos objetos num só sistema de coordenadas** (voxels + furos +
   superfícies), nunca um objeto flutuando. → Terreno + grade + trilha + alvos + eixos + régua +
   colorbar juntos. *(Seequent)*
9. **GPR sozinho = detecção tentativa** ("confirmou a *possível* presença de cavidades");
   caracterizar material exige segundo método. GPR + GNSS RTK é prática documentada. →
   Identificação de material aparece como saída da **fusão por IA** (a promessa do GSFS), com
   confiança explícita. *(Gaballah & Alharbi 2022, J. Taibah Univ. Sci.)*
10. **Praticantes validam contra o dado bruto** ("if it cannot be seen in the raw data — is it
    really there?", Cassidy 2009). → Inset de radargrama ao lado do resultado 3D. *(RGPR/Cassidy)*
11. **Vocabulário de renderização real é fixo:** fatias X/Y/Z, fence diagrams, cutaways,
    isosuperfícies, colormaps nomeados ligados a valores. → Colorbar 0–100% na legenda.
    *(GPR-SLICE; Voxler QSG; Gaballah 2019)*

## Afirmações REFUTADAS na verificação (não usar)

- "Time-zero + dewow + AGC" como cadeia de processamento padrão obrigatória (0-3).
- Isosurface rendering como "estado da arte" para fraturas/cavidades (1-2).
- Direct volume rendering como "modo padrão" de exibição volumétrica (0-3 — a fonte diz o oposto:
  a maioria das técnicas converte para superfícies).

## Lacunas (não inventar números)

- Assinatura específica de veio de ouro em quartzo (contraste dielétrico, dip/strike em radargrama)
  — **não verificado**; por isso o componente não exibe unidades físicas brutas do veio.
- Amplitude típica em nT de massa de magnetita a 2–5 m — **não verificado**; colorbar do bloco é
  probabilidade da fusão, não nT.
- Profundidade de penetração por frequência de antena em argila vs rocha (números) — parcial:
  clu-in.org/EPA indica <1 m em argilas condutivas e >30 m em areias saturadas resistivas; 5 m do
  GSFS é plausível apenas em terreno favorável (não-argiloso).
- Modelos "SD 2000/SD 4000" citados pelo cliente não correspondem a nenhum fabricante verificado.

## Fontes principais (todas checadas contra o texto original)

RGPR tutorials (emanuelhuber.github.io) · Manual GPR-SLICE (gpr-survey.com, Dean Goodman) ·
Voxler Quick Start Guide (Golden Software) · Seequent/Oasis montaj docs · UBC GPG/EOSC 350 ·
Gaballah & Alharbi 2022 (J. Taibah Univ. Sci. 16:1) · Gaballah 2019 (Sensing and Imaging 20:40) ·
US EPA CLU-IN (GPR) · gpg.geosci.xyz / em.geosci.xyz / computation.geosci.xyz (UBC-GIF).
