import { Link } from 'react-router-dom';
import { BookOpen, Keyboard, BarChart2, Flame, Star, Zap, Target, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LESSONS } from '../data/lessons';
import { ACHIEVEMENTS } from '../data/achievements';

export default function Home() {
  const { state } = useApp();
  const { stats, achievements, unlockedLessons, lessonProgress } = state;

  const completedLessons = Object.values(lessonProgress).filter(p => p.completed).length;
  const totalLessons = LESSONS.length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  // Find next unlocked uncompleted lesson
  const nextLesson = LESSONS.find(l =>
    unlockedLessons.includes(l.id) && !lessonProgress[l.id]?.completed
  );

  const earnedAchievements = ACHIEVEMENTS.filter(a => achievements.includes(a.id));
  const recentSessions = stats.sessionHistory.slice(-7);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
           style={{
             background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(168,85,247,0.2) 100%)',
             border: '1px solid rgba(249,115,22,0.2)',
           }}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, #f97316, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, #a855f7, transparent)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10">
          <div className="hindi-text text-5xl sm:text-6xl font-black text-white mb-2 leading-tight">
            देवनागरी<br />
            <span style={{ background: 'linear-gradient(90deg,#f97316,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              टाइपर
            </span>
          </div>
          <p className="hindi-text text-slate-300 text-lg mb-6 max-w-md">
            InScript कीबोर्ड से हिंदी टाइपिंग सीखें — शुरुआत से विशेषज्ञ तक
          </p>

          <div className="flex flex-wrap gap-3">
            {nextLesson ? (
              <Link to="/lessons" className="btn-primary hindi-text">
                <BookOpen size={18} />
                {lessonProgress['L1']?.completed ? 'जारी रखें' : 'शुरू करें'}
              </Link>
            ) : (
              <Link to="/practice" className="btn-primary hindi-text">
                <Keyboard size={18} /> अभ्यास करें
              </Link>
            )}
            <Link to="/practice" className="btn-secondary hindi-text">
              <Zap size={18} /> त्वरित अभ्यास
            </Link>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'सर्वश्रेष्ठ WPM', value: stats.bestWpm, icon: Zap,    color: 'text-yellow-400' },
          { label: 'सर्वश्रेष्ठ शुद्धता', value: `${stats.bestAccuracy}%`, icon: Target, color: 'text-green-400' },
          { label: 'स्ट्रीक',     value: `${stats.streak}🔥`, icon: Flame, color: 'text-orange-400' },
          { label: 'पाठ पूरे',    value: `${completedLessons}/${totalLessons}`, icon: BookOpen, color: 'text-blue-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card gap-2">
            <Icon size={20} className={color} />
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-slate-500 text-xs hindi-text text-center">{label}</div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="hindi-text font-bold text-lg text-white">समग्र प्रगति</h2>
          <span className="text-orange-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="progress-bar mb-2">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-slate-500 text-sm hindi-text">
          {completedLessons} / {totalLessons} पाठ पूरे हुए
        </p>
      </div>

      {/* Next lesson + achievements row */}
      <div className="grid sm:grid-cols-2 gap-6">

        {/* Next lesson */}
        {nextLesson && (
          <div className="glass-card p-6">
            <h3 className="hindi-text font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-orange-400" /> अगला पाठ
            </h3>
            <div className="hindi-text text-xl font-bold text-white mb-1">{nextLesson.title}</div>
            <p className="text-slate-400 text-sm hindi-text mb-4">{nextLesson.description}</p>
            {nextLesson.characters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {nextLesson.characters.map((ch, i) => (
                  <span key={i} className="hindi-text text-2xl bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center">
                    {ch}
                  </span>
                ))}
              </div>
            )}
            <Link to="/lessons" className="btn-primary text-sm hindi-text">
              शुरू करें →
            </Link>
          </div>
        )}

        {/* Recent achievements */}
        <div className="glass-card p-6">
          <h3 className="hindi-text font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Trophy size={16} className="text-yellow-400" /> उपलब्धियां
          </h3>
          {earnedAchievements.length === 0 ? (
            <p className="text-slate-500 text-sm hindi-text">
              पहला पाठ पूरा करके अपनी पहली उपलब्धि पाएं!
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {earnedAchievements.slice(-6).map(ach => {
                const a = ACHIEVEMENTS.find(x => x.id === ach);
                return a ? (
                  <div key={a.id}
                    className="flex flex-col items-center gap-1 bg-white/5 rounded-xl p-3 w-16 text-center"
                    title={a.desc}>
                    <span className="text-2xl">{a.icon}</span>
                    <span className="text-slate-400 text-[10px] hindi-text leading-tight">{a.title}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}
          <Link to="/progress" className="text-orange-400 text-xs mt-3 inline-block hover:underline hindi-text">
            सभी देखें →
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card p-6">
        <h3 className="hindi-text font-bold text-white mb-4 flex items-center gap-2">
          💡 टाइपिंग टिप्स
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: '🖐️', tip: 'होम रो पर उंगलियाँ रखें', sub: 'बाएं: A S D F | दाएं: J K L ;' },
            { icon: '👀', tip: 'स्क्रीन देखें, कीबोर्ड नहीं', sub: 'Touch typing से गति बढ़ती है' },
            { icon: '🔄', tip: 'हर दिन अभ्यास करें', sub: 'नियमित अभ्यास से सुधार होता है' },
          ].map(({ icon, tip, sub }) => (
            <div key={tip} className="flex gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="hindi-text font-semibold text-white text-sm">{tip}</p>
                <p className="hindi-text text-slate-400 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
