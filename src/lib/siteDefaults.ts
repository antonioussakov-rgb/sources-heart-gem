import heroImage from "@/assets/hero-auberge.jpg";
import terrasseImage from "@/assets/terrasse.jpg";
import platChevreChaud from "@/assets/plat-chevre-chaud.jpg";
import platBrick from "@/assets/plat-brick.jpg";
import platPate from "@/assets/plat-pate.jpg";
import platSteakFrites from "@/assets/plat-steak-frites.jpg";
import platMoelleux from "@/assets/plat-moelleux-chocolat.jpg";
import platDessertFruits from "@/assets/plat-dessert-fruits.jpg";
import platIleFlottante from "@/assets/plat-ile-flottante.jpg";

export type SiteContent = {
  phone: string;
  phoneHref: string;
  addressLine1: string;
  addressLine2: string;
  hours: { day: string; value: string }[];
  heroTagline: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  aboutTagline: string;
  aboutTitleLine1: string;
  aboutTitleLine2: string;
  aboutParagraphs: string[];
  photos: {
    hero: string;
    terrasse: string;
    dishes: { alt: string; src: string }[];
  };
};

export const defaultSiteContent: SiteContent = {
  phone: "01 64 29 11 40",
  phoneHref: "0164291140",
  addressLine1: "15 Rue de Chaintréauville",
  addressLine2: "77140 Saint-Pierre-lès-Nemours",
  hours: [
    { day: "Lundi", value: "09:00–14:00" },
    { day: "Mardi", value: "Fermé" },
    { day: "Mercredi", value: "Fermé" },
    { day: "Jeudi", value: "09:00–14:00" },
    { day: "Vendredi", value: "09:00–14:00 · 17:30–21:00" },
    { day: "Samedi", value: "09:00–14:00 · 18:00–21:00" },
    { day: "Dimanche", value: "10:00–13:00" },
  ],
  heroTagline: "Restaurant · Saint-Pierre-lès-Nemours",
  heroTitleLine1: "L'Auberge",
  heroTitleLine2: "des Sources",
  heroSubtitle:
    "Cuisine traditionnelle française, produits frais et de saison, dans une ambiance chaleureuse et familiale.",
  aboutTagline: "Notre histoire",
  aboutTitleLine1: "Une pépite",
  aboutTitleLine2: "comme on les aime",
  aboutParagraphs: [
    "Nichée au cœur de Saint-Pierre-lès-Nemours, L'Auberge des Sources vous accueille dans une ambiance chaleureuse et authentique. Derrière sa façade discrète se cache une véritable pépite de la gastronomie française.",
    "Notre chef travaille exclusivement des produits frais et de saison, composant une carte courte mais savoureuse qui évolue au fil des mois. Chaque assiette est une invitation au voyage gustatif, sublimée par une sélection de vins soigneusement choisie.",
    "Terrasse, cocktails d'exception et menu enfant — un lieu pour toutes les occasions, des déjeuners en famille aux dîners à la bougie.",
  ],
  photos: {
    hero: heroImage,
    terrasse: terrasseImage,
    dishes: [
      { src: platChevreChaud, alt: "Toast de Chèvre Chaud" },
      { src: platBrick, alt: "Brick Pommes Chèvre et Chorizo" },
      { src: platPate, alt: "Pâté de Campagne Maison" },
      { src: platSteakFrites, alt: "Faux Filet Bleue d'Ail" },
      { src: platMoelleux, alt: "Moelleux au Chocolat" },
      { src: platDessertFruits, alt: "Dessert aux fruits rouges" },
      { src: platIleFlottante, alt: "Île Flottante" },
    ],
  },
};

export function mergeSiteContent(partial: any): SiteContent {
  if (!partial || typeof partial !== "object") return defaultSiteContent;
  return {
    ...defaultSiteContent,
    ...partial,
    photos: {
      ...defaultSiteContent.photos,
      ...(partial.photos || {}),
      dishes:
        Array.isArray(partial?.photos?.dishes) && partial.photos.dishes.length > 0
          ? partial.photos.dishes
          : defaultSiteContent.photos.dishes,
    },
    hours:
      Array.isArray(partial.hours) && partial.hours.length > 0
        ? partial.hours
        : defaultSiteContent.hours,
    aboutParagraphs:
      Array.isArray(partial.aboutParagraphs) && partial.aboutParagraphs.length > 0
        ? partial.aboutParagraphs
        : defaultSiteContent.aboutParagraphs,
  };
}
