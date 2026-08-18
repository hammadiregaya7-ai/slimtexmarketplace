import { BasketIcon, CheckIcon, ScissorsIcon } from "./Icons";

export interface Toast {
  id: number;
  kind: "cart" | "success" | "info";
  title: string;
  body?: string;
}

const ICONS = {
  cart: BasketIcon,
  success: CheckIcon,
  info: ScissorsIcon,
};

const TONES = {
  cart: "border-ochre-500/50 text-ochre-300",
  success: "border-moss-400/60 text-moss-400",
  info: "border-bone-100/25 text-bone-300",
};

export function Toasts({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[80] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4 sm:left-auto sm:right-6 sm:translate-x-0 sm:items-end">
      {toasts.map((t) => {
        const Icon = ICONS[t.kind];
        return (
          <button
            key={t.id}
            onClick={() => onDismiss(t.id)}
            className={`toast-in pointer-events-auto flex w-full items-start gap-3 border bg-espresso-800/95 p-3.5 text-left shadow-lift backdrop-blur-md transition-transform hover:-translate-y-0.5 ${TONES[t.kind]}`}
            role="status"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="min-w-0">
              <span className="block text-sm font-extrabold text-bone-50">{t.title}</span>
              {t.body && <span className="block truncate text-xs text-bone-500">{t.body}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
