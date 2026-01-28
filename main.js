// --- CONFIGURATION ---
// Use the PRODUCTION URL for 24/7 reliability
const WEBHOOK_URL = "https://mrlive305.app.n8n.cloud/webhook/90fafa48-444e-4e52-a536-72f748c5c01f";

// ... [Keep your other variables and initialization code] ...

// --- WEBHOOK HANDLER (SILENT TEXT MODE) ---
async function sendToWebhook(text, agentName, outputFn, targetId) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: text,
                user_status: isVerified ? "Verified_Omega" : "Guest"
            })
        });

        if (!response.ok) throw new Error('Uplink failed');

        const data = await response.json();
        
        // This looks for the 'output' property you set in your n8n Respond node
        const reply = data.output || "Directive logged. Provisioning in progress...";
        
        outputFn(agentName, reply, targetId);

        // We are NOT calling speak(reply) here to keep the chat silent and fast.
    } catch (err) {
        console.error("n8n Error:", err);
        outputFn("SYSTEM", "Link unstable. Agent Adam is currently syncing data. Try again in a moment.", targetId);
    }
}

// --- SILENCED VOICE ENGINE ---
async function speak(audioData) {
    // We only want the voice engine to work for the initial MP3 files.
    // If the chat tries to send a string to this function, we ignore it.
    if (typeof audioData === 'string') {
        return; 
    }

    // [Keep the rest of the buffer-handling logic for n8n audio if needed later]
}