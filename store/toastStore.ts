// store/toastStore.ts
// Global toast notification state
// Any component can fire a toast without passing callbacks down

import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  show:   (message: string, type?: ToastType) => void;
  remove: (id: number) => void;
}

let _id = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  show: (message, type = "success") => {
    const id = ++_id;
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    // Auto-dismiss after 3s
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3000);
  },

  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
