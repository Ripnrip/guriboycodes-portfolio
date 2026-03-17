import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { portfolioData } from '../data/portfolio';
import { motion } from 'framer-motion';

const Skills = () => {
  const { skills } = portfolioData;

  // Transform skills for Radar Chart
  const radarData = Object.entries(skills).map(([category, items]) => ({
    category: category.replace('_', ' ').toUpperCase(),
    value: Math.round(items.reduce((acc, item) => acc + item.level, 0) / items.length),
    fullMark: 100,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="skills" className="py-20 px-6 md:px-8 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Technical Arsenal
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            A comprehensive mapping of my specialized domains, from deep iOS internals 
            to cutting-edge Agentic AI orchestration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Radar Chart Visual */}
          <div className="h-[400px] w-full bg-card-gradient/5 rounded-3xl p-4 border border-primary/10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(var(--primary), 0.2)" />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ fill: 'rgba(var(--foreground), 0.7)', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: 'rgba(var(--foreground), 0.5)' }} 
                />
                <Radar
                  name="Proficiency"
                  dataKey="value"
                  stroke="rgb(var(--primary))"
                  fill="rgb(var(--primary))"
                  fillOpacity={0.4}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'black', border: '1px solid #333' }}
                  itemStyle={{ color: 'white' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Domain Highlights */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Domain Expertise</h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <Spotlight key={category}>
                  <Card className="bg-card-gradient border-primary/10 group hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg capitalize">
                          {category.replace('_', ' & ')}
                        </CardTitle>
                        <Badge variant="outline" className="border-primary/20 text-primary">
                          {items.length} Skills
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Spotlight>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Skill Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={itemVariants} className="space-y-4">
              <h4 className="text-xl font-semibold capitalize border-b border-primary/10 pb-2 mb-6">
                {category.replace('_', ' & ')}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {items.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center justify-center p-4 bg-card-gradient border border-primary/5 rounded-2xl hover:border-primary/40 transition-all duration-300 group"
                  >
                    <div className="h-12 w-12 mb-3 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img 
                        src={`/assets/icons/${skill.icon}`} 
                        alt={skill.name} 
                        className="max-h-full max-w-full object-contain drop-shadow-[0_0_8px_rgba(var(--primary),0.3)]"
                        onError={(e) => {
                          e.target.src = '/favicon.ico'; // Fallback
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground text-center line-clamp-1">
                      {skill.name}
                    </span>
                    <div className="mt-2 w-full h-1 bg-primary/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
