import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, RefreshCw, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTyping } from '../../hooks/useTyping';
import { useSound } from '../../hooks/useSound';
import { INSCRIPT_LAYOUT } from '../../data/inscriptLayout';
import TypingArea from '../typing/TypingArea';
import StatsBar from '../typing/StatsBar';
import InScriptKeyboard from '../keyboard/InScriptKeyboard';
import HandDisplay from '../keyboard/HandDisplay';
import ResultModal from './ResultModal';

/**
 * Builds a practice text from a lesson's exercises.
 */
function buildLessonText(lesson, exerciseIdx = 0) {
  const ex = lesson.exercises[exerciseIdx];
  if (!ex) return '';
  if (ex.type === 'single') return ex.chars.join(' ');
  if (ex.type === 'word')   return ex.words.join(' ');
  if (ex.type === 'sentence') return ex.text;
  return '';
}

export default function LessonView({ lesson, onBack }) {
  const { state, completeLesson } = useApp();
  const { settings } = state;

  const [exerciseIdx, setExerciseIdx]   = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(settings.showKeyboard);
  const [showHands, setShowHands]       = useState(settings.showHands);
  const [showResult, setShowResult]     = useState(false);
  const [finalStats, setFinalStats]     = useState(null);

  const text = useMemo(() => buildLessonText(lesson, exerciseIdx), [lesson, exerciseIdx]);

  const { playCorrect, playIncorrect, playComplete } = useSound(settings.sound);

  const {
    charStates, currentIndex, wpm, accuracy, mistakes,
    finished, handleKeyPress, handleBackspace, reset,
  } = useTyping(text);

  // Current character being typed
  const chars = [...text];
  const currentChar = chars[currentIndex] || '';

  // Play sound on state change
  const prevIndex = useState(0);
  useEffect(() => {
    if (currentIndex === 0) return;
    const lastState = charStates[currentIndex - 1];
    if (lastState === 'correct') playCorrect();
    else if (lastState === 'incorrect') playIncorrect();
  }, [currentIndex]);

  // On exercise finish
  useEffect(() => {
    if (!finished) return;
    const isLastExercise = exerciseIdx >= lesson.exercises.length - 1;
    if (isLastExercise) {
      playComplete();
      const charsTyped = text.replace(/ /g, '').length;
      setFinalStats({ wpm, accuracy, mistakes, charsTyped });
      setShowResult(true);
      completeLesson(lesson.id, wpm, accuracy, charsTyped);
    } else {
      setTimeout(() => {
        setExerciseIdx(i => i + 1);
        reset();
      }, 800);
    }
  }, [finished]);

  const handleRestart = () => {
    setExerciseIdx(0);
    setShowResult(false);
    reset();
  };

  const progress = ((exerciseIdx) / lesson.exercises.length) * 100 +
    (currentIndex / Math.max(chars.length, 1)) * (100 / lesson.exercises.length);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} /> <span className="hindi-text">वापस जाएं</span>
        </button>
        <div className="text-center">
          <h2 className="hindi-text font-bold text-xl text-white">{lesson.title}</h2>
          <p className="text-slate-400 text-sm hindi-text">
            अभ्यास {exerciseIdx + 1} / {lesson.exercises.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHands(v => !v)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Toggle hands">
            {showHands ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button onClick={handleRestart}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Restart">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      {/* Stats */}
      <StatsBar wpm={wpm} accuracy={accuracy} mistakes={mistakes} />

      {/* Current character highlight (beginner mode) */}
      {settings.beginnerMode && currentChar && currentChar !== ' ' && (
        <div className="glass-card p-4 flex items-center justify-center gap-6 flex-wrap">
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-1 hindi-text">टाइप करें</p>
            <div className="hindi-text text-7xl font-bold"
                 style={{ color: '#f97316', textShadow: '0 0 30px rgba(249,115,22,0.5)' }}>
              {currentChar}
            </div>
          </div>
          {showHands && (
            <HandDisplay highlightChar={currentChar} />
          )}
        </div>
      )}

      {/* Typing area */}
      <TypingArea
        text={text}
        charStates={charStates}
        currentIndex={currentIndex}
        onChar={handleKeyPress}
        onBackspace={handleBackspace}
        fontSize={settings.fontSize}
        active={!finished && !showResult}
        finished={finished}
      />

      {/* Keyboard */}
      {showKeyboard && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-400 hindi-text">InScript कीबोर्ड</h3>
            <button onClick={() => setShowKeyboard(false)}
              className="text-slate-500 hover:text-slate-300 text-xs">छुपाएं</button>
          </div>
          <InScriptKeyboard highlightChar={currentChar} showLegend={true} />
        </div>
      )}

      {!showKeyboard && (
        <button onClick={() => setShowKeyboard(true)}
          className="text-sm text-slate-500 hover:text-orange-400 transition-colors hindi-text">
          कीबोर्ड दिखाएं →
        </button>
      )}

      {/* Result modal */}
      {showResult && finalStats && (
        <ResultModal
          stats={finalStats}
          lesson={lesson}
          onRestart={handleRestart}
          onBack={onBack}
        />
      )}
    </div>
  );
}
