Product Requirements Document (PRD)
Nome do Produto: TransitoFacil (Nome Proposto)

Versão: 1.0

Data: 22 de maio de 2025

1. Visão Geral do Produto e Objetivos de Negócio
   1.1. Visão do Produto:
   O TransitoFacil será um software SaaS intuitivo e eficiente, projetado para simplificar e automatizar o processo de emissão, gestão e cancelamento de Manifesto Eletrônico de Documentos Fiscais (MDF-e) para transportadoras de cargas e embarcadores. Nosso objetivo é reduzir a burocracia, minimizar erros, aumentar a conformidade fiscal e otimizar o tempo das operações logísticas.

1.2. Problema a Ser Resolvido:
A emissão manual ou via sistemas complexos de MDF-e é um processo propenso a erros, demorado e que exige conhecimento técnico fiscal específico. Isso gera:

Alto risco de multas e sanções fiscais devido a erros ou atrasos na emissão.

Perda de tempo operacional significativo para equipes de logística e back-office.

Dificuldade na gestão e consulta de MDF-e emitidos.

Falta de visibilidade e controle sobre os documentos fiscais em trânsito.

1.3. Objetivos de Negócio:

Aumentar a eficiência operacional: Reduzir em 50% o tempo médio de emissão de MDF-e para nossos usuários nos primeiros 6 meses pós-lançamento.

Reduzir erros fiscais: Diminuir em 80% a incidência de MDF-e rejeitados pela SEFAZ devido a erros de preenchimento.

Atingir a liderança de mercado: Capturar 10% do mercado de software de emissão de MDF-e no Brasil em 2 anos.

Geração de Receita Recorrente: Alcançar um MRR (Monthly Recurring Revenue) de R$ 50.000,00 nos primeiros 12 meses.

Satisfação do Cliente: Manter um CSAT (Customer Satisfaction Score) acima de 85%.

2. Público-Alvo
   2.1. Usuários Primários:

Transportadoras de Cargas: Empresas que atuam no transporte rodoviário, ferroviário, aéreo ou aquaviário, que precisam emitir MDF-e para suas operações de movimentação de carga.

Embarcadores (Indústrias e Comércio): Empresas que contratam transportadoras, mas que também são responsáveis pela emissão do MDF-e em determinadas situações (ex: transporte de carga própria).

Analistas Fiscais/Contábeis: Profissionais que precisam monitorar e validar a conformidade dos documentos fiscais.

2.2. Perfis de Usuários (Personas):

João, o Operador de Logística (25-45 anos): Responsável por preencher e emitir MDF-e diariamente. Busca agilidade, facilidade de uso e automação para evitar erros.

Maria, a Gerente Fiscal (35-55 anos): Preocupa-se com a conformidade fiscal, a integridade dos dados e a segurança das operações. Necessita de relatórios e painéis de controle para monitorar a situação fiscal.

Pedro, o Proprietário da Transportadora (40-60 anos): Busca redução de custos, otimização de processos e segurança jurídica. Interessa-se por dashboards de desempenho e facilidade de gestão.

3. Escopo do Produto (MVP - Minimum Viable Product)
   3.1. Funcionalidades Inclusas no MVP:

Gestão de Cadastros:

Emitente: Dados da transportadora/embarcador (CNPJ, Razão Social, IE, Endereço, Certificado Digital).

Veículos: Cadastro de veículos (placa, RNTC, tipo de veículo, capacidade).

Motoristas: Cadastro de motoristas (CPF, nome, CNH).

Cidades: Base de dados de cidades (IBGE).

Emissão de MDF-e:

Preenchimento Simplificado: Formulário intuitivo para inserção dos dados essenciais do MDF-e.

Integração com NF-e e CT-e (Manual/Upload): Permissão para informar Chaves de Acesso de NF-e/CT-e para vinculação. (MVP: upload de XML ou digitação de chaves).

Inclusão de Dados do Percurso: Origem, Destino e Etapas do trajeto.

Informações do Veículo: Associação de veículos e motoristas.

Seguro de Carga: Preenchimento dos dados da seguradora.

Modal Rodoviário: Suporte inicial apenas para o modal rodoviário.

Validação em Tempo Real: Validação básica dos campos antes do envio à SEFAZ.

Transmissão e Retorno SEFAZ:

Envio à SEFAZ: Envio seguro do MDF-e para autorização.

Retorno de Status: Exibição do status da autorização (Autorizado, Rejeitado, Processando).

Download DAMDF-e: Geração e download do DAMDF-e (Documento Auxiliar do MDF-e) em PDF.

Gestão de MDF-e Emitidos:

Consulta: Listagem de MDF-e emitidos com filtros por status, período, placa, etc.

Detalhes do MDF-e: Visualização completa dos dados de um MDF-e específico.

Cancelamento de MDF-e:

Pedido de Cancelamento: Funcionalidade para solicitar o cancelamento de MDF-e dentro do prazo legal, com justificativa.

Retorno de Status do Cancelamento.

Encerramento de MDF-e:

Pedido de Encerramento: Funcionalidade para registrar o encerramento do MDF-e após o fim do percurso, com localização.

Retorno de Status do Encerramento.

Painel de Controle (Dashboard):

Visão geral de MDF-e autorizados, pendentes, rejeitados e cancelados no período.

Alertas sobre MDF-e próximos do vencimento de prazo para encerramento.

Usuários e Permissões:

Multi-usuário: Suporte a múltiplos usuários por conta da empresa.

Perfis de Acesso: Definição de perfis básicos (Ex: Administrador, Operador, Somente Consulta).

3.2. Funcionalidades Excluídas do MVP (Para Futuras Versões):

Integração direta via API com sistemas de ERP, TMS ou sistemas de emissão de NF-e/CT-e.

Emissão de MDF-e para outros modais (Ferroviário, Aéreo, Aquaviário).

Manifestação de MDF-e de terceiros.

Geração de relatórios financeiros ou contábeis avançados.

Integração com sistemas de telemetria ou rastreamento de veículos.

Aplicativo mobile para motoristas.

Funcionalidade de Carta de Correção Eletrônica (CC-e) para MDF-e (não existe no MDF-e, mas pode ser confundido).

4. Requisitos Funcionais Detalhados
   4.1. RF001 - Autenticação e Autorização

RF001.01: O sistema deve permitir o cadastro e login de usuários (e-mail e senha).

RF001.02: O sistema deve permitir a recuperação de senha via e-mail.

RF001.03: O sistema deve suportar múltiplos usuários por empresa (conta).

RF001.04: O sistema deve implementar perfis de acesso: Administrador (acesso total), Operador (emite, encerra, cancela), Consulta (visualiza apenas).

4.2. RF002 - Gestão de Cadastros

RF002.01: O sistema deve permitir o cadastro, edição e exclusão de dados do Emitente (CNPJ, Razão Social, Inscrição Estadual, Endereço, etc.).

RF002.02: O sistema deve permitir o upload e gerenciamento de Certificados Digitais A1/A3 (modelo A1 no MVP) para o emitente.

RF002.03: O sistema deve permitir o cadastro, edição e exclusão de veículos (Placa, RNTC, Tipo de Veículo, Capacidade, Tara, etc.).

RF002.04: O sistema deve permitir o cadastro, edição e exclusão de motoristas (CPF, Nome, CNH, Tipo de Documento, Endereço).

RF002.05: O sistema deve pré-carregar uma base de dados de cidades brasileiras com códigos IBGE.

4.3. RF003 - Emissão de MDF-e

RF003.01: O sistema deve apresentar um formulário de preenchimento do MDF-e dividido em seções lógicas (Identificação, Emitente, Carga, Percurso, Veículos, Seguro).

RF003.02: O sistema deve validar os campos obrigatórios e o formato dos dados conforme a legislação do MDF-e (Schema XML).

RF003.03: O sistema deve permitir a inclusão manual de chaves de acesso de NF-e e CT-e.

RF003.04: O sistema deve permitir o upload de arquivos XML de NF-e e CT-e para preenchimento automático das informações da carga.

RF003.05: O sistema deve calcular automaticamente o valor total da carga com base nas NF-e/CT-e vinculadas.

RF003.06: O sistema deve permitir a seleção de veículos e motoristas previamente cadastrados.

RF003.07: O sistema deve permitir a inclusão de até 10 percursos (pares Origem-Destino) no mesmo MDF-e.

RF003.08: O sistema deve permitir o preenchimento dos dados da seguradora (CNPJ, Nome, Número da Apólice).

4.4. RF004 - Comunicação com a SEFAZ

RF004.01: O sistema deve assinar digitalmente o XML do MDF-e com o certificado digital do emitente.

RF004.02: O sistema deve enviar o XML do MDF-e para os webservices da SEFAZ.

RF004.03: O sistema deve exibir o status de retorno da SEFAZ (Autorizado, Rejeitado, Denegado, Processando, Erro).

RF004.04: Em caso de rejeição, o sistema deve exibir o código e a mensagem de erro da SEFAZ para facilitar a correção.

RF004.05: O sistema deve gerar e permitir o download do DAMDF-e em formato PDF após a autorização.

4.5. RF005 - Gestão de MDF-e

RF005.01: O sistema deve exibir uma lista paginada de todos os MDF-e emitidos pela empresa.

RF005.02: O sistema deve permitir filtrar a lista de MDF-e por: Status (Autorizado, Cancelado, Encerrado, Rejeitado, etc.), Período de emissão, Placa do veículo, Chave de Acesso.

RF005.03: O sistema deve permitir a visualização detalhada de um MDF-e específico (todos os campos preenchidos).

RF005.04: O sistema deve permitir o download do XML do MDF-e autorizado.

4.6. RF006 - Cancelamento de MDF-e

RF006.01: O sistema deve permitir o envio de solicitação de cancelamento de MDF-e para a SEFAZ, dentro do prazo legal (24 horas após a autorização e antes do início da viagem).

RF006.02: O sistema deve exigir uma justificativa para o cancelamento (mínimo 15 caracteres).

RF006.03: O sistema deve exibir o status do pedido de cancelamento (Autorizado, Rejeitado).

4.7. RF007 - Encerramento de MDF-e

RF007.01: O sistema deve permitir o envio de solicitação de encerramento de MDF-e para a SEFAZ.

RF007.02: O sistema deve exigir a informação da UF e Município de encerramento.

RF007.03: O sistema deve exibir o status do pedido de encerramento (Autorizado, Rejeitado).

RF007.04: O sistema deve alertar o usuário sobre MDF-e que estão se aproximando do prazo legal para encerramento (normalmente 30 dias após a autorização).

4.8. RF008 - Dashboard

RF008.01: O dashboard deve exibir um resumo visual dos MDF-e emitidos (quantidade de Autorizados, Cancelados, Encerrados, Rejeitados no mês/período).

RF008.02: O dashboard deve exibir alertas para MDF-e que precisam ser encerrados ou que foram rejeitados.

5. Requisitos Não Funcionais
   5.1. Performance:

Tempos de Resposta: O tempo de carregamento das páginas não deve exceder 3 segundos. O tempo de emissão/envio de um MDF-e à SEFAZ não deve exceder 5 segundos (excluindo o tempo de resposta da SEFAZ).

Escalabilidade: A arquitetura do sistema deve ser capaz de suportar um aumento de 500% na quantidade de usuários e emissões sem degradação significativa de performance nos próximos 2 anos.

5.2. Segurança:

Proteção de Dados: Todos os dados sensíveis (informações fiscais, certificados digitais) devem ser criptografados em trânsito e em repouso.

Autenticação: O sistema deve utilizar autenticação segura (ex: HTTPS, senhas criptografadas).

Autorização: Implementação robusta de controle de acesso baseado em perfis (RF001.04).

Conformidade LGPD: O sistema deve estar em conformidade com a Lei Geral de Proteção de Dados (LGPD) brasileira.

Certificado Digital: Tratamento seguro e armazenamento de certificados digitais.

5.3. Usabilidade (UX/UI):

Intuitividade: A interface do usuário deve ser limpa, moderna e intuitiva, minimizando a necessidade de treinamento.

Consistência: Consistência na navegação e nos elementos visuais em todo o sistema.

Feedback ao Usuário: Fornecer feedback claro e imediato para todas as ações do usuário (ex: mensagens de sucesso, erro, carregamento).

Responsividade: A interface deve ser responsiva, adaptando-se a diferentes tamanhos de tela (desktop, tablet). (Foco em desktop para MVP, mas com layout base responsivo).

5.4. Confiabilidade:

Disponibilidade: O sistema deve ter uma disponibilidade mínima de 99,5% (excluindo janelas de manutenção programadas).

Tratamento de Erros: O sistema deve tratar erros de forma graciosa, informando o usuário e registrando logs para análise.

Backup e Recuperação: Implementação de rotinas de backup diárias com estratégia de recuperação de desastres.

5.5. Manutenibilidade:

Código Limpo: O código-fonte deve ser bem documentado, modular e fácil de entender e manter.

Testabilidade: O sistema deve ser projetado para ser facilmente testado (testes unitários, de integração, de sistema).

Observabilidade: Implementação de logging e monitoramento para facilitar a identificação e resolução de problemas.

5.6. Compatibilidade:

Navegadores: Compatível com as versões mais recentes do Chrome, Firefox, Edge e Safari.

Certificados Digitais: Compatibilidade com certificados A1 e A3 (no MVP, foco em A1 para simplificar, com A3 sendo um objetivo futuro).

6. Requisitos de Interface do Usuário (UI) e Experiência do Usuário (UX)
   Design: O sistema deve ter um design limpo, moderno e profissional, utilizando uma paleta de cores agradável e acessível.

Fluxo de Emissão Simplificado: Priorizar um fluxo de emissão de MDF-e linear e guiado, minimizando a complexidade do preenchimento.

Validação em Tempo Real: Feedback visual imediato sobre campos obrigatórios e formatos inválidos.

Acessibilidade: Considerar diretrizes básicas de acessibilidade (contraste de cores, navegação por teclado).

Componentes Reutilizáveis: Utilização de uma biblioteca de componentes UI para garantir consistência.

6.1. Wireframes/Protótipos (Referências Iniciais):

Tela de Login/Cadastro: Layout padrão com campos de e-mail e senha.

Dashboard: Visão geral com gráficos simples de status de MDF-e, alertas.

Formulário de Emissão MDF-e: Abas ou seções para organizar os dados (Identificação, Emitente, Carga, Percurso, Veículos, Seguro).

Lista de MDF-e: Tabela com filtros e paginação.

Modal de Cancelamento/Encerramento: Pop-ups simples com campos de justificativa/localização.

7. Métricas de Sucesso do Produto
   Taxa de Sucesso de Emissão: % de MDF-e que são autorizados pela SEFAZ na primeira tentativa.

Tempo Médio de Emissão: Tempo médio que um usuário leva para emitir um MDF-e completo (da entrada dos dados à autorização).

Engajamento de Usuários: Frequência de login e uso das funcionalidades principais.

Churn Rate: Taxa de cancelamento de assinaturas.

NPS (Net Promoter Score): Medir a satisfação e lealdade dos clientes.

MRR (Monthly Recurring Revenue): Receita recorrente mensal.

Número de MDF-e Emitidos: Volume total de documentos processados pelo sistema.

8. Plano de Lançamento (MVP - Versão 1.0)
   Fase 1: Desenvolvimento Interno e Testes (Alpha)

Fase 2: Testes com Usuários Piloto (Beta)

Selecionar um grupo pequeno de transportadoras para feedback inicial.

Coletar insights e identificar gargalos/bugs.

Fase 3: Lançamento Soft Launch / Marketing Inicial

Lançamento para um público mais amplo com estratégias de marketing digital.

Criação de materiais de suporte (tutoriais, FAQ).

Fase 4: Lançamento Geral e Suporte Contínuo

9. Considerações Fiscais e Regulatórias
   Legislação do MDF-e: O sistema deve estar em total conformidade com a legislação vigente do MDF-e no Brasil, incluindo Notas Técnicas e Ajustes SINIEF da CONFAZ.

SEFAZ: Manter a compatibilidade com os webservices da SEFAZ e suas atualizações.

Certificação Digital: O sistema deve utilizar certificados digitais válidos e reconhecidos pela ICP-Brasil.

10. Glossário
    MDF-e: Manifesto Eletrônico de Documentos Fiscais.

DAMDF-e: Documento Auxiliar do Manifesto Eletrônico de Documentos Fiscais.

SEFAZ: Secretaria de Estado de Fazenda.

NF-e: Nota Fiscal Eletrônica.

CT-e: Conhecimento de Transporte Eletrônico.

SaaS: Software as a Service.

MVP: Minimum Viable Product (Produto Mínimo Viável).

UI: User Interface (Interface do Usuário).

UX: User Experience (Experiência do Usuário).

LGPD: Lei Geral de Proteção de Dados.

RNTC: Registro Nacional de Transportadores Rodoviários de Cargas.
