// --- 1. GLOBAL CONTROLS ---

window.toggleChat = function() {
    const bouncer = document.getElementById('ai-bouncer');
    if(bouncer) bouncer.classList.toggle('closed');
};

window.openWarRoom = function() {
    const bouncer = document.getElementById('ai-bouncer');
    if(bouncer) {
        bouncer.classList.remove('closed');
        document.getElementById('user-input').focus();
    }
};

// Handles Enter Key
window.handleEnter = function(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('user-input');
        const val = input.value.trim();

        // Check for Secret OMEGA Password
        if (val === "Elitename Elitepassword") {
            window.activateMasterLog();
            input.value = "";
        } else {
            window.sendMessage();
        }
    }
};

// --- 2. SECURITY UPGRADE ---

window.activateMasterLog = function() {
    const header = document.querySelector('.chat-header span');
    const container = document.getElementById('chat-messages');
    
    if (header) {
        header.innerHTML = '<i class="fas fa-skull"></i> SECURITY LEVEL: OMEGA';
        header.style.color = "#ef4444";
    }

    if (container) {
        container.innerHTML += `<div class="msg ai" style="color: #ef4444"><strong>SYSTEM:</strong> MASTER ACCESS GRANTED. OMEGA protocols active.</div>`;
        container.scrollTop = container.scrollHeight;
    }
};

// --- 3. CUSTOM ELEMENTS ---
// This builds the "Management Suite" cards automatically
if (!customElements.get('crimson-features')) {
    customElements.define('crimson-features', class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 4rem 1rem; background: #050505; color: white; font-family: sans-serif; }
                .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: auto; }
                .card { background: #111; padding: 2rem; border: 1px solid #222; border-radius: 12px; text-align: center; transition: 0.3s; }
                .card:hover { border-color: #ef4444; transform: translateY(-5px); }
                h2 { text-align: center; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 3rem; }
                h3 { color: #ef4444; }
                p { color: #888; font-size: 0.9rem; }
            </style>
            <div>
                <h2>Management Suite</h2>
                <div class="grid">
                    <div class="card"><h3>LLC Formation</h3><p>Complete business setup and EIN registration.</p></div>
                    <div class="card"><h3>AI Cloning</h3><p>Digital twin generation for 24/7 social presence.</p></div>
                    <div class="card"><h3>Media Growth</h3><p>Strategic empire building across all platforms.</p></div>
                </div>
            </div>`;
        }
    });
}

window.openWarRoom = function() {
    const bouncer = document.getElementById('ai-bouncer');
    bouncer.classList.remove('closed');
    document.getElementById('user-input').focus();
};

window.toggleChat = function() {
    const bouncer = document.getElementById('ai-bouncer');
    bouncer.classList.toggle('closed');
};

// --- 2. COMPONENTS ---
document.addEventListener('DOMContentLoaded', function() {
    if (!customElements.get('crimson-features')) {
        customElements.define('crimson-features', class extends HTMLElement {
            connectedCallback() {
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.innerHTML = `
                <style>
                    :host { display: block; padding: 5rem 2rem; background: #050505; color: white; }
                    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1200px; margin: auto; }
                    .card { background: #111; padding: 30px; border: 1px solid #222; border-radius: 10px; text-align: center; }
                    h2 { text-align: center; margin-bottom: 40px; text-transform: uppercase; }
                </style>
                <div class="features">
                    <h2>Management Suite</h2>
                    <div class="grid">
                        <div class="card"><h3>LLC Formation</h3><p>Business setup and EIN.</p></div>
                        <div class="card"><h3>AI Cloning</h3><p>Digital twin generation.</p></div>
                        <div class="card"><h3>Media Growth</h3><p>Social empire building.</p></div>
                    </div>
                </div>`;
            }
        });
    }
});