import { Star, RotateCcw, Home, ChevronRight } from 'lucide-react';

export default function ResultModal({ stats, lesson, onRestart, onBack }) {
  const { wpm, accuracy, mistakes, charsTyped } = stats;
  const stars = accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : 1;

  const messages = {
    3: ['शानदार! 🎉', 'अद्भुत प्रदर्शन!', 'बहुत बढ़िया!'],
    2: ['बहुत अच्छा! 👏', 'अच्छा प्रयास!', 'और अभ्यास करें।'],
    1: ['अच्छा शुरुआत! 💪', 'अभ्यास से सुधार होगा।', 'मत हारो!'],
  };
  const msg = messages[stars][Math.floor(Math.random() * 3)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="glass-card w-full max-w-md p-8 text-center animate-slide-up">

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-4">
          {[1, 2, 3].map(s => (
            <Star
              key={s}
              size={36}
              className={s <= stars
                ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg'
                : 'text-slate-700'}
              style={s <= stars ? { filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.6))' } : {}}
            />
          ))}
        </div>

        {/* Message */}
        <h2 className="hindi-text text-3xl font-bold text-white mb-1">{msg}</h2>
        <p className="hindi-text text-slate-400 mb-6">{lesson.title} — पूरा हुआ!</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass-card p-3">
            <div className="text-2xl font-bold text-yellow-400">{wpm}</div>
            <div className="text-slate-400 text-xs hindi-text">शब्द प्रति मिनट</div>
          </div>
          <div className="glass-card p-3">
            <div className={`text-2xl font-bold ${accuracy >= 90 ? 'text-green-400' : 'text-orange-400'}`}>
              {accuracy}%
            </div>
            <div className="text-slate-400 text-xs hindi-text">शुद्धता</div>
          </div>
          <div className="glass-card p-3">
            <div className="text-2xl font-bold text-red-400">{mistakes}</div>
            <div className="text-slate-400 text-xs hindi-text">गलतियाँ</div>
          </div>
          <div className="glass-card p-3">
            <div className="text-2xl font-bold text-blue-400">{charsTyped}</div>
            <div className="text-slate-400 text-xs hindi-text">अक्षर टाइप किए</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onRestart}
            className="btn-secondary flex-1 justify-center hindi-text">
            <RotateCcw size={16} /> फिर से
          </button>
          <button onClick={onBack}
            className="btn-primary flex-1 justify-center hindi-text">
            अगला पाठ <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
