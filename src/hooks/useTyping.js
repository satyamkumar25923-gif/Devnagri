import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Core typing engine hook.
 * Tracks typed text, correctness per character, WPM, accuracy, and current position.
 */
export function useTyping(targetText = '') {
  const [typed, setTyped]       = useState('');
  const [charStates, setCharStates] = useState([]); // 'pending' | 'correct' | 'incorrect'
  const [startTime, setStartTime]   = useState(null);
  const [finished, setFinished]     = useState(false);
  const [wpm, setWpm]               = useState(0);
  const [accuracy, setAccuracy]     = useState(100);
  const [mistakes, setMistakes]     = useState(0);
  const intervalRef = useRef(null);

  // Reset when target changes
  useEffect(() => {
    setTyped('');
    setCharStates(Array(targetText.length).fill('pending'));
    setStartTime(null);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [targetText]);

  // Live WPM updater
  useEffect(() => {
    if (!startTime || finished) return;
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 60000; // minutes
      const wordsTyped = typed.split(' ').filter(Boolean).length;
      setWpm(Math.round(wordsTyped / elapsed) || 0);
    }, 500);
    return () => clearInterval(intervalRef.current);
  }, [startTime, typed, finished]);

  const handleKeyPress = useCallback((char) => {
    if (finished) return;

    const idx = typed.length;
    if (idx >= targetText.length) return;

    // Start timer on first keystroke
    if (!startTime) setStartTime(Date.now());

    const isCorrect = char === targetText[idx];
    const newTyped = typed + char;
    const newStates = [...charStates];
    newStates[idx] = isCorrect ? 'correct' : 'incorrect';

    const newMistakes = isCorrect ? mistakes : mistakes + 1;
    const totalTyped = newTyped.length;
    const correctCount = newStates.filter(s => s === 'correct').length;
    const newAccuracy = totalTyped > 0 ? Math.round((correctCount / totalTyped) * 100) : 100;

    setTyped(newTyped);
    setCharStates(newStates);
    setMistakes(newMistakes);
    setAccuracy(newAccuracy);

    // Check completion
    if (newTyped.length >= targetText.length) {
      clearInterval(intervalRef.current);
      const elapsed = (Date.now() - (startTime || Date.now())) / 60000;
      const words = targetText.split(' ').filter(Boolean).length;
      const finalWpm = Math.round(words / elapsed) || 0;
      setWpm(finalWpm);
      setFinished(true);
    }
  }, [typed, targetText, charStates, startTime, finished, mistakes]);

  const handleBackspace = useCallback(() => {
    if (typed.length === 0 || finished) return;
    const newTyped = typed.slice(0, -1);
    const newStates = [...charStates];
    newStates[newTyped.length] = 'pending';
    setTyped(newTyped);
    setCharStates(newStates);
  }, [typed, charStates, finished]);

  const reset = useCallback(() => {
    setTyped('');
    setCharStates(Array(targetText.length).fill('pending'));
    setStartTime(null);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    clearInterval(intervalRef.current);
  }, [targetText]);

  return {
    typed,
    charStates,
    currentIndex: typed.length,
    wpm,
    accuracy,
    mistakes,
    finished,
    startTime,
    handleKeyPress,
    handleBackspace,
    reset,
  };
}
