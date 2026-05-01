import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS } from '../data/achievements';
import { LESSONS } from '../data/lessons';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { Zap, Target, Flame, BookOpen, Trophy, Clock, TrendingUp } from 'lucide-react';

// Custom tooltip for charts
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs hindi-text">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

export default function Progress() {
  const { state } = useApp();
  const { stats, achievements, lessonProgress } = state;

  const { sessionHistory, bestWpm, bestAccuracy, streak, totalCharsTyped,
          lessonsCompleted, practiceSessions } = stats;

  // Format session history for charts
  const chartData = sessionHistory.slice(-14).map((s, i) => ({
    day: `दिन ${i + 1}`,
    wpm: s.wpm,
    accuracy: s.accuracy,
  }));

  // Lesson completion by category
  const categoryStats = LESSONS.reduce((acc, lesson) => {
    const cat = lesson.category;
    if (!acc[cat]) acc[cat] = { total: 0, done: 0 };
    acc[cat].total++;
    if (lessonProgress[lesson.id]?.completed) acc[cat].done++;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryStats).map(([cat, { total, done }]) => ({
    name: { vowels:'स्वर', consonants:'व्यंजन', matras:'मात्राएं', words:'शब्द', sentences:'वाक्य' }[cat] || cat,
    पूरे: done,
    शेष: total - done,
  }));

  const earnedIds = new Set(achievements);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="hindi-text text-4xl font-black text-white mb-2">प्रगति</h1>
        <p className="hindi-text text-slate-400">आपकी टाइपिंग यात्रा का विवरण</p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'सर्वश्रेष्ठ WPM',     value: bestWpm,           icon: Zap,       color: 'text-yellow-400' },
          { label: 'सर्वश्रेष्ठ शुद्धता', value: `${bestAccuracy}%`, icon: Target,    color: 'text-green-400' },
          { label: 'स्ट्रीक',              value: `${streak}🔥`,      icon: Flame,     color: 'text-orange-400' },
          { label: 'पाठ पूरे',             value: lessonsCompleted,   icon: BookOpen,  color: 'text-blue-400' },
          { label: 'अभ्यास सत्र',          value: practiceSessions,   icon: Clock,     color: 'text-purple-400' },
          { label: 'कुल अक्षर',            value: totalCharsTyped,    icon: TrendingUp,color: 'text-cyan-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <Icon size={18} className={color} />
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-slate-500 text-[11px] hindi-text text-center leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* WPM over time */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-lg text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-yellow-400" /> WPM प्रगति
        </h2>
        {chartData.length < 2 ? (
          <div className="h-40 flex items-center justify-center text-slate-500 hindi-text text-sm">
            अधिक डेटा के लिए अभ्यास करें…
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="wpmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="wpm" name="WPM"
                stroke="#f97316" fill="url(#wpmGrad)" strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Accuracy over time */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Target size={18} className="text-green-400" /> शुद्धता प्रगति
        </h2>
        {chartData.length < 2 ? (
          <div className="h-40 flex items-center justify-center text-slate-500 hindi-text text-sm">
            अधिक डेटा के लिए अभ्यास करें…
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="accuracy" name="शुद्धता %"
                stroke="#22c55e" fill="url(#accGrad)" strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Lesson category progress */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-lg text-white mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-blue-400" /> श्रेणी-वार प्रगति
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={categoryData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'Noto Sans Devanagari' }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="पूरे" stackId="a" fill="#22c55e" radius={[0,0,4,4]} />
            <Bar dataKey="शेष" stackId="a" fill="rgba(255,255,255,0.08)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Trophy size={18} className="text-yellow-400" /> उपलब्धियां
          <span className="text-slate-500 text-sm font-normal">
            ({achievements.length}/{ACHIEVEMENTS.length})
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map(a => {
            const earned = earnedIds.has(a.id);
            return (
              <div key={a.id}
                className={`rounded-xl p-4 border transition-all ${
                  earned
                    ? 'border-yellow-500/30 bg-yellow-900/10'
                    : 'border-white/5 bg-white/2 opacity-40'
                }`}>
                <div className="text-3xl mb-2">{earned ? a.icon : '🔒'}</div>
                <div className={`hindi-text font-bold text-sm ${earned ? 'text-white' : 'text-slate-600'}`}>
                  {a.title}
                </div>
                <div className="hindi-text text-xs text-slate-500 mt-0.5">{a.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson performance table */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-lg text-white mb-4">पाठ विवरण</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-white/10">
                <th className="text-left pb-3 hindi-text font-medium">पाठ</th>
                <th className="text-center pb-3 hindi-text font-medium">स्थिति</th>
                <th className="text-center pb-3 hindi-text font-medium">तारे</th>
                <th className="text-center pb-3 hindi-text font-medium">WPM</th>
                <th className="text-center pb-3 hindi-text font-medium">शुद्धता</th>
              </tr>
            </thead>
            <tbody>
              {LESSONS.map(lesson => {
                const prog = lessonProgress[lesson.id];
                return (
                  <tr key={lesson.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-3 hindi-text text-white">{lesson.title}</td>
                    <td className="py-3 text-center">
                      {prog?.completed
                        ? <span className="text-green-400 text-xs hindi-text">✓ पूरा</span>
                        : <span className="text-slate-600 text-xs hindi-text">–</span>}
                    </td>
                    <td className="py-3 text-center">
                      {prog?.completed
                        ? <span className="text-yellow-400">{'⭐'.repeat(prog.stars)}</span>
                        : <span className="text-slate-700">–</span>}
                    </td>
                    <td className="py-3 text-center text-yellow-400 font-bold">
                      {prog?.bestWpm || '–'}
                    </td>
                    <td className="py-3 text-center">
                      {prog?.bestAccuracy
                        ? <span className={prog.bestAccuracy >= 90 ? 'text-green-400' : 'text-orange-400'}>
                            {prog.bestAccuracy}%
                          </span>
                        : <span className="text-slate-600">–</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
