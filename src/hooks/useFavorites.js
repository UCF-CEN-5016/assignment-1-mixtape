import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mixtape.favorites";

const read = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // Private browsing, blocked storage, or corrupt JSON. Start empty.
    return [];
  }
};

/** Favourite album ids, persisted to localStorage so they survive a reload. */
export const useFavorites = () => {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Nothing we can do if storage is unavailable; keep state in memory.
    }
  }, [ids]);

  const toggle = useCallback((id) => {
    setIds((current) =>
      current.includes(id)
        ? current.filter((existing) => existing !== id)
        : [...current, id],
    );
  }, []);

  const isFavorite = useCallback((id) => ids.includes(id), [ids]);

  return { favoriteIds: ids, toggle, isFavorite };
};
