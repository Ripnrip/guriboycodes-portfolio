// Ghibli-inspired SVG covers — painterly placeholders for each flagship project.
// Soft palette: cream, sage, dusty teal, warm sand, forest. Hand-drawn feel.

const GhibliCovers = {
  "ghibli-maia": (
    // MAIA — harvest of merchants across a hill landscape, scattered glowing dots
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g-maia-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8c89a"/>
          <stop offset="0.6" stopColor="#dba98a"/>
          <stop offset="1" stopColor="#a47d6a"/>
        </linearGradient>
        <radialGradient id="g-maia-sun" cx="0.78" cy="0.28" r="0.18">
          <stop offset="0" stopColor="#fff4d6" stopOpacity="0.95"/>
          <stop offset="1" stopColor="#fff4d6" stopOpacity="0"/>
        </radialGradient>
        <filter id="grain-maia">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="500" fill="url(#g-maia-sky)"/>
      <circle cx="312" cy="140" r="42" fill="#fff1c8" opacity="0.9"/>
      <rect width="400" height="500" fill="url(#g-maia-sun)"/>
      {/* clouds */}
      <ellipse cx="80" cy="120" rx="60" ry="10" fill="#fff3da" opacity="0.7"/>
      <ellipse cx="180" cy="90" rx="50" ry="8" fill="#fff3da" opacity="0.55"/>
      {/* far hills */}
      <path d="M0 320 Q 80 280 160 305 T 320 295 T 400 310 L 400 500 L 0 500 Z" fill="#6c8d6a"/>
      <path d="M0 360 Q 100 330 200 355 T 400 350 L 400 500 L 0 500 Z" fill="#557051"/>
      <path d="M0 410 Q 130 380 250 405 T 400 400 L 400 500 L 0 500 Z" fill="#3e5840"/>
      {/* fields rows */}
      <g stroke="#2c4231" strokeWidth="1.2" opacity="0.5" fill="none">
        <path d="M-20 440 Q 200 425 420 440"/>
        <path d="M-20 460 Q 200 445 420 460"/>
        <path d="M-20 480 Q 200 465 420 480"/>
      </g>
      {/* merchant dots — bullseye scattered */}
      <g fill="#fff1c8">
        <circle cx="100" cy="340" r="2.5"/>
        <circle cx="140" cy="330" r="1.8"/>
        <circle cx="180" cy="345" r="3"/>
        <circle cx="220" cy="338" r="2.2"/>
        <circle cx="260" cy="350" r="2.6"/>
        <circle cx="300" cy="335" r="2"/>
        <circle cx="340" cy="345" r="2.4"/>
        <circle cx="60" cy="350" r="1.5"/>
        <circle cx="125" cy="395" r="2.5"/>
        <circle cx="200" cy="390" r="3.5" fill="#ffeebb"/>
        <circle cx="285" cy="395" r="2.5"/>
        <circle cx="160" cy="425" r="2"/>
        <circle cx="240" cy="430" r="2.4"/>
      </g>
      {/* bullseye highlight */}
      <circle cx="200" cy="390" r="14" fill="none" stroke="#fff1c8" strokeWidth="1" opacity="0.5"/>
      <circle cx="200" cy="390" r="24" fill="none" stroke="#fff1c8" strokeWidth="0.6" opacity="0.3"/>
      {/* small house */}
      <g transform="translate(48 380)">
        <polygon points="0,12 10,0 20,12" fill="#3a2e26"/>
        <rect x="2" y="12" width="16" height="14" fill="#6b4c3b"/>
        <rect x="8" y="20" width="4" height="6" fill="#2c1d14"/>
      </g>
      <rect width="400" height="500" filter="url(#grain-maia)" opacity="0.5"/>
    </svg>
  ),

  "ghibli-cosmos": (
    // claude-cosmos — night sky with constellation funnel into a single point
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g-cos-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2840"/>
          <stop offset="0.5" stopColor="#3a4d6b"/>
          <stop offset="1" stopColor="#6a7388"/>
        </linearGradient>
        <radialGradient id="g-cos-moon" cx="0.5" cy="0.42" r="0.12">
          <stop offset="0" stopColor="#fff8d9"/>
          <stop offset="1" stopColor="#fff8d9" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="url(#g-cos-sky)"/>
      {/* stars */}
      <g fill="#fff8d9">
        {[...Array(60)].map((_,i)=> {
          const x = (i*37)%400; const y = ((i*53)%280); const r = (i%4)*0.4+0.4;
          return <circle key={i} cx={x} cy={y} r={r} opacity={0.5+((i*7)%50)/100}/>
        })}
      </g>
      {/* moon */}
      <circle cx="200" cy="210" r="34" fill="#fffae2"/>
      <rect width="400" height="500" fill="url(#g-cos-moon)"/>
      {/* funnel of light streams converging */}
      <g stroke="#fff8d9" strokeWidth="0.8" opacity="0.45" fill="none">
        <path d="M40 50 Q 130 180 200 280"/>
        <path d="M100 30 Q 160 180 200 280"/>
        <path d="M200 20 L 200 280"/>
        <path d="M300 30 Q 240 180 200 280"/>
        <path d="M360 50 Q 270 180 200 280"/>
        <path d="M380 120 Q 290 200 200 280"/>
        <path d="M20 120 Q 110 200 200 280"/>
      </g>
      {/* hills silhouette */}
      <path d="M0 360 Q 100 320 200 350 T 400 340 L 400 500 L 0 500 Z" fill="#1a2030"/>
      <path d="M0 410 Q 130 380 260 405 T 400 410 L 400 500 L 0 500 Z" fill="#0e131e"/>
      {/* convergence point glow */}
      <circle cx="200" cy="280" r="5" fill="#fffae2"/>
      <circle cx="200" cy="280" r="14" fill="none" stroke="#fffae2" strokeWidth="0.6" opacity="0.5"/>
    </svg>
  ),

  "ghibli-vireo": (
    // Vireo — perched bird on a branch, signal waves emanating
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g-vir" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cde0d2"/>
          <stop offset="0.5" stopColor="#9cbfa7"/>
          <stop offset="1" stopColor="#557b6a"/>
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#g-vir)"/>
      {/* sun */}
      <circle cx="310" cy="120" r="38" fill="#fff3c4" opacity="0.85"/>
      {/* leaves background — soft */}
      <g opacity="0.35" fill="#6f9077">
        <ellipse cx="60" cy="200" rx="40" ry="14" transform="rotate(-22 60 200)"/>
        <ellipse cx="340" cy="220" rx="40" ry="14" transform="rotate(28 340 220)"/>
        <ellipse cx="100" cy="320" rx="50" ry="16" transform="rotate(-12 100 320)"/>
        <ellipse cx="320" cy="340" rx="50" ry="16" transform="rotate(20 320 340)"/>
      </g>
      {/* branch */}
      <path d="M0 290 Q 120 270 220 300 Q 320 320 400 305" stroke="#5b3f2a" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* signal waves from bird */}
      <g stroke="#fff8e0" fill="none" opacity="0.7" strokeWidth="1.4">
        <path d="M210 250 Q 240 230 270 250" />
        <path d="M195 235 Q 240 200 285 235" opacity="0.6"/>
        <path d="M180 220 Q 240 175 300 220" opacity="0.4"/>
      </g>
      {/* bird body */}
      <g transform="translate(190 268)">
        <ellipse cx="20" cy="14" rx="26" ry="14" fill="#4d6e58"/>
        <circle cx="2" cy="8" r="11" fill="#4d6e58"/>
        <circle cx="-2" cy="6" r="2" fill="#1f2a23"/>
        <polygon points="-12,8 -4,7 -4,11" fill="#e0a060"/>
        <path d="M20 10 Q 36 4 46 18 Q 38 22 26 22 Z" fill="#3b5a48"/>
        <line x1="14" y1="28" x2="14" y2="38" stroke="#3b2a1c" strokeWidth="1.4"/>
        <line x1="22" y1="28" x2="22" y2="38" stroke="#3b2a1c" strokeWidth="1.4"/>
      </g>
      {/* foreground grass */}
      <path d="M0 430 Q 100 410 200 425 T 400 420 L 400 500 L 0 500 Z" fill="#4a6a55"/>
      <path d="M0 470 Q 130 455 250 470 T 400 465 L 400 500 L 0 500 Z" fill="#33503f"/>
    </svg>
  ),

  "ghibli-darwin": (
    // Darwin — branching tree, fossils at base
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g-dar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1e3c0"/>
          <stop offset="0.6" stopColor="#d9bd86"/>
          <stop offset="1" stopColor="#a47d4a"/>
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#g-dar)"/>
      {/* far hills */}
      <path d="M0 280 Q 100 250 200 275 T 400 270 L 400 500 L 0 500 Z" fill="#b89263" opacity="0.55"/>
      {/* tree trunk */}
      <path d="M195 460 Q 200 380 200 320 Q 200 280 200 240" stroke="#3e2818" strokeWidth="10" fill="none" strokeLinecap="round"/>
      {/* branches */}
      <g stroke="#3e2818" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M200 320 Q 170 290 140 270"/>
        <path d="M200 320 Q 230 290 260 270"/>
        <path d="M200 270 Q 160 250 130 220"/>
        <path d="M200 270 Q 240 250 270 220"/>
        <path d="M200 230 Q 180 210 160 190"/>
        <path d="M200 230 Q 220 210 240 190"/>
      </g>
      {/* canopy leaves */}
      <g fill="#5d8854" opacity="0.9">
        <ellipse cx="140" cy="265" rx="32" ry="22"/>
        <ellipse cx="260" cy="265" rx="32" ry="22"/>
        <ellipse cx="130" cy="215" rx="28" ry="20"/>
        <ellipse cx="270" cy="215" rx="28" ry="20"/>
        <ellipse cx="160" cy="185" rx="24" ry="18"/>
        <ellipse cx="240" cy="185" rx="24" ry="18"/>
        <ellipse cx="200" cy="160" rx="34" ry="22"/>
      </g>
      <g fill="#7ca870" opacity="0.85">
        <ellipse cx="150" cy="258" rx="20" ry="14"/>
        <ellipse cx="250" cy="258" rx="20" ry="14"/>
        <ellipse cx="200" cy="150" rx="22" ry="14"/>
      </g>
      {/* ground */}
      <path d="M0 440 Q 100 425 200 440 T 400 435 L 400 500 L 0 500 Z" fill="#7a5c30"/>
      {/* fossils — small circles in ground */}
      <g fill="#3e2818" opacity="0.85">
        <circle cx="80" cy="460" r="3"/>
        <circle cx="110" cy="475" r="2.5"/>
        <circle cx="290" cy="465" r="3"/>
        <circle cx="330" cy="478" r="2.5"/>
        <circle cx="350" cy="455" r="2"/>
        <circle cx="55" cy="478" r="2"/>
      </g>
      {/* small bloom — golden flower at top */}
      <circle cx="200" cy="135" r="5" fill="#ffd766"/>
      <circle cx="200" cy="135" r="2" fill="#a86a18"/>
    </svg>
  ),

  "ghibli-mac": (
    // Mac-in-a-Mac — nested mountain ranges fading back, Mac-window framing
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g-mac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4dbe5"/>
          <stop offset="0.5" stopColor="#a4b3c4"/>
          <stop offset="1" stopColor="#5a6b7e"/>
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#g-mac)"/>
      <circle cx="320" cy="100" r="32" fill="#fff5d4" opacity="0.92"/>
      {/* mountain layers — depth */}
      <path d="M0 260 L 120 160 L 220 240 L 320 170 L 400 220 L 400 500 L 0 500 Z" fill="#7888a0" opacity="0.7"/>
      <path d="M0 320 L 90 230 L 200 300 L 300 240 L 400 280 L 400 500 L 0 500 Z" fill="#566576"/>
      <path d="M0 380 L 100 300 L 220 360 L 320 310 L 400 340 L 400 500 L 0 500 Z" fill="#3d4756"/>
      <path d="M0 430 L 80 380 L 200 420 L 310 380 L 400 410 L 400 500 L 0 500 Z" fill="#222a36"/>
      {/* snow caps */}
      <path d="M100 175 L 120 160 L 140 180 Z" fill="#fafbff"/>
      <path d="M295 185 L 320 170 L 345 190 Z" fill="#fafbff"/>
      {/* tiny window frame floating — Mac inside */}
      <g transform="translate(120 200)">
        <rect width="160" height="100" rx="8" fill="#1c2230" stroke="#3a4254" strokeWidth="1.5" opacity="0.95"/>
        <circle cx="12" cy="12" r="3" fill="#e88080"/>
        <circle cx="24" cy="12" r="3" fill="#e8c060"/>
        <circle cx="36" cy="12" r="3" fill="#80c890"/>
        {/* nested window inside */}
        <g transform="translate(28 32)">
          <rect width="104" height="56" rx="5" fill="#272f3f" stroke="#414a5e" strokeWidth="1"/>
          <circle cx="8" cy="8" r="2" fill="#e88080"/>
          <circle cx="16" cy="8" r="2" fill="#e8c060"/>
          <circle cx="24" cy="8" r="2" fill="#80c890"/>
          {/* progress line — 3x speedup */}
          <rect x="10" y="22" width="84" height="3" rx="1.5" fill="#1a2030"/>
          <rect x="10" y="22" width="62" height="3" rx="1.5" fill="#5cc8c0"/>
          <rect x="10" y="34" width="84" height="3" rx="1.5" fill="#1a2030"/>
          <rect x="10" y="34" width="38" height="3" rx="1.5" fill="#5cc8c0"/>
          <rect x="10" y="46" width="84" height="3" rx="1.5" fill="#1a2030"/>
          <rect x="10" y="46" width="22" height="3" rx="1.5" fill="#5cc8c0"/>
        </g>
      </g>
    </svg>
  ),

  "ghibli-agent": (
    // Agent Zero — a small wanderer with a backpack walking a hillpath
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g-ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe2f0"/>
          <stop offset="0.5" stopColor="#e2c8a0"/>
          <stop offset="1" stopColor="#a47d6a"/>
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#g-ag)"/>
      <circle cx="100" cy="110" r="34" fill="#fff5d4" opacity="0.85"/>
      {/* clouds */}
      <ellipse cx="280" cy="120" rx="50" ry="9" fill="#ffffff" opacity="0.55"/>
      <ellipse cx="340" cy="150" rx="36" ry="7" fill="#ffffff" opacity="0.4"/>
      {/* distant hill */}
      <path d="M0 280 Q 120 250 240 270 T 400 265 L 400 500 L 0 500 Z" fill="#a89570" opacity="0.7"/>
      <path d="M0 330 Q 100 305 220 320 T 400 320 L 400 500 L 0 500 Z" fill="#7f6f50"/>
      {/* winding path */}
      <path d="M50 480 Q 150 420 200 380 Q 250 340 320 320 Q 360 305 400 295" stroke="#e8d3a0" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M50 480 Q 150 420 200 380 Q 250 340 320 320 Q 360 305 400 295" stroke="#c9b07a" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="2 5" opacity="0.6"/>
      {/* grass clumps */}
      <g fill="#6a7e4a">
        <ellipse cx="40" cy="490" rx="22" ry="6"/>
        <ellipse cx="120" cy="475" rx="18" ry="5"/>
        <ellipse cx="280" cy="450" rx="14" ry="4"/>
        <ellipse cx="370" cy="440" rx="12" ry="4"/>
      </g>
      {/* wanderer figure */}
      <g transform="translate(180 350)">
        {/* backpack */}
        <rect x="-2" y="6" width="14" height="18" rx="3" fill="#3a4a3a"/>
        {/* body */}
        <rect x="0" y="8" width="12" height="18" rx="3" fill="#4d6e8a"/>
        {/* head */}
        <circle cx="6" cy="3" r="5" fill="#e8c89a"/>
        {/* hat */}
        <ellipse cx="6" cy="0" rx="10" ry="2.5" fill="#5b3f2a"/>
        <rect x="2" y="-4" width="8" height="4" rx="1.5" fill="#5b3f2a"/>
        {/* legs */}
        <rect x="2" y="24" width="3" height="9" fill="#2a3848"/>
        <rect x="7" y="24" width="3" height="9" fill="#2a3848"/>
        {/* staff */}
        <line x1="14" y1="6" x2="20" y2="34" stroke="#5b3f2a" strokeWidth="1.4"/>
      </g>
    </svg>
  )
};

window.GhibliCovers = GhibliCovers;
