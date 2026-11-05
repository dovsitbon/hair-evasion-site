import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { getDict, isLocale, locales, type Dict, type Locale } from "@/lib/i18n";
import { href, PAGES, pageOf, type PageId } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { ogLocale } from "@/lib/locales";
import { BookCta, Faq, Photo, PhoneLink, Rating } from "@/components/Blocks";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { OpenStatus } from "@/components/OpenStatus";
import { Strand } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => Object.values(PAGES).map((s) => ({ lang, slug: s[lang] })));
}

function metaOf(id: PageId, d: Dict) {
  if (id === "legal") return { title: d.legal.metaTitle, description: d.meta.description };
  const p = d.pages[id];
  return { title: p.metaTitle, description: p.metaDescription };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const id = pageOf(lang, slug);
  if (!id) return {};
  const d = getDict(lang);
  const m = metaOf(id, d);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: href(lang, id),
      languages: { ...Object.fromEntries(locales.map((l) => [l, href(l, id)])), "x-default": href("fr", id) },
    },
    openGraph: { type: "website", url: href(lang, id), siteName: site.name, title: m.title, description: m.description, locale: ogLocale[lang], images: [{ url: "/og.jpg", width: 1200, height: 630, alt: d.meta.ogAlt }] },
    robots: id === "legal" ? { index: false, follow: true } : undefined,
  };
}

function PageHero({ eyebrow, title, intro, img, d, children }: { eyebrow: string; title: string; intro: string; img: string; d: Dict; children?: React.ReactNode }) {
  return (
    <section className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 pt-10 pb-16 sm:px-8 md:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10 lg:pt-16 lg:pb-24">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 text-[clamp(2.8rem,6.4vw,5rem)]">{title}</h1>
        <p className="lead mt-6 max-w-xl">{intro}</p>
        {children && <div className="mt-9">{children}</div>}
      </div>
      <div className="shine aspect-[4/5] overflow-hidden bg-beige">
        <Photo src={img} d={d} priority sizes="(min-width:768px) 45vw, 100vw" className="size-full object-cover" />
      </div>
    </section>
  );
}

function Gallery({ srcs, d, title }: { srcs: string[]; d: Dict; title?: string }) {
  return (
    <section className="mx-auto max-w-[90rem] px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
      {title && <h2 className="display mb-8 text-[clamp(1.9rem,3.6vw,2.6rem)]">{title}</h2>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {srcs.map((src, i) => (
          <Reveal key={src} delay={(i % 3) * 0.07} className="shine aspect-[4/5] bg-beige">
            <Photo src={src} d={d} sizes="(min-width:768px) 31vw, 48vw" className="size-full object-cover" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Balayage({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pages.balayage;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} img="/media/balayage/balayage-caramel-boucles.jpg" d={d}>
        <BookCta lang={lang} d={d} label={p.cta} query="?p=balayage" />
        <Rating lang={lang} d={d} className="mt-6 text-[0.875rem] text-muted hover:text-ink" />
      </PageHero>
      <section className="border-y border-line bg-beige-soft">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-3 lg:px-10 lg:py-24">
          {p.sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <span className="rule" aria-hidden="true" />
              <h2 className="display mt-5 text-[1.9rem]">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <div className="pt-20 lg:pt-28">
        <Gallery
          d={d}
          title={p.gallery}
          srcs={["/media/hero/balayage-blond-ondule.jpg", "/media/balayage/balayage-blond-mur-brique.jpg", "/media/balayage/ombre-chatain-ondule.jpg", "/media/balayage/tie-and-dye-cuivre.jpg", "/media/balayage/boucles-meches-caramel.jpg", "/media/mariage/demi-attache-blond.jpg"]}
        />
      </div>
      <section className="mx-auto max-w-[90rem] px-5 pb-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-muted">
            {p.related}{" "}
            <Link href={href(lang, "home", "carte")} className="link-line text-ink">
              {d.prices.title}
            </Link>
          </p>
          <BookCta lang={lang} d={d} label={p.cta} query="?p=balayage" />
        </div>
      </section>
      <Faq d={d} />
    </>
  );
}

function Mariage({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pages.mariage;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} img="/media/mariage/mariee-chignon-dentelle.jpg" d={d}>
        <Link href={`${href(lang, "rdv")}?p=mariage`} className="btn-solid">
          {p.cta}
        </Link>
      </PageHero>
      <section className="border-y border-line bg-beige-soft">
        <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2 className="display text-[clamp(2rem,4vw,2.8rem)]">{p.process.title}</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {p.process.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08}>
                <span className="display text-[2.6rem] leading-none text-copper-ink">{i + 1}</span>
                <h3 className="mt-3 text-[1.0625rem] font-normal">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 lg:px-10 lg:py-24">
        <Reveal>
          <Strand className="h-5 w-auto text-copper" />
          <h2 className="display mt-5 text-[clamp(1.9rem,3.6vw,2.6rem)]">{p.styles.title}</h2>
          <p className="mt-4 leading-relaxed text-muted">{p.styles.text}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <Strand className="h-5 w-auto text-copper" />
          <h2 className="display mt-5 text-[clamp(1.9rem,3.6vw,2.6rem)]">{p.guests.title}</h2>
          <p className="mt-4 leading-relaxed text-muted">{p.guests.text}</p>
        </Reveal>
      </section>
      <Gallery
        d={d}
        srcs={[
          "/media/mariage/mariee-ondulee-gypsophile.jpg",
          "/media/mariage/chignon-tresse-bijou.jpg",
          "/media/mariage/mariee-tresse-boheme.jpg",
          "/media/mariage/chignon-couronne-fleurs.jpg",
          "/media/mariage/chignon-tresse-fleur-poudree.jpg",
          "/media/mariage/temoin-chignon-gypsophile.jpg",
          "/media/mariage/deux-coiffures-ceremonie.jpg",
          "/media/mariage/chignon-tresse-gypsophile.jpg",
          "/media/mariage/demi-attache-fleurs-sechees.jpg",
          "/media/mariage/chignon-flou-fleurs.jpg",
          "/media/coiffures/enfant-queue-boucles-roses.jpg",
          "/media/coiffures/chignon-perles-blond.jpg",
        ]}
      />
      <section className="bg-night text-paper">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center px-5 py-20 text-center sm:px-8 lg:px-10">
          <Strand className="h-5 w-auto text-caramel" />
          <p className="display mt-6 max-w-2xl text-[clamp(2rem,4vw,3rem)]">{d.wedding.title}</p>
          <Link href={`${href(lang, "rdv")}?p=mariage`} className="btn-solid on-dark mt-10">
            {p.cta}
          </Link>
        </div>
      </section>
    </>
  );
}

function Rdv({ lang, d }: { lang: Locale; d: Dict }) {
  const b = d.booking;
  return (
    <section className="mx-auto grid max-w-[90rem] gap-12 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:px-10 lg:pt-16 lg:pb-28">
      <div className="max-w-3xl">
        <p className="eyebrow">{b.eyebrow}</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,6vw,4.2rem)]">{b.title}</h1>
        <p className="lead mt-5 max-w-2xl">{b.lead}</p>
        <div className="mt-12">
          <BookingForm />
        </div>
      </div>
      <aside className="h-fit space-y-6 lg:sticky lg:top-32">
        <div className="bg-beige-soft p-6">
          <Strand className="h-5 w-auto text-copper" />
          <p className="display mt-4 text-[1.6rem]">{b.preferCall}</p>
          <PhoneLink className="mt-4 inline-flex items-center gap-2 text-[1.125rem]" />
          <div className="mt-3 text-[0.875rem] text-muted">
            <OpenStatus />
          </div>
        </div>
        <div className="space-y-2 px-1 text-[0.875rem] text-muted">
          <Rating lang={lang} d={d} className="hover:text-ink" />
          <p>
            {site.address.street}, {site.address.postalCode} {site.address.city}
          </p>
          <p className="whitespace-pre-line">{d.footer.days}</p>
        </div>
      </aside>
    </section>
  );
}

function Legal({ d }: { d: Dict }) {
  const l = d.legal;
  const rows: [string, string][] = [
    [l.editor, `${l.editorText}${site.legal.siret ? ` SIRET : ${site.legal.siret}.` : ""}`],
    [l.host, site.legal.host],
    [l.data, l.dataText],
    [l.photos, l.photosText],
  ];
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
      <h1 className="display text-[clamp(2.4rem,5vw,3.6rem)]">{l.title}</h1>
      {!site.legal.siret && <p className="mt-4 text-[0.875rem] text-muted">{l.pending}</p>}
      <dl className="mt-10 space-y-8">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = pageOf(lang, slug);
  if (!id) notFound();
  const d = getDict(lang);
  const m = metaOf(id, d);
  const crumbs = breadcrumbJsonLd(lang, m.title.split(" | ")[0], href(lang, id));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {id === "rdv" && <Rdv lang={lang} d={d} />}
      {id === "balayage" && <Balayage lang={lang} d={d} />}
      {id === "mariage" && <Mariage lang={lang} d={d} />}
      {id === "legal" && <Legal d={d} />}
    </>
  );
}
