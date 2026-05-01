import { useState, useEffect, useCallback, useMemo } from 'react';
import { Play, RefreshCw, Clock, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTyping } from '../hooks/useTyping';
import { useTimer } from '../hooks/useTimer';
import { useSound } from '../hooks/useSound';
import { PRACTICE_WORDS, PRACTICE_SENTENCES } from '../data/lessons';
import TypingArea from '../components/typing/TypingArea';
import StatsBar from '../components/typing/StatsBar';
import InScriptKeyboard from '../components/keyboard/InScriptKeyboard';
import HandDisplay from '../components/keyboard/HandDisplay';

const DURATIONS = [
  { label: '1 मिनट',  seconds: 60 },
  { label: '3 मिनट',  seconds: 180 },
  { label: '5 मिनट',  seconds: 300 },
];

const MODES = [
  { id: 'words',     label: 'शब्द',   labelEn: 'Words' },
  { id: 'sentences', label: 'वाक्य',  labelEn: 'Sentences' },
];

/** Build a random word pool of ~80 characters */
function buildWordText(count = 20) {
  const shuffled = [...PRACTICE_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join(' ');
}

/** Build a random sentence pool */
function buildSentenceText() {
  const shuffled = [...PRACTICE_SENTENCES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).join(' ');
}

export default function Practice() {
  const { state, completePractice } = useApp();
  const { settings } = state;

  const [mode, setMode]           = useState('words');
  const [durationIdx, setDurIdx]  = useState(0);
  const [started, setStarted]     = useState(false);
  const [done, setDone]           = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(settings.showKeyboard);
  const [showHands, setShowHands]       = useState(settings.showHands);
  const [showResult, setShowResult]     = useState(false);

  const duration = DURATIONS[durationIdx].seconds;

  // Build text based on mode
  const text = useMemo(() => {
    return mode === 'words' ? buildWordText(25) : buildSentenceText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, done]); // regenerate on reset

  const { playCorrect, playIncorrect, playComplete } = useSound(settings.sound);

  const {
    charStates, currentIndex, wpm, accuracy, mistakes,
    finished, handleKeyPress, handleBackspace, reset: resetTyping,
  } = useTyping(text);

  const {
    timeLeft, running, start: startTimer, stop: stopTimer,
    reset: resetTimer, formatTime,
  } = useTimer(duration);

  const chars = [...text];
  const currentChar = chars[currentIndex] || '';

  // Start session on first keystroke
  const wrappedKeyPress = useCallback((ch) => {
    if (!started && !done) {
      setStarted(true);
      startTimer();
    }
    handleKeyPress(ch);
  }, [started, done, handleKeyPress, startTimer]);

  // Play sounds on correct/incorrect
  useEffect(() => {
    if (currentIndex === 0) return;
    const lastState = charStates[currentIndex - 1];
    if (lastState === 'correct') playCorrect();
    else if (lastState === 'incorrect') playIncorrect();
  }, [currentIndex]);

  // End session when timer expires
  useEffect(() => {
    if (timeLeft === 0 && started && !done) {
      stopTimer();
      setDone(true);
      setShowResult(true);
      playComplete();
      completePractice(wpm, accuracy, duration, currentIndex);
    }
  }, [timeLeft]);

  // End session if text is fully typed
  useEffect(() => {
    if (finished && started && !done) {
      stopTimer();
      setDone(true);
      setShowResult(true);
      playComplete();
      completePractice(wpm, accuracy, duration, currentIndex);
    }
  }, [finished]);

  const handleReset = () => {
    resetTyping();
    resetTimer(duration);
    setStarted(false);
    setDone(false);
    setShowResult(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="hindi-text text-4xl font-black text-white mb-1">अभ्यास</h1>
          <p className="hindi-text text-slate-400">टाइमर-आधारित टाइपिंग अभ्यास</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHands(v => !v)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Toggle hands">
            {showHands ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button onClick={handleReset}
            className="btn-secondary text-sm hindi-text">
            <RefreshCw size={15} /> नया अभ्यास
          </button>
        </div>
      </div>

      {/* Mode + Duration selectors */}
      {!started && (
        <div className="glass-card p-5 flex flex-wrap gap-6 items-center">
          {/* Mode */}
          <div>
            <p className="text-slate-500 text-xs mb-2 hindi-text">अभ्यास प्रकार</p>
            <div className="flex gap-2">
              {MODES.map(m => (
                <button key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hindi-text
                    ${mode === m.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                  style={mode === m.id ? {
                    background: 'linear-gradient(135deg,#f97316,#ea580c)',
                    boxShadow: '0 0 12px rgba(249,115,22,0.4)',
                  } : {}}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <p className="text-slate-500 text-xs mb-2 flex items-center gap-1 hindi-text">
              <Clock size={12} /> अवधि
            </p>
            <div className="flex gap-2">
              {DURATIONS.map((d, i) => (
                <button key={i}
                  onClick={() => { setDurIdx(i); handleReset(); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hindi-text
                    ${durationIdx === i
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                  style={durationIdx === i ? {
                    background: 'rgba(99,102,241,0.3)',
                    border: '1px solid rgba(99,102,241,0.5)',
                  } : {}}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start hint */}
          <div className="ml-auto hidden sm:flex items-center gap-2 text-slate-500 text-sm hindi-text">
            <Play size={14} className="text-orange-400" />
            टाइप करने से शुरू होगा
          </div>
        </div>
      )}

      {/* Stats */}
      <StatsBar
        wpm={wpm}
        accuracy={accuracy}
        mistakes={mistakes}
        timeLeft={started ? timeLeft : null}
        formatTime={formatTime}
      />

      {/* Current char hint + hands */}
      {settings.beginnerMode && started && !done && currentChar && currentChar !== ' ' && (
        <div className="glass-card p-4 flex items-center justify-center gap-8 flex-wrap">
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-1 hindi-text">अभी टाइप करें</p>
            <div className="hindi-text text-6xl font-bold"
                 style={{ color: '#f97316', textShadow: '0 0 24px rgba(249,115,22,0.5)' }}>
              {currentChar}
            </div>
          </div>
          {showHands && <HandDisplay highlightChar={currentChar} />}
        </div>
      )}

      {/* Typing area */}
      <TypingArea
        text={text}
        charStates={charStates}
        currentIndex={currentIndex}
        onChar={wrappedKeyPress}
        onBackspace={handleBackspace}
        fontSize={settings.fontSize}
        active={!done}
        finished={done}
      />

      {/* Keyboard */}
      {showKeyboard && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-400 hindi-text">InScript कीबोर्ड</h3>
            <button onClick={() => setShowKeyboard(false)}
              className="text-slate-500 hover:text-slate-300 text-xs hindi-text">छुपाएं</button>
          </div>
          <InScriptKeyboard highlightChar={started && !done ? currentChar : ''} showLegend={true} />
        </div>
      )}
      {!showKeyboard && (
        <button onClick={() => setShowKeyboard(true)}
          className="text-sm text-slate-500 hover:text-orange-400 transition-colors hindi-text">
          कीबोर्ड दिखाएं →
        </button>
      )}

      {/* Result overlay */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
          <div className="glass-card w-full max-w-md p-8 text-center animate-slide-up">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="hindi-text text-3xl font-bold text-white mb-1">
              {wpm >= 20 ? 'शानदार!' : wpm >= 10 ? 'बहुत अच्छा!' : 'अच्छी शुरुआत!'}
            </h2>
            <p className="hindi-text text-slate-400 mb-6">अभ्यास सत्र पूरा हुआ</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="glass-card p-3">
                <div className="text-3xl font-bold text-yellow-400">{wpm}</div>
                <div className="text-slate-400 text-xs hindi-text">WPM</div>
              </div>
              <div className="glass-card p-3">
                <div className={`text-3xl font-bold ${accuracy >= 90 ? 'text-green-400' : 'text-orange-400'}`}>
                  {accuracy}%
                </div>
                <div className="text-slate-400 text-xs hindi-text">शुद्धता</div>
              </div>
              <div className="glass-card p-3">
                <div className="text-3xl font-bold text-blue-400">{currentIndex}</div>
                <div className="text-slate-400 text-xs hindi-text">अक्षर</div>
              </div>
              <div className="glass-card p-3">
                <div className="text-3xl font-bold text-red-400">{mistakes}</div>
                <div className="text-slate-400 text-xs hindi-text">गलतियाँ</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleReset} className="btn-primary flex-1 justify-center hindi-text">
                <RefreshCw size={16} /> फिर से अभ्यास
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
