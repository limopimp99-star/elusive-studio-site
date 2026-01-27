// --- CONFIGURATION ---
const WEBHOOK_URL = "https://mrlive305.app.n8n.cloud/webhook/90fafa48-444e-4e52-a536-72f748c5c01f";
let isVerified = false;
let hasGreeted = false;

// --- CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Allows interaction to trigger audio (browser security requirement)
    document.body.addEventListener('click', () => {
        if (!hasGreeted && !isVerified) {
            initializeEmpireGreeting();
            hasGreeted = true;
        }
    }, { once: true });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
            else entry.target.classList.remove('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-fade-section').forEach(s => fadeObserver.observe(s));
});

// --- GLITCH EFFECT ---
function triggerGlitch() {
    const dash = document.getElementById('war-room-dashboard');
    if (!dash) return;
    dash.style.filter = "invert(1) hue-rotate(90deg) contrast(150%)";
    setTimeout(() => { dash.style.filter = "none"; }, 70);
}

// --- SYSTEM GREETING ---
function initializeEmpireGreeting() {
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.classList.remove('closed'); 
    const welcomeMsg = "Systems online. Restricted airspace. Provide credentials.";
    speak(welcomeMsg);
    appendMessage("AGENT ADAM", "<strong>SYSTEM INITIALIZED:</strong> " + welcomeMsg);
}

// --- VOICE ENGINE (ELEVENLABS + FALLBACK) ---
async function speak(audioData) {
    // FALLBACK: If audioData is just a string (text), use browser synthesis
    if (typeof audioData === 'string') {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(audioData);
        msg.rate = 0.9;
        msg.pitch = 0.8;
        window.speechSynthesis.speak(msg);
        return;
    }

    // ELEVENLABS: If audioData is an ArrayBuffer (binary)
    const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    const avatar = document.getElementById('adam-visual');
    audio.onplay = () => { 
        if (avatar) avatar.style.filter = "grayscale(0) brightness(1.2) drop-shadow(0 0 10px #ef4444)"; 
    };
    audio.onended = () => { 
        if (avatar) avatar.style.filter = "grayscale(1) sepia(1) hue-rotate(-50deg)"; 
        URL.revokeObjectURL(audioUrl); // Clean up memory
    };
    audio.play();
}

// --- MESSAGE HELPERS ---
function appendMessage(role, text) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const color = role === 'YOU' ? '#fff' : '#ef4444';
    const align = role === 'YOU' ? 'right' : 'left';
    container.innerHTML += `<div class="msg" style="margin-bottom:12px; color:${color}; text-align:${align}; font-family:monospace;"><strong>${role}:</strong> ${text}</div>`;
    container.scrollTop = container.scrollHeight;
}

// --- WEBHOOK HANDLER ---
async function sendToWebhook(text, agentName, outputFn) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const contentType = response.headers.get("content-type");

        // 1. Handle Audio Response (Binary Stream)
        if (contentType && contentType.includes("audio")) {
            const audioBuffer = await response.arrayBuffer();
            speak(audioBuffer);
            outputFn(agentName, "Directive received. Processing...");
        } 
        // 2. Handle Text Response (JSON)
        else {
            const data = await response.json();
            const reply = data.output || data.text || "Uplink stable.";
            outputFn(agentName, reply);
            speak(reply); // Uses browser voice fallback
        }
    } catch (err) {
        outputFn("SYSTEM", "Link unstable. Check n8n execution.");
    }
}

// --- CHAT INTERFACE HANDLERS ---
window.sendMessage = async function() {
    const input = document.getElementById('user-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    appendMessage("YOU", text);
    input.value = "";

    if (text.toUpperCase() === "OMEGA") { enterWarRoom(); return; }
    if (!isVerified) { speak("Identity unverified."); return; }
    
    sendToWebhook(text, "AGENT ADAM", appendMessage);
};

window.sendWarMessage = async function() {
    const input = document.getElementById('war-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    
    triggerGlitch();

    const chatContainer = document.getElementById('war-room-chat');
    chatContainer.innerHTML += `<div style="margin-bottom:15px; text-align:right; color:white;"><strong>YOU:</strong> ${text}</div>`;
    input.value = "";

    sendToWebhook(text, "ADAM", (role, reply) => {
        chatContainer.innerHTML += `<div style="margin-bottom:15px; color:#ef4444;"><strong>${role}:</strong> <span style="color:#aaa">${reply}</span></div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
};

// --- THE WAR ROOM UI ---
function enterWarRoom() {
    isVerified = true;
    speak("Access Granted. Neural link established.");
    
    const main = document.querySelector('main');
    if (main) main.style.display = 'none';
    
    document.body.style.backgroundColor = "#050505";
    document.body.style.overflow = "hidden";
    
    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";
    dashboard.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9999; background:#050505; display:flex; font-family:monospace;`;
    
    dashboard.innerHTML = `
        <style>
            .war-container { display: flex; width: 100%; height: 100%; flex-direction: row; }
            .side-panel { width: 350px; border-right: 1px solid #ef4444; display: flex; flex-direction: column; background: rgba(10,10,10,0.9); }
            .center-panel { flex: 1; padding: 40px; overflow-y: auto; border-right: 1px solid #222; }
            .log-panel { width: 250px; background: #000; padding: 15px; font-size: 0.65rem; color: #0f0; overflow: hidden; }
            .op-card { border: 1px solid #222; padding: 20px; cursor: pointer; transition: 0.3s; background: #0a0a0a; margin-bottom:10px; }
            .op-card:hover { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
            @media (max-width: 768px) {
                .war-container { flex-direction: column; overflow-y: auto; }
                .side-panel { width: 100%; height: auto; border-right: none; border-bottom: 1px solid #ef4444; }
                .center-panel { width: 100%; padding: 20px; }
                .log-panel { display: none; }
            }
        </style>
        <div class="war-container">
            <div class="side-panel">
                <div style="padding: 20px; text-align: center; border-bottom: 1px solid #333;">
                    <img id="adam-visual" src="war-room-logo.png" style="width:100px; height:100px; border:1px solid #ef4444; filter:grayscale(1) sepia(1); transition: 0.3s;">
                    <h2 style="color: #ef4444; font-size: 0.8rem; margin-top: 10px;">AGENT ADAM V.2.0</h2>
                </div>
                <div id="war-room-chat" style="flex: 1; overflow-y: auto; padding: 20px; font-size: 0.8rem; color:#ccc;"></div>
                <div style="padding: 20px; border-top: 1px solid #333;">
                    <input type="text" id="war-input" placeholder="DIRECTIVE..." 
                        style="width:100%; background:transparent; border:1px solid #ef4444; color:white; padding:10px;" 
                        onkeypress="if(event.key === 'Enter') window.sendWarMessage()">
                </div>
            </div>
            <div class="center-panel">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                    <h1 style="color:white; font-size:1.2rem; letter-spacing:2px;">COMMAND CENTER</h1>
                    <button onclick="location.reload()" style="background:transparent; border:1px solid #ef4444; color:#ef4444; padding:5px 15px; cursor:pointer;">EXIT</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div class="op-card" onclick="window.requestServiceDetail('AI')"><h3>AI CLONES</h3><p>Syncing...</p></div>
                    <div class="op-card" onclick="window.requestServiceDetail('DISTRO')"><h3>UPLINK</h3><p>Streaming...</p></div>
                    <div class="op-card" onclick="window.requestServiceDetail('WEB')"><h3>INFRASTRUCTURE</h3><p>Secure...</p></div>
                    <div class="op-card" onclick="window.requestServiceDetail('LLC')"><h3>LEGAL/LLC</h3><p>Protected...</p></div>
                </div>
            </div>
            <div class="log-panel">
                <div style="color:#ef4444; margin-bottom:10px; font-weight:bold;">LIVE_LOG_FEED</div>
                <div id="system-logs"></div>
            </div>
        </div>
    `;
    document.body.appendChild(dashboard);

    // Sync messages from bouncer to War Room
    const oldChat = document.getElementById('chat-messages');
    const newChat = document.getElementById('war-room-chat');
    if (oldChat && newChat) newChat.innerHTML = oldChat.innerHTML;

    // Start Fake Logs
    setInterval(() => {
        const logs = document.getElementById('system-logs');
        if(logs) {
            logs.innerHTML = `[${new Date().toLocaleTimeString()}] RECV_PACKET_${Math.floor(Math.random()*999)}... OK<br>` + logs.innerHTML.substring(0, 500);
        }
    }, 2000);
}

const serviceIntel = { 
    'LLC': "Total liability protection initialized.", 
    'AI': "24/7 Digital Twin generation active.", 
    'DISTRO': "Multi-platform restreaming engaged.", 
    'WEB': "Proprietary server ecosystems online." 
};

window.requestServiceDetail = (type) => {
    const detail = serviceIntel[type];
    const chat = document.getElementById('war-room-chat');
    if (chat) {
        chat.innerHTML += `<div style="margin-bottom:15px;"><strong style="color:#ef4444">ADAM:</strong> <span style="color:#aaa">${detail}</span></div>`;
        chat.scrollTop = chat.scrollHeight;
    }
    speak(detail);
};