function enterWarRoom() {
    // KILL INTRO AUDIO IMMEDIATELY
    if (introAudio) {
        introAudio.pause();
        introAudio.currentTime = 0;
    }

    isVerified = true;
    const verifiedAudio = new Audio('verified.mp3');
    verifiedAudio.play();
    
    // Hide UI elements safely
    const main = document.querySelector('main');
    if (main) main.style.display = 'none';
    const header = document.querySelector('elusive-header');
    if (header) header.style.display = 'none';
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.style.display = 'none';
    
    document.body.style.overflow = "hidden";
    
    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";
    dashboard.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9999; background:#000; display:flex; font-family:monospace;`;
    
    dashboard.innerHTML = `
        <style>
            .war-container { display: flex; width: 100%; height: 100%; flex-direction: row; }
            .side-panel { width: 350px; border-right: 1px solid #ef4444; display: flex; flex-direction: column; background: #080808; }
            .center-panel { flex: 1; padding: 40px; overflow-y: auto; }
            .log-panel { width: 250px; background: #000; padding: 15px; font-size: 0.65rem; color: #0f0; border-left: 1px solid #222; }
            .op-card { border: 1px solid #222; padding: 20px; cursor: pointer; transition: 0.3s; background: #0a0a0a; margin-bottom:10px; }
            .op-card:hover { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
            .install-btn { background: #ef4444; color: #000; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; font-family: monospace; margin-bottom: 20px; transition: 0.3s; }
            .install-btn:hover { background: #fff; }
            @media (max-width: 768px) {
                .war-container { flex-direction: column; }
                .side-panel { width: 100%; height: 50%; }
                .log-panel { display: none; }
            }
        </style>
        <div class="war-container">
            <div class="side-panel">
                <div style="padding: 20px; text-align: center; border-bottom: 1px solid #222;">
                    <img id="adam-visual-war" src="war-room-logo.png" alt="Agent Adam War Room Logo" style="width:80px; height:80px; border-radius:50%; border:1px solid #ef4444; filter:grayscale(1) sepia(1);">
                    <h2 style="color:#ef4444; font-size:0.7rem; margin-top:10px;">AGENT ADAM V.2.0</h2>
                </div>
                <div id="war-room-chat" style="flex:1; overflow-y:auto; padding:20px; font-size:0.8rem;">
                    <div style="color:#ef4444"><strong>ADAM:</strong> ${VERIFIED_TEXT}</div>
                </div>
                <div style="padding:20px; border-top:1px solid #222;">
                    <input type="text" id="war-input" placeholder="DIRECTIVE..." aria-label="Command Input"
                           style="width:100%; background:transparent; border:1px solid #ef4444; color:white; padding:10px;" 
                           onkeypress="window.handleEnter(event)">
                </div>
            </div>
            <div class="center-panel">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #222; padding-bottom:10px;">
                    <h1 style="color:white; font-size:1.2rem; margin:0;">OPERATIONAL COMMAND</h1>
                    <button id="pwa-install-btn" class="install-btn" onclick="window.installApp()">INSTALL INTERFACE</button>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:15px; margin-top:20px;">
                    <div class="op-card" onclick="alert('Syncing Clones...')"><h3>AI CLONES</h3><p>Status: Ready</p></div>
                    <div class="op-card" onclick="alert('Deploying Web...')"><h3>STRUCTURE</h3><p>Status: Online</p></div>
                    <div class="op-card" onclick="alert('Checking Legal...')"><h3>ASSETS</h3><p>Status: Secure</p></div>
                </div>
            </div>
            <div class="log-panel" id="system-logs"></div>
        </div>
    `;
    document.body.appendChild(dashboard);
    
    // Auto-hide install button if app is already installed
    window.addEventListener('appinstalled', () => {
        const btn = document.getElementById('pwa-install-btn');
        if(btn) btn.style.display = 'none';
    });

    // Start Log feed
    setInterval(() => {
        const logs = document.getElementById('system-logs');
        if(logs) {
            logs.innerHTML = `[${new Date().toLocaleTimeString()}] UPLINK_CHECK :: OK<br>` + logs.innerHTML.substring(0, 500);
        }
    }, 2000);
}