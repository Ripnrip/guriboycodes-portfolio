// Mount root + Tweaks — BRUTALIST BRANCH
const { useEffect: useEffect_app } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "editorial",
  "theme": "brut-paper",
  "accent": "#ff4911",
  "fontMood": "block",
  "covers": true,
  "shadows": true
}/*EDITMODE-END*/;

const THEME_ACCENTS = {
  "brut-paper": ["#ff4911", "#2a6fdb", "#ffb800", "#0e9f6e"],
  "brut-acid": ["#ff4911", "#2a6fdb", "#7b2fbe", "#111111"],
  "brut-concrete": ["#d9260f", "#1f52a8", "#b86a00", "#111111"],
  "brut-noir": ["#ffd02f", "#5f9dff", "#ff6b47", "#46d69a"],
};

const LAYOUTS = {
  editorial: ["hero", "stats", "flagship", "shipped", "skills", "brain", "experience", "hackathons", "projects"],
  impact: ["hero", "stats", "flagship", "shipped", "skills", "brain", "experience", "hackathons", "projects"],
  showcase: ["hero", "flagship", "shipped", "skills", "brain", "experience", "stats", "hackathons", "projects"],
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect_app(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme || "brut-paper");
    r.setAttribute("data-layout", t.layout || "editorial");
    r.style.setProperty("--accent", t.accent);
    if (t.fontMood === "grotesk") {
      r.style.setProperty("--font-display", '"Space Grotesk", "Geist", system-ui, sans-serif');
    } else {
      r.style.setProperty("--font-display", '"Archivo Black", "Space Grotesk", system-ui, sans-serif');
    }
    r.setAttribute("data-covers", t.covers ? "on" : "off");
    r.setAttribute("data-shadows", t.shadows ? "on" : "off");
  }, [t]);

  useEffect_app(() => {
    const list = THEME_ACCENTS[t.theme] || THEME_ACCENTS["brut-paper"];
    if (!list.includes(t.accent)) setTweak("accent", list[0]);
  }, [t.theme]);

  const SECTIONS = {
    hero: <Hero key="hero" />,
    stats: <Stats key="stats" />,
    flagship: <Flagship key="flagship" />,
    shipped: <Shipped key="shipped" />,
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
        <TweakSection label="Brutalist direction" />
        <TweakRadio
          label="Surface"
          value={t.theme}
          options={["brut-paper", "brut-acid", "brut-concrete", "brut-noir"]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={THEME_ACCENTS[t.theme] || THEME_ACCENTS["brut-paper"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakRadio
          label="Display type"
          value={t.fontMood}
          options={["block", "grotesk"]}
          onChange={(v) => setTweak("fontMood", v)}
        />
        <TweakSection label="Detail" />
        <TweakToggle label="Painterly covers" value={t.covers} onChange={(v) => setTweak("covers", v)} />
        <TweakToggle label="Hard shadows" value={t.shadows} onChange={(v) => setTweak("shadows", v)} />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
