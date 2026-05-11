// ============================================================
// MODULE TEMPLATE - Copy this to create a new module
// ============================================================
// Steps:
// 1. Copy this file → rename (e.g. HanfuStyle.jsx)
// 2. Change "MyModule" to your module name
// 3. Build your content inside
// 4. Open modules/index.js → add import + register
// ============================================================

import { useState } from "react";

export default function MyModule({ onExit }) {
  const [step, setStep] = useState(0);

  return (
    <div style={{
      position:"fixed", inset:0,
      background:"linear-gradient(160deg,#FBF5E8,#EAF4F0)",
      display:"flex", flexDirection:"column",
      zIndex:300, fontFamily:"sans-serif",
    }}>
      {/* ── Header (keep this) ── */}
      <div style={{
        background:"linear-gradient(135deg,#E8C870,#D49828)",
        padding:"14px 20px", flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        boxShadow:"0 3px 12px rgba(180,120,20,.3)",
      }}>
        <span style={{fontSize:"1.2rem", fontWeight:700, color:"#3A2408"}}>
          🎮 My Module Title
        </span>
        <button onClick={onExit} style={{
          background:"rgba(255,255,255,.3)", border:"none",
          borderRadius:8, padding:"6px 14px",
          color:"#3A2408", fontWeight:700, cursor:"pointer",
        }}>✕ Exit</button>
      </div>

      {/* ── Your content here ── */}
      <div style={{
        flex:1, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:24, gap:16, textAlign:"center",
      }}>
        <h2 style={{color:"#3A2408"}}>Build your activity here! 🎉</h2>
        <p style={{color:"#8B6030", maxWidth:300}}>
          Replace this with your module content.
          Use step state to move between screens.
        </p>
        <button onClick={onExit} style={{
          padding:"12px 28px",
          background:"linear-gradient(135deg,#E8C870,#D49828)",
          border:"none", borderRadius:50,
          fontWeight:700, color:"#3A2408", cursor:"pointer",
        }}>
          Back to Wheel
        </button>
      </div>
    </div>
  );
}
