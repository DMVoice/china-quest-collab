import { useRef, useEffect, useState } from "react";

const FACTS = [
  { emoji:"🐉", title:"Dragon Power!", text:"In China, dragons bring good luck and rain for crops — they're totally friendly!" },
  { emoji:"🥢", title:"Chopstick Rules!", text:"Never stick chopsticks upright in rice — it looks like funeral incense. Always lay them flat!" },
  { emoji:"🍜", title:"Noodle Magic!", text:"Long noodles mean long life in China! Never cut them — slurp them whole for good luck!" },
  { emoji:"🏮", title:"Lucky Red!", text:"Red is the luckiest color in China. It scares away evil spirits and brings happiness!" },
  { emoji:"🐼", title:"Panda Secret!", text:"Giant pandas eat bamboo for 12-16 hours every day and have special wrist bones to peel it!" },
  { emoji:"🎋", title:"Bamboo Speed!", text:"Bamboo is the fastest-growing plant on Earth — some grow 35 inches in just one day!" },
  { emoji:"🥮", title:"Moon Cake Mystery!", text:"Moon cakes were used to hide secret messages during a revolution against Mongol rulers in 1368!" },
  { emoji:"🎐", title:"Kite Inventors!", text:"China invented kites over 2,000 years ago. Ancient kites were used to send messages in battle!" },
];

export default function ScratchCard({ onExit }) {
  const canvasRef=useRef(null);
  const [fact]=useState(()=>FACTS[Math.floor(Math.random()*FACTS.length)]);
  const [revealed,setRevealed]=useState(false);
  const [pct,setPct]=useState(0);
  const drawing=useRef(false);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
    const ctx=canvas.getContext("2d");
    const grad=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    grad.addColorStop(0,"#E8C870"); grad.addColorStop(.5,"#F5DC90"); grad.addColorStop(1,"#D49828");
    ctx.fillStyle=grad; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(180,120,20,.12)"; ctx.font="20px serif";
    for(let i=0;i<canvas.width;i+=35) for(let j=0;j<canvas.height;j+=35) ctx.fillText("福",i,j+20);
    ctx.fillStyle="#C89020"; ctx.font="bold 16px sans-serif"; ctx.textAlign="center";
    ctx.fillText("✦ SCRATCH HERE ✦",canvas.width/2,canvas.height/2-8);
    ctx.font="13px sans-serif";
    ctx.fillText("Use your finger!",canvas.width/2,canvas.height/2+14);
  },[]);

  const getPos=(e,canvas)=>{
    const r=canvas.getBoundingClientRect(), src=e.touches?e.touches[0]:e;
    return [src.clientX-r.left,src.clientY-r.top];
  };
  const scratch=(e)=>{
    e.preventDefault(); if(!drawing.current)return;
    const canvas=canvasRef.current, ctx=canvas.getContext("2d");
    const [x,y]=getPos(e,canvas);
    ctx.globalCompositeOperation="destination-out";
    ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.fill();
    const d=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let clear=0; for(let i=3;i<d.length;i+=4) if(d[i]<128) clear++;
    const p=Math.round(clear/(d.length/4)*100); setPct(p);
    if(p>55) setRevealed(true);
  };

  return(
  <div style={{position:"fixed",inset:0,background:"linear-gradient(160deg,#FBF5E8,#EAF4F0)",
    display:"flex",flexDirection:"column",zIndex:300,fontFamily:"sans-serif"}}>
    <div style={{background:"linear-gradient(135deg,#E8C870,#D49828)",padding:"14px 20px",flexShrink:0,
      display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 3px 12px rgba(180,120,20,.3)"}}>
      <span style={{fontSize:"1.2rem",fontWeight:700,color:"#3A2408"}}>✨ Lucky Scratch Card</span>
      <button onClick={onExit} style={{background:"rgba(255,255,255,.3)",border:"none",borderRadius:8,
        padding:"6px 14px",color:"#3A2408",fontWeight:700,cursor:"pointer"}}>✕ Exit</button>
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",padding:"20px 16px",gap:16}}>
      <p style={{color:"#8B6030",fontSize:".9rem",margin:0}}>Scratch to reveal a fun China fact! 🐉</p>
      <div style={{width:"min(340px,90vw)",borderRadius:20,overflow:"hidden",position:"relative",
        boxShadow:"0 8px 32px rgba(0,0,0,.15)",border:"3px solid #D49828"}}>
        <div style={{padding:"28px 24px",background:"white",textAlign:"center",minHeight:180,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
          <div style={{fontSize:"4rem"}}>{fact.emoji}</div>
          <h3 style={{color:"#D49828",margin:0,fontSize:"1.2rem"}}>{fact.title}</h3>
          <p style={{color:"#4A3820",fontSize:".95rem",lineHeight:1.6,margin:0}}>{fact.text}</p>
        </div>
        {!revealed&&<canvas ref={canvasRef}
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",cursor:"crosshair",touchAction:"none"}}
          onMouseDown={()=>drawing.current=true} onMouseUp={()=>drawing.current=false} onMouseMove={scratch}
          onTouchStart={()=>drawing.current=true} onTouchEnd={()=>drawing.current=false} onTouchMove={scratch}/>}
      </div>
      {!revealed&&<div style={{width:"min(340px,90vw)"}}>
        <div style={{background:"#E0D0A0",borderRadius:10,height:8,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#E8C870,#D49828)",transition:"width .1s"}}/>
        </div>
        <p style={{textAlign:"center",fontSize:".75rem",color:"#A08050",margin:"6px 0 0"}}>
          {pct<20?"Keep scratching! 👆":pct<50?"Almost there! 🔥":"Nearly done! ⚡"}
        </p>
      </div>}
      {revealed&&<div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
        <button onClick={()=>{setRevealed(false);setPct(0);}} style={{padding:"12px 24px",
          background:"linear-gradient(135deg,#E8C870,#D49828)",border:"none",borderRadius:50,
          fontWeight:700,color:"#3A2408",cursor:"pointer"}}>New Card 🎴</button>
        <button onClick={onExit} style={{padding:"12px 24px",background:"white",
          border:"2px solid #D4A050",borderRadius:50,color:"#8B6030",cursor:"pointer"}}>Back to Wheel</button>
      </div>}
    </div>
  </div>);
}
