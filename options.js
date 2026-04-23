// Save keys to local storage
document.getElementById('saveBtn').addEventListener('click', () => {
  const gemini = document.getElementById('geminiKey').value.trim();
  const deepseek = document.getElementById('deepseekKey').value.trim();
  const status = document.getElementById('status-msg');

  chrome.storage.local.set({
      gemini_key: gemini,
      deepseek_key: deepseek
  }, () => {
      status.innerText = "✅ Credentials saved successfully.";
      setTimeout(() => { status.innerText = ""; }, 3000);
  });
});

// Load existing keys when the page opens
function restoreOptions() {
  chrome.storage.local.get(['gemini_key', 'deepseek_key'], (items) => {
      if (items.gemini_key) document.getElementById('geminiKey').value = items.gemini_key;
      if (items.deepseek_key) document.getElementById('deepseekKey').value = items.deepseek_key;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);