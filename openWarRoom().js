function enterWarRoom() {
    isVerified = true;
    speak("Access Granted. Welcome to the inner circle. Neural link established.");
    
    // UI Cleanup
    document.querySelector('main').style.display = 'none';
    document.querySelector('elusive-header').style.display = 'none';
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.style.display = 'none';
    
    document.body.style.backgroundColor = "#050505";
    document.body.style.overflow = "hidden";
    
    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";
    dashboard.style = `position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9999; 
                       background: radial-gradient(circle at center, #1a0000 0%, #050505 100%);
                       display: grid; grid-template-columns: 380px 1fr 300px; font-family: 'JetBrains Mono', monospace;`;
    
    dashboard.innerHTML = `
        <div style="background: rgba(10,10,10,0.9); border-right: 1px solid #ef4444; display: flex; flex-direction: column;">
            <div style="padding: 20px; text-align: center; border-bottom: 1px solid #333;">
                <div id="adam-avatar-container" style="width: 150px; height: 150px; margin: 0 auto 15px; border: 2px solid #ef4444; border-radius: 50%; overflow: hidden; position: relative; background: #000;">
                    <img id="adam-visual" src="https://i.imgur.com/your-adam-image.png" style="width:100%; height:100%; object-fit:cover; filter: grayscale(1) sepia(1) hue-rotate(-50deg);">
                    <div id="mouth-freq" style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); width:50px; height:2px; background:#ef4444; display:none;"></div>
                </div>
                <h2 style="color: #ef4444; font-size: 0.9rem; margin: 0;">AGENT ADAM V.2.0</h2>
            </div>
            <div id="war-room-chat" style="flex: 1; overflow-y: auto; padding: 20px; color: #aaa; font-size: 0.8rem;"></div>
            <div style="padding: 20px; border-top: 1px solid #333;">
                <input type="text" id="war-input" placeholder="SEND DIRECTIVE..." 
                       style="width: 100%; background: transparent; border: 1px solid #ef4444; color: white; padding: 10px;"
                       onkeypress="if(event.key === 'Enter') window.sendWarMessage()">
            </div>
        </div>

        <div style="padding: 40px; overflow-y: auto; border-right: 1px solid #222;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 1.5rem;">STRATEGIC OPERATIONS</h1>
                <button onclick="location.reload()" style="background:transparent; border:1px solid #444; color:#444; padding:5px 15px; cursor:pointer;">DISCONNECT</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div class="op-card" onclick="window.requestServiceDetail('AI')"><h3>AI CLONES</h3><p>Syncing neural patterns...</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('DISTRO')"><h3>GLOBAL UPLINK</h3><p>Restreaming active...</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('WEB')"><h3>INFRASTRUCTURE</h3><p>Omega-1 Load: 12%</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('LLC')"><h3>LLC / LEGAL</h3><p>Asset protection: ACTIVE</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('PROD')"><h3>PRODUCTION</h3><p>Hook engineering live...</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('DESIGN')"><h3>BRANDING</h3><p>Visual dominance set...</p></div>
            </div>
        </div>

        <div style="background: rgba(0,0,0,0.8); padding: 20px; font-size: 0.7rem; color: #00ff00; overflow: hidden; display: flex; flex-direction: column;">
            <div style="color: #ef4444; margin-bottom: 10px; font-weight: bold;">LIVE SYSTEM LOGS</div>
            <div id="system-logs" style="flex: 1; line-height: 1.4;"></div>
        </div>
    `;
    document.body.appendChild(dashboard);
    
    // Start the scrolling logs
    setInterval(addSystemLog, 1500);
    
    // Sync messages
    const oldMessages = document.getElementById('chat-messages');
    const newChat = document.getElementById('war-room-chat');
    if (oldMessages && newChat) newChat.innerHTML = oldMessages.innerHTML;
}

// Function to generate fake server traffic
function addSystemLog() {
    const logs = document.getElementById('system-logs');
    if (!logs) return;
    const actions = ["PACKET_RECV", "ENCRYPT_UPLINK", "OMEGA_SYNC", "BYPASS_AUTH", "GEO_LOCATE", "CACHE_PURGE"];
    const log = `[${new Date().toLocaleTimeString()}] ${actions[Math.floor(Math.random()*actions.length)]} :: ${Math.random().toString(16).substring(2, 10)} - SUCCESS<br>`;
    logs.innerHTML = log + logs.innerHTML;
    if (logs.innerHTML.length > 2000) logs.innerHTML = logs.innerHTML.substring(0, 2000);
}