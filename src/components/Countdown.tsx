import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
const TARGET = new Date('2026-10-16T00:00:00').getTime();
const calc = () => { const d=TARGET-Date.now(); if(d<=0)return{days:0,hours:0,minutes:0,seconds:0,arrived:true}; return{days:Math.floor(d/864e5),hours:Math.floor(d%864e5/36e5),minutes:Math.floor(d%36e5/6e4),seconds:Math.floor(d%6e4/1e3),arrived:false}; };
export const Countdown: React.FC = () => {
  const [t,setT]=useState(calc); const{theme}=useTheme();
  useEffect(()=>{const id=setInterval(()=>setT(calc),1000);return()=>clearInterval(id);},[]);
  if(t.arrived) return <div style={{textAlign:'center',margin:'.5rem 0'}}><p style={{fontSize:'1.3rem',fontWeight:700,color:theme.accent}}>🎉🍼 ¡Ya tendría que estar entre nosotros! 🍼🎉</p></div>;
  const u=[{l:'Días',v:t.days},{l:'Horas',v:t.hours},{l:'Min',v:t.minutes},{l:'Seg',v:t.seconds}];
  return <div style={{textAlign:'center',margin:'.5rem 0'}}><p style={{margin:'0 0 .5rem',color:theme.accent,fontWeight:600,fontSize:'.95rem'}}>⏳ Cuenta regresiva para la fecha probable</p><div style={{display:'flex',justifyContent:'center',gap:10}}>{u.map(i=><div key={i.l} className="countdown-cell" style={{background:theme.dark?'linear-gradient(135deg,#7b1fa2,#e91e90)':'linear-gradient(135deg,#ad1457,#e91e90)',borderRadius:12,padding:'.5rem .75rem',minWidth:56,textAlign:'center',boxShadow:theme.dark?'0 3px 10px rgba(123,31,162,.4)':'0 3px 10px rgba(173,20,87,.25)'}}><span style={{display:'block',fontSize:'1.6rem',fontWeight:800,color:'#fff'}}>{String(i.v).padStart(2,'0')}</span><span style={{display:'block',fontSize:'.7rem',color:'#fce4ec',textTransform:'uppercase',letterSpacing:1}}>{i.l}</span></div>)}</div></div>;
};
