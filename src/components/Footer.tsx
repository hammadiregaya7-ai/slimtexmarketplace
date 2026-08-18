import { useState } from "react";
import { ArrowIcon, GlobeIcon, Monogram, ThreadIcon, TruckIcon } from "./Icons";

export function Footer({ onNewsletter }: { onNewsletter: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  return (
    <footer id="footer" className="relative scroll-mt-32 border-t border-bone-100/10 bg-espresso-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* newsletter */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-madder-400">The swatch letter</p>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight text-bone-50 sm:text-4xl">
              One letter a month. <em className="font-light italic text-ochre-400">New bolts first,</em> swatches posted free.
            </h2>
            <form
              className="mt-6 flex max-w-md gap-0"
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
                  setError(true);
                  return;
                }
                setError(false);
                onNewsletter(email);
                setEmail("");
              }}
            >
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="your@studio.com"
                aria-label="Email for the swatch letter"
                className={`field !border-r-0 ${error ? "field-error" : ""}`}
              />
              <button
                type="submit"
                className="group flex shrink-0 items-center gap-2 bg-ochre-500 px-5 text-xs font-extrabold uppercase tracking-widest text-espresso-950 transition-colors hover:bg-ochre-400"
              >
                Join <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            {error && <p className="mt-2 text-xs font-bold text-madder-400">That email doesn't look sewn together right.</p>}
          </div>

          {/* shop facts */}
          <dl className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="flex gap-3 lg:flex-col xl:flex-row">
              <ThreadIcon className="h-5 w-5 shrink-0 text-ochre-400" />
              <div>
                <dt className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-bone-700">The shop</dt>
                <dd className="mt-1 leading-relaxed text-bone-300">9 Shuttle Row, Edinburgh<br />Wed–Sat, 10:00–17:30</dd>
              </div>
            </div>
            <div className="flex gap-3 lg:flex-col xl:flex-row">
              <GlobeIcon className="h-5 w-5 shrink-0 text-ochre-400" />
              <div>
                <dt className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-bone-700">Write to us</dt>
                <dd className="mt-1 leading-relaxed text-bone-300">bench@slimtex.shop<br />+44 131 555 0187</dd>
              </div>
            </div>
            <div className="flex gap-3 lg:flex-col xl:flex-row">
              <TruckIcon className="h-5 w-5 shrink-0 text-ochre-400" />
              <div>
                <dt className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-bone-700">Dispatch</dt>
                <dd className="mt-1 leading-relaxed text-bone-300">Cut same day before 14:00<br />tracked, worldwide</dd>
              </div>
            </div>
          </dl>
        </div>

        <p aria-hidden className="outline-text mt-14 select-none overflow-hidden whitespace-nowrap text-center font-display text-[22vw] font-black leading-[0.85] tracking-tight lg:text-[11rem]">
          slimtex
        </p>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-bone-100/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Monogram className="h-7 w-7 text-ochre-400" />
            <p className="text-xs text-bone-700">
              © 1987–2026 Slimtex, fine cloth merchants. Cloth is sold by the metre, faults chalk-marked.
            </p>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-bone-700">
            Warp holds it taut · weft makes it cloth
          </p>
        </div>
      </div>
    </footer>
  );
}
