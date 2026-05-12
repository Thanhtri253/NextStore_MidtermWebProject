// store/recentStore.ts
// Tracks recently viewed products globally
// Populated automatically when user visits a product page

import { create } from "zustand";
import { Product } from "@/types";

interface RecentState {
  items: Product[];
  add:   (product: Product) => void;
  clear: () => void;
}

export const useRecentStore = create<RecentState>((set) => ({
  items: [],

  add: (product) =>
    set((s) => {
      const filtered = s.items.filter((i) => i.id !== product.id);
      return { items: [product, ...filtered].slice(0, 6) }; // keep last 6
    }),

  clear: () => set({ items: [] }),
}));
