class ElusiveServices extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            /* IMPORT FONT AWESOME INTO SHADOW DOM */
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            
            <style>
                :host { display: block; position: relative; z-index: 2; }
                section { 
                    padding: 6rem 2rem; 
                    position: relative; 
                    overflow: hidden;
                    /* BLUEPRINT BACKGROUND */
                    background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                }

                /* Dark Overlay */
                section::before {
                    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(5, 5, 5, 0.9);
                    z-index: 0;
                }

                .container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
                
                h2 { 
                    font-size: 3rem; text-align: center; margin-bottom: 4rem; 
                    text-transform: uppercase; letter-spacing: 2px; color: white;
                }
                span { color: #ef4444; }

                .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
                
                .card {
                    background: rgba(20, 20, 20, 0.8); border: 1px solid #333; padding: 2.5rem;
                    border-radius: 12px; transition: 0.4s; cursor: crosshair;
                    backdrop-filter: blur(10px);
                    display: flex; flex-direction: column; align-items: center; text-align: center;
                }
                .card:hover { 
                    border-color: #ef4444; transform: translateY(-10px); 
                    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.2); 
                    background: rgba(239, 68, 68, 0.05);
                }

                /* ICON STYLING */
                .icon { font-size: 2.5rem; color: #ef4444; margin-bottom: 1.5rem; }
                
                h3 { font-size: 1.3rem; margin: 0 0 1rem 0; letter-spacing: 1px; color: white; }
                p { color: #aaa; line-height: 1.6; font-size: 0.9rem; margin: 0; }
                .category { color: #ef4444; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; font-weight: 700; }
            </style>
            
            <section>
                <div class="container">
                    <h2>OUR <span>PROTOCOLS</span></h2>
                    <div class="grid">
                        
                        <div class="card" onclick="window.requestServiceDetail('LLC')">
                            <div class="category">INFRASTRUCTURE</div>
                            <i class="fas fa-shield-alt icon"></i> <h3>LLC FORMATION</h3>
                            <p>Red tape elimination. We handle filings and business structure for Day 1 protection.</p>
                        </div>

                        <div class="card" onclick="window.requestServiceDetail('AI')">
                            <div class="category">AUTOMATION</div>
                            <i class="fas fa-user-astronaut icon"></i> <h3>AI DIGITAL TWINS</h3>
                            <p>Clone your likeness and voice. Content generation while you sleep.</p>
                        </div>

                        <div class="card" onclick="window.requestServiceDetail('DISTRO')">
                            <div class="category">OMNIPRESENCE</div>
                            <i class="fas fa-satellite-dish icon"></i> <h3>GLOBAL DISTRIBUTION</h3>
                            <p>Be everywhere at once. Simultaneous restreaming across all major platforms.</p>
                        </div>

                        <div class="card" onclick="window.requestServiceDetail('PROD')">
                            <div class="category">CONTENT</div>
                            <i class="fas fa-film icon"></i> <h3>ELITE PRODUCTION</h3>
                            <p>Viral-hook engineering and high-end 4K editing for maximum retention.</p>
                        </div>

                        <div class="card" onclick="window.requestServiceDetail('WEB')">
                            <div class="category">SOFTWARE</div>
                            <i class="fas fa-laptop-code icon"></i> <h3>WEB & APP CREATION</h3>
                            <p>Custom platforms and community dashboards built for extreme scale.</p>
                        </div>

                        <div class="card" onclick="window.requestServiceDetail('DESIGN')">
                            <div class="category">IDENTITY</div>
                            <i class="fas fa-paint-brush icon"></i> <h3>VISUAL DESIGN</h3>
                            <p>Empire-grade branding and world-class UI/UX assets.</p>
                        </div>

                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('elusive-services', ElusiveServices);