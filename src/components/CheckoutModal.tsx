import { useEffect, useMemo, useRef, useState } from "react";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, fmtMetres, fmtPrice } from "../data/products";
import { useBodyLock, useEscape } from "../hooks/useReveal";
import type { CartLine } from "./CartDrawer";
import { ArrowIcon, CheckIcon, CloseIcon, CutLine, Monogram, ThreadIcon } from "./Icons";

type Step = "details" | "payment" | "processing" | "done";

interface Fields {
  email: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const EMPTY: Fields = {
  email: "",
  name: "",
  address: "",
  city: "",
  zip: "",
  country: "United Kingdom",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function Field({
  label,
  error,
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-bone-500">{label}</span>
      <input className={`field ${error ? "field-error" : ""}`} {...rest} />
      {error && <span className="mt-1 block text-xs font-bold text-madder-400">{error}</span>}
    </label>
  );
}

export function CheckoutModal({
  open,
  lines,
  onClose,
  onComplete,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>("details");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [orderNo, setOrderNo] = useState("");
  const timerRef = useRef<number | null>(null);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.product.pricePerMetre * l.metres, 0), [lines]);
  const freeShip = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = lines.length === 0 || freeShip ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;
  const totalMetres = lines.reduce((s, l) => s + l.metres, 0);

  useEffect(() => {
    if (open) {
      setStep("details");
      setErrors({});
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [open]);

  useEscape(open && step !== "processing", onClose);
  useBodyLock(open);

  if (!open) return null;

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "cardNumber") v = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (k === "expiry") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    }
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setFields((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validateDetails = () => {
    const er: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) er.email = "Enter a valid email";
    if (fields.name.trim().length < 2) er.name = "Your name, please";
    if (fields.address.trim().length < 4) er.address = "Street and number";
    if (!fields.city.trim()) er.city = "Required";
    if (fields.zip.trim().length < 3) er.zip = "Required";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const validatePayment = () => {
    const er: typeof errors = {};
    if (fields.cardName.trim().length < 2) er.cardName = "Name on card";
    if (fields.cardNumber.replace(/\s/g, "").length !== 16) er.cardNumber = "16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fields.expiry)) er.expiry = "MM/YY";
    if (fields.cvc.length < 3) er.cvc = "3–4 digits";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const pay = () => {
    if (!validatePayment()) return;
    setStep("processing");
    timerRef.current = window.setTimeout(() => {
      setOrderNo(`SL-${Math.floor(1000 + Math.random() * 9000)}-${fields.name.trim().slice(0, 2).toUpperCase() || "OK"}`);
      setStep("done");
    }, 2000);
  };

  const stepIndex = step === "details" ? 0 : step === "payment" ? 1 : 2;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button className="fade-in absolute inset-0 cursor-default bg-espresso-950/85 backdrop-blur-sm" onClick={step === "processing" ? undefined : onClose} aria-label="Close checkout" />

      <div className="modal-in thin-scroll relative max-h-[94vh] w-full max-w-3xl overflow-y-auto border border-bone-100/15 bg-espresso-900 shadow-lift">
        {step !== "processing" && step !== "done" && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-bone-100/15 bg-espresso-950/60 text-bone-300 transition-all duration-300 hover:rotate-90 hover:border-madder-500 hover:text-madder-400"
            aria-label="Close checkout"
          >
            <CloseIcon />
          </button>
        )}

        <div className="grid md:grid-cols-[1.15fr_0.85fr]">
          {/* left: flow */}
          <div className="p-6 sm:p-8">
            {step === "done" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="stamp-in flex h-20 w-20 items-center justify-center rounded-full border-2 border-moss-400 text-moss-400">
                  <CheckIcon className="h-9 w-9" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold text-bone-50 sm:text-4xl">The shears are out.</h3>
                <p className="mt-3 max-w-sm text-bone-300">
                  Order <span className="font-extrabold text-ochre-300">{orderNo}</span> is confirmed —{" "}
                  {fmtMetres(totalMetres)} of cloth will be rolled into a kraft tube and couriered to{" "}
                  <span className="text-bone-100">{fields.city}</span>.
                </p>
                <p className="mt-2 text-xs text-bone-700">A Slimtex receipt is on its way to {fields.email}.</p>
                <button
                  onClick={() => {
                    onComplete();
                    onClose();
                  }}
                  className="group mt-8 flex items-center gap-3 bg-ochre-500 px-7 py-3.5 text-xs font-extrabold uppercase tracking-widest text-espresso-950 transition-all duration-300 hover:bg-ochre-400"
                >
                  Back to the library <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : step === "processing" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <svg viewBox="0 0 48 48" className="spin-slow h-16 w-16 text-ochre-400" fill="none" aria-hidden>
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
                  <path d="M44 24a20 20 0 0 0-20-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <h3 className="mt-6 font-display text-2xl font-semibold text-bone-50">Threaded through the ledger…</h3>
                <p className="mt-2 text-sm text-bone-500">Authorising payment · never stored, never charged.</p>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-madder-400">
                  Checkout · step {stepIndex + 1} of 2
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-bone-50">
                  {step === "details" ? "Where shall we send it?" : "How would you like to pay?"}
                </h3>

                {/* progress steps */}
                <div className="mt-5 flex items-center gap-2">
                  {["Delivery", "Payment", "Cut"].map((s, i) => (
                    <div key={s} className="flex flex-1 items-center gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold transition-colors duration-500 ${
                          i < stepIndex ? "bg-moss-400 text-espresso-950" : i === stepIndex ? "bg-ochre-500 text-espresso-950" : "border border-bone-100/20 text-bone-700"
                        }`}
                      >
                        {i < stepIndex ? <CheckIcon className="h-3 w-3" /> : i + 1}
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${i <= stepIndex ? "text-bone-100" : "text-bone-700"}`}>{s}</span>
                      {i < 2 && <span className={`h-px flex-1 transition-colors duration-500 ${i < stepIndex ? "bg-moss-400" : "bg-bone-100/15"}`} />}
                    </div>
                  ))}
                </div>

                {step === "details" ? (
                  <form
                    className="mt-6 grid grid-cols-2 gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (validateDetails()) setStep("payment");
                    }}
                  >
                    <Field label="Email" type="email" placeholder="you@atelier.com" value={fields.email} onChange={set("email")} error={errors.email} className="col-span-2" autoComplete="email" />
                    <Field label="Full name" placeholder="Ada Wexford" value={fields.name} onChange={set("name")} error={errors.name} className="col-span-2" autoComplete="name" />
                    <Field label="Street address" placeholder="14 Loom Lane" value={fields.address} onChange={set("address")} error={errors.address} className="col-span-2" autoComplete="street-address" />
                    <Field label="City" placeholder="Edinburgh" value={fields.city} onChange={set("city")} error={errors.city} autoComplete="address-level2" />
                    <Field label="Postcode" placeholder="EH1 3QS" value={fields.zip} onChange={set("zip")} error={errors.zip} autoComplete="postal-code" />
                    <Field label="Country" value={fields.country} onChange={set("country")} className="col-span-2" />
                    <div className="col-span-2 mt-2 flex items-center justify-between gap-4">
                      <button type="button" onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-bone-500 transition-colors hover:text-bone-100">
                        ← Back to list
                      </button>
                      <button type="submit" className="group flex items-center gap-3 bg-ochre-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest text-espresso-950 transition-all duration-300 hover:bg-ochre-400">
                        Continue to payment <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    className="mt-6 grid grid-cols-2 gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      pay();
                    }}
                  >
                    <Field label="Name on card" placeholder="ADA WEXFORD" value={fields.cardName} onChange={set("cardName")} error={errors.cardName} className="col-span-2" />
                    <Field label="Card number" inputMode="numeric" placeholder="4242 4242 4242 4242" value={fields.cardNumber} onChange={set("cardNumber")} error={errors.cardNumber} className="col-span-2" />
                    <Field label="Expiry" inputMode="numeric" placeholder="08/27" value={fields.expiry} onChange={set("expiry")} error={errors.expiry} />
                    <Field label="CVC" inputMode="numeric" placeholder="123" value={fields.cvc} onChange={set("cvc")} error={errors.cvc} />
                    <p className="col-span-2 flex items-center gap-2 text-[11px] text-bone-700">
                      <ThreadIcon className="h-4 w-4 text-moss-400" /> Simulated payment — any 16 digits pass. Nothing leaves this page.
                    </p>
                    <div className="col-span-2 mt-2 flex items-center justify-between gap-4">
                      <button type="button" onClick={() => setStep("details")} className="text-xs font-bold uppercase tracking-widest text-bone-500 transition-colors hover:text-bone-100">
                        ← Delivery
                      </button>
                      <button type="submit" className="group flex items-center gap-3 bg-madder-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest text-bone-50 transition-all duration-300 hover:bg-madder-400">
                        Pay {fmtPrice(total)} <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>

          {/* right: order summary */}
          {step !== "done" && (
            <aside className="border-t border-bone-100/12 bg-espresso-850 p-6 sm:p-7 md:border-l md:border-t-0">
              <div className="flex items-center gap-3">
                <Monogram className="h-8 w-8 text-ochre-400" />
                <h4 className="font-display text-lg font-semibold text-bone-50">Order summary</h4>
              </div>
              <ul className="thin-scroll mt-5 max-h-56 space-y-4 overflow-y-auto pr-1">
                {lines.map(({ product, metres }) => (
                  <li key={product.id} className="flex gap-3">
                    <span className="relative h-14 w-12 shrink-0 overflow-hidden">
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 right-0 bg-espresso-950/85 px-1 text-[9px] font-extrabold text-ochre-300">×{fmtMetres(metres)}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-bone-100">{product.name}</span>
                      <span className="block text-xs text-bone-500">{product.colourway}</span>
                    </span>
                    <span className="text-sm font-extrabold text-bone-100 tabular-nums">{fmtPrice(product.pricePerMetre * metres)}</span>
                  </li>
                ))}
              </ul>
              <CutLine className="my-5" />
              <dl className="space-y-2 text-sm text-bone-300">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{fmtPrice(subtotal)}</dd></div>
                <div className="flex justify-between">
                  <dt>Courier</dt>
                  <dd className={`tabular-nums ${freeShip ? "font-bold text-moss-400" : ""}`}>{freeShip ? "Free" : fmtPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-bone-100/12 pt-3 text-base">
                  <dt className="font-display font-semibold text-bone-50">Total</dt>
                  <dd className="font-display font-semibold text-ochre-300 tabular-nums">{fmtPrice(total)}</dd>
                </div>
              </dl>
              <p className="mt-5 border border-dashed border-bone-100/20 p-3 text-[11px] leading-relaxed text-bone-500">
                Each cut is chalk-marked, rolled around acid-free tissue, and sealed with the mill's stamp.
              </p>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
