class ElusiveHeader extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { position: sticky; top: 0; z-index: 1000; display: block; width: 100%; }
                header {
                    background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(12px);
                    padding: 0.8rem 5%; display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                /* THE RESTORED LOGO FADE ANIMATION */
                .logo { 
                    font-family: 'Courier New', monospace; font-weight: 900; 
                    color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 2px;
                    animation: logo-fade 4s ease-in-out infinite; /* The "Vanish" Effect */
                }
                .logo span { color: #ef4444; }

                @keyframes logo-fade {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }

                nav { display: flex; gap: 2rem; align-items: center; }
                .nav-link { 
                    color: #aaa; text-decoration: none; font-size: 0.8rem; font-weight: 600; 
                    cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px;
                }
                .nav-link:hover { color: white; }

                .war-room-btn {
                    padding: 0.6rem 1.4rem; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
                    color: white; border: 1px solid #ef4444; border-radius: 4px; font-weight: 800;
                    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: 0.3s;
                }
                .war-room-btn:hover { background: black; color: #ef4444; box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); }

                /* MOBILE */
                .mobile-toggle { display: none; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
                @media (max-width: 768px) {
                    nav { display: none; position: absolute; top: 100%; left: 0; width: 100%; background: #000; flex-direction: column; padding: 1rem 0; }
                    nav.active { display: flex; }
                    .mobile-toggle { display: block; }
                }
            </style>

            <header>
                <a href="#home" class="logo">Elusive<span>Studio</span></a>
                <button class="mobile-toggle">☰</button>
                <nav id="nav-menu">
                    <a class="nav-link" data-target="home">Introduction</a>
                    <a class="nav-link" data-target="services">Media</a>
                    <a class="nav-link" data-target="tools">Tools</a>
                    <button class="war-room-btn" id="war-room-trigger">War Room</button>
                </nav>
            </header>
        `;
    }

    setupEventListeners() {
        const root = this.shadowRoot;
        root.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(e.target.dataset.target);
                if(target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // This button opens the War Room
        root.getElementById('war-room-trigger').addEventListener('click', () => {
            if(window.openWarRoom) window.openWarRoom();
        });

        root.querySelector('.mobile-toggle').addEventListener('click', () => {
            root.getElementById('nav-menu').classList.toggle('active');
        });
    }
}
customElements.define('elusive-header', ElusiveHeader);