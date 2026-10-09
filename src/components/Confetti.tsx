import React, { useEffect, useRef } from 'react';
interface P { x:number;y:number;vx:number;vy:number;size:number;color:string;rot:number;rs:number;op:number;sh:number; }
const C = ['#e91e90','#f06292','#f8bbd0','#ffd54f','#ff6f00','#7b1fa2','#ce93d8','#4caf50','#2196f3','#ff4081'];
export const Confetti: React.FC<{duration?:number;onDone?:()=>void}> = ({duration=4000,onDone}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if(!cv) return; const ctx = cv.getContext('2d'); if(!ctx) return;
    cv.width=cv.offsetWidth; cv.height=cv.offsetHeight;
    const ps:P[] = []; for(let i=0;i<150;i++) ps.push({x:Math.random()*cv.width,y:Math.random()*-cv.height,vx:(Math.random()-.5)*4,vy:Math.random()*3+2,size:Math.random()*8+4,color:C[Math.floor(Math.random()*C.length)],rot:Math.random()*360,rs:(Math.random()-.5)*10,op:1,sh:Math.floor(Math.random()*3)});
    const t0=Date.now(); let raf:number;
    const draw=()=>{const el=Date.now()-t0;const fs=duration*.6;ctx.clearRect(0,0,cv.width,cv.height);for(const p of ps){p.x+=p.vx;p.y+=p.vy;p.vy+=.05;p.rot+=p.rs;p.vx*=.99;if(el>fs)p.op=Math.max(0,1-(el-fs)/(duration-fs));ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.globalAlpha=p.op;ctx.fillStyle=p.color;if(p.sh===0)ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);else if(p.sh===1){ctx.beginPath();ctx.arc(0,0,p.size/2,0,Math.PI*2);ctx.fill();}else{ctx.beginPath();ctx.moveTo(0,-p.size/2);ctx.lineTo(p.size/2,p.size/2);ctx.lineTo(-p.size/2,p.size/2);ctx.closePath();ctx.fill();}ctx.restore();}if(el<duration)raf=requestAnimationFrame(draw);else onDone?.();};
    raf=requestAnimationFrame(draw); return ()=>cancelAnimationFrame(raf);
  },[duration,onDone]);
  return <canvas ref={ref} style={{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:9999}}/>;
};
