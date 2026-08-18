import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, fmtMetres, fmtPrice, type Category, type Product } from "../data/products";
import { Reveal } from "../hooks/useReveal";
import { ArrowIcon, CloseIcon, PlusIcon, SearchIcon, ScissorsIcon } from "./Icons";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

function ProductCard({
  product,
  index,
  onOpen,
  onQuickAdd,
}: {
  product: Product;
  index: number;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  const stockPct = Math.min(100, (product.stockMetres / 25) * 100);
  const low = product.stockMetres <= 9;

  return (
    <Reveal delay={(index % 3) * 90}>
      <article
        className="group relative flex h-full flex-col overflow-hidden border border-bone-100/12 bg-espresso-850 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-ochre-500/50 hover:shadow-lift"
      >
        {/* image */}
        <button onClick={() => onOpen(product)} className="relative block cursor-pointer overflow-hidden text-left" aria-label={`View ${product.name} details`}>
          <img
            src={product.image}
            alt={`${product.name} — ${product.colourway} fabric close-up`}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
          <span className="absolute left-3 top-3 border border-bone-100/25 bg-espresso-950/70 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-bone-100 backdrop-blur-sm">
            {product.category}
          </span>
          {product.tags.includes("deadstock") && (
            <span className="absolute right-3 top-3 bg-madder-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-bone-50">
              Deadstock · last roll
            </span>
          )}
          <span className="absolute bottom-3 left-3 flex translate-y-1 items-center gap-2 text-xs font-bold uppercase tracking-widest text-bone-50 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <ScissorsIcon className="h-4 w-4 text-ochre-300" /> Inspect the bolt
          </span>
        </button>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold leading-snug text-bone-50">
                <button onClick={() => onOpen(product)} className="text-left transition-colors hover:text-ochre-300">
                  {product.name}
                </button>
              </h3>
              <p className="mt-0.5 text-sm text-bone-500">
                “{product.colourway}” · {product.origin}
              </p>
            </div>
            <span className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-bone-100/30" style={{ background: product.swatch }} title={product.colourway} />
          </div>

          <div className="mt-4 flex gap-2">
            {product.tags.slice(0, 2).map((t) => (
              <span key={t} className="border border-bone-100/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bone-500">
                {t}
              </span>
            ))}
          </div>

          {/* specs */}
          <dl className="mt-4 grid grid-cols-3 divide-x divide-bone-100/10 border-y border-bone-100/10 py-2.5 text-center">
            <div className="px-1">
              <dd className="text-sm font-extrabold text-bone-100">{product.weightGsm}</dd>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-bone-700">g/m²</dt>
            </div>
            <div className="px-1">
              <dd className="text-sm font-extrabold text-bone-100">{product.widthCm}</dd>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-bone-700">cm wide</dt>
            </div>
            <div className="px-1">
              <dd className={`text-sm font-extrabold ${low ? "text-madder-400" : "text-bone-100"}`}>{fmtMetres(product.stockMetres)}</dd>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-bone-700">on bolt</dt>
            </div>
          </dl>

          {/* stock sliver */}
          <div className="mt-3 h-[3px] w-full bg-espresso-700">
            <div
              className={`h-full transition-all duration-700 ${low ? "bg-madder-500" : "bg-ochre-500"}`}
              style={{ width: `${stockPct}%` }}
            />
          </div>

          {/* footer */}
          <div className="mt-auto flex items-center justify-between pt-5">
            <p className="font-display text-2xl font-semibold text-bone-50">
              {fmtPrice(product.pricePerMetre)}
              <span className="text-sm font-normal text-bone-500"> / metre</span>
            </p>
            <button
              onClick={() => onQuickAdd(product)}
              className="group/add flex items-center gap-2 border border-ochre-500/60 bg-ochre-500/10 px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-ochre-300 transition-all duration-300 hover:bg-ochre-500 hover:text-espresso-950"
            >
              <PlusIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/add:rotate-90" />
              Add 1 m
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Shop({
  onOpen,
  onQuickAdd,
}: {
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [sort, setSort] = useState<SortKey>("featured");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    PRODUCTS.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    map.set("All", PRODUCTS.length);
    return map;
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => (category === "All" ? true : p.category === category));
    if (q) {
      list = list.filter((p) =>
        [p.name, p.colourway, p.category, p.origin, p.mill, p.composition, p.description, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.pricePerMetre - b.pricePerMetre);
    if (sort === "price-desc") sorted.sort((a, b) => b.pricePerMetre - a.pricePerMetre);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [search, category, sort]);

  return (
    <section id="library" className="relative mx-auto max-w-7xl scroll-mt-32 px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-madder-400">№ 02 — The cloth library</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-bone-50 sm:text-5xl">
              Six bolts, <em className="font-light italic text-ochre-400">no filler.</em>
            </h2>
            <p className="mt-3 max-w-xl text-bone-300">
              We keep the library deliberately short. Every bolt below is in the shop, on the shelf,
              and cut the day you order.
            </p>
          </div>

          {/* search */}
          <div className="relative w-full sm:w-80">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-bone-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tweed, Como, indigo…"
              className="field !pl-10"
              aria-label="Search fabrics"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-bone-500 transition-colors hover:text-ochre-300"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* filter rail */}
      <Reveal delay={80}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-bone-100/12 py-4">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`flex shrink-0 items-center gap-2 px-4 py-2 text-xs font-extrabold uppercase tracking-widest transition-all duration-300 ${
                    active
                      ? "bg-ochre-500 text-espresso-950 shadow-[0_8px_24px_-10px_rgba(210,154,56,0.7)]"
                      : "border border-bone-100/15 text-bone-300 hover:border-ochre-500/60 hover:text-ochre-300"
                  }`}
                >
                  {c}
                  <span className={`text-[10px] font-bold ${active ? "text-espresso-800" : "text-bone-700"}`}>
                    {counts.get(c)}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-bone-500">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="field !w-auto cursor-pointer !py-2 text-xs font-bold uppercase tracking-widest"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
              <option value="name">Name · A–Z</option>
            </select>
          </label>
        </div>
      </Reveal>

      {/* results line */}
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-bone-700" aria-live="polite">
        Showing {visible.length} of {PRODUCTS.length} bolts
        {search && (
          <>
            {" "}for “<span className="text-ochre-400">{search}</span>”
          </>
        )}
        {category !== "All" && (
          <>
            {" "}in <span className="text-ochre-400">{category}</span>
          </>
        )}
      </p>

      {/* grid */}
      {visible.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} onQuickAdd={onQuickAdd} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center border border-dashed border-bone-100/20 bg-espresso-900/50 px-6 py-20 text-center">
          <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-bone-700" aria-hidden>
            <path d="M10 14h44M10 26h44M10 38h30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="46" cy="46" r="11" stroke="currentColor" strokeWidth="2.4" />
            <path d="m54 54 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <h3 className="mt-5 font-display text-2xl font-semibold text-bone-100">No cloth on this shelf</h3>
          <p className="mt-2 max-w-sm text-sm text-bone-500">
            Nothing matches that search in {category === "All" ? "the library" : category}. Try “tweed”,
            “silk”, or clear your filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-6 flex items-center gap-2 border border-ochre-500/60 px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-ochre-300 transition-colors hover:bg-ochre-500 hover:text-espresso-950"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" /> Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

export type { Category };
