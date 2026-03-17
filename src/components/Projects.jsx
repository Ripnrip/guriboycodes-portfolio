import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { MagicCard } from '@/components/ui/magic-card.jsx';
import { BorderBeam } from '@/components/ui/border-beam.jsx';
import { BlurFade } from '@/components/ui/blur-fade.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, Smartphone, Brain, Search, Heart, GraduationCap, Globe, Music, Palette, BarChart3, Mic, BookOpen, Gamepad2, X, Sparkles, Eye } from 'lucide-react';

// Ghibli image map for top 5 projects
const ghibliImages = {
  "Flow": "/images/projects/flow-ghibli.png",
  "Ethereal Dimension": "/images/projects/ethereal-dimension-ghibli.png",
  "Zai Vision Suite": "/images/projects/zai-vision-suite-ghibli.png",
  "Rosicrucian Knowledge Explorer": "/images/projects/rosicrucian-knowledge-explorer-ghibli.png",
  "Agentic News Transformer": "/images/projects/agentic-news-transformer-ghibli.png",
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  const projects = [
    {
      id: 1,
      title: "Flow",
      description: "Dynamic Island iOS app — beautiful, recent, uniquely Apple",
      longDescription: "A uniquely Apple-focused iOS application leveraging the Dynamic Island for a beautiful and intuitive user experience. Demonstrates advanced modern iOS development featuring rich animations and system integration.",
      icon: <Smartphone className="h-6 w-6" />,
      technologies: ["Swift", "SwiftUI", "Dynamic Island", "iOS", "Animations"],
      category: "Mobile",
      featured: true,
      github: "https://github.com/Ripnrip/Flow"
    },
    {
      id: 2,
      title: "Ethereal Dimension",
      description: "AI storytelling platform — creative flagship project",
      longDescription: "A cutting-edge storytelling platform that combines interactive narratives with immersive digital experiences. Features original stories showcasing advanced web technologies and creative AI storytelling.",
      icon: <Play className="h-6 w-6" />,
      technologies: ["React", "Next.js", "Three.js", "WebGL", "AI", "Storytelling"],
      category: "Creative",
      featured: true,
      link: "https://ethereal-dimension-nextjs.vercel.app",
      github: "https://github.com/Ripnrip/EtherealDimension"
    },
    {
      id: 3,
      title: "Zai Vision Suite",
      description: "Multi-platform AI vision suite utilizing GLM-4.6V",
      longDescription: "An advanced multi-platform AI vision suite that leverages the GLM-4.6V model for visual understanding and processing. Serves as a major AI/ML showcase for computer vision capabilities.",
      icon: <Brain className="h-6 w-6" />,
      technologies: ["Python", "GLM-4.6V", "Computer Vision", "AI/ML", "React"],
      category: "AI/ML",
      featured: true,
      github: "https://github.com/Ripnrip/zai-vision-suite"
    },
    {
      id: 4,
      title: "AI IDE Setup & Workflows",
      description: "Optimized development environment configurations for AI pairs",
      longDescription: "A comprehensive collection of dotfiles, scripts, and MCP server configurations designed to maximize productivity when pair programming with AI assistants like Claude, Cursor, and GitHub Copilot.",
      icon: <Brain className="h-6 w-6" />,
      technologies: ["Bash", "MCP", "AI Tooling", "Config", "Productivity"],
      category: "Tools",
      featured: false,
      github: "https://github.com/Ripnrip/ai-ide-setup"
    },
    {
      id: 5,
      title: "Rosicrucian Knowledge Explorer",
      description: "RAG search engine exploring esoteric knowledge",
      longDescription: "A sophisticated search engine using Retrieval-Augmented Generation (RAG) to explore complex texts. Features deep technical integration with Vector databases and advanced AI semantic search.",
      icon: <Search className="h-6 w-6" />,
      technologies: ["Python", "RAG", "Vector DB", "OpenAI", "Semantic Search"],
      category: "AI/ML",
      featured: true,
      link: "https://rosicrucian-knowledge-explorer.vercel.app",
      github: "https://github.com/noeticactivity/Rosicrucian-Knowledge-Explorer"
    },
    {
      id: 6,
      title: "Agentic News Transformer",
      description: "Agentic AI news ecosystem built with Python",
      longDescription: "A fully automated ecosystem that leverages AI agents to curate, transform, and deliver news. Showcases advanced orchestration of Python-based AI agents for dynamic content generation.",
      icon: <Brain className="h-6 w-6" />,
      technologies: ["Python", "AI Agents", "Automation", "LLMs", "News Context"],
      category: "AI/ML",
      featured: true,
      github: "https://github.com/Ripnrip/Agentic-News-Transformer"
    },
    {
      id: 7,
      title: "Gurduwara Langar Game",
      description: "Gamified Sikh heritage application for community impact",
      longDescription: "An interactive educational application designed to teach Sikh culture and the Langar tradition through gamification. Built as an impactful community ERG project.",
      icon: <Heart className="h-6 w-6" />,
      technologies: ["React Native", "Gamification", "Education", "Cultural Impact"],
      category: "Community",
      featured: false,
      github: "https://github.com/Ripnrip/GurduwaraLangarGame"
    },
    {
      id: 8,
      title: "Ethereal Search Showcase",
      description: "Next-gen AI search experience visualization",
      longDescription: "A sophisticated frontend showcase demonstrating the capabilities of the Ethereal Search engine. Features an immersive UI exploring how AI can transform search and discovery.",
      icon: <Search className="h-6 w-6" />,
      technologies: ["React", "Next.js", "AI Search", "UI/UX", "Vercel"],
      category: "AI/ML",
      featured: false,
      link: "https://etherealsearch-showcase.vercel.app"
    },
    {
      id: 9,
      title: "Artful Archives",
      description: "Creative digital preservation platform",
      longDescription: "A visually stunning website designed to archive and showcase creative artifacts. Built to emphasize aesthetics, smooth interactions, and performant delivery.",
      icon: <Play className="h-6 w-6" />,
      technologies: ["React", "Performance", "Animation", "Creative", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://artful-archives-website.vercel.app"
    },
    {
      id: 10,
      title: "Ethereal Explorer",
      description: "Immersive spatial computing experience on the web",
      longDescription: "A cutting-edge web application pushing the boundaries of 3D and spatial design in the browser. Showcases advanced WebGL and interactive web elements.",
      icon: <Brain className="h-6 w-6" />,
      technologies: ["React", "WebGL", "Three.js", "Spatial UI", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://v0-ethereal-explorer.vercel.app"
    },
    {
      id: 11,
      title: "Rosicrucian Parenting",
      description: "Full-stack parenting platform with iOS & Android apps",
      longDescription: "A comprehensive parenting platform built from the ground up, including a responsive website and native mobile apps for both iOS and Android. Features community resources and educational content.",
      icon: <Heart className="h-6 w-6" />,
      technologies: ["Flutter", "iOS", "Android", "Web", "Full Stack"],
      category: "Mobile",
      featured: false,
      link: "https://rosicrucian-parenting.org/"
    },
    {
      id: 12,
      title: "Rosicrucian Vowel Sounds",
      description: "Cross-platform Flutter app on App Store & Play Store",
      longDescription: "A beautifully crafted Flutter application published on both the Apple App Store and Google Play Store. Guides users through vowel sound exercises with an intuitive, immersive audio experience.",
      icon: <Music className="h-6 w-6" />,
      technologies: ["Flutter", "Dart", "iOS", "Android", "Audio"],
      category: "Mobile",
      featured: false,
      link: "https://apps.apple.com/us/app/rosicrucian-vowel-sounds/id6529521816"
    },
    {
      id: 13,
      title: "Hylios — Ethereal Dimension",
      description: "Published iOS game within the Ethereal Dimension universe",
      longDescription: "An immersive iOS gaming experience set in the Ethereal Dimension universe. Published on the App Store, Hylios blends storytelling with interactive gameplay and stunning visuals.",
      icon: <Gamepad2 className="h-6 w-6" />,
      technologies: ["Swift", "SpriteKit", "iOS", "Game Design", "Storytelling"],
      category: "Mobile",
      featured: false,
      link: "https://apps.apple.com/us/app/hylios/id6474466548"
    },
    {
      id: 14,
      title: "Barricades — Austin Project",
      description: "Interactive narrative experience within Ethereal Dimension",
      longDescription: "An interactive storytelling experience exploring the Austin narrative within the Ethereal Dimension platform. Combines rich visual design with engaging interactive elements.",
      icon: <Play className="h-6 w-6" />,
      technologies: ["React", "Next.js", "Storytelling", "Interactive", "Animation"],
      category: "Creative",
      featured: false,
      link: "https://etherealdimension.io/#austin"
    },
    {
      id: 15,
      title: "Cycles of Fate",
      description: "Dynamic web experience exploring fate and destiny",
      longDescription: "A visually rich web application exploring themes of fate, cycles, and destiny through interactive design and engaging animations. Deployed on Vercel.",
      icon: <Globe className="h-6 w-6" />,
      technologies: ["React", "Next.js", "Animation", "Vercel", "Creative"],
      category: "Creative",
      featured: false,
      link: "https://cycles-of-fate.vercel.app/"
    },
    {
      id: 16,
      title: "Geometric Graph Design",
      description: "Stunning generative geometric visualizations",
      longDescription: "A generative art application that creates stunning geometric graph designs using mathematical algorithms. Showcases creative coding and data visualization techniques.",
      icon: <BarChart3 className="h-6 w-6" />,
      technologies: ["React", "Canvas", "Generative Art", "Math", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://v0-geometric-graph-design.vercel.app/"
    },
    {
      id: 17,
      title: "Voice Practice Hub",
      description: "Audio-powered voice training and practice platform",
      longDescription: "An interactive voice training platform designed for guided vocal practice sessions. Features audio playback, progress tracking, and structured lesson plans.",
      icon: <Mic className="h-6 w-6" />,
      technologies: ["React", "Web Audio", "Next.js", "Education", "Vercel"],
      category: "Tools",
      featured: false,
      link: "https://voice-practice-hub.vercel.app/"
    },
    {
      id: 18,
      title: "Audio Dialogues",
      description: "Interactive audio conversation experience",
      longDescription: "A unique web application for interactive audio-based dialogues. Combines AI and audio processing to create engaging conversational experiences.",
      icon: <Mic className="h-6 w-6" />,
      technologies: ["React", "Audio API", "AI", "Vercel", "Next.js"],
      category: "AI/ML",
      featured: false,
      link: "https://audio-dialogues.vercel.app"
    },
    {
      id: 19,
      title: "My4Blocks",
      description: "Block-based interactive web experience",
      longDescription: "A creative block-based interactive web application exploring modular design and component composition. Built with modern web technologies and deployed on Vercel.",
      icon: <Palette className="h-6 w-6" />,
      technologies: ["React", "Modular Design", "Interactive", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://my4blocks.vercel.app"
    },
    {
      id: 20,
      title: "Blog Layouts for Artful Archives",
      description: "Design system and layout concepts for creative blogging",
      longDescription: "A collection of beautifully designed blog layout concepts created for the Artful Archives brand. Showcases typography, spacing, and visual hierarchy for content-first design.",
      icon: <BookOpen className="h-6 w-6" />,
      technologies: ["React", "CSS", "Typography", "Design System", "Vercel"],
      category: "Creative",
      featured: false,
      link: "https://v0-blog-layouts.vercel.app/"
    }
  ];

  const categories = ["All", "AI/ML", "Mobile", "Creative", "Community", "Tools"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const hasGhibliImage = (title) => ghibliImages[title] != null;

  return (
    <section id="projects" className="py-20 px-6 md:px-8 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              20 Projects & Counting
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              A showcase of innovative projects spanning AI/ML, mobile development,
              creative storytelling, and community impact initiatives.
            </p>
          </div>
        </BlurFade>

        {/* Category Filter */}
        <BlurFade delay={0.2} inView>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`transition-all duration-300 ${activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "border-primary/30 text-foreground/70 hover:bg-primary/10 hover:text-foreground hover:border-primary/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </BlurFade>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const hasImage = hasGhibliImage(project.title);
            const isFeatured = project.featured;

            return (
              <BlurFade key={project.id} delay={0.1 + index * 0.05} inView>
                <MagicCard
                  className={`h-full transition-all duration-500`}
                  gradientFrom={isFeatured ? "#9E7AFF" : "#6366f1"}
                  gradientTo={isFeatured ? "#FE8BBB" : "#8b5cf6"}
                  gradientOpacity={0.15}
                >
                  <div
                    className="h-full cursor-pointer group relative"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Ghibli Image Banner */}
                    {hasImage && (
                      <div className="relative overflow-hidden rounded-t-xl">
                        <div className="aspect-video relative">
                          <img
                            src={ghibliImages[project.title]}
                            alt={`${project.title} — Ghibli-style illustration`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onLoad={() => setImageLoaded(prev => ({ ...prev, [project.id]: true }))}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                          {/* Ghibli sparkle indicator */}
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 text-xs font-medium text-primary">
                            <Sparkles className="h-3 w-3" />
                            AI Generated
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className={`p-6 ${hasImage ? 'pt-4' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2.5 rounded-xl ${
                            isFeatured
                              ? 'bg-gradient-to-br from-primary/30 to-accent/30 text-primary shadow-lg shadow-primary/10'
                              : 'bg-primary/15 text-primary'
                          }`}>
                            {project.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                              {project.title}
                            </CardTitle>
                            <Badge
                              variant="secondary"
                              className="mt-1 text-xs bg-primary/10 text-primary/80 border-primary/20"
                            >
                              {project.category}
                            </Badge>
                          </div>
                        </div>
                        {isFeatured && (
                          <Badge className="bg-gradient-to-r from-primary to-pink-500 text-white border-0 shadow-lg shadow-primary/20">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <p className="text-foreground/60 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/50 border border-foreground/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary/70 border border-primary/20">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2 border-t border-foreground/5">
                        {project.link && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                            asChild
                          >
                            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <Eye className="h-3.5 w-3.5 mr-1.5" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.github && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-foreground/20 text-foreground/70 hover:bg-foreground/5 hover:border-foreground/30 transition-all duration-300"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <Github className="h-3.5 w-3.5 mr-1.5" />
                              Source
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Border Beam for featured projects */}
                    {isFeatured && (
                      <BorderBeam
                        size={120}
                        duration={8}
                        colorFrom="#9E7AFF"
                        colorTo="#FE8BBB"
                        borderWidth={2}
                      />
                    )}
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="max-w-3xl w-full"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <MagicCard
                  gradientFrom="#9E7AFF"
                  gradientTo="#FE8BBB"
                  gradientOpacity={0.1}
                  className="overflow-hidden"
                >
                  <div className="max-h-[85vh] overflow-y-auto">
                    {/* Modal Ghibli Image */}
                    {hasGhibliImage(selectedProject.title) && (
                      <div className="relative">
                        <img
                          src={ghibliImages[selectedProject.title]}
                          alt={`${selectedProject.title} — Ghibli-style illustration`}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      </div>
                    )}

                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary shadow-lg shadow-primary/10">
                            {selectedProject.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gradient">{selectedProject.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                {selectedProject.category}
                              </Badge>
                              {selectedProject.featured && (
                                <Badge className="bg-gradient-to-r from-primary to-pink-500 text-white border-0">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProject(null)}
                          className="text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-full h-9 w-9 p-0"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/70 leading-relaxed mb-6 text-base">
                        {selectedProject.longDescription}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-primary/10 text-primary border border-primary/20 px-3 py-1"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-foreground/10">
                        {selectedProject.link && (
                          <Button
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                            asChild
                          >
                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </a>
                          </Button>
                        )}
                        {selectedProject.github && (
                          <Button
                            variant="outline"
                            className="border-foreground/20 text-foreground/70 hover:bg-foreground/5"
                            asChild
                          >
                            <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              View Source
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <BorderBeam size={150} duration={10} colorFrom="#9E7AFF" colorTo="#FE8BBB" />
                </MagicCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
