import React, { useEffect, useState, useCallback } from 'react';
import { listSharedItems } from '../lib/storage';
import { LOOK_MAP } from './lookOptions';
import { useTheme } from './ThemeContext';
const TABLE='baby-bets';
interface Bet{nickname:string;date:string;time:string;weight?:number|null;length?:number|null;look?:string|null;message:string;timestamp:number;}
export const BetStats:React.FC<{refreshKey:number}>=React.memo(({refreshKey})=>{
  const{theme}=useTheme();const[bets,setBets]=useState<Bet[]>([]);const[ld,setLd]=useState(true);const[err,setErr]=useState('');
  const load=useCallback(async()=>{setLd(true);setErr('');try{const r=await listSharedItems({tableName:TABLE});const a:Bet[]=[];for(const i of r.items){try{a.push(JSON.parse(i.value));}catch{}}setBets(a);}catch{setErr('Error cargando estadísticas');}finally{setLd(false);}},[]);
  useEffect(()=>{load();},[load,refreshKey]);
  if(ld)return<p style={{textAlign:'center',color:theme.textMuted}}>Cargando estadísticas... 📊</p>;
  if(err)return<p style={{textAlign:'center',color:'#d32f2f'}}>{err}</p>;
  if(bets.length===0)return null;
  const dc:Record<string,number>={};bets.forEach(b=>{dc[b.date]=(dc[b.date]||0)+1;});const td=Object.entries(dc).sort((a,b)=>b[1]-a[1]).slice(0,5);const mx=td.length>0?td[0][1]:1;
  const lc:Record<string,number>={};bets.forEach(b=>{if(b.look)lc[b.look]=(lc[b.look]||0)+1;});const tl=Object.entries(lc).sort((a,b)=>b[1]-a[1]);const tv=tl.reduce((s,[,c])=>s+c,0);
  const ws=bets.filter(b=>b.weight).map(b=>b.weight!);const ls=bets.filter(b=>b.length).map(b=>b.length!);
  const aw=ws.length>0?(ws.reduce((a,b)=>a+b,0)/ws.length).toFixed(2):null;const al=ls.length>0?(ls.reduce((a,b)=>a+b,0)/ls.length).toFixed(1):null;
  const tb:Record<string,number>={'Madrugada (0-6)':0,'Mañana (6-12)':0,'Tarde (12-18)':0,'Noche (18-24)':0};const te:Record<string,string>={'Madrugada (0-6)':'🌙','Mañana (6-12)':'🌅','Tarde (12-18)':'☀️','Noche (18-24)':'🌃'};
  bets.forEach(b=>{if(!b.time)return;const h=parseInt(b.time.split(':')[0],10);if(h<6)tb['Madrugada (0-6)']++;else if(h<12)tb['Mañana (6-12)']++;else if(h<18)tb['Tarde (12-18)']++;else tb['Noche (18-24)']++;});const mt=Math.max(...Object.values(tb),1);
  const fD=(iso:string)=>{const[,m,d]=iso.split('-');return`${d}/${m}`;};
  const cs:React.CSSProperties={background:theme.bgCard,borderRadius:14,padding:'1rem 1.25rem',border:`1.5px solid ${theme.border}`};
  const bc=theme.dark?['#f06292','#ce93d8','#f48fb1','#ba68c8','#f8bbd0']:['#c2185b','#8e24aa','#e91e63','#7b1fa2','#f06292'];
  return<div className="bet-card fade-slide-in" style={{background:theme.bgCard,borderRadius:18,padding:'1.5rem',width:'100%',maxWidth:1060,boxShadow:theme.shadow,border:`2px solid ${theme.border}`}}>
    <h2 style={{margin:'0 0 1rem',fontSize:'1.4rem',color:theme.accent,textAlign:'center'}}>📊 Estadísticas en vivo</h2>
    <div style={{display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center',marginBottom:'1.25rem'}}>{[{e:'🎲',l:'Total apuestas',v:String(bets.length)},{e:'⚖️',l:'Peso promedio',v:aw?`${aw} kg`:'-'},{e:'📏',l:'Largo promedio',v:al?`${al} cm`:'-'}].map(c=><div key={c.l} style={{...cs,textAlign:'center',minWidth:130,flex:'1 1 130px',maxWidth:200}}><span style={{fontSize:'1.5rem'}}>{c.e}</span><span style={{display:'block',fontSize:'1.4rem',fontWeight:800,color:theme.accent,margin:'2px 0'}}>{c.v}</span><span style={{display:'block',fontSize:'.78rem',color:theme.textMuted}}>{c.l}</span></div>)}</div>
    <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
      <div style={cs}><h3 style={{margin:'0 0 10px',fontSize:'1rem',color:theme.accent}}>📅 Fechas más votadas</h3>{td.map(([d,c],i)=><div key={d} style={{marginBottom:8}}><div style={{display:'flex',justifyContent:'space-between',fontSize:'.85rem',marginBottom:3}}><span style={{fontWeight:600,color:theme.text}}>{fD(d)}</span><span style={{color:theme.textMuted}}>{c} voto{c>1?'s':''}</span></div><div style={{height:10,borderRadius:5,background:theme.dark?'#352840':'#fce4ec',overflow:'hidden'}}><div style={{height:'100%',borderRadius:5,width:`${c/mx*100}%`,background:bc[i%bc.length],transition:'width .5s'}}/></div></div>)}{td.length===0&&<p style={{color:theme.textMuted,fontSize:'.85rem'}}>Sin datos aún</p>}</div>
      <div style={cs}><h3 style={{margin:'0 0 10px',fontSize:'1rem',color:theme.accent}}>👶 Look más votado</h3>{tl.length>0?tl.map(([v,c])=>{const o=LOOK_MAP[v];if(!o)return null;const p=tv>0?Math.round(c/tv*100):0;return<div key={v} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}><span style={{fontSize:'1.2rem'}}>{o.emoji}</span><div style={{flex:1}}><div style={{display:'flex',justifyContent:'space-between',fontSize:'.82rem',marginBottom:2}}><span style={{fontWeight:600,color:theme.text}}>{o.title}</span><span style={{color:theme.textMuted}}>{p}%</span></div><div style={{height:8,borderRadius:4,background:theme.dark?'#352840':'#fce4ec',overflow:'hidden'}}><div style={{height:'100%',borderRadius:4,width:`${p}%`,background:'linear-gradient(90deg,#e91e90,#f06292)',transition:'width .5s'}}/></div></div></div>;}):<p style={{color:theme.textMuted,fontSize:'.85rem'}}>Nadie eligió look aún</p>}</div>
      <div style={{...cs,gridColumn:'1/-1'}}><h3 style={{margin:'0 0 10px',fontSize:'1rem',color:theme.accent}}>🕐 ¿A qué hora apuestan?</h3><div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{Object.entries(tb).map(([l,c],i)=><div key={l} style={{flex:'1 1 120px',textAlign:'center'}}><span style={{fontSize:'1.3rem'}}>{te[l]}</span><div style={{height:60,display:'flex',alignItems:'flex-end',justifyContent:'center',margin:'4px 0'}}><div style={{width:28,borderRadius:'6px 6px 0 0',height:`${Math.max(c/mt*100,8)}%`,background:bc[i%bc.length],transition:'height .5s'}}/></div><span style={{display:'block',fontSize:'.75rem',color:theme.textSub,fontWeight:600}}>{l}</span><span style={{display:'block',fontSize:'.85rem',fontWeight:700,color:theme.accent}}>{c}</span></div>)}</div></div>
    </div>
  </div>;
});
BetStats.displayName='BetStats';
