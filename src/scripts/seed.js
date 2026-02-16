const db = require('../config/db');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    const [rows] = await db.pool.execute("SELECT * FROM users WHERE email = 'admin@admin.com'");
    if (rows.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash('admin123', salt);
        await db.pool.execute("INSERT INTO users (name, email, password_hash, role) VALUES ('Admin', 'admin@admin.com', ?, 'admin')", [pass]);
        console.log('Admin user created: admin@admin.com');
    }
}

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

                    <!-- Products Grid -->
                    <section id="shop" class="py-24 bg-white">
                        <div class="container mx-auto px-6">
                            <div class="text-center mb-16">
                                <h2 class="text-3xl font-bold mb-4">Destaques da Loja</h2>
                                <div class="w-16 h-1 bg-primary mx-auto rounded"></div>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                                <!-- Product Card 1 -->
                                <div class="group">
                                    <div class="relative overflow-hidden rounded-xl bg-gray-100 mb-4 h-80">
                                        <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Product" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></button>
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                                        </div>
                                        <div class="absolute top-4 left-4 bg-white px-2 py-1 text-xs font-bold uppercase tracking-wide">Novo</div>
                                    </div>
                                    <h3 class="text-lg font-bold">Tênis Urban Style</h3>
                                    <p class="text-gray-500 text-sm mb-2">Calçados</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-primary font-bold text-lg">R$ 299,90</span>
                                        <div class="flex text-yellow-400 text-xs">★★★★★</div>
                                    </div>
                                </div>
                                <!-- Product Card 2 -->
                                <div class="group">
                                    <div class="relative overflow-hidden rounded-xl bg-gray-100 mb-4 h-80">
                                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Product" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></button>
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                                        </div>
                                    </div>
                                    <h3 class="text-lg font-bold">Relógio Minimal</h3>
                                    <p class="text-gray-500 text-sm mb-2">Acessórios</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-primary font-bold text-lg">R$ 450,00</span>
                                        <div class="flex text-yellow-400 text-xs">★★★★☆</div>
                                    </div>
                                </div>
                                <!-- Product Card 3 -->
                                <div class="group">
                                    <div class="relative overflow-hidden rounded-xl bg-gray-100 mb-4 h-80">
                                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Product" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></button>
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                                        </div>
                                        <div class="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase tracking-wide">-20%</div>
                                    </div>
                                    <h3 class="text-lg font-bold">Headphone Pro</h3>
                                    <p class="text-gray-500 text-sm mb-2">Eletrônicos</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-primary font-bold text-lg">R$ 899,00</span>
                                        <div class="flex text-yellow-400 text-xs">★★★★★</div>
                                    </div>
                                </div>
                                 <!-- Product Card 4 -->
                                <div class="group">
                                    <div class="relative overflow-hidden rounded-xl bg-gray-100 mb-4 h-80">
                                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Product" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></button>
                                            <button class="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                                        </div>
                                    </div>
                                    <h3 class="text-lg font-bold">Nike Red</h3>
                                    <p class="text-gray-500 text-sm mb-2">Esportes</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-primary font-bold text-lg">R$ 599,90</span>
                                        <div class="flex text-yellow-400 text-xs">★★★★☆</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Newsletter -->
                    <section class="py-20 bg-gray-50">
                        <div class="container mx-auto px-6 text-center">
                             <h2 class="text-3xl font-bold mb-4">Inscreva-se na nossa Newsletter</h2>
                             <p class="text-gray-600 mb-8">Receba novidades e ofertas exclusivas no seu e-mail.</p>
                             <form class="max-w-md mx-auto flex">
                                 <input type="email" placeholder="Seu e-mail principal" class="flex-1 px-6 py-4 rounded-l-full border focus:outline-none focus:ring-2 focus:ring-primary">
                                 <button class="bg-primary text-white px-8 py-4 rounded-r-full font-bold hover:bg-opacity-90">Assinar</button>
                             </form>
                        </div>
                    </section>

                    <!-- Footer -->
                    <footer id="contact" class="bg-gray-900 text-gray-300 py-12">
                        <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 class="text-white text-xl font-bold mb-4 flex items-center gap-2"><img src="{{logo_url}}" class="w-6 h-6 rounded-full grayscale">{{name}}</h3>
                                <p class="text-sm">Sua loja favorita para encontrar os melhores produtos com o melhor preço e qualidade.</p>
                            </div>
                            <div>
                                <h4 class="text-white font-bold mb-4 uppercase text-xs tracking-wider">Links Úteis</h4>
                                <ul class="space-y-2 text-sm">
                                    <li><a href="#" class="hover:text-white">Sobre Nós</a></li>
                                    <li><a href="#" class="hover:text-white">Política de Privacidade</a></li>
                                    <li><a href="#" class="hover:text-white">Trocas e Devoluções</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contato</h4>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-center gap-2">✉ {{email}}</li>
                                    <li>📸 @{{instagram}}</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-white font-bold mb-4 uppercase text-xs tracking-wider">Formas de Pagamento</h4>
                                <div class="flex gap-2">
                                    <div class="w-10 h-6 bg-gray-700 rounded"></div>
                                    <div class="w-10 h-6 bg-gray-700 rounded"></div>
                                    <div class="w-10 h-6 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div class="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-xs">
                            &copy; 2024 {{name}}. Powered by LojasSaaS.
                        </div>
                    </footer>
                </div>
            `,
            css_structure: `
                .text-primary { color: var(--color-primary); }
                .bg-primary { background-color: var(--color-primary); }
                .text-secondary { color: var(--color-secondary); }
                .bg-secondary { background-color: var(--color-secondary); }
                .border-primary { border-color: var(--color-primary); }
            `
        },
        {
            name: 'Corporativo Moderno',
            category: 'Institucional',
            thumbnail_url: 'https://via.placeholder.com/400x300?text=Corporativo+Moderno',
            html_structure: `
                <div class="font-sans text-gray-700 antialiased">
                    <!-- Header -->
                    <header class="bg-white shadow fixed w-full z-50">
                        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                            <a href="#" class="text-2xl font-bold text-gray-800 tracking-wide flex items-center gap-2">
                                <span class="bg-primary text-white w-8 h-8 flex items-center justify-center rounded text-sm font-black">{{name}}</span>
                            </a>
                            <nav class="hidden md:flex space-x-8">
                                <a href="#home" class="text-gray-600 hover:text-primary font-medium">Home</a>
                                <a href="#about" class="text-gray-600 hover:text-primary font-medium">Sobre</a>
                                <a href="#services" class="text-gray-600 hover:text-primary font-medium">Serviços</a>
                                <a href="#testimonials" class="text-gray-600 hover:text-primary font-medium">Depoimentos</a>
                            </nav>
                            <a href="#contact" class="bg-primary text-white px-5 py-2 rounded font-bold hover:bg-opacity-90 transition-all">Fale Conosco</a>
                        </div>
                    </header>

                    <!-- Hero -->
                    <section id="home" class="pt-32 pb-20 bg-gray-50">
                        <div class="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
                            <div class="md:w-1/2 mt-10 md:mt-0">
                                <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">{{name}} <br><span class="text-primary">Inovação e Resultado</span></h1>
                                <p class="text-xl text-gray-600 mb-8 border-l-4 border-secondary pl-4">{{description}}</p>
                                <div class="flex gap-4">
                                    <a href="#services" class="bg-primary text-white px-8 py-3 rounded shadow hover:shadow-lg transition">Nossos Serviços</a>
                                    <a href="#contact" class="text-primary font-bold px-8 py-3 border border-primary rounded hover:bg-primary hover:text-white transition">Contato</a>
                                </div>
                            </div>
                            <div class="md:w-1/2 flex justify-center">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" class="rounded-lg shadow-2xl max-w-lg w-full transform md:rotate-2 hover:rotate-0 transition duration-500">
                            </div>
                        </div>
                    </section>

                    <!-- Stats -->
                    <section class="bg-primary py-10 text-white">
                        <div class="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div><span class="text-4xl font-bold block">10+</span><span class="text-sm opacity-80">Anos de Mercado</span></div>
                            <div><span class="text-4xl font-bold block">500+</span><span class="text-sm opacity-80">Projetos Entregues</span></div>
                            <div><span class="text-4xl font-bold block">50+</span><span class="text-sm opacity-80">Especialistas</span></div>
                            <div><span class="text-4xl font-bold block">98%</span><span class="text-sm opacity-80">Clientes Satisfeitos</span></div>
                        </div>
                    </section>

                    <!-- Services -->
                    <section id="services" class="py-20">
                        <div class="container mx-auto px-6">
                            <div class="text-center mb-16">
                                <h2 class="text-3xl font-bold mb-4 text-gray-800">Nossas Soluções</h2>
                                <p class="text-gray-500 max-w-2xl mx-auto">Oferecemos um leque completo de serviços desenhados para alavancar o seu negócio.</p>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <!-- Service 1 -->
                                <div class="bg-white p-8 rounded-lg shadow border border-gray-100 hover:shadow-xl transition-shadow group">
                                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                    </div>
                                    <h3 class="text-xl font-bold mb-4 text-gray-800">Consultoria Estratégica</h3>
                                    <p class="text-gray-600 mb-4">Análise profunda de dados para tomadas de decisão assertivas no seu mercado.</p>
                                    <a href="#" class="text-primary font-bold text-sm hover:underline">Saiba mais &rarr;</a>
                                </div>
                                <!-- Service 2 -->
                                <div class="bg-white p-8 rounded-lg shadow border border-gray-100 hover:shadow-xl transition-shadow group">
                                    <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                    </div>
                                    <h3 class="text-xl font-bold mb-4 text-gray-800">Desenvolvimento Web</h3>
                                    <p class="text-gray-600 mb-4">Sites e aplicações modernas, rápidas e seguras para sua presença digital.</p>
                                    <a href="#" class="text-primary font-bold text-sm hover:underline">Saiba mais &rarr;</a>
                                </div>
                                <!-- Service 3 -->
                                <div class="bg-white p-8 rounded-lg shadow border border-gray-100 hover:shadow-xl transition-shadow group">
                                    <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                                    </div>
                                    <h3 class="text-xl font-bold mb-4 text-gray-800">Marketing Digital</h3>
                                    <p class="text-gray-600 mb-4">Gestão de tráfego, SEO e conteúdo para maximizar seu alcance.</p>
                                    <a href="#" class="text-primary font-bold text-sm hover:underline">Saiba mais &rarr;</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Testimonials -->
                    <section id="testimonials" class="py-20 bg-gray-50 border-t">
                         <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">O que dizem nossos clientes</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <div class="bg-white p-8 rounded-xl shadow-sm relative">
                                    <span class="text-6xl text-gray-200 absolute top-4 left-4 font-serif">"</span>
                                    <p class="text-gray-600 italic mb-6 relative z-10">A equipe da {{name}} transformou completamente nossa operação digital. Profissionalismo e competência ímpares.</p>
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <h5 class="font-bold text-gray-900">Carlos Silva</h5>
                                            <p class="text-xs text-gray-500">CEO, TechStart</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white p-8 rounded-xl shadow-sm relative">
                                    <span class="text-6xl text-gray-200 absolute top-4 left-4 font-serif">"</span>
                                    <p class="text-gray-600 italic mb-6 relative z-10">Resultados acima da média desde o primeiro mês. Recomendo fortemente para qualquer empresa séria.</p>
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <h5 class="font-bold text-gray-900">Ana Souza</h5>
                                            <p class="text-xs text-gray-500">Diretora de Mkt, FashionCo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </section>
                    
                    <!-- Contact -->
                    <section id="contact" class="py-20 bg-white">
                        <div class="container mx-auto px-6 flex flex-col md:flex-row gap-12">
                            <div class="md:w-1/2">
                                <h2 class="text-3xl font-bold mb-6 text-gray-900">Vamos conversar?</h2>
                                <p class="text-gray-600 mb-8">Entre em contato para um orçamento personalizado. Nossa equipe responderá em até 24 horas.</p>
                                <div class="space-y-4">
                                    <p class="flex items-center gap-3 text-gray-700">
                                        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        {{email}}
                                    </p>
                                    <p class="flex items-center gap-3 text-gray-700">
                                        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        Av. Paulista, 1000 - SP
                                    </p>
                                </div>
                            </div>
                            <div class="md:w-1/2 bg-gray-50 p-8 rounded-lg">
                                <form class="space-y-4">
                                    <input type="text" placeholder="Seu Nome" class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-primary">
                                    <input type="email" placeholder="Seu E-mail" class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-primary">
                                    <textarea rows="4" placeholder="Mensagem" class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-primary"></textarea>
                                    <button class="w-full bg-primary text-white font-bold py-3 rounded hover:bg-opacity-90">Enviar Mensagem</button>
                                </form>
                            </div>
                        </div>
                    </section>

                    <footer class="bg-gray-900 text-white py-8 border-t border-gray-800">
                        <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                            <p>&copy; 2024 {{name}}. Todos os direitos reservados.</p>
                            <div class="flex space-x-4 mt-4 md:mt-0">
                                <a href="#" class="hover:text-primary">LinkedIn</a>
                                <a href="#" class="hover:text-primary">Instagram</a>
                                <a href="#" class="hover:text-primary">Facebook</a>
                            </div>
                        </div>
                    </footer>
                </div>
            `,
            css_structure: `
                .bg-primary { background-color: var(--color-primary); }
                .text-primary { color: var(--color-primary); }
                .border-primary { border-color: var(--color-primary); }
                .border-secondary { border-color: var(--color-secondary); }
                .text-secondary { color: var(--color-secondary); }
                .bg-secondary { background-color: var(--color-secondary); }
            `
        },
        {
            name: 'Portfólio Criativo',
            category: 'Portfólio',
            thumbnail_url: 'https://via.placeholder.com/400x300?text=Portfolio+Criativo',
            html_structure: `
                <div class="font-sans antialiased text-gray-900 bg-white">
                    <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
                        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                            <a href="#" class="text-xl font-bold font-mono tracking-tighter">{{name}}.</a>
                            <div class="space-x-8 text-sm font-medium">
                                <a href="#work" class="hover:text-primary">Trabalhos</a>
                                <a href="#skills" class="hover:text-primary">Habilidades</a>
                                <a href="#contact" class="hover:text-primary">Contato</a>
                            </div>
                        </div>
                    </nav>

                    <!-- Hero -->
                    <header class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
                        <div class="relative w-40 h-40 mb-8 group">
                            <div class="absolute inset-0 bg-primary rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <img src="{{logo_url}}" alt="Avatar" class="relative w-full h-full rounded-full object-cover border-4 border-white shadow-xl">
                        </div>
                        <h1 class="text-6xl md:text-8xl font-black mb-4 tracking-tight leading-none">
                            Olá, sou <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{{name}}</span>
                        </h1>
                        <p class="text-xl md:text-2xl text-gray-500 max-w-2xl font-light">{{description}}</p>
                        
                        <div class="mt-12 animate-bounce">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>
                    </header>

                    <!-- Work Gallery -->
                    <section id="work" class="py-20 bg-gray-50">
                        <div class="container mx-auto px-6">
                            <h2 class="text-sm font-bold uppercase tracking-widest text-gray-400 mb-12">Projetos Selecionados</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <!-- Project 1 -->
                                <div class="group cursor-pointer">
                                    <div class="overflow-hidden rounded-lg shadow-lg aspect-video mb-6 relative">
                                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold tracking-widest z-10">VER DETALHES</div>
                                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
                                    </div>
                                    <h3 class="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Dashboard UI Kit</h3>
                                    <p class="text-gray-600">Design de Interface / React</p>
                                </div>
                                <!-- Project 2 -->
                                <div class="group cursor-pointer">
                                    <div class="overflow-hidden rounded-lg shadow-lg aspect-video mb-6 relative">
                                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold tracking-widest z-10">VER DETALHES</div>
                                        <img src="https://images.unsplash.com/photo-1555421689-492a6c368819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
                                    </div>
                                    <h3 class="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">App Financeiro</h3>
                                    <p class="text-gray-600">Mobile / UX Research</p>
                                </div>
                                <!-- Project 3 -->
                                <div class="group cursor-pointer">
                                    <div class="overflow-hidden rounded-lg shadow-lg aspect-video mb-6 relative">
                                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold tracking-widest z-10">VER DETALHES</div>
                                        <img src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
                                    </div>
                                    <h3 class="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Portal de Notícias</h3>
                                    <p class="text-gray-600">Web Development / CMS</p>
                                </div>
                                <!-- Project 4 -->
                                <div class="group cursor-pointer">
                                    <div class="overflow-hidden rounded-lg shadow-lg aspect-video mb-6 relative">
                                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold tracking-widest z-10">VER DETALHES</div>
                                        <img src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
                                    </div>
                                    <h3 class="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Branding Concept</h3>
                                    <p class="text-gray-600">Identidade Visual</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Skills -->
                    <section id="skills" class="py-20 bg-black text-white">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row justify-between items-start">
                                <div class="md:w-1/3 mb-10 md:mb-0">
                                    <h2 class="text-4xl font-bold mb-6">Minha<br>Expertise</h2>
                                    <p class="text-gray-400">Ferramentas e tecnologias que domino e utilizo no meu dia a dia.</p>
                                </div>
                                <div class="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
                                    <div class="border-t border-gray-800 pt-4">
                                        <h4 class="font-bold text-lg mb-2">Design</h4>
                                        <ul class="text-gray-400 space-y-1 text-sm">
                                            <li>Figma</li>
                                            <li>Adobe XD</li>
                                            <li>Photoshop</li>
                                            <li>Prototyping</li>
                                        </ul>
                                    </div>
                                    <div class="border-t border-gray-800 pt-4">
                                        <h4 class="font-bold text-lg mb-2">Frontend</h4>
                                        <ul class="text-gray-400 space-y-1 text-sm">
                                            <li>HTML5/CSS3</li>
                                            <li>TailwindCSS</li>
                                            <li>JavaScript (ES6+)</li>
                                            <li>React</li>
                                        </ul>
                                    </div>
                                    <div class="border-t border-gray-800 pt-4">
                                        <h4 class="font-bold text-lg mb-2">Backend</h4>
                                        <ul class="text-gray-400 space-y-1 text-sm">
                                            <li>Node.js</li>
                                            <li>Express</li>
                                            <li>MySQL</li>
                                            <li>API REST</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Contact -->
                    <section id="contact" class="py-20 flex justify-center items-center text-center">
                        <div class="container px-6">
                            <h2 class="text-5xl font-bold mb-8">Vamos Trabalhar Juntos?</h2>
                            <p class="text-xl text-gray-500 mb-10 max-w-xl mx-auto">Estou disponível para novos projetos freelance ou oportunidades full-time.</p>
                            <a href="mailto:{{email}}" class="inline-block bg-primary text-white text-lg font-bold px-10 py-5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition transform">
                                ✉ {{email}}
                            </a>
                            <div class="mt-12 flex justify-center gap-6">
                                <a href="https://instagram.com/{{instagram}}" target="_blank" class="text-gray-400 hover:text-primary transition-colors text-2xl">Instagram</a>
                                <a href="#" class="text-gray-400 hover:text-primary transition-colors text-2xl">LinkedIn</a>
                                <a href="#" class="text-gray-400 hover:text-primary transition-colors text-2xl">Dribbble</a>
                            </div>
                        </div>
                    </section>

                     <footer class="py-6 text-center text-gray-400 text-xs border-t">
                        &copy; 2024 {{name}} Portfolio. All Rights Reserved.
                    </footer>
                </div>
            `,
            css_structure: `
                .bg-primary { background-color: var(--color-primary); }
                .text-primary { color: var(--color-primary); }
                .from-primary { --tw-gradient-from: var(--color-primary); var(--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)); }
                .to-secondary { --tw-gradient-to: var(--color-secondary); }
                .hover\:text-primary:hover { color: var(--color-primary); }
                .hover\:bg-primary:hover { background-color: var(--color-primary); }
                .hover\:border-primary:hover { border-color: var(--color-primary); }
            `
        },
        {
            name: 'Landing Page Conversão',
            category: 'Landing Page',
            thumbnail_url: 'https://via.placeholder.com/400x300?text=Landing+Page',
            html_structure: `
                <div class="font-sans text-gray-900 bg-white">
                    <nav class="flex justify-between items-center py-6 px-4 md:px-12 max-w-7xl mx-auto">
                        <div class="font-bold text-xl tracking-tight">{{name}}</div>
                        <a href="#buy" class="bg-secondary text-white font-bold py-2 px-6 rounded shadow hover:bg-opacity-90 transition">Comprar Agora</a>
                    </nav>

                    <header class="pt-16 pb-24 px-4 text-center max-w-4xl mx-auto">
                        <span class="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Oferta Exclusiva</span>
                        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">A solução definitiva para <span class="text-primary underline decoration-secondary">seus problemas</span>.</h1>
                        <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">{{description}}</p>
                        <div class="flex flex-col md:flex-row justify-center gap-4">
                            <a href="#buy" class="bg-primary text-white text-xl font-bold py-4 px-10 rounded shadow-lg hover:shadow-xl hover:-translate-y-1 transition transform">Garantir Minha Vaga</a>
                            <p class="text-xs text-gray-400 mt-2 md:mt-0 flex items-center justify-center gap-1"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Compra Segura</p>
                        </div>
                    </header>

                    <section class="bg-gray-50 py-20 px-4">
                         <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                             <div class="p-6">
                                 <div class="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-primary text-2xl font-bold">1</div>
                                 <h3 class="text-xl font-bold mb-3">Rápido</h3>
                                 <p class="text-gray-600">Resultados imediatos assim que você começa a aplicar o método.</p>
                             </div>
                             <div class="p-6">
                                 <div class="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-primary text-2xl font-bold">2</div>
                                 <h3 class="text-xl font-bold mb-3">Prático</h3>
                                 <p class="text-gray-600">Passo a passo detalhado sem enrolação ou teorias complexas.</p>
                             </div>
                             <div class="p-6">
                                 <div class="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-primary text-2xl font-bold">3</div>
                                 <h3 class="text-xl font-bold mb-3">Garantido</h3>
                                 <p class="text-gray-600">Se não gostar, devolvemos seu dinheiro em até 7 dias.</p>
                             </div>
                         </div>
                    </section>

                    <section id="buy" class="py-24 px-4 text-center">
                        <div class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
                            <div class="bg-primary py-4 text-white font-bold text-center uppercase tracking-widest text-sm">Melhor Escolha</div>
                            <div class="p-10 md:p-14">
                                <h2 class="text-3xl font-bold mb-2">Acesso Completo</h2>
                                <p class="text-gray-500 mb-8">Tudo o que você precisa em um só lugar</p>
                                <div class="text-6xl font-black text-gray-900 mb-2">R$ 97<span class="text-lg text-gray-500 font-normal">,90</span></div>
                                <p class="text-green-600 font-bold mb-8">Pagamento único</p>
                                <a href="#" class="block w-full bg-secondary text-white font-bold text-xl py-4 rounded-xl shadow hover:bg-opacity-90 transition mb-6">Comprar Agora</a>
                                <ul class="text-left space-y-4 text-gray-600 mx-auto max-w-xs">
                                    <li class="flex items-center gap-3"><svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Material Vitalício</li>
                                    <li class="flex items-center gap-3"><svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Suporte Premium</li>
                                    <li class="flex items-center gap-3"><svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Certificado Incluso</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <footer class="bg-gray-100 py-12 px-4 text-center text-gray-500 text-sm">
                        <p class="mb-2">{{name}} &copy; 2024</p>
                        <p>Dúvidas? {{email}}</p>
                    </footer>
                </div>
            `,
            css_structure: `
                .text-primary { color: var(--color-primary); }
                .bg-primary { background-color: var(--color-primary); }
                .text-secondary { color: var(--color-secondary); }
                .bg-secondary { background-color: var(--color-secondary); }
                .decoration-secondary { text-decoration-color: var(--color-secondary); }
                 .border-primary { border-color: var(--color-primary);  }
            `
        }
    ];

    for (const t of templates) {
        const [rows] = await db.pool.execute("SELECT * FROM templates WHERE name = ?", [t.name]);
        if (rows.length === 0) {
            await db.pool.execute(
                "INSERT INTO templates (name, category, thumbnail_url, html_structure, css_structure) VALUES (?, ?, ?, ?, ?)",
                [t.name, t.category, t.thumbnail_url, t.html_structure, t.css_structure]
            );
            console.log(`Template ${t.name} created.`);
        } else {
             await db.pool.execute(
                "UPDATE templates SET html_structure = ?, css_structure = ? WHERE name = ?",
                [t.html_structure, t.css_structure, t.name]
            );
             console.log(`Template ${t.name} updated.`);
        }
    }
};

const seedPlans = async () => {
    const plans = [
        { name: 'Básico', price: 29.90, features: JSON.stringify(['1 Projeto', 'Subdomínio', 'Suporte por Email', 'SEO Básico']) },
        { name: 'Profissional', price: 59.90, features: JSON.stringify(['5 Projetos', 'Domínio Próprio', 'Suporte Prioritário', 'Analytics', 'Sem Anúncios']) },
        { name: 'Premium', price: 99.90, features: JSON.stringify(['Ilimitado', 'Consultoria Dedicada', 'API Access', 'White Label', 'Integração Marketplaces']) }
    ];

    for (const p of plans) {
        const [rows] = await db.pool.execute("SELECT * FROM plans WHERE name = ?", [p.name]);
        if (rows.length === 0) {
            await db.pool.execute("INSERT INTO plans (name, price, features) VALUES (?, ?, ?)", [p.name, p.price, p.features]);
            console.log(`Plan ${p.name} created.`);
        }
    }
};

const run = async () => {
    try {
        await seedPlans();
        await seedUsers();
        await seedTemplates();
        console.log('Seeding completed');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
