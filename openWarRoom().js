// --- THE WAR ROOM UI (UPGRADED) ---
function enterWarRoom() {
    isVerified = true;
    
    // 1. AUDIO BYPASS (CRITICAL FOR MOBILE)
    // Plays the local file immediately. Because this function is triggered by 
    // a user click or keypress, mobile browsers WILL allow this to play.
    const verifiedAudio = new Audio('verified.mp3');
    verifiedAudio.volume = 1.0;
    verifiedAudio.play().catch(e => console.log("Audio requires interaction:", e));

    // 2. UI CLEANUP
    const main = document.querySelector('main');
    if (main) main.style.display = 'none';
    const header = document.querySelector('elusive-header');
    if (header) header.style.display = 'none';
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.style.display = 'none';
    
    document.body.style.backgroundColor = "#050505";
    document.body.style.overflow = "hidden";
    
    // 3. CREATE DASHBOARD
    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";
    
    // Fullscreen, Flex layout, Hacker Font
    dashboard.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 9999; background: radial-gradient(circle at center, #1a0505 0%, #000000 90%);
        display: flex; flex-direction: row; font-family: 'JetBrains Mono', monospace;
        color: #ef4444; opacity: 0; animation: fadeInFlash 1.5s forwards;
    `;
    
    dashboard.innerHTML = `
        <style>
            @keyframes fadeInFlash {
                0% { opacity: 0; filter: brightness(5) blur(10px); }
                10% { opacity: 1; filter: brightness(2) blur(2px); }
                100% { opacity: 1; filter: brightness(1) blur(0); }
            }
            @keyframes hudScan {
                0% { box-shadow: inset 0 0 0px #ef4444; }
                50% { box-shadow: inset 0 0 20px rgba(239,68,68,0.2); }
                100% { box-shadow: inset 0 0 0px #ef4444; }
            }
            
            .war-container { display: flex; width: 100%; height: 100%; flex-direction: row; animation: hudScan 4s infinite; }
            .side-panel { width: 350px; border-right: 1px solid #333; display: flex; flex-direction: column; background: rgba(5,5,5,0.95); position: relative; }
            .center-panel { flex: 1; padding: 40px; overflow-y: auto; position: relative; }
            .log-panel { width: 280px; background: #000; padding: 15px; font-size: 0.65rem; color: #00ff00; border-left: 1px solid #333; overflow: hidden; display:flex; flex-direction:column-reverse;}
            
            .op-card { 
                border: 1px solid #222; padding: 25px; cursor: pointer; transition: all 0.3s ease; 
                background: rgba(255,255,255,0.02); position: relative; overflow: hidden;
            }
            .op-card::after {
                content: ''; position: absolute; top:0; left:0; width: 2px; height: 100%; background: #ef4444;
                opacity: 0; transition: 0.3s;
            }
            .op-card:hover { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); transform: translateX(5px); }
            .op-card:hover::after { opacity: 1; }
            
            .op-card h3 { color: #ef4444; margin: 0 0 5px 0; font-size: 1rem; letter-spacing: 1px; }
            .op-card p { color: #666; margin: 0; font-size: 0.75rem; }

            /* SCROLLBARS */
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #000; }
            ::-webkit-scrollbar-thumb { background: #333; }
            ::-webkit-scrollbar-thumb:hover { background: #ef4444; }

            /* MOBILE FIX */
            @media (max-width: 768px) {
                #war-room-dashboard { flex-direction: column !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch; }
                .war-container { flex-direction: column; height: auto; display: block; }
                .side-panel { width: 100% !important; height: auto !important; border-right: none; border-bottom: 1px solid #ef4444; padding-bottom: 20px; }
                .center-panel { width: 100% !important; padding: 20px; height: auto; }
                .log-panel { display: none !important; }
            }
        </style>

        <div class="war-container">
            <div class="side-panel">
                <div style="padding: 30px; text-align: center; border-bottom: 1px solid #222;">
                    <div style="width: 100px; height: 100px; margin: 0 auto; border-radius: 50%; border: 2px solid #ef4444; padding: 5px; box-shadow: 0 0 20px rgba(239,68,68,0.2);">
                        <img id="adam-visual-war" src="war-room-logo.png" style="width:100%; height:100%; border-radius:50%; object-fit:cover; filter: grayscale(1) sepia(1);">
                    </div>
                    <h2 style="color: #ef4444; font-size: 0.9rem; margin-top: 15px; letter-spacing: 2px;">AGENT ADAM <span style="font-size:0.6rem; color:#666;">v2.0</span></h2>
                </div>
                
                <div id="war-room-chat" style="flex: 1; overflow-y: auto; padding: 20px; font-size: 0.8rem; color:#aaa; font-family:'Inter', sans-serif;">
                    </div>

                <div style="padding: 20px; border-top: 1px solid #222;">
                    <input type="text" id="war-input" placeholder="ENTER COMMAND..." 
                           style="width: 100%; background: #0a0a0a; border: 1px solid #333; color: white; padding: 12px; font-family:'JetBrains Mono'; outline:none;"
                           onfocus="this.style.borderColor='#ef4444'" onblur="this.style.borderColor='#333'"
                           onkeypress="window.handleEnter(event)">
                </div>
            </div>

            <div class="center-panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid #222; padding-bottom: 10px;">
                    <h1 style="color: white; font-size: 1.5rem; letter-spacing: 3px; margin:0;">COMMAND CENTER</h1>
                    <button onclick="location.reload()" style="background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 8px 20px; cursor: pointer; font-family: 'JetBrains Mono'; transition:0.3s;">LOGOUT</button>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                    <div class="op-card" onclick="window.requestServiceDetail('AI')">
                        <h3>AI CLONES</h3>
                        <p>Neural pattern syncing active...</p>
                    </div>
                    <div class="op-card" onclick="window.requestServiceDetail('DISTRO')">
                        <h3>GLOBAL UPLINK</h3>
                        <p>Multi-channel distribution ready.</p>
                    </div>
                    <div class="op-card" onclick="window.requestServiceDetail('WEB')">
                        <h3>INFRASTRUCTURE</h3>
                        <p>Secure server deployment.</p>
                    </div>
                    <div class="op-card" onclick="window.requestServiceDetail('LLC')">
                        <h3>LEGAL / LLC</h3>
                        <p>Corporate shielding protocols.</p>
                    </div>
                     <div class="op-card" onclick="window.requestServiceDetail('PROD')">
                        <h3>PRODUCTION</h3>
                        <p>24/7 Content manufacturing.</p>
                    </div>
                     <div class="op-card" onclick="window.requestServiceDetail('BRAND')">
                        <h3>BRANDING</h3>
                        <p>Visual dominance engine.</p>
                    </div>
                </div>
            </div>

            <div class="log-panel">
                <div style="color: #ef4444; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 5px;">SYSTEM_LOGS_V.2.4</div>
                <div id="system-logs"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(dashboard);

    // 4. TRANSFER CHAT HISTORY
    const oldChat = document.getElementById('chat-messages');
    const newChat = document.getElementById('war-room-chat');
    if (oldChat && newChat) {
        newChat.innerHTML = oldChat.innerHTML;
        // Scroll to bottom
        newChat.scrollTop = newChat.scrollHeight;
    }

    // 5. START LOG ANIMATION
    setInterval(() => {
        const logs = document.getElementById('system-logs');
        if(logs) {
            const codes = ['AUTH', 'SYNC', 'PING', 'ACK', 'READ', 'WRITE'];
            const randomCode = codes[Math.floor(Math.random() * codes.length)];
            const hex = Math.floor(Math.random() * 16777215).toString(16);
            logs.innerHTML = `[${new Date().toLocaleTimeString()}] ${randomCode} :: 0x${hex} ... OK<br>` + logs.innerHTML.substring(0, 1500);
        }
    }, 800);
}