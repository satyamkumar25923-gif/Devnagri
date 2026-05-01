import { INSCRIPT_LAYOUT, KEYBOARD_ROWS, FINGER_COLORS } from '../../data/inscriptLayout';

const KEY_WIDTH = {
  backtick: 'w-10', minus: 'w-12', equals: 'w-12',
  backslash: 'w-16', lbracket: 'w-10', rbracket: 'w-10',
  semicolon: 'w-10', quote: 'w-14',
  z: 'w-10', slash: 'w-14',
  space: 'w-64',
};

const KEY_HEIGHTS = 'h-12';

/** Map key id → key data */
const KEY_MAP = Object.fromEntries(INSCRIPT_LAYOUT.map(k => [k.id, k]));

function KeyCap({ keyData, highlighted, showShift = false }) {
  if (!keyData) return null;
  const { finger, hindi, shift } = keyData;
  const color = FINGER_COLORS[finger];

  const baseStyle = {
    background: highlighted
      ? `linear-gradient(135deg, ${color.bg}, ${color.light})`
      : 'rgba(255,255,255,0.06)',
    borderColor: highlighted ? color.light : 'rgba(255,255,255,0.1)',
    boxShadow: highlighted
      ? `0 3px 0 rgba(0,0,0,0.5), 0 0 16px ${color.bg}88`
      : '0 3px 0 rgba(0,0,0,0.4)',
    transform: highlighted ? 'scale(1.08) translateY(-2px)' : 'none',
    transition: 'all 0.15s ease',
  };

  return (
    <div
      className={`key-base ${KEY_HEIGHTS} ${KEY_WIDTH[keyData.id] || 'w-10'} px-1
                  flex flex-col items-center justify-center gap-0.5`}
      style={baseStyle}
      title={`${keyData.latin.toUpperCase()} → ${hindi}`}
    >
      {/* Shift character (small, top) */}
      {shift && shift !== hindi && (
        <span className="hindi-text text-[9px] leading-none opacity-60 text-slate-300">
          {shift}
        </span>
      )}
      {/* Main Hindi character */}
      <span className={`hindi-text text-sm font-semibold leading-none
                        ${highlighted ? 'text-white' : 'text-slate-200'}`}>
        {hindi}
      </span>
      {/* Latin key (tiny, bottom) */}
      <span className="text-[8px] leading-none opacity-40 text-slate-400 font-mono uppercase">
        {keyData.latin === ' ' ? '___' : keyData.latin}
      </span>
    </div>
  );
}

/**
 * Full InScript keyboard visualization.
 * @param {string} highlightChar - Hindi character to highlight
 * @param {boolean} showLegend   - Show finger color legend
 */
export default function InScriptKeyboard({ highlightChar = '', showLegend = true }) {
  // Find which key to highlight
  const highlightId = INSCRIPT_LAYOUT.find(k => k.hindi === highlightChar || k.shift === highlightChar)?.id;

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[700px]">
        {/* Finger legend */}
        {showLegend && (
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(FINGER_COLORS).map(([finger, { bg, name }]) => (
              <div key={finger} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-3 h-3 rounded-full" style={{ background: bg }} />
                <span className="hindi-text">{name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Keyboard rows */}
        <div className="flex flex-col gap-1.5">
          {KEYBOARD_ROWS.map((rowIds, rowIdx) => (
            <div key={rowIdx}
                 className="flex gap-1.5 justify-center"
                 style={{ paddingLeft: rowIdx === 1 ? '16px' : rowIdx === 2 ? '24px' : rowIdx === 3 ? '40px' : 0 }}>
              {rowIds.map(id => (
                <KeyCap
                  key={id}
                  keyData={KEY_MAP[id]}
                  highlighted={id === highlightId}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
