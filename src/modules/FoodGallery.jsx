import { useState, useMemo } from "react";
import { FOODS, quizOptionsFor } from "./foodData";

const HEADER_BG = "linear-gradient(135deg,#F4C36F,#D98A45)";
const PAGE_BG = "linear-gradient(160deg,#FFF8EA,#EAF4F0)";

export default function FoodGallery({ onExit }) {
  const [mode, setMode] = useState("quiz"); // quiz (default) | browse | detail | quiz-done
  const [selected, setSelected] = useState(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizOrder, setQuizOrder] = useState(() => buildQuizOrder());

  function buildQuizOrder() {
    const idx = [...FOODS.keys()];
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx.slice(0, 10); // 10-question round
  }

  const currentQuiz = useMemo(() => {
    const correct = FOODS[quizOrder[quizIndex]];
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
      <div style={{ background: HEADER_BG, padding: "14px 20px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 3px 12px rgba(180,120,20,.3)" }}>
        <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#3A2408" }}>🍲 Food Gallery</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { setMode("browse"); setSelected(null); }} style={tabBtn(mode === "browse")}>Browse</button>
          <button onClick={startQuiz} style={tabBtn(mode === "quiz" || mode === "quiz-done")}>Quiz</button>
          <button onClick={onExit} style={{ background: "rgba(255,255,255,.34)", border: "none", borderRadius: 8, padding: "6px 14px", color: "#3A2408", fontWeight: 700, cursor: "pointer" }}>✕</button>
        </div>
      </div>

      {/* BODY */}
      {mode === "browse" && (
        <BrowseGrid onPick={(food) => { setSelected(food); setMode("detail"); }} />
      )}
      {mode === "detail" && selected && (
        <DetailCard food={selected} onBack={() => { setSelected(null); setMode("browse"); }} onExit={onExit} />
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
    background: active ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.34)",
    border: "none",
    borderRadius: 8,
    padding: "6px 14px",
    color: "#3A2408",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: ".85rem",
  };
}

function BrowseGrid({ onPick }) {
  return (
    <div style={{ flex: 1, padding: "16px 14px 24px", overflowY: "auto" }}>
      <p style={{ textAlign: "center", color: "#8B6030", fontSize: ".88rem", margin: "0 0 14px" }}>
        Tap a food to learn more. Switch to <b>Quiz</b> for a 10-round challenge!
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(132px,1fr))", gap: 11, maxWidth: 980, margin: "0 auto" }}>
        {FOODS.map((food) => (
          <button key={food.id} onClick={() => onPick(food)} style={{
            background: food.color, border: `2px solid ${food.accent}38`, borderRadius: 16, padding: "10px 8px 12px",
            cursor: "pointer", textAlign: "center", boxShadow: "0 3px 10px rgba(120,70,20,.10)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          }}>
            <img src={food.image} alt={food.en} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 12, background: "white" }} />
            <span style={{ fontWeight: 800, fontSize: ".95rem", color: food.accent, lineHeight: 1.1 }}>{food.zh}</span>
            <span style={{ fontSize: ".7rem", color: food.accent, opacity: .76, lineHeight: 1.1, fontStyle: "italic" }}>{food.pinyin}</span>
            <span style={{ fontSize: ".68rem", color: "#5E4630", lineHeight: 1.1 }}>{food.en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailCard({ food, onBack, onExit }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 16px 24px", gap: 14, overflowY: "auto" }}>
      <div style={{ background: food.color, border: `3px solid ${food.accent}38`, borderRadius: 22, padding: "20px 22px", textAlign: "center", width: "min(420px,92vw)", boxShadow: "0 5px 18px rgba(120,70,20,.12)" }}>
        <img src={food.image} alt={food.en} style={{ width: "min(220px,55vw)", aspectRatio: "1", objectFit: "cover", borderRadius: 18, background: "white", boxShadow: "0 6px 18px rgba(120,70,20,.18)" }} />
        <h2 style={{ color: food.accent, margin: "12px 0 2px", fontSize: "2rem", lineHeight: 1.05 }}>{food.zh}</h2>
        <p style={{ color: food.accent, margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 700, opacity: .82, fontStyle: "italic" }}>{food.pinyin}</p>
        <p style={{ color: food.accent, opacity: .65, margin: "0 0 14px", fontSize: ".88rem", textTransform: "uppercase", letterSpacing: ".5px" }}>{food.en}</p>
        <p style={{ color: "#4A3820", fontSize: ".98rem", lineHeight: 1.55, margin: 0 }}>{food.description}</p>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={onBack} style={{ padding: "12px 24px", background: HEADER_BG, border: "none", borderRadius: 50, fontWeight: 800, color: "#3A2408", cursor: "pointer" }}>← Gallery</button>
        <button onClick={onExit} style={{ padding: "12px 24px", background: "white", border: "2px solid #D4A050", borderRadius: 50, color: "#8B6030", fontWeight: 700, cursor: "pointer" }}>Back to Wheel</button>
      </div>
    </div>
  );
}

function QuizCard({ n, index, score, quiz, choice, onAnswer, onNext }) {
  const isCorrect = choice && choice.id === quiz.correct.id;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 16px 24px", gap: 14, overflowY: "auto" }}>
      {/* Progress + score */}
      <div style={{ width: "min(420px,92vw)", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#8B6030", fontWeight: 700, fontSize: ".88rem" }}>
        <span>Round {index + 1} / {n}</span>
        <span>Score: <b>{score}</b></span>
      </div>
      {/* Image card */}
      <div style={{ background: quiz.correct.color, border: `3px solid ${quiz.correct.accent}38`, borderRadius: 22, padding: 18, textAlign: "center", width: "min(420px,92vw)" }}>
        <img src={quiz.correct.image} alt="" style={{ width: "min(240px,60vw)", aspectRatio: "1", objectFit: "cover", borderRadius: 18, background: "white", boxShadow: "0 6px 18px rgba(120,70,20,.18)" }} />
        <p style={{ margin: "12px 0 0", fontWeight: 700, color: "#5E4630", fontSize: "1rem" }}>What is this in Chinese?</p>
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
          const border = choice == null ? "#E1C58A"
                       : correct ? "#62A95C"
                       : picked ? "#D07163"
                       : "#E1C58A";
          return (
            <button key={opt.id} onClick={() => onAnswer(opt)} disabled={choice != null} style={{
              background: bg, border: `2px solid ${border}`, borderRadius: 14, padding: "14px 10px",
              cursor: choice == null ? "pointer" : "default", textAlign: "center",
              display: "flex", flexDirection: "column", gap: 2, alignItems: "center",
            }}>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#3A2808" }}>{opt.zh}</span>
              <span style={{ fontSize: ".75rem", color: "#7A6038", fontStyle: "italic" }}>{opt.pinyin}</span>
            </button>
          );
        })}
      </div>
      {/* Feedback + next */}
      {choice && (
        <div style={{ width: "min(420px,92vw)", padding: "12px 14px", background: isCorrect ? "#F0FAEA" : "#FFF5E2", border: `2px solid ${isCorrect ? "#7DBB6F" : "#E7B85D"}`, borderRadius: 14, textAlign: "center" }}>
          <p style={{ margin: "0 0 10px", color: "#4A3820", fontSize: ".95rem", fontWeight: 700 }}>
            {isCorrect
              ? `✓ Correct! ${quiz.correct.zh} (${quiz.correct.pinyin}) — ${quiz.correct.en}.`
              : `✗ It's ${quiz.correct.zh} (${quiz.correct.pinyin}) — ${quiz.correct.en}.`}
          </p>
          <button onClick={onNext} style={{ padding: "10px 26px", background: HEADER_BG, border: "none", borderRadius: 50, fontWeight: 800, color: "#3A2408", cursor: "pointer" }}>
            {index + 1 >= n ? "See Score →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

function QuizDone({ total, score, onAgain, onBrowse }) {
  const pct = Math.round((score / total) * 100);
  const stars = pct >= 90 ? "🌟🌟🌟" : pct >= 70 ? "🌟🌟" : pct >= 40 ? "🌟" : "📚";
  const msg = pct >= 90 ? "Outstanding! You know your fruits!"
            : pct >= 70 ? "Great work — most answers correct."
            : pct >= 40 ? "Nice try — review and go again!"
            : "Keep practicing — browse the gallery first.";
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 16, textAlign: "center" }}>
      <div style={{ fontSize: "3.4rem" }}>{stars}</div>
      <h2 style={{ color: "#8B4A20", margin: 0, fontSize: "1.8rem" }}>{score} / {total}</h2>
      <p style={{ color: "#6A4820", maxWidth: 320, fontSize: ".95rem", lineHeight: 1.55, margin: 0 }}>{msg}</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        <button onClick={onAgain} style={{ padding: "12px 26px", background: HEADER_BG, border: "none", borderRadius: 50, fontWeight: 800, color: "#3A2408", cursor: "pointer" }}>Play Again</button>
        <button onClick={onBrowse} style={{ padding: "12px 26px", background: "white", border: "2px solid #D4A050", borderRadius: 50, color: "#8B6030", fontWeight: 700, cursor: "pointer" }}>Browse Gallery</button>
      </div>
    </div>
  );
}
