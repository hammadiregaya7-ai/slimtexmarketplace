import { MARQUEE_TERMS } from "../data/products";

export function Marquee() {
  const row = [...MARQUEE_TERMS, ...MARQUEE_TERMS];
  return (
    <div className="marquee relative overflow-hidden border-y border-bone-100/10 bg-espresso-900/70 py-4" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {row.map((term, i) => (
          <span key={`${term}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
            <span
              className={`font-display text-2xl font-medium italic tracking-wide sm:text-3xl ${
                i % 2 ? "text-bone-100/35" : "text-ochre-400/80"
              }`}
            >
              {term}
            </span>
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-madder-500" fill="currentColor">
              <path d="M6 0l1.8 4.2L12 6 7.8 7.8 6 12 4.2 7.8 0 6l4.2-1.8z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
