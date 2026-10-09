import React, { useState, useEffect } from 'react';
import { getSharedItem, putSharedItem, StorageError } from '../lib/storage';
import { useTheme } from './ThemeContext';
const ADMIN_TABLE = 'prode-admin';
const ACCESS_CODE_KEY = 'access-code';
const DEFAULT_CODE = 'alanna2026';
const LOCAL_KEY = 'prode-access-ok';

export const AccessGate: React.FC<{children:React.ReactNode}> = ({children}) => {
  const{theme}=useTheme(); const[authed,setAuthed]=useState(false); const[checking,setChecking]=useState(true);
  const[codeInput,setCodeInput]=useState(''); const[error,setError]=useState('');
  useEffect(()=>{(async()=>{
    // 1) Si ya hay acceso guardado localmente, entrar al toque (sin esperar a Firestore)
    let saved:string|null=null;
    try{saved=localStorage.getItem(LOCAL_KEY);}catch{}
    if(saved){setAuthed(true);setChecking(false);return;}
    // 2) Recién ahora consultamos el código remoto (con fallback al default si Firestore falla/no responde)
    let code=DEFAULT_CODE; try{const r=await getSharedItem({tableName:ADMIN_TABLE,key:ACCESS_CODE_KEY});if(r){const d=JSON.parse(r.item.value);if(d.code)code=d.code;}}catch{}
    // 3) Código por URL (?code=...)
    try{const p=new URLSearchParams(window.location.search);const u=p.get('code');if(u&&u===code){try{localStorage.setItem(LOCAL_KEY,code);}catch{}setAuthed(true);setChecking(false);return;}}catch{}
    setChecking(false);
  })();},[]);
  const handleSubmit=async()=>{setError('');if(!codeInput.trim()){setError('¡Metele un código, crack!');return;}
    let code=DEFAULT_CODE;try{const r=await getSharedItem({tableName:ADMIN_TABLE,key:ACCESS_CODE_KEY});if(r){const d=JSON.parse(r.item.value);if(d.code)code=d.code;}}catch{}
    if(codeInput.trim()===code){try{localStorage.setItem(LOCAL_KEY,code);}catch{}setAuthed(true);}else setError('Código incorrecto. Pedíselo a los papás de Alanna 😉');};
  if(checking)return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:theme.bg,fontFamily:'inherit'}}><p style={{color:theme.textMuted,fontSize:'1.1rem'}}>Verificando acceso... 🔐</p></div>;
  if(authed)return <>{children}</>;
  return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:theme.bg,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',padding:'1rem'}}><div className="pop-in" style={{background:theme.bgCard,borderRadius:22,padding:'2.5rem 2rem',maxWidth:400,width:'100%',textAlign:'center',boxShadow:theme.shadow,border:`2px solid ${theme.border}`}}>
    <div style={{fontSize:'3.5rem',marginBottom:8}}>🔐</div>
    <h1 style={{margin:'0 0 .25rem',fontSize:'1.6rem',color:theme.dark?'#f06292':'#e91e90',background:theme.dark?'linear-gradient(135deg,#f06292,#f8bbd0)':'linear-gradient(135deg,#e91e90,#ad1457)',backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Prode de Alanna</h1>
    <p style={{margin:'0 0 1.5rem',color:theme.textSub,fontSize:'.95rem'}}>🎲 Ingresá el código de acceso para entrar</p>
    <input type="text" placeholder="Código de acceso..." value={codeInput} onChange={e=>setCodeInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} style={{width:'100%',padding:'.75rem 1rem',borderRadius:12,border:`2px solid ${error?'#d32f2f':theme.inputBorder}`,fontSize:'1.1rem',outline:'none',boxSizing:'border-box',fontFamily:'inherit',textAlign:'center',letterSpacing:2,background:theme.inputBg,color:theme.text}}/>
    <button className="btn-hover" onClick={handleSubmit} style={{width:'100%',padding:'.85rem',borderRadius:14,border:'none',background:'linear-gradient(135deg,#e91e90,#f06292)',color:'#fff',fontSize:'1.1rem',fontWeight:700,cursor:'pointer',marginTop:14}}>🚪 Entrar</button>
    {error&&<p className="pop-in" style={{color:'#d32f2f',marginTop:12,fontSize:'.9rem',fontWeight:500}}>❌ {error}</p>}
    <p style={{color:theme.textMuted,fontSize:'.78rem',marginTop:20,marginBottom:0}}>🇦🇷 ¿No tenés el código? Pedíselo a quien te compartió el link</p>
  </div></div>;
};

export const AccessCodeManager: React.FC = () => {
  const{theme}=useTheme(); const[code,setCode]=useState(''); const[saving,setSaving]=useState(false); const[msg,setMsg]=useState('');
  useEffect(()=>{(async()=>{try{const r=await getSharedItem({tableName:ADMIN_TABLE,key:ACCESS_CODE_KEY});if(r){const d=JSON.parse(r.item.value);if(d.code)setCode(d.code);}else setCode(DEFAULT_CODE);}catch{setCode(DEFAULT_CODE);}})();},[]);
  const handleSave=async()=>{if(!code.trim()){setMsg('❌ El código no puede estar vacío');return;}setSaving(true);setMsg('');try{await putSharedItem({tableName:ADMIN_TABLE,key:ACCESS_CODE_KEY,value:JSON.stringify({code:code.trim()}),writeMode:'UPSERT'});try{localStorage.setItem(LOCAL_KEY,code.trim());}catch{}setMsg('✅ Código actualizado');}catch(e:any){setMsg(e instanceof StorageError?e.message:'❌ Error');}finally{setSaving(false);}};
  const is:React.CSSProperties = {width:'100%',padding:'.6rem .75rem',borderRadius:10,border:`1.5px solid ${theme.inputBorder}`,fontSize:'1rem',outline:'none',boxSizing:'border-box',fontFamily:'inherit',background:theme.inputBg,color:theme.text,letterSpacing:1};
  return <div style={{background:theme.dark?theme.bgCardAlt:'#fff8fa',borderRadius:14,padding:'1rem 1.25rem',border:`1.5px dashed ${theme.accent}`,marginBottom:'1.25rem'}}>
    <h3 style={{margin:'0 0 .5rem',fontSize:'1rem',color:theme.accent}}>🔐 Código de acceso al sitio</h3>
    <p style={{margin:'0 0 .75rem',fontSize:'.82rem',color:theme.textSub}}>Los visitantes necesitan este código para entrar. Compartí el link con <code style={{background:theme.dark?'#352840':'#fce4ec',padding:'1px 4px',borderRadius:4,fontSize:'.78rem'}}>?code=TUCODIGO</code></p>
    <div style={{display:'flex',gap:8}}><input style={is} type="text" value={code} onChange={e=>setCode(e.target.value)} placeholder="Código..."/><button className="btn-hover" onClick={handleSave} disabled={saving} style={{padding:'.6rem 1.2rem',borderRadius:10,border:'none',background:'linear-gradient(135deg,#e91e90,#f06292)',color:'#fff',fontSize:'.9rem',fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>{saving?'...':'💾 Guardar'}</button></div>
    {msg&&<p style={{marginTop:8,fontSize:'.85rem',fontWeight:600,color:msg.startsWith('✅')?'#2e7d32':'#d32f2f'}}>{msg}</p>}
  </div>;
};
