/**
 * Demo knowledge graph data representing the user's "digital brain"
 * Each node is a concept/note, each link is a connection between them.
 * Categories: project, skill, company, concept, tool, hackathon, leadership
 */

const CATEGORY_COLORS = {
  project:    '#a855f7', // Purple
  skill:      '#3b82f6', // Blue
  company:    '#f59e0b', // Amber
  concept:    '#10b981', // Emerald
  tool:       '#ec4899', // Pink
  hackathon:  '#f97316', // Orange
  leadership: '#06b6d4', // Cyan
};

const CATEGORY_SIZES = {
  project: 6,
  skill: 4,
  company: 8,
  concept: 5,
  tool: 3,
  hackathon: 5,
  leadership: 6,
};

export const nodes = [
  // Companies (0-3)
  { id: 0, label: 'PayPal', category: 'company', description: 'Staff iOS & AI/ML Engineer. Scaled apps for 90M+ users.' },
  { id: 1, label: 'Google', category: 'company', description: 'Software Engineering experience at Google.' },
  { id: 2, label: 'Morgan Stanley', category: 'company', description: 'Technology experience in financial services.' },
  { id: 3, label: 'Apple', category: 'company', description: 'iOS ecosystem and platform expertise.' },

  // Core Skills (4-15)
  { id: 4, label: 'Swift', category: 'skill', description: 'Primary language for iOS development. Expert-level proficiency.' },
  { id: 5, label: 'iOS Development', category: 'skill', description: 'Native iOS app development with UIKit and SwiftUI.' },
  { id: 6, label: 'SwiftUI', category: 'skill', description: 'Declarative UI framework for Apple platforms.' },
  { id: 7, label: 'CoreML', category: 'skill', description: 'On-device machine learning framework for Apple platforms.' },
  { id: 8, label: 'RAG', category: 'skill', description: 'Retrieval-Augmented Generation — combining LLMs with knowledge retrieval.' },
  { id: 9, label: 'AI/ML', category: 'skill', description: 'Artificial Intelligence and Machine Learning engineering.' },
  { id: 10, label: 'Flutter', category: 'skill', description: 'Cross-platform mobile development framework by Google.' },
  { id: 11, label: 'React', category: 'skill', description: 'JavaScript library for building user interfaces.' },
  { id: 12, label: 'Python', category: 'skill', description: 'Programming language used for AI/ML, scripting, and backends.' },
  { id: 13, label: 'TypeScript', category: 'skill', description: 'Typed superset of JavaScript for scalable web development.' },
  { id: 14, label: 'WebGL', category: 'skill', description: 'GPU-accelerated graphics rendering in the browser.' },
  { id: 15, label: 'Graph Algorithms', category: 'skill', description: 'BFS, DFS, PageRank, community detection for knowledge graphs.' },

  // Projects (16-28)
  { id: 16, label: 'Flow', category: 'project', description: 'Productivity app with live activities, widgets, and Siri integration.' },
  { id: 17, label: 'Ethereal Dimension', category: 'project', description: 'Immersive experience blending AI and creative design.' },
  { id: 18, label: 'ZAI Vision Suite', category: 'project', description: 'AI-powered vision and image analysis toolkit.' },
  { id: 19, label: 'AI IDE Setup', category: 'project', description: 'Intelligent development environment configuration with AI assistance.' },
  { id: 20, label: 'Rosicrucian Knowledge Explorer', category: 'project', description: 'Knowledge graph exploration tool for philosophical texts.' },
  { id: 21, label: 'Agentic News Transformer', category: 'project', description: 'AI agent that transforms and summarizes news content.' },
  { id: 22, label: 'Langar App', category: 'project', description: 'Community service app for Gurdwara Langar food distribution.' },
  { id: 23, label: 'Ethereal Search', category: 'project', description: 'AI-powered semantic search engine showcase.' },
  { id: 24, label: 'Artful Archives', category: 'project', description: 'Digital art curation and archival platform.' },
  { id: 25, label: 'Geometric Graph Design', category: 'project', description: 'Interactive graph visualization with geometric aesthetics.' },
  { id: 26, label: 'Voice Practice Hub', category: 'project', description: 'Voice training and practice application.' },
  { id: 27, label: 'Hylios', category: 'project', description: 'Innovative mobile application project.' },
  { id: 28, label: 'Graph RAG Plugin', category: 'project', description: 'Obsidian plugin for interactive Graph RAG with cosmos.gl visualization.' },

  // Concepts (29-38)
  { id: 29, label: 'Knowledge Graphs', category: 'concept', description: 'Structured representation of knowledge as interconnected entities.' },
  { id: 30, label: 'Vector Embeddings', category: 'concept', description: 'Dense numerical representations of text for semantic similarity.' },
  { id: 31, label: 'Force-Directed Layout', category: 'concept', description: 'Physics simulation for automatic graph layout positioning.' },
  { id: 32, label: 'Semantic Search', category: 'concept', description: 'Finding information based on meaning rather than keywords.' },
  { id: 33, label: 'LLM', category: 'concept', description: 'Large Language Models — foundation models for natural language understanding.' },
  { id: 34, label: 'On-Device AI', category: 'concept', description: 'Running ML models locally on mobile devices for privacy and speed.' },
  { id: 35, label: 'Agentic AI', category: 'concept', description: 'AI systems that can autonomously plan and execute multi-step tasks.' },
  { id: 36, label: 'Computer Vision', category: 'concept', description: 'AI systems that understand and process visual information.' },
  { id: 37, label: 'NLP', category: 'concept', description: 'Natural Language Processing — understanding human language with AI.' },
  { id: 38, label: 'Patent Holder', category: 'concept', description: 'Inventor with granted technology patents.' },

  // Tools (39-45)
  { id: 39, label: 'Obsidian', category: 'tool', description: 'Knowledge management tool with linked notes and graph view.' },
  { id: 40, label: 'cosmos.gl', category: 'tool', description: 'GPU-accelerated WebGL graph visualization engine.' },
  { id: 41, label: 'OpenAI API', category: 'tool', description: 'API for GPT models, embeddings, and AI capabilities.' },
  { id: 42, label: 'Xcode', category: 'tool', description: 'Apple IDE for iOS/macOS development.' },
  { id: 43, label: 'Vite', category: 'tool', description: 'Fast build tool for modern web development.' },
  { id: 44, label: 'TailwindCSS', category: 'tool', description: 'Utility-first CSS framework for rapid UI development.' },
  { id: 45, label: 'Combine', category: 'tool', description: 'Apple reactive programming framework for Swift.' },

  // Hackathons (46-50)
  { id: 46, label: 'HackZurich', category: 'hackathon', description: 'Europe\'s largest hackathon. Featured in interview.' },
  { id: 47, label: 'BBC Documentary', category: 'hackathon', description: 'Featured in BBC documentary about tech innovation.' },
  { id: 48, label: 'Hackathon Wins', category: 'hackathon', description: 'Multiple hackathon victories across global events.' },
  { id: 49, label: 'Devpost Portfolio', category: 'hackathon', description: 'Collection of hackathon submissions and projects.' },
  { id: 50, label: 'Global Hackathons', category: 'hackathon', description: 'Participation in hackathons worldwide.' },

  // Leadership (51-54)
  { id: 51, label: 'CTE Advisory Board', category: 'leadership', description: 'Career and Technical Education Advisory Board member.' },
  { id: 52, label: 'ERG Leadership', category: 'leadership', description: 'Employee Resource Group leadership and community building.' },
  { id: 53, label: 'Mentorship', category: 'leadership', description: 'Mentoring junior engineers and students in tech.' },
  { id: 54, label: 'Community Impact', category: 'leadership', description: 'Driving positive change through technology and community service.' },
];

export const links = [
  // Company connections
  { source: 0, target: 5 },   // PayPal -> iOS Dev
  { source: 0, target: 4 },   // PayPal -> Swift
  { source: 0, target: 9 },   // PayPal -> AI/ML
  { source: 0, target: 38 },  // PayPal -> Patent
  { source: 1, target: 10 },  // Google -> Flutter
  { source: 1, target: 9 },   // Google -> AI/ML
  { source: 2, target: 5 },   // Morgan Stanley -> iOS Dev
  { source: 3, target: 4 },   // Apple -> Swift
  { source: 3, target: 6 },   // Apple -> SwiftUI
  { source: 3, target: 7 },   // Apple -> CoreML
  { source: 3, target: 42 },  // Apple -> Xcode

  // Skill interconnections
  { source: 4, target: 5 },   // Swift -> iOS Dev
  { source: 4, target: 6 },   // Swift -> SwiftUI
  { source: 4, target: 45 },  // Swift -> Combine
  { source: 5, target: 6 },   // iOS Dev -> SwiftUI
  { source: 5, target: 7 },   // iOS Dev -> CoreML
  { source: 5, target: 34 },  // iOS Dev -> On-Device AI
  { source: 7, target: 9 },   // CoreML -> AI/ML
  { source: 7, target: 34 },  // CoreML -> On-Device AI
  { source: 7, target: 36 },  // CoreML -> Computer Vision
  { source: 8, target: 9 },   // RAG -> AI/ML
  { source: 8, target: 29 },  // RAG -> Knowledge Graphs
  { source: 8, target: 30 },  // RAG -> Vector Embeddings
  { source: 8, target: 32 },  // RAG -> Semantic Search
  { source: 8, target: 33 },  // RAG -> LLM
  { source: 9, target: 33 },  // AI/ML -> LLM
  { source: 9, target: 36 },  // AI/ML -> Computer Vision
  { source: 9, target: 37 },  // AI/ML -> NLP
  { source: 9, target: 12 },  // AI/ML -> Python
  { source: 11, target: 13 }, // React -> TypeScript
  { source: 11, target: 43 }, // React -> Vite
  { source: 11, target: 44 }, // React -> TailwindCSS
  { source: 14, target: 40 }, // WebGL -> cosmos.gl
  { source: 14, target: 31 }, // WebGL -> Force-Directed Layout
  { source: 15, target: 29 }, // Graph Algorithms -> Knowledge Graphs
  { source: 15, target: 31 }, // Graph Algorithms -> Force-Directed Layout

  // Project connections
  { source: 16, target: 4 },  // Flow -> Swift
  { source: 16, target: 6 },  // Flow -> SwiftUI
  { source: 16, target: 45 }, // Flow -> Combine
  { source: 16, target: 34 }, // Flow -> On-Device AI
  { source: 17, target: 9 },  // Ethereal Dimension -> AI/ML
  { source: 17, target: 11 }, // Ethereal Dimension -> React
  { source: 18, target: 36 }, // ZAI Vision -> Computer Vision
  { source: 18, target: 7 },  // ZAI Vision -> CoreML
  { source: 18, target: 9 },  // ZAI Vision -> AI/ML
  { source: 19, target: 9 },  // AI IDE -> AI/ML
  { source: 19, target: 35 }, // AI IDE -> Agentic AI
  { source: 20, target: 29 }, // Rosicrucian -> Knowledge Graphs
  { source: 20, target: 8 },  // Rosicrucian -> RAG
  { source: 20, target: 32 }, // Rosicrucian -> Semantic Search
  { source: 21, target: 35 }, // Agentic News -> Agentic AI
  { source: 21, target: 33 }, // Agentic News -> LLM
  { source: 21, target: 37 }, // Agentic News -> NLP
  { source: 22, target: 54 }, // Langar App -> Community Impact
  { source: 22, target: 5 },  // Langar App -> iOS Dev
  { source: 23, target: 32 }, // Ethereal Search -> Semantic Search
  { source: 23, target: 30 }, // Ethereal Search -> Vector Embeddings
  { source: 24, target: 11 }, // Artful Archives -> React
  { source: 25, target: 14 }, // Geometric Graph -> WebGL
  { source: 25, target: 31 }, // Geometric Graph -> Force-Directed Layout
  { source: 25, target: 40 }, // Geometric Graph -> cosmos.gl
  { source: 26, target: 37 }, // Voice Practice -> NLP
  { source: 28, target: 39 }, // Graph RAG Plugin -> Obsidian
  { source: 28, target: 40 }, // Graph RAG Plugin -> cosmos.gl
  { source: 28, target: 8 },  // Graph RAG Plugin -> RAG
  { source: 28, target: 29 }, // Graph RAG Plugin -> Knowledge Graphs
  { source: 28, target: 41 }, // Graph RAG Plugin -> OpenAI API
  { source: 28, target: 30 }, // Graph RAG Plugin -> Vector Embeddings
  { source: 28, target: 15 }, // Graph RAG Plugin -> Graph Algorithms

  // Tool connections
  { source: 39, target: 29 }, // Obsidian -> Knowledge Graphs
  { source: 40, target: 31 }, // cosmos.gl -> Force-Directed Layout
  { source: 41, target: 33 }, // OpenAI API -> LLM
  { source: 41, target: 30 }, // OpenAI API -> Vector Embeddings

  // Hackathon connections
  { source: 46, target: 48 }, // HackZurich -> Hackathon Wins
  { source: 46, target: 50 }, // HackZurich -> Global Hackathons
  { source: 47, target: 50 }, // BBC Documentary -> Global Hackathons
  { source: 48, target: 49 }, // Hackathon Wins -> Devpost
  { source: 48, target: 9 },  // Hackathon Wins -> AI/ML
  { source: 50, target: 49 }, // Global Hackathons -> Devpost

  // Leadership connections
  { source: 51, target: 53 }, // CTE Advisory -> Mentorship
  { source: 52, target: 0 },  // ERG Leadership -> PayPal
  { source: 52, target: 54 }, // ERG Leadership -> Community Impact
  { source: 53, target: 54 }, // Mentorship -> Community Impact
  { source: 54, target: 22 }, // Community Impact -> Langar App
];

export { CATEGORY_COLORS, CATEGORY_SIZES };

/**
 * Get node content for RAG context
 */
export function getNodeContext(nodeId) {
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return '';
  
  const connectedNodes = links
    .filter(l => l.source === nodeId || l.target === nodeId)
    .map(l => {
      const otherId = l.source === nodeId ? l.target : l.source;
      return nodes.find(n => n.id === otherId)?.label;
    })
    .filter(Boolean);

  return `# ${node.label}\nCategory: ${node.category}\n${node.description}\nConnected to: ${connectedNodes.join(', ')}`;
}

/**
 * Build full context from all nodes for RAG
 */
export function buildFullContext() {
  return nodes.map(n => getNodeContext(n.id)).join('\n\n---\n\n');
}
