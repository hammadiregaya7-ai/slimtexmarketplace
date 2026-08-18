interface IconProps {
  className?: string;
}

const base = "stroke-current";

/** Interlaced warp-and-weft monogram */
export function Monogram({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="34" height="34" className={base} strokeWidth="2" />
      <path d="M10 30 L17 10 L20 19 L23 10 L30 30" className={base} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 22 H32" className={base} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <path d="M8 26 H32" className={base} strokeWidth="1.4" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function BasketIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 9h16l-1.6 11.2a1.5 1.5 0 0 1-1.49 1.3H7.09a1.5 1.5 0 0 1-1.49-1.3L4 9Z" className={base} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 9 12 3.5 15.5 9" className={base} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13v4M12 13v4M15 13v4" className={base} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" className={base} strokeWidth="1.7" />
      <path d="m15.5 15.5 5 5" className={base} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ScissorsIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="6.5" cy="7" r="2.6" className={base} strokeWidth="1.6" />
      <circle cx="6.5" cy="17" r="2.6" className={base} strokeWidth="1.6" />
      <path d="M8.9 8.4 20.5 19M8.9 15.6 20.5 5" className={base} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SpoolIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 3h12M6 21h12M8 3v2.5M16 3v2.5M8 21v-2.5M16 21v-2.5" className={base} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 5.5h8v13H8z" className={base} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 9h8M8 12h8M8 15h8" className={base} strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

export function RulerIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="9" width="19" height="6" rx="0.5" className={base} strokeWidth="1.6" />
      <path d="M6.5 9v2.5M10.5 9v3.5M14.5 9v2.5M18.5 9v3.5" className={base} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function GlobeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" className={base} strokeWidth="1.6" />
      <path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.1 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.1-3.9-8.5S9.4 5.8 12 3.5Z" className={base} strokeWidth="1.4" />
    </svg>
  );
}

export function TruckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M2.5 6h11v10h-11zM13.5 9h4.2l3 3.4V16h-2.2" className={base} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="1.9" className={base} strokeWidth="1.6" />
      <circle cx="16.5" cy="17.5" r="1.9" className={base} strokeWidth="1.6" />
      <path d="M9 16h5.6" className={base} strokeWidth="1.6" />
    </svg>
  );
}

export function LeafIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M19.5 4.5C11 5 5.5 10 5.5 17c0 1 .2 2 .6 2.9C14 19.5 19 14 19.5 4.5Z" className={base} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 21c3-5.5 7.5-9.5 12.5-12.5" className={base} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" className={base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="m6 6 12 12M18 6 6 18" className={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" className={base} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14" className={base} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="m4.5 12.5 5 5L19.5 7" className={base} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ThreadIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3v4M12 17v4" className={base} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 7h7l1 10h-9l1-10Z" className={base} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 10.5h6.6M8.7 13.5h7.2" className={base} strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

/** Decorative dashed "cut here" divider */
export function CutLine({ className = "" }: IconProps) {
  return (
    <div className={`flex items-center gap-3 text-bone-700 ${className}`} aria-hidden>
      <ScissorsIcon className="h-4 w-4 shrink-0" />
      <div className="h-px flex-1 border-t border-dashed border-bone-100/20" />
    </div>
  );
}
