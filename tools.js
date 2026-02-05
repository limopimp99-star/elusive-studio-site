class ElusiveTools extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <style>
                :host { display: block; position: relative; z-index: 2; background: #050505; }
                section { padding: 6rem 2rem; text-align: center; }
                
                h2 { 
                    font-size: 2.5rem; text-transform: uppercase; letter-spacing: 2px; 
                    color: white; margin-bottom: 3rem;
                }
                span { color: #ef4444; }

                .tools-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
                    gap: 2rem; 
                    max-width: 1000px; 
                    margin: 0 auto; 
                }

                .tool-item {
                    background: rgba(20, 20, 20, 0.6);
                    border: 1px solid #333;
                    padding: 2rem;
                    border-radius: 12px;
                    transition: 0.3s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: default;
                }

                .tool-item:hover {
                    border-color: #ef4444;
                    transform: translateY(-5px);
                    box-shadow: 0 5px 20px rgba(239, 68, 68, 0.2);
                }

                .icon { font-size: 2.5rem; color: #888; margin-bottom: 1rem; transition: 0.3s; }
                .tool-item:hover .icon { color: #ef4444; }
                
                h3 { margin: 0; color: #ccc; font-size: 0.9rem; letter-spacing: 1px; }
            </style>

            <section>
                <h2>OUR <span>ARSENAL</span></h2>
                <div class="tools-grid">
                    <div class="tool-item">
                        <i class="fas fa-bolt icon"></i>
                        <h3>n8n</h3>
                    </div>
                    <div class="tool-item">
                        <i class="fas fa-brain icon"></i>
                        <h3>OPENAI</h3>
                    </div>
                    <div class="tool-item">
                        <i class="fas fa-database icon"></i>
                        <h3>AIRTABLE</h3>
                    </div>
                    <div class="tool-item">
                        <i class="fas fa-comments icon"></i>
                        <h3>SLACK BOT</h3>
                    </div>
                    <div class="tool-item">
                        <i class="fas fa-video icon"></i>
                        <h3>HEYGEN</h3>
                    </div>
                    <div class="tool-item">
                        <i class="fas fa-code-branch icon"></i>
                        <h3>GITHUB</h3>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('elusive-tools', ElusiveTools);
