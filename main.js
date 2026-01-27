// --- CONFIGURATION ---
const WEBHOOK_URL = "https://mrlive305.app.n8n.cloud/webhook/90fafa48-444e-4e52-a536-72f748c5c01f";
let isVerified = false;
let hasGreeted = false;

// --- CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', () => {
        if (!hasGreeted && !isVerified) {
            initializeEmpireGreeting();
            hasGreeted = true;
        }
    }, { once: false });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
            else entry.target.classList.remove('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-fade-section').forEach(s => fadeObserver.observe(s));

    if (typeof initLiquidBg === "function") initLiquidBg();
    console.log("Empire Systems Online.");
});

// --- NEW: GLITCH EFFECT ---
function triggerGlitch() {
    const dash = document.getElementById('war-room-dashboard');
    if (!dash) return;
    dash.style.filter = "invert(1) hue-rotate(90deg) contrast(150%)";
    dash.style.transform = "skewX(1deg)";
    setTimeout(() => {
        dash.style.filter = "none";
        dash.style.transform = "none";
    }, 70);
}

// --- SYSTEM GREETING PROTOCOL ---
function initializeEmpireGreeting() {
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.classList.remove('closed'); 

    const welcomeMsg = "Systems online. You are entering a restricted web space. Provide credentials to secure the empire.";
    speak(welcomeMsg);
    appendMessage("AGENT ADAM", "<strong>SYSTEM INITIALIZED:</strong> " + welcomeMsg);
}

// --- TALKING AVATAR SPEAK FUNCTION (GLOBAL) ---
async function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.85; 
    msg.pitch = 0.7; 

    const avatar = document.getElementById('adam-visual');
    const mouth = document.getElementById('mouth-freq');

    msg.onstart = () => {
        if (avatar) avatar.style.filter = "grayscale(0) brightness(1.2) drop-shadow(0 0 10px #ef4444)";
        if (mouth) {
            mouth.style.display = 'block';
            mouth.animate([
                { height: '2px', opacity: 0.5 }, { height: '15px', opacity: 1 }, { height: '4px', opacity: 0.7 }
            ], { duration: 150, iterations: Infinity });
        }
    };

    msg.onend = () => {
        if (avatar) avatar.style.filter = "grayscale(1) sepia(1) hue-rotate(-50deg)";
        if (mouth) mouth.style.display = 'none';
    };

    window.speechSynthesis.speak(msg);
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

// --- CHAT HANDLERS ---
window.sendMessage = async function() {
    const input = document.getElementById('user-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    
    appendMessage("YOU", text);
    input.value = "";

    if (text.toUpperCase() === "OMEGA") {
        enterWarRoom();
        return;
    }

    if (!isVerified) {
        speak("Identity unverified.");
        appendMessage("AGENT ADAM", "NEGATORY. Enter OMEGA code to proceed.");
        return;
    }
    sendToWebhook(text, "AGENT ADAM", appendMessage);
};

window.sendWarMessage = async function() {
    const input = document.getElementById('war-input');
    const text = input.value.trim();
    if (!text) return;

    triggerGlitch(); // GLITCH ON SEND

    const chatContainer = document.getElementById('war-room-chat');
    chatContainer.innerHTML += `<div style="margin-bottom:15px; text-align:right;"><strong style="color:white">YOU:</strong> <span style="color:#eee">${text}</span></div>`;
    input.value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    sendToWebhook(text, "ADAM", (role, reply) => {
        chatContainer.innerHTML += `<div style="margin-bottom:15px;"><strong style="color:#ef4444">${role}:</strong> <span style="color:#aaa">${reply}</span></div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
};

async function sendToWebhook(text, agentName, outputFn) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        const reply = data.output || data.text || "Uplink stable.";
        outputFn(agentName, reply);
        speak(reply);
    } catch (err) {
        outputFn("SYSTEM", "Link unstable.");
    }
}

// --- THE WAR ROOM (FIXED LAYOUT) ---
function enterWarRoom() {
    isVerified = true;
    speak("Access Granted. Neural link established.");
    
    document.querySelector('main').style.display = 'none';
    if(document.querySelector('elusive-header')) document.querySelector('elusive-header').style.display = 'none';
    if(document.getElementById('ai-bouncer')) document.getElementById('ai-bouncer').style.display = 'none';
    
    document.body.style.backgroundColor = "#050505";
    document.body.style.overflow = "hidden";
    
    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";
    // ADDED TRANSITION FOR GLITCH
    dashboard.style = `position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9999; 
                       background: #050505; display: grid; grid-template-columns: 350px 1fr 250px; font-family: monospace; transition: all 0.05s ease;`;
    
    dashboard.innerHTML = `
        <div style="background: rgba(10,10,10,0.9); border-right: 1px solid #ef4444; display: flex; flex-direction: column;">
            <div style="padding: 20px; text-align: center; border-bottom: 1px solid #333;">
                <div style="width: 120px; height: 120px; margin: 0 auto 15px; border: 1px solid #ef4444; position: relative; background: #000;">
                    <img id="adam-visual" src="war-room-logo.png" style="width:100%; height:100%; object-fit:cover; filter: grayscale(1) sepia(1) hue-rotate(-50deg);">
                    <div id="mouth-freq" style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%); width:40px; height:2px; background:#ef4444; display:none;"></div>
                </div>
                <h2 style="color: #ef4444; font-size: 0.9rem; margin: 0;">AGENT ADAM V.2.0</h2>
            </div>
            <div id="war-room-chat" style="flex: 1; overflow-y: auto; padding: 20px; color: #aaa; font-size: 0.8rem;"></div>
            <div style="padding: 20px; border-top: 1px solid #333;">
                <input type="text" id="war-input" placeholder="DIRECTIVE..." 
                       style="width: 100%; background: transparent; border: 1px solid #ef4444; color: white; padding: 10px;"
                       onkeypress="if(event.key === 'Enter') window.sendWarMessage()">
            </div>
        </div>

        <div style="padding: 40px; overflow-y: auto; border-right: 1px solid #222;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <h1 style="color: white; font-size: 1.2rem; letter-spacing: 2px; margin:0;">COMMAND CENTER</h1>
                <button onclick="location.reload()" style="background:transparent; border:1px solid #ef4444; color:#ef4444; padding:5px 15px; cursor:pointer; font-size:0.7rem; font-family:monospace;">EXIT_SESSION</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div class="op-card" onclick="window.requestServiceDetail('AI')"><h3>AI CLONES</h3><p>Active units syncing...</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('DISTRO')"><h3>GLOBAL UPLINK</h3><p>Streaming 24/7...</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('WEB')"><h3>INFRASTRUCTURE</h3><p>Omega-1 secure...</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('LLC')"><h3>LLC FORMATION</h3><p>Asset protection: ON</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('PROD')"><h3>PRODUCTION</h3><p>Viral hooks ready...</p></div>
                <div class="op-card" onclick="window.requestServiceDetail('DESIGN')"><h3>BRANDING</h3><p>Visual dominance...</p></div>
            </div>
        </div>

        <div style="background: #000; padding: 15px; font-size: 0.65rem; color: #0f0; overflow: hidden;">
            <div style="color: #ef4444; margin-bottom: 10px; font-weight: bold;">LIVE_LOG_FEED</div>
            <div id="system-logs"></div>
        </div>
    `;
    document.body.appendChild(dashboard);

    // Sync messages
    const oldMessages = document.getElementById('chat-messages');
    if (oldMessages) document.getElementById('war-room-chat').innerHTML = oldMessages.innerHTML;

    // Start Log Feed
    setInterval(() => {
        const logs = document.getElementById('system-logs');
        if(!logs) return;
        const entry = `[${new Date().toLocaleTimeString()}] RECV_DATA_PACKET_${Math.floor(Math.random()*999)}... OK<br>`;
        logs.innerHTML = entry + logs.innerHTML;
    }, 2000);
}

const serviceIntel = {
    'LLC': "Bedrock formation. Total liability protection.",
    'AI': "Digital Twin capture. 24/7 content generation.",
    'DISTRO': "Presence is power. Simultaneous multi-platform restreaming.",
    'PROD': "Retention-first editing for viral dominance.",
    'WEB': "Proprietary ecosystems. You own the data.",
    'DESIGN': "High-authority visual branding."
};

window.requestServiceDetail = (type) => {
    const detail = serviceIntel[type];
    const chatContainer = document.getElementById('war-room-chat');
    chatContainer.innerHTML += `<div style="margin-bottom:15px;"><strong style="color:#ef4444">ADAM:</strong> <span style="color:#aaa">${detail}</span></div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
    speak(detail);
};