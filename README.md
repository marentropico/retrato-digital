# Marentropico — Retrato Digital

> *Arte Ancestral. Tecnologia Digital. Do Grajaú para o mundo.*

**Live:** [marentropico.github.io/retrato-digital](https://marentropico.github.io/retrato-digital)

Retrato digital interativo de **Marcos Paulo Figueroa** — artista multimídia, produtor audiovisual, músico, designer, desenvolvedor e fundador da [Umimbae](https://umimbae.com.br). Uma experiência de usuário que documenta uma jornada humana e criativa do Grajaú, São Paulo, para o mundo.

## Sobre

Este projeto não é um currículo, nem um portfólio convencional. É um **retrato digital**: uma narrativa interativa construída para educadores, parceiros, fãs e empresas que queiram compreender quem é Marentropico — sua trajetória, seus valores, sua visão de mundo e seus trabalhos — de forma imersiva e direta.

A jornada é navegada através de uma linha do tempo dividida em eras, cada uma com marcos que podem conter vídeos, músicas, fotos e registros textuais de momentos reais.

## Tecnologias

Construído inteiramente com HTML, CSS e JavaScript puros — sem frameworks, sem dependências externas. Todos os dados da jornada são carregados a partir de um único arquivo JSON, mantendo o projeto leve, rápido e de fácil manutenção.

## Estrutura

```
/
├── index.html          — Página principal
├── css/
│   ├── main.css        — Design system, hero, seção about
│   ├── timeline.css    — Timeline interativa e cards de marcos
│   └── media.css       — Embeds de mídia, lightbox, manifesto, footer
├── js/
│   ├── main.js         — Cursor, scroll, navegação, loader
│   ├── media-embed.js  — Módulo de embeds: YouTube, Spotify, fotos
│   └── timeline.js     — Engine da timeline, renderização e interação
├── assets/
│   ├── fonts/
│   └── images/
└── data/
    └── timeline.json   — Conteúdo completo da jornada
```

## Design

A identidade visual é inspirada na estética da [Umimbae](https://umimbae.com.br) — fusão entre referências orgânicas e tecnologia digital. Paleta construída sobre tons de terra, verde e ouro sobre fundo quase-preto, com tipografia *Playfair Display* em itálico para os títulos e *Space Mono* para os elementos técnicos.

| Token | Valor | Uso |
|-------|-------|-----|
| `--c-terra` | `#C4622D` | Destaque principal |
| `--c-verde` | `#2C7873` | Destaque secundário |
| `--c-ouro`  | `#D4A042` | Acento e hover |
| `--c-bg`    | `#0D0D0B` | Fundo |
| `--c-text`  | `#EDE8DC` | Texto principal |

## Links

- [Umimbae](https://umimbae.com.br) — Produtora Audiovisual & Tech

---

© 2026 Marcos Paulo Figueroa · Designed & Built by Marentropico