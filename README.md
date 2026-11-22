# LALIET

**Laboratório de Línguas Indígenas, Educação e Tecnologia**

Projeto de pesquisa da **UNIFACC Mato Grosso**.

- Principal Investigator (PI): Dr. Fabrício Ferraz Gerardi
- Pesquisadora: Dra. Cristiane Poltronieri

## Site

O site está em `index.html` e funciona sem dependências externas.

**Endereço oficial:** https://unifacc.com.br/laliet/ (hospedado no servidor da UNIFACC-MT).

Este repositório é a fonte do código; o GitHub Pages não é usado. Para atualizar o site, copie para `/laliet/` no servidor da UNIFACC todos os arquivos públicos, preservando as pastas: `index.html`, `sobre.html`, `projetos/`, `assets/` e `data/`. As pastas `design/` e os arquivos `.md` não precisam ir para o servidor.

## Projetos

- **CorBo — Corpus Bororo:** https://languagestructure.github.io/Bororo-Corpus/
- **XavCor — Corpus Xavante:** https://github.com/LanguageStructure/Corpus_Xavante

## Conteúdo a completar

- Fotografias (Fabrício, Ana Maria) e perfis de membros e colaboradores;
- Metadados completos das publicações;
- Galeria de imagens com descrições, créditos e autorização de uso;
- Página de cada projeto e futuras linhas de pesquisa.

## Imagens e ética

Não publicar fotografias, especialmente registros de pessoas e comunidades indígenas, sem confirmar os direitos de uso e o consentimento pertinente. Manter descrição, autoria, local/data (quando apropriado) e texto alternativo para acessibilidade.

## Estrutura

- `index.html`: página inicial (hero, laboratório, pesquisa, projetos, equipe, publicações, imagens).
- `sobre.html`, `projetos/corbo.html`, `projetos/xavcor.html`: páginas internas.
- `assets/site.css` e `assets/site.js`: estilos e comportamento comuns a todas as páginas.
- `assets/people.js` + `data/pessoas.json`: perfis em três grupos — `pessoas` (coordenação e pesquisadores), `membros` e `colaboradores`. Fotos em `assets/pessoas/`.
- `assets/gallery.js` + `data/galeria.json`: galeria (só exibe imagens com autorização confirmada).
- `design/`: cópias de segurança das versões visuais anteriores (`original-2026-10-09`, `anterior-2026-11-22`).

### Adicionar um membro ou colaborador

Acrescente um objeto à lista `membros` ou `colaboradores` em `data/pessoas.json`:

```json
{ "nome": "Nome Sobrenome", "funcao": "Bolsista de iniciação científica", "instituicao": "UNIFACC Mato Grosso",
  "foto": "assets/pessoas/nome-sobrenome.jpg", "biografia": "…", "lattes": "http://lattes.cnpq.br/…", "orcid": "https://orcid.org/…" }
```

Sem `foto`, o site mostra as iniciais. Publique fotos apenas com autorização.

© 2026 LALIET. Direitos de terceiros permanecem com seus titulares.
