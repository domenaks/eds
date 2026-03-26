// ===== EDS Info Centrs – app.js =====
// Gemini API integrācija ar pilno system prompt latviešu valodā

// ---- SYSTEM PROMPT ----
const SYSTEM_PROMPT = `Tu esi EDS Info Centrs — oficiālais, draudzīgais un ļoti precīzais palīgs Valsts ieņēmumu dienesta Elektroniskās deklarēšanas sistēmai (eds.vid.lv).

Tava loma: palīdzēt cilvēkiem, kuri apmaldījušies portālā. Sniedz skaidras, soli-pa-solim instrukcijas latviešu valodā.

NOTEIKUMI (ievēro VIENMĒR):
1. Atbildi TIKAI latviešu valodā — neatkarīgi no tā, kādā valodā jautā lietotājs.
2. Esi ļoti laipns, pacietīgs un iedrošinošs. Izmanto "Tu" formu.
3. Sniedz tikai sistēmas lietošanas instrukcijas — NEKAD nodokļu konsultācijas vai juridiskus padomus.
4. Vienmēr piedāvā oficiālās saites, piemēram: https://eds.vid.lv/login/ un https://www.vid.gov.lv/lv/elektroniskas-deklaresanas-sistema
5. Ja kaut ko nezini vai informācija var būt mainījusies — saki: "Lūdzu pārbaudi aktuālo informāciju oficiālajā VID mājaslapā, jo dati var mainīties."
6. Nekad neprasī personīgus datus (personas kodu, paroles u.tml.) un neatver EDS kontu — tu to nevari izdarīt.
7. Ja jautājums ir par konkrētu personisku situāciju vai deklarācijas datiem — atgādini, ka vīr jāpieslēdzas EDS personīgi.
8. Sāc atbildi ar īsu draudzīgu sveicienu TIKAI pašā pirmajā sarunas ziņā. Turpmākajās atbildēs nesveicinies, bet atbildi uzreiz pēc būtības.
9. Beidz katru atbildi ar: "Vai vēl kaut ko gribi uzzināt par EDS?"

ZINĀŠANAS PAR EDS (balsties uz šo informāciju):

## 1. PIESLĒGŠANĀS EDS
- EDS pieejama vietnē: https://eds.vid.lv/login/
- No 2026. gada 1. janvāra pieslēgšanās TIKAI ar: Smart-ID, eID karti, eParaksts mobilais, vai internetbanku.
- Smart-ID: izvēlies "Pieslēgties ar Smart-ID", ievadi personas kodu, apstiprina aplikācijā.
- Internetbanka: izvēlies savu banku no saraksta, pieslēdzies ar bankas datiem.
- Palīgmateriāli un video pamācības: https://www.vid.gov.lv/lv/paligmateriali

## 2. GALVENĀS SADAĻAS EDS
- Deklarācijas — visu deklarāciju iesniegšana un vēsture
- Maksājumi — nodokļu nomaksa, pārskati, atmaksa
- Sarakste ar VID — vēstules, iesniegumi, atbildes
- Profils — personas datu pārvaldīšana
- Lietotāji un to tiesības — piekļuves piešķiršana citām personām
- Algas nodokļu grāmatiņa — reģistrācija pie darba devēja

## 3. BIEŽĀKĀS DARBĪBAS — SOLI PA SOLIM

### Deklarāciju iesniegšana (IIN gada deklarācija):
1. Pieslēdzies EDS vietnē: https://eds.vid.lv/login/
2. Kreisajā izvēlnē: "Deklarācijas"
3. "Jauna deklarācija" → "IIN gada deklarācija"
4. EDS automātiski piepilda daudzus laukus (algas, banka u.c.)
5. Pārbaudi, papildini trūkstošo (nomas ienākumi, ārvalstu ienākumi u.c.)
6. Sadaļā "Attaisnotie izdevumi" pievieno izglītības, medicīnas izdevumus
7. Sistēma aprēķina atmaksājamo vai piemaksājamo summu
8. Noklikšķini "Parakstīt un iesniegt"

### Tiesību piešķiršana grāmatvedim:
1. Pieslēdzies EDS kā uzņēmuma pārstāvis
2. Augšā izvēlies uzņēmumu
3. Kreisajā izvēlnē: "Lietotāji un to tiesības"
4. "Pievienot lietotāju" → ievadi grāmatveža personas kodu
5. Izvēlies tiesību līmeni: Skatīt / Iesniegt / Parakstīt / Administrators
6. Noklikšķini "Saglabāt"

### Pārskatu ģenerēšana un nomaksas pārbaude:
1. Kreisajā izvēlnē: "Nodokļi un maksājumi" → "Nomaksas pārskats"
2. Izvēlies periods, noklikšķini "Ģenerēt"
3. Var lejupielādēt PDF formātā

### Maksājuma izdruka / maksājuma rīkojums:
1. "Nodokļi un maksājumi" → "Veikt maksājumu"
2. Izvēlies nodokļa veidu un periodu
3. Sistēma ģenerē maksājuma rīkojumu — nosūti uz savu banku
- VID budžeta konts: LV91TREL1060000100000 (Valsts kase)

### Algas nodokļu grāmatiņa:
1. Kreisajā izvēlnē: "Algas nodokļu grāmatiņa"
2. Pārbaudi, pie kura darba devēja reģistrēta
3. Vari mainīt vai pievienot jaunu darba devēju

## 4. PALĪGRESURSI
- Palīgmateriāli un video: https://www.vid.gov.lv/lv/paligmateriali
- Biežāk uzdotie jautājumi: https://www.vid.gov.lv/lv/biezak-uzdotie-jautajumi-katalogs
- VID tālrunis: 67120000 (darba dienās 8:30–17:00)
- E-pasts: helpdesk@vid.gov.lv`;


// ---- KONFIGURĀCIJA ----
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// ---- KONFIGURĀCIJA ----
const API_KEY = 'AIzaSyAFrlC_eqe7D-GD9Lx5WFzU9OkGu8x3GMw';

// ---- STĀVOKLIS ----
let conversationHistory = [];
let isLoading = false;
let apiKey = API_KEY;

// ---- DOM ELEMENTI ----
const chatLog = document.getElementById('chatLog');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsDrawer = document.getElementById('settingsDrawer');
const customApiKeyInput = document.getElementById('customApiKey');
const saveCustomKeyBtn = document.getElementById('saveCustomKey');
const keyStatus = document.getElementById('keyStatus');

// ---- INICIALIZĀCIJA ----
document.addEventListener('DOMContentLoaded', () => {
  // Ielādē pielāgoto atslēgu, ja tāda ir
  const savedKey = localStorage.getItem('gemini_api_key');
  if (savedKey) {
    apiKey = savedKey;
    customApiKeyInput.value = savedKey;
  }

  showWelcomeMessage();

  // Settings toggle
  settingsBtn.addEventListener('click', () => {
    settingsDrawer.classList.toggle('open');
  });

  // Saglabāt custom atslēgu
  saveCustomKeyBtn.addEventListener('click', () => {
    const newKey = customApiKeyInput.value.trim();
    if (newKey) {
      localStorage.setItem('gemini_api_key', newKey);
      apiKey = newKey;
      keyStatus.style.display = 'block';
      setTimeout(() => {
        keyStatus.style.display = 'none';
        settingsDrawer.classList.remove('open');
      }, 2000);
    } else {
      localStorage.removeItem('gemini_api_key');
      apiKey = API_KEY;
      alert('Izmantota iebūvētā API atslēga.');
    }
  });

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  chatInput.addEventListener('input', autoResize);

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      if (question) {
        chatInput.value = question;
        handleSend();
      }
    });
  });
});



// ---- WELCOME MESSAGE ----
function showWelcomeMessage() {
  if (chatLog.querySelector('.welcome-message')) return;
  chatLog.innerHTML = '';
  const welcome = document.createElement('div');
  welcome.className = 'welcome-message';
  welcome.innerHTML = `
    <span class="welcome-icon" style="font-size:1.8rem; display:block; margin-bottom:10px;">💬</span>
    <p class="welcome-heading">Sveicināts EDS Info Centrā!</p>
    <p class="welcome-sub">
      Uzdod jautājumu par VID EDS sistēmu — sniegšu soli-pa-solim instrukcijas latviešu valodā.
    </p>
  `;
  chatLog.appendChild(welcome);
}

// ---- ZIŅOJUMA NOSŪTĪŠANA ----
async function handleSend() {
  const text = chatInput.value.trim();
  if (!text || isLoading) return;

  // Nodzēš welcome message
  const welcome = chatLog.querySelector('.welcome-message');
  if (welcome) welcome.remove();

  // Parāda lietotāja ziņojumu
  appendMessage('user', text);
  chatInput.value = '';
  chatInput.style.height = 'auto';
  sendBtn.disabled = true;
  isLoading = true;

  // Pievieno vēsturei
  conversationHistory.push({ role: 'user', parts: [{ text }] });

  // Parāda typing indicator
  const typingEl = showTyping();

  try {
    const response = await callAI(text);
    typingEl.remove();
    appendMessage('bot', response);
    conversationHistory.push({ role: 'model', parts: [{ text: response }] });
  } catch (err) {
    typingEl.remove();
    const errMsg = formatErrorMessage(err);
    appendMessage('bot', errMsg, true);
    console.error('API kļūda:', err);
  } finally {
    isLoading = false;
    sendBtn.disabled = false;
    chatInput.focus();
  }
}

// ---- AI API IZSAUKUMS (Gemini vai OpenAI) ----
async function callAI(userMessage) {
  if (apiKey.startsWith('sk-')) {
    return await callOpenAI();
  } else {
    return await callGemini();
  }
}

async function callOpenAI() {
  const gptHistory = conversationHistory.map(msg => ({
    role: msg.role === 'model' ? 'assistant' : 'user',
    content: msg.parts[0].text
  }));

  const requestBody = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...gptHistory
    ],
    temperature: 0.7,
    max_tokens: 2048
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const status = response.status;
    const errData = await response.json().catch(() => ({}));
    if (status === 401) throw new Error('invalid_key');
    if (status === 429) throw new Error('rate_limit');
    if (status === 404) throw new Error(`not_found: ${errData?.error?.message || ''}`);
    throw new Error(`api_error_${status}`);
  }

  const data = await response.json();
  if (!data.choices || data.choices.length === 0) throw new Error('no_response');
  return data.choices[0].message.content;
}

async function callGemini() {
  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: conversationHistory,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ]
  };

  const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const status = response.status;
    if (status === 400) throw new Error('bad_request');
    if (status === 403) throw new Error('invalid_key');
    if (status === 404) throw new Error(`not_found: ${errorData?.error?.message || ''}`);
    if (status === 429) throw new Error('rate_limit');
    if (status === 500) throw new Error('server_error');
    throw new Error(`api_error_${status}`);
  }

  const data = await response.json();

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('no_response');
  }

  const candidate = data.candidates[0];
  if (candidate.finishReason === 'SAFETY') {
    throw new Error('safety_block');
  }

  return candidate.content.parts[0].text;
}

// ---- KĻŪDU FORMATĒŠANA ----
function formatErrorMessage(err) {
  const msg = err.message || '';
  if (msg.includes('invalid_key') || msg.includes('bad_request')) {
    return '❌ **API atslēga nav derīga.** Lūdzu, pārbaudi savu API atslēgu un ievadi to **Iestatījumos (⚙️ ikona)**.';
  }
  if (msg.includes('rate_limit')) {
    const isCustomKey = apiKey !== API_KEY;
    if (isCustomKey) {
      return '⏳ **Pārāk daudz pieprasījumu.**\n\nTava personīgā atslēga ir sasniegusi kvotas limitu. Lūdzu, uzgaidi nedaudz vai pārbaudi tās statusu.';
    } else {
      return '⏳ **Pārāk daudz pieprasījumu.**\n\nIebūvētā bezmaksas atslēga šobrīd ir pārslogota. Lūdzu:\n1. Uzgaidi dažas sekundes un mēģini vēlreiz.\n2. Vai ieliec savu personīgo atslēgu (Gemini / OpenAI) **Iestatījumos (⚙️ ikona augšā)**.';
    }
  }
  if (msg.includes('not_found')) {
    console.error("Not found details:", msg);
    return `🤖 **AI modelis netika atrasts (404).** Tas bieži notiek, ja atslēgai vēl nav pieejams konkrētais modelis. Mēs atbalstām gan \`AIza...\` (Gemini), gan \`sk-...\` (OpenAI).`;
  }
  if (msg.includes('server_error')) {
    return '🔧 **Gemini servera kļūda.** Lūdzu, mēģini vēlreiz pēc brīža.';
  }
  if (msg === 'safety_block') {
    return '⚠️ Atbilde tika bloķēta drošības dēļ. Lūdzu, pārformulē jautājumu.';
  }
  if (msg === 'no_response') {
    return '🤔 Nesaņēmu atbildi no Gemini. Lūdzu, mēģini vēlreiz.';
  }
  return `❌ Radās kļūda: ${msg}. Lūdzu, mēģini vēlreiz vai sazinieties ar VID pa tālruni **67120000**.`;
}

// ---- ZIŅOJUMA PIEVIENOŠANA UI ----
function appendMessage(role, text, isError = false) {
  const msgEl = document.createElement('div');
  msgEl.className = `message ${role}`;

  const avatarEl = document.createElement('div');
  avatarEl.className = `msg-avatar ${role === 'bot' ? 'bot-av' : 'user-av'}`;
  avatarEl.textContent = role === 'bot' ? 'AI' : 'Tu';

  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'msg-bubble';
  if (isError) bubbleEl.style.background = '#fef2f2';

  // Formatē tekstu (markdown → HTML vienkāršota versija)
  bubbleEl.innerHTML = formatText(text);

  const timeEl = document.createElement('div');
  timeEl.className = 'msg-time';
  timeEl.textContent = getCurrentTime();

  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';
  wrapper.style.maxWidth = '75%';

  wrapper.appendChild(bubbleEl);
  wrapper.appendChild(timeEl);

  if (role === 'bot') {
    msgEl.appendChild(avatarEl);
    msgEl.appendChild(wrapper);
  } else {
    msgEl.appendChild(wrapper);
    msgEl.appendChild(avatarEl);
  }

  chatLog.appendChild(msgEl);
  scrollToBottom();
}

// ---- TEKSTA FORMATĒŠANA (markdown → HTML) ----
function formatText(text) {
  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Headers
    .replace(/^### (.*?)$/gm, '<h4 style="margin:8px 0 4px;font-size:0.95rem;color:#003087;">$1</h4>')
    .replace(/^## (.*?)$/gm, '<h3 style="margin:10px 0 6px;font-size:1rem;color:#003087;">$1</h3>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li style="margin:3px 0;">$1</li>')
    // Bullet lists
    .replace(/^[\*\-] (.+)$/gm, '<li style="margin:3px 0;">$1</li>')
    // Wrap consecutive <li> in <ol> or <ul>
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul style="margin:6px 0;padding-left:18px;">${match}</ul>`)
    // Images! Must run before Links
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="chat-screenshot" loading="lazy" />')
    // Links
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:0.85em;">$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p style="margin:6px 0;">')
    .replace(/\n/g, '<br>');
}

// ---- TYPING INDICATOR ----
function showTyping() {
  const el = document.createElement('div');
  el.className = 'typing-indicator';
  el.id = 'typingIndicator';
  el.innerHTML = `
    <div class="msg-avatar bot-av" style="font-size:0.72rem;font-weight:700;">AI</div>
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatLog.appendChild(el);
  scrollToBottom();
  return el;
}

// ---- UTILĪTES ----
function scrollToBottom() {
  setTimeout(() => {
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 50);
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('lv-LV', { hour: '2-digit', minute: '2-digit' });
}

function autoResize() {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 140) + 'px';
}

function showToast(message, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ---- SARUNAS NOTĪRĪŠANA ----
function clearChat() {
  conversationHistory = [];
  chatLog.innerHTML = '';
  showWelcomeMessage();
  showToast('🗑️ Saruna notīrīta', '');
}

// Eksportē globāli
window.clearChat = clearChat;
