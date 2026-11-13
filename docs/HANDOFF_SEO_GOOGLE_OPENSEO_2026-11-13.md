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
