import { Zap, Target, AlertCircle, Clock } from 'lucide-react';

/**
 * Real-time stats bar shown during typing sessions.
 */
export default function StatsBar({ wpm = 0, accuracy = 100, mistakes = 0, timeLeft = null, formatTime }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* WPM */}
      <div className="stat-card">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Zap size={13} className="text-yellow-400" />
          <span>गति (WPM)</span>
        </div>
        <div className="text-3xl font-bold text-yellow-400">{wpm}</div>
        <div className="text-slate-500 text-xs">शब्द प्रति मिनट</div>
      </div>

      {/* Accuracy */}
      <div className="stat-card">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Target size={13} className="text-green-400" />
          <span>शुद्धता</span>
        </div>
        <div className={`text-3xl font-bold ${accuracy >= 90 ? 'text-green-400' : accuracy >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
          {accuracy}%
        </div>
        <div className="text-slate-500 text-xs">Accuracy</div>
      </div>

      {/* Mistakes */}
      <div className="stat-card">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <AlertCircle size={13} className="text-red-400" />
          <span>गलतियाँ</span>
        </div>
        <div className="text-3xl font-bold text-red-400">{mistakes}</div>
        <div className="text-slate-500 text-xs">Mistakes</div>
      </div>

      {/* Timer / Time left */}
      <div className="stat-card">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Clock size={13} className="text-blue-400" />
          <span>{timeLeft !== null ? 'समय शेष' : 'समय'}</span>
        </div>
        <div className={`text-3xl font-bold text-blue-400 ${timeLeft !== null && timeLeft <= 10 ? 'text-red-400 animate-pulse' : ''}`}>
          {timeLeft !== null && formatTime ? formatTime(timeLeft) : '--'}
        </div>
        <div className="text-slate-500 text-xs">{timeLeft !== null ? 'Time Left' : 'Timer'}</div>
      </div>
    </div>
  );
}
