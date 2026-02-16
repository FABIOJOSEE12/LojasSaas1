# Guia de Deploy - Criador de Lojas SaaS

Como sua aplicação usa **Node.js (Backend)** e **MySQL (Banco de Dados)**, a hospedagem gratuita de "sites estáticos" (como GitHub Pages) não serve. Você precisa de um servidor que rode o Node.js 24h.

Aqui estão as melhores recomendações ordenadas por **facilidade**:

## Recomendação 1: Railway (Mais Fácil e Recomendado) 🏆
A Railway é perfeita para este tipo de projeto porque hospeda o Backend e o Banco de Dados no mesmo lugar.

### Passos:
1.  Crie uma conta em [railway.app](https://railway.app).
2.  Clique em **"New Project"** -> **"Deploy from GitHub repo"** (Você precisará subir seu código para o GitHub primeiro).
3.  Adicione um serviço de Banco de Dados: **"Add Service"** -> **Database** -> **MySQL**.
4.  No seu serviço do Backend (Node.js), vá em **Variables**:
    *   A Railway fornece as variáveis de conexão automaticamente (`MYSQLHOST`, `MYSQLUSER`, etc), mas você deve mapear para as que seu código usa:
    *   `DB_HOST`: `${MYSQLHOST}`
    *   `DB_USER`: `${MYSQLUSER}`
    *   `DB_PASSWORD`: `${MYSQLPASSWORD}`
    *   `DB_NAME`: `${MYSQLDATABASE}`
    *   `JWT_SECRET`: crie_uma_senha_segura
5.  A Railway detectará automaticamente o comando `npm start` e colocará o site no ar.

---

## Recomendação 2: Render (Alternativa Grátis)
O Render tem um plano gratuito (Free Tier) para Web Services e PostgreSQL (para MySQL o plano grátis é limitado e expira, mas pode servir para testes).

1.  Crie uma conta em [render.com](https://render.com).
2.  Crie um **Web Service** conectado ao seu GitHub.
3.  Configure as variáveis de ambiente (`DB_HOST`, etc) manualmente.
4.  **Atenção**: O plano grátis "dorme" após inatividade, então o primeiro acesso pode demorar 50 segundos.

---

## Recomendação 3: Vercel? ⚠️
Você adicionou um arquivo `vercel.json` recentemente. 
*   **Problema**: A configuração atual está apenas servindo os arquivos estáticos (`public`). Isso vai fazer o site abrir, mas **NENHUMA** funcionalidade (login, salvar, dashboard) vai funcionar porque a API (Backend) não roda em hospedagem estática.
*   **Solução**: Para usar na Vercel, teríamos que refatorar o backend `server.js` para rodar como *Serverless Functions* ou configurar o `vercel.json` para tratar o Express como uma função serverless. Além disso, precisaríamos de um banco de dados externo (como PlanetScale ou Railway Database). **É mais complexo.**

---

## Resumo
Para este projeto, vá de **Railway**. É a experiência mais próxima de "funcionar igual ao localhost".

### Antes de enviar par ao GitHub:
Certifique-se de que o arquivo `.gitignore` existe e contém:
```
node_modules
.env
```
Isso evita vazar suas senhas locais.
