import { motion } from 'motion/react';

// ─── Deterministic particle data ────────────────────────────────────
const makeSnow = (count, seed = 1) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x:       ((i * 37 * seed + 13) % 97) + 1,
    size:    1.5 + ((i * 7) % 5),
    dur:     5 + ((i * 11) % 7),
    delay:   -((i * 13) % 9),
    opacity: 0.25 + ((i * 3) % 7) * 0.1,
  }));

const SNOW_A = makeSnow(38, 1);
const SNOW_B = makeSnow(22, 3);
const SNOW_C = makeSnow(14, 5);
const ORBS   = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x:     10 + (i * 9)  % 80,
  y:     10 + (i * 17) % 70,
  size:  40 + (i * 23) % 80,
  dur:   6  + (i * 7)  % 10,
  delay: -(i * 1.7) % 8,
}));

// ─── Overlay gradient per scene type (fotoğraf üzerine biner) ───────
const overlays = {
  'winter-night': 'linear-gradient(180deg, rgba(5,8,22,0.62) 0%, rgba(8,13,32,0.50) 50%, rgba(5,8,22,0.68) 100%)',
  'gaming-night': 'linear-gradient(180deg, rgba(8,5,20,0.58) 0%, rgba(6,4,16,0.46) 50%, rgba(8,5,20,0.62) 100%)',
  'distance':     'linear-gradient(180deg, rgba(6,10,24,0.65) 0%, rgba(8,16,36,0.53) 50%, rgba(6,10,24,0.70) 100%)',
  'travel':       'linear-gradient(180deg, rgba(4,5,15,0.68) 0%, rgba(6,10,24,0.56) 50%, rgba(4,5,15,0.74) 100%)',
  'nostalgia':    'linear-gradient(180deg, rgba(18,9,3,0.50) 0%, rgba(14,7,2,0.38) 50%, rgba(18,9,3,0.56) 100%)',
  'cold':         'linear-gradient(180deg, rgba(3,9,20,0.66) 0%, rgba(5,13,26,0.54) 50%, rgba(3,9,20,0.72) 100%)',
  'cracks':       'linear-gradient(180deg, rgba(5,3,14,0.72) 0%, rgba(4,2,11,0.60) 50%, rgba(5,3,14,0.76) 100%)',
  'almost-open':  'linear-gradient(180deg, rgba(14,9,3,0.52) 0%, rgba(11,6,2,0.42) 50%, rgba(14,9,3,0.52) 100%)',
  'final':        'linear-gradient(180deg, rgba(18,11,3,0.36) 0%, rgba(14,8,2,0.26) 50%, rgba(18,11,3,0.36) 100%)',
};

// ─── Reusable particle helpers ───────────────────────────────────────
function Flakes({ data, color = '#cce8ff' }) {
  return (
    <>
      {data.map(f => (
        <motion.div
          key={f.id}
          style={{
            position: 'absolute',
            left: `${f.x}%`,
            top: 0,
            width: f.size,
            height: f.size,
            borderRadius: '50%',
            background: color,
            opacity: f.opacity,
            pointerEvents: 'none',
          }}
          animate={{ y: ['0vh', '105vh'] }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </>
  );
}

function FloatingOrbs({ color = 'rgba(200,160,80,0.18)', blur = 40 }) {
  return (
    <>
      {ORBS.map(o => (
        <motion.div
          key={o.id}
          style={{
            position: 'absolute',
            left: `${o.x}%`,
            top:  `${o.y}%`,
            width: o.size,
            height: o.size,
            borderRadius: '50%',
            background: color,
            filter: `blur(${blur}px)`,
            pointerEvents: 'none',
          }}
          animate={{ y: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

// ─── Particle components (sadece animasyonlu elemanlar, arka plan yok) ─
function WinterNightParticles() {
  return (
    <>
      <Flakes data={SNOW_A} color="#d4eeff" />
      <Flakes data={SNOW_B} color="#ffffff" />
      {SNOW_C.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top:  `${(s.id * 7) % 60}%`,
            width: s.size * 0.6,
            height: s.size * 0.6,
            borderRadius: '50%',
            background: '#fff',
            opacity: s.opacity * 0.7,
          }}
        />
      ))}
    </>
  );
}

function GamingNightParticles() {
  return (
    <>
      {/* Ana ekran ambient glow — insan figürü yok, sadece ışık */}
      <motion.div
        className="gn-screen-main"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Yardımcı ekran glow */}
      <motion.div
        className="gn-screen-side"
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />
      {/* Klavye / masa yansıması */}
      <motion.div
        className="gn-desk-strip"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <Flakes data={SNOW_B} color="#7aa8c8" />
    </>
  );
}

function DistanceParticles() {
  return (
    <>
      {/* Zemin çizgisi */}
      <div className="distance-ground" />
      {/* Uzakta iki ayrı pencere ışığı — figür yok, ışık var */}
      <div className="distant-window dw-left" />
      <div className="distant-window dw-right" />
      {/* Aralarındaki mesafeyi anlatan çok ince çizgi */}
      <motion.div
        className="distance-gap-line"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      <Flakes data={SNOW_C} color="#8ab8d8" />
    </>
  );
}

function TravelParticles() {
  return (
    <>
      {/* Dağ silüetleri — figür yok */}
      <svg className="mountains" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path
          d="M0,300 L0,180 L120,80 L240,160 L360,60 L520,180 L640,40 L780,160 L900,80 L1060,180 L1180,60 L1300,140 L1440,80 L1440,300 Z"
          fill="rgba(8,14,32,0.65)"
        />
        <path
          d="M0,300 L0,220 L80,160 L180,210 L280,150 L420,200 L540,140 L680,200 L780,160 L900,200 L1000,150 L1140,205 L1260,160 L1440,195 L1440,300 Z"
          fill="rgba(12,20,44,0.75)"
        />
      </svg>
      {/* Uzak köy/şehir ışıkları — dağ etekleri */}
      <div className="village-light vl-1" />
      <div className="village-light vl-2" />
      <div className="village-light vl-3" />
      <div className="village-light vl-4" />
      <Flakes data={SNOW_A} color="#c8dff0" />
    </>
  );
}

function NostalgiaParticles() {
  return (
    <>
      <FloatingOrbs color="rgba(220,170,80,0.20)" blur={50} />
      <FloatingOrbs color="rgba(200,130,60,0.15)" blur={70} />
      <div className="nostalgia-spot nostalgia-spot-1" />
      <div className="nostalgia-spot nostalgia-spot-2" />
    </>
  );
}

function ColdParticles() {
  return (
    <>
      <Flakes data={SNOW_A} color="#9dd4f0" />
      <Flakes data={SNOW_B} color="#c8eeff" />
      {SNOW_C.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left:  `${s.x}%`,
            top:   `${(s.id * 11) % 80}%`,
            width: 1,
            height: 20 + s.size * 3,
            background: 'rgba(150,220,255,0.35)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
          }}
          animate={{ rotate: [0, 60, 120, 180], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8 + s.id % 4, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </>
  );
}

function CracksParticles() {
  return (
    <>
      <svg className="cracks-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <motion.path d="M720,450 L680,380 L640,320 L700,260 L660,200"
          stroke="rgba(100,180,255,0.5)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }} />
        <motion.path d="M720,450 L760,370 L800,310 L750,240"
          stroke="rgba(100,180,255,0.4)" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }} />
        <motion.path d="M720,450 L650,500 L600,560 L560,620 L530,700"
          stroke="rgba(100,180,255,0.45)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }} />
        <motion.path d="M720,450 L780,520 L840,580 L820,660 L870,720"
          stroke="rgba(100,180,255,0.35)" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }} />
        <motion.path d="M720,450 L620,440 L540,460 L460,430"
          stroke="rgba(100,180,255,0.3)" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }} />
        <motion.path d="M720,450 L820,445 L900,465 L980,440"
          stroke="rgba(100,180,255,0.3)" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.0, ease: 'easeOut' }} />
      </svg>
      <Flakes data={SNOW_C} color="#80b8e0" />
    </>
  );
}

function AlmostOpenParticles() {
  return (
    <>
      <FloatingOrbs color="rgba(200,160,100,0.22)" blur={60} />
      <Flakes data={SNOW_B} color="#d4c8a0" />
      {ORBS.slice(0, 6).map(o => (
        <motion.div
          key={o.id}
          style={{
            position: 'absolute',
            left: `${o.x}%`,
            bottom: '0%',
            width: 3 + o.id % 4,
            height: 3 + o.id % 4,
            borderRadius: '50%',
            background: `rgba(255,${180 + o.id * 5},${60 + o.id * 8},0.7)`,
            pointerEvents: 'none',
          }}
          animate={{ y: [0, -(300 + o.id * 60)], opacity: [0, 0.9, 0] }}
          transition={{ duration: 4 + o.id, delay: o.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

function FinalParticles() {
  return (
    <>
      <FloatingOrbs color="rgba(255,220,120,0.25)" blur={60} />
      <FloatingOrbs color="rgba(255,180,80,0.18)"  blur={90} />
      {ORBS.map(o => (
        <motion.div
          key={o.id}
          style={{
            position: 'absolute',
            left: `${o.x}%`,
            bottom: '0%',
            width: 2 + o.id % 5,
            height: 2 + o.id % 5,
            borderRadius: '50%',
            background: `rgba(255,${200 + o.id * 5},${80 + o.id * 10},0.8)`,
            pointerEvents: 'none',
          }}
          animate={{ y: [0, -(400 + o.id * 40)], opacity: [0, 1, 0] }}
          transition={{ duration: 3.5 + o.id * 0.5, delay: o.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

// ─── Particle map ────────────────────────────────────────────────────
const particleMap = {
  'winter-night': WinterNightParticles,
  'gaming-night': GamingNightParticles,
  'distance':     DistanceParticles,
  'travel':       TravelParticles,
  'nostalgia':    NostalgiaParticles,
  'cold':         ColdParticles,
  'cracks':       CracksParticles,
  'almost-open':  AlmostOpenParticles,
  'final':        FinalParticles,
};

// ─── Ana bileşen — katmanlı sistem ──────────────────────────────────
export default function SceneBackground({ type, backgroundImage }) {
  const Particles  = particleMap[type] ?? WinterNightParticles;
  const hasImage   = Boolean(backgroundImage);
  const overlayBg  = overlays[type] ?? overlays['winter-night'];

  return (
    <motion.div
      className="scene-bg-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* ── Katman 1: Fotoğraf (varsa) — hafif zoom animasyonuyla girer */}
      {hasImage && (
        <motion.div
          className="bg-photo"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 9, ease: 'easeOut' }}
        />
      )}

      {/* ── Katman 2: CSS gradyan — görsel yoksa tam opak fallback,
                                   varsa renk tonu olarak hafif görünür */}
      <div
        className={`bg bg-${type}`}
        style={{ opacity: hasImage ? 0.40 : 1 }}
      />

      {/* ── Katman 3: Koyu overlay (yalnızca fotoğraf üzerinde) */}
      {hasImage && (
        <div className="bg-overlay" style={{ background: overlayBg }} />
      )}

      {/* ── Katman 4: Vignette — her zaman, kenarlarda derinlik */}
      <div className="bg-vignette" />

      {/* ── Katman 5: Animasyonlu parçacıklar — her zaman en üstte */}
      <div className="bg-particles-layer">
        <Particles />
      </div>
    </motion.div>
  );
}
