import { useEffect, useMemo, useRef, useState } from "react";
import A from "./assets";
import MODULE_REGISTRY from "./modules/index";

const SEGS = [
  { id: "map", en: "City Quest", img: "icon_map", bg: "#FFF4DA", accent: "#8A6330" },
  { id: "hanfu", en: "Hanfu Style", img: "icon_hanfu", bg: "#E6F4EA", accent: "#3F8468" },
  { id: "scratch", en: "Lucky Card", img: "icon_scratch", bg: "#FFE7D6", accent: "#B86B45" },
  { id: "quiz", en: "Culture Quiz", emoji: "📜", bg: "#EAF1FF", accent: "#526FA8" },
  { id: "zodiac", en: "Zodiac", emoji: "🐴", bg: "#FFF2D2", accent: "#A9783B" },
  { id: "food", en: "Foodie", img: "icon_food", bg: "#FFEBDD", accent: "#B86B45" },
  { id: "art", en: "Instruments", img: "icon_art", bg: "#F1EAFE", accent: "#7A62A8" },
  { id: "festival", en: "Festival", img: "icon_festival", bg: "#FFE5E8", accent: "#B85F62" },
];

const N = SEGS.length;
const DEG = 360 / N;
const CX = 200;
const CY = 200;
const OR = 170;
const IR = 58;

const pol = (r, d) => {
  const rad = ((d - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
};

const arc = (r1, r2, a1, a2) => {
  const [x1, y1] = pol(r1, a1);
  const [x2, y2] = pol(r1, a2);
  const [x3, y3] = pol(r2, a2);
  const [x4, y4] = pol(r2, a1);
  return `M${x1},${y1} A${r1},${r1} 0 0,1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 0,0 ${x4},${y4}Z`;
};

const Petal = ({ x, delay, dur, rot }) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: -20,
      width: "clamp(7px,.7vw,13px)",
      height: "clamp(6px,.55vw,10px)",
      background: "radial-gradient(ellipse,#FFD3DD,#FFA8BA)",
      borderRadius: "50% 0 50% 0",
      transform: `rotate(${rot}deg)`,
      opacity: 0.58,
      animation: `fall ${dur}s ${delay}s infinite linear`,
      pointerEvents: "none",
    }}
  />
);

export default function ChinaQuestDisplay() {
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const total = useRef(0);
  const petals = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({ x: (i * 4.7 + 2) % 98, delay: i * 0.42, dur: 7 + (i % 5) * 1.05, rot: i * 24 })),
    [],
  );

  useEffect(() => {
    const href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@600&display=swap";
    if (document.querySelector(`link[href="${href}"]`)) return;

    const el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = href;
    document.head.appendChild(el);
  }, []);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setShow(false);
    const nr = total.current + (7 + Math.random() * 5) * 360 + Math.random() * 360;
    total.current = nr;
    setRot(nr);

    setTimeout(() => {
      const norm = ((nr % 360) + 360) % 360;
      setResult(SEGS[Math.floor(((360 - norm) % 360) / DEG) % N]);
      setSpinning(false);
      setTimeout(() => setShow(true), 180);
    }, 5000);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        minHeight: 620,
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(rgba(255,248,226,.18),rgba(255,250,238,.26)), url('/images/serene_springtime_fantasy_valley_with_pagodas.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "grid",
        gridTemplateRows: "clamp(118px,18vh,188px) minmax(0,1fr)",
        fontFamily: "sans-serif",
        color: "#4A2D12",
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.22 }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <ellipse cx="210" cy="108" rx="165" ry="45" fill="white" opacity=".55" />
        <ellipse cx="282" cy="128" rx="92" ry="28" fill="white" opacity=".24" />
        <ellipse cx="1320" cy="118" rx="180" ry="52" fill="white" opacity=".48" />
        <ellipse cx="1228" cy="148" rx="118" ry="32" fill="white" opacity=".22" />
        <ellipse cx="790" cy="72" rx="120" ry="34" fill="white" opacity=".35" />
        <ellipse cx="890" cy="98" rx="72" ry="20" fill="white" opacity=".18" />
        <g fill="none" stroke="#D79A36" strokeWidth="5" strokeLinecap="round" opacity=".12">
          <path d="M138,235 q42,-34 84,0 q42,34 84,0" />
          <path d="M1265,250 q42,-34 84,0 q42,34 84,0" />
        </g>
        <path d="M0,675 Q260,610 520,660 T1040,654 T1600,620 L1600,900 L0,900Z" fill="#9ED3B4" opacity=".32" />
        <path d="M0,705 Q260,660 520,698 T1050,690 T1600,670 L1600,900 L0,900Z" fill="#CFE6B8" opacity=".28" />
        <path d="M0,735 Q320,695 620,735 T1200,730 T1600,710 L1600,900 L0,900Z" fill="#F7DFC1" opacity=".55" />
        <path d="M0,775 Q250,745 510,772 T1030,772 T1600,748 L1600,900 L0,900Z" fill="#F6C7B7" opacity=".22" />
        <g opacity=".35">
          <line x1="88" y1="900" x2="106" y2="565" stroke="#8B5E3C" strokeWidth="16" />
          <circle cx="72" cy="550" r="70" fill="#F6B7C5" />
          <circle cx="142" cy="530" r="56" fill="#F0A6BA" />
          <line x1="1510" y1="900" x2="1490" y2="575" stroke="#8B5E3C" strokeWidth="16" />
          <circle cx="1538" cy="555" r="75" fill="#F6B7C5" />
          <circle cx="1464" cy="532" r="56" fill="#F0A6BA" />
        </g>
        <g opacity=".2" fill="#F3B9C8">
          <circle cx="240" cy="585" r="9" />
          <circle cx="274" cy="606" r="6" />
          <circle cx="1340" cy="602" r="8" />
          <circle cx="1305" cy="628" r="5" />
        </g>
      </svg>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {petals.map((pt, i) => (
          <Petal key={i} {...pt} />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          background: "linear-gradient(90deg,#F6B5AE,#F6D58D,#8ECDB7,#F6D58D,#F6B5AE)",
        }}
      />

      <header
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(10px,1.7vh,20px) clamp(10px,1.5vw,24px) 0",
          textAlign: "center",
        }}
      >
        <img
          src="/images/china_quest_a_cultural_adventure.png"
          style={{
            width: "clamp(1000px,82vw,1440px)",
            maxWidth: "98vw",
            maxHeight: "clamp(180px,24vh,260px)",
            height: "auto",
            display: "block",
            objectFit: "contain",
            filter: "saturate(.94) brightness(1.04) contrast(.98) drop-shadow(0 8px 16px rgba(107,63,22,.22))",
          }}
          alt="China Quest: A Cultural Adventure"
        />
      </header>

      <main
        className="display-spinner-stage"
        style={{
          position: "relative",
          zIndex: 4,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "minmax(380px,1fr) minmax(380px,clamp(380px,32vw,490px))",
          alignItems: "center",
          justifyItems: "center",
          gap: "clamp(20px,3.8vw,70px)",
          padding: "0 clamp(28px,4.8vw,82px) clamp(18px,2.8vh,30px)",
        }}
      >
        <img
          src={A.lantern}
          style={{
            position: "absolute",
            top: "clamp(-24px,-2vh,-10px)",
            left: "clamp(-6px,.6vw,18px)",
            width: "clamp(160px,15vw,250px)",
            animation: "swayL 5s ease-in-out infinite",
            transformOrigin: "top center",
            pointerEvents: "none",
            opacity: 0.9,
            zIndex: 1,
          }}
          alt=""
        />

        <section
          style={{
            gridColumn: 1,
            alignSelf: "center",
            justifySelf: "end",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateX(clamp(-16px,-2vw,-4px))",
            zIndex: 3,
          }}
          aria-label="China Quest spinner wheel"
        >
          <div style={{ marginBottom: "clamp(-10px,-1vh,-5px)", zIndex: 2, filter: "drop-shadow(0 5px 10px rgba(160,100,10,.45))" }}>
            <svg width="clamp(42px,4.6vw,64px)" height="clamp(46px,5vw,70px)" viewBox="0 0 28 32">
              <defs>
                <linearGradient id="displayPointer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF0A8" />
                  <stop offset="100%" stopColor="#D79A36" />
                </linearGradient>
              </defs>
              <path d="M14,30 L2,2 Q14,11 26,2Z" fill="url(#displayPointer)" stroke="#B98328" strokeWidth="1" />
            </svg>
          </div>

          <svg
            width="100%"
            viewBox="0 0 400 400"
            style={{
              width: "clamp(430px,58vh,640px)",
              height: "clamp(430px,58vh,640px)",
              maxWidth: "100%",
              transform: `rotate(${rot}deg)`,
              transition: spinning ? "transform 5s cubic-bezier(.06,.7,.08,1)" : "none",
              filter: "drop-shadow(0 24px 38px rgba(70,45,18,.34))",
            }}
          >
            <defs>
              {SEGS.map((s) => (
                <radialGradient key={s.id} id={`display-g-${s.id}`} cx="35%" cy="28%">
                  <stop offset="0%" stopColor="white" stopOpacity=".68" />
                  <stop offset="100%" stopColor={s.bg} />
                </radialGradient>
              ))}
            </defs>
            <circle cx={CX} cy={CY} r={198} fill="#F7B6A5" opacity=".42" />
            <circle cx={CX} cy={CY} r={193} fill="#FFF3D8" />
            <circle cx={CX} cy={CY} r={188} fill="#E7B85D" opacity=".42" />
            <circle cx={CX} cy={CY} r={182} fill="#FFF9EA" />
            {Array.from({ length: 48 }).map((_, i) => {
              const [px, py] = pol(191, i * 7.5);
              return <circle key={i} cx={px} cy={py} r={i % 6 === 0 ? 4 : 2} fill={i % 6 === 0 ? "#F8D878" : "#E0B84F"} />;
            })}
            {SEGS.map((s, i) => {
              const available = Boolean(MODULE_REGISTRY[s.id]);
              const a1 = i * DEG;
              const a2 = (i + 1) * DEG;
              const mid = a1 + DEG / 2;
              const [ix, iy] = pol(127, mid);
              const [tx, ty] = pol(88, mid);
              return (
                <g key={s.id}>
                  <path d={arc(OR, IR, a1, a2)} fill={available ? `url(#display-g-${s.id})` : "#EDE6D8"} stroke="#F0CCA0" strokeWidth="2.5" opacity={available ? 1 : 0.38} />
                  {s.img ? (
                    <image href={A[s.img]} x={ix - 31} y={iy - 31} width={62} height={62} opacity={available ? 1 : 0.25} transform={`rotate(${mid},${ix},${iy})`} />
                  ) : (
                    <text x={ix} y={iy} textAnchor="middle" dominantBaseline="middle" fontSize="32" opacity={available ? 1 : 0.25} transform={`rotate(${mid},${ix},${iy})`}>
                      {s.emoji}
                    </text>
                  )}
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9.8"
                    fontFamily="'Cinzel',serif"
                    fontWeight="700"
                    fill={available ? s.accent : "#B8AA90"}
                    transform={`rotate(${mid},${tx},${ty})`}
                  >
                    {s.en}
                  </text>
                </g>
              );
            })}
            {SEGS.map((_, i) => {
              const [ox, oy] = pol(OR, i * DEG);
              const [ix2, iy2] = pol(IR, i * DEG);
              return <line key={i} x1={ix2} y1={iy2} x2={ox} y2={oy} stroke="#F0CCA0" strokeWidth="2.5" />;
            })}
            <circle cx={CX} cy={CY} r={66} fill="#DFA544" />
            <circle cx={CX} cy={CY} r={59} fill="#FFF1C4" />
            <circle cx={CX} cy={CY} r={51} fill="#FFF9E8" opacity=".94" />
            {[0, 60, 120, 180, 240, 300].map((a) => {
              const [px, py] = pol(60, a);
              return <circle key={a} cx={px} cy={py} r={3} fill="#C89020" opacity=".55" />;
            })}
            <image href={A.fu} x={CX - 54} y={CY - 54} width={108} height={108} />
          </svg>

          <div
            style={{
              width: "min(540px,46vw)",
              height: "clamp(18px,2.3vh,30px)",
              background: "linear-gradient(180deg,#F8C3A4,#E78773)",
              borderRadius: "50%",
              boxShadow: "0 8px 20px rgba(180,90,55,.22)",
              marginTop: "clamp(-12px,-1vh,-6px)",
            }}
          />
        </section>

        <img
          src={A.lantern}
          style={{
            position: "absolute",
            top: "clamp(-24px,-2vh,-10px)",
            right: "clamp(-6px,.6vw,18px)",
            width: "clamp(160px,15vw,250px)",
            animation: "swayR 4.5s ease-in-out infinite",
            transformOrigin: "top center",
            transform: "scaleX(-1)",
            pointerEvents: "none",
            opacity: 0.9,
            zIndex: 1,
          }}
          alt=""
        />

        <aside
          className="display-control-panel"
          style={{
            gridColumn: 2,
            justifySelf: "start",
            width: "100%",
            maxWidth: 460,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(8px,1vh,12px)",
            padding: "clamp(12px,1.8vh,18px) clamp(14px,1.6vw,20px)",
            borderRadius: 34,
            border: "5px solid rgba(215,159,48,.96)",
            background:
              "radial-gradient(circle at 12% 12%,rgba(255,224,134,.8) 0 10px,transparent 11px), radial-gradient(circle at 86% 16%,rgba(255,183,200,.78) 0 8px,transparent 9px), radial-gradient(circle at 22% 84%,rgba(151,209,183,.38) 0 11px,transparent 12px), linear-gradient(160deg,rgba(255,255,246,.98),rgba(255,238,218,.97) 58%,rgba(255,248,232,.98))",
            boxShadow: "0 24px 52px rgba(87,48,14,.3), 0 7px 0 rgba(176,113,34,.28), inset 0 0 0 3px rgba(255,255,255,.85), inset 0 0 0 9px rgba(248,214,143,.34)",
            backdropFilter: "blur(7px)",
            position: "relative",
            zIndex: 4,
          }}
          aria-label="Spin controls"
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 12,
              left: 26,
              right: 26,
              height: 12,
              borderTop: "3px solid rgba(213,159,55,.42)",
              borderRadius: "50%",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 14,
              left: 22,
              right: 22,
              height: 18,
              borderBottom: "3px solid rgba(213,159,55,.34)",
              borderRadius: "50%",
            }}
          />
          <h1
            style={{
              margin: "clamp(2px,.5vh,5px) 0 0",
              maxWidth: 400,
              fontFamily: "'Cinzel',serif",
              fontSize: "clamp(1.1rem,1.5vw,1.5rem)",
              lineHeight: 1.06,
              letterSpacing: 0,
              textAlign: "center",
              color: "#743B20",
              textShadow: "0 2px 0 rgba(255,255,255,.8)",
              position: "relative",
              zIndex: 2,
            }}
          >
            Ready for your China Quest?
          </h1>

          <div
            style={{
              width: "clamp(120px,11vw,155px)",
              height: "clamp(120px,11vw,155px)",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              padding: "clamp(6px,.85vw,10px)",
              background:
                "conic-gradient(from 12deg,#E4AA3F,#FFE39A,#D99B31,#F7D572,#E4AA3F), radial-gradient(circle,#FFF7DC 0 58%,#E6B14E 59% 100%)",
              boxShadow: "0 18px 30px rgba(93,50,19,.26), inset 0 0 0 4px rgba(255,255,255,.72)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "clamp(18px,2vw,24px)",
                borderRadius: "50%",
                border: "2px dashed rgba(139,78,28,.3)",
              }}
            />
            <button
              className="display-spin-button"
              onClick={spin}
              disabled={spinning}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                fontFamily: "'Cinzel',serif",
                fontSize: spinning ? "clamp(.7rem,1vw,.9rem)" : "clamp(1.3rem,2.2vw,1.95rem)",
                fontWeight: 700,
                letterSpacing: 0,
                background: spinning
                  ? "radial-gradient(circle at 35% 24%,#EFE2BB,#BFAF83 72%)"
                  : "radial-gradient(circle at 32% 22%,#FFD2B7 0 18%,#FF755F 38%,#E73342 66%,#C82231 100%)",
                border: `4px solid ${spinning ? "#B9A15C" : "#FFD76A"}`,
                color: spinning ? "#786C4D" : "#FFF8D6",
                cursor: spinning ? "not-allowed" : "pointer",
                textShadow: spinning ? "none" : "0 2.5px 0 rgba(112,28,20,.42)",
                boxShadow: spinning
                  ? "inset 0 5px 10px rgba(80,50,20,.18)"
                  : "0 8px 0 #9F2A23, 0 14px 18px rgba(114,45,20,.32), inset 0 5px 9px rgba(255,255,255,.48), inset 0 -6px 11px rgba(129,23,31,.22)",
                transition: "transform .18s ease, box-shadow .18s ease, filter .18s ease",
                animation: spinning ? "none" : "pulse 2.5s ease-in-out infinite",
                position: "relative",
                zIndex: 1,
              }}
            >
              {spinning ? "Spinning..." : "SPIN!"}
            </button>
          </div>

          <p style={{ color: "#8B6030", fontSize: "clamp(.76rem,.95vw,.9rem)", fontWeight: 700, margin: 0, letterSpacing: 0, textAlign: "center" }}>
            Tap to start your China Quest!
          </p>

          <details
            style={{
              width: "100%",
              border: "2px solid rgba(200,156,56,.65)",
              borderRadius: 16,
              background: "rgba(255,250,236,.62)",
              boxShadow: "0 5px 14px rgba(120,70,20,.1)",
              overflow: "hidden",
              position: "relative",
              zIndex: 2,
            }}
          >
            <summary
              style={{
                padding: "9px 13px",
                color: "#8B6030",
                fontSize: "clamp(.72rem,.9vw,.88rem)",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: 0.5,
              }}
            >
              Presenter Tools
            </summary>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 8, padding: "0 10px 10px" }}>
              {SEGS.map((s) => {
                const available = Boolean(MODULE_REGISTRY[s.id]);
                return (
                  <button
                    key={s.id}
                    disabled={!available}
                    onClick={() => setActiveModule(s.id)}
                    style={{
                      minHeight: 38,
                      border: `1px solid ${available ? `${s.accent}55` : "#D8CDB8"}`,
                      borderRadius: 10,
                      background: available ? s.bg : "#F5EFE5",
                      color: available ? s.accent : "#A89880",
                      fontSize: "clamp(.62rem,.76vw,.78rem)",
                      fontWeight: 700,
                      cursor: available ? "pointer" : "not-allowed",
                      opacity: available ? 1 : 0.55,
                    }}
                  >
                    {s.en}
                  </button>
                );
              })}
            </div>
          </details>
        </aside>

        <img
          src={A.child}
          className="display-child"
          style={{
            position: "absolute",
            left: "clamp(6px,1.4vw,22px)",
            bottom: "clamp(-14px,-.8vh,-4px)",
            width: "clamp(180px,15vw,260px)",
            height: "auto",
            animation: "bounce 3s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 6,
          }}
          alt=""
        />
        <img
          src={A.panda}
          className="display-panda"
          style={{
            position: "absolute",
            right: "clamp(6px,1.4vw,22px)",
            bottom: "clamp(-14px,-.8vh,-4px)",
            width: "clamp(190px,15vw,270px)",
            height: "auto",
            animation: "pandaSway 4s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 6,
          }}
          alt=""
        />
      </main>

      {show &&
        result &&
        (() => {
          const available = Boolean(MODULE_REGISTRY[result.id]);
          return (
            <div
              onClick={() => setShow(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(40,18,8,.52)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 200,
                animation: "fadeIn .25s ease",
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "white",
                  borderRadius: 24,
                  maxWidth: 420,
                  width: "88%",
                  overflow: "hidden",
                  boxShadow: "0 28px 80px rgba(0,0,0,.3)",
                  animation: "springUp .45s cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                <div style={{ background: result.bg, padding: "26px 26px 18px", textAlign: "center" }}>
                  {result.img ? (
                    <img src={A[result.img]} style={{ width: 90, height: 90, objectFit: "contain", marginBottom: 8 }} alt="" />
                  ) : (
                    <span style={{ fontSize: "3.5rem", display: "block", marginBottom: 8 }}>{result.emoji}</span>
                  )}
                  <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "1.4rem", color: result.accent, margin: "0 0 2px", letterSpacing: 2 }}>{result.en}</h2>
                </div>
                <div style={{ padding: "16px 22px 20px", textAlign: "center" }}>
                  <p style={{ color: "#6A5038", fontSize: ".9rem", lineHeight: 1.85, margin: "0 0 16px" }}>
                    {available ? "Tap below to start your adventure!" : "Coming soon! Check back later."}
                  </p>
                  {available ? (
                    <button
                      onClick={() => {
                        setShow(false);
                        setActiveModule(result.id);
                      }}
                      style={{
                        width: "100%",
                        padding: 13,
                        background: result.bg,
                        color: result.accent,
                        border: `2px solid ${result.accent}55`,
                        borderRadius: 12,
                        fontSize: ".95rem",
                        fontFamily: "'Cinzel',serif",
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: 2,
                      }}
                    >
                      Let's Go! →
                    </button>
                  ) : (
                    <div style={{ padding: 11, background: "#F5EFE5", borderRadius: 11, color: "#B0A080", fontSize: ".83rem" }}>🔜 Coming Soon!</div>
                  )}
                  <button onClick={() => setShow(false)} style={{ marginTop: 10, background: "none", border: "none", color: "#C0B090", fontSize: ".73rem", cursor: "pointer" }}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {activeModule &&
        MODULE_REGISTRY[activeModule] &&
        (() => {
          const Module = MODULE_REGISTRY[activeModule];
          return <Module onExit={() => setActiveModule(null)} />;
        })()}

      <style>{`
        *{box-sizing:border-box}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes springUp{from{opacity:0;transform:translateY(50px) scale(.82)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes pulse{0%,100%{filter:brightness(1);transform:translateY(0)}50%{filter:brightness(1.08);transform:translateY(-3px)}}
        @keyframes swayL{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(4deg)}}
        @keyframes swayR{0%,100%{transform:rotate(5deg) scaleX(-1)}50%{transform:rotate(-4deg) scaleX(-1)}}
        @keyframes pandaSway{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(3deg) translateY(-7px)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:.7}100%{transform:translateY(110vh) rotate(720deg);opacity:.05}}
        .display-spin-button:active:not(:disabled){transform:translateY(8px)!important;box-shadow:0 8px 0 #A93325,0 14px 20px rgba(114,45,20,.28),inset 0 7px 12px rgba(255,255,255,.35)!important}
        @media (max-width: 980px){
          .display-spinner-stage{grid-template-columns:minmax(0,1fr) minmax(260px,320px)!important;padding-left:18px!important;padding-right:18px!important;gap:16px!important}
          .display-spinner-stage > img{display:none!important}
          .display-child,.display-panda{display:none!important}
        }
        @media (max-width: 760px){
          .display-spinner-stage{grid-template-columns:minmax(0,1fr)!important;align-content:start!important;overflow:auto!important}
          .display-control-panel{grid-column:1!important;justify-self:center!important}
        }
      `}</style>
    </div>
  );
}
