# 🌿 AyurVeda Life — Personalized Wellness & Dosha Advisor

> An **Organic Luxury Ayurvedic Web Application** built with **React 18, Vite 8, Vanilla CSS Glassmorphism + Aura Mesh Architecture**, White Tranquility Color Scheme, Pine Sparkle Gradients, 15-question Prakriti & Vikriti diagnostics, daily Dinacharya habit tracking, guided Pranayama breathwork, and real-time Node SMTP email security verification.

[![Live on Netlify](https://img.shields.io/badge/Netlify-Live%20App-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://ayurvedwellnessadvisor.netlify.app/)
![React](https://img.shields.io/badge/React-18.x-1A3323?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-8.x-1A3323?style=for-the-badge&logo=vite&logoColor=646CFF)
![License](https://img.shields.io/badge/License-MIT-1A3323?style=for-the-badge&color=B86B18)

---

## 🌐 Live Production Application
- **Live URL**: **[https://ayurvedwellnessadvisor.netlify.app/](https://ayurvedwellnessadvisor.netlify.app/)**
- **Hosting Platform**: Netlify Edge CDN & Serverless Edge Runtime
- **Development Period**: July 15, 2026 – July 30, 2026
- **Author & Lead Architect**: Aritra ([@AritXcoder01](https://github.com/AritXcoder01))

---

## 📄 Formal Documentation
- **Formal SRS Document (Markdown)**: [SRS_DOCUMENT.md](./SRS_DOCUMENT.md)
- **Formal SRS Document (Microsoft Word .docx)**: [SRS_DOCUMENT.docx](./SRS_DOCUMENT.docx)

---

## ✨ System Features

- **🧘 15-Question Authentic Ayurvedic Assessment**: Comprehensive Prakriti questionnaire analyzing physical build, skin, hair, digestion, sleep, energy, stress, communication, exercise, weather, spending, taste cravings, and core disposition.
- **🎨 Organic Luxury Glassmorphism + Aura Mesh UI**: Space White (`#F9FBF2`) & Ceramic (`#FDFFF9`) translucent frosted panels with `backdrop-filter: blur(28px)`, multi-node animated Aura Mesh background, Pine Sparkle Gradients (`#1A3323` → `#2B5738` → `#BAE164`), and Saffron (`#B86B18`) accents.
- **📊 Dosha Balance Metric Card & SVG Chart**: Visual ratio meters calculating Vata, Pitta, and Kapha score ratios and identifying single or dual-dominant dosha profiles.
- **📅 Daily Dinacharya Habit Tracker**: Interactive checklist with local storage persistence, routine time tags, and an **Active Habit Streak Counter 🔥**.
- **🫁 Guided Pranayama Breathing Timer**: Interactive visual breathing sphere with phase timers for *Nadi Shodhana*, *Sheetali*, and *Kapalabhati*.
- **💊 Ayurvedic Herbal & Recipe Repository**: Searchable & filterable directory of 6 classical Ayurvedic herbs (*Ashwagandha, Triphala, Brahmi, Tulsi, Shatavari, Turmeric*) and culinary healing recipes (*Kitchari, Golden Milk, Cooling Mint Drink, CCF Tea*).
- **⚡ 24-Hour Acute Imbalance Reset Protocol**: 1-click diagnostic tool for acute daily imbalances (Vata anxiety, Pitta heat, Kapha sluggishness) with 24-hour reset action plans.
- **📬 6-Digit OTP Email Verification**: Security verification modal with **Auto-Fill Code (194820)** action buttons and resend controls.
- **🔑 Dedicated Forgot Password Flow**: Multi-step account reset dashboard with email OTP verification and instant password updates.
- **📄 Printable PDF Wellness Report**: Clean, print-ready diagnostic report formatted for PDF export via `window.print()`.

---

## 🎨 Color Palette & Design Architecture

- **Royal White**: `#FEFEFE` (Card highlights & specular top reflections)
- **Space White**: `#F9FBF2` (Translucent glass surface panels)
- **White Shimmering Opal**: `#F0F7E8` (Glass card borders & badge backgrounds)
- **Light Lime Green**: `#BAE164` (Active navigation pill highlights & progress rings)
- **Ceramic**: `#FDFFF9` (Liquid input field backgrounds & secondary buttons)
- **Warm Cream**: `#FAF7F2` (Ambient surface canvas)
- **Deep Forest Green**: `#1A3323` (High-contrast typography & Pine Sparkle primary buttons)
- **Saffron**: `#B86B18` (Warm action highlights & forgot password triggers)
- **Sage**: `#7DA488` (Muted labels & secondary indicators)

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18 (Hooks, Context API)
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS, Glassmorphism, Aura Mesh Animation, Responsive Media Queries, SVG Donut Charts
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Cinzel*, *Outfit*, *Plus Jakarta Sans*)
- **Backend Email Directory**: Node.js, Express, Nodemailer SMTP
- **Hosting & Deployment**: Netlify

---

## 💻 Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/AritXcoder01/ayurveda-wellness-advisor.git

# 2. Navigate to project directory
cd ayurveda-wellness-advisor

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Start email server (in a separate terminal)
node server.js
```

Open `http://localhost:5173/` in your browser.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
