import { useState, useMemo } from "react";
import { INSTRUMENTS, quizOptionsFor } from "./instrumentsData";

const HEADER_BG = "linear-gradient(135deg,#B8A0D8,#7A62A8)";
const PAGE_BG = "linear-gradient(160deg,#FBF7FF,#EDE8FA)";

export default function Instruments({ onExit }) {
  const [mode, setMode] = useState("quiz"); // quiz (default) | browse | detail | quiz-done
  const [selected, setSelected] = useState(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizOrder, setQuizOrder] = useState(() => buildQuizOrder());

  function buildQuizOrder() {
    const idx = [...INSTRUMENTS.keys()];
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx.slice(0, 10); // 10-question round
  }

  const currentQuiz = useMemo(() => {
    const correct = INSTRUMENTS[quizOrder[quizIndex]];
    return { correct, options: quizOptionsFor(correct) };
  }, [quizOrder, quizIndex]);

  const startQuiz = () => {
    setQuizOrder(buildQuizOrder());
    setQuizIndex(0);
    setQuizScore(0);
    setQuizChoice(null);
    setMode("quiz");
  };

  const handleQuizAnswer = (opt) => {
    if (quizChoice !== null) return;
    setQuizChoice(opt);
    if (opt.id === currentQuiz.correct.id) setQuizScore((s) => s + 1);
  };

  const nextQuiz = () => {
    if (quizIndex + 1 >= quizOrder.length) {
      setMode("quiz-done");
      return;
    }
    setQuizIndex((i) => i + 1);
    setQuizChoice(null);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: PAGE_BG, display: "flex", flexDirection: "column", zIndex: 300, fontFamily: "sans-serif", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: HEADER_BG, padding: "14px 20px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 3px 12px rgba(90,60,140,.28)" }}>
        <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFF8EE" }}>🎵 Instruments</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { setMode("browse"); setSelected(null); }} style={tabBtn(mode === "browse")}>Browse</button>
          <button onClick={startQuiz} style={tabBtn(mode === "quiz" || mode === "quiz-done")}>Quiz</button>
          <button onClick={onExit} style={{ background: "rgba(255,255,255,.34)", border: "none", borderRadius: 8, padding: "6px 14px", color: "#FFF8EE", fontWeight: 700, cursor: "pointer" }}>✕</button>
        </div>
      </div>

      {/* BODY */}
      {mode === "browse" && (
        <BrowseGrid onPick={(item) => { setSelected(item); setMode("detail"); }} />
      )}
      {mode === "detail" && selected && (
        <DetailCard item={selected} onBack={() => { setSelected(null); setMode("browse"); }} onExit={onExit} />
      )}
      {mode === "quiz" && (
        <QuizCard
          n={quizOrder.length}
          index={quizIndex}
          score={quizScore}
          quiz={currentQuiz}
          choice={quizChoice}
          onAnswer={handleQuizAnswer}
          onNext={nextQuiz}
        />
      )}
      {mode === "quiz-done" && (
        <QuizDone total={quizOrder.length} score={quizScore} onAgain={startQuiz} onBrowse={() => setMode("browse")} />
      )}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function tabBtn(active) {
  return {
    background: active ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.34)",
    border: "none",
    borderRadius: 8,
    padding: "6px 14px",
    color: active ? "#5E4A9A" : "#FFF8EE",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: ".85rem",
  };
}

function BrowseGrid({ onPick }) {
  return (
    <div style={{ flex: 1, padding: "16px 14px 24px", overflowY: "auto" }}>
      <p style={{ textAlign: "center", color: "#6F5B96", fontSize: ".88rem", margin: "0 0 14px" }}>
        Tap an instrument to learn more. Switch to <b>Quiz</b> for a 10-round challenge!
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(132px,1fr))", gap: 11, maxWidth: 980, margin: "0 auto" }}>
        {INSTRUMENTS.map((item) => (
          <button key={item.id} onClick={() => onPick(item)} style={{
            background: item.color, border: `2px solid ${item.accent}38`, borderRadius: 16, padding: "10px 8px 12px",
            cursor: "pointer", textAlign: "center", boxShadow: "0 3px 10px rgba(90,60,140,.10)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          }}>
            <img src={item.img} alt={item.name} style={{ width: "100%", aspectRatio: "1", objectFit: "contain", borderRadius: 12, background: "white", padding: 4 }} />
            <span style={{ fontWeight: 800, fontSize: ".95rem", color: item.accent, lineHeight: 1.1 }}>{item.zh}</span>
            <span style={{ fontSize: ".7rem", color: item.accent, opacity: .76, lineHeight: 1.1, fontStyle: "italic" }}>{item.pinyin}</span>
            <span style={{ fontSize: ".68rem", color: "#5A4B72", lineHeight: 1.1 }}>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailCard({ item, onBack, onExit }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 16px 24px", gap: 14, overflowY: "auto" }}>
      <div style={{ background: item.color, border: `3px solid ${item.accent}38`, borderRadius: 22, padding: "20px 22px", textAlign: "center", width: "min(420px,92vw)", boxShadow: "0 5px 18px rgba(90,60,140,.14)" }}>
        <img src={item.img} alt={item.name} style={{ width: "min(220px,55vw)", aspectRatio: "1", objectFit: "contain", borderRadius: 18, background: "white", padding: 8, boxShadow: "0 6px 18px rgba(90,60,140,.18)" }} />
        <h2 style={{ color: item.accent, margin: "12px 0 2px", fontSize: "2rem", lineHeight: 1.05 }}>{item.zh}</h2>
        <p style={{ color: item.accent, margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 700, opacity: .82, fontStyle: "italic" }}>{item.pinyin}</p>
        <p style={{ color: item.accent, opacity: .65, margin: "0 0 4px", fontSize: ".88rem", textTransform: "uppercase", letterSpacing: ".5px" }}>{item.name}</p>
        <p style={{ color: item.accent, opacity: .55, margin: "0 0 14px", fontSize: ".74rem", letterSpacing: ".8px" }}>{item.category}</p>
        <p style={{ color: "#3F3258", fontSize: ".98rem", lineHeight: 1.55, margin: 0 }}>{item.description}</p>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={onBack} style={{ padding: "12px 24px", background: HEADER_BG, border: "none", borderRadius: 50, fontWeight: 800, color: "#FFF8EE", cursor: "pointer" }}>← Gallery</button>
        <button onClick={onExit} style={{ padding: "12px 24px", background: "white", border: "2px solid #B8A0D8", borderRadius: 50, color: "#6F5B96", fontWeight: 700, cursor: "pointer" }}>Back to Wheel</button>
      </div>
    </div>
  );
}

function QuizCard({ n, index, score, quiz, choice, onAnswer, onNext }) {
  const isCorrect = choice && choice.id === quiz.correct.id;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 16px 24px", gap: 14, overflowY: "auto" }}>
      {/* Progress + score */}
      <div style={{ width: "min(420px,92vw)", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#6F5B96", fontWeight: 700, fontSize: ".88rem" }}>
        <span>Round {index + 1} / {n}</span>
        <span>Score: <b>{score}</b></span>
      </div>
      {/* Image card */}
      <div style={{ background: quiz.correct.color, border: `3px solid ${quiz.correct.accent}38`, borderRadius: 22, padding: 18, textAlign: "center", width: "min(420px,92vw)" }}>
        <img src={quiz.correct.img} alt="" style={{ width: "min(240px,60vw)", aspectRatio: "1", objectFit: "contain", borderRadius: 18, background: "white", padding: 8, boxShadow: "0 6px 18px rgba(90,60,140,.18)" }} />
        <p style={{ margin: "12px 0 0", fontWeight: 700, color: "#3F3258", fontSize: "1rem" }}>What is this instrument in Chinese?</p>
      </div>
      {/* Options */}
      <div style={{ width: "min(420px,92vw)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {quiz.options.map((opt) => {
          const picked = choice && choice.id === opt.id;
          const correct = opt.id === quiz.correct.id;
          const bg = choice == null ? "white"
                  : correct ? "#DDF3D8"
                  : picked ? "#F8D6D0"
                  : "white";
          const border = choice == null ? "#D6CCEC"
                       : correct ? "#62A95C"
                       : picked ? "#D07163"
                       : "#D6CCEC";
          return (
            <button key={opt.id} onClick={() => onAnswer(opt)} disabled={choice != null} style={{
              background: bg, border: `2px solid ${border}`, borderRadius: 14, padding: "14px 10px",
              cursor: choice == null ? "pointer" : "default", textAlign: "center",
              display: "flex", flexDirection: "column", gap: 2, alignItems: "center",
            }}>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#3A2D52" }}>{opt.zh}</span>
              <span style={{ fontSize: ".75rem", color: "#6F5B96", fontStyle: "italic" }}>{opt.pinyin}</span>
              {opt.tagline && (
                <span style={{ fontSize: ".7rem", color: "#5A4B72", lineHeight: 1.2, marginTop: 2, opacity: .85 }}>{opt.tagline}</span>
              )}
            </button>
          );
        })}
      </div>
      {/* Feedback + next */}
      {choice && (
        <div style={{ width: "min(420px,92vw)", padding: "12px 14px", background: isCorrect ? "#F0FAEA" : "#FFF5E2", border: `2px solid ${isCorrect ? "#7DBB6F" : "#E7B85D"}`, borderRadius: 14, textAlign: "center" }}>
          <p style={{ margin: "0 0 10px", color: "#3F3258", fontSize: ".95rem", fontWeight: 700 }}>
            {isCorrect
              ? `✓ Correct! ${quiz.correct.zh} (${quiz.correct.pinyin}) — ${quiz.correct.name}.`
              : `✗ It's ${quiz.correct.zh} (${quiz.correct.pinyin}) — ${quiz.correct.name}.`}
          </p>
          <button onClick={onNext} style={{ padding: "10px 26px", background: HEADER_BG, border: "none", borderRadius: 50, fontWeight: 800, color: "#FFF8EE", cursor: "pointer" }}>
            {index + 1 >= n ? "See Score →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

function QuizDone({ total, score, onAgain, onBrowse }) {
  const pct = Math.round((score / total) * 100);
  const stars = pct >= 90 ? "🌟🌟🌟" : pct >= 70 ? "🌟🌟" : pct >= 40 ? "🌟" : "🎼";
  const msg = pct >= 90 ? "Outstanding! You know your instruments!"
            : pct >= 70 ? "Great work — most answers correct."
            : pct >= 40 ? "Nice try — review and go again!"
            : "Keep practicing — browse the gallery first.";
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 16, textAlign: "center" }}>
      <div style={{ fontSize: "3.4rem" }}>{stars}</div>
      <h2 style={{ color: "#5E4A9A", margin: 0, fontSize: "1.8rem" }}>{score} / {total}</h2>
      <p style={{ color: "#6F5B96", maxWidth: 320, fontSize: ".95rem", lineHeight: 1.55, margin: 0 }}>{msg}</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        <button onClick={onAgain} style={{ padding: "12px 26px", background: HEADER_BG, border: "none", borderRadius: 50, fontWeight: 800, color: "#FFF8EE", cursor: "pointer" }}>Play Again</button>
        <button onClick={onBrowse} style={{ padding: "12px 26px", background: "white", border: "2px solid #B8A0D8", borderRadius: 50, color: "#6F5B96", fontWeight: 700, cursor: "pointer" }}>Browse Gallery</button>
      </div>
    </div>
  );
}
