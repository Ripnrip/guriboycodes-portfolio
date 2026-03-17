# 🚀 GuriboyCodes Portfolio

> **Building Legendary Apps at the Edge of iOS & AI**

Personal portfolio website for **Gurinder Singh** — Staff iOS & AI/ML Engineer with 10+ years of experience scaling apps for 90M+ users.

🌐 **Live at**: [guriboycodes.com](https://guriboycodes.com) | [Gemini Edition](https://guriboycodes-portfolio-gemini-q0oqdj13a-gsinghdevs-projects.vercel.app)

---

## ✨ Features

- **26 Showcased Projects** — spanning iOS apps, AI Agents, personal milestones, and community impact
- **Knowledge Ecosystem (Tech Orbit)** — Creative, interactive visualization of **100+ skills** orbiting your core expertise
- **Leadership & Community** — Animated impact stats (500+ interviews) and mentorship initiatives
- **Engineering Philosophy** — Dedicated section for core development principles (Human-Centered AI, Craftsmanship)
- **Functional Contact Form** — powered by Resend API (Vercel Serverless Function)
- **Git LFS Enabled** — High-fidelity media and icon tracking (200+ icons)
- **Dark Mode** — elegant theme toggle with smooth transitions
- **Responsive Design** — mobile-first, works beautifully on all screen sizes
- **Animated Stats** — counters, marquee ticker, spotlight effects
- **Project Filtering** — filter by AI/ML, Mobile, Creative, Community, Personal, and Tools

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
- **Recharts** for domain expertise visualization
- **PostHog** for observability and analytics
- **Resend API** for contact form emails
- **Vercel** for deployment and serverless functions
- **Git LFS** for large asset management

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
│   │   ├── Hero.jsx        # Dynamic profile & stats
│   │   ├── SkillGraph.jsx  # 100+ skills Tech Orbit visualization
│   │   ├── About.jsx       # Career journey & Engineering Philosophy
│   │   ├── Community.jsx   # Leadership & Impact section
│   │   ├── Projects.jsx    # 26 project showcases (from portfolio.js)
│   │   ├── Hackathons.jsx  # Hackathon timeline (28+ events)
│   │   └── Contact.jsx     # Contact form & info
│   │   └── ui/             # shadcn/ui components
│   ├── data/
│   │   └── portfolio.js    # Single Source of Truth (Central Data Store)
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
