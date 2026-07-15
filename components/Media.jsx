// Media — hackathon video reel + the "what it's like to work with me" easter-egg video.

const { useState: useMd_state, useRef: useMd_ref, useEffect: useMd_effect } = React;
const MD = window.PORTFOLIO_DATA.media;

function VideoModal({ media, onClose }) {
  useMd_effect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="vid-modal" onClick={onClose}>
      <div className="vid-modal-card" onClick={(e) => e.stopPropagation()}>
        <video src={media.file} controls autoPlay playsInline />
        <button className="vid-modal-close" onClick={onClose}>✕</button>
        <div className="vid-modal-cap">
          <span className="vid-modal-title">{media.title}</span>
          {media.event && <span className="vid-modal-event">{media.event}</span>}
        </div>
      </div>
    </div>
  );
}

function ReelCard({ clip, onOpen }) {
  const ref = useMd_ref(null);
  const stills = clip.stills || [];
  const frames = 1 + stills.length; // frame 0 = the video; 1..n = still photos
  const [frame, setFrame] = useMd_state(0);
  useMd_effect(() => {
    if (frames < 2) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % frames), 4200);
    return () => clearInterval(id);
  }, [frames]);
  const showVideo = frame === 0;
  return (
    <div className="reel-card" onClick={() => onOpen(clip)}>
      <div
        className="reel-thumb"
        onMouseEnter={() => { const v = ref.current; if (showVideo && v) { v.play().catch(() => {}); } }}
        onMouseLeave={() => { const v = ref.current; if (v) { v.pause(); v.currentTime = 0; } }}
      >
        <video ref={ref} src={clip.file} muted loop playsInline preload="metadata" style={{ opacity: showVideo ? undefined : 0 }} />
        {stills.map((s, i) => (
          <img key={i} className="reel-still" src={s} alt="" loading="lazy" style={{ opacity: frame === i + 1 ? 1 : 0 }} />
        ))}
        <div className="reel-play"><span>▶</span></div>
        <div className="reel-thumb-grad"></div>
        <span className="reel-place">{clip.place}</span>
      </div>
      <div className="reel-meta">
        <div className="reel-title-row">
          <h3 className="reel-title">{clip.title}</h3>
          <span className="reel-flag">{clip.flag}</span>
        </div>
        <div className="reel-event">{clip.event}</div>
        <p className="reel-note">{clip.note}</p>
      </div>
    </div>
  );
}

function HkThumb({ imgs, imgPos }) {
  const [f, setF] = useMd_state(0);
  useMd_effect(() => {
    if (imgs.length < 2) return;
    const id = setInterval(() => setF((x) => (x + 1) % imgs.length), 4200);
    return () => clearInterval(id);
  }, [imgs.length]);
  return (
    <div className={`hk-thumb ${imgs.length > 1 ? "cycle" : ""}`}>
      {imgs.map((s, i) => (
        <img key={i} src={s} alt="" loading="lazy" style={{ objectPosition: imgPos || "center center", ...(imgs.length > 1 ? { opacity: f === i ? 1 : 0 } : {}) }} />
      ))}
    </div>
  );
}

function HackathonReel() {
  const [open, setOpen] = useMd_state(null);
  const D = window.PORTFOLIO_DATA;
  return (
    <section className="bay" id="hackathons" data-screen-label="Hackathons">
      <div className="wrap">
        <div className="eyebrow">Film reel · the hackathon circuit</div>
        <h2 className="section-title">
          28 hackathons. <em>Two firsts.</em><br />A BBC documentary.
        </h2>
        <p className="lede">
          <TextAnimate text="A decade on the circuit across six countries — as competitor, mentor, and judge. Hover any clip to preview, click to watch the full thing." />
        </p>

        <div className="hk-stats">
          {D.hackathonStats.map((s, i) => (
            <div className="hk-stat" key={i}>
              <div className="hk-stat-v"><NumberTicker text={s.value} /></div>
              <div className="hk-stat-l">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="hk-reel-label">Where it's taken me</div>
        <div className="hk-globe-block">
          <HackGlobe markers={D.hackathonMarkers} />
        </div>

        <div className="hk-reel-label">On camera</div>
        <div className="reel-grid">
          {MD.reel.map((clip) => <ReelCard key={clip.title} clip={clip} onOpen={setOpen} />)}
        </div>

        <div className="hk-reel-label">Every stamp in the passport</div>
        <div className="hk-grid">
          {D.hackathons.map((h, i) => {
            const imgs = h.imgs || (h.img ? [h.img] : []);
            return (
            <div className={`hk-card ${h.win ? "win" : ""} ${imgs.length ? "has-img" : ""}`} key={i}>
              {imgs.length > 0 && <HkThumb imgs={imgs} imgPos={h.imgPos} />}
              <div className="hk-card-top">
                <span className="hk-place">{h.place}</span>
                <span className="hk-flag">{h.flag}</span>
              </div>
              <div className="hk-name">{h.name}</div>
              <div className="hk-year">{h.year}</div>
              <p className="hk-desc">{h.desc}</p>
            </div>
          );
          })}
        </div>
      </div>
      {open && <VideoModal media={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

// Floating easter-egg trigger — lives at app root, persists across layouts.
function WorkWithMeEgg() {
  const [open, setOpen] = useMd_state(false);
  const m = MD.workWithMe;
  return (
    <>
      <button
        className="egg-trigger"
        onClick={() => setOpen(true)}
        title={m.title}
        aria-label={m.title}
      >
        <span className="egg-eyes">👀</span>
        <ShinyText className="egg-label">secret?</ShinyText>
      </button>
      {open && <VideoModal media={m} onClose={() => setOpen(false)} />}
    </>
  );
}

Object.assign(window, { HackathonReel, WorkWithMeEgg });
