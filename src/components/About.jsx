import React, { useState } from 'react';
import { AnimatedCounter } from '@/components/ui/animated-counter.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { Building2, Users, Award, Code, Briefcase } from 'lucide-react';

const About = () => {
  const [selectedJob, setSelectedJob] = useState(0);

  const careerData = [
    {
      company: "PayPal / Venmo",
      role: "Sr. Staff Applied AI Engineer",
      period: "2019 - Present",
      location: "Tampa, FL (Remote)",
      icon: <Building2 className="h-6 w-6" />,
      highlights: [
        "Deployed autonomous AI agent framework (Agent0) to Venmo & PayPal engineering teams for self-correcting workflows [ANIMATE_AGENT0]",
        "Built MAIA — agentic merchant onboarding AI that takes merchants from 0 to live in < 20 minutes",
        "Built Vireo — production LLM observability platform with MCP server integration and memory management",
        "Built Darwin — evolutionary AI skill engine with Bloom/Fossil selection for self-improving agent capabilities",
        "Built Mac-in-a-Mac — nested macOS virtualization that runs iOS test suites 3× faster",
        "Built claude-cosmos — unified LLM gateway proxy with PII scrubbing and multi-model routing",
        "Scaled Venmo iOS features for 92M+ active users; closed $60M enterprise contract in year one [ANIMATE_SCALE]",
        "Led Project Mercury — AI-powered agentic e-commerce platform (patent applications filed) [ANIMATE_MERCURY]",
        "Launched Venmo Gift Cards, Pay With Venmo (JetBlue), and QRC Widget (patent holder)",
        "Conducted 500+ technical interviews; ERG Leadership (Sikh Faith Group)"
      ],
      technologies: ["Swift", "SwiftUI", "Python", "LangChain", "MCP", "LLM", "Agentic AI", "CoreML", "iOS", "FastAPI"]
    },
    {
      company: "Google Stadia",
      role: "iOS Developer/Consultant",
      period: "2018 - 2019",
      location: "Mountain View, CA",
      icon: <Code className="h-6 w-6" />,
      highlights: [
        "Supported launch readiness for Stadia cloud gaming platform",
        "Streamlined cross-platform integrations",
        "Worked with Flutter/Dart leveraging iOS domain expertise",
        "Developed native iOS plugins and troubleshooting",
        "Conducted ~100 interviews for engineering hires"
      ],
      technologies: ["Flutter", "Dart", "iOS", "Objective-C", "Swift", "Cloud Gaming"]
    },
    {
      company: "Morgan Stanley",
      role: "iOS Engineer",
      period: "2016 - 2018",
      location: "Greater New York City",
      icon: <Briefcase className="h-6 w-6" />,
      highlights: [
        "Modernized Wealth Management app for ultra-high-net-worth clients",
        "Migrated codebase from 98% Objective-C to 80% Objective-C / 20% Swift",
        "Refactored Cordova hybrid system (~75 plugins)",
        "Implemented check-deposit, biometric authentication, certificate-pinning",
        "Added jailbreak detection and push authentication features"
      ],
      technologies: ["Swift", "Objective-C", "Cordova", "Angular", "iOS", "Banking"]
    },
    {
      company: "Parabit Systems",
      role: "Mobile Developer / R&D",
      period: "2017 - 2018",
      location: "Freeport, New York",
      icon: <Award className="h-6 w-6" />,
      highlights: [
        "R&D for iOS, Android, Cloud, and Blockchain applications",
        "Created internal tool using Bluetooth Low Energy on MMR hardware",
        "Built app from scratch using Swift with MVC-N architecture",
        "Implemented AWS Serverless with NodeJS/Lambda and DynamoDB",
        "Worked with Nordic Semiconductor Chipsets and Google Eddystone Beacons"
      ],
      technologies: ["Swift", "Bluetooth LE", "AWS", "NodeJS", "DynamoDB", "IoT"]
    }
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-animated">Career Journey</span>
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
              {careerData.map((job, index) => (
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
                          {job.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {job.company}
                            {index === 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-medium">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                Now
                              </span>
                            )}
                          </CardTitle>
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
                      {careerData[selectedJob].icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        <span className="text-gradient-animated">{careerData[selectedJob].role}</span>
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {careerData[selectedJob].company} • {careerData[selectedJob].period}
                      </CardDescription>
                      <CardDescription className="text-sm text-foreground/60">
                        📍 {careerData[selectedJob].location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Highlights */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Key Achievements</h4>
                    <ul className="space-y-2">
                      {careerData[selectedJob].highlights.map((highlight, index) => {
                        const isAnimAgent0 = highlight.includes('[ANIMATE_AGENT0]');
                        const isAnimScale = highlight.includes('[ANIMATE_SCALE]');
                        const isAnimMercury = highlight.includes('[ANIMATE_MERCURY]');
                        const cleanText = highlight.replace(/ \[ANIMATE_\w+\]/g, '');
                        return (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-foreground/80">
                              {isAnimAgent0 ? (
                                <><mark className="text-marker">Agent0</mark> deployed to Venmo &amp; PayPal engineering teams — <span className="text-word-glow">self-correcting agentic workflows</span></>
                              ) : isAnimScale ? (
                                <>Scaled Venmo iOS features for <span className="text-shimmer">92M+ active users</span>; closed <mark className="text-marker">$60M enterprise contract</mark> in year one</>
                              ) : isAnimMercury ? (
                                <>Led <span className="text-word-glow">Project Mercury</span> — AI-powered agentic e-commerce platform (<mark className="text-marker">patent applications filed</mark>)</>
                              ) : cleanText}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {careerData[selectedJob].technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Spotlight>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-20">
          <Spotlight>
            <Card className="bg-card-gradient border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  <span className="text-shimmer-slow">Engineering Philosophy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Scale & Impact</h3>
                    <p className="text-foreground/80">
                      Building systems that serve <span className="text-shimmer">millions</span> while maintaining performance and reliability.
                    </p>
                  </div>
                  <div>
                    <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                    <p className="text-foreground/80">
                      Bridging cutting-edge <span className="text-word-glow">AI/ML</span> with practical mobile solutions for real-world problems.
                    </p>
                  </div>
                  <div>
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Leadership</h3>
                    <p className="text-foreground/80">
                      Mentoring engineers, conducting <mark className="text-marker">500+ interviews</mark>, and fostering inclusive tech communities.
                    </p>
                  </div>
                </div>
                {/* Leadership stats with animated counters */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-shimmer mb-1"><AnimatedCounter end={500} suffix="+" /></div>
                    <div className="text-xs text-foreground/50">Technical Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-shimmer mb-1"><AnimatedCounter end={200} suffix="+" /></div>
                    <div className="text-xs text-foreground/50">Students Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-shimmer mb-1"><AnimatedCounter end={150} suffix="+" /></div>
                    <div className="text-xs text-foreground/50">ERG Members</div>
                  </div>
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

