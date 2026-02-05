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

                /* HEADER STYLES */
                .grid-header {
                    grid-column: 1 / -1;
                    text-align: left;
                    font-size: 0.85rem;
                    color: #ef4444;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-top: 3rem;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #333;
                    padding-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .grid-header i { font-size: 1rem; }

                /* ULTRA DENSE GRID */
                .tools-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
                    gap: 1rem; 
                    max-width: 1400px; 
                    margin: 0 auto; 
                }

                /* STANDARD TOOL ITEM */
                .tool-item {
                    background: rgba(20, 20, 20, 0.4);
                    border: 1px solid #222;
                    padding: 1.2rem 0.5rem;
                    border-radius: 6px;
                    transition: 0.2s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    text-decoration: none;
                }

                .tool-item:hover {
                    border-color: #ef4444;
                    transform: translateY(-3px);
                    background: rgba(239, 68, 68, 0.1);
                    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.15);
                }

                .icon { font-size: 1.8rem; color: #777; margin-bottom: 0.5rem; transition: 0.3s; }
                .tool-item:hover .icon { color: white; transform: scale(1.1); }
                
                h3 { margin: 0; color: #aaa; font-size: 0.65rem; letter-spacing: 0.5px; font-weight: 700; text-transform: uppercase; }
                .tool-item:hover h3 { color: #ef4444; }
            </style>

            <section>
                <h2>OUR <span>ARSENAL</span></h2>
                
                <div class="tools-grid">
                    
                    <div class="grid-header"><i class="fas fa-globe"></i> DEPLOYMENT ZONES</div>
                    <div class="tool-item"><i class="fab fa-youtube icon"></i><h3>YouTube</h3></div>
                    <div class="tool-item"><i class="fab fa-tiktok icon"></i><h3>TikTok</h3></div>
                    <div class="tool-item"><i class="fab fa-instagram icon"></i><h3>Instagram</h3></div>
                    <div class="tool-item"><i class="fab fa-facebook icon"></i><h3>Facebook</h3></div>
                    <div class="tool-item"><i class="fab fa-linkedin icon"></i><h3>LinkedIn</h3></div>
                    <div class="tool-item"><i class="fab fa-twitch icon"></i><h3>Twitch</h3></div>
                    <div class="tool-item"><i class="fas fa-bolt icon"></i><h3>Kick</h3></div>
                    <div class="tool-item"><i class="fas fa-play-circle icon"></i><h3>Rumble</h3></div>
                    <div class="tool-item"><i class="fab fa-discord icon"></i><h3>Discord</h3></div>
                    <div class="tool-item"><i class="fas fa-lock icon"></i><h3>OnlyFans</h3></div>
                    <div class="tool-item"><i class="fas fa-video icon"></i><h3>Chaturbate</h3></div>
                    <div class="tool-item"><i class="fas fa-play icon"></i><h3>Pornhub</h3></div>
                    <div class="tool-item"><i class="fas fa-link icon"></i><h3>Linktree</h3></div>

                    <div class="grid-header"><i class="fas fa-building"></i> SPATIAL & REAL ESTATE</div>
                    <div class="tool-item"><i class="fas fa-home icon"></i><h3>Zillow</h3></div>
                    <div class="tool-item"><i class="fas fa-cube icon"></i><h3>Matterport</h3></div>
                    <div class="tool-item"><i class="fas fa-pen-ruler icon"></i><h3>Planner 5D</h3></div>
                    <div class="tool-item"><i class="fas fa-map-marked-alt icon"></i><h3>Google Maps</h3></div>
                    <div class="tool-item"><i class="fas fa-spider icon"></i><h3>Maps Crawler</h3></div>

                    <div class="grid-header"><i class="fas fa-camera"></i> HARDWARE & PRODUCTION</div>
                    <div class="tool-item"><i class="fas fa-circle-notch icon"></i><h3>Insta360</h3></div>
                    <div class="tool-item"><i class="fas fa-camera icon"></i><h3>GoPro</h3></div>
                    <div class="tool-item"><i class="fas fa-camera icon"></i><h3>Sony Alpha</h3></div>
                    <div class="tool-item"><i class="fas fa-camera-retro icon"></i><h3>Canon</h3></div>
                    <div class="tool-item"><i class="fas fa-eye icon"></i><h3>Nikon</h3></div>
                    <div class="tool-item"><i class="fas fa-film icon"></i><h3>DaVinci</h3></div>
                    <div class="tool-item"><i class="fas fa-photo-video icon"></i><h3>Adobe Suite</h3></div>
                    <div class="tool-item"><i class="fas fa-palette icon"></i><h3>Canva</h3></div>
                    <div class="tool-item"><i class="fas fa-layer-group icon"></i><h3>Envato</h3></div>
                    <div class="tool-item"><i class="fas fa-cube icon"></i><h3>Blender</h3></div>
                    <div class="tool-item"><i class="fas fa-gamepad icon"></i><h3>Unreal 5</h3></div>
                    <div class="tool-item"><i class="fas fa-user-circle icon"></i><h3>MetaHumans</h3></div>
                    <div class="tool-item"><i class="fas fa-cut icon"></i><h3>CapCut</h3></div>
                    <div class="tool-item"><i class="fas fa-video icon"></i><h3>Filmora</h3></div>
                    <div class="tool-item"><i class="fas fa-satellite-dish icon"></i><h3>OBS Studio</h3></div>
                    <div class="tool-item"><i class="fas fa-sync-alt icon"></i><h3>Restream</h3></div>

                    <div class="grid-header"><i class="fas fa-brain"></i> ARTIFICIAL INTELLIGENCE</div>
                    <div class="tool-item"><i class="fas fa-brain icon"></i><h3>OpenAI</h3></div>
                    <div class="tool-item"><i class="fas fa-microchip icon"></i><h3>Anthropic</h3></div>
                    <div class="tool-item"><i class="fab fa-google icon"></i><h3>Google AI</h3></div>
                    <div class="tool-item"><i class="fas fa-wind icon"></i><h3>Mistral</h3></div>
                    <div class="tool-item"><i class="fas fa-paw icon"></i><h3>Llama 3</h3></div>
                    <div class="tool-item"><i class="fas fa-rocket icon"></i><h3>Grok</h3></div>
                    <div class="tool-item"><i class="fas fa-shield-alt icon"></i><h3>Titan</h3></div>
                    <div class="tool-item"><i class="fas fa-server icon"></i><h3>Pinecone</h3></div>
                    <div class="tool-item"><i class="fas fa-laptop-code icon"></i><h3>LM Studio</h3></div>
                    <div class="tool-item"><i class="fas fa-video icon"></i><h3>HeyGen</h3></div>
                    <div class="tool-item"><i class="fas fa-wave-square icon"></i><h3>ElevenLabs</h3></div>

                    <div class="grid-header"><i class="fas fa-code"></i> DEVELOPMENT STACK</div>
                    <div class="tool-item"><i class="fab fa-python icon"></i><h3>Python</h3></div>
                    <div class="tool-item"><i class="fas fa-code icon"></i><h3>C++</h3></div>
                    <div class="tool-item"><i class="fas fa-bolt icon"></i><h3>Vite</h3></div>
                    <div class="tool-item"><i class="fab fa-github icon"></i><h3>GitHub</h3></div>
                    <div class="tool-item"><i class="fas fa-code icon"></i><h3>VS Code</h3></div>
                    <div class="tool-item"><i class="fab fa-docker icon"></i><h3>Docker</h3></div>
                    <div class="tool-item"><i class="fas fa-cloud-upload-alt icon"></i><h3>Netlify</h3></div>
                    <div class="tool-item"><i class="fas fa-triangle icon"></i><h3>Vercel</h3></div>
                    <div class="tool-item"><i class="fas fa-search-dollar icon"></i><h3>SerpApi</h3></div>
                    <div class="tool-item"><i class="fas fa-spider icon"></i><h3>ParseHub</h3></div>
                    <div class="tool-item"><i class="fas fa-bug icon"></i><h3>DebugBear</h3></div>
                    <div class="tool-item"><i class="fas fa-lightbulb icon"></i><h3>Lighthouse</h3></div>

                    <div class="grid-header"><i class="fas fa-briefcase"></i> ENTERPRISE SUITE</div>
                    <div class="tool-item"><i class="fab fa-google icon"></i><h3>Workspace</h3></div>
                    <div class="tool-item"><i class="fab fa-microsoft icon"></i><h3>Office 365</h3></div>
                    <div class="tool-item"><i class="fas fa-file-excel icon"></i><h3>Excel</h3></div>
                    <div class="tool-item"><i class="fas fa-file-powerpoint icon"></i><h3>PowerPoint</h3></div>
                    <div class="tool-item"><i class="fas fa-bolt icon"></i><h3>n8n</h3></div>
                    <div class="tool-item"><i class="fas fa-project-diagram icon"></i><h3>Make</h3></div>
                    <div class="tool-item"><i class="fab fa-stripe icon"></i><h3>Stripe</h3></div>
                    <div class="tool-item"><i class="fas fa-cloud icon"></i><h3>Cloudflare</h3></div>
                    <div class="tool-item"><i class="fab fa-dropbox icon"></i><h3>Dropbox</h3></div>
                    <div class="tool-item"><i class="fas fa-book icon"></i><h3>Notion</h3></div>
                    <div class="tool-item"><i class="fas fa-calendar-alt icon"></i><h3>Cal.com</h3></div>
                    <div class="tool-item"><i class="fas fa-file-contract icon"></i><h3>PandaDoc</h3></div>
                    <div class="tool-item"><i class="fas fa-poll-h icon"></i><h3>Tally.so</h3></div>
                </div>
            </section>
        `;
    }
}
customElements.define('elusive-tools', ElusiveTools);