import type { ArchiveDetail } from './index';

const pt = `## O problema

Praticantes regenerativos não sofrem de falta de conexão. Sofrem de falta de coordenação com endereço.

Um agricultor em regeneração de pastagem tem excedente de mudas e falta de mão de obra em janeiro. A vinte quilômetros dali, um viveiro comunitário tem gente ociosa em janeiro e falta de mudas em março. Os dois estão em quatro grupos de WhatsApp em comum e nenhum sabe do outro, porque a informação relevante — quantidade, prazo, espécie, distância, janela — não sobrevive ao formato de conversa.

Ao mesmo tempo, quem financia, contrata ou certifica esse trabalho não tem como verificar nada. O histórico de prática vive em fotos de celular, planilhas pessoais e memória. Cada nova relação recomeça a confiança do zero, e o custo dessa reconstrução é pago em toda transação.

As plataformas existentes falham por dois motivos simétricos. As redes sociais generalistas dissolvem o dado dentro do fluxo. As plataformas verticais de impacto exigem que todo mundo migre para um cadastro central, entregue os dados a um operador único e aceite a taxonomia que ele escolheu.

## A tese

Coordenação regenerativa é um problema de bens comuns informacionais, e problemas de bens comuns têm literatura própria. Elinor Ostrom documentou o que faz arranjos comunitários funcionarem por séculos, e os dois primeiros princípios dela são exatamente o que falta aqui: limites claros sobre quem participa e qual é o recurso, e regras adaptadas às condições locais.

Daí a decisão de arquitetura que define o projeto inteiro: a unidade de organização é a biorregião, delimitada por bacia hidrográfica, e não o município, o estado ou a plataforma. Bacia é o recorte em que o problema de fato acontece — água, solo, corredores ecológicos e cadeias curtas obedecem à bacia, não à divisa administrativa.

E a segunda decisão: o produto é um formato, com um aplicativo em cima. O valor durável está no esquema de dados aberto, que qualquer um pode implementar, e não na interface. Isso protege o projeto do destino usual dessas plataformas, que é morrer levando os dados de todo mundo junto.

## Como funciona

Três objetos, e nada além disso na versão 1.

**Nó.** Uma pessoa, propriedade, coletivo ou organização, ancorado em uma biorregião. Guarda identificação, o que faz, e uma chave pública para assinar registros.

**Fluxo.** Uma necessidade ou um excedente, com os quatro campos que fazem a diferença entre um anúncio e uma coordenação: o quê, quanto, até quando, e a que distância aceita operar. Um fluxo tem estado — aberto, casado, cumprido, expirado — e o estado é público.

**Registro de prática.** O que foi feito, onde, quando, por quem, com qual evidência anexada. Assinado por quem fez e contra-assinado por quem viu. É o objeto mais importante do sistema, porque é o que transforma histórico em ativo transferível: um praticante leva o próprio histórico consigo, verificável por terceiros, sem depender da plataforma continuar existindo.

O casamento entre fluxos é local e explícito. O sistema sugere, as pessoas decidem, e o resultado vira registro. Nenhum algoritmo decide alocação — a decisão mora perto, que é o primeiro princípio que trazemos do solo.

## Versão 1 — escopo mínimo executável

Deliberadamente pequeno e construível por uma pessoa em algumas semanas.

- Uma biorregião piloto, escolhida por já ter uma rede de relações ativa. Sem rede prévia, o sistema nasce vazio e vazio ele morre.
- Dados em arquivos, versionados em repositório Git. Cada nó, fluxo e registro é um arquivo com frontmatter. Auditável, exportável, sem banco de dados para manter.
- Site estático gerado a partir desses arquivos, com busca e filtro por tipo, distância e janela de tempo.
- Entrada por formulário simples, que abre uma proposta de alteração no repositório. A curadoria da biorregião aprova.
- Sem contas, sem senha, sem app. Identidade por chave, e quem preferir usa e-mail.
- Sem blockchain. A assinatura criptográfica resolve verificabilidade; consenso distribuído resolve um problema que este projeto ainda não tem.

O teste da versão 1 é único: três casamentos de fluxo que não teriam acontecido sem o sistema, confirmados pelos dois lados.

## Estrutura e governança

Cada biorregião opera um nó próprio, com curadoria local de duas a três pessoas, responsável por admitir participantes, mediar disputa e manter o repositório.

O projeto central mantém apenas três coisas: a especificação do formato, a implementação de referência e o protocolo de federação entre nós. Não hospeda dados de ninguém.

As regras de cada biorregião ficam em um documento visível no próprio repositório, escrito por quem participa. O mínimo comum, herdado dos princípios de Ostrom: critério explícito de entrada, monitoramento por pares, sanção graduada — do aviso à suspensão temporária e à saída — e um canal barato de resolução de conflito.

## Modelo econômico

**Assinatura de nó biorregional.** Cobrada da organização que opera a curadoria local, em faixa por porte. Cobre hospedagem, suporte e evolução do formato.

**Implantação assistida.** Um pacote de doze semanas para uma biorregião nova: levantamento das relações existentes, definição das regras locais, treinamento da curadoria e acompanhamento até o primeiro conjunto de casamentos.

**Licenciamento institucional.** Fundos, cooperativas e programas públicos que precisam verificar histórico de prática pagam pelo acesso estruturado aos registros que os praticantes autorizarem.

**Financiamento de origem.** Edital ou fundo para o desenvolvimento do formato aberto, que por definição não se monetiza sozinho.

O formato permanece aberto e livre em qualquer cenário. A receita vem da operação e da implantação.

## Fases

**Fase 1 — Formato e piloto (meses 1 a 4).** Especificação escrita, implementação de referência publicada, uma biorregião ativa, três casamentos confirmados.

**Fase 2 — Segunda biorregião e federação (meses 5 a 10).** Um segundo nó, operado por outro grupo, com o protocolo de federação funcionando entre os dois. Esta é a fase que prova ou derruba a arquitetura.

**Fase 3 — Registro de prática em produção (meses 11 a 18).** Assinatura e contra-assinatura em uso real, com ao menos uma instituição consumindo registros para decisão própria.

**Fase 4 — Abertura (a partir do mês 19).** Documentação para que qualquer biorregião suba um nó sem nós.

## O que conta como sucesso

- Casamentos de fluxo confirmados pelos dois lados, por trimestre
- Proporção de fluxos que chegam a estado cumprido
- Registros de prática contra-assinados
- Nós biorregionais operando com curadoria local ativa
- Uma decisão real — contratação, financiamento, certificação — tomada com base em registros do sistema
- Distância média dos casamentos, que deve cair conforme a densidade local sobe

## Riscos e tratamento

**Rede vazia.** O risco mais provável. Tratamento: a biorregião piloto tem rede prévia, e o sistema entra formalizando relações que já existem, com valor no primeiro dia.

**Curadoria que vira gargalo.** Tratamento: a curadoria admite e media, e não intermedia transação. Quem casa fluxo são as partes.

**Captura por um ator grande.** Tratamento: formato aberto, dados no repositório da própria biorregião, saída sem custo.

**Legibilidade que empobrece.** Registrar prática exige simplificá-la, e simplificação mata o conhecimento prático que fazia o sistema funcionar — o alerta de James Scott vale inteiro aqui. Tratamento: campo livre obrigatório em todo registro, e revisão semestral do esquema com quem usa.

**Dado sensível.** Localização precisa de propriedade e informação de renda ficam fora do escopo. Faixa de distância no lugar de coordenada.

## O que precisa ser confirmado

- Qual biorregião piloto, e qual grupo assume a curadoria local
- Se existe rede de relações prévia suficiente ali
- Enquadramento em relação à LGPD para os dados pessoais mínimos
- Se algum programa ou edital cobre o desenvolvimento do formato aberto

## Relação com os outros projetos

Spore Network é o substrato dos demais. [[substrate-protocol|Substrate Protocol]] fornece as regras de governança de cada nó. [[axia-fund|Axia Fund]] usa os registros de prática como insumo de originação e de acompanhamento. [[bioregional-capital-framework|Bioregional Capital Framework]] usa a delimitação por bacia como unidade contábil. [[atlas-research-group|Atlas Research Group]] estuda a rede em operação como caso de bens comuns.`;

const en = `## The problem

Regenerative practitioners do not suffer from a lack of connection. They suffer from a lack of coordination with an address.

A farmer regenerating pasture has a surplus of seedlings and a shortage of labor in January. Twenty kilometers away, a community nursery has idle hands in January and no seedlings in March. The two share four WhatsApp groups and neither knows the other exists, because the relevant information — quantity, deadline, species, distance, window — does not survive the format of a conversation.

At the same time, whoever funds, contracts, or certifies this work has no way to verify anything. The record of practice lives in phone photos, personal spreadsheets, and memory. Every new relationship rebuilds trust from zero, and the cost of that reconstruction is paid on every transaction.

Existing platforms fail for two symmetrical reasons. General-purpose social networks dissolve the data into the feed. Vertical impact platforms require everyone to migrate to a central registry, hand their data to a single operator, and accept the taxonomy that operator chose.

## The thesis

Regenerative coordination is a problem of informational commons, and commons problems have their own literature. Elinor Ostrom documented what makes community arrangements work for centuries, and her first two principles are exactly what is missing here: clear boundaries around who participates and what the resource is, and rules adapted to local conditions.

Hence the architectural decision that defines the entire project: the unit of organization is the bioregion, bounded by watershed — not the municipality, the state, or the platform. The watershed is the frame in which the problem actually occurs; water, soil, ecological corridors, and short supply chains follow the watershed, not the administrative line.

And the second decision: the product is a format, with an application on top of it. The durable value is in the open data schema, which anyone can implement — not in the interface. This protects the project from the usual fate of these platforms, which is to die and take everyone's data with them.

## How it works

Three objects, and nothing beyond them in version 1.

**Node.** A person, property, collective, or organization, anchored in a bioregion. It holds identification, what it does, and a public key for signing records.

**Flow.** A need or a surplus, with the four fields that separate a listing from a coordination: what, how much, by when, and how far it is willing to operate. A flow has a state — open, matched, fulfilled, expired — and the state is public.

**Record of practice.** What was done, where, when, by whom, with what evidence attached. Signed by whoever did it and countersigned by whoever witnessed it. It is the most important object in the system, because it is what turns history into a transferable asset: a practitioner carries their own record with them, verifiable by third parties, without depending on the platform continuing to exist.

Matching between flows is local and explicit. The system suggests, people decide, and the result becomes a record. No algorithm decides allocation — the decision lives close by, which is the first principle we bring up from the soil.

## Version 1 — minimum executable scope

Deliberately small, and buildable by one person in a few weeks.

- One pilot bioregion, chosen because it already has an active network of relationships. Without a prior network, the system is born empty and dies empty.
- Data in files, versioned in a Git repository. Each node, flow, and record is a file with frontmatter. Auditable, exportable, no database to maintain.
- A static site generated from those files, with search and filtering by type, distance, and time window.
- Entry through a simple form that opens a change proposal in the repository. The bioregion's stewards approve it.
- No accounts, no passwords, no app. Identity by key, and email for whoever prefers it.
- No blockchain. Cryptographic signing solves verifiability; distributed consensus solves a problem this project does not yet have.

The test of version 1 is a single one: three flow matches that would not have happened without the system, confirmed by both sides.

## Structure and governance

Each bioregion runs its own node, with local stewardship of two to three people, responsible for admitting participants, mediating disputes, and maintaining the repository.

The central project maintains only three things: the format specification, the reference implementation, and the federation protocol between nodes. It hosts no one's data.

Each bioregion's rules live in a document visible in its own repository, written by the people who participate. The common minimum, inherited from Ostrom's principles: an explicit entry criterion, peer monitoring, graduated sanction — from warning to temporary suspension to exit — and a low-cost channel for conflict resolution.

## Economic model

**Bioregional node subscription.** Charged to the organization that operates local stewardship, in tiers by size. Covers hosting, support, and evolution of the format.

**Assisted deployment.** A twelve-week package for a new bioregion: a survey of existing relationships, definition of local rules, training of the stewards, and support through the first set of matches.

**Institutional licensing.** Funds, cooperatives, and public programs that need to verify records of practice pay for structured access to the records that practitioners authorize.

**Origination funding.** A grant or fund for developing the open format, which by definition does not monetize on its own.

The format stays open and free in every scenario. Revenue comes from operation and deployment.

## Phases

**Phase 1 — Format and pilot (months 1 to 4).** Specification written, reference implementation published, one active bioregion, three confirmed matches.

**Phase 2 — Second bioregion and federation (months 5 to 10).** A second node, operated by another group, with the federation protocol working between the two. This is the phase that proves or breaks the architecture.

**Phase 3 — Record of practice in production (months 11 to 18).** Signing and countersigning in real use, with at least one institution consuming records for its own decisions.

**Phase 4 — Opening (from month 19).** Documentation so that any bioregion can stand up a node without us.

## What counts as success

- Flow matches confirmed by both sides, per quarter
- Share of flows that reach a fulfilled state
- Countersigned records of practice
- Bioregional nodes operating with active local stewardship
- One real decision — a hire, a financing, a certification — made on the basis of records from the system
- Average distance of matches, which should fall as local density rises

## Risks and treatment

**Empty network.** The most likely risk. Treatment: the pilot bioregion has a prior network, and the system enters by formalizing relationships that already exist, with value on day one.

**Stewardship as a bottleneck.** Treatment: stewards admit and mediate; they do not broker transactions. The parties are the ones who match flows.

**Capture by a large actor.** Treatment: open format, data in the bioregion's own repository, exit at no cost.

**Legibility that impoverishes.** Recording practice requires simplifying it, and simplification kills the practical knowledge that made the system work — James Scott's warning applies in full here. Treatment: a mandatory free-text field on every record, and a semiannual review of the schema with the people who use it.

**Sensitive data.** Precise property location and income information stay out of scope. A distance band instead of a coordinate.

## What needs to be confirmed

- Which pilot bioregion, and which group takes on local stewardship
- Whether there is a sufficient prior network of relationships there
- Framing with respect to the LGPD for the minimum personal data
- Whether any program or grant covers development of the open format

## Relationship to the other projects

Spore Network is the substrate of the others. [[substrate-protocol|Substrate Protocol]] provides the governance rules for each node. [[axia-fund|Axia Fund]] uses records of practice as input for origination and monitoring. [[bioregional-capital-framework|Bioregional Capital Framework]] uses the watershed boundary as an accounting unit. [[atlas-research-group|Atlas Research Group]] studies the network in operation as a commons case.`;

export const sporeNetwork: ArchiveDetail = {
  tagline: {
    pt: 'Uma camada de coordenação biorregional que registra o que praticantes regenerativos têm, o que precisam e o que já fizeram — em formato aberto, verificável e federado por bacia hidrográfica.',
    en: 'A bioregional coordination layer that records what regenerative practitioners have, what they need, and what they have already done — in an open, verifiable format, federated by watershed.',
  },
  body: { pt, en },
};
