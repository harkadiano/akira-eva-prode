import { useEffect } from 'react';
const CSS = `
@keyframes fadeSlideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes popIn { 0%{opacity:0;transform:scale(.9)} 100%{opacity:1;transform:scale(1)} }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
.fade-slide-in{animation:fadeSlideIn .35s ease-out both}
.pop-in{animation:popIn .3s ease-out both}
.pulse-hover:hover{animation:pulse .6s ease-in-out}
.btn-hover{transition:transform .15s,box-shadow .15s,filter .15s}
.btn-hover:hover{transform:translateY(-1px);filter:brightness(1.08)}
.btn-hover:active{transform:translateY(0)}
.card-hover{transition:transform .2s,box-shadow .2s}
.card-hover:hover{transform:translateY(-2px)}
.look-card{transition:transform .15s,box-shadow .15s,border-color .15s,background .15s}
.look-card:hover{transform:translateY(-2px)}
/* Base: evitar overflow horizontal y asegurar box-sizing en toda la app */
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;width:100%;overflow-x:hidden}
img,svg{max-width:100%}
/* Las tablas de ranking (grid de 8 columnas) pueden scrollear en pantallas chicas sin romper el layout */
.rank-table{overflow-x:auto;-webkit-overflow-scrolling:touch}
.rank-row{min-width:560px}

/* Tablet y menos */
@media(max-width:700px){
  .stats-grid{grid-template-columns:1fr!important}
  .admin-grid{grid-template-columns:1fr!important}
}
/* Celular */
@media(max-width:480px){
  .look-grid-mobile{grid-template-columns:1fr!important}
  .main-layout{padding:1rem .5rem 2rem!important}
  .ticket-modal{max-width:100%!important;margin:.5rem!important}
  .bet-card{padding:1.25rem!important}
  .stats-grid{grid-template-columns:1fr!important}
  .admin-grid{grid-template-columns:1fr!important}
  .app-header{padding:1.25rem .75rem .5rem!important}
  .app-title{font-size:1.6rem!important;letter-spacing:.5px!important}
  .app-emojis{font-size:1.6rem!important;letter-spacing:4px!important}
  .app-subtitle{font-size:.9rem!important}
  .prize-badge{padding:.45rem .75rem!important}
  .prize-badge span{font-size:.72rem!important}
  .nav-tabs button{padding:.5rem .9rem!important;font-size:.82rem!important}
  .form-row-2{flex-direction:column!important;gap:0!important}
}
/* Celular chico */
@media(max-width:360px){
  .app-title{font-size:1.35rem!important}
  .countdown-cell{min-width:46px!important;padding:.4rem .5rem!important}
  .countdown-cell>span:first-child{font-size:1.3rem!important}
}
`;
export const GlobalStyles: React.FC = () => {
  useEffect(() => { const id='prode-global-css'; if(document.getElementById(id))return; const s=document.createElement('style'); s.id=id; s.textContent=CSS; document.head.appendChild(s); }, []);
  return null;
};
