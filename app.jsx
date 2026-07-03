// Mount root + Tweaks (3 layouts + theme variations)
const { useEffect: useEffect_app } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "editorial",
  "theme": "aurora",
  "accent": "#5fe3c8",
  "fontMood": "serif",
  "covers": true,
  "grain": true,
  "curation": false
}/*EDITMODE-END*/;

const THEME_ACCENTS = {
  aurora: ["#5fe3c8", "#7cd4ff", "#b39bff", "#f5c46b"],
  ghibli: ["#e0a86a", "#9bb087", "#d99a7c", "#c9a86a"],
  mono: ["#f2f2f2", "#a8a8a8", "#cfcfcf", "#7cd4ff"],
  nocturne: ["#b39bff", "#8ecbff", "#ff9ec8", "#8fd6c4"],
};

// Three distinct structures — section order is the variation axis.
const LAYOUTS = {
  // Editorial — story & depth, the long read
  editorial: ["hero", "stats", "flagship", "skills", "brain", "experience", "hackathons", "projects"],
  // Impact — recruiter-optimized, proof up front
  impact: ["hero", "stats", "flagship", "skills", "brain", "experience", "hackathons", "projects"],
  // Showcase — Ghibli-forward, visual-first
  showcase: ["hero", "flagship", "skills", "brain", "experience", "stats", "hackathons", "projects"],
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect_app(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme || "aurora");
    r.setAttribute("data-layout", t.layout || "editorial");
    r.style.setProperty("--accent", t.accent);
    if (t.fontMood === "tech") {
      r.style.setProperty("--font-display", '"Space Grotesk", "Geist", system-ui, sans-serif');
    } else {
      r.style.setProperty("--font-display", '"Instrument Serif", "EB Garamond", Georgia, serif');
    }
    r.setAttribute("data-covers", t.covers ? "on" : "off");
    r.setAttribute("data-grain", t.grain ? "on" : "off");
    r.setAttribute("data-curation", t.curation ? "on" : "off");
  }, [t]);

  useEffect_app(() => {
    const list = THEME_ACCENTS[t.theme] || THEME_ACCENTS.aurora;
    if (!list.includes(t.accent)) setTweak("accent", list[0]);
  }, [t.theme]);

  const SECTIONS = {
    hero: <Hero key="hero" />,
    stats: <Stats key="stats" />,
    flagship: <Flagship key="flagship" />,
    brain: <AskMyBrain key="brain" />,
    projects: <SideProjects key="projects" />,
    reel: null,
    hackathons: <HackathonReel key="hackathons" />,
    experience: <Experience key="experience" />,
    skills: <Skills key="skills" />,
  };

  const order = LAYOUTS[t.layout] || LAYOUTS.editorial;

  return (
    <>
      <Nav />
      {order.map((id) => SECTIONS[id])}
      <Footer />
      <WorkWithMeEgg />

      <TweaksPanel title="Tweaks" noDeckControls={true}>
        <TweakSection label="Structure" />
        <TweakRadio
          label="Layout"
          value={t.layout}
          options={["editorial", "impact", "showcase"]}
          onChange={(v) => setTweak("layout", v)}
        />
        <TweakSection label="Design direction" />
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={["aurora", "ghibli", "mono", "nocturne"]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={THEME_ACCENTS[t.theme] || THEME_ACCENTS.aurora}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakRadio
          label="Display type"
          value={t.fontMood}
          options={["serif", "tech"]}
          onChange={(v) => setTweak("fontMood", v)}
        />
        <TweakSection label="Detail" />
        <TweakToggle label="Painterly covers" value={t.covers} onChange={(v) => setTweak("covers", v)} />
        <TweakToggle label="Film grain" value={t.grain} onChange={(v) => setTweak("grain", v)} />
        <TweakSection label="Workbench" />
        <TweakToggle label="Curation mode" value={t.curation} onChange={(v) => setTweak("curation", v)} />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
