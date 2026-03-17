import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { ExternalLink, Github, Play, Smartphone, Brain, Search, Heart, GraduationCap, Globe, Music, Palette, BarChart3, Mic, BookOpen, Gamepad2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const CategoryIcon = ({ category }) => {
  const iconProps = { className: "h-6 w-6" };
  switch (category) {
    case 'Mobile': return <Smartphone {...iconProps} />;
    case 'AI/ML': return <Brain {...iconProps} />;
    case 'Creative': return <Play {...iconProps} />;
    case 'Tools': return <Search {...iconProps} />;
    case 'Community': return <Heart {...iconProps} />;
    default: return <Brain {...iconProps} />;
  }
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = portfolioData;

  const categories = ["All", ...new Set(projects.map(p => p.category))];
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
            A showcase of {projects.length} innovative projects spanning AI/ML, mobile development, 
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
          {filteredProjects.map((project) => (
            <Spotlight key={project.id}>
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:scale-105 ${
                  project.featured 
                    ? 'md:col-span-2 lg:col-span-2 bg-card-gradient border-primary/50' 
                    : 'bg-card/80 hover:bg-card-gradient/50 border-border/50'
                } hover:border-primary/50 hover:shadow-lg`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl group bg-muted">
                  <img 
                    src={project.ghibliImage || `/projects/project-${project.id}.png`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background object-cover transition-colors duration-500" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/20 text-primary">
                        <CategoryIcon category={project.category} />
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
                  <CardDescription className="text-foreground/80 mb-4 line-clamp-2">
                    {project.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech, techIndex) => (
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
                        <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.video && (
                      <Button size="sm" variant="outline" className="border-indigo-500/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors duration-300" asChild>
                        <a href={project.video} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <Play className="h-4 w-4 mr-1" />
                          Explainer
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
                <div className="relative w-full h-64 overflow-hidden rounded-t-xl mb-4 bg-muted">
                  <img 
                    src={selectedProject.ghibliImage || `/projects/project-${selectedProject.id}.png`} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/20 text-primary">
                        <CategoryIcon category={selectedProject.category} />
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
                      {selectedProject.technologies?.map((tech, index) => (
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
                    {selectedProject.video && (
                      <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white dark:text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95" asChild>
                        <a href={selectedProject.video} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Explainer
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

