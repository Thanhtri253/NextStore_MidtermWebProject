// store/wishlistStore.ts
// Global wishlist state — separate Zustand store
// Shows how multiple stores can coexist and share Product type

import { create } from "zustand";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
  toggle:    (product: Product) => void;
  has:       (id: number) => boolean;
  count:     () => number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  toggle: (product) =>
    set((s) =>
      s.items.find((i) => i.id === product.id)
        ? { items: s.items.filter((i) => i.id !== product.id) }
        : { items: [...s.items, product] }
    ),

  has:   (id) => !!get().items.find((i) => i.id === id),
  count: ()   => get().items.length,
}));
