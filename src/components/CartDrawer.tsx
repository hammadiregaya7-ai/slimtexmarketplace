import {
  FREE_SHIPPING_THRESHOLD,
  METRE_STEP,
  SHIPPING_FLAT,
  fmtMetres,
  fmtPrice,
  type Product,
} from "../data/products";
import { useBodyLock, useEscape } from "../hooks/useReveal";
import { ArrowIcon, BasketIcon, CloseIcon, CutLine, MinusIcon, PlusIcon, ScissorsIcon, TruckIcon } from "./Icons";

export interface CartLine {
  product: Product;
  metres: number;
}

export function CartDrawer({
  open,
  lines,
  onClose,
  onStep,
  onRemove,
  onCheckout,
  onBrowse,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onStep: (id: string, dir: 1 | -1) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onBrowse: () => void;
}) {
  useEscape(open, onClose);
  useBodyLock(open);

  const subtotal = lines.reduce((s, l) => s + l.product.pricePerMetre * l.metres, 0);
  const freeShip = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = lines.length === 0 || freeShip ? 0 : SHIPPING_FLAT;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        className={`absolute inset-0 cursor-default bg-espresso-950/75 backdrop-blur-sm transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-label="Close cutting list"
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={`drawer-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-bone-100/15 bg-espresso-900 shadow-lift transition-[transform,visibility] duration-400 ease-out ${open ? "visible" : "invisible translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Cutting list"
      >
        {/* head */}
        <div className="flex items-center justify-between border-b border-bone-100/12 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-50">The cutting list</h2>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bone-700">
              {lines.length === 0 ? "Nothing cut yet" : `${lines.length} cloth${lines.length > 1 ? "s" : ""} · ${fmtMetres(lines.reduce((s, l) => s + l.metres, 0))} total`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-bone-100/15 text-bone-300 transition-all duration-300 hover:rotate-90 hover:border-madder-500 hover:text-madder-400"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* free shipping meter */}
        {lines.length > 0 && (
          <div className="border-b border-bone-100/12 bg-espresso-850 px-6 py-4">
            <p className="flex items-center gap-2 text-xs font-bold text-bone-300">
              <TruckIcon className="h-4 w-4 text-ochre-400" />
              {freeShip ? (
                <span className="text-moss-400">Free courier unlocked — nicely done.</span>
              ) : (
                <>
                  <span className="text-ochre-300">{fmtPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</span> away from free courier
                </>
              )}
            </p>
            <div className="mt-2.5 h-1.5 w-full bg-espresso-700">
              <div
                className={`h-full transition-all duration-700 ease-out ${freeShip ? "bg-moss-400" : "bg-ochre-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* lines */}
        <div className="thin-scroll flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-bone-100/25 text-bone-700">
                <BasketIcon className="h-9 w-9" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-bone-100">The bench is empty</h3>
              <p className="mt-2 max-w-[240px] text-sm text-bone-500">
                Add a bolt from the library and we'll cut it to the half metre.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowse();
                }}
                className="mt-6 flex items-center gap-2 border border-ochre-500/60 px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-ochre-300 transition-colors hover:bg-ochre-500 hover:text-espresso-950"
              >
                Browse the library <ArrowIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map(({ product, metres }) => (
                <li key={product.id} className="fade-in flex gap-4 border border-bone-100/10 bg-espresso-850 p-3 transition-colors hover:border-bone-100/25">
                  <img src={product.image} alt={product.name} className="h-24 w-20 shrink-0 object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-semibold leading-tight text-bone-50">{product.name}</p>
                        <p className="truncate text-xs text-bone-500">
                          {product.colourway} · {fmtPrice(product.pricePerMetre)}/m
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="shrink-0 p-1 text-bone-700 transition-colors hover:text-madder-400"
                        aria-label={`Remove ${product.name}`}
                        title="Remove"
                      >
                        <ScissorsIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-bone-100/15">
                        <button
                          onClick={() => onStep(product.id, -1)}
                          disabled={metres <= METRE_STEP}
                          className="flex h-8 w-8 items-center justify-center text-bone-100 transition-colors hover:bg-espresso-700 hover:text-ochre-300 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Reduce ${product.name} by half a metre`}
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-14 text-center text-sm font-extrabold text-bone-50 tabular-nums">{fmtMetres(metres)}</span>
                        <button
                          onClick={() => onStep(product.id, 1)}
                          disabled={metres >= product.stockMetres}
                          className="flex h-8 w-8 items-center justify-center text-bone-100 transition-colors hover:bg-espresso-700 hover:text-ochre-300 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Add half a metre of ${product.name}`}
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-lg font-semibold text-ochre-300 tabular-nums">
                        {fmtPrice(product.pricePerMetre * metres)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* totals */}
        {lines.length > 0 && (
          <div className="border-t border-bone-100/12 bg-espresso-850 px-6 py-5">
            <CutLine className="mb-4" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-bone-300">
                <dt>Cloth subtotal</dt>
                <dd className="tabular-nums">{fmtPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-bone-300">
                <dt>Courier (kraft tube)</dt>
                <dd className={`tabular-nums ${freeShip ? "font-bold text-moss-400" : ""}`}>{freeShip ? "Free" : fmtPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-bone-100/12 pt-3 text-lg">
                <dt className="font-display font-semibold text-bone-50">Total</dt>
                <dd className="font-display font-semibold text-bone-50 tabular-nums">{fmtPrice(subtotal + shipping)}</dd>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="group mt-5 flex w-full items-center justify-center gap-3 bg-madder-500 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-bone-50 transition-all duration-300 hover:bg-madder-400 hover:shadow-[0_14px_36px_-12px_rgba(181,74,44,0.6)]"
            >
              Proceed to checkout
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-[11px] text-bone-700">Demo checkout — no card is ever charged.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
