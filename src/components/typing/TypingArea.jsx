import { useEffect, useRef } from 'react';

/**
 * Renders the target text character-by-character with state coloring.
 * Also renders a hidden <input> that captures keystrokes.
 *
 * @param {string}   text        - Full target text
 * @param {string[]} charStates  - Array of 'pending' | 'correct' | 'incorrect' per char
 * @param {number}   currentIndex - Index of the character being typed next
 * @param {function} onChar      - Called with each character typed
 * @param {function} onBackspace - Called on backspace
 * @param {boolean}  fontSize    - 'small'|'medium'|'large'|'xlarge'
 * @param {boolean}  active      - Whether input is active/listening
 */

const FONT_SIZE_MAP = {
  small:  'text-2xl',
  medium: 'text-3xl',
  large:  'text-4xl',
  xlarge: 'text-5xl',
};

export default function TypingArea({
  text = '',
  charStates = [],
  currentIndex = 0,
  onChar,
  onBackspace,
  fontSize = 'large',
  active = true,
  finished = false,
}) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-focus the hidden input
  useEffect(() => {
    if (active && inputRef.current) inputRef.current.focus();
  }, [active]);

  // Handle physical keyboard events
  useEffect(() => {
    if (!active || finished) return;

    const handleKeydown = (e) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        onBackspace?.();
      } else if (e.key.length === 1 || /[\u0900-\u097F]/.test(e.key)) {
        // Accept any printable character including Devanagari
        onChar?.(e.key);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [active, finished, onChar, onBackspace]);

  // Handle IME input (for Devanagari input via OS/IME)
  const handleInput = (e) => {
    const val = e.target.value;
    if (!val) return;
    // Process each character from the IME input
    for (const ch of val) {
      onChar?.(ch);
    }
    e.target.value = '';
  };

  const fontClass = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.large;

  // Split text into characters (handle multi-byte Devanagari correctly)
  const chars = [...text];

  return (
    <div className="relative" ref={containerRef}>
      {/* Hidden input for IME / mobile input */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        onInput={handleInput}
        aria-hidden="true"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Character display */}
      <div
        className={`hindi-text ${fontClass} leading-relaxed tracking-wide
                    flex flex-wrap justify-center gap-0.5 p-6 rounded-2xl cursor-text
                    select-none min-h-[100px] items-center`}
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        onClick={() => inputRef.current?.focus()}
      >
        {chars.map((ch, idx) => {
          const state = charStates[idx] || 'pending';
          const isCurrent = idx === currentIndex && !finished;

          let className = '';
          if (state === 'correct')   className = 'char-correct';
          else if (state === 'incorrect') className = 'char-incorrect';
          else if (isCurrent)        className = 'char-current';
          else                       className = 'char-pending';

          if (ch === ' ') {
            return (
              <span key={idx} className={`inline-block w-4 ${isCurrent ? 'border-b-2 border-orange-400' : ''}`}>
                &nbsp;
              </span>
            );
          }

          return (
            <span
              key={idx}
              className={`inline-block ${className} transition-colors duration-100`}
              style={{ minWidth: '0.5em', textAlign: 'center' }}
            >
              {ch}
            </span>
          );
        })}

        {/* Placeholder when no text */}
        {chars.length === 0 && (
          <span className="text-slate-600 text-xl hindi-text">टाइप करना शुरू करें…</span>
        )}
      </div>

      {/* Click to focus hint */}
      {!finished && active && (
        <p className="text-center text-xs text-slate-600 mt-2">
          टाइप करने के लिए यहाँ क्लिक करें · Click to focus &amp; type
        </p>
      )}
    </div>
  );
}
