// store/cartStore.ts
// Global cart state — Zustand
// Demonstrates: no prop drilling, subscribe to slices, actions shared across all components

import { create } from "zustand";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;                          // sidebar drawer state

  addItem:    (product: Product) => void;
  removeItem: (id: number) => void;
  changeQty:  (id: number, delta: number) => void;
  clearCart:  () => void;
  openCart:   () => void;
  closeCart:  () => void;
  toggleCart: () => void;

  // Computed selectors
  totalCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items:  [],
  isOpen: false,

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return { items: state.items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    });
  },

  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  changeQty: (id, delta) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    })),

  clearCart:  () => set({ items: [] }),
  openCart:   () => set({ isOpen: true }),
  closeCart:  () => set({ isOpen: false }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

  totalCount: () => get().items.reduce((a, i) => a + i.qty, 0),
  totalPrice: () => get().items.reduce((a, i) => a + i.price * i.qty, 0),
}));
