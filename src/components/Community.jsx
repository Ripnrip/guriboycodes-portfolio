import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { Users, BookOpen, MessageSquare, Heart, Play, GraduationCap, Building2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Ticker = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      let totalMiliseconds = 2000;
      let incrementTime = (totalMiliseconds / end);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl font-bold text-gradient">
      {count}{suffix}
    </span>
  );
};

const Community = () => {
  const { leadership } = portfolioData;
  const [activeMedia, setActiveMedia] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const communityVideos = [
    {
      title: "London Drone SAR (MLH Prime 2017)",
      file: "/videos/mlh-2017-drone-bbc.mp4",
      description: "BBC coverage of my first place win at MLH Prime London."
    },
    {
      title: "HackZurich - Carly AR Visualizer",
      file: "/videos/HackZurich - Carly.mp4",
      description: "AR car configurator demo from HackZurich 2.0."
    },
    {
      title: "HackZurich - Journey",
      file: "/videos/HackZurich2018.MP4",
      description: "Atmosphere and highlights from my HackZurich journey."
    }
  ];

  return (
    <section id="community" className="py-20 px-6 md:px-8 bg-background/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Leadership & Community
          </h2>
          <p className="text-cl text-foreground/80 max-w-3xl mx-auto italic">
            "{leadership.summary}"
          </p>
        </div>

        {/* Impact Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-8 mb-20 text-center">
          {leadership.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <Ticker value={stat.value} suffix={stat.suffix} />
              <span className="text-xs uppercase tracking-widest text-foreground/60 mt-2 font-semibold">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Initiatives List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">Leadership Initiatives</h3>
            <div className="space-y-4">
              {leadership.initiatives.map((item, idx) => (
                <Spotlight key={idx}>
                  <Card className="bg-card-gradient border-primary/10 hover:border-primary/40 transition-all duration-300">
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription className="text-xs font-medium text-primary uppercase tracking-tighter">
                            {item.role} • {item.organization}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-[10px] opacity-70">
                          {item.period}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground/70 mb-4 line-clamp-2 italic">
                        {item.description}
                      </p>
                      <div className="space-y-2">
                      {item.highlights?.slice(0, 2).map((hg, hIdx) => (
                          <div key={hIdx} className="flex items-center space-x-2 text-[11px] text-foreground/80">
                            <span className="h-1 w-1 bg-primary rounded-full shrink-0" />
                            <span>{hg}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-primary/5">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Impact: {item.impact}</span>
                      </div>
                    </CardHeader>
                  </Card>
                </Spotlight>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {/* Featured Community Project */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Featured Community Project</h3>
              <Spotlight>
                <Card className="bg-card-gradient border-primary/10 overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-24 w-24 text-primary fill-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gradient">{leadership.featuredProject.title}</CardTitle>
                    <CardDescription className="font-semibold text-primary">{leadership.featuredProject.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-sm text-foreground/80">
                      {leadership.featuredProject.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {leadership.featuredProject.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2 text-xs text-foreground/70">
                          <span className="h-1 w-1 bg-primary rounded-full shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {leadership.featuredProject.technologies.map((tech, tIdx) => (
                        <Badge key={tIdx} variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs font-medium text-foreground/50 border-t border-primary/5 pt-4">
                      {leadership.featuredProject.footer}
                    </p>
                  </CardContent>
                </Card>
              </Spotlight>
            </div>

            {/* Featured Media Ticker */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Featured Media</h3>
              <div className="grid grid-cols-1 gap-4">
                {communityVideos.map((video, vIdx) => (
                  <Card key={vIdx} className="bg-card-gradient/50 border-primary/10 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center h-24">
                      <div className="w-1/3 h-full bg-black flex items-center justify-center relative group cursor-pointer" onClick={() => setActiveMedia(video)}>
                        <video className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" src={video.file} muted loop onMouseOver={(e) => e.target.play()} onMouseOut={(e) => {e.target.pause(); e.target.currentTime = 0;}} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white bg-primary/80 rounded-full p-1.5" />
                        </div>
                      </div>
                      <div className="w-2/3 p-4">
                        <h4 className="text-sm font-bold text-foreground line-clamp-1">{video.title}</h4>
                        <p className="text-xs text-foreground/60 line-clamp-1">{video.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setActiveMedia(null)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-primary/20" onClick={(e) => e.stopPropagation()}>
            <video src={activeMedia.file} controls autoPlay className="w-full h-full" />
            <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black" onClick={() => setActiveMedia(null)}>
              <Users className="h-5 w-5 text-white transform rotate-45" />
            </div>
          </div>
        </div>
      )}

      {/* Easter Egg Trigger */}
      <div 
        className="fixed bottom-4 right-4 z-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer group"
        onClick={() => setActiveMedia({
          title: "Working with Me",
          file: "/videos/working-with-me.mp4",
          description: "A funny little look behind the scenes..."
        })}
      >
        <div className="bg-primary/10 text-primary p-2 rounded-full text-[10px] font-bold border border-primary/20 backdrop-blur-sm group-hover:bg-primary/30">
          👀 secret?
        </div>
      </div>
    </section>
  );
};

export default Community;
