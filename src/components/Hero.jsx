import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { AnimatedCounter } from '@/components/ui/animated-counter.jsx';
import { Marquee } from '@/components/ui/marquee.jsx';
import ThemeToggle from '@/components/ui/theme-toggle.jsx';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Hero = () => {
  const { profile, stats } = portfolioData;

  return (
    <section className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-glow" />
      </div>

      <Spotlight className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 md:p-8">
          <div className="text-2xl font-bold text-gradient">
            {profile.handle}
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
            <a href="#projects" className="text-foreground/80 hover:text-foreground transition-colors">Projects</a>
            <a href="#hackathons" className="text-foreground/80 hover:text-foreground transition-colors">Hackathons</a>
            <a href="#leadership" className="text-foreground/80 hover:text-foreground transition-colors">Leadership</a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</a>
            <ThemeToggle />
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient leading-tight">
                  Building Legendary Apps
                  <br />
                  <span className="text-4xl md:text-6xl">at the Edge of iOS & AI</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                  {profile.title} with over {stats.yearsExperience} years of experience scaling apps for {stats.usersImpacted} users. 
                  {profile.tagline}.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                    View Projects <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10" asChild>
                    <a href="/Gurinder-Singh-Staff-SE.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Download Resume
                    </a>
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-6">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="mailto:gsingh622@yahoo.com" className="text-foreground/60 hover:text-primary transition-colors">
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Right side - Ghibli image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-2xl" />
                  <img 
                    src="/me_ghibli.png" 
                    alt={`${profile.name} - Studio Ghibli Style`}
                    className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl border-4 border-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="glass rounded-lg p-6">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  <AnimatedCounter end={parseInt(stats.usersImpacted)} suffix="M+" />
                </div>
                <div className="text-sm text-foreground/60">Users Impacted</div>
              </div>
              <div className="glass rounded-lg p-6">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  <AnimatedCounter end={parseInt(stats.interviews)} suffix="+" />
                </div>
                <div className="text-sm text-foreground/60">Interviews Conducted</div>
              </div>
              <div className="glass rounded-lg p-6">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  <AnimatedCounter end={stats.yearsExperience} suffix="+" />
                </div>
                <div className="text-sm text-foreground/60">Years Experience</div>
              </div>
              <div className="glass rounded-lg p-6">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  <AnimatedCounter end={stats.patents} suffix="" />
                </div>
                <div className="text-sm text-foreground/60">Patent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="py-8 border-t border-border/20">
          <Marquee className="text-foreground/60" speed={30}>
            <span className="mx-8">🚀 {profile.company} {profile.title}</span>
            <span className="mx-8">📱 {stats.usersImpacted} Users Impacted</span>
            <span className="mx-8">🤖 AI/ML Patents</span>
            <span className="mx-8">🏆 {stats.firstPlaceWins}× 1st Place Wins</span>
            <span className="mx-8">👨‍🏫 CTE Advisory Board</span>
            <span className="mx-8">🌟 {stats.hackathons}+ Hackathons</span>
            <span className="mx-8">🏅 {profile.connections} Connections</span>
            <span className="mx-8">🎯 {stats.interviews}+ Interviews Conducted</span>
          </Marquee>
        </div>
      </Spotlight>
    </section>
  );
};

export default Hero;

