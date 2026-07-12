// Side projects — filterable grid of real Ghibli-generated art, with a lightbox modal.

const { useState: useSP_state } = React;
const SP = window.PORTFOLIO_DATA;

const SP_CATS = ["All", "AI/ML", "Mobile", "Creative", "Tools", "Community"];

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
  const [cat, setCat] = useSP_state("All");
  const [open, setOpen] = useSP_state(null);

  const list = cat === "All" ? SP.sideProjects : SP.sideProjects.filter(p => p.cat === cat);

  return (
    <section className="bay" id="projects" data-screen-label="Side Projects">
      <div className="wrap">
        <div className="eyebrow">Beyond the day job · open source & published apps</div>
        <h2 className="section-title">
          Off the <em>clock.</em>
        </h2>
        <p className="lede">
          A decade of side quests — published App Store games, RAG search engines, AR hackathon builds, and developer tools. Illustrations generated with a Ghibli-style diffusion pipeline.
        </p>

        <div className="sp-filter">
          {SP_CATS.map((c) => {
            const n = c === "All" ? SP.sideProjects.length : SP.sideProjects.filter(p => p.cat === c).length;
            return (
              <button
                key={c}
                className={`sp-filter-btn ${cat === c ? "active" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}<span className="sp-filter-n">{n}</span>
              </button>
            );
          })}
        </div>

        <div className="sp-grid">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <SideProjectCard p={p} onOpen={setOpen} />
            </Reveal>
          ))}
        </div>
      </div>

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
