import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, orderBy, DocumentData } from 'firebase/firestore';

export class StorageError extends Error {
  constructor(msg: string) { super(msg); this.name = 'StorageError'; }
}

// Evita que la app quede colgada si Firestore no responde (ej: config no válida o sin red).
const TIMEOUT_MS = 8000;
const withTimeout = <T>(p: Promise<T>, ms = TIMEOUT_MS): Promise<T> =>
  Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new StorageError('Timeout: Firestore no respondió')), ms)
    ),
  ]);

export const putSharedItem = async (opts: {
  tableName: string; key: string; value: string; writeMode?: 'UPSERT' | 'INSERT';
}) => {
  const ref = doc(db, opts.tableName, opts.key);
  if (opts.writeMode === 'INSERT') {
    const existing = await withTimeout(getDoc(ref));
    if (existing.exists()) throw new StorageError('Conflict: key already exists');
  }
  await withTimeout(setDoc(ref, { value: opts.value, updatedAt: Date.now() }));
};

export const getSharedItem = async (opts: {
  tableName: string; key: string;
}): Promise<{ item: { key: string; value: string } } | null> => {
  const ref = doc(db, opts.tableName, opts.key);
  const snap = await withTimeout(getDoc(ref));
  if (!snap.exists()) return null;
  return { item: { key: opts.key, value: (snap.data() as DocumentData).value } };
};

export const listSharedItems = async (opts: {
  tableName: string; sortOrder?: 'ASC' | 'DESC'; nextToken?: string;
}): Promise<{ items: { key: string; value: string }[]; nextToken?: string }> => {
  const q = query(collection(db, opts.tableName), orderBy('updatedAt'));
  const snap = await withTimeout(getDocs(q));
  return { items: snap.docs.map(d => ({ key: d.id, value: (d.data() as DocumentData).value })) };
};
