import { motion } from "framer-motion";
import terrasseImage from "@/assets/terrasse.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-auberge-gold tracking-[0.3em] uppercase text-xs mb-4">
            Notre histoire
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-6 leading-tight">
            Une pépite
            <br />
            <span className="italic font-normal text-auberge-burgundy">comme on les aime</span>
          </h2>
          <div className="space-y-4 font-body text-muted-foreground leading-relaxed font-light">
            <p>
              Nichée au cœur de Saint-Pierre-lès-Nemours, L'Auberge des Sources vous accueille
              dans une ambiance chaleureuse et authentique. Derrière sa façade discrète se cache
              une véritable pépite de la gastronomie française.
            </p>
            <p>
              Notre chef travaille exclusivement des produits frais et de saison, composant une
              carte courte mais savoureuse qui évolue au fil des mois. Chaque assiette est une
              invitation au voyage gustatif, sublimée par une sélection de vins soigneusement
              choisie.
            </p>
            <p>
              Terrasse, cocktails d'exception et menu enfant — un lieu pour toutes les occasions,
              des déjeuners en famille aux dîners à la bougie.
            </p>
          </div>

          <div className="mt-8 flex gap-12">
            <div>
              <p className="font-display text-3xl text-auberge-burgundy">20–30€</p>
              <p className="font-body text-muted-foreground text-sm mt-1">par personne</p>
            </div>
            <div>
              <p className="font-display text-3xl text-auberge-burgundy">4,7</p>
              <p className="font-body text-muted-foreground text-sm mt-1">sur Google</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-auberge-warm rounded-sm -z-10" />
          <img
            src={terrasseImage}
            alt="La terrasse de L'Auberge des Sources"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full h-[500px] object-cover rounded-sm"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
