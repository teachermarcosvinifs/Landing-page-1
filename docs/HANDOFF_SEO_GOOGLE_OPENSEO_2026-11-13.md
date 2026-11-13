# Handoff — SEO e aquisição orgânica | 13/11/2026

**Escopo:** site de aulas particulares de inglês online do professor Marcos Vinicius. Este documento registra fatos verificados, decisões, histórico e próximos passos para continuar o trabalho em outra conversa. Não é uma ordem para refazer etapas.

## 1. Endereços e sistemas

- **Site público:** https://teachermarcosvinifs.github.io/Landing-page-1/
- **Repositório GitHub / produção:** `teachermarcosvinifs/Landing-page-1`, branch `main`. Publicação no GitHub Pages.
- **Google Search Console:** propriedade de prefixo exato `https://teachermarcosvinifs.github.io/Landing-page-1/`.
- **OpenSEO:** projeto `dd8760f3-f80a-4599-8c5c-cc1ccb25d28f`, https://app.openseo.so/p/dd8760f3-f80a-4599-8c5c-cc1ccb25d28f/
- **OpenSEO / Google Search Console:** https://app.openseo.so/p/dd8760f3-f80a-4599-8c5c-cc1ccb25d28f/search-performance
- **CRM de aquisição:** https://docs.google.com/spreadsheets/d/1EYphgIdGqNbzzKwuqsvuxGxIrM8RE9KiVWY-37IOiMQ/edit
- **Memória do projeto no OpenSEO:** https://app.openseo.so/p/dd8760f3-f80a-4599-8c5c-cc1ccb25d28f/context

## 2. IMPORTANTE — Google já conectado ao OpenSEO

Em 13/11/2026, o professor mostrou a tela de Integrações: a conta Google estava autorizada (`marcosvinifs@gmail.com`), mas a propriedade do projeto aparecia como **Not connected** porque ainda faltava selecioná-la.

**Etapa final realizada nesta conversa:** a integração OpenSEO foi concluída com a ferramenta `set_search_console_site` escolhendo a propriedade correta `https://teachermarcosvinifs.github.io/Landing-page-1/`. A chamada retornou `ok: true`. Nova consulta a `list_search_console_sites` confirmou `isSelected: true`, sem precisar de novo login. A propriedade separada do **Churrasco na Garagem** permaneceu `isSelected: false`.

**Não pedir ao professor para conectar de novo.** Se a tela antiga ainda mostrar `Not connected`, atualizar a página e conferir no OpenSEO; o vínculo está confirmado no servidor.

O acesso conectado permite obter diretamente **Search Analytics**: impressões, cliques, CTR, posições médias por página, consulta, data, país e dispositivo, sem capturas manuais. **Não confundir isso com confirmação de indexação individual**: o conector usado não expõe as telas de Inspeção de URL nem todas as razões do relatório de Indexação de páginas.

## 3. Linha de base real do Search Console — consulta autenticada 13/11/2026

Dados finais, propriedade correta, Pesquisa Web:

| Intervalo | Página | Impressões | Cliques | Posição média |
|---|---|---:|---:|---:|
| 10/08 a 10/11/2026 (3 meses) | Homepage apenas | 15 | 1 | 4,0 |
| 14/10 a 10/11/2026 (28 dias) | Homepage apenas | 5 | 0 | 5,6 |

- As **15 impressões** vieram da home; nenhuma outra URL apareceu na dimensão `page` da consulta ao GSC.
- País: Brasil, nas 15 impressões e no único clique.
- Dispositivos nos 3 meses: desktop 4 impressões/1 clique; mobile 11 impressões/0 cliques.
- A dimensão `query` dos 3 meses mostrou **somente** `manda o link do site`, com **1 impressão e 1 clique**. As outras **14 impressões não foram detalhadas** no relatório por consulta; **não dizer** que todas as impressões vieram daquela expressão.
- A dimensão `query` dos últimos 28 dias veio vazia (pode haver supressão de consultas de baixo volume).
- **Correção de diagnóstico anterior:** posição média 4,0 entre só 15 impressões **não significa** que o site esteja em posição 50+, nem que esteja bem classificado para buscas comerciais. Não existe amostra suficiente para inferir ranking comercial. O gargalo observado é quase nenhuma exposição e ausência de páginas comerciais nos relatórios de desempenho.
- Dados finalizados terminam em 10/11; as mudanças de 13/11 ainda NÃO estão refletidas.

## 4. Histórico das alterações no site — confirmadas

1. **Descoberta interna corrigida (13/11):** commit `867774aaacbff1aea90fb15e563c4bcea8cd64ab`. Na seção `O que você pode estudar comigo` da homepage, os títulos de Ensino regular e Conversação passaram a ser links HTML para `aulas-de-ingles-online-adultos.html` e `conversacao-ingles-adultos.html`. CSS de link discreto e acessível no `assets/site-v3-black.css`, sem mudar estrutura/CTAs.
2. **Verificação independente:** OpenSEO antes alcançava **6 de 8** páginas; após deploy passou a **8 de 8**, todas HTTP 200 e consideradas indexáveis pelo rastreador, com ambas as páginas antes isoladas em profundidade 1. Ver: auditoria após correção `e65f8f63-49ee-4bb2-ab59-ccdf6a060da1`. GitHub Pages e todos os 8 testes de build/funcional/visual etc. passaram.
3. **Metadados da homepage (13/11):** commit `b19c66a284faaa0290c11cc62b1816d543d28e53`. Novo `<title>`: `Aulas particulares de inglês online | Marcos Vinicius`; nova meta description sobre aulas particulares online para adultos/adolescentes, modalidades e conversação B1+. **Texto visível, H1, layout, formulário e WhatsApp mantidos.** OpenSEO rastreou homepage publicada e confirmou novo título.
4. **Referência pública legítima no GitHub (13/11):** commit `0c475bbf5216f0fbca941e0b0dd0d7c219f1f173`, criando `README.md` no repositório com apresentação curta e links diretos à home, aulas para adultos e inglês para devs. Isso é referência pública, **não garante PageRank/indexação**.
5. **Sitemap:** `/Landing-page-1/sitemap.xml` acessível publicamente com **8 URLs**. Search Console mostrava `Não foi possível buscar o sitemap`, tipo desconhecido, 0 páginas descobertas via sitemap. Também existia entrada incorreta `/sitemapxml` (sem ponto). **Causa do erro não diagnosticada**; não reenviar em loop.
6. **Indexação individual:** anteriormente a URL `aulas-de-ingles-online-adultos.html` constou no Search Console como **URL desconhecida do Google**, embora no **teste ao vivo** estivesse acessível; o professor solicitou indexação, e a solicitação foi aceita. **Não há confirmação posterior de entrada no índice**, tampouco dos outros URLs internos. Crawler externo não prova isso.

## 5. Hipóteses e limites — não apresentar como fatos

- A falta de links internos era um problema **confirmado** de descoberta por navegação HTML, mas não explica sozinha a baixa exposição comercial da homepage já indexada.
- Ferramenta de backlinks do OpenSEO encontrou **0 domínios externos** para a pasta do site na amostra consultada em 13/11; o índice da ferramenta pode estar incompleto. É hipótese plausível de reconhecimento externo insuficiente, **não prova ausência absoluta de links nem causa única da não indexação**.
- Consultas estimadas pela base OpenSEO para Brasil: `aulas particulares de inglês online` ~170 buscas/mês; `inglês para trabalho` ~170; `inglês para programadores` ~70; `professor particular de inglês online` ~40. **Estimativas** não são tráfego garantido e não se somam sem avaliar sobreposição.
- Domínios de plataformas e escolas grandes competem nas consultas amplas. Não mudar títulos repetidamente só por volume; testar páginas com intenção comercial real e diferenciação.
- Falta de `robots.txt` na raiz do host e presença na subpasta não são bloqueio demonstrado; o arquivo de subpasta não funciona como robots.txt da raiz, mas ausência na raiz não impede indexação por padrão.
- **Não é demonstrado:** `github.io` recebe punição algorítmica; 2–4 links garantem indexação; prazo do Google `reiniciou` com correção; zero resultado em 30–60 dias prova falha de host.
- Não recomendar migração para domínio próprio, anúncios pagos, preço público, novas páginas artificiais, provas sociais inventadas, preparação para entrevistas como produto separado, spam de backlinks.

## 6. Próximos passos objetivos para a próxima conversa

1. **Primeiro confirmar a conexão sem pedir ação humana**: `list_search_console_sites` no projeto acima; a propriedade de ensino deve continuar `isSelected=true`. Caso esteja desligada por alteração externa, examinar antes de pedir autorização.
2. **Consultar Search Analytics diretamente pelo OpenSEO**, por `page`, `query`, `date` e `query,page` nas janelas recentes; usar como baseline acima e registrar dados novos. NÃO pedir capturas repetidas.
3. **Indexação por URL continua pendente.** Só quando essa informação mudar a decisão, consultar pelo Search Console o estado de cada página comercial (Indexada / Descoberta, não indexada / Rastreada, não indexada / Canônica alternativa); diferenciar claramente dados de indexação e desempenho. O Browser em Chat permite leitura de aba aberta, não navegar/preencher nela.
4. **Priorizar aquisição qualificada**: validar intenções reais no Brasil, páginas existentes e concorrentes; fortalecer distribuição externa legítima que também possa trazer alunos reais, sem comprar links; preservar identidade e oferta do professor.
5. **Rever resultados** em 13/12/2026 e 12/01/2027 como janelas de medição, **sem prometer** 100+ impressões, X links ou Y alunos. Estabelecer comparação consistente de 28 dias e conversões de contatos com origem atribuída.
6. Se a pessoa quiser checar a integração no painel, orientar a **atualizar a tela de Integrações**: antes mostrava `Not connected`, mas a propriedade foi selecionada via API. Não mandar clicar novamente em `Connect` para o Google Search Console e NÃO confundir com botão `Connect` do Google Analytics (outro produto).

## 7. Oferta e restrições do professor

- Serviço verdadeiro: **aulas particulares de inglês online**; ensino regular do iniciante ao avançado; conversação apenas **B1+**; individual, dupla, trio e grupo; inglês profissional, com exemplos de devs/programadores e Compliance; Portal dos Alunos.
- Priorizar **soluções gratuitas**, linguagem humana e precisa, nada de marketing inventado, títulos vagos ou jargão; não divulgar preço sem autorização. Conservar layout, formulário e WhatsApp.
- Usuário cansado de repetir meses de `Solicitar indexação` e reenviar sitemap: não reiniciar esse ciclo. Apresentar fatos e intervenções verificáveis.
- Outras IAs produziram auditorias com hipóteses sobre backlinks, host, conteúdo, prazo. O usuário aceita crítica externa, mas requer confrontar afirmações com evidências, sem declarar certezas não demonstradas.

## 8. Fontes operacionais primárias

- Commits e histórico GitHub no repositório.
- Auditoria OpenSEO de 8/8 páginas: https://app.openseo.so/p/dd8760f3-f80a-4599-8c5c-cc1ccb25d28f/audit?auditId=e65f8f63-49ee-4bb2-ab59-ccdf6a060da1
- OpenSEO GSC integrado (dados de primeira mão).
- CRM de aquisição Google Sheets (registro de decisões; atenção a hipóteses/rascunhos de agosto que podem estar desatualizados).
- Print do OpenSEO fornecido em 13/11 mostrava conta autorizada mas propriedade `Not connected` **antes** da seleção final feita nesta conversa.

**Estado final deste handoff:** integração Google Search Console -> OpenSEO **concluída e confirmada**; publicação das mudanças SEO confirmada; indexação de todas as páginas **não confirmada**; ações futuras baseadas nos dados e com causa demonstrável.


## 9. Atualização confirmada — 13/11/2026, inspeção individual via API do Google

**ATUALIZAÇÃO PRIORITÁRIA sobre as seções 2, 3 e 6:** a integração atual do OpenSEO disponibiliza a operação de leitura `inspect_urls` para consultar os estados de indexação armazenados no Google Search Console. A limitação registrada acima (“não expõe a Inspeção de URL”) referia-se à ferramenta usada na rodada anterior, não à capacidade atual do conector. Consulta realizada nesta continuação, sem solicitar indexação.

**Conexão:** `list_search_console_sites` retornou `ok=true`, conta Google autorizada, `requiresReconnect=false`, `apiDisabled=false`, propriedade `https://teachermarcosvinifs.github.io/Landing-page-1/` com `isSelected=true`, permissão `siteOwner`. Nenhuma ação do professor necessária.

**Status oficial por URL (via `inspect_urls`, dados de índice existentes, NÃO teste ao vivo):**

| URL relativa | `coverageState` do Google | `verdict` |
|---|---|---|
| `/` (homepage) | Enviada e indexada | PASS |
| `aulas-de-ingles-online-adultos.html` | O Google não reconhece o URL | NEUTRAL |
| `conversacao-ingles-adultos.html` | O Google não reconhece o URL | NEUTRAL |
| `ingles-para-devs.html` | O Google não reconhece o URL | NEUTRAL |
| `ingles-para-compliance.html` | O Google não reconhece o URL | NEUTRAL |
| `como-funciona.html` | O Google não reconhece o URL | NEUTRAL |
| `qual-formato.html` | O Google não reconhece o URL | NEUTRAL |
| `portal-dos-alunos.html` | O Google não reconhece o URL | NEUTRAL |

A homepage tem `lastCrawlTime=2026-09-20T06:02:51Z`, `pageFetchState=SUCCESSFUL`, rastreamento MOBILE, `robotsTxtState=ALLOWED` e canônica selecionada pelo Google igual à declarada. Os sete URLs internos não trazem `lastCrawlTime`, `pageFetchState` ou canônica; estados não informados NÃO significam bloqueio. Essa evidência confirma falta de reconhecimento das URLs pelo Google na consulta de 13/11/2026, **não identifica a causa**, nem informa prazo.

**Analytics reconsultado (dado final):** 14/10–10/11/2026 tem 5 impressões, 0 clique, só home; as cinco impressões ocorreram em 14/10 (2), 03/11 (2), 04/11 (1); dimensão consulta sem linhas nesse período. 10/08–10/11: apenas `manda o link do site` em consulta+página (1 impressão, 1 clique), com as demais impressões ocultas no detalhamento. Nenhuma alteração de 13/11 pode ser avaliada nesses dados.

**Revisão técnica sem alteração no site:** os arquivos do GitHub `sitemap.xml`, `robots.txt`, `index.html` e `aulas-de-ingles-online-adultos.html` foram consultados. Sitemap lista oito endereços coerentes; `robots.txt` está armazenado na subpasta do projeto (não equivale a arquivo na raiz `github.io`); home e adultos têm canônicas corretas; home agora tem links HTML para adultos e conversação; a página de adultos permite `index,follow`. Auditoria OpenSEO anterior encontrou oito páginas HTTP 200 e indexáveis, mas **não substitui o estado de índice fornecido pelo Google**. Em auditoria antiga, `inSitemap=false` nos registros de páginas não prova que o Google rejeitou o XML. O GSC anteriormente indicou `Não foi possível buscar o sitemap`; a causa permanece sem confirmação. O `<lastmod>` da home no XML está antigo (17/08) apesar de alterações legítimas em 13/11; não foi alterado nesta rodada por não haver evidência de que isso explique o erro de leitura.

**Priorização:** primeiro demonstrar reconhecimento e indexação das URLs comerciais pelo Google; usar inspeção programática de leitura (não pedidos repetidos). Depois avaliar aumento de impressões por consultas com intenção real e contatos atribuídos. Manter ações gratuitas de exposição externa legítima, sem prometer que backlinks individuais ou `IndexNow` resolvam Google; o Google não participa de IndexNow. Nenhuma necessidade de reconectar conta, reenviar sitemap ou pedir indexação nesta rodada. Sem alteração em layout, contatos, formulário, WhatsApp ou URLs canônicas.

**Fontes oficiais:** https://support.google.com/webmasters/answer/9012289 (inspeção de URL), https://support.google.com/webmasters/answer/7451001 (erros de sitemap), https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (lastmod). Próximas datas de avaliação permanecem 13/12/2026 e 12/01/2027, com histórico sem apagar.


## 10. Continuação operacional — 13/11/2026, ações efetivas e pendências

### Evidência nova do sitemap (Google oficial + aba autenticada)

- Inspeção individual **read-only** da URL `https://teachermarcosvinifs.github.io/Landing-page-1/sitemap.xml` via `OpenSEO.inspect_urls` retornou `coverageState=Rastreada, mas não indexada no momento`, `lastCrawlTime=2026-11-05T17:42:54Z`, `pageFetchState=SUCCESSFUL`, `robotsTxtState=ALLOWED`, `indexingState=INDEXING_ALLOWED`. Isso demonstra que o Google acessou **o arquivo como URL**, mas **não comprova que processou seu conteúdo como sitemap**. Não-indexação de arquivo XML no índice de páginas é normal e não é diagnóstico de defeito do sitemap.
- A aba autenticada do Search Console (leitura de aba existente, **sem navegação/alteração**) contém teste em tempo real do XML efetuado em **12/11/2026 23:11** com **HTTP 200, tipo `application/xml`, rastreamento permitido, busca concluída e conteúdo XML com oito `loc`**. A tela de Sitemaps (envio 12/11) continuava em `Não foi possível buscar o sitemap`, tipo desconhecido e zero páginas descobertas. Diferença entre acesso ao arquivo na Inspeção e leitura/processamento pelo relatório **permanece sem causa confirmada**. Não reenviar nem fazer teste repetido.
- Fonte oficial: https://support.google.com/webmasters/answer/7451001?hl=pt-BR . Para site pequeno com todas as páginas navegáveis por links, o próprio Google explica que sitemap pode não ser necessário; não transformar erro isolado do relatório em hipótese de bloqueio do site sem evidência.

### Alterações publicadas no GitHub em 13/11/2026

1. `a4796062351b25c99efce395438ff613b27a6a7c`: `sitemap.xml` teve **somente o `lastmod` da homepage** atualizado de `2026-08-17` para `2026-11-13`, data de mudanças reais de links internos e metadados. Releitura do repositório confirmou **oito URLs preservadas** e XML inicial válido; não alterou outros `lastmod`, não reenviou sitemap. Ajuste de integridade, não solução comprovada de indexação. Fonte: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap .
2. `72c6a03df9ad6c6637b9cb49cc32cd00de8818cb`: `index.html` passou a incluir o script **já existente** `assets/acquisition-source.js` com `defer`. Antes esse script estava presente em páginas comerciais, mas **faltava na homepage**; links para a home com `?src=acheiusa` e outras origens aceitas perdiam informação de origem ao seguir para WhatsApp/links internos. O script só processa parâmetros `src` reconhecidos e acrescenta a origem à mensagem do WhatsApp e à navegação interna. Script foi reutilizado, sem modificar WhatsApp, formulário, H1, CSS ou identidade visual. **Validação de conteúdo feita no GitHub; deploy/execução no navegador ainda não verificados nesta rodada**. Não afirmar validação ponta a ponta.

### Distribuição gratuita com chance comercial, sem inventar SEO

- Em pesquisa pública atualizada, `classificados.acheiusa.com` continua mantendo a categoria `Workshops, Aulas e Cursos` e cadastro gratuito. Página da categoria exibia anúncio de inglês de 27/09/2026 e anúncio de professora **baseada no Brasil**, oferecendo aulas online aos brasileiros nos EUA, de 12/09/2026, com telefone +55. Cadastro exige conta própria e dados reais: https://classificados.acheiusa.com/signup . Público compatível (brasileiros nos EUA), porém quantidade de anúncios e **tráfego/leads do professor não comprovados**.
- A possibilidade já estava priorizada no CRM `Canais` como `AcheiUSA Classificados — brasileiros nos EUA`. Sem anúncio publicado nesta rodada; não registrar como lead, backlink ou conversão. Se usuário optar por publicar: usar somente anúncio grátis, categoria `Workshops, Aulas e Cursos`, alcance nacional dos EUA se for permitido, **sem alegar residência nos EUA** e sem publicar preços não autorizados. URL atribuída sugerida: `https://teachermarcosvinifs.github.io/Landing-page-1/aulas-de-ingles-online-adultos.html?src=acheiusa` (script `acquisition-source.js` nessa página já tratava essa origem). Uma publicação bem colocada constitui aquisição orgânica via diretório, **não garante aumento de posicionamento orgânico do domínio no Google**.
- A revisão comparou outros diretórios: `Mural do Saber` cobra R$29,90/mês após um mês grátis e requer cartão; NÃO recomendar como solução gratuita continuada. `SuasAulasParticulares` já existe no CRM, não duplicar cadastro sem confirmar status; tem anúncio gratuito, porém concorrência elevada. `Listou Achou` mostra opção `Consulte preço` e cadastro grátis, mas poucos anunciantes e demanda não comprovada; não elevar a prioritário sem medição.

**Próximas verificações:** status do deploy dos commits, leitura de origem de contato `?src=acheiusa` em teste funcional sem envio de mensagem; acompanhamento de reconhecimento das sete URLs pelo Google após tempo de processamento, sem novas solicitações de indexação. Meta real = exposição de consultas comerciais + contatos atribuídos, não apenas contagem de páginas indexáveis.
