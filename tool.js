class ElusiveTools extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section id="tools" class="scroll-fade-section" style="padding: 8rem 2rem; text-align: center;">
                <h2 class="gaussian-text" style="font-size: 3rem; margin-bottom: 3rem;">AI ARSENAL</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto;">
                    <div class="tool-card"><h3>Web Crawling</h3><p>Deep-indexing target data points at scale.</p></div>
                    <div class="tool-card"><h3>Lead Scraping</h3><p>Automated extraction of high-value metadata.</p></div>
                    <div class="tool-card"><h3>Restock Bots</h3><p>Real-time monitoring and instant notifications.</p></div>
                    <div class="tool-card"><h3>Social Automation</h3><p>High-frequency interaction bots for growth.</p></div>
                    <div class="tool-card"><h3>Traffic Analysis</h3><p>Predictive modeling for viewer retention.</p></div>
                    <div class="tool-card"><h3>Market Arbitrage</h3><p>Automated price tracking and opportunistic alerts.</p></div>
                </div>
            </section>
            
            <style>
                .tool-card {
                    background: rgba(15, 15, 15, 0.8);
                    border: 1px solid #222;
                    padding: 2.5rem;
                    border-radius: 15px;
                    transition: 0.4s ease;
                }
                .tool-card:hover {
                    border-color: #ef4444;
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
                    transform: scale(1.05);
                }
                .tool-card h3 { color: #ef4444; text-transform: uppercase; margin-bottom: 1rem; }
                .tool-card p { color: #aaa; font-size: 0.9rem; }
            </style>
        `;
    }
}
customElements.define('elusive-tools', ElusiveTools);