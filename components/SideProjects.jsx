// Projects — the curated 15-bundle shelf (from the 2026-07-01 repo audit)
// + a small playground strip for the fun tiles that didn't fold into a bundle.
// Toggle "Curation mode" in Tweaks to see readiness badges + media punch lists.

const { useState: useSP_state, useEffect: useSP_effect } = React;
const SP = window.PORTFOLIO_DATA;

const BN_ACCENTS = {
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  emerald: "var(--emerald)",
  amber: "var(--amber)",
  rose: "var(--rose)",
};

const READINESS = {
  "ship-ready": { label: "Ship-ready", c: "var(--emerald)" },
  "public-demo": { label: "Public demo", c: "var(--cyan)" },
  "case-study": { label: "Case study", c: "var(--violet)" },
  "needs-media": { label: "Needs media", c: "var(--amber)" },
  "needs-sanitization": { label: "Needs sanitization", c: "var(--rose)" },
};

const PUNCH_LABELS = {
  screenshot: "Screenshot",
  diagram: "Diagram",
  gifVideo: "GIF / video",
  logoIcon: "Logo",
  publicUrl: "Public URL",
  githubUrl: "GitHub",
};

function TechChip({ t }) {
  const ic = (SP.iconMap || {})[t];
  return (
    <span className={`chip ${ic ? "chip-ic" : ""}`}>
      {ic && <img src={ic} alt="" loading="lazy" />}
      {t}
    </span>
  );
}

function ReadinessPill({ readiness, always }) {
  const r = READINESS[readiness];
  if (!r) return null;
  return (
    <span
      className={`bn-readiness ${always ? "" : "curation-only"}`}
      style={{ "--r-c": r.c }}
    >
      <span className="bn-readiness-dot"></span>
      {r.label}
    </span>
  );
}

function BundleCard({ b, onOpen }) {
  const accent = BN_ACCENTS[b.accent] || "var(--accent)";
  return (
    <button className="bn-card" style={{ "--accent-c": accent }} onClick={() => onOpen(b)}>
      <div className="bn-art">
        <img src={b.art || b.cover} alt={`${b.codename} — cover art`} loading="lazy" />
        <div className="bn-art-grad"></div>
        <span className="bn-rank">{String(b.rank).padStart(2, "0")}</span>
        <ReadinessPill readiness={b.readiness} />
      </div>
      <div className="bn-meta">
        <div className="bn-codename">{b.codename}</div>
        <div className="bn-title-row">
          <h3 className="bn-title">{b.title}</h3>
          <span className="bn-arrow">↗</span>
        </div>
        <p className="bn-one">{b.one || b.tagline}</p>
        <div className="bn-foot">
          <div className="bn-chips">
            {(b.stack || []).slice(0, 3).map((t) => <TechChip key={t} t={t} />)}
          </div>
          <div className="bn-links-hint">
            {b.links && b.links.demo && <span title="Live demo">live</span>}
            {b.links && b.links.github && <span title="Source on GitHub">code</span>}
            {b.links && b.links.appstore && <span title="On the App Store">app</span>}
          </div>
        </div>
      </div>
    </button>
  );
}

function BundleModal({ b, onClose }) {
  useSP_effect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const accent = BN_ACCENTS[b.accent] || "var(--accent)";
  return (
    <div className="sp-modal" onClick={onClose}>
      <div className="sp-modal-card bn-modal" style={{ "--accent-c": accent }} onClick={(e) => e.stopPropagation()}>
        <div className="bn-banner">
          <img src={b.cover} alt="" aria-hidden="true" />
          <button className="sp-modal-close" onClick={onClose}>✕</button>
          <div className="bn-banner-grad"></div>
          <div className="bn-banner-head">
            <div className="bn-banner-row">
              <span className="bn-codename">{b.codename}</span>
              <span className="bn-rank-chip">Bundle {String(b.rank).padStart(2, "0")} / 15</span>
              <ReadinessPill readiness={b.readiness} />
            </div>
            <h3>{b.title}</h3>
          </div>
        </div>
        <div className="sp-modal-body bn-body">
          {b.tagline && <p className="bn-tagline">"{b.tagline}"</p>}
          {b.story && <p className="sp-modal-desc">{b.story}</p>}
          {b.why && (
            <div className="bn-why">
              <span className="bn-why-k">Why it's here</span>
              <p>{b.why}</p>
            </div>
          )}
          {b.metrics && b.metrics.length > 0 && (
            <div className="bn-metrics">
              {b.metrics.map((m, i) => (
                <div className="metric" key={i}>
                  <div className="metric-k">{m.k}</div>
                  <div className="metric-v">{m.v}</div>
                </div>
              ))}
            </div>
          )}
          <div className="sp-modal-tech">
            {(b.stack || []).map((t) => <TechChip key={t} t={t} />)}
          </div>
          {b.foldsIn && b.foldsIn.length > 0 && (
            <div className="bn-folds">
              <span className="bn-folds-k">Includes</span>
              {b.foldsIn.map((f, i) =>
                f.href ? (
                  <a key={i} href={f.href} target="_blank" rel="noopener" className="bn-fold-chip link">{f.n} ↗</a>
                ) : (
                  <span key={i} className="bn-fold-chip">{f.n}</span>
                )
              )}
            </div>
          )}
          <div className="sp-modal-links">
            {b.links && b.links.demo && (
              <a href={b.links.demo} target="_blank" rel="noopener" className="sp-btn primary">↗ View live</a>
            )}
            {b.links && b.links.github && (
              <a href={b.links.github} target="_blank" rel="noopener" className="sp-btn">Source</a>
            )}
            {b.links && b.links.appstore && (
              <a href={b.links.appstore} target="_blank" rel="noopener" className="sp-btn">App Store</a>
            )}
          </div>
          <div className="bn-curation curation-only">
            <div className="bn-curation-head">Curation · media punch list</div>
            <div className="bn-punchlist">
              {Object.entries(b.punchlist || {}).map(([k, v]) => (
                <span className={`bn-punch ${v}`} key={k}>
                  <span className="bn-punch-dot"></span>
                  {PUNCH_LABELS[k] || k}
                </span>
              ))}
            </div>
            {b.sanitizationNote && <p className="bn-sanitize">{b.sanitizationNote}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SideProjectCard({ p, onOpen }) {
  return (
    <button className={`sp-card ${p.feature ? "shine" : ""}`} onClick={() => onOpen(p)}>
      {p.feature && <span className="shine-border" aria-hidden="true"></span>}
      <div className="sp-art">
        <img src={p.img} alt={`${p.title} — Ghibli illustration`} loading="lazy" />
        <span className="sp-cat-chip">{p.cat}</span>
        <div className="sp-art-grad"></div>
      </div>
      <div className="sp-meta">
        <div className="sp-title-row">
          <h3 className="sp-title">{p.title}</h3>
          <span className="sp-arrow">↗</span>
        </div>
        <p className="sp-one">{p.one || p.desc}</p>
        <div className="sp-tech">
          {p.tech.slice(0, 3).map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </button>
  );
}

function SideProjects() {
  const [openBundle, setOpenBundle] = useSP_state(null);
  const [open, setOpen] = useSP_state(null);

  const bundles = (SP.bundles || [])
    .filter((b) => b.kind === "personal")
    .sort((a, b) => a.rank - b.rank);

  return (
    <section className="bay" id="projects" data-screen-label="Projects">
      <div className="wrap">
        <div className="eyebrow">Beyond the day job · the curated shelf</div>
        <h2 className="section-title">
          Nights & weekends, <em>curated.</em>
        </h2>
        <p className="lede">
          The full audit found 295 repos on my machines. These are the bundles that
          matter — each with a story, a stack, and receipts. Five more live above as
          flagship case studies; the hackathon reel below is the proof rail.
        </p>

        <div className="bn-grid">
          {bundles.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 90}>
              <BundleCard b={b} onOpen={setOpenBundle} />
            </Reveal>
          ))}
        </div>

        <div className="bn-playground-label">
          <span>Playground</span> — small experiments, Ghibli-illustrated
        </div>
        <div className="sp-grid">
          {SP.sideProjects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <SideProjectCard p={p} onOpen={setOpen} />
            </Reveal>
          ))}
        </div>
      </div>

      {openBundle && <BundleModal b={openBundle} onClose={() => setOpenBundle(null)} />}

      {open && (
        <div className="sp-modal" onClick={() => setOpen(null)}>
          <div className="sp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sp-modal-art">
              <img src={open.img} alt={open.title} />
              <button className="sp-modal-close" onClick={() => setOpen(null)}>✕</button>
              <div className="sp-modal-art-grad"></div>
              <div className="sp-modal-head">
                <span className="sp-cat-chip">{open.cat}</span>
                <h3>{open.title}</h3>
              </div>
            </div>
            <div className="sp-modal-body">
              <p className="sp-modal-desc">{open.desc}</p>
              <div className="sp-modal-tech">
                {open.tech.map((t, i) => <span key={i}>{t}</span>)}
              </div>
              <div className="sp-modal-links">
                {open.link && (
                  <a href={open.link} target="_blank" rel="noopener" className="sp-btn primary">↗ View live</a>
                )}
                {open.github && (
                  <a href={open.github} target="_blank" rel="noopener" className="sp-btn">Source</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { SideProjects });
