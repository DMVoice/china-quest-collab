// ============================================================
// FOOD DATA — 26 items extracted from the Chinese teaching deck
// "chinese food.pptx". Each entry includes:
//   - real image from the teaching materials
//   - 中文 name + pīnyīn + English
//   - color theme for the card
//   - short description used in Browse mode
// Categories: fruit (default) / drink / baked
// ============================================================

export const FOODS = [
  { id: "apple",       zh: "苹果",   pinyin: "píngguǒ",   en: "Apple",       emoji: "🍎", image: "/images/foods/apple.png",       color: "#FFE3E0", accent: "#C0463B", category: "fruit",
    description: "Crunchy red fruit. A favorite snack in Chinese homes." },
  { id: "watermelon",  zh: "西瓜",   pinyin: "xīguā",     en: "Watermelon",  emoji: "🍉", image: "/images/foods/watermelon.png",  color: "#E7F7D8", accent: "#3F8A48", category: "fruit",
    description: "Sweet summer melon. The name means 'western melon'." },
  { id: "banana",      zh: "香蕉",   pinyin: "xiāngjiāo", en: "Banana",      emoji: "🍌", image: "/images/foods/banana.png",      color: "#FFF6D0", accent: "#B89028", category: "fruit",
    description: "'Fragrant banana' in Chinese — its name comes from the smell." },
  { id: "grape",       zh: "葡萄",   pinyin: "pútáo",     en: "Grape",       emoji: "🍇", image: "/images/foods/grape.png",       color: "#EFE0F2", accent: "#7242A2", category: "fruit",
    description: "Comes in bunches — purple, green, or red." },
  { id: "orange",      zh: "橘子",   pinyin: "júzi",      en: "Orange",      emoji: "🍊", image: "/images/foods/orange.jpg",      color: "#FFEAD3", accent: "#C8722A", category: "fruit",
    description: "Bright and citrusy. A symbol of luck during New Year." },
  { id: "strawberry",  zh: "草莓",   pinyin: "cǎoméi",    en: "Strawberry",  emoji: "🍓", image: "/images/foods/strawberry.png",  color: "#FFE0E4", accent: "#C04054", category: "fruit",
    description: "'Grass berry' — small, red, sweet, and very fragrant." },
  { id: "pear",        zh: "梨",     pinyin: "lí",        en: "Pear",        emoji: "🍐", image: "/images/foods/pear.png",        color: "#EFF7DC", accent: "#5E883B", category: "fruit",
    description: "Crisp and juicy. Sharing one is unlucky — it sounds like 'parting'!" },
  { id: "peach",       zh: "桃子",   pinyin: "táozi",     en: "Peach",       emoji: "🍑", image: "/images/foods/peach.png",       color: "#FFE4DA", accent: "#C46955", category: "fruit",
    description: "Symbol of long life and good wishes in Chinese culture." },
  { id: "lychee",      zh: "荔枝",   pinyin: "lìzhī",     en: "Lychee",      emoji: "🍒", image: "/images/foods/lychee.png",      color: "#FFE0DC", accent: "#B53A52", category: "fruit",
    description: "Bumpy red skin, sweet white fruit inside. Loved by emperors." },
  { id: "cherry",      zh: "樱桃",   pinyin: "yīngtáo",   en: "Cherry",      emoji: "🍒", image: "/images/foods/cherry.png",      color: "#FBDDDF", accent: "#B23448", category: "fruit",
    description: "Tiny red fruit with a stone inside. Sweet and tart." },
  { id: "pineapple",   zh: "菠萝",   pinyin: "bōluó",     en: "Pineapple",   emoji: "🍍", image: "/images/foods/pineapple.png",   color: "#FFF1C2", accent: "#A88420", category: "fruit",
    description: "Spiky outside, golden and tangy inside." },
  { id: "hami-melon",  zh: "哈密瓜", pinyin: "hāmìguā",   en: "Hami melon",  emoji: "🍈", image: "/images/foods/hami-melon.png",  color: "#FFF0D6", accent: "#B68A2F", category: "fruit",
    description: "Famous melon from Xinjiang — extra sweet and juicy." },
  { id: "kiwi",        zh: "猕猴桃", pinyin: "míhóutáo",  en: "Kiwi",        emoji: "🥝", image: "/images/foods/kiwi.png",        color: "#E6F2D6", accent: "#5E8A38", category: "fruit",
    description: "'Monkey peach' — fuzzy outside, bright green inside." },
  { id: "papaya",      zh: "木瓜",   pinyin: "mùguā",     en: "Papaya",      emoji: "🍈", image: "/images/foods/papaya.jpg",      color: "#FFE8CF", accent: "#C57530", category: "fruit",
    description: "'Wood melon' — bright orange flesh, mild sweet flavor." },
  { id: "pomegranate", zh: "石榴",   pinyin: "shíliu",    en: "Pomegranate", emoji: "🌰", image: "/images/foods/pomegranate.jpg", color: "#FFE0DA", accent: "#B0432C", category: "fruit",
    description: "Full of ruby seeds. Means many children and good fortune." },
  { id: "apricot",     zh: "杏",     pinyin: "xìng",      en: "Apricot",     emoji: "🍑", image: "/images/foods/apricot.jpg",     color: "#FFEBD3", accent: "#C0772E", category: "fruit",
    description: "Like a small peach. Often dried for snacks." },
  { id: "lemon",       zh: "柠檬",   pinyin: "níngméng",  en: "Lemon",       emoji: "🍋", image: "/images/foods/lemon.jpg",       color: "#FFF7C8", accent: "#9A8420", category: "fruit",
    description: "Very sour! Used in tea, drinks, and cooking." },
  { id: "plum",        zh: "李子",   pinyin: "lǐzi",      en: "Plum",        emoji: "🍑", image: "/images/foods/plum.jpg",        color: "#F1DCE8", accent: "#823A60", category: "fruit",
    description: "Small purple or yellow fruit, sweet-tart." },
  { id: "loquat",      zh: "枇杷",   pinyin: "pípá",      en: "Loquat",      emoji: "🍑", image: "/images/foods/loquat.jpg",      color: "#FFEDC5", accent: "#A6772A", category: "fruit",
    description: "Yellow-orange spring fruit — also used in cough syrup!" },
  { id: "mulberry",    zh: "桑椹",   pinyin: "sāngshèn",  en: "Mulberry",    emoji: "🫐", image: "/images/foods/mulberry.jpg",    color: "#E8DDED", accent: "#4F2F6A", category: "fruit",
    description: "Tiny dark berries from the silkworm's favorite tree." },
  { id: "persimmon",   zh: "柿子",   pinyin: "shìzi",     en: "Persimmon",   emoji: "🍅", image: "/images/foods/persimmon.jpg",   color: "#FFE0CC", accent: "#B25420", category: "fruit",
    description: "Orange and very sweet when ripe. A fall favorite." },
  { id: "fig",         zh: "无花果", pinyin: "wúhuāguǒ",  en: "Fig",         emoji: "🍈", image: "/images/foods/fig.jpg",         color: "#F0E2D2", accent: "#7A4A2A", category: "fruit",
    description: "'No-flower fruit' — its flowers hide inside!" },
  { id: "jujube",      zh: "枣",     pinyin: "zǎo",       en: "Jujube",      emoji: "🌰", image: "/images/foods/jujube.jpg",      color: "#F4DACE", accent: "#8E3A24", category: "fruit",
    description: "Chinese red date. Dried and eaten in soups and tea." },
  { id: "blueberry",   zh: "蓝莓",   pinyin: "lánméi",    en: "Blueberry",   emoji: "🫐", image: "/images/foods/blueberry.jpg",   color: "#DEE3F2", accent: "#324F8A", category: "fruit",
    description: "Tiny blue berries, sweet and packed with antioxidants." },
  { id: "milk",        zh: "牛奶",   pinyin: "niúnǎi",    en: "Milk",        emoji: "🥛", image: "/images/foods/milk.png",        color: "#F5F3EC", accent: "#7A6E5A", category: "drink",
    description: "'Cow milk' in Chinese. A common breakfast drink." },
  { id: "bread",       zh: "面包",   pinyin: "miànbāo",   en: "Bread",       emoji: "🍞", image: "/images/foods/bread.png",       color: "#FFE8C8", accent: "#A6722A", category: "baked",
    description: "'Wheat wrap' — soft, fluffy, perfect for breakfast." },
];

// Helper: Build a quiz round — given correct item, return 4 shuffled options including correct
export function quizOptionsFor(correctItem, all = FOODS, n = 4) {
  const distractors = all.filter((x) => x.id !== correctItem.id);
  // Fisher–Yates
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  const opts = [correctItem, ...distractors.slice(0, n - 1)];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}
