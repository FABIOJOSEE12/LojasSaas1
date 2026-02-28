// Configuração Centralizada
const CONFIG = {
    // Em produção, alterar para a URL do backend (ex: https://api.meusite.com)
    // Em desenvolvimento, manter http://localhost:3000
    API_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
             ? 'http://localhost:3000/api' 
             : '/api' // Uses relative path for production (Railway/Vercel)
};

// Export global if using modules, but for vanilla JS just expose const
window.API_URL = CONFIG.API_URL;
