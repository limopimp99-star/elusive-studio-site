class ElusiveContact extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 4rem 2rem; color: white; font-family: 'Inter', sans-serif; }
                .container { 
                    max-width: 800px; margin: 0 auto; 
                    background: rgba(10, 10, 10, 0.8); 
                    backdrop-filter: blur(20px);
                    padding: 3rem; border-radius: 20px;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    box-shadow: 0 0 40px rgba(0,0,0,0.5);
                }
                h2 { font-size: 3rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #ef4444; letter-spacing: -1px; }
                p { color: #aaa; margin-bottom: 2rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
                form { display: grid; gap: 1.5rem; }
                input, textarea {
                    width: 100%; padding: 1.2rem; background: rgba(0,0,0,0.5);
                    border: 1px solid #222; border-radius: 8px; color: white;
                    font-size: 0.9rem; outline: none; transition: 0.3s;
                    font-family: monospace;
                }
                input:focus, textarea:focus { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
                button {
                    padding: 1.2rem; background: #ef4444; color: white;
                    border: none; border-radius: 8px; font-weight: 900;
                    text-transform: uppercase; cursor: pointer; transition: 0.3s;
                    letter-spacing: 2px;
                }
                button:hover { background: white; color: #ef4444; transform: translateY(-2px); }
            </style>
            <div class="container">
                <h2>Secure the Empire</h2>
                <p>Identification Required for OMEGA Access</p>
                <form id="secure-form" name="contact" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="text" name="name" placeholder="FULL LEGAL NAME / ALIAS" required />
                    <input type="email" name="email" placeholder="ENCRYPTED EMAIL ADDRESS" required />
                    <textarea name="message" rows="4" placeholder="DESCRIBE THE INFRASTRUCTURE REQUIRED..." required></textarea>
                    <button type="submit">Submit Credentials</button>
                </form>
            </div>
        `;

        // INTERNAL FORM LOGIC
        const form = this.shadowRoot.getElementById('secure-form');
        form.addEventListener('submit', (e) => {
            // Let Netlify handle the POST normally, but trigger our global AI state
            if (typeof isVerified !== 'undefined') {
                isVerified = true; 
                
                if (typeof speak === 'function') {
                    speak("Credentials logged. Verification email dispatched. I am now authorized to communicate. Open the interface.");
                }

                // Alert the user and show Agent Adam is ready
                setTimeout(() => {
                    alert("IDENTITY LOGGED. Agent Adam is now on standby. Re-open the chat to proceed.");
                    const bouncer = document.getElementById('ai-bouncer');
                    if (bouncer) bouncer.classList.remove('closed');
                }, 1000);
            }
        });
    }
}
customElements.define('elusive-contact', ElusiveContact);