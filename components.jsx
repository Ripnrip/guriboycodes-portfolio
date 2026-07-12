// Portfolio Components — Hero, Stats, Flagship, Experience, Skills, Hackathons, Footer

const { useState } = React;
const D = window.PORTFOLIO_DATA;

const ACCENT_COLORS = {
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  emerald: "var(--emerald)",
  amber: "var(--amber)",
  rose: "var(--rose)",
};

/* ---------- Nav ---------- */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          <span className="dot"></span>
          <span>guriboycodes</span>
        </div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#brain">Ask My Brain</a>
          <a href="#projects">Projects</a>
          <a href="#hackathons">Hackathons</a>
          <a href="#skills">Skills</a>
        </div>
        <div className="nav-right">
          <ThemeToggler />
          <a className="nav-resume" href="Gurinder Singh — Resume.html" target="_blank" rel="noopener">Résumé</a>
          <a className="nav-cta" href="#contact">Get in touch</a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
function HeroPortrait({ h }) {
  const frames = [
    { src: h.portrait, cap: "Studio Ghibli · 2026" },
    { src: h.portraitAlt, cap: "Paragliding · off the clock" },
    h.portraitExtra ? { src: h.portraitExtra, cap: "COMPILING…" } : null,
  ].filter(Boolean);
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % frames.length);
  return (
    <div
      className="hero-portrait"
      onClick={next}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); } }}
      style={{ cursor: "pointer" }}
    >
      {frames.map((f, idx) => (
        <img
          key={idx}
          src={f.src}
          alt={f.cap}
          loading={idx === 0 ? "eager" : "lazy"}
          style={{
            position: idx === 0 ? "relative" : "absolute",
            inset: idx === 0 ? "auto" : 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.45s ease",
            zIndex: i === idx ? 2 : 1,
          }}
        />
      ))}
      <div className="hero-portrait-meta" style={{ zIndex: 3 }}>
        <span>{frames[i].cap}</span>
        <span>{frames.length > 1 ? "click →" : ""}</span>
      </div>
    </div>
  );
}

function Hero() {
  const h = D.hero;
  return (
    <section className="hero wrap" data-screen-label="01 Hero">
      <div className="hero-grid">
        <div>
          <div className="eyebrow">{h.title}</div>
          <h1 className="hero-name">
            Gurinder<br/>
            <span className="ital">Singh.</span>
          </h1>
          <p className="hero-pitch"><TypingText phrases={h.typed || [h.pitch]} /></p>
          <p className="hero-pitch-alt">{h.pitchAlt}</p>
          <div className="hero-meta">
            <span><span className="live-dot"></span>Available</span>
            <span>·</span>
            <span>Portfolio · {h.period}</span>
          </div>
        </div>
        <HeroPortrait h={h} />
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  return (
    <div className="wrap">
      <div className="stats">
        {D.stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-value"><NumberTicker text={s.value} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Flagship ---------- */
function Flagship() {
  return (
    <section className="bay" id="work" data-screen-label="02 Work">
      <div className="wrap">
        <div className="eyebrow">Flagship work · 2026</div>
        <h2 className="section-title">
          Seven systems I <em>authored</em><br/>
          this year.
        </h2>
        <p style={{ color: "var(--text-2)", maxWidth: "62ch", fontSize: 16, lineHeight: 1.7 }}>
          One connected learning loop — not seven disconnected projects. Vireo <em>observes</em> agent and product signals (20%). Cerebro <em>understands</em> and reconciles evidence across memory stores (6%). Darwin <em>decides</em> — evaluating change, readiness, and reusable lessons (24%). Devmo and MAIA <em>execute</em> the intelligence in real workflows (17% + 11%). Merchant Sandbox outcomes <em>validate</em> it back into memory (18%). 408 PRs. 7 programs. VP-adjacent sponsorship across 3 BUs.
        </p>

        <div className="flagship-list">
          {D.flagship.map((f, i) => (
            <Reveal key={f.id} delay={(i % 2) * 80}>
              <FlagshipCard f={f} idx={i} />
            </Reveal>
          ))}
        </div>

        {D.philosophy && (
          <div className="flagship-philosophy">
            <div className="eyebrow">How I build</div>
            <p className="working-quote">"{D.philosophy.quote}"</p>
            <div className="working-grid">
              {D.philosophy.principles.map((pr, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div className="working-card">
                    <div className="working-num">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="working-title">{pr.title}</h3>
                    <p className="working-body">{pr.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="working-egg-hint">
              <span className="working-egg-eyes">👀</span>
              <span>Want the unfiltered version? There's a <em>"what it's like to work with me"</em> video hiding in the corner.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FlagshipCard({ f, idx }) {
  const accent = ACCENT_COLORS[f.accent] || "var(--cyan)";
  return (
    <article
      className="flagship"
      id={`f-${f.id}`}
      style={{ "--accent-c": accent }}
    >
      <div className="flagship-head">
        <div className="flagship-num" style={{ color: accent }}>0{idx + 1}</div>
        <div className="flagship-title-row">
          <div className="flagship-codename">
            <span style={{ color: accent, letterSpacing: "0.1em" }}>{f.codename}</span>
            <span className="pill live">{f.status}</span>
            {f.stamp && <span className="pill">{f.stamp}</span>}
          </div>
          <h3 className="flagship-title">
            {f.title}
          </h3>
        </div>
        <div className="flagship-window">{f.window}</div>
      </div>
      <div className={`flagship-body ${f.cover && window.GhibliCovers ? "has-cover" : ""}`}>
        {f.cover && window.GhibliCovers && (
          <div className="flagship-cover">
            <div className="flagship-cover-art">{window.GhibliCovers[f.cover]}</div>
            <image-slot
              id={`cover-${f.id}`}
              className="cover-slot"
              shape="rounded"
              radius="12"
              src={f.image}
              placeholder={`Drop your Ghibli render`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            ></image-slot>
            <div className="cover-tag">{f.codename}</div>
          </div>
        )}
        <div>
          <p className="flagship-tagline">"{f.tagline}"</p>
          <p className="flagship-story">{f.story}</p>
          {f.midyear && (
            <div className="flagship-midyear">
              <span className="flagship-midyear-label">2026 update</span>
              <p className="flagship-midyear-text">{f.midyear}</p>
            </div>
          )}
          <div className="flagship-stack">
            {f.stack.map((s, k) => <span className="chip" key={k}>{s}</span>)}
          </div>
          {f.vocabulary && (
            <div className="flagship-vocab">
              {f.vocabulary.map((v, k) => <span className="vchip" key={k}>{v}</span>)}
            </div>
          )}
        </div>
        <div className="flagship-metrics">
          {f.metrics.map((m, k) => (
            <div className="metric" key={k}>
              <div className="metric-k">{m.k}</div>
              <div className="metric-v">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  return (
    <section className="bay" id="xp" data-screen-label="03 Experience">
      <div className="wrap">
        <div className="eyebrow">Career arc</div>
        <h2 className="section-title">
          A decade<br/>
          shipping at <em>scale.</em>
        </h2>
        <div className="timeline">
          {D.experience.map((x, i) => (
            <Reveal key={i} delay={i * 110}>
              <div className="t-item">
              <div className="t-head">
                <div className="t-co">
                  <div className="t-logo"><img src={x.logo} alt={x.company}/></div>
                  <div>
                    <div className="t-company">{x.company}</div>
                    <div className="t-role">{x.role}</div>
                  </div>
                </div>
                <div className="t-window">{x.window}</div>
              </div>
              <ul className="t-bullets">
                {x.bullets.map((b, k) => <li key={k}>{b}</li>)}
              </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  return (
    <section className="bay" id="skills" data-screen-label="05 Skills">
      <div className="wrap">
        <div className="eyebrow">Stack · 2026</div>
        <h2 className="section-title">
          The tools<br/>
          I reach for <em>first.</em>
        </h2>
        <div className="skills-marquee-wrap">
          <SkillMarquee groups={D.skills} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Philosophy / Ways of working ---------- */
function Philosophy() {
  const p = D.philosophy;
  if (!p) return null;
  return (
    <section className="bay" id="working" data-screen-label="Ways of Working">
      <div className="wrap">
        <div className="eyebrow">Ways of working · what it's like</div>
        <h2 className="section-title">
          How I <em>build.</em>
        </h2>
        <p className="working-quote">"{p.quote}"</p>
        <div className="working-grid">
          {p.principles.map((pr, i) => (
            <div className="working-card" key={i}>
              <div className="working-num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="working-title">{pr.title}</h3>
              <p className="working-body">{pr.body}</p>
            </div>
          ))}
        </div>
        <div className="working-egg-hint">
          <span className="working-egg-eyes">👀</span>
          <span>Want the unfiltered version? There's a <em>"what it's like to work with me"</em> video hiding in the corner.</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <section className="bay" id="contact" data-screen-label="06 Contact">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-pitch">
            Let's build the <em>infra</em> for what ships next.
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:gsingh622@yahoo.com">gsingh622@yahoo.com</a>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <a href="https://github.com/Ripnrip" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/gurinder-singh-a30a1a48" target="_blank" rel="noopener">LinkedIn</a>
            <a href="Gurinder Singh — Resume.html" target="_blank" rel="noopener">Résumé</a>
          </div>
        </div>
        <div className="footer-mini">
          <span>© 2026 Gurinder Singh · NYC</span>
          <span>Built with care · 2026 update</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mid-year Shipped ---------- */
function Shipped() {
  if (!D.shipped) return null;
  return (
    <section className="bay" id="shipped" data-screen-label="Also Shipped">
      <div className="wrap">
        <div className="eyebrow">Also shipped · joy, polish & platform</div>
        <h2 className="section-title">
          The <em>rest</em> of the year so far.
        </h2>
        <div className="shipped-grid">
          {D.shipped.map((s, i) => (
            <div className="shipped-card" key={i}>
              <span className="shipped-tag">{s.tag}</span>
              <h3 className="shipped-name">{s.name}</h3>
              <p className="shipped-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Stats, Flagship, Experience, Skills, Footer, Shipped, Philosophy });
