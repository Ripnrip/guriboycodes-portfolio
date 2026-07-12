// Ask My Brain — RAG-style chat over Gurinder's corpus +
// a d3 force-directed knowledge graph: 7 systems + every skill as an icon node.
// Retrieved sources light up the relevant systems and their connected skills.

const { useState: useState_b, useEffect: useEffect_b, useRef: useRef_b, useMemo: useMemo_b } = React;

const BRAIN = window.PORTFOLIO_DATA.brain;
const SKILLS = window.PORTFOLIO_DATA.skills;
const FLAGSHIP = window.PORTFOLIO_DATA.flagship;

/* ---------- retrieval ---------- */
function tokenize(s) {
  return s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(t => t.length > 2);
}
const STOP = new Set(["the","and","for","you","what","tell","more","with","how","why","does","this","that","into","your","yours","about","much","were","was","are","have","has","him","his","gurinder"]);

function retrieve(query, k = 4) {
  const qTokens = tokenize(query).filter(t => !STOP.has(t));
  if (!qTokens.length) return [];
  const scored = BRAIN.corpus.map(c => {
    const text = (c.text + " " + c.topic).toLowerCase();
    let score = 0;
    for (const t of qTokens) {
      if (text.includes(t)) score += 2;
      if (text.split(/\s+/).some(w => w.startsWith(t) && t.length > 3)) score += 0.5;
    }
    return { ...c, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.filter(c => c.score > 0).slice(0, k);
}

/* topic → graph node ids to light up */
const TOPIC_NODES = {
  "MAIA": ["sys:maia"],
  "Darwin": ["sys:darwin"],
  "Vireo": ["sys:vireo"],
  "claude-cosmos": ["sys:cosmos"],
  "Mac-in-a-Mac": ["sys:miam"],
  "Cerebro": ["sys:cerebro"],
  "Devmo": ["sys:devmo"],
  "Merchant Sandbox": ["sys:miam"],
  "AI Enablement": ["sys:cosmos", "sys:devmo"],
  "The loop": ["sys:vireo", "sys:cerebro", "sys:darwin", "sys:devmo", "sys:maia", "sys:miam"],
  "July 2026": ["sys:darwin", "sys:vireo", "sys:cerebro"],
  "Roadmap": ["sys:darwin", "sys:devmo", "sys:maia", "sys:miam"],
  "Venmo": ["sys:maia"],
  "Mid-year": [],
  "Scope": [],
  "Hire": [],
  "Philosophy": [],
  "Side projects": [],
  "Hackathons": [],
  "Leadership": [],
};
function nodesForSources(sources) {
  const ids = new Set();
  for (const s of sources) (TOPIC_NODES[s.topic] || []).forEach(id => ids.add(id));
  return ids;
}

/* system → connected skill names (cross links) */
const SYSTEM_SKILLS = {
  "sys:maia": ["Python", "Claude", "LangChain", "MCP", "RAG Pipelines", "ChromaDB", "Pinecone"],
  "sys:vireo": ["MCP", "n8n", "Python", "Datadog", "Neo4j"],
  "sys:cosmos": ["Claude", "MCP", "Python", "OpenAI"],
  "sys:darwin": ["Python", "DSPy / GEPA", "Neo4j", "GitHub Actions"],
  "sys:miam": ["Swift", "Xcode", "Docker", "Fastlane"],
  "sys:cerebro": ["Python", "Qdrant", "Neo4j", "n8n"],
  "sys:devmo": ["Python", "GitHub Actions", "Datadog", "n8n"],
};

const CAT_ACCENT = { ai: "var(--violet)", mobile: "var(--cyan)", cloud: "var(--emerald)", data: "var(--amber)" };
const SYS_ACCENT = { maia: "var(--cyan)", darwin: "var(--amber)", vireo: "var(--emerald)", cosmos: "var(--violet)", miam: "var(--rose)", cerebro: "var(--violet)", devmo: "var(--cyan)" };

/* build nodes + links */
function buildGraph() {
  const nodes = [{ id: "me", label: "Gurinder", group: "center", r: 26 }];
  const links = [];

  for (const f of FLAGSHIP) {
    const id = "sys:" + f.id;
    nodes.push({ id, label: f.codename, group: "system", r: 18, accent: SYS_ACCENT[f.id] || "var(--cyan)" });
    links.push({ source: "me", target: id, kind: "hub" });
  }

  const byName = {};
  const CAT_SHORT = { ai: "AI / ML", mobile: "Mobile", cloud: "Cloud & DevOps", data: "Data & Tools" };
  const CAT_ICON = { ai: "assets/tech/claude.svg", mobile: "assets/tech/swift.svg", cloud: "assets/tech/docker.svg", data: "assets/tech/postgresql.svg" };
  for (const g of SKILLS) {
    const cid = "cat:" + g.key;
    nodes.push({ id: cid, label: CAT_SHORT[g.key] || g.group, group: "category", r: 22, accent: CAT_ACCENT[g.key] || "var(--cyan)", icon: CAT_ICON[g.key] });
    links.push({ source: "me", target: cid, kind: "hub" });
    for (const it of g.items) {
      const sid = "sk:" + it.name;
      byName[it.name] = sid;
      nodes.push({ id: sid, label: it.name, group: "skill", r: 8 + ((it.level - 80) / 20) * 6, accent: CAT_ACCENT[g.key], icon: it.icon });
      links.push({ source: cid, target: sid, kind: "skill" });
    }
  }

  for (const [sid, names] of Object.entries(SYSTEM_SKILLS)) {
    for (const n of names) {
      if (byName[n]) links.push({ source: sid, target: byName[n], kind: "cross" });
    }
  }
  return { nodes, links };
}

/* ---------- d3 knowledge graph ---------- */
function KnowledgeGraph({ activeIds }) {
  const wrapRef = useRef_b(null);
  const svgRef = useRef_b(null);
  const simRef = useRef_b(null);
  const selRef = useRef_b(null);
  const neighborRef = useRef_b(null);
  const baseRef = useRef_b(null);

  // build once
  useEffect_b(() => {
    if (!window.d3 || !svgRef.current) return;
    const d3 = window.d3;
    const wrap = wrapRef.current;
    let W = wrap.clientWidth || 520;
    let H = wrap.clientHeight || 540;

    const { nodes, links } = buildGraph();

    // neighbor index for highlight expansion
    const neighbors = {};
    nodes.forEach(n => (neighbors[n.id] = new Set([n.id])));
    links.forEach(l => {
      neighbors[l.source].add(l.target);
      neighbors[l.target].add(l.source);
    });
    neighborRef.current = neighbors;

    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${W} ${H}`);
    svg.selectAll("*").remove();
    const root = svg.append("g");

    const link = root.append("g").selectAll("line")
      .data(links).join("line")
      .attr("class", d => `kg-link kg-${d.kind}`);

    const node = root.append("g").selectAll("g")
      .data(nodes).join("g")
      .attr("class", d => `kg-node kg-${d.group}`)
      .call(d3.drag()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    // skill icon background + image
    node.filter(d => d.group === "skill").append("circle")
      .attr("class", "kg-skill-bg").attr("r", d => d.r);
    node.filter(d => d.group === "skill").append("image")
      .attr("href", d => d.icon)
      .attr("width", d => d.r * 1.5).attr("height", d => d.r * 1.5)
      .attr("x", d => -d.r * 0.75).attr("y", d => -d.r * 0.75)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // system + category circles
    node.filter(d => d.group !== "skill").append("circle")
      .attr("class", "kg-core")
      .attr("r", d => d.r)
      .style("--c", d => d.accent || "var(--accent)");

    // representative icon chip for systems + categories
    const iconNodes = node.filter(d => (d.group === "system" || d.group === "category") && d.icon);
    iconNodes.append("circle").attr("class", "kg-icon-bg").attr("r", d => d.r * 0.62);
    iconNodes.append("image")
      .attr("href", d => d.icon)
      .attr("width", d => d.r * 0.92).attr("height", d => d.r * 0.92)
      .attr("x", d => -d.r * 0.46).attr("y", d => -d.r * 0.46)
      .attr("preserveAspectRatio", "xMidYMid meet");

    node.filter(d => d.group === "center").append("text")
      .attr("class", "kg-center-letter").attr("text-anchor", "middle").attr("dy", 7).text("G");

    // monogram for the 5 system nodes (no misleading tech logo)
    node.filter(d => d.group === "system").append("text")
      .attr("class", "kg-sys-letter").attr("text-anchor", "middle").attr("dy", 6)
      .text(d => (d.label || "?").charAt(0).toUpperCase());

    // labels for systems + categories always; skills get title tooltip
    node.filter(d => d.group === "system" || d.group === "category").append("text")
      .attr("class", "kg-label").attr("text-anchor", "middle")
      .attr("dy", d => d.r + 13).text(d => d.label);
    node.append("title").text(d => d.label);

    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id)
        .distance(d => d.kind === "hub" ? 185 : d.kind === "cross" ? 140 : 62)
        .strength(d => d.kind === "cross" ? 0.03 : d.kind === "hub" ? 0.55 : 0.55))
      .force("charge", d3.forceManyBody().strength(d => d.group === "center" ? -1100 : d.group === "category" ? -620 : d.group === "system" ? -440 : -95))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius(d => d.r + 8).strength(0.9))
      .force("x", d3.forceX(W / 2).strength(0.04))
      .force("y", d3.forceY(H / 2).strength(0.04))
      .alphaDecay(0.022);

    sim.on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    simRef.current = sim;

    // pin the hub + 4 category nodes to fixed compass points so every category
    // (Mobile included) is always on-screen; skills cluster around them.
    const placeAnchors = () => {
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.30;
      const ang = { "cat:ai": 0, "cat:data": Math.PI / 2, "cat:cloud": Math.PI, "cat:mobile": -Math.PI / 2 };
      nodes.forEach((n) => {
        if (n.group === "center") { n.fx = cx; n.fy = cy; }
        else if (n.group === "category" && ang[n.id] !== undefined) {
          n.fx = cx + R * Math.cos(ang[n.id]);
          n.fy = cy + R * Math.sin(ang[n.id]);
        }
      });
    };
    placeAnchors();

    const expand = (ids) => {
      const out = new Set();
      ids.forEach((id) => (neighbors[id] || new Set([id])).forEach((n) => out.add(n)));
      return out;
    };
    const paint = (active) => {
      node.classed("kg-active", d => active ? active.has(d.id) : false)
        .classed("kg-dim", d => active ? !active.has(d.id) : false);
      link.classed("kg-link-active", d => {
        if (!active) return false;
        const s = d.source.id || d.source, t = d.target.id || d.target;
        return active.has(s) && active.has(t);
      }).classed("kg-link-dim", d => {
        if (!active) return false;
        const s = d.source.id || d.source, t = d.target.id || d.target;
        return !(active.has(s) && active.has(t));
      });
    };
    selRef.current = { node, link, paint, expand };

    // systems (projects) are hidden until the RAG references them
    const applyVisibility = (sysSet) => {
      node.classed("kg-hidden", d => d.group === "system" && !(sysSet && sysSet.has(d.id)));
      link.classed("kg-hidden", d => {
        const s = d.source.id || d.source, t = d.target.id || d.target;
        const sHide = typeof s === "string" && s.indexOf("sys:") === 0 && !(sysSet && sysSet.has(s));
        const tHide = typeof t === "string" && t.indexOf("sys:") === 0 && !(sysSet && sysSet.has(t));
        return sHide || tHide;
      });
    };
    selRef.current.applyVisibility = applyVisibility;

    // hover any node to light it + everything it connects to
    node.on("mouseenter", (e, d) => { paint(expand(new Set([d.id]))); })
        .on("mouseleave", () => { paint(baseRef.current); });
    applyVisibility(new Set());
    paint(baseRef.current);

    const ro = new ResizeObserver(() => {
      W = wrap.clientWidth; H = wrap.clientHeight;
      svg.attr("viewBox", `0 0 ${W} ${H}`);
      sim.force("center", d3.forceCenter(W / 2, H / 2));
      sim.force("x", d3.forceX(W / 2).strength(0.05));
      sim.force("y", d3.forceY(H / 2).strength(0.05));
      placeAnchors();
      sim.alpha(0.3).restart();
    });
    ro.observe(wrap);

    return () => { ro.disconnect(); sim.stop(); };
  }, []);

  // apply highlight when activeIds changes (RAG retrieval)
  useEffect_b(() => {
    const sel = selRef.current;
    if (!sel) return;
    let base = null;
    const revealed = new Set();
    if (activeIds && activeIds.size) {
      base = sel.expand(activeIds);
      activeIds.forEach((id) => { if (typeof id === "string" && id.indexOf("sys:") === 0) revealed.add(id); });
    }
    baseRef.current = base;
    if (sel.applyVisibility) sel.applyVisibility(revealed);
    sel.paint(base);
    if (simRef.current) simRef.current.alpha(0.18).restart();
  }, [activeIds]);

  return (
    <div className="kg-wrap" ref={wrapRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

/* ---------- Ask My Brain ---------- */
function AskMyBrain() {
  const [messages, setMessages] = useState_b([]);
  const [input, setInput] = useState_b("");
  const [thinking, setThinking] = useState_b(false);
  const [hoveredSrc, setHoveredSrc] = useState_b(null);
  const scrollRef = useRef_b(null);
  const reset = () => { setMessages([]); setInput(""); setHoveredSrc(null); };

  useEffect_b(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const activeIds = useMemo_b(() => {
    if (hoveredSrc) {
      const src = messages.flatMap(m => m.sources || []).find(s => s.id === hoveredSrc);
      if (src) return nodesForSources([src]);
    }
    const lastBrain = [...messages].reverse().find(m => m.role === "brain" && m.sources);
    if (lastBrain) return nodesForSources(lastBrain.sources);
    return new Set();
  }, [messages, hoveredSrc]);

  async function ask(q) {
    const question = (q || "").trim();
    if (!question || thinking) return;
    const sources = retrieve(question, 4);
    setMessages(prev => [...prev, { role: "user", text: question }]);
    setInput("");
    setThinking(true);

    const context = sources.map((s, i) => `[${i + 1}] (${s.topic}) ${s.text}`).join("\n\n");
    const prompt = `You are "Gurinder's Brain" — answer questions about Gurinder Singh's 2026 work as if you ARE his portfolio. Use ONLY the context below. Be concise (2–4 sentences max), conversational, slightly playful. Reference specific systems/numbers when relevant. Never invent details not in the context. If the question isn't covered, say so briefly and suggest what IS in the corpus.

CONTEXT:
${context}

QUESTION: ${question}

ANSWER (concise, first-person as Gurinder, no headers, no markdown):`;

    let answer = "";
    try {
      // Try /api/claude serverless proxy first, then window.claude (local dev), then corpus fallback
      const resp = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (resp.ok) {
        const data = await resp.json();
        answer = data.text || '';
      } else if (window.claude) {
        answer = await window.claude.complete(prompt);
      } else {
        throw new Error('No LLM available');
      }
    } catch (e) {
      answer = sources.length
        ? `Quick take: ${sources[0].text}`
        : "Hmm — that's outside my corpus. Try asking about MAIA, Vireo, claude-cosmos, Darwin, Cerebro, Devmo, the connected learning loop, the roadmap, or what it's like to work with me.";
    }
    setThinking(false);
    setMessages(prev => [...prev, { role: "brain", text: (answer || "").trim(), sources }]);
  }

  return (
    <section className="bay" id="brain" data-screen-label="Ask My Brain">
      <div className="wrap">
        <div className="eyebrow">Interactive · RAG demo on real corpus</div>
        <h2 className="section-title">Ask <em>my brain.</em></h2>
        <p className="lede">
          A live retrieval pass over my 2026 work — the same shape as the systems I build. Your question is tokenized, scored against the corpus, the top sources light up the systems <span style={{ color: "var(--accent)" }}>and the exact skills</span> they lean on, and an LLM agent composes the answer from only those chunks.
        </p>

        <div className="brain">
          <div className="brain-panel">
            <div className="brain-head">
              <div className="brain-head-l"><span className="dot"></span><span>brain.guriboycodes</span></div>
              <div className="brain-head-r">
                {messages.length > 0 && <button className="brain-reset" onClick={reset}>↺ new chat</button>}
                <span>RAG · k=4 · {BRAIN.corpus.length} chunks</span>
              </div>
            </div>

            <div className="brain-chat-body" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="brain-empty">
                  <div className="glow"></div>
                  <h4>Ask anything.</h4>
                  <p>I'll retrieve the relevant chunks from my actual 2026 corpus and answer in my own voice.</p>
                  <div className="examples">
                    {BRAIN.examples.map((ex, i) => (
                      <button key={i} onClick={() => ask(ex)}>{ex}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className={`msg ${m.role}`}>
                      <div className="msg-role">{m.role === "user" ? "You" : "Gurinder's Brain"}</div>
                      <div className="msg-bubble">{m.text}</div>
                      {m.sources && m.sources.length > 0 && (
                        <div className="msg-sources">
                          {m.sources.map((s, k) => (
                            <span
                              key={k}
                              className={`src-chip ${hoveredSrc === s.id ? "active" : ""}`}
                              onMouseEnter={() => setHoveredSrc(s.id)}
                              onMouseLeave={() => setHoveredSrc(null)}
                              title={s.text}
                            >[{k + 1}] {s.topic}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {thinking && (
                    <div className="msg brain">
                      <div className="msg-role">Gurinder's Brain</div>
                      <div className="msg-bubble">
                        <span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span>
                      </div>
                    </div>
                  )}
                  {!thinking && (
                    <div className="brain-followup">
                      <div className="brain-followup-label">Ask something else</div>
                      <div className="examples">
                        {BRAIN.examples.map((ex, i) => (
                          <button key={i} onClick={() => ask(ex)}>{ex}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="brain-input-row">
              <input
                className="brain-input"
                placeholder="Ask about MAIA, Darwin, Vireo, Cerebro, Devmo, the loop…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") ask(input); }}
                disabled={thinking}
              />
              <button className="brain-send" onClick={() => ask(input)} disabled={thinking || !input.trim()}>
                {thinking ? "…" : "Ask →"}
              </button>
            </div>
          </div>

          <div className="brain-panel brain-graph">
            <div className="brain-head">
              <div className="brain-head-l">
                <span className="dot" style={{ background: "var(--violet)", boxShadow: "0 0 8px var(--violet)" }}></span>
                <span>knowledge_graph.v3</span>
              </div>
              <div className="brain-head-r">7 systems · {SKILLS.reduce((n, g) => n + g.items.length, 0)} skills</div>
            </div>
            <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
              <KnowledgeGraph activeIds={activeIds} />
              <div className="graph-overlay">
                <div className="graph-legend">
                  <span><i className="lg-system"></i>system</span>
                  <span><i className="lg-program"></i>AI/ML</span>
                  <span><i className="lg-tech"></i>cloud</span>
                  <span><i className="lg-metric"></i>data</span>
                </div>
                <span>{activeIds.size ? "lit" : "ask to reveal projects"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AskMyBrain });
