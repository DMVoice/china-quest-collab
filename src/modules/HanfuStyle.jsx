import { useState, useEffect } from "react";

const DYNASTIES = [
  {
    id: "han",
    zh: "汉",
    en: "Han",
    period: "206 BC – 220 AD",
    accent: "#7A4A28",
    bg: "#FFF8EE",
    circleBg: "linear-gradient(135deg,#FFF4DA,#E8C87A)",
    placeholderColor: "#E8C87A",
    hint: "Men wear their hair in a bun with a hairpin — no hat!",
    arrowSpot: { x: 21, y: 7 },
    arrowLabel: "Look at the man's hair bun!",
    descFemale: "Qūjū (曲裾) — A wrapped robe that elegantly circles the body, in deep jewel tones with embroidered hems. Dignified and graceful.",
    descMale: "Zhíjū (直裾) — A straight-hemmed robe cinched with a wide sash. Strong and commanding.",
    img: "/images/han_hanfu.jpg",
    imgLabel: "han_costume",
    imgDesc: "Han dynasty costume — Qūjū for women, Zhíjū for men",
  },
  {
    id: "tang",
    zh: "唐",
    en: "Tang",
    period: "618 – 907 AD",
    accent: "#8A3050",
    bg: "#FFF0F3",
    circleBg: "linear-gradient(135deg,#FFE5E8,#F5A8B5)",
    placeholderColor: "#F5A8B5",
    hint: "Women's skirts start way up at the chest — super high-waisted!",
    arrowSpot: { x: 63, y: 38 },
    arrowLabel: "See how high her skirt starts!",
    descFemale: "Qí Xiōng Rú Qún (齐胸襦裙) — A high-waisted skirt in bold, vibrant colors. One of the most expressive fashions in Chinese history!",
    descMale: "Yuánlǐng Páo (圆领袍) — A round-collar robe in rich hues, favored by scholars and officials.",
    img: "/images/tang_hanfu.jpg",
    imgLabel: "tang_costume",
    imgDesc: "Tang dynasty costume — Qí Xiōng Rú Qún for women, Yuánlǐng Páo for men",
  },
  {
    id: "song",
    zh: "宋",
    en: "Song",
    period: "960 – 1279 AD",
    accent: "#1A5040",
    bg: "#F0FAF5",
    circleBg: "linear-gradient(135deg,#E6F4EA,#8ECDB7)",
    placeholderColor: "#8ECDB7",
    hint: "Muted colors like soft gray and green — quiet and elegant.",
    arrowSpot: { x: 45, y: 52 },
    arrowLabel: "Look at the soft, muted colors!",
    descFemale: "Bèizi (褙子) — A long, open-sided layered robe in soft, muted colors. Light and flowing.",
    descMale: "Zhíshuǐ Páo (直裰) — A simple, scholarly robe reflecting the Song dynasty's love of quiet elegance.",
    img: "/images/song_hanfu.jpg",
    imgLabel: "song_costume",
    imgDesc: "Song dynasty costume — Bèizi for women, Zhíshuǐ Páo for men",
  },
  {
    id: "ming",
    zh: "明",
    en: "Ming",
    period: "1368 – 1644 AD",
    accent: "#40207A",
    bg: "#F5F0FC",
    circleBg: "linear-gradient(135deg,#F0EAFC,#C4B0E8)",
    placeholderColor: "#C4B0E8",
    hint: "Spot the stand-up collar and decorative knot buttons at the front!",
    arrowSpot: { x: 35, y: 20 },
    arrowLabel: "Check out that stand-up collar!",
    descFemale: "Áo Qún (袄裙) — A richly embroidered jacket-and-skirt set, detailed and beautifully layered.",
    descMale: "Dàopáo (道袍) — A wide-sleeved robe with cloud-pattern trim. Dignified and finely crafted.",
    img: "/images/ming_hanfu.jpg",
    imgLabel: "ming_costume",
    imgDesc: "Ming dynasty costume — Áo Qún for women, Dàopáo for men",
  },
];

function Placeholder({ label, desc, color, style, className }) {
  return (
    <div className={className} style={{
      background: color ? `${color}40` : "rgba(200,188,170,.18)",
      border: `2px dashed ${color ?? "rgba(160,130,90,.35)"}`,
      borderRadius: 14,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 10, gap: 6, boxSizing: "border-box",
      ...style,
    }}>
      <span style={{ fontSize: ".68rem", fontWeight: 700, color: "#8B6840", letterSpacing: .5 }}>[{label}]</span>
      <span style={{ fontSize: ".58rem", color: "#A08060", textAlign: "center", lineHeight: 1.4 }}>{desc}</span>
    </div>
  );
}

function DynastyImage({ d, style, className }) {
  if (d.img) {
    return (
      <img
        className={className}
        src={d.img}
        alt={d.imgDesc}
        style={{ borderRadius: 14, objectFit: "cover", display: "block", ...style }}
      />
    );
  }
  return (
    <div className={className} style={{
      background: d.placeholderColor ? `${d.placeholderColor}40` : "rgba(200,188,170,.18)",
      border: `2px dashed ${d.placeholderColor ?? "rgba(160,130,90,.35)"}`,
      borderRadius: 14,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 10, gap: 6, boxSizing: "border-box",
      ...style,
    }}>
      <span style={{ fontSize: ".68rem", fontWeight: 700, color: "#8B6840", letterSpacing: .5 }}>
        [{d.imgLabel}]
      </span>
      <span style={{ fontSize: ".58rem", color: "#A08060", textAlign: "center", lineHeight: 1.4 }}>
        {d.imgDesc}
      </span>
    </div>
  );
}

function GuessButton({ d, onClick }) {
  return (
    <button className="hf-guess-btn" onClick={onClick} style={{
      width: 110, borderRadius: 14,
      background: d.circleBg,
      border: "2.5px solid rgba(255,255,255,.8)",
      boxShadow: "0 3px 12px rgba(0,0,0,.15)",
      cursor: "pointer",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "10px 6px", gap: 2, flexShrink: 0,
      transition: "transform 200ms ease, box-shadow 200ms ease",
    }}>
      <span style={{
        fontFamily: "'Noto Serif SC', serif",
        fontSize: "1.6rem", fontWeight: 700,
        color: "white", lineHeight: 1,
        textShadow: "0 1px 5px rgba(0,0,0,.28)",
      }}>{d.zh}</span>
      <span style={{
        fontSize: ".82rem", fontWeight: 700,
        color: "rgba(255,255,255,.95)", lineHeight: 1.2,
        textShadow: "0 1px 3px rgba(0,0,0,.22)",
      }}>{d.en}</span>
      <span style={{
        fontSize: ".56rem",
        color: "rgba(255,255,255,.85)", lineHeight: 1.3,
        textShadow: "0 1px 3px rgba(0,0,0,.22)",
        textAlign: "center",
      }}>{d.period}</span>
    </button>
  );
}

function HintBubble({ d }) {
  return (
    <div style={{
      flex: 1,
      background: `${d.placeholderColor}30`,
      border: `1.5px solid ${d.accent}55`,
      borderRadius: 16, padding: "10px 12px",
      textAlign: "center",
    }}>
      <p style={{ margin: "0 0 3px" }}>
        <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.1rem", fontWeight: 700, color: d.accent }}>{d.zh} </span>
        <span style={{ fontSize: ".78rem", fontWeight: 700, color: d.accent }}>{d.en}</span>
      </p>
      <p style={{ fontSize: ".7rem", color: d.accent, margin: 0, lineHeight: 1.55 }}>
        {d.hint}
      </p>
    </div>
  );
}

function DynastyDesc({ d }) {
  return (
    <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        background: "white", borderRadius: 14,
        padding: "14px 18px",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)",
        borderLeft: `4px solid ${d.accent}`,
      }}>
        <p style={{ fontSize: ".78rem", fontWeight: 700, color: d.accent, margin: "0 0 5px" }}>👗 Women's Fashion</p>
        <p style={{ color: "#5A3A10", fontSize: ".88rem", lineHeight: 1.75, margin: 0 }}>
          {d.descFemale}
        </p>
      </div>
      <div style={{
        background: "white", borderRadius: 14,
        padding: "14px 18px",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)",
        borderLeft: `4px solid ${d.accent}`,
      }}>
        <p style={{ fontSize: ".78rem", fontWeight: 700, color: d.accent, margin: "0 0 5px" }}>👘 Men's Fashion</p>
        <p style={{ color: "#5A3A10", fontSize: ".88rem", lineHeight: 1.75, margin: 0 }}>
          {d.descMale}
        </p>
      </div>
    </div>
  );
}

const HEADER_STYLE = {
  background: "linear-gradient(135deg,#E8C870,#D49828)",
  padding: "14px 20px", flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "space-between",
  boxShadow: "0 3px 12px rgba(180,120,20,.3)",
};

const BG = "linear-gradient(180deg,#B8D4F0 0%,#D8E8F8 45%,#EAF0F6 100%)";

const STYLES = `
  @keyframes fadeUp   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn    { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
  @keyframes hintIn   { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  .hf-guess-btn:hover { transform: translateY(-3px) scale(1.08); box-shadow: 0 6px 18px rgba(0,0,0,.22) !important; }
  .hf-guess-btn:active { transform: scale(0.96); }
  .hf-hint-btn:hover { background: rgba(255,255,255,.95) !important; border-color: #B8860B !important; }
  .hf-action-btn:hover { filter: brightness(1.08); transform: translateY(-2px); }
  .hf-fade { animation: fadeUp .35s ease both; }
  .hf-pop  { animation: popIn  .3s cubic-bezier(0.2,0.8,0.2,1) both; }
  .hf-hint-card { animation: hintIn .25s cubic-bezier(0.2,0.8,0.2,1) both; }
  .hf-hint-card:nth-child(2) { animation-delay: .05s; }
  .hf-hint-card:nth-child(3) { animation-delay: .10s; }
  .hf-hint-card:nth-child(4) { animation-delay: .15s; }
  @keyframes hf-pulse  { 0%, 100% { transform: scale(1); opacity: .65; } 50% { transform: scale(1.9); opacity: 0; } }
  .hf-pulse-outer { animation: hf-pulse 1.6s ease-in-out infinite; }
`;

function PageHeader({ onExit }) {
  return (
    <div style={HEADER_STYLE}>
      <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#3A2408", fontFamily: "'Noto Serif SC', serif" }}>
        🥻 Hanfu Style
      </span>
      <button onClick={onExit} style={{
        background: "rgba(255,255,255,.3)", border: "none",
        borderRadius: 8, padding: "6px 14px",
        color: "#3A2408", fontWeight: 700, cursor: "pointer", fontSize: 14,
      }}>✕ Exit</button>
    </div>
  );
}

export default function HanfuStyle({ onExit }) {
  const [phase, setPhase] = useState("start");
  const [target, setTarget] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [heroGif] = useState(() => {
    const gifs = ["/images/qingmingshanghetu2.gif", "/images/qingmingshanghetu3.gif", "/images/qingmingshanghetu4.gif"];
    return gifs[Math.floor(Math.random() * gifs.length)];
  });

  const targetDynasty = DYNASTIES.find(d => d.id === target) ?? null;

  useEffect(() => {
    const href = "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@400;700&display=swap";
    if (!document.querySelector(`link[href="${href}"]`)) {
      const el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = href;
      document.head.appendChild(el);
    }
  }, []);

  function startGame() {
    const picked = DYNASTIES[Math.floor(Math.random() * DYNASTIES.length)];
    setTarget(picked.id);
    setShowHints(false);
    setPhase("guess");
  }

  function handleGuess(id) {
    setPhase(id === target ? "correct" : "wrong");
  }

  /* ── Start page ── */
  if (phase === "start") {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", zIndex: 300 }}>
        <style>{STYLES}</style>
        <PageHeader onExit={onExit} />
        <div style={{
          flex: 1, background: BG,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 32, padding: "20px 40px",
          textAlign: "center",
        }}>
          <img
            src={heroGif}
            alt="Along the River During the Qingming Festival"
            style={{ borderRadius: 16, opacity: 0.85, boxShadow: "0 4px 20px rgba(0,0,0,.15)" }}
          />
          <div>
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "1.5rem", fontWeight: 700, color: "#3A2408", margin: "0 0 12px",
            }}>
              You're about to time-travel through ancient China!
            </p>
            <p style={{ fontSize: "1rem", color: "#7A5A30", margin: 0, lineHeight: 1.7 }}>
              A mystery costume will appear.<br />
              Can you guess which dynasty it's from?
            </p>
          </div>
          <button onClick={startGame} style={{
            background: "linear-gradient(135deg,#E8C870,#D49828)",
            border: "none", borderRadius: 24,
            padding: "14px 40px",
            fontSize: "1.05rem", fontWeight: 700, color: "#3A2408",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(180,120,20,.4)",
          }}>Let's go! →</button>
        </div>
      </div>
    );
  }

  /* ── Guess page (with optional hint overlay) ── */
  if (phase === "guess") {
    const { arrowSpot, arrowLabel } = targetDynasty;
    const cloudX = Math.min(Math.max(arrowSpot.x, 20), 80);
    const cloudBelow = arrowSpot.y < 50;
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", zIndex: 300 }}>
        <style>{STYLES}</style>
        <PageHeader onExit={onExit} />
        <div style={{
          flex: 1, background: BG, overflowY: "auto",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 20, padding: "24px 20px",
        }}>

          {/* Image with hints outside at four corners */}
          <div style={{
            position: "relative",
            width: "100%", maxWidth: 320,
            marginTop: showHints ? 90 : 0,
            marginBottom: showHints ? 90 : 0,
            transition: "margin 300ms ease",
          }}>
            <DynastyImage
              d={targetDynasty}
              style={{ width: "100%", height: 250 }}
              className="hf-pop"
            />
            {showHints && (
              <>
                {/* Cloud bubble near the key feature */}
                <div style={{
                  position: "absolute",
                  left: `${cloudX}%`,
                  top: cloudBelow ? `calc(${arrowSpot.y}% + 6px)` : undefined,
                  bottom: !cloudBelow ? `calc(${100 - arrowSpot.y}% + 6px)` : undefined,
                  transform: "translateX(-50%)",
                  zIndex: 10, pointerEvents: "none",
                  background: "rgba(255,255,255,.96)",
                  border: "2px solid #C8A050",
                  borderRadius: 14,
                  padding: "6px 10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,.2)",
                  maxWidth: 120, textAlign: "center",
                }}>
                  <span style={{ fontSize: ".63rem", color: "#4A2D12", fontWeight: 700, lineHeight: 1.4 }}>
                    ☁️ {arrowLabel}
                  </span>
                </div>

                {/* Top-left: Han */}
                <div className="hf-hint-card" style={{
                  position: "absolute", bottom: "100%", left: 0,
                  width: 138, marginBottom: 8,
                  background: `${DYNASTIES[0].placeholderColor}33`,
                  border: `1.5px solid ${DYNASTIES[0].accent}55`,
                  borderRadius: "12px 12px 12px 0", padding: "8px 10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,.12)",
                }}>
                  <p style={{ margin: "0 0 3px" }}>
                    <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: "1rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[0].zh} </span>
                    <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[0].en}</span>
                  </p>
                  <p style={{ fontSize: ".65rem", color: "#4A2D12", margin: 0, lineHeight: 1.5 }}>{DYNASTIES[0].hint}</p>
                </div>
                {/* Top-right: Tang */}
                <div className="hf-hint-card" style={{
                  position: "absolute", bottom: "100%", right: 0,
                  width: 138, marginBottom: 8,
                  background: `${DYNASTIES[1].placeholderColor}33`,
                  border: `1.5px solid ${DYNASTIES[1].accent}55`,
                  borderRadius: "12px 12px 0 12px", padding: "8px 10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,.12)",
                }}>
                  <p style={{ margin: "0 0 3px" }}>
                    <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: "1rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[1].zh} </span>
                    <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[1].en}</span>
                  </p>
                  <p style={{ fontSize: ".65rem", color: "#4A2D12", margin: 0, lineHeight: 1.5 }}>{DYNASTIES[1].hint}</p>
                </div>
                {/* Bottom-left: Song */}
                <div className="hf-hint-card" style={{
                  position: "absolute", top: "100%", left: 0,
                  width: 138, marginTop: 8,
                  background: `${DYNASTIES[2].placeholderColor}33`,
                  border: `1.5px solid ${DYNASTIES[2].accent}55`,
                  borderRadius: "0 12px 12px 12px", padding: "8px 10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,.12)",
                }}>
                  <p style={{ margin: "0 0 3px" }}>
                    <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: "1rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[2].zh} </span>
                    <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[2].en}</span>
                  </p>
                  <p style={{ fontSize: ".65rem", color: "#4A2D12", margin: 0, lineHeight: 1.5 }}>{DYNASTIES[2].hint}</p>
                </div>
                {/* Bottom-right: Ming */}
                <div className="hf-hint-card" style={{
                  position: "absolute", top: "100%", right: 0,
                  width: 138, marginTop: 8,
                  background: `${DYNASTIES[3].placeholderColor}33`,
                  border: `1.5px solid ${DYNASTIES[3].accent}55`,
                  borderRadius: "12px 0 12px 12px", padding: "8px 10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,.12)",
                }}>
                  <p style={{ margin: "0 0 3px" }}>
                    <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: "1rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[3].zh} </span>
                    <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#4A2D12" }}>{DYNASTIES[3].en}</span>
                  </p>
                  <p style={{ fontSize: ".65rem", color: "#4A2D12", margin: 0, lineHeight: 1.5 }}>{DYNASTIES[3].hint}</p>
                </div>
              </>
            )}
          </div>

          <p className="hf-fade" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "1.15rem", fontWeight: 700,
            color: "#3A2408", margin: 0, textAlign: "center",
          }}>
            Whoa — where in time did you land? 🤔
          </p>
          <div className="hf-fade" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {DYNASTIES.map(d => (
              <GuessButton key={d.id} d={d} onClick={() => handleGuess(d.id)} />
            ))}
          </div>
          {!showHints && (
            <button className="hf-hint-btn hf-fade" onClick={() => setShowHints(true)} style={{
              background: "rgba(255,255,255,.75)",
              border: "1.5px solid #D49828",
              borderRadius: 24, padding: "9px 26px",
              color: "#7A5A30", fontWeight: 700, fontSize: ".9rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
              transition: "all 200ms ease",
            }}>
              💡 I need a clue!
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Correct page (3.a) ── */
  if (phase === "correct") {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", zIndex: 300 }}>
        <style>{STYLES}</style>
        <PageHeader onExit={onExit} />
        <div style={{
          flex: 1, background: targetDynasty.bg, overflowY: "auto",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 18, padding: "24px",
        }}>
          <span className="hf-pop" style={{ fontSize: "2.8rem" }}>🎉</span>
          <div className="hf-fade" style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "1.5rem", fontWeight: 700,
              color: targetDynasty.accent, margin: "0 0 6px",
            }}>
              Nailed it! 🎉
            </p>
            <p style={{ fontSize: "1.05rem", color: "#5A3A10", margin: "0 0 2px" }}>
              You've landed in the{" "}
              <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "1.3rem", fontWeight: 700 }}>
                {targetDynasty.zh} {targetDynasty.en}
              </span>
              {" "}Dynasty!
            </p>
            <p style={{ fontSize: ".82rem", color: "#9A7A50", margin: 0 }}>{targetDynasty.period}</p>
          </div>
          <DynastyImage
            d={targetDynasty}
            style={{ width: "100%", maxWidth: 300, height: 180 }}
          />
          <DynastyDesc d={targetDynasty} />
          <button className="hf-action-btn" onClick={startGame} style={{
            background: "linear-gradient(135deg,#E8C870,#D49828)",
            border: "none", borderRadius: 24,
            padding: "12px 36px",
            color: "#3A2408", fontWeight: 700, fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(180,120,20,.3)",
            transition: "filter 200ms ease, transform 200ms ease",
          }}>
            Time-travel again! →
          </button>
        </div>
      </div>
    );
  }

  /* ── Wrong page (3.b) ── */
  if (phase === "wrong") {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", zIndex: 300 }}>
        <style>{STYLES}</style>
        <PageHeader onExit={onExit} />
        <div style={{
          flex: 1, background: targetDynasty.bg, overflowY: "auto",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 18, padding: "24px",
        }}>
          <span className="hf-pop" style={{ fontSize: "2.8rem" }}>🌟</span>
          <div className="hf-fade" style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "1.3rem", fontWeight: 700,
              color: targetDynasty.accent, margin: "0 0 6px",
            }}>
              Not quite — you've actually landed in the {targetDynasty.zh} {targetDynasty.en} Dynasty!
            </p>
            <p style={{ fontSize: ".82rem", color: "#9A7A50", margin: "0 0 4px" }}>{targetDynasty.period}</p>
            <p style={{ fontSize: ".95rem", color: "#7A5A30", margin: 0 }}>
              Now you know — try the next one! ✨
            </p>
          </div>
          <DynastyImage
            d={targetDynasty}
            style={{ width: "100%", maxWidth: 300, height: 180 }}
          />
          <DynastyDesc d={targetDynasty} />
          <button className="hf-action-btn" onClick={startGame} style={{
            background: "linear-gradient(135deg,#E8C870,#D49828)",
            border: "none", borderRadius: 24,
            padding: "12px 36px",
            color: "#3A2408", fontWeight: 700, fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(180,120,20,.3)",
            transition: "filter 200ms ease, transform 200ms ease",
          }}>
            Time-travel again! →
          </button>
        </div>
      </div>
    );
  }
}
