import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { Building2, Users, Award, Code, Briefcase } from 'lucide-react';

const About = () => {
  const [selectedJob, setSelectedJob] = useState(0);

  const careerData = [
    {
      company: "PayPal",
      role: "Staff iOS Engineer",
      period: "2019 - Present",
      location: "Tampa, FL",
      icon: <Building2 className="h-6 w-6" />,
      highlights: [
        "Built and scaled Venmo iOS features for 92M active users",
        "Led AI initiatives (2023-2025) with patent applications",
        "Closed $60M enterprise contract in year one",
        "Designed High-Level Designs (HLD) for cross-org architecture",
        "Launched Venmo Gift Cards with internal org-wide trailer",
        "Spearheaded Pay With Venmo with JetBlue partner engineering",
        "Conducted 400+ interviews and ERG leadership (Sikh Faith Group)"
      ],
      technologies: ["Swift", "SwiftUI", "CoreML", "AI/ML", "iOS", "Venmo APIs"]
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
                      {careerData[selectedJob].icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gradient">
                        {careerData[selectedJob].role}
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
                      {careerData[selectedJob].highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/80">{highlight}</span>
                        </li>
                      ))}
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
                <CardTitle className="text-2xl text-gradient text-center">
                  Engineering Philosophy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Scale & Impact</h3>
                    <p className="text-foreground/80">
                      Building systems that serve millions while maintaining performance and reliability.
                    </p>
                  </div>
                  <div>
                    <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                    <p className="text-foreground/80">
                      Bridging cutting-edge AI/ML with practical mobile solutions for real-world problems.
                    </p>
                  </div>
                  <div>
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Leadership</h3>
                    <p className="text-foreground/80">
                      Mentoring engineers, conducting interviews, and fostering inclusive tech communities.
                    </p>
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

