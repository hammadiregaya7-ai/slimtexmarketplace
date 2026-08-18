import { useEffect, useState } from "react";
import { METRE_STEP, fmtMetres, fmtPrice, type Product } from "../data/products";
import { useBodyLock, useEscape } from "../hooks/useReveal";
import { BasketIcon, CloseIcon, GlobeIcon, LeafIcon, MinusIcon, PlusIcon, RulerIcon, ScissorsIcon, ThreadIcon, TruckIcon } from "./Icons";

export function ProductModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, metres: number) => void;
}) {
  const [metres, setMetres] = useState(1);

  useEffect(() => {
    if (product) setMetres(Math.min(1, product.stockMetres));
  }, [product]);

  useEscape(!!product, onClose);
  useBodyLock(!!product);

  if (!product) return null;

  const max = product.stockMetres;
  const total = product.pricePerMetre * metres;
  const freeShip = total >= 300;

  const step = (dir: 1 | -1) =>
    setMetres((m) => {
      const next = Math.round((m + dir * METRE_STEP) * 10) / 10;
      return Math.min(max, Math.max(METRE_STEP, next));
    });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button className="fade-in absolute inset-0 cursor-default bg-espresso-950/80 backdrop-blur-sm" onClick={onClose} aria-label="Close details" />

      <div className="modal-in thin-scroll relative max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-bone-100/15 bg-espresso-850 shadow-lift">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-bone-100/15 bg-espresso-950/70 text-bone-300 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-madder-500 hover:text-madder-400"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          {/* image */}
          <div className="relative overflow-hidden">
            <img src={product.image} alt={`${product.name} — ${product.colourway}`} className="h-64 w-full object-cover md:h-full" />
            <span className="absolute bottom-4 left-4 flex items-center gap-2 border border-bone-100/25 bg-espresso-950/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-bone-100 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full border border-bone-100/40" style={{ background: product.swatch }} />
              {product.colourway}
            </span>
          </div>

          {/* details */}
          <div className="p-6 sm:p-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-madder-400">
              {product.category} · {product.origin}
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-bone-50 sm:text-4xl">
              {product.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-bone-500">
              Woven at {product.mill}
            </p>

            <p className="mt-4 leading-relaxed text-bone-300">{product.description}</p>

            {/* spec sheet */}
            <dl className="mt-6 divide-y divide-bone-100/10 border-y border-bone-100/10 text-sm">
              {[
                { icon: ThreadIcon, k: "Composition", v: product.composition },
                { icon: RulerIcon, k: "Weight / width", v: `${product.weightGsm} g/m² · ${product.widthCm} cm` },
                { icon: ScissorsIcon, k: "Best for", v: product.bestFor },
                { icon: LeafIcon, k: "Care", v: product.care },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k} className="flex items-start gap-3 py-3">
                  <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ochre-400" />
                  <dt className="w-32 shrink-0 font-bold uppercase tracking-wider text-bone-700 text-[11px] pt-0.5">{k}</dt>
                  <dd className="text-bone-100">{v}</dd>
                </div>
              ))}
            </dl>

            {/* metre selector */}
            <div className="mt-6 border border-bone-100/12 bg-espresso-900 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-bone-500">Cut length</p>
                  <p className="mt-0.5 text-xs text-bone-700">
                    {fmtMetres(max)} on the bolt · cut in {fmtMetres(METRE_STEP)} steps
                  </p>
                </div>
                <div className="flex items-center border border-bone-100/20">
                  <button
                    onClick={() => step(-1)}
                    disabled={metres <= METRE_STEP}
                    className="flex h-11 w-11 items-center justify-center text-bone-100 transition-colors hover:bg-espresso-700 hover:text-ochre-300 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Decrease by half a metre"
                  >
                    <MinusIcon />
                  </button>
                  <span className="w-20 text-center font-display text-xl font-semibold text-bone-50 tabular-nums">
                    {fmtMetres(metres)}
                  </span>
                  <button
                    onClick={() => step(1)}
                    disabled={metres >= max}
                    className="flex h-11 w-11 items-center justify-center text-bone-100 transition-colors hover:bg-espresso-700 hover:text-ochre-300 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Increase by half a metre"
                  >
                    <PlusIcon />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-bone-100/15 pt-4">
                <div>
                  <p className="font-display text-3xl font-semibold text-bone-50">
                    {fmtPrice(total)}
                  </p>
                  <p className="text-xs text-bone-500">
                    {fmtMetres(metres)} × {fmtPrice(product.pricePerMetre)}/m
                    {freeShip && <span className="ml-2 font-bold text-moss-400">· free courier</span>}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onAdd(product, metres);
                    onClose();
                  }}
                  className="group flex items-center gap-2.5 bg-ochre-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest text-espresso-950 transition-all duration-300 hover:bg-ochre-400 hover:shadow-[0_12px_32px_-10px_rgba(210,154,56,0.6)]"
                >
                  <BasketIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-rotate-6" />
                  Add to cutting list
                </button>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-bone-500">
              <TruckIcon className="h-4 w-4 text-moss-400" />
              Rolled, never folded · ships in a kraft tube within 2 working days
              <GlobeIcon className="ml-1 h-4 w-4 text-moss-400" />
              Tracked worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
