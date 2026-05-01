import { Star, Lock, CheckCircle, ChevronRight } from 'lucide-react';

const CATEGORY_COLORS = {
  vowels:     { bg: 'from-purple-600/30 to-purple-800/20', border: 'border-purple-500/30', badge: 'bg-purple-900/50 text-purple-300' },
  consonants: { bg: 'from-blue-600/30 to-blue-800/20',   border: 'border-blue-500/30',   badge: 'bg-blue-900/50 text-blue-300'   },
  matras:     { bg: 'from-cyan-600/30 to-cyan-800/20',   border: 'border-cyan-500/30',   badge: 'bg-cyan-900/50 text-cyan-300'   },
  words:      { bg: 'from-green-600/30 to-green-800/20', border: 'border-green-500/30',  badge: 'bg-green-900/50 text-green-300' },
  sentences:  { bg: 'from-orange-600/30 to-orange-800/20', border: 'border-orange-500/30', badge: 'bg-orange-900/50 text-orange-300' },
};

const CATEGORY_LABELS = {
  vowels: 'स्वर', consonants: 'व्यंजन', matras: 'मात्राएं', words: 'शब्द', sentences: 'वाक्य',
};

/**
 * Single lesson card shown in the lessons grid.
 */
export default function LessonCard({ lesson, progress, unlocked, onClick }) {
  const col = CATEGORY_COLORS[lesson.category] || CATEGORY_COLORS.words;
  const prog = progress || { completed: false, stars: 0, bestWpm: 0, bestAccuracy: 0 };

  return (
    <div
      onClick={unlocked ? onClick : undefined}
      className={`relative rounded-2xl border bg-gradient-to-br ${col.bg} ${col.border}
                  p-5 transition-all duration-300 overflow-hidden
                  ${unlocked ? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}`}
    >
      {/* Level badge */}
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${col.badge} hindi-text`}>
          {CATEGORY_LABELS[lesson.category] || lesson.category}
        </span>
        <div className="flex items-center gap-1">
          {unlocked
            ? prog.completed
              ? <CheckCircle size={18} className="text-green-400" />
              : null
            : <Lock size={18} className="text-slate-500" />
          }
        </div>
      </div>

      {/* Title */}
      <h3 className="hindi-text font-bold text-lg text-white leading-tight mb-1">
        {lesson.title}
      </h3>
      <p className="text-slate-400 text-xs mb-4 hindi-text">{lesson.description}</p>

      {/* Characters preview */}
      {lesson.characters.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {lesson.characters.slice(0, 8).map((ch, i) => (
            <span key={i} className="hindi-text text-lg bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center">
              {ch}
            </span>
          ))}
          {lesson.characters.length > 8 && (
            <span className="text-slate-500 text-xs flex items-center">+{lesson.characters.length - 8}</span>
          )}
        </div>
      )}

      {/* Stars */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[1, 2, 3].map(s => (
            <Star key={s} size={14}
              className={s <= prog.stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} />
          ))}
        </div>
        {prog.completed && (
          <span className="text-xs text-slate-400">
            Best: <strong className="text-yellow-400">{prog.bestWpm} WPM</strong>
          </span>
        )}
        {unlocked && !prog.completed && (
          <ChevronRight size={16} className="text-slate-400" />
        )}
      </div>

      {/* Glow for active */}
      {unlocked && !prog.completed && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at top right, rgba(249,115,22,0.08), transparent 70%)' }} />
      )}
    </div>
  );
}
