import { useEffect, useMemo } from "react";
import A from "./assets";

const MODULES = [
  {
    id: "map",
    title: "City Quest",
    detail: "Find famous places across China.",
    img: A.icon_map,
    bg: "#FFF4DA",
    accent: "#8A6330",
  },
  {
    id: "hanfu",
    title: "Hanfu Style",
    detail: "Dress up with traditional-inspired outfits.",
    img: A.icon_hanfu,
    bg: "#E6F4EA",
    accent: "#3F8468",
  },
  {
    id: "scratch",
    title: "Lucky Card",
    detail: "Reveal a cheerful surprise.",
    img: A.icon_scratch,
    bg: "#FFE7D6",
    accent: "#B86B45",
  },
  {
    id: "quiz",
    title: "Culture Quiz",
    detail: "Answer quick questions and learn.",
    img: A.blossom,
    bg: "#EAF1FF",
    accent: "#526FA8",
  },
  {
    id: "zodiac",
    title: "Zodiac",
    detail: "Meet the animals of the zodiac.",
    img: A.fu,
    bg: "#FFF2D2",
    accent: "#A9783B",
  },
  {
    id: "food",
    title: "Foodie",
    detail: "Discover favorite Chinese dishes.",
    img: A.icon_food,
    bg: "#FFEBDD",
    accent: "#B86B45",
  },
  {
    id: "art",
    title: "Instruments",
    detail: "Hear and explore musical sounds.",
    img: A.icon_art,
    bg: "#F1EAFE",
    accent: "#7A62A8",
  },
  {
    id: "festival",
    title: "Festival",
    detail: "Celebrate holidays and traditions.",
    img: A.icon_festival,
    bg: "#FFE5E8",
    accent: "#B85F62",
  },
];

const Petal = ({ x, delay, dur, rot }) => (
  <div
    className="display-petal"
    style={{
      left: `${x}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${dur}s`,
      transform: `rotate(${rot}deg)`,
    }}
  />
);

export default function ChinaQuestDisplay() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        x: i * 5.8 + 1,
        delay: i * 0.45,
        dur: 7 + (i % 4) * 1.4,
        rot: i * 24,
      })),
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

  return (
    <main className="display-page">
      <svg className="display-scenery" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="210" cy="108" rx="165" ry="45" fill="white" opacity=".55" />
        <ellipse cx="1320" cy="118" rx="180" ry="52" fill="white" opacity=".48" />
        <ellipse cx="790" cy="72" rx="120" ry="34" fill="white" opacity=".35" />
        <path d="M0,675 Q260,610 520,660 T1040,654 T1600,620 L1600,900 L0,900Z" fill="#9ED3B4" opacity=".32" />
        <path d="M0,735 Q320,695 620,735 T1200,730 T1600,710 L1600,900 L0,900Z" fill="#F7DFC1" opacity=".55" />
        <g opacity=".34">
          <line x1="88" y1="900" x2="106" y2="565" stroke="#8B5E3C" strokeWidth="16" />
          <circle cx="72" cy="550" r="70" fill="#F6B7C5" />
          <circle cx="142" cy="530" r="56" fill="#F0A6BA" />
          <line x1="1510" y1="900" x2="1490" y2="575" stroke="#8B5E3C" strokeWidth="16" />
          <circle cx="1538" cy="555" r="75" fill="#F6B7C5" />
          <circle cx="1464" cy="532" r="56" fill="#F0A6BA" />
        </g>
      </svg>

      <div className="display-petal-layer" aria-hidden="true">
        {petals.map((pt, i) => (
          <Petal key={i} {...pt} />
        ))}
      </div>

      <div className="display-top-frame" />
      <img className="display-lantern display-lantern-left" src={A.lantern} alt="" />
      <img className="display-lantern display-lantern-right" src={A.lantern} alt="" />

      <section className="display-hero" aria-labelledby="display-title">
        <div className="display-logo-wrap">
          <img src={A.logo} className="display-logo" alt="China Quest" />
        </div>
        <p className="display-kicker">Special Interactive Activity for Multicultural Night</p>
        <h1 id="display-title">China Quest</h1>
        <p className="display-description">
          A playful journey where kids can explore Chinese cities, food, clothing, music,
          festivals, and traditions through quick hands-on activities.
        </p>
      </section>

      <section className="display-module-grid" aria-label="China Quest activities">
        {MODULES.map((module, index) => (
          <article
            className="display-module-card"
            key={module.id}
            style={{
              "--card-bg": module.bg,
              "--card-accent": module.accent,
              animationDelay: `${index * 70}ms`,
            }}
          >
            <div className="display-module-icon">
              <img src={module.img} alt="" />
            </div>
            <div>
              <h2>{module.title}</h2>
              <p>{module.detail}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="display-cta" aria-label="QR code prompt">
        <img src={A.child} className="display-character" alt="" />
        <p>Scan the QR code to play</p>
        <img src={A.panda} className="display-character display-panda" alt="" />
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .display-page {
          width: 100%;
          min-height: 100dvh;
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          gap: clamp(14px, 2vh, 28px);
          padding: clamp(18px, 3vh, 34px) clamp(22px, 4vw, 78px) clamp(16px, 2.8vh, 32px);
          color: #4a2d12;
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(180deg, #8ed3f4 0%, #cdeef9 30%, #fff4d6 68%, #f6b9a8 100%);
        }

        .display-scenery,
        .display-petal-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .display-petal-layer {
          overflow: hidden;
          z-index: 1;
        }

        .display-petal {
          position: absolute;
          top: -24px;
          width: clamp(8px, 0.85vw, 15px);
          height: clamp(7px, 0.72vw, 12px);
          border-radius: 50% 0 50% 0;
          background: radial-gradient(ellipse, #ffd3dd, #ffa8ba);
          opacity: .58;
          animation-name: displayFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .display-top-frame {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(90deg, #f6b5ae, #f6d58d, #8ecdb7, #f6d58d, #f6b5ae);
        }

        .display-lantern {
          position: absolute;
          z-index: 3;
          top: clamp(22px, 4vh, 54px);
          width: clamp(70px, 8vw, 138px);
          filter: drop-shadow(0 10px 16px rgba(130, 58, 28, .16));
          transform-origin: top center;
        }

        .display-lantern-left {
          left: clamp(20px, 4vw, 82px);
          animation: displaySwayLeft 5s ease-in-out infinite;
        }

        .display-lantern-right {
          right: clamp(20px, 4vw, 82px);
          animation: displaySwayRight 4.5s ease-in-out infinite;
        }

        .display-hero {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 1120px;
          width: min(100%, 1120px);
          justify-self: center;
          padding-top: clamp(8px, 1vh, 14px);
        }

        .display-logo-wrap {
          border: 2px solid rgba(220, 166, 72, .58);
          border-radius: 30px;
          padding: clamp(8px, 1.2vw, 16px) clamp(24px, 3vw, 48px);
          background: linear-gradient(180deg, rgba(255, 252, 240, .96), rgba(255, 241, 205, .94));
          box-shadow: 0 14px 34px rgba(129, 80, 28, .18), inset 0 0 0 4px rgba(255, 255, 255, .42);
        }

        .display-logo {
          display: block;
          width: clamp(230px, 30vw, 500px);
          height: auto;
        }

        .display-kicker {
          width: fit-content;
          margin: clamp(12px, 1.6vh, 18px) 0 6px;
          padding: 7px 18px;
          border: 2px solid rgba(255, 233, 167, .9);
          border-radius: 999px;
          background: linear-gradient(180deg, #78c8b6, #4ba78f);
          color: #fff8de;
          font-family: "Noto Serif SC", serif;
          font-size: clamp(.95rem, 1.4vw, 1.45rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 1px;
          box-shadow: 0 8px 18px rgba(40, 110, 95, .2);
        }

        .display-hero h1 {
          margin: 0;
          color: #7f3f24;
          font-family: "Cinzel", Georgia, serif;
          font-size: clamp(2.6rem, 6vw, 6.7rem);
          line-height: .95;
          letter-spacing: 0;
          text-shadow: 0 4px 0 rgba(255, 245, 215, .75), 0 10px 24px rgba(120, 65, 28, .16);
        }

        .display-description {
          max-width: 850px;
          margin: clamp(8px, 1.2vh, 14px) 0 0;
          color: #6a4820;
          font-size: clamp(1rem, 1.55vw, 1.55rem);
          line-height: 1.35;
          text-wrap: balance;
        }

        .display-module-grid {
          position: relative;
          z-index: 4;
          align-self: center;
          justify-self: center;
          width: min(100%, 1280px);
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(10px, 1.4vw, 20px);
        }

        .display-module-card {
          min-height: clamp(126px, 16vh, 176px);
          display: grid;
          grid-template-columns: clamp(54px, 5.5vw, 88px) minmax(0, 1fr);
          align-items: center;
          gap: clamp(10px, 1.2vw, 16px);
          padding: clamp(12px, 1.35vw, 20px);
          border: 2px solid color-mix(in srgb, var(--card-accent) 42%, white);
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(255, 255, 255, .78), color-mix(in srgb, var(--card-bg) 86%, white));
          box-shadow: 0 12px 26px rgba(112, 70, 28, .13);
          animation: cardIn .42s ease both;
        }

        .display-module-icon {
          display: grid;
          place-items: center;
          width: clamp(54px, 5.5vw, 88px);
          height: clamp(54px, 5.5vw, 88px);
          border-radius: 50%;
          background: var(--card-bg);
          border: 2px solid rgba(255, 255, 255, .8);
          box-shadow: inset 0 0 0 2px rgba(220, 166, 72, .18);
        }

        .display-module-icon img {
          width: 76%;
          height: 76%;
          object-fit: contain;
        }

        .display-module-card h2 {
          margin: 0 0 5px;
          color: var(--card-accent);
          font-family: "Cinzel", Georgia, serif;
          font-size: clamp(1rem, 1.5vw, 1.45rem);
          line-height: 1.05;
          letter-spacing: 0;
        }

        .display-module-card p {
          margin: 0;
          color: #6a5038;
          font-size: clamp(.8rem, 1.05vw, 1.05rem);
          line-height: 1.32;
        }

        .display-cta {
          position: relative;
          z-index: 4;
          align-self: end;
          justify-self: center;
          width: min(100%, 980px);
          display: grid;
          grid-template-columns: minmax(84px, auto) minmax(0, 1fr) minmax(84px, auto);
          align-items: end;
          gap: clamp(12px, 2.6vw, 42px);
        }

        .display-cta p {
          align-self: center;
          margin: 0 0 clamp(8px, 1.5vh, 18px);
          padding: clamp(14px, 1.7vh, 20px) clamp(22px, 3vw, 46px);
          border: 3px solid #b87e10;
          border-radius: 999px;
          color: #3a2408;
          background: linear-gradient(135deg, #fff0a8, #e3a13d 46%, #ffd978);
          box-shadow: 0 8px 24px rgba(190, 120, 15, .3);
          font-family: "Cinzel", Georgia, serif;
          font-size: clamp(1.2rem, 2.5vw, 2.6rem);
          font-weight: 700;
          line-height: 1.1;
          text-align: center;
          letter-spacing: 0;
        }

        .display-character {
          width: clamp(90px, 11vw, 178px);
          height: auto;
          animation: displayBounce 3s ease-in-out infinite;
        }

        .display-panda {
          animation: displayPandaSway 4s ease-in-out infinite;
        }

        @media (max-width: 920px) {
          .display-page {
            gap: 14px;
            padding: 18px 18px 16px;
          }

          .display-lantern {
            width: 72px;
          }

          .display-module-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .display-module-card {
            min-height: 108px;
            border-radius: 14px;
          }

          .display-cta {
            grid-template-columns: 76px minmax(0, 1fr) 76px;
            gap: 8px;
          }

          .display-character {
            width: 76px;
          }
        }

        @media (max-width: 560px) {
          .display-lantern {
            display: none;
          }

          .display-logo {
            width: min(68vw, 310px);
          }

          .display-kicker {
            max-width: 92vw;
          }

          .display-module-card {
            grid-template-columns: 52px minmax(0, 1fr);
            padding: 10px;
          }

          .display-module-icon {
            width: 52px;
            height: 52px;
          }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes displayFall {
          0% {
            transform: translateY(-24px) rotate(0deg);
            opacity: .68;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: .05;
          }
        }

        @keyframes displaySwayLeft {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(4deg);
          }
        }

        @keyframes displaySwayRight {
          0%, 100% {
            transform: rotate(5deg) scaleX(-1);
          }
          50% {
            transform: rotate(-4deg) scaleX(-1);
          }
        }

        @keyframes displayBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes displayPandaSway {
          0%, 100% {
            transform: rotate(-3deg) translateY(0);
          }
          50% {
            transform: rotate(3deg) translateY(-7px);
          }
        }
      `}</style>
    </main>
  );
}
