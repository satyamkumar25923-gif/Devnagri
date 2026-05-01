import { useApp } from '../context/AppContext';
import {
  Volume2, VolumeX, Monitor, Hand, Type, BookOpen, AlertTriangle
} from 'lucide-react';

function Toggle({ value, onChange, label, sublabel, icon: Icon, color = 'text-orange-400' }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5">
      <div className="flex items-start gap-3">
        {Icon && <Icon size={18} className={`${color} mt-0.5 flex-shrink-0`} />}
        <div>
          <p className="hindi-text font-medium text-white text-sm">{label}</p>
          {sublabel && <p className="hindi-text text-slate-500 text-xs mt-0.5">{sublabel}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-all duration-200 flex-shrink-0
                    ${value ? 'bg-orange-500' : 'bg-slate-700'}`}
        role="switch"
        aria-checked={value}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
                          ${value ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
}

function FontSizeSelector({ value, onChange }) {
  const options = [
    { id: 'small',  label: 'छोटा',    sample: 'अ' },
    { id: 'medium', label: 'मध्यम',   sample: 'अ' },
    { id: 'large',  label: 'बड़ा',     sample: 'अ' },
    { id: 'xlarge', label: 'बहुत बड़ा', sample: 'अ' },
  ];
  const sizes = { small: 'text-lg', medium: 'text-2xl', large: 'text-3xl', xlarge: 'text-4xl' };

  return (
    <div className="py-4 border-b border-white/5">
      <div className="flex items-center gap-3 mb-3">
        <Type size={18} className="text-blue-400" />
        <div>
          <p className="hindi-text font-medium text-white text-sm">फ़ॉन्ट आकार</p>
          <p className="hindi-text text-slate-500 text-xs">टाइपिंग क्षेत्र का अक्षर आकार</p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all
              ${value === opt.id
                ? 'border-orange-500/60 bg-orange-900/20 text-orange-300'
                : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'}`}
          >
            <span className={`hindi-text font-bold ${sizes[opt.id]}`}>{opt.sample}</span>
            <span className="hindi-text text-xs">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Settings() {
  const { state, updateSetting, resetProgress } = useApp();
  const { settings } = state;

  const handleReset = () => {
    if (window.confirm('क्या आप सभी प्रगति हटाना चाहते हैं? यह क्रिया वापस नहीं हो सकती।')) {
      resetProgress();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="hindi-text text-4xl font-black text-white mb-2">सेटिंग्स</h1>
        <p className="hindi-text text-slate-400">अपना अनुभव अनुकूलित करें</p>
      </div>

      {/* Learning section */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-white mb-2 flex items-center gap-2">
          <BookOpen size={18} className="text-orange-400" /> सीखना
        </h2>
        <p className="hindi-text text-slate-500 text-xs mb-4">शुरुआती मार्गदर्शन सेटिंग्स</p>

        <Toggle
          value={settings.beginnerMode}
          onChange={v => updateSetting('beginnerMode', v)}
          label="शुरुआती मोड"
          sublabel="बड़ा अक्षर प्रदर्शन और मार्गदर्शन सक्षम करें"
          icon={Monitor}
          color="text-orange-400"
        />
        <Toggle
          value={settings.showKeyboard}
          onChange={v => updateSetting('showKeyboard', v)}
          label="कीबोर्ड दिखाएं"
          sublabel="टाइपिंग के दौरान InScript कीबोर्ड दिखाएं"
          icon={Monitor}
          color="text-blue-400"
        />
        <Toggle
          value={settings.showHands}
          onChange={v => updateSetting('showHands', v)}
          label="हाथ दिखाएं"
          sublabel="उंगली-प्लेसमेंट डायग्राम दिखाएं"
          icon={Hand}
          color="text-green-400"
        />
      </div>

      {/* Display section */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-white mb-2 flex items-center gap-2">
          <Type size={18} className="text-blue-400" /> प्रदर्शन
        </h2>
        <p className="hindi-text text-slate-500 text-xs mb-4">दृश्य वरीयताएं</p>

        <FontSizeSelector
          value={settings.fontSize}
          onChange={v => updateSetting('fontSize', v)}
        />
      </div>

      {/* Sound section */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-white mb-2 flex items-center gap-2">
          <Volume2 size={18} className="text-purple-400" /> ध्वनि
        </h2>
        <Toggle
          value={settings.sound}
          onChange={v => updateSetting('sound', v)}
          label="ध्वनि प्रतिक्रिया"
          sublabel="सही/गलत कीस्ट्रोक पर आवाज़"
          icon={settings.sound ? Volume2 : VolumeX}
          color="text-purple-400"
        />
      </div>

      {/* About */}
      <div className="glass-card p-6">
        <h2 className="hindi-text font-bold text-white mb-4">ऐप के बारे में</h2>
        <div className="space-y-2 text-sm">
          {[
            ['ऐप',       'देवनागरी टाइपर'],
            ['कीबोर्ड',  'InScript (भारत सरकार मानक)'],
            ['भाषा',     'हिंदी (देवनागरी)'],
            ['संस्करण',  'v1.0.0'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1 border-b border-white/5">
              <span className="hindi-text text-slate-400">{k}</span>
              <span className="hindi-text text-slate-200">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="glass-card p-6 border border-red-900/40">
        <h2 className="hindi-text font-bold text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle size={18} /> खतरा क्षेत्र
        </h2>
        <p className="hindi-text text-slate-400 text-sm mb-4">
          यह आपकी सभी प्रगति, पाठ और उपलब्धियां स्थायी रूप से हटा देगा।
        </p>
        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-xl border border-red-700/50 text-red-400 text-sm
                     hover:bg-red-900/30 transition-all hindi-text font-semibold"
        >
          सभी प्रगति हटाएं
        </button>
      </div>
    </div>
  );
}
