import React, { useEffect, useState, useCallback } from 'react';
import { listSharedItems } from '../lib/storage';
import { LOOK_MAP } from './lookOptions';
import { useTheme } from './ThemeContext';
const TABLE='baby-bets';
interface Bet{nickname:string;date:string;time:string;weight?:number|null;length?:number|null;look?:string|null;message:string;timestamp:number;}
const fmtD=(iso:string)=>{const[y,m,d]=iso.split('-');return`${d}/${m}/${y}`;};
const fmtT=(t:string)=>{const[h,m]=t.split(':');return`${parseInt(h,10)}:${m} hs`;};
export const BetList:React.FC<{refreshKey:number}>=React.memo(({refreshKey})=>{
  const{theme}=useTheme();const[bets,setBets]=useState<Bet[]>([]);const[ld,setLd]=useState(true);const[err,setErr]=useState('');const[exp,setExp]=useState<string|null>(null);
  const load=useCallback(async()=>{setLd(true);setErr('');try{const r=await listSharedItems({tableName:TABLE});const a:Bet[]=[];for(const i of r.items){try{a.push(JSON.parse(i.value));}catch{}}a.sort((x,y)=>new Date(`${x.date}T${x.time||'00:00'}`).getTime()-new Date(`${y.date}T${y.time||'00:00'}`).getTime());setBets(a);}catch{setErr('Error al cargar las apuestas');}finally{setLd(false);}},[]);
  useEffect(()=>{load();},[load,refreshKey]);
  return <div className="bet-card fade-slide-in card-hover" style={{background:theme.bgCard,borderRadius:18,padding:'1.5rem',maxWidth:540,width:'100%',boxShadow:theme.shadow,border:`2px solid ${theme.border}`}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}><h2 style={{margin:0,fontSize:'1.3rem',color:theme.accent}}>🎯 Apuestas ({bets.length})</h2><button className="btn-hover" onClick={load} disabled={ld} title="Actualizar" style={{background:'none',border:'none',fontSize:'1.3rem',cursor:'pointer',padding:4}}>🔄</button></div>
    {ld&&<p style={{color:theme.textMuted,fontSize:'.95rem'}}>Cargando las apuestas... 🧉</p>}
    {err&&<p style={{color:'#d32f2f',fontSize:'.9rem'}}>{err}</p>}
    {!ld&&bets.length===0&&!err&&<p style={{color:theme.textMuted,fontSize:'.95rem'}}>¡No hay apuestas todavía! Sé el primero en jugársela 🎲</p>}
    {bets.length>0&&<div style={{borderRadius:12,overflow:'hidden',border:`1px solid ${theme.borderLight}`}}>{bets.map((b,i)=>{const o=exp===b.nickname;return<div key={b.nickname} className="fade-slide-in" style={{padding:'.7rem .85rem',cursor:'pointer',borderBottom:`1px solid ${theme.borderLight}`,background:i%2===0?theme.bgCardAlt:theme.bgCard,animationDelay:`${i*.05}s`}} onClick={()=>setExp(o?null:b.nickname)}>
      <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}><span style={{background:'linear-gradient(135deg,#e91e90,#f06292)',color:'#fff',borderRadius:8,padding:'2px 8px',fontSize:'.8rem',fontWeight:700}}>#{i+1}</span><span style={{fontWeight:700,fontSize:'1rem',color:theme.text}}>{b.nickname}</span><span style={{marginLeft:'auto',fontSize:'.85rem',color:theme.textMuted}}>📅 {fmtD(b.date)} · 🕐 {b.time?fmtT(b.time):'-'}</span></div>
      {o&&<div className="pop-in" style={{marginTop:8,paddingLeft:8}}>
        {(b.weight||b.length||b.look)&&<div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:6}}>{b.weight&&<span style={{background:theme.dark?theme.accentLight:'linear-gradient(135deg,#fce4ec,#f8bbd0)',color:theme.accent,borderRadius:8,padding:'3px 10px',fontSize:'.8rem',fontWeight:600}}>⚖️ {b.weight} kg</span>}{b.length&&<span style={{background:theme.dark?theme.accentLight:'linear-gradient(135deg,#fce4ec,#f8bbd0)',color:theme.accent,borderRadius:8,padding:'3px 10px',fontSize:'.8rem',fontWeight:600}}>📏 {b.length} cm</span>}{b.look&&LOOK_MAP[b.look]&&<span style={{background:theme.dark?theme.accentLight:'linear-gradient(135deg,#fce4ec,#f8bbd0)',color:theme.accent,borderRadius:8,padding:'3px 10px',fontSize:'.8rem',fontWeight:600}}>{LOOK_MAP[b.look].emoji} {LOOK_MAP[b.look].title}</span>}</div>}
        {b.look&&LOOK_MAP[b.look]&&<p style={{margin:'2px 0 6px 8px',fontSize:'.78rem',color:theme.textMuted,fontStyle:'italic'}}>{LOOK_MAP[b.look].quote}</p>}
        {b.message?<div style={{marginTop:4}}><span style={{fontSize:'.8rem',color:theme.accent,fontWeight:600}}>💌 Mensaje:</span><p style={{margin:'4px 0 0',color:theme.textSub,fontSize:'.9rem',fontStyle:'italic'}}>"{b.message}"</p></div>:<p style={{margin:'6px 0 0',color:theme.textMuted,fontSize:'.85rem',fontStyle:'italic'}}>No dejó mensaje 🤷</p>}
      </div>}
    </div>;})}</div>}
    {bets.length>0&&<p style={{textAlign:'center',color:theme.textMuted,fontSize:'.8rem',marginTop:10,marginBottom:0}}>👆 Tocá una apuesta para ver los detalles</p>}
  </div>;
});
BetList.displayName='BetList';
