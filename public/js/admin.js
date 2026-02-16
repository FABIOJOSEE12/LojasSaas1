// API_URL loaded from config.js
const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

// Decode token to check role (basic check, real auth is on backend)
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}
const user = parseJwt(token);

if (!user || user.role !== 'admin') {
    alert('Acesso negado. Apenas administradores.');
    window.location.href = 'dashboard.html';
}

// Navigation
function showSection(id) {
    document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    
    // Update active nav
    document.querySelectorAll('#sidebar li a').forEach(a => {
        a.classList.remove('bg-gray-800', 'text-white');
        a.classList.add('text-gray-400');
    });
    // Simple highlight logic based on onclick attribute matching, ideal would be ID based nav
}

// Data Fetching
async function loadData() {
    try {
        const [usersRes, sitesRes, messagesRes] = await Promise.all([
            fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } }),
            fetch(`${API_URL}/sites/admin/all`, { headers: { Authorization: `Bearer ${token}` } }),
            fetch(`${API_URL}/messages/admin/all`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const users = await usersRes.json();
        const sites = await sitesRes.json();
        // Assuming messages endpoint returns all messages for admin
        const messages = await messagesRes.json(); 

        renderStats(users, sites, messages);
        renderClients(users);
        renderProjects(sites, users); // Pass users to map names if needed
        renderMessages(messages);

    } catch (err) {
        console.error('Error loading admin data:', err);
        alert('Erro ao carregar dados do painel. Verifique o console.');
    }
}

function renderStats(users, sites, messages) {
    document.getElementById('stat-clients').innerText = users.filter(u => u.role === 'client').length;
    document.getElementById('stat-projects').innerText = sites.length;
    document.getElementById('stat-pending').innerText = sites.filter(s => s.status === 'pending').length;
    document.getElementById('stat-messages').innerText = messages.length;
}

function renderClients(users) {
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = users.map(u => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#${u.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${u.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${u.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">${u.role}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(u.created_at).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

function renderProjects(sites, users) {
    const tbody = document.getElementById('projectsTableBody');
    tbody.innerHTML = sites.map(s => {
        // Find user name if not joined. Assuming getAllSites returns user_id
        // For simplicity let's just show ID if name not available in join
        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'in_progress': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800'
        };
        const statusLabels = {
            'pending': 'Em Análise',
            'in_progress': 'Em Desenv.',
            'completed': 'Concluído'
        };

        return `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#${s.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${s.name} <br>
                <span class="text-xs text-gray-400">${s.category}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${s.user_name || 'User #' + s.user_id}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[s.status] || 'bg-gray-100'}">
                    ${statusLabels[s.status] || s.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="openStatusModal(${s.id}, '${s.status}', '${s.deployed_url || ''}')" class="text-indigo-600 hover:text-indigo-900 mr-3">Status</button>
                <a href="request.html?id=${s.id}" target="_blank" class="text-gray-600 hover:text-gray-900 mr-3">Ver/Editar</a>
                <button onclick="deleteSite(${s.id})" class="text-red-600 hover:text-red-900">Excluir</button>
            </td>
        </tr>
    `}).join('');
}

// Delete Logic
window.deleteSite = async (id) => {
    if(!confirm('Tem certeza que deseja excluir este projeto?')) return;
    
    try {
        const res = await fetch(`${API_URL}/sites/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if(res.ok) {
            alert('Projeto excluído.');
            loadData();
        } else {
            alert('Erro ao excluir.');
        }
    } catch(err) {
        console.error(err);
        alert('Erro de conexão.');
    }
}

function renderMessages(messages) {
    const list = document.getElementById('messagesList');
    if(messages.length === 0) {
        list.innerHTML = '<p class="text-gray-500">Nenhuma mensagem.</p>';
        return;
    }
    list.innerHTML = messages.map(m => `
        <div class="bg-white p-4 rounded shadow border border-gray-200">
            <div class="flex justify-between mb-2">
                <span class="font-bold text-gray-800">${m.user_name || 'User #' + m.user_id} <span class="text-gray-400 text-xs font-normal">(${m.user_email || ''})</span></span>
                <span class="text-xs text-gray-500">${new Date(m.created_at).toLocaleString()}</span>
            </div>
            <p class="text-sm font-bold text-gray-700 mb-1">${m.subject} <span class="font-normal text-gray-400">- ${m.site_name || 'Geral'}</span></p>
            <p class="text-gray-600">${m.message}</p>
        </div>
    `).join('');
}

// Modal Logic
window.openStatusModal = (id, currentStatus, currentUrl) => {
    document.getElementById('modalSiteId').value = id;
    document.getElementById('modalStatus').value = currentStatus;
    // Check if deployed_url is in the data structure, we might need to parse content_json if not in top level
    // For now we assume fetch pass it or we don't show pre-filled if complex.
    document.getElementById('modalLink').value = currentUrl !== 'undefined' ? currentUrl : '';
    document.getElementById('statusModal').classList.remove('hidden');
}

document.getElementById('saveStatusBtn').addEventListener('click', async () => {
    const id = document.getElementById('modalSiteId').value;
    const status = document.getElementById('modalStatus').value;
    const url = document.getElementById('modalLink').value;

    try {
        const res = await fetch(`${API_URL}/sites/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status, live_url: url })
        });

        if (res.ok) {
            alert('Atualizado com sucesso!');
            document.getElementById('statusModal').classList.add('hidden');
            loadData();
        } else {
            alert('Erro ao atualizar.');
        }
    } catch (err) {
        console.error(err);
    }
});



const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
}
loadData();
