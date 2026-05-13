import { useState, useRef, useEffect, useMemo } from "react";
import A from "./assets";
import MODULES from "./modules/index";

const SEGS = [
  { id:"map",      en:"City Quest",   img:"icon_map",      bg:"#FFF4DA", accent:"#8A6330", active:true  },
  { id:"hanfu",    en:"Hanfu Style",  img:"icon_hanfu",    bg:"#E6F4EA", accent:"#3F8468", active:true  },
  { id:"scratch",  en:"Lucky Card",   img:"icon_scratch",  bg:"#FFE7D6", accent:"#B86B45", active:true  },
  { id:"quiz",     en:"Culture Quiz", img:null, emoji:"📜", bg:"#EAF1FF", accent:"#526FA8", active:true  },
  { id:"zodiac",   en:"Zodiac",       img:null, emoji:"🐴", bg:"#FFF2D2", accent:"#A9783B", active:false },
  { id:"food",     en:"Foodie",       img:"icon_food",     bg:"#FFEBDD", accent:"#B86B45", active:false },
  { id:"art",      en:"Art Guess",    img:"icon_art",      bg:"#F1EAFE", accent:"#7A62A8", active:false },
  { id:"festival", en:"Festival",     img:"icon_festival", bg:"#FFE5E8", accent:"#B85F62", active:false },
];

const NAV = [
  { img:"nav1", en:"Daily Reward", short:"Reward" },
  { img:"nav2", en:"Achievements", short:"Badges" },
  { img:"nav3", en:"Culture Tips", short:"Tips" },
  { img:"nav4", en:"Favorites", short:"Saved" },
];

const N=SEGS.length, DEG=360/N;
const CX=200, CY=200, OR=170, IR=58;
const pol=(r,d)=>{const rad=(d-90)*Math.PI/180;return[CX+r*Math.cos(rad),CY+r*Math.sin(rad)];};
const arc=(r1,r2,a1,a2)=>{
  const[x1,y1]=pol(r1,a1),[x2,y2]=pol(r1,a2),[x3,y3]=pol(r2,a2),[x4,y4]=pol(r2,a1);
  return `M${x1},${y1} A${r1},${r1} 0 0,1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 0,0 ${x4},${y4}Z`;
};

const Petal=({x,delay,dur,rot})=>(
  <div style={{position:"absolute",left:x+"%",top:-20,width:"clamp(7px,2vw,13px)",height:"clamp(6px,1.6vw,10px)",
    background:"radial-gradient(ellipse,#FFD3DD,#FFA8BA)",borderRadius:"50% 0 50% 0",
    transform:`rotate(${rot}deg)`,opacity:.62,
    animation:`fall ${dur}s ${delay}s infinite linear`,pointerEvents:"none"}}/>
);

export function ChinaQuestHome({ mode="mobile" }){
  const isDisplay=mode==="display";
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

  const wheelMax=isDisplay?"min(66vh,620px)":"min(96vw,430px)";
  const sideCharacter=isDisplay?"clamp(140px,13vw,210px)":"clamp(72px,23vw,112px)";
  const headerButton=isDisplay?"clamp(76px,8vw,112px)":"clamp(48px,16vw,76px)";
  const logoWidth=isDisplay?"clamp(360px,42vw,640px)":"clamp(174px,58vw,270px)";

  return(
  <div style={{width:"100%",minHeight:"100dvh",position:"relative",overflow:"hidden",
    background:isDisplay
      ?"linear-gradient(180deg,#8ED3F4 0%,#CDEEF9 30%,#F8EECF 66%,#F7C6B6 100%)"
      :"linear-gradient(180deg,#AEE1F7 0%,#D8F2FB 30%,#F7F1D7 67%,#F6C7B7 100%)",
    margin:"0 auto",display:"flex",flexDirection:"column",fontFamily:"sans-serif",
    maxWidth:isDisplay?"none":480}}>

    {isDisplay&&(
      <div style={{position:"absolute",inset:"0",pointerEvents:"none",
        background:"radial-gradient(circle at 18% 82%,rgba(114,177,159,.35),transparent 22%),radial-gradient(circle at 82% 78%,rgba(255,184,168,.35),transparent 24%)"}}/>
    )}

    {/* Sky background */}
    <svg style={{position:"absolute",top:0,left:0,width:"100%",height:isDisplay?"72%":"54%",pointerEvents:"none"}}
      viewBox="0 0 480 290" preserveAspectRatio="xMidYMax slice">
      <ellipse cx="80" cy="42" rx="52" ry="22" fill="white" opacity=".7"/>
      <ellipse cx="380" cy="50" rx="55" ry="23" fill="white" opacity=".65"/>
      <ellipse cx="220" cy="28" rx="40" ry="17" fill="white" opacity=".42"/>
      <g opacity=".2" fill="#6B4020">
        {[0,1,2,3,4].map(i=><rect key={i} x={415+i*2} y={190-i*10} width={28-i*4} height={7} rx="1"/>)}
        <rect x="410" y="196" width="40" height="5" rx="1"/>
      </g>
      <g opacity=".5">
        <line x1="6" y1="290" x2="9" y2="215" stroke="#8B5E3C" strokeWidth="5"/>
        <circle cx="0" cy="200" r="20" fill="#F4B0C4" opacity=".7"/>
        <circle cx="16" cy="194" r="16" fill="#F0A0B8" opacity=".62"/>
      </g>
      <g opacity=".5">
        <line x1="474" y1="290" x2="471" y2="212" stroke="#8B5E3C" strokeWidth="5"/>
        <circle cx="480" cy="198" r="20" fill="#F4B0C4" opacity=".7"/>
        <circle cx="462" cy="194" r="16" fill="#F0A0B8" opacity=".62"/>
      </g>
      <path d="M0,272 Q120,256 240,263 Q360,270 480,260 L480,290 L0,290Z" fill="#94CFAE" opacity=".38"/>
    </svg>

    {/* Petals */}
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {petals.map((pt,i)=><Petal key={i} {...pt}/>)}
    </div>

    {/* Top frame */}
    <div style={{background:"linear-gradient(90deg,#F6B5AE,#F6D58D,#8ECDB7,#F6D58D,#F6B5AE)",height:isDisplay?8:5}}/>
    <div style={{background:"linear-gradient(90deg,#FFF5D8,#FFFDF2,#FFF5D8)",height:isDisplay?5:3}}/>

    {/* Header */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:isDisplay?"clamp(12px,2vh,24px) clamp(28px,5vw,70px) 4px":"clamp(4px,1.5vw,8px) clamp(8px,3vw,14px) 0",
      position:"relative",zIndex:5}}>
      <button style={{width:headerButton,height:headerButton,background:"rgba(255,250,236,.76)",border:"2px solid rgba(219,166,81,.55)",
        borderRadius:"50%",boxShadow:"0 8px 22px rgba(150,92,32,.14)",
        cursor:"pointer",flexShrink:0,padding:0}}>
        <img src={A.avatar} style={{width:"100%",height:"100%",objectFit:"contain"}} alt=""/>
      </button>

      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",minWidth:0}}>
        <div style={{position:"relative",padding:isDisplay?"clamp(10px,1.4vw,18px) clamp(34px,4vw,66px)":"6px clamp(12px,3vw,20px)",
          borderRadius:isDisplay?"34px":"22px",
          background:"linear-gradient(180deg,rgba(255,252,240,.96),rgba(255,241,205,.94))",
          border:"2px solid rgba(220,166,72,.58)",
          boxShadow:isDisplay?"0 14px 34px rgba(129,80,28,.2), inset 0 0 0 4px rgba(255,255,255,.42)":"0 8px 22px rgba(129,80,28,.15)"}}>
          <img src={A.logo} style={{width:logoWidth,maxWidth:"100%",height:"auto",display:"block"}} alt="China Quest"/>
          {isDisplay&&<div style={{position:"absolute",left:"18%",right:"18%",bottom:"-16px",
            background:"linear-gradient(180deg,#78C8B6,#4BA78F)",color:"#FFF8DE",
            border:"2px solid rgba(255,233,167,.85)",borderRadius:14,textAlign:"center",
            fontFamily:"'Noto Serif SC',serif",fontWeight:700,fontSize:"clamp(.95rem,1.55vw,1.35rem)",
            letterSpacing:"clamp(2px,.4vw,6px)",padding:"4px 10px",boxShadow:"0 8px 18px rgba(40,110,95,.2)"}}>
            Play · Learn · Discover
          </div>}
        </div>
      </div>

      <button style={{width:headerButton,height:headerButton,background:"rgba(255,250,236,.76)",border:"2px solid rgba(219,166,81,.55)",
        borderRadius:"50%",boxShadow:"0 8px 22px rgba(150,92,32,.14)",
        cursor:"pointer",flexShrink:0,padding:0}}>
        <img src={A.settings} style={{width:"100%",height:"100%",objectFit:"contain"}} alt=""/>
      </button>
    </div>

    {/* Subtitle */}
    {!isDisplay&&<div style={{textAlign:"center",margin:"2px clamp(30px,10vw,52px) 2px",
      borderTop:"1px solid rgba(200,140,60,.28)",borderBottom:"1px solid rgba(200,140,60,.28)",
      padding:"2px 0",position:"relative",zIndex:5,
      fontSize:"clamp(.6rem,2.6vw,.72rem)",color:"#8B5A20",letterSpacing:"clamp(1px,.8vw,3px)"}}>
      ❁ Play · Learn · Discover ❁
    </div>}

    {/* Lanterns + Wheel */}
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",
      position:"relative",zIndex:5,marginTop:isDisplay?"clamp(24px,4vh,48px)":2,
      width:isDisplay?"min(100%,1180px)":"100%",alignSelf:"center",padding:isDisplay?"0 clamp(34px,5vw,72px)":"0 2px"}}>

      {/* Left lantern */}
      <div style={{animation:"swayL 5s ease-in-out infinite",transformOrigin:"top center",
        paddingTop:isDisplay?0:4,flexShrink:0,overflow:"hidden",
        position:isDisplay?"static":"absolute",left:isDisplay?"auto":2,top:isDisplay?"auto":0}}>
        <img src={A.lantern} style={{width:isDisplay?"clamp(86px,10vw,142px)":"clamp(34px,10vw,54px)",height:"auto",display:"block"}} alt=""/>
      </div>

      {/* Wheel */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",minWidth:0}}>
        {/* Pointer */}
        <div style={{marginBottom:isDisplay?-8:-4,zIndex:2,filter:"drop-shadow(0 5px 10px rgba(160,100,10,.45))"}}>
          <svg width={isDisplay?54:34} height={isDisplay?60:38} viewBox="0 0 28 32">
            <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF0A8"/><stop offset="100%" stopColor="#D79A36"/>
            </linearGradient></defs>
            <path d="M14,30 L2,2 Q14,11 26,2Z" fill="url(#pg)" stroke="#B98328" strokeWidth="1"/>
          </svg>
        </div>

        {/* SVG Wheel */}
        <svg width="100%" viewBox="0 0 400 400"
          style={{width:wheelMax,maxWidth:"100%",transform:`rotate(${rot}deg)`,
            transition:spinning?"transform 5s cubic-bezier(.06,.7,.08,1)":"none",
            filter:isDisplay?"drop-shadow(0 22px 36px rgba(111,72,30,.24))":"drop-shadow(0 10px 18px rgba(111,72,30,.16))"}}>
          <defs>
            {SEGS.map(s=>(
              <radialGradient key={s.id} id={`g${s.id}`} cx="35%" cy="28%">
                <stop offset="0%" stopColor="white" stopOpacity=".6"/>
                <stop offset="100%" stopColor={s.bg}/>
              </radialGradient>
            ))}
          </defs>
          {/* Rings */}
          <circle cx={CX} cy={CY} r={198} fill="#F7B6A5" opacity=".42"/>
          <circle cx={CX} cy={CY} r={193} fill="#FFF3D8"/>
          <circle cx={CX} cy={CY} r={188} fill="#E7B85D" opacity=".42"/>
          <circle cx={CX} cy={CY} r={182} fill="#FFF9EA"/>
          {Array.from({length:48}).map((_,i)=>{
            const[px,py]=pol(191,i*7.5);
            return <circle key={i} cx={px} cy={py} r={i%6===0?4:2} fill={i%6===0?"#F8D878":"#E0B84F"}/>;
          })}
          {/* Segments */}
          {SEGS.map((s,i)=>{
            const a1=i*DEG,a2=(i+1)*DEG,mid=a1+DEG/2;
            const[ix,iy]=pol(isDisplay?127:130,mid);
            const[tx,ty]=pol(isDisplay?88:91,mid);
            return(<g key={s.id}>
              <path d={arc(OR,IR,a1,a2)} fill={s.active?`url(#g${s.id})`:"#EDE6D8"}
                stroke="#F0CCA0" strokeWidth="2.5" opacity={s.active?1:.38}/>
              {s.img
                ? <image href={A[s.img]} x={ix-(isDisplay?31:29)} y={iy-(isDisplay?31:29)} width={isDisplay?62:58} height={isDisplay?62:58}
                    opacity={s.active?1:.25} transform={`rotate(${mid},${ix},${iy})`}/>
                : <text x={ix} y={iy} textAnchor="middle" dominantBaseline="middle"
                    fontSize={isDisplay?32:29} opacity={s.active?1:.25}
                    transform={`rotate(${mid},${ix},${iy})`}>{s.emoji}</text>
              }
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                fontSize={isDisplay?9.8:9.2} fontFamily="'Cinzel',serif" fontWeight="700"
                fill={s.active?s.accent:"#B8AA90"}
                transform={`rotate(${mid},${tx},${ty})`}>{s.en}</text>
            </g>);
          })}
          {/* Dividers */}
          {SEGS.map((_,i)=>{
            const[ox,oy]=pol(OR,i*DEG),[ix2,iy2]=pol(IR,i*DEG);
            return <line key={i} x1={ix2} y1={iy2} x2={ox} y2={oy} stroke="#F0CCA0" strokeWidth="2.5"/>;
          })}
          {/* Center */}
          <circle cx={CX} cy={CY} r={66} fill="#DFA544"/>
          <circle cx={CX} cy={CY} r={59} fill="#FFF1C4"/>
          <circle cx={CX} cy={CY} r={51} fill="#FFF9E8" opacity=".94"/>
          {[0,60,120,180,240,300].map(a=>{const[px,py]=pol(60,a);return(
            <circle key={a} cx={px} cy={py} r={3} fill="#C89020" opacity=".55"/>
          )})}
          <image href={A.fu} x={CX-54} y={CY-54} width={108} height={108}/>
        </svg>

        {/* Platform */}
        <div style={{width:isDisplay?"min(560px,58vw)":"min(330px,84vw)",height:isDisplay?30:18,
          background:"linear-gradient(180deg,#F8C3A4,#E78773)",borderRadius:"50%",
          boxShadow:"0 8px 20px rgba(180,90,55,.22)",marginTop:isDisplay?-10:-6}}/>
      </div>

      {/* Right lantern */}
      <div style={{animation:"swayR 4.5s ease-in-out infinite",transformOrigin:"top center",
        paddingTop:isDisplay?0:4,flexShrink:0,overflow:"hidden",
        position:isDisplay?"static":"absolute",right:isDisplay?"auto":2,top:isDisplay?"auto":0}}>
        <img src={A.lantern} style={{width:isDisplay?"clamp(86px,10vw,142px)":"clamp(34px,10vw,54px)",height:"auto",display:"block",transform:"scaleX(-1)"}} alt=""/>
      </div>
    </div>

    {/* Characters + Spin */}
    <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",
      padding:isDisplay?"0 clamp(44px,8vw,140px)":"0 clamp(4px,1.5vw,8px)",
      position:"relative",zIndex:5,marginTop:isDisplay?"clamp(-72px,-5vh,-38px)":"clamp(-32px,-7vw,-16px)"}}>

      {/* Child + bubble */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{background:"white",border:"2px solid #D4A040",borderRadius:11,
          padding:isDisplay?"10px 16px":"5px 9px",fontSize:isDisplay?"clamp(.9rem,1.2vw,1.08rem)":"clamp(.56rem,2.4vw,.68rem)",
          color:"#6A4820",lineHeight:1.5,maxWidth:isDisplay?210:112,
          boxShadow:"0 3px 10px rgba(0,0,0,.12)",marginBottom:3,position:"relative"}}>
          Spin the wheel!<br/>Pick your adventure!
          <div style={{position:"absolute",bottom:-9,right:14,width:0,height:0,
            borderLeft:"7px solid transparent",borderRight:"7px solid transparent",
            borderTop:"9px solid white"}}/>
          <div style={{position:"absolute",bottom:-12,right:12,width:0,height:0,
            borderLeft:"9px solid transparent",borderRight:"9px solid transparent",
            borderTop:"12px solid #D4A040"}}/>
        </div>
        <img src={A.child} style={{width:sideCharacter,height:"auto",
          animation:"bounce 3s ease-in-out infinite"}} alt=""/>
      </div>

      {/* Spin button */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:isDisplay?8:3,paddingBottom:isDisplay?26:4}}>
        <button onClick={spin} disabled={spinning} style={{
          minHeight:isDisplay?64:50,padding:isDisplay?"16px 46px":"12px clamp(30px,10vw,44px)",
          fontFamily:"'Cinzel',serif",fontSize:isDisplay?"clamp(1.25rem,1.8vw,1.7rem)":"clamp(1rem,4.6vw,1.2rem)",letterSpacing:"2px",
          background:spinning?"linear-gradient(135deg,#D8C8A0,#C8B880)":"linear-gradient(135deg,#FFF0A8,#E3A13D 46%,#FFD978)",
          border:`3px solid ${spinning?"#C0B078":"#B87E10"}`,borderRadius:999,
          color:spinning?"#A89840":"#3A2408",cursor:spinning?"not-allowed":"pointer",
          boxShadow:spinning?"none":"0 8px 24px rgba(190,120,15,.38)",
          transition:"all .3s",animation:spinning?"none":"pulse 2.5s ease-in-out infinite"}}>
          {spinning?"Spinning...":"SPIN!"}
        </button>
        <p style={{color:"#8B6030",fontSize:isDisplay?"clamp(.9rem,1.2vw,1rem)":"clamp(.62rem,2.7vw,.74rem)",margin:0,letterSpacing:"1px",textAlign:"center"}}>
          Spin to start your adventure!
        </p>
      </div>

      {/* Panda */}
      <img src={A.panda} style={{width:sideCharacter,height:"auto",
        animation:"pandaSway 4s ease-in-out infinite"}} alt=""/>
    </div>

    {/* Bottom Nav */}
    <div style={{display:"flex",justifyContent:"space-between",
      padding:isDisplay?"12px clamp(46px,9vw,160px)":"7px clamp(5px,2vw,8px)",gap:isDisplay?18:5,
      background:"linear-gradient(to top,rgba(235,215,165,.97),rgba(248,232,192,.93))",
      borderTop:"3px solid #D4A040",position:"relative",zIndex:10,marginTop:"auto",
      paddingBottom:"max(10px,env(safe-area-inset-bottom))"}}>
      {NAV.map(item=>(
        <button key={item.en} style={{
          flex:1,display:"flex",flexDirection:"column",alignItems:"center",
          justifyContent:"center",gap:isDisplay?6:2,
          background:"linear-gradient(180deg,#FFF1CA,#A7D6C3 72%,#7EC0A8)",
          border:"2px solid #C89C38",borderRadius:12,
          padding:isDisplay?"10px 10px":"6px 2px",cursor:"pointer",minWidth:0,
          boxShadow:"0 3px 10px rgba(170,110,15,.2)"}}>
          {item.img
            ? <img src={A[item.img]} style={{width:isDisplay?"clamp(56px,5vw,76px)":"clamp(29px,8.6vw,38px)",height:isDisplay?"clamp(56px,5vw,76px)":"clamp(29px,8.6vw,38px)",objectFit:"contain"}} alt={item.en}/>
            : <span style={{fontSize:"min(1.5rem,7vw)",lineHeight:1.2}}>{item.emoji}</span>
          }
          <span style={{fontSize:isDisplay?"clamp(.9rem,1.1vw,1rem)":"clamp(.52rem,2.35vw,.64rem)",color:"#6B4A1F",fontWeight:700,
            textAlign:"center",lineHeight:1.15,whiteSpace:"nowrap"}}>{isDisplay?item.en:item.short}</span>
        </button>
      ))}
    </div>

    {/* Footer */}
    <div style={{textAlign:"center",padding:"4px",
      background:"linear-gradient(90deg,#F4A397,#F3C879,#F4A397)",
      color:"#81452C",fontSize:isDisplay?".85rem":".56rem",letterSpacing:isDisplay?"5px":"3px"}}>
      ✦ Play · Learn · Grow ✦
    </div>

    {/* Result overlay */}
    {show&&result&&(
      <div onClick={()=>setShow(false)} style={{position:"fixed",inset:0,
        background:"rgba(40,18,8,.52)",backdropFilter:"blur(8px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        zIndex:200,animation:"fadeIn .25s ease"}}>
        <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:24,
          maxWidth:isDisplay?420:330,width:"88%",overflow:"hidden",
          boxShadow:"0 28px 80px rgba(0,0,0,.3)",
          animation:"springUp .45s cubic-bezier(.34,1.56,.64,1)"}}>
          <div style={{background:result.bg,padding:"26px 26px 18px",textAlign:"center"}}>
            {result.img
              ? <img src={A[result.img]} style={{width:90,height:90,objectFit:"contain",marginBottom:8}} alt=""/>
              : <span style={{fontSize:"3.5rem",display:"block",marginBottom:8}}>{result.emoji}</span>
            }
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"1.4rem",color:result.accent,
              margin:"0 0 2px",letterSpacing:"2px"}}>{result.en}</h2>
          </div>
          <div style={{padding:"16px 22px 20px",textAlign:"center"}}>
            <p style={{color:"#6A5038",fontSize:".9rem",lineHeight:1.85,margin:"0 0 16px"}}>
              {result.active?"Tap below to start your adventure!":"Coming soon! Check back later."}
            </p>
            {result.active
              ? <button onClick={()=>{setShow(false);setActiveModule(result.id);}}
                  style={{width:"100%",padding:"13px",background:result.bg,color:result.accent,
                    border:`2px solid ${result.accent}55`,borderRadius:12,fontSize:".95rem",
                    fontFamily:"'Cinzel',serif",fontWeight:700,cursor:"pointer",letterSpacing:"2px"}}>
                  Let's Go! →
                </button>
              : <div style={{padding:"11px",background:"#F5EFE5",borderRadius:11,
                  color:"#B0A080",fontSize:".83rem"}}>🔜 Coming Soon!</div>
            }
            <button onClick={()=>setShow(false)} style={{marginTop:10,background:"none",
              border:"none",color:"#C0B090",fontSize:".73rem",cursor:"pointer"}}>Close</button>
          </div>
        </div>
      </div>
    )}

    {/* Active module */}
    {activeModule && MODULES[activeModule] && (()=>{
      const Module = MODULES[activeModule];
      return <Module onExit={()=>setActiveModule(null)}/>;
    })()}

    <style>{`
      *{box-sizing:border-box}
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

export default function ChinaQuest(){
  return <ChinaQuestHome mode="mobile" />;
}
