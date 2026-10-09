import React, { useState, useCallback } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { GlobalStyles } from './components/GlobalStyles';
import { AccessGate } from './components/AccessGate';
import { BetForm } from './components/BetForm';
import { BetList } from './components/BetList';
import { BetStats } from './components/BetStats';
import { AdminPanel, PublicResults } from './components/AdminPanel';
import { Countdown } from './components/Countdown';
import { FomoCounter } from './components/FomoCounter';
import { ShareInviteButton } from './components/ShareWhatsApp';
type Tab='apuestas'|'stats'|'admin';
const AppInner:React.FC=()=>{
  const[rk,setRk]=useState(0);const[tab,setTab]=useState<Tab>('apuestas');const{theme,toggle}=useTheme();
  const bump=useCallback(()=>setRk(k=>k+1),[]);
  const ts=(t:Tab):React.CSSProperties=>({padding:'.55rem 1.25rem',borderRadius:12,cursor:'pointer',fontFamily:'inherit',fontSize:'.9rem',fontWeight:700,letterSpacing:.3,background:tab===t?'linear-gradient(135deg,#e91e90,#f06292)':(theme.dark?theme.bgCardAlt:'#fff'),color:tab===t?'#fff':theme.textSub,boxShadow:tab===t?'0 3px 10px rgba(233,30,144,.3)':theme.shadow,border:tab===t?'none':`1.5px solid ${theme.border}`,transition:'all .2s'});
  return<div style={{minHeight:'100vh',background:theme.bg,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',color:theme.text,transition:'background .3s,color .3s'}}>
    <GlobalStyles/>
    <button onClick={toggle} className="btn-hover" style={{position:'fixed',top:12,right:12,zIndex:999,background:theme.dark?'#352840':'#fff',border:`1.5px solid ${theme.border}`,borderRadius:12,padding:'.4rem .7rem',fontSize:'1.1rem',cursor:'pointer',boxShadow:theme.shadow}} title={theme.dark?'Modo claro':'Modo oscuro'}>{theme.dark?'☀️':'🌙'}</button>
    <header className="app-header" style={{textAlign:'center',padding:'2rem 1rem .5rem'}}><div className="app-emojis" style={{fontSize:'2.5rem',letterSpacing:8,marginBottom:2}}>🎲👶🎀🎰</div><h1 className="app-title" style={{margin:'.25rem 0 0',fontSize:'2.2rem',letterSpacing:1,color:theme.dark?'#f06292':'#e91e90',background:theme.dark?'linear-gradient(135deg,#f06292,#f8bbd0)':'linear-gradient(135deg,#e91e90,#ad1457)',backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Prode de Alanna</h1><p className="app-subtitle" style={{margin:'.3rem 0 .75rem',color:theme.textSub,fontSize:'1.05rem'}}>🇦🇷 ¡Jugátela! ¿Cuándo nace la princesita? 🇦🇷</p><Countdown/><div className="prize-badge" style={{display:'inline-flex',alignItems:'center',gap:8,maxWidth:'100%',background:theme.dark?'linear-gradient(135deg,#3d2b10,#4a3510)':'linear-gradient(135deg,#fff9c4,#ffe082)',border:`2px dashed ${theme.dark?'#8a6d20':'#f9a825'}`,borderRadius:14,padding:'.5rem 1.25rem',marginTop:12}}><span style={{fontSize:'1.3rem'}}>🏆</span><span style={{fontWeight:800,fontSize:'.85rem',color:theme.dark?'#ffc107':'#e65100',letterSpacing:1,textTransform:'uppercase'}}>¡IMPORTANTES PREMIOS AL QUE ACIERTE!</span><span style={{fontSize:'1.3rem'}}>🏆</span></div><div><FomoCounter refreshKey={rk}/></div><div style={{marginTop:12}}><ShareInviteButton/></div></header>
    <div style={{padding:'0 1rem',display:'flex',justifyContent:'center'}}><PublicResults refreshKey={rk}/></div>
    <nav className="nav-tabs" style={{display:'flex',justifyContent:'center',gap:8,padding:'1.25rem 1rem .25rem',flexWrap:'wrap'}}><button className="btn-hover" style={ts('apuestas')} onClick={()=>setTab('apuestas')}>🎲 Apuestas</button><button className="btn-hover" style={ts('stats')} onClick={()=>setTab('stats')}>📊 Estadísticas</button><button className="btn-hover" style={ts('admin')} onClick={()=>setTab('admin')}>🔐 Admin</button></nav>
    <main style={{padding:'1rem 1rem 2rem'}}>
      <div className="main-layout" style={{display:tab==='apuestas'?'flex':'none',flexWrap:'wrap',justifyContent:'center',gap:'1.5rem',alignItems:'flex-start'}}><BetForm onBetPlaced={bump}/><BetList refreshKey={rk}/></div>
      <div style={{display:tab==='stats'?'flex':'none',justifyContent:'center'}}><BetStats refreshKey={rk}/></div>
      <div style={{display:tab==='admin'?'flex':'none',justifyContent:'center'}}><AdminPanel refreshKey={rk} onRevealChange={bump}/></div>
    </main>
    <footer style={{textAlign:'center',padding:'1rem 1rem 2rem'}}><p style={{margin:0,color:theme.accent,fontSize:'.95rem'}}>🧉 Hecho con mucho amor para la llegada de <strong>Alanna</strong> 💕</p><p style={{margin:'.25rem 0 0',color:theme.textMuted,fontSize:'.8rem'}}>🎲 El que apuesta a alanna, gana 🎲</p></footer>
  </div>;
};
const App:React.FC=()=><ThemeProvider><AccessGate><AppInner/></AccessGate></ThemeProvider>;
export default App;
