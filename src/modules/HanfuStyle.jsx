import { useState, useEffect } from "react";

const DYNASTIES = [
  {
    id: "han",
    zh: "汉",
    period: "206 BC – 220 AD",
    accent: "#7A4A28",
    bg: "#FFF8EE",
    circleBg: "linear-gradient(135deg,#FFF4DA,#E8C87A)",
    desc: "Women wore the elegant Qūjū (曲裾) — a wrapped robe in deep, jewel-toned colors with embroidered hems. Men wore the Zhíjū (直裾), a straight-hemmed robe cinched with a wide sash — dignified and commanding.",
    sceneLabel: "han_scene",
    sceneDesc: "Boy in Han Zhíjū (直裾) and girl in Han Qūjū (曲裾), both in ink-wash Han dynasty setting",
  },
  {
    id: "tang",
    zh: "唐",
    period: "618 – 907 AD",
    accent: "#8A3050",
    bg: "#FFF0F3",
    circleBg: "linear-gradient(135deg,#FFE5E8,#F5A8B5)",
    desc: "Women dazzled in high-waisted Qí Xiōng skirts (齐胸襦裙) in bold, vibrant colors — the most expressive fashion in Chinese history! Men wore the Yuánlǐng Páo (圆领袍), a smart round-collar robe in rich hues favored by scholars and officials.",
    sceneLabel: "tang_scene",
    sceneDesc: "Boy in Tang Yuánlǐng Páo (圆领袍) and girl in Tang Qí Xiōng Rú Qún (齐胸襦裙), ink-wash Tang palace setting",
  },
  {
    id: "song",
    zh: "宋",
    period: "960 – 1279 AD",
    accent: "#1A5040",
    bg: "#F0FAF5",
    circleBg: "linear-gradient(135deg,#E6F4EA,#8ECDB7)",
    desc: "Women favored the graceful Bèizi (褙子) — a long, open-sided layered robe in soft, muted colors. Men dressed in understated Zhíshuǐ Páo robes, scholarly and composed, reflecting Song's love of quiet elegance.",
    sceneLabel: "song_scene",
    sceneDesc: "Boy in Song Zhíshuǐ Páo (直裰) and girl in Song Bèizi (褙子), ink-wash misty pavilion setting",
  },
  {
    id: "ming",
    zh: "明",
    period: "1368 – 1644 AD",
    accent: "#40207A",
    bg: "#F5F0FC",
    circleBg: "linear-gradient(135deg,#F0EAFC,#C4B0E8)",
    desc: "Women wore layered Áo Qún (袄裙) — richly embroidered jacket-and-skirt sets, detailed and beautiful. Men wore wide-sleeved Dàopáo (道袍) robes with cloud-pattern trim, dignified and finely crafted.",
    sceneLabel: "ming_scene",
    sceneDesc: "Boy in Ming Dàopáo (道袍) and girl in Ming Áo Qún (袄裙), ink-wash Forbidden City setting",
  },
];

function Placeholder({ label, desc, style }) {
  return (
    <div style={{
      background: "rgba(200,188,170,.18)",
      border: "2px dashed rgba(160,130,90,.35)",
      borderRadius: 12,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 10, gap: 5, overflow: "hidden",
      boxSizing: "border-box",
      ...style,
    }}>
      <span style={{ fontSize: ".68rem", fontWeight: 700, color: "#8B6840", letterSpacing: .5 }}>
        [{label}]
      </span>
      <span style={{ fontSize: ".58rem", color: "#A08060", textAlign: "center", lineHeight: 1.4 }}>
        {desc}
      </span>
    </div>
  );
}

function DynastyCircle({ d, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 80, height: 80, borderRadius: "50%",
      background: d.circleBg,
      border: "2.5px solid rgba(255,255,255,.8)",
      boxShadow: "0 3px 12px rgba(0,0,0,.13)",
      cursor: "pointer",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 0, padding: 0, flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'Noto Serif SC', serif",
        fontSize: "2.2rem", fontWeight: 700,
        color: "white", lineHeight: 1,
        textShadow: "0 1px 5px rgba(0,0,0,.28)",
      }}>{d.zh}</span>
      <span style={{
        fontSize: ".41rem", color: "rgba(255,255,255,.95)",
        lineHeight: 1.3, textAlign: "center", padding: "2px 4px 0",
        textShadow: "0 1px 3px rgba(0,0,0,.22)",
      }}>{d.period}</span>
    </button>
  );
}

export default function HanfuStyle({ onExit }) {
  const [selected, setSelected] = useState(null);
  const dynasty = DYNASTIES.find(d => d.id === selected) ?? null;

  useEffect(() => {
    const el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap";
    document.head.appendChild(el);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0,
      display: "flex", flexDirection: "column",
      zIndex: 300, fontFamily: "sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#E8C870,#D49828)",
        padding: "14px 20px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 3px 12px rgba(180,120,20,.3)",
      }}>
        <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#3A2408" }}>
          🥻 Hanfu Style
        </span>
        <button onClick={onExit} style={{
          background: "rgba(255,255,255,.3)", border: "none",
          borderRadius: 8, padding: "6px 14px",
          color: "#3A2408", fontWeight: 700, cursor: "pointer",
        }}>✕ Exit</button>
      </div>

      {dynasty ? (
        /* ── Dynasty detail view ── */
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: "#FDFAF5" }}>
          <button onClick={() => setSelected(null)} style={{
            alignSelf: "flex-start", margin: "12px 16px 4px",
            background: "none", border: "none",
            color: "#7A5A30", fontSize: ".9rem", fontWeight: 700, cursor: "pointer",
          }}>← Back</button>

          <div style={{ textAlign: "center", margin: "0 0 14px" }}>
            <span style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "2rem", fontWeight: 600, color: dynasty.accent,
            }}>{dynasty.zh}</span>
            <span style={{ display: "block", fontSize: ".78rem", color: "#8B6A40", marginTop: 2 }}>
              {dynasty.period}
            </span>
          </div>

          {/* Single scene image */}
          <Placeholder
            label={dynasty.sceneLabel}
            desc={dynasty.sceneDesc}
            style={{ margin: "0 16px", height: 280, borderRadius: 16 }}
          />

          {/* Description */}
          <div style={{
            margin: "14px 0 0", padding: "22px 26px 36px",
            background: dynasty.bg,
            borderRadius: "20px 20px 0 0",
            boxShadow: "0 -6px 20px rgba(0,0,0,.07)",
            flex: 1,
          }}>
            <p style={{
              color: dynasty.accent,
              fontSize: ".92rem", lineHeight: 1.85,
              margin: 0, textAlign: "center",
            }}>{dynasty.desc}</p>
          </div>
        </div>
      ) : (
        /* ── Main screen ── */
        <div style={{
          flex: 1, overflowY: "auto",
          background: "linear-gradient(180deg,#B8D4F0 0%,#D8E8F8 45%,#EAF0F6 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "20px 16px 24px", gap: 16,
        }}>
          {/* Single scene: both characters in modern setting */}
          <Placeholder
            label="scene_modern"
            desc="Boy and girl reading/studying together in modern city setting — full scene with background"
            style={{ width: "100%", maxWidth: 340, height: 280 }}
          />

          {/* Tagline */}
          <div style={{ textAlign: "center" }}>
            <p style={{
              margin: 0,
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(1rem,4.2vw,1.2rem)",
              color: "#3A2408",
              lineHeight: 1.4,
              textShadow: "0 1px 8px rgba(255,255,255,.95)",
            }}>
              Choose your dynasty and time travel begins
            </p>
            <p style={{
              margin: "4px 0 0",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(.88rem,3.6vw,1.05rem)",
              color: "#C04030",
              textShadow: "0 1px 6px rgba(255,255,255,.95)",
            }}>
              Click a dynasty to start!
            </p>
          </div>

          {/* Dynasty circles — single row */}
          <div style={{
            display: "flex", flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%", maxWidth: 380,
          }}>
            {DYNASTIES.map(d => (
              <DynastyCircle key={d.id} d={d} onClick={() => setSelected(d.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
