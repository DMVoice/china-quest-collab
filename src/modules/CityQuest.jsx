import { useState } from "react";

const CITIES = [
  { name:"Beijing", zh:"\u5317\u4eac", emoji:"🏯", color:"#F5E8D0", accent:"#C07040", tag:"Capital City",
    facts:["Home to the Forbidden City — a palace with 9,999 rooms where emperors lived for 500 years!",
           "The Great Wall is just 45 miles away. It took over a million workers to build!"] },
  { name:"Shanghai", zh:"\u4e0a\u6d77", emoji:"🌆", color:"#E0F0F0", accent:"#3A8880", tag:"Modern Megacity",
    facts:["Shanghai has over 4,000 skyscrapers — more than New York City!",
           "Its name means 'above the sea'. It sits where the Yangtze River meets the ocean!"] },
  { name:"Xi'an", zh:"\u897f\u5b89", emoji:"⚔️", color:"#F0EAD8", accent:"#8B6040", tag:"Ancient Capital",
    facts:["The Terracotta Army — 8,000 life-size clay soldiers — was discovered here by farmers in 1974!",
           "Xi'an was the starting point of the ancient Silk Road trade route connecting China to Europe!"] },
  { name:"Guilin", zh:"\u6842\u6797", emoji:"⛰️", color:"#E8F5E8", accent:"#3A7840", tag:"Natural Wonder",
    facts:["Guilin's magical mountains inspired countless Chinese paintings and appear on the 20 yuan bill!",
           "The Li River cruise is considered one of the most beautiful boat rides in the world!"] },
  { name:"Chengdu", zh:"\u6210\u90fd", emoji:"🐼", color:"#F0F5E8", accent:"#5A8040", tag:"Panda Capital",
    facts:["Chengdu is home to the Giant Panda Research Base where you can see real pandas up close!",
           "Sichuan spicy hotpot was invented here — the numbing pepper makes your tongue tingle!"] },
  { name:"Hangzhou", zh:"\u676d\u5dde", emoji:"🏞️", color:"#E8F0F8", accent:"#3A6090", tag:"Paradise on Earth",
    facts:["Marco Polo called Hangzhou 'the finest and most splendid city in the world'!",
           "Hangzhou is the birthplace of Alibaba — China's biggest tech company, started in an apartment in 1999!"] },
];

export default function CityQuest({ onExit }) {
  const [selected,setSelected]=useState(null);
  return(
  <div style={{position:"fixed",inset:0,background:"linear-gradient(160deg,#FBF5E8,#EAF4F0)",
    display:"flex",flexDirection:"column",zIndex:300,fontFamily:"sans-serif",overflow:"auto"}}>
    <div style={{background:"linear-gradient(135deg,#E8C870,#D49828)",padding:"14px 20px",flexShrink:0,
      display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 3px 12px rgba(180,120,20,.3)"}}>
      <span style={{fontSize:"1.2rem",fontWeight:700,color:"#3A2408"}}>🗺️ City Quest</span>
      <button onClick={onExit} style={{background:"rgba(255,255,255,.3)",border:"none",borderRadius:8,
        padding:"6px 14px",color:"#3A2408",fontWeight:700,cursor:"pointer"}}>✕ Exit</button>
    </div>
    {!selected?(
      <div style={{flex:1,padding:"16px",overflowY:"auto"}}>
        <p style={{textAlign:"center",color:"#8B6030",fontSize:".88rem",margin:"0 0 14px"}}>Tap a city to explore! 🌟</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,maxWidth:480,margin:"0 auto"}}>
          {CITIES.map(city=>(
            <button key={city.name} onClick={()=>setSelected(city)} style={{
              background:city.color,border:`2px solid ${city.accent}40`,borderRadius:18,
              padding:"18px 12px",cursor:"pointer",textAlign:"center",
              boxShadow:"0 3px 12px rgba(0,0,0,.08)",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <span style={{fontSize:"2.2rem"}}>{city.emoji}</span>
              <span style={{fontWeight:700,fontSize:".95rem",color:city.accent}}>{city.name}</span>
              <span style={{fontSize:".72rem",color:city.accent,opacity:.8}}>{city.zh}</span>
              <span style={{fontSize:".62rem",background:`${city.accent}20`,color:city.accent,
                padding:"2px 8px",borderRadius:20}}>{city.tag}</span>
            </button>
          ))}
        </div>
      </div>
    ):(
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 16px",gap:14,overflowY:"auto"}}>
        <div style={{background:selected.color,border:`3px solid ${selected.accent}40`,borderRadius:20,
          padding:"24px",textAlign:"center",width:"min(380px,90vw)",boxShadow:"0 4px 16px rgba(0,0,0,.1)"}}>
          <div style={{fontSize:"4rem",marginBottom:8}}>{selected.emoji}</div>
          <h2 style={{color:selected.accent,margin:"0 0 4px",fontSize:"1.6rem"}}>{selected.name}</h2>
          <p style={{color:selected.accent,opacity:.7,margin:0,fontSize:".9rem"}}>{selected.zh} · {selected.tag}</p>
        </div>
        <div style={{width:"min(380px,90vw)",display:"flex",flexDirection:"column",gap:10}}>
          {selected.facts.map((fact,i)=>(
            <div key={i} style={{background:"white",borderRadius:16,padding:"16px",
              border:`2px solid ${selected.accent}30`,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <p style={{margin:0,fontSize:".92rem",color:"#3A2808",lineHeight:1.65}}>
                <span style={{color:selected.accent,fontWeight:700,marginRight:6}}>#{i+1}</span>{fact}
              </p>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={()=>setSelected(null)} style={{padding:"12px 24px",
            background:"linear-gradient(135deg,#E8C870,#D49828)",border:"none",borderRadius:50,
            fontWeight:700,color:"#3A2408",cursor:"pointer"}}>← All Cities</button>
          <button onClick={onExit} style={{padding:"12px 24px",background:"white",
            border:"2px solid #D4A050",borderRadius:50,color:"#8B6030",cursor:"pointer"}}>Back to Wheel</button>
        </div>
      </div>
    )}
  </div>);
}
