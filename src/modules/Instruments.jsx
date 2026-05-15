import { useState } from "react";
import { INSTRUMENTS } from "./instrumentsData";

export default function Instruments({ onExit }) {
  const [selected, setSelected] = useState(null);
  const [choice, setChoice] = useState(null);

  const choose = (item) => { setSelected(item); setChoice(null); };
  const backToGallery = () => { setSelected(null); setChoice(null); };

  const isCorrect = selected && choice === selected.answer;

  return (
    <div style={{
      position:"fixed", inset:0,
      background:"linear-gradient(160deg,#FBF7FF,#EDE8FA)",
      display:"flex", flexDirection:"column",
      zIndex:300, fontFamily:"sans-serif", overflow:"auto",
    }}>
      {/* Header */}
      <div style={{
        background:"linear-gradient(135deg,#B8A0D8,#7A62A8)",
        padding:"14px 20px", flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        boxShadow:"0 3px 12px rgba(90,60,140,.28)",
      }}>
        <span style={{fontSize:"1.2rem", fontWeight:700, color:"#FFF8EE"}}>
          🎵 Instruments
        </span>
        <button onClick={onExit} style={{
          background:"rgba(255,255,255,.32)", border:"none", borderRadius:8,
          padding:"6px 14px", color:"#FFF8EE", fontWeight:700, cursor:"pointer",
        }}>✕ Exit</button>
      </div>

      {!selected ? (
        /* ── Gallery grid ── */
        <div style={{flex:1, padding:"18px 16px 24px", overflowY:"auto"}}>
          <p style={{textAlign:"center", color:"#6F5B96", fontSize:".9rem", margin:"0 0 15px"}}>
            Tap an instrument to hear its story!
          </p>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(138px,1fr))",
            gap:12, maxWidth:760, margin:"0 auto", alignItems:"stretch",
          }}>
            {INSTRUMENTS.map(item => (
              <button key={item.id} onClick={() => choose(item)} style={{
                minHeight:188,
                background:item.color,
                border:`2px solid ${item.accent}38`,
                borderRadius:18,
                padding:"16px 12px", cursor:"pointer", textAlign:"center",
                boxShadow:"0 4px 14px rgba(90,60,140,.10)",
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:7,
              }}>
                <span style={{fontSize:"3rem", lineHeight:1}}>{item.emoji}</span>
                <span style={{fontWeight:800, fontSize:"1rem", color:item.accent, lineHeight:1.2}}>
                  {item.name}
                </span>
                <span style={{fontSize:".78rem", color:item.accent, opacity:.78, lineHeight:1.2}}>
                  {item.zh}
                </span>
                <span style={{
                  fontSize:".7rem", color:item.accent, opacity:.62,
                  textTransform:"uppercase", letterSpacing:".5px", marginTop:1,
                }}>
                  {item.category}
                </span>
                <span style={{fontSize:".78rem", color:"#5A4B72", lineHeight:1.4, maxWidth:150, marginTop:2}}>
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── Detail + Quiz ── */
        <div style={{
          flex:1, display:"flex", flexDirection:"column", alignItems:"center",
          padding:"20px 16px 26px", gap:14, overflowY:"auto",
        }}>
          <div style={{
            background:selected.color,
            border:`3px solid ${selected.accent}38`,
            borderRadius:20, padding:"24px 20px", textAlign:"center",
            width:"min(430px,92vw)",
            boxShadow:"0 5px 18px rgba(90,60,140,.14)",
          }}>
            <div style={{fontSize:"5rem", lineHeight:1, marginBottom:10}}>{selected.emoji}</div>
            <h2 style={{color:selected.accent, margin:"0 0 4px", fontSize:"1.7rem", lineHeight:1.15}}>
              {selected.name}
            </h2>
            <p style={{color:selected.accent, opacity:.75, margin:"0 0 4px", fontSize:"1rem", fontWeight:700}}>
              {selected.zh}
            </p>
            <p style={{
              color:selected.accent, opacity:.55, margin:"0 0 12px",
              fontSize:".78rem", textTransform:"uppercase", letterSpacing:".8px",
            }}>
              {selected.category}
            </p>
            <p style={{color:"#3F3258", fontSize:"1rem", lineHeight:1.6, margin:0}}>
              {selected.description}
            </p>
          </div>

          <div style={{
            width:"min(430px,92vw)", background:"white", borderRadius:18,
            border:`2px solid ${selected.accent}30`, padding:"16px",
            boxShadow:"0 3px 12px rgba(90,60,140,.10)",
          }}>
            <p style={{margin:"0 0 12px", fontSize:".95rem", fontWeight:800, color:"#3A2D52", lineHeight:1.45}}>
              {selected.question}
            </p>
            <div style={{display:"grid", gap:9}}>
              {selected.options.map(option => {
                const picked = choice === option;
                const correct = option === selected.answer;
                const bg = choice === null ? "#FFFDF8"
                          : correct ? "#DDF3D8"
                          : picked ? "#F8D6D0"
                          : "#FFFDF8";
                const border = choice === null ? `${selected.accent}30`
                              : correct ? "#62A95C"
                              : picked ? "#D07163"
                              : `${selected.accent}22`;
                return (
                  <button key={option} onClick={() => setChoice(option)} disabled={choice !== null}
                    style={{
                      background:bg, border:`2px solid ${border}`, borderRadius:13,
                      padding:"12px 13px", textAlign:"left",
                      fontSize:".92rem", fontWeight:700, color:"#3F3258",
                      cursor: choice === null ? "pointer" : "default",
                    }}>
                    {option}
                  </button>
                );
              })}
            </div>
            {choice !== null && (
              <div style={{
                marginTop:12,
                background: isCorrect ? "#F0FAEA" : "#FFF5E2",
                border:`2px solid ${isCorrect ? "#7DBB6F" : "#E7B85D"}`,
                borderRadius:13, padding:"12px 13px",
              }}>
                <p style={{margin:0, color:"#4A3D6A", fontSize:".9rem", lineHeight:1.55}}>
                  {isCorrect ? selected.feedback : `Good guess! The answer is ${selected.answer}.`}
                </p>
              </div>
            )}
          </div>

          <div style={{display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center"}}>
            <button onClick={backToGallery} style={{
              padding:"12px 24px",
              background:"linear-gradient(135deg,#B8A0D8,#7A62A8)",
              border:"none", borderRadius:50,
              fontWeight:800, color:"#FFF8EE", cursor:"pointer",
            }}>← Back</button>
            <button onClick={onExit} style={{
              padding:"12px 24px", background:"white",
              border:"2px solid #B8A0D8", borderRadius:50,
              color:"#6F5B96", fontWeight:700, cursor:"pointer",
            }}>
              Back to Wheel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
