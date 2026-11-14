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


## 17. Contato vindo da ferramenta de formatos — origem externa não identificada

O professor recebeu em 13/11/2026 um contato real no WhatsApp cuja mensagem começava exatamente com `Olá! Usei a ferramenta de formatos do seu site. Tenho interesse em estudar inglês. Minha escolha ficou em Ensino regular, Individual...`. A origem imediata foi identificada diretamente no código `qual-formato.html`: texto gerado pelo handler de submit do formulário `#fitForm` e link dinâmico `#waResult`, **não** o botão genérico de WhatsApp da homepage (que usa `Olá! Vi seu site...`). Isso confirma a passagem pelo seletor de formatos e intenção de aulas individuais, mas **não identifica o canal externo de aquisição** (X, Google, visita direta, link compartilhado etc.). O texto do lead não continha frase de origem, que só é acrescentada quando a URL possui `src` com marcador conhecido, como `x-formatos`; não afirmar que veio do Twitter/X nem como conversão orgânica Google. O GA4 foi recém instalado e não recupera retroativamente a origem desse contato.

**Correção de redação:** o professor rejeitou a frase pré-configurada, artificial. Commit `036569eab0aa76c61d3d7dfa0abdcb5c81e71a74` substituiu SOMENTE a composição do texto do botão WhatsApp na ferramenta de formatos por uma mensagem mais humana: `Oi, Marcos! Vi os formatos de aula no seu site e tenho interesse em aulas individuais de inglês. Podemos conversar sobre horários e valores?`, preservando modalidade/carga semanal e eventual frase de origem conhecida. Função de formulário, link, opções e visual intactos; validação de sintaxe JS e releitura do código efetuadas. Visita/geração efetiva em navegador após commit ainda não testada. Não adicionar o contato como lead originado do X sem confirmação do interessado. Forma mais confiável de identificar o canal deste contato específico: pergunta simples e direta ao próprio interessado.


## 18. Retomada operacional — 13/11/2026: Tag Assistant, WhatsApp e GSC

**Correção posterior de WhatsApp confirmada no GitHub:** a última mensagem corrigida em `qual-formato.html` não é a frase intermediária `Oi, Marcos! Vi os formatos...` registrada na seção 17. O commit **`d27cad774be4dd20a752f4697a2ff670af3cfea0`** substituiu essa versão, atendendo à redação literal do professor. A versão atual compõe:
```
Olá, tenho interesse em estudar inglês

Minha escolha ficou em Ensino regular, Individual. Gostaria de consultar valores, planos e cargas horárias
```
Não adiciona ponto final; preserva linha em branco, modalidades dinâmicas e frase opcional de origem identificada por `?src=`. Nova leitura direta do GitHub confirmou esta versão (`qual-formato.html`, blob SHA `e90aba55a7e9170706b9167a960ea43edca0401a`). **Não** foi possível validar URL HTTP pública nessa rodada: acesso externo ao host `github.io` bloqueado pela ferramenta; não afirmar teste de interface real.

**Tag Assistant, sessão de 13/11:** capturas do professor confirmaram conexão de depuração e descoberta da tag exata `G-S707HY11SD`; sessão apresentou eventos `Consentimento-padrão`, `Atualização de consentimento`, `Config`, `Janela carregada`, `DOM pronto` e `Visualização de página`. A leitura posterior do histórico do Tag Assistant exibiu `Sem conexão` depois de a sessão terminar: essa expressão por si só não significa falha da tag. A inspeção da sessão não mostrou o conteúdo detalhado dos **Hits enviados**; sem essa evidência ou `page_view` em tempo real no GA4, **não declarar coleta de eventos comprovada**. Próxima ação ÚNICA do professor: reabrir a sessão histórica no Tag Assistant, selecionar `G-S707HY11SD`, aba **Hits enviados**, enviar captura com tipos e destinos dos hits. Não repetir a mesma visita/espera de 30 min.

**Google Analytics via OpenSEO na retomada:** `get_google_analytics_measurement_health` retorna `status=ok`, 1 fluxo Web `G-S707HY11SD`, com `site_search_measurement_disabled` deliberado e irrelevante para captar visitas. Dados GA4 12/11 mostram zero (propriedade criada em 13/11, portanto esperado); API normal de relatórios não aceita consulta de dia 13/11 antes de ele estar completo. Não confundir zero do dia anterior com prova de erro no tempo real. Um contato efetivo recebido pela ferramenta de formatos **não** foi atribuído ao Twitter/X ou Google: o canal externo não veio na mensagem.

**GSC reconsultado pela API, sem nova solicitação:** `inspect_urls` nas 8 URLs retornou homepage `PASS`, `Enviada e indexada`, último rastreamento `2026-09-20T06:02:51Z`, e todas as 7 URLs internas `O Google não reconhece o URL`. Pesquisa Web 14/10 a 10/11 (últimos 28 dias completos): `5 impressões`, `0 cliques`, apenas homepage; `0 consultas` detalhadas. Isso é **linha de base antiga ainda não afetada pelas alterações de 13/11**. Sitemap XML e TXT seguem com `isPending=true` nas últimas chamadas autenticadas fornecidas pelo professor; sem motivo para reenviar. Fórum oficial publicado em https://support.google.com/webmasters/thread/477558147?hl=pt-BR — leitura automática pública falhou nesta rodada, portanto não afirmar ausência ou presença de novas respostas. Outra discussão da comunidade oficial semelhante teve explicação de Expert em Produtos de que `Couldn't fetch` pode apenas indicar arquivo ainda não acessado pelo processamento de sitemap, sem defeito comprovado; não tomar isso como diagnóstico conclusivo deste domínio.

**IndexNow:** código `.github/workflows/indexnow.yml` existe e envia URLs HTML alteradas em push `main`, para motores que suportam IndexNow (não Google). Verificada existência e configuração no GitHub; não foi possível confirmar run operacional bem-sucedida nessa rodada (status checks do commit não trouxeram verificações). Não repetir integração no OpenSEO sem prova de falha; prioridade menor que GA4 e GSC.

**Aquisição:** para contatos futuros do X, pode-se usar `https://teachermarcosvinifs.github.io/Landing-page-1/qual-formato.html?src=x-formatos` (código reconhece o marcador e pode acrescentar a origem); não alegar que o contato já recebido veio por esse caminho. Solicitar ao professor somente a captura detalhada de **Hits enviados** do Tag Assistant para concluir a medição antes de qualquer nova alteração em GA4.


## 19. Tag Assistant — hit page_view comprovadamente enviado (13/11/2026)

O professor forneceu DUAS capturas detalhadas na área **Hits enviados → Visualização de página** do Tag Assistant. Evidência direta: `Destino: G-S707HY11SD`; `URL: https://www.google-analytics.com/g/collect`; parâmetro `tid=G-S707HY11SD`; `en=page_view`; `dl` corresponde à homepage `https://teachermarcosvinifs.github.io/Landing-page-1/?gtm_debug=...`; parâmetro `_dbg=1` (modo de depuração), referência `https://tagassistant.google.com/`. O navegador efetivamente **emitiu** hit de page_view para endpoint da propriedade correta. A captura não comprova o status HTTP da recepção nem o processamento pela propriedade GA4. NÃO repetir instalação da tag, reenvio do sitemap ou o teste genérico do Tag Assistant.

**Passo seguinte, preciso e limitado:** acessar Google Analytics → Administrador → Exibição de dados → **DebugView**, selecionar dispositivo de depuração se solicitado, e procurar o evento `page_view` daquela sessão (veja também minutos anteriores dentro da janela do DebugView). O Google recomenda Tag Assistant como modo de ativar DebugView e o parâmetro `gtm_debug` usado nas capturas demonstra que estava ativo. Se o DebugView mostrar `page_view`, coleta GA4 do evento está comprovada; se não mostrar, verificar a janela temporal (o DebugView mostra ~30 minutos), consentimento e/ou filtros de dados antes de concluir que há defeito. Não ativar debug_mode permanentemente para todos os visitantes. O evento `contact_whatsapp_click` ainda não foi testado. Referência: https://support.google.com/analytics/answer/7201382?hl=pt-BR .


## 20. DebugView vazio após hit — próximo diagnóstico HTTP

Em 13/11/2026, após diversos testes, o professor mostrou outra captura do Google Analytics **Administrador → Exibição de dados → DebugView** com **0 dispositivos de depuração** e mensagem `Aguardando eventos de depuração`. O print foi tirado depois de ele seguir instruções para reabrir Tag Assistant, confirmar consentimento e atualizar a página. O Tag Assistant, porém, havia mostrado `page_view` com `en=page_view`, `tid=G-S707HY11SD` destinado a `https://www.google-analytics.com/g/collect` (capítulo 19). **Não repetir consentimento, F5 ou troca entre essas telas como diagnóstico**. O comportamento segue INCONCLUSIVO: a interface do Tag Assistant mostra hit enviado, mas não informa o código HTTP efetivamente recebido pelo navegador, e o DebugView pode não exibir eventos filtrados ou sem consentimento analítico.

**Reverificação por API:** OpenSEO `get_google_analytics_measurement_health` retorna propriedade `properties/564286322`, stream Web com ID exato `G-S707HY11SD` e medição otimizada ativada. A única observação é `site_search_measurement_disabled`, deliberada e sem relação com `page_view`. Releitura do GitHub `assets/analytics.js` confirma que `gtag('config',id,...)` usa mesmo ID e só carrega após aceite explícito; o código contém consentimento `default denied` e `update analytics_storage granted` quando aceito. **Nenhuma causa no código está demonstrada; não alterá-lo especulativamente.**

**Próxima verificação de maior rendimento, única e nova:** no Chrome da pessoa que aceitou consentimento, abrir homepage, F12 → Rede/Network → filtrar `collect`, atualizar a página uma vez e capturar a coluna Status para `www.google-analytics.com/g/collect` sem compartilhar cookies, client ID ou query string completa. `200`/`204` indica transmissão HTTP bem-sucedida, e o foco passa a filtros/recepção GA4 (Administrador → Coleta e modificação de dados → Filtros de dados); `(blocked)`/`(failed)` indica extensão, privacidade ou rede; ausência de chamada indica carregamento da tag/consentimento; `4xx` requer inspecionar a resposta. Diferenciar transmissão HTTP de processamento no relatório. Fontes oficiais: https://developers.google.com/analytics/devguides/collection/ga4/troubleshoot?hl=pt-br e https://support.google.com/analytics/answer/7201382?hl=pt-BR . Não esperar 24–48h para DebugView; esse prazo se aplica a relatórios padrão.


## 21. Primeiro contato com descoberta por Google → Instagram; GA4 HTTP 204

**13/11/2026, evidência nova fornecida pelo professor em captura de WhatsApp:** após pergunta direta `Ah certo, você me achou através de que maneira?`, um interessado respondeu `pesquisando no google` e `e encontrei o instagram`. **Atribuição factual:** descoberta declarada pela pessoa via **pesquisa no Google → perfil Instagram do professor**. É um contato comercial real e evidência de exposição da presença do professor no Google, **não** comprovação de clique ou indexação do site GitHub Pages nem prova de SEO técnico deste domínio. Não inferir pesquisa orgânica vs anúncio, termo pesquisado, ranking, se o interessado visitou a landing page, nem venda/matrícula. Registrar separadamente dos contatos do Twitter/X, e de contato com origem não identificada. Google Search Console da propriedade do site não mede cliques do Google direcionados ao perfil de Instagram.

**Outra captura técnica (Chrome DevTools → Network → collect):** requisição `collect?v=2&tid=G-S707HY11SD&...` retornou **HTTP 204** (tipo `fetch`). Junto com captura anterior do Tag Assistant que mostra `en=page_view` enviado para `https://www.google-analytics.com/g/collect`, isso confirma que o navegador **transmitiu requisição de medição e recebeu resposta HTTP de sucesso** do endpoint correto. Não garante que evento apareça em DebugView/relatórios, nem que visitas anteriores foram registradas. DebugView persistia 0 dispositivos e nenhum evento na captura anterior. **Próxima tarefa**: checar Analytics relatórios/tempo real/DebugView em sessão recente e filtros de dados (eventual filtro interno/developer); não repetir instalação, consentimento, reenvio de sitemap ou teste Network. Para aquisição, usar marcações explícitas nos links futuros e perguntar origem quando necessário; o contato atual não pode ser atribuído ao SEO da landing page.


## 22. Filtro GA4 em Teste — não exclui page_view

**13/11/2026:** screenshot do professor em Google Analytics → Administrador → Coleta e modificação de dados → Filtros de dados. Existe exatamente um filtro visível, `Internal Traffic`, tipo `Tráfego interno`, operação `Excluir`, **Estado atual: Teste**. Pela documentação oficial do Google, filtros em modo Teste apenas identificam eventos correspondentes; só o estado `Ativo` exclui permanentemente. Assim, **o filtro mostrado não explica ausência de page_view nos relatórios ou DebugView**. Não desativar nem editar esse filtro como tentativa de correção.

Evidência anterior: DevTools da homepage mostra endpoint `collect?v=2&tid=G-S707HY11SD` com resposta **HTTP 204**; transmissão de evento aceita pelo endpoint, mas relatório ainda não verificado. `get_google_analytics_measurement_health` OpenSEO confirma propriedade e fluxo corretos. **Próxima ação objetiva, sem nova geração de visitas:** verificar **GA4 → Relatórios → Tempo real** referente à visita recente do teste HTTP 204 (captura do professor ~16:27 horário local); olhar `page_view`, contagem de eventos e usuários nos últimos 30 minutos. Se zerado, verificar **estado efetivo de analytics_storage na aba Consentimento do Tag Assistant** da mesma sessão, para explicar divergência entre envio e visibilidade, antes de alterar código. DebugView vazio sozinho pode ser questão de consentimento/debug e não prova que GA4 não coleta eventos. Documento oficial filtro: https://support.google.com/analytics/answer/10104470?hl=pt-BR .


## 23. GA4 confirmado em relatório Tempo real — 13/11/2026

O professor compartilhou DUAS capturas em **Google Analytics → Relatórios → Visão geral em tempo real**, propriedade `Aulas de Inglês — Site Marcos Vinicius`, após todas as verificações anteriores. **Dados observados:** **1 usuário ativo nos últimos 30 minutos**, **2 visualizações na homepage**, **2 eventos `page_view`** e **1 evento `user_engagement`**. Isso COMPROVA recepção e apresentação no GA4; a coleta básica está funcional e o incidente de “GA4 nunca recebe dados” está **RESOLVIDO**. Provas anteriores: Tag Assistant hit `en=page_view` destino `G-S707HY11SD`, Chrome Network `g/collect` retornou HTTP 204; filtro `Internal Traffic` em **Teste**, sem exclusão efetiva. O fato de DebugView ter exibido `0` em sessões anteriores não deve ser usado como motivo para repetir diagnóstico ou alterar código. **Não pedir F5, tag, consentimento ou DebugView outra vez para validar o mesmo ponto.**

**Pendente distinto:** validar envio do evento personalizado `contact_whatsapp_click` no próprio relatório Tempo real, gerado por ação de contato do site, e então avaliá-lo como evento principal (*key event*) para medir intenção de contato, sem confundir com mensagem enviada, lead qualificado ou matrícula. Validar a atribuição de origem X/Instagram via parâmetros UTM e links publicados; separar explicitamente descoberta pelo Google→Instagram de tráfego orgânico comprovado do site. Continuar investigação antiga de indexação das 7 páginas e sitemap (não resolvidos por GA4).


## 24. Evento contact_whatsapp_click comprovado no GA4 Tempo real

**13/11/2026:** o professor acionou o botão `Falar pelo WhatsApp` em seu site e forneceu captura do GA4 → Relatórios → Visão geral em tempo real, na qual aparecem `contact_whatsapp_cl...` (1 evento), `click` (1 evento), `page_view` (1 evento) e `session_start` (1 evento), além de 1 usuário ativo. O nome completo do evento personalizado foi verificado diretamente no código GitHub `assets/analytics.js`: `contact_whatsapp_click`. Portanto o disparo do evento de interesse em contato foi **confirmado no relatório real**. `click` é a métrica automática de clique de saída e `contact_whatsapp_click` a métrica personalizada; ambos podem descrever a **mesma ação**, NÃO duas pessoas/duas conversas. Não confundir clique para WhatsApp com envio efetivo da mensagem, lead qualificado ou matrícula.

**Próximo passo recomendado:** marcar somente `contact_whatsapp_click` como **Evento principal** em GA4 → Administrador → Exibição de dados → Eventos → Eventos recentes, clicando na estrela ao lado dele. Documentação oficial: https://support.google.com/analytics/answer/13128484?hl=pt-BR . O relatório Tempo real da captura mostra `Eventos principais` vazio, e nova leitura via OpenSEO `get_google_analytics_measurement_health` confirmou que `contact_whatsapp_click` ainda não está na lista de keyEvents (listou somente `close_convert_lead`, `qualify_lead`, `purchase`). A marcação aplica-se aos próximos eventos e não é retroativa. Não marcar `page_view` ou o `click` genérico como evento principal, pois inflariam os resultados. Se o evento ainda não aparecer na listagem de Eventos recentes, é possível aguardar o processamento, sem repetir o teste nem recriar o evento; alternativa específica é usar `Novo evento principal` com nome exato já existente. Depois, acompanhar canais e sessões, dando o contexto de que origem X/Instagram exige UTM nas divulgações e que relatos de interessados são evidências comerciais separadas do tráfego do domínio.


## 25. Evento principal criado — valores divergentes a corrigir

Em 13/11/2026 o professor criou `contact_whatsapp_click` em GA4 Administrador → Exibição de dados → Eventos, marcando-o como **evento principal**, opção **Criar com código** (já estava implementado no site). A aba `Eventos recentes` continuava vazia devido ao processamento inicial, o que NÃO invalida a criação. A consulta autenticada ao OpenSEO `get_google_analytics_measurement_health` confirmou a criação na propriedade `properties/564286322`, `createTime=2026-11-13T21:33:52.625714Z`, mas identificou **configurações incorretas**: `defaultValue={"numericValue":1,"currencyCode":"USD"}` e `countingMethod="ONCE_PER_EVENT"`. Embora o professor tenha recebido instruções para não atribuir valor e contar uma vez por sessão, esses valores NÃO foram aplicados. Portanto evento principal está CRIADO, porém **ajuste de valor e contagem ainda pendente**. Não criar novo evento nem alterar a tag/código.

Correção exata, confirmada pela documentação GA4: Administrador → Exibição de dados → Eventos → aba **Eventos principais** → menu ⋮ à direita de `contact_whatsapp_click` → **Definir valor padrão do evento principal** → **Não definir um valor padrão** → Salvar; depois menu ⋮ → **Mudar o método de contagem** → **Uma vez por sessão** → Salvar. Esse par de mudanças afeta dados futuros, não retroativamente. Links oficiais https://support.google.com/analytics/answer/15638160?hl=pt-BR e https://support.google.com/analytics/answer/13366706?hl=pt-BR . Depois, chamar `get_google_analytics_measurement_health` novamente para verificar **ausência de defaultValue monetário** e `countingMethod=ONCE_PER_SESSION` antes de declarar etapa concluída. É intenção de contato e NÃO leads ou receita.


## 26. Evento principal WhatsApp corrigido e verificado pela API

**13/11/2026 — concluído.** O professor selecionou e salvou **Não definir valor de evento principal padrão** e **Uma vez por sessão** para o evento `contact_whatsapp_click` em GA4. Após cada alteração, `OpenSEO.get_google_analytics_measurement_health` foi consultado na propriedade `properties/564286322`. O resultado final autenticado mostra `eventName=contact_whatsapp_click`, `countingMethod=ONCE_PER_SESSION` e ausência de `defaultValue` — portanto **sem receita fictícia**. Evento principal permanece cadastrado; a coleta básica e evento de clique já foram comprovados em GA4 Tempo real. O evento mede intenção de contato, não mensagem enviada, lead qualificado ou matrícula. Não repetir teste/alteração. Próximas frentes SEO: atribuição com UTM em links publicados e indexação das sete páginas internas do site, ainda não comprovada. O único alerta `site_search_measurement_disabled` é deliberado.


## 27. Campanhas X/Instagram rastreáveis e caminho alternativo de descoberta

**13/11/2026 — execução concreta, após evento principal GA4 concluído.** Antes de modificar, relidas as 9 páginas HTML, `assets/analytics.js`, `assets/acquisition-source.js`, `README.md`, sitemap e contexto OpenSEO. GSC `get_search_console_performance` 15/10–13/11 (dados finais e recentes mistos, últimos dias incompletos) retornou **8 impressões / 0 cliques, apenas homepage**, com impressões em 03/11 (2), 04/11 (1), 12/11 (5); 0 termos de consulta disponibilizados. Não tomar a posição média da amostra como ranking comercial. Mesmo após atualizações, sete páginas internas ainda **sem reconhecimento comprovado pelo Google**, embora OpenSEO rastreasse as oito. `sitemap.xml` continua listando oito URLs válidas. Sem novo envio.

**Melhoria de aquisição no GitHub:** ampliado `README.md` com links diretos para todas as sete páginas comerciais (commit `5cdba904`); isso oferece referências externas adicionais, mas não promete indexação nem autoridade. Atualizado `assets/acquisition-source.js` (commit `f000ebfe`): mantém marcadores `?src` originais, reconhece `utm_source=x` ou `utm_source=instagram` + `utm_medium=social`, registra apenas **rótulo não pessoal da campanha** em `sessionStorage` até 30 minutos, limpa quando chega nova referência externa, e inclui a origem conhecida em parágrafo separado ao abrir o WhatsApp. Em origem desconhecida, NÃO acrescenta texto. Também trata links dinâmicos de WhatsApp e evita duplicação da origem na ferramenta de formatos quando ela própria já a informa. Não persiste identificação pessoal nem rastreia visitas recusando GA4. Campanhas UTM NÃO são repetidas nos links internos, para não alterar atribuição de campanha no GA4. Novos scripts incluídos uma vez em cada uma das nove páginas HTML, sem substituir `assets/analytics.js`, CTAs, canonical, estilos ou formulário. `contato.html` ajustado para ler marcador explícito ou da mesma sessão e mostrar `Origem` no texto de contato (commit `ebcc22c8`), preservando `noindex,follow` e validações.

**QA:** releitura GitHub confirmou 1 script Analytics + 1 script de origem em cada um dos nove arquivos HTML, `assets/acquisition-source.js` com sintaxe JS válida, canonical preservado e `contato.html` ainda com `noindex`. Simulação de quatro percursos em JS (UTM X, navegação interna, nova referência Google, ferramenta com src explícito) passou, inclusive ausência de origem indevida no terceiro e de duplicação no quarto. Não se conseguiu HTTP de produção pelo ferramental disponível (hostname `github.io` inacessível de fora do navegador do professor); portanto publicação visual e testes reais dos novos marcadores não comprovados.

**Links de divulgação prontos:**
- X/Twitter perfil/bio: `https://teachermarcosvinifs.github.io/Landing-page-1/?utm_source=x&utm_medium=social&utm_campaign=perfil`
- Instagram bio: `https://teachermarcosvinifs.github.io/Landing-page-1/?utm_source=instagram&utm_medium=social&utm_campaign=perfil`
- X sobre formatos: `https://teachermarcosvinifs.github.io/Landing-page-1/qual-formato.html?src=x-formatos`
- Instagram sobre formatos: `https://teachermarcosvinifs.github.io/Landing-page-1/qual-formato.html?src=ig-formatos`

**Ação externa pendente do professor:** substituir o link público do perfil/bio do X e do Instagram pelos respectivos links rastreáveis, preservando os demais canais. Nenhum acesso de escrita às biografias sociais foi concedido nesta sessão, então não alegar publicação. Também não presumir que contato comercial que relatou Google→Instagram passou pela landing. Após data completa, consultar GA4 no OpenSEO `get_google_analytics_traffic_acquisition` por source_medium/campaign; olhar evento principal `contact_whatsapp_click` separado de leads reais. No Search Console, não pedir novo sitemap; houve informação recente de especialistas no próprio suporte oficial de que `Couldn't fetch` com `isPending` pode ser apenas sitemap ainda não lido pelo processamento, não defeito confirmado (<https://support.google.com/webmasters/thread/477520697/>); a falta de reconhecimento das sete páginas ainda exige acompanhamento.


## 28. Diagnóstico Google reavaliado: descoberta ainda não comprovada (13/11/2026)

**Verificações nesta continuação:** `OpenSEO.inspect_urls` consultou novamente, em tempo real, as 8 URLs. Homepage com `verdict=PASS`, `Submitted and indexed`, `robotsTxtState=ALLOWED`, `indexingState=INDEXING_ALLOWED`, `pageFetchState=SUCCESSFUL`, `lastCrawlTime=2026-09-20T06:02:51Z`, canonical Google igual à canonical declarada. As SETE páginas comerciais internas permanecem `verdict=NEUTRAL` / `coverageState=URL is unknown to Google`, sem dados de fetch/robots para aquelas URLs. Não traduzir o estado como punição, rejeição de qualidade ou bloqueio, e não tratar a ausência de dados como confirmação de que robots foi permitido em cada URL pelo Google.

**OpenSEO audit mais recente** ID `976ed6e8-584f-4d14-a882-9aba2f48b6e3` (13/11 05:05Z): 8/8 HTML acessíveis com HTTP 200, `isIndexable=true`, títulos únicos e apenas cinco avisos INFORMATIVOS de comprimento de `title` ou meta-description. Nenhum erro crítico, canonical conflict, link quebrado ou noindex. Todos os sete conteúdos são alcançáveis a um clique da homepage (`crawlDepth=1`). Auditoria marcou `inSitemap=false` para as oito URLs, **não tomar isso como ausência real do sitemap**, pois o arquivo `/Landing-page-1/sitemap.xml` foi lido e contém 8 URLs por fetch GitHub e teste de produção do Actions; o auditor pode procurar sitemap na raiz do HOST, e a causa da discrepância não foi confirmada.

**Achado técnico com documentação oficial:** O `robots.txt` está publicado em `https://teachermarcosvinifs.github.io/Landing-page-1/robots.txt`. Segundo <https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec>, um arquivo robots.txt só é interpretado na **raiz do host** (`https://teachermarcosvinifs.github.io/robots.txt`); portanto a linha `Sitemap:` do robots dentro do projeto não é lida automaticamente por robôs como arquivo de configuração. ISSO NÃO BLOQUEIA as páginas (padrão é permitir sem regra), nem prova causa do sitemap pendente, pois ambos XML/TXT foram enviados manualmente via Search Console, uma alternativa oficial. **Não criar outro repositório de user-site, migrar domínio ou alterar o robots em loop para resolver esta observação isoladamente.**

**Explicação temporal relevante:** os links de descoberta na homepage foram corrigidos em 13/11; o último rastreamento Google registrado para a homepage foi 20/09, **antes da correção**. Não há evidência de que o Google já tenha visto o HTML atual com esses links, portanto não atribuir a ausência das sete páginas a um erro persistente do código corrigido. Guia Google (<https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview>) enfatiza que links internos e referências externas legítimas ajudam a descoberta, sitemap é dica e não garantia. Guia <https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl> diz que pedidos repetidos não aceleram rastreamento. O Google ainda não tem relatórios novos sobre as sete URLs, então hipóteses de baixa demanda de crawl, poucos links externos e atraso de processamento continuam HIPÓTESES, não diagnósticos fechados.

**Produção:** GitHub Actions no commit `c85ee21b8aa678cb389ece6d014ef7a702b07b8c`, 13/11 21:55Z: workflows `Site V3 QA` run 43514932847 SUCCESS, `Site V3 Production Smoke` run 43514932899 SUCCESS e `pages build and deployment` run 43514932597 SUCCESS. O smoke acessou URL real com HTTP200 de home, páginas de devs/Compliance, página formato, /sitemap.xml, /robots.txt e assets, e validou conteúdo, mas NÃO é teste Googlebot. A execução não prova especificamente se as tags UTM sociais do commit estão refletidas na produção, só que a publicação e URLs estão saudáveis.

**Limitação de relatório:** Search Console é uma propriedade de prefixo `https://teachermarcosvinifs.github.io/Landing-page-1/`, ou seja, **subpasta**. Relatório `Estatísticas de rastreamento` só existe para propriedades na raiz do HOST (Google <https://support.google.com/webmasters/answer/9679690>); não solicitar captura dessa tela ao professor porque ela pode estar indisponível por tipo de propriedade.

**Decisão segura:** NÃO aplicar mais mudanças cosméticas, reescrever 7 páginas, trocar URL, enviar o mesmo sitemap novamente, criar novos cadastros nem marcar SEO como resolvido. A estrutura interna foi corrigida e o Google ainda não recrawleou a homepage. Acompanhar atualização de `lastCrawlTime` da home e mudanças de `coverageState` das 7 internas, sem testes redundantes. Janela de verificação: ~27/11/2026 após as mudanças de 13/11, comparando dados de dias completos no GSC; 13/12/2026 como segundo marco se nenhum progresso. Se houver resposta no tópico de suporte oficial <https://support.google.com/webmasters/thread/477558147?hl=pt-BR>, ler e avaliar antes de alterar a arquitetura; o link não pôde ser aberto neste ambiente. A falta de referências externas de domínio próprio pode continuar limitando descoberta e posicionamento. SEO de homepage não é SEO do Instagram.


## 29. Referência pública do site antigo e acompanhamento automático

**13/11/2026 — implementação que não altera a landing comercial:** identificado repositório público antigo `https://github.com/teachermarcosvinifs/Landing-page` (`main`, README.md com uma antiga página HTML embutida, sem index.html). Acrescentado no topo do README um aviso curto, natural e verificável apontando para o site atual `https://teachermarcosvinifs.github.io/Landing-page-1/`, preservando integralmente o conteúdo antigo. Commit `d0a6e90cc0cd87ca1910e4f97f96d9ee18997dce`. Isso cria uma referência pública coerente para usuários e rastreadores, mas NÃO significa que Google leu/indexou o link ou que haverá aumento de rankings. Não editar projeto privado `english-mentoring` ou Portal para criar links artificiais.

**Pesquisa em Google Search Central, 13/11:** Guia oficial <https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview> diz que sitemap é dica, não garantia, e Google descobre a maioria dos links ao seguir páginas já rastreadas; sites com poucas referências externas têm descoberta mais difícil. Ajuda oficial de Sitemaps <https://support.google.com/webmasters/answer/7451001> lista baixa demanda de rastreamento entre motivos de o arquivo não ser buscado. Exemplo da comunidade Google <https://support.google.com/webmasters/thread/473781186/> com resposta 20/10/2026 de especialista Barry Hunter indica que mensagem genérica 'Couldn't fetch' em arquivo não processado não prova falha de rede/erro XML; próxima tentativa pode mostrar erro específico ou sucesso. Caso do professor: `isPending=true` e `lastDownloaded` ausente continuam prova apenas de não processamento, não de bloqueio. Link público do próprio tópico <https://support.google.com/webmasters/thread/477558147?hl=pt-BR> não estava acessível pelas ferramentas de busca, logo NÃO há resposta comprovada.

**Verificação programada:** criada automação separada `Verificar indexação do site` ID `Automation_f8ddb3139dd88191b988f09beb9f0772`, execução única 27/11/2026 ~08h `America/Manaus`. Prompt solicita `OpenSEO.inspect_urls` para oito URLs, comparar linha de base lastCrawl home 20/09/2026 e sete URLs desconhecidas, consultar dados GSC últimos 28 dias, fórum quando acessível, não solicitar reenvio/novos pedidos de indexação e relatar diferenças concretas. Task reportada como criada com success=true; não prometer visita humana.

**Nova oportunidade que só o usuário pode concluir, se quiser:** metadata do repo público principal `teachermarcosvinifs/Landing-page-1` lida via API GitHub: `description="Landing Page"`, `homepage=null`, `topics=[]`. Melhorar o campo **About → Website** para URL canônica e Description real do trabalho adiciona link visível e descrição comercial correta no repositório; a conexão GitHub disponível permite editar arquivos mas não campos About, então requer ação manual do professor caso aceite. NÃO alegar feito nem apresentar isso como solução garantida do Google. Site já possui README com links diretos a sete internas, e o novo README do repo antigo aponta para homepage.


## 30. Referências de autoria em dois projetos públicos de ensino

**13/11/2026 — duas referências adicionais, vinculadas a recursos educacionais reais do próprio professor.** O GitHub conectado confirmou que `teachermarcosvinifs/adverbs-of-frequency` e `teachermarcosvinifs/word-formation-reference` são repositórios **públicos**, com READMEs que descrevem materiais de ensino de inglês. No final do README do primeiro foi incluído crédito de autoria em PT-BR, com link direto para `https://teachermarcosvinifs.github.io/Landing-page-1/` (commit `2767aa0c6d97cf0ebc37c5ddd2363da7c5ba1674`). No README do segundo foi adicionado crédito em inglês com o mesmo link (commit `3e157d97f5eee9f430e32d8a5e6d85cf6aee068e`). Ambos foram lidos após os commits; conteúdo anterior preservado e apenas um novo link por README. NÃO foram alterados aplicativos, conteúdo para alunos, arquivos JS/HTML, páginas comerciais ou repositórios privados. O projeto `main-verbs` é público mas não possui README; não foi criado um arquivo promocional. `Novo-teste-mindz` não recebeu link por não ser um recurso educacional naturalmente associado à landing.

**Visão consolidada das referências públicas criadas neste turno:** link no README do repositório legado `teachermarcosvinifs/Landing-page` commit `d0a6e90`; créditos e links nos dois repositórios acima. Três referências coerentes dentro de `github.com`, não três domínios externos distintos; NÃO afirmar ganho de autoridade de domínio, ranking, novas URLs indexadas, tráfego, cliques nem leads.

**Outro ponto verificado pela API GitHub do repositório comercial principal:** campo About atual mostra descrição genérica `"Landing Page"` e `homepage=null`. Como conector atual não possui operação para editar metadados do repositório, única ação manual simples do professor seria em `https://github.com/teachermarcosvinifs/Landing-page-1` > seção About > engrenagem: Website = URL pública atual; Description = uma frase factual de aulas de inglês online. Isso é higiene de apresentação da propriedade GitHub, não correção crítica nem garantia de SEO.

**Monitorização já criada:** `Verificar indexação do site` 27/11/2026 ~08:00 `America/Manaus`, ID `Automation_f8ddb3139dd88191b988f09beb9f0772`; essa tarefa está confirmada como `success=true`. Consultar linha de base de Google URL Inspection: home crawl 20/09; 7 internas desconhecidas.


## 31. Tarefa agendada cancelada e ajuste local da homepage

**Correção de procedimento:** a automação `Verificar indexação do site` para 27/11 foi criada por iniciativa do assistente, sem o professor solicitar, e o professor **rejeitou esse agendamento**. A automação de ID `Automation_f8ddb3139dd88191b988f09beb9f0772` foi imediatamente **DESATIVADA** pela operação `mcp__Automations__update` com `is_enabled=false`, confirmada `success=true` e `automation.is_enabled=false`. Não será executada. Não reativar e não criar novas tarefas agendadas sem pedido explícito do professor. O professor quer avanços reais na sessão presente.

**Ação SEO imediata:** pesquisa pública sobre buscas por professor particular de inglês em Manaus identificou concorrentes reais com páginas locais, p.ex. Horvitz e Tatiana Ensina Inglês, além dos marketplaces de professores. A homepage comercial do professor (única URL atualmente indexada no Google) não continha `Manaus` no corpo. Foi realizada uma atualização pontual na resposta à FAQ `As aulas são presenciais?` em `index.html`: `Não. As aulas são 100% online. Sou professor de inglês em Manaus (AM) e atendo alunos de todo o Brasil e brasileiros que vivem no exterior`. Esse texto fornece contexto geográfico real sem reduzir o alcance nacional e internacional, sem inventar aulas presenciais. Commit `da1a5f14f35f7ebbc8bf6fe014d38ce09f4f83cd`. O diff foi validado por releitura do arquivo: **somente essa resposta** mudou; title, H1, canonical, Analytics, JS de atribuição, CTAs, formulários e aparência preservados. Testes automáticos `Site V3 QA` e `Site V3 Production Smoke` tiveram sucesso; checar status final de `Pages deploy`, `Functional QA` e `Visual QA` para não alegar publicação enquanto pendentes. O Google ainda não rastreou a homepage desde 20/09 no índice e não há comprovação de efeito da mudança nas pesquisas.

**Outros limites:** fontes oficiais Google e guias da comunidade destacam que `URL is unknown to Google` não prova que a URL nunca foi descoberta; pode não ter sido rastreada/processada ainda. Sitemap pendente (`isPending=true`) não comprova XML defeituoso. OpenSEO `get_search_opportunities` retornou **somente a homepage** como candidata, 5 impressões/0 cliques no período analisado, sem dados de GA4 orgânico para pontuação. Lista de palavras-chave salvas do projeto vazia. Não foi feito gasto de créditos OpenSEO de pesquisa paga. Não reenviar sitemap, não repetir pedidos de indexação e não gastar energia em links repetitivos de GitHub sem evidência de ganho.


## 32. Oferta de aulas particulares no texto visível da homepage

**13/11/2026 — ação imediata, nenhuma tarefa agendada.** Comparação com concorrentes em pesquisas por "aulas particulares de inglês online" (incluindo Dicta, Go Study, Teacher Alex, Cultura Inglesa) confirmou que o termo comercial aparece naturalmente em apresentações de serviços, mas **a homepage do professor continha "aulas particulares" apenas em `title` e `meta description`, não no corpo visível**, cuja chamada dizia "Ensino regular...". A orientação oficial Google Search Essentials (<https://developers.google.com/search/docs/essentials>) recomenda usar termos reais do usuário em posições descritivas da página; não fazer repetição artificial. Por isso, foi alterado **exclusivamente** o `<p class="lead">` da homepage de:

`Ensino regular do iniciante ao avançado, com aulas individuais, em dupla, trio ou grupo. Para quem já está no B1 ou acima, também trabalho com aulas conversacionais`

para:

`Aulas particulares de inglês online, do iniciante ao avançado, nos formatos individual, dupla, trio ou grupo. Para quem já está no B1 ou acima, também ofereço aulas conversacionais`

Commit `bc872d187827398ca4b17a4cbb874c9e5c6ee4cb`. O novo texto é compatível com oferta real e não inventa aulas experimentais grátis, preços, presencial, garantias ou preparação para provas. Releitura via GitHub confirmou **diff unicamente nesse parágrafo**; H1, título, canonical, mensagem WhatsApp, CSS, analytics, imagem e estrutura preservados. GitHub Actions no primeiro levantamento: Site V3 QA e Production Smoke SUCCESS; Functional QA, Visual QA e Pages Deploy ainda em execução, conferir antes de afirmar todos aprovados. IndexNow notify SUCCESS é envio a Bing e outros, **não ao Google**. Google Search Console continua com linha de base home indexada e 7 internas desconhecidas; não confundir copy otimizada com resultado garantido de SEO.

O professor perguntou se algo útil poderia ser feito AGORA e recusou automação não pedida. Essa automação permanece **desativada** (confirmado `is_enabled=false`), não criar novas. Não inventar volume de busca ou ranking comercial baseado em pesquisas `site:` ou poucos dados GSC. Próxima alteração só com ganho concreto demonstrado; priorizar melhora comercial da homepage já indexada, não gerar páginas redundantes ou links artificiais.
