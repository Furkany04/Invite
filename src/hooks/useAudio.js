import { useRef, useState, useEffect, useCallback } from 'react';
import { AUDIO_PATH } from '../data/scenes';

export function useAudio() {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const endTimeRef = useRef(null);
  const onEndRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_PATH);
    audio.preload = 'auto';
    audioRef.current = audio;

    const onCanPlay = () => setIsReady(true);
    const onTimeUpdate = () => {
      if (endTimeRef.current !== null && audio.currentTime >= endTimeRef.current) {
        audio.pause();
        endTimeRef.current = null;
        if (onEndRef.current) {
          onEndRef.current();
          onEndRef.current = null;
        }
      }
    };
    const onPlay    = () => setIsPlaying(true);
    const onPause   = () => setIsPlaying(false);
    const onEnded   = () => setIsPlaying(false);

    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.src = '';
    };
  }, []);

  // Şarkının belirli bir segmentini çalar; bitince onEnd callback'i tetikler
  const playSegment = useCallback((start, end, onEnd) => {
    const audio = audioRef.current;
    if (!audio) return;
    endTimeRef.current = end;
    onEndRef.current = onEnd ?? null;
    audio.currentTime = start;
    audio.play().catch(() => {
      // Tarayıcı autoplay engellemesi: kullanıcı tıkladığı için genellikle sorun olmaz
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    endTimeRef.current = null;
    onEndRef.current = null;
  }, []);

  return { isReady, isPlaying, playSegment, pause };
}
