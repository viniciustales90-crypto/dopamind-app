// lib/storage.ts
// wrapper simples pro localStorage, protegido pra SSR

export const storage = {
  get<T = unknown>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.error('storage.get error', err);
      return null;
    }
  },

  set(key: string, value: unknown) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('storage.set error', err);
    }
  },

  remove(key: string) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error('storage.remove error', err);
    }
  },
};
