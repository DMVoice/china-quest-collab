import { useState } from "react";

const QUESTIONS = [
  {
    q: "Which festival is also known as Chinese New Year?",
    opts: [
      "Lantern Festival",
      "Dragon Boat Festival",
      "Spring Festival",
      "National Day",
    ],
    ans: 2,
    fact:
      "Spring Festival is the biggest traditional holiday in China, with millions traveling home for family reunions.",
  },

  {
    q: "What food is traditionally eaten during the Lantern Festival?",
    opts: ["Mooncakes", "Zongzi", "Tangyuan", "Dumplings"],
    ans: 2,
    fact:
      "Tangyuan are sweet rice balls that symbolize family unity and happiness.",
  },

  {
    q: "Which festival honors the ancient poet Qu Yuan?",
    opts: [
      "Qingming Festival",
      "Dragon Boat Festival",
      "Qixi Festival",
      "Chongyang Festival",
    ],
    ans: 1,
    fact:
      "Dragon Boat Festival traditions began to honor Qu Yuan after he jumped into a river over 2,000 years ago.",
  },

  {
    q: "What activity is common during Qingming Festival?",
    opts: [
      "Dragon boat racing",
      "Cleaning ancestors’ tombs",
      "Moon watching",
      "Lighting lanterns",
    ],
    ans: 1,
    fact:
      "Qingming Festival is also called Tomb Sweeping Day because families visit and clean ancestral graves.",
  },

  {
    q: "Which festival is sometimes called Chinese Valentine’s Day?",
    opts: [
      "Qixi Festival",
      "Mid-Autumn Festival",
      "Laba Festival",
      "National Day",
    ],
    ans: 0,
    fact:
      "Qixi Festival celebrates the romantic legend of the Cowherd and Weaver Girl.",
  },

  {
    q: "What food is most associated with the Mid-Autumn Festival?",
    opts: ["Tangyuan", "Rice noodles", "Mooncakes", "Hot pot"],
    ans: 2,
    fact:
      "Mooncakes are round to represent reunion and completeness during Mid-Autumn Festival.",
  },

  {
    q: "Which festival encourages people to honor elders and climb mountains?",
    opts: [
      "Lantern Festival",
      "Chongyang Festival",
      "National Day",
      "Laba Festival",
    ],
    ans: 2,
    fact:
      "Chongyang Festival is also called the Double Ninth Festival and is connected with respect for seniors.",
  },

  {
    q: "What special food is eaten during Laba Festival?",
    opts: [
      "Mooncakes",
      "Laba porridge",
      "Zongzi",
      "Sweet dumplings",
    ],
    ans: 1,
    fact:
      "Laba porridge is made with grains, beans, nuts, and dried fruits to celebrate the coming New Year.",
  },

  {
    q: "When is China’s National Day celebrated?",
    opts: ["January 1", "May 1", "October 1", "December 25"],
    ans: 2,
    fact:
      "National Day celebrates the founding of the People’s Republic of China in 1949.",
  },
];

export default function FestivalQuiz({ onExit }) {
  const [idx, setIdx] = useState(0),
    [sel, setSel] = useState(null);
  const [score, setScore] = useState(0),
    [done, setDone] = useState(false);

  const q = QUESTIONS[idx];

  const choose = (i) => {
    if (sel !== null) return;

    setSel(i);

    if (i === q.ans) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= QUESTIONS.length) {
      setDone(true);
      return;
    }

    setIdx((i) => i + 1);
    setSel(null);
  };

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
        overflow: "auto",
      }}
    >
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
          🎯 Festival Quiz
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

      {!done ? (
        <div
          style={{
            flex: 1,
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 520,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              justifyContent: "center",
            }}
          >
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i < idx
                      ? "#D49828"
                      : i === idx
                      ? "#E8C870"
                      : "#D4C8A0",
                }}
              />
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: ".8rem",
              color: "#8B6030",
              margin: 0,
            }}
          >
            Question {idx + 1} of {QUESTIONS.length}
          </p>

          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: "20px",
              border: "2px solid #F0D898",
              boxShadow: "0 4px 16px rgba(0,0,0,.08)",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#3A2408",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {q.q}
            </p>
          </div>

          {q.opts.map((opt, i) => {
            let bg = "white",
              border = "2px solid #E0D0A0",
              color = "#4A3820";

            if (sel !== null) {
              if (i === q.ans) {
                bg = "#C8F0D0";
                border = "2px solid #3A9850";
                color = "#1A5830";
              } else if (i === sel) {
                bg = "#F8D0D0";
                border = "2px solid #C04040";
                color = "#801818";
              }
            }

            return (
              <button
                key={i}
                onClick={() => choose(i)}
                style={{
                  background: bg,
                  border,
                  borderRadius: 14,
                  padding: "14px 16px",
                  textAlign: "left",
                  fontSize: ".95rem",
                  color,
                  fontWeight: 600,
                  cursor: sel !== null ? "default" : "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                }}
              >
                <span style={{ marginRight: 10, opacity: 0.6 }}>
                  {"ABCD"[i]}.
                </span>
                {opt}
              </button>
            );
          })}

          {sel !== null && (
            <div
              style={{
                background: "#FFF8E0",
                border: "2px solid #E8C870",
                borderRadius: 14,
                padding: "14px 16px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: ".88rem",
                  color: "#6A4820",
                  lineHeight: 1.6,
                }}
              >
                💡 {q.fact}
              </p>
            </div>
          )}

          {sel !== null && (
            <button
              onClick={next}
              style={{
                padding: "14px",
                background:
                  "linear-gradient(135deg,#E8C870,#D49828)",
                border: "none",
                borderRadius: 14,
                fontSize: "1rem",
                fontWeight: 700,
                color: "#3A2408",
                cursor: "pointer",
              }}
            >
              {idx + 1 >= QUESTIONS.length
                ? "See My Score! 🎉"
                : "Next Question →"}
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            gap: 16,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "5rem" }}>
            {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "📚"}
          </div>

          <h2 style={{ color: "#3A2408", margin: 0 }}>
            {score >= 8
              ? "Festival Master!"
              : score >= 5
              ? "Festival Explorer!"
              : "Keep Learning!"}
          </h2>

          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: "20px 28px",
              border: "2px solid #F0D898",
            }}
          >
            <p
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#D49828",
                margin: 0,
              }}
            >
              {score}/{QUESTIONS.length}
            </p>
          </div>

          <button
            onClick={() => {
              setIdx(0);
              setScore(0);
              setSel(null);
              setDone(false);
            }}
            style={{
              padding: "14px 32px",
              background:
                "linear-gradient(135deg,#E8C870,#D49828)",
              border: "none",
              borderRadius: 50,
              fontWeight: 700,
              color: "#3A2408",
              cursor: "pointer",
            }}
          >
            Play Again 🔄
          </button>

          <button
            onClick={onExit}
            style={{
              padding: "12px 28px",
              background: "white",
              border: "2px solid #D4A050",
              borderRadius: 50,
              color: "#8B6030",
              cursor: "pointer",
            }}
          >
            Back to Wheel
          </button>
        </div>
      )}
    </div>
  );
}

