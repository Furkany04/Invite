import { motion } from 'motion/react';

export default function Door({ angle, onClick, isAnimating, isFinal }) {
  const lightOpacity = Math.min(1, angle / 90);
  const handleClick  = (!isAnimating && !isFinal) ? onClick : undefined;

  return (
    <div
      className="door-stage"
      onClick={handleClick}
      style={{ cursor: !isAnimating && !isFinal ? 'pointer' : 'default' }}
    >
      {/* ── Katman 0: Kapı iç dolgusu ─────────────────────────────────
          Kapı kanadı dönerken bu sıcak dikdörtgen görünür hale gelir.
          Büyük oval değil — kapı açılışının tam boyutunda. */}
      <div className="door-interior-fill" style={{ opacity: lightOpacity }} />

      {/* ── Katman 0: Çok sınırlı ambient halo ──────────────────────
          Sadece 12-18px dışarı taşar. Oval "yumurta" yaratmaz. */}
      <div className="door-ambient-halo" style={{ opacity: lightOpacity * 0.55 }} />

      {/* ── Çerçeve — 4 bar ─────────────────────────────────────── */}
      <div className="door-frame-bars" aria-hidden="true">
        <div className="frame-bar frame-bar-top" />
        <div className="frame-bar frame-bar-left" />
        <div className="frame-bar frame-bar-right" />
        <div className="frame-bar frame-bar-bottom" />
      </div>

      {/* ── Katman 2: Çerçeve kenar ışık sızıntısı ──────────────────
          Kapı açıldıkça çerçeve iç kenarlarından ışık sızar.
          Fiziksel ışık kaçağı hissi verir. */}
      <div className="door-frame-edge-glow" style={{ opacity: lightOpacity * 0.85 }} />

      {/* ── Menteşeler ───────────────────────────────────────────── */}
      <div className="door-hinge door-hinge-top" />
      <div className="door-hinge door-hinge-bottom" />

      {/* ── Dönen kapı kanadı ────────────────────────────────────── */}
      <motion.div
        className="door-panel"
        animate={{ rotateY: -angle }}
        style={{ transformOrigin: 'left center' }}
        transition={{ type: 'spring', stiffness: 48, damping: 17, mass: 1.3 }}
      >
        <div className="door-face">
          <div className="door-molding door-molding-upper" />
          <div className="door-molding door-molding-lower" />
          <div className="door-handle-wrap">
            <div className="door-handle-bar" />
            <div className="door-handle-knob" />
          </div>
        </div>
        <div className="door-edge" />
      </motion.div>

      {/* ── Zemine düşen ışık lekesi ─────────────────────────────────
          Kapı açıldıkça zemine yayılan ışık şeridi. scaleX ile genişler. */}
      <motion.div
        className="door-floor-beam"
        animate={{
          opacity: lightOpacity * 0.65,
          scaleX: 0.15 + lightOpacity * 0.85,
        }}
        style={{ transformOrigin: 'left top' }}
        transition={{ type: 'spring', stiffness: 48, damping: 17 }}
      />

      {/* ── Zemin gölgesi (kapı açıldıkça solar) ────────────────── */}
      <motion.div
        className="door-floor-shadow"
        animate={{
          scaleX: Math.max(0, 1 - lightOpacity * 0.95),
          opacity: Math.max(0, 1 - lightOpacity * 0.85),
        }}
        style={{ transformOrigin: 'left bottom' }}
        transition={{ type: 'spring', stiffness: 48, damping: 17 }}
      />
    </div>
  );
}
