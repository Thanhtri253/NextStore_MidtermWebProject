// components/ToastContainer.tsx
// Global toast notifications — subscribes to toastStore
// Mounted once in Layout, works from any component in the tree

import { useToastStore } from "@/store/toastStore";

const ICONS = {
  success: "✓",
  error:   "✕",
  info:    "ℹ",
};
const STYLES = {
  success: "bg-green-500/15 border-green-500/30 text-green-300",
  error:   "bg-red-500/15 border-red-500/30 text-red-300",
  info:    "bg-blue-500/15 border-blue-500/30 text-blue-300",
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl pointer-events-auto animate-slide-up ${STYLES[t.type]}`}>
          <span className="font-bold text-sm">{ICONS[t.type]}</span>
          <span className="text-sm font-medium">{t.message}</span>
          <button onClick={() => remove(t.id)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity text-xs">✕</button>
        </div>
      ))}
    </div>
  );
}
