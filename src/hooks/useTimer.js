import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Countdown timer hook for practice sessions.
 * @param {number} initialSeconds - Total seconds for the session
 */
export function useTimer(initialSeconds = 60) {
  const [timeLeft, setTimeLeft]   = useState(initialSeconds);
  const [running, setRunning]     = useState(false);
  const [elapsed, setElapsed]     = useState(0);
  const intervalRef = useRef(null);
  const startedAt   = useRef(null);

  const start = useCallback(() => {
    setRunning(true);
    startedAt.current = Date.now();
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback((seconds) => {
    clearInterval(intervalRef.current);
    setTimeLeft(seconds ?? initialSeconds);
    setElapsed(0);
    setRunning(false);
    startedAt.current = null;
  }, [initialSeconds]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      const passed = Math.floor((Date.now() - startedAt.current) / 1000);
      const left = Math.max(initialSeconds - passed, 0);
      setTimeLeft(left);
      setElapsed(passed);
      if (left === 0) {
        clearInterval(intervalRef.current);
        setRunning(false);
      }
    }, 200);
    return () => clearInterval(intervalRef.current);
  }, [running, initialSeconds]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return { timeLeft, elapsed, running, start, stop, reset, formatTime };
}
