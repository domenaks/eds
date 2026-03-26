# 🏛️ EDS Info Centrs

> **AI palīgasistents VID Elektroniskajā deklarēšanas sistēmā (EDS)**

Pagaidu landing page ar iebūvētu Gemini AI chatbotu, kas palīdz Latvijas iedzīvotājiem un uzņēmējiem orientēties VID EDS sistēmā.

**⚠️ Svarīgi:** Šis nav oficiāls VID rīks. Vienmēr pārbaudi aktuālo informāciju [eds.vid.lv](https://eds.vid.lv) un [vid.gov.lv](https://www.vid.gov.lv).

---

## ✨ Funkcionalitāte

- 🤖 **AI chatbots** – Gemini 2.5 Flash ar pilnu EDS system prompt latviešu valodā
- 💬 **ChatGPT stila chat UI** – sarunu vēsture, typing animācija, markdown formatēšana
- 🔑 **Hardcoded API atslēga** – gatavs darbam uzreiz, nav nepieciešama konfigurācija
- ⚡ **Ātrās pogas** – bieži uzdotie jautājumi vienā klikšķī
- 📱 **Responsīvs dizains** – mobilajam un galddatoram

## 🗂️ Failu struktūra

```
eds-info-centrs/
├── index.html    # Galvenā lapa (HTML struktūra + Tailwind CSS)
├── app.js        # Gemini API integrācija + chat loģika
├── style.css     # Pielāgotie stili (animācijas, chat burbuļi)
└── README.md     # Šis fails
```

---

## 🚀 Lokālā palaišana

### Variants 1: Atvērt tieši pārlūkā
```bash
# Atvērt index.html tieši pārlūkā (darbojas bez servera)
open eds-info-centrs/index.html   # macOS
start eds-info-centrs/index.html  # Windows
```

### Variants 2: Lokālais serveris (ieteicams CORS dēļ)
```bash
# Python 3
cd eds-info-centrs
python3 -m http.server 8080
# Atvērt: http://localhost:8080

# Node.js (npx)
npx serve eds-info-centrs
```

---

## 🌐 Deploy uz Vercel (ieteicamais)

### Variants A: Drag & Drop (vienkāršākais)
1. Dodies uz [vercel.com](https://vercel.com) un piesakies
2. Noklikšķini **"Add New Project"**
3. Velc un met visu `eds-info-centrs/` mapi uz Vercel
4. Noklikšķini **"Deploy"** – gatavs! 🎉

### Variants B: GitHub + Vercel (automātisks)
```bash
# 1. Izveido GitHub repozitoriju
git init
git add .
git commit -m "Initial commit – EDS Info Centrs"
git remote add origin https://github.com/TAVS_KONTS/eds-info-centrs.git
git push -u origin main

# 2. Vercel
# - Dodies uz vercel.com → "Add New Project" → "Import Git Repository"
# - Atlasi savu repozitoriju → Deploy
```

---

## 📄 Deploy uz GitHub Pages

```bash
# 1. Izveido repozitoriju un push kodu
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TAVS_KONTS/eds-info-centrs.git
git push -u origin main

# 2. GitHub repozitorijā:
# Settings → Pages → Source: "Deploy from a branch"
# Branch: main → / (root) → Save

# 3. Lapa būs pieejama:
# https://TAVS_KONTS.github.io/eds-info-centrs/
```

---

## 🔑 Gemini API atslēga

Aplikācija nāk ar jau iestrādātu (hardcoded) Gemini API atslēgu failā `app.js`. Lietotājiem nav nekas jāiestata.

Ja vēlaties izmantot savu atslēgu, nomainiet `const API_KEY` vērtību failā `app.js`. Jauno atslēgu var iegūt [Google AI Studio](https://aistudio.google.com/app/apikey).

> **Privātums:** API atslēga tiek saglabāta tikai Tava pārlūka `localStorage`. Tā netiek nosūtīta nevienam citam serverim – tikai tieši Google Gemini API.

### Bezmaksas limits
- Gemini 2.5 Flash: **15 pieprasījumi/minūtē**, 1 miljons tokenu/dienā (bezmaksas)
- Pietiek personīgai lietošanai un testēšanai

---

## ⚙️ Konfigurācija (app.js)

Galvenie iestatījumi atrodami faila `app.js` sākumā:

```javascript
// Mainīt Gemini modeli (ja nepieciešams)
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Mainīt temperatūru (0 = precīzāk, 1 = radošāk)
temperature: 0.7,

// Maksimālais atbildes garums (tokeni)
maxOutputTokens: 2048,
```

---

## 📞 VID kontakti

| Kanāls | Info |
|--------|------|
| 📞 Tālrunis | 67120000 |
| ✉️ E-pasts | helpdesk@vid.gov.lv |
| 🌐 EDS | eds.vid.lv |
| 🕐 Darba laiks | Darba dienās 8:30–17:00 |

---

*© 2026 EDS Info Centrs – neatkarīgs projekts, nav saistīts ar Valsts ieņēmumu dienestu* 🇱🇻
