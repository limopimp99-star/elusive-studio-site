class ElusiveHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background: rgba(0,0,0,0.9); backdrop-filter: blur(20px);
                    padding: 1rem 5%; display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 1px solid #333; position: sticky; top: 0; z-index: 100;
                }
                
                /* THE RESTORED LOGO ANIMATION */
                .logo { 
                    font-weight: 900; color: #fff; text-decoration: none; 
                    text-transform: uppercase; letter-spacing: 2px;
                    animation: logo-fade 4s ease-in-out infinite;
                }
                .logo span { color: #ef4444; }

                @keyframes logo-fade {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.2; transform: scale(0.98); }
                }

                nav { display: flex; gap: 1.5rem; align-items: center; }
                .nav-link { color: #aaa; text-decoration: none; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: 0.3s; }
                .nav-link:hover { color: #ef4444; }

                /* CONTACT BUTTON */
                .contact-btn {
                    padding: 0.6rem 1.2rem; background: #ef4444; color: white;
                    text-decoration: none; border-radius: 8px; font-weight: 800;
                    font-size: 0.8rem; text-transform: uppercase; transition: 0.3s;
                }
                .contact-btn:hover { background: white; color: #ef4444; }

                @media (max-width: 768px) {
                    header { padding: 1rem; flex-direction: row; }
                    .nav-link { display: none; } /* Hide text links on mobile for space */
                }
            </style>
            <header>
                <a href="#home" class="logo">Elusive<span>Studio</span></a>
                <nav>
                    <a class="nav-link" onclick="document.getElementById('services').scrollIntoView({behavior:'smooth'})">Services</a>
                    <a class="nav-link" onclick="document.getElementById('pricing').scrollIntoView({behavior:'smooth'})">Pricing</a>
                    <a href="mailto:manager@elusive.studio" class="contact-btn">Contact</a>
                </nav>
            </header>
        `;
    }
}
customElements.define('elusive-header', ElusiveHeader);