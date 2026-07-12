// Magic-UI-style effects, hand-rolled for this no-build React setup.
// NumberTicker · TypingText · ShinyText · SkillMarquee · HackGlobe · ThemeToggler · Reveal

const { useState: useMu_s, useEffect: useMu_e, useRef: useMu_r } = React;

/* ---- in-view hook ---- */
function useInView(ref, threshold = 0.3) {
  const [seen, setSeen] = useMu_s(false);
  useMu_e(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return seen;
}

/* ---- NumberTicker: animates the numeric part of a label on scroll-in ---- */
function NumberTicker({ text }) {
  const ref = useMu_r(null);
  const seen = useInView(ref, 0.5);
  const [disp, setDisp] = useMu_s(text);
  useMu_e(() => {
    const m = text.match(/([0-9][0-9,]*\.?[0-9]*)/);
    if (!m) { setDisp(text); return; }
    if (!seen) { setDisp(text.replace(m[1], m[1].replace(/[0-9]/g, "0"))); return; }
    const numStr = m[1];
    const target = parseFloat(numStr.replace(/,/g, ""));
    const decimals = (numStr.split(".")[1] || "").length;
    const hasComma = numStr.includes(",");
    const pre = text.slice(0, m.index);
    const post = text.slice(m.index + numStr.length);
    const dur = 1300, t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      let v = target * eased;
      let s = decimals ? v.toFixed(decimals) : String(Math.round(v));
      if (hasComma) s = Number(s).toLocaleString();
      setDisp(pre + s + post);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, text]);
  return <span ref={ref}>{disp}</span>;
}

/* ---- TypingText: cycles phrases with a typewriter caret ---- */
function TypingText({ phrases, hold = 1900 }) {
  const [i, setI] = useMu_s(0);
  const [txt, setTxt] = useMu_s("");
  const [del, setDel] = useMu_s(false);
  useMu_e(() => {
    const cur = phrases[i % phrases.length];
    let to;
    if (!del) {
      if (txt.length < cur.length) to = setTimeout(() => setTxt(cur.slice(0, txt.length + 1)), 52);
      else to = setTimeout(() => setDel(true), hold);
    } else {
      if (txt.length > 0) to = setTimeout(() => setTxt(cur.slice(0, txt.length - 1)), 26);
      else { setDel(false); setI(i + 1); }
    }
    return () => clearTimeout(to);
  }, [txt, del, i, phrases, hold]);
  return <span className="typing-text">{txt}<span className="typing-caret"></span></span>;
}

/* ---- ShinyText: sweeping shimmer ---- */
function ShinyText({ children, className }) {
  return <span className={`shiny-text ${className || ""}`}>{children}</span>;
}

/* ---- Reveal: staggered fade-up on scroll-in ---- */
function Reveal({ children, delay = 0, className }) {
  const ref = useMu_r(null);
  const seen = useInView(ref, 0.15);
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---- SkillMarquee: rows of icon chips scrolling, alternating directions ---- */
function SkillMarquee({ groups }) {
  return (
    <div className="sk-marquee">
      {groups.map((g, gi) => (
        <div className="sk-track" key={gi}>
          <div className={`sk-row ${gi % 2 ? "rev" : ""}`}>
            {[...g.items, ...g.items].map((it, k) => (
              <span className="sk-chip" key={k} title={it.name}>
                <img src={it.icon} alt="" loading="lazy" />
                <span>{it.name}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- HackGlobe: cobe WebGL globe with markers; graceful fallback ---- */
function HackGlobe({ markers }) {
  const ref = useMu_r(null);
  const [ok, setOk] = useMu_s(true);
  useMu_e(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let globe, phi = 0, destroyed = false, timer;
    const size = () => canvas.offsetWidth || 420;
    const start = () => {
      const createGlobe = window.__createGlobe;
      if (!createGlobe) { setOk(false); return; }
      if (destroyed) return;
      try {
        const theme = document.documentElement.getAttribute("data-theme") || "";
        const brut = theme.indexOf("brut") === 0 && theme !== "brut-noir";
        const light = brut || document.documentElement.getAttribute("data-mode") === "light";
        globe = createGlobe(canvas, {
          devicePixelRatio: 2,
          width: size() * 2,
          height: size() * 2,
          phi: 0,
          theta: 0.28,
          dark: light ? 0 : 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: light ? 8 : 5.4,
          baseColor: brut ? [0.88, 0.86, 0.8] : light ? [0.82, 0.85, 0.88] : [0.32, 0.34, 0.4],
          markerColor: brut ? [1, 0.29, 0.07] : [0.37, 0.89, 0.78],
          glowColor: brut ? [0.96, 0.94, 0.9] : light ? [0.9, 0.92, 0.95] : [0.1, 0.12, 0.16],
          markers: markers.map((m) => ({ location: m.location, size: m.size })),
          onRender: (state) => {
            state.phi = phi;
            phi += 0.0032;
            state.width = size() * 2;
            state.height = size() * 2;
          },
        });
      } catch (e) { setOk(false); }
    };
    const restart = () => { if (globe && globe.destroy) { globe.destroy(); globe = null; } start(); };
    const mo = new MutationObserver((muts) => {
      for (const m of muts) if (m.attributeName === "data-theme" || m.attributeName === "data-mode") { restart(); break; }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-mode"] });
    if (window.__createGlobe) start();
    else {
      const onReady = () => start();
      window.addEventListener("cobe-ready", onReady, { once: true });
      window.addEventListener("cobe-failed", () => setOk(false), { once: true });
      timer = setTimeout(() => { if (!window.__createGlobe) setOk(false); }, 7000);
      return () => { destroyed = true; clearTimeout(timer); mo.disconnect(); window.removeEventListener("cobe-ready", onReady); if (globe && globe.destroy) globe.destroy(); };
    }
    return () => { destroyed = true; mo.disconnect(); if (globe && globe.destroy) globe.destroy(); };
  }, []);
  if (!ok) return null;
  return (
    <div className="globe-inner">
      <div className="globe-wrap">
        <canvas ref={ref} className="globe-canvas"></canvas>
      </div>
      <div className="globe-pins">
        {markers.map((m, i) => <span key={i}>{m.label}</span>)}
      </div>
    </div>
  );
}

/* ---- ThemeToggler: light/dark with a View-Transition circular reveal ---- */
function applyMode(next) {
  document.documentElement.setAttribute("data-mode", next);
  try { localStorage.setItem("gs-mode", next); } catch (e) {}
}
function ThemeToggler() {
  const [light, setLight] = useMu_s(() => document.documentElement.getAttribute("data-mode") === "light");
  const toggle = (e) => {
    const next = light ? "dark" : "light";
    const run = () => { applyMode(next); setLight(!light); };
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const x = e.clientX, y = e.clientY;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const t = document.startViewTransition(run);
      t.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 560, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
        );
      });
    } else run();
  };
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle light / dark mode" title="Light / dark">
      <span className="theme-toggle-glyph">{light ? "☀" : "☾"}</span>
    </button>
  );
}

/* ---- TextAnimate: word-by-word fade-up on scroll-in ---- */
function TextAnimate({ text, className }) {
  const ref = useMu_r(null);
  const seen = useInView(ref, 0.25);
  const words = String(text).split(" ");
  return (
    <span ref={ref} className={`text-animate ${className || ""}`}>
      {words.map((w, i) => (
        <span
          className="ta-word"
          key={i}
          style={{ transitionDelay: `${i * 38}ms`, opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(8px)" }}
        >{w}{i < words.length - 1 ? "\u00a0" : ""}</span>
      ))}
    </span>
  );
}

Object.assign(window, { NumberTicker, TypingText, ShinyText, Reveal, SkillMarquee, HackGlobe, ThemeToggler, TextAnimate });
