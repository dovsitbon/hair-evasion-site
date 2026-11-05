/**
 * Logo typographique de Hair Évasion, en attendant le fichier d'origine :
 * une mèche ondulée au trait cuivré (reprise de la petite boucle de l'enseigne, rue au Lin),
 * « HAIR ÉVASION » en capitales fines, « coiffeur visagiste · Amiens » en petit.
 * Prend la couleur du texte (currentColor) ; la mèche reste cuivrée, sauf `mono`.
 * Pour le remplacer : changer ce composant et public/logo.svg (même viewBox de préférence).
 */
export const STRAND = "M6 30C22 30 26 10 44 10S66 30 84 30 106 12 124 8";

export function Logo({ className = "", title, mono = false, tagline = true }: { className?: string; title?: string; mono?: boolean; tagline?: boolean }) {
  return (
    <svg viewBox={tagline ? "0 0 340 96" : "0 0 340 74"} className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <path d={STRAND} transform="translate(105 0)" fill="none" stroke={mono ? "currentColor" : "var(--color-copper, #B9774A)"} strokeWidth="1.4" strokeLinecap="round" />
      <text x="174.5" y="66" textAnchor="middle" fill="currentColor" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 30, letterSpacing: "0.3em" }}>
        HAIR ÉVASION
      </text>
      {tagline && (
        <text x="171.4" y="90" textAnchor="middle" fill="currentColor" style={{ fontFamily: "var(--font-jost), Jost, 'Helvetica Neue', Arial, sans-serif", fontWeight: 300, fontSize: 10.5, letterSpacing: "0.26em" }}>
          coiffeur visagiste · Amiens
        </text>
      )}
    </svg>
  );
}
