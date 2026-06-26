import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import {
  ArrowUpRight, TrendingUp, BookOpen, Mail, Rss,
  Clock, Tag, Flame, Sparkles, CheckCircle
} from 'lucide-react';

/* ─── Curated AI news items ────────────────────────────────────────────────── */
const NEWS_ITEMS = [
  {
    id: 1,
    title: "Anthropic's Claude 4 Achieves State-of-the-Art on SWE-Bench with Agentic Loops",
    summary: "Claude Opus 4.5 scored 72.5% on SWE-Bench Verified running inside an agentic scaffold — reinforcing why Agent-0 uses Claude as its reasoning core.",
    source: "Anthropic",
    tag: "Agents",
    hot: true,
    date: "Jun 24, 2026",
    url: "https://anthropic.com",
  },
  {
    id: 2,
    title: "Google DeepMind Ships AlphaEvolve: Self-Improving Code Generation at Scale",
    summary: "AlphaEvolve uses evolutionary algorithms to improve its own prompts and code generation — the same GEPA approach powering Darwin at PayPal.",
    source: "DeepMind",
    tag: "AI/ML",
    hot: true,
    date: "Jun 20, 2026",
    url: "https://deepmind.google",
  },
  {
    id: 3,
    title: "OpenTelemetry for AI: OTel Semantic Conventions 1.27 Adds LLM Spans",
    summary: "The community finalized LLM-specific span attributes — gen_ai.system, gen_ai.request.model, gen_ai.usage.* — exactly what Vireo v2 exports.",
    source: "CNCF",
    tag: "Observability",
    hot: false,
    date: "Jun 18, 2026",
    url: "https://opentelemetry.io",
  },
  {
    id: 4,
    title: "Apple WWDC 2026: Virtualization.framework Gets Nested VM Support on Apple Silicon",
    summary: "Apple officially supports nested macOS VMs in macOS 17 — validating Mac-in-a-Mac's approach and enabling the next tier of iOS CI sharding.",
    source: "Apple",
    tag: "iOS/macOS",
    hot: false,
    date: "Jun 10, 2026",
    url: "https://developer.apple.com",
  },
  {
    id: 5,
    title: "DSPy 3.0 Released: Structured Prompting with Automatic Chain-of-Thought",
    summary: "DSPy 3 ships with a cleaner optimizer API and better multi-hop support — Darwin's judge pipeline will migrate from DSPy 2 bootstrapping next milestone.",
    source: "Stanford NLP",
    tag: "AI/ML",
    hot: false,
    date: "Jun 5, 2026",
    url: "https://dspy.ai",
  },
  {
    id: 6,
    title: "Model Context Protocol 1.5 Ships Multi-Agent Orchestration Primitives",
    summary: "MCP 1.5 adds supervisor/worker agent delegation and shared memory slots — Vireo's MCP server is upgrading to take advantage of the new handoff API.",
    source: "Anthropic / MCP",
    tag: "Agents",
    hot: true,
    date: "Jun 2, 2026",
    url: "https://modelcontextprotocol.io",
  },
  {
    id: 7,
    title: "Meta Releases Llama 4 Scout: 17B MoE Model Runs On-Device on M4 Max",
    summary: "The 17B-parameter MoE architecture fits in 24 GB unified memory at 4-bit — a direct upgrade path for Osaurus's local inference stack.",
    source: "Meta AI",
    tag: "LLMs",
    hot: false,
    date: "May 28, 2026",
    url: "https://ai.meta.com",
  },
  {
    id: 8,
    title: "Remotion 5.0: React-Based Video With Real-Time Preview and Veo Integration",
    summary: "Remotion 5 ships a live canvas preview and first-party Google Veo hook — the video-toolkit is pinned to 4.x but the upgrade path is clear.",
    source: "Remotion",
    tag: "Tools",
    hot: false,
    date: "May 22, 2026",
    url: "https://remotion.dev",
  },
];

/* ─── Blog posts (your own writing) ────────────────────────────────────────── */
const BLOG_POSTS = [
  {
    id: 1,
    title: "From Fixture to 9,513: How We Scaled MAIA's Merchant Discovery in a Weekend",
    excerpt: "The injection script that went from hard-coded fixture data to scoring 9,513 US merchants across 18 harvest campaigns — what it took, where it broke, and what the exec demo taught me about autonomous demos.",
    tag: "AI Agents",
    readTime: "8 min read",
    date: "Jun 15, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "Darwin: Building a Prompt Evolution Framework You Can Trust",
    excerpt: "Fossils, judges, and the Polaris/Bloom scoring vocabulary — why I treat prompt regressions as scientific signal rather than failure, and how Darwin's lineage graph makes every PR its own mini-paper.",
    tag: "AI/ML",
    readTime: "11 min read",
    date: "May 30, 2026",
    featured: true,
  },
  {
    id: 3,
    title: "Mac-in-a-Mac: 3x iOS Test Speedup Without New Hardware",
    excerpt: "How Apple's Virtualization.framework lets you shard a 120-test XCTest suite across host + 2 nested VMs on a single Mac mini — and the xcresult receipts to prove it.",
    tag: "iOS/macOS",
    readTime: "7 min read",
    date: "May 12, 2026",
    featured: false,
  },
  {
    id: 4,
    title: "Vireo v2: Designing a Telemetry Layer Agents Actually Use",
    excerpt: "33 fields, 4 capture surfaces, 5 memory kinds — and why I built the OpenInference→OpenTelemetry bridge before anyone asked for it.",
    tag: "Observability",
    readTime: "9 min read",
    date: "Apr 28, 2026",
    featured: false,
  },
  {
    id: 5,
    title: "claude-cosmos: The Proxy That Sits in Front of Every LLM Call",
    excerpt: "PII scrubbing, Cosmos routing, and why a 200-line Python file became the single most depended-on internal tool I shipped in H1 2026.",
    tag: "AI/ML",
    readTime: "5 min read",
    date: "Apr 10, 2026",
    featured: false,
  },
  {
    id: 6,
    title: "DX Sounds: Why Developer Joy Is an Engineering Discipline",
    excerpt: "8 audio themes, 14 MCP tools, and a commit to the PayPal AI Hub. Making your build pipeline feel alive is not a distraction — it's a retention strategy.",
    tag: "Developer Experience",
    readTime: "4 min read",
    date: "Mar 22, 2026",
    featured: false,
  },
];

/* ─── Tag color map ─────────────────────────────────────────────────────────── */
const TAG_COLORS = {
  'Agents':               'bg-violet-500/15 text-violet-300 border-violet-500/30',
  'AI/ML':                'bg-blue-500/15 text-blue-300 border-blue-500/30',
  'Observability':        'bg-teal-500/15 text-teal-300 border-teal-500/30',
  'iOS/macOS':            'bg-orange-500/15 text-orange-300 border-orange-500/30',
  'LLMs':                 'bg-pink-500/15 text-pink-300 border-pink-500/30',
  'Tools':                'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Developer Experience': 'bg-green-500/15 text-green-300 border-green-500/30',
};

const TagBadge = ({ tag }) => (
  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${TAG_COLORS[tag] ?? 'bg-primary/15 text-primary border-primary/30'}`}>
    <Tag className="h-2.5 w-2.5" />
    {tag}
  </span>
);

/* ─── News card ─────────────────────────────────────────────────────────────── */
const NewsCard = ({ item, index }) => (
  <motion.a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
    className="group block"
  >
    <div className="glass rounded-xl p-4 border border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <TagBadge tag={item.tag} />
          {item.hot && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400">
              <Flame className="h-3 w-3" /> Trending
            </span>
          )}
        </div>
        <ArrowUpRight className="h-4 w-4 text-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
      </div>
      <h4 className="text-sm font-semibold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
        {item.title}
      </h4>
      <p className="text-xs text-foreground/60 leading-relaxed mb-3">
        {item.summary}
      </p>
      <div className="flex items-center justify-between text-xs text-foreground/40">
        <span className="font-medium">{item.source}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.date}</span>
      </div>
    </div>
  </motion.a>
);

/* ─── Blog post card ────────────────────────────────────────────────────────── */
const BlogCard = ({ post, index, featured }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.35, ease: 'easeOut' }}
    className={`group cursor-pointer glass rounded-xl border border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${featured ? 'p-6' : 'p-4'}`}
  >
    {featured && (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-3">
        <Sparkles className="h-3.5 w-3.5" /> Featured post
      </div>
    )}
    <div className="flex items-start justify-between gap-2 mb-2">
      <TagBadge tag={post.tag} />
      <ArrowUpRight className="h-4 w-4 text-foreground/30 group-hover:text-primary transition-colors shrink-0" />
    </div>
    <h4 className={`font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors ${featured ? 'text-base' : 'text-sm'}`}>
      {post.title}
    </h4>
    <p className="text-xs text-foreground/60 leading-relaxed mb-3">
      {post.excerpt}
    </p>
    <div className="flex items-center gap-3 text-xs text-foreground/40">
      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{post.readTime}</span>
      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.date}</span>
    </div>
  </motion.div>
);

/* ─── Subscribe form ────────────────────────────────────────────────────────── */
const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    // Simulate async subscribe (replace with real endpoint when ready)
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'submitting' || status === 'success'}
        className="bg-background/50 border-border/50 focus:border-primary flex-1"
      />
      <Button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
      >
        {status === 'submitting' && <span className="animate-pulse">Subscribing...</span>}
        {status === 'success' && <><CheckCircle className="h-4 w-4 mr-1.5" /> Subscribed!</>}
        {(status === 'idle' || status === 'error') && <><Mail className="h-4 w-4 mr-1.5" /> Subscribe</>}
      </Button>
    </form>
  );
};

/* ─── Main Newsletter component ─────────────────────────────────────────────── */
const Newsletter = () => {
  const [newsFilter, setNewsFilter] = useState('All');
  const allTags = ['All', ...Array.from(new Set(NEWS_ITEMS.map((n) => n.tag)))];

  const filteredNews = newsFilter === 'All'
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter((n) => n.tag === newsFilter);

  const featuredPosts = BLOG_POSTS.filter((p) => p.featured);
  const morePosts     = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <section id="newsletter" className="py-20 px-6 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <Rss className="h-3.5 w-3.5" /> Signal &amp; Noise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-5">
            Newsletter
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Trending AI news I&apos;m watching, posts I&apos;ve written from the frontlines at PayPal, and a weekly digest you can subscribe to.
          </p>
        </div>

        {/* ── Subscribe CTA banner ── */}
        <Spotlight>
          <div className="glass rounded-2xl border border-primary/20 p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  Get the weekly AI infrastructure digest
                </h3>
                <p className="text-sm text-foreground/60">
                  Curated links, notes from Darwin / Vireo / MAIA, and one build-log post every Friday.
                  No fluff, no sponsorships.
                </p>
              </div>
              <div className="w-full md:w-80 shrink-0">
                <SubscribeForm />
              </div>
            </div>
          </div>
        </Spotlight>

        {/* ── Tabs: News | Blog ── */}
        <Tabs defaultValue="news">
          <TabsList className="glass border border-border/30 mb-8 p-1 h-auto">
            <TabsTrigger value="news" className="flex items-center gap-1.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <TrendingUp className="h-4 w-4" /> Trending AI News
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-1.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <BookOpen className="h-4 w-4" /> Blog Posts
            </TabsTrigger>
          </TabsList>

          {/* ── NEWS TAB ── */}
          <TabsContent value="news">
            {/* Tag filter row */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setNewsFilter(tag)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    newsFilter === tag
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'glass border-border/30 text-foreground/60 hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={newsFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredNews.map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ── BLOG TAB ── */}
          <TabsContent value="blog">
            {/* Featured posts */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {featuredPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} featured />
              ))}
            </div>

            {/* More posts */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {morePosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} featured={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
};

export default Newsletter;
