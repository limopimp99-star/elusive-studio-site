class ElusiveContact extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 4rem 2rem; color: white; font-family: sans-serif; }
                .container { 
                    max-width: 800px; margin: 0 auto; 
                    background: rgba(255, 255, 255, 0.05); 
                    backdrop-filter: blur(10px);
                    padding: 3rem; border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                h2 { font-size: 3rem; text-transform: uppercase; margin-bottom: 1rem; color: #ef4444; }
                p { color: #aaa; margin-bottom: 2rem; }
                form { display: grid; gap: 1.5rem; }
                input, textarea {
                    width: 100%; padding: 1rem; background: rgba(0,0,0,0.3);
                    border: 1px solid #333; border-radius: 8px; color: white;
                    font-size: 1rem; outline: none; transition: 0.3s;
                }
                input:focus, textarea:focus { border-color: #ef4444; }
                button {
                    padding: 1.2rem; background: #ef4444; color: white;
                    border: none; border-radius: 8px; font-weight: 900;
                    text-transform: uppercase; cursor: pointer; transition: 0.3s;
                }
                button:hover { background: white; color: #ef4444; transform: translateY(-2px); }
            </style>
            <div class="container">
                <h2>Secure the Empire</h2>
                <p>Serious creators only. Tell us your vision, and we'll build the infrastructure.</p>
                <form name="contact" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="text" name="name" placeholder="YOUR NAME" required />
                    <input type="email" name="email" placeholder="EMAIL ADDRESS" required />
                    <textarea name="message" rows="5" placeholder="WHAT ARE WE BUILDING?" required></textarea>
                    <button type="submit">Send Directive</button>
                </form>
            </div>
        `;
    }
}
customElements.define('elusive-contact', ElusiveContact);