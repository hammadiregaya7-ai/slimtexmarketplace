import { PRODUCTS, fmtPrice } from "../data/products";
import type { Product } from "../data/products";
import { ArrowIcon, GlobeIcon, RulerIcon, SpoolIcon } from "./Icons";

const SWATCH_IDS = ["harris-tweed-peat", "silk-charmeuse-amber", "selvedge-denim-midnight"];

function SwatchCard({
  product,
  onOpen,
  floatDelay,
  className,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  floatDelay: string;
  className?: string;
}) {
  return (
    <div className={`${className ?? ""} transition-all duration-500 ease-out hover:z-20 hover:-translate-y-2 hover:rotate-0!`}>
      <button
        onClick={() => onOpen(product)}
        style={{ animationDelay: floatDelay }}
        className="float-soft group relative block w-52 shrink-0 border border-bone-100/15 bg-espresso-800 p-2.5 pb-3 text-left shadow-card transition-all duration-500 hover:border-ochre-500/60 hover:shadow-lift sm:w-60"
      >
        <span className="pointer-events-none absolute -top-2 left-1/2 z-10 h-4 w-10 -translate-x-1/2 rotate-2 bg-bone-100/25 backdrop-blur-[1px]" />
        <span className="block overflow-hidden">
          <img
            src={product.image}
            alt={`${product.name} — ${product.colourway}`}
            loading="eager"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        </span>
        <span className="mt-2.5 flex items-start justify-between gap-2 px-1">
          <span>
            <span className="block font-display text-base font-semibold leading-tight text-bone-50">
              {product.name}
            </span>
            <span className="block text-xs text-bone-500">
              {product.colourway} · {product.category}
            </span>
          </span>
          <span className="mt-0.5 flex h-4 w-4 shrink-0 rounded-full border border-bone-100/30" style={{ background: product.swatch }} />
        </span>
        <span className="mt-2 flex items-center justify-between border-t border-dashed border-bone-100/15 px-1 pt-2">
          <span className="text-sm font-extrabold text-ochre-400">{fmtPrice(product.pricePerMetre)}/m</span>
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-bone-500 transition-colors group-hover:text-ochre-300">
            View bolt <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </span>
      </button>
    </div>
  );
}

export function Opener({ onOpenProduct }: { onOpenProduct: (p: Product) => void }) {
  const swatches = SWATCH_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!);

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-40 lg:pb-24">
      {/* ambient layers */}
      <div className="halo pointer-events-none absolute -top-32 right-[-10%] h-[52rem] w-[52rem]" />
      <div
        aria-hidden
        className="outline-text pointer-events-none absolute -left-6 top-40 hidden select-none font-display text-[16rem] font-black leading-none xl:block"
      >
        CLOTH
      </div>
      <p
        aria-hidden
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.5em] text-bone-700 [writing-mode:vertical-rl] xl:block"
      >
        Slimtex — est. 1987
      </p>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* editorial column */}
        <div>
          <p className="mask-line text-xs font-bold uppercase tracking-[0.3em] text-ochre-400">
            <span style={{ animationDelay: "0.05s" }}>The cutting room · Autumn bolts just landed</span>
          </p>

          <h1 className="mt-5 font-display text-[2.7rem] font-semibold leading-[0.98] tracking-tight text-bone-50 sm:text-6xl lg:text-[4.4rem]">
            <span className="mask-line">
              <span style={{ animationDelay: "0.12s" }}>Six bolts of cloth,</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "0.24s" }}>
                each with a <em className="font-light italic text-ochre-400">provenance</em>
              </span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "0.36s" }}>you can trace.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-300 sm:text-lg">
            Harris tweed hand-woven on Lewis, deadstock charmeuse from Como, denim walked off a
            shuttle loom in Okayama. We buy small, name every mill, and cut to the half metre —
            because cloth this good deserves to be felt before it is sewn.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#library"
              className="group inline-flex items-center gap-3 bg-ochre-500 px-6 py-3.5 text-sm font-extrabold uppercase tracking-widest text-espresso-950 transition-all duration-300 hover:bg-ochre-400 hover:shadow-[0_14px_36px_-12px_rgba(210,154,56,0.55)]"
            >
              Browse the library
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#notes"
              className="inline-flex items-center gap-2 border border-bone-100/25 px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-bone-100 transition-colors duration-300 hover:border-bone-100/60 hover:bg-bone-100/5"
            >
              Mill notes
            </a>
          </div>

          {/* provenance stats */}
          <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-bone-100/12 border-y border-bone-100/12">
            {[
              { icon: SpoolIcon, big: "38", small: "partner mills" },
              { icon: GlobeIcon, big: "6", small: "countries of origin" },
              { icon: RulerIcon, big: "0.5 m", small: "minimum cut" },
            ].map(({ icon: Icon, big, small }) => (
              <div key={big} className="group flex flex-col gap-2 px-4 py-5 first:pl-0 sm:px-6">
                <Icon className="h-5 w-5 text-madder-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <div>
                  <dd className="font-display text-2xl font-semibold text-bone-50 sm:text-3xl">{big}</dd>
                  <dt className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-bone-500">{small}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* scattered swatch postcards */}
        <div className="relative">
          {/* desktop scatter */}
          <div className="relative hidden h-[560px] md:block">
            <div className="stamp-in absolute right-2 top-0 z-10 h-28 w-28 text-ochre-400">
              <svg viewBox="0 0 120 120" fill="none" style={{ animation: "spin-slow 26s linear infinite", animationDuration: "26s" }} className="h-full w-full">
                <defs>
                  <path id="stampcircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <circle cx="60" cy="60" r="57" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 4" opacity="0.7" />
                <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <text fontSize="10.5" fontWeight="700" letterSpacing="2.6" fill="currentColor">
                  <textPath href="#stampcircle">SLIMTEX · EST. 1987 · CUT TO ORDER ·</textPath>
                </text>
                <path d="M50 60h20M60 50v20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <SwatchCard product={swatches[1]} onOpen={onOpenProduct} floatDelay="0.8s" className="absolute right-4 top-16 rotate-[5deg]" />
            <SwatchCard product={swatches[0]} onOpen={onOpenProduct} floatDelay="0s" className="absolute left-0 top-6 -rotate-[7deg] z-10" />
            <SwatchCard product={swatches[2]} onOpen={onOpenProduct} floatDelay="1.6s" className="absolute bottom-0 left-1/3 -rotate-2 z-[5]" />
          </div>

          {/* mobile: tilted rail */}
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:hidden">
            {swatches.map((p, i) => (
              <SwatchCard
                key={p.id}
                product={p}
                onOpen={onOpenProduct}
                floatDelay={`${i * 0.6}s`}
                className={i % 2 ? "mt-6 rotate-[2.5deg]" : "mt-2 -rotate-[2.5deg]"}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-bone-700 md:mt-0">
            ↑ pulled from this season's bolts — tap a swatch
          </p>
        </div>
      </div>
    </section>
  );
}
