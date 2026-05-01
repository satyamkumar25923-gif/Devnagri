import { useCallback, useRef } from 'react';

/**
 * Sound feedback hook using the Web Audio API.
 * Generates tones for correct/incorrect keystrokes — no external files needed.
 */
export function useSound(enabled = true) {
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  };

  const playTone = useCallback((frequency, duration, type = 'sine', gain = 0.15) => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(gain, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch { /* Audio not available */ }
  }, [enabled]);

  const playCorrect = useCallback(() => playTone(880, 0.08, 'sine', 0.12), [playTone]);
  const playIncorrect = useCallback(() => playTone(220, 0.15, 'sawtooth', 0.1), [playTone]);
  const playComplete = useCallback(() => {
    playTone(523, 0.15, 'sine', 0.15);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.15), 150);
    setTimeout(() => playTone(784, 0.3, 'sine', 0.15), 300);
  }, [playTone]);

  return { playCorrect, playIncorrect, playComplete };
}
