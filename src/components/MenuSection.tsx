import { motion } from "framer-motion";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";

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

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-sm"
          >
            <img
              src={dish1}
              alt="Navarin d'agneau"
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-sm"
          >
            <img
              src={dish2}
              alt="Moelleux au chocolat"
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>

        <p className="text-center font-body text-muted-foreground text-sm mt-8 italic">
          La carte évolue au gré des saisons. Consultez-nous pour le menu du jour.
        </p>
      </div>
    </section>
  );
};

export default MenuSection;
