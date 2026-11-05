import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import equipe from "@/data/equipe.json";
import avantApres from "@/data/avant-apres.json";
import { getDict, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { img } from "@/lib/media";
import { href } from "@/lib/routes";
import { categories } from "@/lib/services";
import { durationLabel, money } from "@/lib/shop";
import { faqJsonLd } from "@/lib/jsonld";
import { fill } from "@/lib/i18n";
import { BookCta, Faq, InfosBlock, PhoneLink, Photo, Rating, SectionHead } from "@/components/Blocks";
import { BookingBar } from "@/components/BookingBar";
import { BeforeAfter } from "@/components/BeforeAfter";
import { OpenStatus } from "@/components/OpenStatus";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, Strand } from "@/components/icons";

const TILES: { id: keyof Dict["tiles"]["items"]; img: string; to: "carte" | "balayage" | "mariage" }[] = [
  { id: "coupe", img: "/media/coiffures/coupe-courte-femme.jpg", to: "carte" },
  { id: "couleur", img: "/media/balayage/balayage-caramel-boucles.jpg", to: "balayage" },
  { id: "lissage", img: "/media/coiffures/lissage-long-blond.jpg", to: "carte" },
  { id: "mariage", img: "/media/mariage/mariee-chignon-dentelle.jpg", to: "mariage" },
  { id: "homme-enfant", img: "/media/coiffures/enfant-chignon-roses.jpg", to: "carte" },
];

function Hero({ lang, d }: { lang: Locale; d: Dict }) {
  const h = d.hero;
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="grid lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1fr_1.15fr]">
        <div className="relative order-1 h-[44svh] min-h-72 overflow-hidden bg-beige lg:order-2 lg:h-auto">
          <Photo src="/media/hero/balayage-blond-ondule.jpg" d={d} priority sizes="(min-width:1024px) 54vw, 100vw" className="settle absolute inset-0 size-full object-cover object-[50%_40%]" />
        </div>
        <div className="order-2 flex flex-col justify-center px-5 pt-10 pb-12 sm:px-8 lg:order-1 lg:px-10 lg:py-16 xl:ps-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]">
          <p className="eyebrow rise">{h.eyebrow}</p>
          <h1 id="hero-title" className="display rise mt-5 max-w-[13ch] text-[clamp(2.9rem,6.4vw,5.6rem)] [animation-delay:0.1s]" dangerouslySetInnerHTML={{ __html: h.title }} />
          <p className="lead rise mt-6 max-w-md [animation-delay:0.2s]">{h.lead}</p>
          <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:0.3s]">
            <Link href={href(lang, "rdv")} className="btn-solid">
              {h.book}
            </Link>
            <Link href={href(lang, "home", "carte")} className="btn-line text-ink">
              {h.services}
            </Link>
          </div>
          <div className="rise mt-8 flex flex-col gap-2 text-[0.875rem] text-muted [animation-delay:0.4s] sm:flex-row sm:flex-wrap sm:gap-x-6">
            <Rating lang={lang} d={d} className="hover:text-ink" />
            <OpenStatus />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:-mt-10 lg:px-10">
        <div className="relative z-10 lg:ms-auto lg:max-w-[52rem]">
          <BookingBar />
        </div>
      </div>
    </section>
  );
}

function Tiles({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <section id="prestations" aria-labelledby="tiles-title" className="mx-auto max-w-[90rem] px-5 pt-20 pb-16 sm:px-8 lg:px-10 lg:pt-28">
      <SectionHead eyebrow={d.tiles.eyebrow} title={d.tiles.title} id="tiles-title" />
      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {TILES.map((t, i) => {
          const it = d.tiles.items[t.id];
          const to = t.to === "carte" ? href(lang, "home", "carte") : href(lang, t.to);
          return (
            <Reveal as="li" key={t.id} delay={i * 0.06} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
              <Link href={to} className="group block">
                <div className={`shine bg-beige ${i === 4 ? "aspect-[8/5] md:aspect-[3/4]" : "aspect-[3/4]"}`}>
                  <Photo src={t.img} d={d} sizes="(min-width:1024px) 19vw, (min-width:768px) 31vw, 48vw" className="size-full object-cover" />
                </div>
                <h3 className="display mt-4 flex items-center justify-between gap-2 text-[1.55rem]">
                  {it.title}
                  <ArrowIcon className="size-4 shrink-0 text-copper transition-transform duration-500 group-hover:translate-x-1" />
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{it.text}</p>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

function Prices({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.prices;
  return (
    <section id="carte" aria-labelledby="carte-title" className="bg-beige-soft">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:px-10 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} id="carte-title" />
          <p className="mt-6 text-[0.875rem] text-muted">{p.note}</p>
          <div className="mt-8">
            <BookCta lang={lang} d={d} />
          </div>
        </div>
        <div className="space-y-14">
          {categories.map((c) => (
            <Reveal key={c.id}>
              <div className="flex items-baseline justify-between gap-4 border-b border-ink/80 pb-3">
                <h3 className="display text-[1.9rem]">{c.name[lang]}</h3>
                <Link href={`${href(lang, "rdv")}?p=${c.id}`} className="link-line shrink-0 text-[0.8125rem] text-copper-ink">
                  {p.book}
                </Link>
              </div>
              <ul className="divide-y divide-line">
                {c.items.map((s) => (
                  <li key={s.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-0.5 py-3.5 sm:grid-cols-[1fr_6rem_9rem]">
                    <span className="text-[1rem]">{s.name[lang]}</span>
                    <span className="order-3 col-span-2 text-[0.8125rem] text-muted tabular-nums sm:order-none sm:col-span-1 sm:text-end">{s.duration ? fill(p.duration, { time: durationLabel(s.duration, lang) }) : ""}</span>
                    <span className="text-end text-[0.9375rem] tabular-nums">{s.price != null ? fill(p.from, { price: money(s.price, lang) }) : <span className="text-muted">{p.onRequest}</span>}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews({ lang, d }: { lang: Locale; d: Dict }) {
  const r = d.reviews;
  const value = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { maximumFractionDigits: 1 }).format(site.rating.value);
  return (
    <section aria-labelledby="reviews-title" className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <Reveal className="grid items-center gap-10 border-y border-line py-12 lg:grid-cols-[auto_1fr] lg:gap-20">
        <div className="flex items-end gap-5">
          <p className="display text-[clamp(5rem,10vw,7.5rem)] leading-[0.8]">{value}</p>
          <div className="pb-1">
            <p className="eyebrow">{r.eyebrow}</p>
            <Rating lang={lang} d={d} className="mt-2 text-[0.875rem] text-muted hover:text-ink" />
          </div>
        </div>
        <div>
          <h2 id="reviews-title" className="display text-[clamp(1.8rem,3.4vw,2.4rem)]">
            {r.title}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[1.0625rem]">
            {r.themes.map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="rule !w-4" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <a href={site.maps} target="_blank" rel="noopener" className="link-line mt-6 inline-block text-[0.9375rem]">
            {r.cta}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function BeforeAfterSection({ lang, d }: { lang: Locale; d: Dict }) {
  const pairs = avantApres.pairs as { id: string; before: string; after: string; alt: Record<Locale, string> }[];
  if (!pairs.length) return null;
  const t = d.beforeAfter;
  return (
    <section aria-labelledby="ba-title" className="mx-auto max-w-[90rem] px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} id="ba-title" />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pairs.map((p) => (
          <BeforeAfter key={p.id} pair={{ id: p.id, before: img(p.before), after: img(p.after), alt: p.alt[lang] }} />
        ))}
      </div>
    </section>
  );
}

function Wedding({ lang, d }: { lang: Locale; d: Dict }) {
  const w = d.wedding;
  const shots = ["/media/mariage/mariee-ondulee-gypsophile.jpg", "/media/mariage/chignon-tresse-fleur-poudree.jpg", "/media/mariage/mariee-tresse-boheme.jpg", "/media/mariage/temoin-chignon-gypsophile.jpg"];
  return (
    <section id="mariage" aria-labelledby="wedding-title" className="bg-night text-paper">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHead eyebrow={w.eyebrow} title={w.title} lead={w.lead} id="wedding-title" light />
          <Reveal delay={0.1} className="lg:pt-16">
            <ul className="space-y-4 border-t border-paper/15 pt-6">
              {w.points.map((pt) => (
                <li key={pt} className="flex gap-4 text-paper/85">
                  <Strand className="mt-2 h-3 w-auto shrink-0 text-caramel" />
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {shots.map((src, i) => (
            <Reveal key={src} delay={i * 0.08} className={`shine bg-ink ${i % 2 ? "lg:mt-16" : ""} aspect-[4/5]`}>
              <Photo src={src} d={d} sizes="(min-width:1024px) 23vw, 48vw" className="size-full object-cover" />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center">
          <Link href={`${href(lang, "rdv")}?p=mariage`} className="btn-solid on-dark">
            {w.cta}
          </Link>
          <Link href={href(lang, "mariage")} className="link-line text-[0.9375rem] text-paper/80 hover:text-paper">
            {w.more}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Salon({ lang, d }: { lang: Locale; d: Dict }) {
  const s = d.salon;
  const m = equipe.members[0];
  return (
    <section id="salon" aria-labelledby="salon-title" className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="aspect-[4/5] overflow-hidden bg-beige">
            <Photo src={m.photo ?? "/media/mariage/chignon-tresse-bijou.jpg"} d={d} sizes="(min-width:1024px) 42vw, 100vw" className="size-full object-cover" />
          </div>
          <div className="absolute -bottom-8 left-6 w-[58%] border-4 border-paper bg-beige sm:left-auto sm:-right-6 sm:w-[46%]">
            <Photo src="/media/salon/devanture-rue-au-lin.jpg" d={d} sizes="(min-width:1024px) 20vw, 50vw" className="aspect-[3/2] w-full object-cover" />
          </div>
        </Reveal>
        <div className="pt-6 lg:pt-0">
          <SectionHead eyebrow={s.eyebrow} title={s.title} id="salon-title" />
          <Reveal>
            <p className="lead mt-6">{s.text}</p>
            <div className="mt-10 border-t border-line pt-8">
              <p className="eyebrow">{s.portrait.eyebrow}</p>
              <h3 className="display mt-3 text-[1.9rem]">{m.name ?? s.portrait.title}</h3>
              {m.name && <p className="mt-1 text-[0.9375rem] text-muted">{m.role[lang]}</p>}
              <p className="mt-3 leading-relaxed text-muted">{s.portrait.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="mt-24 grid gap-12 md:grid-cols-[1fr_1fr_0.9fr] md:gap-10 lg:gap-16">
        <Reveal>
          <span className="rule" aria-hidden="true" />
          <h3 className="display mt-5 text-[1.8rem]">{s.space.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{s.space.text}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="rule" aria-hidden="true" />
          <h3 className="display mt-5 text-[1.8rem]">{s.products.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{s.products.text}</p>
        </Reveal>
        <Reveal delay={0.16} className="aspect-square overflow-hidden bg-beige">
          <Photo src="/media/salon/trousse-leonor-greyl.jpg" d={d} sizes="(min-width:768px) 28vw, 100vw" className="size-full object-cover" />
        </Reveal>
      </div>
    </section>
  );
}

function Tips({ d }: { d: Dict }) {
  const t = d.tips;
  return (
    <section aria-labelledby="tips-title" className="border-t border-line bg-beige-soft">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} id="tips-title" />
        <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.06} className="bg-beige-soft p-7 lg:p-8">
              <span className="display text-[2.4rem] leading-none text-copper-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[1.0625rem] font-normal">{it.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{it.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Gift({ lang, d }: { lang: Locale; d: Dict }) {
  const g = d.gift;
  return (
    <section id="cadeaux" aria-labelledby="gift-title" className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1fr] lg:gap-20">
        <Reveal className="shine aspect-square bg-beige">
          <Photo src="/media/salon/coffret-bon-cadeau.jpg" d={d} sizes="(min-width:768px) 42vw, 100vw" className="size-full object-cover" />
        </Reveal>
        <div>
          <SectionHead eyebrow={g.eyebrow} title={g.title} id="gift-title" />
          <Reveal>
            <p className="lead mt-5">{g.text}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href={`${href(lang, "rdv")}?p=bon-cadeau`} className="btn-line text-ink">
                {g.cta}
              </Link>
              <PhoneLink className="inline-flex items-center gap-2 text-[0.9375rem] text-muted hover:text-ink" label={`${g.call} · ${site.phone}`} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(d.faq.items)) }} />
      <Hero lang={lang} d={d} />
      <Tiles lang={lang} d={d} />
      <Prices lang={lang} d={d} />
      <Reviews lang={lang} d={d} />
      <BeforeAfterSection lang={lang} d={d} />
      <Wedding lang={lang} d={d} />
      <Salon lang={lang} d={d} />
      <Tips d={d} />
      <Gift lang={lang} d={d} />
      <InfosBlock lang={lang} d={d} />
      <Faq d={d} className="border-t border-line" />
    </>
  );
}
