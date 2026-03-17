import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { Building2, Users, Award, Code, Briefcase, GraduationCap, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const About = () => {
  const [selectedJob, setSelectedJob] = useState(0);
  const { experience, education, patents } = portfolioData;

  const getJobIcon = (company) => {
    switch (company.toLowerCase()) {
      case 'paypal': return <Building2 className="h-6 w-6" />;
      case 'google stadia': return <Code className="h-6 w-6" />;
      case 'morgan stanley': return <Briefcase className="h-6 w-6" />;
      case 'parabit systems': return <Building2 className="h-6 w-6" />;
      default: return <Award className="h-6 w-6" />;
    }
  };

  return (
    <section id="about" className="py-20 px-6 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Career Journey
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            A decade of building legendary apps at global scale, from startup innovation 
            to enterprise solutions serving millions of users worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {experience.map((job, index) => (
                <Spotlight key={index}>
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedJob === index 
                        ? 'bg-card-gradient border-primary/50 shadow-lg' 
                        : 'bg-card/50 hover:bg-card-gradient/50 border-border/50'
                    }`}
                    onClick={() => setSelectedJob(index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedJob === index ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          {getJobIcon(job.company)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{job.company}</CardTitle>
                          <CardDescription className="text-sm">{job.period}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Spotlight>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:col-span-2">
            <Spotlight>
              <Card className="bg-card-gradient border-primary/20 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/20 text-primary">
                      {getJobIcon(experience[selectedJob].company)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gradient">
                        {experience[selectedJob].title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {experience[selectedJob].company} • {experience[selectedJob].period}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-1">
                        <CardDescription className="text-sm text-foreground/60 flex items-center">
                          📍 {experience[selectedJob].location}
                        </CardDescription>
                        <CardDescription className="text-sm text-foreground/60">
                          {experience[selectedJob].duration}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Highlights */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Key Achievements</h4>
                    <ul className="space-y-3">
                      {experience[selectedJob].highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span className="text-foreground/80">
                            {highlight.project && <strong className="text-foreground">{highlight.project.split('(')[0].trim()}: </strong>}
                            <span className="whitespace-pre-line">{highlight.description}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  {experience[selectedJob].technologies && (
                    <div className="pt-4">
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience[selectedJob].technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Spotlight>
          </div>
        </div>

        {/* Education, Patents & Awards Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {/* Education */}
          <Spotlight>
            <Card className="bg-card-gradient border-primary/20 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl text-gradient">Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="text-lg font-semibold text-foreground">{edu.school}</h4>
                    <p className="text-foreground/80">{edu.degree || edu.program}</p>
                    <p className="text-sm text-foreground/60">{edu.period}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Spotlight>

          {/* Patents */}
          <Spotlight>
            <Card className="bg-card-gradient border-primary/20 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl text-gradient">Patents & IP</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {patents.map((patent, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="text-lg font-semibold text-foreground">{patent.title}</h4>
                    <p className="text-foreground/80">{patent.company}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {patent.applicationNumber}
                      </Badge>
                      <span className="text-sm text-foreground/60">{patent.year}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Spotlight>

          {/* Awards */}
          <Spotlight>
            <Card className="bg-card-gradient border-primary/20 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl text-gradient">Awards</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {portfolioData.awards.map((award, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="text-lg font-semibold text-foreground">{award.title}</h4>
                    <p className="text-foreground/80">{award.event}</p>
                    <p className="text-sm text-foreground/60">{award.date || award.year} • {award.location || award.project}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Spotlight>
        </div>

        {/* Philosophy Section */}
        <div className="mt-24">
          <Spotlight>
            <Card className="bg-card-gradient border-primary/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Code className="h-48 w-48 text-primary" />
              </div>
              <CardHeader className="text-center relative z-10">
                <Badge variant="outline" className="mb-4 mx-auto border-primary/30 text-primary uppercase tracking-widest">
                  {portfolioData.engineeringPhilosophy.title}
                </Badge>
                <CardTitle className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                  "{portfolioData.engineeringPhilosophy.quote}"
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                  {portfolioData.engineeringPhilosophy.principles.map((principle, idx) => (
                    <div key={idx} className="space-y-3 p-6 rounded-2xl bg-background/40 border border-primary/5 hover:border-primary/20 transition-all duration-300">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {idx === 0 ? <Users className="h-5 w-5" /> : idx === 1 ? <Code className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{principle.title}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Spotlight>
        </div>
      </div>
    </section>
  );
};

export default About;

