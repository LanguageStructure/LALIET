# LALIET — Documentação técnica para integração ao site da UNIFACC-MT

**Versão:** 1.0 — 9 de outubro de 2026  
**Projeto:** Laboratório de Línguas Indígenas, Educação e Tecnologia (LALIET)  
**Vínculo institucional:** Projeto de pesquisa da UNIFACC Mato Grosso  
**Responsável pelo conteúdo científico:** Dr. Fabrício Ferraz Gerardi

## 1. Resumo para a equipe de TI

O LALIET é um **microsite institucional de pesquisa**, já desenvolvido e publicado de maneira independente. **Não é um sistema web, plugin, aplicação PHP, banco de dados, loja virtual nem serviço com login.** É um site estático responsivo, com páginas HTML, estilos CSS, JavaScript no navegador e arquivos JSON de conteúdo.

**Endereço publicado:** https://languagestructure.github.io/LALIET/  
**Código-fonte:** https://github.com/LanguageStructure/LALIET

**Pedido de integração recomendado:** criar uma entrada no site da faculdade (menu de Pesquisa / Laboratórios / Projetos, conforme a organização institucional), com nome **LALIET — Laboratório de Línguas Indígenas, Educação e Tecnologia**, breve descrição e um **link externo** para o microsite existente. Esta opção preserva o layout e evita alterações na infraestrutura institucional.

## 2. Opções de integração

### Opção A — Link institucional para o microsite (recomendada)

Adicionar uma página-resumo ou cartão institucional no portal da UNIFACC-MT, apontando para o endereço público do LALIET. Não é preciso instalar o código, copiar arquivos nem modificar o CMS da faculdade. A hospedagem e as atualizações permanecem no GitHub Pages.

Texto curto sugerido para a página/cartão:

> **LALIET — Laboratório de Línguas Indígenas, Educação e Tecnologia.** Projeto de pesquisa da UNIFACC Mato Grosso dedicado à documentação e análise de línguas indígenas, à educação e ao desenvolvimento de recursos digitais para pesquisa e ensino. Conheça os projetos, pesquisadores, publicações e recursos do laboratório.

### Opção B — Hospedagem própria em subdiretório ou subdomínio

Se a faculdade quiser hospedar o conteúdo em sua própria infraestrutura, é possível publicar os arquivos estáticos em um subdiretório (por exemplo, `/laliet/`) ou subdomínio definido pela TI. É necessário:

1. Copiar **toda a estrutura de arquivos**, preservando as pastas e caminhos relativos.
2. Configurar o servidor para servir `index.html` como página inicial e entregar arquivos `.html`, `.css`, `.js`, `.json` e imagens com os tipos MIME adequados.
3. Usar HTTPS e testar as páginas internas, os scripts e o carregamento dos JSON.
4. Definir um fluxo de atualização para sincronizar mudanças feitas no repositório.
5. Verificar caminhos e links após a mudança de domínio/base URL.

**Não é necessário:** PHP, Node.js em produção, MySQL/PostgreSQL, build npm, chaves de API ou credenciais de acesso ao GitHub para servir a versão pública.

### Opção C — Incorporar ao CMS da faculdade

Uma integração visual mais profunda ao CMS (por exemplo, converter o conteúdo em templates/blocos nativos) é possível, mas **constitui um projeto adicional de adaptação**. O HTML/CSS atual não é um template nativo do CMS. Não se recomenda simplesmente colar o documento HTML completo em um campo de conteúdo: isso pode quebrar estilos, scripts e navegação. Um `iframe` pode funcionar em certos cenários, mas não é a opção preferencial devido a navegação, altura responsiva, acessibilidade e políticas de incorporação.

## 3. Arquitetura e tecnologias

- **Tipo:** site estático multipágina, responsivo.
- **Frontend:** HTML5, CSS3 e JavaScript nativo.
- **Dados editáveis:** JSON, carregado no navegador por `fetch()`.
- **Hospedagem atual:** GitHub Pages, branch `main`, diretório `/(root)`.
- **Backend / banco de dados / autenticação:** inexistentes.
- **Integrações externas:** links para repositórios e plataformas de pesquisa; não há API institucional obrigatória.

## 4. Estrutura principal do repositório

| Caminho | Função |
| --- | --- |
| `index.html` | Página inicial e navegação geral. |
| `sobre.html` | Apresentação institucional do laboratório. |
| `projetos/corbo.html` | Página do CorBo — Corpus Bororo. |
| `projetos/xavcor.html` | Página do XavCor — Corpus Xavante. |
| `assets/project.css` | Estilos compartilhados das páginas internas. |
| `assets/gallery.css` | Estilos da galeria de imagens. |
| `assets/gallery.js` | Carregamento e visualização ampliada de imagens. |
| `assets/people.js` | Carregamento dos perfis da equipe. |
| `data/galeria.json` | Metadados das fotografias e autorizações. |
| `data/pessoas.json` | Pesquisadores e colaboradores. |
| `design/original-2026-10-09/` | Cópia de segurança da identidade visual anterior. |

A página inicial contém parte dos estilos diretamente no próprio HTML. A identidade visual atual usa **azul, amarelo e branco**. Não há logotipo gráfico; a marca do laboratório é tipográfica.

## 5. Manutenção de conteúdo

- **Pessoas:** editar `data/pessoas.json`; campos utilizados incluem `nome`, `funcao`, `biografia`, `foto` e, opcionalmente, `pagina`. Os colaboradores ficam em `colaboradores`.
- **Galeria:** editar `data/galeria.json` e adicionar os arquivos de imagem referenciados. A galeria somente exibe registros com `autorizacao_confirmada: true` e os campos obrigatórios preenchidos: `arquivo`, `titulo`, `descricao`, `texto_alternativo` e `creditos`.
- **Projetos e textos institucionais:** editar os respectivos arquivos HTML.
- **Publicações:** referências e links podem ser atualizados no HTML; alguns metadados ainda serão completados.

**Importante:** o uso de `fetch()` para JSON exige servir o site por HTTP(S). Abrir `index.html` diretamente como `file://` pode impedir o carregamento da galeria e dos perfis.

## 6. Checklist para publicação ou vinculação

- [ ] Definir se será usado apenas um link institucional (recomendado) ou hospedagem própria.
- [ ] Confirmar o título e a posição no menu da UNIFACC-MT.
- [ ] Confirmar que o link público abre em HTTPS.
- [ ] Testar navegação da página inicial para Sobre, CorBo e XavCor.
- [ ] Testar visualização em celular e desktop.
- [ ] Confirmar carregamento de `data/pessoas.json` e `data/galeria.json`.
- [ ] Preservar créditos, consentimentos e direitos de uso das imagens.
- [ ] Se houver cópia local, definir quem fará a sincronização das atualizações.

## 7. Limites e responsabilidades

O LALIET é um projeto de pesquisa vinculado à UNIFACC-MT. A presença do link no portal institucional **não exige** transferir a administração do código-fonte para o CMS da faculdade. Se a TI optar por hospedar uma cópia, é importante definir responsabilidade técnica, rotina de atualização e política de publicação de imagens e dados.

Esta documentação descreve a implementação disponível no repositório em 9/10/2026; não é uma especificação do CMS ou da infraestrutura da UNIFACC-MT.
