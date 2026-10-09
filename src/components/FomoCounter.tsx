import React, { useEffect, useState, useCallback } from 'react';
import { listSharedItems } from '../lib/storage';
import { useTheme } from './ThemeContext';
const TABLE = 'baby-bets';
export const FomoCounter: React.FC<{refreshKey:number}> = React.memo(({refreshKey}) => {
  const [count,setCount]=useState<number|null>(null); const{theme}=useTheme();
  const load=useCallback(async()=>{try{const r=await listSharedItems({tableName:TABLE});setCount(r.items.length);}catch{}},[]);
  useEffect(()=>{load();},[load,refreshKey]);
  if(count===null)return null;
  return <div className="pulse-hover" style={{display:'inline-flex',alignItems:'center',gap:6,background:theme.dark?'linear-gradient(135deg,#3d2b10,#4a3510)':'linear-gradient(135deg,#fff3e0,#ffe0b2)',border:`1.5px solid ${theme.dark?'#8a6d20':'#ffb74d'}`,borderRadius:12,padding:'.4rem 1rem',marginTop:8}}><span style={{fontSize:'1rem'}}>🔥</span><span style={{fontWeight:700,fontSize:'.9rem',color:theme.dark?'#ffc107':'#e65100'}}>{count===0?'¡Todavía nadie apostó! Sé el primero 👀':count===1?'¡Ya apostó 1 persona! ¿Y vos? 👀':`¡Ya apostaron ${count} personas! ¿Y vos? 👀`}</span><span style={{fontSize:'1rem'}}>🔥</span></div>;
});
FomoCounter.displayName='FomoCounter';
