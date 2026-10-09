import React from 'react';
import { LOOK_MAP } from './lookOptions';
import { useTheme } from './ThemeContext';
const fmtD=(iso:string)=>{const[y,m,d]=iso.split('-');return `${d}/${m}/${y}`;};
const fmtT=(t:string)=>{const[h,m]=t.split(':');return `${parseInt(h,10)}:${m} hs`;};
export interface TicketData{nickname:string;date:string;time:string;weight?:number|null;length?:number|null;look?:string|null;message?:string;}
export const BetTicket:React.FC<{data:TicketData;onClose:()=>void}>=({data,onClose})=>{
  const{theme}=useTheme();const bg=theme.dark?'#2a1f30':'#fffaf5';const pc=theme.dark?'#1a1020':'#fce4ec';const dc=theme.dark?'#5a3050':'#f8bbd0';const fb=theme.dark?'#352840':'linear-gradient(135deg,#fce4ec,#fff0f5)';const cb=theme.dark?theme.accentLight:'linear-gradient(135deg,#fce4ec,#f8bbd0)';
  const sl:React.CSSProperties={display:'block',fontSize:'.7rem',fontWeight:700,letterSpacing:2,color:theme.accent,textTransform:'uppercase',marginBottom:4};
  return <div className="pop-in" style={{position:'fixed',inset:0,background:theme.overlay,display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'1rem'}} onClick={onClose}>
    <div className="ticket-modal" style={{background:bg,maxWidth:360,width:'100%',boxShadow:'0 8px 32px rgba(0,0,0,.3)',position:'relative',overflow:'hidden',borderRadius:4}} onClick={e=>e.stopPropagation()}>
      <div style={{height:12,backgroundImage:`radial-gradient(circle,${pc} 6px,transparent 6px)`,backgroundSize:'24px 12px',backgroundRepeat:'repeat-x',backgroundPosition:'12px top'}}/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'1rem 1rem .25rem'}}><span style={{fontSize:'1.4rem'}}>🎫</span><span style={{fontWeight:900,fontSize:'.85rem',letterSpacing:3,color:theme.accent,textTransform:'uppercase'}}>BOLETO DE APUESTA</span><span style={{fontSize:'1.4rem'}}>🎫</span></div>
      <div style={{textAlign:'center',fontSize:'1.15rem',fontWeight:700,color:theme.accent,paddingBottom:'.5rem'}}>✨ Prode de Alanna ✨</div>
      <div style={{borderTop:`2px dashed ${dc}`,margin:'0 1rem'}}/>
      <div style={{padding:'.6rem 1.25rem'}}><span style={sl}>JUGADOR/A</span><span style={{fontSize:'1.1rem',fontWeight:700,color:theme.text}}>🎲 {data.nickname}</span></div>
      <div style={{display:'flex',padding:'.5rem 1.25rem .6rem'}}><div style={{flex:1,textAlign:'center'}}><span style={{...sl,letterSpacing:1.5}}>📅 FECHA</span><span style={{display:'block',fontSize:'1.4rem',fontWeight:800,color:theme.accent}}>{fmtD(data.date)}</span></div><div style={{width:2,background:dc,margin:'0 12px',borderRadius:1}}/><div style={{flex:1,textAlign:'center'}}><span style={{...sl,letterSpacing:1.5}}>🕐 HORA</span><span style={{display:'block',fontSize:'1.4rem',fontWeight:800,color:theme.accent}}>{fmtT(data.time)}</span></div></div>
      {(data.weight||data.length||data.look)&&<><div style={{borderTop:`2px dashed ${dc}`,margin:'0 1rem'}}/><div style={{padding:'.6rem 1.25rem'}}><span style={sl}>APUESTAS BONUS</span><div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:2}}>{data.weight&&<span style={{background:cb,color:theme.accent,borderRadius:8,padding:'4px 10px',fontSize:'.85rem',fontWeight:600}}>⚖️ {data.weight} kg</span>}{data.length&&<span style={{background:cb,color:theme.accent,borderRadius:8,padding:'4px 10px',fontSize:'.85rem',fontWeight:600}}>📏 {data.length} cm</span>}</div>{data.look&&LOOK_MAP[data.look]&&<div style={{display:'flex',alignItems:'center',gap:8,marginTop:6,background:theme.dark?theme.bgCardAlt:'#fff8fa',borderRadius:10,padding:'.4rem .6rem',border:`1px solid ${dc}`}}><span style={{fontSize:'1.4rem'}}>{LOOK_MAP[data.look].emoji}</span><div><span style={{display:'block',fontWeight:700,fontSize:'.82rem',color:theme.accent}}>{LOOK_MAP[data.look].title}</span><span style={{display:'block',fontSize:'.72rem',color:theme.textSub}}>{LOOK_MAP[data.look].desc}</span></div></div>}</div></>}
      {data.message&&<><div style={{borderTop:`2px dashed ${dc}`,margin:'0 1rem'}}/><div style={{padding:'.6rem 1.25rem'}}><span style={sl}>💌 MENSAJE PARA ALANNA</span><p style={{margin:'4px 0 0',color:theme.textSub,fontSize:'.92rem',fontStyle:'italic',lineHeight:1.4}}>"{data.message}"</p></div></>}
      <div style={{borderTop:`2px dashed ${dc}`,margin:'0 1rem'}}/>
      <div style={{textAlign:'center',padding:'.6rem 1rem .4rem',background:fb}}><p style={{margin:0,fontSize:'1.1rem',fontWeight:800,color:theme.accent}}>¡Jugátela vos también! 🎲</p><p style={{margin:'2px 0 0',fontSize:'.75rem',color:theme.textMuted}}>🇦🇷 Importantes premios al que acierte 🏆</p></div>
      <div style={{height:12,backgroundImage:`radial-gradient(circle,${pc} 6px,transparent 6px)`,backgroundSize:'24px 12px',backgroundRepeat:'repeat-x',backgroundPosition:'12px bottom'}}/>
      <button className="btn-hover" onClick={onClose} style={{display:'block',margin:'.75rem auto 1rem',background:'none',border:'none',color:theme.textMuted,fontSize:'.9rem',cursor:'pointer',fontFamily:'inherit'}}>✕ Cerrar</button>
    </div>
  </div>;
};
