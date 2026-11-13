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


## 11. Confronto de três auditorias independentes e teste controlado de sitemap (13/11/2026)

Após receber três avaliações independentes (uma em texto e duas anexadas), foi verificado o código de produção e o histórico do repositório, e consultada a documentação oficial atual do Google.

**Correção importante da narrativa causal:** a homepage no commit `71e56cfa087b4bdf51ef35a66699c23fce0131b2`, anterior ao último rastreamento registrado da home (20/09/2026), JÁ tinha links HTML para CINCO das sete páginas internas: `qual-formato.html`, `portal-dos-alunos.html`, `como-funciona.html`, `ingles-para-devs.html`, `ingles-para-compliance.html`. A correção de 13/11 alcançou só `aulas-de-ingles-online-adultos.html` e `conversacao-ingles-adultos.html`. Portanto, dizer que a ausência de todos os sete links em setembro prova uma dupla falha de descoberta é incorreto. O que o Google fez ou não com os cinco links continua desconhecido.

**Erro objetivo identificado em uma das análises externas:** sugestão de sitemap-urls.txt com `ingles-para-trabalho.html` no lugar de `ingles-para-compliance.html` — o primeiro não existe no repositório. Também havia inferências apresentadas como certezas: `Tipo: Desconhecido` não prova que o parser XML falhou; `robots.txt` hospedado no diretório do projeto não rege o host, mas sua ausência na raiz não bloqueia o Google nem justifica por si só criar um segundo site; criar uma página raiz não *força* novo crawl. A documentação oficial define `Unknown` como formato não reconhecido **ou arquivo ainda não processado**, e explica `Couldn't fetch` como falha de recuperação no relatório. Fonte: https://support.google.com/webmasters/answer/7451001

**Teste controlado, aditivo, com formato diferente:** commit `f6da152116a1ea0b6c5bdaa9b460365c7ef897e9` criou `sitemap-urls.txt` na raiz do projeto, mantendo intactos `sitemap.xml`, páginas, links e CTAs. O arquivo foi gerado automaticamente das OITO tags `<loc>` do XML vigente; verificada a identidade das oito URLs sem duplicatas e sua correspondência com as páginas existentes, incluindo `ingles-para-compliance.html`. Fonte oficial do formato de texto: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

**Estado da ação:** o novo arquivo foi criado e confirmado pela API do GitHub. O acesso HTTP da nova URL no GitHub Pages NÃO foi confirmado neste ambiente (limitação da ferramenta de navegação). Nenhuma submissão do novo `sitemap-urls.txt` ao Google foi executada, nenhuma entrada anterior foi removida. A ação única pendente, se o professor optar pelo experimento, é verificar que o novo arquivo está disponível no GitHub Pages e então submeter somente `sitemap-urls.txt` como entrada nova no Search Console. Não reenviar o antigo XML. O relatório deve ser acompanhado para verificar **tipo e páginas descobertas**, e depois o estado das URLs; **sucesso no sitemap não garante indexação**. Se a nova entrada também falhar, NÃO criar mais variações de arquivo sem evidência adicional.

**Limitação:** não existe no conector OpenSEO atual uma operação de `sitemaps.get` do Google; ele permite `inspect_urls` e Search Analytics. A página do GSC enviada pelo professor já havia mostrado `Não foi possível ler o sitemap`, última leitura 12/11, zero páginas. Não pedir novo print da mesma tela, nem supor que ela contém explicação técnica mais específica. A origem real de alunos, conforme o professor, é Twitter/X, único canal com resultados comerciais. Não tratar diretórios não publicados como canais efetivos.


## 12. Resultado real do envio de sitemap alternativo — 13/11/2026

**Evidência direta do professor, capturas de 13/11:** novo arquivo público `/Landing-page-1/sitemap-urls.txt` exibiu oito URLs válidas, uma por linha. Foi então enviado UMA ÚNICA vez no Search Console. A notificação mostrou `Sitemap enviado`, porém a linha `/sitemap-urls.txt` retornou imediatamente `Tipo: Desconhecido`, `Não foi possível buscar o sitemap`, `Páginas encontradas: 0`; detalhe: `Última leitura: 13/11/2026`, `Não foi possível ler o sitemap`. Em paralelo, `/sitemap.xml` permanece com erro idêntico, e a entrada histórica inválida `/sitemapxml` também aparece na tabela. A submissão do TXT prova somente que o Google recebeu a solicitação, NÃO seu processamento.

**Reavaliação:** o erro apareceu nos dois formatos válidos, portanto a explicação **exclusivamente baseada na sintaxe XML** perdeu força. A documentação do Google (https://support.google.com/webmasters/answer/7451001?hl=pt-BR) também admite que `Desconhecido` pode indicar sitemap **ainda não processado**, e `Não foi possível buscar` pode ser falha de acesso, ação manual, indisponibilidade transitória ou baixa demanda de rastreamento. O rótulo da UI NÃO demonstra falha interna do processador nem que o erro ficará permanente após as tentativas normais do Google. Não criar novo formato nem reenviar.

**Inspeção de leitura autenticada do Google via OpenSEO depois das capturas:** homepage continua `PASS / Enviada e indexada`, lastCrawl `2026-09-20T06:02:51Z`; `sitemap.xml` continua `Rastreada, mas não indexada`, fetch `SUCCESSFUL`, lastCrawl `2026-11-05T17:42:54Z` (isso é indexação de URL, não relatório de Sitemaps); novo `sitemap-urls.txt` está `O Google não reconhece o URL` na URL Inspection; `aulas-de-ingles-online-adultos.html` e `ingles-para-devs.html` continuam desconhecidas. Respostas podem estar defasadas em relação ao envio no mesmo dia.

**Próxima verificação informativa que ainda não foi demonstrada no histórico:** consultar **Segurança e ações manuais → Ações manuais** na propriedade correta; a documentação do Google diz que ação manual não resolvida impede leitura de sitemaps. Se indicar nenhum problema, essa causa fica descartada. A operação de leitura `sitemaps.get` da API Search Console (`isPending`, `lastDownloaded`, `type`, `errors`, `contents`) é útil, mas o conector OpenSEO disponível não a expõe atualmente. Não dizer que a API foi consultada. Em seguida, compilar caso técnico para comunidade oficial do Search Console se persistir, em vez de alterar código ao acaso. O trabalho comercial separado deve preservar Twitter/X como único canal comprovado de alunos. Nenhuma alteração de páginas, WhatsApp ou formulário nesta rodada.


## 13. Ações manuais descartadas — 13/11/2026

O professor enviou captura autenticada da propriedade `https://teachermarcosvinifs.github.io/Landing-page-1/` na área **Segurança e ações manuais → Ações manuais**. A tela exibiu a confirmação **“Nenhum problema foi detectado”** (ícone verde). Logo, não há evidência de ação manual ativa, e esta hipótese de falha de leitura dos sitemaps pode ser descartada no estado atual. Isso NÃO exclui automaticamente problemas de segurança, algoritmo, indexação ou processamento de sitemap: são categorias distintas.

Resultados anteriores mantidos: `sitemap.xml` e `sitemap-urls.txt` públicos, enviados separadamente, ambos com **“Não foi possível buscar/ler sitemap”**, `Tipo: Desconhecido` e `0 páginas encontradas`; homepage indexada com último crawl registrado em 20/09/2026; as sete páginas internas desconhecidas pelo Google na API de Inspeção. Não houve correção verificada no Search Console. Evitar novos envios, novas variações de sitemap e alegações de que há penalização.

**Próxima via de investigação sustentada:** obter, se possível, o recurso da **API oficial Search Console `sitemaps.get`** para o registro correto, que pode detalhar `path`, `lastDownloaded`, `isPending`, `errors`, `warnings`, `type`, `contents`; tal operação NÃO está exposta pelo conector OpenSEO atualmente conectado. Alternativa: encaminhar os resultados com URLs e datas à comunidade oficial do Search Console; não há garantia de resposta de engenharia nem de indexação. Documentação oficial: https://support.google.com/webmasters/answer/7451001 e https://support.google.com/webmasters/answer/9044175 . Não solicitar screenshots repetidos da página de Sitemaps ou Ações manuais.


## 14. API oficial Sitemaps.get — 13/11/2026

**Nova evidência direta fornecida pelo professor:** execução autenticada de `Sitemaps: get` no próprio Google APIs Explorer (HTTP 200 da REQUISIÇÃO À API, que não é status do sitemap):

```json
{
  "path": "https://teachermarcosvinifs.github.io/Landing-page-1/sitemap.xml",
  "lastSubmitted": "2026-11-13T01:49:24.011Z",
  "isPending": true,
  "isSitemapsIndex": false,
  "warnings": "0",
  "errors": "0"
}
```

**Interpretação segundo a definição OFICIAL da API:** `isPending=true` significa que o sitemap **ainda não foi processado**. `errors=0` / `warnings=0` significam **zero erros/avisos registrados**, NÃO uma validação do arquivo enquanto estiver pendente. Ausência de `lastDownloaded`, `type` e `contents` significa que o recurso não oferece evidência de download/processamento como sitemap. `lastSubmitted` corresponde ao último envio registrado (12/11 em hora local), e sozinho NÃO data o início do problema; o histórico anterior do professor permanece relevante. A Inspeção de URL do XML com fetch bem-sucedido em 05/11 é via mecanismo distinto e não prova processamento no relatório de Sitemaps.

Referência oficial: https://developers.google.com/webmaster-tools/v1/sitemaps (campo `isPending`: 'If true, the sitemap has not been processed'). Em comunidade oficial, especialista de produto explicou que `Couldn't fetch` na interface pode equivaler a `isPending=true` quando o Google ainda não acessou o sitemap **no processo específico de sitemaps**: https://support.google.com/webmasters/thread/477259408/sitemap-shows-couldn-t-fetch-while-api-reports-ispending-true?hl=en . Não tratar essa resposta de fórum como diagnóstico causal específico para este site.

**Próxima ação informativa única:** consultar `Sitemaps.get` para `https://teachermarcosvinifs.github.io/Landing-page-1/sitemap-urls.txt` no mesmo APIs Explorer (somente `feedpath` muda, sem submissão). Se também `isPending=true`, ambos os formatos estão em estado pendente, fortalecendo gargalo de processamento/acesso da ferramenta ao invés de sintaxe XML específica; se `false`, observar `type`, `lastDownloaded`, `contents` e erros. **Não** criar novos sitemaps, reenvios, alteração de robots ou novo domínio por enquanto. Com a evidência completa, investigar com a comunidade oficial do Search Console; não declarar solução nem prometer prazo. GitHub, OpenSEO, CRM devem conservar esse estado como PENDENTE.


## 15. Sitemaps.get confirma ambos pendentes — 13/11/2026

O professor executou o segundo teste autenticado de leitura **Google Search Console API → Sitemaps.get** para o arquivo TXT. Resultado literal:

```json
{
  "path": "https://teachermarcosvinifs.github.io/Landing-page-1/sitemap-urls.txt",
  "lastSubmitted": "2026-11-13T15:27:45.452Z",
  "isPending": true,
  "isSitemapsIndex": false,
  "warnings": "0",
  "errors": "0"
}
```

Comparação com XML da seção 14: `isPending=true` em **ambos os sitemaps** (`sitemap.xml` e `sitemap-urls.txt`). Ambos foram enviados em 12–13/11/2026, e não mostram `lastDownloaded`, `type` ou `contents` no recurso. O Google define **isPending=true = sitemap não processado**. `errors=0`/`warnings=0` indicam somente nenhuma ocorrência registrada; **não validam arquivo ainda pendente**. HTTP 200 nessas capturas é sucesso da chamada à API. A UI de ambos mostrava `Tipo: Desconhecido`, `Não foi possível buscar/ler` e `Páginas encontradas: 0`.

**Diagnóstico revisado:** falha específica de sintaxe/parsing XML fica menos plausível, pois texto puro também pendente; não foi demonstrada causa definitiva nem defeito interno do Google. Como as duas entradas foram submetidas recentemente, `isPending=true` isolado não prova que ambas estejam travadas permanentemente; histórico de meses de envios anteriores permanece relevante, mas timestamps atuais só medem a última submissão. A homepage continua indexada e as 7 páginas internas desconhecidas na última inspeção por API.

**Decisão:** encerrar variações de sitemap/reenvios e alterações especulativas no repositório. Próxima investigação realmente nova = reunir os dois retornos da API, resultados dos testes ao vivo e histórico de indexação numa solicitação técnica à comunidade oficial do Search Console. Se surgir mensagem de erro HTTP específica ou evidência do backend, verificar somente a causa apontada. Em paralelo, medir busca orgânica comercial por consulta/página/contato; não misturar com leads originados do Twitter/X (único canal com aquisição comprovada). Não declarar a indexação resolvida.

Referências: https://developers.google.com/webmaster-tools/v1/sitemaps?hl=pt-BR e https://support.google.com/webmasters/answer/7451001?hl=pt-BR .


## 16. GA4 — coleta configurada e OpenSEO conectado (13/11/2026)

O professor criou uma propriedade Google Analytics 4 **Aulas de Inglês — Site Marcos Vinicius**, conta **Marcos Vinicius — Aulas de Inglês**, fluxo Web **Site — Aulas de Inglês**, `streamId=16336612149`, `measurementId=G-S707HY11SD`, URL `https://teachermarcosvinifs.github.io/Landing-page-1/`.

**Execução no repositório:** foi criado `assets/analytics.js` no commit `b17220b82c1c59780e968b11c5c72879646b3823`. O script foi incluído **uma vez em cada uma das 9 páginas HTML atuais** (oito páginas no sitemap + `contato.html`, esta última com `noindex` intencional), sem substituir título/canonical/css/contatos/formulários. Commits: home `0c7c4ee`, adultos `74529db`, conversação `48429f3`, devs `16a9295`, compliance `03114a1`, como-funciona `1f13bbd`, formatos `db4ff3f`, portal `02866bd`, contato `e102769`. Releitura da API GitHub confirmou que cada arquivo tem uma inclusão da tag e manteve canonical, CSS e contatos.

**Privacidade e operação:** carregamento da biblioteca do Google é **opt-in** — só ocorre após consentimento explícito no aviso discreto; recusa impede coleta, e rodapé oferece reabrir preferências. Consentimento armazenado localmente por navegador. `ad_storage`, `ad_user_data` e `ad_personalization` negados; não ativar anúncios. O script cria `contact_whatsapp_click` para clique nos links WhatsApp e para formulário de contato com campos necessários preenchidos, registrando exclusivamente origem da ação e caminho da página; **não envia nome, nível, objetivo, notas, texto da conversa ou número do visitante ao Analytics**. Em `page_location`, a query é limitada a parâmetros de campanha sanitizados e marcadores `src` conhecidos, com mapeamento de `src=x-...` como campanha social X. Isso identifica interesse em contato, NÃO prova matrícula/lead real.

**OpenSEO conectado diretamente:** `list_google_analytics_properties` encontrou a propriedade única `properties/564286322` na conta Google já autorizada; `set_google_analytics_property` retornou `ok=true`; `get_google_analytics_measurement_health` confirmou um fluxo Web com o ID exato `G-S707HY11SD`. Medição otimizada: pageviews, scrolls, outbound clicks e interações de formulários ativados; site search, vídeo e download desativados porque não são prioridades. A única advertência retornada é `site_search_measurement_disabled`, compatível com essa escolha, não incidente. O GA4 apresentou três eventos-chave padrão (qualify_lead, close_convert_lead, purchase), mas **nenhum evento personalizado foi marcado como evento-chave nesta rodada**. Não afirmar que há conversões comerciais mensuradas.

**Verificações:** fonte do GitHub validada, script sintaticamente válido e incluído uma vez em cada página; teste simulado de estado de consentimento sem resposta/granted/denied parcialmente executado, sem problemas para estados sem consentimento e recusa. Teste HTTP da URL pública de `assets/analytics.js` foi bloqueado pela ferramenta externa de navegação, de modo que publicação e disparo GA4 **não foram confirmados em dispositivo/browser real**. **Única ação do professor:** abrir o site em aba anônima, selecionar `Aceitar estatísticas`, depois abrir GA4 → Relatórios → Tempo real e verificar uma visita, sem concluir que está funcionando antes do evento. Pode levar até 30 min após ativação; extensões de bloqueio podem impedir. No OpenSEO, consultar tráfego por fonte quando houver eventos. A configuração GA4 é **independente do problema antigo de indexação Google Search Console** (XML e TXT `isPending=true`, sete URLs internas desconhecidas). Preservar histórico desse problema e não declarar SEO resolvido.
