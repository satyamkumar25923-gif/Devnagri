import { INSCRIPT_LAYOUT, FINGER_COLORS } from '../../data/inscriptLayout';

const FINGERS = ['pinky', 'ring', 'middle', 'index', 'thumb'];

// Finger tip positions (top-to-bottom visual)
const LEFT_FINGERS  = ['pinky', 'ring', 'middle', 'index'];
const RIGHT_FINGERS = ['index', 'middle', 'ring', 'pinky'];

function FingerBar({ finger, hand, active }) {
  const { bg, light, name } = FINGER_COLORS[finger];
  const isThumb = finger === 'thumb';

  const style = {
    background: active
      ? `linear-gradient(180deg, ${light}, ${bg})`
      : 'rgba(255,255,255,0.06)',
    borderColor: active ? light : 'rgba(255,255,255,0.1)',
    boxShadow: active ? `0 0 12px ${bg}88` : 'none',
    transition: 'all 0.2s ease',
  };

  if (isThumb) {
    return (
      <div className="flex justify-center mt-1">
        <div
          className="w-20 h-8 rounded-full border text-xs flex items-center justify-center hindi-text font-medium"
          style={style}
          title={name}
        >
          {active ? <span className="text-white">{name.split(' ')[0]}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-10 h-20 rounded-t-full border flex items-end justify-center pb-1 text-[9px] hindi-text font-medium"
      style={style}
      title={name}
    >
      {active && <span className="text-white rotate-0">{name.split(' ')[0]}</span>}
    </div>
  );
}

/**
 * Hand diagram showing which finger to use for a given character.
 * @param {string} highlightChar - The Hindi character currently to be typed
 */
export default function HandDisplay({ highlightChar = '' }) {
  // Find which finger + hand to highlight
  const keyData = INSCRIPT_LAYOUT.find(
    k => k.hindi === highlightChar || k.shift === highlightChar
  );
  const activeFinger = keyData?.finger || null;
  const activeHand   = keyData?.hand || null;

  const fingerName = activeFinger ? FINGER_COLORS[activeFinger]?.name : '';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Instruction text */}
      {activeFinger && (
        <div className="text-center">
          <p className="text-slate-400 text-sm">इस उंगली से दबाएं</p>
          <p className="hindi-text font-bold text-lg mt-0.5"
             style={{ color: FINGER_COLORS[activeFinger]?.light }}>
            {fingerName}
            {activeHand === 'left' ? ' (बायां हाथ)' : activeHand === 'right' ? ' (दायां हाथ)' : ''}
          </p>
        </div>
      )}

      {/* Two hands */}
      <div className="flex items-end gap-10">
        {/* Left hand */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-end gap-1">
            {LEFT_FINGERS.map(finger => (
              <FingerBar
                key={finger}
                finger={finger}
                hand="left"
                active={activeFinger === finger && (activeHand === 'left' || activeHand === 'both')}
              />
            ))}
          </div>
          <FingerBar
            finger="thumb"
            hand="left"
            active={activeFinger === 'thumb' && (activeHand === 'left' || activeHand === 'both')}
          />
          <p className="text-slate-500 text-xs mt-1 hindi-text">बायां हाथ</p>
        </div>

        {/* Right hand */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-end gap-1">
            {RIGHT_FINGERS.map(finger => (
              <FingerBar
                key={finger}
                finger={finger}
                hand="right"
                active={activeFinger === finger && (activeHand === 'right' || activeHand === 'both')}
              />
            ))}
          </div>
          <FingerBar
            finger="thumb"
            hand="right"
            active={activeFinger === 'thumb' && (activeHand === 'right' || activeHand === 'both')}
          />
          <p className="text-slate-500 text-xs mt-1 hindi-text">दायां हाथ</p>
        </div>
      </div>
    </div>
  );
}
