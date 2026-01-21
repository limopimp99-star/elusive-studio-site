class ElusiveServices extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 8rem 2rem; background: transparent; color: white; }
                .grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                    gap: 2rem; max-width: 1200px; margin: 0 auto; 
                }
                .service-card {
                    background: rgba(10,10,10,0.8); border: 1px solid #222;
                    padding: 3rem 2rem; border-radius: 20px; transition: 0.3s;
                    text-align: center; backdrop-filter: blur(10px);
                }
                .service-card:hover { border-color: #ef4444; transform: translateY(-10px); }
                .icon { font-size: 3rem; margin-bottom: 1.5rem; display: block; }
                h3 { font-size: 1.5rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; }
                p { color: #888; line-height: 1.6; font-size: 0.95rem; }
                .red { color: #ef4444; }
            </style>
            <div class="grid">
                <div class="service-card">
                    <span class="icon red">◈</span>
                    <h3>LLC Formation</h3>
                    <p>We handle the red tape. Filing, EIN, and business structure so you operate as a protected entity from Day 1.</p>
                </div>
                <div class="service-card">
                    <span class="icon red">◈</span>
                    <h3>AI Digital Twins</h3>
                    <p>We clone your likeness and voice. Your "Clone" generates content 24/7 while you focus on the big picture.</p>
                </div>
                <div class="service-card">
                    <span class="icon red">◈</span>
                    <h3>Global Distribution</h3>
                    <p>Simultaneous restreaming to YouTube, Twitch, Kick, and TikTok. Be everywhere at once without lifting a finger.</p>
                </div>
                <div class="service-card">
                    <span class="icon red">◈</span>
                    <h3>Elite Production</h3>
                    <p>High-end 4K editing, SEO optimization, and viral-hook engineering for every piece of content you drop.</p>
                </div>
            </div>
        `;
    }
}
customElements.define('elusive-services', ElusiveServices);