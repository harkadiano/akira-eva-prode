import { getSharedItem } from '../lib/storage';
const ADMIN_TABLE = 'prode-admin';
const DEADLINE_KEY = 'bet-deadline';
const DEFAULT_DEADLINE = '2026-10-14T23:59:00';
export const getDeadline = async (): Promise<Date> => { try { const r=await getSharedItem({tableName:ADMIN_TABLE,key:DEADLINE_KEY}); if(r){return new Date(JSON.parse(r.item.value).deadline);} } catch{} return new Date(DEFAULT_DEADLINE); };
export const isBettingClosed = async (): Promise<{closed:boolean;deadline:Date}> => { const d=await getDeadline(); return{closed:Date.now()>=d.getTime(),deadline:d}; };
