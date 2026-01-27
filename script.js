// --- 1. GLOBAL FUNCTIONS ---
window.handleEnter = function(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('user-input');
        if (input.value.trim() === "Elitename Elitepassword") {
            window.activateMasterLog();
            input.value = "";
        } else if (typeof sendMessage === "function") {
            sendMessage();
        }
    }
};

window.activateMasterLog = function() {
    const header = document.querySelector('.chat-header span');
    if (header) {
        header.innerHTML = '<i class="fas fa-skull"></i> SECURITY LEVEL: OMEGA';
        header.style.color = "#ef4444";
    }
    alert("Master Access Granted.");
};

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