# Marentropico — Retrato Digital

> *Arte Ancestral. Tecnologia Digital. Do Grajaú para o mundo.*

Retrato digital interativo de **Marcos Paulo Figueroa** (Marentropico) — artista multimídia, produtor audiovisual e fundador da [Umimbae](https://umimbae.com.br).

## 🎯 Sobre o Projeto

Este não é um currículo, nem um portfólio clássico. É um **retrato digital**: uma experiência de usuário que oferece uma visão clara e imersiva da identidade, jornada, valores e visão de mundo de Marentropico — para educadores, fãs ou empresas que queiram se conectar de verdade.

## ✨ Funcionalidades

- **Landing page** com hero animado e identidade forte
- **Linha do tempo interativa** — navega por eras: Origem → Presente → Horizonte Futuro
- **Marcos de mídia integrados**:
  - 🎬 Vídeos do YouTube (embed + player em lightbox)
  - 🎵 Músicas do Spotify (embed nativo)
  - 📸 Galerias de fotos
  - 📌 Marcos textuais
- Cursor customizado
- Scroll reveal animations
- Barra de progresso de leitura
- 100% responsivo
- Navegação por teclado (← →)

## 📁 Estrutura

```
/
├── index.html              # Página principal
├── css/
│   ├── main.css            # Design system e hero
│   ├── timeline.css        # Timeline interativa
│   └── media.css           # Embeds, lightbox, extras
├── js/
│   ├── main.js             # Cursor, scroll, nav, loader
│   └── timeline.js         # Engine da timeline
├── assets/
│   ├── fonts/              # Fontes locais (opcional)
│   └── images/             # Imagens do projeto
├── data/
│   └── timeline.json       # ⭐ EDITE AQUI — conteúdo da jornada
└── README.md
```

## 🛠️ Como personalizar

### Adicionar marcos na timeline

Edite `data/timeline.json`. Cada era tem um array `milestones`:

```json
{
  "id": "meu-marco",
  "type": "youtube",
  "title": "Nome do trabalho",
  "description": "Descrição do projeto.",
  "date": "2024",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Tipos de marco disponíveis:**

| type | Uso |
|------|-----|
| `youtube` | Vídeo do YouTube — coloca thumbnail + player |
| `spotify` | Track, álbum ou playlist do Spotify |
| `photo` | Galeria de fotos (array `photos: ["url1", "url2"]`) |
| `text` | Marco textual puro |
| `milestone` | Evento/conquista sem mídia |

### Exemplo de marco Spotify

```json
{
  "type": "spotify",
  "title": "Nome da faixa",
  "description": "Produção do zero no home studio.",
  "date": "2023",
  "url": "https://open.spotify.com/track/ID_DA_FAIXA"
}
```

### Exemplo de galeria de fotos

```json
{
  "type": "photo",
  "title": "Bastidores do estúdio",
  "description": "Gravação do projeto X.",
  "date": "2024",
  "photos": [
    "assets/images/foto1.jpg",
    "assets/images/foto2.jpg"
  ]
}
```

## 🚀 Deploy no GitHub Pages

```bash
# 1. Inicializar repositório
git init
git add .
git commit -m "feat: retrato digital marentropico"

# 2. Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU_USUARIO/marentropico.git
git push -u origin main

# 3. Ativar GitHub Pages
# Settings → Pages → Source: Deploy from branch → main → / (root)
```

O site estará disponível em: `https://SEU_USUARIO.github.io/marentropico`

> **Nota:** Os embeds do YouTube e Spotify funcionam perfeitamente no GitHub Pages pois são iframes externos.

## 🎨 Paleta

| Token | Cor | Uso |
|-------|-----|-----|
| `--c-terra` | `#C4622D` | Destaque principal |
| `--c-verde` | `#2C7873` | Destaque secundário |
| `--c-ouro` | `#D4A042` | Hover / acento |
| `--c-bg` | `#0D0D0B` | Fundo |
| `--c-text` | `#EDE8DC` | Texto principal |

## 🔗 Links

- [Umimbae](https://umimbae.com.br) — Produtora Audiovisual
- [Perfil Marcos](https://umimbae.com.br/marcos.php)

---

*Designed & Built by Marcos Paulo Figueroa (Marentropico) · © 2026*
#retrato-digital
