const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const urlParams = new URLSearchParams(window.location.search);
const siteId = urlParams.get('id');

const previewFrame = document.getElementById('previewFrame');
let templates = [];
let currentData = {};

// Load Templates and Initial Data
async function init() {
    try {
        const res = await fetch(`${API_URL}/templates`);
        templates = await res.json();
        
        // Populate hidden select for reference
        const select = document.getElementById('templateSelect');
        select.innerHTML = '<option value="">Selecione um modelo...</option>' + 
            templates.map(t => `<option value="${t.id}" data-category="${t.category}">${t.name} (${t.category})</option>`).join('');

        if (siteId) {
            await loadSiteData(siteId);
        } else {
            // Default preview update
            updatePreview();
        }
    } catch (err) {
        console.error(err);
    }
}

async function loadSiteData(id) {
    try {
        const res = await fetch(`${API_URL}/sites/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const site = await res.json();
        
        // Populate Form
        document.getElementById('name').value = site.name;
        document.getElementById('category').value = site.category || 'Loja Virtual';
        document.getElementById('description').value = site.description || '';
        document.getElementById('logoUrl').value = site.logo_url || '';
        document.getElementById('contactEmail').value = site.contact_info?.email || '';
        document.getElementById('instagram').value = site.social_links?.instagram || '';
        
        if (site.colors) {
            document.getElementById('color1').value = site.colors.primary || '#000000';
            document.getElementById('color2').value = site.colors.secondary || '#ffffff';
            document.getElementById('color3').value = site.colors.accent || '#cccccc';
        }

        // Auto-select template based on saved ID, or fallback to category logic
        if (site.template_id) {
           // We might want to respect the manually chosen template if we had that option,
           // but for now we follow the category rule or just set the hidden input.
           // Since the UI now drives template by category:
           const t = templates.find(temp => temp.id == site.template_id);
           if (t) document.getElementById('category').value = t.category; 
        }

        updatePreview();
    } catch (err) {
        console.error(err);
    }
}

// Event Listeners for Real-time Updates
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        updatePreview();
    });
});

document.getElementById('category').addEventListener('change', () => {
    // Auto-select template logic
    const category = document.getElementById('category').value;
    const matchingTemplate = templates.find(t => t.category === category);
    
    if (matchingTemplate) {
        // Implicitly selecting the first matching template
        currentData.template = matchingTemplate;
    } else {
        // Fallback or clear
        currentData.template = null;
    }
    updatePreview();
});

function getFormData() {
    return {
        name: document.getElementById('name').value || 'Nome do Projeto',
        category: document.getElementById('category').value,
        description: document.getElementById('description').value || 'Descrição do seu negócio aparecerá aqui.',
        logo_url: document.getElementById('logoUrl').value,
        colors: {
            primary: document.getElementById('color1').value,
            secondary: document.getElementById('color2').value,
            accent: document.getElementById('color3').value,
        },
        contact_info: {
            email: document.getElementById('contactEmail').value || 'contato@exemplo.com',
        },
        social_links: {
            instagram: document.getElementById('instagram').value || 'usuario',
        }
    };
}

function updatePreview() {
    const data = getFormData();
    
    // Find template if not already found (or if category changed)
    if (!currentData.template || currentData.template.category !== data.category) {
         currentData.template = templates.find(t => t.category === data.category) || templates[0];
    }

    if (!currentData.template) {
        // Render blank or loading state
        const frameDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        frameDoc.open();
        frameDoc.write('<body style="font-family:sans-serif; text-align:center; padding:50px; color:#666;">Selecione um tipo de site para ver o modelo.</body>');
        frameDoc.close();
        return;
    }
    
    renderTemplateInIframe(currentData.template, data);
}

function renderTemplateInIframe(template, data) {
    const frameDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
    // Prepare CSS with variables
    let css = template.css_structure || '';
    // Inject Rendered Variables
    // Note: In a real production app we'd be careful about XSS here.
    // For this demo we assume internal templates are safe.
    
    const rootStyles = `
        :root {
            --color-primary: ${data.colors.primary};
            --color-secondary: ${data.colors.secondary};
            --color-accent: ${data.colors.accent};
        }
    `;

    // SEO Injection
    const seoTags = `
        <title>${data.name} | ${data.category}</title>
        <meta name="description" content="${data.description}">
        <meta property="og:title" content="${data.name}">
        <meta property="og:description" content="${data.description}">
        <meta property="og:image" content="${data.logo_url || ''}">
    `;

    // Basic Tailwind Support in Preview
    const head = `
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${seoTags}
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                ${rootStyles}
                ${css}
                body { transition: background-color 0.3s, color 0.3s; }
            </style>
        </head>
    `;

    let html = template.html_structure || '';
    
    // Replace Placeholders
    html = html.replace(/{{name}}/g, data.name)
               .replace(/{{description}}/g, data.description)
               .replace(/{{logo_url}}/g, data.logo_url || 'https://via.placeholder.com/150?text=Logo')
               .replace(/{{email}}/g, data.contact_info.email)
               .replace(/{{instagram}}/g, data.social_links.instagram);

    frameDoc.open();
    frameDoc.write(head + '<body>' + html + '</body>');
    frameDoc.close();
}

// Save Action
document.getElementById('saveBtn').addEventListener('click', async () => {
    const btn = document.getElementById('saveBtn');
    const originalText = btn.innerText;
    btn.innerText = 'Salvando...';
    btn.disabled = true;

    try {
        const formData = getFormData();
        
        // Ensure we have a template ID to send
        const selectedTemplate = templates.find(t => t.category === formData.category);
        if (!selectedTemplate) {
            alert('Por favor, selecione um tipo de site válido.');
            btn.innerText = originalText;
            btn.disabled = false;
            return;
        }

        const payload = {
            ...formData,
            template_id: selectedTemplate.id,
            content_json: {}
        };

        let url = `${API_URL}/sites`;
        let method = 'POST';

        if (siteId) {
            url = `${API_URL}/sites/${siteId}`;
            method = 'PUT';
        }

        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('Projeto salvo com sucesso!');
            window.location.href = 'dashboard.html';
        } else {
            const err = await res.json();
            alert('Erro: ' + (err.message || 'Falha ao salvar'));
        }

    } catch (err) {
        console.error(err);
        alert('Erro de conexão.');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

// View Modes
window.setPreviewMode = (mode) => {
    if (mode === 'mobile') {
        previewFrame.style.width = '375px';
        previewFrame.style.height = '667px';
    } else {
        previewFrame.style.width = '100%';
        previewFrame.style.height = '100%';
    }
};

init();
