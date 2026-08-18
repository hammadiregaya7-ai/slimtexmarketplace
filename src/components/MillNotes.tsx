import { useState } from "react";
import { MILL_NOTES } from "../data/products";
import { Reveal } from "../hooks/useReveal";
import { ArrowIcon } from "./Icons";

export function MillNotes() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="notes" className="relative scroll-mt-32 border-t border-bone-100/10 bg-espresso-900/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-36">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-madder-400">№ 03 — From the cutting room</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-bone-50 sm:text-5xl">
              Mill notes, <em className="font-light italic text-ochre-400">pinned up.</em>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-bone-300">
              Short field notes from thirty-odd years of buying cloth — how to read a selvedge, why
              deadstock is treasure, how much extra to order for the bias. Unpin one and read.
            </p>
            <div className="mt-8 hidden items-center gap-3 text-bone-700 lg:flex" aria-hidden>
              <svg viewBox="0 0 120 24" className="h-6 w-32" fill="none">
                <path d="M2 18 C 30 2, 60 24, 90 8 S 112 10, 118 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="m112 2 7 3-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">hand-stitched wisdom</span>
            </div>
          </div>
        </Reveal>

        <div className="divide-y divide-bone-100/10 border-y border-bone-100/10">
          {MILL_NOTES.map((note, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={note.n} delay={i * 100}>
                <article className={`transition-colors duration-500 ${open ? "bg-espresso-850" : "hover:bg-espresso-850/50"}`}>
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="flex w-full items-center gap-5 px-5 py-6 text-left sm:px-7"
                    aria-expanded={open}
                  >
                    <span className={`font-display text-2xl font-light italic transition-colors duration-300 sm:text-3xl ${open ? "text-ochre-400" : "text-bone-700"}`}>
                      {note.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl font-semibold leading-snug text-bone-50 sm:text-2xl">{note.title}</span>
                      <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-bone-700">{note.date}</span>
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-400 ${
                        open ? "rotate-90 border-ochre-500 text-ochre-300" : "border-bone-100/20 text-bone-500"
                      }`}
                    >
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl px-5 pb-7 pl-[4.4rem] leading-relaxed text-bone-300 sm:px-7 sm:pl-[5.2rem]">
                        {note.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
