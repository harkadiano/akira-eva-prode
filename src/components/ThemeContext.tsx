import React, { createContext, useContext, useState, useEffect } from 'react';
export interface Theme {
  dark: boolean; bg: string; bgCard: string; bgCardAlt: string;
  text: string; textSub: string; textMuted: string; accent: string; accentLight: string;
  border: string; borderLight: string; inputBg: string; inputBorder: string;
  shadow: string; overlay: string;
}
const light: Theme = { dark:false, bg:'linear-gradient(170deg,#fce4ec 0%,#fff0f5 35%,#fff 100%)', bgCard:'#fff', bgCardAlt:'#fff5f8', text:'#333', textSub:'#777', textMuted:'#aaa', accent:'#c2185b', accentLight:'#f8bbd0', border:'#f8d7e8', borderLight:'#fce4ec', inputBg:'#fff', inputBorder:'#e0c4d4', shadow:'0 6px 24px rgba(219,112,147,0.18)', overlay:'rgba(0,0,0,0.5)' };
const dark: Theme = { dark:true, bg:'linear-gradient(170deg,#1a1020 0%,#2d1b35 35%,#1e1225 100%)', bgCard:'#2a1f30', bgCardAlt:'#352840', text:'#f0e6f0', textSub:'#c0a8c8', textMuted:'#7a6580', accent:'#f06292', accentLight:'#5a3050', border:'#4a3555', borderLight:'#3d2b48', inputBg:'#352840', inputBorder:'#5a3f65', shadow:'0 6px 24px rgba(0,0,0,0.4)', overlay:'rgba(0,0,0,0.7)' };
interface Ctx { theme: Theme; toggle: () => void; }
const ThemeCtx = createContext<Ctx>({ theme: light, toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => { try { return localStorage.getItem('prode-dark') === '1'; } catch { return false; } });
  useEffect(() => { try { localStorage.setItem('prode-dark', isDark ? '1' : '0'); } catch {} }, [isDark]);
  return <ThemeCtx.Provider value={{ theme: isDark ? dark : light, toggle: () => setIsDark(d => !d) }}>{children}</ThemeCtx.Provider>;
};
