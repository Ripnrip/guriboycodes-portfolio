# 🚀 GuriboyCodes Portfolio

> **Building Legendary Apps at the Edge of iOS & AI**

Personal portfolio website for **Gurinder Singh** — Staff iOS & AI/ML Engineer with 10+ years of experience scaling apps for 90M+ users.

🌐 **Live at**: [guriboycodes.com](https://guriboycodes.com)

---

## ✨ Features

- **20 Showcased Projects** — spanning iOS apps, Flutter cross-platform, AI/ML tools, creative web experiences, and community impact
- **Functional Contact Form** — powered by Resend API (Vercel Serverless Function)
- **Downloadable Resume** — latest PDF resume available for download
- **Dark Mode** — elegant theme toggle with smooth transitions
- **Responsive Design** — mobile-first, works beautifully on all screen sizes
- **Animated Stats** — counters, marquee ticker, spotlight effects
- **Project Filtering** — filter by AI/ML, Mobile, Creative, Community, and Tools

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

- **React 19** + **Vite 6** for blazing-fast development
- **Tailwind CSS** + **shadcn/ui** for a polished design system
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Resend API** for contact form emails
- **Vercel** for deployment and serverless functions

## 📂 Project Structure

```
guriboycodes-portfolio/
├── api/
│   └── contact.js          # Vercel Serverless Function (Resend)
├── public/
│   ├── me_ghibli.png       # Hero avatar
│   ├── Gurinder-Singh-Staff-SE.pdf  # Resume
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Hero.jsx        # Hero section with stats & marquee
│   │   ├── About.jsx       # About section
│   │   ├── Projects.jsx    # 20 project showcases
│   │   ├── Hackathons.jsx  # Hackathon history
│   │   └── Contact.jsx     # Contact form & info
│   │   └── ui/             # shadcn/ui components
│   ├── App.jsx
│   ├── App.css             # Tailwind + custom styles
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 🏁 Getting Started

```bash
# Clone the repository
git clone https://github.com/Ripnrip/guriboycodes-portfolio.git
cd guriboycodes-portfolio

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it locally.

## 🚢 Deployment

Deployed automatically via **Vercel**. Push to `main` to trigger a production deployment.

```bash
# Manual deploy
npx vercel --prod
```

### Environment Variables (Vercel)

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for contact form emails |

## 📬 Contact

- 📧 [contact@guriboycodes.com](mailto:contact@guriboycodes.com)
- 🐙 [github.com/Ripnrip](https://github.com/Ripnrip)
- 💼 [LinkedIn](https://linkedin.com/in/gurinder-singh-a30a1a48/)

---

© 2024-2026 GuriboyCodes. Built with React, Tailwind CSS, and lots of ☕
