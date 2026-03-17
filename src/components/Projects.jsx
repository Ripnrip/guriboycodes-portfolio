import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { ExternalLink, Github, Play, Smartphone, Brain, Search, Heart, GraduationCap, Globe, Music, Palette, BarChart3, Mic, BookOpen, Gamepad2 } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
      featured: false,
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
      featured: false,
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
      featured: true,
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
      featured: true,
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
      featured: true,
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

  return (
    <section id="projects" className="py-20 px-6 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            A showcase of innovative projects spanning AI/ML, mobile development, 
            creative storytelling, and community impact initiatives.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/50 text-foreground hover:bg-primary/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Spotlight key={project.id}>
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:scale-105 ${
                  project.featured 
                    ? 'md:col-span-2 lg:col-span-2 bg-card-gradient border-primary/50' 
                    : 'bg-card/80 hover:bg-card-gradient/50 border-border/50'
                } hover:border-primary/50 hover:shadow-lg`}
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/20 text-primary">
                        {project.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    {project.featured && (
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-foreground/80 mb-4">
                    {project.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs border-primary/30 text-foreground/70">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-primary/30 text-foreground/70">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {project.link && (
                      <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Spotlight>
          ))}
        </div>

        {/* Project Modal/Detail View */}
        {selectedProject && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Spotlight>
              <Card className="max-w-2xl w-full bg-card-gradient border-primary/50 max-h-[80vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/20 text-primary">
                        {selectedProject.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gradient">{selectedProject.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
                          {selectedProject.category}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedProject(null)}
                      className="text-foreground/60 hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-foreground/80 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    {selectedProject.link && (
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    )}
                    {selectedProject.github && (
                      <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Spotlight>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

