import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types";

interface FavoritesContextValue {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  isFav: (id: string) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const KEY = "sumer-favorites-v1";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Product[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = (product: Product) =>
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const isFav = (id: string) => items.some((p) => p.id === id);
  const count = items.length;

  return (
    <FavoritesContext.Provider value={{ items, add, remove, isFav, count }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
