"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { STRAND } from "@/components/Logo";

const KEY = "hair-evasion-intro";
const at = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

/**
 * Ouverture (1,5 s, une fois par session), tout en CSS (globals.css) :
 * fond blanc chaud, une mèche ondulée se dessine au trait cuivré, un reflet caramel la parcourt
 * comme un balayage, « HAIR ÉVASION » apparaît, puis fondu sur le hero.
 * Ignorée si l'utilisateur préfère réduire les animations (script en tête du layout).
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-ink">
      <svg viewBox="0 0 130 40" className="h-16 w-auto overflow-visible" fill="none" strokeLinecap="round" aria-hidden="true">
        <path className="intro-strand" pathLength={1} d={STRAND} stroke="var(--color-copper)" strokeWidth="1.3" />
        <path className="intro-strand" style={at(0.14)} pathLength={1} d={STRAND} transform="translate(0 4)" stroke="var(--color-taupe)" strokeWidth="0.7" opacity="0.6" />
        <path className="intro-gleam" pathLength={1} d={STRAND} stroke="#F1D2AE" strokeWidth="2.2" />
      </svg>
      <p className="intro-fade mt-7 ps-[0.34em] font-[family-name:var(--font-cormorant)] text-[2.1rem] leading-none font-light tracking-[0.34em]" style={at(0.72)} translate="no" aria-hidden="true">
        HAIR ÉVASION
      </p>
      <p className="intro-fade mt-4 text-[0.6875rem] tracking-[0.26em] text-muted" style={at(0.9)} translate="no" aria-hidden="true">
        coiffeur visagiste · Amiens
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="nav-link absolute right-4 bottom-4 min-h-11 px-4 text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
