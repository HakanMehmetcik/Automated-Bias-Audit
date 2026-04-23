/**
 * IR Scholar Researcher - 2026 Core Logic
 */

// 1. Initial State Check (The Smart Button logic)
async function checkInitialization() {
    const { gemini_key, deepseek_key } = await chrome.storage.local.get(['gemini_key', 'deepseek_key']);
    const btn = document.getElementById('analyzeBtn');
    const status = document.getElementById('status');

    if (!gemini_key || !deepseek_key) {
        btn.innerText = "SET API KEYS AT FIRST";
        btn.style.backgroundColor = "#cc0000"; // Red to grab attention
        status.innerText = "Credentials required to proceed.";
        return false;
    }
    
    btn.innerText = "RUN COMPARATIVE ANALYSIS";
    btn.style.backgroundColor = "#003366"; // Standard blue
    status.innerText = "Ready for Comparative IR Audit";
    return true;
}

// 2. Generic API Handler
async function callAPI(url, model, messages, apiKey) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model: model, messages: messages, temperature: 0.3 })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || `API Error ${response.status}`);
    return data.choices[0].message.content;
}

// 3. Main Logic Execution
document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const isReady = await checkInitialization();
    if (!isReady) {
        chrome.runtime.openOptionsPage();
        return;
    }

    const status = document.getElementById('status');
    const geminiDiv = document.getElementById('geminiResult');
    const deepseekDiv = document.getElementById('deepseekResult');
    const auditDiv = document.getElementById('auditResult');
    
    geminiDiv.innerText = "Analyzing...";
    deepseekDiv.innerText = "Analyzing...";
    auditDiv.innerText = "Awaiting comparison...";
    
    const { gemini_key, deepseek_key } = await chrome.storage.local.get(['gemini_key', 'deepseek_key']);
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    status.innerText = "Status: Scraping content...";

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body ? document.body.innerText : ""
    }, async (results) => {
        try {
            if (!results || !results[0].result) throw new Error("Scraping failed. Refresh page.");

            const text = results[0].result.slice(0, 8000);
            status.innerText = "Status: Contacting Dual APIs...";

            const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
            const deepseekUrl = "https://api.deepseek.com/chat/completions";

            // STEP 1: Side-by-Side Analysis
            const [geminiRes, deepseekRes] = await Promise.allSettled([
                callAPI(geminiUrl, "gemini-2.5-flash", [{role: "user", content: `As an IR scholar, analyze core arguments: ${text}`}], gemini_key),
                callAPI(deepseekUrl, "deepseek-chat", [{role: "user", content: `As an IR scholar, analyze core arguments: ${text}`}], deepseek_key)
            ]);

            geminiDiv.innerText = geminiRes.status === "fulfilled" ? geminiRes.value : geminiRes.reason;
            deepseekDiv.innerText = deepseekRes.status === "fulfilled" ? deepseekRes.value : deepseekRes.reason;

            // STEP 2: Synthesis Audit
            if (geminiRes.status === "fulfilled" && deepseekRes.status === "fulfilled") {
                status.innerText = "Status: Running Scholarly Audit...";
                const auditPrompt = `Compare these two reports and audit for Western (USA) vs. Non-Western (Global South) bias:\n\nGemini: ${geminiRes.value}\n\nDeepSeek: ${deepseekRes.value}`;
                const auditRes = await callAPI(geminiUrl, "gemini-2.5-flash", [{role: "user", content: auditPrompt}], gemini_key);
                auditDiv.innerText = auditRes;
                status.innerText = "Status: Audit Complete.";
            }

        } catch (err) {
            status.innerText = "Error: " + err.message;
        }
    });
});

// Run check when popup opens
checkInitialization();

// Link logic
document.getElementById('openSettings').onclick = (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
};