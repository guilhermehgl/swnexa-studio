# SWNexa Studio

Site institucional em Next.js App Router, React e TypeScript. Contato por Resend e WhatsApp, sem banco de dados ou autenticação.

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

O formulário envia para `POST /api/contact`, com validação no navegador e no servidor. O lead é enviado por Resend em texto simples, com o e-mail do visitante como Reply-To. Não há banco de dados. Falhas preservam os campos e permitem nova tentativa; a chave de idempotência evita duplicar o mesmo envio em uma tentativa repetida.

### Configurar contato

Copie `.env.example` para `.env.local` (ou preencha o arquivo local existente):

- `RESEND_API_KEY`: chave privada do Resend, apenas no servidor.
- `CONTACT_TO_EMAIL`: destinatário da SWNexa.
- `CONTACT_FROM_EMAIL`: remetente de um domínio verificado no Resend, por exemplo `SWNexa Studio <contato@seu-dominio.com>`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número com código do país e DDD, somente dígitos. Configurado como `5531982825341`.

Reinicie o servidor depois de configurar. Em produção, configure as mesmas variáveis no ambiente antes do build: o número público é incorporado durante a compilação. Nunca publique `.env.local` ou a chave do Resend. Sem as três variáveis privadas, a rota retorna erro de indisponibilidade, sem simular sucesso.

Testes de validação e do contrato da rota (Resend simulado, nenhum e-mail enviado): `node --test tests/contact.test.mjs`.

Metadados básicos estão em `src/app/layout.tsx`. Quando houver domínio definitivo, configurar `metadataBase`, canonical, imagem Open Graph e sitemap. O favicon é uma marca provisória em `src/app/icon.svg`.

Animações discretas usam Framer Motion, respeitando movimento reduzido. Conteúdo principal permanece em componentes de servidor; apenas navegação, formulário e Reveal são componentes de cliente.
