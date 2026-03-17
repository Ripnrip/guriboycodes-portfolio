import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";
import { Brain, Cpu, Globe, Database, Smartphone, Layout, Workflow, Terminal, Layers } from 'lucide-react';

const SkillGraph = () => {
  const { skills } = portfolioData;
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => Object.keys(skills), [skills]);
  
  // Calculate positions for orbiting nodes
  const nodes = useMemo(() => {
    const allNodes = [];
    const categoryRadius = {
      mobile: 140,
      ai_ml: 220,
      cloud_devops: 300,
      data_tools: 380
    };

    Object.entries(skills).forEach(([category, items], catIdx) => {
      const radius = categoryRadius[category] || (100 + catIdx * 80);
      items.forEach((skill, idx) => {
        const angle = (idx / items.length) * 2 * Math.PI;
        allNodes.push({
          ...skill,
          category,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          radius,
          angle
        });
      });
    });
    return allNodes;
  }, [skills]);

  const filteredNodes = useMemo(() => {
    if (activeCategory === 'all') return nodes;
    return nodes.filter(node => node.category === activeCategory);
  }, [nodes, activeCategory]);

  return (
    <section id="skill-graph" className="py-24 px-6 md:px-8 bg-background relative overflow-hidden min-h-[900px]">
      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Knowledge Ecosystem
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Interactive visualization of 100+ specialized tools and frameworks 
            orchestrated across my engineering career.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Badge 
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-1"
            onClick={() => setActiveCategory('all')}
          >
            All Skills
          </Badge>
          {categories.map(cat => (
            <Badge 
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-1 capitalize"
              onClick={() => setActiveCategory(cat)}
            >
              {cat.replace('_', ' & ')}
            </Badge>
          ))}
        </div>

        {/* Central Visualization Area */}
        <div className="relative w-full aspect-square max-w-[800px] flex items-center justify-center">
          {/* Orbiting Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[140, 220, 300, 380].map((r, i) => (
              <div 
                key={i}
                className="absolute rounded-full border border-primary/5"
                style={{ width: r * 2, height: r * 2 }}
              />
            ))}
          </div>

          {/* Center Sun Node */}
          <motion.div 
            className="relative z-20 w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/20 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.2)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-sm font-bold text-primary italic uppercase tracking-widest">Core</span>
            <span className="text-xs font-medium text-foreground/60">Expertise</span>
          </motion.div>

          {/* Skill Constellations */}
          <TooltipProvider>
            {filteredNodes.map((skill, idx) => (
              <motion.div
                key={`${skill.category}-${skill.name}`}
                className="absolute z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: skill.x,
                  y: skill.y
                }}
                transition={{ delay: idx * 0.01, type: 'spring', damping: 20 }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className={`group cursor-pointer p-2 rounded-full border border-primary/10 bg-card-gradient/50 backdrop-blur-md shadow-lg transition-all duration-300 ${
                        hoveredSkill?.name === skill.name ? 'scale-150 border-primary/50 z-50' : 'scale-100'
                      }`}
                      whileHover={{ scale: 1.5 }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all relative">
                        <img 
                          src={`/assets/icons/${skill.icon}`} 
                          alt={skill.name}
                          className="max-w-full max-h-full object-contain drop-shadow-[0_0_8px_rgba(var(--primary),0.3)] relative z-10"
                          onError={(e) => { 
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden absolute inset-0 items-center justify-center z-0">
                          {skill.category === 'mobile' && <Smartphone className="w-4 h-4 text-blue-400" />}
                          {skill.category === 'ai_ml' && <Brain className="w-4 h-4 text-purple-400" />}
                          {skill.category === 'cloud_devops' && <Cpu className="w-4 h-4 text-orange-400" />}
                          {skill.category === 'data_tools' && <Database className="w-4 h-4 text-green-400" />}
                        </div>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-black/90 border-primary/20 text-white p-3 rounded-xl max-w-xs backdrop-blur-xl">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-bold text-sm">{skill.name}</span>
                        <Badge variant="secondary" className="text-[10px] bg-primary/20 h-4">
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skill.tags?.map(tag => (
                          <span key={tag} className="text-[9px] uppercase tracking-tighter text-foreground/50 border border-foreground/10 px-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </TooltipProvider>

          {/* Connection Lines (Active Skill to Center) */}
          <AnimatePresence>
            {hoveredSkill && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <motion.line 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  x1="50%" 
                  y1="50%" 
                  x2={`calc(50% + ${hoveredSkill.x}px)`} 
                  y2={`calc(50% + ${hoveredSkill.y}px)`} 
                  stroke="rgba(var(--primary), 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            )}
          </AnimatePresence>
        </div>

        {/* Legend / Category Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="text-center group cursor-pointer" onClick={() => setActiveCategory(category)}>
              <div className={`text-3xl font-bold mb-2 transition-colors ${activeCategory === category ? 'text-primary' : 'text-foreground/40 group-hover:text-foreground/70'}`}>
                {items.length}
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-foreground/50">
                {category.replace('_', ' & ')}
              </div>
              <div className="mt-2 w-full h-1 bg-primary/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: activeCategory === category || activeCategory === 'all' ? '100%' : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default SkillGraph;
