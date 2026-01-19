# Andréa Krug - Site Oficial

![Andréa Krug](https://andrea-krug.lovable.app)

## 🌟 Sobre o Projeto

Site oficial de **Andréa Krug**, palestrante, mentora executiva e autora do livro "Vai Encarar". O site apresenta uma experiência digital imersiva com design futurista, destacando sua trajetória profissional, eventos, e promovendo seu trabalho de transformação pessoal e corporativa.

### 🎯 Objetivo

Criar uma presença digital moderna e impactante que transmita a essência do trabalho de Andréa Krug: **coragem, ação e reinvenção pessoal**.

---

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Tipagem estática para maior segurança do código
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **shadcn/ui** - Componentes de UI acessíveis e customizáveis
- **GSAP** - Biblioteca de animações de alta performance
- **React Router DOM** - Navegação SPA
- **React Helmet Async** - Gerenciamento de SEO e meta tags
- **Lucide React** - Ícones modernos

---

## 🎨 Design

### Identidade Visual

O site utiliza uma estética **futurista** com:

- **Tema escuro** como base
- **Gradientes neon** (rosa, cyan, roxo)
- **Efeitos de glassmorphism** (cards com vidro fosco)
- **Bordas com brilho neon**
- **Animações suaves** com GSAP ScrollTrigger

### Paleta de Cores

| Cor | HSL | Uso |
|-----|-----|-----|
| Primary (Rosa Neon) | `327 90% 60%` | Destaques, CTAs, títulos |
| Secondary (Cyan) | `190 95% 55%` | Acentos, efeitos de glow |
| Background | `225 25% 6%` | Fundo principal |
| Foreground | `210 40% 98%` | Texto principal |

---

## 📄 Estrutura do Site

### 1. **Hero Section**
- Vídeo de fundo imersivo
- Nome em destaque com gradiente neon
- Tagline: "Transformando vidas através da coragem, da ação e da reinvenção pessoal"
- CTAs: "Conhecer o Livro" e "Entrar em Contato"
- Foto principal de Andréa Krug com efeitos de borda neon

### 2. **Empresas que Confiam**
- Carrossel de logos das empresas parceiras
- Marcas incluídas: 99, Alpargatas, DHL, Fini, Globo, Martins, Mills, Play Gamification, RPC, Suzano
- Layout responsivo com scroll horizontal

### 3. **Galeria - Momentos Marcantes**
- Grid dinâmico de fotos de eventos e palestras
- Animações de entrada escalonadas (GSAP)
- Lightbox com navegação
- Efeito de hover com borda neon
- Filtro por categorias disponível

### 4. **Seção do Livro - "Vai Encarar"**
- Mockup 3D do livro com animação flutuante
- Estatísticas animadas (10K+ Leitores, 4.9 Avaliação, 50+ Palestras)
- Descrição do conteúdo transformador
- CTA com efeito de pulse luminoso
- Fundo com gradiente neon

### 5. **Timeline - Sobre Andréa Krug**
- Trajetória profissional cronológica
- Marcos importantes:
  - Início da Jornada (palestrante profissional)
  - Empresas Parceiras (DHL, Fini, Globo, etc.)
  - Mentoria Executiva
  - Reconhecimento Nacional
  - Expansão Internacional
- Design com linha vertical e cards glassmorphism

### 6. **Formulário de Contato**
- Campos: Nome, Email, Telefone, Mensagem
- Integração com WhatsApp
- Validação de formulário
- Design com bordas neon e efeito glass

### 7. **Footer**
- Links de navegação
- Redes sociais (Instagram, YouTube, LinkedIn)
- Copyright

---

## 🎬 Animações

O site utiliza **GSAP** como motor principal de animações:

- **ScrollTrigger** - Animações baseadas em scroll
- **Fade-in/Slide** - Entradas suaves de elementos
- **Stagger** - Animações escalonadas em listas
- **Floating** - Efeito de flutuação no livro
- **Counter** - Contadores animados nas estatísticas
- **Pin** - Fixação de elementos durante scroll (desktop)

### Acessibilidade
Todas as animações respeitam a configuração `prefers-reduced-motion` do usuário.

---

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Mobile** (< 768px) - Layout em coluna única
- **Tablet** (768px - 1024px) - Layout híbrido
- **Desktop** (> 1024px) - Layout completo com todas as animações

---

## 🔧 Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

---

## 📁 Estrutura de Pastas

```
src/
├── assets/
│   ├── brands/          # Logos das empresas parceiras
│   ├── gallery/         # Fotos da galeria
│   ├── hero-bg.jpeg     # Background do hero
│   ├── hero-video.mp4   # Vídeo do hero
│   └── vai_encarar.jpeg # Capa do livro
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   ├── BookSection.tsx  # Seção do livro
│   ├── BrandCarousel.tsx # Carrossel de marcas
│   ├── ContactForm.tsx  # Formulário de contato
│   ├── Footer.tsx       # Rodapé
│   ├── Gallery.tsx      # Galeria de fotos
│   ├── Hero.tsx         # Seção hero
│   ├── Navbar.tsx       # Navegação
│   ├── NavLink.tsx      # Link de navegação
│   └── Timeline.tsx     # Linha do tempo
├── hooks/               # Hooks customizados
├── lib/                 # Utilitários
├── pages/
│   ├── Index.tsx        # Página principal
│   └── NotFound.tsx     # Página 404
├── App.tsx              # Componente raiz
├── index.css            # Estilos globais e tokens
└── main.tsx             # Ponto de entrada
```

---

## 🌐 SEO

O site implementa boas práticas de SEO:

- Meta tags otimizadas (título, descrição, keywords)
- Open Graph tags para compartilhamento social
- JSON-LD structured data
- URL canônica
- Sitemap
- Imagens com alt text descritivo
- HTML semântico

---

## 🔗 Links

- **Preview**: https://id-preview--df192ad6-6dff-4336-af4f-810926ccd131.lovable.app
- **Produção**: https://andrea-krug.lovable.app

---

## 📞 Contato

Para mais informações sobre Andréa Krug e seu trabalho:
- Acesse o site e preencha o formulário de contato
- Conecte-se nas redes sociais

---

## 📝 Licença

Este projeto é privado e pertence a Andréa Krug. Todos os direitos reservados.

---

*Desenvolvido com ❤️ usando [Lovable](https://lovable.dev)*
