import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LESSONS } from '../data/lessons';
import LessonCard from '../components/lessons/LessonCard';
import LessonView from '../components/lessons/LessonView';

const LEVEL_LABELS = {
  1: { label: 'स्तर १ – मूल अक्षर', color: 'text-purple-400' },
  2: { label: 'स्तर २ – मात्राएं',   color: 'text-blue-400' },
  3: { label: 'स्तर ३ – शब्द',        color: 'text-green-400' },
  4: { label: 'स्तर ४ – वाक्य',       color: 'text-orange-400' },
};

export default function Lessons() {
  const { state } = useApp();
  const { lessonProgress, unlockedLessons } = state;
  const [activeLesson, setActiveLesson] = useState(null);

  if (activeLesson) {
    return (
      <LessonView
        lesson={activeLesson}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  // Group lessons by level
  const levels = [...new Set(LESSONS.map(l => l.level))].sort();

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="hindi-text text-4xl font-black text-white mb-2">पाठ</h1>
        <p className="hindi-text text-slate-400 text-lg">
          क्रमबद्ध पाठ के साथ हिंदी टाइपिंग सीखें
        </p>
      </div>

      {/* Overall progress */}
      <div className="glass-card p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="hindi-text text-sm text-slate-400">समग्र प्रगति</span>
            <span className="text-orange-400 text-sm font-bold">
              {Object.values(lessonProgress).filter(p => p.completed).length} / {LESSONS.length}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"
              style={{ width: `${(Object.values(lessonProgress).filter(p => p.completed).length / LESSONS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Lessons by level */}
      {levels.map(level => {
        const levelLessons = LESSONS.filter(l => l.level === level);
        const { label, color } = LEVEL_LABELS[level] || { label: `Level ${level}`, color: 'text-white' };

        return (
          <div key={level}>
            <h2 className={`hindi-text text-2xl font-bold mb-4 ${color}`}>{label}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelLessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  progress={lessonProgress[lesson.id]}
                  unlocked={unlockedLessons.includes(lesson.id)}
                  onClick={() => setActiveLesson(lesson)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
