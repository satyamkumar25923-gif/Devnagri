// Structured lesson data for Devanagari Hindi typing
// Each lesson has: id, title, description, level, characters, exercises

export const LESSONS = [
  // ── Level 1: Basic Vowels ──
  {
    id: 'L1',
    title: 'स्वर – Basic Vowels',
    titleEn: 'Basic Vowels',
    description: 'हिंदी के मूल स्वर सीखें',
    descriptionEn: 'Learn the fundamental Hindi vowels',
    level: 1,
    category: 'vowels',
    unlocked: true,
    characters: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
    exercises: [
      { type: 'single', chars: ['अ', 'आ', 'अ', 'आ', 'अ', 'आ'] },
      { type: 'single', chars: ['इ', 'ई', 'इ', 'ई', 'इ', 'ई'] },
      { type: 'single', chars: ['उ', 'ऊ', 'उ', 'ऊ'] },
      { type: 'word', words: ['अब', 'आम', 'ईख'] },
    ],
  },
  {
    id: 'L2',
    title: 'व्यंजन – Home Row Right',
    titleEn: 'Home Row – Right Hand',
    description: 'दाहिने हाथ की होम रो सीखें: क, त, र, प, च',
    descriptionEn: 'Right hand home row: क, त, र, प, च',
    level: 1,
    category: 'consonants',
    unlocked: true,
    characters: ['क', 'त', 'र', 'प', 'च'],
    exercises: [
      { type: 'single', chars: ['क', 'क', 'त', 'त', 'र', 'र', 'प', 'प', 'च', 'च'] },
      { type: 'word', words: ['कप', 'तक', 'पर', 'कर'] },
      { type: 'word', words: ['रात', 'पात', 'कात', 'तार'] },
    ],
  },
  {
    id: 'L3',
    title: 'व्यंजन – Home Row Left',
    titleEn: 'Home Row – Left Hand',
    description: 'बाएं हाथ की होम रो: म, न, व',
    descriptionEn: 'Left hand home row: म, न, व',
    level: 1,
    category: 'consonants',
    unlocked: false,
    characters: ['म', 'न', 'व', 'स', 'ल'],
    exercises: [
      { type: 'single', chars: ['म', 'म', 'न', 'न', 'व', 'व', 'स', 'स', 'ल', 'ल'] },
      { type: 'word', words: ['नम', 'मन', 'वन', 'नल'] },
      { type: 'word', words: ['माल', 'नाम', 'वाम', 'सम'] },
    ],
  },

  // ── Level 2: Matras ──
  {
    id: 'L4',
    title: 'मात्राएं – aa & i Matras',
    titleEn: 'Matras: ा और ि',
    description: 'आ और इ की मात्राएं सीखें',
    descriptionEn: 'Practice ा (aa) and ि (i) matras',
    level: 2,
    category: 'matras',
    unlocked: false,
    characters: ['ा', 'ि'],
    exercises: [
      { type: 'word', words: ['काम', 'राम', 'दाम', 'नाम', 'माम'] },
      { type: 'word', words: ['किला', 'मिला', 'दिल', 'बिल'] },
    ],
  },
  {
    id: 'L5',
    title: 'मात्राएं – ii, u & uu Matras',
    titleEn: 'Matras: ी, ु, ू',
    description: 'ई, उ, ऊ की मात्राएं सीखें',
    descriptionEn: 'Practice ी (ii), ु (u) and ू (uu) matras',
    level: 2,
    category: 'matras',
    unlocked: false,
    characters: ['ी', 'ु', 'ू'],
    exercises: [
      { type: 'word', words: ['नदी', 'कदी', 'गली', 'थाली'] },
      { type: 'word', words: ['कुल', 'धुल', 'मुझ', 'तुम'] },
      { type: 'word', words: ['भूल', 'धूल', 'मूल', 'फूल'] },
    ],
  },
  {
    id: 'L6',
    title: 'मात्राएं – e & o Matras',
    titleEn: 'Matras: े, ो',
    description: 'ए और ओ की मात्राएं सीखें',
    descriptionEn: 'Practice े (e) and ो (o) matras',
    level: 2,
    category: 'matras',
    unlocked: false,
    characters: ['े', 'ो'],
    exercises: [
      { type: 'word', words: ['केला', 'मेला', 'खेल', 'बेल'] },
      { type: 'word', words: ['मोर', 'तोर', 'भोर', 'चोर'] },
    ],
  },

  // ── Level 3: Common Words ──
  {
    id: 'L7',
    title: 'सामान्य शब्द – Everyday Words',
    titleEn: 'Common Words',
    description: 'रोज़मर्रा के सामान्य हिंदी शब्द',
    descriptionEn: 'Common everyday Hindi words',
    level: 3,
    category: 'words',
    unlocked: false,
    characters: [],
    exercises: [
      {
        type: 'word',
        words: ['नमस्ते', 'धन्यवाद', 'पानी', 'खाना', 'घर', 'परिवार'],
      },
      {
        type: 'word',
        words: ['काम', 'समय', 'दिन', 'रात', 'सुबह', 'शाम'],
      },
    ],
  },
  {
    id: 'L8',
    title: 'शब्द – More Words',
    titleEn: 'More Hindi Words',
    description: 'और अधिक हिंदी शब्द सीखें',
    descriptionEn: 'Expand your Hindi vocabulary',
    level: 3,
    category: 'words',
    unlocked: false,
    characters: [],
    exercises: [
      {
        type: 'word',
        words: ['विद्यालय', 'पुस्तक', 'शिक्षक', 'छात्र', 'पढ़ना', 'लिखना'],
      },
    ],
  },

  // ── Level 4: Sentences ──
  {
    id: 'L9',
    title: 'वाक्य – Simple Sentences',
    titleEn: 'Simple Sentences',
    description: 'सरल हिंदी वाक्य टाइप करना सीखें',
    descriptionEn: 'Type simple Hindi sentences',
    level: 4,
    category: 'sentences',
    unlocked: false,
    characters: [],
    exercises: [
      {
        type: 'sentence',
        text: 'राम घर जाता है।',
      },
      {
        type: 'sentence',
        text: 'पानी पीना अच्छा है।',
      },
      {
        type: 'sentence',
        text: 'मैं हिंदी सीख रहा हूं।',
      },
    ],
  },
  {
    id: 'L10',
    title: 'वाक्य – Daily Sentences',
    titleEn: 'Daily Life Sentences',
    description: 'दैनिक जीवन के वाक्य',
    descriptionEn: 'Sentences from daily life',
    level: 4,
    category: 'sentences',
    unlocked: false,
    characters: [],
    exercises: [
      { type: 'sentence', text: 'आज मौसम बहुत अच्छा है।' },
      { type: 'sentence', text: 'बच्चे बगीचे में खेल रहे हैं।' },
      { type: 'sentence', text: 'हमारा देश भारत महान है।' },
    ],
  },
];

// Practice mode word pool
export const PRACTICE_WORDS = [
  // 2-3 letter basic words
  'कर', 'पर', 'घर', 'मन', 'तन', 'धन', 'वन', 'जन', 'रण', 'गण',
  // 4-5 letter words
  'काम', 'राम', 'दाम', 'नाम', 'माम', 'धाम', 'शाम', 'थाम',
  'किला', 'मिला', 'दिल', 'बिल', 'मिल', 'खिल', 'तिल', 'जिल',
  'केला', 'मेला', 'खेल', 'बेल', 'गेल', 'पेल', 'झेल', 'ढेल',
  // Common words
  'पानी', 'नानी', 'दानी', 'खानी', 'मानी', 'रानी', 'कानी',
  'फूल', 'भूल', 'धूल', 'मूल', 'कूल', 'जूल', 'तूल',
  'नमक', 'सफर', 'कमल', 'सरल', 'तरल', 'मरल',
  // More complex
  'नमस्ते', 'धन्यवाद', 'परिवार', 'विद्यार्थी', 'पुस्तक',
  'समाचार', 'शिक्षण', 'प्रयास', 'सफलता', 'महत्व',
  'भारत', 'हिंदी', 'संस्कृत', 'योग', 'आयुर्वेद',
];

// Practice sentences
export const PRACTICE_SENTENCES = [
  'राम घर जाता है।',
  'मेरा नाम रवि है।',
  'पानी पीना अच्छा है।',
  'आज मौसम बहुत अच्छा है।',
  'हम सब मिलकर काम करते हैं।',
  'शिक्षा ही सबसे बड़ा धन है।',
  'मैं हर दिन हिंदी टाइपिंग का अभ्यास करता हूं।',
  'बच्चे बगीचे में खेल रहे हैं।',
  'भारत एक महान देश है।',
  'ज्ञान ही शक्ति है।',
];
