import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CartDrawer, type CartLine } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Marquee } from "./components/Marquee";
import { MillNotes } from "./components/MillNotes";
import { Opener } from "./components/Opener";
import { ProductModal } from "./components/ProductModal";
import { Shop } from "./components/Shop";
import { Toasts, type Toast } from "./components/Toasts";
import { METRE_STEP, PRODUCTS, fmtMetres, type Product } from "./data/products";

interface CartItem {
  id: string;
  metres: number;
}

const STORAGE_KEY = "slimtex-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return parsed.filter((i) => PRODUCTS.some((p) => p.id === i.id) && i.metres > 0);
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [detail, setDetail] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* private mode — carry on */
    }
  }, [cart]);

  const pushToast = useCallback((kind: Toast["kind"], title: string, body?: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, kind, title, body }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, metres: number) => {
      let clamped = false;
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          const next = Math.min(product.stockMetres, Math.round((existing.metres + metres) * 10) / 10);
          clamped = next === existing.metres;
          return prev.map((i) => (i.id === product.id ? { ...i, metres: next } : i));
        }
        return [...prev, { id: product.id, metres: Math.min(product.stockMetres, metres) }];
      });
      if (clamped) {
        pushToast("info", "That's the whole bolt", `Only ${fmtMetres(product.stockMetres)} of ${product.name} remains.`);
      } else {
        pushToast("cart", `Cut ${fmtMetres(metres)} of ${product.name}`, `${product.colourway} — added to your cutting list.`);
      }
    },
    [pushToast]
  );

  const stepCart = useCallback((id: string, dir: 1 | -1) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const product = PRODUCTS.find((p) => p.id === id)!;
          const next = Math.round((item.metres + dir * METRE_STEP) * 10) / 10;
          return { ...item, metres: Math.min(product.stockMetres, Math.max(METRE_STEP, next)) };
        })
        .filter((i) => i.metres > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      const product = PRODUCTS.find((p) => p.id === id);
      setCart((prev) => prev.filter((i) => i.id !== id));
      if (product) pushToast("info", `${product.name} taken off the bench`, "The bolt stays on the shelf for you.");
    },
    [pushToast]
  );

  const lines: CartLine[] = useMemo(
    () =>
      cart
        .map((i) => ({ product: PRODUCTS.find((p) => p.id === i.id)!, metres: i.metres }))
        .filter((l) => !!l.product),
    [cart]
  );

  const cartMetres = useMemo(() => lines.reduce((s, l) => s + l.metres, 0), [lines]);

  const scrollToLibrary = () => {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grain relative min-h-screen font-body text-bone-100 antialiased">
      {/* ambient woven backdrop */}
      <div className="weave-bg pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[42rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(210,154,56,0.09),transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10">
        <Header cartCount={lines.length} cartMetres={cartMetres} onCartOpen={() => setCartOpen(true)} />

        <main>
          <Opener onOpenProduct={setDetail} />
          <Marquee />
          <Shop
            onOpen={setDetail}
            onQuickAdd={(p) => addToCart(p, 1)}
          />
          <MillNotes />
        </main>

        <Footer
          onNewsletter={(email) =>
            pushToast("success", "You're on the swatch letter", `First letter heads to ${email} on the 1st.`)
          }
        />
      </div>

      {/* overlays */}
      <ProductModal product={detail} onClose={() => setDetail(null)} onAdd={addToCart} />
      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onStep={stepCart}
        onRemove={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onBrowse={scrollToLibrary}
      />
      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        onClose={() => setCheckoutOpen(false)}
        onComplete={() => {
          setCart([]);
          pushToast("success", "Order stitched into the ledger", "The cutting room has your bolt.");
        }}
      />

      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
