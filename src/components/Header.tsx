import { useEffect, useState } from "react";
import { BasketIcon, Monogram } from "./Icons";

export function Header({
  cartCount,
  cartMetres,
  onCartOpen,
}: {
  cartCount: number;
  cartMetres: number;
  onCartOpen: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* announcement ticker */}
      <div className="bg-ochre-500 text-espresso-950">
        <p className="mx-auto max-w-7xl px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs">
          Cutting room open — free courier on orders over $300 · every bolt cut to the half metre
        </p>
      </div>

      <div
        className={`border-b border-bone-100/10 transition-all duration-300 ${
          scrolled
            ? "bg-espresso-950/90 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="group flex items-center gap-3">
            <Monogram className="h-9 w-9 text-ochre-400 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="leading-none">
              <span className="block font-display text-xl font-semibold tracking-tight text-bone-50">
                slim<span className="text-ochre-400">tex</span>
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] text-bone-500">
                Fine cloth merchants
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-bone-300 md:flex">
            <a href="#library" className="link-underline transition-colors hover:text-ochre-300">
              Cloth library
            </a>
            <a href="#notes" className="link-underline transition-colors hover:text-ochre-300">
              Mill notes
            </a>
            <a href="#footer" className="link-underline transition-colors hover:text-ochre-300">
              The shop
            </a>
          </nav>

          <button
            onClick={onCartOpen}
            className="group relative flex items-center gap-2.5 border border-bone-100/20 bg-espresso-800/60 px-4 py-2.5 text-sm font-bold text-bone-100 transition-all duration-300 hover:border-ochre-500 hover:bg-espresso-700 hover:text-ochre-300"
            aria-label={`Open cutting list, ${cartCount} cloths`}
          >
            <BasketIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Cutting list</span>
            {cartCount > 0 && (
              <span
                key={cartCount + "-" + cartMetres}
                className="badge-pop absolute -right-2.5 -top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-madder-500 px-1.5 text-[11px] font-extrabold text-bone-50"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .link-underline { position: relative; }
        .link-underline::after {
          content: ""; position: absolute; left: 0; bottom: -4px; height: 1.5px; width: 100%;
          background: currentColor; transform: scaleX(0); transform-origin: right;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .link-underline:hover::after { transform: scaleX(1); transform-origin: left; }
      `}</style>
    </header>
  );
}
