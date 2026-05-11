import { useState, useRef, useEffect, useMemo } from "react";
import A from "./assets";
import MODULES from "./modules/index";

const SEGS = [
  { id:"map",      zh:"\u5730\u56fe\u63a2\u7d22", img:"icon_map",     bg:"#F5F0D8", accent:"#8B7040", active:true  },
  { id:"hanfu",    zh:"\u6c49\u670d\u8bd5\u7a7f", img:"icon_hanfu",   bg:"#E0F0E8", accent:"#3A8860", active:true  },
  { id:"scratch",  zh:"\u5237\u5237\u5361",         img:"icon_scratch", bg:"#F5EAD0", accent:"#C07040", active:true  },
  { id:"quiz",     zh:"\u6587\u5316\u95ee\u7b54", img:null, emoji:"\uD83D\uDCDC", bg:"#E8ECF8", accent:"#4060A0", active:true  },
  { id:"zodiac",   zh:"\u751f\u8096\u67e5\u8be2", img:null, emoji:"\uD83D\uDC34", bg:"#F8F0DC", accent:"#A07840", active:false },
  { id:"food",     zh:"\u7f8e\u98df\u56fe\u9274", img:"icon_food",    bg:"#F8EAE0", accent:"#C06040", active:false },
  { id:"art",      zh:"\u827a\u672f\u731c\u731c", img:"icon_art",     bg:"#F0E4F8", accent:"#8048A0", active:false },
  { id:"festival", zh:"\u8282\u65e5\u6545\u4e8b", img:"icon_festival",bg:"#F8E4E4", accent:"#B04040", active:false },
];
const NAV = [
  { img:"nav1", en:"Daily Reward"  },
  { img:"nav2", en:"Achievements"  },
  { img:"nav3", en:"Culture Tips"  },
  { img:null, en:"Favorites", emoji:"\u2B50" },
];
const N=SEGS.length, DEG=360/N;
const CX=200,CY=200,OR=170,IR=58;
const p=(r,d)=>{const rad=(d-90)*Math.PI/180;return[CX+r*Math.cos(rad),CY+r*Math.sin(rad)];};
const arc=(r1,r2,a1,a2)=>{
  const[x1,y1]=p(r1,a1),[x2,y2]=p(r1,a2),[x3,y3]=p(r2,a2),[x4,y4]=p(r2,a1);
  return `M${x1},${y1} A${r1},${r1} 0 0,1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 0,0 ${x4},${y4}Z`;
};
const Petal=({x,delay,dur,rot})=>(
  <div style={{position:"absolute",left:x+"%",top:-20,width:10,height:8,
    background:"radial-gradient(ellipse,#FFB8C8,#FF8EAC)",borderRadius:"50% 0 50% 0",
    transform:`rotate(${rot}deg)`,opacity:.7,animation:`fall ${dur}s ${delay}s infinite linear`,
    pointerEvents:"none"}}/>
);

export default function App(){
  const[rot,setRot]=useState(0);
  const[spinning,setSpinning]=useState(false);
  const[result,setResult]=useState(null);
  const[show,setShow]=useState(false);
  const[activeModule,setActiveModule]=useState(null);
  const total=useRef(0);
  const petals=useMemo(()=>Array.from({length:12},(_,i)=>({x:i*8+2,delay:i*.8,dur:6+(i%3)*2,rot:i*30})),[]);
  useEffect(()=>{
    const el=document.createElement("link");
    el.rel="stylesheet";
    el.href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@600&display=swap";
    document.head.appendChild(el);
  },[]);
  const spin=()=>{
    if(spinning)return;
    setSpinning(true); setShow(false);
    const nr=total.current+(7+Math.random()*5)*360+Math.random()*360;
    total.current=nr; setRot(nr);
    setTimeout(()=>{
      const norm=((nr%360)+360)%360;
      setResult(SEGS[Math.floor(((360-norm)%360)/DEG)%N]);
      setSpinning(false);
      setTimeout(()=>setShow(true),180);
    },5000);
  };
  return(
  <div style={{width:"100%",minHeight:"100vh",position:"relative",overflow:"hidden",
    background:"linear-gradient(180deg,#B8DEF0,#CBE8F4 25%,#DCF0DC 62%,#EDE8C4)",
    maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",fontFamily:"sans-serif"}}>
    <svg style={{position:"absolute",top:0,left:0,width:"100%",height:"58%",pointerEvents:"none"}} viewBox="0 0 480 280" preserveAspectRatio="xMidYMax slice">
      <ellipse cx="80" cy="42" rx="52" ry="22" fill="white" opacity=".7"/>
      <ellipse cx="380" cy="50" rx="55" ry="23" fill="white" opacity=".65"/>
      <ellipse cx="220" cy="28" rx="40" ry="17" fill="white" opacity=".42"/>
      <g opacity=".5"><line x1="6" y1="280" x2="9" y2="215" stroke="#8B5E3C" strokeWidth="5"/>
        <circle cx="0" cy="200" r="20" fill="#F4B0C4" opacity=".7"/>
        <circle cx="16" cy="194" r="16" fill="#F0A0B8" opacity=".62"/></g>
      <g opacity=".5"><line x1="474" y1="280" x2="471" y2="212" stroke="#8B5E3C" strokeWidth="5"/>
        <circle cx="480" cy="198" r="20" fill="#F4B0C4" opacity=".7"/>
        <circle cx="462" cy="194" r="16" fill="#F0A0B8" opacity=".62"/></g>
      <path d="M0,272 Q120,256 240,263 Q360,270 480,260 L480,280 L0,280Z" fill="#B8D898" opacity=".38"/>
    </svg>
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {petals.map((pt,i)=><Petal key={i} {...pt}/>)}
    </div>
    <div style={{background:"linear-gradient(90deg,#C8A8E0,#E8B8C8,#F0D0A0,#E8B8C8,#C8A8E0)",height:6}}/>
    <div style={{background:"linear-gradient(90deg,#F0E8C8,#FCF4E0,#F0E8C8)",height:3}}/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px 3px",position:"relative",zIndex:5}}>
      <button style={{width:50,height:50,background:"linear-gradient(135deg,#F0E0BC,#E8C880)",border:"3px solid #C8A040",
        borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.3rem"}}>
        {"\uD83D\uDC66"}
      </button>
      <div style={{textAlign:"center",flex:1}}>
        <img src={A.logo} style={{display:"block",margin:"0 auto",width:"min(210px,55vw)",height:"auto"}} alt="China Quest"/>
      </div>
      <button style={{width:50,height:50,background:"linear-gradient(135deg,#F0E0BC,#E8C880)",border:"3px solid #C8A040",
        borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.3rem"}}>
        {"\u2699\uFE0F"}
      </button>
    </div>
    <div style={{textAlign:"center",margin:"2px 28px 5px",
      borderTop:"1px solid rgba(200,140,60,.28)",borderBottom:"1px solid rgba(200,140,60,.28)",
      padding:"2px 0",position:"relative",zIndex:5,fontSize:".68rem",color:"#8B5A20",letterSpacing:"3px"}}>
      {"\u2741 \u73A9\u4E2D\u5B66\u4E60 \u00B7 \u4F20\u627F\u6587\u5316 \u2741"}
    </div>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",position:"relative",zIndex:5,marginTop:4}}>
      <div style={{animation:"swayL 5s ease-in-out infinite",transformOrigin:"top center",paddingTop:4,flexShrink:0}}>
        <img src={A.lantern} style={{width:64,height:"auto",display:"block"}} alt=""/>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{marginBottom:-2,zIndex:2,filter:"drop-shadow(0 4px 8px rgba(160,100,10,.6))"}}>
          <svg width="28" height="32" viewBox="0 0 28 32">
            <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5D560"/><stop offset="100%" stopColor="#C09020"/>
            </linearGradient></defs>
            <path d="M14,30 L2,2 Q14,11 26,2Z" fill="url(#pg)" stroke="#A07010" strokeWidth="1"/>
          </svg>
        </div>
        <svg width="100%" viewBox="0 0 400 400"
          style={{maxWidth:314,transform:`rotate(${rot}deg)`,
            transition:spinning?"transform 5s cubic-bezier(.06,.7,.08,1)":"none",
            filter:"drop-shadow(0 10px 30px rgba(0,0,0,.18))"}}>
          <defs>{SEGS.map(s=>(
            <radialGradient key={s.id} id={`g${s.id}`} cx="35%" cy="28%">
              <stop offset="0%" stopColor="white" stopOpacity=".6"/><stop offset="100%" stopColor={s.bg}/>
            </radialGradient>
          ))}</defs>
          <circle cx={CX} cy={CY} r={197} fill="#D4C090" opacity=".3"/>
          <circle cx={CX} cy={CY} r={193} fill="#F5EDD8"/>
          <circle cx={CX} cy={CY} r={188} fill="#D4A070" opacity=".22"/>
          <circle cx={CX} cy={CY} r={184} fill="#FBF5EE"/>
          {Array.from({length:48}).map((_,i)=>{const[px,py]=p(191,i*7.5);return(
            <circle key={i} cx={px} cy={py} r={i%6===0?3.5:1.8} fill={i%6===0?"#C49028":"#D8AC48"}/>
          )})}
          {SEGS.map((s,i)=>{
            const a1=i*DEG,a2=(i+1)*DEG,mid=a1+DEG/2;
            const[ix,iy]=p(130,mid),[tx,ty]=p(95,mid);
            return(<g key={s.id}>
              <path d={arc(OR,IR,a1,a2)} fill={s.active?`url(#g${s.id})`:"#EDE6D8"} stroke="#F0CCA0" strokeWidth="2.5" opacity={s.active?1:.38}/>
              {s.img
                ? <image href={A[s.img]} x={ix-24} y={iy-24} width={48} height={48}
                    opacity={s.active?1:.25} transform={`rotate(${mid},${ix},${iy})`}/>
                : <text x={ix} y={iy} textAnchor="middle" dominantBaseline="middle" fontSize="22"
                    opacity={s.active?1:.25} transform={`rotate(${mid},${ix},${iy})`}>{s.emoji}</text>
              }
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontFamily="'Noto Serif SC',serif" fontWeight="600"
                fill={s.active?s.accent:"#B8AA90"} transform={`rotate(${mid},${tx},${ty})`}>{s.zh}</text>
            </g>);
          })}
          {SEGS.map((_,i)=>{const[ox,oy]=p(OR,i*DEG),[ix2,iy2]=p(IR,i*DEG);return(
            <line key={i} x1={ix2} y1={iy2} x2={ox} y2={oy} stroke="#F0CCA0" strokeWidth="2.5"/>
          )})}
          <circle cx={CX} cy={CY} r={64} fill="#C89020"/>
          <circle cx={CX} cy={CY} r={57} fill="#FFF8DC"/>
          <circle cx={CX} cy={CY} r={50} fill="#FFFBF0" opacity=".9"/>
          {[0,60,120,180,240,300].map(a=>{const[px,py]=p(60,a);return(
            <circle key={a} cx={px} cy={py} r={3} fill="#C89020" opacity=".55"/>
          )})}
          <text x={CX} y={CY+6} textAnchor="middle" dominantBaseline="middle"
            fontSize="44" fontFamily="'Ma Shan Zheng',serif" fill="#B87818">{"\u798F"}</text>
        </svg>
        <div style={{width:"min(264px,70vw)",height:15,background:"linear-gradient(180deg,#E8A080,#C87050)",borderRadius:"50%",boxShadow:"0 8px 18px rgba(180,80,40,.4)",marginTop:-5}}/>
        <div style={{width:"min(220px,58vw)",height:9,background:"linear-gradient(180deg,#C87050,#A85030)",borderRadius:"50%"}}/>
      </div>
      <div style={{animation:"swayR 4.5s ease-in-out infinite",transformOrigin:"top center",paddingTop:4,flexShrink:0}}>
        <img src={A.lantern} style={{width:64,height:"auto",display:"block",transform:"scaleX(-1)"}} alt=""/>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 4px",position:"relative",zIndex:5,marginTop:-10}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{background:"white",border:"2px solid #D4A040",borderRadius:11,
          padding:"5px 9px",fontSize:".64rem",color:"#6A4820",lineHeight:1.6,maxWidth:105,
          boxShadow:"0 3px 10px rgba(0,0,0,.12)",marginBottom:3,position:"relative"}}>
          Spin the wheel!<br/>Pick your adventure!
          <div style={{position:"absolute",bottom:-9,right:14,width:0,height:0,
            borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderTop:"9px solid white"}}/>
          <div style={{position:"absolute",bottom:-12,right:12,width:0,height:0,
            borderLeft:"9px solid transparent",borderRight:"9px solid transparent",borderTop:"12px solid #D4A040"}}/>
        </div>
        <img src={A.child} style={{width:108,height:"auto",animation:"bounce 3s ease-in-out infinite"}} alt=""/>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,paddingBottom:4}}>
        <button onClick={spin} disabled={spinning} style={{
          padding:"11px 26px",fontFamily:"'Cinzel',serif",fontSize:".95rem",letterSpacing:"2px",
          background:spinning?"linear-gradient(135deg,#D8C8A0,#C8B880)":"linear-gradient(135deg,#F0D060,#D49828 45%,#F0D060)",
          border:`2px solid ${spinning?"#C0B078":"#B87E10"}`,borderRadius:50,
          color:spinning?"#A89840":"#3A2408",cursor:spinning?"not-allowed":"pointer",
          boxShadow:spinning?"none":"0 5px 22px rgba(190,120,15,.5)",
          transition:"all .3s",animation:spinning?"none":"pulse 2.5s ease-in-out infinite"}}>
          {spinning?"Spinning...":"SPIN!"}
        </button>
        <p style={{color:"#8B6030",fontSize:".58rem",margin:0,letterSpacing:"1px",textAlign:"center",
          fontFamily:"'Noto Serif SC',serif"}}>{"\u8f6c\u52a8\u8f6e\u76d8 \u00B7 \u5f00\u542f\u51a0\u9669"}</p>
      </div>
      <img src={A.panda} style={{width:112,height:"auto",animation:"pandaSway 4s ease-in-out infinite"}} alt=""/>
    </div>
    <div style={{display:"flex",justifyContent:"space-around",padding:"7px 6px 11px",
      background:"linear-gradient(to top,rgba(235,215,165,.97),rgba(248,232,192,.93))",
      borderTop:"3px solid #D4A040",position:"relative",zIndex:10,marginTop:4}}>
      {NAV.map(item=>(
        <button key={item.en} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,
          background:"linear-gradient(135deg,#F5E8BC,#E8CC80)",border:"2px solid #C89C38",
          borderRadius:13,padding:"6px 7px",cursor:"pointer",
          boxShadow:"0 3px 10px rgba(170,110,15,.2)",minWidth:56}}>
          {item.img
            ? <img src={A[item.img]} style={{width:40,height:40,objectFit:"contain"}} alt={item.en}/>
            : <span style={{fontSize:"1.5rem",lineHeight:"40px"}}>{item.emoji}</span>
          }
          <span style={{fontSize:".54rem",color:"#7A4E18",fontWeight:700,textAlign:"center"}}>{item.en}</span>
        </button>
      ))}
    </div>
    <div style={{textAlign:"center",padding:"4px",
      background:"linear-gradient(90deg,#C8A8E0,#E8B8C8,#C8A8E0)",
      color:"#5A2060",fontSize:".56rem",letterSpacing:"3px"}}>
      {"\u2746 Play \u00B7 Learn \u00B7 Grow \u00B7 \u5BC4\u6559\u4E8E\u4E50 \u2746"}
    </div>
    {show&&result&&(
      <div onClick={()=>setShow(false)} style={{position:"fixed",inset:0,background:"rgba(40,18,8,.52)",
        backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",
        zIndex:200,animation:"fadeIn .25s ease"}}>
        <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:24,maxWidth:330,
          width:"88%",overflow:"hidden",boxShadow:"0 28px 80px rgba(0,0,0,.3)",
          animation:"springUp .45s cubic-bezier(.34,1.56,.64,1)"}}>
          <div style={{background:result.bg,padding:"26px 26px 18px",textAlign:"center"}}>
            {result.img
              ? <img src={A[result.img]} style={{width:80,height:80,objectFit:"contain",marginBottom:8}} alt=""/>
              : <span style={{fontSize:"3.5rem",display:"block",marginBottom:8}}>{result.emoji}</span>
            }
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"1.4rem",color:result.accent,margin:"0 0 2px",letterSpacing:"2px"}}>
              {result.id==="map"?"City Quest":result.id==="hanfu"?"Hanfu Style":result.id==="scratch"?"Lucky Card":result.id==="quiz"?"Culture Quiz":result.id==="zodiac"?"Zodiac":result.id==="food"?"Foodie":result.id==="art"?"Art Guess":"Festival"}
            </h2>
            <p style={{color:result.accent,opacity:.65,margin:0,fontSize:".73rem",fontFamily:"'Ma Shan Zheng',serif",letterSpacing:"3px"}}>{result.zh}</p>
          </div>
          <div style={{padding:"16px 22px 20px",textAlign:"center"}}>
            <p style={{color:"#6A5038",fontSize:".88rem",lineHeight:1.85,margin:"0 0 16px"}}>
              {result.active?"Tap below to start your cultural adventure!":"Coming soon! Check back later."}
            </p>
            {result.active
              ? <button onClick={()=>{setShow(false);setActiveModule(result.id);}}
                style={{width:"100%",padding:"12px",background:result.bg,color:result.accent,
                  border:`2px solid ${result.accent}55`,borderRadius:12,fontSize:".92rem",
                  fontFamily:"'Cinzel',serif",fontWeight:700,cursor:"pointer",letterSpacing:"2px"}}>
                  Go! &#x2192;
                </button>
              : <div style={{padding:"11px",background:"#F5EFE5",borderRadius:11,color:"#B0A080",fontSize:".83rem"}}>
                  Coming Soon!
                </div>
            }
            <button onClick={()=>setShow(false)} style={{marginTop:10,background:"none",border:"none",
              color:"#C0B090",fontSize:".73rem",cursor:"pointer"}}>Close</button>
          </div>
        </div>
      </div>
    )}
    {activeModule && MODULES[activeModule] && (() => {
      const Module = MODULES[activeModule];
      return <Module onExit={()=>setActiveModule(null)}/>;
    })()}
    <style>{`
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes springUp{from{opacity:0;transform:translateY(50px) scale(.82)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes pulse{0%,100%{box-shadow:0 5px 22px rgba(190,120,15,.5)}50%{box-shadow:0 8px 36px rgba(190,120,15,.82)}}
      @keyframes swayL{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(4deg)}}
      @keyframes swayR{0%,100%{transform:rotate(5deg)}50%{transform:rotate(-4deg)}}
      @keyframes pandaSway{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(3deg) translateY(-7px)}}
      @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:.7}100%{transform:translateY(110vh) rotate(720deg);opacity:.05}}
    `}</style>
  </div>);
}