export default function HanfuStyle({ onExit }) {
  return (
    <div style={{
      position:"fixed", inset:0,
      background:"linear-gradient(160deg,#FBF5E8,#EAF4F0)",
      display:"flex", flexDirection:"column",
      zIndex:300, fontFamily:"sans-serif",
    }}>
      <div style={{
        background:"linear-gradient(135deg,#E8C870,#D49828)",
        padding:"14px 20px", flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        boxShadow:"0 3px 12px rgba(180,120,20,.3)",
      }}>
        <span style={{fontSize:"1.2rem", fontWeight:700, color:"#3A2408"}}>
          🥻 Hanfu Style
        </span>
        <button onClick={onExit} style={{
          background:"rgba(255,255,255,.3)", border:"none",
          borderRadius:8, padding:"6px 14px",
          color:"#3A2408", fontWeight:700, cursor:"pointer",
        }}>✕ Exit</button>
      </div>
    </div>
  );
}
