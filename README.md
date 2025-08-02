📱 Pokedex Next.js
Uma Pokédex moderna construída com Next.js 13+ (App Router), TypeScript e pokeAPI, com suporte a busca, paginação e visualização de detalhes de cada Pokémon.


🚀 Funcionalidades
🔍 Pesquisa por nome de Pokémon

🗂️ Paginação de resultados

🧾 Página de detalhes com informações completas

🎨 Interface responsiva com CSS Modules

⚡ API consumida diretamente da https://pokeapi.co

🛠️ Tecnologias Utilizadas
Next.js 13+ (App Router)

React

TypeScript

pokeAPI

CSS Modules

Vercel (deploy)

📂 Estrutura de Pastas
ruby
Copiar
Editar
├── public/
│   └── images/                # Assets como ícones e background
├── src/
│   └── app/
│       ├── pokemon/[name]/    # Página de detalhes
│       ├── PokemonCards.tsx   # Lista de cards
│       ├── PokemonSearch.tsx  # Campo de busca
│       ├── PokemonPagination.tsx
│       └── layout.tsx         # Layout principal
│   └── lib/
│       └── pokeapi.ts         # Funções de chamada à API
├── package.json
├── tsconfig.json
└── next.config.ts
🧪 Como Rodar Localmente
Clone o repositório:

Copiar
Editar
git clone https://github.com/seu-usuario/pokedex-next.git
cd pokedex-next
Instale as dependências:

Copiar
Editar
npm install
Execute o projeto:

bash
Copiar
Editar
npm run dev
Acesse http://localhost:3000 no seu navegador.
