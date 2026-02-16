const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const user = JSON.parse(localStorage.getItem('user'));
document.getElementById('welcomeMsg').textContent = `Olá, ${user.name}`;

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

// Load Sites
async function loadSites() {
    try {
        const res = await fetch(`${API_URL}/sites`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const sites = await res.json();
        const grid = document.getElementById('sitesGrid');
        
        if (sites.length === 0) {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">Nenhum projeto encontrado. Solicite o seu primeiro!</p>';
            return;
        }

        grid.innerHTML = sites.map(site => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="h-32 bg-gray-200 bg-cover bg-center" style="background-image: url('${site.thumbnail_url || 'https://via.placeholder.com/400x200?text=Sem+Imagem'}')"></div>
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h4 class="text-lg font-bold mb-1">${site.name}</h4>
                        <button onclick="editSite(${site.id})" class="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">Editar</button>
                    </div>
                    <p class="text-sm text-gray-500 mb-2">${site.category || 'Site'}</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full 
                            ${site.status === 'active' ? 'bg-green-100 text-green-800' : 
                              site.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}">
                            ${site.status.toUpperCase()}
                        </span>
                        ${site.live_url ? `<a href="${site.live_url}" target="_blank" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Ver Site &rarr;</a>` : 
                        `<a href="preview.html?id=${site.id}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Ver Prévia &rarr;</a>`}
                    </div>
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error(err);
    }
}

 // Support Messages - REMOVED loadMessages as per user request to not show history here.

document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const subject = document.getElementById('msgSubject').value;
    const message = document.getElementById('msgContent').value;
    const user = JSON.parse(localStorage.getItem('user'));

    // 1. WhatsApp Redirect
    const text = `*Nova Mensagem de Suporte*\n\n*Cliente:* ${user.name} (${user.email})\n*Assunto:* ${subject}\n\n*Mensagem:* ${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5598989117776?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');

    // 2. Save to Database (for Admin)
    try {
        await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ subject, message })
        });
        // Silent success or optional notification
    } catch (err) {
        console.error('Erro ao salvar mensagem no sistema', err);
    }

    document.getElementById('messageForm').reset();
});

function editSite(id) {
    window.location.href = `request.html?id=${id}`;
}

loadSites();
// loadMessages(); // Removed
