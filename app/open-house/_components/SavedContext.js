'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Faked "My OHC": lives in memory only, so nothing is stored and a reload clears it.
const Ctx = createContext(null);

export function SavedProvider({ children }) {
  const [items, setItems] = useState({}); // id -> { label, kind }
  const [open, setOpen] = useState(false);

  const toggle = useCallback((id, label, kind) => {
    setItems((cur) => {
      const next = { ...cur };
      if (next[id]) delete next[id];
      else next[id] = { label, kind };
      return next;
    });
  }, []);
  const remove = useCallback((id) => setItems((cur) => { const n = { ...cur }; delete n[id]; return n; }), []);
  const clear = useCallback(() => setItems({}), []);

  const value = useMemo(
    () => ({ items, count: Object.keys(items).length, isSaved: (id) => Boolean(items[id]), toggle, remove, clear, open, setOpen }),
    [items, toggle, remove, clear, open]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSaved = () => useContext(Ctx);
