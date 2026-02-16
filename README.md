# Criador de Lojas SaaS

Sistema completo para criação de sites e lojas virtuais (SaaS).

## Pré-requisitos

- Node.js instalado.
- PostgreSQL instalado e rodando.

## Configuração

1.  **Instalar dependências**:
    ```bash
    npm install
    ```

2.  **Configurar Banco de Dados**:
    - Crie um banco de dados no PostgreSQL chamado `criador_lojas` (ou outro nome).
    - Configure o arquivo `.env` com suas credenciais:
        ```env
        DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/criador_lojas
        ```

3.  **Inicializar Banco de Dados**:
    ```bash
    npm run init-db
    ```

4.  **Popular Banco de Dados (Seed)**:
    ```bash
    node src/scripts/seed.js
    ```
    *Isso cria um usuário admin (`admin@admin.com` / `admin123`) e templates iniciais.*

5.  **Compilar CSS (Tailwind)**:
    ```bash
    npm run build:css
    ```
    *Se houver erro com `npx`, tente rodar diretamente se tiver o tailwind instalado globalmente ou verifique a instalação.*

## Rodando o Projeto

1.  **Iniciar Servidor**:
    ```bash
    npm run dev
    ```

2.  **Acessar**:
    - Frontend: `http://localhost:3000`
    - Login: `http://localhost:3000/login.html`
    - Admin: `http://localhost:3000/admin.html` (Login com conta admin)

## Estrutura

- `src/`: Código do backend (API, Models, Controllers).
- `public/`: Frontend (HTML, CSS, JS).
- `src/scripts/`: Scripts de inicialização e seed.
