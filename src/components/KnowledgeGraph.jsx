import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Brain, X, MessageSquare, Network } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { nodes, links, CATEGORY_COLORS, CATEGORY_SIZES } from '@/data/knowledgeGraph.js';

/* ─── Chat Message Component ─── */
const ChatMessage = ({ role, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
  >
    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
      role === 'user'
        ? 'bg-primary text-primary-foreground rounded-br-md'
        : role === 'system'
        ? 'bg-muted/50 text-muted-foreground text-center text-xs italic w-full max-w-full rounded-lg'
        : 'bg-card border border-border text-foreground rounded-bl-md'
    }`}>
      {role === 'assistant' && (
        <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-primary">
          <Brain className="w-3 h-3" />
          Graph RAG
        </div>
      )}
      <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatMessage(content) }} />
    </div>
  </motion.div>
);

function formatMessage(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs">$1</code>')
    .replace(/\n/g, '<br/>');
}

/* ─── Node Info Panel ─── */
const NodeInfoPanel = ({ node, onClose }) => {
  if (!node) return null;
  
  const connected = links
    .filter(l => l.source === node.id || l.target === node.id)
    .map(l => {
      const otherId = l.source === node.id ? l.target : l.source;
      return nodes.find(n => n.id === otherId);
    })
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute top-4 left-4 w-72 glass rounded-xl p-4 z-20"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[node.category] }} />
          <h4 className="font-bold text-foreground">{node.label}</h4>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2"
        style={{ backgroundColor: CATEGORY_COLORS[node.category] + '20', color: CATEGORY_COLORS[node.category] }}>
        {node.category}
      </span>
      <p className="text-sm text-muted-foreground mb-3">{node.description}</p>
      {connected.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-foreground/70 mb-1.5">Connected to:</p>
          <div className="flex flex-wrap gap-1">
            {connected.slice(0, 8).map(c => (
              <span key={c.id} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {c.label}
              </span>
            ))}
            {connected.length > 8 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                +{connected.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Legend ─── */
const Legend = () => (
  <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 z-10">
    <p className="text-xs font-semibold text-foreground/70 mb-2">Node Types</p>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
        <div key={cat} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs text-muted-foreground capitalize">{cat}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Main Component ─── */
const KnowledgeGraph = () => {
  const containerRef = useRef(null);
  const cosmographInstanceRef = useRef(null);
  const chatEndRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [graphReady, setGraphReady] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to my **Knowledge Graph**! This is an interactive visualization of my digital brain — projects, skills, tools, and how they all connect.\n\nAsk me anything about my experience, projects, or tech stack!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Cosmograph
  useEffect(() => {
    let cosmograph = null;
    let destroyed = false;

    const initGraph = async () => {
      if (!containerRef.current || destroyed) return;

      try {
        const { Cosmograph } = await import('@cosmograph/cosmograph');

        if (destroyed || !containerRef.current) return;

        // Prepare data
        const pointData = nodes.map(n => ({
          id: String(n.id),
          label: n.label,
          category: n.category,
          description: n.description,
          color: CATEGORY_COLORS[n.category] || '#a855f7',
          size: CATEGORY_SIZES[n.category] || 4,
        }));

        const linkData = links.map((l, i) => ({
          id: String(i),
          source: String(l.source),
          target: String(l.target),
        }));

        cosmograph = new Cosmograph(containerRef.current, {
          backgroundColor: '#0a0a12',
          simulationFriction: 0.85,
          simulationGravity: 0.25,
          simulationRepulsion: 0.5,
          simulationLinkSpring: 1.0,
          simulationLinkDistance: 10,
          fitViewOnInit: true,
          curvedLinks: true,
          disableLogging: true,
          pointIdBy: 'id',
          pointColorBy: 'color',
          pointSizeBy: 'size',
          pointLabelBy: 'label',
          linkSourceBy: 'source',
          linkTargetBy: 'target',
          linkColor: 'rgba(168, 85, 247, 0.12)',
          linkWidth: 0.5,
          showLabels: true,
          nodeLabelColor: '#e2e8f0',
          onClick: (clickedNode) => {
            if (clickedNode) {
              const original = nodes.find(n => String(n.id) === String(clickedNode.id));
              setSelectedNode(original || null);
            } else {
              setSelectedNode(null);
            }
          },
        });

        cosmographInstanceRef.current = cosmograph;
        
        // Use setData which handles the async loading into internal DB
        await cosmograph.setData(pointData, linkData);
        
        // Add a style to hide the error message overlay
        const style = document.createElement('style');
        style.innerHTML = `
          #knowledge-graph [class*="message"] { display: none !important; }
          #knowledge-graph [class*="attribution"] { opacity: 0.3; }
        `;
        document.head.appendChild(style);
        
        setGraphReady(true);
      } catch (err) {
        console.error('Failed to initialize Cosmograph:', err);
        // Render fallback
        if (containerRef.current && !destroyed) {
          renderFallbackCanvas(containerRef.current);
          setGraphReady(true);
        }
      }
    };

    // Use IntersectionObserver to lazy-init when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          initGraph();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      destroyed = true;
      observer.disconnect();
      if (cosmograph) {
        try { cosmograph.destroy(); } catch (e) { /* ignore */ }
      }
      cosmographInstanceRef.current = null;
    };
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simple keyword-based RAG (no API key needed for portfolio demo)
  const handleQuery = useCallback(async (query) => {
    if (!query.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInputValue('');
    setIsLoading(true);

    // Simulate processing delay
    await new Promise(r => setTimeout(r, 800));

    // Simple keyword matching for demo
    const queryLower = query.toLowerCase();
    const relevantNodes = nodes.filter(n => {
      const text = `${n.label} ${n.description} ${n.category}`.toLowerCase();
      return queryLower.split(/\s+/).some(word => word.length > 2 && text.includes(word));
    });

    // Graph traversal from relevant nodes
    const relevantIds = new Set(relevantNodes.map(n => n.id));
    const expandedIds = new Set(relevantIds);
    for (const id of relevantIds) {
      links.forEach(l => {
        if (l.source === id) expandedIds.add(l.target);
        if (l.target === id) expandedIds.add(l.source);
      });
    }

    // Build contextual answer
    let answer = '';
    if (relevantNodes.length === 0) {
      answer = "I couldn't find specific notes matching that query in my knowledge graph. Try asking about my **projects** (Flow, ZAI Vision, Graph RAG), **skills** (Swift, AI/ML, RAG), **companies** (PayPal, Google), or **hackathons**!";
    } else {
      const topNodes = relevantNodes.slice(0, 5);
      const categories = [...new Set(topNodes.map(n => n.category))];
      
      answer = `Based on my knowledge graph, here's what I found:\n\n`;
      
      for (const cat of categories) {
        const catNodes = topNodes.filter(n => n.category === cat);
        answer += `**${cat.charAt(0).toUpperCase() + cat.slice(1)}:**\n`;
        for (const n of catNodes) {
          answer += `- **${n.label}**: ${n.description}\n`;
        }
        answer += '\n';
      }

      const connectionCount = links.filter(l => expandedIds.has(l.source) && expandedIds.has(l.target)).length;
      answer += `*Found ${relevantNodes.length} direct matches and ${expandedIds.size - relevantIds.size} connected nodes across ${connectionCount} connections.*`;
    }

    setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    setIsLoading(false);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuery(inputValue);
    }
  };

  return (
    <section id="knowledge-graph" className="min-h-screen relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-8 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Network className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Interactive Knowledge Graph</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              My Digital Brain
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the connections between my projects, skills, and experience. 
              Powered by <span className="text-primary font-medium">cosmos.gl</span> GPU-accelerated graph rendering 
              and <span className="text-primary font-medium">Graph RAG</span>.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 mb-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{nodes.length}</div>
              <div className="text-xs text-muted-foreground">Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{links.length}</div>
              <div className="text-xs text-muted-foreground">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{Object.keys(CATEGORY_COLORS).length}</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Graph + Chat Container */}
      <div className="relative z-10 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-border overflow-hidden bg-card/50 backdrop-blur-sm"
            style={{ height: '70vh', minHeight: '500px' }}
          >
            {/* Graph Container */}
            <div ref={containerRef} className="absolute inset-0" style={{ background: '#0a0a12' }} />

            {/* Loading overlay */}
            {!graphReady && (
              <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: '#0a0a12' }}>
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Initializing knowledge graph...</p>
                </div>
              </div>
            )}

            {/* Legend */}
            <Legend />

            {/* Node Info Panel */}
            <AnimatePresence>
              {selectedNode && !chatOpen && (
                <NodeInfoPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
              )}
            </AnimatePresence>

            {/* Chat Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChatOpen(!chatOpen)}
              className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
            >
              {chatOpen ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
              {chatOpen ? 'Close' : 'Ask My Brain'}
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute top-0 right-0 bottom-0 w-full md:w-96 z-20 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border"
                >
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-border">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Graph RAG Chat</h3>
                      <p className="text-xs text-muted-foreground">Ask about my knowledge graph</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {messages.map((msg, i) => (
                      <ChatMessage key={i} role={msg.role} content={msg.content} />
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start mb-3"
                      >
                        <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-primary">
                            <Brain className="w-3 h-3" />
                            Graph RAG
                          </div>
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Suggested queries */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'What AI/ML projects have you built?',
                          'Tell me about your iOS experience',
                          'What is Graph RAG?',
                          'Hackathon achievements',
                        ].map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuery(q)}
                            className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about my knowledge graph..."
                        rows={1}
                        className="flex-1 resize-none rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                      <Button
                        onClick={() => handleQuery(inputValue)}
                        disabled={!inputValue.trim() || isLoading}
                        size="icon"
                        className="rounded-xl h-10 w-10 shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── Fallback Canvas Renderer ─── */
function renderFallbackCanvas(container) {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);
  
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width || 800;
  canvas.height = rect.height || 600;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const numNodes = nodes.length;
  const positions = [];

  // Force-directed layout simulation (simple version)
  for (let i = 0; i < numNodes; i++) {
    const angle = (i / numNodes) * Math.PI * 2;
    const catIndex = Object.keys(CATEGORY_COLORS).indexOf(nodes[i].category);
    const radius = Math.min(canvas.width, canvas.height) * 0.3 + catIndex * 20;
    positions.push({
      x: canvas.width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 60,
      y: canvas.height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 60,
    });
  }

  // Simple force simulation (30 iterations)
  for (let iter = 0; iter < 30; iter++) {
    // Repulsion
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = positions[j].x - positions[i].x;
        const dy = positions[j].y - positions[i].y;
        const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const force = 500 / (dist * dist);
        positions[i].x -= dx * force / dist;
        positions[i].y -= dy * force / dist;
        positions[j].x += dx * force / dist;
        positions[j].y += dy * force / dist;
      }
    }
    // Attraction (links)
    for (const link of links) {
      const dx = positions[link.target].x - positions[link.source].x;
      const dy = positions[link.target].y - positions[link.source].y;
      const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      const force = (dist - 80) * 0.01;
      positions[link.source].x += dx * force / dist;
      positions[link.source].y += dy * force / dist;
      positions[link.target].x -= dx * force / dist;
      positions[link.target].y -= dy * force / dist;
    }
    // Center gravity
    for (let i = 0; i < numNodes; i++) {
      positions[i].x += (canvas.width / 2 - positions[i].x) * 0.01;
      positions[i].y += (canvas.height / 2 - positions[i].y) * 0.01;
    }
  }

  // Draw links
  for (const link of links) {
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(positions[link.source].x, positions[link.source].y);
    ctx.lineTo(positions[link.target].x, positions[link.target].y);
    ctx.stroke();
  }

  // Draw nodes
  for (let i = 0; i < numNodes; i++) {
    const node = nodes[i];
    const color = CATEGORY_COLORS[node.category] || '#a855f7';
    const size = CATEGORY_SIZES[node.category] || 4;
    
    // Glow
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(positions[i].x, positions[i].y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label for important nodes
    if (['company', 'project'].includes(node.category)) {
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, positions[i].x, positions[i].y - size - 4);
    }
  }
}

export default KnowledgeGraph;
