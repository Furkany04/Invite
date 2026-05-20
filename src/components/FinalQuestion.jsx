import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const RESPONSES = {
  yes:  'Bunu duymak bana çok iyi geldi. O zaman bu akşam sadece ikimiz, küçük bir başlangıç yapalım.',
  talk: 'Ben buradayım. Seni savunma yapmak için değil, gerçekten dinlemek için bekliyorum.',
};

export default function FinalQuestion() {
  const [modal, setModal] = useState(null); // null | 'yes' | 'talk'

  return (
    <>
      <motion.div
        className="final-wrap"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.p
          className="final-question"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Bu akşam birlikte bir şey yapmak ister misin?
        </motion.p>

        <motion.div
          className="final-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button className="final-btn final-btn-yes" onClick={() => setModal('yes')}>
            Evet, isterim 🤍
          </button>
          <button className="final-btn final-btn-talk" onClick={() => setModal('talk')}>
            Biraz konuşalım
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="modal-box"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              <p className="modal-text">{RESPONSES[modal]}</p>
              <button className="modal-close" onClick={() => setModal(null)}>
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
