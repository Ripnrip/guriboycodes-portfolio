import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { AnimatedCounter } from '@/components/ui/animated-counter.jsx';
import { Trophy, MapPin, Calendar, Users, Tv, Award, Globe, Code } from 'lucide-react';

const Hackathons = () => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const hackathons = [
    {
      id: 1,
      name: "MLH @ Bloomberg London",
      year: "2017",
      location: "London, UK",
      result: "🥇 1st Place",
      participants: "500+",
      project: "Automated Search & Rescue System",
      description: "Drone rescue system featured in BBC hackathon documentary",
      longDescription: "Won first place among 500+ participants by creating an innovative drone software using the DJI SDK (Objective-C) to find people in disaster and relief situations. The project was hosted at Bloomberg in London and gained significant media attention.",
      technologies: ["Objective-C", "DJI SDK", "Drone Technology", "Emergency Response"],
      media: "BBC Documentary Feature",
      featured: true,
      flag: "🇬🇧"
    },
    {
      id: 2,
      name: "HackZurich",
      year: "2018",
      location: "Zurich, Switzerland",
      result: "🏆 Finalist",
      participants: "400+",
      project: "AR Car Buying Tool",
      description: "AR tool to help people buy cars and other vehicles",
      longDescription: "Made it to the finals creating an innovative AR tool to help people buy cars and other vehicles. Featured in an interview with Credit Suisse showcasing the potential of augmented reality in automotive retail.",
      technologies: ["AR", "iOS", "Swift", "Computer Vision"],
      media: "Credit Suisse Interview",
      featured: true,
      flag: "🇨🇭"
    },
    {
      id: 3,
      name: "Devcamp NYC",
      year: "2016",
      location: "New York, USA",
      result: "🥇 1st Place",
      participants: "300+",
      project: "Talent Management App",
      description: "App for modeling agencies to interact with talent and customers",
      longDescription: "Won first place by building a comprehensive talent management application for modeling agencies to streamline interactions between agencies, talent, and customers. Held at Google NYC.",
      technologies: ["iOS", "Swift", "Backend APIs", "UI/UX"],
      media: "Google NYC Venue",
      featured: true,
      flag: "🇺🇸"
    },
    {
      id: 4,
      name: "UPC Barcelona",
      year: "2016",
      location: "Barcelona, Spain",
      result: "🌟 Open Source",
      participants: "250+",
      project: "Refugee Crowdsourcing App",
      description: "Crowdsourcing app with local whereabouts for refugees",
      longDescription: "Built a crowdsourcing app with local whereabouts for refugees - pinned locations for safety, danger, and help. The project was open-sourced on GitHub to help the refugee community.",
      technologies: ["Mobile", "Crowdsourcing", "Social Impact", "Open Source"],
      media: "GitHub Open Source",
      featured: false,
      flag: "🇪🇸"
    },
    {
      id: 5,
      name: "Copenhacks",
      year: "2017",
      location: "Copenhagen, Denmark",
      result: "🚀 Participant",
      participants: "200+",
      project: "Innovation Project",
      description: "Innovative tech solution at Microsoft Copenhagen",
      longDescription: "Participated in Copenhacks held at Microsoft in Copenhagen, Denmark, working on innovative technology solutions and networking with international developers.",
      technologies: ["Various", "Innovation", "Microsoft Technologies"],
      media: "Microsoft Venue",
      featured: false,
      flag: "🇩🇰"
    },
    {
      id: 6,
      name: "HackNY",
      year: "2016",
      location: "New York, USA",
      result: "🚀 Participant",
      participants: "400+",
      project: "NYC Innovation",
      description: "Premier NYC hackathon at New York University",
      longDescription: "Participated in one of NYC's premier hackathons held at New York University, focusing on innovative solutions for urban challenges and technology advancement.",
      technologies: ["Web", "Mobile", "Urban Tech"],
      media: "NYU Venue",
      featured: false,
      flag: "🇺🇸"
    }
  ];

  const stats = [
    { label: "Total Hackathons", value: 28, icon: <Code className="h-6 w-6" /> },
    { label: "Countries Visited", value: 6, icon: <Globe className="h-6 w-6" /> },
    { label: "1st Place Wins", value: 2, icon: <Trophy className="h-6 w-6" /> },
    { label: "Years Active", value: 8, icon: <Calendar className="h-6 w-6" /> }
  ];

  return (
    <section id="hackathons" className="py-20 px-6 md:px-8 bg-hero-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Hackathon Journey
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            28+ hackathons across the globe as participant, mentor, and judge. 
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
            {hackathons.filter(h => h.featured).map((hackathon) => (
              <Spotlight key={hackathon.id}>
                <Card 
                  className="bg-card-gradient border-primary/50 cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedHackathon(hackathon)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{hackathon.flag}</div>
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                        {hackathon.result}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{hackathon.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2 text-foreground/70">
                      <MapPin className="h-4 w-4" />
                      <span>{hackathon.location}</span>
                      <Calendar className="h-4 w-4 ml-2" />
                      <span>{hackathon.year}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-primary">{hackathon.project}</h4>
                    <p className="text-sm text-foreground/80 mb-3">{hackathon.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{hackathon.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tv className="h-3 w-3" />
                        <span>{hackathon.media}</span>
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
            {hackathons.map((hackathon) => (
              <Spotlight key={hackathon.id}>
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    hackathon.featured 
                      ? 'bg-card-gradient border-primary/50' 
                      : 'bg-card/60 hover:bg-card-gradient/50 border-border/50'
                  } hover:border-primary/50`}
                  onClick={() => setSelectedHackathon(hackathon)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xl">{hackathon.flag}</div>
                      <Badge variant={hackathon.result.includes('1st') ? 'default' : 'secondary'}>
                        {hackathon.result}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{hackathon.name}</CardTitle>
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
                      <div className="text-3xl">{selectedHackathon.flag}</div>
                      <div>
                        <CardTitle className="text-2xl text-gradient">{selectedHackathon.name}</CardTitle>
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
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg px-4 py-2">
                      {selectedHackathon.result}
                    </Badge>
                    <div className="text-right text-sm text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{selectedHackathon.participants} participants</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-primary">{selectedHackathon.project}</h4>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedHackathon.longDescription}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHackathon.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <Tv className="h-4 w-4" />
                    <span>Media Coverage: {selectedHackathon.media}</span>
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

