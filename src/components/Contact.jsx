import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { Download, Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Ready to build something legendary together? Whether it's discussing iOS development, 
            AI/ML innovations, or hackathon adventures, I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Spotlight>
              <Card className="bg-card-gradient border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Get In Touch</CardTitle>
                  <CardDescription className="text-foreground/80">
                    Available for consulting, speaking engagements, and exciting opportunities.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground/80">Tampa, FL</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:contact@guriboycodes.com" className="text-foreground/80 hover:text-primary transition-colors">
                      contact@guriboycodes.com
                    </a>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold mb-4 text-foreground">Connect on Social</h4>
                    <div className="flex space-x-4">
                      <a 
                        href="https://github.com/Ripnrip" 
                        className="flex items-center space-x-2 text-foreground/60 hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                      </a>
                      <a 
                        href="https://linkedin.com/in/gurinder-singh-a30a1a48/" 
                        className="flex items-center space-x-2 text-foreground/60 hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Spotlight>

            {/* Resume Download */}
            <Spotlight>
              <Card className="bg-card-gradient border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Resume</CardTitle>
                  <CardDescription className="text-foreground/80">
                    Download my complete professional resume with detailed experience and achievements.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume (PDF)
                  </Button>
                </CardContent>
              </Card>
            </Spotlight>

            {/* Availability */}
            <Spotlight>
              <Card className="bg-card-gradient border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Current Status</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-foreground/80">Available for consulting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-foreground/80">Open to speaking opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-foreground/80">Hackathon mentor & judge</span>
                  </div>
                </CardContent>
              </Card>
            </Spotlight>
          </div>

          {/* Contact Form */}
          <div>
            <Spotlight>
              <Card className="bg-card-gradient border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Send a Message</CardTitle>
                  <CardDescription className="text-foreground/80">
                    Have a project in mind? Let's discuss how we can work together.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary resize-none"
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Send className={`mr-2 h-5 w-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    {submitStatus === 'success' && (
                      <p className="text-green-500 text-sm font-medium mt-2 text-center">Message sent successfully!</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-red-500 text-sm font-medium mt-2 text-center">Failed to send message. Please try again.</p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </Spotlight>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border/20 text-center">
          <p className="text-foreground/60">
            © 2024 GuriboyCodes. Built with React, Tailwind CSS, and lots of ☕
          </p>
          <p className="text-foreground/40 text-sm mt-2">
            "Building legendary apps at the edge of iOS & AI"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

