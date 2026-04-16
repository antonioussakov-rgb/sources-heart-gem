import { motion } from "framer-motion";
import platPate from "@/assets/plat-pate.jpg";
import platBrick from "@/assets/plat-brick.jpg";
import platDessertFruits from "@/assets/plat-dessert-fruits.jpg";
import platSteakFrites from "@/assets/plat-steak-frites.jpg";
import platMoelleux from "@/assets/plat-moelleux-chocolat.jpg";
import platChevreChaud from "@/assets/plat-chevre-chaud.jpg";
import platIleFlottante from "@/assets/plat-ile-flottante.jpg";

const menuItems = {
  entrées: [
    "Toast de Chèvre Chaud",
    "Rillette de Saumon et Guacamole",
    "Terrine de Joue de Bœuf",
    "Pâté de Campagne Maison",
    "Brick Pommes Chèvre et Chorizo",
    "Flan au Gorgonzola et sa Coppa",
  ],
  plats: [
    "Navarin d'Agneau et ses Petits Légumes",
    "Ballotine de Volaille",
    "Faux Filet Bleue d'Ail",
    "Poulet à l'Indienne",
    "Joue de Bœuf",
  ],
  desserts: [
    "Île Flottante",
    "Moelleux Chocolat",
    "Tarte au Citron",
    "Tiramisu Crème de Citron",
    "Crumble aux Poires",
  ],
};

const dishPhotos = [
  { src: platChevreChaud, alt: "Toast de Chèvre Chaud" },
  { src: platBrick, alt: "Brick Pommes Chèvre et Chorizo" },
  { src: platPate, alt: "Pâté de Campagne Maison" },
  { src: platSteakFrites, alt: "Faux Filet Bleue d'Ail" },
  { src: platMoelleux, alt: "Moelleux au Chocolat" },
  { src: platDessertFruits, alt: "Dessert aux fruits rouges" },
  { src: platIleFlottante, alt: "Île Flottante" },
];

const MenuSection = () => {
  return (
    <section className="py-24 md:py-32 bg-auberge-warm px-6" id="carte">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-auberge-gold tracking-[0.3em] uppercase text-xs mb-4">
            Produits frais & de saison
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground">
            Notre <span className="italic font-normal">Carte</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {(Object.entries(menuItems) as [string, string[]][]).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <h3 className="font-display text-2xl text-auberge-burgundy capitalize mb-6 text-center">
                {category}
              </h3>
              <div className="w-12 h-px bg-auberge-gold mx-auto mb-6" />
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="font-body text-foreground/80 text-center font-light"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Photo grid with real dishes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {dishPhotos.map((photo, idx) => (
            <motion.div
              key={photo.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`overflow-hidden rounded-sm ${
                idx === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={`w-full object-cover hover:scale-105 transition-transform duration-700 ${
                  idx === 0 ? "h-full min-h-[300px]" : "h-48 md:h-56"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <p className="text-center font-body text-muted-foreground text-sm mt-8 italic">
          La carte évolue au gré des saisons. Consultez-nous pour le menu du jour.
        </p>
      </div>
    </section>
  );
};

export default MenuSection;
