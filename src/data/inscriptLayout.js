// InScript Keyboard Layout Data
// Each key: { id, latin, hindi, shift_hindi, finger, hand, row }
// Finger: pinky | ring | middle | index | thumb
// Hand: left | right

export const FINGER_COLORS = {
  pinky:  { bg: '#8b5cf6', light: '#a78bfa', name: 'कनिष्ठा (Pinky)' },
  ring:   { bg: '#3b82f6', light: '#60a5fa', name: 'अनामिका (Ring)' },
  middle: { bg: '#10b981', light: '#34d399', name: 'मध्यमा (Middle)' },
  index:  { bg: '#f59e0b', light: '#fbbf24', name: 'तर्जनी (Index)' },
  thumb:  { bg: '#ef4444', light: '#f87171', name: 'अंगूठा (Thumb)' },
};

// InScript keyboard layout rows
// Row 0 = number row, Row 1 = QWERTY row, Row 2 = ASDF row, Row 3 = ZXCV row
export const INSCRIPT_LAYOUT = [
  // ── Number row ──
  { id: 'backtick', latin: '`', hindi: 'ॊ', shift: '~',    finger: 'pinky',  hand: 'left',  row: 0 },
  { id: '1',        latin: '1', hindi: '१', shift: '!',    finger: 'pinky',  hand: 'left',  row: 0 },
  { id: '2',        latin: '2', hindi: '२', shift: '@',    finger: 'ring',   hand: 'left',  row: 0 },
  { id: '3',        latin: '3', hindi: '३', shift: '#',    finger: 'middle', hand: 'left',  row: 0 },
  { id: '4',        latin: '4', hindi: '४', shift: '$',    finger: 'index',  hand: 'left',  row: 0 },
  { id: '5',        latin: '5', hindi: '५', shift: '%',    finger: 'index',  hand: 'left',  row: 0 },
  { id: '6',        latin: '6', hindi: '६', shift: '^',    finger: 'index',  hand: 'right', row: 0 },
  { id: '7',        latin: '7', hindi: '७', shift: '&',    finger: 'index',  hand: 'right', row: 0 },
  { id: '8',        latin: '8', hindi: '८', shift: '*',    finger: 'middle', hand: 'right', row: 0 },
  { id: '9',        latin: '9', hindi: '९', shift: '(',    finger: 'ring',   hand: 'right', row: 0 },
  { id: '0',        latin: '0', hindi: '०', shift: ')',    finger: 'pinky',  hand: 'right', row: 0 },
  { id: 'minus',    latin: '-', hindi: '-', shift: '_',    finger: 'pinky',  hand: 'right', row: 0 },
  { id: 'equals',   latin: '=', hindi: 'ृ', shift: '+',    finger: 'pinky',  hand: 'right', row: 0 },

  // ── QWERTY row (row 1) ──
  { id: 'q', latin: 'q', hindi: 'ौ', shift: 'ॅ',  finger: 'pinky',  hand: 'left',  row: 1 },
  { id: 'w', latin: 'w', hindi: 'ै', shift: 'ॆ',  finger: 'ring',   hand: 'left',  row: 1 },
  { id: 'e', latin: 'e', hindi: 'ा', shift: 'आ',  finger: 'middle', hand: 'left',  row: 1 },
  { id: 'r', latin: 'r', hindi: 'ि', shift: 'इ',  finger: 'index',  hand: 'left',  row: 1 },
  { id: 't', latin: 't', hindi: 'ी', shift: 'ई',  finger: 'index',  hand: 'left',  row: 1 },
  { id: 'y', latin: 'y', hindi: 'ु', shift: 'उ',  finger: 'index',  hand: 'right', row: 1 },
  { id: 'u', latin: 'u', hindi: 'ू', shift: 'ऊ',  finger: 'index',  hand: 'right', row: 1 },
  { id: 'i', latin: 'i', hindi: 'ब', shift: 'भ',  finger: 'middle', hand: 'right', row: 1 },
  { id: 'o', latin: 'o', hindi: 'ह', shift: 'ङ',  finger: 'ring',   hand: 'right', row: 1 },
  { id: 'p', latin: 'p', hindi: 'ग', shift: 'घ',  finger: 'pinky',  hand: 'right', row: 1 },
  { id: 'lbracket', latin: '[', hindi: 'द', shift: 'ध', finger: 'pinky', hand: 'right', row: 1 },
  { id: 'rbracket', latin: ']', hindi: 'ज', shift: 'झ', finger: 'pinky', hand: 'right', row: 1 },
  { id: 'backslash', latin: '\\', hindi: 'ड', shift: 'ढ', finger: 'pinky', hand: 'right', row: 1 },

  // ── Home row (row 2) ──
  { id: 'a', latin: 'a', hindi: 'ो', shift: 'ऒ',  finger: 'pinky',  hand: 'left',  row: 2 },
  { id: 's', latin: 's', hindi: 'े', shift: 'ऍ',  finger: 'ring',   hand: 'left',  row: 2 },
  { id: 'd', latin: 'd', hindi: '् ', shift: 'अ',  finger: 'middle', hand: 'left',  row: 2 },
  { id: 'f', latin: 'f', hindi: 'ि', shift: 'इ',  finger: 'index',  hand: 'left',  row: 2 },
  { id: 'g', latin: 'g', hindi: 'ु', shift: 'उ',  finger: 'index',  hand: 'left',  row: 2 },
  { id: 'h', latin: 'h', hindi: 'प', shift: 'फ',  finger: 'index',  hand: 'right', row: 2 },
  { id: 'j', latin: 'j', hindi: 'र', shift: 'ऱ',  finger: 'index',  hand: 'right', row: 2 },
  { id: 'k', latin: 'k', hindi: 'क', shift: 'ख',  finger: 'middle', hand: 'right', row: 2 },
  { id: 'l', latin: 'l', hindi: 'त', shift: 'थ',  finger: 'ring',   hand: 'right', row: 2 },
  { id: 'semicolon', latin: ';', hindi: 'च', shift: 'छ', finger: 'pinky', hand: 'right', row: 2 },
  { id: 'quote',     latin: "'", hindi: 'ट', shift: 'ठ', finger: 'pinky', hand: 'right', row: 2 },

  // ── Bottom row (row 3) ──
  { id: 'z', latin: 'z', hindi: 'ैं', shift: 'ॆ', finger: 'pinky',  hand: 'left',  row: 3 },
  { id: 'x', latin: 'x', hindi: 'ं', shift: 'ँ',  finger: 'ring',   hand: 'left',  row: 3 },
  { id: 'c', latin: 'c', hindi: 'म', shift: 'ण',  finger: 'middle', hand: 'left',  row: 3 },
  { id: 'v', latin: 'v', hindi: 'न', shift: 'ञ',  finger: 'index',  hand: 'left',  row: 3 },
  { id: 'b', latin: 'b', hindi: 'व', shift: 'ऋ',  finger: 'index',  hand: 'left',  row: 3 },
  { id: 'n', latin: 'n', hindi: 'ल', shift: 'ळ',  finger: 'index',  hand: 'right', row: 3 },
  { id: 'm', latin: 'm', hindi: 'स', shift: 'श',  finger: 'index',  hand: 'right', row: 3 },
  { id: 'comma',  latin: ',', hindi: ',', shift: 'ष', finger: 'middle', hand: 'right', row: 3 },
  { id: 'period', latin: '.', hindi: '।', shift: 'ञ', finger: 'ring',   hand: 'right', row: 3 },
  { id: 'slash',  latin: '/', hindi: 'य', shift: 'य', finger: 'pinky',  hand: 'right', row: 3 },

  // ── Space ──
  { id: 'space', latin: ' ', hindi: ' ', shift: ' ', finger: 'thumb', hand: 'both', row: 4 },
];

// Build quick lookup: hindi char → key info
export const HINDI_TO_KEY = {};
INSCRIPT_LAYOUT.forEach(key => {
  if (key.hindi) HINDI_TO_KEY[key.hindi] = key;
  if (key.shift) HINDI_TO_KEY[key.shift] = { ...key, needsShift: true };
});

// Keyboard row structure for display
export const KEYBOARD_ROWS = [
  // Row 0: Number row
  ['backtick','1','2','3','4','5','6','7','8','9','0','minus','equals'],
  // Row 1: QWERTY
  ['q','w','e','r','t','y','u','i','o','p','lbracket','rbracket','backslash'],
  // Row 2: Home row
  ['a','s','d','f','g','h','j','k','l','semicolon','quote'],
  // Row 3: Bottom
  ['z','x','c','v','b','n','m','comma','period','slash'],
  // Row 4: Space
  ['space'],
];
