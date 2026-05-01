import { createContext, useContext, useReducer, useEffect } from 'react';
import { ACHIEVEMENTS } from '../data/achievements';
import { LESSONS } from '../data/lessons';

// ── Initial State ──────────────────────────────────────────
const getInitialState = () => {
  const saved = localStorage.getItem('devnagriTyper');
  if (saved) {
    try { return JSON.parse(saved); }
    catch { /* fall through */ }
  }
  return {
    // User stats
    stats: {
      totalCharsTyped: 0,
      lessonsCompleted: 0,
      practiceSessions: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      streak: 0,
      lastActiveDate: null,
      sessionHistory: [], // [{date, wpm, accuracy, duration}]
    },
    // Lesson progress
    lessonProgress: Object.fromEntries(LESSONS.map(l => [l.id, { completed: false, stars: 0, bestWpm: 0, bestAccuracy: 0 }])),
    // Unlocked lessons
    unlockedLessons: ['L1', 'L2'],
    // Achievements earned
    achievements: [],
    // Settings
    settings: {
      darkMode: true,
      sound: true,
      beginnerMode: true,
      showKeyboard: true,
      showHands: true,
      fontSize: 'large', // small | medium | large | xlarge
      autoAdvance: false,
    },
    // Current level (1-4)
    currentLevel: 1,
  };
};

// ── Reducer ────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_LESSON': {
      const { lessonId, wpm, accuracy, charsTyped } = action.payload;
      const lesson = LESSONS.find(l => l.id === lessonId);
      const stars = accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : 1;
      const newProgress = {
        ...state.lessonProgress,
        [lessonId]: {
          completed: true,
          stars: Math.max(stars, state.lessonProgress[lessonId]?.stars || 0),
          bestWpm: Math.max(wpm, state.lessonProgress[lessonId]?.bestWpm || 0),
          bestAccuracy: Math.max(accuracy, state.lessonProgress[lessonId]?.bestAccuracy || 0),
        },
      };
      // Unlock next lessons
      const lessonIndex = LESSONS.findIndex(l => l.id === lessonId);
      const newUnlocked = [...new Set([...state.unlockedLessons])];
      if (lessonIndex < LESSONS.length - 1) {
        newUnlocked.push(LESSONS[lessonIndex + 1].id);
      }
      const newStats = {
        ...state.stats,
        totalCharsTyped: state.stats.totalCharsTyped + charsTyped,
        lessonsCompleted: state.stats.lessonsCompleted + (state.lessonProgress[lessonId]?.completed ? 0 : 1),
        bestWpm: Math.max(state.stats.bestWpm, wpm),
        bestAccuracy: Math.max(state.stats.bestAccuracy, accuracy),
      };
      return {
        ...state,
        lessonProgress: newProgress,
        unlockedLessons: newUnlocked,
        stats: newStats,
      };
    }

    case 'COMPLETE_PRACTICE': {
      const { wpm, accuracy, duration, charsTyped } = action.payload;
      const today = new Date().toDateString();
      const lastActive = state.stats.lastActiveDate;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = lastActive === yesterday ? state.stats.streak + 1
        : lastActive === today ? state.stats.streak : 1;
      const newHistory = [
        ...state.stats.sessionHistory.slice(-29),
        { date: today, wpm, accuracy, duration },
      ];
      return {
        ...state,
        stats: {
          ...state.stats,
          totalCharsTyped: state.stats.totalCharsTyped + charsTyped,
          practiceSessions: state.stats.practiceSessions + 1,
          bestWpm: Math.max(state.stats.bestWpm, wpm),
          bestAccuracy: Math.max(state.stats.bestAccuracy, accuracy),
          streak: newStreak,
          lastActiveDate: today,
          sessionHistory: newHistory,
        },
      };
    }

    case 'CHECK_ACHIEVEMENTS': {
      const earned = ACHIEVEMENTS
        .filter(a => !state.achievements.includes(a.id) && a.condition(state.stats))
        .map(a => a.id);
      if (earned.length === 0) return state;
      return { ...state, achievements: [...state.achievements, ...earned] };
    }

    case 'UPDATE_SETTING':
      return {
        ...state,
        settings: { ...state.settings, [action.key]: action.value },
      };

    case 'RESET_PROGRESS':
      return getInitialState();

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, getInitialState);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('devnagriTyper', JSON.stringify(state));
  }, [state]);

  // Check achievements after stat changes
  useEffect(() => {
    dispatch({ type: 'CHECK_ACHIEVEMENTS' });
  }, [state.stats]);

  const completeLesson = (lessonId, wpm, accuracy, charsTyped) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: { lessonId, wpm, accuracy, charsTyped } });
  };

  const completePractice = (wpm, accuracy, duration, charsTyped) => {
    dispatch({ type: 'COMPLETE_PRACTICE', payload: { wpm, accuracy, duration, charsTyped } });
  };

  const updateSetting = (key, value) => {
    dispatch({ type: 'UPDATE_SETTING', key, value });
  };

  const resetProgress = () => dispatch({ type: 'RESET_PROGRESS' });

  return (
    <AppContext.Provider value={{ state, completeLesson, completePractice, updateSetting, resetProgress }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
