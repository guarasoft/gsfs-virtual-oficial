# Layout do Arquivo Exportado — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Layout simbólico dos arquivos exportados (PDF, GIS, BIM)
**Versão:** 0.1 (Definição Interna Documentada)
**Data:** 28/05/2026 *(atualização cosmética em §7 alinhando ao painel do C5 — D-011)*
**Responsável Técnico:** Jonathan — Result
**Referências normativas:**
- PRD GSFS Virtual v0.3 (19/05/2026), seções 4 (Pilar 4), 5.5 e 9 (item 4)
- Matriz Narrativa dos 5 Cenários v0.2 (28/05/2026)
- Roteiro Técnico dos 5 Cenários v0.1 (26/05/2026)

---

## 1. Objetivo do documento

Resolver o **Ponto em Aberto nº 4 do PRD v0.3 (seção 9)** — *"Layout do Arquivo Exportado: definição visual dos dados que devem constar no relatório simbólico"* — formalizando os layouts simbólicos dos três formatos de exportação previstos no **Pilar 4** do PRD: **PDF** (relatório técnico-institucional), **GIS** (pacote geoespacial) e **BIM** (pacote arquitetônico/civil).

Conforme cronograma, este item é de **responsabilidade interna (Result)** e dispensa aprovação do cliente; ainda assim, é compartilhado para ciência junto à Matriz de Cenários e ao Roteiro Técnico.

---

## 2. Princípios da exportação simbólica

A exportação no GSFS Virtual respeita os Princípios Técnicos do PRD (seção 2.4):

| Princípio do PRD | Aplicação na exportação |
|---|---|
| Fidelidade conceitual superior (2.4.1) | Os arquivos devem parecer entregáveis institucionais reais, não placeholders. |
| Caráter simbólico e plausível (2.4.2) | Os arquivos são gerados como demonstração; nenhum dado representa medição científica real. Todos os documentos exibem disclaimer simbólico. |
| Coerência do pipeline (2.4.3) | Os dados exportados são consistentes com a sessão executada (trajetória, alvos, hash). |
| Métricas como referência visual (2.4.4) | Valores numéricos seguem o Teto de Métricas (documento separado). |
| Preservação da identidade própria (2.4.6) | Layout não imita formatos comerciais específicos. Identidade visual GSFS aplicada em todos os artefatos. |

### 2.1. Estratégia por formato

- **PDF — formato principal.** É o artefato visualmente mais elaborado, pensado para fechamento de demonstrações ao vivo, anexo a propostas FINEP/EMBRAPII e material institucional.
- **GIS — pacote simbólico.** Visualizado como uma "lista de arquivos" de pacote shapefile/geopackage, exibindo nomes plausíveis e metadados, sem geração real de arquivos com sintaxe binária.
- **BIM — pacote simbólico.** Idem, com arquivos IFC referenciais e metadados de integração.

---

## 3. Tela de exportação (UX)

A tela acessada ao final de cada cenário (e a partir da listagem de gravações via Modo Replay) apresenta:

- **Cabeçalho:** identificação da missão (cenário, data/hora, operador).
- **Três cards de formato lado a lado:** PDF, GIS, BIM. Cada card exibe ícone, breve descrição do uso ("Relatório institucional", "Integração geoespacial", "Integração construtiva") e botão "Gerar".
- **Ao clicar em um card:** abre o preview do artefato em modal/overlay (não download real). Botão secundário "Exportar arquivo" exibe animação de geração + toast "Arquivo simbólico gerado".

---

## 4. PDF — Relatório Técnico GSFS

**Formato:** A4 retrato, ~5 páginas. Identidade visual GSFS (paleta industrial ruggedized, fonte sem-serifa técnica, dado fornecido pelo cliente; até então, paleta interna provisória).

### 4.1. Página 1 — Capa institucional

| Bloco | Conteúdo |
|---|---|
| Topo | Logo GSFS + marca d'água "SIMULAÇÃO TÉCNICA — DOCUMENTO DEMONSTRATIVO" |
| Centro | Título: "RELATÓRIO TÉCNICO DE VARREDURA SUBSUPERFICIAL" |
| Sub-centro | Nome do cenário (ex: "Veio de Ouro em Encosta Rochosa") |
| Quadro de identificação | Missão ID · Data/hora · Operador · Modalidade · Solo · Área varrida |
| Rodapé | Versão do simulador · Hash da sessão (curto, 8 caracteres) · Carimbo simbólico de integridade |

### 4.2. Página 2 — Sumário executivo

| Bloco | Conteúdo |
|---|---|
| Resumo da operação | Parágrafo de 3-4 linhas descrevendo a varredura, sem claims absolutos. |
| Métricas-chave (cards) | Tempo total · Área coberta · Profundidade máxima atingida · N° de alvos detectados · N° de falsos-positivos descartados (quando aplicável) · Confiança média da sessão |
| Status dos 4 sensores | Tabela compacta: GPR, EMI, IMU, GNSS-RTK — status final, tempo ativo, observações. |
| Indicadores ambientais | Bateria final · Temperatura final · Duração da sessão |

### 4.3. Página 3 — Mapa de varredura

| Bloco | Conteúdo |
|---|---|
| Planta em vista superior | Área retangular do cenário (10×10m, 20×20m, etc.) com trajetória completa da varredura traçada. |
| Marcadores de alvo | Cada alvo detectado plotado com seu ícone (`[Au]`, `[M]`, `[V]`, `[H2O]`) e coordenada relativa. |
| Zonas de degradação | Quando aplicável (Cenário 4), faixas hachuradas com legenda "Baixa confiança". |
| Legenda | Modalidade, escala, orientação (rosa-dos-ventos simbólica). |

### 4.4. Página 4 — Alvos detectados

| Bloco | Conteúdo |
|---|---|
| Tabela de alvos | Linhas: cada alvo com Classificação · Profundidade · Ângulo (quando aplicável) · Posição relativa · Volume estimado · Sensor(es) que confirmaram · Confiança simbólica |
| Vista do bloco 3D | Captura simbólica da renderização interpretativa em 1ª pessoa, com os alvos visíveis. |
| Detecções descartadas | Quando aplicável (Cenário 4), subtabela menor com falsos-positivos e justificativa ("descartado por fusão multimodal — ruído eletromagnético"). |

### 4.5. Página 5 — Cadeia de custódia e integridade

| Bloco | Conteúdo |
|---|---|
| Cadeia de custódia | Linha do tempo simbólica: início da sessão · sensores ativados · primeiro ponto de varredura · cada detecção (com timestamp) · selo do GSFS_RECORD · geração do hash final. |
| Hash de segurança | Hash SHA-256 simbólico completo (32 caracteres), exibido em fonte monoespaçada. Boxe destacado. |
| Geo-Cartucho | Identificador simbólico do cartucho de gravação (ex: `GSFS-RECORD-2026-05-26-001`). |
| Disclaimer | Texto fixo: "Documento gerado em ambiente de simulação técnico-institucional. Os valores apresentados são representações simbólicas e plausíveis, não constituindo medições científicas validadas. As referências a integridade criptográfica, posicionamento geodésico e telemetria possuem finalidade exclusivamente demonstrativa." |
| Assinatura simbólica | Logo GSFS · "Selado eletronicamente" · timestamp da geração |

---

## 5. GIS — Pacote simbólico geoespacial

**Apresentação:** preview de "pacote ZIP" listando arquivos plausíveis, com painel de metadados ao lado. Nenhum arquivo binário é efetivamente gerado.

### 5.1. Lista de arquivos do pacote

```
gsfs_varredura_<missionId>.zip
├── varredura_trajetoria.shp        (linha — trajetória da varredura)
├── varredura_trajetoria.dbf        (atributos da trajetória)
├── varredura_trajetoria.shx        (índice)
├── alvos_detectados.shp            (pontos — cada alvo)
├── alvos_detectados.dbf            (atributos dos alvos)
├── area_varrida.shp                (polígono — bounding box)
├── zonas_degradacao.shp            (polígonos — apenas se aplicável)
├── metadata.xml                    (FGDC/ISO 19115 simbólico)
└── README.txt                      (instruções de uso simbólicas)
```

### 5.2. Atributos exibidos no preview

| Camada | Atributos simbólicos |
|---|---|
| `alvos_detectados.dbf` | id · classificacao · profundidade_m · angulo_deg · volume_m3 · confianca · sensor_confirmacao · timestamp |
| `varredura_trajetoria.dbf` | id · timestamp · vel_implicita · modalidade |
| `metadata.xml` | datum (WGS84 simbólico) · CRS (EPSG:4326 simbólico) · operador · missao · disclaimer |

### 5.3. Disclaimer GIS

Texto fixo exibido no preview: *"Pacote geoespacial simbólico. Coordenadas e datums apresentados são simulados para fins demonstrativos. Integração efetiva com sistemas GIS de produção dependerá da implementação operacional definitiva."*

---

## 6. BIM — Pacote simbólico arquitetônico/civil

**Apresentação:** preview análogo ao GIS, com lista de arquivos IFC simbólicos.

### 6.1. Lista de arquivos do pacote

```
gsfs_subsolo_<missionId>.zip
├── modelo_subsolo.ifc              (modelo IFC simbólico do bloco subsuperficial)
├── alvos_subsolo.ifc               (alvos como elementos paramétricos)
├── trajetoria_aquisicao.ifc        (trajetória como elemento linear)
├── metadata.json                   (metadados estruturais simbólicos)
└── README.txt                      (instruções de uso simbólicas)
```

### 6.2. Atributos simbólicos exibidos

| Elemento | Atributos |
|---|---|
| Bloco do subsolo | Profundidade da base (5m teórico) · Volume total · Sistema de coordenadas local |
| Alvos | Geometria paramétrica (esfera/cilindro/volume) · Posição local · Classificação · Volume |
| Trajetória | Polilinha local · Timestamps por vértice |

### 6.3. Disclaimer BIM

Texto fixo exibido no preview: *"Pacote BIM simbólico. Elementos IFC apresentados são modelos paramétricos simulados para fins demonstrativos de integração com plataformas de modelagem construtiva. Não representam medição estrutural validada."*

---

## 7. Cobertura por cenário

Todos os 5 cenários da Matriz produzem os 3 formatos, com nuances:

| Cenário | Particularidade no PDF | Particularidade no GIS | Particularidade no BIM |
|---|---|---|---|
| C1 | Vista do veio de ouro em destaque | `alvos_detectados.shp` com 2 pontos | Modelo IFC com veio e magnetita |
| C2 | Padrão geométrico das 3 massas no mapa | 3 pontos + heatmap simbólico | 3 elementos paramétricos volumétricos |
| C3 | Card-resumo Defesa Civil destacado | `alvos` com cavidade + lençol | IFC com cavidade vazada |
| C4 | Subtabela de falsos-positivos descartados | `zonas_degradacao.shp` populado | IFC apenas com o ouro confirmado |
| C5 | 4 alvos + painel "GSFS — Inteligência Subsuperficial Integrada" (5 atributos) como anexo visual | 4 pontos + zonas | 4 elementos paramétricos |

---

## 8. Aderência ao PRD

| Requisito do PRD | Como o layout atende |
|---|---|
| **Pilar 4 — Exportação Simbólica (GIS, BIM, PDF)** | Os 3 formatos previstos no Pilar 4 estão contemplados. |
| **5.5 — Legenda consolidando data/hora, volume, ativos, hash** | Cobertos nas páginas 1 (data/hora), 4 (volume e ativos) e 5 (hash) do PDF, e nos metadados de GIS/BIM. |
| **CA-01 — Pipeline completo (até a tela de exportação)** | Tela de exportação encerra o pipeline; layout dos três formatos definido. |
| **CA-03 — Geração sistemática do GSFS_RECORD** | O GSFS_RECORD é referenciado na página 5 do PDF e nos cabeçalhos dos pacotes GIS/BIM. |
| **CA-08 — Ausência de claims técnicos fechados** | Disclaimer obrigatório em todos os três formatos. |
| **2.4.6 — Preservação de identidade própria** | Layouts originais; nenhum imita formatos comerciais específicos. |

---

## 9. Dependências e itens em aberto

- **Identidade de marca (Ponto em Aberto nº 5 do PRD):** paleta, logo e tipografia oficiais entram na capa do PDF e nos cabeçalhos dos previews GIS/BIM. Até a entrega pelo cliente, paleta provisória ruggedized.
- **Teto de métricas (Ponto em Aberto nº 6 do PRD):** define a precisão dos valores numéricos exibidos no relatório (profundidade, volume, confiança).
- **Ativo 3D corrigido em 1ª pessoa (Ponto em Aberto nº 2 do PRD):** alimenta a captura inserida na página 4 do PDF.

---

## 10. Validação interna

- [x] **VL-01:** Cobertura dos 3 formatos previstos no Pilar 4 do PRD.
- [x] **VL-02:** Cobertura dos 4 elementos obrigatórios da seção 5.5 do PRD (data/hora, volume, ativos, hash).
- [x] **VL-03:** Disclaimers simbólicos presentes nos 3 formatos (atende CA-08).
- [x] **VL-04:** Particularidades por cenário documentadas.
- [ ] **VL-05:** Identidade visual aplicada (pendente entrega do cliente).
- [ ] **VL-06:** Valores numéricos consistentes com o Teto de Métricas (pendente documento separado).

---

*Documento sujeito a ajuste após entrega da identidade de marca e do Teto de Métricas. Uma vez consolidado, este layout será referência normativa para a implementação da tela de exportação na Fase 3.*
