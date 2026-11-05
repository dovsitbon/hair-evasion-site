import data from "@/data/prestations.json";
import type { L10n } from "@/lib/locales";

export type Service = { id: string; name: L10n; duration: number | null; price: number | null };
export type Category = { id: string; name: L10n; items: Service[] };

export const categories = data.categories as Category[];
export const services = categories.flatMap((c) => c.items);
/** Identifiant spécial du formulaire : bon cadeau. */
export const GIFT = "bon-cadeau";
export const serviceIds = [...services.map((s) => s.id), GIFT];
/** Prestations qui font apparaître les questions « mariage » du formulaire. */
export const WEDDING_IDS = ["coiffure-mariee", "essai-mariee"];
/** Une catégorie entière (barre de réservation) → une prestation représentative ; une prestation → elle-même. */
export const DEFAULT_OF: Record<string, string> = { coupe: "coupe-femme", couleur: "balayage", lissage: "lissage-japonais", mariage: "coiffure-mariee", "homme-enfant": "coupe-homme" };
export const expand = (id: string) => (DEFAULT_OF[id] ? [DEFAULT_OF[id]] : serviceIds.includes(id) ? [id] : []);
