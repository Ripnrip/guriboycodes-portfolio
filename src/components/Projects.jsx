import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { 
  ExternalLink, Github, Play, Smartphone, Brain, Search, Heart, 
  GraduationCap, Globe, Music, Palette, BarChart3, Mic, BookOpen, 
  Gamepad2, X, ChevronRight, Sparkles, Star, ArrowUpRight
} from 'lucide-react';

/* ─── Image slug map for Ghibli-generated project art ─── */
const IMAGE_SLUGS = {
  1: 'flow',
  2: 'ethereal-dimension',
  3: 'zai-vision-suite',
  4: 'ai-ide-setup',
  5: 'rosicrucian-knowledge-explorer',
  6: 'agentic-news-transformer',
  7: 'gurduwara-langar-game',
  8: 'ethereal-search-showcase',
  9: 'artful-archives',
  10: 'ethereal-explorer',
  11: 'rosicrucian-parenting',
  12: 'rosicrucian-vowel-sounds',
  13: 'hylios',
  14: 'barricades-austin',
  15: 'cycles-of-fate',
  16: 'geometric-graph-design',
  17: 'voice-practice-hub',
  18: 'audio-dialogues',
  19: 'my4blocks',
  20: 'blog-layouts-artful',
};

const getProjectImage = (id) => `/project-images/${IMAGE_SLUGS[id]}.jpg`;

/* ─── Category color mapping ─── */
const CATEGORY_COLORS = {
  'AI/ML': { bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/30', glow: 'shadow-violet-500/20' },
  'Mobile': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  'Creative': { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30', glow: 'shadow-rose-500/20' },
  'Community': { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  'Tools': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [imageLoaded, setImageLoaded] = useState({});
  const gridRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Flow",
      description: "Dynamic Island iOS app with rich animations and deep system integration",
      longDescription: "A uniquely Apple-focused iOS application leveraging the Dynamic Island for a beautiful and intuitive user experience. Demonstrates advanced modern iOS development featuring rich state-driven animations, SwiftUI architecture, and deep system integration. Built to showcase what's possible with Apple's latest hardware capabilities.",
      icon: <Smartphone className="h-5 w-5" />,
      technologies: ["Swift", "SwiftUI", "Dynamic Island", "iOS 17", "Live Activities", "WidgetKit"],
      category: "Mobile",
      featured: true,
      github: "https://github.com/Ripnrip/Flow",
      highlight: "Patent-inspired Dynamic Island integration"
    },
    {
      id: 2,
      title: "Ethereal Dimension",
      description: "AI-powered interactive storytelling platform with immersive 3D worlds",
      longDescription: "A cutting-edge storytelling platform that combines interactive narratives with immersive digital experiences. Features original stories, 3D environments powered by Three.js and WebGL, and AI-driven narrative branching. The creative flagship of the portfolio, showcasing the intersection of technology and storytelling.",
      icon: <Play className="h-5 w-5" />,
      technologies: ["React", "Next.js", "Three.js", "WebGL", "AI", "Storytelling"],
      category: "Creative",
      featured: true,
      link: "https://ethereal-dimension-nextjs.vercel.app",
      github: "https://github.com/Ripnrip/EtherealDimension",
      highlight: "Full creative universe with multiple sub-projects"
    },
    {
      id: 3,
      title: "Zai Vision Suite",
      description: "Multi-platform AI vision suite utilizing GLM-4.6V for visual understanding",
      longDescription: "An advanced multi-platform AI vision suite that leverages the GLM-4.6V model for visual understanding and processing. Features real-time image analysis, object detection, and scene understanding capabilities. Serves as a major AI/ML showcase for computer vision at production scale.",
      icon: <Brain className="h-5 w-5" />,
      technologies: ["Python", "GLM-4.6V", "Computer Vision", "AI/ML", "React", "FastAPI"],
      category: "AI/ML",
      featured: true,
      github: "https://github.com/Ripnrip/zai-vision-suite",
      highlight: "Production-grade computer vision pipeline"
    },
    {
      id: 4,
      title: "AI IDE Setup & Workflows",
      description: "Optimized development environment for AI-assisted pair programming",
      longDescription: "A comprehensive collection of dotfiles, scripts, and MCP server configurations designed to maximize productivity when pair programming with AI assistants. Includes configurations for Claude, Cursor, GitHub Copilot, and custom MCP server integrations that power autonomous development workflows.",
      icon: <Brain className="h-5 w-5" />,
      technologies: ["Bash", "MCP Servers", "AI Tooling", "Cursor", "Claude", "Productivity"],
      category: "Tools",
      featured: false,
      github: "https://github.com/Ripnrip/ai-ide-setup",
      highlight: "MCP server orchestration for AI agents"
    },
    {
      id: 5,
      title: "Rosicrucian Knowledge Explorer",
      description: "RAG-powered semantic search engine for esoteric knowledge discovery",
      longDescription: "A sophisticated search engine using Retrieval-Augmented Generation (RAG) to explore complex philosophical and esoteric texts. Features deep technical integration with Pinecone vector databases, OpenAI embeddings, and advanced semantic search with citation tracking and source attribution.",
      icon: <Search className="h-5 w-5" />,
      technologies: ["Python", "RAG", "Pinecone", "OpenAI", "Semantic Search", "Vector DB"],
      category: "AI/ML",
      featured: false,
      link: "https://rosicrucian-knowledge-explorer.vercel.app",
      github: "https://github.com/noeticactivity/Rosicrucian-Knowledge-Explorer",
      highlight: "Full RAG pipeline with vector search"
    },
    {
      id: 6,
      title: "Agentic News Transformer",
      description: "Autonomous AI agent ecosystem for intelligent news curation",
      longDescription: "A fully automated ecosystem that leverages AI agents to curate, transform, and deliver news content. Showcases advanced orchestration of Python-based AI agents using LangChain and CrewAI for dynamic content generation, fact-checking, and multi-source aggregation.",
      icon: <Brain className="h-5 w-5" />,
      technologies: ["Python", "AI Agents", "LangChain", "CrewAI", "LLMs", "Automation"],
      category: "AI/ML",
      featured: false,
      github: "https://github.com/Ripnrip/Agentic-News-Transformer",
      highlight: "Multi-agent orchestration system"
    },
    {
      id: 7,
      title: "Gurduwara Langar Game",
      description: "Gamified Sikh heritage app teaching community service through play",
      longDescription: "An interactive educational application designed to teach Sikh culture and the Langar (community kitchen) tradition through gamification. Built as an impactful community ERG project that brings cultural education to life through engaging gameplay mechanics and beautiful visual design.",
      icon: <Heart className="h-5 w-5" />,
      technologies: ["React Native", "Gamification", "Education", "Cultural Impact", "Mobile"],
      category: "Community",
      featured: false,
      github: "https://github.com/Ripnrip/GurduwaraLangarGame",
      highlight: "ERG community impact project"
    },
    {
      id: 8,
      title: "Ethereal Search Showcase",
      description: "Next-generation AI search experience with immersive visualization",
      longDescription: "A sophisticated frontend showcase demonstrating the capabilities of the Ethereal Search engine. Features an immersive UI exploring how AI can transform search and discovery with real-time results, semantic clustering, and visual knowledge graphs.",
      icon: <Search className="h-5 w-5" />,
      technologies: ["React", "Next.js", "AI Search", "UI/UX", "Vercel"],
      category: "AI/ML",
      featured: false,
      link: "https://etherealsearch-showcase.vercel.app",
      highlight: "AI-powered search visualization"
    },
    {
      id: 9,
      title: "Artful Archives",
      description: "Visually stunning digital preservation and creative showcase platform",
      longDescription: "A beautifully designed website for archiving and showcasing creative artifacts. Built to emphasize aesthetics, smooth interactions, and performant delivery with lazy loading, optimized images, and fluid animations.",
      icon: <Play className="h-5 w-5" />,
      technologies: ["React", "Performance", "Animation", "Creative", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://artful-archives-website.vercel.app",
      highlight: "Performance-optimized creative showcase"
    },
    {
      id: 10,
      title: "Ethereal Explorer",
      description: "Immersive spatial computing experience pushing browser boundaries",
      longDescription: "A cutting-edge web application pushing the boundaries of 3D and spatial design in the browser. Showcases advanced WebGL rendering, interactive spatial navigation, and immersive environments that hint at the future of spatial computing on the web.",
      icon: <Brain className="h-5 w-5" />,
      technologies: ["React", "WebGL", "Three.js", "Spatial UI", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://v0-ethereal-explorer.vercel.app",
      highlight: "Spatial computing in the browser"
    },
    {
      id: 11,
      title: "Rosicrucian Parenting",
      description: "Full-stack parenting platform with native iOS & Android apps",
      longDescription: "A comprehensive parenting platform built from the ground up, including a responsive website and native mobile apps for both iOS and Android using Flutter. Features community resources, educational content, and a thoughtful design system that serves thousands of families.",
      icon: <Heart className="h-5 w-5" />,
      technologies: ["Flutter", "iOS", "Android", "Web", "Full Stack", "Dart"],
      category: "Mobile",
      featured: true,
      link: "https://rosicrucian-parenting.org/",
      highlight: "Cross-platform app serving thousands of families"
    },
    {
      id: 12,
      title: "Rosicrucian Vowel Sounds",
      description: "Published Flutter app on App Store & Play Store for vocal practice",
      longDescription: "A beautifully crafted Flutter application published on both the Apple App Store and Google Play Store. Guides users through vowel sound exercises with an intuitive, immersive audio experience featuring high-quality recordings and progress tracking.",
      icon: <Music className="h-5 w-5" />,
      technologies: ["Flutter", "Dart", "iOS", "Android", "Audio", "App Store"],
      category: "Mobile",
      featured: true,
      link: "https://apps.apple.com/us/app/rosicrucian-vowel-sounds/id6529521816",
      highlight: "Published on both App Store & Play Store"
    },
    {
      id: 13,
      title: "Hylios",
      description: "Published iOS game set in the Ethereal Dimension universe",
      longDescription: "An immersive iOS gaming experience set in the Ethereal Dimension universe. Published on the App Store, Hylios blends storytelling with interactive gameplay using SpriteKit, featuring stunning hand-crafted visuals and an original soundtrack.",
      icon: <Gamepad2 className="h-5 w-5" />,
      technologies: ["Swift", "SpriteKit", "iOS", "Game Design", "Storytelling", "App Store"],
      category: "Mobile",
      featured: true,
      link: "https://apps.apple.com/us/app/hylios/id6474466548",
      highlight: "Published iOS game on the App Store"
    },
    {
      id: 14,
      title: "Barricades — Austin",
      description: "Interactive narrative experience within the Ethereal Dimension",
      longDescription: "An interactive storytelling experience exploring the Austin narrative within the Ethereal Dimension platform. Combines rich visual design with engaging interactive elements, branching narratives, and cinematic presentation.",
      icon: <Play className="h-5 w-5" />,
      technologies: ["React", "Next.js", "Storytelling", "Interactive", "Animation"],
      category: "Creative",
      featured: false,
      link: "https://etherealdimension.io/#austin",
      highlight: "Cinematic interactive storytelling"
    },
    {
      id: 15,
      title: "Cycles of Fate",
      description: "Dynamic web experience exploring themes of fate and cosmic cycles",
      longDescription: "A visually rich web application exploring themes of fate, cycles, and destiny through interactive design and engaging animations. Features generative visuals, philosophical narratives, and an immersive cosmic aesthetic.",
      icon: <Globe className="h-5 w-5" />,
      technologies: ["React", "Next.js", "Animation", "Generative Art", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://cycles-of-fate.vercel.app/",
      highlight: "Generative art meets philosophy"
    },
    {
      id: 16,
      title: "Geometric Graph Design",
      description: "Generative geometric visualizations using mathematical algorithms",
      longDescription: "A generative art application that creates stunning geometric graph designs using mathematical algorithms. Showcases creative coding, sacred geometry, and data visualization techniques with interactive controls.",
      icon: <BarChart3 className="h-5 w-5" />,
      technologies: ["React", "Canvas", "Generative Art", "Mathematics", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://v0-geometric-graph-design.vercel.app/",
      highlight: "Sacred geometry meets creative coding"
    },
    {
      id: 17,
      title: "Voice Practice Hub",
      description: "Audio-powered voice training platform with structured lessons",
      longDescription: "An interactive voice training platform designed for guided vocal practice sessions. Features audio playback, progress tracking, structured lesson plans, and real-time feedback visualization.",
      icon: <Mic className="h-5 w-5" />,
      technologies: ["React", "Web Audio API", "Next.js", "Education", "Vercel"],
      category: "Tools",
      featured: false,
      link: "https://voice-practice-hub.vercel.app/",
      highlight: "Web Audio API integration"
    },
    {
      id: 18,
      title: "Audio Dialogues",
      description: "Interactive audio conversation experience powered by AI",
      longDescription: "A unique web application for interactive audio-based dialogues. Combines AI and audio processing to create engaging conversational experiences with natural speech synthesis and real-time audio visualization.",
      icon: <Mic className="h-5 w-5" />,
      technologies: ["React", "Audio API", "AI", "Speech Synthesis", "Next.js"],
      category: "AI/ML",
      featured: false,
      link: "https://audio-dialogues.vercel.app",
      highlight: "AI-powered audio conversations"
    },
    {
      id: 19,
      title: "My4Blocks",
      description: "Block-based interactive web experience with modular design",
      longDescription: "A creative block-based interactive web application exploring modular design and component composition. Built with modern web technologies featuring drag-and-drop interactions and playful visual design.",
      icon: <Palette className="h-5 w-5" />,
      technologies: ["React", "Modular Design", "Interactive", "Vercel", "CSS"],
      category: "Creative",
      featured: false,
      link: "https://my4blocks.vercel.app",
      highlight: "Modular component architecture"
    },
    {
      id: 20,
      title: "Blog Layouts for Artful Archives",
      description: "Design system and typography-first layout concepts for creative blogging",
      longDescription: "A collection of beautifully designed blog layout concepts created for the Artful Archives brand. Showcases typography, spacing, visual hierarchy, and content-first design principles with multiple responsive layout variations.",
      icon: <BookOpen className="h-5 w-5" />,
      technologies: ["React", "CSS", "Typography", "Design System", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://v0-blog-layouts.vercel.app/",
      highlight: "Typography-first design system"
    }
  ];

  const categories = ["All", "AI/ML", "Mobile", "Creative", "Community", "Tools"];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-8 bg-background relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">20 Projects & Counting</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            From AI agents and RAG pipelines to published App Store games and cross-platform mobile apps — 
            a decade of building products used by millions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((category) => {
            const colors = CATEGORY_COLORS[category] || {};
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? category === "All" 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                      : `${colors.bg} ${colors.text} ${colors.border} border shadow-lg ${colors.glow}`
                    : 'bg-card/50 text-foreground/60 border border-border/50 hover:bg-card hover:text-foreground/80 hover:border-border'
                  }
                `}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    {projects.filter(p => p.category === category).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Featured Projects — Large Cards */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredProjects.map((project) => {
                const colors = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['Creative'];
                return (
                  <Spotlight key={project.id}>
                    <Card 
                      className="group h-full cursor-pointer transition-all duration-500 bg-card/60 border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Image Section */}
                      <div className="relative h-52 md:h-60 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br from-card via-card/80 to-card/60 transition-opacity duration-700 z-10 ${imageLoaded[project.id] ? 'opacity-0' : 'opacity-100'}`} />
                        <img 
                          src={getProjectImage(project.id)}
                          alt={`${project.title} — Ghibli-style illustration`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onLoad={() => handleImageLoad(project.id)}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent z-20" />
                        
                        {/* Featured badge */}
                        <div className="absolute top-4 right-4 z-30">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </div>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 z-30">
                          <div className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-sm text-xs font-medium`}>
                            {project.category}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6 relative z-30 -mt-8">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} ${colors.border} border`}>
                              {project.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              {project.highlight && (
                                <p className="text-xs text-primary/80 mt-0.5 font-medium">{project.highlight}</p>
                              )}
                            </div>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-foreground/30 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>

                        <p className="text-sm text-foreground/70 mb-4 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-muted/50 text-foreground/60 text-xs border border-border/30">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary/70 text-xs border border-primary/20">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Live Demo
                            </a>
                          )}
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-foreground/70 text-xs font-medium border border-border/30 hover:bg-muted hover:text-foreground transition-colors"
                            >
                              <Github className="h-3.5 w-3.5" />
                              Source
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Spotlight>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Projects — Compact Grid */}
        {otherProjects.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project) => {
              const colors = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['Creative'];
              return (
                <Spotlight key={project.id}>
                  <Card 
                    className="group h-full cursor-pointer transition-all duration-500 bg-card/40 border-border/40 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Compact Image */}
                    <div className="relative h-40 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br from-card via-card/80 to-card/60 transition-opacity duration-700 z-10 ${imageLoaded[project.id] ? 'opacity-0' : 'opacity-100'}`} />
                      <img 
                        src={getProjectImage(project.id)}
                        alt={`${project.title} — Ghibli-style illustration`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onLoad={() => handleImageLoad(project.id)}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-20" />
                      
                      <div className="absolute top-3 left-3 z-30">
                        <div className={`px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-sm text-[10px] font-medium`}>
                          {project.category}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-5 relative z-30 -mt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                            {project.icon}
                          </div>
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-foreground/20 group-hover:text-primary/60 transition-all flex-shrink-0 mt-1" />
                      </div>

                      {project.highlight && (
                        <p className="text-[11px] text-primary/70 mb-2 font-medium">{project.highlight}</p>
                      )}

                      <p className="text-xs text-foreground/60 mb-3 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-muted/40 text-foreground/50 text-[10px] border border-border/20">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-primary/5 text-primary/50 text-[10px]">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[11px] font-medium hover:bg-primary/20 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Demo
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted/40 text-foreground/60 text-[11px] font-medium hover:bg-muted hover:text-foreground/80 transition-colors"
                          >
                            <Github className="h-3 w-3" />
                            Code
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Spotlight>
              );
            })}
          </div>
        )}

        {/* Powered by AI badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border/40 text-foreground/40 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary/50" />
            Project illustrations generated with Google Nano Banana (Gemini 2.5 Flash) via Replicate API
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <img 
                  src={getProjectImage(selectedProject.id)}
                  alt={`${selectedProject.title} — Ghibli-style illustration`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-foreground/60 hover:text-foreground hover:bg-card transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2.5 rounded-xl ${CATEGORY_COLORS[selectedProject.category]?.bg || 'bg-primary/15'} ${CATEGORY_COLORS[selectedProject.category]?.text || 'text-primary'} border ${CATEGORY_COLORS[selectedProject.category]?.border || 'border-primary/30'}`}>
                      {selectedProject.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">{selectedProject.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${CATEGORY_COLORS[selectedProject.category]?.bg || 'bg-primary/15'} ${CATEGORY_COLORS[selectedProject.category]?.text || 'text-primary'} border-0 text-xs`}>
                          {selectedProject.category}
                        </Badge>
                        {selectedProject.featured && (
                          <Badge className="bg-primary/90 text-primary-foreground border-0 text-xs">
                            <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {selectedProject.highlight && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/15">
                    <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                    <p className="text-sm text-primary font-medium">{selectedProject.highlight}</p>
                  </div>
                )}

                <p className="text-foreground/80 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
                
                <div>
                  <h4 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 rounded-lg bg-muted/50 text-foreground/70 text-sm border border-border/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.link && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live Project
                    </a>
                  )}
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted/50 text-foreground/80 font-medium text-sm border border-border/50 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
