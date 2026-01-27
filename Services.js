class ElusiveServices extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 8rem 2rem; background: transparent; color: white; font-family: 'Inter', sans-serif; }
                .grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                    gap: 2rem; max-width: 1200px; margin: 0 auto; 
                }
                .service-card {
                    background: rgba(10,10,10,0.6); 
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 3rem 2rem; border-radius: 20px; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-align: center; backdrop-filter: blur(15px);
                    cursor: pointer; position: relative; overflow: hidden;
                }
                .service-card::before {
                    content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
                    opacity: 0; transition: 0.3s;
                }
                .service-card:hover { 
                    border-color: #ef4444; 
                    transform: translateY(-12px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }
                .service-card:hover::before { opacity: 1; }
                
                .icon { font-size: 3.5rem; margin-bottom: 1.5rem; display: block; transition: 0.3s; }
                .service-card:hover .icon { transform: scale(1.1); filter: drop-shadow(0 0 10px #ef4444); }
                
                h3 { font-size: 1.4rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; color: #fff; }
                p { color: #888; line-height: 1.6; font-size: 0.95rem; }
                .red { color: #ef4444; }
                .tag { font-size: 0.7rem; color: #ef4444; font-weight: 900; letter-spacing: 2px; margin-bottom: 0.5rem; display: block; }
            </style>
            <div class="grid">
                <div class="service-card" onclick="window.requestServiceDetail('LLC')">
                    <span class="tag">INFRASTRUCTURE</span>
                    <span class="icon red">🛡️</span>
                    <h3>LLC Formation</h3>
                    <p>Red tape elimination. We handle filings and business structure for Day 1 protection.</p>
                </div>
                <div class="service-card" onclick="window.requestServiceDetail('AI')">
                    <span class="tag">AUTOMATION</span>
                    <span class="icon red">👤</span>
                    <h3>AI Digital Twins</h3>
                    <p>Clone your likeness and voice. Content generation while you sleep.</p>
                </div>
                <div class="service-card" onclick="window.requestServiceDetail('DISTRO')">
                    <span class="tag">OMNIPRESENCE</span>
                    <span class="icon red">📡</span>
                    <h3>Global Distribution</h3>
                    <p>Be everywhere at once. Simultaneous restreaming across all major platforms.</p>
                </div>
                <div class="service-card" onclick="window.requestServiceDetail('PROD')">
                    <span class="tag">CONTENT</span>
                    <span class="icon red">🎬</span>
                    <h3>Elite Production</h3>
                    <p>Viral-hook engineering and high-end 4K editing for maximum retention.</p>
                </div>
                <div class="service-card" onclick="window.requestServiceDetail('WEB')">
                    <span class="tag">SOFTWARE</span>
                    <span class="icon red">💻</span>
                    <h3>Web & App Creation</h3>
                    <p>Custom platforms and community dashboards built for extreme scale.</p>
                </div>
                <div class="service-card" onclick="window.requestServiceDetail('DESIGN')">
                    <span class="tag">IDENTITY</span>
                    <span class="icon red">🎨</span>
                    <h3>Visual Design</h3>
                    <p>Empire-grade branding and world-class UI/UX assets.</p>
                </div>
            </div>
        `;
    }
}
customElements.define('elusive-services', ElusiveServices);