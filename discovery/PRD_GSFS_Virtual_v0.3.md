# Documento de Requisitos de Produto (PRD)

**GSFS Virtual — Simulador Técnico-Institucional de Alta Fidelidade Conceitual**

| | |
|---|---|
| **Versão:** | 0.3 (Rascunho para Validação) |
| **Data:** | 19/05/2026 |
| **Status:** | Em Validação |
| **Responsável Técnico:** | Jonathan — Product Manager / Product Designer (Result) |
| **Coordenação do Projeto:** | David Jussier (Result) │ Cliente: Valdinei |

---

## 1. Informações Gerais e Governança

### 1.1. Contexto e Propósito do Documento

Este PRD consolida o entendimento técnico e de design da Result para o escopo de prototipação do Projeto SON. Este documento formaliza e substitui os alinhamentos prévios das reuniões de 05/05/2026 e 12/05/2026, integrando formalmente:

- O documento de Diretrizes Técnicas Obrigatórias — GSFS Virtual Funcional fornecido pelo cliente.
- A Arquitetura em Quatro Pilares Funcionais proposta pela coordenação da Result.
- A Resposta de Princípios Técnicos do cliente, que delimita a fidelidade e o simbolismo do simulador.

> *Pacto de Alinhamento (12/05): Este documento visa eliminar assimetrias de escopo antes do início do desenvolvimento. Nenhuma linha de código ou interface será produzida antes da validação integral deste PRD pelo cliente.*

---

## 2. Visão Geral do Produto

### 2.1. Definição do Produto

Plataforma conceitual ciber-física multimodal voltada à prospecção e interpretação subsuperficial, atualmente em estruturação conceitual e arquitetural pelo cliente.

### 2.2. Matriz de Escopo (O que é vs. O que NÃO é)

| **O GSFS Virtual É:** | **O GSFS Virtual NÃO É:** |
|---|---|
| Um ambiente interativo baseado em código web leve (Figma Make / Base44). | O software embarcado real ou o firmware do equipamento físico. |
| Um demonstrador do pipeline operacional e lógica de decisão da IA. | A IA operacional de produção (Edge AI de classificação real). |
| Uma ferramenta de alta fidelidade conceitual e simbólica. | Uma implementação funcional de RTK, blockchain ou telemetria real. |
| Um protótipo dinâmico com comportamento determinístico. | Um protótipo estático em Figma puro ou sequência linear de vídeos passivos. |

### 2.3. Propósito e Casos de Uso Previstos

- **Demonstração Estratégica:** Apresentações de alto impacto para investidores, mineradoras, órgãos públicos e parceiros técnicos.
- **Validação Conceitual:** Teste da experiência de uso (UX) e do fluxo de trabalho do equipamento antes do congelamento do hardware.
- **Captação de Recursos:** Suporte institucional para editais de fomento (FINEP, EMBRAPII) e parcerias com institutos de pesquisa (LACTEC, UFLA/Zetta).
- **Apresentações Guiadas:** Operação em tempo real conduzida pelo cliente diante de audiências técnicas.

O simulador possui finalidade demonstrativa, institucional e estratégica, não representando software operacional definitivo nem solução geofísica validada cientificamente nesta etapa.

### 2.4. Princípios Técnicos Fundamentais (A Régua do Escopo)

1. **Fidelidade Conceitual Superior:** O foco reside na experiência técnica e institucional, e não no desenvolvimento do sistema embarcado final.

2. **Caráter Simbólico e Plausível:** As representações de IA, Edge AI, blockchain, RTK, telemetria e processamento de sinal serão simuladas visualmente de forma fidedigna, sem execução de algoritmos complexos ou infraestrutura produtiva. Os elementos apresentados relacionados à integridade, rastreabilidade, posicionamento e telemetria possuem finalidade exclusivamente demonstrativa e conceitual nesta etapa, não caracterizando implementação funcional definitiva de infraestrutura criptográfica, geodésica ou forense.

3. **Coerência do Pipeline:** O foco da interface deve garantir a percepção lógica do fluxo contínuo: Aquisição → Fusão → Interpretação → Visualização → GSFS_RECORD.

4. **Métricas como Referência Visual:** Valores numéricos exibidos (latência, indicadores visuais simulados de posicionamento de alta precisão, profundidade) são dados simulados plausíveis e não claims técnicos ou compromissos operacionais definitivos nesta fase.

5. **Estabilidade Arquitetural:** Priorização da robustez da aplicação para garantir apresentações ao vivo sem falhas.

6. **Preservação da Identidade Própria:** Embora utilize referências de mercado para benchmark tecnológico e validação de categoria, o GSFS Virtual deve preservar identidade visual, estrutural e narrativa própria, evitando reprodução direta de layouts, nomenclaturas ou arquiteturas associadas a plataformas comerciais específicas.

### 2.5. Plataforma Tecnológica Adotada

- **Tecnologia:** Figma Make ou framework web leve orientado à prototipação interativa de alta fidelidade conceitual.
- **Justificativa de UX/Engenharia:** Requisitos como temporização dinâmica (data/hora, taxa de consumo de bateria), variação probabilística de dados durante a varredura, transição fluida de visualizações 3D e replays determinísticos superam as capacidades técnicas do Figma estático. A abordagem escolhida une a agilidade do design com o poder lógico do JavaScript.

---

## 3. Público-Alvo e Contexto de Uso

### 3.1. Personas e Níveis de Interação

- **Público do Equipamento Real (Referência de Interface):** Operadores de campo em mineração (primário) e equipes de Defesa Civil (secundário). A interface deve refletir a robustez exigida por esse perfil.
- **Público do Simulador (Usuário Ativo):** O próprio cliente, atuando como apresentador/guia da tecnologia.
- **Contexto de Operação:** Demonstração interativa controlada. O sistema deve ser autoexplicativo e gerar alto valor visual, priorizando estabilidade, clareza operacional e fluidez institucional durante apresentações técnicas.

---

## 4. Arquitetura Funcional (Os Quatro Pilares)

### Pilar 1: Visualização e Interpretação Subsuperficial

- **Renderização Volumétrica GPR:** Representação em fatias de tempo (time-slices) simuladas em 3D, permitindo o isolamento de camadas do solo.
- **Detecção e Classificação Simbólica Assistida:** Identificação visual e marcação de objetos enterrados, cavidades e anomalias geológicas.
- **Mapa de Calor EMI:** Exibição bidimensional (2D) representando a condutividade do solo, umidade e massas metálicas.

### Pilar 2: Monitoramento e Telemetria em Tempo Real

- **Posicionamento GNSS/RTK Simbólico:** Indicador visual de fixação centimétrica e coordenadas dinâmicas.
- **Estabilização e IMU (6 Eixos):** Telemetria simulada de inclinação (roll/pitch), aceleração e direção (heading).
- **HUD de Status Global:** Painel persistente exibindo dinamicamente a temperatura, nível de bateria e integridade dos sensores.

### Pilar 3: Pipeline de Processamento e Integridade

- **Aquisição Sintética Dinâmica:** Fluxo de dados simulado a partir dos 4 sensores integrados (GPR, EMI, IMU, GPS/RTK).
- **Fusão Multimodal Simbólica:** Unificação lógica dos dados para gerar a interpretação de tela.
- **Cadeia de Custódia Demonstrativa:** Representação visual simbólica de integridade e rastreabilidade de dados (geração de hash) associada ao Geo-Cartucho.
- **Simulação de Degradação de Sinal:** Comportamento visual mapeado para zonas de interferência e baixa confiança de dados.

### Pilar 4: Gerenciamento de Missão e Exportação

- **Setup de Operação:** Configuração pré-coleta de solo, área, modalidade e cenário técnico.
- **Log de Missão:** Registro cronológico em tempo real de eventos e anomalias detectadas.
- **GSFS_RECORD:** Módulo de persistência simulada da sessão de coleta.
- **Modo Replay:** Reprodução determinística e fiel de sessões previamente executadas.
- **Exportação Simbólica:** Interface de geração de arquivos demonstrando cenários de integração futura (GIS, BIM, PDF).

---

## 5. Detalhamento dos Requisitos Funcionais

### 5.1. Inicialização e Autoteste (Boot)

Interface simulando a inicialização de um painel de instrumentos industrial. Verificação sequencial automática: status de bateria, conectividade dos 4 sensores, sinal GPS, sistema de gravação e criptografia do cartucho. (Dependência: cliente fornecerá a referência visual para esta tela.)

### 5.2. Configuração de Missão

A interface deve disponibilizar seletores estruturados para:

- **Tipo de Solo:** Rochoso, Arenoso ou Úmido.
- **Área de Varredura:** Definição de eixos (ex: 20x20m) parametrizados.
- **Modalidade:** Carrinho Autônomo, Mochila ou Manual.
- **Cenário:** Seleção direta a partir da Biblioteca de Cenários.

### 5.3. Tela de Execução da Varredura

Interface de alta fidelidade funcional operando com variação dinâmica de dados no tempo:

- **Painel GPR:** Gráfico de eco/reflexão oscilando conforme a profundidade simulada.
- **Painel EMI:** Grade matricial de intensidade proporcional à condutividade teórica do cenário.
- **Painel IMU:** Gráfico vetorial de orientação com ruído e drift natural simulados para conferir realismo técnico.
- **Painel GPS/RTK:** Trajetória em mapa dinâmico com jitter controlado.
- **Elementos Persistentes:** Redução progressiva da bateria, aquecimento térmico simulado e indicador de progresso da varredura.

### 5.4. Detecção e Classificação

Ao cruzar coordenadas pré-programadas com alvos, o simulador aciona um alerta visual de detecção. Exibição de rótulos de classificação (ex: Ouro, Magnetita, Vazio, Água) com profundidade e ângulo do veio estimativos.

### 5.5. Entrega de Resultados e Bloco 3D

Ao término da varredura, o sistema renderiza o bloco 3D interpretativo do subsolo através de uma renderização interpretativa integrada à UI. Legenda técnica lateral consolidando: data/hora, volume cúbico identificado, estimativa de ativos e hash de segurança. Nota de Design: a renderização utilizará perspectiva em primeira pessoa (visão do operador).

### 5.6. Biblioteca de Cenários Pré-Programados

Disponibilização de 5 cenários determinísticos fixos (mesmo input = mesmo output). A escolha é realizada estritamente pelo apresentador. Pelo menos 1 cenário deve conter obrigatoriamente zonas de alta degradação de sinal e ruído magnético para comprovar a resiliência simulada do equipamento.

---

## 6. Requisitos Não-Funcionais (Qualidade e Performance)

- **Estabilidade em Apresentação:** Taxa de falhas zero durante a execução dos fluxos principais em demonstrações ao vivo.
- **Performance Visual:** Renderização fluida da interface com taxa alvo de >30 FPS.
- **Comportamento Determinístico:** O sistema não deve gerar dados randômicos absurdos ou saltos de interface que prejudiquem a credibilidade técnica.
- **Evolução do Código:** O código web gerado (JavaScript/HTML/CSS leve) deve ser limpo e documentado, estruturado para servir de base para o desenvolvimento do software real em etapas futuras.
- **Reatividades Dinâmicas Obrigatórias:** O relógio do sistema deve refletir o horário real da máquina e o consumo de bateria deve ser proporcional ao tempo de tela aberta.

---

## 7. Critérios de Aceitação Técnica (Checklist Sebrae)

- [ ] **CA-01:** Pipeline completo integrado (do autoteste à tela de exportação).
- [ ] **CA-02:** Coerência visual e temporal simultânea entre os 4 sensores na varredura.
- [ ] **CA-03:** Geração sistemática do registro GSFS_RECORD ao final de cada operação.
- [ ] **CA-04:** Bloco 3D final perfeitamente condizente com a trajetória e os alvos do cenário escolhido.
- [ ] **CA-05:** Exibição de percurso contínuo de varredura (evitando saltos abruptos de tela).
- [ ] **CA-06:** Presença de simulação de ruído/interferência eletromagnética em pelo menos 1 cenário.
- [ ] **CA-07:** Execução funcional do Modo Replay reproduzindo de forma idêntica a sessão gravada.
- [ ] **CA-08:** Ausência completa de claims técnicos fechados apresentados como garantia de fábrica.

---

## 8. Premissas e Restrições

### 8.1. Premissas

A interface adotará uma linguagem visual industrial e militarizada (ruggedized UI), adequada para telas de campo e mineração. Elementos tridimensionais complexos serão resolvidos via vídeos em alta fidelidade disparados por eventos de interface.

### 8.2. Restrições de Escopo

- **Limitação Contratual:** O projeto está estritamente inserido na Etapa 3 (Prototipação) do contrato Sebrae. Não há escopo para desenvolvimento de algoritmos de IA de produção ou engenharia de hardware.
- **Profundidade Teórica:** Para fins de escala e usabilidade na interface do simulador, a profundidade máxima exibida será fixada em 5 metros (diferente dos 30 metros nominais previstos para o equipamento físico futuro), conforme alinhado em reunião.

---

## 9. Pontos em Aberto (Bloqueios a Resolver)

1. **Matriz de Narrativa dos 5 Cenários:** validação da proposta de solos e minérios.
2. **Envio do Ativo 3D Corrigido:** fornecimento da imagem de referência do bloco de subsolo corrigida para perspectiva em primeira pessoa.
3. **Roteiro Técnico:** definição dos momentos exatos em que as detecções devem brotar na tela.
4. **Layout do Arquivo Exportado:** definição visual dos dados que devem constar no relatório simbólico.
5. **Identidade de Marca:** fornecimento de paleta de cores preferencial, tipografia e logo oficial do GSFS.
6. **Teto de Métricas:** lista de quais valores numéricos devem ser expressos com precisão e quais permanecem qualitativos.

---

## 10. Próximos Passos (Workflow)

Revisão/Aprovação PRD → Definição Detalhada dos Cenários → Design de Telas (UI) → Homologação por Marcos

---

## 11. Glossário Técnico do Projeto

- **GSFS:** Scanner Ciber-Físico de Subsolo Multimodal com IA Embarcada.
- **GSFS Virtual:** o produto digital especificado neste PRD; o simulador conceitual.
- **GPR (Ground Penetrating Radar):** radar de penetração de solo utilizado para mapeamento.
- **EMI (Electromagnetic Induction):** sensor de indução eletromagnética focado em condutividade.
- **IMU (Inertial Measurement Unit):** unidade de medição inercial (giroscópio e aceleração).
- **GPS/RTK:** sistema de posicionamento global cinemático em tempo real de alta precisão centimétrica (indicadores visuais simulados de posicionamento de alta precisão).
