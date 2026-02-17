const db = require('../config/db');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    const [rows] = await db.pool.execute("SELECT * FROM users WHERE email = 'admin@admin.com'");
    if (rows.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash('admin123', salt);
        await db.pool.execute("INSERT INTO users (name, email, password_hash, role) VALUES ('Admin', 'admin@admin.com', ?, 'admin')", [pass]);
        return 'Admin user created';
    }
    return 'Admin user already exists';
};

const seedPlans = async () => {
    const plans = [
        { name: 'Básico', price: 29.90, features: JSON.stringify(['1 Projeto', 'Subdomínio', 'Suporte por Email', 'SEO Básico']) },
        { name: 'Profissional', price: 59.90, features: JSON.stringify(['5 Projetos', 'Domínio Próprio', 'Suporte Prioritário', 'Analytics', 'Sem Anúncios']) },
        { name: 'Premium', price: 99.90, features: JSON.stringify(['Ilimitado', 'Consultoria Dedicada', 'API Access', 'White Label', 'Integração Marketplaces']) }
    ];

    let results = [];
    for (const p of plans) {
        const [rows] = await db.pool.execute("SELECT * FROM plans WHERE name = ?", [p.name]);
        if (rows.length === 0) {
            await db.pool.execute("INSERT INTO plans (name, price, features) VALUES (?, ?, ?)", [p.name, p.price, p.features]);
            results.push(`Plan ${p.name} created`);
        }
    }
    return results;
};

const seedTemplates = async () => {
    const templates = [
        {
            name: 'Loja Minimalista',
            category: 'Loja Virtual',
            thumbnail_url: 'https://via.placeholder.com/400x300?text=Loja+Minimalista',
            html_structure: `
                <div class="font-sans text-gray-800">
                    <!-- Navbar -->
                    <nav class="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
                        <div class="container mx-auto px-6 h-20 flex justify-between items-center">
                            <a href="#" class="text-2xl font-bold tracking-tighter text-gray-900 flex items-center gap-2">
                                <img src="{{logo_url}}" alt="Logo" class="h-10 w-10 object-contain rounded-full bg-gray-50 bg-primary/10 p-1">
                                {{name}}
                            </a>
                            <div class="hidden md:flex space-x-8 font-medium text-sm uppercase tracking-wide">
                                <a href="#" class="hover:text-primary transition-colors">Início</a>
                                <a href="#shop" class="hover:text-primary transition-colors">Produtos</a>
                                <a href="#about" class="hover:text-primary transition-colors">Sobre</a>
                                <a href="#contact" class="hover:text-primary transition-colors">Contato</a>
                            </div>
                            <div class="flex items-center space-x-6">
                                <button class="hover:text-primary relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                                <button class="hover:text-primary relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    <span class="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                                </button>
                            </div>
                        </div>
                    </nav>

                    <!-- Hero Banner -->
                    <header class="relative bg-gray-50 overflow-hidden">
                        <div class="absolute inset-0 bg-primary opacity-5"></div>
                        <div class="container mx-auto px-6 py-24 md:py-32 relative z-10 flex flex-col md:flex-row items-center">
                            <div class="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
                                <span class="bg-secondary/10 text-secondary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Nova Coleção</span>
                                <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">Estilo que define <br><span class="text-primary">sua essência</span></h1>
                                <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">{{description}}</p>
                                <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                                    <a href="#shop" class="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-opacity-90 transition-transform transform hover:-translate-y-1">Comprar Agora</a>
                                    <a href="#about" class="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors">Saiba Mais</a>
                                </div>
                            </div>
                            <div class="md:w-1/2 flex justify-center relative">
                                <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Banner" class="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full max-w-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            </div>
                        </div>
                    </header>
                </div>
            `,
            css_structure: `
                .text-primary { color: var(--color-primary); }
                .bg-primary { background-color: var(--color-primary); }
                .text-secondary { color: var(--color-secondary); }
                .bg-secondary { background-color: var(--color-secondary); }
                .border-primary { border-color: var(--color-primary); }
            `
        }
    ];

    let results = [];
    for (const t of templates) {
        const [rows] = await db.pool.execute("SELECT * FROM templates WHERE name = ?", [t.name]);
        if (rows.length === 0) {
            await db.pool.execute(
                "INSERT INTO templates (name, category, thumbnail_url, html_structure, css_structure) VALUES (?, ?, ?, ?, ?)",
                [t.name, t.category, t.thumbnail_url, t.html_structure, t.css_structure]
            );
            results.push(`Template ${t.name} created.`);
        }
    }
    return results;
};

exports.runSetup = async (req, res) => {
    try {
        const userMsg = await seedUsers();
        const plansMsg = await seedPlans();
        const templatesMsg = await seedTemplates();
        
        res.json({
            message: 'Setup completed',
            admin: userMsg,
            plans: plansMsg,
            templates: templatesMsg
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
