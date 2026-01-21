class ElusiveFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer { 
                    padding: 4rem 2rem; background: #000; border-top: 1px solid #222; 
                    text-align: center; color: #444; 
                }
                .social-icons { display: flex; justify-content: center; gap: 3rem; margin-bottom: 2rem; }
                .social-icons a { transition: 0.3s; opacity: 0.6; }
                .social-icons a:hover { opacity: 1; transform: scale(1.2); }
                img { width: 40px; height: 40px; filter: invert(1); }
            </style>
            <footer>
                <div class="social-icons">
                    <a href="https://www.youtube.com/@MrLive305" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube">
                    </a>
                    <a href="https://www.instagram.com/mrlive.305/" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram">
                    </a>
                    <a href="https://www.snapchat.com/add/don305choppa" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384067.png" alt="Snapchat">
                    </a>
                </div>
                <p>© 2024 Elusive Studio Management. Help Me Help You.</p>
            </footer>
        `;
    }
}
customElements.define('elusive-footer', ElusiveFooter);