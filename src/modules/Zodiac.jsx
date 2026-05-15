import { useState, useRef, useEffect } from "react";

const INK = "#1a0f0a";
const PAPER = "#f4e8d0";
const PAPER_DEEP = "#e8d5a8";
const VERMILION = "#b8261a";
const VERMILION_DEEP = "#8a1a12";
const GOLD = "#c9a04e";
const GOLD_BRIGHT = "#e8c468";

const ZODIAC_DATA = {
  Rat: {
    emoji:"🐭", zh:"鼠", years:[2020,2008,1996,1984,1972],
    element:"Wisdom · Water / 智 · 水",
    traits:[
      ["Quick-Witted","Sharp and resourceful, you navigate complexity with stunning ease.","机敏过人 — 思维敏捷,反应迅速。"],
      ["Disciplined","Methodical and diligent, you turn the ordinary into the extraordinary.","勤勉自律 — 做事有条理,化平凡为不凡。"],
      ["Charming","A natural socialite, you thrive in any circle you enter.","人缘极佳 — 亲和力强,朋友众多。"],
      ["Visionary","Far-sighted and prepared, you always see what lies ahead.","富有远见 — 善于规划,未雨绸缪。"],
    ],
    poemEn:"Wit and Wisdom · Endless Blessings", poemZh:"机巧灵慧 · 福禄绵长",
    famous:[
      {year:1984,name:"LeBron James",tag:"NBA",known:"Lakers superstar · 4× NBA Champion · all-time leading scorer",image:"lebron-zodiac.jpeg"},
      {year:1996,name:"Zendaya",tag:"Film/TV",known:"Star of Euphoria, Spider-Man, and Dune",image:"zendaya-zodiac.jpeg"},
      {year:1984,name:"Mark Zuckerberg",tag:"Tech",known:"Founder & CEO of Meta (Facebook, Instagram)",image:"zuckerberg-zodiac.jpeg"},
    ],
  },
  Ox: {
    emoji:"🐂", zh:"牛", years:[2021,2009,1997,1985,1973],
    element:"Stability · Earth / 稳 · 土",
    traits:[
      ["Dependable","Steady and reliable — your word is your bond.","踏实可靠 — 一步一个脚印,值得托付。"],
      ["Resilient","Unshakable in adversity, growing stronger with every challenge.","坚韧不拔 — 逆境中愈发坚强。"],
      ["Honest","Upright and sincere, you earn trust through integrity.","诚实正直 — 言出必行,深得信赖。"],
      ["Generous","Big-hearted, you are the steadfast pillar your loved ones lean on.","宽厚仁慈 — 是家人最坚实的依靠。"],
    ],
    poemEn:"Diligent Virtue · Fortune as Mountains", poemZh:"勤恳厚德 · 福如山岳",
    famous:[
      {year:1985,name:"Cristiano Ronaldo",tag:"Soccer",known:"Portuguese soccer legend · 5× Ballon d'Or winner",image:"ronaldo-zodiac.jpeg"},
      {year:1997,name:"Jayson Tatum",tag:"NBA",known:"Boston Celtics All-Star · 2024 NBA Champion"},
      {year:1985,name:"Bruno Mars",tag:"Music",known:"Grammy-winning pop/R&B superstar"},
    ],
  },
  Tiger: {
    emoji:"🐯", zh:"虎", years:[2022,2010,1998,1986,1974],
    element:"Courage · Wood / 勇 · 木",
    traits:[
      ["Magnetic","A born leader with presence that draws every eye in the room.","气宇轩昂 — 天生王者气质,光彩照人。"],
      ["Fearless","Bold and decisive — first to charge into the unknown.","勇敢果决 — 敢为人先,开拓进取。"],
      ["Righteous","A guardian of justice, fierce protector of those in need.","正义凛然 — 守护弱小,是英雄。"],
      ["Passionate","Burning with fire, you ignite the spirit of everyone around you.","热情如火 — 点燃身边人的斗志。"],
    ],
    poemEn:"Roar of the Tiger · Power in All Directions", poemZh:"虎啸生风 · 威震八方",
    famous:[
      {year:1998,name:"Shai Gilgeous-Alexander",tag:"NBA",known:"OKC Thunder superstar · 2025 NBA MVP"},
      {year:1998,name:"Olivia Rodrigo",tag:"Music",known:'Grammy-winning singer of "drivers license", "vampire"'},
      {year:1986,name:"Lady Gaga",tag:"Music",known:"Pop icon · Oscar-winning singer and actress"},
    ],
  },
  Rabbit: {
    emoji:"🐰", zh:"兔", years:[2023,2011,1999,1987,1975],
    element:"Gentleness · Wood / 柔 · 木",
    traits:[
      ["Kind-Hearted","Gentle and warm — you bring sunshine wherever you go.","温柔善良 — 所到之处皆是温暖。"],
      ["Graceful","Refined and elegant, with effortless poise in every gesture.","优雅有礼 — 自带高雅气质。"],
      ["Perceptive","Tactful and intuitive, you read people and rooms with ease.","聪慧机敏 — 心思灵巧,处事圆融。"],
      ["Artistic","Blessed with exquisite taste and a natural creative gift.","艺术天赋 — 审美极佳,创作惊人。"],
    ],
    poemEn:"Jade Rabbit Rising · Peace and Longevity", poemZh:"玉兔东升 · 福寿安康",
    famous:[
      {year:1987,name:"Lionel Messi",tag:"Soccer",known:"Argentine soccer GOAT · 2022 World Cup Champion"},
      {year:1999,name:"Caitlin Clark",tag:"WNBA",known:"Indiana Fever star · revolutionized women's basketball"},
      {year:1999,name:"Billie Eilish",tag:"Music",known:'Grammy-winning singer · "bad guy", "What Was I Made For?"'},
    ],
  },
  Dragon: {
    emoji:"🐲", zh:"龙", years:[2024,2012,2000,1988,1976],
    element:"Majesty · Earth / 尊 · 土",
    traits:[
      ["Regal","Confident and charismatic — utterly unforgettable.","气势非凡 — 自信而充满魅力。"],
      ["Brilliant","Versatile and gifted, destined for remarkable achievements.","才华横溢 — 多才多艺,成就大事。"],
      ["Ambitious","You dream big, live larger, and walk a vast path in life.","雄心壮志 — 敢想敢做,格局广阔。"],
      ["Fortunate","Help arrives just when it matters most — fortune favors you.","幸运眷顾 — 常逢贵人相助。"],
    ],
    poemEn:"Dragon Soars · Grand Visions Unfold", poemZh:"龙腾四海 · 鸿图大展",
    famous:[
      {year:1988,name:"Stephen Curry",tag:"NBA",known:"Warriors legend · greatest shooter in NBA history"},
      {year:1988,name:"Rihanna",tag:"Music",known:"Music icon · Fenty Beauty founder · billionaire"},
      {year:2000,name:"Jennie",tag:"K-Pop",known:"BLACKPINK member · global fashion icon"},
    ],
  },
  Snake: {
    emoji:"🐍", zh:"蛇", years:[2025,2013,2001,1989,1977],
    element:"Wisdom · Fire / 智 · 火",
    traits:[
      ["Wise","Deeply insightful — you see clearly what others miss.","睿智深邃 — 看问题透彻,独到见解。"],
      ["Elegant","Mysteriously composed, graceful in every move you make.","神秘优雅 — 从容不迫,内敛有魅力。"],
      ["Intuitive","Blessed with a sixth sense that reads beneath every surface.","直觉敏锐 — 洞察人心与本质。"],
      ["Talented","A quiet master in scholarship, art, or craft.","才情兼备 — 学识艺术皆有造诣。"],
    ],
    poemEn:"Sacred Serpent · Heart of Jade", poemZh:"灵蛇献瑞 · 慧心如玉",
    famous:[
      {year:1989,name:"Taylor Swift",tag:"Music",known:"Pop superstar · Eras Tour broke every record imaginable"},
      {year:2001,name:"Jude Bellingham",tag:"Soccer",known:"Real Madrid & England midfielder superstar"},
      {year:1989,name:"Daniel Radcliffe",tag:"Film",known:"Played Harry Potter in all 8 films"},
    ],
  },
  Horse: {
    emoji:"🐴", zh:"马", years:[2026,2014,2002,1990,1978],
    element:"Freedom · Fire / 奔 · 火",
    traits:[
      ["Spirited","Vibrant and lively — your energy is wonderfully contagious.","热情奔放 — 充满活力,感染力强。"],
      ["Independent","Fiercely free-spirited, you boldly walk your own path.","自由独立 — 崇尚自由,有自己的世界。"],
      ["Decisive","A doer, not a dreamer — swift, clear, and unhesitating.","行动力强 — 雷厉风行,从不拖延。"],
      ["Optimistic","Sunny-hearted and resilient, you bounce back from anything.","乐观豁达 — 心态阳光,很快振作。"],
    ],
    poemEn:"Galloping Steed · Brilliant Horizons", poemZh:"骏马奔腾 · 前程似锦",
    famous:[
      {year:2002,name:"Paige Bueckers",tag:"WNBA",known:"Dallas Wings #1 pick · 2025 NCAA Champion at UConn"},
      {year:1990,name:"Jennifer Lawrence",tag:"Film",known:"Oscar-winning actress · The Hunger Games' Katniss"},
      {year:2002,name:"Emma Raducanu",tag:"Tennis",known:"2021 US Open Champion · British tennis star"},
    ],
  },
  Goat: {
    emoji:"🐑", zh:"羊", years:[2015,2003,1991,1979,1967],
    element:"Kindness · Earth / 善 · 土",
    traits:[
      ["Gentle","Soft as jade — peaceful and harmonious by nature.","温润如玉 — 性情温和,与人为善。"],
      ["Compassionate","Deeply caring, a safe haven for everyone in need.","富有同情 — 心地柔软,乐于助人。"],
      ["Artistic","Gifted with refined beauty and creative imagination.","艺术气质 — 审美卓越,具创造之美。"],
      ["Resilient","Soft outside, steel within — quietly unbreakable.","坚韧内秀 — 外柔内刚,藏不屈力量。"],
    ],
    poemEn:"Three Goats Bring Spring · All Wishes Granted", poemZh:"三阳开泰 · 吉祥如意",
    famous:[
      {year:2003,name:"Victor Wembanyama",tag:"NBA",known:'San Antonio Spurs phenom · 7\'4" rising superstar'},
      {year:2003,name:"Coco Gauff",tag:"Tennis",known:"2023 US Open Champion · top US tennis star"},
      {year:1991,name:"Ed Sheeran",tag:"Music",known:'Singer-songwriter of "Shape of You", "Perfect"'},
    ],
  },
  Monkey: {
    emoji:"🐵", zh:"猴", years:[2016,2004,1992,1980,1968],
    element:"Cleverness · Metal / 灵 · 金",
    traits:[
      ["Brilliant","Genius-level quick, mastering anything with stunning speed.","聪明绝顶 — 反应极快,堪称天才。"],
      ["Witty","The life of any room — laughter follows you everywhere.","幽默风趣 — 走到哪里笑声便到哪里。"],
      ["Adaptable","Endlessly flexible, you seize every opportunity that arises.","灵活机变 — 善于把握时机。"],
      ["Curious","Eternally exploring — you live to discover new worlds.","好奇心强 — 永远在探索新事物。"],
    ],
    poemEn:"Golden Monkey · Boundless Cleverness", poemZh:"金猴献瑞 · 灵动通达",
    famous:[
      {year:2004,name:"Carlos Alcaraz",tag:"Tennis",known:"World #1 · multiple Grand Slam champion"},
      {year:1992,name:"Selena Gomez",tag:"Music/Film",known:"Singer · star of Only Murders in the Building"},
      {year:2004,name:"Sadie Sink",tag:"Film/TV",known:"Plays Max in Stranger Things"},
    ],
  },
  Rooster: {
    emoji:"🐔", zh:"鸡", years:[2017,2005,1993,1981,1969],
    element:"Diligence · Metal / 勤 · 金",
    traits:[
      ["Meticulous","Hardworking and precise — perfection is your standard.","勤奋认真 — 一丝不苟,追求尽善尽美。"],
      ["Honest","Straightforward and sincere, a true friend worth keeping.","正直坦荡 — 为人坦率,值得交心。"],
      ["Eloquent","Talented and expressive, you shine on every stage.","才华出众 — 善于表达,亮眼表现。"],
      ["Sharp-Eyed","Eagle-eyed for detail — nothing escapes your notice.","注重细节 — 任何瑕疵难逃法眼。"],
    ],
    poemEn:"Golden Rooster Crows · Bountiful Harvest", poemZh:"金鸡报晓 · 五谷丰登",
    famous:[
      {year:1993,name:"Ariana Grande",tag:"Music",known:"Pop superstar · star of Wicked"},
      {year:2005,name:"LaMelo Ball",tag:"NBA",known:"Charlotte Hornets All-Star point guard"},
      {year:1981,name:"Beyoncé",tag:"Music",known:"Music icon · most-Grammy-winning artist ever"},
    ],
  },
  Dog: {
    emoji:"🐶", zh:"狗", years:[2018,2006,1994,1982,1970],
    element:"Loyalty · Earth / 忠 · 土",
    traits:[
      ["Loyal","Devotedly faithful — the most reliable companion imaginable.","忠诚守信 — 是最可靠的伙伴。"],
      ["Brave","Courageous and just, you stand up for what is right.","正义勇敢 — 路见不平拔刀相助。"],
      ["Sincere","Kind-hearted and honest — you win every heart you meet.","真诚善良 — 以心换心,深得人心。"],
      ["Humble","Hardworking without complaint, never seeking personal gain.","踏实勤恳 — 任劳任怨,不计得失。"],
    ],
    poemEn:"Faithful Guardian · Peace and Joy", poemZh:"义犬护宅 · 平安喜乐",
    famous:[
      {year:1994,name:"Justin Bieber",tag:"Music",known:'Global pop star · "Baby", "Sorry", "Peaches"'},
      {year:2006,name:"Travis Hunter",tag:"NFL",known:"2024 Heisman winner · Jaguars two-way star"},
      {year:2006,name:"Finn Wolfhard",tag:"Film/TV",known:"Plays Mike in Stranger Things"},
    ],
  },
  Pig: {
    emoji:"🐷", zh:"猪", years:[2019,2007,1995,1983,1971],
    element:"Fortune · Water / 福 · 水",
    traits:[
      ["Generous","Big-hearted and warm — fortune naturally follows you.","宽厚善良 — 心胸开阔,自带福气。"],
      ["Genuine","Sincere and open, you make true friends everywhere.","真诚坦率 — 以真心换真心,朋友遍天下。"],
      ["Content","Joyfully grateful — you know how to truly live.","乐观知足 — 懂得享受生活,内心富足。"],
      ["Prosperous","Blessed with lasting abundance throughout your life.","财运绵长 — 一生衣食无忧。"],
    ],
    poemEn:"Golden Pig · Wealth and Honor", poemZh:"金猪纳福 · 富贵双全",
    famous:[
      {year:1995,name:"Patrick Mahomes",tag:"NFL",known:"Chiefs QB · 3× Super Bowl Champion"},
      {year:2007,name:"Millie Bobby Brown",tag:"Film/TV",known:"Eleven in Stranger Things · star of Enola Holmes"},
      {year:1995,name:"Gigi Hadid",tag:"Fashion",known:"Top supermodel · runway and Vogue cover star"},
    ],
  },
};

const ORDER = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];

function getCategoryIcons(tag) {
  const t = tag.toLowerCase();
  if (t.includes("nba"))     return { primary:"basketball", secondary:"star" };
  if (t.includes("wnba"))    return { primary:"basketball", secondary:"star" };
  if (t.includes("nfl"))     return { primary:"football",   secondary:"star" };
  if (t.includes("mlb"))     return { primary:"baseball",   secondary:"star" };
  if (t.includes("soccer"))  return { primary:"soccer",     secondary:"star" };
  if (t.includes("tennis"))  return { primary:"tennis",     secondary:"star" };
  if (t.includes("music") || t.includes("k-pop")) return { primary:"music", secondary:"note" };
  if (t.includes("film") || t.includes("tv"))     return { primary:"film",  secondary:"star" };
  if (t.includes("fashion")) return { primary:"diamond", secondary:"star" };
  if (t.includes("tech"))    return { primary:"circuit",  secondary:"star" };
  return { primary:"star", secondary:"note" };
}

const ICON_SVG = {
  basketball:'<circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 18 H32 M18 4 V32 M8 8 Q18 18 8 28 M28 8 Q18 18 28 28" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  football:'<ellipse cx="18" cy="18" rx="14" ry="9" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-30 18 18)"/><path d="M11 18 L25 18 M14 16 L14 20 M18 15 L18 21 M22 16 L22 20" stroke="currentColor" stroke-width="1.5" transform="rotate(-30 18 18)"/>',
  baseball:'<circle cx="18" cy="18" r="13" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10 Q14 18 8 26 M28 10 Q22 18 28 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>',
  soccer:'<circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 8 L23 13 L21 19 L15 19 L13 13 Z M18 8 L18 4 M23 13 L29 11 M21 19 L25 24 M15 19 L11 24 M13 13 L7 11" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  tennis:'<circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 12 Q18 22 31 12 M5 24 Q18 14 31 24" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  music:'<path d="M14 8 L26 6 L26 22 M14 8 L14 24 M14 24 Q14 28 11 28 Q8 28 8 25 Q8 22 11 22 Q14 22 14 24 Z M26 22 Q26 26 23 26 Q20 26 20 23 Q20 20 23 20 Q26 20 26 22 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/>',
  note:'<path d="M12 22 Q12 26 9 26 Q6 26 6 23 Q6 20 9 20 Q11 20 12 22 L12 8 L24 6 L24 18 Q24 22 21 22 Q18 22 18 19 Q18 16 21 16 Q23 16 24 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  film:'<rect x="5" y="9" width="26" height="18" fill="none" stroke="currentColor" stroke-width="2"/><rect x="7" y="11" width="4" height="3" fill="currentColor"/><rect x="7" y="16" width="4" height="3" fill="currentColor"/><rect x="7" y="21" width="4" height="3" fill="currentColor"/><rect x="25" y="11" width="4" height="3" fill="currentColor"/><rect x="25" y="16" width="4" height="3" fill="currentColor"/><rect x="25" y="21" width="4" height="3" fill="currentColor"/>',
  star:'<path d="M18 5 L21 14 L31 14 L23 20 L26 30 L18 24 L10 30 L13 20 L5 14 L15 14 Z" fill="currentColor"/>',
  diamond:'<path d="M18 4 L28 14 L18 32 L8 14 Z M8 14 L28 14 M14 14 L18 4 L22 14 M14 14 L18 32 L22 14" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  circuit:'<rect x="6" y="6" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="24" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="24" r="2" fill="currentColor"/><circle cx="24" cy="24" r="2" fill="currentColor"/><path d="M12 14 L12 22 M14 12 L22 12 M24 14 L24 22 M14 24 L22 24" stroke="currentColor" stroke-width="1.5"/>',
};

const ZODIAC_SVG = {
  Rat:'<path d="M10 18 Q10 10 18 10 Q26 10 26 18 Q26 24 22 26 L22 30 L14 30 L14 26 Q10 24 10 18 Z M14 16 L14 18 M22 16 L22 18 M14 24 L22 24 M8 14 Q4 12 6 18 M28 14 Q32 12 30 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Ox:'<path d="M8 18 Q4 14 8 10 Q12 6 18 8 Q24 6 28 10 Q32 14 28 18 Q28 26 22 28 L14 28 Q8 26 8 18 Z M14 18 L14 20 M22 18 L22 20 M16 24 L20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Tiger:'<path d="M10 16 Q10 8 18 8 Q26 8 26 16 Q26 24 18 28 Q10 24 10 16 Z M14 14 L15 17 M22 14 L21 17 M16 22 Q18 24 20 22 M8 10 Q4 8 6 12 M28 10 Q32 8 30 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Rabbit:'<path d="M12 20 Q12 12 18 12 Q24 12 24 20 Q24 26 18 28 Q12 26 12 20 Z M10 10 Q8 4 12 6 L14 14 M26 10 Q28 4 24 6 L22 14 M15 19 L15 21 M21 19 L21 21" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Dragon:'<path d="M6 20 Q10 14 16 16 Q20 12 24 16 Q30 14 30 20 Q28 24 22 22 Q20 26 18 24 Q14 26 12 22 Q8 24 6 20 Z M14 18 L14 20 M22 18 L22 20 M4 16 Q2 12 6 14 M32 16 Q34 12 30 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Snake:'<path d="M8 12 Q14 8 18 14 Q22 20 28 16 Q32 20 28 24 Q22 28 18 22 Q14 18 10 22 Q6 18 8 12 Z M10 11 L11 13 M12 10 L13 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Horse:'<path d="M8 28 Q8 18 14 14 Q12 8 18 8 Q22 8 22 12 Q28 14 28 22 L28 28 M14 18 L14 20 M11 12 L13 14 M16 12 L14 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>',
  Goat:'<path d="M12 18 Q12 10 18 10 Q24 10 24 18 Q24 26 18 28 Q12 26 12 18 Z M10 12 Q6 6 10 6 Q12 8 12 10 M26 12 Q30 6 26 6 Q24 8 24 10 M15 22 L15 26 M21 22 L21 26 M15 17 L15 19 M21 17 L21 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Monkey:'<path d="M10 16 Q10 8 18 8 Q26 8 26 16 Q26 22 22 24 Q20 28 18 28 Q16 28 14 24 Q10 22 10 16 Z M13 14 Q14 13 15 14 M21 14 Q22 13 23 14 M14 20 Q18 22 22 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Rooster:'<path d="M14 28 L14 18 Q10 16 12 12 Q10 8 14 10 Q16 6 18 8 Q22 6 22 12 Q26 14 22 18 L26 22 L22 22 L22 28 Z M16 14 L16 15 M14 22 L18 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>',
  Dog:'<path d="M10 20 Q10 14 14 12 Q12 8 16 8 L16 12 Q18 10 20 12 L20 8 Q24 8 22 12 Q26 14 26 20 Q26 26 18 28 Q10 26 10 20 Z M14 18 L14 19 M22 18 L22 19 M16 24 Q18 25 20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  Pig:'<path d="M8 18 Q8 10 18 10 Q28 10 28 18 Q28 26 18 28 Q8 26 8 18 Z M14 16 L14 18 M22 16 L22 18 M14 22 L22 22 M16 22 L16 24 M20 22 L20 24 M6 12 Q4 8 8 10 M30 12 Q32 8 28 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
};

function buildFrameSVG(zodiac, tag) {
  const cats = getCategoryIcons(tag);
  const zSvg = ZODIAC_SVG[zodiac] || "";
  const primarySvg = ICON_SVG[cats.primary] || ICON_SVG.star;
  return `
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffdf7"/>
        <stop offset="100%" stop-color="#f4e8d0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="360" height="360" fill="url(#bgGrad)"/>
    <rect x="10" y="10" width="340" height="340" fill="none" stroke="#c9a04e" stroke-width="0.8" opacity="0.5"/>
    <rect x="14" y="14" width="332" height="332" fill="none" stroke="#c9a04e" stroke-width="0.4" opacity="0.35"/>
    <g stroke="#b8261a" stroke-width="1.5" fill="none" opacity="0.8">
      <path d="M 4 24 L 4 4 L 24 4"/>
      <path d="M 336 4 L 356 4 L 356 24"/>
      <path d="M 4 336 L 4 356 L 24 356"/>
      <path d="M 336 356 L 356 356 L 356 336"/>
    </g>
    <g fill="#c9a04e" opacity="0.7">
      <circle cx="4" cy="4" r="2"/><circle cx="356" cy="4" r="2"/>
      <circle cx="4" cy="356" r="2"/><circle cx="356" cy="356" r="2"/>
    </g>
    <g transform="translate(164, 6)" color="#b8261a">
      <circle cx="16" cy="16" r="17" fill="#fffdf7" stroke="#c9a04e" stroke-width="0.8"/>
      <g transform="translate(-2, -2)" opacity="0.9">${zSvg}</g>
    </g>
    <g transform="translate(164, 322)" color="#b8261a">
      <circle cx="16" cy="16" r="17" fill="#fffdf7" stroke="#c9a04e" stroke-width="0.8"/>
      <g transform="translate(-2, -2)" opacity="0.85">${primarySvg}</g>
    </g>
    <g stroke="#c9a04e" stroke-width="0.6" opacity="0.5">
      <line x1="60" y1="22" x2="155" y2="22"/>
      <line x1="205" y1="22" x2="300" y2="22"/>
      <line x1="60" y1="338" x2="155" y2="338"/>
      <line x1="205" y1="338" x2="300" y2="338"/>
    </g>
    <g fill="#b8261a" opacity="0.5">
      <circle cx="55" cy="22" r="1.5"/><circle cx="305" cy="22" r="1.5"/>
      <circle cx="55" cy="338" r="1.5"/><circle cx="305" cy="338" r="1.5"/>
    </g>
  `;
}

const BASE = import.meta.env.BASE_URL;

async function loadPortrait(person, fallbackEmoji) {
  if (person.image) return { type:"img", url: BASE + "images/" + person.image };
  try {
    const title = encodeURIComponent(person.name.replace(/ /g, "_"));
    const resp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    if (resp.ok) {
      const data = await resp.json();
      if (data.thumbnail?.source) {
        return { type:"img", url: data.thumbnail.source.replace(/\/\d+px-/, "/640px-") };
      } else if (data.originalimage?.source) {
        return { type:"img", url: data.originalimage.source };
      }
    }
  } catch (_) {}
  return { type:"emoji", emoji: fallbackEmoji };
}

// ---- sub-components ----

function PersonModal({ person, zodiac, onClose }) {
  const data = ZODIAC_DATA[zodiac];
  const [portrait, setPortrait] = useState(null);

  useEffect(() => {
    setPortrait(null);
    loadPortrait(person, data.emoji).then(setPortrait);
  }, [person, zodiac]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const frameSVG = buildFrameSVG(zodiac, person.tag);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:"fixed", inset:0,
        background:"rgba(244,232,208,0.85)",
        backdropFilter:"blur(8px)",
        zIndex:500,
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:20,
        animation:"fadeIn 0.3s ease both",
      }}
    >
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes floatAnim { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
        @keyframes rise { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{
        background:"#fffdf7", width:"100%", maxWidth:360,
        position:"relative", padding:0,
        border:`1px solid rgba(201,160,78,0.4)`,
        boxShadow:"0 12px 40px rgba(138,26,18,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        animation:"scaleIn 0.4s cubic-bezier(0.2,0.8,0.2,1) both",
      }}>
        <button
          onClick={onClose}
          style={{
            position:"absolute", top:10, right:10, width:32, height:32,
            borderRadius:"50%", background:"rgba(255,253,247,0.92)",
            color:VERMILION, border:`1px solid rgba(201,160,78,0.5)`,
            fontSize:18, cursor:"pointer", zIndex:10,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}
        >×</button>

        {/* Portrait frame */}
        <div style={{ position:"relative", width:"100%", aspectRatio:"1",
          background:"linear-gradient(135deg,#fffdf7 0%,#f4e8d0 100%)", overflow:"hidden" }}>
          {/* SVG decorative overlay */}
          <svg
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:2,
              opacity: portrait?.type === "img" && person.image ? 0 : 1 }}
            viewBox="0 0 360 360" preserveAspectRatio="none"
            dangerouslySetInnerHTML={{ __html: frameSVG }}
          />
          {/* Portrait */}
          <div style={{
            position:"absolute", inset:24,
            backgroundSize: person.image ? "contain" : "cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition: person.image ? "center" : "center top",
            backgroundColor:PAPER_DEEP,
            border:`1px solid rgba(201,160,78,0.6)`,
            display:"flex", alignItems:"center", justifyContent:"center",
            backgroundImage: portrait?.type === "img" ? `url('${portrait.url}')` : "none",
          }}>
            {!portrait && (
              <div style={{
                width:32, height:32, borderRadius:"50%",
                border:`3px solid rgba(232,196,104,0.2)`,
                borderTopColor:GOLD_BRIGHT,
                animation:"spin 0.8s linear infinite",
              }}/>
            )}
            {portrait?.type === "emoji" && (
              <div style={{ color:VERMILION, textAlign:"center", padding:20, fontFamily:"'Cormorant Garamond',serif" }}>
                <div style={{ fontSize:64, marginBottom:8, lineHeight:1 }}>{portrait.emoji}</div>
                <div style={{ fontStyle:"italic", fontSize:13 }}>portrait unavailable</div>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding:"22px 24px 26px", textAlign:"center", position:"relative" }}>
          <div style={{
            position:"absolute", top:0, left:24, right:24, height:1,
            background:`linear-gradient(to right,transparent,${GOLD},transparent)`,
          }}/>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontStyle:"italic",
            fontSize:26, color:VERMILION_DEEP, letterSpacing:1, marginBottom:6, lineHeight:1.1,
          }}>{person.name}</div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <span style={{ background:INK, color:GOLD_BRIGHT, padding:"3px 10px",
              fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:13, letterSpacing:2 }}>
              {person.year}
            </span>
            <span style={{ background:VERMILION, color:PAPER, padding:"3px 10px",
              fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:12, letterSpacing:1.5 }}>
              {person.tag}
            </span>
          </div>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            background:PAPER_DEEP, border:`1px solid ${GOLD}`, padding:"4px 12px",
            fontFamily:"'Ma Shan Zheng',serif", fontSize:13, color:VERMILION_DEEP, letterSpacing:2,
            marginBottom:12,
          }}>
            <span style={{ fontSize:16 }}>{data.emoji}</span>
            <span>属{data.zh} · Year of the {zodiac}</span>
          </div>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
            fontSize:14, color:INK, opacity:0.85, lineHeight:1.5,
          }}>{person.known}</div>
        </div>
      </div>
    </div>
  );
}

export default function Zodiac({ onExit }) {
  const [result, setResult] = useState(null);
  const [showFamous, setShowFamous] = useState(false);
  const [modal, setModal] = useState(null);
  const resultRef = useRef(null);

  function selectYear(zodiac) {
    setResult(zodiac);
    setShowFamous(false);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior:"smooth", block:"center" });
    }, 100);
  }

  const data = result ? ZODIAC_DATA[result] : null;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:300,
      background:"#f4e8d0",
      overflowY:"auto",
      fontFamily:"'Cormorant Garamond','Noto Serif SC',serif",
      color:INK,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes floatAnim { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
        @keyframes rise { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .zyr-btn:hover { background:${VERMILION}!important; color:${PAPER}!important; transform:translateY(-2px)!important; box-shadow:0 4px 0 ${VERMILION_DEEP}!important; }
        .zperson:hover { background:rgba(184,38,26,0.06)!important; transform:translateX(4px)!important; }
        .zfamous-btn:hover { background:${VERMILION_DEEP}!important; color:${PAPER}!important; border-color:${GOLD_BRIGHT}!important; transform:translateY(-2px)!important; box-shadow:0 4px 0 rgba(0,0,0,0.2)!important; }
      `}</style>

      {/* Header bar with exit */}
      <div style={{
        background:`linear-gradient(135deg,${GOLD},#D49828)`,
        padding:"14px 20px", display:"flex", alignItems:"center",
        justifyContent:"space-between", position:"sticky", top:0, zIndex:10,
        boxShadow:"0 3px 12px rgba(180,120,20,.3)",
      }}>
        <span style={{ fontSize:"1.15rem", fontWeight:700, color:"#3A2408", fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", letterSpacing:2 }}>
          🐉 Chinese Zodiac · 十二生肖
        </span>
        <button onClick={onExit} style={{
          background:"rgba(255,255,255,.3)", border:"none",
          borderRadius:8, padding:"6px 14px",
          color:"#3A2408", fontWeight:700, cursor:"pointer", fontSize:14,
        }}>✕ Exit</button>
      </div>

      <div style={{ maxWidth:760, margin:"0 auto", padding:"24px 16px 60px" }}>
        {/* Page title */}
        <header style={{ textAlign:"center", padding:"16px 0 24px" }}>
          <div style={{
            display:"inline-block", background:VERMILION, color:PAPER,
            padding:"6px 14px", fontStyle:"italic", fontSize:13,
            letterSpacing:4, marginBottom:16, transform:"rotate(-2deg)",
            boxShadow:`2px 2px 0 ${VERMILION_DEEP}`,
          }}>EST. ANCIENT</div>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(38px,8vw,56px)",
            color:INK, letterSpacing:4, lineHeight:1, marginBottom:6, fontStyle:"italic",
          }}>Chinese <span style={{ color:VERMILION }}>Zodiac</span></h1>
          <div style={{ fontFamily:"'Ma Shan Zheng',serif", fontSize:20, color:VERMILION, letterSpacing:8, marginBottom:10 }}>十二生肖</div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, margin:"12px 0 6px" }}>
            <span style={{ flex:"0 1 80px", height:1, background:INK, opacity:0.3, display:"block" }}/>
            <span style={{ width:6, height:6, background:VERMILION, transform:"rotate(45deg)", display:"block" }}/>
            <span style={{ flex:"0 1 80px", height:1, background:INK, opacity:0.3, display:"block" }}/>
          </div>
          <p style={{ fontStyle:"italic", fontSize:16, opacity:0.75, letterSpacing:2 }}>Discover Your Sign · Embrace Your Strengths</p>
          <p style={{ fontFamily:"'ZCOOL XiaoWei',serif", fontSize:12, opacity:0.55, letterSpacing:3, marginTop:4 }}>寻你之本命 · 知你之所长</p>
        </header>

        {/* Zodiac list panel */}
        <div style={{
          background:"rgba(255,251,240,0.6)", border:`1px solid rgba(26,15,10,0.15)`,
          padding:"24px 18px", position:"relative", backdropFilter:"blur(2px)",
        }}>
          {/* corner accents */}
          {[["top:-1px","left:-1px","borderRight:none","borderBottom:none"],
            ["bottom:-1px","right:-1px","borderLeft:none","borderTop:none"]].map((c,i) => (
            <span key={i} style={{
              position:"absolute", width:18, height:18,
              border:`2px solid ${VERMILION}`,
              [c[0].split(":")[0]]: c[0].split(":")[1],
              [c[1].split(":")[0]]: c[1].split(":")[1],
              [c[2].split(":")[0]]: "none",
              [c[3].split(":")[0]]: "none",
            }}/>
          ))}

          <p style={{ fontStyle:"italic", fontWeight:500, fontSize:20, textAlign:"center",
            marginBottom:4, letterSpacing:2 }}>
            ✦ Select Your Birth Year ✦
          </p>
          <p style={{ textAlign:"center", fontFamily:"'ZCOOL XiaoWei',serif", fontSize:12,
            opacity:0.55, letterSpacing:3, marginBottom:20 }}>请选择你的出生年份</p>

          {ORDER.map(z => {
            const d = ZODIAC_DATA[z];
            return (
              <div key={z} style={{
                marginBottom:12, borderBottom:`1px dashed rgba(26,15,10,0.12)`,
                paddingBottom:12,
              }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:8, paddingLeft:4 }}>
                  <span style={{ fontSize:22 }}>{d.emoji}</span>
                  <span style={{ fontStyle:"italic", fontWeight:600, fontSize:21, color:VERMILION_DEEP, letterSpacing:2 }}>{z}</span>
                  <span style={{ fontFamily:"'Ma Shan Zheng',serif", fontSize:13, opacity:0.55, letterSpacing:2 }}>{d.zh}</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:7 }}>
                  {d.years.map(y => (
                    <button
                      key={y}
                      className="zyr-btn"
                      onClick={() => selectYear(z)}
                      style={{
                        background:PAPER_DEEP, border:`1px solid rgba(26,15,10,0.2)`,
                        padding:"9px 4px",
                        fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
                        fontSize:16, color:INK, cursor:"pointer",
                        transition:"all 0.25s ease", letterSpacing:1,
                      }}
                    >{y}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Result */}
        {data && (
          <div
            ref={resultRef}
            style={{
              marginTop:24, padding:"28px 20px",
              background:"linear-gradient(135deg,#fff8e8 0%,#f4e8d0 100%)",
              border:`1px solid ${GOLD}`, position:"relative",
              animation:"rise 0.6s cubic-bezier(0.2,0.8,0.2,1) both",
            }}
          >
            {/* corner accents */}
            {[["top:-1px","left:-1px","borderRight:none","borderBottom:none"],
              ["bottom:-1px","right:-1px","borderLeft:none","borderTop:none"]].map((c,i) => (
              <span key={i} style={{
                position:"absolute", width:22, height:22,
                border:`2px solid ${GOLD}`,
                [c[0].split(":")[0]]: c[0].split(":")[1],
                [c[1].split(":")[0]]: c[1].split(":")[1],
                [c[2].split(":")[0]]: "none",
                [c[3].split(":")[0]]: "none",
              }}/>
            ))}

            <div style={{ textAlign:"center", marginBottom:18 }}>
              <div style={{
                fontSize:88, lineHeight:1, display:"inline-block",
                animation:"floatAnim 3s ease-in-out infinite",
                filter:"drop-shadow(2px 4px 6px rgba(138,26,18,0.2))",
              }}>{data.emoji}</div>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontWeight:600,
                fontSize:"clamp(32px,7vw,44px)", color:VERMILION, letterSpacing:4, marginTop:10,
                textShadow:"2px 2px 0 rgba(201,160,78,0.3)",
              }}>Year of the {result}</div>
              <div style={{ fontFamily:"'Ma Shan Zheng',serif", fontSize:17, opacity:0.65, letterSpacing:6, marginTop:6 }}>
                属{data.zh}
              </div>
              <div style={{
                display:"inline-block", background:INK, color:PAPER,
                padding:"4px 14px", fontStyle:"italic", fontSize:13, letterSpacing:3, marginTop:12,
              }}>{data.element}</div>
            </div>

            {/* Traits */}
            <ul style={{ listStyle:"none", marginTop:20 }}>
              {data.traits.map(([title, descEn, descZh], i) => (
                <li key={i} style={{
                  padding:"12px 0 12px 34px", borderBottom:`1px dashed rgba(26,15,10,0.15)`,
                  position:"relative",
                }}>
                  <span style={{ position:"absolute", left:8, top:14, color:VERMILION, fontSize:13 }}>✦</span>
                  <div style={{ fontWeight:700, fontStyle:"italic", fontSize:17, color:VERMILION_DEEP, letterSpacing:1, marginBottom:3 }}>{title}</div>
                  <div style={{ fontSize:15, lineHeight:1.6 }}>{descEn}</div>
                  <span style={{ display:"block", marginTop:3, fontFamily:"'Noto Serif SC',serif", fontSize:12, opacity:0.55, lineHeight:1.5 }}>{descZh}</span>
                </li>
              ))}
            </ul>

            {/* Poem */}
            <div style={{ marginTop:20, textAlign:"center" }}>
              <div style={{ fontStyle:"italic", fontWeight:500, fontSize:16, color:VERMILION, opacity:0.85, letterSpacing:3 }}>
                « {data.poemEn} »
              </div>
              <div style={{ fontFamily:"'Ma Shan Zheng',serif", opacity:0.55, fontSize:13, letterSpacing:3, marginTop:5 }}>
                {data.poemZh}
              </div>
            </div>

            {/* Famous people button */}
            <div style={{ textAlign:"center", marginTop:24 }}>
              <button
                className="zfamous-btn"
                onClick={() => setShowFamous(v => !v)}
                style={{
                  background:INK, color:GOLD_BRIGHT, border:`2px solid ${GOLD}`,
                  padding:"11px 26px", fontFamily:"'Cormorant Garamond',serif",
                  fontStyle:"italic", fontWeight:600, fontSize:16, letterSpacing:3, cursor:"pointer",
                  transition:"all 0.25s ease",
                }}
              >
                <span style={{ color:VERMILION, margin:"0 6px" }}>★</span>
                Famous People With Your Sign
                <span style={{ color:VERMILION, margin:"0 6px" }}>★</span>
                <span style={{ display:"block", fontFamily:"'ZCOOL XiaoWei',serif", fontSize:11,
                  color:INK, opacity:0.5, letterSpacing:3, marginTop:6, fontStyle:"normal" }}>
                  同生肖名人
                </span>
              </button>
            </div>

            {/* Famous list */}
            {showFamous && (
              <div style={{
                marginTop:20, paddingTop:20, borderTop:`1px dashed ${GOLD}`,
                animation:"rise 0.5s cubic-bezier(0.2,0.8,0.2,1) both",
              }}>
                <h3 style={{
                  fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontWeight:600,
                  fontSize:21, textAlign:"center", color:VERMILION_DEEP, letterSpacing:3, marginBottom:4,
                }}>Fellow {result}s You Might Know</h3>
                <div style={{ textAlign:"center", fontFamily:"'Ma Shan Zheng',serif", fontSize:13,
                  opacity:0.55, letterSpacing:4, marginBottom:16 }}>
                  与你同为属{data.zh}者
                </div>
                <div style={{ textAlign:"center", fontStyle:"italic", fontSize:12, opacity:0.5, marginBottom:12 }}>
                  ✦ tap a name to see their portrait ✦
                </div>
                {data.famous.map((p, i) => (
                  <div
                    key={i}
                    className="zperson"
                    onClick={() => setModal({ person:p, zodiac:result })}
                    style={{
                      display:"flex", alignItems:"flex-start", gap:12,
                      padding:"11px 8px", borderBottom:`1px dotted rgba(26,15,10,0.15)`,
                      cursor:"pointer", transition:"all 0.2s ease", borderRadius:2,
                    }}
                  >
                    <div style={{ flex:"0 0 58px", textAlign:"center", fontWeight:700, fontSize:17,
                      color:VERMILION, paddingTop:2 }}>{p.year}</div>
                    <div style={{ flex:1 }}>
                      <span style={{ fontWeight:700, fontSize:16, letterSpacing:0.5 }}>{p.name}</span>
                      <span style={{
                        display:"inline-block", marginLeft:8, padding:"1px 8px",
                        background:PAPER_DEEP, border:`1px solid ${GOLD}`,
                        fontStyle:"italic", fontSize:11, color:VERMILION_DEEP, letterSpacing:1,
                        verticalAlign:"middle",
                      }}>{p.tag}</span>
                      <div style={{ fontStyle:"italic", fontSize:13, opacity:0.75, marginTop:2, lineHeight:1.4 }}>{p.known}</div>
                    </div>
                    <div style={{ color:VERMILION, fontSize:20, opacity:0.4, paddingTop:6 }}>›</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Person modal */}
      {modal && (
        <PersonModal
          person={modal.person}
          zodiac={modal.zodiac}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
