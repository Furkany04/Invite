import { motion } from 'motion/react';

export default function LyricDisplay({ lyric }) {
  return (
    <motion.div
      className="lyric-wrapper"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
      transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Okunurluk için çok hafif koyu backdrop */}
      <div className="lyric-backdrop" aria-hidden="true" />
      <p className="lyric-text">{lyric}</p>
    </motion.div>
  );
}
