import React from 'react';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Hackathons from './components/Hackathons.jsx';
import Community from './components/Community.jsx';
import Contact from './components/Contact.jsx';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Hackathons />
      <Community />
      <Contact />
    </div>
  );
}

export default App;
