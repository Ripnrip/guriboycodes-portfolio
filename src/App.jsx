import React, { Suspense, lazy } from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Hackathons from './components/Hackathons.jsx';
import Contact from './components/Contact.jsx';
import Newsletter from './components/Newsletter.jsx';
import './App.css';

// Lazy load KnowledgeGraph to prevent blocking render
const KnowledgeGraph = lazy(() => import('./components/KnowledgeGraph.jsx'));

// Error boundary to catch Cosmograph crashes
class GraphErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('[v0] KnowledgeGraph error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Projects />
      <GraphErrorBoundary>
        <Suspense fallback={null}>
          <KnowledgeGraph />
        </Suspense>
      </GraphErrorBoundary>
      <Hackathons />
      <Newsletter />
      <Contact />
    </div>
  );
}

export default App;
