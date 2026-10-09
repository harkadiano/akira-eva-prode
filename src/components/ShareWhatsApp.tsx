import React, { useEffect, useState } from 'react';
import { getSharedItem } from '../lib/storage';
import { useTheme } from './ThemeContext';

const ADMIN_TABLE = 'prode-admin';
const ACCESS_CODE_KEY = 'access-code';
const DEFAULT_CODE = 'alanna2026';

// Construye la URL pública del prode con el código de acceso incluido (?code=...)
// Usa la URL actual (origin + pathname) para que funcione tanto en local como en producción (GitHub Pages).
const buildInviteUrl = (code: string): string => {
  try {
    const base = `${window.location.origin}${window.location.pathname}`;
    const url = new URL(base);
    url.searchParams.set('code', code);
    return url.toString();
  } catch {
    return window.location.href;
  }
};

const openWhatsApp = (text: string) => {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

const btnStyle = (dark: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '.6rem 1.1rem',
  borderRadius: 14,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '.9rem',
  fontWeight: 700,
  color: '#fff',
  background: 'linear-gradient(135deg,#25D366,#128C7E)',
  boxShadow: dark ? '0 3px 10px rgba(37,211,102,.25)' : '0 3px 10px rgba(37,211,102,.35)',
  maxWidth: '100%',
});

const WhatsAppIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" focusable="false">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.19.84.85-3.11-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/>
  </svg>
);

// Botón: invitar a participar (comparte link con código de acceso)
export const ShareInviteButton: React.FC = () => {
  const { theme } = useTheme();
  const [code, setCode] = useState(DEFAULT_CODE);
  useEffect(() => {
    (async () => {
      try {
        const r = await getSharedItem({ tableName: ADMIN_TABLE, key: ACCESS_CODE_KEY });
        if (r) { const d = JSON.parse(r.item.value); if (d.code) setCode(d.code); }
      } catch {}
    })();
  }, []);
  const handleClick = () => {
    const link = buildInviteUrl(code);
    const text =
      `🎲👶 *Prode de Alanna* 👶🎲\n\n` +
      `¡Jugátela! ¿Cuándo nace la princesita? 🎀\n` +
      `🏆 Importantes premios al que acierte 🏆\n\n` +
      `Entrá y hacé tu apuesta acá 👇\n${link}\n\n` +
      `🔑 Código de acceso: ${code}`;
    openWhatsApp(text);
  };
  return (
    <button className="btn-hover" onClick={handleClick} style={btnStyle(theme.dark)} title="Invitar por WhatsApp">
      <WhatsAppIcon /> Invitar por WhatsApp
    </button>
  );
};

// Botón: compartir el ganador (comparte podio cuando ya se revelaron los resultados)
export const ShareWinnerButton: React.FC<{
  winner: string;
  points: number;
  runnerUp?: string | null;
  third?: string | null;
}> = ({ winner, points, runnerUp, third }) => {
  const { theme } = useTheme();
  const handleClick = () => {
    const link = (() => { try { return `${window.location.origin}${window.location.pathname}`; } catch { return window.location.href; } })();
    const lines = [
      `🎉👶 *¡Ya nació Alanna!* 👶🎉`,
      ``,
      `🏆 *Resultados del Prode de Alanna* 🏆`,
      ``,
      `🥇 Ganador/a: *${winner}* (${points} pts)`,
    ];
    if (runnerUp) lines.push(`🥈 Segundo/a: ${runnerUp}`);
    if (third) lines.push(`🥉 Tercero/a: ${third}`);
    lines.push(``, `Mirá el podio completo acá 👇`, link);
    openWhatsApp(lines.join('\n'));
  };
  return (
    <button className="btn-hover" onClick={handleClick} style={btnStyle(theme.dark)} title="Compartir el ganador por WhatsApp">
      <WhatsAppIcon /> Compartir ganador
    </button>
  );
};
