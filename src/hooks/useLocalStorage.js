import { useState, useCallback } from "preact/hooks";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch (err) {
      console.error(`Erreur de lecture localStorage pour "${key}"`, err);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch (err) {
          console.error(`Erreur d'écriture localStorage pour "${key}"`, err);
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, update];
}
