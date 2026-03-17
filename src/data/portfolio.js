export const portfolioData = {
  cdnBase: "https://raw.githubusercontent.com/Ripnrip/guriboycodes-portfolio/claude-portfolio/public",
  vercelBase: "https://guriboycodes.com",
  profile: {
    name: "Gurinder Singh",
    handle: "GuriboyCodes",
    title: "Staff iOS & AI/ML Engineer",
    tagline: "LLM Agents · RAG Pipelines · Mobile · Automation · Patent Holder",
    company: "PayPal",
    location: "NYC/Tampa (Open to Remote)",
    linkedin: "https://www.linkedin.com/in/gurinder-singh-a30a1a48",
    github: "https://github.com/Ripnrip",
    followers: 1355,
    connections: "500+"
  },
  stats: {
    usersImpacted: "92M+",
    hackathons: 28,
    firstPlaceWins: 2,
    countries: "6+",
    projectCount: 26,
    yearsExperience: 10,
    interviews: "500+",
    patents: 1
  },
  experience: [
    {
      title: "Staff iOS Engineer → Applied AI/ML Engineer",
      company: "PayPal",
      period: "May 2020 – Present",
      location: "San Jose, CA / Remote",
      duration: "5 yrs 11 mos",
      technologies: ["Swift", "SwiftUI", "CoreML", "Python", "PyTorch", "LangChain", "SDXL", "LoRA", "MCP", "RAG", "CrewAI", "DataDog"],
      highlights: [
        { description: "Project Mercury (2025): Built AI-powered agentic e-commerce platform in 72 hours; presented to SVP of AI, earning immediate backing" },
        { description: "Trained 5 SDXL LoRA models achieving 23% loss reduction and 109MB optimized models for production deployment" },
        { description: "Agent0 (2025): Deployed autonomous AI agent framework to Venmo & PayPal engineering teams for self-correcting workflows" },
        { description: "AI-powered crash detection using RAG pipelines + Vector stores with automated DataDog monitors — adopted team-wide" },
        { description: "Pay With Venmo (2024): Reduced end-to-end pay sheet render latency by ~2 seconds, lowering conversion drop-offs" },
        { description: "Venmo Gift Cards (2023): Led iOS architecture supporting major merchants like Amazon & Starbucks" },
        { description: "QRC Touch-Free Payments (2021): Led moonshot initiative winning $60M CVS contract" },
        { description: "QRC Widget Patent (2022): Filed 'Interface Widget Tool for Automatic QR Code Generation' — first team to use SwiftUI for iOS widgets at Venmo" },
        { description: "Conducted 500+ technical interviews; Interfaith ERG Chapter Lead (Sikh community)" }
      ]
    },
    {
      title: "Software Engineer, Consultant",
      company: "Google Stadia",
      period: "Jul 2019 – May 2020",
      location: "Mountain View, CA / NYC",
      duration: "11 mos",
      technologies: ["Flutter", "Dart", "Swift", "Core Bluetooth", "XCTest"],
      highlights: [
        { description: "Spearheaded Flutter/iOS development for the Google Stadia controller integration" },
        { description: "Implemented low-latency Core Bluetooth communication protocols for high-performance gaming" },
        { description: "Developed automated test suites using XCTest and Flutter driver for hardware-software parity" }
      ]
    },
    {
      title: "iOS Developer",
      company: "Morgan Stanley",
      period: "Apr 2018 – Jul 2019",
      location: "New York, NY",
      duration: "1 yr 4 mos",
      technologies: ["Objective-C", "Swift", "UIKit", "FaceID/TouchID", "Security"],
      highlights: [
        { description: "Developed and maintained core features for the Wealth Management iOS application serving high-net-worth clients" },
        { description: "Architected secure authentication flows utilizing biometric integration (FaceID/TouchID)" },
        { description: "Modernized legacy Objective-C codebases into reactive Swift components" }
      ]
    },
    {
      title: "iOS Developer",
      company: "Parabit Systems",
      period: "Jan 2017 – Apr 2018",
      location: "Roosevelt, NY",
      duration: "1 yr 4 mos",
      technologies: ["Swift", "NFC", "Core Bluetooth", "Hardware Integration", "Security"],
      highlights: [
        { description: "Engineered secure mobile access solutions using NFC and Bluetooth Low Energy (BLE) for enterprise entry systems" },
        { description: "Integrated biometric security layers into mobile reader applications" },
        { description: "Collaborated with hardware teams to define communication protocols for ATM and secure facility access" }
      ]
    },

  ],
  education: [
    {
      school: "New York City College of Technology",
      degree: "BS Computer and Information Systems",
      period: "2012–2016"
    },
    {
      school: "Coalition for Queens",
      program: "Python Bootcamp",
      period: "2014"
    }
  ],
  patents: [
    {
      title: "Interface Widget Tool for Automatic QR Code Generation and Display without Application Launching",
      applicationNumber: "US 17/687,505",
      year: 2022,
      company: "PayPal/Venmo"
    }
  ],
  awards: [
    {
      title: "🥇 1st Place",
      event: "Devcamp NYC (Google NYC)",
      location: "New York, USA 🇺🇸",
      date: "Oct 2016",
      project: "Talent Management App",
      description: "Won first place by building a comprehensive talent management application for modeling agencies to streamline interactions between agencies, talent, and customers. Held at Google NYC with 300+ participants."
    },
    {
      title: "1st Place Winner",
      event: "Major League Hacking Prime Europe Regional",
      location: "Bloomberg, London",
      date: "Mar 2017",
      project: "DJI Drone SAR"
    },
    {
      title: "Winner",
      event: "5th Grade Science Fair (P.S 214)",
      date: "2003",
      project: "Knewton's prism"
    }
  ],
  hackathons: [
    {
      event: "HackZurich 2023",
      project: "Legal Lunatics",
      sponsor: "Implenia",
      placement: null,
      team: [
        "Gurinder",
        "Wael",
        "Thuong",
        "Roman",
        "Jan"
      ],
      linkedinPost: "https://www.linkedin.com/feed/update/urn:li:activity:7113565367024865280/",
      video: null,
      projectId: 23,
      year: "2023",
      location: "Zurich, Switzerland"
    },
    {
      event: "HackZurich 2022",
      project: "Elate",
      sponsor: "Schindler Group",
      placement: "1st Place",
      team: [
        "Gurinder",
        "João",
        "Roman",
        "Wael",
        "Thuong"
      ],
      linkedinPost: "https://www.linkedin.com/feed/update/urn:li:activity:6985326800461537280/",
      video: {
        file: "/videos/hackzurich-2022-elate-720p.mp4",
        sizeMB: 10.07,
        resolution: "720p",
        venue: "Google NYC Venue"
      },
      projectId: null,
      year: "2022",
      location: "Google NYC Venue"
    },
    {
      event: "HackZurich 2021",
      project: "ARon — AI Fitness Coach",
      sponsor: null,
      placement: null,
      team: [
        "Gurinder"
      ],
      linkedinPost: "https://www.linkedin.com/feed/update/urn:li:activity:6848583120539807744/",
      video: {
        file: "/videos/hackzurich-2021-aron-fitness.mp4",
        sizeMB: 5.83,
        resolution: "720p"
      },
      projectId: 21,
      year: "2021",
      location: "Zurich, Switzerland"
    },
    {
      event: "HackZurich 2018",
      project: "Carly — AR Car Visualizer",
      sponsor: null,
      placement: null,
      team: [
        "Gurinder"
      ],
      linkedinPost: null,
      video: null,
      projectId: 22,
      year: "2018",
      location: "Zurich, Switzerland"
    },
    {
      event: "MLH Prime 2017",
      project: "Drone Search & Rescue",
      sponsor: "Bloomberg London",
      placement: "1st Place",
      team: [
        "Gurinder"
      ],
      linkedinPost: "https://www.linkedin.com/feed/update/urn:li:activity:6307253298822946816/",
      video: {
        file: "/videos/mlh-2017-drone-bbc.mp4",
        sizeMB: 17.87,
        resolution: "720p"
      },
      projectId: 24,
      year: "2017",
      location: "London, UK"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Flow",
      description: "Dynamic Island iOS app — beautiful, recent, uniquely Apple",
      longDescription: "A uniquely Apple-focused iOS application leveraging the Dynamic Island for a beautiful and intuitive user experience. Demonstrates advanced modern iOS development featuring rich animations and system integration.",
      category: "Mobile",
      featured: true,
      technologies: ["Swift", "SwiftUI", "Dynamic Island", "iOS", "Animations"],
      github: "https://github.com/Ripnrip/Flow",
      link: null,
      ghibliImage: "/images/projects/flow-ghibli.png",
      ghibliImageCdnUrl: "https://raw.githubusercontent.com/Ripnrip/guriboycodes-portfolio/claude-portfolio/public/images/projects/flow-ghibli.png"
    },
    {
      id: 2,
      title: "Ethereal Dimension",
      description: "AI storytelling platform — creative flagship project",
      longDescription: "A cutting-edge storytelling platform that combines interactive narratives with immersive digital experiences. Features original stories showcasing advanced web technologies and creative AI storytelling.",
      category: "Creative",
      featured: true,
      technologies: ["React", "Next.js", "Three.js", "WebGL", "AI", "Storytelling"],
      github: "https://github.com/Ripnrip/EtherealDimension",
      link: "https://ethereal-dimension-nextjs.vercel.app",
      ghibliImage: "/images/projects/ethereal-dimension-ghibli.png",
      ghibliImageCdnUrl: "https://raw.githubusercontent.com/Ripnrip/guriboycodes-portfolio/claude-portfolio/public/images/projects/ethereal-dimension-ghibli.png"
    },
    {
      id: 3,
      title: "Zai Vision Suite",
      description: "Multi-platform AI vision suite utilizing GLM-4.6V",
      longDescription: "An advanced multi-platform AI vision suite that leverages the GLM-4.6V model for visual understanding and processing. Serves as a major AI/ML showcase for computer vision capabilities.",
      category: "AI/ML",
      featured: true,
      technologies: ["Python", "GLM-4.6V", "Computer Vision", "AI/ML", "React"],
      github: "https://github.com/Ripnrip/zai-vision-suite",
      link: null,
      ghibliImage: "/images/projects/zai-vision-suite-ghibli.png",
      ghibliImageCdnUrl: "https://raw.githubusercontent.com/Ripnrip/guriboycodes-portfolio/claude-portfolio/public/images/projects/zai-vision-suite-ghibli.png"
    },
    {
      id: 4,
      title: "AI IDE Setup & Workflows",
      description: "Optimized development environment configurations for AI pairs",
      longDescription: "A comprehensive collection of dotfiles, scripts, and MCP server configurations designed to maximize productivity when pair programming with AI assistants like Claude, Cursor, and GitHub Copilot.",
      category: "Tools",
      featured: false,
      technologies: ["Bash", "MCP", "AI Tooling", "Config", "Productivity"],
      github: "https://github.com/Ripnrip/ai-ide-setup",
      link: null,
      ghibliImage: "/images/projects/ai-ide-setup-ghibli.png",
      ghibliImageCdnUrl: "https://raw.githubusercontent.com/Ripnrip/guriboycodes-portfolio/claude-portfolio/public/images/projects/ai-ide-setup-ghibli.png"
    },
    {
      id: 5,
      title: "Rosicrucian Knowledge Explorer",
      description: "RAG search engine exploring esoteric knowledge",
      longDescription: "A sophisticated search engine using Retrieval-Augmented Generation (RAG) to explore complex texts. Features deep technical integration with Vector databases and advanced AI semantic search.",
      category: "AI/ML",
      featured: true,
      technologies: ["Python", "RAG", "Vector DB", "OpenAI", "Semantic Search"],
      github: "https://github.com/noeticactivity/Rosicrucian-Knowledge-Explorer",
      link: "https://rosicrucian-knowledge-explorer.vercel.app",
      ghibliImage: "/images/projects/rosicrucian-knowledge-explorer-ghibli.png"
    },
    {
      id: 6,
      title: "Agentic News Transformer",
      description: "Agentic AI news ecosystem built with Python",
      longDescription: "A fully automated ecosystem that leverages AI agents to curate, transform, and deliver news. Showcases advanced orchestration of Python-based AI agents for dynamic content generation.",
      category: "AI/ML",
      featured: true,
      technologies: ["Python", "AI Agents", "Automation", "LLMs", "News Context"],
      github: "https://github.com/Ripnrip/Agentic-News-Transformer",
      link: null,
      ghibliImage: "/images/projects/agentic-news-transformer-ghibli.png"
    },
    {
      id: 7,
      title: "Gurduwara Langar Game",
      description: "Gamified Sikh heritage application for community impact",
      longDescription: "An interactive educational application designed to teach Sikh culture and the Langar tradition through gamification. Built as an impactful community ERG project.",
      category: "Community",
      featured: false,
      technologies: ["React Native", "Gamification", "Education", "Cultural Impact"],
      github: "https://github.com/Ripnrip/GurduwaraLangarGame",
      link: null,
      ghibliImage: "/images/projects/gurduwara-langar-game-ghibli.png"
    },
    {
      id: 8,
      title: "Ethereal Search Showcase",
      description: "Next-gen AI search experience visualization",
      longDescription: "A sophisticated frontend showcase demonstrating the capabilities of the Ethereal Search engine. Features an immersive UI exploring how AI can transform search and discovery.",
      category: "AI/ML",
      featured: false,
      technologies: ["React", "Next.js", "AI Search", "UI/UX", "Vercel"],
      github: null,
      link: "https://etherealsearch-showcase.vercel.app",
      ghibliImage: "/images/projects/ethereal-search-ghibli.png"
    },
    {
      id: 9,
      title: "Artful Archives",
      description: "Creative digital preservation platform",
      longDescription: "A visually stunning website designed to archive and showcase creative artifacts. Built to emphasize aesthetics, smooth interactions, and performant delivery.",
      category: "Creative",
      featured: false,
      technologies: ["React", "Performance", "Animation", "Creative", "Vercel"],
      github: null,
      link: "https://artful-archives-website.vercel.app",
      ghibliImage: "/images/projects/artful-archives-ghibli.png"
    },
    {
      id: 11,
      title: "Rosicrucian Parenting",
      description: "Full-stack parenting platform with iOS & Android apps",
      longDescription: "A comprehensive parenting platform built from the ground up, including a responsive website and native mobile apps for both iOS and Android.",
      category: "Mobile",
      featured: false,
      technologies: ["Flutter", "iOS", "Android", "Web", "Full Stack"],
      github: null,
      link: "https://rosicrucian-parenting.org/",
      ghibliImage: "/images/projects/rosicrucian-parenting-ghibli.png"
    },
    {
      id: 12,
      title: "Rosicrucian Vowel Sounds",
      description: "Cross-platform Flutter app on App Store & Play Store",
      longDescription: "A beautifully crafted Flutter application published on both major app stores. Guides users through vowel sound exercises with an intuitive audio experience.",
      category: "Mobile",
      featured: false,
      technologies: ["Flutter", "Dart", "iOS", "Android", "Audio"],
      github: null,
      link: "https://apps.apple.com/us/app/rosicrucian-vowel-sounds/id6529521816",
      ghibliImage: "/images/projects/rosicrucian-vowel-sounds-ghibli.png"
    },
    {
      id: 13,
      title: "Hylios — Ethereal Dimension",
      description: "Published iOS game within the Ethereal Dimension universe",
      longDescription: "An immersive iOS gaming experience published on the App Store, Hylios blends storytelling with interactive gameplay and stunning visuals.",
      category: "Mobile",
      featured: false,
      technologies: ["Swift", "SpriteKit", "iOS", "Game Design", "Storytelling"],
      github: null,
      link: "https://apps.apple.com/us/app/hylios/id6474466548",
      ghibliImage: "/images/projects/hylios-ghibli.png"
    },
    {
      id: 15,
      title: "Cycles of Fate",
      description: "Dynamic web experience exploring fate and destiny",
      longDescription: "A visually rich web application exploring themes of fate, cycles, and destiny through interactive design and engaging animations.",
      category: "Creative",
      featured: false,
      technologies: ["React", "Next.js", "Animation", "Vercel", "Creative"],
      github: null,
      link: "https://cycles-of-fate.vercel.app/",
      ghibliImage: "/images/projects/cycles-of-fate-ghibli.png"
    },
    {
      id: 16,
      title: "Geometric Graph Design",
      description: "Stunning generative geometric visualizations",
      longDescription: "A generative art application that creates stunning geometric graph designs using mathematical algorithms. Showcases creative coding.",
      category: "Creative",
      featured: false,
      technologies: ["React", "Canvas", "Generative Art", "Math", "Vercel"],
      github: null,
      link: "https://v0-geometric-graph-design.vercel.app/",
      ghibliImage: "/images/projects/geometric-graph-ghibli.png"
    },
    {
      id: 17,
      title: "Voice Practice Hub",
      description: "Audio-powered voice training and practice platform",
      longDescription: "An interactive voice training platform designed for guided vocal practice sessions. Features audio playback and structured lesson plans.",
      category: "Tools",
      featured: false,
      technologies: ["React", "Web Audio", "Next.js", "Education", "Vercel"],
      github: null,
      link: "https://voice-practice-hub.vercel.app/",
      ghibliImage: "/images/projects/voice-practice-hub-ghibli.png"
    },
    {
      id: 18,
      title: "Audio Dialogues",
      description: "Interactive audio conversation experience",
      longDescription: "A unique web application for interactive audio-based dialogues. Combines AI and audio processing for engaging conversations.",
      category: "AI/ML",
      featured: false,
      technologies: ["React", "Audio API", "AI", "Vercel", "Next.js"],
      github: null,
      link: "https://audio-dialogues.vercel.app",
      ghibliImage: "/images/projects/audio-dialogues-ghibli.png"
    },
    {
      id: 21,
      title: "ARon — AI Fitness Coach",
      description: "HackZurich 2021 — AR fitness coach with real-time pose detection",
      longDescription: "Built at HackZurich 2021, ARon uses CreateML and ARKit for real-time body pose detection during workouts. Integrated Garmin wearables for biometric tracking.",
      featured: true,
      technologies: ["Swift", "ARKit", "CreateML", "CoreML", "Garmin SDK"],
      github: "https://github.com/Ripnrip/ARon",
      link: null,
      ghibliImage: "/images/projects/aron-ai-fitness-ghibli.png",
      video: "/videos/hackzurich-2021-aron-fitness.mp4"
    },
    {
      id: 22,
      title: "Carly — AR Car Visualizer",
      description: "HackZurich 2018 — AR car customization & visualization tool",
      longDescription: "Created at HackZurich 2018, Carly is a voice-controlled AR car configurator combining real-time 3D rendering with Credit Suisse financial API integration.",
      category: "Mobile",
      featured: true,
      technologies: ["Swift", "ARKit", "CoreML", "Laravel", "Azure"],
      github: "https://github.com/niccolosolbiati/Carly",
      link: null,
      ghibliImage: "/images/projects/carly-ar-car-ghibli.png"
    },
    {
      id: 24,
      title: "Drone Search & Rescue",
      description: "MLH Prime 2017 — 1st Place Winner at Bloomberg London",
      longDescription: "1st Place at MLH Prime Europe Regional. Used DJI drones with IBM Watson facial recognition to autonomously locate stranded people in disaster scenarios. Featured in BBC documentary.",
      category: "AI/ML",
      featured: true,
      technologies: ["Swift", "DJI SDK", "IBM Watson", "Twilio", "AWS"],
      github: null,
      link: "https://devpost.com/software/automated-search-rescue-system",
      ghibliImage: "/images/projects/drone-sar-ghibli.png",
      video: "/videos/mlh-2017-drone-bbc.mp4"
    },
    {
      id: 25,
      title: "Agentic-SEO",
      description: "AI-powered SEO automation and optimization agent",
      longDescription: "A sophisticated AI agent designed to automate comprehensive SEO workflows, including keyword research, technical audits, and content optimization strategies. Built to leverage agentic workflows for scalable digital marketing.",
      category: "AI/ML",
      featured: true,
      technologies: ["React", "Next.js", "AI Agents", "SEO Automation", "Vercel"],
      github: null,
      link: "https://agentic-seo-three.vercel.app/",
      ghibliImage: "/images/projects/agentic-seo-ghibli.png"
    },
    {
      id: 26,
      title: "Gina and Gurinder",
      description: "Personal wedding website built with modern web tech",
      longDescription: "A beautifully crafted personal wedding website featuring interactive maps, RSVP systems, and dynamic storytelling elements. Built to celebrate and share a special journey with friends and family worldwide.",
      category: "Personal",
      featured: false,
      technologies: ["React", "Next.js", "Vercel", "Tailwind CSS"],
      github: "https://github.com/Ripnrip/gng-website-2025-main",
      link: "https://www.ginaandgurinder.com/",
      ghibliImage: "/images/projects/wedding-ghibli.png"
    }
  ],
  leadership: {
    summary: "Committed to fostering inclusive communities, mentoring the next generation of technologists, and bridging the gap between industry and education.",
    stats: [
      { label: "Total Hackathons", value: 28, suffix: "+" },
      { label: "Countries Visited", value: 6, suffix: "+" },
      { label: "1st Place Wins", value: 2, suffix: "+" },
      { label: "Countless Learnings", value: 100, suffix: "+" }
    ],
    initiatives: [
      {
        title: "Official Bar Raiser & Technical Leadership",
        role: "Official Bar Raiser",
        organization: "PayPal & Venmo",
        period: "2020 - Present",
        description: "One of a selective group of engineers responsible for maintaining the 'Bar' for all technical hires across PayPal and Venmo globally.",
        highlights: [
          "500+ technical interviews conducted across iOS, System Design, and AI/ML",
          "Final decision-maker for critical hiring rounds, ensuring elite engineering quality",
          "Mentored 20+ junior and senior engineers through to successful promotions",
          "Technical leadership in cross-functional architecture reviews and RFCs"
        ],
        impact: "Maintainer of elite engineering standards for 30,000+ employee org"
      },
      {
        title: "Interfaith ERG Chapter Lead (Sikh Community)",
        role: "Chapter Lead & Founding Member",
        organization: "PayPal",
        period: "2020 - Present",
        description: "Leading PayPal's Sikh Faith Employee Resource Group, fostering inclusion and cultural awareness through innovative tech-driven community projects.",
        highlights: [
          "Founded and grew ERG to 150+ members globally",
          "Developed 'Gurduwara Langar Seva' (React Native) to teach Sikh traditions through gamification",
          "Organized high-impact cross-ERG cultural events and interfaith mentorship programs",
          "Advocated for inclusive workplace policies and recognition of diverse religious traditions"
        ],
        impact: "150+ ERG members; Gamified heritage app deployed to 500+ students"
      },
      {
        title: "Academic & Competitive Mentorship",
        role: "Hackathon Judge & Mentor",
        organization: "Yale University & UPenn (PennApps)",
        period: "2017 - Present",
        description: "Serving the next generation of engineers by judging at Ivy League hackathons and mentoring top-tier student talent.",
        highlights: [
          "Judge (2×) at Hack Yale – evaluating technical feasibility and innovation for 500+ participants",
          "Mentor at PennApps (UPenn) – guiding students through complex mobile and AI implementations",
          "Advisory Board Member at Bayside High School (CTE program) defining modern tech curriculum",
          "Regular guest speaker on AI/ML and the future of Mobile Engineering"
        ],
        impact: "Direct mentorship to 1000+ students across various institutions"
      },
      {
        title: "Community Tech Education",
        role: "Volunteer Educator",
        organization: "Local Schools & Organizations",
        period: "2018 - Present",
        description: "Volunteering time to teach coding, mobile development, and AI/ML concepts to underrepresented communities.",
        highlights: [
          "Coding workshops for underrepresented youth",
          "Mobile app development bootcamps",
          "AI/ML awareness sessions for educators",
          "Open source contributions and tutorials"
        ],
        impact: "200+ hours of volunteer education"
      }
    ],
    featuredProject: {
      title: "ERG Langar App",
      subtitle: "Gamified Sikh Temple Education",
      description: "A React Native application designed to educate PayPal ERG members about Sikh temple traditions, specifically the concept of Langar (community kitchen). Features gamification elements to make learning engaging and interactive.",
      features: [
        "Interactive temple tour with AR elements",
        "Gamified learning modules about Sikh traditions",
        "Community engagement tracking",
        "Cultural awareness quizzes and challenges",
        "Multi-language support for global ERG members"
      ],
      technologies: ["React Native", "Gamification", "Education", "Cultural Awareness"],
      footer: "Used for ERG onboarding and cultural education at PayPal",
      link: "#projects"
    }
  },
  engineeringPhilosophy: {
    title: "Engineering Philosophy",
    quote: "Building legendary apps at the edge of iOS & AI",
    principles: [
      {
        title: "Human-Centered AI",
        description: "AI should elevate human skill and judgment, not replace it. I focus on creating tools that feel like extensions of the user's creative process."
      },
      {
        title: "Craftsmanship & Detail",
        description: "Whether it's a fluid animation in SwiftUI or a robust RAG pipeline, the magic is in the details. I believe in software that feels pixel-perfect and logically sound."
      },
      {
        title: "Rapid Innovation",
        description: "Moving from proof-of-concept to production at speed. I leverage agentic workflows and modern tools to ship impactful features quickly."
      }
    ]
  },
  skills: {
    mobile: [
      { name: "Swift", icon: "swift.svg", level: 95, tags: ["Core", "iOS"] },
      { name: "SwiftUI", icon: "swiftui.svg", level: 95, tags: ["Core", "iOS"] },
      { name: "Objective-C", icon: "objective-c.svg", level: 90, tags: ["Core", "Legacy"] },
      { name: "UIKit", icon: "uikit.svg", level: 95, tags: ["Core", "iOS"] },
      { name: "SwiftData", icon: "swiftdata.png", level: 90, tags: ["iOS", "Data"] },
      { name: "Core Data", icon: "nosql.svg", level: 90, tags: ["iOS", "Data"] },
      { name: "Combine", icon: "rxswift.svg", level: 90, tags: ["iOS", "Reactive"] },
      { name: "RxSwift", icon: "rxswift.svg", level: 85, tags: ["iOS", "Reactive"] },
      { name: "ARKit / RoomPlan", icon: "arkit.svg", level: 85, tags: ["Spatial", "Hardware"] },
      { name: "CoreML / MLX", icon: "coreml.svg", level: 90, tags: ["AI", "On-Device"] },
      { name: "Metal / Vision", icon: "computer-vision.svg", level: 80, tags: ["Graphics", "Vision"] },
      { name: "BLE / NFC", icon: "ble.svg", level: 90, tags: ["Hardware", "Connectivity"] },
      { name: "MapKit / CoreLocation", icon: "mapkit.svg", level: 90, tags: ["iOS"] },
      { name: "APNS / Notifications", icon: "activitykit.svg", level: 95, tags: ["Infrastructure"] },
      { name: "Dynamic Island", icon: "activitykit.svg", level: 95, tags: ["iOS", "UI"] },
      { name: "Live Activities", icon: "activitykit.svg", level: 95, tags: ["iOS", "UI"] },
      { name: "App Clips", icon: "activitykit.svg", level: 90, tags: ["iOS"] },
      { name: "XCTest / Snapshot", icon: "tdd.svg", level: 90, tags: ["Testing"] },
      { name: "Design Systems", icon: "figma.svg", level: 90, tags: ["UI/UX"] },
      { name: "Flutter & Dart", icon: "flutter.svg", level: 85, tags: ["Cross-Platform"] },
      { name: "Cordova / Hybrid", icon: "cordova.svg", level: 80, tags: ["Web-to-Native"] }
    ],
    ai_ml: [
      { name: "Python", icon: "python.svg", level: 95, tags: ["Core", "AI"] },
      { name: "PyTorch", icon: "pytorch.svg", level: 85, tags: ["ML", "Research"] },
      { name: "OpenAI / GPT-4o", icon: "openai.svg", level: 95, tags: ["LLM", "API"] },
      { name: "Anthropic / Claude", icon: "anthropic.svg", level: 95, tags: ["LLM", "API"] },
      { name: "Gemini 2.0 / 1.5", icon: "gemini-icon.png", level: 95, tags: ["LLM", "Google"] },
      { name: "Llama 3 / Mistral", icon: "ollama.svg", level: 90, tags: ["LLM", "OSS"] },
      { name: "LangChain", icon: "langchain.svg", level: 95, tags: ["Orchestration"] },
      { name: "LlamaIndex", icon: "llamaindex.png", level: 90, tags: ["RAG", "Data"] },
      { name: "CrewAI / AutoGPT", icon: "crewai.svg", level: 90, tags: ["Agents"] },
      { name: "Agent Zero", icon: "ollama.svg", level: 95, tags: ["Agents", "OSS"] },
      { name: "OpenManus", icon: "manus.png", level: 95, tags: ["Agents", "Automation"] },
      { name: "N8N Automation", icon: "n8n.svg", level: 90, tags: ["Workflow"] },
      { name: "MCP Servers", icon: "mcp.svg", level: 95, tags: ["Orchestration"] },
      { name: "Cognee", icon: "langgraph.svg", level: 90, tags: ["Knowledge Graph"] },
      { name: "OpenViking", icon: "langflow.svg", level: 85, tags: ["Context Tiering"] },
      { name: "RAG Pipelines", icon: "rag-pipelines.svg", level: 95, tags: ["RAG"] },
      { name: "Vector Search", icon: "chromadb.svg", level: 95, tags: ["RAG"] },
      { name: "GraphRAG", icon: "neo4j.svg", level: 90, tags: ["Advanced RAG"] },
      { name: "Stable Diffusion / SDXL", icon: "stable-diffusion.svg", level: 85, tags: ["Generative Media"] },
      { name: "SDXL LoRA Training", icon: "stable-diffusion.svg", level: 90, tags: ["Fine-Tuning"] },
      { name: "YOLO / OpenCV", icon: "opencv.svg", level: 85, tags: ["Vision"] },
      { name: "Whisper / STT", icon: "tts-stt.svg", level: 90, tags: ["Audio"] },
      { name: "ElevenLabs / TTS", icon: "elevenlabs.svg", level: 90, tags: ["Audio"] },
      { name: "Prompt Engineering", icon: "cursor.svg", level: 98, tags: ["Core"] }
    ],
    cloud_devops: [
      { name: "AWS (Lambda/EC2)", icon: "aws.svg", level: 90, tags: ["Cloud", "Infra"] },
      { name: "GCP (Vertex AI/Firebase)", icon: "googlecloud.svg", level: 90, tags: ["Cloud", "AI"] },
      { name: "Azure / OpenAI", icon: "azure.svg", level: 85, tags: ["Cloud", "Enterprise"] },
      { name: "Supabase", icon: "supabase.svg", level: 90, tags: ["BaaS", "Postgres"] },
      { name: "Docker / Compose", icon: "docker.svg", level: 90, tags: ["Containers"] },
      { name: "GitHub Actions", icon: "github-actions.svg", level: 95, tags: ["CI/CD"] },
      { name: "Jenkins / CI", icon: "jenkins.svg", level: 80, tags: ["CI/CD"] },
      { name: "Fastlane", icon: "fastlane.svg", level: 95, tags: ["iOS", "Automation"] },
      { name: "Terraform / IaC", icon: "containerization.svg", level: 75, tags: ["Infrastructure"] },
      { name: "Vercel / Next.js", icon: "vercel.svg", level: 95, tags: ["Deployment"] },
      { name: "DataDog / Monitoring", icon: "datadog.svg", level: 85, tags: ["DevOps", "Observability"] }
    ],
    data_tools: [
      { name: "PostgreSQL", icon: "postgresql.svg", level: 90, tags: ["Database", "SQL"] },
      { name: "MongoDB", icon: "mongodb.svg", level: 90, tags: ["Database", "NoSQL"] },
      { name: "Pinecone / ChromaDB", icon: "chromadb.svg", level: 95, tags: ["Vector DB"] },
      { name: "Redis / Caching", icon: "redis.svg", level: 90, tags: ["Performance"] },
      { name: "GraphQL / Apollo", icon: "graphql.svg", level: 85, tags: ["API"] },
      { name: "Next.js / React", icon: "nextjs.svg", level: 95, tags: ["Frontend"] },
      { name: "Tailwind CSS", icon: "figma.svg", level: 95, tags: ["Styling"] },
      { name: "Three.js / WebGL", icon: "comfyui.svg", level: 80, tags: ["Graphics"] },
      { name: "Framer Motion", icon: "activitykit.svg", level: 90, tags: ["Animations"] },
      { name: "Obsidian / Zettelkasten", icon: "confluence.svg", level: 95, tags: ["Knowledge Management"] },
      { name: "Figma", icon: "figma.svg", level: 90, tags: ["Design"] },
      { name: "Xcode Instruments", icon: "xcode.svg", level: 95, tags: ["Profiling", "Performance"] },
      { name: "Git / GitHub", icon: "github.svg", level: 98, tags: ["Core"] },
      { name: "TDD / Agile", icon: "tdd.svg", level: 95, tags: ["Process"] },
      { name: "Cursor / AI IDE", icon: "cursor.svg", level: 98, tags: ["Productivity"] }
    ]
  }
};
