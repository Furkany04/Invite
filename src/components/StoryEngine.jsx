import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { scenes } from '../data/scenes';
import { useAudio } from '../hooks/useAudio';
import SceneBackground from './SceneBackground';
import Door from './Door';
import LyricDisplay from './LyricDisplay';
import FinalQuestion from './FinalQuestion';

export default function StoryEngine() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { playSegment } = useAudio();

  const current  = scenes[sceneIndex];
  const isIntro  = !!current.isIntro;
  const isFinal  = !!current.isFinal;

  const advance = useCallback(() => {
    if (isAnimating || isFinal) return;

    const nextIdx   = sceneIndex + 1;
    const nextScene = scenes[nextIdx];
    if (!nextScene) return;

    setIsAnimating(true);
    setSceneIndex(nextIdx);

    if (nextScene.audioStart !== null) {
      playSegment(nextScene.audioStart, nextScene.audioEnd);
    }

    // Kapı yay animasyonu bitene kadar kilitle (~900ms)
    setTimeout(() => setIsAnimating(false), 900);
  }, [isAnimating, isFinal, sceneIndex, playSegment]);

  return (
    <div className="story-engine">
      {/* Arka plan — sahne değişince cross-fade */}
      <AnimatePresence mode="sync">
        <SceneBackground
          key={current.background}
          type={current.background}
          backgroundImage={current.backgroundImage ?? null}
        />
      </AnimatePresence>

      {/* Merkez içerik */}
      <div className="story-center">
        <Door
          angle={current.doorAngle}
          onClick={advance}
          isAnimating={isAnimating}
          isFinal={isFinal}
        />

        {/* Lyric — sahne değişince animasyonlu geçiş */}
        <AnimatePresence mode="wait">
          {!isIntro && !isFinal && current.lyric && (
            <LyricDisplay key={sceneIndex} lyric={current.lyric} />
          )}
        </AnimatePresence>

        {/* Devam butonu */}
        {!isFinal && (
          <button
            className={`open-btn${isAnimating ? ' open-btn--busy' : ''}`}
            onClick={advance}
            disabled={isAnimating}
          >
            {current.buttonText}
          </button>
        )}

        {/* Final ekranı */}
        <AnimatePresence>
          {isFinal && <FinalQuestion key="final" />}
        </AnimatePresence>
      </div>

      {/* Sahne numarası göstergesi */}
      {!isFinal && (
        <div className="scene-dots">
          {scenes.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className={`scene-dot${i === sceneIndex ? ' scene-dot--active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
