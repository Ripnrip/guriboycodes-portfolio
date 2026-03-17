import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { AnimatedCounter } from '@/components/ui/animated-counter.jsx';
import { Trophy, MapPin, Calendar, Users, Tv, Award, Globe, Code, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Hackathons = () => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const { hackathons, stats: portfolioStats } = portfolioData;

  const stats = [
    { label: "Total Hackathons", value: portfolioStats.hackathons, icon: <Code className="h-6 w-6" /> },
    { label: "Countries Visited", value: new Set(hackathons.map(h => h.location.split(', ')[1])).size, icon: <Globe className="h-6 w-6" /> },
    { label: "1st Place Wins", value: portfolioStats.firstPlaceWins, icon: <Trophy className="h-6 w-6" /> },
    { label: "Years Active", value: portfolioStats.yearsExperience, icon: <Calendar className="h-6 w-6" /> }
  ];

  const getFlag = (location) => {
    if (location.includes('UK')) return "🇬🇧";
    if (location.includes('Switzerland')) return "🇨🇭";
    if (location.includes('USA')) return "🇺🇸";
    if (location.includes('Spain')) return "🇪🇸";
    if (location.includes('Denmark')) return "🇩🇰";
    return "🌐";
  };

  return (
    <section id="hackathons" className="py-20 px-6 md:px-8 bg-hero-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Hackathon Journey
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            {portfolioStats.hackathons}+ hackathons across the globe as participant, mentor, and judge. 
            From NYC to Barcelona, London to Zurich - building innovative solutions and inspiring communities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Spotlight key={index}>
              <Card className="glass text-center">
                <CardContent className="pt-6">
                  <div className="text-primary mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    <AnimatedCounter end={stat.value} suffix="+" />
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </CardContent>
              </Card>
            </Spotlight>
          ))}
        </div>

        {/* Featured Hackathons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">Featured Achievements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {hackathons.filter(h => h.placement === '1st Place').map((hackathon, idx) => (
              <Spotlight key={idx}>
                <Card 
                  className="bg-card-gradient border-primary/50 cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedHackathon(hackathon)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{getFlag(hackathon.location)}</div>
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                        {hackathon.placement}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{hackathon.event}</CardTitle>
                    <CardDescription className="flex items-center space-x-2 text-foreground/70">
                      <MapPin className="h-4 w-4" />
                      <span>{hackathon.location}</span>
                      <Calendar className="h-4 w-4 ml-2" />
                      <span>{hackathon.year}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-primary">{hackathon.project}</h4>
                    <p className="text-sm text-foreground/80 mb-3">
                      {hackathon.sponsor && <span>Sponsored by: {hackathon.sponsor}</span>}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>Team: {hackathon.team.join(', ')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Spotlight>
            ))}
          </div>
        </div>

        {/* All Hackathons Timeline */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">Complete Journey</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hackathons.map((hackathon, idx) => (
              <Spotlight key={idx}>
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    hackathon.placement === '1st Place' 
                      ? 'bg-card-gradient border-primary/50' 
                      : 'bg-card/60 hover:bg-card-gradient/50 border-border/50'
                  } hover:border-primary/50`}
                  onClick={() => setSelectedHackathon(hackathon)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xl">{getFlag(hackathon.location)}</div>
                      {hackathon.placement && (
                        <Badge variant={hackathon.placement.includes('1st') ? 'default' : 'secondary'}>
                          {hackathon.placement}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base">{hackathon.event}</CardTitle>
                    <CardDescription className="text-sm">{hackathon.location} • {hackathon.year}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-foreground/80">{hackathon.project}</p>
                  </CardContent>
                </Card>
              </Spotlight>
            ))}
          </div>
        </div>

        {/* Hackathon Detail Modal */}
        {selectedHackathon && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Spotlight>
              <Card className="max-w-2xl w-full bg-card-gradient border-primary/50 max-h-[80vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{getFlag(selectedHackathon.location)}</div>
                      <div>
                        <CardTitle className="text-2xl text-gradient">{selectedHackathon.event}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 text-foreground/70">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedHackathon.location}</span>
                          <Calendar className="h-4 w-4 ml-2" />
                          <span>{selectedHackathon.year}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedHackathon(null)}
                      className="text-foreground/60 hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {selectedHackathon.placement && (
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg px-4 py-2">
                        {selectedHackathon.placement}
                      </Badge>
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-primary">{selectedHackathon.project}</h4>
                    {selectedHackathon.sponsor && (
                      <p className="text-sm text-foreground/60 mb-2">Sponsor: {selectedHackathon.sponsor}</p>
                    )}
                    <p className="text-foreground/80 leading-relaxed font-semibold">Team members:</p>
                    <ul className="list-disc list-inside text-foreground/80 mb-4">
                      {selectedHackathon.team.map((member, i) => (
                        <li key={i}>{member}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-4">
                    {selectedHackathon.linkedinPost && (
                      <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                        <a href={selectedHackathon.linkedinPost} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          LinkedIn Post
                        </a>
                      </Button>
                    )}
                    {selectedHackathon.video && (
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20" asChild>
                        <a href={selectedHackathon.video.file} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Video
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

export default Hackathons;

