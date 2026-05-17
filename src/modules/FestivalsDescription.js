import { useState } from "react";

const festivals = [
  {
    name: "Spring Festival",
    emoji: "🧧",
    date: "1st day of the Lunar New Year",
    description:
      "Also known as Chinese New Year, Spring Festival is the most important traditional holiday in China. Families reunite, decorate homes in red, and celebrate with food, fireworks, and blessings for good fortune.",
    traditions: [
      "Family reunion dinner",
      "Red envelopes (Hongbao)",
      "Fireworks",
      "Dragon and lion dances",
    ],
    color: "#D64541",
  },

  {
    name: "Lantern Festival",
    emoji: "🏮",
    date: "15th day of the 1st lunar month",
    description:
      "The Lantern Festival marks the end of Spring Festival celebrations. Families light colorful lanterns, solve lantern riddles, and enjoy sweet rice dumplings called tangyuan.",
    traditions: [
      "Lantern displays",
      "Solving riddles",
      "Eating tangyuan",
      "Lion dances",
    ],
    color: "#F29E4C",
  },

  {
    name: "Qingming Festival",
    emoji: "🌿",
    date: "April 4 or 5",
    description:
      "Also called Tomb Sweeping Day, Qingming Festival is a time to honor ancestors by cleaning graves and offering food, flowers, and prayers.",
    traditions: [
      "Cleaning family tombs",
      "Offering flowers",
      "Flying kites",
      "Spring outings",
    ],
    color: "#5B8E7D",
  },

  {
    name: "Dragon Boat Festival",
    emoji: "🐉",
    date: "5th day of the 5th lunar month",
    description:
      "This festival honors the ancient poet Qu Yuan. People race dragon boats and eat sticky rice dumplings called zongzi.",
    traditions: [
      "Dragon boat races",
      "Eating zongzi",
      "Remembering Qu Yuan",
      "Hanging herbs",
    ],
    color: "#2E8B57",
  },

  {
    name: "Qixi Festival",
    emoji: "💕",
    date: "7th day of the 7th lunar month",
    description:
      "Known as Chinese Valentine's Day, Qixi Festival celebrates the romantic legend of the Cowherd and the Weaver Girl.",
    traditions: [
      "Praying for love",
      "Gift giving",
      "Star watching",
      "Traditional needlework",
    ],
    color: "#D16BA5",
  },

  {
    name: "Mid-Autumn Festival",
    emoji: "🌕",
    date: "15th day of the 8th lunar month",
    description:
      "A harvest festival celebrating the full moon. Families gather together to eat mooncakes and admire the bright autumn moon.",
    traditions: [
      "Eating mooncakes",
      "Moon watching",
      "Lantern displays",
      "Family gatherings",
    ],
    color: "#C08A2E",
  },

  {
    name: "Chongyang Festival",
    emoji: "⛰️",
    date: "9th day of the 9th lunar month",
    description:
      "Also known as the Double Ninth Festival, Chongyang Festival is a day for respecting elders and enjoying mountain climbing and chrysanthemum flowers.",
    traditions: [
      "Mountain climbing",
      "Honoring elders",
      "Drinking chrysanthemum tea",
      "Viewing autumn scenery",
    ],
    color: "#A26769",
  },

  {
    name: "Laba Festival",
    emoji: "🥣",
    date: "8th day of the 12th lunar month",
    description:
      "Laba Festival celebrates the approach of the Lunar New Year. People traditionally eat warm Laba porridge made with grains, beans, and nuts.",
    traditions: [
      "Eating Laba porridge",
      "Ancestor worship",
      "Preparing for New Year",
      "Temple ceremonies",
    ],
    color: "#8D6E63",
  },

  {
    name: "National Day",
    emoji: "🇨🇳",
    date: "October 1",
    description:
      "China's National Day celebrates the founding of the People's Republic of China in 1949. Large public celebrations and parades are held across the country.",
    traditions: [
      "Flag-raising ceremonies",
      "Fireworks",
      "Parades",
      "Travel and tourism",
    ],
    color: "#C62828",
  },
];

export default function Festival({ onExit }) {
  const [step, setStep] = useState(0);

  const festival = festivals[step];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(160deg,#FBF5E8,#EAF4F0)",
        display: "flex",
        flexDirection: "column",
        zIndex: 300,
        fontFamily: "sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#E8C870,#D49828)",
          padding: "14px 20px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 3px 12px rgba(180,120,20,.3)",
        }}
      >
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#3A2408",
          }}
        >
          🎎 Chinese Festivals
        </span>

        <button
          onClick={onExit}
          style={{
            background: "rgba(255,255,255,.3)",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            color: "#3A2408",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ✕ Exit
        </button>
      </div>

      {/* ── Content ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          gap: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: 32,
            maxWidth: 700,
            width: "100%",
            boxShadow: "0 8px 24px rgba(0,0,0,.12)",
            borderTop: `10px solid ${festival.color}`,
          }}
        >
          <div style={{ fontSize: "4rem" }}>{festival.emoji}</div>

          <h2
            style={{
              color: "#3A2408",
              marginBottom: 10,
            }}
          >
            {festival.name}
          </h2>

          <p
            style={{
              color: "#A05A2C",
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            📅 {festival.date}
          </p>

          <p
            style={{
              color: "#5C4428",
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            {festival.description}
          </p>

          <div>
            <h3 style={{ color: "#3A2408" }}>Traditions</h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              {festival.traditions.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#F6E7C8",
                    padding: "10px 16px",
                    borderRadius: 999,
                    color: "#5C4428",
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() =>
              setStep((prev) =>
                prev === 0 ? festivals.length - 1 : prev - 1
              )
            }
            style={{
              padding: "12px 22px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              background: "#E8C870",
              color: "#3A2408",
            }}
          >
            ⬅ Previous
          </button>

          <span style={{ color: "#5C4428", fontWeight: 700 }}>
            {step + 1} / {festivals.length}
          </span>

          <button
            onClick={() =>
              setStep((prev) =>
                prev === festivals.length - 1 ? 0 : prev + 1
              )
            }
            style={{
              padding: "12px 22px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              background: "#D49828",
              color: "#3A2408",
            }}
          >
            Next ➡
          </button>
        </div>

        <button
          onClick={onExit}
          style={{
            padding: "12px 28px",
            background: "linear-gradient(135deg,#E8C870,#D49828)",
            border: "none",
            borderRadius: 50,
            fontWeight: 700,
            color: "#3A2408",
            cursor: "pointer",
          }}
        >
          Back to Wheel
        </button>
      </div>
    </div>
  );
}