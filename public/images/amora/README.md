# Assets de AMORA

Os SVGs são ilustrações locais de demonstração. Para usar as fotografias finais,
coloque os arquivos abaixo nesta mesma pasta (`public/images/amora/`) e, em
`src/data/amora.ts`, substitua o `src` de cada entrada pelo seu `finalSrc`.
Atualize também o `alt` para descrever a fotografia fornecida.

| Entrada | Arquivo final | Uso |
| --- | --- | --- |
| hero | amora-hero.jpg | Prato/ingredientes no hero |
| detail | amora-detail-01.jpg | Recorte de ingrediente ou gesto, hero e galeria |
| table | amora-table-01.jpg | Mesa/encontro, manifesto e galeria |
| food | amora-food-01.jpg | Composição gastronômica, menu e galeria |
| space | amora-space-01.jpg | Ambiente imaginado, seção Lugar |

Hero e detalhe funcionam melhor em orientação vertical; mesa, comida e ambiente,
em orientação horizontal. Os recortes usam `object-fit: cover`. JPG, WebP ou AVIF
podem ser usados, desde que o caminho centralizado corresponda ao arquivo.
Não renomeie SVG para JPG: são formatos diferentes.
