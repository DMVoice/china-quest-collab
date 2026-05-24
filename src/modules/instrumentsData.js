// ============================================================
// INSTRUMENTS DATA — 12 traditional Chinese instruments
// Real photos: /public/images/instruments/
//   - 08/11/14/15  from the 乐器.ppt teaching deck
//   - 20-27        from Wikimedia Commons (free license)
// Grouped: 弹拨 plucked · 拉弦 bowed · 吹管 wind · 打击 percussion
// ============================================================

const PALETTE = {
  plucked:    { color: "#FBEEDB", accent: "#A26835" }, // warm wood
  bowed:      { color: "#F8E2DE", accent: "#A04A3B" }, // red wood
  wind:       { color: "#E8F2E0", accent: "#5C8348" }, // bamboo green
  percussion: { color: "#FFF1CC", accent: "#A6792C" }, // bronze
};

export const INSTRUMENTS = [
  // ── 弹拨 Plucked ──────────────────────────────
  {
    id: "pipa",
    zh: "琵琶",
    pinyin: "pí pá",
    name: "Pipa",
    en: "Pear-shaped lute",
    category: "弹拨 · Plucked lute",
    img: "/images/instruments/15_琵琶.jpg",
    ...PALETTE.plucked,
    description: "A pear-shaped lute with four strings, played upright on the lap by plucking with the fingers.",
    question: "What shape is the body of a pipa?",
    options: ["Pear-shaped", "Triangle", "Square"],
    answer: "Pear-shaped",
    feedback: "Yes! That classic pear shape is unmistakable.",
  },
  {
    id: "guzheng",
    zh: "古筝",
    pinyin: "gǔ zhēng",
    name: "Guzheng",
    en: "Long bridge zither",
    category: "弹拨 · Plucked zither",
    img: "/images/instruments/20_guzheng.jpg",
    ...PALETTE.plucked,
    description: "A long zither with 21 strings and movable bridges — its flowing sound is loved in solo music.",
    question: "How many strings does a modern guzheng usually have?",
    options: ["21", "4", "88"],
    answer: "21",
    feedback: "Right! 21 strings tuned in a pentatonic scale.",
  },
  {
    id: "guqin",
    zh: "古琴",
    pinyin: "gǔ qín",
    name: "Guqin",
    en: "Seven-string zither",
    category: "弹拨 · Plucked zither",
    img: "/images/instruments/21_guqin.jpg",
    ...PALETTE.plucked,
    description: "A slim seven-string zither played by scholars for over 3,000 years — a symbol of refined learning.",
    question: "How long has the guqin been played in China?",
    options: ["Over 3,000 years", "About 50 years", "Around 300 years"],
    answer: "Over 3,000 years",
    feedback: "Yes! It's one of China's most ancient instruments.",
  },
  {
    id: "yangqin",
    zh: "扬琴",
    pinyin: "yáng qín",
    name: "Yangqin",
    en: "Hammered dulcimer",
    category: "弹拨 · Hammered dulcimer",
    img: "/images/instruments/08_扬琴.jpg",
    ...PALETTE.plucked,
    description: "A hammered dulcimer — you tap the many strings with two light bamboo mallets.",
    question: "How is the yangqin played?",
    options: ["Tap the strings with bamboo mallets", "Blow into a mouthpiece", "Bow it like a violin"],
    answer: "Tap the strings with bamboo mallets",
    feedback: "Right! Two light mallets make its sparkling sound.",
  },

  // ── 拉弦 Bowed ────────────────────────────────
  {
    id: "erhu",
    zh: "二胡",
    pinyin: "èr hú",
    name: "Erhu",
    en: "Two-string fiddle",
    category: "拉弦 · Bowed fiddle",
    img: "/images/instruments/14_二胡.jpg",
    ...PALETTE.bowed,
    description: "A two-string fiddle whose singing voice can sound almost human.",
    question: "How many strings does the erhu have?",
    options: ["Two", "Six", "Twelve"],
    answer: "Two",
    feedback: "Right! 二 means 'two' — just two strings and a bow.",
  },

  // ── 吹管 Wind ─────────────────────────────────
  {
    id: "dizi",
    zh: "笛子",
    pinyin: "dí zi",
    name: "Dizi",
    en: "Bamboo flute",
    category: "吹管 · Bamboo flute",
    img: "/images/instruments/11_笛子.jpg",
    ...PALETTE.wind,
    description: "A bamboo flute with a thin paper-like membrane that gives it a bright, buzzing voice.",
    question: "What gives the dizi its special bright tone?",
    options: ["A buzzing membrane (笛膜)", "Metal strings", "An electric pickup"],
    answer: "A buzzing membrane (笛膜)",
    feedback: "Yes! The 笛膜 membrane is the secret to its voice.",
  },
  {
    id: "suona",
    zh: "唢呐",
    pinyin: "suǒ nà",
    name: "Suona",
    en: "Double-reed horn",
    category: "吹管 · Double-reed horn",
    img: "/images/instruments/22_suona.jpg",
    ...PALETTE.wind,
    description: "A loud, bright double-reed horn — the star of weddings, parades and village festivals.",
    question: "Where would you most likely hear a suona?",
    options: ["At a lively wedding or festival", "In a quiet library", "Underwater"],
    answer: "At a lively wedding or festival",
    feedback: "Right! Its bold sound carries over a whole crowd.",
  },
  {
    id: "sheng",
    zh: "笙",
    pinyin: "shēng",
    name: "Sheng",
    en: "Mouth organ",
    category: "吹管 · Mouth organ",
    img: "/images/instruments/23_sheng.jpg",
    ...PALETTE.wind,
    description: "A mouth organ made of many vertical pipes — one of the world's oldest free-reed instruments.",
    question: "What does the sheng look like?",
    options: ["A cluster of vertical pipes", "A single round drum", "A flat wooden board"],
    answer: "A cluster of vertical pipes",
    feedback: "Yes! Blowing and drawing air makes its pipes sing together.",
  },
  {
    id: "hulusi",
    zh: "葫芦丝",
    pinyin: "hú lu sī",
    name: "Hulusi",
    en: "Gourd flute",
    category: "吹管 · Gourd flute",
    img: "/images/instruments/25_hulusi.jpg",
    ...PALETTE.wind,
    description: "A gentle gourd flute from Yunnan — a dried gourd on top feeds air to its bamboo pipes.",
    question: "What is the top of a hulusi made from?",
    options: ["A dried gourd", "A glass bottle", "A metal can"],
    answer: "A dried gourd",
    feedback: "Right! 葫芦 means 'gourd' — that's where the name comes from.",
  },

  // ── 打击 Percussion ───────────────────────────
  {
    id: "luo",
    zh: "锣",
    pinyin: "luó",
    name: "Luo (Gong)",
    en: "Bronze gong",
    category: "打击 · Gong",
    img: "/images/instruments/27_luo.jpg",
    ...PALETTE.percussion,
    description: "A round bronze gong struck with a soft mallet — its big sound rings out at celebrations.",
    question: "How do you play the luo (gong)?",
    options: ["Strike it with a mallet", "Pluck its strings", "Blow into it"],
    answer: "Strike it with a mallet",
    feedback: "Yes! A soft mallet brings out its booming voice.",
  },
  {
    id: "drum",
    zh: "鼓",
    pinyin: "gǔ",
    name: "Drum",
    en: "Festival drum",
    category: "打击 · Drum",
    img: "/images/instruments/26_drum.jpg",
    ...PALETTE.percussion,
    description: "Chinese drums keep the beat for dragon dances, festivals and opera — struck with wooden sticks.",
    question: "What are Chinese drums often used for?",
    options: ["Keeping the beat at festivals & dances", "Telling the time", "Cooking food"],
    answer: "Keeping the beat at festivals & dances",
    feedback: "Right! The drumbeat drives dragon and lion dances.",
  },
  {
    id: "bianzhong",
    zh: "编钟",
    pinyin: "biān zhōng",
    name: "Bianzhong",
    category: "打击 · Bronze bells",
    img: "/images/instruments/24_bianzhong.jpg",
    ...PALETTE.percussion,
    description: "A set of ancient bronze bells hung in a row — each bell rings a different note when struck.",
    question: "What makes a set of bianzhong special?",
    options: ["Each bell plays a different note", "They are all the same note", "They have strings inside"],
    answer: "Each bell plays a different note",
    feedback: "Yes! A 2,400-year-old set was found in the tomb of Marquis Yi of Zeng.",
  },
];

// Pick `n` shuffled distinct options including the correct one
export function quizOptionsFor(correctItem, all = INSTRUMENTS, n = 4) {
  const others = all.filter((x) => x.id !== correctItem.id);
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  const picks = [correctItem, ...others.slice(0, n - 1)];
  for (let i = picks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [picks[i], picks[j]] = [picks[j], picks[i]];
  }
  return picks;
}
