# SWNexa Studio

Site institucional em Next.js App Router, React e TypeScript. Sem backend, autenticação ou envio de dados.

## Executar

Node.js 20.9 ou superior (recomendado Node.js 24 LTS).

```sh
npm ci
npm run dev
```

Acesse http://localhost:3000. Produção: `npm run build` e `npm start`.

## Verificações

```sh
npm run lint
npm run typecheck
npm run build
```

## Organização

- `src/app`: página, layout, metadados e ícone inicial.
- `src/components/layout`: navegação responsiva e rodapé.
- `src/components/sections`: blocos editoriais da homepage.
- `src/components/ui`: mídia substituível e animação de entrada.
- `src/data/content.ts`: projetos provisórios, perguntas, serviços e referências de imagens.
- `src/styles/globals.css`: identidade visual e adaptações responsivas com Tailwind CSS 4.
- `public/images`: backgrounds, projetos e mockups locais.

## Evolução do conteúdo

Em `images` de `src/data/content.ts`, substitua `src: null` por `/images/projects/arquivo.webp`, por exemplo, e revise o texto alternativo. O componente Visual passa automaticamente do estudo CSS para `next/image`. O hero aceita imagem local independente. Use arquivos otimizados e dimensionados para o espaço. Não foram baixadas imagens ou fontes externas.

Fluxio e Produtiv são referências internas provisórias, não cases publicados. Revise as descrições, acrescente imagens reais e, se aplicável, `year` e `href`. Os estudos visuais não representam telas reais dos produtos. A seção visual não tem reprodução de vídeo nesta versão.

O formulário apenas valida os campos no navegador e informa que não houve envio. Não persiste dados. Integrar contato e definir as informações de privacidade antes de ativar o envio.

Metadados básicos estão em `src/app/layout.tsx`. Quando houver domínio definitivo, configurar `metadataBase`, canonical, imagem Open Graph e sitemap. O favicon é uma marca provisória em `src/app/icon.svg`.

Animações discretas usam Framer Motion, respeitando movimento reduzido. Conteúdo principal permanece em componentes de servidor; apenas navegação, formulário e Reveal são componentes de cliente.
